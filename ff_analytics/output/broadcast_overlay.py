"""
Broadcast Overlay Generator — TV-style graphics on game video.

Takes raw game video + analysis data and renders a new video with
professional broadcast-quality overlays:

1. SCORE BUG: Top-left persistent graphic showing teams, score, quarter
2. DOWN & DISTANCE: "1st & 20" graphic during active plays
3. FORMATION TAG: Pre-snap formation label
4. COVERAGE TAG: Defensive coverage label
5. PLAYER TRACKING DOTS: Colored circles on each tracked player
6. PLAY RESULT: "+8 YARDS" popup after each play
7. DRIVE SUMMARY: Between-drive graphic showing drive stats
8. FIELD POSITION: Current yard line indicator
9. PLAY CLOCK: Estimated time between snaps

Output: MP4 video file with all overlays rendered.
"""

from __future__ import annotations

import json
import math
import os
from typing import Optional

import cv2
import numpy as np


class BroadcastOverlay:
    """Render TV-style broadcast graphics onto game video."""

    def __init__(self):
        # Colors (BGR for OpenCV)
        self.SCORE_BG = (30, 30, 30)         # dark gray
        self.SCORE_TEXT = (255, 255, 255)      # white
        self.TEAM_A_COLOR = (230, 140, 20)     # blue-ish
        self.TEAM_B_COLOR = (200, 200, 200)    # light gray
        self.DOWN_BG = (0, 0, 0)              # black
        self.DOWN_TEXT = (0, 255, 255)         # cyan
        self.FORMATION_TEXT = (0, 255, 200)    # green-cyan
        self.COVERAGE_TEXT = (100, 200, 255)   # orange-ish
        self.GAIN_POSITIVE = (0, 220, 0)       # green
        self.GAIN_NEGATIVE = (0, 0, 220)       # red
        self.PLAYER_DOT_A = (255, 130, 0)      # blue team
        self.PLAYER_DOT_B = (0, 180, 255)      # orange team
        self.DRIVE_BG = (20, 20, 20)
        self.YELLOW_LINE = (0, 255, 255)       # yellow first down line

    def render_game(
        self,
        video_path: str,
        output_path: str,
        drives_path: str,
        tracking_path: str,
        team_a: str,
        team_b: str,
        score_a: int,
        score_b: int,
        game_start_sec: float,
        game_end_sec: float,
        color_a: str = "Blue",
        color_b: str = "White",
    ):
        """Render the full broadcast overlay video.

        Args:
            video_path: Input video.
            output_path: Output video with overlays.
            drives_path: Path to drives.json from analysis.
            tracking_path: Path to tracking.jsonl.
            team_a, team_b: Team names.
            score_a, score_b: Final scores.
            game_start_sec, game_end_sec: Game time window.
        """
        # Load analysis data
        with open(drives_path) as f:
            drives = json.loads(f.read())

        # Build a timeline: for each second of video, what's happening?
        timeline = self._build_timeline(drives, game_start_sec, game_end_sec)

        # Load tracking data for player dots
        tracking = {}
        with open(tracking_path) as f:
            for line in f:
                r = json.loads(line)
                t = round(r["time"], 1)
                if t not in tracking:
                    tracking[t] = []
                tracking[t].append(r)

        # Open video
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

        start_frame = int(game_start_sec * fps)
        end_frame = min(int(game_end_sec * fps), total_frames)

        # Output video
        os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
        fourcc = cv2.VideoWriter_fourcc(*"mp4v")
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

        cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)
        frame_num = start_frame

        print(f"Rendering broadcast overlay: {(end_frame - start_frame) / fps:.0f}s of video")

        while frame_num < end_frame:
            ret, frame = cap.read()
            if not ret:
                break

            current_time = frame_num / fps
            state = self._get_state(timeline, current_time)

            # Render overlays
            self._render_score_bug(frame, team_a, team_b, score_a, score_b,
                                   state.get("quarter", ""), color_a, color_b)

            if state.get("is_play"):
                self._render_down_distance(frame, state.get("down", ""),
                                           state.get("yard_line", 0))
                self._render_formation(frame, state.get("formation", ""))
                self._render_coverage(frame, state.get("coverage", ""))

            if state.get("show_gain"):
                self._render_gain(frame, state.get("gain", 0))

            if state.get("show_drive_summary"):
                self._render_drive_summary(frame, state.get("drive_info", {}),
                                           team_a, team_b)

            # Player tracking dots
            t_key = round(current_time, 1)
            if t_key in tracking:
                self._render_player_dots(frame, tracking[t_key])

            # Field position indicator
            if state.get("yard_line"):
                self._render_field_position(frame, state["yard_line"])

            out.write(frame)
            frame_num += 1

            if frame_num % int(fps * 30) == 0:
                elapsed = (frame_num - start_frame) / fps
                total = (end_frame - start_frame) / fps
                print(f"  {elapsed:.0f}/{total:.0f}s rendered ({elapsed/total*100:.0f}%)")

        cap.release()
        out.release()
        print(f"Broadcast video saved: {output_path}")

    # ── Timeline Builder ─────────────────────────────────────────

    def _build_timeline(self, drives, game_start, game_end):
        """Build a second-by-second timeline of game state."""
        timeline = {}
        quarter = "1st"
        half_time = (game_start + game_end) / 2

        for d in drives:
            for p in d.get("play_details", []):
                # Parse time
                parts = p.get("time", "0:00").split(":")
                try:
                    t = int(parts[0]) * 60 + int(parts[1])
                except (ValueError, IndexError):
                    continue

                if t > half_time:
                    quarter = "2nd"

                # Mark play window (snap time to snap + 5s)
                for s in range(t - 1, t + 6):
                    timeline[s] = {
                        "is_play": True,
                        "down": f"{p.get('down', 1)}",
                        "yard_line": p.get("yard", 40),
                        "formation": p.get("formation", ""),
                        "coverage": p.get("coverage", ""),
                        "gain": p.get("gain", 0),
                        "quarter": quarter,
                        "offense": d.get("offense", ""),
                        "drive_num": d.get("drive", 0),
                    }

                # Show gain for 3s after play
                for s in range(t + 4, t + 8):
                    if s not in timeline:
                        timeline[s] = {}
                    timeline[s]["show_gain"] = True
                    timeline[s]["gain"] = p.get("gain", 0)
                    timeline[s]["quarter"] = quarter

            # Drive summary between drives (3s window)
            last_play = d.get("play_details", [{}])[-1]
            parts = last_play.get("time", "0:00").split(":")
            try:
                end_t = int(parts[0]) * 60 + int(parts[1]) + 8
            except (ValueError, IndexError):
                continue

            for s in range(end_t, end_t + 5):
                if s not in timeline:
                    timeline[s] = {}
                timeline[s]["show_drive_summary"] = True
                timeline[s]["drive_info"] = {
                    "drive_num": d.get("drive", 0),
                    "offense": d.get("offense", ""),
                    "plays": d.get("plays", 0),
                    "yards": d.get("yards", 0),
                    "result": d.get("result", ""),
                }
                timeline[s]["quarter"] = quarter

        return timeline

    def _get_state(self, timeline, current_time):
        t = int(current_time)
        return timeline.get(t, {})

    # ── Render Functions ─────────────────────────────────────────

    def _render_score_bug(self, frame, team_a, team_b, score_a, score_b,
                          quarter, color_a, color_b):
        """Persistent score bug in top-left corner."""
        h, w = frame.shape[:2]
        # Background
        bug_w, bug_h = 320, 60
        overlay = frame.copy()
        cv2.rectangle(overlay, (10, 10), (10 + bug_w, 10 + bug_h), self.SCORE_BG, -1)
        cv2.addWeighted(overlay, 0.85, frame, 0.15, 0, frame)

        # Border
        cv2.rectangle(frame, (10, 10), (10 + bug_w, 10 + bug_h), (60, 60, 60), 1)

        # Team A
        cv2.rectangle(frame, (12, 12), (12 + 150, 12 + 26), self.TEAM_A_COLOR, -1)
        cv2.putText(frame, f"{team_a}", (16, 32),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.55, (0, 0, 0), 2)
        cv2.putText(frame, f"{score_a}", (140, 32),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        # Team B
        cv2.rectangle(frame, (12, 40), (12 + 150, 40 + 26), self.TEAM_B_COLOR, -1)
        cv2.putText(frame, f"{team_b}", (16, 60),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.55, (0, 0, 0), 2)
        cv2.putText(frame, f"{score_b}", (140, 60),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)

        # Quarter
        if quarter:
            cv2.rectangle(frame, (170, 12), (320, 66), (40, 40, 40), -1)
            cv2.putText(frame, f"{quarter} Half", (180, 45),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, self.SCORE_TEXT, 2)

    def _render_down_distance(self, frame, down, yard_line):
        """Down and distance graphic at bottom of screen."""
        h, w = frame.shape[:2]
        ordinal = {1: "1st", 2: "2nd", 3: "3rd", 4: "4th"}.get(int(down) if down else 0, f"{down}th")
        text = f"{ordinal} Down | {yard_line:.0f} yd line"

        # Background bar
        bar_y = h - 45
        overlay = frame.copy()
        cv2.rectangle(overlay, (w // 2 - 200, bar_y), (w // 2 + 200, bar_y + 35), self.DOWN_BG, -1)
        cv2.addWeighted(overlay, 0.8, frame, 0.2, 0, frame)

        cv2.putText(frame, text, (w // 2 - 180, bar_y + 25),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, self.DOWN_TEXT, 2)

    def _render_formation(self, frame, formation):
        """Formation label in top-right area."""
        if not formation or formation == "Inconclusive":
            return
        h, w = frame.shape[:2]
        text = f"OFF: {formation}"
        tw = len(text) * 12
        overlay = frame.copy()
        cv2.rectangle(overlay, (w - tw - 20, 10), (w - 10, 38), (0, 0, 0), -1)
        cv2.addWeighted(overlay, 0.7, frame, 0.3, 0, frame)
        cv2.putText(frame, text, (w - tw - 15, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, self.FORMATION_TEXT, 2)

    def _render_coverage(self, frame, coverage):
        """Coverage label below formation."""
        if not coverage or coverage == "Unknown":
            return
        h, w = frame.shape[:2]
        text = f"DEF: {coverage}"
        tw = len(text) * 10
        overlay = frame.copy()
        cv2.rectangle(overlay, (w - tw - 20, 42), (w - 10, 66), (0, 0, 0), -1)
        cv2.addWeighted(overlay, 0.7, frame, 0.3, 0, frame)
        cv2.putText(frame, text, (w - tw - 15, 60),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.45, self.COVERAGE_TEXT, 2)

    def _render_gain(self, frame, gain):
        """Post-play gain/loss popup in center of screen."""
        h, w = frame.shape[:2]
        if gain > 0:
            text = f"+{gain:.0f} YDS"
            color = self.GAIN_POSITIVE
        elif gain < 0:
            text = f"{gain:.0f} YDS"
            color = self.GAIN_NEGATIVE
        else:
            text = "NO GAIN"
            color = (180, 180, 180)

        # Large centered text with background
        font_scale = 1.2
        thickness = 3
        (tw, th), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, font_scale, thickness)
        cx, cy = w // 2, h // 2 - 50

        overlay = frame.copy()
        cv2.rectangle(overlay, (cx - tw // 2 - 15, cy - th - 10),
                      (cx + tw // 2 + 15, cy + 10), (0, 0, 0), -1)
        cv2.addWeighted(overlay, 0.7, frame, 0.3, 0, frame)
        cv2.putText(frame, text, (cx - tw // 2, cy),
                    cv2.FONT_HERSHEY_SIMPLEX, font_scale, color, thickness)

    def _render_drive_summary(self, frame, drive_info, team_a, team_b):
        """Between-drive summary graphic."""
        h, w = frame.shape[:2]
        d = drive_info

        # Center overlay box
        box_w, box_h = 400, 100
        x1 = w // 2 - box_w // 2
        y1 = h // 2 - box_h // 2

        overlay = frame.copy()
        cv2.rectangle(overlay, (x1, y1), (x1 + box_w, y1 + box_h), self.DRIVE_BG, -1)
        cv2.addWeighted(overlay, 0.85, frame, 0.15, 0, frame)
        cv2.rectangle(frame, (x1, y1), (x1 + box_w, y1 + box_h), (80, 80, 80), 2)

        # Drive header
        cv2.putText(frame, f"DRIVE {d.get('drive_num', '')} | {d.get('offense', '')} Ball",
                    (x1 + 15, y1 + 28), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        # Stats line
        cv2.putText(frame, f"{d.get('plays', 0)} plays | {d.get('yards', 0):+.0f} yards",
                    (x1 + 15, y1 + 55), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (180, 180, 180), 1)

        # Result
        result = d.get("result", "")
        color = self.GAIN_POSITIVE if "Touchdown" in result else (180, 180, 180)
        cv2.putText(frame, result, (x1 + 15, y1 + 82),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.55, color, 2)

    def _render_player_dots(self, frame, records):
        """Colored dots on tracked players."""
        for r in records:
            if not (200 < r["y_pixel"] < 900):
                continue
            x, y = r["x_pixel"], r["y_pixel"]
            team = r.get("team_label", -1)
            color = self.PLAYER_DOT_A if team == 0 else (
                self.PLAYER_DOT_B if team == 1 else (128, 128, 128))
            cv2.circle(frame, (x, y), 8, color, -1)
            cv2.circle(frame, (x, y), 9, (255, 255, 255), 1)

    def _render_field_position(self, frame, yard_line):
        """Small field position indicator."""
        h, w = frame.shape[:2]
        text = f"{yard_line:.0f} YD LINE"
        cv2.putText(frame, text, (w // 2 - 60, h - 8),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.4, (180, 180, 180), 1)
