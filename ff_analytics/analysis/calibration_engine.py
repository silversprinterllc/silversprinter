"""
Calibration Engine — learns from ground truth to improve accuracy.

Two modes:
1. SUPERVISED: Coach provides timestamped play-by-play. System compares
   detected snaps/events against ground truth and adjusts thresholds.

2. SELF-CALIBRATING: Process many games, find consistent patterns across
   all of them. If the same threshold works on 10+ games, lock it in.

The engine stores learned parameters in a calibration file that
gets better with every game processed.
"""

from __future__ import annotations

import json
import os
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

import numpy as np


@dataclass
class CalibrationProfile:
    """Learned parameters from processing games."""
    # Snap detection
    snap_stillness_threshold: float = 0.52
    snap_explosion_threshold: float = 18.0
    snap_min_players: int = 7
    snap_merge_window_sec: float = 12.0

    # Drive grouping
    drive_gap_threshold_sec: float = 50.0

    # Scoring detection
    score_field_position_threshold: float = 74.0  # yard line for end zone
    score_gap_threshold_sec: float = 90.0
    score_empty_field_max_players: int = 6
    score_reset_yard_min: float = 22.0
    score_reset_yard_max: float = 42.0
    score_long_gap_threshold_sec: float = 120.0

    # Gain estimation
    gain_clamp_min: float = -20.0
    gain_clamp_max: float = 40.0

    # Referee/coach filtering
    ref_stripe_threshold: float = 14.0
    ref_saturation_max: float = 85.0
    coach_height_percentile: float = 0.7
    coach_velocity_max: float = 15.0

    # Metadata
    games_calibrated: int = 0
    total_plays_seen: int = 0
    accuracy_scores: list = field(default_factory=list)


