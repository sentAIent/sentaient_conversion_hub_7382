CREATE TABLE IF NOT EXISTS defensive_matchups (
    id SERIAL PRIMARY KEY,
    team VARCHAR(10) NOT NULL,
    season INT NOT NULL,
    week INT NOT NULL,
    position VARCHAR(5) NOT NULL,
    matchup_rank INT,
    cb_shadow_player VARCHAR(100),
    man_coverage_pct DECIMAL(5,2),
    zone_coverage_pct DECIMAL(5,2),
    primary_shell VARCHAR(50),
    secondary_shell VARCHAR(50),
    grade_man DECIMAL(5,2),
    grade_zone DECIMAL(5,2),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team, season, week, position)
);

CREATE TABLE IF NOT EXISTS game_environment (
    id SERIAL PRIMARY KEY,
    game_id VARCHAR(20) NOT NULL,
    temperature INT,
    weather_condition VARCHAR(50),
    wind_speed INT,
    surface VARCHAR(50),
    stadium_type VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(game_id)
);
