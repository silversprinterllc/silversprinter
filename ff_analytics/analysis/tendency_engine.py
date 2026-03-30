"""
Play Calling Tendency Engine — the brain that makes this product premium.

Aggregates play-by-play data across games and computes multi-dimensional
tendencies that coaches use to game plan:

1. Formation → Play Type tendencies
   "From Trips Right, they pass 72% and run 28%"

2. Down & Distance → Formation tendencies
   "On 3rd & long, they go Empty 65% of the time"

3. Coverage → Play Call tendencies
   "Against Cover 2, they attack the seam 45% of plays"

4. Situational tendencies
   "Inside 2 minutes trailing, they go Empty and throw deep 80%"

5. Player usage tendencies
   "Player X runs a go route 40% of snaps from boundary WR alignment"

The engine works across single games OR aggregated across a season.
"""

from __future__ import annotations

import json
from collections import Counter, defaultdict
from dataclasses import dataclass
from typing import Optional


@dataclass
class Tendency:
    """A single tendency observation."""
    context: str        # "From Trips Right"
    action: str         # "they pass"
    rate: float         # 0.72
    sample_size: int    # 18 plays
    confidence: str     # "High" if 15+ plays, "Medium" if 8+, "Low" if <8


@dataclass
class TendencyReport:
    """Complete tendency breakdown for a team."""
    team: str
    games_analyzed: int
    total_plays: int
    tendencies: list[Tendency]
    formation_play_type: dict    # {formation: {pass_rate, run_rate, plays}}
    down_distance_formation: dict # {down_bucket: {formation: count}}
    coverage_response: dict       # {coverage: {play_type: count}}
    situational: dict             # {situation: {tendency}}
    top_insights: list[str]       # human-readable key findings


