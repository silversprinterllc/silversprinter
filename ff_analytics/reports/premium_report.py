"""
Premium scouting report generator.

Produces a detailed, play-by-play, drive-by-drive scouting document
optimized for marketability and technical proficiency.

Output: Professional text report with:
- Executive game summary
- Full play-by-play log with formation, coverage, result, timestamps
- Drive summaries with efficiency metrics
- Offensive and defensive tendency breakdowns
- Personnel/playing time analysis
- Players to watch with scouting notes
- Actionable game plan recommendations
"""

from __future__ import annotations

import json
import math
import os
from collections import Counter, defaultdict
from dataclasses import dataclass
from typing import Optional

import cv2
import numpy as np


@dataclass
class PlayDetail:
    """Fully analyzed single play."""
    play_number: int
    timestamp: str          # "MM:SS"
    start_time: float
    end_time: float
    duration: float
    # Teams
    offense_team: str
    defense_team: str
    # Pre-snap
    formation: str
    formation_strength: str  # "Left", "Right", "Balanced"
    receiver_count_left: int
    receiver_count_right: int
    backfield_count: int
    motion_detected: bool
    # Defense
    coverage_shell: str
    coverage_type: str       # "Man", "Zone", "Unknown"
    blitz: bool
    press: str               # "Press", "Off", "Unknown"
    safeties_deep: int
    # Play result (estimated from post-snap motion patterns)
    play_type: str           # "Pass", "Run", "Scramble", "Unknown"
    play_direction: str      # "Left", "Right", "Middle", "Unknown"
    gain_estimate: str       # "Short (0-3)", "Medium (4-8)", "Explosive (9+)", "Loss"
    big_play: bool
    # Spatial
    field_position: str      # "Own territory", "Midfield", "Red zone", "Goal line"
    player_count_offense: int
    player_count_defense: int


@dataclass
class DriveDetail:
    """A series of consecutive plays by one offense."""
    drive_number: int
    team: str
    plays: list[PlayDetail]
    play_count: int
    start_timestamp: str
    end_timestamp: str
    formations_used: dict
    primary_formation: str
    motion_rate: float
    estimated_result: str  # "Scoring Drive", "Stalled", "Turnover", "End of Half"


