-- Strength of Schedule, Defensive Injury Impacts, & Scheme Matchups

-- 1. Create strength_of_schedule table
CREATE TABLE IF NOT EXISTS public.strength_of_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
    season INT NOT NULL,
    historical_sos_rank INT,
    historical_player_rank INT,
    upcoming_sos_rank INT,
    upcoming_adjusted_score NUMERIC,
    schedule_delta TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create defensive_injury_impacts table
CREATE TABLE IF NOT EXISTS public.defensive_injury_impacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team TEXT NOT NULL,
    injured_player_name TEXT NOT NULL,
    position TEXT NOT NULL,
    injury_status TEXT NOT NULL,
    scheme_adjustment TEXT NOT NULL,
    positional_impacts JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create scheme_matchup_stats table
CREATE TABLE IF NOT EXISTS public.scheme_matchup_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    offense_scheme TEXT NOT NULL,
    defense_scheme TEXT NOT NULL,
    success_rate NUMERIC NOT NULL,
    average_epa NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(offense_scheme, defense_scheme)
);

-- Enable RLS
ALTER TABLE public.strength_of_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.defensive_injury_impacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_matchup_stats ENABLE ROW LEVEL SECURITY;

-- Allow read access for anyone
CREATE POLICY "Allow anonymous read access on strength_of_schedule" ON public.strength_of_schedule FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access on defensive_injury_impacts" ON public.defensive_injury_impacts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access on scheme_matchup_stats" ON public.scheme_matchup_stats FOR SELECT USING (true);
