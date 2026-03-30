"""
Offensive analysis module.

Derives formations, key players, tendencies, and produces
structured scouting reports from tracking + play data.
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


class OffensiveAnalyzer:
    """Analyze offensive tendencies from play and tracking data.

    Expects data as pandas DataFrames or dicts with the following shapes:

    plays_df columns:
        play_id, game_id, offense_team_id, down, distance, yard_line,
        result, yards_gained, is_pass, is_rush, has_motion, formation_tag

    tracking_df columns:
        play_id, player_id, team_id, phase, time_offset, x_field, y_field
    """

    def __init__(self, team_id: int, team_name: str = "") -> None:
        self.team_id = team_id
        self.team_name = team_name

    # ── Formation Classification ──────────────────────────────────

    @staticmethod
    def classify_formation(
        player_positions: list[dict],
        field_width: float = 53.3,
    ) -> dict:
        """Classify offensive formation from pre-snap positions.

        For 7v7 flag football:
        - 1 QB (deepest behind center or center-ish)
        - 1 Center/Snapper
        - 5 eligible receivers (various alignments)

        Args:
            player_positions: List of {player_id, x_field, y_field} dicts.
                x_field = sideline-to-sideline (0 = left sideline).
                y_field = end-zone-to-end-zone (direction of attack).
            field_width: Width of the field in yards.

        Returns:
            Dict with formation_tag, receiver_count_left, receiver_count_right,
            is_compressed, is_empty, player_roles.
        """
        if len(player_positions) < 5:
            return {"formation_tag": "unknown", "player_roles": []}

        positions = sorted(player_positions, key=lambda p: p["y_field"])
        midfield_x = field_width / 2.0

        # QB = player closest to deepest (behind the line)
        # In flag, QB is usually the one farthest back
        qb = positions[0]  # deepest player
        remaining = positions[1:]

        # Center = next deepest or closest to ball
        center = remaining[0] if remaining else None
        receivers = remaining[1:] if len(remaining) > 1 else []

        # Classify receivers by side
        left_receivers = [p for p in receivers if p["x_field"] < midfield_x - 3]
        right_receivers = [p for p in receivers if p["x_field"] > midfield_x + 3]
        inside_receivers = [p for p in receivers
                          if midfield_x - 3 <= p["x_field"] <= midfield_x + 3]

        n_left = len(left_receivers)
        n_right = len(right_receivers)

        # Formation tag logic
        if n_left == 0 and n_right == 0:
            tag = "compressed"
        elif len(receivers) >= 5 and center is None:
            tag = "empty"
        elif n_left == 3 and n_right == 0:
            tag = "trips_left"
        elif n_right == 3 and n_left == 0:
            tag = "trips_right"
        elif n_left == 2 and n_right == 2:
            tag = "2x2"
        elif n_left == 3 and n_right == 1:
            tag = "3x1"
        elif n_left == 1 and n_right == 3:
            tag = "3x1"
        else:
            tag = "spread" if (n_left + n_right) >= 4 else "other"

        # Check for bunch/stack
        if tag in ("trips_left", "trips_right", "3x1"):
            # Bunch = 3 receivers within 3 yards of each other
            trip_side = left_receivers if n_left >= 3 else right_receivers
            if len(trip_side) >= 3:
                xs = [p["x_field"] for p in trip_side]
                if max(xs) - min(xs) < 4.0:
                    tag = "bunch_left" if n_left >= 3 else "bunch_right"

        # Check for stack
        if len(receivers) >= 2:
            for i in range(len(receivers)):
                for j in range(i + 1, len(receivers)):
                    x_diff = abs(receivers[i]["x_field"] - receivers[j]["x_field"])
                    y_diff = abs(receivers[i]["y_field"] - receivers[j]["y_field"])
                    if x_diff < 1.5 and y_diff > 1.0 and y_diff < 4.0:
                        if "stack" not in tag:
                            tag = "stack"

        # Compressed check
        all_x = [p["x_field"] for p in receivers]
        if all_x and (max(all_x) - min(all_x)) < 15.0:
            is_compressed = True
        else:
            is_compressed = False

        # Assign roles
        player_roles = []
        if qb:
            player_roles.append({**qb, "role": "QB"})
        if center:
            player_roles.append({**center, "role": "C"})
        for i, r in enumerate(left_receivers):
            player_roles.append({**r, "role": f"WR_L{i+1}"})
        for i, r in enumerate(right_receivers):
            player_roles.append({**r, "role": f"WR_R{i+1}"})
        for i, r in enumerate(inside_receivers):
            player_roles.append({**r, "role": f"SLOT_{i+1}"})

        return {
            "formation_tag": tag,
            "receiver_count_left": n_left,
            "receiver_count_right": n_right,
            "is_compressed": is_compressed,
            "is_empty": tag == "empty",
            "player_roles": player_roles,
        }

    # ── Key Player Identification ─────────────────────────────────

    def identify_key_players(self, plays_df: "pd.DataFrame") -> list[dict]:
        """Identify key offensive players based on usage and production.

        Args:
            plays_df: DataFrame with columns including player-level stats.
                Expected: player_id, targets, receptions, yards, touchdowns,
                          touches, explosive_plays (15+ yard gains).

        Returns:
            List of player dicts sorted by impact score.
        """
        if pd is None:
            return []

        # Aggregate per player
        player_stats = plays_df.groupby("player_id").agg({
            "targets": "sum",
            "receptions": "sum",
            "yards": "sum",
            "touchdowns": "sum",
            "touches": "sum",
        }).reset_index()

        total_plays = len(plays_df)
        if total_plays == 0:
            return []

        player_stats["target_share"] = player_stats["targets"] / max(total_plays, 1)
        player_stats["yards_per_touch"] = (
            player_stats["yards"] / player_stats["touches"].clip(lower=1)
        )

        # Impact score = weighted combo
        player_stats["impact_score"] = (
            player_stats["target_share"] * 30 +
            player_stats["touchdowns"] * 20 +
            player_stats["yards_per_touch"] * 2 +
            player_stats["yards"] * 0.1
        )

        player_stats = player_stats.sort_values("impact_score", ascending=False)

        return player_stats.to_dict("records")

    # ── Tendency Analysis ─────────────────────────────────────────

    def compute_tendencies(self, plays: list[dict]) -> dict:
        """Compute offensive tendency breakdowns.

        Args:
            plays: List of play dicts with keys: down, distance, yard_line,
                   is_pass, is_rush, formation_tag, has_motion, yards_gained, result.

        Returns:
            Comprehensive tendency dict.
        """
        if not plays:
            return {"error": "no plays"}

        total = len(plays)
        passes = [p for p in plays if p.get("is_pass")]
        rushes = [p for p in plays if p.get("is_rush")]

        tendencies = {
            "team_id": self.team_id,
            "team_name": self.team_name,
            "total_plays": total,
            "pass_rate": round(len(passes) / total, 3),
            "rush_rate": round(len(rushes) / total, 3),
            "avg_yards_per_play": round(
                sum(p.get("yards_gained", 0) for p in plays) / total, 1
            ),
        }

        # By down
        tendencies["by_down"] = {}
        for down in [1, 2, 3, 4]:
            down_plays = [p for p in plays if p.get("down") == down]
            if not down_plays:
                continue
            down_passes = [p for p in down_plays if p.get("is_pass")]
            tendencies["by_down"][str(down)] = {
                "plays": len(down_plays),
                "pass_rate": round(len(down_passes) / len(down_plays), 3),
                "avg_yards": round(
                    sum(p.get("yards_gained", 0) for p in down_plays) / len(down_plays), 1
                ),
            }

        # By distance bucket
        tendencies["by_distance"] = {}
        for label, lo, hi in [("short", 0, 4), ("medium", 4, 8), ("long", 8, 100)]:
            dist_plays = [p for p in plays
                         if lo <= (p.get("distance") or 0) < hi]
            if not dist_plays:
                continue
            dist_passes = [p for p in dist_plays if p.get("is_pass")]
            tendencies["by_distance"][label] = {
                "plays": len(dist_plays),
                "pass_rate": round(len(dist_passes) / len(dist_plays), 3),
                "avg_yards": round(
                    sum(p.get("yards_gained", 0) for p in dist_plays) / len(dist_plays), 1
                ),
            }

        # By field zone
        tendencies["by_field_zone"] = {}
        for label, lo, hi in [
            ("own_territory", 0, 40),
            ("midfield", 40, 60),
            ("red_zone", 60, 80),
            ("goal_line", 80, 100),
        ]:
            zone_plays = [p for p in plays
                         if lo <= (p.get("yard_line") or 0) < hi]
            if not zone_plays:
                continue
            zone_passes = [p for p in zone_plays if p.get("is_pass")]
            tendencies["by_field_zone"][label] = {
                "plays": len(zone_plays),
                "pass_rate": round(len(zone_passes) / len(zone_plays), 3),
            }

        # By formation
        tendencies["by_formation"] = {}
        formation_groups = defaultdict(list)
        for p in plays:
            ft = p.get("formation_tag", "unknown")
            formation_groups[ft].append(p)

        for ft, fp in formation_groups.items():
            fp_passes = [p for p in fp if p.get("is_pass")]
            tendencies["by_formation"][ft] = {
                "plays": len(fp),
                "usage_rate": round(len(fp) / total, 3),
                "pass_rate": round(len(fp_passes) / len(fp), 3),
                "avg_yards": round(
                    sum(p.get("yards_gained", 0) for p in fp) / len(fp), 1
                ),
            }

        # Motion usage
        motion_plays = [p for p in plays if p.get("has_motion")]
        tendencies["motion"] = {
            "usage_rate": round(len(motion_plays) / total, 3),
            "avg_yards_with_motion": round(
                sum(p.get("yards_gained", 0) for p in motion_plays) / max(len(motion_plays), 1), 1
            ),
            "avg_yards_without_motion": round(
                sum(p.get("yards_gained", 0) for p in plays if not p.get("has_motion"))
                / max(total - len(motion_plays), 1), 1
            ),
        }

        # Explosive plays (15+ yards)
        explosive = [p for p in plays if (p.get("yards_gained") or 0) >= 15]
        tendencies["explosive_plays"] = {
            "count": len(explosive),
            "rate": round(len(explosive) / total, 3),
            "formations": dict(
                defaultdict(int,
                    {p.get("formation_tag", "unknown"): 1 for p in explosive}
                )
            ),
        }

        return tendencies

    # ── Report Generation ─────────────────────────────────────────

    def generate_text_report(self, tendencies: dict) -> str:
        """Generate a human-readable offensive scouting report.

        Args:
            tendencies: Output from compute_tendencies().

        Returns:
            Multi-line text report string.
        """
        t = tendencies
        lines = []
        lines.append(f"=== OFFENSIVE SCOUTING REPORT: {t.get('team_name', 'Unknown')} ===")
        lines.append("")

        lines.append(f"Total Plays Analyzed: {t.get('total_plays', 0)}")
        lines.append(f"Pass Rate: {t.get('pass_rate', 0) * 100:.0f}%")
        lines.append(f"Rush Rate: {t.get('rush_rate', 0) * 100:.0f}%")
        lines.append(f"Avg Yards/Play: {t.get('avg_yards_per_play', 0)}")
        lines.append("")

        # Formation tendencies
        lines.append("FORMATION TENDENCIES:")
        by_form = t.get("by_formation", {})
        for ft, fd in sorted(by_form.items(), key=lambda x: -x[1].get("plays", 0)):
            lines.append(
                f"  {ft}: {fd['plays']} plays ({fd['usage_rate'] * 100:.0f}% usage) | "
                f"Pass {fd['pass_rate'] * 100:.0f}% | Avg {fd['avg_yards']:.1f} yds"
            )
        lines.append("")

        # Down tendencies
        lines.append("DOWN TENDENCIES:")
        by_down = t.get("by_down", {})
        for d in ["1", "2", "3", "4"]:
            if d in by_down:
                dd = by_down[d]
                lines.append(
                    f"  {d}st/nd/rd/th down: {dd['plays']} plays | "
                    f"Pass {dd['pass_rate'] * 100:.0f}% | Avg {dd['avg_yards']:.1f} yds"
                )
        lines.append("")

        # Distance tendencies
        lines.append("DISTANCE TENDENCIES:")
        by_dist = t.get("by_distance", {})
        for label in ["short", "medium", "long"]:
            if label in by_dist:
                dd = by_dist[label]
                lines.append(
                    f"  {label.capitalize()} ({label}): {dd['plays']} plays | "
                    f"Pass {dd['pass_rate'] * 100:.0f}% | Avg {dd['avg_yards']:.1f} yds"
                )
        lines.append("")

        # Motion
        motion = t.get("motion", {})
        lines.append("MOTION:")
        lines.append(f"  Usage: {motion.get('usage_rate', 0) * 100:.0f}% of plays")
        lines.append(f"  Avg yards WITH motion: {motion.get('avg_yards_with_motion', 0):.1f}")
        lines.append(f"  Avg yards WITHOUT motion: {motion.get('avg_yards_without_motion', 0):.1f}")
        lines.append("")

        # Explosive plays
        explosive = t.get("explosive_plays", {})
        lines.append("EXPLOSIVE PLAYS (15+ yards):")
        lines.append(f"  Count: {explosive.get('count', 0)} ({explosive.get('rate', 0) * 100:.0f}% of plays)")
        lines.append("")

        return "\n".join(lines)


# ── Example Usage with Mock Data ──────────────────────────────────

def example_run() -> None:
    """Demonstrate offensive analysis with mock data."""
    analyzer = OffensiveAnalyzer(team_id=1, team_name="WCFL Gators")

    # Mock plays
    mock_plays = [
        {"play_id": 1, "down": 1, "distance": 10, "yard_line": 25, "is_pass": True, "is_rush": False,
         "has_motion": True, "formation_tag": "3x1", "yards_gained": 8, "result": "complete"},
        {"play_id": 2, "down": 2, "distance": 2, "yard_line": 33, "is_pass": False, "is_rush": True,
         "has_motion": False, "formation_tag": "2x2", "yards_gained": 4, "result": "rush"},
        {"play_id": 3, "down": 1, "distance": 10, "yard_line": 37, "is_pass": True, "is_rush": False,
         "has_motion": True, "formation_tag": "trips_right", "yards_gained": 22, "result": "complete"},
        {"play_id": 4, "down": 1, "distance": 10, "yard_line": 59, "is_pass": True, "is_rush": False,
         "has_motion": False, "formation_tag": "2x2", "yards_gained": -2, "result": "incomplete"},
        {"play_id": 5, "down": 2, "distance": 12, "yard_line": 59, "is_pass": True, "is_rush": False,
         "has_motion": True, "formation_tag": "empty", "yards_gained": 15, "result": "complete"},
        {"play_id": 6, "down": 3, "distance": 7, "yard_line": 30, "is_pass": True, "is_rush": False,
         "has_motion": False, "formation_tag": "3x1", "yards_gained": 0, "result": "incomplete"},
        {"play_id": 7, "down": 1, "distance": 10, "yard_line": 20, "is_pass": True, "is_rush": False,
         "has_motion": True, "formation_tag": "bunch_right", "yards_gained": 12, "result": "complete"},
        {"play_id": 8, "down": 2, "distance": 5, "yard_line": 45, "is_pass": False, "is_rush": True,
         "has_motion": False, "formation_tag": "2x2", "yards_gained": 6, "result": "rush"},
    ]

    tendencies = analyzer.compute_tendencies(mock_plays)
    report = analyzer.generate_text_report(tendencies)

    print(report)
    print("\n--- JSON Summary ---")
    print(json.dumps(tendencies, indent=2))


if __name__ == "__main__":
    example_run()
