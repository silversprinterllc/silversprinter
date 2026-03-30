"""
LLM-powered scouting report generator.

Takes computed analytics JSON and produces a polished, coach-friendly
scouting report using Claude API.

Also includes the prompt template for direct use without the API.
"""

from __future__ import annotations

import json
from typing import Optional


# ── Prompt Template ───────────────────────────────────────────────

SCOUTING_REPORT_PROMPT = """You are a flag football scouting analyst writing a game preparation report for a coaching staff. You will be given structured JSON data about an opponent's offensive and defensive tendencies, playing time data, and matchup notes.

Your job is to produce a clear, actionable scouting report that a flag football coach can use to prepare for their next game against this opponent.

IMPORTANT RULES:
- Only reference data that is present in the JSON. Do not invent stats or tendencies.
- If a section's data is missing or empty, say "Insufficient data" and move on.
- Use practical flag football terminology (not NFL-level technical jargon).
- Focus on actionable insights a coach can use in their game plan.
- Include specific percentages and numbers from the data.
- Keep it concise — coaches are busy.

Write the report with these sections:

## OPPONENT OVERVIEW
- Team name, record if available, general style characterization

## OFFENSIVE TENDENCIES
- Primary formations and usage rates
- Pass/run split overall and by down
- Motion usage and effectiveness
- Red zone tendencies
- Key offensive players (who gets the ball most, explosive threats)
- Areas of offensive strength
- Areas of offensive weakness to exploit

## DEFENSIVE TENDENCIES
- Primary coverage shells and rates
- Blitz frequency and tendencies (when do they blitz?)
- Coverage by down and distance
- 3rd down defense
- Areas of defensive strength
- Areas of defensive weakness to exploit

## MATCHUP RECOMMENDATIONS
### Defenders to ATTACK:
- List each with specific reasoning and route/concept suggestions

### Defenders to AVOID:
- List each with reasoning

## GAME PLAN BULLETS
- 5-8 specific, call-sheet-ready recommendations
- Example format: "On 1st down from trips, attack boundary — they play single-high 70% of the time and CB #21 allows 9.2 yds/target"

---

Here is the opponent data:

### OFFENSE DATA:
{{offense_json}}

### DEFENSE DATA:
{{defense_json}}

### PLAYING TIME DATA:
{{playing_time_json}}

### MATCHUP NOTES:
{{matchup_json}}

### ADDITIONAL CONTEXT:
{{context}}

Now write the scouting report:"""


