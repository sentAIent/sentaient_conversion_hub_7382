-- Migration: SAPE Projections Table
-- Description: Creates the new rigorous projections schema for the Sentaient Advanced Projection Engine

CREATE TABLE IF NOT EXISTS public.player_projections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    player_id TEXT NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    season INTEGER NOT NULL,
    week INTEGER NOT NULL,
    league_type TEXT NOT NULL, -- 'DFS' or 'SEASON'
    
    -- Volume & Methodology Base
    base_expected_volume_opportunities NUMERIC(5,2),
    
    -- Calculated Projections
    base_projection_ppr NUMERIC(5,2) NOT NULL,
    adjusted_projection_ppr NUMERIC(5,2) NOT NULL,
    floor_ppr NUMERIC(5,2) NOT NULL,
    ceiling_ppr NUMERIC(5,2) NOT NULL,
    
    -- Multiplier Log (JSONB to store the math trail)
    modifier_trail JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique projections per player per week per league type
    UNIQUE(player_id, season, week, league_type)
);

-- RLS Policies
ALTER TABLE public.player_projections ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users (or anon if public)
CREATE POLICY "Allow public read access on player_projections"
    ON public.player_projections
    FOR SELECT
    USING (true);

-- Allow service role to manage projections
CREATE POLICY "Allow service role full access on player_projections"
    ON public.player_projections
    USING (auth.jwt() ->> 'role' = 'service_role');
