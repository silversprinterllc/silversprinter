"""Run autonomous game analysis on Game 1."""
import sys, io, json, math
import numpy as np
from collections import defaultdict, Counter
import cv2

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

# Load tracking data
records = []
with open("data/game1_gators_vs_tennessee/tracking.jsonl") as f:
    for line in f:
        records.append(json.loads(line))
field = [r for r in records if 250 < r["y_pixel"] < 880 and 120 <= r["time"] <= 3180]

# Load snap detections
with open("data/game1_gators_vs_tennessee/detected_snaps.json") as f:
    all_snaps = json.loads(f.read())

# Filter to real snaps (7+ players, high explosion, good stillness)
snaps = [s for s in all_snaps
         if s["players"] >= 7 and s["explosion_velocity"] > 18 and s["pre_stillness"] > 0.52]
merged = [snaps[0]] if snaps else []
for s in snaps[1:]:
    if s["time"] - merged[-1]["time"] > 12:
        merged.append(s)
snaps = merged

# Group into drives (plays within 50s = same drive)
drive_groups = [[snaps[0]]]
for s in snaps[1:]:
    if s["time"] - drive_groups[-1][-1]["time"] < 50:
        drive_groups[-1].append(s)
    else:
        drive_groups.append([s])

# Helper: get field position
def get_fp(t):
    recs = [r for r in field if t - 0.5 <= r["time"] <= t + 1.5]
    if not recs:
        return None, None, 0
    return float(np.mean([r["x_pixel"] for r in recs])), float(np.mean([r["y_pixel"] for r in recs])), len(set(r["track_id"] for r in recs))

# Calibrate X to yards
all_xs = [get_fp(s["time"])[0] for s in snaps if get_fp(s["time"])[0] is not None]
x_min, x_max = min(all_xs), max(all_xs)
px_per_yard = (x_max - x_min) / 80
def to_yard(px):
    return (px - x_min) / px_per_yard if px else 0

# Formation detection
def detect_formation(t):
    recs = [r for r in field if t - 1.0 <= r["time"] <= t + 0.5]
    if len(recs) < 8:
        return "Inconclusive"
    tracks = defaultdict(list)
    for r in recs:
        tracks[r["track_id"]].append(r)
    pos = []
    for tid, trecs in tracks.items():
        if len(trecs) < 2:
            continue
        pos.append({"x": np.mean([r["x_pixel"] for r in trecs]), "y": np.mean([r["y_pixel"] for r in trecs])})
    if len(pos) < 6:
        return "Inconclusive"

    ys = np.array([p["y"] for p in pos]).reshape(-1, 1).astype(np.float32)
    try:
        _, labels, _ = cv2.kmeans(ys, 2, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 1.0), 10, cv2.KMEANS_PP_CENTERS)
        g0 = [p for p, l in zip(pos, labels.flatten()) if l == 0]
        g1 = [p for p, l in zip(pos, labels.flatten()) if l == 1]
    except:
        return "Inconclusive"

    r0 = max(p["y"] for p in g0) - min(p["y"] for p in g0) if len(g0) >= 2 else 0
    r1 = max(p["y"] for p in g1) - min(p["y"] for p in g1) if len(g1) >= 2 else 0
    off = g0 if r0 > r1 else g1

    cx = np.median([p["x"] for p in off])
    L = [p for p in off if p["x"] < cx - 40]
    R = [p for p in off if p["x"] > cx + 40]
    nl, nr = len(L), len(R)

    def tight(g):
        return len(g) >= 3 and max(p["x"] for p in g) - min(p["x"] for p in g) < 80

    if nl >= 3:
        return "Bunch Left" if tight(L) else "Trips Left"
    if nr >= 3:
        return "Bunch Right" if tight(R) else "Trips Right"
    if nl == 2 and nr == 2:
        return "2x2 Spread"
    if nl == 2:
        return "Twins Left"
    if nr == 2:
        return "Twins Right"
    if nl + nr >= 4:
        return "Spread"
    if nl + nr <= 1:
        return "Tight / Compressed"
    return "Pro Set"

# Coverage detection
def detect_coverage(t):
    recs = [r for r in field if t - 1.0 <= r["time"] <= t + 0.5]
    if len(recs) < 8:
        return "Unknown"
    tracks = defaultdict(list)
    for r in recs:
        tracks[r["track_id"]].append(r)
    pos = []
    for tid, trecs in tracks.items():
        if len(trecs) < 2:
            continue
        pos.append({"x": np.mean([r["x_pixel"] for r in trecs]), "y": np.mean([r["y_pixel"] for r in trecs])})
    if len(pos) < 6:
        return "Unknown"

    ys = np.array([p["y"] for p in pos]).reshape(-1, 1).astype(np.float32)
    try:
        _, labels, _ = cv2.kmeans(ys, 2, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 1.0), 10, cv2.KMEANS_PP_CENTERS)
        g0 = [p for p, l in zip(pos, labels.flatten()) if l == 0]
        g1 = [p for p, l in zip(pos, labels.flatten()) if l == 1]
    except:
        return "Unknown"

    r0 = max(p["y"] for p in g0) - min(p["y"] for p in g0) if len(g0) >= 2 else 0
    r1 = max(p["y"] for p in g1) - min(p["y"] for p in g1) if len(g1) >= 2 else 0
    defense = g1 if r0 > r1 else g0
    offense = g0 if r0 > r1 else g1

    los = np.median([p["y"] for p in offense])
    deep = [d for d in defense if abs(d["y"] - los) > 80]

    if len(deep) >= 2:
        dxs = [d["x"] for d in deep]
        return "Cover 2 (Two-High)" if max(dxs) - min(dxs) > 150 else "Quarters"
    if len(deep) == 1:
        return "Cover 1 / Cover 3"
    return "Cover 0"


