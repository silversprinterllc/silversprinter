"""
One-command game analysis CLI.

Usage:
    python -m ff_analytics.analyze_game \\
        --video "path/to/video.mp4" \\
        --start 120 --end 3180 \\
        --team-a "Gators" --team-b "Tennessee" \\
        --color-a "Blue" --color-b "White" \\
        --score-a 14 --score-b 7 \\
        --output "reports/game1"

Or for fully autonomous (no score input):
    python -m ff_analytics.analyze_game \\
        --video "path/to/video.mp4" \\
        --start 120 --end 3180 \\
        --team-a "Gators" --team-b "Tennessee" \\
        --output "reports/game1"
"""

import argparse
import json
import os
import sys
import time


def main():
    parser = argparse.ArgumentParser(
        description="FF Analytics — Autonomous Flag Football Game Film Analysis",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--video", required=True, help="Path to video file")
    parser.add_argument("--start", type=float, default=120, help="Game start time in seconds (default: 120)")
    parser.add_argument("--end", type=float, required=True, help="Game end time in seconds")
    parser.add_argument("--team-a", required=True, help="Team A name")
    parser.add_argument("--team-b", required=True, help="Team B name")
    parser.add_argument("--color-a", default="", help="Team A jersey color")
    parser.add_argument("--color-b", default="", help="Team B jersey color")
    parser.add_argument("--score-a", type=int, default=None, help="Team A final score (optional)")
    parser.add_argument("--score-b", type=int, default=None, help="Team B final score (optional)")
    parser.add_argument("--first-possession", default=None, help="Which team has ball first")
    parser.add_argument("--output", required=True, help="Output directory")
    parser.add_argument("--skip", type=int, default=5, help="Process every Nth frame (default: 5)")
    parser.add_argument("--date", default="", help="Game date")
    parser.add_argument("--field", default="", help="Field name")
    parser.add_argument("--league", default="WCFL", help="League name")
    parser.add_argument("--format", default="7v7", help="Game format (5v5, 7v7, 8v8, 11v11)")
    parser.add_argument("--filter-refs", action="store_true", help="Filter out referees from tracking")

    args = parser.parse_args()
    os.makedirs(args.output, exist_ok=True)

    t0 = time.time()
    print("=" * 60)
    print("  FF Analytics — Game Film Analysis")
    print(f"  {args.team_a} vs {args.team_b}")
    print("=" * 60)
    print()

    # Step 1: Run tracking pipeline
    tracking_path = os.path.join(args.output, "tracking.jsonl")
    if not os.path.exists(tracking_path):
        print("STEP 1/4: Running player tracking...")
        from ff_analytics.tracking.detector import PlayerDetector
        from ff_analytics.tracking.tracker import ByteTracker
        from ff_analytics.tracking.team_id import TeamIdentifier
        from ff_analytics.tracking.pipeline import TrackingPipeline

        pipeline = TrackingPipeline(
            detector=PlayerDetector(),
            tracker=ByteTracker(),
            team_identifier=TeamIdentifier(),
            process_every_n=args.skip,
        )
        pipeline.process_video(
            video_path=args.video,
            output_path=tracking_path,
            start_time=max(0, args.start - 60),  # start slightly early
            end_time=args.end,
        )
    else:
        print("STEP 1/4: Tracking data already exists, skipping...")

    # Step 2: Filter referees (optional)
    if args.filter_refs:
        print("STEP 2/4: Filtering referees...")
        from ff_analytics.tracking.referee_filter import RefereeFilter

        records = []
        with open(tracking_path) as f:
            for line in f:
                records.append(json.loads(line))

        ref_filter = RefereeFilter()
        ref_ids = ref_filter.scan_video_for_refs(args.video, records, sample_interval=50)
        filtered = ref_filter.filter_records(records)

        filtered_path = os.path.join(args.output, "tracking_filtered.jsonl")
        with open(filtered_path, "w") as f:
            for r in filtered:
                f.write(json.dumps(r) + "\n")

        print(f"  Filtered {len(ref_ids)} referee tracks, {len(filtered)} player records remain")
        tracking_path = filtered_path
    else:
        print("STEP 2/4: Referee filter skipped (use --filter-refs to enable)")

    # Step 3: Run autonomous game analysis
    print("STEP 3/4: Running game analysis...")
    from ff_analytics.analysis.game_analyzer import GameAnalyzer

    ga = GameAnalyzer()
    result = ga.analyze(
        video_path=args.video,
        tracking_path=tracking_path,
        output_dir=args.output,
        game_start_sec=args.start,
        game_end_sec=args.end,
        team_a=args.team_a,
        team_b=args.team_b,
        color_a=args.color_a,
        color_b=args.color_b,
        first_possession=args.first_possession or args.team_a,
    )

    # Step 4: Generate HTML report
    print("STEP 4/4: Generating premium report...")
    from ff_analytics.reports.html_report import generate_html_report

    drives_path = os.path.join(args.output, "drives.json")
    tend_path = os.path.join(args.output, "tendencies.json")

    # Get estimated score from drives
    with open(drives_path) as f:
        drives = json.loads(f.read())
    est_a = sum(d["points"] for d in drives if d["offense"] == args.team_a)
    est_b = sum(d["points"] for d in drives if d["offense"] == args.team_b)

    # Use provided score if available, else use estimated
    score_a = args.score_a if args.score_a is not None else est_a
    score_b = args.score_b if args.score_b is not None else est_b

    html_path = os.path.join(args.output, "REPORT.html")
    generate_html_report(
        drives_path=drives_path,
        tendencies_path=tend_path,
        output_path=html_path,
        team_a=args.team_a, team_b=args.team_b,
        color_a=args.color_a, color_b=args.color_b,
        score_a=score_a, score_b=score_b,
        date=args.date, field=args.field,
        league=args.league, game_format=args.format,
    )

    elapsed = time.time() - t0
    print()
    print("=" * 60)
    print(f"  COMPLETE in {elapsed:.0f}s ({elapsed/60:.1f} min)")
    print(f"  Report: {html_path}")
    print(f"  Drives: {result['drives']}")
    print(f"  Snaps:  {result['snaps']}")
    if args.score_a is not None:
        print(f"  Score:  {args.team_a} {score_a} - {args.team_b} {score_b}")
    else:
        print(f"  Est Score: {args.team_a} {est_a}+ - {args.team_b} {est_b}+ (XP unknown)")
    print("=" * 60)


if __name__ == "__main__":
    main()
