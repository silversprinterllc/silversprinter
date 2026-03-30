"""
Player detection using YOLOv8.

Runs person detection on each video frame, returning bounding boxes
and confidence scores.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

import cv2
import numpy as np


@dataclass
class Detection:
    """A single detected person in a frame."""
    bbox: tuple[int, int, int, int]  # (x1, y1, x2, y2)
    confidence: float
    class_id: int = 0  # 0 = person in COCO

    @property
    def center(self) -> tuple[int, int]:
        x1, y1, x2, y2 = self.bbox
        return ((x1 + x2) // 2, (y1 + y2) // 2)

    @property
    def width(self) -> int:
        return self.bbox[2] - self.bbox[0]

    @property
    def height(self) -> int:
        return self.bbox[3] - self.bbox[1]

    @property
    def bottom_center(self) -> tuple[int, int]:
        """Feet position — best proxy for field location."""
        x1, y1, x2, y2 = self.bbox
        return ((x1 + x2) // 2, y2)


class PlayerDetector:
    """YOLOv8-based person detector.

    Uses ultralytics YOLOv8 for person-class detection.
    Falls back to a simple background-subtraction detector if
    ultralytics is not available.
    """

    def __init__(
        self,
        model_size: str = "yolov8n",
        confidence_threshold: float = 0.3,
        person_class_id: int = 0,
        device: Optional[str] = None,
    ) -> None:
        """Initialize the detector.

        Args:
            model_size: YOLOv8 model variant (yolov8n, yolov8s, yolov8m).
            confidence_threshold: Minimum confidence to keep a detection.
            person_class_id: COCO class ID for 'person' (always 0).
            device: 'cuda', 'cpu', or None for auto.
        """
        self.confidence_threshold = confidence_threshold
        self.person_class_id = person_class_id
        self.model = None
        self._model_size = model_size
        self._device = device
        self._load_model()

    def _load_model(self) -> None:
        """Load the YOLOv8 model."""
        try:
            from ultralytics import YOLO
            self.model = YOLO(f"{self._model_size}.pt")
            if self._device:
                self.model.to(self._device)
            print(f"Loaded {self._model_size} on {self._device or 'auto'}")
        except ImportError:
            print("WARNING: ultralytics not installed. Using stub detector.")
            print("Install with: pip install ultralytics")
            self.model = None

    def detect(self, frame: np.ndarray) -> list[Detection]:
        """Detect people in a single frame.

        Args:
            frame: BGR image (H, W, 3).

        Returns:
            List of Detection objects for people found.
        """
        if self.model is None:
            return self._stub_detect(frame)

        results = self.model(frame, verbose=False, conf=self.confidence_threshold)

        detections = []
        for result in results:
            boxes = result.boxes
            if boxes is None:
                continue
            for i in range(len(boxes)):
                cls_id = int(boxes.cls[i].item())
                if cls_id != self.person_class_id:
                    continue
                conf = float(boxes.conf[i].item())
                x1, y1, x2, y2 = boxes.xyxy[i].cpu().numpy().astype(int)
                detections.append(Detection(
                    bbox=(int(x1), int(y1), int(x2), int(y2)),
                    confidence=conf,
                    class_id=cls_id,
                ))

        return detections

    def _stub_detect(self, frame: np.ndarray) -> list[Detection]:
        """Fallback detector using simple contour detection.

        NOT production quality — just ensures the pipeline can run
        without ultralytics installed for development/testing.
        """
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (21, 21), 0)
        # Simple threshold to find bright objects on field
        _, thresh = cv2.threshold(blurred, 100, 255, cv2.THRESH_BINARY)
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        detections = []
        for cnt in contours:
            x, y, w, h = cv2.boundingRect(cnt)
            # Filter by aspect ratio and size (person-like)
            if h > 40 and 0.2 < w / h < 0.8:
                detections.append(Detection(
                    bbox=(x, y, x + w, y + h),
                    confidence=0.5,
                    class_id=0,
                ))
        return detections
