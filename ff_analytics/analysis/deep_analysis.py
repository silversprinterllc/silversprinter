"""
Deep game analysis — produces marketable scouting reports.

Takes raw tracking data and produces:
- Accurate play segmentation with pre-snap/post-snap windows
- Offensive formation classification per play
- Defensive shell/scheme detection per play
- Per-player playing time with role inference
- Tendency breakdowns by down-equivalent situations
- Players to watch / matchup recommendations
- Full formatted scouting report
"""

from __future__ import annotations

import json
import math
import os
import sys
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

import cv2
import numpy as np


# ── Data Structures ──────────────────────────────────────────────

@dataclass
class AnalyzedPlay:
    play_number: int
    start_time: float
    end_time: float
    duration: float
    # Team positions at pre-snap (last 1s before play starts)
    team0_presnap: list[dict]  # [{track_id, x, y}]
    team1_presnap: list[dict]
    # Team positions post-snap (first 2s of play)
    team0_postsnap: list[dict]
    team1_postsnap: list[dict]
    # Derived
    offense_team: int  # 0 or 1
    defense_team: int
    formation_tag: str
    formation_detail: dict
    coverage_shell: str
    coverage_detail: dict
    play_direction: str  # "left_to_right" or "right_to_left"
    motion_detected: bool
    blitz_detected: bool
    avg_motion_energy: float


@dataclass
class PlayerProfile:
    player_id: int
    team: int
    track_ids: list[int]
    total_frames: int
    total_time_seconds: float
    avg_x: float
    avg_y: float
    # Role inference
    inferred_role: str  # "QB", "WR", "C", "S", "CB", "Rusher", etc.
    role_confidence: float
    # Playing time
    plays_on_field: int
    offensive_plays: int
    defensive_plays: int
    snap_percentage: float
    # Spatial profile
    avg_presnap_x: float
    avg_presnap_y: float
    position_variance: float  # how much they move around pre-snap
    alignment_tendency: str  # "boundary", "field", "slot", "backfield", "deep", "box"


