"""
Team identification via jersey color clustering.

Given tracked player bounding boxes, extract dominant jersey colors
and cluster into two teams using K-means on HSV color features.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

import cv2
import numpy as np

from .detector import Detection


@dataclass
class TeamAssignment:
    """Team assignment for a single detection."""
    track_id: int
    team_label: int  # 0 or 1
    dominant_color_hsv: tuple[float, float, float]
    confidence: float


class TeamIdentifier:
    """Separate players into two teams based on jersey color.

    Process:
    1. Extract the torso region from each detection bbox.
    2. Compute dominant color in HSV space (ignoring skin tones and field green).
    3. Run K-means (k=2) across all detections in a frame batch to cluster teams.
    4. Optionally map cluster labels to known team colors.
    """

    def __init__(
        self,
        known_team_colors: Optional[dict[str, tuple[float, float, float]]] = None,
    ) -> None:
        """Initialize team identifier.

        Args:
            known_team_colors: Optional dict mapping team name → HSV color.
                Example: {"Gators": (110, 200, 180), "Tennessee": (0, 0, 240)}
        """
        self.known_team_colors = known_team_colors or {}
        self.cluster_centers: Optional[np.ndarray] = None
        self.team_label_map: dict[int, str] = {}

    def extract_jersey_color(
        self, frame: np.ndarray, bbox: tuple[int, int, int, int]
    ) -> np.ndarray:
        """Extract dominant jersey color from a detection bbox.

        Focuses on the upper-middle region (torso) and filters out
        skin tones and green (field) pixels.

        Args:
            frame: Full BGR image.
            bbox: (x1, y1, x2, y2) bounding box.

        Returns:
            Mean HSV color of the jersey region as 1x3 array.
        """
        x1, y1, x2, y2 = bbox
        h = y2 - y1
        w = x2 - x1

        # Torso region: middle 60% width, 20%-60% height
        torso_x1 = x1 + int(w * 0.2)
        torso_x2 = x1 + int(w * 0.8)
        torso_y1 = y1 + int(h * 0.2)
        torso_y2 = y1 + int(h * 0.6)

        # Clamp to frame bounds
        torso_x1 = max(0, torso_x1)
        torso_x2 = min(frame.shape[1], torso_x2)
        torso_y1 = max(0, torso_y1)
        torso_y2 = min(frame.shape[0], torso_y2)

        if torso_x2 <= torso_x1 or torso_y2 <= torso_y1:
            return np.array([0.0, 0.0, 0.0])

        crop = frame[torso_y1:torso_y2, torso_x1:torso_x2]
        hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)

        # Mask out green (field) and skin-tone pixels
        # Green: H=35-85, S>40
        # Skin: H=0-25, S=30-170, V>80
        h_ch, s_ch, v_ch = cv2.split(hsv)

        green_mask = (h_ch >= 35) & (h_ch <= 85) & (s_ch > 40)
        skin_mask = (h_ch <= 25) & (s_ch >= 30) & (s_ch <= 170) & (v_ch > 80)
        exclude_mask = green_mask | skin_mask

        valid_pixels = hsv[~exclude_mask]

        if len(valid_pixels) < 10:
            # Not enough valid pixels, use all
            valid_pixels = hsv.reshape(-1, 3)

        if len(valid_pixels) == 0:
            return np.array([0.0, 0.0, 0.0])

        return valid_pixels.mean(axis=0)

    def cluster_teams(
        self,
        frame: np.ndarray,
        detections: list[Detection],
        track_ids: list[int],
    ) -> list[TeamAssignment]:
        """Assign detections to two teams via K-means on jersey color.

        Args:
            frame: Current BGR frame.
            detections: List of person detections.
            track_ids: Corresponding track IDs.

        Returns:
            List of TeamAssignment objects.
        """
        if len(detections) < 2:
            return [
                TeamAssignment(tid, 0, (0, 0, 0), 0.5)
                for tid in track_ids
            ]

        colors = np.array([
            self.extract_jersey_color(frame, det.bbox)
            for det in detections
        ], dtype=np.float32)

        # K-means clustering
        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 1.0)
        k = 2
        _, labels, centers = cv2.kmeans(
            colors, k, None, criteria, 10, cv2.KMEANS_PP_CENTERS
        )

        self.cluster_centers = centers

        # Map clusters to known team colors if provided
        if self.known_team_colors:
            self._map_clusters_to_teams(centers)

        assignments = []
        for i, (det, tid) in enumerate(zip(detections, track_ids)):
            label = int(labels[i][0])
            # Confidence = distance ratio (how much closer to assigned cluster)
            d0 = np.linalg.norm(colors[i] - centers[0])
            d1 = np.linalg.norm(colors[i] - centers[1])
            max_d = max(d0, d1, 1e-6)
            if label == 0:
                conf = 1.0 - d0 / max_d
            else:
                conf = 1.0 - d1 / max_d

            assignments.append(TeamAssignment(
                track_id=tid,
                team_label=label,
                dominant_color_hsv=tuple(colors[i].tolist()),
                confidence=float(conf),
            ))

        return assignments

    def _map_clusters_to_teams(self, centers: np.ndarray) -> None:
        """Map K-means cluster indices to known team names.

        Assigns each cluster center to the closest known team color.
        """
        self.team_label_map = {}
        used_teams: set[str] = set()

        for cluster_idx in range(len(centers)):
            best_team = None
            best_dist = float("inf")
            for team_name, team_hsv in self.known_team_colors.items():
                if team_name in used_teams:
                    continue
                dist = float(np.linalg.norm(centers[cluster_idx] - np.array(team_hsv)))
                if dist < best_dist:
                    best_dist = dist
                    best_team = team_name
            if best_team:
                self.team_label_map[cluster_idx] = best_team
                used_teams.add(best_team)

    def get_team_name(self, cluster_label: int) -> str:
        """Get the team name for a cluster label."""
        return self.team_label_map.get(cluster_label, f"Team_{cluster_label}")
