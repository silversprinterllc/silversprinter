"""
Referee and coach detection and filtering.

Detects NON-PLAYERS (referees and on-field coaches) and excludes them
from player tracking, formation classification, and coverage reads.

Referee detection:
1. Striped shirt pattern (high row-to-row brightness variance)
2. Low saturation (black/white stripes)

Coach detection (youth leagues — coaches on the field):
1. Larger bounding boxes (adults are taller than youth players)
2. Low post-snap velocity (coaches stay stationary during plays)
3. Different jersey colors from both teams
4. Often in the deep backfield, not near the LOS
"""

from __future__ import annotations

from collections import Counter, defaultdict
from typing import Optional

import cv2
import numpy as np


class RefereeFilter:
    """Detect and filter referee detections from tracking data."""

    def __init__(
        self,
        stripe_threshold: float = 14.0,
        saturation_max: float = 90.0,
        ref_vote_threshold: float = 0.4,
    ):
        """
        Args:
            stripe_threshold: Min row-to-row brightness variance to flag as striped.
            saturation_max: Max avg HSV saturation for a ref (refs are low-sat black/white).
            ref_vote_threshold: Fraction of frames a track must be flagged as ref
                to be classified as ref (handles noisy detections).
        """
        self.stripe_threshold = stripe_threshold
        self.saturation_max = saturation_max
        self.ref_vote_threshold = ref_vote_threshold
        self.ref_track_ids: set[int] = set()

    def classify_track(
        self, frame: np.ndarray, bbox: tuple[int, int, int, int]
    ) -> tuple[bool, float, float]:
        """Check if a single detection is a referee.

        Args:
            frame: BGR image.
            bbox: (x1, y1, x2, y2) bounding box.

        Returns:
            (is_ref, stripe_score, saturation)
        """
        x1, y1, x2, y2 = bbox
        h = y2 - y1
        w = x2 - x1
        if h < 25 or w < 12:
            return False, 0.0, 0.0

        # Extract torso
        ty1 = max(0, y1 + int(h * 0.15))
        ty2 = min(frame.shape[0], y1 + int(h * 0.55))
        tx1 = max(0, x1 + int(w * 0.1))
        tx2 = min(frame.shape[1], x1 + int(w * 0.9))

        torso = frame[ty1:ty2, tx1:tx2]
        if torso.size == 0 or torso.shape[0] < 5:
            return False, 0.0, 0.0

        # Stripe detection
        gray = cv2.cvtColor(torso, cv2.COLOR_BGR2GRAY)
        row_means = np.mean(gray, axis=1)
        diffs = np.abs(np.diff(row_means))
        stripe_score = float(np.mean(diffs))

        # Saturation check
        hsv = cv2.cvtColor(torso, cv2.COLOR_BGR2HSV)
        avg_sat = float(np.mean(hsv[:, :, 1]))

        is_ref = stripe_score > self.stripe_threshold and avg_sat < self.saturation_max
        return is_ref, stripe_score, avg_sat

    def scan_video_for_refs(
        self,
        video_path: str,
        tracking_records: list[dict],
        sample_interval: int = 30,
    ) -> set[int]:
        """Scan tracking records and classify which tracks are referees.

        Samples frames periodically and checks each tracked person.
        A track is classified as ref if >40% of its samples flag as ref.

        Args:
            video_path: Path to video file.
            tracking_records: List of tracking record dicts.
            sample_interval: Check every Nth unique frame.

        Returns:
            Set of track_ids that are referees.
        """
        cap = cv2.VideoCapture(video_path)

        # Group records by frame
        by_frame: dict[int, list[dict]] = defaultdict(list)
        for r in tracking_records:
            by_frame[r["frame_idx"]].append(r)

        frame_indices = sorted(by_frame.keys())

        # Vote tracking: how many times each track looks like a ref
        ref_votes: dict[int, int] = defaultdict(int)
        total_votes: dict[int, int] = defaultdict(int)

        for i, fi in enumerate(frame_indices):
            if i % sample_interval != 0:
                continue

            cap.set(cv2.CAP_PROP_POS_FRAMES, fi)
            ret, frame = cap.read()
            if not ret:
                continue

            for r in by_frame[fi]:
                tid = r["track_id"]
                bbox = (r["bbox_x1"], r["bbox_y1"], r["bbox_x2"], r["bbox_y2"])
                is_ref, _, _ = self.classify_track(frame, bbox)
                total_votes[tid] += 1
                if is_ref:
                    ref_votes[tid] += 1

        cap.release()

        # Classify tracks
        self.ref_track_ids = set()
        for tid, votes in ref_votes.items():
            total = total_votes.get(tid, 1)
            if votes / total >= self.ref_vote_threshold:
                self.ref_track_ids.add(tid)

        return self.ref_track_ids

    def filter_records(self, records: list[dict]) -> list[dict]:
        """Remove referee records from tracking data.

        Args:
            records: Full tracking record list.

        Returns:
            Filtered list with referee tracks removed.
        """
        return [r for r in records if r["track_id"] not in self.ref_track_ids]

    def get_ref_count(self) -> int:
        return len(self.ref_track_ids)

    # ── Coach Detection ──────────────────────────────────────────

    def detect_coaches(
        self,
        tracking_records: list[dict],
        player_height_percentile: float = 0.7,
        min_frames: int = 20,
    ) -> set[int]:
        """Detect on-field coaches from tracking data.

        Coaches are adults in a youth game — they're taller (larger bounding boxes)
        and stay relatively stationary during plays (low velocity post-snap).

        Args:
            tracking_records: List of tracking record dicts.
            player_height_percentile: Bbox height above this percentile = possible adult.
            min_frames: Minimum frames to evaluate a track.

        Returns:
            Set of track_ids classified as coaches.
        """
        # Compute bbox height per track
        track_heights: dict[int, list[int]] = defaultdict(list)
        track_velocities: dict[int, list[float]] = defaultdict(list)
        track_positions: dict[int, list[tuple]] = defaultdict(list)

        for r in tracking_records:
            tid = r["track_id"]
            h = r["bbox_y2"] - r["bbox_y1"]
            track_heights[tid].append(h)
            track_positions[tid].append((r["x_pixel"], r["y_pixel"], r["time"]))

        # Compute per-track velocity (how much they move during plays)
        for tid, positions in track_positions.items():
            if len(positions) < 3:
                continue
            positions.sort(key=lambda p: p[2])
            for i in range(1, len(positions)):
                dt = positions[i][2] - positions[i-1][2]
                if 0 < dt < 1:
                    dx = positions[i][0] - positions[i-1][0]
                    dy = positions[i][1] - positions[i-1][1]
                    v = (dx*dx + dy*dy) ** 0.5 / dt
                    track_velocities[tid].append(v)

        # Find height threshold (top 30% = likely adults)
        all_heights = []
        for tid, heights in track_heights.items():
            if len(heights) >= min_frames:
                all_heights.append(np.median(heights))

        if not all_heights:
            return set()

        height_threshold = np.percentile(all_heights, player_height_percentile * 100)

        # Coaches = tall (above threshold) AND slow (low avg velocity)
        coach_ids = set()
        for tid, heights in track_heights.items():
            if len(heights) < min_frames:
                continue

            median_h = np.median(heights)
            avg_velocity = np.mean(track_velocities.get(tid, [0])) if track_velocities.get(tid) else 0

            # Adult-sized AND stationary during plays
            if median_h > height_threshold and avg_velocity < 15:
                coach_ids.add(tid)

        self.coach_track_ids = coach_ids
        return coach_ids

    def filter_all_non_players(self, records: list[dict]) -> list[dict]:
        """Remove both referee and coach records."""
        exclude = self.ref_track_ids | getattr(self, "coach_track_ids", set())
        return [r for r in records if r["track_id"] not in exclude]

    def get_non_player_count(self) -> int:
        return len(self.ref_track_ids) + len(getattr(self, "coach_track_ids", set()))
