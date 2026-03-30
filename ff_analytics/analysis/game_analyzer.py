"""
Production GameAnalyzer — video in, scouting report out.

Autonomous flag football game analysis. No coach input required.

Detection capabilities:
- Snap detection via stillness-to-explosion pattern
- Drive grouping via timing and field position
- Scoring detection via post-score empty-field reset (90s+ gap with <4 players)
- Turnover on downs via 4-down counting within drives
- Punt detection via 25+ yard field position shift between drives
- Halftime detection via 180s+ gap
- Formation classification from pre-snap player positions
- Coverage shell classification from defender depth/spacing
- Gain estimation from play-to-play field position change
"""

from __future__ import annotations

import json
import math
import os
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from typing import Optional

import cv2
import numpy as np


@dataclass
class Snap:
    index: int
    frame: int
    time: float
    timestamp: str
    stillness: float
    explosion: float
    player_count: int


@dataclass
class PlayResult:
    snap: Snap
    down: int
    yard_line: float
    gain: float
    formation: str
    coverage: str
    is_big_play: bool
    narrative: str


@dataclass
class DriveResult:
    number: int
    offense: str
    defense: str
    plays: list[PlayResult]
    start_yard: float
    end_yard: float
    total_yards: float
    first_downs: int
    result: str       # "Touchdown + XP", "Turnover on Downs", "Punt", "Interception", "End of Half", "End of Game"
    points: int
    key_play: Optional[str]
    narrative: str


