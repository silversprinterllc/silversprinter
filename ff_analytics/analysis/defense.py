"""
Defensive analysis and matchup recommendation engine.

Classifies coverage shells, detects blitzes, computes defender-level
performance, and generates attack/avoid recommendations.
"""

from __future__ import annotations

import json
from collections import defaultdict
from typing import Optional


class DefensiveAnalyzer:
    """Analyze defensive tendencies and generate matchup recommendations.

    Expects play and tracking data in dict/list form.
    """

    def __init__(self, team_id: int, team_name: str = "") -> None:
        self.team_id = team_id
        self.team_name = team_name

    # ── Coverage Classification ───────────────────────────────────

    @staticmethod
    def classify_coverage(
        defensive_positions: list[dict],
        field_width: float = 53.3,
        los_y: float = 0.0,
    ) -> dict:
        """Classify defensive coverage shell from pre-snap positions.

        For 7v7 flag football:
        - Typically 1 rusher, 6 in coverage
        - Key read: safety depth and count

        Args:
            defensive_positions: List of {player_id, x_field, y_field} dicts.
                y_field increases toward the defense's own end zone.
            field_width: Width of field in yards.
            los_y: Line of scrimmage y-coordinate.

        Returns:
            Dict with coverage_tag, safety_count_deep, blitz_indicators,
            rusher_count, and player_assignments.
        """
        if len(defensive_positions) < 5:
            return {"coverage_tag": "unknown"}

        midfield_x = field_width / 2.0

        # Sort by depth (farthest from LOS = deepest)
        sorted_by_depth = sorted(
            defensive_positions,
            key=lambda p: abs(p["y_field"] - los_y),
            reverse=True,
        )

        # Deep safeties = players > 10 yards behind LOS
        deep_players = [
            p for p in defensive_positions
            if abs(p["y_field"] - los_y) > 10
        ]

        # Medium depth = 5-10 yards
        medium_players = [
            p for p in defensive_positions
            if 5 <= abs(p["y_field"] - los_y) <= 10
        ]

        # Near LOS = within 5 yards (potential rushers or underneath)
        near_los = [
            p for p in defensive_positions
            if abs(p["y_field"] - los_y) < 5
        ]

        safety_count = len(deep_players)

        # Coverage shell classification
        if safety_count >= 2:
            # Check if safeties are split (two-high) or stacked
            if len(deep_players) >= 2:
                deep_xs = [p["x_field"] for p in deep_players[:2]]
                if abs(deep_xs[0] - deep_xs[1]) > 10:
                    coverage_tag = "cover_2"
                else:
                    coverage_tag = "quarters"
            else:
                coverage_tag = "cover_2"
        elif safety_count == 1:
            coverage_tag = "single_high"
        else:
            coverage_tag = "zero"

        # Rusher detection: players within 2 yards of LOS and near center
        rushers = [
            p for p in near_los
            if abs(p["x_field"] - midfield_x) < 8
            and abs(p["y_field"] - los_y) < 3
        ]

        # Man vs zone heuristic:
        # If non-rusher defenders are spread across the field evenly → zone
        # If defenders mirror offensive receiver positions → man
        coverage_players = [p for p in defensive_positions if p not in rushers]
        if coverage_players:
            x_spread = max(p["x_field"] for p in coverage_players) - min(p["x_field"] for p in coverage_players)
            if x_spread > 35:  # spread wide → likely zone
                if coverage_tag not in ("cover_2", "quarters"):
                    coverage_tag = "single_high"  # zone variant
            # For man detection, we'd need offensive positions too (done in matchup analysis)

        # Player assignments (positional guesses)
        assignments = []
        for p in sorted_by_depth:
            depth = abs(p["y_field"] - los_y)
            side = "left" if p["x_field"] < midfield_x - 5 else (
                "right" if p["x_field"] > midfield_x + 5 else "middle"
            )
            if depth > 10:
                role = f"safety_{side}"
            elif depth > 5:
                role = f"linebacker_{side}" if side == "middle" else f"corner_{side}"
            elif p in rushers:
                role = "rusher"
            else:
                role = f"flat_{side}"
            assignments.append({**p, "role": role, "depth": round(depth, 1)})

        return {
            "coverage_tag": coverage_tag,
            "safety_count_deep": safety_count,
            "rusher_count": len(rushers),
            "blitz": len(rushers) > 1,
            "player_assignments": assignments,
        }

    # ── Blitz Detection (Post-Snap) ───────────────────────────────

    @staticmethod
    def detect_blitz_post_snap(
        defender_positions_pre: list[dict],
        defender_positions_post: list[dict],
        los_y: float = 0.0,
        rush_threshold_yards: float = 5.0,
        time_window: float = 1.5,
    ) -> dict:
        """Detect blitz by comparing pre-snap and post-snap positions.

        A blitz is detected when defenders cross the LOS quickly
        toward the QB.

        Args:
            defender_positions_pre: Pre-snap positions [{player_id, x, y}].
            defender_positions_post: Positions ~1-2s after snap.
            los_y: Line of scrimmage.
            rush_threshold_yards: Min yards toward LOS to count as rush.
            time_window: Time window in seconds for post-snap positions.

        Returns:
            Dict with blitz detected, rusher IDs, pressure type.
        """
        rushers = []
        for pre in defender_positions_pre:
            pid = pre["player_id"]
            # Find corresponding post-snap position
            post = next((p for p in defender_positions_post if p["player_id"] == pid), None)
            if not post:
                continue

            # Did this defender move toward the LOS?
            pre_depth = abs(pre["y_field"] - los_y)
            post_depth = abs(post["y_field"] - los_y)
            advance = pre_depth - post_depth

            if advance > rush_threshold_yards:
                rushers.append({
                    "player_id": pid,
                    "yards_advanced": round(advance, 1),
                    "pre_x": pre["x_field"],
                })

        # Classify pressure look
        if len(rushers) == 0:
            pressure_type = "none"
        elif len(rushers) == 1:
            pressure_type = "standard_rush"
        elif len(rushers) == 2:
            xs = [r["pre_x"] for r in rushers]
            if all(x < 26.65 for x in xs) or all(x > 26.65 for x in xs):
                pressure_type = "double_edge"
            else:
                pressure_type = "double_a_gap" if max(xs) - min(xs) < 8 else "split_rush"
        else:
            pressure_type = "all_out_blitz"

        return {
            "blitz_detected": len(rushers) > 1,
            "rusher_count": len(rushers),
            "rushers": rushers,
            "pressure_type": pressure_type,
        }

    # ── Tendency Analysis ─────────────────────────────────────────

    def compute_tendencies(self, plays: list[dict]) -> dict:
        """Compute defensive tendency breakdowns.

        Args:
            plays: List of play dicts with keys: down, distance, yard_line,
                   coverage_tag, blitz_detected, yards_allowed, result,
                   formation_tag (of offense).

        Returns:
            Comprehensive tendency dict.
        """
        if not plays:
            return {"error": "no plays"}

        total = len(plays)

        tendencies = {
            "team_id": self.team_id,
            "team_name": self.team_name,
            "total_plays": total,
        }

        # Coverage distribution
        coverage_counts = defaultdict(int)
        for p in plays:
            ct = p.get("coverage_tag", "unknown")
            coverage_counts[ct] += 1

        tendencies["coverage_distribution"] = {
            ct: {
                "count": count,
                "rate": round(count / total, 3),
                "avg_yards_allowed": round(
                    sum(p.get("yards_allowed", 0) for p in plays if p.get("coverage_tag") == ct)
                    / max(count, 1), 1
                ),
            }
            for ct, count in coverage_counts.items()
        }

        # Blitz rate
        blitz_plays = [p for p in plays if p.get("blitz_detected")]
        tendencies["blitz"] = {
            "overall_rate": round(len(blitz_plays) / total, 3),
            "avg_yards_on_blitz": round(
                sum(p.get("yards_allowed", 0) for p in blitz_plays) / max(len(blitz_plays), 1), 1
            ),
            "avg_yards_no_blitz": round(
                sum(p.get("yards_allowed", 0) for p in plays if not p.get("blitz_detected"))
                / max(total - len(blitz_plays), 1), 1
            ),
        }

        # By down
        tendencies["by_down"] = {}
        for down in [1, 2, 3, 4]:
            down_plays = [p for p in plays if p.get("down") == down]
            if not down_plays:
                continue
            blitz_on_down = [p for p in down_plays if p.get("blitz_detected")]
            cov_on_down = defaultdict(int)
            for p in down_plays:
                cov_on_down[p.get("coverage_tag", "unknown")] += 1

            tendencies["by_down"][str(down)] = {
                "plays": len(down_plays),
                "blitz_rate": round(len(blitz_on_down) / len(down_plays), 3),
                "top_coverage": max(cov_on_down, key=cov_on_down.get) if cov_on_down else "unknown",
                "avg_yards_allowed": round(
                    sum(p.get("yards_allowed", 0) for p in down_plays) / len(down_plays), 1
                ),
            }

        # By offensive formation faced
        tendencies["vs_formation"] = {}
        form_groups = defaultdict(list)
        for p in plays:
            ft = p.get("formation_tag", "unknown")
            form_groups[ft].append(p)

        for ft, fp in form_groups.items():
            blitz_vs = [p for p in fp if p.get("blitz_detected")]
            tendencies["vs_formation"][ft] = {
                "plays": len(fp),
                "blitz_rate": round(len(blitz_vs) / len(fp), 3),
                "avg_yards_allowed": round(
                    sum(p.get("yards_allowed", 0) for p in fp) / len(fp), 1
                ),
            }

        # 3rd down defense
        third_down = [p for p in plays if p.get("down") == 3]
        if third_down:
            conversions = [p for p in third_down if (p.get("yards_allowed", 0) or 0) >= (p.get("distance", 0) or 0)]
            tendencies["third_down"] = {
                "plays": len(third_down),
                "conversion_rate_allowed": round(len(conversions) / len(third_down), 3),
            }

        return tendencies

    # ── Matchup Recommendations ───────────────────────────────────

    def compute_matchup_recommendations(
        self, defender_stats: list[dict]
    ) -> list[dict]:
        """Generate attack/avoid recommendations per defender.

        Args:
            defender_stats: List of dicts with keys:
                player_id, name, targets, completions_allowed, yards_allowed,
                touchdowns_allowed, interceptions, pass_breakups, big_plays_allowed.

        Returns:
            List of matchup recommendation dicts.
        """
        recommendations = []

        for d in defender_stats:
            targets = d.get("targets", 0)
            if targets < 2:
                continue  # not enough data

            comp_allowed = d.get("completions_allowed", 0)
            yards_allowed = d.get("yards_allowed", 0)
            tds_allowed = d.get("touchdowns_allowed", 0)
            ints = d.get("interceptions", 0)
            pbus = d.get("pass_breakups", 0)
            big_plays = d.get("big_plays_allowed", 0)

            comp_pct = comp_allowed / max(targets, 1)
            yds_per_target = yards_allowed / max(targets, 1)
            playmaker_score = (ints * 3 + pbus * 1.5) / max(targets, 1)

            # Attack if: high comp%, high yards/target, low playmaking
            # Avoid if: low comp%, high playmaking, low yards/target

            if yds_per_target > 7 and comp_pct > 0.65 and playmaker_score < 0.3:
                rec = "attack"
                reason = (
                    f"Allows {yds_per_target:.1f} yds/target, "
                    f"{comp_pct * 100:.0f}% comp allowed. "
                    f"Gave up {big_plays} big plays and {tds_allowed} TDs."
                )
            elif playmaker_score > 0.5 or (comp_pct < 0.45 and ints >= 1):
                rec = "avoid"
                reason = (
                    f"Only {comp_pct * 100:.0f}% comp allowed, "
                    f"{ints} INTs and {pbus} PBUs on {targets} targets. "
                    f"Strong playmaker — route away from."
                )
            elif comp_pct > 0.55 and yds_per_target > 5:
                rec = "attack"
                reason = (
                    f"Attackable: {comp_pct * 100:.0f}% comp, "
                    f"{yds_per_target:.1f} yds/tgt. "
                    f"Not a major playmaker ({ints} INT, {pbus} PBU)."
                )
            else:
                rec = "neutral"
                reason = f"Average coverage: {comp_pct * 100:.0f}% comp, {yds_per_target:.1f} yds/tgt."

            recommendations.append({
                "player_id": d.get("player_id"),
                "name": d.get("name", f"#{d.get('jersey_number', '?')}"),
                "recommendation": rec,
                "reason": reason,
                "yards_per_target": round(yds_per_target, 1),
                "completion_pct_allowed": round(comp_pct, 3),
                "interceptions": ints,
                "pass_breakups": pbus,
                "big_plays_allowed": big_plays,
                "touchdowns_allowed": tds_allowed,
                "targets": targets,
            })

        # Sort: attack first, then neutral, then avoid
        order = {"attack": 0, "neutral": 1, "avoid": 2}
        recommendations.sort(key=lambda r: order.get(r["recommendation"], 1))

        return recommendations

    # ── Report Generation ─────────────────────────────────────────

    def generate_text_report(
        self, tendencies: dict, matchups: list[dict]
    ) -> str:
        """Generate a human-readable defensive scouting report.

        Args:
            tendencies: Output from compute_tendencies().
            matchups: Output from compute_matchup_recommendations().

        Returns:
            Multi-line text report.
        """
        t = tendencies
        lines = []
        lines.append(f"=== DEFENSIVE SCOUTING REPORT: {t.get('team_name', 'Unknown')} ===")
        lines.append("")

        lines.append(f"Total Plays Analyzed: {t.get('total_plays', 0)}")
        lines.append("")

        # Coverage distribution
        lines.append("COVERAGE SHELL DISTRIBUTION:")
        cov = t.get("coverage_distribution", {})
        for ct, cd in sorted(cov.items(), key=lambda x: -x[1].get("count", 0)):
            lines.append(
                f"  {ct}: {cd['count']} plays ({cd['rate'] * 100:.0f}%) | "
                f"Avg {cd['avg_yards_allowed']:.1f} yds allowed"
            )
        lines.append("")

        # Blitz
        blitz = t.get("blitz", {})
        lines.append("BLITZ:")
        lines.append(f"  Overall blitz rate: {blitz.get('overall_rate', 0) * 100:.0f}%")
        lines.append(f"  Avg yards allowed on blitz: {blitz.get('avg_yards_on_blitz', 0):.1f}")
        lines.append(f"  Avg yards allowed no blitz: {blitz.get('avg_yards_no_blitz', 0):.1f}")
        lines.append("")

        # By down
        lines.append("DOWN TENDENCIES:")
        by_down = t.get("by_down", {})
        for d in ["1", "2", "3", "4"]:
            if d in by_down:
                dd = by_down[d]
                lines.append(
                    f"  Down {d}: {dd['plays']} plays | Blitz {dd['blitz_rate'] * 100:.0f}% | "
                    f"Top coverage: {dd['top_coverage']} | Avg {dd['avg_yards_allowed']:.1f} yds allowed"
                )
        lines.append("")

        # 3rd down
        third = t.get("third_down", {})
        if third:
            lines.append(f"3RD DOWN CONVERSION RATE ALLOWED: {third.get('conversion_rate_allowed', 0) * 100:.0f}%")
            lines.append("")

        # Matchup recommendations
        lines.append("=== MATCHUP RECOMMENDATIONS ===")
        lines.append("")

        attack = [m for m in matchups if m["recommendation"] == "attack"]
        avoid = [m for m in matchups if m["recommendation"] == "avoid"]

        if attack:
            lines.append("ATTACK THESE DEFENDERS:")
            for m in attack:
                lines.append(f"  → {m['name']}: {m['reason']}")
            lines.append("")

        if avoid:
            lines.append("AVOID THESE DEFENDERS:")
            for m in avoid:
                lines.append(f"  ✗ {m['name']}: {m['reason']}")
            lines.append("")

        return "\n".join(lines)


