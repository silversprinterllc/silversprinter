"""Generate WCFL Girls Junior league summary and Alabama game plan."""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

print("=" * 72)
print("  WCFL GIRLS JUNIOR -- LEAGUE SUMMARY")
print("  Week 5 Preview: Florida vs Alabama (Sat 4/25, WCFL-12)")
print("=" * 72)

standings = [
    ("Florida", 4, 0, 73, 7, "Debarry"),
    ("Tennessee", 3, 1, 61, 32, "Gould"),
    ("Notre Dame", 2, 2, 37, 40, "Keilty"),
    ("Florida St.", 2, 2, 18, 19, "Romano"),
    ("Alabama", 1, 3, 14, 32, "Danley"),
    ("Miami", 0, 4, 13, 86, "Krueger"),
]

print("\n" + "-" * 72)
print("  STANDINGS")
print("-" * 72)
print(f"  {'#':>2} {'Team':<14} {'W':>3}-{'L':<3} {'PF':>4} {'PA':>4} {'Diff':>5}  {'Coach'}")
for i, (t, w, l, pf, pa, coach) in enumerate(standings, 1):
    diff = pf - pa
    marker = " <<<" if t == "Florida" else ""
    print(f"  {i:>2} {t:<14} {w:>3}-{l:<3} {pf:>4} {pa:>4} {diff:>+5}  {coach}{marker}")

print("\n" + "-" * 72)
print("  COMPLETE RESULTS (through Week 3)")
print("-" * 72)
results = [
    (1, "Sat 3/28", "Tennessee 7", "Florida 14", "WCFL-12", "FILM"),
    (1, "Sat 3/28", "Miami 13", "Alabama 14", "WCFL-12", "FILM"),
    (1, "Sat 3/28", "FSU 6", "Notre Dame 12", "WCFL-12", "FILM"),
    (2, "Mon 3/30", "Tennessee 13", "Notre Dame 12", "WCFL-10", ""),
    (2, "Wed 4/1", "Miami 0", "Florida 33", "WCFL-9", ""),
    (2, "Sat 4/4", "Alabama 0", "FSU 6", "WCFL-8", ""),
    (2, "Sat 4/4", "Florida 19", "Miami 0", "WCFL-8", ""),
    (2, "Sat 4/4", "Notre Dame 6", "Tennessee 21", "WCFL-8", ""),
    (3, "Mon 4/6", "FSU 6", "Alabama 0", "WCFL-12", "FILM"),
    (3, "Sat 4/11", "Miami 0", "Tennessee 20", "WCFL-12", "FILM"),
    (3, "Sat 4/11", "Alabama 0", "Notre Dame 7", "WCFL-12", "FILM"),
    (3, "Sat 4/11", "FSU 0", "Florida 7", "WCFL-12", "FILM"),
]
for wk, date, home, away, field, film in results:
    print(f"  Wk{wk} {date:<10} {home:<16} vs {away:<16} {field:<9} {film}")

print("\n" + "=" * 72)
print("  TEAM-BY-TEAM SCOUTING PROFILES")
print("=" * 72)

profiles = [
    ("FLORIDA", "4-0 (+66)", "Coach Debarry", "*** YOUR TEAM ***",
     "Dominant both sides. Trips Left (39%), Tight/Compressed (20%). Cover 2 D (65%).",
     "High variety. Moves the ball (2.8 yds/play). 3 TDs on film.",
     "Suffocating. 7 points allowed ALL SEASON. Cover 2 base + Quarters change-up.",
     "Defense. Nobody scores on this team.",
     "Red zone finishing (25% TD rate). Predictable Cover 2 shell.",
     ["Beat Tennessee 14-7 (Wk1)", "Beat FSU 7-0 (Wk3)", "Beat Miami 33-0 and 19-0"]),

    ("TENNESSEE", "3-1 (+29)", "Coach Gould", "Biggest threat",
     "Best offense in league. 2x2 Spread (39%), Pro Set (24%). Cover 2 D (73%).",
     "Highest scoring: 61 PF. 5.0 yds/play. Multiple formation looks.",
     "Cover 2 73% of the time -- EXPLOITABLE. Predictable shell.",
     "Offense. They score on everybody except Florida.",
     "Defensive predictability. Cover 2 every down.",
     ["Lost to Florida 7-14 (Wk1)", "Beat Notre Dame 13-12 and 21-6", "Beat Miami 20-0"]),

    ("NOTRE DAME", "2-2 (-3)", "Coach Keilty", "Wk5 opponent (WCFL-12)",
     "Trips Left team (46%). Physical. Cover 2 D (62%).",
     "Heavy Trips Left (46%) -- predictable but effective. 3 TDs on film.",
     "More varied: Cover 2 (62%), Cover 1/3 (19%), Quarters (19%).",
     "Offensive scheme. Trips Left creates natural picks and rubs.",
     "Negative yardage (-1.9 yds/play). Big plays offset by many losses.",
     ["Beat FSU 12-6 (Wk1)", "Lost to Tennessee 12-13 and 6-21", "Beat Alabama 7-0"]),

    ("FLORIDA ST.", "2-2 (-1)", "Coach Romano", "Scrappy team",
     "Balanced Trips Left (29%) and 2x2 Spread (27%). Cover 2 D (71%).",
     "Low-scoring (18 PF) but efficient. 4 TDs on 3 games of film.",
     "Cover 2 71% -- EXPLOITABLE. 4 TDs allowed in 3 games.",
     "Defensive structure. Only 19 PA despite losses.",
     "Cant score. 18 points in 4 games.",
     ["Lost to Notre Dame 6-12 (Wk1)", "Beat Alabama 6-0 (Wk3)", "Lost to Florida 0-7"]),

    ("ALABAMA", "1-3 (-18)", "Coach Danley", "*** NEXT OPPONENT ***",
     "Trips Left heavy (38%). MOST VARIED defense in league.",
     "Struggling. 14 PF in 4 games. 0.5 yds/play. Cant sustain drives.",
     "Their strength. Cover 2 (54%), Quarters (24%), Cover 1/3 (17%), Cover 0 (6%).",
     "Defensive variety. Harder to game plan against than most.",
     "Offense is broken. 0.5 yds/play. Only scored vs Miami.",
     ["Beat Miami 14-13 OT (Wk1)", "Lost to FSU 0-6", "Lost to Notre Dame 0-7"]),

    ("MIAMI", "0-4 (-73)", "Coach Krueger", "Rebuilding",
     "2x2 Spread (27%) and Trips Left (27%). Cover 2 D (59%).",
     "Worst in league. 13 PF. Gets shut out regularly.",
     "Gets overwhelmed. 86 PA = 21.5 ppg allowed.",
     "Formation variety on offense. They try different looks.",
     "Everything. 0-4 with -73 point differential.",
     ["Lost to Alabama 13-14 OT (Wk1)", "Lost to Florida 0-33 and 0-19", "Lost to Tennessee 0-20"]),
]

