-- Defensive Matchups Schema Setup
-- Run this in your Supabase SQL Editor

DROP TABLE IF EXISTS player_matchups;
DROP TABLE IF EXISTS team_coverage_tendencies;

CREATE TABLE team_coverage_tendencies (
    id SERIAL PRIMARY KEY,
    team VARCHAR(10) NOT NULL,
    season INT NOT NULL,
    week INT NOT NULL,
    man_pct DECIMAL(5,2),
    zone_pct DECIMAL(5,2),
    primary_shell VARCHAR(50),
    coverage_breakdown JSONB,
    adjusted_coverage_breakdown JSONB,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team, season, week)
);

CREATE TABLE player_matchups (
    id SERIAL PRIMARY KEY,
    player_id VARCHAR(50) NOT NULL,
    game_id VARCHAR(50) NOT NULL,
    matchup_rank INT,
    cb_shadow VARCHAR(100),
    individual_matchups JSONB,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(player_id, game_id)
);

-- RLS Policies
ALTER TABLE team_coverage_tendencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_matchups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow public read access" ON team_coverage_tendencies FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON player_matchups FOR SELECT USING (true);