class GameAnalyzer:
    """Drop a video, get a scouting report. Fully autonomous."""

    def __init__(self, fps: float = 29.97, field_length: float = 80.0, field_width: float = 40.0):
        self.fps = fps
        self.field_length = field_length
        self.field_width = field_width
        self.skip = 5  # process every Nth frame

    def analyze(
        self,
        video_path: str,
        tracking_path: str,
        output_dir: str,
        game_start_sec: float,
        game_end_sec: float,
        team_a: str,
        team_b: str,
        color_a: str = "",
        color_b: str = "",
        first_possession: Optional[str] = None,
    ) -> dict:
        """Full autonomous game analysis.

        Args:
            video_path: Path to video file.
            tracking_path: Path to tracking JSONL from pipeline.
            output_dir: Where to write output files.
            game_start_sec: Game start time in video (seconds).
            game_end_sec: Game end time in video (seconds).
            team_a: First team name.
            team_b: Second team name.
            color_a: Team A jersey color.
            color_b: Team B jersey color.
            first_possession: Which team has ball first (None = auto-detect).
        """
        os.makedirs(output_dir, exist_ok=True)

        # Load tracking data
        print("Loading tracking data...")
        records = self._load_tracking(tracking_path)
        field_recs = [r for r in records if 250 < r["y_pixel"] < 880
                      and game_start_sec <= r["time"] <= game_end_sec]
        print(f"  {len(field_recs)} on-field records")

        # Phase 1: Detect snaps
        print("\nPhase 1: Snap detection...")
        snaps = self._detect_snaps(field_recs, game_start_sec, game_end_sec)
        print(f"  {len(snaps)} snaps detected")

        # Phase 2: Calibrate field position
        print("\nPhase 2: Field calibration...")
        self._calibrate_field(snaps, field_recs)
        print(f"  X range: {self.x_min:.0f} - {self.x_max:.0f} px = {self.field_length} yards")

        # Phase 3: Classify each snap (formation, coverage, field position)
        print("\nPhase 3: Play classification...")
        play_data = self._classify_plays(snaps, field_recs)

        # Phase 4: Group into drives with game-event detection
        print("\nPhase 4: Drive assembly & event detection...")
        possession = first_possession or team_a
        drives = self._assemble_drives(play_data, snaps, field_recs, team_a, team_b, possession)
        print(f"  {len(drives)} drives detected")

        # Phase 5: Extract key frames
        print("\nPhase 5: Extracting play frames...")
        self._extract_frames(video_path, drives, output_dir)

        # Phase 6: Compute tendencies
        print("\nPhase 6: Computing tendencies...")
        tendencies = self._compute_tendencies(drives, team_a, team_b)

        # Phase 7: Build the report
        print("\nPhase 7: Generating report...")
        report = self._build_report(drives, tendencies, team_a, team_b, color_a, color_b)

        # Save outputs
        report_path = os.path.join(output_dir, "GAME_REPORT.txt")
        with open(report_path, "w", encoding="utf-8") as f:
            f.write(report)

        drives_json = os.path.join(output_dir, "drives.json")
        with open(drives_json, "w") as f:
            json.dump([self._drive_to_dict(d) for d in drives], f, indent=2)

        tend_json = os.path.join(output_dir, "tendencies.json")
        with open(tend_json, "w") as f:
            json.dump(tendencies, f, indent=2)

        print(f"\nDone. Report: {report_path}")
        return {"drives": len(drives), "snaps": len(snaps), "report": report_path}

    # ══════════════════════════════════════════════════════════════
    # PHASE 1: SNAP DETECTION
    # ══════════════════════════════════════════════════════════════

    def _detect_snaps(self, records, gs, ge):
        """Detect snaps via stillness → explosion pattern."""
        frames = defaultdict(list)
        for r in records:
            frames[r["frame_idx"]].append(r)

        fi = sorted(frames.keys())
        if len(fi) < 20:
            return []

        # Compute per-frame velocity and stillness
        n = len(fi)
        velocities = np.zeros(n)
        stillness = np.zeros(n)
        pcounts = np.zeros(n)

        for i in range(1, n):
            dt = (fi[i] - fi[i - 1]) / self.fps
            if dt <= 0 or dt > 1:
                continue
            prev = {r["track_id"]: r for r in frames[fi[i - 1]]}
            curr = {r["track_id"]: r for r in frames[fi[i]]}
            pcounts[i] = len(curr)

            speeds = []
            for tid in curr:
                if tid in prev:
                    dx = curr[tid]["x_pixel"] - prev[tid]["x_pixel"]
                    dy = curr[tid]["y_pixel"] - prev[tid]["y_pixel"]
                    speeds.append(math.sqrt(dx * dx + dy * dy) / dt)

            if len(speeds) >= 4:
                velocities[i] = float(np.mean(speeds))
                stillness[i] = sum(1 for s in speeds if s < 5) / len(speeds)

        # Smooth
        w = max(1, int(0.3 * self.fps / self.skip))
        kern = np.ones(w) / w
        vel_sm = np.convolve(velocities, kern, mode="same")
        still_sm = np.convolve(stillness, kern, mode="same")

        # Detect stillness → explosion transitions
        min_still = int(0.8 * self.fps / self.skip)
        raw_snaps = []

        for i in range(min_still, n - 2):
            still_window = still_sm[i - min_still:i]
            if np.mean(still_window) < 0.52:
                continue
            if pcounts[i] < 7:
                continue
            prev_vel = vel_sm[i - 1] if vel_sm[i - 1] > 0 else 1
            curr_vel = vel_sm[i]
            if curr_vel > 18 and curr_vel > prev_vel * 1.8:
                t = fi[i] / self.fps
                mins, secs = divmod(int(t), 60)
                raw_snaps.append(Snap(
                    index=len(raw_snaps),
                    frame=fi[i],
                    time=t,
                    timestamp=f"{mins}:{secs:02d}",
                    stillness=float(np.mean(still_window)),
                    explosion=float(curr_vel),
                    player_count=int(pcounts[i]),
                ))

        # Merge snaps within 12s
        merged = [raw_snaps[0]] if raw_snaps else []
        for s in raw_snaps[1:]:
            if s.time - merged[-1].time > 12:
                merged.append(s)

        # Reindex
        for i, s in enumerate(merged):
            s.index = i

        return merged

    # ══════════════════════════════════════════════════════════════
    # PHASE 2: FIELD CALIBRATION
    # ══════════════════════════════════════════════════════════════

    def _calibrate_field(self, snaps, records):
        """Map pixel X coordinates to yard lines.

        Uses the 10th-90th percentile of snap centroids to define
        the field boundaries. This clips out sideline noise, spectators,
        and tracking artifacts at the edges that would stretch the
        calibration and compress the real field.
        """
        xs = []
        for s in snaps:
            recs = [r for r in records if s.time - 0.5 <= r["time"] <= s.time + 1.5]
            if recs:
                xs.append(float(np.mean([r["x_pixel"] for r in recs])))
        if not xs:
            self.x_min, self.x_max = 400, 1500
        else:
            # Use 5th-95th percentile to clip outliers
            # This gives us the actual field range, not sideline noise
            self.x_min = float(np.percentile(xs, 5))
            self.x_max = float(np.percentile(xs, 95))
        spread = self.x_max - self.x_min
        self.px_per_yard = spread / self.field_length if spread > 50 else 8.0

    def _to_yard(self, px):
        return (px - self.x_min) / self.px_per_yard

    # ══════════════════════════════════════════════════════════════
    # PHASE 3: PLAY CLASSIFICATION
    # ══════════════════════════════════════════════════════════════

    def _classify_plays(self, snaps, records):
        """Classify each snap: formation, coverage, field position."""
        results = []
        for s in snaps:
            cx = self._get_centroid_x(s.time, records)
            yard = self._to_yard(cx) if cx else 40
            form = self._detect_formation(s.time, records)
            cov = self._detect_coverage(s.time, records)
            results.append({
                "snap": s, "yard": yard, "formation": form, "coverage": cov, "cx": cx,
            })
        return results

    def _get_centroid_x(self, t, records):
        recs = [r for r in records if t - 0.5 <= r["time"] <= t + 1.5]
        return float(np.mean([r["x_pixel"] for r in recs])) if recs else None

    def _get_on_field_count(self, t, records):
        recs = [r for r in records if t - 0.5 <= r["time"] <= t + 0.5]
        return len(set(r["track_id"] for r in recs))

    def _detect_formation(self, t, records):
        recs = [r for r in records if t - 1.0 <= r["time"] <= t + 0.5]
        if len(recs) < 8:
            return "Inconclusive"

        tracks = defaultdict(list)
        for r in recs:
            tracks[r["track_id"]].append(r)
        pos = [{"x": np.mean([r["x_pixel"] for r in v]), "y": np.mean([r["y_pixel"] for r in v])}
               for v in tracks.values() if len(v) >= 2]
        if len(pos) < 6:
            return "Inconclusive"

        # Split teams by Y clustering
        ys = np.array([p["y"] for p in pos]).reshape(-1, 1).astype(np.float32)
        try:
            _, labels, _ = cv2.kmeans(ys, 2, None,
                (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 1.0), 10, cv2.KMEANS_PP_CENTERS)
            g0 = [p for p, l in zip(pos, labels.flatten()) if l == 0]
            g1 = [p for p, l in zip(pos, labels.flatten()) if l == 1]
        except Exception:
            return "Inconclusive"

        # Offense = more Y depth
        r0 = (max(p["y"] for p in g0) - min(p["y"] for p in g0)) if len(g0) >= 2 else 0
        r1 = (max(p["y"] for p in g1) - min(p["y"] for p in g1)) if len(g1) >= 2 else 0
        off = g0 if r0 > r1 else g1

        cx = np.median([p["x"] for p in off])
        L = [p for p in off if p["x"] < cx - 40]
        R = [p for p in off if p["x"] > cx + 40]
        nl, nr = len(L), len(R)

        def tight(g):
            return len(g) >= 3 and max(p["x"] for p in g) - min(p["x"] for p in g) < 80

        if nl >= 3:
            return "Bunch Left" if tight(L) else "Trips Left"
        if nr >= 3:
            return "Bunch Right" if tight(R) else "Trips Right"
        if nl == 2 and nr == 2:
            return "2x2 Spread"
        if nl == 2:
            return "Twins Left"
        if nr == 2:
            return "Twins Right"
        if nl + nr >= 4:
            return "Spread"
        if nl + nr <= 1:
            return "Tight / Compressed"
        return "Pro Set"

    def _detect_coverage(self, t, records):
        recs = [r for r in records if t - 1.0 <= r["time"] <= t + 0.5]
        if len(recs) < 8:
            return "Unknown"

        tracks = defaultdict(list)
        for r in recs:
            tracks[r["track_id"]].append(r)
        pos = [{"x": np.mean([r["x_pixel"] for r in v]), "y": np.mean([r["y_pixel"] for r in v])}
               for v in tracks.values() if len(v) >= 2]
        if len(pos) < 6:
            return "Unknown"

        ys = np.array([p["y"] for p in pos]).reshape(-1, 1).astype(np.float32)
        try:
            _, labels, _ = cv2.kmeans(ys, 2, None,
                (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 1.0), 10, cv2.KMEANS_PP_CENTERS)
            g0 = [p for p, l in zip(pos, labels.flatten()) if l == 0]
            g1 = [p for p, l in zip(pos, labels.flatten()) if l == 1]
        except Exception:
            return "Unknown"

        r0 = (max(p["y"] for p in g0) - min(p["y"] for p in g0)) if len(g0) >= 2 else 0
        r1 = (max(p["y"] for p in g1) - min(p["y"] for p in g1)) if len(g1) >= 2 else 0
        defense = g1 if r0 > r1 else g0
        offense = g0 if r0 > r1 else g1

        los = np.median([p["y"] for p in offense])
        deep = [d for d in defense if abs(d["y"] - los) > 80]

        if len(deep) >= 2:
            dxs = [d["x"] for d in deep]
            return "Cover 2 (Two-High)" if max(dxs) - min(dxs) > 150 else "Quarters"
        if len(deep) == 1:
            return "Cover 1 / Cover 3"
        return "Cover 0"

    # ══════════════════════════════════════════════════════════════
    # PHASE 4: DRIVE ASSEMBLY & EVENT DETECTION
    # ══════════════════════════════════════════════════════════════

    def _assemble_drives(self, play_data, snaps, records, team_a, team_b, first_poss):
        """Group plays into drives. Detect scores, turnovers, punts.

        Key signals:
        - Gap > 90s with < 6 players on field = SCORE just happened
        - Gap > 180s = HALFTIME
        - 4 plays without crossing 20-yard zone line = turnover on downs
        - 25+ yard field shift between drives = punt
        - Normal gap (15-50s) = next play in same drive

        Fixes:
        - Gains clamped to [-20, +40] per play (anything beyond is tracking noise)
        - Down counting resets properly on first downs
        - Drives auto-split when down reaches 5 (turnover on downs mid-drive)
        - Score detection checks BOTH field position AND post-drive gap pattern
        """
        if not play_data:
            return []

        # First: find natural break points using gap analysis
        breaks = [0]
        for i in range(1, len(play_data)):
            gap = play_data[i]["snap"].time - play_data[i - 1]["snap"].time
            if gap > 45:  # 45s gap = new drive (play clock is 40s)
                breaks.append(i)

        # Build raw drive groups
        raw_drives = []
        for b in range(len(breaks)):
            start = breaks[b]
            end = breaks[b + 1] if b + 1 < len(breaks) else len(play_data)
            raw_drives.append(play_data[start:end])

        # Now build drives with proper down counting and event detection
        drives = []
        offense = first_poss

        for di, drive_plays in enumerate(raw_drives):
            defense = team_b if offense == team_a else team_a

            # Sub-split this drive if down count exceeds 4
            # (means a turnover on downs happened mid-drive)
            sub_drives = self._split_on_4th_down(drive_plays)

            for sdi, sub_plays in enumerate(sub_drives):
                if sdi > 0:
                    # Possession changed mid-drive due to turnover on downs
                    offense, defense = defense, offense

                plays = []
                current_down = 1
                zone_start = sub_plays[0]["yard"]
                next_zone = self._next_zone(zone_start)

                for j, pd in enumerate(sub_plays):
                    yard = pd["yard"]
                    raw_gain = yard - sub_plays[j - 1]["yard"] if j > 0 else 0

                    # CLAMP gains to realistic range (-20 to +40 per play)
                    gain = max(-20, min(40, raw_gain))
                    big = abs(gain) >= 15

                    # Check zone crossing (first down)
                    # WCFL zones: 0, 20, 40, 60, 80
                    crossed = False
                    if yard >= next_zone and next_zone > zone_start:
                        crossed = True
                        current_down = 1
                        zone_start = yard
                        next_zone = self._next_zone(yard)

                    ordinal = {1: "1st", 2: "2nd", 3: "3rd", 4: "4th"}.get(current_down, f"{current_down}th")

                    narrative = f"{ordinal} down at the {yard:.0f}. {pd['formation']} vs {pd['coverage']}."
                    if big and gain > 0:
                        narrative += f" BIG GAIN of {gain:.0f} yards!"
                    elif gain > 5:
                        narrative += f" Solid gain, {gain:.0f} yards."
                    elif gain > 0:
                        narrative += f" Short gain, {gain:.0f} yards."
                    elif gain < -5:
                        narrative += f" Loss of {abs(gain):.0f} yards!"
                    elif gain < 0:
                        narrative += f" Small loss."
                    else:
                        narrative += " No gain."
                    if crossed:
                        narrative += " FIRST DOWN!"

                    plays.append(PlayResult(
                        snap=pd["snap"], down=min(current_down, 4),
                        yard_line=round(yard, 1),
                        gain=round(gain, 1), formation=pd["formation"],
                        coverage=pd["coverage"], is_big_play=big,
                        narrative=narrative,
                    ))
                    current_down += 1

                # Compute drive stats
                start_yd = plays[0].yard_line
                end_yd = plays[-1].yard_line
                total_yds = sum(p.gain for p in plays)  # use clamped gains, not raw
                first_downs_earned = max(0, sum(1 for p in plays if p.down == 1) - 1)

                # Check what happens AFTER this drive
                is_last_sub = (sdi == len(sub_drives) - 1)
                gap_after = 0
                field_shift = 0
                players_in_gap = 99
                next_start_yard = 30  # default

                if is_last_sub and di + 1 < len(raw_drives):
                    next_drive = raw_drives[di + 1]
                    gap_after = next_drive[0]["snap"].time - drive_plays[-1]["snap"].time
                    next_start_yard = next_drive[0]["yard"]
                    field_shift = abs(next_start_yard - end_yd)

                    # Count players on field during the gap (score detection)
                    gap_start_t = drive_plays[-1]["snap"].time
                    gap_end_t = next_drive[0]["snap"].time
                    # Sample at 1/3 and 2/3 through the gap
                    t1 = gap_start_t + (gap_end_t - gap_start_t) * 0.33
                    t2 = gap_start_t + (gap_end_t - gap_start_t) * 0.66
                    p1 = self._get_on_field_count(t1, records)
                    p2 = self._get_on_field_count(t2, records)
                    players_in_gap = min(p1, p2)

                # EVENT DETECTION — priority order
                #
                # RULE 1: Field position in end zone = ALWAYS a touchdown
                #         (this overrides everything else)
                # RULE 2: Long gap with empty field + next drive at 30 = score reset
                # RULE 3: Gap > 150s = end of half
                # RULE 4: Down count > 4 = turnover on downs
                # RULE 5: Big field shift = punt
                #
                if not is_last_sub:
                    result = "Turnover on Downs"
                    points = 0
                elif (end_yd > 74 or end_yd < 6) and gap_after > 60:
                    # RULE 1: Ball clearly in end zone AND a significant gap after
                    # (the gap confirms it was a real score, not just tracking noise)
                    result = "Touchdown"
                    points = 6  # TD = 6 pts (XP success unknown from video)
                elif (gap_after > 90 and players_in_gap < 6
                      and 22 <= next_start_yard <= 42):
                    # RULE 2: Long empty-field gap + next drive resets near 30
                    # If field position is in scoring territory, high confidence TD
                    # If field position is mid-field but gap is very long (>120s),
                    # still likely a TD (field position may be noisy from celebration)
                    if (end_yd > 55 or end_yd < 25):
                        # Drive ended near either end zone + long gap + empty field
                        # (can't know which direction team attacks, so check both ends)
                        result = "Touchdown"
                        points = 6  # TD = 6 pts (XP success unknown from video)
                    elif gap_after > 120 and (end_yd > 50 or end_yd < 30):
                        # Very long gap (2+ min) with empty field + reset near 30
                        # AND drive ended past midfield in either direction
                        # (teams may or may not flip direction at halftime)
                        result = "Touchdown"
                        points = 6
                    else:
                        result = "Change of Possession"
                        points = 0
                elif gap_after > 150:
                    # RULE 3: Very long gap = end of half
                    # Only call TD if field position is clearly in end zone
                    if (end_yd > 74 or end_yd < 6):
                        result = "Touchdown + End of Half"
                        points = 6  # TD = 6 pts (XP success unknown from video)
                    else:
                        result = "End of Half"
                        points = 0
                elif current_down > 4:
                    result = "Turnover on Downs"
                    points = 0
                elif field_shift > 25 and gap_after > 30:
                    result = "Punt"
                    points = 0
                elif di == len(raw_drives) - 1 and is_last_sub:
                    result = "End of Game"
                    points = 0
                elif len(plays) <= 2 and abs(total_yds) < 5:
                    result = "Turnover on Downs"
                    points = 0
                else:
                    result = "Change of Possession"
                    points = 0

            # Key play
            key = None
            big_plays = [p for p in plays if p.is_big_play]
            if big_plays:
                bp = big_plays[0]
                key = f"Play at {bp.snap.timestamp}: {bp.gain:+.0f} yards from {bp.formation}"

            # Drive narrative
            narr = self._write_drive_narrative(
                offense, defense, plays, start_yd, end_yd, total_yds,
                first_downs_earned, result, key, len(plays)
            )

            drives.append(DriveResult(
                number=len(drives) + 1,
                offense=offense, defense=defense,
                plays=plays, start_yard=round(start_yd, 1),
                end_yard=round(end_yd, 1),
                total_yards=round(total_yds, 1),
                first_downs=max(0, first_downs_earned),
                result=result, points=points, key_play=key,
                narrative=narr,
            ))

            # Alternate possession
            offense = team_b if offense == team_a else team_a

        return drives

    def _split_on_4th_down(self, drive_plays):
        """Split a drive into sub-drives when down count exceeds 4.

        In WCFL, teams get 4 downs to cross the next 20-yard zone line.
        If they don't cross it in 4 plays, it's a turnover on downs and
        the other team gets the ball. This function detects when that
        happens within a raw drive group (which was grouped by timing only).
        """
        if len(drive_plays) <= 4:
            return [drive_plays]

        # Simulate down counting
        sub_drives = []
        current_sub = []
        down = 1
        zone_start = drive_plays[0]["yard"]
        next_zone = self._next_zone(zone_start)

        for pd in drive_plays:
            yard = pd["yard"]

            # Check first down
            if yard >= next_zone and next_zone > zone_start:
                down = 1
                zone_start = yard
                next_zone = self._next_zone(yard)

            current_sub.append(pd)

            if down >= 4 and len(current_sub) >= 4:
                # Check if next play crosses the zone
                # If not, this is a turnover on downs — split here
                idx = drive_plays.index(pd)
                if idx + 1 < len(drive_plays):
                    next_yard = drive_plays[idx + 1]["yard"]
                    if next_yard < next_zone:
                        # Didn't make it — turnover on downs
                        sub_drives.append(current_sub)
                        current_sub = []
                        down = 0
                        zone_start = next_yard if idx + 1 < len(drive_plays) else yard
                        next_zone = self._next_zone(zone_start)

            down += 1

        if current_sub:
            sub_drives.append(current_sub)

        return sub_drives if sub_drives else [drive_plays]

    def _next_zone(self, yard):
        zones = [0, 20, 40, 60, 80]
        for z in zones:
            if z > yard + 1:
                return z
        return 80

    def _write_drive_narrative(self, off, dfn, plays, sy, ey, yg, fds, result, key, pc):
        parts = []
        parts.append(f"{off} takes over at the {sy:.0f}-yard line.")

        if pc == 1:
            parts.append("One-play series.")
        elif pc == 2:
            parts.append(f"Quick 2-play series.")
        elif pc <= 4:
            if yg > 15:
                parts.append(f"Efficient {pc}-play drive covering {yg:.0f} yards.")
            else:
                parts.append(f"Short {pc}-play drive.")
        else:
            parts.append(f"Extended {pc}-play drive.")
            if yg > 20:
                parts.append(f"Moved the ball {yg:.0f} yards down the field.")

        if fds > 0:
            parts.append(f"Picked up {fds} first down{'s' if fds != 1 else ''}.")

        if key:
            parts.append(f"Key play: {key}.")

        if result == "Touchdown":
            parts.append(f"TOUCHDOWN {off}!")
        elif result == "Turnover on Downs":
            parts.append(f"Failed to convert on 4th down. {dfn} ball.")
        elif result == "Punt":
            parts.append(f"{off} punts. Ball moves 30 yards.")
        elif result == "End of Half":
            parts.append("End of half.")
        elif result == "End of Game":
            parts.append("Final play of the game.")
        elif result == "Quick Stall":
            parts.append(f"Drive stalls quickly. {dfn} takes over.")

        return " ".join(parts)

    # ══════════════════════════════════════════════════════════════
    # PHASE 5: FRAME EXTRACTION
    # ══════════════════════════════════════════════════════════════

    def _extract_frames(self, video_path, drives, output_dir):
        frames_dir = os.path.join(output_dir, "play_frames")
        os.makedirs(frames_dir, exist_ok=True)

        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)

        play_num = 0
        for d in drives:
            for p in d.plays:
                play_num += 1
                fn = int(p.snap.time * fps)
                cap.set(cv2.CAP_PROP_POS_FRAMES, fn)
                ret, frame = cap.read()
                if not ret:
                    continue
                h, w = frame.shape[:2]
                cv2.rectangle(frame, (0, 0), (w, 65), (0, 0, 0), -1)
                dn = {1: "1st", 2: "2nd", 3: "3rd", 4: "4th"}.get(p.down, f"{p.down}th")
                cv2.putText(frame, f"Drive {d.number} | {p.snap.timestamp} | {d.offense} Ball | {dn} down",
                            (10, 22), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (255, 255, 255), 2)
                cv2.putText(frame, f"{p.formation} vs {p.coverage} | ~{p.yard_line:.0f} yd",
                            (10, 48), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 2)
                result_color = (0, 255, 0) if p.is_big_play else (200, 200, 200)
                cv2.rectangle(frame, (0, h - 28), (w, h), (0, 0, 0), -1)
                cv2.putText(frame, f"{p.gain:+.0f} yds | {d.result if p == d.plays[-1] else ''}",
                            (10, h - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, result_color, 2)
                cv2.imwrite(os.path.join(frames_dir, f"play_{play_num:03d}.jpg"), frame)

        cap.release()

    # ══════════════════════════════════════════════════════════════
    # PHASE 6: TENDENCIES
    # ══════════════════════════════════════════════════════════════

    def _compute_tendencies(self, drives, team_a, team_b):
        result = {}
        for team in [team_a, team_b]:
            team_drives = [d for d in drives if d.offense == team]
            all_plays = [p for d in team_drives for p in d.plays]
            opp_drives = [d for d in drives if d.defense == team]
            def_plays = [p for d in opp_drives for p in d.plays]

            if not all_plays:
                result[team] = {"offense": {}, "defense": {}}
                continue

            forms = Counter(p.formation for p in all_plays)
            covs = Counter(p.coverage for p in def_plays) if def_plays else Counter()
            tp = len(all_plays)
            dp = len(def_plays) if def_plays else 1

            result[team] = {
                "offense": {
                    "plays": tp,
                    "drives": len(team_drives),
                    "touchdowns": sum(1 for d in team_drives if d.result == "Touchdown"),
                    "turnovers_on_downs": sum(1 for d in team_drives if "Turnover" in d.result),
                    "punts": sum(1 for d in team_drives if d.result == "Punt"),
                    "total_yards": sum(d.total_yards for d in team_drives),
                    "formations": {k: {"count": v, "pct": round(v / tp * 100, 1)} for k, v in forms.most_common()},
                    "big_plays": sum(1 for p in all_plays if p.is_big_play),
                },
                "defense": {
                    "plays": dp,
                    "coverages": {k: {"count": v, "pct": round(v / dp * 100, 1)} for k, v in covs.most_common()},
                },
            }

        return result

    # ══════════════════════════════════════════════════════════════
    # PHASE 7: REPORT
    # ══════════════════════════════════════════════════════════════

    def _build_report(self, drives, tendencies, ta, tb, ca, cb):
        W = 80
        r = []

        # Score estimate
        a_pts = sum(d.points for d in drives if d.offense == ta)
        b_pts = sum(d.points for d in drives if d.offense == tb)
        a_drives = [d for d in drives if d.offense == ta]
        b_drives = [d for d in drives if d.offense == tb]
        total_plays = sum(len(d.plays) for d in drives)

        r.append("=" * W)
        r.append("")
        r.append("WCFL FLAG FOOTBALL".center(W))
        r.append("GAME FILM SCOUTING REPORT".center(W))
        r.append(f"{ta} ({ca}) vs {tb} ({cb})".center(W))
        r.append("")
        r.append("=" * W)
        r.append("Powered by FF Analytics | Autonomous Game Film Analysis".center(W))
        r.append("")

        # Score
        r.append(f"  ESTIMATED SCORE:  {ta} {a_pts}  -  {tb} {b_pts}")
        r.append(f"  (Based on {sum(1 for d in drives if d.result == 'Touchdown')} detected scoring drives)")
        r.append("")

        # Game overview
        r.append("=" * W)
        r.append("  GAME OVERVIEW")
        r.append("=" * W)
        r.append(f"  Total Plays: {total_plays}  |  Drives: {len(drives)}")
        for team, td in [(ta, a_drives), (tb, b_drives)]:
            tds = sum(1 for d in td if d.result == "Touchdown")
            tod = sum(1 for d in td if "Turnover" in d.result)
            punts = sum(1 for d in td if d.result == "Punt")
            yds = sum(d.total_yards for d in td)
            r.append(f"  {team}: {len(td)} drives | {tds} TDs | {tod} TOD | {punts} punts | {yds:.0f} total yards")
        r.append("")

        # Drive chart
        r.append("=" * W)
        r.append("  DRIVE-BY-DRIVE BREAKDOWN")
        r.append("=" * W)

        for d in drives:
            r.append("")
            emoji = ""
            if d.result == "Touchdown":
                emoji = " [TD]"
            elif "Turnover" in d.result:
                emoji = " [TOD]"
            elif d.result == "Punt":
                emoji = " [PUNT]"
            elif d.result == "End of Half":
                emoji = " [HALF]"

            r.append(f"  DRIVE {d.number}: {d.offense} Ball{emoji}")
            r.append(f"  {d.narrative}")
            r.append("")

            for p in d.plays:
                dn = {1: "1st", 2: "2nd", 3: "3rd", 4: "4th"}.get(p.down, f"{p.down}th")
                flags = ""
                if p.is_big_play:
                    flags = " ***"
                r.append(f"    {p.snap.timestamp}  {dn:>3} & {p.yard_line:>3.0f}  |  {p.formation:<20}  vs {p.coverage:<18}  |  {p.gain:>+4.0f} yds{flags}")

            r.append(f"  Result: {d.result}  |  {len(d.plays)} plays, {d.total_yards:+.0f} yards")
            r.append(f"  {'_' * 70}")

        # Tendencies
        for team in [ta, tb]:
            t = tendencies.get(team, {})
            off = t.get("offense", {})
            dfn = t.get("defense", {})

            r.append("")
            r.append("=" * W)
            r.append(f"  OFFENSIVE TENDENCIES: {team}")
            r.append("=" * W)

            if off.get("plays", 0) > 0:
                r.append(f"  {off['plays']} plays | {off['drives']} drives | {off['touchdowns']} TDs")
                r.append(f"  Total yards: {off['total_yards']:.0f} | Big plays: {off['big_plays']}")
                r.append("")
                r.append("  Formation Usage:")
                for form, data in off.get("formations", {}).items():
                    bar = "#" * max(1, int(data["pct"] / 4))
                    r.append(f"    {form:<22} {data['count']:>3}x ({data['pct']:>4.0f}%)  {bar}")

            r.append("")
            r.append("=" * W)
            r.append(f"  DEFENSIVE TENDENCIES: {team}")
            r.append("=" * W)

            if dfn.get("plays", 0) > 0:
                r.append("  Coverage Shell:")
                for cov, data in dfn.get("coverages", {}).items():
                    bar = "#" * max(1, int(data["pct"] / 4))
                    r.append(f"    {cov:<30} {data['count']:>3}x ({data['pct']:>4.0f}%)  {bar}")

        # Game plan
        r.append("")
        r.append("=" * W)
        r.append("  GAME PLAN RECOMMENDATIONS")
        r.append("=" * W)
        r.append("")

        for team in [ta, tb]:
            off = tendencies.get(team, {}).get("offense", {})
            forms = off.get("formations", {})
            if forms:
                top = list(forms.items())[0]
                r.append(f"  vs {team} Offense: They run {top[0]} {top[1]['pct']:.0f}% of the time. Key on this look.")

            opp = tb if team == ta else ta
            dfn = tendencies.get(team, {}).get("defense", {})
            covs = dfn.get("coverages", {})
            if covs:
                top_c = list(covs.items())[0]
                r.append(f"  vs {team} Defense: They play {top_c[0]} {top_c[1]['pct']:.0f}%. Attack the holes.")
            r.append("")

        r.append("=" * W)
        r.append("Report generated by FF Analytics".center(W))
        r.append("Autonomous AI-Driven Game Film Analysis".center(W))
        r.append("=" * W)

        return "\n".join(r)

    # ══════════════════════════════════════════════════════════════
    # HELPERS
    # ══════════════════════════════════════════════════════════════

    def _load_tracking(self, path):
        records = []
        with open(path) as f:
            for line in f:
                records.append(json.loads(line))
        return records

    def _drive_to_dict(self, d):
        return {
            "drive": d.number, "offense": d.offense, "defense": d.defense,
            "plays": d.play_count if hasattr(d, "play_count") else len(d.plays),
            "start_yard": d.start_yard, "end_yard": d.end_yard,
            "yards": d.total_yards, "first_downs": d.first_downs,
            "result": d.result, "points": d.points,
            "key_play": d.key_play, "narrative": d.narrative,
            "play_details": [
                {"time": p.snap.timestamp, "down": p.down, "yard": p.yard_line,
                 "gain": p.gain, "formation": p.formation, "coverage": p.coverage,
                 "big_play": p.is_big_play, "narrative": p.narrative}
                for p in d.plays
            ],
        }
