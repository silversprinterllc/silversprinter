"""
Route Tree Classifier — identifies receiver routes from post-snap tracking data.

Classifies the 9 core route tree branches from player movement vectors:
1. Go/Fly/Streak — straight vertical deep
2. Post — vertical then cut inside at 12-15 yards
3. Corner/Flag — vertical then cut outside at 12-15 yards
4. Out — vertical then hard cut outside at 8-12 yards
5. In/Dig/Cross — vertical then hard cut inside at 8-12 yards
6. Curl/Comeback — vertical then turn back toward QB
7. Slant — quick inside cut at 3-5 yards
8. Flat/Arrow — immediate outside lateral route
9. Screen/Swing — behind LOS then lateral

Detection method:
1. Isolate offensive skill players (not QB, not center)
2. Track their movement vector for 2-3 seconds post-snap
3. Decompose into: initial direction, break point (if any), final direction
4. Classify based on break angle, depth, and direction
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Optional

import numpy as np


@dataclass
class RouteResult:
    player_track_id: int
    route_name: str
    confidence: float
    depth_yards: float       # how far downfield before the break
    break_angle: float       # angle of the cut (0 = straight, 90 = hard cut)
    direction: str           # "inside", "outside", "vertical", "lateral"
    is_deep: bool            # route goes 15+ yards
    raw_path: list[tuple]    # [(x, y), ...] pixel positions


class RouteClassifier:
    """Classify receiver routes from post-snap movement data."""

    def __init__(self, px_per_yard: float = 8.0):
        self.px_per_yard = px_per_yard

    def classify_routes(
        self,
        snap_time: float,
        records: list[dict],
        offense_tracks: list[int],
        qb_track: Optional[int] = None,
        los_y: Optional[float] = None,
    ) -> list[RouteResult]:
        """Classify routes for all offensive skill players on a play.

        Args:
            snap_time: Time of the snap in seconds.
            records: All tracking records for this game.
            offense_tracks: Track IDs of offensive players.
            qb_track: Track ID of the QB (excluded from route analysis).
            los_y: Y-pixel of the line of scrimmage.

        Returns:
            List of RouteResult for each receiver.
        """
        # Get post-snap movement (0.5s to 3s after snap)
        post_snap = [r for r in records
                     if snap_time + 0.3 <= r["time"] <= snap_time + 3.0
                     and r["track_id"] in offense_tracks]

        if not post_snap:
            return []

        # Group by track
        by_track: dict[int, list[dict]] = {}
        for r in post_snap:
            by_track.setdefault(r["track_id"], []).append(r)

        results = []
        for tid, recs in by_track.items():
            if tid == qb_track:
                continue
            if len(recs) < 3:
                continue

            recs.sort(key=lambda r: r["time"])

            # Extract path
            path = [(r["x_pixel"], r["y_pixel"]) for r in recs]
            route = self._classify_single_route(tid, path, los_y)
            if route:
                results.append(route)

        return results

    def _classify_single_route(
        self, track_id: int, path: list[tuple], los_y: Optional[float]
    ) -> Optional[RouteResult]:
        """Classify a single receiver's route from their path."""
        if len(path) < 3:
            return None

        xs = [p[0] for p in path]
        ys = [p[1] for p in path]

        # Total displacement
        total_dx = xs[-1] - xs[0]
        total_dy = ys[-1] - ys[0]
        total_dist = math.sqrt(total_dx ** 2 + total_dy ** 2)

        if total_dist < 10:  # barely moved — blocker or stationary
            return None

        # Depth: how far downfield (Y displacement)
        depth_px = abs(total_dy)
        depth_yards = depth_px / self.px_per_yard

        # Width: how far laterally (X displacement)
        width_px = abs(total_dx)
        width_yards = width_px / self.px_per_yard

        # Find break point: where direction changes most
        break_idx, break_angle = self._find_break_point(path)

        # Determine if route went inside or outside
        # (relative to field center — simplification)
        center_x = np.mean(xs[:2])  # starting X position
        if total_dx > 20:
            lateral_dir = "outside_right"
        elif total_dx < -20:
            lateral_dir = "outside_left"
        else:
            lateral_dir = "inside"

        # Classification logic
        route_name, confidence, direction = self._match_route(
            depth_yards, width_yards, break_angle, break_idx,
            total_dx, total_dy, len(path), lateral_dir,
        )

        return RouteResult(
            player_track_id=track_id,
            route_name=route_name,
            confidence=confidence,
            depth_yards=round(depth_yards, 1),
            break_angle=round(break_angle, 1),
            direction=direction,
            is_deep=depth_yards >= 15,
            raw_path=path,
        )

    def _find_break_point(self, path: list[tuple]) -> tuple[int, float]:
        """Find where the route changes direction (the break/cut).

        Returns (index of break point, angle of the break in degrees).
        """
        if len(path) < 4:
            return len(path) // 2, 0.0

        max_angle = 0.0
        max_idx = len(path) // 2

        for i in range(1, len(path) - 1):
            # Vector before point i
            v1x = path[i][0] - path[i - 1][0]
            v1y = path[i][1] - path[i - 1][1]
            # Vector after point i
            v2x = path[i + 1][0] - path[i][0]
            v2y = path[i + 1][1] - path[i][1]

            # Angle between vectors
            mag1 = math.sqrt(v1x ** 2 + v1y ** 2)
            mag2 = math.sqrt(v2x ** 2 + v2y ** 2)
            if mag1 < 1 or mag2 < 1:
                continue

            dot = v1x * v2x + v1y * v2y
            cos_angle = max(-1, min(1, dot / (mag1 * mag2)))
            angle = math.degrees(math.acos(cos_angle))

            if angle > max_angle:
                max_angle = angle
                max_idx = i

        return max_idx, max_angle

    def _match_route(
        self, depth: float, width: float, break_angle: float,
        break_idx: int, dx: float, dy: float, n_points: int,
        lateral_dir: str,
    ) -> tuple[str, float, str]:
        """Match movement pattern to a named route."""

        # Flat/Screen: very shallow, mostly lateral
        if depth < 3 and width > 5:
            return "Flat/Screen", 0.7, "lateral"

        # Slant: shallow (3-7 yards), cuts inside early
        if depth < 8 and break_angle > 30 and break_idx < n_points * 0.4:
            if "left" in lateral_dir:
                return "Slant", 0.65, "inside"
            else:
                return "Slant", 0.65, "inside"

        # Go/Streak: deep (15+), no significant break, mostly vertical
        if depth > 12 and break_angle < 25 and width < depth * 0.3:
            return "Go/Streak", 0.7, "vertical"

        # Curl/Comeback: moderate depth, comes back toward LOS
        if 6 < depth < 18 and break_angle > 60:
            # Check if final position is closer to start than max depth
            if abs(dy) < depth * self.px_per_yard * 0.7:
                return "Curl/Comeback", 0.6, "vertical"

        # Out: moderate depth, hard break outside
        if 5 < depth < 15 and break_angle > 45 and width > 5:
            if "outside" in lateral_dir:
                return "Out", 0.6, "outside"

        # In/Dig/Cross: moderate depth, hard break inside
        if 5 < depth < 15 and break_angle > 45:
            return "In/Dig/Cross", 0.6, "inside"

        # Post: deep, breaks inside after vertical stem
        if depth > 10 and break_angle > 25 and break_idx > n_points * 0.4:
            if width > 5 and "left" in lateral_dir:
                return "Post", 0.55, "inside"
            elif width > 5:
                return "Post", 0.55, "inside"

        # Corner/Flag: deep, breaks outside after vertical stem
        if depth > 10 and break_angle > 25 and break_idx > n_points * 0.4:
            if "outside" in lateral_dir:
                return "Corner/Flag", 0.55, "outside"

        # Default: classify by depth
        if depth > 15:
            return "Deep Route", 0.4, "vertical"
        elif depth > 8:
            return "Intermediate", 0.4, "vertical"
        else:
            return "Short Route", 0.4, "lateral"
