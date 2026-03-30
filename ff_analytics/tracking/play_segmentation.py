"""
Play segmentation — detecting active plays vs dead-ball periods.

Uses aggregate player motion energy to find snap/play-start and
play-end boundaries.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np


@dataclass
class PlaySegment:
    """A detected play with start/end times."""
    play_number: int
    start_frame: int
    end_frame: int
    start_time: float  # seconds
    end_time: float    # seconds
    avg_motion_energy: float
    peak_motion_energy: float


class PlaySegmenter:
    """Detect play boundaries from tracking data.

    Algorithm:
    1. Compute per-frame "motion energy" = sum of all tracked player
       velocities (distance moved between consecutive frames).
    2. Smooth with a rolling window (0.5s).
    3. Active play = motion energy above threshold for at least N frames.
    4. Dead ball = motion energy below threshold for at least M frames.
    5. Merge very short gaps (< 1s) as continued plays.
    """

    def __init__(
        self,
        fps: float = 30.0,
        motion_threshold: float = 15.0,
        min_play_duration: float = 2.0,
        min_dead_ball_duration: float = 3.0,
        smoothing_window: float = 0.5,
    ) -> None:
        """
        Args:
            fps: Video frames per second.
            motion_threshold: Pixels of total motion per frame to count as "active".
            min_play_duration: Minimum seconds for a valid play.
            min_dead_ball_duration: Minimum seconds of inactivity to split plays.
            smoothing_window: Rolling average window in seconds.
        """
        self.fps = fps
        self.motion_threshold = motion_threshold
        self.min_play_frames = int(min_play_duration * fps)
        self.min_dead_frames = int(min_dead_ball_duration * fps)
        self.smooth_frames = max(1, int(smoothing_window * fps))

    def segment_from_positions(
        self,
        frame_indices: np.ndarray,
        track_ids: np.ndarray,
        x_positions: np.ndarray,
        y_positions: np.ndarray,
        total_frames: int,
    ) -> list[PlaySegment]:
        """Segment plays from raw tracking positions.

        Args:
            frame_indices: 1D array of frame numbers for each tracking point.
            track_ids: 1D array of track IDs for each tracking point.
            x_positions: 1D array of x pixel positions.
            y_positions: 1D array of y pixel positions.
            total_frames: Total number of frames in video.

        Returns:
            List of PlaySegment objects.
        """
        # Compute per-frame motion energy
        motion_energy = np.zeros(total_frames)

        unique_tracks = np.unique(track_ids)
        for tid in unique_tracks:
            mask = track_ids == tid
            t_frames = frame_indices[mask]
            t_x = x_positions[mask]
            t_y = y_positions[mask]

            # Sort by frame
            order = np.argsort(t_frames)
            t_frames = t_frames[order]
            t_x = t_x[order]
            t_y = t_y[order]

            # Compute displacement between consecutive frames
            for i in range(1, len(t_frames)):
                f_idx = t_frames[i]
                frame_gap = t_frames[i] - t_frames[i - 1]
                if frame_gap == 0:
                    continue
                dx = t_x[i] - t_x[i - 1]
                dy = t_y[i] - t_y[i - 1]
                speed = np.sqrt(dx**2 + dy**2) / frame_gap
                if 0 <= f_idx < total_frames:
                    motion_energy[int(f_idx)] += speed

        # Smooth motion energy
        kernel = np.ones(self.smooth_frames) / self.smooth_frames
        smoothed = np.convolve(motion_energy, kernel, mode='same')

        # Threshold to binary active/inactive
        is_active = smoothed > self.motion_threshold

        # Find play segments
        segments = []
        in_play = False
        play_start = 0
        play_num = 0

        for i in range(len(is_active)):
            if is_active[i] and not in_play:
                play_start = i
                in_play = True
            elif not is_active[i] and in_play:
                # Check if this dead period is long enough to end the play
                dead_end = min(i + self.min_dead_frames, len(is_active))
                if not np.any(is_active[i:dead_end]):
                    # Confirmed end of play
                    play_end = i
                    duration_frames = play_end - play_start
                    if duration_frames >= self.min_play_frames:
                        play_num += 1
                        seg_energy = smoothed[play_start:play_end]
                        segments.append(PlaySegment(
                            play_number=play_num,
                            start_frame=play_start,
                            end_frame=play_end,
                            start_time=play_start / self.fps,
                            end_time=play_end / self.fps,
                            avg_motion_energy=float(seg_energy.mean()),
                            peak_motion_energy=float(seg_energy.max()),
                        ))
                    in_play = False

        # Handle play that extends to end of video
        if in_play:
            duration_frames = len(is_active) - play_start
            if duration_frames >= self.min_play_frames:
                play_num += 1
                seg_energy = smoothed[play_start:]
                segments.append(PlaySegment(
                    play_number=play_num,
                    start_frame=play_start,
                    end_frame=len(is_active) - 1,
                    start_time=play_start / self.fps,
                    end_time=(len(is_active) - 1) / self.fps,
                    avg_motion_energy=float(seg_energy.mean()),
                    peak_motion_energy=float(seg_energy.max()),
                ))

        return segments

    def segment_from_motion_energy(
        self, motion_energy: np.ndarray
    ) -> list[PlaySegment]:
        """Segment plays from pre-computed motion energy array.

        Args:
            motion_energy: 1D array of motion energy per frame.

        Returns:
            List of PlaySegment objects.
        """
        # Create dummy position arrays and call the main method
        # This is a convenience wrapper
        kernel = np.ones(self.smooth_frames) / self.smooth_frames
        smoothed = np.convolve(motion_energy, kernel, mode='same')
        is_active = smoothed > self.motion_threshold

        segments = []
        in_play = False
        play_start = 0
        play_num = 0

        for i in range(len(is_active)):
            if is_active[i] and not in_play:
                play_start = i
                in_play = True
            elif not is_active[i] and in_play:
                dead_end = min(i + self.min_dead_frames, len(is_active))
                if not np.any(is_active[i:dead_end]):
                    play_end = i
                    if play_end - play_start >= self.min_play_frames:
                        play_num += 1
                        seg_energy = smoothed[play_start:play_end]
                        segments.append(PlaySegment(
                            play_number=play_num,
                            start_frame=play_start,
                            end_frame=play_end,
                            start_time=play_start / self.fps,
                            end_time=play_end / self.fps,
                            avg_motion_energy=float(seg_energy.mean()),
                            peak_motion_energy=float(seg_energy.max()),
                        ))
                    in_play = False

        if in_play and (len(is_active) - play_start) >= self.min_play_frames:
            play_num += 1
            seg_energy = smoothed[play_start:]
            segments.append(PlaySegment(
                play_number=play_num,
                start_frame=play_start,
                end_frame=len(is_active) - 1,
                start_time=play_start / self.fps,
                end_time=(len(is_active) - 1) / self.fps,
                avg_motion_energy=float(seg_energy.mean()),
                peak_motion_energy=float(seg_energy.max()),
            ))

        return segments
