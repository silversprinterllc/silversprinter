"""
Field calibration via homography.

The coach clicks 4+ known field landmarks on a reference frame,
maps them to real-world yard coordinates, and we compute a
perspective transform that projects pixel positions → field coords.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Optional

import cv2
import numpy as np


class FieldCalibrator:
    """Interactive and programmatic field calibration."""

    def __init__(self) -> None:
        self.image_points: list[tuple[float, float]] = []
        self.field_points: list[tuple[float, float]] = []
        self.homography: Optional[np.ndarray] = None
        self._click_frame: Optional[np.ndarray] = None

    # ── Interactive calibration ────────────────────────────────────

    def calibrate_interactive(self, video_path: str, frame_idx: int = 0) -> np.ndarray:
        """Open a window for the coach to click field landmarks.

        Instructions printed to console. Press 'q' when done.
        Requires at least 4 point pairs.

        Args:
            video_path: Path to the video file.
            frame_idx: Which frame to use as reference (default first).

        Returns:
            3x3 homography matrix.
        """
        cap = cv2.VideoCapture(video_path)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        cap.release()
        if not ret:
            raise RuntimeError(f"Could not read frame {frame_idx} from {video_path}")

        self._click_frame = frame.copy()
        self.image_points = []

        # Standard 7v7 flag football field landmarks (yards)
        # Coach will be prompted to click these in order
        default_field_landmarks = [
            ("Left end-zone / left sideline corner", (0.0, 0.0)),
            ("Right end-zone / left sideline corner", (0.0, 70.0)),
            ("Left end-zone / right sideline corner", (40.0, 0.0)),
            ("Right end-zone / right sideline corner", (40.0, 70.0)),
        ]

        print("\n=== FIELD CALIBRATION ===")
        print("Click the following points on the video frame.")
        print("After each click, press any key to confirm and move to the next point.")
        print("Press 'q' at any time to finish early (need >= 4 points).\n")

        cv2.namedWindow("Calibration", cv2.WINDOW_NORMAL)
        cv2.resizeWindow("Calibration", 1280, 720)

        for i, (label, field_pt) in enumerate(default_field_landmarks):
            print(f"  [{i+1}/{len(default_field_landmarks)}] Click: {label}  →  field ({field_pt[0]}, {field_pt[1]}) yards")
            cv2.setMouseCallback("Calibration", self._on_click)
            self._waiting_for_click = True

            while self._waiting_for_click:
                display = self._click_frame.copy()
                # Draw already-placed points
                for px, py in self.image_points:
                    cv2.circle(display, (int(px), int(py)), 8, (0, 255, 0), -1)
                cv2.putText(display, f"Click: {label}", (20, 40),
                            cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 255), 2)
                cv2.imshow("Calibration", display)
                key = cv2.waitKey(50)
                if key == ord('q'):
                    self._waiting_for_click = False
                    break

            if key == ord('q'):
                break
            self.field_points.append(field_pt)

        cv2.destroyAllWindows()

        if len(self.image_points) < 4:
            raise ValueError(f"Need at least 4 points, got {len(self.image_points)}")

        self.homography = self._compute_homography()
        return self.homography

    def _on_click(self, event: int, x: int, y: int, flags: int, param: object) -> None:
        """Mouse callback for interactive calibration."""
        if event == cv2.EVENT_LBUTTONDOWN:
            self.image_points.append((float(x), float(y)))
            self._waiting_for_click = False
            print(f"    → Clicked pixel ({x}, {y})")

    # ── Programmatic calibration ───────────────────────────────────

    def calibrate_from_points(
        self,
        image_points: list[tuple[float, float]],
        field_points: list[tuple[float, float]],
    ) -> np.ndarray:
        """Compute homography from pre-specified point pairs.

        Args:
            image_points: List of (x_pixel, y_pixel) tuples.
            field_points: List of (x_yards, y_yards) tuples.

        Returns:
            3x3 homography matrix.
        """
        if len(image_points) < 4 or len(field_points) < 4:
            raise ValueError("Need at least 4 point pairs")
        if len(image_points) != len(field_points):
            raise ValueError("image_points and field_points must have same length")

        self.image_points = list(image_points)
        self.field_points = list(field_points)
        self.homography = self._compute_homography()
        return self.homography

    def _compute_homography(self) -> np.ndarray:
        """Compute the homography matrix from stored point pairs."""
        src = np.array(self.image_points, dtype=np.float32)
        dst = np.array(self.field_points, dtype=np.float32)
        H, status = cv2.findHomography(src, dst, cv2.RANSAC, 5.0)
        if H is None:
            raise RuntimeError("Homography computation failed")
        return H

    # ── Projection ─────────────────────────────────────────────────

    def pixel_to_field(self, x_pixel: float, y_pixel: float) -> tuple[float, float]:
        """Project a pixel coordinate to field coordinates (yards).

        Args:
            x_pixel: Horizontal pixel position.
            y_pixel: Vertical pixel position.

        Returns:
            (x_field, y_field) in yards.
        """
        if self.homography is None:
            raise RuntimeError("Calibration not performed yet")

        pt = np.array([[[x_pixel, y_pixel]]], dtype=np.float32)
        transformed = cv2.perspectiveTransform(pt, self.homography)
        return float(transformed[0, 0, 0]), float(transformed[0, 0, 1])

    def pixels_to_field_batch(self, pixels: np.ndarray) -> np.ndarray:
        """Project multiple pixel coordinates to field coordinates.

        Args:
            pixels: Nx2 array of (x_pixel, y_pixel).

        Returns:
            Nx2 array of (x_field, y_field) in yards.
        """
        if self.homography is None:
            raise RuntimeError("Calibration not performed yet")

        pts = pixels.reshape(-1, 1, 2).astype(np.float32)
        transformed = cv2.perspectiveTransform(pts, self.homography)
        return transformed.reshape(-1, 2)

    # ── Persistence ────────────────────────────────────────────────

    def save(self, path: str) -> None:
        """Save calibration to JSON file."""
        data = {
            "image_points": self.image_points,
            "field_points": self.field_points,
            "homography": self.homography.tolist() if self.homography is not None else None,
        }
        Path(path).write_text(json.dumps(data, indent=2))
        print(f"Calibration saved to {path}")

    @classmethod
    def load(cls, path: str) -> "FieldCalibrator":
        """Load calibration from JSON file."""
        data = json.loads(Path(path).read_text())
        cal = cls()
        cal.image_points = [tuple(p) for p in data["image_points"]]
        cal.field_points = [tuple(p) for p in data["field_points"]]
        if data["homography"]:
            cal.homography = np.array(data["homography"], dtype=np.float64)
        return cal
