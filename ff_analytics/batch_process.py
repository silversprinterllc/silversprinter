"""
Batch processor — process all video files in a folder automatically.

Scans each video for games, processes each game, generates reports.
One command to process an entire Saturday of WCFL football.

Usage:
    python -m ff_analytics.batch_process --folder "C:/Users/User/Desktop/WCFLFlagFootball"
"""

import argparse
import json
import os
import sys
import time

import cv2
import numpy as np


def find_games_in_video(video_path: str, min_game_duration_min: int = 20) -> list[dict]:
    """Auto-detect games in a video using YOLO person detection.

    Samples every 60 seconds, counts on-field people,
    finds sustained periods of 6+ people = games.
    """
    # Lazy import to avoid loading YOLO until needed
    from ff_analytics.tracking.detector import PlayerDetector

    det = PlayerDetector(model_size="yolov8n")
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_sec = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) / fps)

    counts = []
    for t_sec in range(0, total_sec, 60):
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(t_sec * fps))
        ret, frame = cap.read()
        if not ret:
            break
        dets = det.detect(frame)
        on_field = len([d for d in dets if 200 < d.center[1] < 850])
        counts.append({"sec": t_sec, "min": t_sec // 60, "count": on_field})

    cap.release()

    # Smooth and find game periods
    raw = np.array([c["count"] for c in counts])
    smoothed = np.convolve(raw, np.ones(5) / 5, mode="same")
    is_game = smoothed >= 5

    games = []
    in_game = False
    start = 0

    for i in range(len(is_game)):
        if is_game[i] and not in_game:
            start = counts[i]["min"]
            in_game = True
        elif not is_game[i] and in_game:
            end = counts[i]["min"]
            if end - start >= min_game_duration_min:
                games.append({"start_min": start, "end_min": end, "duration": end - start})
            in_game = False

    if in_game:
        end = counts[-1]["min"]
        if end - start >= min_game_duration_min:
            games.append({"start_min": start, "end_min": end, "duration": end - start})

    # Split overly long periods (>70 min) into separate games
    final = []
    for g in games:
        if g["duration"] > 70:
            pos = g["start_min"]
            while pos < g["end_min"]:
                game_end = min(pos + 55, g["end_min"])
                if game_end - pos >= min_game_duration_min:
                    final.append({"start_min": pos, "end_min": game_end, "duration": game_end - pos})
                pos = game_end + 5
        else:
            final.append(g)

    return final


def process_game(video_path: str, output_dir: str, start_sec: float, end_sec: float,
                 team_a: str, team_b: str, game_label: str):
    """Process a single game: tracking → analysis → report."""
    from ff_analytics.analysis.game_analyzer import GameAnalyzer
    from ff_analytics.reports.html_report import generate_html_report

    os.makedirs(output_dir, exist_ok=True)
    tracking_path = os.path.join(output_dir, "tracking.jsonl")

    # Step 1: Track (if not already done)
    if not os.path.exists(tracking_path) or os.path.getsize(tracking_path) < 1000:
        from ff_analytics.tracking.detector import PlayerDetector
        from ff_analytics.tracking.tracker import ByteTracker
        from ff_analytics.tracking.team_id import TeamIdentifier
        from ff_analytics.tracking.pipeline import TrackingPipeline

        pipeline = TrackingPipeline(
            detector=PlayerDetector(),
            tracker=ByteTracker(),
            team_identifier=TeamIdentifier(),
            process_every_n=5,
        )
        pipeline.process_video(video_path, tracking_path, start_sec, end_sec)

    # Step 2: Analyze
    ga = GameAnalyzer()
    result = ga.analyze(
        video_path=video_path,
        tracking_path=tracking_path,
        output_dir=os.path.join(output_dir, "report"),
        game_start_sec=start_sec + 60,  # skip first minute (warmup)
        game_end_sec=end_sec,
        team_a=team_a, team_b=team_b,
        first_possession=team_a,
    )

    # Step 3: HTML report
    drives_path = os.path.join(output_dir, "report", "drives.json")
    tend_path = os.path.join(output_dir, "report", "tendencies.json")

    with open(drives_path) as f:
        drives = json.loads(f.read())
    a_pts = sum(d["points"] for d in drives if d["offense"] == team_a)
    b_pts = sum(d["points"] for d in drives if d["offense"] == team_b)

    generate_html_report(
        drives_path, tend_path,
        os.path.join(output_dir, "REPORT.html"),
        team_a, team_b, "", "", a_pts, b_pts,
        game_format="7v7",
    )

    return {
        "game": game_label,
        "snaps": result["snaps"],
        "drives": result["drives"],
        "tds": sum(1 for d in drives if "Touchdown" in d["result"]),
        "est_score": f"{team_a} {a_pts} - {team_b} {b_pts}",
        "report": os.path.join(output_dir, "REPORT.html"),
    }


def main():
    parser = argparse.ArgumentParser(description="FF Analytics Batch Processor")
    parser.add_argument("--folder", required=True, help="Folder containing video files")
    parser.add_argument("--output", default="data/batch", help="Output directory")
    parser.add_argument("--scan-only", action="store_true", help="Only scan for games, don't process")
    args = parser.parse_args()

    print("=" * 60)
    print("  FF Analytics — Batch Processor")
    print("  Processing all videos in:", args.folder)
    print("=" * 60)

    # Find all MP4 files
    videos = [f for f in os.listdir(args.folder) if f.endswith(".mp4")]
    print(f"\nFound {len(videos)} video files:")
    for v in videos:
        size_gb = os.path.getsize(os.path.join(args.folder, v)) / 1e9
        print(f"  {v} ({size_gb:.1f} GB)")

    # Scan each video for games
    all_games = []
    for v in videos:
        video_path = os.path.join(args.folder, v)
        field_name = v.replace(".mp4", "").replace("-", " ").title()
        print(f"\nScanning {v}...")

        games = find_games_in_video(video_path)
        print(f"  Found {len(games)} games")

        for i, g in enumerate(games, 1):
            label = f"{field_name} Game {i}"
            all_games.append({
                "video": video_path,
                "field": field_name,
                "game_num": i,
                "label": label,
                "start_sec": g["start_min"] * 60,
                "end_sec": g["end_min"] * 60,
                "duration_min": g["duration"],
            })
            print(f"  Game {i}: {g['start_min']}-{g['end_min']} min ({g['duration']} min)")

    print(f"\nTotal games found: {len(all_games)}")

    if args.scan_only:
        with open(os.path.join(args.output, "games_found.json"), "w") as f:
            json.dump(all_games, f, indent=2)
        print("Scan complete. Games saved to games_found.json")
        return

    # Process each game
    results = []
    for g in all_games:
        output_dir = os.path.join(args.output, g["label"].replace(" ", "_"))
        print(f"\n{'=' * 60}")
        print(f"  Processing: {g['label']}")
        print(f"{'=' * 60}")

        try:
            r = process_game(
                g["video"], output_dir,
                g["start_sec"], g["end_sec"],
                "Home", "Away", g["label"],
            )
            results.append(r)
            print(f"  Result: {r['snaps']} snaps, {r['drives']} drives, {r['tds']} TDs")
            print(f"  Report: {r['report']}")
        except Exception as e:
            print(f"  ERROR: {e}")
            results.append({"game": g["label"], "error": str(e)})

    # Summary
    print(f"\n{'=' * 60}")
    print(f"  BATCH PROCESSING COMPLETE")
    print(f"{'=' * 60}")
    print(f"  Videos processed: {len(videos)}")
    print(f"  Games found: {len(all_games)}")
    print(f"  Games analyzed: {len([r for r in results if 'error' not in r])}")
    for r in results:
        if "error" in r:
            print(f"  {r['game']}: ERROR - {r['error']}")
        else:
            print(f"  {r['game']}: {r['snaps']} snaps, {r['tds']} TDs, {r['est_score']}")

    with open(os.path.join(args.output, "batch_results.json"), "w") as f:
        json.dump(results, f, indent=2)


if __name__ == "__main__":
    main()
