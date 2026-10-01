-- Migration: Opportunities & Challenges Deep Dive

CREATE TABLE IF NOT EXISTS player_opportunities_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES players(id),
    season INTEGER NOT NULL,
    week INTEGER NOT NULL,
    
    -- Schedule Strength (Scale 1-10)
    schedule_strength_score NUMERIC(3, 1),
    rest_advantage_days INTEGER,
    upcoming_opponents TEXT[],
    
    -- O-Line Strength
    oline_run_blocking_grade NUMERIC(4, 1),
    oline_pass_blocking_grade NUMERIC(4, 1),
    adjusted_line_yards NUMERIC(4, 2),
    
    -- Opposing Defense Profile
    opp_def_overall_rank INTEGER,
    opp_def_position_rank INTEGER, -- Rank against this player's specific position
    opp_def_epa_per_play NUMERIC(4, 2),
    
    -- Extracted Positives/Negatives (JSON arrays of strings)
    positives JSONB DEFAULT '[]'::jsonb,
    negatives JSONB DEFAULT '[]'::jsonb,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(player_id, season, week)
);

-- RLS
ALTER TABLE player_opportunities_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on player_opportunities_challenges" ON player_opportunities_challenges FOR SELECT USING (true);
CREATE POLICY "Allow service role full access on player_opportunities_challenges" ON player_opportunities_challenges USING (auth.role() = 'service_role');
