-- Migration 12: Coordinators and Scheme Analysis

-- Coaches Master Table
CREATE TABLE IF NOT EXISTS coaches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coach_name TEXT NOT NULL,
    team TEXT NOT NULL,
    season INT NOT NULL,
    role TEXT NOT NULL, -- 'HC', 'OC', 'DC'
    UNIQUE(coach_name, team, season, role)
);

-- Scheme Stats (Aggregated at the season level for coverage success)
CREATE TABLE IF NOT EXISTS scheme_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coach_name TEXT NOT NULL,
    team TEXT NOT NULL,
    season INT NOT NULL,
    role TEXT NOT NULL, -- 'OC' or 'DC'
    coverage_type TEXT NOT NULL, -- 'Cover 1', 'Cover 2', 'Cover 3', 'Quarters', 'Man', etc.
    play_type TEXT NOT NULL, -- 'pass' or 'run'
    plays INT NOT NULL DEFAULT 0,
    success_rate NUMERIC NOT NULL DEFAULT 0, -- % of plays with positive EPA
    epa_per_play NUMERIC NOT NULL DEFAULT 0,
    yards_per_play NUMERIC NOT NULL DEFAULT 0,
    UNIQUE(coach_name, season, coverage_type, play_type)
);

-- Game Logs for Scheme Analysis (Weekly breakdown)
CREATE TABLE IF NOT EXISTS scheme_game_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coach_name TEXT NOT NULL,
    team TEXT NOT NULL,
    season INT NOT NULL,
    week INT NOT NULL,
    role TEXT NOT NULL, -- 'OC' or 'DC'
    opponent TEXT NOT NULL,
    opposing_coordinator TEXT, -- The name of the opposing DC if the coach is an OC
    predominant_coverage TEXT, -- The coverage they faced the most in this game
    offensive_plays INT NOT NULL DEFAULT 0,
    success_rate NUMERIC NOT NULL DEFAULT 0,
    epa_per_play NUMERIC NOT NULL DEFAULT 0,
    fantasy_pts_qb NUMERIC DEFAULT 0,
    fantasy_pts_rb NUMERIC DEFAULT 0,
    fantasy_pts_wr NUMERIC DEFAULT 0,
    fantasy_pts_te NUMERIC DEFAULT 0,
    UNIQUE(coach_name, season, week)
);

-- Enable RLS
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheme_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheme_game_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read on coaches" ON coaches FOR SELECT USING (true);
CREATE POLICY "Allow public read on scheme_stats" ON scheme_stats FOR SELECT USING (true);
CREATE POLICY "Allow public read on scheme_game_logs" ON scheme_game_logs FOR SELECT USING (true);

-- Allow service role full access
CREATE POLICY "Allow service role full access on coaches" ON coaches USING (auth.role() = 'service_role');
CREATE POLICY "Allow service role full access on scheme_stats" ON scheme_stats USING (auth.role() = 'service_role');
CREATE POLICY "Allow service role full access on scheme_game_logs" ON scheme_game_logs USING (auth.role() = 'service_role');
