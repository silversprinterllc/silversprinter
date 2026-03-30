"""
Data models for the flag football analysis system.

Pydantic models used by FastAPI and as the canonical data shapes
throughout the pipeline.  Corresponding SQL schemas are in models/sql.py.
"""

from __future__ import annotations

import enum
from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, Field


# ── Enums ──────────────────────────────────────────────────────────────

class Phase(str, enum.Enum):
    OFFENSE = "offense"
    DEFENSE = "defense"
    SPECIAL = "special"


class PlayResult(str, enum.Enum):
    COMPLETE = "complete"
    INCOMPLETE = "incomplete"
    RUSH = "rush"
    SACK = "sack"
    INTERCEPTION = "interception"
    TOUCHDOWN = "touchdown"
    PENALTY = "penalty"
    TURNOVER = "turnover"
    OTHER = "other"


class FormationTag(str, enum.Enum):
    TWO_BY_TWO = "2x2"
    THREE_BY_ONE = "3x1"
    TRIPS_RIGHT = "trips_right"
    TRIPS_LEFT = "trips_left"
    BUNCH_RIGHT = "bunch_right"
    BUNCH_LEFT = "bunch_left"
    STACK = "stack"
    EMPTY = "empty"
    COMPRESSED = "compressed"
    SPREAD = "spread"
    OTHER = "other"


class CoverageTag(str, enum.Enum):
    MAN = "man"
    COVER_2 = "cover_2"
    SINGLE_HIGH = "single_high"
    ZERO = "zero"
    QUARTERS = "quarters"
    UNKNOWN = "unknown"


# ── Core Entities ──────────────────────────────────────────────────────

class League(BaseModel):
    id: int
    name: str
    sport: str = "flag_football"
    format: str = "7v7"


class Season(BaseModel):
    id: int
    league_id: int
    name: str  # e.g. "Spring 2026"
    start_date: date
    end_date: Optional[date] = None


class Team(BaseModel):
    id: int
    league_id: int
    name: str
    primary_color_hsv: Optional[list[float]] = None  # [H, S, V] for jersey detection
    secondary_color_hsv: Optional[list[float]] = None


class Player(BaseModel):
    id: int
    team_id: int
    name: str
    jersey_number: Optional[int] = None
    position_label: Optional[str] = None  # "QB", "WR", "S", "CB", etc.
    appearance_embedding: Optional[list[float]] = None  # 128-dim ReID vector
    height_ratio: Optional[float] = None  # relative height signal
    gear_descriptor: Optional[dict] = None  # {"gloves": "red", "headband": true, ...}


class VideoAsset(BaseModel):
    id: int
    file_path: str
    original_filename: str
    duration_seconds: float
    fps: float
    width: int
    height: int
    recorded_date: date
    field_name: Optional[str] = None


class Game(BaseModel):
    id: int
    season_id: int
    video_asset_id: int
    home_team_id: int
    away_team_id: int
    game_date: date
    start_time_video: float  # seconds into the video asset
    end_time_video: float
    field_name: Optional[str] = None
    home_score: Optional[int] = None
    away_score: Optional[int] = None
    calibration_id: Optional[int] = None


class FieldCalibration(BaseModel):
    id: int
    field_name: str
    homography_matrix: list[list[float]]  # 3x3
    image_points: list[list[float]]  # pixel coords clicked by coach
    field_points: list[list[float]]  # corresponding real-world coords (yards)
    reference_frame_path: Optional[str] = None


class Play(BaseModel):
    id: int
    game_id: int
    play_number: int
    offense_team_id: int
    defense_team_id: int
    start_time: float  # seconds into video
    end_time: float
    down: Optional[int] = None  # 1-4
    distance: Optional[float] = None  # yards to go
    yard_line: Optional[float] = None  # 0-100 (own 0 to opp 0)
    result: Optional[PlayResult] = None
    yards_gained: Optional[float] = None
    is_pass: Optional[bool] = None
    is_rush: Optional[bool] = None
    has_motion: Optional[bool] = None
    formation_tag: Optional[FormationTag] = None
    coverage_tag: Optional[CoverageTag] = None
    blitz_detected: Optional[bool] = None
    notes: Optional[str] = None


class Drive(BaseModel):
    id: int
    game_id: int
    team_id: int
    drive_number: int
    start_play_id: int
    end_play_id: int
    start_yard_line: Optional[float] = None
    end_yard_line: Optional[float] = None
    result: Optional[str] = None  # "TD", "turnover", "punt", "end_of_half"
    play_count: int = 0


class TrackingPoint(BaseModel):
    """Per-frame position for one tracked person."""
    play_id: int
    track_id: int
    player_id: Optional[int] = None  # resolved after identity matching
    team_id: Optional[int] = None
    phase: Optional[Phase] = None  # offense/defense for this player this play
    frame_idx: int
    time_offset: float  # seconds from play start
    x_field: float  # yards across field (0 = left sideline)
    y_field: float  # yards down field (0 = own end zone)
    x_pixel: int
    y_pixel: int
    bbox_w: int
    bbox_h: int
    confidence: float


class PlayerAppearance(BaseModel):
    """Snapshot of a player's visual features for re-identification."""
    id: int
    player_id: int
    track_id: int
    game_id: int
    frame_idx: int
    embedding: list[float]  # 128-dim
    color_histogram: Optional[list[float]] = None
    bbox_crop_path: Optional[str] = None  # saved crop image


