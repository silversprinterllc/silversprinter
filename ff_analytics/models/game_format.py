"""
Game format configuration — supports 5v5, 7v7, and 11v11 football.

Each format defines field dimensions, player count expectations,
position labels, formation templates, and analysis thresholds.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Optional


class GameFormat(str, Enum):
    FIVE_V_FIVE = "5v5"
    SEVEN_V_SEVEN = "7v7"
    EIGHT_V_EIGHT = "8v8"
    ELEVEN_V_ELEVEN = "11v11"


@dataclass
class FormatConfig:
    """Configuration for a specific game format."""

    format: GameFormat
    players_per_side: int
    field_width_yards: float
    field_length_yards: float
    end_zone_depth_yards: float
    has_kickoffs: bool
    has_punts: bool
    has_rushing: bool  # some flag leagues are pass-only
    has_center_snap: bool
    rush_count_default: int  # default number of pass rushers
    max_receivers: int  # max eligible receivers per play

    # Position labels for this format
    offensive_positions: list[str] = field(default_factory=list)
    defensive_positions: list[str] = field(default_factory=list)

    # Formation templates
    formation_templates: dict[str, dict] = field(default_factory=dict)

    # Tracking thresholds (tuned per format)
    min_players_on_field: int = 4  # minimum to consider a valid play frame
    max_players_on_field: int = 22  # max expected (both teams)
    play_motion_threshold: float = 15.0  # motion energy threshold for play detection
    min_play_duration_seconds: float = 2.0
    min_dead_ball_seconds: float = 3.0

    # Field zones for tendency analysis
    field_zones: dict[str, tuple[float, float]] = field(default_factory=dict)

    # Division-specific rules
    coaches_on_field: bool = False  # Only Ultimate & Girls Jr have coaches on field

    # Pricing tier for SaaS
    report_price_usd: float = 25.0


# ── Pre-built Format Configs ─────────────────────────────────────

FIVE_V_FIVE = FormatConfig(
    format=GameFormat.FIVE_V_FIVE,
    players_per_side=5,
    field_width_yards=25.0,
    field_length_yards=60.0,
    end_zone_depth_yards=7.0,
    has_kickoffs=False,
    has_punts=False,
    has_rushing=False,  # most 5v5 is pass-only
    has_center_snap=False,  # usually direct snap or shotgun
    rush_count_default=1,
    max_receivers=4,
    offensive_positions=["QB", "WR1", "WR2", "WR3", "C"],
    defensive_positions=["Rusher", "CB1", "CB2", "S1", "S2"],
    formation_templates={
        "2x2": {"receivers_left": 2, "receivers_right": 2},
        "3x1": {"receivers_left": 1, "receivers_right": 3},
        "1x3": {"receivers_left": 3, "receivers_right": 1},
        "stack": {"receivers_left": 0, "receivers_right": 0, "stacked": True},
        "empty": {"receivers_left": 2, "receivers_right": 2, "no_backfield": True},
    },
    min_players_on_field=6,  # 5v5 = 10 total
    max_players_on_field=12,
    play_motion_threshold=12.0,
    min_play_duration_seconds=1.5,
    min_dead_ball_seconds=2.5,
    field_zones={
        "own_territory": (0, 25),
        "midfield": (25, 40),
        "red_zone": (40, 53),
        "goal_line": (53, 60),
    },
    report_price_usd=15.0,
)

SEVEN_V_SEVEN = FormatConfig(
    format=GameFormat.SEVEN_V_SEVEN,
    players_per_side=7,
    field_width_yards=40.0,
    field_length_yards=70.0,
    end_zone_depth_yards=10.0,
    has_kickoffs=False,
    has_punts=False,
    has_rushing=True,
    has_center_snap=True,
    rush_count_default=1,
    max_receivers=5,
    offensive_positions=["QB", "C", "WR1", "WR2", "WR3", "WR4", "RB"],
    defensive_positions=["Rusher", "CB1", "CB2", "CB3", "LB", "S1", "S2"],
    formation_templates={
        "2x2": {"receivers_left": 2, "receivers_right": 2},
        "3x1": {"receivers_left": 1, "receivers_right": 3},
        "trips_right": {"receivers_left": 0, "receivers_right": 3, "tight": False},
        "trips_left": {"receivers_left": 3, "receivers_right": 0, "tight": False},
        "bunch_right": {"receivers_left": 0, "receivers_right": 3, "tight": True},
        "bunch_left": {"receivers_left": 3, "receivers_right": 0, "tight": True},
        "empty": {"receivers_left": 3, "receivers_right": 3, "no_backfield": True},
        "stack": {"stacked": True},
        "compressed": {"spread": False},
        "spread": {"spread": True},
    },
    min_players_on_field=10,
    max_players_on_field=16,
    play_motion_threshold=15.0,
    min_play_duration_seconds=2.0,
    min_dead_ball_seconds=3.0,
    field_zones={
        "own_territory": (0, 30),
        "midfield": (30, 45),
        "red_zone": (45, 60),
        "goal_line": (60, 70),
    },
    report_price_usd=25.0,
)

EIGHT_V_EIGHT = FormatConfig(
    format=GameFormat.EIGHT_V_EIGHT,
    players_per_side=8,
    field_width_yards=53.3,
    field_length_yards=80.0,
    end_zone_depth_yards=10.0,
    has_kickoffs=False,
    has_punts=True,
    has_rushing=True,
    has_center_snap=True,
    rush_count_default=1,
    max_receivers=6,
    offensive_positions=["QB", "C", "WR1", "WR2", "WR3", "WR4", "WR5", "RB"],
    defensive_positions=["Rusher", "CB1", "CB2", "CB3", "LB1", "LB2", "S1", "S2"],
    formation_templates={
        "2x2": {"receivers_left": 2, "receivers_right": 2},
        "3x1": {"receivers_left": 1, "receivers_right": 3},
        "3x2": {"receivers_left": 2, "receivers_right": 3},
        "trips_right": {"receivers_left": 0, "receivers_right": 3},
        "trips_left": {"receivers_left": 3, "receivers_right": 0},
        "empty": {"no_backfield": True},
        "bunch": {"tight": True},
        "spread": {"spread": True},
    },
    min_players_on_field=12,
    max_players_on_field=18,
    play_motion_threshold=15.0,
    field_zones={
        "own_territory": (0, 35),
        "midfield": (35, 50),
        "red_zone": (50, 70),
        "goal_line": (70, 80),
    },
    report_price_usd=30.0,
)

ELEVEN_V_ELEVEN = FormatConfig(
    format=GameFormat.ELEVEN_V_ELEVEN,
    players_per_side=11,
    field_width_yards=53.3,
    field_length_yards=100.0,
    end_zone_depth_yards=10.0,
    has_kickoffs=True,
    has_punts=True,
    has_rushing=True,
    has_center_snap=True,
    rush_count_default=4,
    max_receivers=5,
    offensive_positions=[
        "QB", "C", "LG", "RG", "LT", "RT",
        "WR1", "WR2", "WR3", "TE", "RB",
    ],
    defensive_positions=[
        "DE1", "DE2", "DT1", "DT2",
        "LB1", "LB2", "LB3",
        "CB1", "CB2", "S1", "S2",
    ],
    formation_templates={
        "11_personnel": {"te": 1, "rb": 1, "wr": 3},
        "12_personnel": {"te": 2, "rb": 1, "wr": 2},
        "21_personnel": {"te": 1, "rb": 2, "wr": 2},
        "10_personnel": {"te": 0, "rb": 1, "wr": 4},
        "00_personnel": {"te": 0, "rb": 0, "wr": 5},
        "shotgun": {"formation": "shotgun"},
        "under_center": {"formation": "under_center"},
        "i_form": {"formation": "i_formation"},
        "pistol": {"formation": "pistol"},
    },
    min_players_on_field=18,
    max_players_on_field=24,
    play_motion_threshold=20.0,
    min_play_duration_seconds=3.0,
    min_dead_ball_seconds=5.0,
    field_zones={
        "own_territory": (0, 40),
        "midfield": (40, 60),
        "red_zone": (60, 80),
        "goal_line": (80, 100),
    },
    report_price_usd=50.0,
)


FORMAT_CONFIGS: dict[str, FormatConfig] = {
    "5v5": FIVE_V_FIVE,
    "7v7": SEVEN_V_SEVEN,
    "8v8": EIGHT_V_EIGHT,
    "11v11": ELEVEN_V_ELEVEN,
}


def get_format_config(format_str: str) -> FormatConfig:
    """Get format configuration by string identifier.

    Args:
        format_str: One of "5v5", "7v7", "8v8", "11v11".

    Returns:
        FormatConfig for the specified format.

    Raises:
        ValueError: If format string is not recognized.
    """
    config = FORMAT_CONFIGS.get(format_str.lower())
    if config is None:
        valid = ", ".join(FORMAT_CONFIGS.keys())
        raise ValueError(f"Unknown format '{format_str}'. Valid: {valid}")
    return config
