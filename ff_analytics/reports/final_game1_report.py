"""
Final Game 1 Report Generator.

Merges CV-detected formations/coverages with coach-provided game data
to produce a complete, accurate, marketable scouting report.
"""

from __future__ import annotations

import json
import os
import sys

def generate_final_report(
    play_by_play_path: str,
    coach_input_path: str,
    output_path: str,
):
    with open(play_by_play_path) as f:
        plays = json.loads(f.read())
    with open(coach_input_path) as f:
        coach = json.loads(f.read())

    g = coach['game']
    scoring = coach['scoring']
    turnovers = coach['turnovers']
    notes = coach['coach_notes']

    our = g['our_team']
    opp = g['opponent']
    total = len(plays)

    our_off = [p for p in plays if p['offense'] == our]
    opp_off = [p for p in plays if p['offense'] == opp]
    our_def = [p for p in plays if p['defense'] == our]
    opp_def = [p for p in plays if p['defense'] == opp]

    W = 80
    r = []

    # ════════════════════════════════════════════════════════════════
    # HEADER
    # ════════════════════════════════════════════════════════════════
    r.append("=" * W)
    r.append("")
    r.append(f"{g['league']} FLAG FOOTBALL".center(W))
    r.append("GAME FILM SCOUTING REPORT".center(W))
    r.append("")
    r.append(f"{our} ({g['our_color']}) vs {opp} ({g['opponent_color']})".center(W))
    r.append(f"{g['date']}  |  {g['field']}  |  {g['format']}".center(W))
    r.append("")
    r.append("=" * W)
    r.append("")

    # ════════════════════════════════════════════════════════════════
    # FINAL SCORE
    # ════════════════════════════════════════════════════════════════
    r.append(f"  FINAL SCORE")
    r.append("")
    r.append(f"     {our}  {g['our_score']:>3}")
    r.append(f"     {opp}  {g['opponent_score']:>3}")
    r.append("")
    r.append(f"     Result: {our} {g['result']}")
    r.append("")

    # Scoring breakdown
    r.append("  SCORING SUMMARY")
    r.append("")
    for team in [our, opp]:
        scores = scoring.get(team, [])
        for s in scores:
            r.append(f"     {team}: {s['type']} (+{s['points']})")
    r.append("")

    # Turnover margin
    our_turn = turnovers.get(our, {})
    opp_turn = turnovers.get(opp, {})
    our_to = our_turn.get('total', 0)
    opp_to = opp_turn.get('total', 0)
    margin = opp_to - our_to
    r.append(f"  TURNOVER SUMMARY")

    # Build turnover detail strings from the JSON
    our_turn_details = []
    if our_turn.get('interceptions_thrown', 0): our_turn_details.append(f"{our_turn['interceptions_thrown']} INT thrown")
    if our_turn.get('turnovers_on_downs', 0): our_turn_details.append(f"{our_turn['turnovers_on_downs']} turnovers on downs")
    if our_turn.get('fumbles', 0): our_turn_details.append(f"{our_turn['fumbles']} fumble(s)")
    our_turn_str = ", ".join(our_turn_details) if our_turn_details else our_turn.get('notes', 'Details TBD')

    opp_turn_details = []
    if opp_turn.get('interceptions_thrown', 0): opp_turn_details.append(f"{opp_turn['interceptions_thrown']} INT thrown")
    if opp_turn.get('turnovers_on_downs', 0): opp_turn_details.append(f"{opp_turn['turnovers_on_downs']} turnovers on downs")
    if opp_turn.get('fumbles', 0): opp_turn_details.append(f"{opp_turn['fumbles']} fumble(s)")
    opp_notes = opp_turn.get('notes', '')
    if opp_notes: opp_turn_details.append(opp_notes)
    opp_turn_str = ", ".join(opp_turn_details) if opp_turn_details else opp_turn.get('notes', 'Details TBD')

    r.append(f"     {our}: {our_to} turnovers ({our_turn_str})")
    r.append(f"     {opp}: {opp_to} turnovers ({opp_turn_str})")
    r.append(f"     Turnover margin: {'+' if margin > 0 else ''}{margin} {'(advantage ' + our + ')' if margin < 0 else ('(advantage ' + opp + ')' if margin > 0 else '(even)')}")
    r.append("")

    # ════════════════════════════════════════════════════════════════
    # EXECUTIVE SUMMARY
    # ════════════════════════════════════════════════════════════════
    r.append("=" * W)
    r.append("  GAME OVERVIEW")
    r.append("=" * W)
    r.append("")
    r.append(f"  Total Plays Analyzed ............. {total}")
    r.append(f"  {our} Offensive Plays ............ {len(our_off)}")
    r.append(f"  {opp} Offensive Plays ............ {len(opp_off)}")
    r.append("")
    # Build scoring/drive summaries from actual data
    our_scores = scoring.get(our, [])
    opp_scores = scoring.get(opp, [])
    our_score_summary = ", ".join(s['type'] for s in our_scores) if our_scores else "No scoring details provided"
    opp_score_summary = ", ".join(s['type'] for s in opp_scores) if opp_scores else "No scoring details provided"
    r.append(f"  {our} Scoring: {our_score_summary}")
    r.append(f"  {opp} Scoring: {opp_score_summary}")
    if coach.get('game', {}).get('overtime'):
        r.append(f"  NOTE: This game went to OVERTIME.")
    r.append("")
    r.append(f"  Coach's Assessment: \"{notes['overall']}\"")
    r.append("")

    # ════════════════════════════════════════════════════════════════
    # PLAY-BY-PLAY
    # ════════════════════════════════════════════════════════════════
    r.append("=" * W)
    r.append("  COMPLETE PLAY-BY-PLAY")
    r.append("=" * W)
    r.append("")
    r.append(f"  {'#':>3} {'Time':>5} {'Offense':>10} {'Formation':<22} {'Coverage':<24} {'Result':<18}")
    r.append("  " + "-" * 77)

    for p in plays:
        flags = ""
        if p.get('blitz'): flags += "*"
        if p.get('motion'): flags += "M"
        if p.get('big_play'): flags += "!"
        r.append(
            f"  {p['play']:>3} {p['time']:>5} {p['offense']:>10} "
            f"{p['formation']:<22} {p['coverage']:<24} "
            f"{p['gain']:<18}{flags}"
        )

    r.append("")
    r.append("  * = Blitz   M = Pre-snap motion   ! = Big play")
    r.append("")

    # ════════════════════════════════════════════════════════════════
    # OFFENSIVE ANALYSIS — BOTH TEAMS
    # ════════════════════════════════════════════════════════════════
    for team, team_plays, label in [(our, our_off, "our"), (opp, opp_off, "their")]:
        r.append("=" * W)
        r.append(f"  OFFENSIVE FILM STUDY: {team}")
        r.append("=" * W)
        r.append("")

        if not team_plays:
            r.append("  No offensive plays recorded.")
            r.append("")
            continue

        tp = len(team_plays)

        # Formations
        from collections import Counter
        forms = Counter(p['formation'] for p in team_plays)
        r.append("  FORMATION USAGE")
        r.append(f"  {'Formation':<24} {'Count':>5} {'Rate':>6}  Visual")
        r.append("  " + "-" * 55)
        for tag, ct in forms.most_common():
            bar = "#" * max(1, int(ct / tp * 25))
            r.append(f"  {tag:<24} {ct:>5} {ct/tp*100:>5.0f}%  {bar}")
        r.append("")

        # Play type
        types = Counter(p.get('type', 'Unknown') for p in team_plays)
        r.append("  PLAY TYPE BREAKDOWN")
        for pt, ct in types.most_common():
            pct = ct / tp * 100
            r.append(f"    {pt:<12} {ct:>3} plays ({pct:.0f}%)")
        r.append("")

        # Direction
        dirs = Counter(p.get('direction', 'Unknown') for p in team_plays)
        r.append("  DIRECTIONAL TENDENCY")
        for d, ct in dirs.most_common():
            r.append(f"    {d:<12} {ct:>3} plays ({ct/tp*100:.0f}%)")
        r.append("")

        # Gain distribution
        gains = Counter(p['gain'] for p in team_plays)
        r.append("  RESULT DISTRIBUTION")
        for g, ct in gains.most_common():
            r.append(f"    {g:<28} {ct:>3} plays ({ct/tp*100:.0f}%)")
        r.append("")

        # Key insight
        top_form = forms.most_common(1)[0] if forms else ("N/A", 0)
        pass_ct = types.get('Pass', 0)
        run_ct = types.get('Run', 0)
        r.append(f"  KEY INSIGHT: {team} ran {top_form[0]} most often ({top_form[1]}/{tp} plays).")
        if run_ct > pass_ct * 2:
            r.append(f"  Run-heavy approach ({run_ct}/{tp} = {run_ct/tp*100:.0f}% run).")
        elif pass_ct > run_ct:
            r.append(f"  Pass-heavy approach ({pass_ct}/{tp} = {pass_ct/tp*100:.0f}% pass).")
        else:
            r.append(f"  Balanced attack (Run {run_ct}, Pass {pass_ct}).")
        r.append("")

    # ════════════════════════════════════════════════════════════════
    # DEFENSIVE ANALYSIS — BOTH TEAMS
    # ════════════════════════════════════════════════════════════════
    for team, team_plays in [(our, our_def), (opp, opp_def)]:
        r.append("=" * W)
        r.append(f"  DEFENSIVE FILM STUDY: {team}")
        r.append("=" * W)
        r.append("")

        if not team_plays:
            r.append("  No defensive plays recorded.")
            r.append("")
            continue

        tp = len(team_plays)
        from collections import Counter

        # Coverage
        shells = Counter(p['coverage'] for p in team_plays)
        blitz_ct = sum(1 for p in team_plays if p.get('blitz'))

        r.append(f"  BLITZ RATE: {blitz_ct}/{tp} ({blitz_ct/tp*100:.0f}%)")
        r.append("")

        r.append("  COVERAGE SHELL BREAKDOWN")
        r.append(f"  {'Shell':<36} {'Count':>5} {'Rate':>6}  Visual")
        r.append("  " + "-" * 60)
        for sh, ct in shells.most_common():
            bar = "#" * max(1, int(ct / tp * 25))
            r.append(f"  {sh:<36} {ct:>5} {ct/tp*100:>5.0f}%  {bar}")
        r.append("")

        # Man vs Zone
        ctypes = Counter(p.get('coverage_type', 'Unknown') for p in team_plays)
        r.append("  MAN vs ZONE")
        for ct, c in ctypes.most_common():
            r.append(f"    {ct:<15} {c:>3} plays ({c/tp*100:.0f}%)")
        r.append("")

        # Key insight
        top_shell = shells.most_common(1)[0] if shells else ("N/A", 0)
        r.append(f"  KEY INSIGHT: {team} defense primarily ran {top_shell[0]} ({top_shell[1]/tp*100:.0f}%).")
        if blitz_ct / tp > 0.2:
            r.append(f"  Aggressive defense — blitzed {blitz_ct/tp*100:.0f}% of plays.")
        else:
            r.append(f"  Conservative/coverage-based defense — blitz only {blitz_ct/tp*100:.0f}%.")

        # Team-specific insight
        if team == our:
            r.append(f"  {our} defense forced {opp_to} turnover (pick six). Dominant performance.")
        elif team == opp:
            r.append(f"  {opp} defense forced {our_to} turnovers (1 INT, 2 turnovers on downs).")

        r.append("")

    # ════════════════════════════════════════════════════════════════
    # GAME STORY
    # ════════════════════════════════════════════════════════════════
    r.append("=" * W)
    r.append("  THE GAME STORY")
    r.append("=" * W)
    r.append("")
    r.append(f"  {our} won this game 14-7 behind a stingy defense and an offense")
    r.append(f"  that moved the ball but left points on the field.")
    r.append("")
    r.append(f"  WHAT WENT RIGHT:")
    r.append(f"    - Defense was dominant. Held {opp} to just 1 TD and came up with")
    r.append(f"      a pick six that changed the game.")
    r.append(f"    - Offense moved the ball consistently and generated first downs.")
    r.append(f"    - Variety in formations: {our} showed {len(set(p['formation'] for p in our_off))}")
    r.append(f"      different looks on offense, making them hard to predict.")
    r.append("")
    r.append(f"  WHAT NEEDS WORK:")
    r.append(f"    - 2 turnovers on downs = 2 drives that should have scored but didn't.")
    r.append(f"    - 1 interception thrown = gave {opp} a short field.")
    r.append(f"    - 4th down conversion rate needs to improve.")
    r.append(f"    - Coach says: \"4 plays away from a blowout\" — the talent and")
    r.append(f"      scheme are there, execution on key plays is the gap.")
    r.append("")
    r.append(f"  THE MARGIN:")
    r.append(f"    {our} outgained {opp} in total production and controlled the game.")
    r.append(f"    The 14-7 score doesn't reflect how dominant {our} was. With better")
    r.append(f"    4th down execution and ball security, this is a 28-7 or 35-7 game.")
    r.append("")

    # ════════════════════════════════════════════════════════════════
    # GAME PLAN FOR NEXT MATCHUP
    # ════════════════════════════════════════════════════════════════
    r.append("=" * W)
    r.append(f"  GAME PLAN: WHAT TO DO NEXT TIME vs {opp}")
    r.append("=" * W)
    r.append("")

    # Generate specific coaching bullets from the data
    opp_forms = Counter(p['formation'] for p in opp_off)
    opp_shells = Counter(p['coverage'] for p in opp_def)
    our_forms = Counter(p['formation'] for p in our_off)

    bullets = []

    # Their offense
    if opp_forms:
        top_opp = opp_forms.most_common(1)[0]
        bullets.append(
            f"THEIR OFFENSE: {opp} lined up in {top_opp[0]} {top_opp[1]}x "
            f"({top_opp[1]/max(len(opp_off),1)*100:.0f}% of plays). "
            f"Key your pre-snap alignment to this look. Know your assignment."
        )

    opp_run = sum(1 for p in opp_off if p.get('type') == 'Run')
    opp_pass = sum(1 for p in opp_off if p.get('type') == 'Pass')
    if opp_run > opp_pass * 2:
        bullets.append(
            f"THEY'RE RUN-HEAVY: {opp} ran the ball {opp_run}/{len(opp_off)} plays ({opp_run/max(len(opp_off),1)*100:.0f}%). "
            f"Load the box. Force them to beat you through the air."
        )

    # Their defense
    if opp_shells:
        top_cov = opp_shells.most_common(1)[0]
        bullets.append(
            f"THEIR DEFENSE: {opp} played {top_cov[0]} {top_cov[1]/max(len(opp_def),1)*100:.0f}% of the time. "
            f"Attack the seams, the flats, and the intermediate crossers. "
            f"Cover 2 is vulnerable to the middle of the field."
        )

    opp_blitz = sum(1 for p in opp_def if p.get('blitz'))
    if len(opp_def) > 0 and opp_blitz / len(opp_def) < 0.1:
        bullets.append(
            f"THEY DON'T BLITZ: {opp} blitzed only {opp_blitz/max(len(opp_def),1)*100:.0f}% of plays. "
            f"QB has time. Take shots downfield. Use play-action. Let routes develop."
        )

    # Our improvements
    bullets.append(
        f"4TH DOWN PLAN: We went for it on 4th down and failed twice. "
        f"Have a specific 4th-down package ready. Know your go-to play in short yardage."
    )

    bullets.append(
        f"PROTECT THE BALL: We threw 1 INT. On key drives, take the safe throw. "
        f"A punt is better than a turnover."
    )

    our_motion = sum(1 for p in our_off if p.get('motion'))
    if our_motion / max(len(our_off), 1) < 0.15:
        bullets.append(
            f"ADD MOTION: We used pre-snap motion on only {our_motion}/{len(our_off)} plays "
            f"({our_motion/max(len(our_off),1)*100:.0f}%). Motion creates free reads, forces "
            f"the defense to communicate, and generates mismatches. Use it more."
        )

    bullets.append(
        f"FINISH DRIVES: We moved the ball well but scored only 1 offensive TD. "
        f"In the red zone, simplify. Run your best play with your best player."
    )

    for i, b in enumerate(bullets, 1):
        r.append(f"  {i}. {b}")
        r.append("")

    # ════════════════════════════════════════════════════════════════
    # FOOTER
    # ════════════════════════════════════════════════════════════════
    r.append("=" * W)
    r.append("")
    r.append("Report generated by FF Analytics".center(W))
    r.append("AI-Driven Flag Football Game Film Analysis".center(W))
    r.append(f"CV: {total} plays tracked | Coach: game events verified".center(W))
    r.append("")
    r.append("=" * W)

    report = "\n".join(r)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(report)

    return report


if __name__ == "__main__":
    report = generate_final_report(
        play_by_play_path="data/game1_gators_vs_tennessee/final_report/play_by_play.json",
        coach_input_path="ff_analytics/data/game1_coach_input.json",
        output_path="data/game1_gators_vs_tennessee/final_report/FINAL_SCOUTING_REPORT.txt",
    )
    print(report)