class CalibrationEngine:
    """Learn and improve from game data."""

    def __init__(self, calibration_path: str = "ff_analytics/calibration_profile.json"):
        self.cal_path = calibration_path
        self.profile = self._load_or_create()

    def _load_or_create(self) -> CalibrationProfile:
        if os.path.exists(self.cal_path):
            with open(self.cal_path) as f:
                data = json.loads(f.read())
            return CalibrationProfile(**{k: v for k, v in data.items()
                                        if k in CalibrationProfile.__dataclass_fields__})
        return CalibrationProfile()

    def save(self):
        data = {k: v for k, v in self.profile.__dict__.items()}
        # Convert numpy types
        for k, v in data.items():
            if isinstance(v, np.floating):
                data[k] = float(v)
            elif isinstance(v, np.integer):
                data[k] = int(v)
        Path(self.cal_path).parent.mkdir(parents=True, exist_ok=True)
        with open(self.cal_path, "w") as f:
            json.dump(data, f, indent=2)

    # ── Supervised Calibration ───────────────────────────────────

    def calibrate_from_ground_truth(
        self,
        detected_snaps: list[dict],
        ground_truth_plays: list[dict],
        match_window_sec: float = 5.0,
    ) -> dict:
        """Compare detected snaps against coach-provided timestamps.

        Args:
            detected_snaps: List of {time, timestamp, ...} from snap detector.
            ground_truth_plays: List of {time_sec, event, ...} from coach.
            match_window_sec: How close a detection must be to ground truth
                to count as a match.

        Returns:
            Dict with accuracy metrics and recommended threshold adjustments.
        """
        gt_times = [p["time_sec"] for p in ground_truth_plays]
        det_times = [s["time"] for s in detected_snaps]

        # Match detections to ground truth
        matched_gt = set()
        matched_det = set()

        for i, gt_t in enumerate(gt_times):
            best_dist = float("inf")
            best_j = -1
            for j, det_t in enumerate(det_times):
                if j in matched_det:
                    continue
                dist = abs(gt_t - det_t)
                if dist < best_dist and dist < match_window_sec:
                    best_dist = dist
                    best_j = j

            if best_j >= 0:
                matched_gt.add(i)
                matched_det.add(best_j)

        true_positives = len(matched_gt)
        false_negatives = len(gt_times) - true_positives  # missed snaps
        false_positives = len(det_times) - len(matched_det)  # false detections

        precision = true_positives / max(true_positives + false_positives, 1)
        recall = true_positives / max(true_positives + false_negatives, 1)
        f1 = 2 * precision * recall / max(precision + recall, 0.001)

        result = {
            "ground_truth_plays": len(gt_times),
            "detected_snaps": len(det_times),
            "true_positives": true_positives,
            "false_negatives": false_negatives,
            "false_positives": false_positives,
            "precision": round(precision, 3),
            "recall": round(recall, 3),
            "f1_score": round(f1, 3),
        }

        # Recommend adjustments
        if false_positives > false_negatives * 2:
            result["recommendation"] = "Too many false detections. RAISE explosion threshold."
            self.profile.snap_explosion_threshold *= 1.1
        elif false_negatives > false_positives * 2:
            result["recommendation"] = "Missing too many snaps. LOWER explosion threshold."
            self.profile.snap_explosion_threshold *= 0.9

        self.profile.games_calibrated += 1
        self.profile.total_plays_seen += len(gt_times)
        self.profile.accuracy_scores.append(round(f1, 3))

        self.save()
        return result

    # ── Self-Calibration from Multiple Games ─────────────────────

    def self_calibrate(self, game_results: list[dict]) -> dict:
        """Auto-calibrate from multiple games without ground truth.

        Uses cross-game consistency: if a threshold produces similar
        snap counts per minute across many games, it's likely correct.

        Args:
            game_results: List of game analysis results, each with:
                duration_min, snaps_detected, tds_detected, drives, etc.

        Returns:
            Calibration report with adjusted thresholds.
        """
        if len(game_results) < 3:
            return {"status": "Need 3+ games for self-calibration"}

        # Expected: ~1.2-1.5 snaps per minute in flag football
        # (40-min game = 48-60 plays)
        snaps_per_min = [
            g["snaps_detected"] / max(g["duration_min"], 1)
            for g in game_results
        ]

        avg_spm = np.mean(snaps_per_min)
        std_spm = np.std(snaps_per_min)

        # If snap rate is too high (>2/min), raise thresholds
        # If too low (<0.8/min), lower thresholds
        if avg_spm > 2.0:
            self.profile.snap_explosion_threshold *= 1.05
            self.profile.snap_stillness_threshold += 0.02
            adjustment = "Raised snap thresholds (too many detections)"
        elif avg_spm < 0.8:
            self.profile.snap_explosion_threshold *= 0.95
            self.profile.snap_stillness_threshold -= 0.02
            adjustment = "Lowered snap thresholds (missing snaps)"
        else:
            adjustment = "Thresholds look good"

        # TD detection: expect 2-4 TDs per game on average
        tds = [g.get("tds_detected", 0) for g in game_results]
        avg_tds = np.mean(tds)

        if avg_tds > 5:
            self.profile.score_field_position_threshold = min(76, self.profile.score_field_position_threshold + 1)
            self.profile.score_gap_threshold_sec = min(120, self.profile.score_gap_threshold_sec + 5)
            td_adjustment = "Tightened scoring thresholds (too many false TDs)"
        elif avg_tds < 1:
            self.profile.score_field_position_threshold = max(65, self.profile.score_field_position_threshold - 2)
            self.profile.score_gap_threshold_sec = max(60, self.profile.score_gap_threshold_sec - 5)
            td_adjustment = "Loosened scoring thresholds (missing TDs)"
        else:
            td_adjustment = "TD detection looks good"

        self.profile.games_calibrated += len(game_results)
        self.save()

        return {
            "games_analyzed": len(game_results),
            "avg_snaps_per_minute": round(avg_spm, 2),
            "snap_rate_std": round(std_spm, 2),
            "avg_tds_per_game": round(avg_tds, 1),
            "snap_adjustment": adjustment,
            "td_adjustment": td_adjustment,
            "current_profile": {
                "snap_explosion": self.profile.snap_explosion_threshold,
                "snap_stillness": self.profile.snap_stillness_threshold,
                "score_field_pos": self.profile.score_field_position_threshold,
                "score_gap": self.profile.score_gap_threshold_sec,
            },
        }

    # ── Ground Truth Input Format ────────────────────────────────

    @staticmethod
    def parse_coach_index(text: str) -> list[dict]:
        """Parse coach-provided play-by-play text into structured data.

        Expected format (one play per line):
            2:58 - Gators ball, 1st play, pass incomplete
            3:15 - Gators ball, 2nd play, run left, 5 yards
            3:38 - Gators ball, 3rd play, pass complete, 12 yards, FIRST DOWN
            4:20 - Tennessee ball, 1st play, run middle

        Returns list of {time_str, time_sec, team, description, ...}
        """
        plays = []
        for line in text.strip().split("\n"):
            line = line.strip()
            if not line or line.startswith("#"):
                continue

            # Parse timestamp
            parts = line.split(" - ", 1)
            if len(parts) != 2:
                continue

            time_str = parts[0].strip()
            description = parts[1].strip()

            # Parse MM:SS
            time_parts = time_str.replace(".", ":").split(":")
            try:
                if len(time_parts) == 2:
                    t_sec = int(time_parts[0]) * 60 + int(time_parts[1])
                else:
                    t_sec = int(time_parts[0])
            except ValueError:
                continue

            # Extract team
            team = ""
            desc_lower = description.lower()
            for word in description.split():
                if word.lower() in ("ball,", "ball"):
                    break
                team += word + " "
            team = team.strip().rstrip(",")

            # Detect event type
            event = "play"
            if "td" in desc_lower or "touchdown" in desc_lower:
                event = "touchdown"
            elif "interception" in desc_lower or "int" in desc_lower or "pick" in desc_lower:
                event = "interception"
            elif "punt" in desc_lower:
                event = "punt"
            elif "penalty" in desc_lower or "flag guard" in desc_lower:
                event = "penalty"
            elif "first down" in desc_lower:
                event = "first_down"
            elif "turnover" in desc_lower:
                event = "turnover_on_downs"
            elif "xp" in desc_lower or "extra point" in desc_lower:
                event = "extra_point"

            plays.append({
                "time_str": time_str,
                "time_sec": t_sec,
                "team": team,
                "description": description,
                "event": event,
            })

        return plays
