"""
Main CLI entry point for the flag football analysis system.

Usage:
    # 1. Calibrate a field (interactive — click 4 landmarks)
    python -m ff_analytics.run calibrate --video path/to/video.mp4 --output calibration.json

    # 2. Run tracking on a game
    python -m ff_analytics.run track --video path/to/video.mp4 \\
        --start 0 --end 3180 \\
        --calibration calibration.json \\
        --output data/game1_tracking.jsonl

    # 3. Tag players for identification (from a calibration clip)
    python -m ff_analytics.run tag-players --video path/to/video.mp4 \\
        --tags players.json --output player_refs.json

    # 4. Run full pipeline (track + analyze + report)
    python -m ff_analytics.run full --video path/to/video.mp4 \\
        --start 0 --end 3180 \\
        --home "Gators" --away "Tennessee" \\
        --home-color blue --away-color white \\
        --output data/game1/

    # 5. Generate scouting report from existing analytics
    python -m ff_analytics.run report --data data/game1/ --output report.md
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def cmd_calibrate(args: argparse.Namespace) -> None:
    """Run interactive field calibration."""
    from .calibration.calibration import FieldCalibrator

    cal = FieldCalibrator()
    cal.calibrate_interactive(args.video, frame_idx=args.frame or 0)
    cal.save(args.output)
    print(f"Calibration saved to {args.output}")


def cmd_track(args: argparse.Namespace) -> None:
    """Run player tracking on a video."""
    from .calibration.calibration import FieldCalibrator
    from .player_id.identifier import PlayerIdentificationSystem
    from .tracking.detector import PlayerDetector
    from .tracking.pipeline import TrackingPipeline
    from .tracking.team_id import TeamIdentifier
    from .tracking.tracker import ByteTracker

    # Load calibration if available
    calibrator = None
    if args.calibration and Path(args.calibration).exists():
        calibrator = FieldCalibrator.load(args.calibration)
        print(f"Loaded calibration from {args.calibration}")

    # Load player references if available
    player_id = None
    if args.player_refs and Path(args.player_refs).exists():
        player_id = PlayerIdentificationSystem.load_references(args.player_refs)
        print(f"Loaded {len(player_id.reference_descriptors)} player references")

    # Set up team colors
    team_colors = {}
    if args.home_color and args.home:
        team_colors[args.home] = _color_name_to_hsv(args.home_color)
    if args.away_color and args.away:
        team_colors[args.away] = _color_name_to_hsv(args.away_color)

    team_id = TeamIdentifier(known_team_colors=team_colors if team_colors else None)

    pipeline = TrackingPipeline(
        detector=PlayerDetector(model_size=args.model or "yolov8n"),
        tracker=ByteTracker(),
        team_identifier=team_id,
        calibrator=calibrator,
        player_id_system=player_id,
        process_every_n=args.skip or 2,
    )

    summary = pipeline.process_video(
        video_path=args.video,
        output_path=args.output,
        start_time=args.start or 0.0,
        end_time=args.end,
    )

    print(json.dumps(summary, indent=2))


def cmd_full(args: argparse.Namespace) -> None:
    """Run full pipeline: track → analyze → report."""
    from .analysis.defense import DefensiveAnalyzer
    from .analysis.offense import OffensiveAnalyzer
    from .analysis.playing_time import PlayingTimeAnalyzer
    from .reports.scouting_report import ScoutingReportGenerator

    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Step 1: Track
    print("=== STEP 1: TRACKING ===")
    tracking_args = argparse.Namespace(
        video=args.video,
        output=str(output_dir / "tracking.jsonl"),
        start=args.start,
        end=args.end,
        calibration=args.calibration,
        player_refs=args.player_refs,
        home=args.home,
        away=args.away,
        home_color=args.home_color,
        away_color=args.away_color,
        model=args.model,
        skip=args.skip,
    )
    cmd_track(tracking_args)

    # Step 2: Load tracking data and analyze
    print("\n=== STEP 2: ANALYSIS ===")
    tracking_path = output_dir / "tracking.jsonl"
    plays_path = output_dir / "tracking.plays.json"

    tracking_data = []
    if tracking_path.exists():
        with open(tracking_path) as f:
            tracking_data = [json.loads(line) for line in f]

    plays_data = []
    if plays_path.exists():
        plays_data = json.loads(plays_path.read_text())

    # Convert plays for analysis
    analysis_plays = []
    for p in plays_data:
        analysis_plays.append({
            "play_id": p["play_number"],
            "start_time": p["start_time"],
            "end_time": p["end_time"],
            "offense_team_id": 0,  # would need team-per-play resolution
            "defense_team_id": 1,
            "down": 1,  # placeholder — would need manual or OCR input
            "distance": 10,
            "yard_line": 30,
            "is_pass": True,
            "is_rush": False,
            "has_motion": False,
            "formation_tag": "2x2",
            "yards_gained": 5,
            "result": "complete",
        })

    # Offensive analysis
    off_analyzer = OffensiveAnalyzer(team_id=0, team_name=args.home or "Home")
    off_tendencies = off_analyzer.compute_tendencies(analysis_plays)
    off_report = off_analyzer.generate_text_report(off_tendencies)

    # Defensive analysis
    def_analyzer = DefensiveAnalyzer(team_id=1, team_name=args.away or "Away")
    def_plays = [{**p, "coverage_tag": "single_high", "blitz_detected": False,
                  "yards_allowed": p.get("yards_gained", 0)} for p in analysis_plays]
    def_tendencies = def_analyzer.compute_tendencies(def_plays)
    def_report = def_analyzer.generate_text_report(def_tendencies, [])

    # Playing time
    pt_analyzer = PlayingTimeAnalyzer()
    pt_tracking = [
        {"play_id": p["play_number"], "track_id": t["track_id"],
         "team_id": t.get("team_label", 0), "phase": "offense",
         "frame_idx": t["frame_idx"], "time_offset": 0.0}
        for t in tracking_data
        for p in plays_data
        if p["start_time"] <= t["time"] <= p["end_time"]
    ][:10000]  # limit for performance

    pt_plays = [
        {"play_id": p["play_number"], "start_time": p["start_time"],
         "end_time": p["end_time"], "offense_team_id": 0, "defense_team_id": 1}
        for p in plays_data
    ]
    pt_result = pt_analyzer.compute_from_dicts(pt_plays, pt_tracking)
    pt_summary = pt_analyzer.generate_text_summary(pt_result)

    # Step 3: Write outputs
    print("\n=== STEP 3: REPORTS ===")

    (output_dir / "offense_tendencies.json").write_text(json.dumps(off_tendencies, indent=2))
    (output_dir / "defense_tendencies.json").write_text(json.dumps(def_tendencies, indent=2))
    (output_dir / "playing_time.json").write_text(json.dumps(pt_result, indent=2))

    # Generate scouting report
    report_gen = ScoutingReportGenerator()
    full_report = report_gen._generate_template(
        off_tendencies, def_tendencies, pt_result, []
    )

    report_path = output_dir / "scouting_report.md"
    report_path.write_text(full_report)

    # Combined text report
    combined = f"{off_report}\n\n{def_report}\n\n{pt_summary}\n\n{full_report}"
    (output_dir / "full_report.txt").write_text(combined)

    print(f"\nAll outputs written to {output_dir}/")
    print(f"  tracking.jsonl — raw tracking data")
    print(f"  tracking.plays.json — detected plays")
    print(f"  offense_tendencies.json — offensive analysis")
    print(f"  defense_tendencies.json — defensive analysis")
    print(f"  playing_time.json — per-player playing time")
    print(f"  scouting_report.md — formatted scouting report")
    print(f"  full_report.txt — combined text report")


def cmd_report(args: argparse.Namespace) -> None:
    """Generate scouting report from existing data."""
    from .reports.scouting_report import ScoutingReportGenerator

    data_dir = Path(args.data)
    off = json.loads((data_dir / "offense_tendencies.json").read_text())
    dfn = json.loads((data_dir / "defense_tendencies.json").read_text())
    pt = json.loads((data_dir / "playing_time.json").read_text()) if (data_dir / "playing_time.json").exists() else None

    gen = ScoutingReportGenerator(api_key=args.api_key)
    report = gen.generate_report(off, dfn, pt, use_llm=bool(args.api_key))

    output = args.output or str(data_dir / "scouting_report.md")
    Path(output).write_text(report)
    print(f"Report written to {output}")


def _color_name_to_hsv(color: str) -> tuple[float, float, float]:
    """Convert a color name to approximate HSV values."""
    colors = {
        "blue": (110.0, 200.0, 180.0),
        "white": (0.0, 0.0, 240.0),
        "green": (60.0, 200.0, 150.0),
        "red": (0.0, 200.0, 200.0),
        "black": (0.0, 0.0, 30.0),
        "yellow": (25.0, 200.0, 220.0),
        "orange": (15.0, 200.0, 220.0),
        "purple": (140.0, 180.0, 160.0),
        "maroon": (0.0, 180.0, 100.0),
        "gray": (0.0, 0.0, 140.0),
        "grey": (0.0, 0.0, 140.0),
        "crimson": (0.0, 220.0, 160.0),
        "navy": (110.0, 220.0, 100.0),
    }
    return colors.get(color.lower(), (0.0, 0.0, 128.0))


def main() -> None:
    """CLI entry point."""
    parser = argparse.ArgumentParser(
        description="Flag Football Film Analysis System",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # calibrate
    cal = subparsers.add_parser("calibrate", help="Calibrate field homography")
    cal.add_argument("--video", required=True, help="Video file path")
    cal.add_argument("--output", default="calibration.json", help="Output calibration file")
    cal.add_argument("--frame", type=int, default=0, help="Reference frame index")

    # track
    trk = subparsers.add_parser("track", help="Run player tracking")
    trk.add_argument("--video", required=True, help="Video file path")
    trk.add_argument("--output", required=True, help="Output tracking JSONL file")
    trk.add_argument("--start", type=float, default=0, help="Start time (seconds)")
    trk.add_argument("--end", type=float, default=None, help="End time (seconds)")
    trk.add_argument("--calibration", help="Calibration JSON file")
    trk.add_argument("--player-refs", help="Player reference descriptors JSON")
    trk.add_argument("--home", help="Home team name")
    trk.add_argument("--away", help="Away team name")
    trk.add_argument("--home-color", help="Home team jersey color")
    trk.add_argument("--away-color", help="Away team jersey color")
    trk.add_argument("--model", default="yolov8n", help="YOLO model size")
    trk.add_argument("--skip", type=int, default=2, help="Process every Nth frame")

    # full pipeline
    full = subparsers.add_parser("full", help="Full pipeline: track + analyze + report")
    full.add_argument("--video", required=True, help="Video file path")
    full.add_argument("--output", required=True, help="Output directory")
    full.add_argument("--start", type=float, default=0, help="Start time (seconds)")
    full.add_argument("--end", type=float, default=None, help="End time (seconds)")
    full.add_argument("--calibration", help="Calibration JSON file")
    full.add_argument("--player-refs", help="Player reference descriptors JSON")
    full.add_argument("--home", help="Home team name")
    full.add_argument("--away", help="Away team name")
    full.add_argument("--home-color", help="Home team jersey color")
    full.add_argument("--away-color", help="Away team jersey color")
    full.add_argument("--model", default="yolov8n", help="YOLO model size")
    full.add_argument("--skip", type=int, default=2, help="Process every Nth frame")

    # report
    rpt = subparsers.add_parser("report", help="Generate scouting report from data")
    rpt.add_argument("--data", required=True, help="Directory with analytics JSON files")
    rpt.add_argument("--output", help="Output report file path")
    rpt.add_argument("--api-key", help="Anthropic API key for LLM-powered report")

    args = parser.parse_args()

    if args.command == "calibrate":
        cmd_calibrate(args)
    elif args.command == "track":
        cmd_track(args)
    elif args.command == "full":
        cmd_full(args)
    elif args.command == "report":
        cmd_report(args)
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
