-- update_schema_injuries.sql
CREATE TABLE IF NOT EXISTS player_injuries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    season INTEGER NOT NULL,
    week INTEGER NOT NULL,
    practice_status VARCHAR(50),
    game_status VARCHAR(50),
    injury_type VARCHAR(100),
    play_probability NUMERIC,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE (player_id, season, week)
);

-- Enable RLS
ALTER TABLE player_injuries ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on player_injuries"
    ON player_injuries FOR SELECT
    USING (true);

-- Allow service role full access
CREATE POLICY "Allow service role full access on player_injuries"
    ON player_injuries FOR ALL
    USING (true)
    WITH CHECK (true);