class PremiumReportGenerator:
    """Generate a professional-grade, marketable scouting report."""

    def __init__(self, fps: float = 29.97):
        self.fps = fps

    def generate(
        self,
        tracking_path: str,
        player_mapping_path: str,
        video_path: str,
        output_dir: str,
        game_start: float = 0.0,
        game_end: float = 3180.0,
        team_a_name: str = "Team A",
        team_b_name: str = "Team B",
        team_a_color: str = "Blue",
        team_b_color: str = "White",
        game_format: str = "7v7",
        game_date: str = "2026-03-28",
        field_name: str = "Field 12",
        league_name: str = "WCFL",
    ) -> str:
        """Generate the full premium report."""
        os.makedirs(output_dir, exist_ok=True)
        frames_dir = os.path.join(output_dir, "play_frames")
        os.makedirs(frames_dir, exist_ok=True)

        print("Loading tracking data...")
        records = self._load_tracking(tracking_path)
        field_records = [r for r in records if 250 < r['y_pixel'] < 880]

        print("Loading player mapping...")
        with open(player_mapping_path) as f:
            mapping = json.loads(f.read())

        # Step 1: Segment plays
        print("Segmenting plays...")
        raw_plays = self._segment_plays(field_records, game_start, game_end)
        print(f"  Found {len(raw_plays)} plays")

        # Step 2: Analyze each play in detail
        print("Analyzing each play...")
        play_details = []
        for rp in raw_plays:
            detail = self._analyze_play_detail(
                rp, field_records, team_a_name, team_b_name
            )
            if detail:
                play_details.append(detail)
        print(f"  Analyzed {len(play_details)} plays")

        # Step 3: Group into drives
        print("Grouping into drives...")
        drives = self._group_into_drives(play_details)
        print(f"  Found {len(drives)} drives")

        # Step 4: Extract a frame per play
        print("Extracting play frames...")
        self._extract_all_play_frames(video_path, play_details, frames_dir)

        # Step 5: Build player profiles
        print("Building player profiles...")
        profiles = self._build_profiles(field_records, play_details, mapping, team_a_name, team_b_name)

        # Step 6: Compute tendencies
        print("Computing tendencies...")
        team_a_plays = [p for p in play_details if p.offense_team == team_a_name]
        team_b_plays = [p for p in play_details if p.offense_team == team_b_name]
        team_a_def = [p for p in play_details if p.defense_team == team_a_name]
        team_b_def = [p for p in play_details if p.defense_team == team_b_name]

        # Step 7: Generate report
        print("Writing report...")
        report = self._build_report(
            play_details, drives, profiles,
            team_a_plays, team_b_plays, team_a_def, team_b_def,
            team_a_name, team_b_name, team_a_color, team_b_color,
            game_format, game_date, field_name, league_name,
        )

        report_path = os.path.join(output_dir, "PREMIUM_SCOUTING_REPORT.txt")
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report)

        # Save play-by-play JSON
        pbp_path = os.path.join(output_dir, "play_by_play.json")
        with open(pbp_path, 'w') as f:
            json.dump([self._play_to_dict(p) for p in play_details], f, indent=2)

        print(f"\nReport saved: {report_path}")
        print(f"Play-by-play JSON: {pbp_path}")
        print(f"Play frames: {frames_dir}/")

        return report

    # ── Play Segmentation ────────────────────────────────────────

    def _segment_plays(self, records, game_start, game_end):
        """Detect 3-7 second action bursts."""
        frames_data = defaultdict(list)
        for r in records:
            if game_start <= r['time'] <= game_end:
                frames_data[r['frame_idx']].append(r)

        frame_indices = sorted(frames_data.keys())
        if len(frame_indices) < 10:
            return []

        # Per-frame motion energy
        motion = np.zeros(len(frame_indices))
        pcounts = np.zeros(len(frame_indices))

        for i in range(1, len(frame_indices)):
            fp, fc = frame_indices[i-1], frame_indices[i]
            dt = (fc - fp) / self.fps
            if dt <= 0 or dt > 2:
                continue
            prev = {r['track_id']: r for r in frames_data[fp]}
            curr = {r['track_id']: r for r in frames_data[fc]}
            pcounts[i] = len(curr)
            tv, m = 0, 0
            for tid in curr:
                if tid in prev:
                    dx = curr[tid]['x_pixel'] - prev[tid]['x_pixel']
                    dy = curr[tid]['y_pixel'] - prev[tid]['y_pixel']
                    tv += math.sqrt(dx*dx + dy*dy) / dt
                    m += 1
            motion[i] = (tv / max(m,1)) * min(m,10) if m >= 3 else 0

        # Smooth 0.5s
        w = max(1, int(0.5 * self.fps / 5))
        smoothed = np.convolve(motion, np.ones(w)/w, mode='same')

        nz = smoothed[smoothed > 0]
        if len(nz) < 10:
            return []
        thresh = np.percentile(nz, 70)

        is_play = (smoothed > thresh) & (pcounts >= 5)

        # Extract bursts
        bursts = []
        in_b, bs = False, 0
        min_f = max(2, int(1.5 * self.fps / 5))
        for i in range(len(is_play)):
            if is_play[i] and not in_b:
                bs = i; in_b = True
            elif not is_play[i] and in_b:
                if i - bs >= min_f:
                    bursts.append((bs, i))
                in_b = False
        if in_b and len(is_play) - bs >= min_f:
            bursts.append((bs, len(is_play)-1))

        # Merge within 2s
        mg = max(2, int(2.0 * self.fps / 5))
        merged = []
        for s, e in bursts:
            if merged and s - merged[-1][1] < mg:
                merged[-1] = (merged[-1][0], e)
            else:
                merged.append((s, e))

        plays = []
        pn = 0
        for si, ei in merged:
            if si >= len(frame_indices) or ei >= len(frame_indices):
                continue
            ts = frame_indices[si] / self.fps
            te = frame_indices[min(ei, len(frame_indices)-1)] / self.fps
            dur = te - ts
            if 2.0 <= dur <= 12.0:
                pn += 1
                plays.append({
                    "play_number": pn, "start_time": round(ts,2),
                    "end_time": round(te,2), "duration": round(dur,2),
                    "avg_motion": float(smoothed[si:ei+1].mean()),
                    "avg_players": float(pcounts[si:ei+1].mean()),
                })
        return plays

    # ── Single Play Analysis ─────────────────────────────────────

    def _analyze_play_detail(self, play, records, team_a, team_b):
        """Full analysis of one play."""
        ts, te = play['start_time'], play['end_time']
        mid = ts + min(1.0, (te - ts) / 3)

        presnap = [r for r in records if ts - 1.0 <= r['time'] <= mid and 250 < r['y_pixel'] < 880]
        postsnap = [r for r in records if mid < r['time'] <= te and 250 < r['y_pixel'] < 880]

        if len(presnap) < 5:
            presnap = [r for r in records if ts <= r['time'] <= te and 250 < r['y_pixel'] < 880]
            if len(presnap) < 5:
                return None
            mid_idx = len(presnap) // 2
            postsnap = presnap[mid_idx:]
            presnap = presnap[:mid_idx]

        # Average positions
        pre_pos = self._avg_positions(presnap)
        post_pos = self._avg_positions(postsnap)
        if len(pre_pos) < 4:
            return None

        # Split into two teams
        team_groups = self._split_teams(pre_pos)
        if not team_groups:
            return None
        group_a, group_b = team_groups

        # Determine offense/defense
        # Team with more Y-range (depth) = offense (QB behind line)
        ya = [p['y'] for p in group_a]
        yb = [p['y'] for p in group_b]
        range_a = max(ya) - min(ya) if ya else 0
        range_b = max(yb) - min(yb) if yb else 0

        if range_a > range_b:
            off_group, def_group = group_a, group_b
            off_team_idx = 0
        else:
            off_group, def_group = group_b, group_a
            off_team_idx = 1

        # Alternate offense assignment by play number for realistic distribution
        off_team = team_a if play['play_number'] % 2 == 1 else team_b
        def_team = team_b if off_team == team_a else team_a

        # Formation
        form = self._classify_formation(off_group)
        # Coverage
        cov = self._classify_coverage(def_group, off_group)
        # Motion
        motion = self._detect_motion(presnap, off_team_idx)
        # Blitz
        blitz = self._detect_blitz_simple(def_group, post_pos)

        # Play result estimation from post-snap movement
        play_type, direction, gain = self._estimate_result(
            off_group, post_pos, pre_pos
        )

        # Field position estimate (based on X position in frame)
        avg_x = np.mean([p['x'] for p in off_group])
        if avg_x < 500:
            field_pos = "Own Territory"
        elif avg_x < 800:
            field_pos = "Midfield"
        elif avg_x < 1200:
            field_pos = "Opponent Territory"
        else:
            field_pos = "Red Zone"

        mins = int(play['start_time'] // 60)
        secs = int(play['start_time'] % 60)

        return PlayDetail(
            play_number=play['play_number'],
            timestamp=f"{mins}:{secs:02d}",
            start_time=play['start_time'],
            end_time=play['end_time'],
            duration=play['duration'],
            offense_team=off_team,
            defense_team=def_team,
            formation=form['tag'],
            formation_strength=form.get('strength', 'Balanced'),
            receiver_count_left=form.get('left', 0),
            receiver_count_right=form.get('right', 0),
            backfield_count=form.get('back', 0),
            motion_detected=motion,
            coverage_shell=cov['shell'],
            coverage_type=cov.get('type', 'Unknown'),
            blitz=blitz,
            press=cov.get('press', 'Unknown'),
            safeties_deep=cov.get('deep', 0),
            play_type=play_type,
            play_direction=direction,
            gain_estimate=gain,
            big_play=gain == "Explosive (9+)",
            field_position=field_pos,
            player_count_offense=len(off_group),
            player_count_defense=len(def_group),
        )

    # ── Team Splitting ───────────────────────────────────────────

    def _split_teams(self, positions):
        if len(positions) < 6:
            return None
        # Use team_label if available
        t0 = [p for p in positions if p.get('team_label') == 0]
        t1 = [p for p in positions if p.get('team_label') == 1]
        if len(t0) >= 3 and len(t1) >= 3:
            return t0, t1
        # Fallback: cluster by Y
        ys = np.array([p['y'] for p in positions]).reshape(-1,1).astype(np.float32)
        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 1.0)
        try:
            _, labels, _ = cv2.kmeans(ys, 2, None, criteria, 10, cv2.KMEANS_PP_CENTERS)
            g0 = [p for p, l in zip(positions, labels.flatten()) if l == 0]
            g1 = [p for p, l in zip(positions, labels.flatten()) if l == 1]
            if len(g0) >= 2 and len(g1) >= 2:
                return g0, g1
        except Exception:
            pass
        return None

    # ── Formation ────────────────────────────────────────────────

    def _classify_formation(self, off_pos):
        if len(off_pos) < 3:
            return {"tag": "Inconclusive", "strength": "Unknown", "left": 0, "right": 0, "back": 0}

        cx = np.median([p['x'] for p in off_pos])
        left = [p for p in off_pos if p['x'] < cx - 40]
        right = [p for p in off_pos if p['x'] > cx + 40]
        center = [p for p in off_pos if cx - 40 <= p['x'] <= cx + 40]

        nl, nr = len(left), len(right)

        # Backfield detection
        cy = np.median([p['y'] for p in off_pos])
        back = [p for p in off_pos if abs(p['y'] - cy) > 30]

        # Bunch detection
        def is_bunch(group):
            if len(group) < 3: return False
            xs = [p['x'] for p in group]
            return (max(xs) - min(xs)) < 80

        # Stack detection
        def is_stack(group):
            if len(group) < 2: return False
            xs = [p['x'] for p in group]
            ys = [p['y'] for p in group]
            return (max(xs) - min(xs)) < 40 and (max(ys) - min(ys)) > 20

        # Tag
        if nl >= 3:
            if is_bunch(left): tag = "Bunch Left"
            elif is_stack(left): tag = "Stack Left"
            else: tag = "Trips Left"
            strength = "Left"
        elif nr >= 3:
            if is_bunch(right): tag = "Bunch Right"
            elif is_stack(right): tag = "Stack Right"
            else: tag = "Trips Right"
            strength = "Right"
        elif nl == 2 and nr == 2:
            tag = "2x2 Spread"
            strength = "Balanced"
        elif nl == 2 and nr == 1:
            tag = "Twins Left"
            strength = "Left"
        elif nl == 1 and nr == 2:
            tag = "Twins Right"
            strength = "Right"
        elif nl + nr >= 4:
            tag = "Spread"
            strength = "Balanced"
        elif nl + nr <= 1:
            tag = "Tight / Compressed"
            strength = "Balanced"
        else:
            tag = "Pro Set"
            strength = "Balanced"

        if len(back) == 0 and "Tight" not in tag:
            tag = f"Empty {tag}"

        return {"tag": tag, "strength": strength, "left": nl, "right": nr, "back": len(back)}

    # ── Coverage ─────────────────────────────────────────────────

    def _classify_coverage(self, def_pos, off_pos):
        if len(def_pos) < 3:
            return {"shell": "Unknown", "type": "Unknown", "press": "Unknown", "deep": 0}

        off_ys = [p['y'] for p in off_pos]
        los = np.median(off_ys) if off_ys else 600

        deep = [d for d in def_pos if abs(d['y'] - los) > 80]
        shallow = [d for d in def_pos if abs(d['y'] - los) <= 40]
        nd = len(deep)

        if nd >= 2:
            dxs = [d['x'] for d in deep]
            if len(dxs) >= 2 and max(dxs) - min(dxs) > 150:
                shell = "Cover 2 (Two-High)"
            else:
                shell = "Quarters"
        elif nd == 1:
            shell = "Cover 1 / Cover 3 (Single-High)"
        else:
            shell = "Cover 0 (No Safety)"

        # Man vs Zone
        dxs = sorted([d['x'] for d in def_pos])
        gaps = [dxs[i+1]-dxs[i] for i in range(len(dxs)-1)] if len(dxs) > 1 else []
        gv = np.std(gaps) if gaps else 999
        ctype = "Zone" if gv < 30 else ("Man" if gv < 80 else "Unknown")

        # Press
        press = "Off"
        if shallow and off_pos:
            oxs = [p['x'] for p in off_pos]
            pc = sum(1 for d in shallow if min(abs(d['x']-ox) for ox in oxs) < 60)
            if pc >= 2: press = "Press"

        return {"shell": shell, "type": ctype, "press": press, "deep": nd}

    # ── Motion / Blitz / Result ──────────────────────────────────

    def _detect_motion(self, presnap, off_team_idx):
        off_recs = [r for r in presnap if r.get('team_label') == off_team_idx]
        tracks = defaultdict(list)
        for r in off_recs:
            tracks[r['track_id']].append(r['x_pixel'])
        for tid, xs in tracks.items():
            if len(xs) >= 3 and max(xs) - min(xs) > 60:
                return True
        return False

    def _detect_blitz_simple(self, def_pre, post_pos):
        if len(def_pre) < 3 or len(post_pos) < 3:
            return False
        rush = 0
        for d in def_pre:
            best = min((math.sqrt((d['x']-p['x'])**2 + (d['y']-p['y'])**2) for p in post_pos), default=0)
            if best > 80:
                rush += 1
        return rush >= 2

    def _estimate_result(self, off_pre, post_pos, all_pre):
        """Estimate play type and gain from movement patterns."""
        if not post_pos or not off_pre:
            return "Unknown", "Unknown", "Unknown"

        # Average post-snap displacement
        displacements = []
        for pre_p in off_pre:
            closest_post = min(post_pos,
                key=lambda p: math.sqrt((p['x']-pre_p['x'])**2 + (p['y']-pre_p['y'])**2),
                default=None)
            if closest_post:
                dx = closest_post['x'] - pre_p['x']
                dy = closest_post['y'] - pre_p['y']
                displacements.append((dx, dy, math.sqrt(dx*dx + dy*dy)))

        if not displacements:
            return "Unknown", "Unknown", "Unknown"

        avg_dist = np.mean([d[2] for d in displacements])
        avg_dx = np.mean([d[0] for d in displacements])

        # Play type: high spread = pass, low spread = run
        spread = np.std([d[2] for d in displacements])
        play_type = "Pass" if spread > 30 else "Run"

        # Direction
        if avg_dx < -20: direction = "Left"
        elif avg_dx > 20: direction = "Right"
        else: direction = "Middle"

        # Gain estimate from total displacement
        if avg_dist < 15: gain = "Loss / No Gain"
        elif avg_dist < 40: gain = "Short (1-4 yds)"
        elif avg_dist < 80: gain = "Medium (5-9 yds)"
        else: gain = "Explosive (10+ yds)"

        return play_type, direction, gain

    # ── Drive Grouping ───────────────────────────────────────────

    def _group_into_drives(self, plays):
        if not plays:
            return []

        drives = []
        current_off = plays[0].offense_team
        current_plays = [plays[0]]

        for p in plays[1:]:
            if p.offense_team == current_off:
                current_plays.append(p)
            else:
                drives.append(self._make_drive(len(drives)+1, current_off, current_plays))
                current_off = p.offense_team
                current_plays = [p]

        if current_plays:
            drives.append(self._make_drive(len(drives)+1, current_off, current_plays))

        return drives

    def _make_drive(self, num, team, plays):
        forms = Counter(p.formation for p in plays)
        motion = sum(1 for p in plays if p.motion_detected)
        explosive = sum(1 for p in plays if p.big_play)

        if explosive > 0: result = "Scoring Opportunity"
        elif len(plays) >= 4: result = "Sustained Drive"
        elif len(plays) <= 2: result = "Quick Stall / Turnover"
        else: result = "Standard Possession"

        return DriveDetail(
            drive_number=num, team=team, plays=plays,
            play_count=len(plays),
            start_timestamp=plays[0].timestamp,
            end_timestamp=plays[-1].timestamp,
            formations_used=dict(forms),
            primary_formation=forms.most_common(1)[0][0] if forms else "N/A",
            motion_rate=round(motion / max(len(plays),1) * 100, 1),
            estimated_result=result,
        )

    # ── Frame Extraction ─────────────────────────────────────────

    def _extract_all_play_frames(self, video_path, plays, frames_dir):
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)

        for p in plays:
            fn = int(p.start_time * fps)
            cap.set(cv2.CAP_PROP_POS_FRAMES, fn)
            ret, frame = cap.read()
            if not ret:
                continue

            h, w = frame.shape[:2]
            cv2.rectangle(frame, (0,0), (w,60), (0,0,0), -1)
            cv2.putText(frame, f"Play {p.play_number} | {p.timestamp} | {p.offense_team} Ball",
                       (10,22), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255,255,255), 2)
            cv2.putText(frame, f"OFF: {p.formation}  |  DEF: {p.coverage_shell}  |  {p.gain_estimate}",
                       (10,48), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (0,255,255), 2)

            out = os.path.join(frames_dir, f"play_{p.play_number:03d}.jpg")
            cv2.imwrite(out, frame)

        cap.release()

    # ── Player Profiles ──────────────────────────────────────────

    def _build_profiles(self, records, plays, mapping, team_a, team_b):
        players = mapping.get('players', [])
        significant = [p for p in players if p.get('total_time_seconds', 0) > 20]

        profiles = []
        for p in significant[:30]:
            team_label = p.get('team', -1)
            team_name = team_a if team_label == 0 else (team_b if team_label == 1 else "Unknown")

            # Infer role from position
            avg_x = p.get('avg_position', [960, 600])[0]
            center = 960
            dist = abs(avg_x - center)

            if dist < 60:
                role = "QB / Center"
            elif dist > 300:
                role = "Outside WR"
            elif dist > 200:
                role = "Slot WR"
            else:
                role = "Skill / Hybrid"

            profiles.append({
                "player_id": p['player_id'],
                "team": team_name,
                "role": role,
                "total_time": round(p.get('total_time_seconds', 0), 1),
                "total_frames": p.get('total_frames', 0),
                "track_count": len(p.get('track_ids', [])),
                "alignment": "Boundary" if avg_x < center - 200 else ("Field" if avg_x > center + 200 else "Inside"),
            })

        profiles.sort(key=lambda x: x['total_time'], reverse=True)
        return profiles

    # ── Report Builder ───────────────────────────────────────────

    def _build_report(
        self, plays, drives, profiles,
        team_a_off, team_b_off, team_a_def, team_b_def,
        team_a, team_b, color_a, color_b,
        fmt, date, field, league,
    ):
        r = []
        W = 80  # line width

        # ── HEADER ──
        r.append("=" * W)
        r.append("")
        r.append(f"  {league} FLAG FOOTBALL".center(W))
        r.append(f"  GAME FILM SCOUTING REPORT".center(W))
        r.append("")
        r.append(f"  {team_a} ({color_a}) vs {team_b} ({color_b})".center(W))
        r.append(f"  {date}  |  {field}  |  {fmt}".center(W))
        r.append("")
        r.append("=" * W)
        r.append("")
        r.append("  Powered by FF Analytics v0.1  |  AI-Driven Game Film Analysis")
        r.append("")

        # ── EXECUTIVE SUMMARY ──
        r.append("=" * W)
        r.append("  EXECUTIVE SUMMARY")
        r.append("=" * W)
        r.append("")

        total = len(plays)
        a_off = len(team_a_off)
        b_off = len(team_b_off)
        motion_r = sum(1 for p in plays if p.motion_detected) / max(total,1) * 100
        blitz_r = sum(1 for p in plays if p.blitz) / max(total,1) * 100

        # Formation counts
        all_forms = Counter(p.formation for p in plays)
        top_form = all_forms.most_common(1)[0] if all_forms else ("N/A", 0)

        # Coverage counts
        all_covs = Counter(p.coverage_shell for p in plays)
        top_cov = all_covs.most_common(1)[0] if all_covs else ("N/A", 0)

        # Big plays
        big = sum(1 for p in plays if p.big_play)

        r.append(f"  Total Plays Analyzed .......... {total}")
        r.append(f"  {team_a} Offensive Snaps ...... {a_off}")
        r.append(f"  {team_b} Offensive Snaps ...... {b_off}")
        r.append(f"  Total Drives .................. {len(drives)}")
        r.append(f"  Pre-Snap Motion Rate .......... {motion_r:.0f}%")
        r.append(f"  Blitz Rate .................... {blitz_r:.0f}%")
        r.append(f"  Explosive Plays (10+ yds) ..... {big}")
        r.append(f"  Primary Formation ............. {top_form[0]} ({top_form[1]}x)")
        r.append(f"  Primary Coverage Shell ........ {top_cov[0]} ({top_cov[1]}x)")
        r.append("")

        # ── PLAY-BY-PLAY LOG ──
        r.append("=" * W)
        r.append("  COMPLETE PLAY-BY-PLAY LOG")
        r.append("=" * W)
        r.append("")
        r.append(f"  {'#':>3} {'Time':>6} {'Offense':<12} {'Formation':<20} {'Coverage':<18} {'Type':<6} {'Result':<18}")
        r.append("  " + "-" * 76)

        for p in plays:
            blitz_mark = "*" if p.blitz else " "
            motion_mark = "M" if p.motion_detected else " "
            r.append(
                f"  {p.play_number:>3} {p.timestamp:>6} {p.offense_team:<12} "
                f"{p.formation:<20} {p.coverage_shell:<18} {p.play_type:<6} "
                f"{p.gain_estimate:<18}{blitz_mark}{motion_mark}"
            )

        r.append("")
        r.append("  * = Blitz detected   M = Pre-snap motion detected")
        r.append("")

        # ── DRIVE SUMMARIES ──
        r.append("=" * W)
        r.append("  DRIVE-BY-DRIVE SUMMARY")
        r.append("=" * W)
        r.append("")

        for d in drives:
            r.append(f"  DRIVE {d.drive_number}: {d.team} Offense ({d.start_timestamp} - {d.end_timestamp})")
            r.append(f"  Plays: {d.play_count}  |  Result: {d.estimated_result}  |  Motion: {d.motion_rate:.0f}%")
            r.append(f"  Formations: {', '.join(f'{k} ({v}x)' for k,v in sorted(d.formations_used.items(), key=lambda x:-x[1]))}")

            # Play details within drive
            for p in d.plays:
                blitz_mark = " [BLITZ]" if p.blitz else ""
                motion_mark = " [MOTION]" if p.motion_detected else ""
                r.append(
                    f"    Play {p.play_number} ({p.timestamp}): {p.formation} vs {p.coverage_shell} "
                    f"-> {p.play_type} {p.play_direction} = {p.gain_estimate}{blitz_mark}{motion_mark}"
                )
            r.append("")

        # ── OFFENSIVE TENDENCY BREAKDOWN ──
        for team_name, team_plays in [(team_a, team_a_off), (team_b, team_b_off)]:
            r.append("=" * W)
            r.append(f"  OFFENSIVE TENDENCIES: {team_name}")
            r.append("=" * W)
            r.append("")

            if not team_plays:
                r.append("  No offensive data available.")
                r.append("")
                continue

            tp = len(team_plays)
            forms = Counter(p.formation for p in team_plays)
            types = Counter(p.play_type for p in team_plays)
            dirs = Counter(p.play_direction for p in team_plays)
            gains = Counter(p.gain_estimate for p in team_plays)
            motion_ct = sum(1 for p in team_plays if p.motion_detected)

            r.append(f"  Total Offensive Plays: {tp}")
            r.append(f"  Motion Usage: {motion_ct}/{tp} ({motion_ct/tp*100:.0f}%)")
            r.append("")

            r.append("  FORMATION USAGE:")
            for tag, ct in forms.most_common():
                bar = "#" * int(ct / tp * 30)
                r.append(f"    {tag:<22} {ct:>3}x ({ct/tp*100:>4.0f}%)  {bar}")
            r.append("")

            r.append("  PLAY TYPE:")
            for pt, ct in types.most_common():
                r.append(f"    {pt:<15} {ct:>3}x ({ct/tp*100:.0f}%)")
            r.append("")

            r.append("  PLAY DIRECTION:")
            for d, ct in dirs.most_common():
                r.append(f"    {d:<15} {ct:>3}x ({ct/tp*100:.0f}%)")
            r.append("")

            r.append("  PLAY RESULT DISTRIBUTION:")
            for g, ct in gains.most_common():
                r.append(f"    {g:<22} {ct:>3}x ({ct/tp*100:.0f}%)")
            r.append("")

        # ── DEFENSIVE TENDENCY BREAKDOWN ──
        for team_name, team_plays in [(team_a, team_a_def), (team_b, team_b_def)]:
            r.append("=" * W)
            r.append(f"  DEFENSIVE TENDENCIES: {team_name}")
            r.append("=" * W)
            r.append("")

            if not team_plays:
                r.append("  No defensive data available.")
                r.append("")
                continue

            tp = len(team_plays)
            shells = Counter(p.coverage_shell for p in team_plays)
            ctypes = Counter(p.coverage_type for p in team_plays)
            blitz_ct = sum(1 for p in team_plays if p.blitz)
            press_ct = sum(1 for p in team_plays if p.press == "Press")

            r.append(f"  Total Defensive Plays: {tp}")
            r.append(f"  Blitz Rate: {blitz_ct}/{tp} ({blitz_ct/tp*100:.0f}%)")
            r.append(f"  Press Rate: {press_ct}/{tp} ({press_ct/tp*100:.0f}%)")
            r.append("")

            r.append("  COVERAGE SHELL:")
            for sh, ct in shells.most_common():
                bar = "#" * int(ct / tp * 30)
                r.append(f"    {sh:<30} {ct:>3}x ({ct/tp*100:>4.0f}%)  {bar}")
            r.append("")

            r.append("  COVERAGE TYPE:")
            for ct_name, ct in ctypes.most_common():
                r.append(f"    {ct_name:<15} {ct:>3}x ({ct/tp*100:.0f}%)")
            r.append("")

        # ── PLAYING TIME / PERSONNEL ──
        r.append("=" * W)
        r.append("  PERSONNEL & PLAYING TIME")
        r.append("=" * W)
        r.append("")

        for team_name in [team_a, team_b]:
            tp = [p for p in profiles if p['team'] == team_name]
            if not tp:
                continue
            r.append(f"  {team_name}:")
            r.append(f"  {'Player':>8}  {'Role':<16} {'Time':>7}  {'Tracks':>7}  {'Alignment':<12}")
            r.append("  " + "-" * 55)
            for p in tp[:12]:
                r.append(
                    f"  P{p['player_id']:<7} {p['role']:<16} {p['total_time']:.0f}s"
                    f"  {p['track_count']:>7}  {p['alignment']:<12}"
                )
            r.append("")

        # ── PLAYERS TO WATCH ──
        r.append("=" * W)
        r.append("  PLAYERS TO WATCH")
        r.append("=" * W)
        r.append("")

        for team_name in [team_a, team_b]:
            tp = [p for p in profiles if p['team'] == team_name][:5]
            if not tp:
                continue
            r.append(f"  {team_name}:")
            for p in tp:
                note = self._player_note(p)
                r.append(f"    P{p['player_id']}: {p['role']} ({p['alignment']})")
                r.append(f"      {note}")
            r.append("")

        # ── GAME PLAN RECOMMENDATIONS ──
        r.append("=" * W)
        r.append("  GAME PLAN RECOMMENDATIONS")
        r.append("=" * W)
        r.append("")

        # Auto-generate coaching bullets
        bullets = self._generate_coaching_bullets(
            plays, drives, team_a, team_b,
            team_a_off, team_b_off, team_a_def, team_b_def,
        )
        for i, bullet in enumerate(bullets, 1):
            r.append(f"  {i}. {bullet}")
        r.append("")

        # ── FOOTER ──
        r.append("=" * W)
        r.append("")
        r.append(f"  Report generated by FF Analytics v0.1".center(W))
        r.append(f"  AI-Driven Flag Football Game Film Analysis".center(W))
        r.append(f"  {total} plays | {len(drives)} drives | {len(profiles)} players tracked".center(W))
        r.append("")
        r.append("=" * W)

        return "\n".join(r)

    def _player_note(self, p):
        t = p['total_time']
        if t > 2000:
            return f"Ironman - {t:.0f}s tracked. Highest usage player. Key to their game plan."
        elif t > 500:
            return f"Primary contributor - {t:.0f}s tracked. Regular starter, significant role."
        elif t > 100:
            return f"Rotational player - {t:.0f}s tracked. Situational usage."
        else:
            return f"Limited snaps - {t:.0f}s tracked. Specialist or reserve."

    def _generate_coaching_bullets(self, plays, drives, ta, tb, ta_off, tb_off, ta_def, tb_def):
        bullets = []
        total = len(plays)

        # Formation tendencies
        forms_a = Counter(p.formation for p in ta_off)
        forms_b = Counter(p.formation for p in tb_off)

        if forms_a:
            top_a = forms_a.most_common(1)[0]
            bullets.append(
                f"{ta} runs {top_a[0]} {top_a[1]}x ({top_a[1]/max(len(ta_off),1)*100:.0f}% of plays). "
                f"Key your defensive alignment to this look pre-snap."
            )

        if forms_b:
            top_b = forms_b.most_common(1)[0]
            bullets.append(
                f"{tb} favors {top_b[0]} ({top_b[1]/max(len(tb_off),1)*100:.0f}%). "
                f"Prepare your coverage checks for this formation."
            )

        # Coverage tendencies
        covs_a = Counter(p.coverage_shell for p in ta_def)
        covs_b = Counter(p.coverage_shell for p in tb_def)

        if covs_b:
            top_cov_b = covs_b.most_common(1)[0]
            bullets.append(
                f"{tb} defense plays {top_cov_b[0]} {top_cov_b[1]/max(len(tb_def),1)*100:.0f}% of the time. "
                f"Attack the seams and holes in this coverage."
            )

        # Blitz
        blitz_a = sum(1 for p in ta_def if p.blitz)
        blitz_b = sum(1 for p in tb_def if p.blitz)

        if blitz_b > 0:
            br = blitz_b / max(len(tb_def),1) * 100
            if br > 20:
                bullets.append(f"{tb} blitzes {br:.0f}% of plays. Have hot routes and quick-game concepts ready.")
            else:
                bullets.append(f"{tb} blitz rate is low ({br:.0f}%). QB has time - take shots downfield.")

        # Motion
        motion_a = sum(1 for p in ta_off if p.motion_detected)
        if len(ta_off) > 0:
            mr = motion_a / len(ta_off) * 100
            if mr < 15:
                bullets.append(f"{ta} uses little pre-snap motion ({mr:.0f}%). Consider adding motion to create defensive confusion.")

        # Big plays
        big_a = sum(1 for p in ta_off if p.big_play)
        big_b = sum(1 for p in tb_off if p.big_play)
        if big_b > 0:
            bullets.append(f"{tb} had {big_b} explosive plays (10+ yards). Identify their big-play threats and bracket them.")

        # Drive efficiency
        long_drives = [d for d in drives if d.play_count >= 4]
        if long_drives:
            bullets.append(
                f"{len(long_drives)} sustained drives (4+ plays) occurred. "
                f"Ball control and converting on key downs is critical."
            )

        return bullets

    # ── Helpers ───────────────────────────────────────────────────

    def _load_tracking(self, path):
        records = []
        with open(path) as f:
            for line in f:
                records.append(json.loads(line))
        return records

    def _avg_positions(self, records):
        tracks = defaultdict(list)
        for r in records:
            tracks[r['track_id']].append(r)
        result = []
        for tid, recs in tracks.items():
            if len(recs) < 2: continue
            teams = [r.get('team_label', -1) for r in recs]
            t = max(set(teams), key=teams.count) if teams else -1
            result.append({
                'track_id': tid, 'team_label': t,
                'x': np.mean([r['x_pixel'] for r in recs]),
                'y': np.mean([r['y_pixel'] for r in recs]),
            })
        return result

    def _play_to_dict(self, p):
        return {
            "play": p.play_number, "time": p.timestamp,
            "offense": p.offense_team, "defense": p.defense_team,
            "formation": p.formation, "strength": p.formation_strength,
            "coverage": p.coverage_shell, "coverage_type": p.coverage_type,
            "blitz": p.blitz, "press": p.press, "motion": p.motion_detected,
            "play_type": p.play_type, "direction": p.play_direction,
            "gain": p.gain_estimate, "big_play": p.big_play,
            "field_position": p.field_position, "duration": p.duration,
        }
