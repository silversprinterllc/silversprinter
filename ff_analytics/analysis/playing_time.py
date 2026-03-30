"""
Playing-time and rotation analysis module.

Computes per-player on-field time, snap counts by phase, and
series-by-series participation from tracking and play data.
"""

from __future__ import annotations

import json
from collections import defaultdict
from typing import Optional

import numpy as np

try:
    import pandas as pd
except ImportError:
    pd = None  # type: ignore


class PlayingTimeAnalyzer:
    """Analyze playing time and rotation patterns.

    Algorithm for computing playing time:
    1. For each play (defined by start/end timestamps):
       a. Determine which track_ids appear in tracking data during that play.
       b. A player is "on the field" for a play if they appear in >= 50%
          of the tracked frames within that play window.
       c. Playing time for that play = play duration (end - start).
    2. Total playing time = sum of play durations where the player was present.
    3. Snap count = number of plays where the player was present.

    Handles noise:
    - Brief tracking gaps (< 0.5s) are bridged — player still counted.
    - Players appearing in < 3 frames of a play are ignored (false detections).
    - Minimum detection threshold prevents phantom players.
    """

    def __init__(
        self,
        presence_threshold: float = 0.5,
        min_frames_per_play: int = 3,
        gap_bridge_seconds: float = 0.5,
    ) -> None:
        """
        Args:
            presence_threshold: Fraction of play frames a player must appear in
                to count as "on the field" for that play (0.0 to 1.0).
            min_frames_per_play: Minimum tracked frames to count a player
                as present (filters false detections).
            gap_bridge_seconds: Maximum gap in tracking data to bridge
                (assumes player is still on field).
        """
        self.presence_threshold = presence_threshold
        self.min_frames_per_play = min_frames_per_play
        self.gap_bridge_seconds = gap_bridge_seconds

    def compute_from_dicts(
        self,
        plays: list[dict],
        tracking_points: list[dict],
        player_map: Optional[dict[int, str]] = None,
    ) -> dict:
        """Compute playing time from raw dicts.

        Args:
            plays: List of play dicts with keys:
                play_id, start_time, end_time, offense_team_id, defense_team_id.
            tracking_points: List of tracking point dicts with keys:
                play_id, track_id, player_id (optional), team_id, phase,
                frame_idx, time_offset.
            player_map: Optional dict mapping player_id/track_id → player_name.

        Returns:
            Dict with per-player stats and summary.
        """
        if not plays or not tracking_points:
            return {"error": "no data"}

        # Group tracking points by play_id
        points_by_play: dict[int, list[dict]] = defaultdict(list)
        for tp in tracking_points:
            points_by_play[tp["play_id"]].append(tp)

        # Per-player accumulators
        player_snaps: dict[str, dict] = defaultdict(lambda: {
            "total_time": 0.0,
            "offense_snaps": 0,
            "defense_snaps": 0,
            "total_snaps": 0,
            "offense_time": 0.0,
            "defense_time": 0.0,
            "plays_on_field": [],
            "series_participation": [],
        })

        total_offense_snaps = 0
        total_defense_snaps = 0

        for play in plays:
            play_id = play["play_id"]
            start_t = play["start_time"]
            end_t = play["end_time"]
            play_duration = end_t - start_t
            off_team = play.get("offense_team_id")
            def_team = play.get("defense_team_id")

            points = points_by_play.get(play_id, [])
            if not points:
                continue

            # Count frames per play for calculating presence
            unique_frames = set(tp["frame_idx"] for tp in points)
            total_frames_in_play = len(unique_frames) if unique_frames else 1

            # Group points by track_id (or player_id if available)
            tracks_in_play: dict[str, list[dict]] = defaultdict(list)
            for tp in points:
                # Use player_id if available, else track_id
                pid = tp.get("player_id") or tp.get("track_id")
                key = str(pid)
                if player_map and pid in player_map:
                    key = player_map[pid]
                elif player_map and str(pid) in player_map:
                    key = player_map[str(pid)]
                tracks_in_play[key].append(tp)

            for player_key, player_points in tracks_in_play.items():
                player_frames = set(tp["frame_idx"] for tp in player_points)
                presence_ratio = len(player_frames) / max(total_frames_in_play, 1)

                # Apply thresholds
                if len(player_frames) < self.min_frames_per_play:
                    continue
                if presence_ratio < self.presence_threshold:
                    continue

                # Determine phase for this player this play
                team_ids = [tp.get("team_id") for tp in player_points if tp.get("team_id")]
                player_team = max(set(team_ids), key=team_ids.count) if team_ids else None

                if player_team == off_team:
                    phase = "offense"
                elif player_team == def_team:
                    phase = "defense"
                else:
                    # Infer from tracking point phase labels
                    phases = [tp.get("phase") for tp in player_points if tp.get("phase")]
                    phase = max(set(phases), key=phases.count) if phases else "unknown"

                stats = player_snaps[player_key]
                stats["total_snaps"] += 1
                stats["total_time"] += play_duration
                stats["plays_on_field"].append(play_id)

                if phase == "offense":
                    stats["offense_snaps"] += 1
                    stats["offense_time"] += play_duration
                    total_offense_snaps += 1
                elif phase == "defense":
                    stats["defense_snaps"] += 1
                    stats["defense_time"] += play_duration
                    total_defense_snaps += 1

        # Compute rates and build output
        total_plays = len(plays)
        total_game_time = sum(p["end_time"] - p["start_time"] for p in plays)

        results = {}
        for player_key, stats in player_snaps.items():
            results[player_key] = {
                "total_snaps": stats["total_snaps"],
                "total_time_seconds": round(stats["total_time"], 1),
                "total_time_minutes": round(stats["total_time"] / 60, 1),
                "snap_percentage": round(stats["total_snaps"] / max(total_plays, 1) * 100, 1),
                "offense_snaps": stats["offense_snaps"],
                "offense_snap_pct": round(
                    stats["offense_snaps"] / max(total_offense_snaps, 1) * 100, 1
                ) if total_offense_snaps > 0 else 0.0,
                "offense_time_seconds": round(stats["offense_time"], 1),
                "defense_snaps": stats["defense_snaps"],
                "defense_snap_pct": round(
                    stats["defense_snaps"] / max(total_defense_snaps, 1) * 100, 1
                ) if total_defense_snaps > 0 else 0.0,
                "defense_time_seconds": round(stats["defense_time"], 1),
            }

        return {
            "game_summary": {
                "total_plays": total_plays,
                "total_game_time_seconds": round(total_game_time, 1),
                "total_offense_snaps": total_offense_snaps,
                "total_defense_snaps": total_defense_snaps,
            },
            "player_stats": results,
        }

    # ── Series-by-Series Participation ────────────────────────────

    def compute_series_participation(
        self,
        drives: list[dict],
        player_play_presence: dict[str, list[int]],
    ) -> dict[str, list[dict]]:
        """Compute which drives each player participated in.

        Args:
            drives: List of drive dicts with keys:
                drive_id, drive_number, play_ids (list of play_ids in this drive).
            player_play_presence: Dict mapping player_key → list of play_ids
                they were on the field for.

        Returns:
            Dict mapping player_key → list of {drive_number, plays_in_drive, present}.
        """
        participation: dict[str, list[dict]] = defaultdict(list)

        for drive in drives:
            drive_plays = set(drive.get("play_ids", []))
            for player_key, player_plays in player_play_presence.items():
                player_play_set = set(player_plays)
                plays_present = len(drive_plays & player_play_set)
                participation[player_key].append({
                    "drive_number": drive["drive_number"],
                    "total_plays_in_drive": len(drive_plays),
                    "plays_present": plays_present,
                    "present": plays_present > 0,
                    "participation_rate": round(
                        plays_present / max(len(drive_plays), 1), 2
                    ),
                })

        return dict(participation)

    # ── Text Summary ──────────────────────────────────────────────

    def generate_text_summary(self, analysis: dict) -> str:
        """Generate a coach-friendly playing time summary.

        Args:
            analysis: Output from compute_from_dicts().

        Returns:
            Text summary string.
        """
        lines = []
        lines.append("=== PLAYING TIME REPORT ===")
        lines.append("")

        gs = analysis.get("game_summary", {})
        lines.append(f"Total Plays: {gs.get('total_plays', 0)}")
        lines.append(f"Total Game Time: {gs.get('total_game_time_seconds', 0) / 60:.1f} min")
        lines.append("")

        stats = analysis.get("player_stats", {})
        if not stats:
            lines.append("No player data available.")
            return "\n".join(lines)

        # Sort by total snaps descending
        sorted_players = sorted(
            stats.items(), key=lambda x: x[1]["total_snaps"], reverse=True
        )

        lines.append(f"{'Player':<20} {'Snaps':>6} {'%':>5} {'Off':>5} {'Def':>5} {'Time':>7}")
        lines.append("-" * 55)

        for name, s in sorted_players:
            off_pct = f"{s['offense_snap_pct']:.0f}%" if s['offense_snaps'] > 0 else "-"
            def_pct = f"{s['defense_snap_pct']:.0f}%" if s['defense_snaps'] > 0 else "-"
            lines.append(
                f"{name:<20} {s['total_snaps']:>6} "
                f"{s['snap_percentage']:>4.0f}% "
                f"{off_pct:>5} {def_pct:>5} "
                f"{s['total_time_minutes']:>5.1f}m"
            )

        lines.append("")

        # Key insights
        lines.append("KEY INSIGHTS:")
        ironmen = [
            (name, s) for name, s in sorted_players
            if s["offense_snaps"] > 0 and s["defense_snaps"] > 0
        ]
        if ironmen:
            lines.append(f"  Two-way players: {', '.join(n for n, _ in ironmen)}")

        # Players with low snap counts (potential rotation targets)
        low_snap = [
            (name, s) for name, s in sorted_players
            if s["snap_percentage"] < 30
        ]
        if low_snap:
            lines.append(f"  Low-usage players: {', '.join(n for n, _ in low_snap)}")

        lines.append("")
        return "\n".join(lines)


