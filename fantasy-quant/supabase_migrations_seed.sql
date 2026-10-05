CREATE TABLE IF NOT EXISTS public.user_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    config JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.user_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved views" ON public.user_views FOR SELECT USING (true);
CREATE POLICY "Users can insert their own saved views" ON public.user_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own saved views" ON public.user_views FOR UPDATE USING (true);
CREATE POLICY "Users can delete their own saved views" ON public.user_views FOR DELETE USING (true);
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
-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscription_tier TEXT DEFAULT 'free', -- 'free', 'pro', 'elite'
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" 
    ON public.users FOR SELECT 
    USING (auth.uid() = id);

-- Allow service role full access
CREATE POLICY "Service role full access" 
    ON public.users FOR ALL 
    USING (auth.jwt() ->> 'role' = 'service_role');

-- Trigger to automatically create a user profile when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email)
    VALUES (NEW.id, NEW.email);
    
    -- Also create a paper trading account automatically for new users
    INSERT INTO public.paper_accounts (user_id, balance)
    VALUES (NEW.id, 10000.00);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update existing user_views RLS
ALTER TABLE public.user_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own views" ON public.user_views;
CREATE POLICY "Users can view own views"
    ON public.user_views FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own views" ON public.user_views;
CREATE POLICY "Users can insert own views"
    ON public.user_views FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own views" ON public.user_views;
CREATE POLICY "Users can update own views"
    ON public.user_views FOR UPDATE
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own views" ON public.user_views;
CREATE POLICY "Users can delete own views"
    ON public.user_views FOR DELETE
    USING (auth.uid() = user_id);

-- Update existing paper_accounts RLS
ALTER TABLE public.paper_accounts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own paper_accounts" ON public.paper_accounts;
CREATE POLICY "Users can view own paper_accounts"
    ON public.paper_accounts FOR SELECT
    USING (auth.uid() = user_id);

-- Update existing paper_bets RLS
ALTER TABLE public.paper_bets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own paper_bets" ON public.paper_bets;
CREATE POLICY "Users can view own paper_bets"
    ON public.paper_bets FOR SELECT
    USING (auth.uid() = user_id);
