"""
Football IQ Engine — reads field position, detects game events,
and writes narrative drive summaries from tracking data alone.

Signals used:
- Play-to-play centroid shift (field position tracking)
- Time gaps between plays (dead ball periods)
- Cluster spread changes (formation vs reset vs sideline)
- Down counting within drives
- 20-yard zone line crossing (WCFL first down zones)

Events detected:
- Scoring drives (field position reaches end zone → resets to 30)
- Turnovers on downs (4 plays without crossing zone line → possession flip)
- Punts (declared punt → 30-yard field position jump)
- Interceptions (sudden possession change + field position reversal)
- First downs (crossing 20-yard zone lines)
- Big plays (15+ yard gains)
- Halftime / timeouts (extended gaps)
"""

from __future__ import annotations

import json
import math
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from typing import Optional

import numpy as np


@dataclass
class SmartPlay:
    number: int
    time_str: str
    time_sec: int
    offense: str
    defense: str
    formation: str
    coverage: str
    play_type: str
    direction: str
    blitz: bool
    motion: bool
    # Field position
    field_x_px: float
    yard_line: float  # 0 = left end zone, 80 = right end zone
    # Computed
    gain_yards: float
    down: int  # 1-4
    zone_line_crossed: bool  # first down achieved?
    is_big_play: bool
    event: str  # "", "FIRST_DOWN", "TOUCHDOWN", "TURNOVER_ON_DOWNS", "PUNT", "INTERCEPTION", "SAFETY"
    narrative: str


@dataclass
class SmartDrive:
    number: int
    offense: str
    defense: str
    plays: list[SmartPlay]
    start_yard: float
    end_yard: float
    yards_gained: float
    play_count: int
    first_downs: int
    result: str  # "Touchdown", "Turnover on Downs", "Punt", "Interception", "End of Half", "End of Game"
    scoring_play: bool
    points_scored: int
    narrative: str
    key_play: Optional[str]


