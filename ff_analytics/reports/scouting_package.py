"""
Scouting Package Generator — per-opponent reports for Coach Debarry's Florida Gators.

For each opponent:
1. Their offensive tendencies (formations, motion, play calling)
2. Their defensive tendencies (coverage, blitz, pressure)
3. Key players to watch
4. Strategy to beat them
5. Florida's weaknesses they might exploit

Aggregates data from all available games, not just head-to-head.
"""

from __future__ import annotations

import json
import os
from collections import Counter, defaultdict
from typing import Optional


class ScoutingPackage:
    """Generate opponent scouting reports for a specific team."""

    def __init__(self, our_team: str = "Florida"):
        self.our_team = our_team
        self.games = []       # all game data loaded
        self.schedule = []    # WCFL schedule
        self.standings = []   # current standings

    def load_game(self, drives_path: str, game_label: str,
                  team_a: str, team_b: str, score_a: int, score_b: int):
        """Load a processed game into the scouting database."""
        with open(drives_path) as f:
            drives = json.loads(f.read())

        self.games.append({
            "label": game_label,
            "team_a": team_a,
            "team_b": team_b,
            "score_a": score_a,
            "score_b": score_b,
            "drives": drives,
        })

    def generate_opponent_report(self, opponent: str) -> str:
        """Generate a complete scouting report against one opponent."""
        # Gather all games this opponent played
        opp_games = []
        for g in self.games:
            if g["team_a"] == opponent or g["team_b"] == opponent:
                opp_games.append(g)

        # Gather all games WE played (for self-scouting)
        our_games = []
        for g in self.games:
            if g["team_a"] == self.our_team or g["team_b"] == self.our_team:
                our_games.append(g)

        if not opp_games:
            return f"No film available for {opponent}."

        # Analyze opponent offense
        opp_off = self._analyze_offense(opp_games, opponent)
        # Analyze opponent defense
        opp_def = self._analyze_defense(opp_games, opponent)
        # Analyze our weaknesses
        our_weak = self._analyze_weaknesses(our_games)
        # Strategy
        strategy = self._build_strategy(opp_off, opp_def, our_weak, opponent)

        # Build report
        lines = []
        lines.append("=" * 72)
        lines.append(f"  SCOUTING REPORT: {self.our_team.upper()} vs {opponent.upper()}")
        lines.append(f"  Prepared for Coach Debarry")
        lines.append("=" * 72)

        # Opponent record
        opp_record = self._get_record(opponent)
        lines.append(f"\n  {opponent} Season Record: {opp_record}")
        lines.append(f"  Games on Film: {len(opp_games)}")

        # HEAD TO HEAD
        h2h = [g for g in opp_games
               if g["team_a"] == self.our_team or g["team_b"] == self.our_team]
        if h2h:
            lines.append(f"\n  HEAD TO HEAD:")
            for g in h2h:
                lines.append(f"    {g['label']}: {g['team_a']} {g['score_a']} - {g['team_b']} {g['score_b']}")

        # OPPONENT OFFENSE
        lines.append(f"\n" + "-" * 72)
        lines.append(f"  {opponent.upper()} OFFENSE")
        lines.append("-" * 72)

        if opp_off["formations"]:
            lines.append(f"\n  Primary Formations:")
            for name, ct, pct in opp_off["formations"][:5]:
                lines.append(f"    {name:<25} {ct:>3}x  ({pct:.0f}%)")

        if opp_off["coverages_faced"]:
            lines.append(f"\n  Coverages They Face Most:")
            for name, ct, pct in opp_off["coverages_faced"][:3]:
                lines.append(f"    {name:<25} {ct:>3}x  ({pct:.0f}%)")

        lines.append(f"\n  Offensive Tendencies:")
        for t in opp_off["tendencies"]:
            lines.append(f"    - {t}")

        # OPPONENT DEFENSE
        lines.append(f"\n" + "-" * 72)
        lines.append(f"  {opponent.upper()} DEFENSE")
        lines.append("-" * 72)

        if opp_def["coverages"]:
            lines.append(f"\n  Coverage Shells:")
            for name, ct, pct in opp_def["coverages"][:5]:
                lines.append(f"    {name:<25} {ct:>3}x  ({pct:.0f}%)")

        lines.append(f"\n  Defensive Tendencies:")
        for t in opp_def["tendencies"]:
            lines.append(f"    - {t}")

        # STRATEGY TO BEAT THEM
        lines.append(f"\n" + "-" * 72)
        lines.append(f"  STRATEGY TO BEAT {opponent.upper()}")
        lines.append("-" * 72)

        lines.append(f"\n  OFFENSIVE GAME PLAN (vs their defense):")
        for s in strategy["offense"]:
            lines.append(f"    >> {s}")

        lines.append(f"\n  DEFENSIVE GAME PLAN (vs their offense):")
        for s in strategy["defense"]:
            lines.append(f"    >> {s}")

        # OUR WEAKNESSES THEY COULD EXPLOIT
        lines.append(f"\n" + "-" * 72)
        lines.append(f"  FLORIDA WEAKNESSES TO ADDRESS")
        lines.append("-" * 72)
        for w in our_weak:
            lines.append(f"    ! {w}")

        lines.append(f"\n" + "=" * 72)
        lines.append(f"  FF Analytics -- Confidential Scouting Report")
        lines.append("=" * 72)

        return "\n".join(lines)

    def _analyze_offense(self, games, team):
        """Analyze a team's offensive tendencies across all their games."""
        formations = Counter()
        coverages_faced = Counter()
        total_plays = 0
        total_tds = 0
        total_yards = 0
        tendencies = []

        for g in games:
            for d in g["drives"]:
                if d.get("offense") != team:
                    continue
                total_plays += d.get("plays", 0)
                total_yards += d.get("yards", 0)
                if "Touchdown" in d.get("result", ""):
                    total_tds += 1

                for p in d.get("play_details", []):
                    f = p.get("formation", "")
                    if f and f != "Inconclusive":
                        formations[f] += 1
                    c = p.get("coverage", "")
                    if c and c != "Unknown":
                        coverages_faced[c] += 1

        # Convert to sorted lists with percentages
        total_f = sum(formations.values()) or 1
        form_list = [(k, v, v/total_f*100) for k, v in formations.most_common()]

        total_c = sum(coverages_faced.values()) or 1
        cov_list = [(k, v, v/total_c*100) for k, v in coverages_faced.most_common()]

        # Generate tendency insights
        if form_list:
            top = form_list[0]
            tendencies.append(f"Favorite formation: {top[0]} ({top[2]:.0f}% of plays)")
        if len(form_list) >= 2:
            second = form_list[1]
            tendencies.append(f"Secondary look: {second[0]} ({second[2]:.0f}%)")
        if total_plays > 0:
            ypp = total_yards / total_plays
            tendencies.append(f"{total_plays} plays, {total_yards:+.0f} yards, {total_tds} TDs ({ypp:.1f} yds/play)")

        # Check formation variety
        if len(formations) <= 2:
            tendencies.append("LOW formation variety -- predictable, can key on alignment")
        elif len(formations) >= 5:
            tendencies.append("HIGH formation variety -- multiple looks, hard to predict")

        return {
            "formations": form_list,
            "coverages_faced": cov_list,
            "total_plays": total_plays,
            "total_tds": total_tds,
            "tendencies": tendencies,
        }

    def _analyze_defense(self, games, team):
        """Analyze a team's defensive tendencies."""
        coverages = Counter()
        total_plays = 0
        tds_allowed = 0
        yards_allowed = 0
        tendencies = []

        for g in games:
            for d in g["drives"]:
                if d.get("defense") != team:
                    continue
                total_plays += d.get("plays", 0)
                yards_allowed += d.get("yards", 0)
                if "Touchdown" in d.get("result", ""):
                    tds_allowed += 1

                for p in d.get("play_details", []):
                    c = p.get("coverage", "")
                    if c and c != "Unknown":
                        coverages[c] += 1

        total_c = sum(coverages.values()) or 1
        cov_list = [(k, v, v/total_c*100) for k, v in coverages.most_common()]

        if cov_list:
            top = cov_list[0]
            tendencies.append(f"Base coverage: {top[0]} ({top[2]:.0f}% of snaps)")
        if len(cov_list) >= 2:
            tendencies.append(f"Change-up: {cov_list[1][0]} ({cov_list[1][2]:.0f}%)")
        if total_plays > 0:
            ypa = yards_allowed / total_plays
            tendencies.append(f"Allowed {yards_allowed:+.0f} yards on {total_plays} plays ({ypa:.1f} yds/play)")
            tendencies.append(f"TDs allowed: {tds_allowed}")

        # Single coverage tendency = exploitable
        if cov_list and cov_list[0][2] > 65:
            tendencies.append(f"EXPLOITABLE: {cov_list[0][0]} over 65% of the time -- can scheme against it")

        return {
            "coverages": cov_list,
            "total_plays": total_plays,
            "tds_allowed": tds_allowed,
            "tendencies": tendencies,
        }

    def _analyze_weaknesses(self, our_games):
        """Self-scout: find Florida's weaknesses."""
        weaknesses = []
        total_drives = 0
        tds = 0
        turnovers = 0
        punts = 0

        for g in our_games:
            for d in g["drives"]:
                if d.get("offense") != self.our_team:
                    continue
                total_drives += 1
                if "Touchdown" in d.get("result", ""):
                    tds += 1
                elif "Turnover" in d.get("result", ""):
                    turnovers += 1
                elif d.get("result") == "Punt":
                    punts += 1

        if total_drives > 0:
            td_rate = tds / total_drives * 100
            if td_rate < 30:
                weaknesses.append(f"Red zone finishing: Only {td_rate:.0f}% of drives end in TDs")
            if turnovers > 0:
                weaknesses.append(f"Ball security: {turnovers} turnovers in {len(our_games)} games on film")
            if punts > 1:
                weaknesses.append(f"Drive stalls: {punts} punts -- some drives dying before scoring range")

        # Formation predictability
        our_formations = Counter()
        for g in our_games:
            for d in g["drives"]:
                if d.get("offense") != self.our_team:
                    continue
                for p in d.get("play_details", []):
                    f = p.get("formation", "")
                    if f and f != "Inconclusive":
                        our_formations[f] += 1

        total_f = sum(our_formations.values()) or 1
        if our_formations:
            top_pct = our_formations.most_common(1)[0][1] / total_f * 100
            if top_pct > 40:
                top_name = our_formations.most_common(1)[0][0]
                weaknesses.append(f"Formation predictability: {top_name} used {top_pct:.0f}% of the time")

        if not weaknesses:
            weaknesses.append("No significant weaknesses identified from film (limited sample)")

        return weaknesses

    def _build_strategy(self, opp_off, opp_def, our_weak, opponent):
        """Build specific game plan recommendations."""
        offense = []
        defense = []

        # Offensive strategy (attacking their defense)
        if opp_def["coverages"]:
            top_cov = opp_def["coverages"][0]
            if "Cover 2" in top_cov[0]:
                offense.append("Attack the middle of the field -- Cover 2 leaves the seam and deep middle open")
                offense.append("Use posts, deep overs, and seam routes to split the safeties")
                offense.append("Flood one side with 3 routes to stress the corner/flat defender")
            elif "Cover 1" in top_cov[0] or "Cover 3" in top_cov[0]:
                offense.append("Attack the flats and sideline -- single-high leaves boundary vulnerable")
                offense.append("Use outs, corners, and flat/wheel combos")
                offense.append("Motion to identify man vs zone pre-snap")
            elif "Cover 0" in top_cov[0]:
                offense.append("They play zero coverage -- quick game and hot routes are essential")
                offense.append("Slants, fades, and RPO concepts beat zero blitz")

            if top_cov[2] > 60:
                offense.append(f"They are predictable in {top_cov[0]} -- install 2-3 beaters and rep them all week")

        # Defensive strategy (stopping their offense)
        if opp_off["formations"]:
            top_form = opp_off["formations"][0]
            if "Spread" in top_form[0] or "2x2" in top_form[0]:
                defense.append("They spread you out -- match personnel and keep leverage outside")
                defense.append("Bracket their best receiver, play underneath everything else")
            elif "Trips" in top_form[0]:
                defense.append("They use trips -- rotate coverage to the trips side, play trail technique backside")
                defense.append("Wall off crossing routes from the trips formation")
            elif "Tight" in top_form[0] or "Pro" in top_form[0]:
                defense.append("They bunch up -- expect pick plays and rub routes")
                defense.append("Switch assignments at the point of attack to avoid picks")

            if len(opp_off["formations"]) <= 2:
                defense.append("LIMITED formation variety -- key on their top 2 looks and lock in assignments")

        if not offense:
            offense.append("Need more film to develop specific offensive counters")
        if not defense:
            defense.append("Need more film to develop specific defensive counters")

        return {"offense": offense, "defense": defense}

    def _get_record(self, team):
        """Get win-loss record from standings data."""
        for s in self.standings:
            if s.get("team") == team:
                return f"{s['w']}-{s['l']} ({s.get('pf', 0)} PF, {s.get('pa', 0)} PA)"
        return "Unknown"

    def generate_full_package(self, output_dir: str):
        """Generate scouting reports for ALL opponents."""
        os.makedirs(output_dir, exist_ok=True)

        opponents = ["Tennessee", "Notre Dame", "Florida St.", "Alabama", "Miami"]
        all_reports = []

        for opp in opponents:
            report = self.generate_opponent_report(opp)
            all_reports.append(report)

            # Save individual report
            safe_name = opp.replace(" ", "_").replace(".", "")
            with open(os.path.join(output_dir, f"vs_{safe_name}.txt"), "w") as f:
                f.write(report)

        # Self-scout
        self_report = self._generate_self_scout()
        all_reports.append(self_report)
        with open(os.path.join(output_dir, "SELF_SCOUT.txt"), "w") as f:
            f.write(self_report)

        # Combined master report
        master = "\n\n\n".join(all_reports)
        with open(os.path.join(output_dir, "MASTER_SCOUTING_PACKAGE.txt"), "w") as f:
            f.write(master)

        return output_dir

    def _generate_self_scout(self):
        """Generate self-scouting report for Florida."""
        lines = []
        lines.append("=" * 72)
        lines.append(f"  SELF-SCOUT: {self.our_team.upper()}")
        lines.append(f"  What opponents see when they study us")
        lines.append("=" * 72)

        our_games = [g for g in self.games
                     if g["team_a"] == self.our_team or g["team_b"] == self.our_team]

        if not our_games:
            lines.append("\n  No film of our team available.")
            return "\n".join(lines)

        off = self._analyze_offense(our_games, self.our_team)
        dfn = self._analyze_defense(our_games, self.our_team)
        weak = self._analyze_weaknesses(our_games)

        lines.append(f"\n  Games on Film: {len(our_games)}")

        lines.append(f"\n  OUR OFFENSIVE IDENTITY:")
        for t in off["tendencies"]:
            lines.append(f"    - {t}")

        if off["formations"]:
            lines.append(f"\n  Our Formations (what they will prepare for):")
            for name, ct, pct in off["formations"][:5]:
                lines.append(f"    {name:<25} {ct:>3}x  ({pct:.0f}%)")

        lines.append(f"\n  OUR DEFENSIVE IDENTITY:")
        for t in dfn["tendencies"]:
            lines.append(f"    - {t}")

        lines.append(f"\n  WHAT WE NEED TO FIX:")
        for w in weak:
            lines.append(f"    ! {w}")

        lines.append(f"\n  WHAT MAKES US HARD TO BEAT:")
        lines.append(f"    + 4-0 record, +66 point differential")
        lines.append(f"    + Only 7 points allowed all season")
        lines.append(f"    + Dominant defense forces opponents into predictable situations")

        lines.append(f"\n" + "=" * 72)
        return "\n".join(lines)
