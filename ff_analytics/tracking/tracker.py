"""
Multi-object tracker using ByteTrack algorithm.

Maintains stable track IDs across frames even through brief occlusions.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Optional

import numpy as np

from .detector import Detection


@dataclass
class Track:
    """A tracked individual across frames."""
    track_id: int
    bbox: tuple[int, int, int, int]  # latest (x1, y1, x2, y2)
    confidence: float
    age: int = 0  # frames since first seen
    hits: int = 1  # frames where matched
    misses: int = 0  # consecutive frames without match
    velocity: tuple[float, float] = (0.0, 0.0)
    history: list[tuple[int, int, int, int]] = field(default_factory=list)

    @property
    def center(self) -> tuple[float, float]:
        x1, y1, x2, y2 = self.bbox
        return ((x1 + x2) / 2, (y1 + y2) / 2)

    @property
    def bottom_center(self) -> tuple[float, float]:
        x1, y1, x2, y2 = self.bbox
        return ((x1 + x2) / 2, float(y2))

    @property
    def is_confirmed(self) -> bool:
        return self.hits >= 3

    @property
    def is_lost(self) -> bool:
        return self.misses > 30  # ~1 second at 30fps


class ByteTracker:
    """Simplified ByteTrack-style multi-object tracker.

    Two-stage association:
    1. High-confidence detections matched to existing tracks via IoU.
    2. Low-confidence detections matched to remaining tracks.
    3. Unmatched detections start new tracks.
    4. Unmatched tracks get their miss counter incremented.
    """

    def __init__(
        self,
        high_thresh: float = 0.5,
        low_thresh: float = 0.1,
        iou_threshold: float = 0.3,
        max_age: int = 30,
    ) -> None:
        self.high_thresh = high_thresh
        self.low_thresh = low_thresh
        self.iou_threshold = iou_threshold
        self.max_age = max_age
        self.tracks: list[Track] = []
        self._next_id = 1

    def update(self, detections: list[Detection]) -> list[Track]:
        """Update tracks with new detections.

        Args:
            detections: Detections from current frame.

        Returns:
            List of confirmed active tracks after update.
        """
        # Split detections by confidence
        high_dets = [d for d in detections if d.confidence >= self.high_thresh]
        low_dets = [d for d in detections if self.low_thresh <= d.confidence < self.high_thresh]

        # Stage 1: match high-confidence detections to tracks
        matched_track_indices_1: set[int] = set()
        matched_det_indices_1: set[int] = set()

        if self.tracks and high_dets:
            iou_matrix = self._compute_iou_matrix(self.tracks, high_dets)
            matches = self._greedy_match(iou_matrix, self.iou_threshold)
            for t_idx, d_idx in matches:
                self._update_track(self.tracks[t_idx], high_dets[d_idx])
                matched_track_indices_1.add(t_idx)
                matched_det_indices_1.add(d_idx)

        # Stage 2: match low-confidence detections to unmatched tracks
        unmatched_tracks = [
            (i, t) for i, t in enumerate(self.tracks)
            if i not in matched_track_indices_1
        ]
        if unmatched_tracks and low_dets:
            um_tracks = [t for _, t in unmatched_tracks]
            iou_matrix = self._compute_iou_matrix(um_tracks, low_dets)
            matches = self._greedy_match(iou_matrix, self.iou_threshold)
            for ut_idx, d_idx in matches:
                orig_idx = unmatched_tracks[ut_idx][0]
                self._update_track(self.tracks[orig_idx], low_dets[d_idx])
                matched_track_indices_1.add(orig_idx)

        # Increment miss counter for unmatched tracks
        for i, track in enumerate(self.tracks):
            if i not in matched_track_indices_1:
                track.misses += 1
                track.age += 1

        # Create new tracks for unmatched high-confidence detections
        for i, det in enumerate(high_dets):
            if i not in matched_det_indices_1:
                new_track = Track(
                    track_id=self._next_id,
                    bbox=det.bbox,
                    confidence=det.confidence,
                )
                self._next_id += 1
                self.tracks.append(new_track)

        # Remove dead tracks
        self.tracks = [t for t in self.tracks if not t.is_lost]

        # Return confirmed tracks
        return [t for t in self.tracks if t.is_confirmed]

    def _update_track(self, track: Track, detection: Detection) -> None:
        """Update a track with a matched detection."""
        old_cx, old_cy = track.center
        track.bbox = detection.bbox
        track.confidence = detection.confidence
        track.hits += 1
        track.misses = 0
        track.age += 1
        new_cx, new_cy = track.center
        track.velocity = (new_cx - old_cx, new_cy - old_cy)
        track.history.append(detection.bbox)
        # Keep history bounded
        if len(track.history) > 300:
            track.history = track.history[-300:]

    @staticmethod
    def _compute_iou_matrix(
        tracks: list[Track], detections: list[Detection]
    ) -> np.ndarray:
        """Compute IoU between all track-detection pairs."""
        n_tracks = len(tracks)
        n_dets = len(detections)
        iou_matrix = np.zeros((n_tracks, n_dets), dtype=np.float32)

        for i, track in enumerate(tracks):
            for j, det in enumerate(detections):
                iou_matrix[i, j] = _compute_iou(track.bbox, det.bbox)

        return iou_matrix

    @staticmethod
    def _greedy_match(
        iou_matrix: np.ndarray, threshold: float
    ) -> list[tuple[int, int]]:
        """Greedy matching by descending IoU."""
        matches = []
        if iou_matrix.size == 0:
            return matches

        used_rows: set[int] = set()
        used_cols: set[int] = set()

        # Flatten and sort by IoU descending
        flat_indices = np.argsort(-iou_matrix.ravel())
        for flat_idx in flat_indices:
            row = int(flat_idx // iou_matrix.shape[1])
            col = int(flat_idx % iou_matrix.shape[1])
            if row in used_rows or col in used_cols:
                continue
            if iou_matrix[row, col] < threshold:
                break
            matches.append((row, col))
            used_rows.add(row)
            used_cols.add(col)

        return matches


def _compute_iou(
    box1: tuple[int, int, int, int],
    box2: tuple[int, int, int, int],
) -> float:
    """Compute IoU between two bounding boxes."""
    x1 = max(box1[0], box2[0])
    y1 = max(box1[1], box2[1])
    x2 = min(box1[2], box2[2])
    y2 = min(box1[3], box2[3])

    intersection = max(0, x2 - x1) * max(0, y2 - y1)
    area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])
    union = area1 + area2 - intersection

    return intersection / union if union > 0 else 0.0