# ── Example Usage ────────────────────────────────────────────────

def example_run() -> None:
    """Demonstrate defensive analysis with mock data."""
    analyzer = DefensiveAnalyzer(team_id=2, team_name="Tennessee")

    mock_plays = [
        {"down": 1, "distance": 10, "coverage_tag": "single_high", "blitz_detected": False,
         "yards_allowed": 7, "formation_tag": "2x2"},
        {"down": 2, "distance": 3, "coverage_tag": "man", "blitz_detected": True,
         "yards_allowed": -2, "formation_tag": "2x2"},
        {"down": 3, "distance": 5, "coverage_tag": "cover_2", "blitz_detected": False,
         "yards_allowed": 8, "formation_tag": "3x1"},
        {"down": 1, "distance": 10, "coverage_tag": "single_high", "blitz_detected": False,
         "yards_allowed": 15, "formation_tag": "trips_right"},
        {"down": 1, "distance": 10, "coverage_tag": "zero", "blitz_detected": True,
         "yards_allowed": 22, "formation_tag": "empty"},
        {"down": 2, "distance": 7, "coverage_tag": "cover_2", "blitz_detected": False,
         "yards_allowed": 4, "formation_tag": "2x2"},
        {"down": 3, "distance": 8, "coverage_tag": "single_high", "blitz_detected": True,
         "yards_allowed": 12, "formation_tag": "3x1"},
    ]

    mock_defender_stats = [
        {"player_id": 21, "name": "#21 (CB)", "targets": 8, "completions_allowed": 6,
         "yards_allowed": 74, "touchdowns_allowed": 2, "interceptions": 0,
         "pass_breakups": 0, "big_plays_allowed": 3},
        {"player_id": 3, "name": "#3 (S)", "targets": 5, "completions_allowed": 2,
         "yards_allowed": 15, "touchdowns_allowed": 0, "interceptions": 2,
         "pass_breakups": 2, "big_plays_allowed": 0},
        {"player_id": 14, "name": "#14 (CB)", "targets": 6, "completions_allowed": 4,
         "yards_allowed": 38, "touchdowns_allowed": 1, "interceptions": 0,
         "pass_breakups": 1, "big_plays_allowed": 1},
    ]

    tendencies = analyzer.compute_tendencies(mock_plays)
    matchups = analyzer.compute_matchup_recommendations(mock_defender_stats)
    report = analyzer.generate_text_report(tendencies, matchups)

    print(report)
    print("\n--- Defensive JSON ---")
    print(json.dumps(tendencies, indent=2))
    print("\n--- Matchup JSON ---")
    print(json.dumps(matchups, indent=2))


if __name__ == "__main__":
    example_run()