# Build the report
print("=" * 80)
print("  GAME 1: GATORS vs TENNESSEE")
print("  AUTONOMOUS DRIVE-BY-DRIVE BREAKDOWN")
print("  50 snaps detected via stillness-to-explosion pattern analysis")
print("=" * 80)
print()

team_a, team_b = "Gators", "Tennessee"
current_off = team_a

all_drive_data = []

for di, dsnaps in enumerate(drive_groups, 1):
    off = current_off
    dfn = team_b if off == team_a else team_a

    # Field positions
    start_cx = get_fp(dsnaps[0]["time"])[0]
    end_cx = get_fp(dsnaps[-1]["time"])[0]
    start_yd = to_yard(start_cx) if start_cx else 0
    end_yd = to_yard(end_cx) if end_cx else 0
    yards_gained = end_yd - start_yd

    # Drive result detection
    if end_yd > 72 or end_yd < 8:
        result = "TOUCHDOWN"
    elif len(dsnaps) >= 4 and abs(yards_gained) < 15:
        result = "Turnover on Downs"
    elif di < len(drive_groups):
        next_cx = get_fp(drive_groups[di][0]["time"])[0]
        next_yd = to_yard(next_cx) if next_cx else end_yd
        gap = drive_groups[di][0]["time"] - dsnaps[-1]["time"]
        shift = abs(next_yd - end_yd)
        if shift > 25:
            result = "Punt"
        elif gap > 120:
            result = "End of Half"
        else:
            result = "Change of Possession"
    else:
        result = "End of Game"

    # Print drive header
    dur = dsnaps[-1]["time"] - dsnaps[0]["time"]
    print(f"  DRIVE {di}: {off} Ball  |  {len(dsnaps)} plays  |  {dsnaps[0]['timestamp']} - {dsnaps[-1]['timestamp']}  |  {dur:.0f}s")
    print(f"  ~{start_yd:.0f} yd line  -->  ~{end_yd:.0f} yd line  |  {yards_gained:+.0f} yards  |  {result}")
    print()

    # Per-play breakdown
    plays_in_drive = []
    for j, snap in enumerate(dsnaps):
        cx = get_fp(snap["time"])[0]
        yd = to_yard(cx) if cx else 0
        form = detect_formation(snap["time"])
        cov = detect_coverage(snap["time"])

        if j > 0:
            prev_cx = get_fp(dsnaps[j - 1]["time"])[0]
            prev_yd = to_yard(prev_cx) if prev_cx else yd
            gain = yd - prev_yd
        else:
            gain = 0

        down = j + 1
        big = " *** BIG PLAY ***" if abs(gain) > 15 else ""
        ordinal = {1: "1st", 2: "2nd", 3: "3rd", 4: "4th"}.get(down, f"{down}th")

        print(f"    {snap['timestamp']}  {ordinal} down  ~{yd:.0f} yd  |  {form:<20}  vs {cov:<16}  |  {gain:+.0f} yds{big}")

        plays_in_drive.append({
            "time": snap["timestamp"], "down": down, "yard": round(yd, 1),
            "formation": form, "coverage": cov, "gain": round(gain, 1),
        })

    print()
    print(f"  >> {result}")
    if result == "TOUCHDOWN":
        print(f"     {off} scores! Drive: {len(dsnaps)} plays, {yards_gained:.0f} yards.")
    elif result == "Turnover on Downs":
        print(f"     {off} fails to convert. {dfn} takes over.")
    elif result == "Punt":
        print(f"     {off} punts. Ball moves 30 yards.")
    print()
    print(f"  {'=' * 72}")
    print()

    all_drive_data.append({
        "drive": di, "offense": off, "defense": dfn,
        "plays": len(dsnaps), "start_yard": round(start_yd, 1),
        "end_yard": round(end_yd, 1), "yards": round(yards_gained, 1),
        "result": result, "play_details": plays_in_drive,
    })

    current_off = team_b if current_off == team_a else team_a

# Game Summary
print()
print("=" * 80)
print("  GAME SUMMARY")
print("=" * 80)

g_drives = [d for d in all_drive_data if d["offense"] == "Gators"]
t_drives = [d for d in all_drive_data if d["offense"] == "Tennessee"]

for team, tdrives in [("Gators", g_drives), ("Tennessee", t_drives)]:
    tds = sum(1 for d in tdrives if d["result"] == "TOUCHDOWN")
    punts = sum(1 for d in tdrives if d["result"] == "Punt")
    tods = sum(1 for d in tdrives if "Turnover" in d["result"])
    total_yds = sum(d["yards"] for d in tdrives)
    total_plays = sum(d["plays"] for d in tdrives)
    print(f"  {team}: {len(tdrives)} drives | {tds} TDs | {punts} punts | {tods} TOD | {total_plays} plays | {total_yds:.0f} total yards")

# Save
with open("data/game1_gators_vs_tennessee/final_report/AUTONOMOUS_DRIVES.json", "w") as f:
    json.dump(all_drive_data, f, indent=2)
print()
print("Saved to AUTONOMOUS_DRIVES.json")