class DeepGameAnalyzer:
    """Production-quality game film analysis."""

    def __init__(self, fps: float = 29.97):
        self.fps = fps

    def analyze_game(
        self,
        tracking_path: str,
        player_mapping_path: str,
        video_path: str,
        output_dir: str,
        game_start: float = 0.0,
        game_end: float = 3180.0,
        team0_name: str = "Team A",
        team1_name: str = "Team B",
        team0_color: str = "blue",
        team1_color: str = "white",
        game_format: str = "7v7",
    ) -> dict:
        """Run full deep analysis on a game.

        Returns the complete analysis dict.
        """
        os.makedirs(output_dir, exist_ok=True)

        # Load data
        print("Loading tracking data...")
        records = self._load_tracking(tracking_path)
        field_records = [r for r in records if 250 < r['y_pixel'] < 880]

        print("Loading player mapping...")
        with open(player_mapping_path) as f:
            mapping = json.loads(f.read())

        track_to_player = {int(k): v for k, v in mapping['track_to_player'].items()}
        player_data = {p['player_id']: p for p in mapping['players']}

        # Step 1: Better play segmentation
        print("\n=== PLAY SEGMENTATION ===")
        plays = self._segment_plays_precise(field_records, game_start, game_end)
        print(f"Detected {len(plays)} plays")

        # Step 2: For each play, extract pre-snap and post-snap positions
        print("\n=== ANALYZING PLAYS ===")
        analyzed_plays = []
        for play in plays:
            ap = self._analyze_single_play(
                play, field_records, track_to_player
            )
            if ap:
                analyzed_plays.append(ap)

        print(f"Successfully analyzed {len(analyzed_plays)} plays")

        # Step 3: Build player profiles
        print("\n=== BUILDING PLAYER PROFILES ===")
        profiles = self._build_player_profiles(
            analyzed_plays, player_data, len(plays)
        )
        print(f"Built {len(profiles)} player profiles")

        # Step 4: Compute tendencies
        print("\n=== COMPUTING TENDENCIES ===")
        offense_tendencies = self._compute_offense_tendencies(analyzed_plays)
        defense_tendencies = self._compute_defense_tendencies(analyzed_plays)

        # Step 5: Extract key frames for the report
        print("\n=== EXTRACTING KEY FRAMES ===")
        self._extract_key_frames(video_path, analyzed_plays, output_dir, game_start)

        # Step 6: Generate report
        print("\n=== GENERATING REPORT ===")
        report = self._generate_scouting_report(
            analyzed_plays, profiles, offense_tendencies, defense_tendencies,
            team0_name, team1_name, team0_color, team1_color, game_format,
        )

        # Save everything
        report_path = os.path.join(output_dir, "SCOUTING_REPORT.txt")
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report)

        plays_json = os.path.join(output_dir, "plays_analyzed.json")
        with open(plays_json, 'w') as f:
            json.dump([self._play_to_dict(p) for p in analyzed_plays], f, indent=2)

        profiles_json = os.path.join(output_dir, "player_profiles.json")
        with open(profiles_json, 'w') as f:
            json.dump([self._profile_to_dict(p) for p in profiles], f, indent=2)

        tendencies_json = os.path.join(output_dir, "tendencies.json")
        with open(tendencies_json, 'w') as f:
            json.dump({
                "offense": offense_tendencies,
                "defense": defense_tendencies,
            }, f, indent=2)

        print(f"\n=== DONE ===")
        print(f"Report: {report_path}")
        print(report)

        return {
            "plays": len(analyzed_plays),
            "profiles": len(profiles),
            "report_path": report_path,
        }

    # ── Play Segmentation ────────────────────────────────────────

    def _segment_plays_precise(
        self, records: list[dict], game_start: float, game_end: float
    ) -> list[dict]:
        """Segment plays using velocity-based motion energy.

        Flag football play pattern:
        - Action burst: 3-7 seconds of high motion (the actual play)
        - Reset/huddle: 10-30 seconds of low/medium motion
        - This repeats all game

        Algorithm:
        1. Compute per-frame aggregate velocity of on-field players.
        2. Smooth with 0.5s window (tight — detect sharp bursts).
        3. Use high threshold (75th percentile) to find action bursts.
        4. Merge bursts within 2s (same play, brief lull).
        5. Keep plays 2-12s duration (flag play range).
        6. Discard anything longer (not a real play — camera pan/huddle).
        """
        # Group by frame
        frames: dict[int, list[dict]] = defaultdict(list)
        for r in records:
            if game_start <= r['time'] <= game_end:
                frames[r['frame_idx']].append(r)

        frame_indices = sorted(frames.keys())
        if len(frame_indices) < 10:
            return []

        # Compute motion energy
        motion = np.zeros(len(frame_indices))
        player_counts = np.zeros(len(frame_indices))

        for i in range(1, len(frame_indices)):
            f_prev = frame_indices[i - 1]
            f_curr = frame_indices[i]
            dt = (f_curr - f_prev) / self.fps
            if dt <= 0 or dt > 2:
                continue

            prev_tracks = {r['track_id']: r for r in frames[f_prev]}
            curr_tracks = {r['track_id']: r for r in frames[f_curr]}
            player_counts[i] = len(curr_tracks)

            total_v = 0
            matched = 0
            for tid in curr_tracks:
                if tid in prev_tracks:
                    dx = curr_tracks[tid]['x_pixel'] - prev_tracks[tid]['x_pixel']
                    dy = curr_tracks[tid]['y_pixel'] - prev_tracks[tid]['y_pixel']
                    v = math.sqrt(dx*dx + dy*dy) / dt
                    total_v += v
                    matched += 1

            # Normalize by player count to get avg velocity
            motion[i] = (total_v / max(matched, 1)) * min(matched, 10) if matched >= 3 else 0

        # Tight smoothing (0.5s window)
        window = max(1, int(0.5 * self.fps / 5))
        kernel = np.ones(window) / window
        smoothed = np.convolve(motion, kernel, mode='same')

        # High threshold — we want sharp action bursts
        nonzero = smoothed[smoothed > 0]
        if len(nonzero) < 10:
            return []
        threshold = np.percentile(nonzero, 70)
        is_active = smoothed > threshold

        # Also require minimum player count (at least 5 people on screen)
        has_players = player_counts >= 5
        is_play = is_active & has_players

        # Extract bursts and merge nearby ones (within 2s gap)
        merge_gap = max(2, int(2.0 * self.fps / 5))  # 2s
        min_burst_frames = max(2, int(1.5 * self.fps / 5))  # 1.5s

        # Find raw bursts
        raw_bursts = []
        in_burst = False
        burst_start = 0

        for i in range(len(is_play)):
            if is_play[i] and not in_burst:
                burst_start = i
                in_burst = True
            elif not is_play[i] and in_burst:
                if i - burst_start >= min_burst_frames:
                    raw_bursts.append((burst_start, i))
                in_burst = False

        if in_burst and len(is_play) - burst_start >= min_burst_frames:
            raw_bursts.append((burst_start, len(is_play) - 1))

        # Merge bursts that are close together
        merged = []
        for start, end in raw_bursts:
            if merged and start - merged[-1][1] < merge_gap:
                merged[-1] = (merged[-1][0], end)
            else:
                merged.append((start, end))

        # Convert to play objects, filter by duration
        plays = []
        play_num = 0
        for start_idx, end_idx in merged:
            if start_idx >= len(frame_indices) or end_idx >= len(frame_indices):
                continue
            t_start = frame_indices[start_idx] / self.fps
            t_end = frame_indices[min(end_idx, len(frame_indices)-1)] / self.fps
            duration = t_end - t_start

            # Flag football plays are 2-12 seconds
            if 2.0 <= duration <= 12.0:
                play_num += 1
                plays.append({
                    "play_number": play_num,
                    "start_time": round(t_start, 2),
                    "end_time": round(t_end, 2),
                    "duration": round(duration, 2),
                    "start_frame_idx": start_idx,
                    "end_frame_idx": end_idx,
                    "avg_motion": float(smoothed[start_idx:end_idx+1].mean()),
                    "avg_players": float(player_counts[start_idx:end_idx+1].mean()),
                })

        return plays

    # ── Single Play Analysis ─────────────────────────────────────

    def _analyze_single_play(
        self,
        play: dict,
        records: list[dict],
        track_to_player: dict[int, int],
    ) -> Optional[AnalyzedPlay]:
        """Analyze one play: formation, coverage, direction."""
        t_start = play['start_time']
        t_end = play['end_time']
        # Use a wider window: look at the play itself for pre-snap (first 1s)
        # and mid-play for post-snap (1s-3s)
        window_start = t_start - 1.0
        window_end = min(t_end, t_start + 5.0)

        # Get all records during the play window
        play_records = [r for r in records if window_start <= r['time'] <= window_end
                        and 250 < r['y_pixel'] < 880]

        if len(play_records) < 10:
            return None

        # Split into pre-snap (first portion) and post-snap (latter)
        mid_time = t_start + min(1.0, (t_end - t_start) / 3)
        presnap = [r for r in play_records if r['time'] <= mid_time]
        postsnap = [r for r in play_records if r['time'] > mid_time]

        if len(presnap) < 5:
            presnap = play_records[:len(play_records)//2]
            postsnap = play_records[len(play_records)//2:]

        # Average positions per track
        presnap_positions = self._avg_positions_by_track(presnap)
        postsnap_positions = self._avg_positions_by_track(postsnap)

        if len(presnap_positions) < 4:
            return None

        # Split by team — use team_label if available, else cluster by X position
        team0_pre = [p for p in presnap_positions if p.get('team_label') == 0]
        team1_pre = [p for p in presnap_positions if p.get('team_label') == 1]
        unassigned = [p for p in presnap_positions if p.get('team_label', -1) < 0]

        # If not enough team-labeled players, use spatial clustering
        if len(team0_pre) < 3 or len(team1_pre) < 3:
            # K-means on Y position (teams face each other across the LOS)
            all_positions = presnap_positions
            if len(all_positions) >= 6:
                ys = np.array([p['y'] for p in all_positions]).reshape(-1, 1).astype(np.float32)
                criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 1.0)
                _, labels, _ = cv2.kmeans(ys, 2, None, criteria, 10, cv2.KMEANS_PP_CENTERS)
                team0_pre = [p for p, l in zip(all_positions, labels.flatten()) if l == 0]
                team1_pre = [p for p, l in zip(all_positions, labels.flatten()) if l == 1]
            else:
                # Fallback: split by median Y
                median_y = np.median([p['y'] for p in all_positions])
                team0_pre = [p for p in all_positions if p['y'] <= median_y]
                team1_pre = [p for p in all_positions if p['y'] > median_y]

        team0_post = [p for p in postsnap_positions if p.get('team_label') == 0]
        team1_post = [p for p in postsnap_positions if p.get('team_label') == 1]
        if len(team0_post) < 2 or len(team1_post) < 2:
            team0_post = team0_pre  # fallback
            team1_post = team1_pre

        if len(team0_pre) < 2 or len(team1_pre) < 2:
            return None

        # Determine play direction and offense/defense
        # Offense = team that is more clustered (huddle → line up)
        # In flag football, offense typically lines up in a tighter formation
        t0_spread_x = np.std([p['x'] for p in team0_pre]) if team0_pre else 0
        t1_spread_x = np.std([p['x'] for p in team1_pre]) if team1_pre else 0

        # Also check who has a "backfield" player (QB is deeper)
        t0_y_range = max(p['y'] for p in team0_pre) - min(p['y'] for p in team0_pre) if team0_pre else 0
        t1_y_range = max(p['y'] for p in team1_pre) - min(p['y'] for p in team1_pre) if team1_pre else 0

        # Team with LESS y-range pre-snap is likely defense (more lateral, less depth)
        # Team with MORE y-range has QB behind the line = offense
        if t0_y_range > t1_y_range:
            offense_team = 0
            defense_team = 1
        else:
            offense_team = 1
            defense_team = 0

        off_pre = team0_pre if offense_team == 0 else team1_pre
        def_pre = team0_pre if defense_team == 0 else team1_pre
        off_post = team0_post if offense_team == 0 else team1_post
        def_post = team0_post if defense_team == 0 else team1_post

        # Classify formation
        formation = self._classify_formation_7v7(off_pre)

        # Classify coverage
        coverage = self._classify_coverage_shell(def_pre, off_pre)

        # Detect motion (pre-snap lateral movement)
        motion = self._detect_presnap_motion(presnap, offense_team)

        # Detect blitz (post-snap rush beyond 1 defender)
        blitz = self._detect_blitz(def_pre, def_post)

        # Play direction
        off_avg_x = np.mean([p['x'] for p in off_pre]) if off_pre else 960
        play_dir = "left_to_right" if off_avg_x < 960 else "right_to_left"

        return AnalyzedPlay(
            play_number=play['play_number'],
            start_time=t_start,
            end_time=t_end,
            duration=play['duration'],
            team0_presnap=team0_pre,
            team1_presnap=team1_pre,
            team0_postsnap=team0_post,
            team1_postsnap=team1_post,
            offense_team=offense_team,
            defense_team=defense_team,
            formation_tag=formation['tag'],
            formation_detail=formation,
            coverage_shell=coverage['shell'],
            coverage_detail=coverage,
            play_direction=play_dir,
            motion_detected=motion,
            blitz_detected=blitz,
            avg_motion_energy=play.get('avg_motion', 0),
        )

    def _avg_positions_by_track(self, records: list[dict]) -> list[dict]:
        """Average pixel positions per track_id."""
        track_data: dict[int, list[dict]] = defaultdict(list)
        for r in records:
            track_data[r['track_id']].append(r)

        result = []
        for tid, recs in track_data.items():
            if len(recs) < 2:
                continue
            teams = [r.get('team_label', -1) for r in recs]
            team = max(set(teams), key=teams.count) if teams else -1
            result.append({
                'track_id': tid,
                'team_label': team,
                'x': np.mean([r['x_pixel'] for r in recs]),
                'y': np.mean([r['y_pixel'] for r in recs]),
                'count': len(recs),
            })
        return result

    # ── Formation Classification ─────────────────────────────────

    def _classify_formation_7v7(self, offense_positions: list[dict]) -> dict:
        """Classify 7v7 offensive formation from pre-snap pixel positions.

        Key reads:
        - Count receivers to each side of center
        - Detect bunch (3 WRs within tight cluster)
        - Detect stack (WRs in vertical line)
        - Detect empty (no backfield)
        - Detect trips vs spread
        """
        if len(offense_positions) < 3:
            return {"tag": "Inconclusive", "receivers_left": 0, "receivers_right": 0}

        # Sort by Y (depth) — in sideline camera, deeper = lower Y or higher Y
        # depending on camera angle. Use X for left/right.
        positions = sorted(offense_positions, key=lambda p: p['y'])

        # Find the "center" of the formation (centroid X)
        center_x = np.median([p['x'] for p in positions])

        # QB = player with most extreme Y (deepest in backfield)
        # In a sideline camera, the QB is usually the most "forward" or "back"
        # relative to the line. Use Y-spread to find the outlier.
        ys = [p['y'] for p in positions]
        y_median = np.median(ys)

        # Players close to median Y = on the line
        # Players far from median Y = backfield
        on_line = [p for p in positions if abs(p['y'] - y_median) < 30]
        backfield = [p for p in positions if abs(p['y'] - y_median) >= 30]

        # Receivers = players to left and right of center (use ALL, not just on_line)
        all_players = positions
        left_receivers = [p for p in all_players if p['x'] < center_x - 40]
        right_receivers = [p for p in all_players if p['x'] > center_x + 40]
        inside = [p for p in all_players if center_x - 40 <= p['x'] <= center_x + 40]

        n_left = len(left_receivers)
        n_right = len(right_receivers)

        # Formation tagging
        if n_left == 0 and n_right == 0:
            tag = "Compressed"
        elif n_left == 3 or n_right == 3:
            strong_side = left_receivers if n_left >= 3 else right_receivers
            # Check bunch (all within 80px of each other)
            xs = [p['x'] for p in strong_side]
            if max(xs) - min(xs) < 80:
                tag = f"Bunch {'Left' if n_left >= 3 else 'Right'}"
            else:
                tag = f"Trips {'Left' if n_left >= 3 else 'Right'}"
        elif n_left == 2 and n_right == 2:
            tag = "2x2 Spread"
        elif n_left == 2 and n_right == 1:
            tag = "3x1 Left"
        elif n_left == 1 and n_right == 2:
            tag = "3x1 Right"
        elif n_left + n_right >= 4:
            tag = "Spread"
        else:
            tag = "Tight"

        # Empty backfield check
        if len(backfield) == 0:
            tag = f"Empty {tag}"

        # Stack detection
        for group in [left_receivers, right_receivers]:
            if len(group) >= 2:
                xs = [p['x'] for p in group]
                ys_g = [p['y'] for p in group]
                if max(xs) - min(xs) < 40 and max(ys_g) - min(ys_g) > 20:
                    tag = f"Stack {tag}"
                    break

        return {
            "tag": tag,
            "receivers_left": n_left,
            "receivers_right": n_right,
            "backfield_count": len(backfield),
            "on_line_count": len(on_line),
            "is_empty": len(backfield) == 0,
            "is_compressed": n_left + n_right <= 1,
        }

    # ── Coverage Classification ──────────────────────────────────

    def _classify_coverage_shell(
        self, defense_positions: list[dict], offense_positions: list[dict]
    ) -> dict:
        """Classify defensive coverage shell.

        Reads:
        - Safety depth and count (deep = Y far from LOS)
        - Corner alignment (press vs off vs bail)
        - Defenders in box vs spread
        """
        if len(defense_positions) < 4:
            return {"shell": "Unknown", "safeties_deep": 0}

        # Find LOS (average Y of offensive linemen)
        off_ys = [p['y'] for p in offense_positions]
        los_y = np.median(off_ys) if off_ys else 600

        # Sort defenders by depth from LOS
        for d in defense_positions:
            d['depth'] = abs(d['y'] - los_y)

        deep_threshold = 80  # pixels — "deep" = far from LOS
        medium_threshold = 40

        deep = [d for d in defense_positions if d['depth'] > deep_threshold]
        medium = [d for d in defense_positions if medium_threshold < d['depth'] <= deep_threshold]
        shallow = [d for d in defense_positions if d['depth'] <= medium_threshold]

        n_deep = len(deep)

        # Center X of field
        center_x = np.median([p['x'] for p in defense_positions])

        # Shell classification
        if n_deep >= 2:
            # Check if safeties are split
            deep_xs = [d['x'] for d in deep]
            if len(deep_xs) >= 2 and max(deep_xs) - min(deep_xs) > 150:
                shell = "Cover 2 (Two-High)"
            else:
                shell = "Quarters"
        elif n_deep == 1:
            shell = "Cover 1 / Cover 3 (Single-High)"
        else:
            shell = "Cover 0 (No Deep Safety)"

        # Man vs Zone heuristic
        # If defenders mirror offensive receivers → man
        # If defenders are evenly spaced → zone
        def_xs = sorted([d['x'] for d in defense_positions])
        if len(def_xs) >= 3:
            gaps = [def_xs[i+1] - def_xs[i] for i in range(len(def_xs)-1)]
            gap_variance = np.std(gaps) if gaps else 0
            if gap_variance < 30:
                coverage_type = "Zone"
            else:
                coverage_type = "Man"
        else:
            coverage_type = "Unknown"

        # Press vs Off
        if shallow and offense_positions:
            off_xs = [p['x'] for p in offense_positions]
            press_count = 0
            for d in shallow:
                nearest_off = min(abs(d['x'] - ox) for ox in off_xs)
                if nearest_off < 60:
                    press_count += 1
            press_tendency = "Press" if press_count >= 2 else "Off"
        else:
            press_tendency = "Unknown"

        return {
            "shell": shell,
            "coverage_type": coverage_type,
            "safeties_deep": n_deep,
            "defenders_medium": len(medium),
            "defenders_shallow": len(shallow),
            "press_tendency": press_tendency,
        }

    # ── Motion & Blitz Detection ─────────────────────────────────

    def _detect_presnap_motion(
        self, presnap_records: list[dict], offense_team: int
    ) -> bool:
        """Detect pre-snap motion by an offensive player."""
        off_records = [r for r in presnap_records if r.get('team_label') == offense_team]
        track_positions: dict[int, list[tuple[float, float]]] = defaultdict(list)
        for r in off_records:
            track_positions[r['track_id']].append((r['x_pixel'], r['time']))

        for tid, positions in track_positions.items():
            if len(positions) < 3:
                continue
            positions.sort(key=lambda p: p[1])
            xs = [p[0] for p in positions]
            x_range = max(xs) - min(xs)
            if x_range > 60:  # Moved more than 60 pixels laterally
                return True
        return False

    def _detect_blitz(
        self, def_pre: list[dict], def_post: list[dict]
    ) -> bool:
        """Detect blitz: multiple defenders rushing post-snap."""
        if not def_pre or not def_post:
            return False

        # Match pre/post by closest position
        rush_count = 0
        for pre_d in def_pre:
            # Find closest post-snap defender
            best_dist = float('inf')
            best_post = None
            for post_d in def_post:
                dist = math.sqrt((pre_d['x'] - post_d['x'])**2 + (pre_d['y'] - post_d['y'])**2)
                if dist < best_dist:
                    best_dist = dist
                    best_post = post_d

            if best_post and best_dist > 80:  # Moved significantly
                rush_count += 1

        return rush_count >= 2  # 2+ rushers = blitz in flag

    # ── Player Profiles ──────────────────────────────────────────

    def _build_player_profiles(
        self,
        plays: list[AnalyzedPlay],
        player_data: dict,
        total_plays: int,
    ) -> list[PlayerProfile]:
        """Build player profiles from analyzed plays."""
        # Track which plays each track_id appears in
        track_play_data: dict[int, dict] = defaultdict(lambda: {
            'plays': [], 'off_plays': 0, 'def_plays': 0,
            'presnap_xs': [], 'presnap_ys': [], 'team': -1,
        })

        for play in plays:
            all_presnap = play.team0_presnap + play.team1_presnap
            for p in all_presnap:
                tid = p['track_id']
                team = p.get('team_label', -1)
                track_play_data[tid]['plays'].append(play.play_number)
                track_play_data[tid]['team'] = team
                track_play_data[tid]['presnap_xs'].append(p['x'])
                track_play_data[tid]['presnap_ys'].append(p['y'])
                if team == play.offense_team:
                    track_play_data[tid]['off_plays'] += 1
                else:
                    track_play_data[tid]['def_plays'] += 1

        # If no tracks matched through player_data, build profiles directly from track_play_data
        # Map track_ids to consolidated player_ids
        player_tracks: dict[int, list[int]] = defaultdict(list)
        pid_to_data: dict[int, dict] = {}

        for pid, pdata in player_data.items():
            pid_int = int(pid) if isinstance(pid, str) else pid
            for tid in pdata.get('track_ids', []):
                if tid in track_play_data:
                    player_tracks[pid_int].append(tid)
                    if pid_int not in pid_to_data:
                        pid_to_data[pid_int] = pdata

        # Fallback: if no player_data matches, use raw track_ids as player IDs
        if not player_tracks:
            for tid, td in track_play_data.items():
                if len(td['plays']) >= 2:
                    player_tracks[tid] = [tid]
                    pid_to_data[tid] = {
                        'team': td['team'],
                        'total_frames': len(td['plays']) * 10,
                        'total_time_seconds': len(td['plays']) * 6.0,
                        'track_ids': [tid],
                    }

        profiles = []
        for pid, tids in player_tracks.items():
            pdata = pid_to_data.get(pid, {})
            combined = {
                'plays': [], 'off_plays': 0, 'def_plays': 0,
                'presnap_xs': [], 'presnap_ys': [],
            }
            team = pdata.get('team', -1)

            for tid in tids:
                td = track_play_data.get(tid, {})
                combined['plays'].extend(td.get('plays', []))
                combined['off_plays'] += td.get('off_plays', 0)
                combined['def_plays'] += td.get('def_plays', 0)
                combined['presnap_xs'].extend(td.get('presnap_xs', []))
                combined['presnap_ys'].extend(td.get('presnap_ys', []))

            unique_plays = len(set(combined['plays']))
            if unique_plays < 2:
                continue

            avg_x = np.mean(combined['presnap_xs']) if combined['presnap_xs'] else 0
            avg_y = np.mean(combined['presnap_ys']) if combined['presnap_ys'] else 0
            pos_var = np.std(combined['presnap_xs']) if combined['presnap_xs'] else 0

            # Infer role from position
            role, confidence = self._infer_role(
                avg_x, avg_y, pos_var, combined['off_plays'], combined['def_plays'],
                960  # center of frame
            )

            # Alignment tendency
            center = 960
            if avg_x < center - 200:
                alignment = "Boundary"
            elif avg_x > center + 200:
                alignment = "Field"
            elif abs(avg_x - center) < 100:
                alignment = "Inside/Slot"
            else:
                alignment = "Wing"

            profiles.append(PlayerProfile(
                player_id=pid,
                team=team,
                track_ids=tids,
                total_frames=pdata.get('total_frames', 0),
                total_time_seconds=pdata.get('total_time_seconds', 0),
                avg_x=avg_x,
                avg_y=avg_y,
                inferred_role=role,
                role_confidence=confidence,
                plays_on_field=unique_plays,
                offensive_plays=combined['off_plays'],
                defensive_plays=combined['def_plays'],
                snap_percentage=round(unique_plays / max(total_plays, 1) * 100, 1),
                avg_presnap_x=avg_x,
                avg_presnap_y=avg_y,
                position_variance=pos_var,
                alignment_tendency=alignment,
            ))

        profiles.sort(key=lambda p: p.plays_on_field, reverse=True)
        return profiles

    def _infer_role(
        self, avg_x: float, avg_y: float, pos_variance: float,
        off_plays: int, def_plays: int, center_x: float,
    ) -> tuple[str, float]:
        """Infer player role from spatial data."""
        is_offense_primary = off_plays > def_plays
        total = off_plays + def_plays
        off_pct = off_plays / max(total, 1)
        def_pct = def_plays / max(total, 1)

        # Two-way player check
        is_two_way = 0.3 < off_pct < 0.7

        if is_offense_primary or off_pct > 0.4:
            if abs(avg_x - center_x) < 60 and pos_variance < 40:
                role = "QB" if off_pct > 0.6 else "QB/Center"
                return role, 0.7
            elif abs(avg_x - center_x) > 300:
                return "Outside WR (X)", 0.65
            elif 150 < abs(avg_x - center_x) <= 300:
                return "Slot WR (Y/H)", 0.6
            elif 60 < abs(avg_x - center_x) <= 150:
                return "Inside WR / TE", 0.55
            else:
                return "RB / Skill", 0.5

        if def_pct > 0.4:
            dist_from_center = abs(avg_x - center_x)
            if dist_from_center > 300:
                return "Cornerback", 0.65
            elif dist_from_center > 200:
                return "Nickel / Slot CB", 0.55
            elif pos_variance < 35:
                return "Pass Rusher", 0.6
            elif avg_y < 550:  # deeper position
                return "Safety", 0.55
            elif pos_variance > 60:
                return "Linebacker / Rover", 0.5
            else:
                return "Defender", 0.4

        return "Two-Way Player", 0.5

    # ── Tendencies ───────────────────────────────────────────────

    def _compute_offense_tendencies(self, plays: list[AnalyzedPlay]) -> dict:
        """Compute offensive tendency breakdowns."""
        formations = Counter(p.formation_tag for p in plays)
        total = len(plays)
        if total == 0:
            return {}

        motion_plays = sum(1 for p in plays if p.motion_detected)

        # Formation breakdown
        formation_data = {}
        for tag, count in formations.most_common():
            tag_plays = [p for p in plays if p.formation_tag == tag]
            motion_from_tag = sum(1 for p in tag_plays if p.motion_detected)
            formation_data[tag] = {
                "count": count,
                "percentage": round(count / total * 100, 1),
                "motion_rate": round(motion_from_tag / max(count, 1) * 100, 1),
            }

        # Play direction tendency
        left_plays = sum(1 for p in plays if p.play_direction == "left_to_right")
        right_plays = total - left_plays

        return {
            "total_plays": total,
            "formations": formation_data,
            "motion_rate": round(motion_plays / total * 100, 1),
            "direction_left_pct": round(left_plays / total * 100, 1),
            "direction_right_pct": round(right_plays / total * 100, 1),
        }

    def _compute_defense_tendencies(self, plays: list[AnalyzedPlay]) -> dict:
        """Compute defensive tendency breakdowns."""
        shells = Counter(p.coverage_shell for p in plays)
        total = len(plays)
        if total == 0:
            return {}

        blitz_plays = sum(1 for p in plays if p.blitz_detected)

        shell_data = {}
        for shell, count in shells.most_common():
            shell_plays = [p for p in plays if p.coverage_shell == shell]
            blitz_from_shell = sum(1 for p in shell_plays if p.blitz_detected)
            shell_data[shell] = {
                "count": count,
                "percentage": round(count / total * 100, 1),
                "blitz_rate": round(blitz_from_shell / max(count, 1) * 100, 1),
            }

        # Coverage type breakdown
        cov_types = Counter(p.coverage_detail.get('coverage_type', 'Unknown') for p in plays)

        return {
            "total_plays": total,
            "coverage_shells": shell_data,
            "blitz_rate": round(blitz_plays / total * 100, 1),
            "coverage_types": {k: {"count": v, "pct": round(v/total*100, 1)} for k, v in cov_types.items()},
        }

    # ── Key Frame Extraction ─────────────────────────────────────

    def _extract_key_frames(
        self, video_path: str, plays: list[AnalyzedPlay],
        output_dir: str, game_start: float,
    ) -> None:
        """Extract annotated frames for key plays."""
        frames_dir = os.path.join(output_dir, "key_frames")
        os.makedirs(frames_dir, exist_ok=True)

        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)

        # Sample plays evenly across the game
        sample_indices = [0, len(plays)//4, len(plays)//2, 3*len(plays)//4, len(plays)-1]
        sample_indices = [i for i in sample_indices if 0 <= i < len(plays)]

        for idx in sample_indices:
            play = plays[idx]
            # Get pre-snap frame
            frame_num = int(play.start_time * fps)
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
            ret, frame = cap.read()
            if not ret:
                continue

            # Annotate with formation and coverage
            h, w = frame.shape[:2]
            # Dark overlay bar at top
            cv2.rectangle(frame, (0, 0), (w, 70), (0, 0, 0), -1)
            mins = int(play.start_time // 60)
            secs = int(play.start_time % 60)
            cv2.putText(frame, f"Play {play.play_number} | {mins}:{secs:02d}",
                       (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            cv2.putText(frame, f"OFF: {play.formation_tag}  |  DEF: {play.coverage_shell}",
                       (10, 55), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)

            # Draw player positions
            for p in play.team0_presnap:
                color = (255, 100, 0) if play.offense_team == 0 else (0, 100, 255)
                cv2.circle(frame, (int(p['x']), int(p['y'])), 12, color, -1)
                cv2.circle(frame, (int(p['x']), int(p['y'])), 14, (255, 255, 255), 2)
            for p in play.team1_presnap:
                color = (255, 100, 0) if play.offense_team == 1 else (0, 100, 255)
                cv2.circle(frame, (int(p['x']), int(p['y'])), 12, color, -1)
                cv2.circle(frame, (int(p['x']), int(p['y'])), 14, (255, 255, 255), 2)

            out_path = os.path.join(frames_dir, f"play_{play.play_number:03d}.jpg")
            cv2.imwrite(out_path, frame)

        cap.release()

    # ── Report Generation ────────────────────────────────────────

    def _generate_scouting_report(
        self,
        plays: list[AnalyzedPlay],
        profiles: list[PlayerProfile],
        off_tend: dict,
        def_tend: dict,
        team0_name: str,
        team1_name: str,
        team0_color: str,
        team1_color: str,
        game_format: str,
    ) -> str:
        """Generate the full marketable scouting report."""
        total_plays = len(plays)

        # Determine which team was on offense more
        t0_off = sum(1 for p in plays if p.offense_team == 0)
        t1_off = sum(1 for p in plays if p.offense_team == 1)

        team0_profiles = [p for p in profiles if p.team == 0]
        team1_profiles = [p for p in profiles if p.team == 1]

        r = []
        r.append("=" * 72)
        r.append("  GAME FILM SCOUTING REPORT")
        r.append(f"  {team0_name} ({team0_color}) vs {team1_name} ({team1_color})")
        r.append(f"  Format: {game_format} Flag Football")
        r.append("=" * 72)
        r.append("")

        # ── GAME SUMMARY ──
        r.append("-" * 72)
        r.append("  GAME SUMMARY")
        r.append("-" * 72)
        r.append(f"  Total Plays Analyzed:  {total_plays}")
        r.append(f"  {team0_name} Offensive Plays: {t0_off}")
        r.append(f"  {team1_name} Offensive Plays: {t1_off}")
        r.append(f"  Pre-Snap Motion Rate:  {off_tend.get('motion_rate', 0):.0f}%")
        r.append(f"  Blitz Rate:            {def_tend.get('blitz_rate', 0):.0f}%")
        r.append("")

        # ── OFFENSIVE FORMATIONS ──
        r.append("-" * 72)
        r.append("  OFFENSIVE FORMATIONS")
        r.append("-" * 72)
        formations = off_tend.get('formations', {})
        r.append(f"  {'Formation':<25} {'Count':>6} {'Rate':>7} {'Motion%':>8}")
        r.append("  " + "-" * 48)
        for tag, data in sorted(formations.items(), key=lambda x: -x[1]['count']):
            r.append(f"  {tag:<25} {data['count']:>6} {data['percentage']:>6.1f}% {data['motion_rate']:>7.0f}%")
        r.append("")

        # ── DEFENSIVE SCHEME ──
        r.append("-" * 72)
        r.append("  DEFENSIVE SCHEME")
        r.append("-" * 72)
        shells = def_tend.get('coverage_shells', {})
        r.append(f"  {'Coverage Shell':<30} {'Count':>6} {'Rate':>7} {'Blitz%':>8}")
        r.append("  " + "-" * 53)
        for shell, data in sorted(shells.items(), key=lambda x: -x[1]['count']):
            r.append(f"  {shell:<30} {data['count']:>6} {data['percentage']:>6.1f}% {data['blitz_rate']:>7.0f}%")
        r.append("")

        cov_types = def_tend.get('coverage_types', {})
        if cov_types:
            r.append("  Coverage Type Breakdown:")
            for ct, cd in sorted(cov_types.items(), key=lambda x: -x[1]['count']):
                r.append(f"    {ct}: {cd['count']} plays ({cd['pct']:.0f}%)")
            r.append("")

        r.append(f"  Overall Blitz Rate: {def_tend.get('blitz_rate', 0):.0f}%")
        r.append("")

        # ── PLAYING TIME REPORT ──
        r.append("-" * 72)
        r.append(f"  PLAYING TIME: {team0_name} ({team0_color})")
        r.append("-" * 72)
        r.append(f"  {'Player':<8} {'Role':<15} {'Snaps':>6} {'Snap%':>6} {'Off':>5} {'Def':>5} {'Align':<12}")
        r.append("  " + "-" * 60)
        for p in team0_profiles[:14]:
            r.append(f"  P{p.player_id:<6} {p.inferred_role:<15} {p.plays_on_field:>6} {p.snap_percentage:>5.0f}% {p.offensive_plays:>5} {p.defensive_plays:>5} {p.alignment_tendency:<12}")
        r.append("")

        r.append("-" * 72)
        r.append(f"  PLAYING TIME: {team1_name} ({team1_color})")
        r.append("-" * 72)
        r.append(f"  {'Player':<8} {'Role':<15} {'Snaps':>6} {'Snap%':>6} {'Off':>5} {'Def':>5} {'Align':<12}")
        r.append("  " + "-" * 60)
        for p in team1_profiles[:14]:
            r.append(f"  P{p.player_id:<6} {p.inferred_role:<15} {p.plays_on_field:>6} {p.snap_percentage:>5.0f}% {p.offensive_plays:>5} {p.defensive_plays:>5} {p.alignment_tendency:<12}")
        r.append("")

        # ── PLAYERS TO WATCH ──
        r.append("-" * 72)
        r.append("  PLAYERS TO WATCH")
        r.append("-" * 72)
        r.append("")

        for team, name, color, team_profiles in [
            (0, team0_name, team0_color, team0_profiles),
            (1, team1_name, team1_color, team1_profiles),
        ]:
            r.append(f"  >> {name} ({color}):")
            top = team_profiles[:5]
            for p in top:
                note = ""
                if p.offensive_plays > p.defensive_plays * 2:
                    note = "Offensive weapon"
                elif p.defensive_plays > p.offensive_plays * 2:
                    note = "Defensive anchor"
                elif p.offensive_plays > 0 and p.defensive_plays > 0:
                    note = "Two-way player (ironman)"
                if p.inferred_role in ("Outside WR",):
                    note += " - stretch the field"
                elif p.inferred_role == "QB/Center":
                    note += " - key decision maker"
                elif p.inferred_role in ("Safety", "Corner"):
                    note += " - coverage player"

                r.append(f"     P{p.player_id}: {p.inferred_role} | {p.plays_on_field} snaps ({p.snap_percentage:.0f}%) | {p.alignment_tendency} | {note}")
            r.append("")

        # ── SCHEME SUMMARY ──
        r.append("-" * 72)
        r.append("  SCHEME SUMMARY & GAME PLAN NOTES")
        r.append("-" * 72)
        r.append("")

        # Top formation
        if formations:
            top_form = max(formations.items(), key=lambda x: x[1]['count'])
            r.append(f"  PRIMARY FORMATION: {top_form[0]} ({top_form[1]['percentage']:.0f}% of plays)")
        if shells:
            top_shell = max(shells.items(), key=lambda x: x[1]['count'])
            r.append(f"  PRIMARY COVERAGE:  {top_shell[0]} ({top_shell[1]['percentage']:.0f}% of plays)")
        r.append("")

        # Game plan bullets
        r.append("  COACHING NOTES:")
        motion_rate = off_tend.get('motion_rate', 0)
        blitz_rate = def_tend.get('blitz_rate', 0)

        if motion_rate > 40:
            r.append(f"  * High motion usage ({motion_rate:.0f}%) - offense uses pre-snap motion frequently")
            r.append("    --> Defenders must communicate and adjust assignments after motion")
        elif motion_rate < 15:
            r.append(f"  * Low motion usage ({motion_rate:.0f}%) - offense is static pre-snap")
            r.append("    --> Defense can align early and play assignment football")

        if blitz_rate > 30:
            r.append(f"  * High blitz rate ({blitz_rate:.0f}%) - defense is aggressive")
            r.append("    --> Have hot routes ready, quick-game passing concepts")
        elif blitz_rate < 10:
            r.append(f"  * Low blitz rate ({blitz_rate:.0f}%) - defense plays coverage")
            r.append("    --> QB has time, use deeper developing routes")

        if formations:
            spread_forms = sum(d['count'] for tag, d in formations.items() if 'Spread' in tag or '2x2' in tag)
            trips_forms = sum(d['count'] for tag, d in formations.items() if 'Trips' in tag or '3x1' in tag)
            if spread_forms > trips_forms:
                r.append("  * Offense favors balanced (2x2/Spread) formations")
                r.append("    --> Play even coverage, don't over-commit to one side")
            elif trips_forms > spread_forms:
                r.append("  * Offense favors overloaded formations (Trips/3x1)")
                r.append("    --> Rotate coverage strength to the trips side")

        r.append("")
        r.append("=" * 72)
        r.append("  Report generated by FF Analytics v0.1.0")
        r.append("  Flag Football Game Film Analysis System")
        r.append("=" * 72)

        return "\n".join(r)

    # ── Helpers ───────────────────────────────────────────────────

    def _load_tracking(self, path: str) -> list[dict]:
        records = []
        with open(path) as f:
            for line in f:
                records.append(json.loads(line))
        return records

    def _play_to_dict(self, p: AnalyzedPlay) -> dict:
        return {
            "play_number": p.play_number,
            "start_time": p.start_time,
            "end_time": p.end_time,
            "duration": p.duration,
            "offense_team": p.offense_team,
            "defense_team": p.defense_team,
            "formation": p.formation_tag,
            "coverage": p.coverage_shell,
            "motion": p.motion_detected,
            "blitz": p.blitz_detected,
            "direction": p.play_direction,
        }

    def _profile_to_dict(self, p: PlayerProfile) -> dict:
        return {
            "player_id": p.player_id,
            "team": p.team,
            "role": p.inferred_role,
            "plays_on_field": p.plays_on_field,
            "snap_pct": p.snap_percentage,
            "off_snaps": p.offensive_plays,
            "def_snaps": p.defensive_plays,
            "alignment": p.alignment_tendency,
            "position_variance": round(p.position_variance, 1),
        }
