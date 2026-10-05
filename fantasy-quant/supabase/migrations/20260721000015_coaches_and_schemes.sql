-- Coaches, Schemes, and Scheme-Fit Evaluations

-- 1. Create coaches table
CREATE TABLE IF NOT EXISTS public.coaches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL, -- 'HC', 'OC', 'DC', 'OLINE', 'WR', 'DB' etc.
    team TEXT NOT NULL,
    experience_years INT,
    offensive_style TEXT, -- West Coast, Air Raid, Wide Zone, etc.
    defensive_style TEXT, -- 3-4 Under, 4-2-5 Nickel, etc.
    scheme_details JSONB DEFAULT '{}'::jsonb, -- run/pass ratio, blitz rate, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create coaching_contracts table
CREATE TABLE IF NOT EXISTS public.coaching_contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coach_id UUID REFERENCES public.coaches(id) ON DELETE CASCADE,
    signed_year INT NOT NULL,
    years INT NOT NULL,
    total_value NUMERIC,
    aav NUMERIC,
    buyout_terms TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create player_scheme_evaluations table
CREATE TABLE IF NOT EXISTS public.player_scheme_evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
    scheme_fit_rating TEXT, -- A+, B-, etc.
    scheme_role TEXT, -- e.g., 'X Receiver in wide zone'
    fit_analysis TEXT, -- Bullet points explaining why they fit
    matchup_vs_def_scheme JSONB DEFAULT '{}'::jsonb, -- e.g., {"Cover 3": "A", "Cover 2": "C"}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(player_id)
);

-- Enable RLS
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_scheme_evaluations ENABLE ROW LEVEL SECURITY;

-- Allow read access for anyone
CREATE POLICY "Allow anonymous read access on coaches" ON public.coaches FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access on coaching_contracts" ON public.coaching_contracts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access on player_scheme_evaluations" ON public.player_scheme_evaluations FOR SELECT USING (true);
