"""
Player Identification System — for when jersey numbers are unreadable.

Multi-signal approach to identify individual players without OCR:

1. **Appearance Embedding**: 128-dim feature vector from a lightweight
   ReID model (or color/texture histogram as fallback).
2. **Body Metrics**: Relative height and build proportions from bbox
   aspect ratios aggregated over time.
3. **Gear/Accessory Signals**: Distinctive gear detection via color
   analysis of body sub-regions (gloves, headband, sleeves, shoes).
4. **Positional Fingerprint**: Where a player lines up consistently
   (always in slot, always at safety) — accumulated over plays.
5. **Calibration Clip**: Coach tags players in a short reference clip,
   system stores their appearance template.
6. **Matching**: Cosine similarity of multi-signal descriptor against
   reference templates; best match above threshold is assigned.

This replaces traditional jersey-number OCR which is unreliable at
typical sideline/end-zone camera distances in amateur sports.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

import cv2
import numpy as np


@dataclass
class PlayerDescriptor:
    """Multi-signal descriptor for a tracked individual."""
    player_name: Optional[str] = None
    player_id: Optional[int] = None

    # Signal 1: Appearance embedding (128-dim)
    appearance_embedding: Optional[np.ndarray] = None

    # Signal 2: Body metrics
    avg_height_pixels: float = 0.0
    avg_width_pixels: float = 0.0
    aspect_ratio: float = 0.0  # h/w
    relative_height: float = 1.0  # normalized to tallest player

    # Signal 3: Gear/accessory colors
    jersey_color_hsv: tuple[float, float, float] = (0.0, 0.0, 0.0)
    shorts_color_hsv: tuple[float, float, float] = (0.0, 0.0, 0.0)
    shoe_color_hsv: tuple[float, float, float] = (0.0, 0.0, 0.0)
    has_headband: bool = False
    has_gloves: bool = False
    glove_color_hsv: tuple[float, float, float] = (0.0, 0.0, 0.0)
    has_sleeve: bool = False
    sleeve_side: str = ""  # "left", "right", "both", ""

    # Signal 4: Positional fingerprint
    avg_x_position: float = 0.0  # average field x at snap
    avg_y_position: float = 0.0  # average field y at snap
    position_cluster: str = ""  # "QB", "slot_left", "boundary_right", etc.

    # Matching metadata
    match_confidence: float = 0.0
    sample_count: int = 0  # how many frames contributed to this descriptor

    def to_vector(self) -> np.ndarray:
        """Flatten all signals into a single feature vector for matching.

        Returns a normalized vector combining:
        - Appearance embedding (128 dims, weighted 0.4)
        - Body metrics (3 dims, weighted 0.15)
        - Gear colors (9 dims HSV for jersey/shorts/shoes, weighted 0.25)
        - Positional fingerprint (2 dims, weighted 0.2)
        """
        parts = []

        # Appearance embedding (dominant signal)
        if self.appearance_embedding is not None:
            emb = self.appearance_embedding / (np.linalg.norm(self.appearance_embedding) + 1e-8)
            parts.append(emb * 0.4)
        else:
            parts.append(np.zeros(128) * 0.4)

        # Body metrics (normalized)
        body = np.array([
            self.aspect_ratio / 3.0,  # normalize ~0-3 range
            self.relative_height,
            self.avg_width_pixels / 100.0,
        ])
        parts.append(body * 0.15)

        # Gear colors (HSV normalized to 0-1)
        gear = np.array([
            self.jersey_color_hsv[0] / 180.0, self.jersey_color_hsv[1] / 255.0, self.jersey_color_hsv[2] / 255.0,
            self.shorts_color_hsv[0] / 180.0, self.shorts_color_hsv[1] / 255.0, self.shorts_color_hsv[2] / 255.0,
            self.shoe_color_hsv[0] / 180.0, self.shoe_color_hsv[1] / 255.0, self.shoe_color_hsv[2] / 255.0,
        ])
        parts.append(gear * 0.25)

        # Positional fingerprint (normalized to field dimensions)
        pos = np.array([
            self.avg_x_position / 53.3,  # field width ~53.3 yards
            self.avg_y_position / 100.0,
        ])
        parts.append(pos * 0.2)

        return np.concatenate(parts)


class PlayerIdentificationSystem:
    """Identify players without jersey numbers using appearance + context.

    Workflow:
    1. Coach provides a calibration clip and tags each visible player.
    2. System builds a PlayerDescriptor for each tagged player.
    3. During game processing, each new track gets a descriptor built
       from the first N good frames.
    4. Descriptors are matched against references via cosine similarity.
    """

    def __init__(self, similarity_threshold: float = 0.65) -> None:
        self.reference_descriptors: dict[str, PlayerDescriptor] = {}  # name → descriptor
        self.similarity_threshold = similarity_threshold
        self._reid_model = None

    # ── Reference Template Building ───────────────────────────────

    def build_reference_from_calibration(
        self,
        video_path: str,
        player_tags: list[dict],
        start_time: float = 0.0,
        duration: float = 30.0,
    ) -> None:
        """Build reference descriptors from a calibration clip.

        The coach provides tags like:
        [
            {"name": "Marcus", "track_id": 3, "frame": 150},
            {"name": "DJ", "track_id": 7, "frame": 150},
            ...
        ]

        For each tagged player, we extract their appearance from multiple
        frames around the tagged frame.

        Args:
            video_path: Path to video file.
            player_tags: List of {name, track_id, frame} dicts.
            start_time: Start of calibration window (seconds).
            duration: Length of calibration window (seconds).
        """
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)

        for tag in player_tags:
            name = tag["name"]
            frame_idx = tag.get("frame", int(start_time * fps))

            # Extract descriptor from multiple frames around the tag
            descriptor = PlayerDescriptor(player_name=name)
            embeddings = []
            heights = []
            widths = []
            jersey_colors = []
            shorts_colors = []
            shoe_colors = []

            # Sample frames around the tagged frame
            for offset in range(-5, 6):  # 11 frames centered on tag
                f_idx = frame_idx + offset
                cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
                ret, frame = cap.read()
                if not ret:
                    continue

                # If we have track_id and a running tracker, use its bbox
                # For calibration, assume coach provides approximate bbox
                bbox = tag.get("bbox")
                if bbox is None:
                    continue

                x1, y1, x2, y2 = bbox
                h = y2 - y1
                w = x2 - x1

                if h < 20 or w < 10:
                    continue

                heights.append(h)
                widths.append(w)

                # Extract sub-region colors
                jersey_colors.append(self._extract_region_color(
                    frame, bbox, region="torso"
                ))
                shorts_colors.append(self._extract_region_color(
                    frame, bbox, region="shorts"
                ))
                shoe_colors.append(self._extract_region_color(
                    frame, bbox, region="shoes"
                ))

                # Appearance embedding (histogram-based fallback)
                emb = self._compute_appearance_embedding(frame, bbox)
                embeddings.append(emb)

            if embeddings:
                descriptor.appearance_embedding = np.mean(embeddings, axis=0)
            if heights:
                descriptor.avg_height_pixels = float(np.mean(heights))
                descriptor.avg_width_pixels = float(np.mean(widths))
                descriptor.aspect_ratio = descriptor.avg_height_pixels / max(descriptor.avg_width_pixels, 1)
            if jersey_colors:
                descriptor.jersey_color_hsv = tuple(np.mean(jersey_colors, axis=0).tolist())
            if shorts_colors:
                descriptor.shorts_color_hsv = tuple(np.mean(shorts_colors, axis=0).tolist())
            if shoe_colors:
                descriptor.shoe_color_hsv = tuple(np.mean(shoe_colors, axis=0).tolist())

            # Detect gear
            descriptor.has_headband = tag.get("has_headband", False)
            descriptor.has_gloves = tag.get("has_gloves", False)
            descriptor.has_sleeve = tag.get("has_sleeve", False)
            descriptor.sleeve_side = tag.get("sleeve_side", "")
            descriptor.sample_count = len(embeddings)

            self.reference_descriptors[name] = descriptor
            print(f"  Built reference for '{name}' from {len(embeddings)} frames")

        cap.release()

    def build_reference_from_frame(
        self,
        frame: np.ndarray,
        player_name: str,
        bbox: tuple[int, int, int, int],
        gear_info: Optional[dict] = None,
    ) -> None:
        """Build a reference descriptor from a single frame.

        Simpler alternative to calibration clip — coach identifies
        a player in one frame.

        Args:
            frame: BGR image.
            player_name: Name to assign.
            bbox: Bounding box of the player.
            gear_info: Optional dict with gear flags.
        """
        x1, y1, x2, y2 = bbox
        h = y2 - y1
        w = x2 - x1

        descriptor = PlayerDescriptor(
            player_name=player_name,
            appearance_embedding=self._compute_appearance_embedding(frame, bbox),
            avg_height_pixels=float(h),
            avg_width_pixels=float(w),
            aspect_ratio=h / max(w, 1),
            jersey_color_hsv=tuple(self._extract_region_color(frame, bbox, "torso").tolist()),
            shorts_color_hsv=tuple(self._extract_region_color(frame, bbox, "shorts").tolist()),
            shoe_color_hsv=tuple(self._extract_region_color(frame, bbox, "shoes").tolist()),
            sample_count=1,
        )

        if gear_info:
            descriptor.has_headband = gear_info.get("headband", False)
            descriptor.has_gloves = gear_info.get("gloves", False)
            descriptor.has_sleeve = gear_info.get("sleeve", False)
            descriptor.sleeve_side = gear_info.get("sleeve_side", "")
            if "glove_color" in gear_info:
                descriptor.glove_color_hsv = tuple(gear_info["glove_color"])

        self.reference_descriptors[player_name] = descriptor

    # ── Matching ──────────────────────────────────────────────────

    def identify_track(
        self,
        frame: np.ndarray,
        bbox: tuple[int, int, int, int],
        track_history: Optional[list[tuple[int, int, int, int]]] = None,
        field_position: Optional[tuple[float, float]] = None,
    ) -> tuple[Optional[str], float]:
        """Identify a tracked player by matching against references.

        Args:
            frame: Current BGR frame.
            bbox: Current bounding box.
            track_history: List of recent bboxes for this track.
            field_position: (x_field, y_field) if calibration available.

        Returns:
            (player_name, confidence) or (None, 0.0) if no match.
        """
        if not self.reference_descriptors:
            return None, 0.0

        # Build descriptor for this track
        query = PlayerDescriptor()
        query.appearance_embedding = self._compute_appearance_embedding(frame, bbox)

        x1, y1, x2, y2 = bbox
        h = y2 - y1
        w = x2 - x1
        query.avg_height_pixels = float(h)
        query.avg_width_pixels = float(w)
        query.aspect_ratio = h / max(w, 1)

        query.jersey_color_hsv = tuple(
            self._extract_region_color(frame, bbox, "torso").tolist()
        )
        query.shorts_color_hsv = tuple(
            self._extract_region_color(frame, bbox, "shorts").tolist()
        )
        query.shoe_color_hsv = tuple(
            self._extract_region_color(frame, bbox, "shoes").tolist()
        )

        if field_position:
            query.avg_x_position = field_position[0]
            query.avg_y_position = field_position[1]

        # Compute height relative to references
        if self.reference_descriptors:
            max_ref_height = max(
                d.avg_height_pixels for d in self.reference_descriptors.values()
                if d.avg_height_pixels > 0
            ) or 1.0
            query.relative_height = query.avg_height_pixels / max_ref_height

        # Compare against all references
        query_vec = query.to_vector()
        best_name = None
        best_score = -1.0

        for name, ref_desc in self.reference_descriptors.items():
            ref_vec = ref_desc.to_vector()
            score = self._cosine_similarity(query_vec, ref_vec)
            if score > best_score:
                best_score = score
                best_name = name

        if best_score >= self.similarity_threshold:
            return best_name, float(best_score)

        return None, float(best_score)

    def identify_all_tracks(
        self,
        frame: np.ndarray,
        tracks: list[dict],
    ) -> dict[int, tuple[Optional[str], float]]:
        """Identify all active tracks in a frame.

        Uses Hungarian-style assignment to prevent duplicate assignments.

        Args:
            frame: Current BGR frame.
            tracks: List of {track_id, bbox, field_position?} dicts.

        Returns:
            Dict mapping track_id → (player_name, confidence).
        """
        if not tracks or not self.reference_descriptors:
            return {t["track_id"]: (None, 0.0) for t in tracks}

        ref_names = list(self.reference_descriptors.keys())
        n_tracks = len(tracks)
        n_refs = len(ref_names)

        # Build similarity matrix
        sim_matrix = np.zeros((n_tracks, n_refs))
        for i, track in enumerate(tracks):
            query = self._build_query_descriptor(frame, track)
            query_vec = query.to_vector()
            for j, name in enumerate(ref_names):
                ref_vec = self.reference_descriptors[name].to_vector()
                sim_matrix[i, j] = self._cosine_similarity(query_vec, ref_vec)

        # Greedy assignment (best similarity first, no duplicates)
        results: dict[int, tuple[Optional[str], float]] = {}
        used_refs: set[int] = set()
        used_tracks: set[int] = set()

        flat_order = np.argsort(-sim_matrix.ravel())
        for flat_idx in flat_order:
            t_idx = int(flat_idx // n_refs)
            r_idx = int(flat_idx % n_refs)
            if t_idx in used_tracks or r_idx in used_refs:
                continue
            score = sim_matrix[t_idx, r_idx]
            if score < self.similarity_threshold:
                break
            tid = tracks[t_idx]["track_id"]
            results[tid] = (ref_names[r_idx], float(score))
            used_tracks.add(t_idx)
            used_refs.add(r_idx)

        # Fill unmatched tracks
        for i, track in enumerate(tracks):
            if track["track_id"] not in results:
                results[track["track_id"]] = (None, 0.0)

        return results

    def _build_query_descriptor(
        self, frame: np.ndarray, track: dict
    ) -> PlayerDescriptor:
        """Build a descriptor from a track dict."""
        bbox = track["bbox"]
        x1, y1, x2, y2 = bbox
        h = y2 - y1
        w = x2 - x1

        desc = PlayerDescriptor(
            appearance_embedding=self._compute_appearance_embedding(frame, bbox),
            avg_height_pixels=float(h),
            avg_width_pixels=float(w),
            aspect_ratio=h / max(w, 1),
            jersey_color_hsv=tuple(
                self._extract_region_color(frame, bbox, "torso").tolist()
            ),
            shorts_color_hsv=tuple(
                self._extract_region_color(frame, bbox, "shorts").tolist()
            ),
            shoe_color_hsv=tuple(
                self._extract_region_color(frame, bbox, "shoes").tolist()
            ),
        )

        if "field_position" in track:
            desc.avg_x_position = track["field_position"][0]
            desc.avg_y_position = track["field_position"][1]

        # Relative height
        if self.reference_descriptors:
            max_h = max(
                d.avg_height_pixels for d in self.reference_descriptors.values()
                if d.avg_height_pixels > 0
            ) or 1.0
            desc.relative_height = desc.avg_height_pixels / max_h

        return desc

    # ── Feature Extraction ────────────────────────────────────────

    def _compute_appearance_embedding(
        self, frame: np.ndarray, bbox: tuple[int, int, int, int]
    ) -> np.ndarray:
        """Compute a 128-dim appearance embedding for a person crop.

        Uses a color histogram + spatial layout as a lightweight fallback.
        For production, replace with a proper ReID model (OSNet, etc.).

        The histogram captures:
        - HSV color distribution in 4 horizontal strips (head, torso,
          shorts, legs) → 4 strips × 32 bins = 128 dims.
        """
        x1, y1, x2, y2 = bbox
        x1, y1 = max(0, x1), max(0, y1)
        x2 = min(frame.shape[1], x2)
        y2 = min(frame.shape[0], y2)

        crop = frame[y1:y2, x1:x2]
        if crop.size == 0:
            return np.zeros(128)

        hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
        h_crop = hsv.shape[0]

        # Split into 4 horizontal strips
        strips = [
            hsv[0:h_crop // 4, :],             # head
            hsv[h_crop // 4:h_crop // 2, :],   # torso upper
            hsv[h_crop // 2:3 * h_crop // 4, :],  # torso lower / shorts
            hsv[3 * h_crop // 4:, :],           # legs / shoes
        ]

        embedding = []
        for strip in strips:
            if strip.size == 0:
                embedding.extend([0.0] * 32)
                continue
            # Hue histogram (16 bins) + Saturation histogram (8 bins) + Value (8 bins)
            h_hist = cv2.calcHist([strip], [0], None, [16], [0, 180]).flatten()
            s_hist = cv2.calcHist([strip], [1], None, [8], [0, 256]).flatten()
            v_hist = cv2.calcHist([strip], [2], None, [8], [0, 256]).flatten()

            # Normalize each
            h_hist = h_hist / (h_hist.sum() + 1e-8)
            s_hist = s_hist / (s_hist.sum() + 1e-8)
            v_hist = v_hist / (v_hist.sum() + 1e-8)

            embedding.extend(h_hist.tolist())
            embedding.extend(s_hist.tolist())
            embedding.extend(v_hist.tolist())

        return np.array(embedding, dtype=np.float32)

    def _extract_region_color(
        self,
        frame: np.ndarray,
        bbox: tuple[int, int, int, int],
        region: str,
    ) -> np.ndarray:
        """Extract mean HSV color from a specific body region.

        Args:
            frame: BGR image.
            bbox: (x1, y1, x2, y2).
            region: One of "torso", "shorts", "shoes", "head", "hands".

        Returns:
            Mean HSV color as 3-element array.
        """
        x1, y1, x2, y2 = bbox
        h = y2 - y1
        w = x2 - x1

        regions = {
            "head": (0.2, 0.8, 0.0, 0.15),       # (x_start%, x_end%, y_start%, y_end%)
            "torso": (0.15, 0.85, 0.15, 0.50),
            "shorts": (0.15, 0.85, 0.50, 0.70),
            "shoes": (0.10, 0.90, 0.85, 1.00),
            "hands": (0.0, 1.0, 0.35, 0.55),      # wide to catch both hands
        }

        if region not in regions:
            return np.array([0.0, 0.0, 0.0])

        rx1_pct, rx2_pct, ry1_pct, ry2_pct = regions[region]
        rx1 = max(0, x1 + int(w * rx1_pct))
        rx2 = min(frame.shape[1], x1 + int(w * rx2_pct))
        ry1 = max(0, y1 + int(h * ry1_pct))
        ry2 = min(frame.shape[0], y1 + int(h * ry2_pct))

        if rx2 <= rx1 or ry2 <= ry1:
            return np.array([0.0, 0.0, 0.0])

        crop = frame[ry1:ry2, rx1:rx2]
        hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
        return hsv.reshape(-1, 3).mean(axis=0).astype(np.float32)

    @staticmethod
    def _cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
        """Compute cosine similarity between two vectors."""
        norm_a = np.linalg.norm(a)
        norm_b = np.linalg.norm(b)
        if norm_a < 1e-8 or norm_b < 1e-8:
            return 0.0
        return float(np.dot(a, b) / (norm_a * norm_b))

    # ── Persistence ───────────────────────────────────────────────

    def save_references(self, path: str) -> None:
        """Save reference descriptors to JSON."""
        data = {}
        for name, desc in self.reference_descriptors.items():
            data[name] = {
                "player_name": desc.player_name,
                "appearance_embedding": desc.appearance_embedding.tolist() if desc.appearance_embedding is not None else None,
                "avg_height_pixels": desc.avg_height_pixels,
                "avg_width_pixels": desc.avg_width_pixels,
                "aspect_ratio": desc.aspect_ratio,
                "relative_height": desc.relative_height,
                "jersey_color_hsv": list(desc.jersey_color_hsv),
                "shorts_color_hsv": list(desc.shorts_color_hsv),
                "shoe_color_hsv": list(desc.shoe_color_hsv),
                "has_headband": desc.has_headband,
                "has_gloves": desc.has_gloves,
                "glove_color_hsv": list(desc.glove_color_hsv),
                "has_sleeve": desc.has_sleeve,
                "sleeve_side": desc.sleeve_side,
                "avg_x_position": desc.avg_x_position,
                "avg_y_position": desc.avg_y_position,
                "position_cluster": desc.position_cluster,
                "sample_count": desc.sample_count,
            }
        Path(path).write_text(json.dumps(data, indent=2))

    @classmethod
    def load_references(cls, path: str, threshold: float = 0.65) -> "PlayerIdentificationSystem":
        """Load reference descriptors from JSON."""
        system = cls(similarity_threshold=threshold)
        data = json.loads(Path(path).read_text())

        for name, d in data.items():
            desc = PlayerDescriptor(
                player_name=d["player_name"],
                avg_height_pixels=d["avg_height_pixels"],
                avg_width_pixels=d["avg_width_pixels"],
                aspect_ratio=d["aspect_ratio"],
                relative_height=d["relative_height"],
                jersey_color_hsv=tuple(d["jersey_color_hsv"]),
                shorts_color_hsv=tuple(d["shorts_color_hsv"]),
                shoe_color_hsv=tuple(d["shoe_color_hsv"]),
                has_headband=d.get("has_headband", False),
                has_gloves=d.get("has_gloves", False),
                glove_color_hsv=tuple(d.get("glove_color_hsv", [0, 0, 0])),
                has_sleeve=d.get("has_sleeve", False),
                sleeve_side=d.get("sleeve_side", ""),
                avg_x_position=d.get("avg_x_position", 0.0),
                avg_y_position=d.get("avg_y_position", 0.0),
                position_cluster=d.get("position_cluster", ""),
                sample_count=d.get("sample_count", 0),
            )
            emb = d.get("appearance_embedding")
            if emb:
                desc.appearance_embedding = np.array(emb, dtype=np.float32)
            system.reference_descriptors[name] = desc

        return system
