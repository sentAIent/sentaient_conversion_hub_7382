CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nflverse_id TEXT UNIQUE,
    name TEXT NOT NULL,
    position TEXT,
    team TEXT
);

CREATE TABLE IF NOT EXISTS public.games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nflverse_game_id TEXT UNIQUE NOT NULL,
    season INT NOT NULL,
    week INT NOT NULL,
    home_team TEXT NOT NULL,
    away_team TEXT NOT NULL,
    stadium TEXT,
    is_dome BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public.player_weekly_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
    game_id UUID REFERENCES public.games(id) ON DELETE CASCADE,
    season INT NOT NULL,
    week INT NOT NULL,
    fpts NUMERIC,
    rush_yds INT,
    rush_tds INT,
    receptions INT,
    targets INT,
    rec_yds INT,
    rec_tds INT,
    pass_yds INT,
    pass_tds INT,
    interceptions INT,
    fumbles_lost INT,
    standard_pts NUMERIC,
    half_ppr_pts NUMERIC,
    ppr_pts NUMERIC,
    raw_stats JSONB,
    UNIQUE(player_id, game_id),
    UNIQUE(player_id, season, week)
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    mme_config JSONB,
    dashboard_layout JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view their own settings"
    ON user_settings FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own settings"
    ON user_settings FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own settings"
    ON user_settings FOR INSERT
    WITH CHECK (auth.uid() = id);
-- Add new columns to user_settings for the Multi-Source Live Data Hub

ALTER TABLE public.user_settings
ADD COLUMN IF NOT EXISTS live_data_provider text DEFAULT 'sleeper',
ADD COLUMN IF NOT EXISTS api_sports_key text,
ADD COLUMN IF NOT EXISTS sportsdataio_key text;
-- 1. Create projection_sources table
CREATE TABLE IF NOT EXISTS public.projection_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    abbreviation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some default sources
INSERT INTO public.projection_sources (name, abbreviation)
VALUES 
    ('Establish The Run', 'ETR'),
    ('Stokastic', 'STK'),
    ('Sentaient Internal Model', 'SIM')
ON CONFLICT DO NOTHING;

-- 2. Create player_projections table
CREATE TABLE IF NOT EXISTS public.player_projections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
    source_id UUID NOT NULL REFERENCES public.projection_sources(id) ON DELETE CASCADE,
    slate_id TEXT, -- nullable, if we want slate-specific projections later
    projected_pts NUMERIC NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(player_id, source_id, slate_id)
);

-- 3. Add ensemble_weights to user_settings
ALTER TABLE public.user_settings
ADD COLUMN IF NOT EXISTS ensemble_weights JSONB DEFAULT '{"ETR": 0.5, "STK": 0.3, "SIM": 0.2}'::jsonb;
-- Phase 6: Stripe SaaS Billing Migration

-- 1. Add Stripe billing fields to user_settings
ALTER TABLE public.user_settings
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';

-- 2. Create index on stripe_customer_id for faster webhook lookups
CREATE INDEX IF NOT EXISTS idx_user_settings_stripe_customer_id ON public.user_settings(stripe_customer_id);
-- Phase 7: NFL.com Data Scraper Migration

-- Add data_source column to track data provenance
ALTER TABLE public.players
ADD COLUMN IF NOT EXISTS data_source TEXT DEFAULT 'api-sports';

ALTER TABLE public.player_weekly_stats
ADD COLUMN IF NOT EXISTS data_source TEXT DEFAULT 'api-sports';

-- Index the data source for faster filtering
CREATE INDEX IF NOT EXISTS idx_players_data_source ON public.players(data_source);
CREATE INDEX IF NOT EXISTS idx_player_weekly_stats_data_source ON public.player_weekly_stats(data_source);
