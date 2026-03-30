"""
Manual game input — coach provides the game narrative that
the CV system can't detect (scores, turnovers, key plays).

This is the product workflow:
1. CV processes the video → formations, coverages, player tracking
2. Coach fills in game events → scores, turnovers, down/distance, key plays
3. System merges both → premium scouting report with full context

This file defines the input schema for coach-provided game data.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class GameEvent:
    """A significant game event provided by the coach."""
    timestamp: str          # "MM:SS" in video time
    event_type: str         # "touchdown", "interception", "turnover_on_downs",
                            # "punt", "safety", "penalty", "fumble", "pick_six",
                            # "first_down", "field_goal", "extra_point", "2pt_conversion"
    team: str               # which team this event belongs to
    description: str        # coach's description
    play_number: Optional[int] = None  # which play number this maps to
    points: int = 0         # points scored on this event


@dataclass
class GameInput:
    """Complete coach-provided game context."""
    # Teams
    our_team: str
    opponent: str
    our_color: str
    opponent_color: str

    # Final score
    our_score: int
    opponent_score: int

    # Game events (chronological)
    events: list[GameEvent] = field(default_factory=list)

    # Possessions — coach can override the auto-detected drives
    # Each possession: {"team": "Gators", "result": "TD", "plays": 5, "notes": "..."}
    possessions: list[dict] = field(default_factory=list)

    # Coach notes
    key_takeaways: list[str] = field(default_factory=list)
    areas_to_improve: list[str] = field(default_factory=list)

    # Game context
    game_format: str = "7v7"
    league: str = "WCFL"
    field_name: str = "Field 12"
    game_date: str = ""
    weather: str = ""
    referee_notes: str = ""


# ── Game 1 Actual Data (from coach) ──────────────────────────────

GAME_1_INPUT = GameInput(
    our_team="Gators",
    opponent="Tennessee",
    our_color="Blue",
    opponent_color="White",
    our_score=0,    # PLACEHOLDER — coach to fill
    opponent_score=0,  # PLACEHOLDER — coach to fill
    game_format="7v7",
    league="WCFL",
    field_name="Field 12",
    game_date="March 28, 2026",

    events=[
        # Coach-provided events from the game
        # These will be filled in by the coach
    ],

    key_takeaways=[
        "We moved the ball well overall",
        "Had a pick six on defense",
        "Turned it over on downs twice",
        "One punt to flip field position",
        "Threw one interception",
        "4 plays away from this being a blowout",
    ],

    areas_to_improve=[
        "Convert on 4th down situations",
        "Protect the ball — eliminate the interception",
        "Finish drives — too many stalls near the red zone",
    ],
)
