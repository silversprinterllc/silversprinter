"""
PostgreSQL table schemas for the flag football analysis system.

Run these CREATE statements against a Postgres database, or use
them as reference for an ORM migration (SQLAlchemy / Alembic).
"""

SQL_SCHEMA = """
-- ============================================================
-- Flag Football Film Analysis — Database Schema (Postgres)
-- ============================================================

CREATE TABLE IF NOT EXISTS leagues (
    id            SERIAL PRIMARY KEY,
    name          TEXT NOT NULL,
    sport         TEXT NOT NULL DEFAULT 'flag_football',
    format        TEXT NOT NULL DEFAULT '7v7'
);

CREATE TABLE IF NOT EXISTS seasons (
    id            SERIAL PRIMARY KEY,
    league_id     INT NOT NULL REFERENCES leagues(id),
    name          TEXT NOT NULL,
    start_date    DATE NOT NULL,
    end_date      DATE
);

CREATE TABLE IF NOT EXISTS teams (
    id              SERIAL PRIMARY KEY,
    league_id       INT NOT NULL REFERENCES leagues(id),
    name            TEXT NOT NULL,
    primary_color   JSONB,   -- {h, s, v}
    secondary_color JSONB
);

CREATE TABLE IF NOT EXISTS players (
    id                    SERIAL PRIMARY KEY,
    team_id               INT NOT NULL REFERENCES teams(id),
    name                  TEXT NOT NULL,
    jersey_number         INT,
    position_label        TEXT,
    appearance_embedding  FLOAT8[],      -- 128-dim ReID vector
    height_ratio          FLOAT8,
    gear_descriptor       JSONB          -- {"gloves":"red","headband":true,...}
);

CREATE TABLE IF NOT EXISTS video_assets (
    id                SERIAL PRIMARY KEY,
    file_path         TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    duration_seconds  FLOAT8 NOT NULL,
    fps               FLOAT8 NOT NULL,
    width             INT NOT NULL,
    height            INT NOT NULL,
    recorded_date     DATE NOT NULL,
    field_name        TEXT
);

CREATE TABLE IF NOT EXISTS field_calibrations (
    id                  SERIAL PRIMARY KEY,
    field_name          TEXT NOT NULL,
    homography_matrix   FLOAT8[][] NOT NULL,  -- 3x3
    image_points        FLOAT8[][] NOT NULL,
    field_points        FLOAT8[][] NOT NULL,
    reference_frame_path TEXT
);

CREATE TABLE IF NOT EXISTS games (
    id                SERIAL PRIMARY KEY,
    season_id         INT NOT NULL REFERENCES seasons(id),
    video_asset_id    INT NOT NULL REFERENCES video_assets(id),
    home_team_id      INT NOT NULL REFERENCES teams(id),
    away_team_id      INT NOT NULL REFERENCES teams(id),
    game_date         DATE NOT NULL,
    start_time_video  FLOAT8 NOT NULL,
    end_time_video    FLOAT8 NOT NULL,
    field_name        TEXT,
    home_score        INT,
    away_score        INT,
    calibration_id    INT REFERENCES field_calibrations(id)
);

CREATE TABLE IF NOT EXISTS plays (
    id                SERIAL PRIMARY KEY,
    game_id           INT NOT NULL REFERENCES games(id),
    play_number       INT NOT NULL,
    offense_team_id   INT NOT NULL REFERENCES teams(id),
    defense_team_id   INT NOT NULL REFERENCES teams(id),
    start_time        FLOAT8 NOT NULL,
    end_time          FLOAT8 NOT NULL,
    down              INT,
    distance          FLOAT8,
    yard_line         FLOAT8,
    result            TEXT,
    yards_gained      FLOAT8,
    is_pass           BOOLEAN,
    is_rush           BOOLEAN,
    has_motion        BOOLEAN,
    formation_tag     TEXT,
    coverage_tag      TEXT,
    blitz_detected    BOOLEAN,
    notes             TEXT
);

CREATE TABLE IF NOT EXISTS drives (
    id                SERIAL PRIMARY KEY,
    game_id           INT NOT NULL REFERENCES games(id),
    team_id           INT NOT NULL REFERENCES teams(id),
    drive_number      INT NOT NULL,
    start_play_id     INT REFERENCES plays(id),
    end_play_id       INT REFERENCES plays(id),
    start_yard_line   FLOAT8,
    end_yard_line     FLOAT8,
    result            TEXT,
    play_count        INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tracking_points (
    id          BIGSERIAL PRIMARY KEY,
    play_id     INT NOT NULL REFERENCES plays(id),
    track_id    INT NOT NULL,
    player_id   INT REFERENCES players(id),
    team_id     INT REFERENCES teams(id),
    phase       TEXT,
    frame_idx   INT NOT NULL,
    time_offset FLOAT8 NOT NULL,
    x_field     FLOAT8 NOT NULL,
    y_field     FLOAT8 NOT NULL,
    x_pixel     INT NOT NULL,
    y_pixel     INT NOT NULL,
    bbox_w      INT NOT NULL,
    bbox_h      INT NOT NULL,
    confidence  FLOAT8 NOT NULL
);

-- Index for fast per-play lookups
CREATE INDEX IF NOT EXISTS idx_tracking_play ON tracking_points(play_id);
CREATE INDEX IF NOT EXISTS idx_tracking_player ON tracking_points(player_id);

CREATE TABLE IF NOT EXISTS player_appearances (
    id              SERIAL PRIMARY KEY,
    player_id       INT NOT NULL REFERENCES players(id),
    track_id        INT NOT NULL,
    game_id         INT NOT NULL REFERENCES games(id),
    frame_idx       INT NOT NULL,
    embedding       FLOAT8[] NOT NULL,
    color_histogram FLOAT8[],
    bbox_crop_path  TEXT
);

CREATE TABLE IF NOT EXISTS formations (
    id                      SERIAL PRIMARY KEY,
    play_id                 INT NOT NULL REFERENCES plays(id),
    team_id                 INT NOT NULL REFERENCES teams(id),
    tag                     TEXT NOT NULL,
    player_positions        JSONB NOT NULL,
    receiver_count_left     INT DEFAULT 0,
    receiver_count_right    INT DEFAULT 0,
    is_compressed           BOOLEAN DEFAULT FALSE,
    has_motion              BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS coverages (
    id                SERIAL PRIMARY KEY,
    play_id           INT NOT NULL REFERENCES plays(id),
    team_id           INT NOT NULL REFERENCES teams(id),
    tag               TEXT NOT NULL,
    safety_count_deep INT DEFAULT 0,
    blitz             BOOLEAN DEFAULT FALSE,
    rusher_count      INT DEFAULT 1,
    notes             TEXT
);

CREATE TABLE IF NOT EXISTS matchup_notes (
    id                    SERIAL PRIMARY KEY,
    game_id               INT REFERENCES games(id),
    season_id             INT REFERENCES seasons(id),
    team_id               INT NOT NULL REFERENCES teams(id),
    defender_player_id    INT NOT NULL REFERENCES players(id),
    recommendation        TEXT NOT NULL,
    reason                TEXT NOT NULL,
    yards_per_target      FLOAT8,
    completion_pct_allowed FLOAT8,
    big_plays_allowed     INT DEFAULT 0,
    pass_breakups         INT DEFAULT 0,
    interceptions         INT DEFAULT 0,
    supporting_play_ids   INT[]
);

CREATE TABLE IF NOT EXISTS clips (
    id              SERIAL PRIMARY KEY,
    video_asset_id  INT NOT NULL REFERENCES video_assets(id),
    play_id         INT REFERENCES plays(id),
    start_time      FLOAT8 NOT NULL,
    end_time        FLOAT8 NOT NULL,
    label           TEXT,
    clip_file_path  TEXT
);

CREATE TABLE IF NOT EXISTS analytics_summaries (
    id                SERIAL PRIMARY KEY,
    team_id           INT NOT NULL REFERENCES teams(id),
    game_id           INT REFERENCES games(id),
    season_id         INT REFERENCES seasons(id),
    offense_json      JSONB,
    defense_json      JSONB,
    playing_time_json JSONB,
    report_text       TEXT,
    generated_at      TIMESTAMPTZ DEFAULT NOW()
);
""".strip()


def get_schema_sql() -> str:
    """Return the full SQL schema string."""
    return SQL_SCHEMA
