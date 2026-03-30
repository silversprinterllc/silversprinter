# Flag Football Film Analysis System — Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        COACH / USER                                 │
│   Upload video → Calibrate field → Review reports → Game plan       │
└─────────┬───────────────────────────────────────────────┬───────────┘
          │                                               │
          ▼                                               ▼
┌─────────────────────┐                     ┌─────────────────────────┐
│  1. VIDEO INGESTION │                     │  7. WEB UI (FastAPI +   │
│  - Accept MP4       │                     │     Next.js/React)      │
│  - Extract metadata │                     │  - Upload interface     │
│  - Segment by game  │                     │  - Report viewer        │
│  - Store in /data   │                     │  - Charts & clips       │
└────────┬────────────┘                     └─────────────────────────┘
         │                                               ▲
         ▼                                               │
┌─────────────────────┐                     ┌────────────┴────────────┐
│  2. FIELD CALIBR.   │                     │  6. REPORT GENERATION   │
│  - Homography       │                     │  - LLM prompt template  │
│  - User clicks 4+   │                     │  - JSON → scouting rpt  │
│    field landmarks   │                     │  - Clip timestamps      │
│  - Save per-field    │                     │  - PDF / HTML export    │
└────────┬────────────┘                     └─────────────────────────┘
         │                                               ▲
         ▼                                               │
┌─────────────────────┐                     ┌────────────┴────────────┐
│  3. PLAYER DETECT   │                     │  5. ANALYTICS ENGINE    │
│    & TRACKING       │                     │  - Playing time         │
│  - YOLOv8 person    │                     │  - Snap counts          │
│  - ByteTrack IDs    │                     │  - Offensive formations │
│  - Team color clust.│                     │  - Defensive coverages  │
│  - Player ID system │                     │  - Tendencies by D&D    │
│    (appearance-based)│                    │  - Matchup ratings      │
└────────┬────────────┘                     └─────────────────────────┘
         │                                               ▲
         ▼                                               │
┌─────────────────────┐                     ┌────────────┴────────────┐
│  4. PLAY SEGMENT.   │──────────────────▶  │  4b. PHASE CLASSIF.    │
│  - Active vs dead   │                     │  - Offense vs Defense   │
│  - Snap detection   │                     │  - Per-possession team  │
│  - Play boundaries  │                     │  - Down & distance est. │
└─────────────────────┘                     └─────────────────────────┘
```

## Components Detail

### 1. Video Ingestion & Pre-Processing
- **Input**: Raw MP4 from `Desktop/WCFLFlagFootball/`
- **Libraries**: OpenCV, ffmpeg-python
- **Actions**: Extract FPS/resolution, split all-day video into individual games
  (manual or scene-detection based), generate thumbnail frames
- **Output**: `VideoAsset` records in DB, game-segmented clips on disk

### 2. Field Calibration
- **Libraries**: OpenCV (findHomography, warpPerspective)
- **Input**: Coach clicks 4-8 field landmarks on a reference frame
- **Output**: 3×3 homography matrix saved per field/camera setup
- **Reuse**: Same field → same calibration across all games on that field

### 3. Player Detection & Tracking
- **Detection**: YOLOv8-nano or YOLOv8-small (person class only)
- **Tracking**: ByteTrack (superior to DeepSORT for crowded sports scenes)
- **Team ID**: K-means (k=2) on jersey color histograms in HSV space
- **Player ID**: See `player_id/` module — appearance-based re-identification
  when jersey numbers are unreadable
- **Output**: Per-frame JSONL: `{frame, time, track_id, team, x_field, y_field, bbox}`

### 4. Play Segmentation & Phase Classification
- **Play Detection**: Motion energy analysis — active play vs dead ball
  (aggregate movement velocity drops below threshold = dead ball)
- **Offense/Defense**: Team closer to own end zone at pre-snap = defense;
  team with ball-side alignment = offense
- **Output**: `Play` records with start/end timestamps, off/def team IDs

### 5. Analytics Engine
- **Playing Time**: Track presence across play boundaries
- **Formations**: Cluster pre-snap positions relative to center/ball
- **Coverages**: Safety depth + corner alignment heuristics
- **Tendencies**: Aggregate by down/distance/field-zone/formation
- **Matchups**: Per-defender yards allowed, completion % allowed

### 6. Report Generation
- **LLM Integration**: Anthropic Claude API with structured JSON input
- **Template**: Sections for offense, defense, matchups, game plan bullets
- **Output**: Markdown / HTML scouting report with embedded clip links

### 7. Web UI
- **Backend**: FastAPI (Python) + PostgreSQL
- **Frontend**: Next.js or React with Tailwind
- **Features**: Video upload, calibration tool, report viewer, charts

## Player Identification Without Jersey Numbers

When jersey numbers are unreadable (low resolution, similar colors, motion
blur), the system uses a multi-signal appearance-based identification:

1. **Appearance Embedding**: Extract a 128-dim feature vector from each
   tracked player's bounding box using a lightweight ReID model
   (OSNet or a fine-tuned ResNet-18).
2. **Body Metrics**: Estimate relative height, build proportions from
   bounding box aspect ratios over time.
3. **Accessory/Gear Signals**: Detect distinctive gear (gloves color,
   sleeve length, shoe color, headband) via color histogram analysis
   of body sub-regions (hands, head, feet).
4. **Positional Role Fingerprint**: Where a player lines up consistently
   (always in slot, always at safety) becomes an identity signal.
5. **Calibration Clip**: Coach watches a 30-second clip and tags
   "that's Player X" for each visible person. System stores their
   appearance embedding as the reference template.
6. **Matching**: For each track in subsequent plays, compute cosine
   similarity against all reference templates. Assign identity to
   highest match above threshold (0.7). Below threshold → "Unknown #N".

## MVP vs Phase 2+

### MVP (4-6 weeks)
- Video ingestion + manual game segmentation
- YOLOv8 + ByteTrack player tracking
- Homography calibration (CLI tool)
- Team color separation
- Player ID via calibration clip (appearance matching)
- Play segmentation (motion-energy based)
- Playing time per player
- Basic offensive formation tagging (2×2, 3×1, trips, bunch, empty)
- Basic run/pass tendency percentages
- Text-based scouting report (LLM-generated)
- Simple CLI interface

### Phase 2
- Defensive coverage classification
- Blitz detection
- Matchup recommendation engine
- Web UI with video upload
- Automated game segmentation from all-day video
- Interactive calibration tool in browser
- Clip extraction with timestamp links

### Phase 3
- Ball tracking
- Route classification
- Play diagram generation
- Historical trend analysis across season
- Auto-generated call sheets
- Mobile-friendly coach view