for name, rec, coach, tag, identity, off, dfn, strength, weakness, games in profiles:
    print(f"\n  {'-' * 68}")
    print(f"  {name} ({rec}) -- {coach}  [{tag}]")
    print(f"  {'-' * 68}")
    print(f"  Identity: {identity}")
    print(f"  Offense:  {off}")
    print(f"  Defense:  {dfn}")
    print(f"  Strength: {strength}")
    print(f"  Weakness: {weakness}")
    print(f"  Key Games:")
    for kg in games:
        print(f"    - {kg}")

print("\n\n" + "=" * 72)
print("  GAME PLAN: FLORIDA vs ALABAMA (Week 5)")
print("  Sat 4/25 | 10:00 AM | WCFL-12")
print("=" * 72)

print("""
  ALABAMA SCOUTING SUMMARY (3 games on film):
  Record: 1-3 | PF: 14 | PA: 32 | Only win: Miami 14-13 OT

  THEIR OFFENSE (what to expect):
    - Trips Left 38% of plays -- they lean on it hard
    - 2x2 Spread 24%, Pro Set 21%
    - 0.5 yds/play -- their offense is broken
    - They CANNOT sustain drives. Expect 3-and-outs.
    - Only scored 14 points all season (both vs Miami)

  THEIR DEFENSE (what we face):
    - Most varied coverage in the league -- NOT predictable
    - Cover 2 (54%), Quarters (24%), Cover 1/3 (17%), Cover 0 (6%)
    - They mix it up more than any other team
    - Allowed only 4 TDs in 3 games -- they play hard on D
    - -0.5 yds/play allowed -- opponents dont move easily

  OFFENSIVE GAME PLAN (attacking their D):
    >> They are the ONLY team that doesnt sit in Cover 2 all game
    >> Motion pre-snap to diagnose man vs zone
    >> Use play-action -- their defense is aggressive
    >> Attack the seams in Cover 2 looks
    >> When they show Quarters, go to the flats and boundaries
    >> When they show Cover 1/3, attack the single-high middle
    >> KEY: Read the coverage post-snap. Dont lock into one read.

  DEFENSIVE GAME PLAN (stopping their O):
    >> Their offense cant move the ball. Play sound, let them beat themselves.
    >> Rotate to Trips Left side -- 38% of their plays come from this look
    >> Wall off crossers from the trips formation
    >> They will try to get creative because they cant run base offense
    >> Dont bite on trick plays. Stay disciplined.
    >> Force them into long 3rd downs -- they cant convert

  KEYS TO VICTORY:
    1. Dont turn the ball over. Alabama cant score, so turnovers
       are the only way they win (thats how they beat Miami in OT).
    2. Finish drives. Score TDs not field position. Put them away early.
    3. Vary YOUR coverage. Dont let them get comfortable reading Cover 2.
    4. Win the field position battle. Their offense starts behind every drive.

  PREDICTION: Florida 21, Alabama 0
    Alabama simply cannot score against elite defenses. Florida has
    allowed 7 points ALL SEASON. This should be a comfortable win
    IF Florida avoids turnovers and finishes in the red zone.
""")

print("=" * 72)
print("  FF Analytics | Confidential | Coach Debarry | Florida Gators")
print("=" * 72)
