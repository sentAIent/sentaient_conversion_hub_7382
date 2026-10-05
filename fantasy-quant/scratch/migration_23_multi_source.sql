CREATE TABLE IF NOT EXISTS yahoo_projections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    week INT NOT NULL,
    season INT NOT NULL,
    projected_pts DECIMAL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(player_id, week, season)
);

CREATE TABLE IF NOT EXISTS espn_projections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    week INT NOT NULL,
    season INT NOT NULL,
    projected_pts DECIMAL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(player_id, week, season)
);

CREATE TABLE IF NOT EXISTS cbs_projections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    week INT NOT NULL,
    season INT NOT NULL,
    projected_pts DECIMAL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(player_id, week, season)
);

-- Enable RLS
ALTER TABLE yahoo_projections ENABLE ROW LEVEL SECURITY;
ALTER TABLE espn_projections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cbs_projections ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users on yahoo_projections" ON yahoo_projections FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users on espn_projections" ON espn_projections FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users on cbs_projections" ON cbs_projections FOR SELECT USING (true);