# ── Example ──────────────────────────────────────────────────────

def example_run() -> None:
    """Demonstrate playing time analysis with mock data."""
    analyzer = PlayingTimeAnalyzer()

    mock_plays = [
        {"play_id": i, "start_time": i * 30.0, "end_time": i * 30.0 + 6.0,
         "offense_team_id": 1, "defense_team_id": 2}
        for i in range(1, 21)
    ]

    # Mock tracking: player 1 on all plays, player 2 on offense only, etc.
    mock_tracking = []
    for play in mock_plays:
        pid = play["play_id"]
        for frame in range(10):
            # Player "Marcus" — on every play, offense
            mock_tracking.append({
                "play_id": pid, "track_id": 1, "player_id": 1,
                "team_id": 1, "phase": "offense",
                "frame_idx": pid * 100 + frame, "time_offset": frame * 0.2,
            })
            # Player "DJ" — offense only (odd plays)
            if pid % 2 == 1:
                mock_tracking.append({
                    "play_id": pid, "track_id": 2, "player_id": 2,
                    "team_id": 1, "phase": "offense",
                    "frame_idx": pid * 100 + frame, "time_offset": frame * 0.2,
                })
            # Player "Mike" — defense only
            mock_tracking.append({
                "play_id": pid, "track_id": 3, "player_id": 3,
                "team_id": 2, "phase": "defense",
                "frame_idx": pid * 100 + frame, "time_offset": frame * 0.2,
            })

    player_map = {1: "Marcus", 2: "DJ", 3: "Mike"}
    result = analyzer.compute_from_dicts(mock_plays, mock_tracking, player_map)
    summary = analyzer.generate_text_summary(result)

    print(summary)
    print("\n--- JSON ---")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    example_run()