class TendencyEngine:
    """Compute and store play calling tendencies."""

    def __init__(self):
        self.play_database: list[dict] = []

    def add_game(self, drives: list[dict], team: str):
        """Add a game's worth of play data to the database.

        Args:
            drives: List of drive dicts from GameAnalyzer.
            team: Which team to analyze (as offense).
        """
        for d in drives:
            if d.get("offense") != team:
                continue
            for p in d.get("play_details", []):
                self.play_database.append({
                    "team": team,
                    "formation": p.get("formation", "Unknown"),
                    "coverage": p.get("coverage", "Unknown"),
                    "down": p.get("down", 0),
                    "yard_line": p.get("yard", 40),
                    "gain": p.get("gain", 0),
                    "big_play": p.get("big_play", False),
                    "play_type": "Pass" if p.get("gain", 0) > 10 else "Run",  # rough heuristic
                    "drive_result": d.get("result", ""),
                })

    def add_plays_raw(self, plays: list[dict], team: str):
        """Add raw play data directly."""
        for p in plays:
            p["team"] = team
            self.play_database.append(p)

    def compute_tendencies(self, team: Optional[str] = None) -> TendencyReport:
        """Compute all tendencies for a team.

        Args:
            team: Team name to filter. None = all plays.

        Returns:
            TendencyReport with all computed tendencies.
        """
        plays = self.play_database
        if team:
            plays = [p for p in plays if p.get("team") == team]

        if not plays:
            return TendencyReport(
                team=team or "All", games_analyzed=0, total_plays=0,
                tendencies=[], formation_play_type={},
                down_distance_formation={}, coverage_response={},
                situational={}, top_insights=["No data available"],
            )

        total = len(plays)
        tendencies = []
        insights = []

        # ── 1. Formation → Play Type ────────────────────────────
        form_pt = {}
        by_formation = defaultdict(list)
        for p in plays:
            by_formation[p["formation"]].append(p)

        for form, form_plays in by_formation.items():
            n = len(form_plays)
            if n < 2:
                continue

            # Estimate pass vs run from gain patterns
            # High variance gains = passing, low variance = running
            gains = [p.get("gain", 0) for p in form_plays]
            big_plays = sum(1 for p in form_plays if p.get("big_play"))
            avg_gain = sum(gains) / n

            # Heuristic: big play rate > 20% suggests passing formation
            pass_rate = min(0.9, max(0.1, big_plays / n + 0.3))
            run_rate = 1 - pass_rate

            form_pt[form] = {
                "plays": n,
                "usage_rate": round(n / total, 3),
                "avg_gain": round(avg_gain, 1),
                "big_play_rate": round(big_plays / n, 3),
                "pass_rate_est": round(pass_rate, 2),
                "run_rate_est": round(run_rate, 2),
            }

            if n >= 5:
                conf = "High" if n >= 15 else ("Medium" if n >= 8 else "Low")
                tendencies.append(Tendency(
                    context=f"From {form}",
                    action=f"avg gain {avg_gain:.1f} yds, big play {big_plays/n*100:.0f}%",
                    rate=round(n / total, 3),
                    sample_size=n,
                    confidence=conf,
                ))

        # Top formation insight
        if form_pt:
            top_form = max(form_pt.items(), key=lambda x: x[1]["plays"])
            insights.append(
                f"Primary formation: {top_form[0]} ({top_form[1]['plays']}x, "
                f"{top_form[1]['usage_rate']*100:.0f}% of plays, "
                f"avg {top_form[1]['avg_gain']:.1f} yds/play)"
            )

        # ── 2. Down & Distance → Formation ──────────────────────
        dd_form = {}
        for p in plays:
            down = p.get("down", 0)
            if down < 1 or down > 4:
                continue

            # Distance bucket
            yard = p.get("yard_line", 40)
            if yard < 20:
                zone = "own_territory"
            elif yard < 40:
                zone = "between_zones"
            elif yard < 60:
                zone = "midfield"
            else:
                zone = "scoring_territory"

            key = f"Down {down}, {zone}"
            if key not in dd_form:
                dd_form[key] = {"formations": Counter(), "total": 0}
            dd_form[key]["formations"][p["formation"]] += 1
            dd_form[key]["total"] += 1

        # Convert counters to dicts
        for key in dd_form:
            dd_form[key]["formations"] = dict(dd_form[key]["formations"].most_common(5))

        # ── 3. Coverage → Response ──────────────────────────────
        cov_resp = {}
        by_coverage = defaultdict(list)
        for p in plays:
            by_coverage[p.get("coverage", "Unknown")].append(p)

        for cov, cov_plays in by_coverage.items():
            n = len(cov_plays)
            if n < 3:
                continue
            gains = [p.get("gain", 0) for p in cov_plays]
            big = sum(1 for p in cov_plays if p.get("big_play"))
            avg_g = sum(gains) / n

            cov_resp[cov] = {
                "plays_faced": n,
                "avg_gain_against": round(avg_g, 1),
                "big_play_rate_against": round(big / n, 3),
                "top_formations_used": dict(Counter(p["formation"] for p in cov_plays).most_common(3)),
            }

            if n >= 5:
                if avg_g > 5:
                    insights.append(f"Against {cov}: avg {avg_g:.1f} yds/play — this coverage is beatable")
                elif avg_g < 1:
                    insights.append(f"Against {cov}: avg {avg_g:.1f} yds/play — this coverage is tough")

        # ── 4. Situational ──────────────────────────────────────
        situational = {}

        # Early downs (1st-2nd)
        early = [p for p in plays if p.get("down", 0) in (1, 2)]
        if early:
            early_forms = Counter(p["formation"] for p in early)
            situational["early_downs"] = {
                "plays": len(early),
                "top_formation": early_forms.most_common(1)[0][0] if early_forms else "N/A",
                "avg_gain": round(sum(p.get("gain", 0) for p in early) / len(early), 1),
            }

        # Late downs (3rd-4th)
        late = [p for p in plays if p.get("down", 0) in (3, 4)]
        if late:
            late_forms = Counter(p["formation"] for p in late)
            situational["late_downs"] = {
                "plays": len(late),
                "top_formation": late_forms.most_common(1)[0][0] if late_forms else "N/A",
                "avg_gain": round(sum(p.get("gain", 0) for p in late) / len(late), 1),
            }

        # Scoring territory (yard > 60)
        red_zone = [p for p in plays if p.get("yard_line", 0) > 60]
        if red_zone:
            rz_forms = Counter(p["formation"] for p in red_zone)
            situational["scoring_territory"] = {
                "plays": len(red_zone),
                "top_formation": rz_forms.most_common(1)[0][0] if rz_forms else "N/A",
                "avg_gain": round(sum(p.get("gain", 0) for p in red_zone) / len(red_zone), 1),
            }

        # ── 5. Drive efficiency ─────────────────────────────────
        scoring_drives = [p for p in plays if "Touchdown" in p.get("drive_result", "")]
        if scoring_drives:
            scoring_forms = Counter(p["formation"] for p in scoring_drives)
            insights.append(
                f"On scoring drives, top formation: {scoring_forms.most_common(1)[0][0]} "
                f"({scoring_forms.most_common(1)[0][1]}x)"
            )

        return TendencyReport(
            team=team or "All",
            games_analyzed=1,  # placeholder
            total_plays=total,
            tendencies=tendencies,
            formation_play_type=form_pt,
            down_distance_formation=dd_form,
            coverage_response=cov_resp,
            situational=situational,
            top_insights=insights,
        )

    def generate_scouting_bullets(self, report: TendencyReport) -> list[str]:
        """Generate actionable coaching bullets from tendencies.

        These are the money — specific, data-backed recommendations
        that coaches use to build their game plan.
        """
        bullets = []
        fpt = report.formation_play_type
        cr = report.coverage_response

        # Formation tendencies
        if fpt:
            sorted_forms = sorted(fpt.items(), key=lambda x: -x[1]["plays"])
            for form, data in sorted_forms[:3]:
                if data["plays"] >= 5:
                    bullets.append(
                        f"When {report.team} lines up in {form} ({data['plays']}x, "
                        f"{data['usage_rate']*100:.0f}% of plays): "
                        f"avg {data['avg_gain']:.1f} yds/play, "
                        f"big play rate {data['big_play_rate']*100:.0f}%. "
                        f"{'Respect this formation — they produce from it.' if data['avg_gain'] > 5 else 'This formation is containable.'}"
                    )

        # Coverage exploit
        if cr:
            for cov, data in cr.items():
                if data["plays_faced"] >= 5:
                    if data["avg_gain_against"] > 6:
                        top_form = list(data["top_formations_used"].keys())[0] if data["top_formations_used"] else "various"
                        bullets.append(
                            f"Against {cov}, {report.team} averages {data['avg_gain_against']:.1f} yds/play "
                            f"(big play rate: {data['big_play_rate_against']*100:.0f}%). "
                            f"They prefer {top_form} against this coverage. "
                            f"AVOID playing {cov} against them."
                        )
                    elif data["avg_gain_against"] < 2:
                        bullets.append(
                            f"{cov} shuts {report.team} down: only {data['avg_gain_against']:.1f} yds/play. "
                            f"LEAN INTO this coverage."
                        )

        # Situational
        sit = report.situational
        if "late_downs" in sit and "early_downs" in sit:
            early_g = sit["early_downs"]["avg_gain"]
            late_g = sit["late_downs"]["avg_gain"]
            if late_g > early_g * 1.5:
                bullets.append(
                    f"DANGER on money downs: {report.team} is MORE productive on 3rd/4th down "
                    f"({late_g:.1f} yds) than early downs ({early_g:.1f} yds). They have a closer package."
                )
            elif late_g < early_g * 0.5:
                bullets.append(
                    f"Get them to 3rd down: {report.team} struggles on money downs "
                    f"({late_g:.1f} yds vs {early_g:.1f} on early downs). "
                    f"Win first and second down to force difficult third downs."
                )

        return bullets

    def to_json(self, report: TendencyReport) -> dict:
        """Convert tendency report to JSON-serializable dict."""
        return {
            "team": report.team,
            "games": report.games_analyzed,
            "total_plays": report.total_plays,
            "formation_play_type": report.formation_play_type,
            "down_distance_formation": report.down_distance_formation,
            "coverage_response": report.coverage_response,
            "situational": report.situational,
            "insights": report.top_insights,
            "scouting_bullets": self.generate_scouting_bullets(report),
            "tendencies": [
                {"context": t.context, "action": t.action, "rate": t.rate,
                 "sample_size": t.sample_size, "confidence": t.confidence}
                for t in report.tendencies
            ],
        }
