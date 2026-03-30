"""
Track consolidation — merge fragmented tracks into persistent player identities.

When the tracker loses a person (occlusion, leaving frame) and picks them
up again with a new track ID, this module attempts to merge the fragments
into a single continuous identity using appearance similarity, position
continuity, and team assignment.
"""

from __future__ import annotations

import json
from collections import defaultdict
from dataclasses import dataclass, field
from typing import Optional

import cv2
import numpy as np


@dataclass
class TrackFragment:
    """A segment of continuous tracking for one person."""
    track_id: int
    team_label: int
    start_frame: int
    end_frame: int
    start_time: float
    end_time: float
    frame_count: int
    avg_x: float
    avg_y: float
    bbox_samples: list[tuple[int, int, int, int]] = field(default_factory=list)
    color_histogram: Optional[np.ndarray] = None


@dataclass
class ConsolidatedPlayer:
    """A merged player identity from multiple track fragments."""
    player_id: int
    team_label: int
    fragment_track_ids: list[int]
    total_frames: int
    total_time_seconds: float
    avg_x: float
    avg_y: float
    first_seen_time: float
    last_seen_time: float
    assigned_name: Optional[str] = None


class TrackConsolidator:
    """Merge fragmented tracks into consolidated player identities.

    Algorithm:
    1. Build a TrackFragment for each unique track_id (summarize its
       time range, team, average position, and appearance).
    2. For each pair of fragments on the same team:
       a. Check temporal gap — must be < max_gap_seconds.
       b. Check spatial proximity — end position of earlier fragment
          must be near start position of later fragment.
       c. Check appearance similarity (color histogram of jersey region).
    3. Greedily merge fragments that pass all three checks.
    4. Output ConsolidatedPlayer objects with unique IDs.
    """

    def __init__(
        self,
        max_gap_seconds: float = 30.0,
        max_spatial_distance_pixels: float = 200.0,
        min_appearance_similarity: float = 0.6,
        min_fragment_frames: int = 5,
    ) -> None:
        """
        Args:
            max_gap_seconds: Maximum time gap to merge two fragments.
            max_spatial_distance_pixels: Max distance between end of one
                fragment and start of next to consider merging.
            min_appearance_similarity: Minimum histogram correlation to merge.
            min_fragment_frames: Ignore fragments shorter than this.
        """
        self.max_gap_seconds = max_gap_seconds
        self.max_spatial_distance = max_spatial_distance_pixels
        self.min_appearance_sim = min_appearance_similarity
        self.min_fragment_frames = min_fragment_frames

    def consolidate(
        self,
        tracking_records: list[dict],
        video_path: Optional[str] = None,
        fps: float = 30.0,
    ) -> list[ConsolidatedPlayer]:
        """Consolidate fragmented tracks into player identities.

        Args:
            tracking_records: List of tracking record dicts with keys:
                frame_idx, time, track_id, team_label, x_pixel, y_pixel,
                bbox_x1, bbox_y1, bbox_x2, bbox_y2.
            video_path: Optional video path for appearance extraction.
            fps: Video FPS for time calculations.

        Returns:
            List of ConsolidatedPlayer objects.
        """
        # Step 1: Build fragments
        fragments = self._build_fragments(tracking_records)
        print(f"Built {len(fragments)} track fragments (>= {self.min_fragment_frames} frames)")

        # Step 2: Extract appearance features if video available
        if video_path:
            self._extract_appearances(fragments, video_path)

        # Step 3: Merge fragments
        merged = self._merge_fragments(fragments)
        print(f"Consolidated into {len(merged)} player identities")

        return merged

    def _build_fragments(self, records: list[dict]) -> list[TrackFragment]:
        """Build TrackFragment objects from raw records."""
        track_data: dict[int, list[dict]] = defaultdict(list)
        for r in records:
            track_data[r['track_id']].append(r)

        fragments = []
        for tid, recs in track_data.items():
            if len(recs) < self.min_fragment_frames:
                continue

            recs.sort(key=lambda r: r['frame_idx'])
            team_votes = [r.get('team_label', -1) for r in recs if r.get('team_label', -1) >= 0]
            team = max(set(team_votes), key=team_votes.count) if team_votes else -1

            xs = [r['x_pixel'] for r in recs]
            ys = [r['y_pixel'] for r in recs]

            # Sample some bboxes for appearance
            step = max(1, len(recs) // 5)
            bbox_samples = [
                (r['bbox_x1'], r['bbox_y1'], r['bbox_x2'], r['bbox_y2'])
                for r in recs[::step]
            ][:5]

            fragments.append(TrackFragment(
                track_id=tid,
                team_label=team,
                start_frame=recs[0]['frame_idx'],
                end_frame=recs[-1]['frame_idx'],
                start_time=recs[0]['time'],
                end_time=recs[-1]['time'],
                frame_count=len(recs),
                avg_x=np.mean(xs),
                avg_y=np.mean(ys),
                bbox_samples=bbox_samples,
            ))

        return fragments

    def _extract_appearances(
        self, fragments: list[TrackFragment], video_path: str
    ) -> None:
        """Extract color histograms from video for each fragment."""
        cap = cv2.VideoCapture(video_path)

        for frag in fragments:
            if not frag.bbox_samples:
                continue

            # Use middle bbox sample
            mid_idx = len(frag.bbox_samples) // 2
            bbox = frag.bbox_samples[mid_idx]
            frame_idx = (frag.start_frame + frag.end_frame) // 2

            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
            ret, frame = cap.read()
            if not ret:
                continue

            x1, y1, x2, y2 = bbox
            x1, y1 = max(0, x1), max(0, y1)
            x2 = min(frame.shape[1], x2)
            y2 = min(frame.shape[0], y2)

            crop = frame[y1:y2, x1:x2]
            if crop.size == 0:
                continue

            # Compute HSV histogram of torso region
            h = y2 - y1
            torso = crop[int(h * 0.2):int(h * 0.6), :]
            if torso.size == 0:
                continue

            hsv = cv2.cvtColor(torso, cv2.COLOR_BGR2HSV)
            hist = cv2.calcHist([hsv], [0, 1], None, [30, 32], [0, 180, 0, 256])
            cv2.normalize(hist, hist)
            frag.color_histogram = hist

        cap.release()

    def _merge_fragments(
        self, fragments: list[TrackFragment]
    ) -> list[ConsolidatedPlayer]:
        """Merge compatible fragments into consolidated players."""
        # Sort by start time
        fragments.sort(key=lambda f: f.start_time)

        # Union-find structure
        parent: dict[int, int] = {f.track_id: f.track_id for f in fragments}

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: int, b: int) -> None:
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        # Check all pairs within the same team
        frag_by_id = {f.track_id: f for f in fragments}

        for i, f1 in enumerate(fragments):
            for j in range(i + 1, len(fragments)):
                f2 = fragments[j]

                # Must be same team
                if f1.team_label != f2.team_label or f1.team_label < 0:
                    continue

                # Already merged?
                if find(f1.track_id) == find(f2.track_id):
                    continue

                # Check temporal gap
                gap = f2.start_time - f1.end_time
                if gap < 0 or gap > self.max_gap_seconds:
                    continue

                # Check spatial proximity (end of f1 near start of f2)
                dist = np.sqrt(
                    (f1.avg_x - f2.avg_x) ** 2 + (f1.avg_y - f2.avg_y) ** 2
                )
                if dist > self.max_spatial_distance:
                    continue

                # Check appearance similarity
                if f1.color_histogram is not None and f2.color_histogram is not None:
                    sim = cv2.compareHist(
                        f1.color_histogram, f2.color_histogram, cv2.HISTCMP_CORREL
                    )
                    if sim < self.min_appearance_sim:
                        continue

                union(f1.track_id, f2.track_id)

        # Build consolidated players from merged groups
        groups: dict[int, list[TrackFragment]] = defaultdict(list)
        for f in fragments:
            root = find(f.track_id)
            groups[root].append(f)

        players = []
        for pid, (root, group) in enumerate(groups.items(), start=1):
            group.sort(key=lambda f: f.start_time)
            total_frames = sum(f.frame_count for f in group)
            total_time = sum(f.end_time - f.start_time for f in group)

            all_xs = [f.avg_x for f in group]
            all_ys = [f.avg_y for f in group]

            players.append(ConsolidatedPlayer(
                player_id=pid,
                team_label=group[0].team_label,
                fragment_track_ids=[f.track_id for f in group],
                total_frames=total_frames,
                total_time_seconds=round(total_time, 1),
                avg_x=float(np.mean(all_xs)),
                avg_y=float(np.mean(all_ys)),
                first_seen_time=group[0].start_time,
                last_seen_time=group[-1].end_time,
            ))

        # Sort by total time descending
        players.sort(key=lambda p: p.total_frames, reverse=True)

        return players

    def save_mapping(
        self, players: list[ConsolidatedPlayer], path: str
    ) -> None:
        """Save track-to-player mapping as JSON."""
        data = {
            "players": [
                {
                    "player_id": p.player_id,
                    "team": p.team_label,
                    "track_ids": p.fragment_track_ids,
                    "total_frames": p.total_frames,
                    "total_time_seconds": p.total_time_seconds,
                    "avg_position": [round(p.avg_x, 1), round(p.avg_y, 1)],
                    "first_seen": p.first_seen_time,
                    "last_seen": p.last_seen_time,
                    "name": p.assigned_name,
                }
                for p in players
            ],
            "track_to_player": {
                str(tid): p.player_id
                for p in players
                for tid in p.fragment_track_ids
            },
        }
        with open(path, 'w') as f:
            json.dump(data, f, indent=2)