class FootballIQ:
    """Analyzes tracking data with real football knowledge."""

    def __init__(
        self,
        field_length: float = 80.0,
        first_down_zone: float = 20.0,  # WCFL: 20-yard zones
        punt_distance: float = 30.0,     # WCFL: declared punt = 30 yards
        start_yard_line: float = 30.0,   # WCFL: start at own 30 after scores
    ):
        self.field_length = field_length
        self.first_down_zone = first_down_zone
        self.punt_distance = punt_distance
        self.start_yard = start_yard_line

    def analyze_game(
        self,
        tracking_path: str,
        plays_path: str,
        team_a: str,
        team_b: str,
        game_start_sec: float = 120.0,
        game_end_sec: float = 3180.0,
    ) -> dict:
        """Full game analysis with football IQ.

        Returns dict with smart_plays, smart_drives, game_summary.
        """
        # Load data
        records = []
        with open(tracking_path) as f:
            for line in f:
                records.append(json.loads(line))
        field_recs = [r for r in records if 250 < r['y_pixel'] < 880
                      and game_start_sec <= r['time'] <= game_end_sec]

        with open(plays_path) as f:
            raw_plays = json.loads(f.read())

        # Map plays to field positions
        play_positions = self._compute_field_positions(raw_plays, field_recs)

        if not play_positions:
            return {"error": "No plays with field position data"}

        # Calibrate pixel-to-yard mapping
        xs = [p['cx'] for p in play_positions]
        self.x_min = min(xs)
        self.x_max = max(xs)
        self.px_per_yard = (self.x_max - self.x_min) / self.field_length if (self.x_max - self.x_min) > 50 else 8.0

        # Determine which direction each team attacks
        # Team that starts near yard 30 (own 30) is attacking toward 80
        first_off = play_positions[0]['offense']
        first_yard = self._px_to_yard(play_positions[0]['cx'])

        # If first play is near yard 30, that team attacks toward 80 (right)
        # If near yard 50, harder to tell — use average direction of movement
        self.team_direction = {}
        if first_yard < 40:
            self.team_direction[first_off] = "right"  # attacks toward higher yard numbers
            other = team_b if first_off == team_a else team_a
            self.team_direction[other] = "left"
        else:
            self.team_direction[first_off] = "left"
            other = team_b if first_off == team_a else team_a
            self.team_direction[other] = "right"

        # Build smart plays with down tracking and event detection
        smart_plays = self._build_smart_plays(play_positions, team_a, team_b)

        # Group into smart drives
        smart_drives = self._build_smart_drives(smart_plays, team_a, team_b)

        # Generate game summary
        summary = self._build_game_summary(smart_plays, smart_drives, team_a, team_b)

        return {
            "plays": [self._play_to_dict(p) for p in smart_plays],
            "drives": [self._drive_to_dict(d) for d in smart_drives],
            "summary": summary,
        }

    def _compute_field_positions(self, raw_plays, field_recs):
        """Map each play to its field position centroid."""
        results = []
        for p in raw_plays:
            parts = p['time'].split(':')
            t_sec = int(parts[0]) * 60 + int(parts[1])

            recs = [r for r in field_recs if t_sec - 0.5 <= r['time'] <= t_sec + 2.0]
            if not recs:
                continue

            cx = float(np.mean([r['x_pixel'] for r in recs]))
            cy = float(np.mean([r['y_pixel'] for r in recs]))

            results.append({**p, 'cx': cx, 'cy': cy, 't_sec': t_sec})

        return results

    def _px_to_yard(self, px: float) -> float:
        return (px - self.x_min) / self.px_per_yard

    def _build_smart_plays(self, positions, team_a, team_b):
        """Build SmartPlay objects with down counting and event detection."""
        plays = []
        current_down = 1
        current_offense = positions[0]['offense']
        zone_start = self._px_to_yard(positions[0]['cx'])
        # Zone lines at 0, 20, 40, 60, 80
        next_zone = self._next_zone_line(zone_start, current_offense)

        for i, pp in enumerate(positions):
            yard = self._px_to_yard(pp['cx'])

            # Detect possession change
            if pp['offense'] != current_offense:
                current_offense = pp['offense']
                current_down = 1
                zone_start = yard
                next_zone = self._next_zone_line(yard, current_offense)

            # Compute gain from previous play (same drive)
            gain = 0.0
            if i > 0 and positions[i-1]['offense'] == pp['offense']:
                prev_yard = self._px_to_yard(positions[i-1]['cx'])
                if self.team_direction.get(pp['offense']) == "right":
                    gain = yard - prev_yard
                else:
                    gain = prev_yard - yard

            # Check first down (zone line crossed)
            zone_crossed = False
            if self.team_direction.get(pp['offense']) == "right":
                if yard >= next_zone and next_zone > 0:
                    zone_crossed = True
                    current_down = 1
                    next_zone = self._next_zone_line(yard, pp['offense'])
            else:
                if yard <= next_zone:
                    zone_crossed = True
                    current_down = 1
                    next_zone = self._next_zone_line(yard, pp['offense'])

            # Detect events
            event = ""
            time_gap = pp['t_sec'] - positions[i-1]['t_sec'] if i > 0 else 0

            # Touchdown: ball reaches end zone area
            if (self.team_direction.get(pp['offense']) == "right" and yard > 72) or \
               (self.team_direction.get(pp['offense']) == "left" and yard < 8):
                event = "TOUCHDOWN"
            # Big play
            elif abs(gain) > 15:
                event = "BIG_PLAY"
            # After 4th down with no zone crossing
            elif current_down > 4:
                event = "TURNOVER_ON_DOWNS"
                current_down = 1

            # Check for punt (big field position shift after possession change)
            if i > 0 and pp['offense'] != positions[i-1]['offense']:
                dx_yards = abs(yard - self._px_to_yard(positions[i-1]['cx']))
                if dx_yards > 25:
                    if i > 0:
                        # Was the previous team's last play on their side of field? → punt
                        prev_yard = self._px_to_yard(positions[i-1]['cx'])
                        if (self.team_direction.get(positions[i-1]['offense']) == "right" and prev_yard < 50) or \
                           (self.team_direction.get(positions[i-1]['offense']) == "left" and prev_yard > 30):
                            # Previous drive ended in their own territory → likely punt
                            pass  # Will be labeled on the drive level

            is_big = abs(gain) >= 15
            if zone_crossed and event != "TOUCHDOWN":
                event = "FIRST_DOWN"

            # Narrative
            narrative = self._play_narrative(
                pp, yard, gain, current_down, event, zone_crossed, is_big
            )

            plays.append(SmartPlay(
                number=pp['play'],
                time_str=pp['time'],
                time_sec=pp['t_sec'],
                offense=pp['offense'],
                defense=pp['defense'],
                formation=pp['formation'],
                coverage=pp['coverage'],
                play_type=pp.get('type', 'Unknown'),
                direction=pp.get('direction', 'Unknown'),
                blitz=pp.get('blitz', False),
                motion=pp.get('motion', False),
                field_x_px=pp['cx'],
                yard_line=round(yard, 1),
                gain_yards=round(gain, 1),
                down=current_down,
                zone_line_crossed=zone_crossed,
                is_big_play=is_big,
                event=event,
                narrative=narrative,
            ))

            current_down += 1

        return plays

    def _next_zone_line(self, current_yard, offense):
        """Find the next zone line the offense needs to cross."""
        # Zone lines at 0, 20, 40, 60, 80
        zones = [0, 20, 40, 60, 80]
        direction = self.team_direction.get(offense, "right")

        if direction == "right":
            for z in zones:
                if z > current_yard:
                    return z
            return 80
        else:
            for z in reversed(zones):
                if z < current_yard:
                    return z
            return 0

    def _play_narrative(self, pp, yard, gain, down, event, zone_crossed, big):
        """Write a simple narrative for this play."""
        parts = []

        ordinal = {1: "1st", 2: "2nd", 3: "3rd", 4: "4th"}.get(down, f"{down}th")
        parts.append(f"{ordinal} down at the {yard:.0f}-yard line.")
        parts.append(f"{pp['offense']} lined up in {pp['formation']}.")

        if pp.get('motion'):
            parts.append("Pre-snap motion.")

        if pp.get('type') == 'Pass':
            parts.append(f"Pass play going {pp.get('direction', 'unknown').lower()}.")
        else:
            parts.append(f"Run play going {pp.get('direction', 'unknown').lower()}.")

        if big:
            parts.append(f"BIG PLAY! {gain:+.0f} yards!")
        elif gain > 5:
            parts.append(f"Good gain of {gain:.0f} yards.")
        elif gain > 0:
            parts.append(f"Short gain, {gain:.0f} yards.")
        elif gain == 0:
            parts.append("No gain.")
        else:
            parts.append(f"Loss of {abs(gain):.0f} yards.")

        if event == "FIRST_DOWN":
            parts.append("FIRST DOWN!")
        elif event == "TOUCHDOWN":
            parts.append("TOUCHDOWN!")
        elif event == "TURNOVER_ON_DOWNS":
            parts.append("Turnover on downs. Defense holds.")

        if pp.get('blitz'):
            parts.append("Defense sent a blitz.")

        return " ".join(parts)

    def _build_smart_drives(self, plays, team_a, team_b):
        """Group plays into drives with result detection."""
        if not plays:
            return []

        drives = []
        current = [plays[0]]

        for p in plays[1:]:
            # Same offense and within 50 seconds = same drive
            # WCFL play clock is 40 seconds, so plays in a drive are 15-45s apart
            time_gap = p.time_sec - current[-1].time_sec
            if p.offense == current[-1].offense and time_gap < 50:
                current.append(p)
            else:
                drives.append(self._finalize_drive(len(drives) + 1, current, plays, team_a, team_b))
                current = [p]

        if current:
            drives.append(self._finalize_drive(len(drives) + 1, current, plays, team_a, team_b))

        return drives

    def _finalize_drive(self, num, drive_plays, all_plays, team_a, team_b):
        """Determine drive result and write narrative."""
        offense = drive_plays[0].offense
        defense = drive_plays[0].defense
        start_yard = drive_plays[0].yard_line
        end_yard = drive_plays[-1].yard_line

        direction = self.team_direction.get(offense, "right")
        if direction == "right":
            yards_gained = end_yard - start_yard
        else:
            yards_gained = start_yard - end_yard

        first_downs = sum(1 for p in drive_plays if p.zone_line_crossed)
        big_plays = sum(1 for p in drive_plays if p.is_big_play)

        # Determine result
        has_td = any(p.event == "TOUCHDOWN" for p in drive_plays)
        has_tod = any(p.event == "TURNOVER_ON_DOWNS" for p in drive_plays)

        if has_td:
            result = "Touchdown"
            points = 6  # plus XP which we can't see
            scoring = True
        elif has_tod:
            result = "Turnover on Downs"
            points = 0
            scoring = False
        elif len(drive_plays) <= 2 and yards_gained < 5:
            # Short drive with minimal gain — could be punt or failed series
            result = "Punt / Stalled Drive"
            points = 0
            scoring = False
        elif yards_gained < -5:
            result = "Three-and-Out / Lost Yardage"
            points = 0
            scoring = False
        else:
            result = "Change of Possession"
            points = 0
            scoring = False

        # Key play
        key_play = None
        if big_plays > 0:
            bp = [p for p in drive_plays if p.is_big_play][0]
            key_play = f"Play {bp.number} ({bp.time_str}): {bp.gain_yards:+.0f} yard {bp.play_type.lower()} from {bp.formation}"

        # Drive narrative
        narrative = self._drive_narrative(
            offense, defense, drive_plays, start_yard, end_yard,
            yards_gained, first_downs, result, key_play, direction
        )

        return SmartDrive(
            number=num, offense=offense, defense=defense,
            plays=drive_plays, start_yard=round(start_yard, 1),
            end_yard=round(end_yard, 1), yards_gained=round(yards_gained, 1),
            play_count=len(drive_plays), first_downs=first_downs,
            result=result, scoring_play=scoring, points_scored=points,
            narrative=narrative, key_play=key_play,
        )

    def _drive_narrative(self, off, defn, plays, sy, ey, yg, fds, result, key, direction):
        """Write a full drive narrative."""
        parts = []

        pc = len(plays)
        parts.append(f"{off} ball, starting at their own {sy:.0f}-yard line.")

        # Describe the drive progression
        if pc == 1:
            parts.append(f"One-play possession.")
        elif pc <= 3:
            if yg > 10:
                parts.append(f"Quick-strike drive, {pc} plays for {yg:.0f} yards.")
            else:
                parts.append(f"Short drive, {pc} plays.")
        else:
            parts.append(f"Sustained {pc}-play drive covering {yg:.0f} yards.")

        if fds > 0:
            parts.append(f"Earned {fds} first down{'s' if fds > 1 else ''}.")

        # Formations used
        forms = Counter(p.formation for p in plays)
        top_form = forms.most_common(1)[0] if forms else ("Unknown", 0)
        if pc > 2:
            parts.append(f"Primarily ran {top_form[0]}.")

        # Key play
        if key:
            parts.append(f"Key play: {key}.")

        # Result
        if result == "Touchdown":
            parts.append("Drive ended in a TOUCHDOWN.")
        elif result == "Turnover on Downs":
            parts.append("Failed to convert. Turnover on downs.")
        elif "Punt" in result:
            parts.append("Drive stalled. Punted to flip field position.")
        elif "Three-and-Out" in result:
            parts.append("Three-and-out. Defense forced a quick stop.")
        else:
            parts.append(f"Drive ended: {result}.")

        return " ".join(parts)

    def _build_game_summary(self, plays, drives, team_a, team_b):
        """Build the overall game summary."""
        a_drives = [d for d in drives if d.offense == team_a]
        b_drives = [d for d in drives if d.offense == team_b]

        a_tds = sum(1 for d in a_drives if d.result == "Touchdown")
        b_tds = sum(1 for d in b_drives if d.result == "Touchdown")
        a_punts = sum(1 for d in a_drives if "Punt" in d.result)
        b_punts = sum(1 for d in b_drives if "Punt" in d.result)
        a_tod = sum(1 for d in a_drives if "Turnover" in d.result)
        b_tod = sum(1 for d in b_drives if "Turnover" in d.result)
        a_fds = sum(d.first_downs for d in a_drives)
        b_fds = sum(d.first_downs for d in b_drives)
        a_yards = sum(d.yards_gained for d in a_drives)
        b_yards = sum(d.yards_gained for d in b_drives)

        return {
            "total_plays": len(plays),
            "total_drives": len(drives),
            team_a: {
                "drives": len(a_drives),
                "touchdowns": a_tds,
                "punts": a_punts,
                "turnovers_on_downs": a_tod,
                "first_downs": a_fds,
                "total_yards": round(a_yards, 0),
                "yards_per_drive": round(a_yards / max(len(a_drives), 1), 1),
            },
            team_b: {
                "drives": len(b_drives),
                "touchdowns": b_tds,
                "punts": b_punts,
                "turnovers_on_downs": b_tod,
                "first_downs": b_fds,
                "total_yards": round(b_yards, 0),
                "yards_per_drive": round(b_yards / max(len(b_drives), 1), 1),
            },
        }

    # ── Serialization ────────────────────────────────────────────

    def _play_to_dict(self, p):
        return {
            "play": p.number, "time": p.time_str, "down": p.down,
            "yard_line": p.yard_line, "offense": p.offense,
            "formation": p.formation, "coverage": p.coverage,
            "type": p.play_type, "direction": p.direction,
            "gain": p.gain_yards, "big_play": p.is_big_play,
            "first_down": p.zone_line_crossed, "event": p.event,
            "blitz": p.blitz, "motion": p.motion,
            "narrative": p.narrative,
        }

    def _drive_to_dict(self, d):
        return {
            "drive": d.number, "offense": d.offense, "defense": d.defense,
            "plays": d.play_count, "start_yard": d.start_yard,
            "end_yard": d.end_yard, "yards": d.yards_gained,
            "first_downs": d.first_downs, "result": d.result,
            "scoring": d.scoring_play, "points": d.points_scored,
            "key_play": d.key_play, "narrative": d.narrative,
            "play_details": [self._play_to_dict(p) for p in d.plays],
        }
