"""
Main tracking pipeline — orchestrates detection, tracking, team ID,
player identification, and play segmentation on a game video.
"""

from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Optional

import cv2
import numpy as np

from ..calibration.calibration import FieldCalibrator
from ..player_id.identifier import PlayerIdentificationSystem
from .detector import PlayerDetector
from .play_segmentation import PlaySegmenter
from .team_id import TeamIdentifier
from .tracker import ByteTracker


class TrackingPipeline:
    """End-to-end pipeline for processing a game video.

    Steps:
    1. Load video, read frames
    2. Detect people per frame (YOLOv8)
    3. Track across frames (ByteTrack)
    4. Identify teams (jersey color clustering)
    5. Project positions to field coordinates (homography)
    6. Identify individual players (appearance matching)
    7. Segment plays (motion energy analysis)
    8. Output structured tracking data
    """

    def __init__(
        self,
        detector: Optional[PlayerDetector] = None,
        tracker: Optional[ByteTracker] = None,
        team_identifier: Optional[TeamIdentifier] = None,
        calibrator: Optional[FieldCalibrator] = None,
        player_id_system: Optional[PlayerIdentificationSystem] = None,
        play_segmenter: Optional[PlaySegmenter] = None,
        process_every_n: int = 2,  # process every Nth frame for speed
    ) -> None:
        self.detector = detector or PlayerDetector()
        self.tracker = tracker or ByteTracker()
        self.team_identifier = team_identifier or TeamIdentifier()
        self.calibrator = calibrator
        self.player_id = player_id_system
        self.play_segmenter = play_segmenter
        self.process_every_n = process_every_n

    def process_video(
        self,
        video_path: str,
        output_path: str,
        start_time: float = 0.0,
        end_time: Optional[float] = None,
        team_cluster_interval: int = 90,  # re-cluster teams every N frames
    ) -> dict:
        """Process a game video and output tracking data.

        Args:
            video_path: Path to input video file.
            output_path: Path for output JSONL tracking data.
            start_time: Start processing at this time (seconds).
            end_time: Stop processing at this time (seconds).
            team_cluster_interval: Frames between team re-clustering.

        Returns:
            Summary dict with frame count, track count, etc.
        """
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        start_frame = int(start_time * fps)
        end_frame = int(end_time * fps) if end_time else total_frames

        if self.play_segmenter is None:
            self.play_segmenter = PlaySegmenter(fps=fps)

        cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)

        tracking_records = []
        all_frame_indices = []
        all_track_ids = []
        all_x_pixels = []
        all_y_pixels = []

        frame_count = 0
        unique_tracks: set[int] = set()
        team_assignments: dict[int, int] = {}  # track_id → team_label
        player_identities: dict[int, str] = {}  # track_id → player_name

        print(f"Processing {video_path}")
        print(f"  FPS: {fps}, Resolution: {width}x{height}")
        print(f"  Frames: {start_frame} to {end_frame} ({(end_frame - start_frame) / fps:.1f}s)")
        t0 = time.time()

        for frame_idx in range(start_frame, end_frame):
            ret, frame = cap.read()
            if not ret:
                break

            # Skip frames for speed
            if (frame_idx - start_frame) % self.process_every_n != 0:
                continue

            frame_count += 1
            current_time = frame_idx / fps

            # 1. Detect
            detections = self.detector.detect(frame)

            # 2. Track
            tracks = self.tracker.update(detections)

            if not tracks:
                continue

            # 3. Team identification (periodic re-clustering)
            if frame_count % team_cluster_interval == 1 or frame_count == 1:
                track_dets = []
                track_tids = []
                for track in tracks:
                    # Find the detection that matches this track's bbox
                    from .detector import Detection
                    track_dets.append(Detection(
                        bbox=track.bbox,
                        confidence=track.confidence,
                    ))
                    track_tids.append(track.track_id)

                if track_dets:
                    assignments = self.team_identifier.cluster_teams(
                        frame, track_dets, track_tids
                    )
                    for a in assignments:
                        team_assignments[a.track_id] = a.team_label

            # 4. Player identification (if system available)
            if self.player_id and frame_count % 30 == 1:
                track_dicts = []
                for track in tracks:
                    td = {
                        "track_id": track.track_id,
                        "bbox": track.bbox,
                    }
                    if self.calibrator:
                        bx, by = track.bottom_center
                        fx, fy = self.calibrator.pixel_to_field(bx, by)
                        td["field_position"] = (fx, fy)
                    track_dicts.append(td)

                id_results = self.player_id.identify_all_tracks(frame, track_dicts)
                for tid, (name, conf) in id_results.items():
                    if name:
                        player_identities[tid] = name

            # 5. Record tracking data
            for track in tracks:
                unique_tracks.add(track.track_id)
                bx, by = track.bottom_center

                x_field, y_field = 0.0, 0.0
                if self.calibrator:
                    try:
                        x_field, y_field = self.calibrator.pixel_to_field(bx, by)
                    except Exception:
                        pass

                record = {
                    "frame_idx": frame_idx,
                    "time": round(current_time, 3),
                    "track_id": track.track_id,
                    "team_label": team_assignments.get(track.track_id, -1),
                    "player_name": player_identities.get(track.track_id),
                    "x_field": round(x_field, 2),
                    "y_field": round(y_field, 2),
                    "x_pixel": int(bx),
                    "y_pixel": int(by),
                    "bbox_x1": track.bbox[0],
                    "bbox_y1": track.bbox[1],
                    "bbox_x2": track.bbox[2],
                    "bbox_y2": track.bbox[3],
                    "confidence": round(track.confidence, 3),
                }
                tracking_records.append(record)

                all_frame_indices.append(frame_idx)
                all_track_ids.append(track.track_id)
                all_x_pixels.append(int(bx))
                all_y_pixels.append(int(by))

            # Progress
            if frame_count % 500 == 0:
                elapsed = time.time() - t0
                progress = (frame_idx - start_frame) / max(end_frame - start_frame, 1)
                print(f"  {progress * 100:.1f}% | frame {frame_idx} | "
                      f"{len(unique_tracks)} tracks | {elapsed:.1f}s elapsed")

        cap.release()

        # Write tracking data
        with open(output_path, 'w') as f:
            for record in tracking_records:
                f.write(json.dumps(record) + '\n')

        # 6. Play segmentation
        plays = []
        if all_frame_indices:
            plays = self.play_segmenter.segment_from_positions(
                frame_indices=np.array(all_frame_indices),
                track_ids=np.array(all_track_ids),
                x_positions=np.array(all_x_pixels, dtype=np.float64),
                y_positions=np.array(all_y_pixels, dtype=np.float64),
                total_frames=end_frame - start_frame,
            )

        # Write play segments
        plays_path = str(output_file.with_suffix('.plays.json'))
        plays_data = [
            {
                "play_number": p.play_number,
                "start_frame": p.start_frame + start_frame,
                "end_frame": p.end_frame + start_frame,
                "start_time": round(p.start_time + start_time, 2),
                "end_time": round(p.end_time + start_time, 2),
                "duration": round(p.end_time - p.start_time, 2),
            }
            for p in plays
        ]
        Path(plays_path).write_text(json.dumps(plays_data, indent=2))

        elapsed = time.time() - t0
        summary = {
            "video_path": video_path,
            "frames_processed": frame_count,
            "unique_tracks": len(unique_tracks),
            "tracking_records": len(tracking_records),
            "plays_detected": len(plays),
            "processing_time_seconds": round(elapsed, 1),
            "fps_effective": round(frame_count / max(elapsed, 0.1), 1),
            "output_tracking": output_path,
            "output_plays": plays_path,
            "team_assignments": {str(k): v for k, v in team_assignments.items()},
            "player_identities": player_identities,
        }

        summary_path = str(output_file.with_suffix('.summary.json'))
        Path(summary_path).write_text(json.dumps(summary, indent=2))

        print(f"\nDone! {frame_count} frames, {len(unique_tracks)} tracks, "
              f"{len(plays)} plays in {elapsed:.1f}s")
        print(f"  Tracking: {output_path}")
        print(f"  Plays:    {plays_path}")
        print(f"  Summary:  {summary_path}")

        return summary
