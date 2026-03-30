# Implementation Plan — Flag Football Film Analysis

## Milestone Table

| Milestone | Week | Deliverables | Libraries | Dependencies | Risk |
|-----------|------|-------------|-----------|--------------|------|
| **M1: CV Tracking MVP** | 1-2 | YOLOv8 detection, ByteTrack tracking, team color clustering, JSONL output, CLI | OpenCV, ultralytics, numpy | None | Low — proven stack |
| **M2: Field Calibration + Player ID** | 2-3 | Homography calibration, appearance-based player identification, calibration clip tagging | OpenCV | M1 | Medium — ReID accuracy |
| **M3: Play Segmentation** | 3 | Motion-energy play detection, play boundary timestamps, offense/defense phase labels | numpy | M1 | Low |
| **M4: Playing Time Stats** | 3-4 | Per-player snap counts, time on field, offense/defense breakdown, CSV/JSON export | pandas | M1, M3 |Low |
| **M5: Offensive Analysis** | 4 | Formation classification (2x2, 3x1, trips, bunch, empty), tendency breakdowns by down/distance/zone | pandas, numpy | M3 | Medium — formation accuracy |
| **M6: Defensive Analysis** | 4-5 | Coverage shell classification, blitz detection, matchup recommendations | numpy | M3 | High — coverage detection |
| **M7: LLM Scouting Report** | 5 | Prompt template, Claude API integration, template fallback, Markdown report output | anthropic SDK | M4-M6 | Low |
| **M8: Web UI** | 5-6 | Video upload, calibration tool, report viewer, charts | FastAPI, React/Next.js | M1-M7 | Low — standard web dev |

## Version 0 (Minimal Viable Product)

**What it does:**
1. Takes a game video + manual start/end times
2. Detects and tracks all players across frames
3. Separates players into two teams by jersey color
4. Identifies individual players via appearance matching (coach tags players once)
5. Segments plays automatically via motion energy
6. Computes per-player playing time (snaps, minutes, offense/defense)
7. Classifies basic offensive formations
8. Outputs a text-based scouting report with tendency percentages

**What the coach provides (manual inputs):**
- Video file and game start/end times
- Team names and jersey colors
- 4 field landmark clicks for calibration (one-time per field)
- Player identification: tag each player in one reference frame (~30 sec)
- Optionally: down & distance per play, play results (for richer analysis)

**CLI commands for Version 0:**
```bash
# Step 1: Calibrate field (one-time per field)
python -m ff_analytics calibrate --video game.mp4 --output field12_cal.json

# Step 2: Run full pipeline on Game 1
python -m ff_analytics full \
  --video "C:/Users/User/Desktop/WCFLFlagFootball/field-12-all-day-2026-03-28.mp4" \
  --output data/game1_gators_vs_tennessee/ \
  --start 0 --end 3180 \
  --home "Gators" --away "Tennessee" \
  --home-color blue --away-color white

# Step 3: Run on Game 2
python -m ff_analytics full \
  --video "C:/Users/User/Desktop/WCFLFlagFootball/field-12-all-day-2026-03-28.mp4" \
  --output data/game2_miami_vs_alabama/ \
  --start 3180 --end 7440 \
  --home "Miami" --away "Alabama" \
  --home-color green --away-color white

# Step 4: Generate LLM-enhanced report (optional)
python -m ff_analytics report --data data/game1_gators_vs_tennessee/ --api-key $ANTHROPIC_API_KEY
```

## Incremental Extensions

### After Version 0:
1. **Manual play tagging UI** — Simple web form where coach marks down, distance, result per play. Dramatically improves analysis quality.
2. **Ball tracking** — Stub exists; add ball-class detection to YOLO to improve offense/defense phase detection.
3. **Route classification** — Post-snap receiver paths categorized (go, slant, out, curl, cross).

### Phase 2:
4. **Defensive coverage classifier** — Use safety depth + corner leverage pre-snap, plus post-snap movement patterns.
5. **Blitz detection** — Track defenders crossing LOS rapidly post-snap.
6. **Matchup grading** — Per-defender yards allowed, completion rate allowed.

### Phase 3:
7. **Web UI** — Upload video, interactive calibration, report viewer with embedded clips.
8. **Season-level analytics** — Aggregate tendencies across games, trend analysis.
9. **Play diagram generation** — Auto-generate X's and O's from tracking data.

## Technical Risks and Fallbacks

| Risk | Impact | Fallback |
|------|--------|----------|
| **Jersey numbers unreadable** | Can't identify players by number | ✅ Solved: Appearance-based player ID system (color histograms, body metrics, gear detection). Coach tags players once in a calibration clip. |
| **Coverage classification unreliable** | Defensive analysis less precise | Use only pre-snap safety count (single-high vs two-high vs zero). Skip man/zone distinction. Still provides value. |
| **Play segmentation misses plays** | Incorrect snap counts | Allow coach to manually adjust play boundaries in a simple UI. Motion-energy threshold is tunable. |
| **Team color clustering fails** (similar jerseys) | Players assigned to wrong teams | Coach manually maps cluster 0/1 to team names. Re-run with known HSV color values. |
| **Ball tracking fails** | Can't auto-detect offense direction | Use team alignment heuristic (team closer to end zone = defense). Coach can manually set direction per half. |
| **Formation classification noisy** | Wrong formation tags | Reduce to simple categories only (2x2 vs 3x1 vs other). Coach can correct in review UI. |
| **Long video processing time** | Slow iteration | Process every 3rd or 5th frame (skip parameter). Use YOLOv8-nano. Limit to one game at a time. |

## Package Structure

```
ff_analytics/
├── __init__.py              # Package metadata
├── __main__.py              # python -m entry point
├── run.py                   # CLI commands
├── requirements.txt         # Dependencies
├── games_config.json        # Your WCFL game schedule
├── ARCHITECTURE.md          # System design doc
├── IMPLEMENTATION_PLAN.md   # This file
│
├── models/
│   ├── schemas.py           # Pydantic data models
│   └── sql.py               # PostgreSQL table schemas
│
├── calibration/
│   └── calibration.py       # Homography field calibration
│
├── tracking/
│   ├── detector.py          # YOLOv8 person detection
│   ├── tracker.py           # ByteTrack multi-object tracking
│   ├── team_id.py           # Jersey color team clustering
│   ├── play_segmentation.py # Motion-energy play boundaries
│   └── pipeline.py          # Orchestration pipeline
│
├── player_id/
│   └── identifier.py        # Appearance-based player identification
│                             # (when jersey numbers are unreadable)
│
├── analysis/
│   ├── offense.py           # Formation tagging, tendencies
│   ├── defense.py           # Coverage, blitz, matchup recommendations
│   └── playing_time.py      # Snap counts, time on field
│
├── reports/
│   └── scouting_report.py   # LLM prompt template + report generator
│
├── pipeline/                # (Future: orchestration DAG)
├── ui/                      # (Future: FastAPI + React web UI)
└── utils/                   # (Future: shared utilities)
```