class ScoutingReportGenerator:
    """Generate scouting reports from analytics data.

    Can use:
    1. Claude API (via anthropic SDK) for AI-powered reports
    2. Template-based generation for offline/fallback reports
    """

    def __init__(self, api_key: Optional[str] = None) -> None:
        self.api_key = api_key
        self._client = None

    def _get_client(self):
        """Lazy-load the Anthropic client."""
        if self._client is None and self.api_key:
            try:
                import anthropic
                self._client = anthropic.Anthropic(api_key=self.api_key)
            except ImportError:
                print("WARNING: anthropic SDK not installed. Using template fallback.")
        return self._client

    def generate_report(
        self,
        offense_json: dict,
        defense_json: dict,
        playing_time_json: Optional[dict] = None,
        matchup_json: Optional[list[dict]] = None,
        context: str = "",
        use_llm: bool = True,
    ) -> str:
        """Generate a scouting report.

        Args:
            offense_json: Offensive tendency data.
            defense_json: Defensive tendency data.
            playing_time_json: Playing time stats.
            matchup_json: Matchup recommendations.
            context: Additional context string.
            use_llm: If True and API key available, use Claude API.

        Returns:
            Scouting report text.
        """
        if use_llm and self.api_key:
            return self._generate_with_llm(
                offense_json, defense_json, playing_time_json, matchup_json, context
            )
        return self._generate_template(
            offense_json, defense_json, playing_time_json, matchup_json
        )

    def _generate_with_llm(
        self,
        offense_json: dict,
        defense_json: dict,
        playing_time_json: Optional[dict],
        matchup_json: Optional[list[dict]],
        context: str,
    ) -> str:
        """Generate report using Claude API."""
        client = self._get_client()
        if client is None:
            return self._generate_template(
                offense_json, defense_json, playing_time_json, matchup_json
            )

        prompt = SCOUTING_REPORT_PROMPT
        prompt = prompt.replace("{{offense_json}}", json.dumps(offense_json, indent=2))
        prompt = prompt.replace("{{defense_json}}", json.dumps(defense_json, indent=2))
        prompt = prompt.replace("{{playing_time_json}}",
                               json.dumps(playing_time_json, indent=2) if playing_time_json else "Not available")
        prompt = prompt.replace("{{matchup_json}}",
                               json.dumps(matchup_json, indent=2) if matchup_json else "Not available")
        prompt = prompt.replace("{{context}}", context or "None")

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            messages=[{"role": "user", "content": prompt}],
        )

        return message.content[0].text

    def _generate_template(
        self,
        offense_json: dict,
        defense_json: dict,
        playing_time_json: Optional[dict],
        matchup_json: Optional[list[dict]],
    ) -> str:
        """Generate report using template (no LLM needed).

        Produces a structured report from the data directly.
        """
        lines = []

        # Header
        team_name = offense_json.get("team_name") or defense_json.get("team_name", "Opponent")
        lines.append(f"# SCOUTING REPORT: {team_name}")
        lines.append("")

        # Offense section
        lines.append("## OFFENSIVE TENDENCIES")
        lines.append("")

        total = offense_json.get("total_plays", 0)
        if total > 0:
            lines.append(f"- **{total} plays analyzed**")
            lines.append(f"- Pass rate: {offense_json.get('pass_rate', 0) * 100:.0f}%")
            lines.append(f"- Avg yards/play: {offense_json.get('avg_yards_per_play', 0):.1f}")
            lines.append("")

            # Formations
            by_form = offense_json.get("by_formation", {})
            if by_form:
                lines.append("### Formation Usage:")
                for ft, fd in sorted(by_form.items(), key=lambda x: -x[1].get("plays", 0)):
                    lines.append(
                        f"- **{ft}**: {fd['usage_rate'] * 100:.0f}% of plays, "
                        f"pass {fd['pass_rate'] * 100:.0f}%, avg {fd['avg_yards']:.1f} yds"
                    )
                lines.append("")

            # Down tendencies
            by_down = offense_json.get("by_down", {})
            if by_down:
                lines.append("### By Down:")
                for d in ["1", "2", "3", "4"]:
                    if d in by_down:
                        dd = by_down[d]
                        lines.append(
                            f"- Down {d}: {dd['plays']} plays, "
                            f"pass {dd['pass_rate'] * 100:.0f}%, avg {dd['avg_yards']:.1f} yds"
                        )
                lines.append("")

            # Motion
            motion = offense_json.get("motion", {})
            if motion:
                lines.append(f"### Motion: Used {motion.get('usage_rate', 0) * 100:.0f}% of plays")
                lines.append(f"- With motion: {motion.get('avg_yards_with_motion', 0):.1f} yds avg")
                lines.append(f"- Without: {motion.get('avg_yards_without_motion', 0):.1f} yds avg")
                lines.append("")
        else:
            lines.append("Insufficient offensive data.")
            lines.append("")

        # Defense section
        lines.append("## DEFENSIVE TENDENCIES")
        lines.append("")

        def_total = defense_json.get("total_plays", 0)
        if def_total > 0:
            lines.append(f"- **{def_total} plays analyzed**")
            lines.append("")

            cov = defense_json.get("coverage_distribution", {})
            if cov:
                lines.append("### Coverage Shells:")
                for ct, cd in sorted(cov.items(), key=lambda x: -x[1].get("count", 0)):
                    lines.append(
                        f"- **{ct}**: {cd['rate'] * 100:.0f}% | "
                        f"avg {cd['avg_yards_allowed']:.1f} yds allowed"
                    )
                lines.append("")

            blitz = defense_json.get("blitz", {})
            if blitz:
                lines.append(f"### Blitz: {blitz.get('overall_rate', 0) * 100:.0f}% of plays")
                lines.append(f"- On blitz: {blitz.get('avg_yards_on_blitz', 0):.1f} yds allowed")
                lines.append(f"- No blitz: {blitz.get('avg_yards_no_blitz', 0):.1f} yds allowed")
                lines.append("")
        else:
            lines.append("Insufficient defensive data.")
            lines.append("")

        # Matchups
        if matchup_json:
            lines.append("## MATCHUP RECOMMENDATIONS")
            lines.append("")

            attack = [m for m in matchup_json if m.get("recommendation") == "attack"]
            avoid = [m for m in matchup_json if m.get("recommendation") == "avoid"]

            if attack:
                lines.append("### ATTACK:")
                for m in attack:
                    lines.append(f"- **{m['name']}**: {m['reason']}")
                lines.append("")

            if avoid:
                lines.append("### AVOID:")
                for m in avoid:
                    lines.append(f"- **{m['name']}**: {m['reason']}")
                lines.append("")

        return "\n".join(lines)

    def build_prompt(
        self,
        offense_json: dict,
        defense_json: dict,
        playing_time_json: Optional[dict] = None,
        matchup_json: Optional[list[dict]] = None,
        context: str = "",
    ) -> str:
        """Build the full prompt string (for manual use or debugging).

        Returns the prompt with all data filled in, ready to paste
        into any LLM interface.
        """
        prompt = SCOUTING_REPORT_PROMPT
        prompt = prompt.replace("{{offense_json}}", json.dumps(offense_json, indent=2))
        prompt = prompt.replace("{{defense_json}}", json.dumps(defense_json, indent=2))
        prompt = prompt.replace("{{playing_time_json}}",
                               json.dumps(playing_time_json, indent=2) if playing_time_json else "Not available")
        prompt = prompt.replace("{{matchup_json}}",
                               json.dumps(matchup_json, indent=2) if matchup_json else "Not available")
        prompt = prompt.replace("{{context}}", context or "None")
        return prompt