class Formation(BaseModel):
    id: int
    play_id: int
    team_id: int
    tag: FormationTag
    player_positions: list[dict]  # [{player_id, x, y, role_guess}]
    receiver_count_left: int = 0
    receiver_count_right: int = 0
    is_compressed: bool = False
    has_motion: bool = False


class Coverage(BaseModel):
    id: int
    play_id: int
    team_id: int
    tag: CoverageTag
    safety_count_deep: int = 0  # 0=zero, 1=single-high, 2=two-high
    blitz: bool = False
    rusher_count: int = 1  # default 1 rusher in flag
    notes: Optional[str] = None


class MatchupNote(BaseModel):
    id: int
    game_id: Optional[int] = None
    season_id: Optional[int] = None
    team_id: int  # the defense being scouted
    defender_player_id: int
    recommendation: str  # "attack" or "avoid"
    reason: str
    yards_per_target: Optional[float] = None
    completion_pct_allowed: Optional[float] = None
    big_plays_allowed: int = 0
    pass_breakups: int = 0
    interceptions: int = 0
    supporting_play_ids: list[int] = Field(default_factory=list)


class Clip(BaseModel):
    id: int
    video_asset_id: int
    play_id: Optional[int] = None
    start_time: float
    end_time: float
    label: Optional[str] = None
    clip_file_path: Optional[str] = None


class AnalyticsSummary(BaseModel):
    """Aggregated analytics for a team across a game or season."""
    id: int
    team_id: int
    game_id: Optional[int] = None
    season_id: Optional[int] = None
    offense_json: Optional[dict] = None  # full offensive tendency breakdown
    defense_json: Optional[dict] = None  # full defensive tendency breakdown
    playing_time_json: Optional[dict] = None  # per-player time stats
    matchup_notes: list[MatchupNote] = Field(default_factory=list)
    report_text: Optional[str] = None  # generated scouting report
    generated_at: Optional[datetime] = None


# ── Example JSON objects ───────────────────────────────────────────────

EXAMPLE_GAME = {
    "id": 1,
    "season_id": 1,
    "video_asset_id": 1,
    "home_team_id": 1,
    "away_team_id": 2,
    "game_date": "2026-03-28",
    "start_time_video": 3600.0,
    "end_time_video": 6000.0,
    "field_name": "Field 12",
    "home_score": 28,
    "away_score": 21,
    "calibration_id": 1,
}

EXAMPLE_PLAY = {
    "id": 42,
    "game_id": 1,
    "play_number": 15,
    "offense_team_id": 1,
    "defense_team_id": 2,
    "start_time": 4123.5,
    "end_time": 4130.2,
    "down": 2,
    "distance": 7.0,
    "yard_line": 35.0,
    "result": "complete",
    "yards_gained": 12.0,
    "is_pass": True,
    "is_rush": False,
    "has_motion": True,
    "formation_tag": "3x1",
    "coverage_tag": "single_high",
    "blitz_detected": False,
}

EXAMPLE_PLAYER = {
    "id": 7,
    "team_id": 1,
    "name": "Marcus Johnson",
    "jersey_number": None,  # unreadable — identified by appearance
    "position_label": "WR",
    "height_ratio": 1.05,
    "gear_descriptor": {
        "gloves": "white",
        "headband": True,
        "sleeve": "left_arm",
        "shoe_color": "black",
    },
}

EXAMPLE_FORMATION = {
    "id": 15,
    "play_id": 42,
    "team_id": 1,
    "tag": "3x1",
    "player_positions": [
        {"player_id": 1, "x": 26.5, "y": 35.0, "role_guess": "QB"},
        {"player_id": 2, "x": 26.5, "y": 34.0, "role_guess": "C"},
        {"player_id": 3, "x": 5.0, "y": 35.5, "role_guess": "WR_boundary"},
        {"player_id": 4, "x": 40.0, "y": 36.0, "role_guess": "WR_field"},
        {"player_id": 5, "x": 38.0, "y": 35.5, "role_guess": "WR_slot"},
        {"player_id": 6, "x": 42.0, "y": 35.0, "role_guess": "WR_wing"},
        {"player_id": 7, "x": 26.5, "y": 33.0, "role_guess": "RB"},
    ],
    "receiver_count_left": 1,
    "receiver_count_right": 3,
    "is_compressed": False,
    "has_motion": True,
}

EXAMPLE_COVERAGE = {
    "id": 15,
    "play_id": 42,
    "team_id": 2,
    "tag": "single_high",
    "safety_count_deep": 1,
    "blitz": False,
    "rusher_count": 1,
}

EXAMPLE_MATCHUP_NOTE = {
    "id": 3,
    "game_id": 1,
    "team_id": 2,
    "defender_player_id": 21,
    "recommendation": "attack",
    "reason": "Allows 9.2 yards/target on boundary routes, 78% completion allowed. "
              "Struggles with speed on vertical routes. Gave up 2 TDs in single-high.",
    "yards_per_target": 9.2,
    "completion_pct_allowed": 0.78,
    "big_plays_allowed": 3,
    "pass_breakups": 0,
    "interceptions": 0,
    "supporting_play_ids": [12, 27, 33, 41],
}
