"""
Penalty detection from tracking data.

Detects penalties by looking for these patterns:
1. EARLY WHISTLE: Play starts (explosion) but players stop and reset
   much faster than normal (< 2 seconds of action)
2. YARDAGE ROLLBACK: After a play, the next play's field position moves
   BACKWARD relative to the offense's direction (penalty yards assessed)
3. REPLAY DOWN: Same field position on consecutive plays without
   a possession change (dead ball foul, replay the down)
4. AUTOMATIC FIRST DOWN: Field position jumps forward to next zone
   line without the offense actually crossing it (roughing the passer)

WCFL-specific penalties to detect:
- Flag guarding (offensive, loss of down + yardage)
- Screening/impeding the rusher (offensive, loss of down)
- Offsides/encroachment (defensive, replay down)
- Pass interference (spot foul or yardage)
- Roughing the passer (automatic first down)
- Personal foul (10 yards)
- Unsportsmanlike conduct (10 yards)
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional


@dataclass
class PenaltyEvent:
    play_number: int
    timestamp: str
    penalty_type: str
    on_team: str  # "offense" or "defense"
    estimated_yards: float
    confidence: float  # 0-1
    evidence: str


class PenaltyDetector:
    """Detect penalties from play-by-play tracking data."""

    def __init__(
        self,
        min_rollback_yards: float = 5.0,
        short_play_threshold: float = 1.5,
    ):
        self.min_rollback = min_rollback_yards
        self.short_play = short_play_threshold

    def detect_penalties(
        self,
        plays: list[dict],
        drives: list[dict],
    ) -> list[PenaltyEvent]:
        """Scan play-by-play data for penalty signatures.

        Args:
            plays: List of play dicts with time, yard_line, gain, duration, etc.
            drives: List of drive dicts for context.

        Returns:
            List of detected PenaltyEvent objects.
        """
        penalties = []

        for i in range(1, len(plays)):
            prev = plays[i - 1]
            curr = plays[i]

            # Same drive check
            same_drive = curr.get("offense") == prev.get("offense")

            if same_drive:
                # Pattern 1: Yardage rollback within a drive
                # If the offense LOSES more than 5 yards between consecutive plays
                # AND the down resets to 1st, it might be a penalty with loss of down
                gain = curr.get("gain", 0)
                if gain < -self.min_rollback:
                    # Big loss could be: sack, penalty, or bad play
                    # If it's a penalty, the down might reset
                    if curr.get("down", 0) == 1 and prev.get("down", 0) != 4:
                        penalties.append(PenaltyEvent(
                            play_number=curr.get("play", i),
                            timestamp=curr.get("time", ""),
                            penalty_type="Possible Penalty (yardage + down reset)",
                            on_team="offense",
                            estimated_yards=abs(gain),
                            confidence=0.4,
                            evidence=f"Lost {abs(gain):.0f} yards and down reset to 1st",
                        ))

                # Pattern 2: Very short play duration (< 1.5s)
                # Normal plays are 3-7s. A play that lasts < 1.5s was likely
                # called dead immediately — false start, offsides, etc.
                duration = curr.get("duration", 5)
                if duration < self.short_play:
                    penalties.append(PenaltyEvent(
                        play_number=curr.get("play", i),
                        timestamp=curr.get("time", ""),
                        penalty_type="Possible Dead Ball Foul (very short play)",
                        on_team="unknown",
                        estimated_yards=0,
                        confidence=0.3,
                        evidence=f"Play lasted only {duration:.1f}s — likely whistle before/at snap",
                    ))

                # Pattern 3: Same yard line, same down repeated
                # If two consecutive plays have the same yard and same down,
                # a dead ball foul was called and the down was replayed
                if (abs(curr.get("yard_line", 0) - prev.get("yard_line", 0)) < 2
                    and curr.get("down") == prev.get("down")
                    and curr.get("down", 0) > 0):
                    penalties.append(PenaltyEvent(
                        play_number=curr.get("play", i),
                        timestamp=curr.get("time", ""),
                        penalty_type="Possible Replayed Down (dead ball foul)",
                        on_team="unknown",
                        estimated_yards=0,
                        confidence=0.35,
                        evidence=f"Same yard line ({curr.get('yard_line',0):.0f}) and same down ({curr.get('down')}) as previous play",
                    ))

            else:
                # Possession change — check for penalty on the turnover
                # If the field position shifts in the WRONG direction for the
                # new offense (they start further back than expected), the
                # previous play may have had a penalty assessed
                pass

        return penalties

    def summarize(self, penalties: list[PenaltyEvent]) -> str:
        """Generate a text summary of detected penalties."""
        if not penalties:
            return "No penalties detected with high confidence."

        lines = [f"PENALTY DETECTION: {len(penalties)} possible penalties flagged"]
        lines.append("")

        for p in penalties:
            conf_str = "LOW" if p.confidence < 0.4 else ("MED" if p.confidence < 0.7 else "HIGH")
            lines.append(f"  Play {p.play_number} ({p.timestamp}): {p.penalty_type}")
            lines.append(f"    Evidence: {p.evidence}")
            lines.append(f"    Confidence: {conf_str} ({p.confidence:.0%})")
            lines.append("")

        return "\n".join(lines)
