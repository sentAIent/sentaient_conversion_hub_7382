-- Gamification & Progression Schema

-- Add gamification tracking to user_settings
ALTER TABLE public.user_settings
ADD COLUMN IF NOT EXISTS quant_coins INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS current_streak INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS highest_streak INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_login_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS user_tier TEXT DEFAULT 'bronze',
ADD COLUMN IF NOT EXISTS push_token TEXT; -- For expo push notifications later

-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    requirement_type TEXT NOT NULL, -- e.g., 'roi_percent', 'streak_days', 'bets_placed'
    requirement_value NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Join table for users unlocking achievements
CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Policies for achievements (read-only for all)
CREATE POLICY "Anyone can read achievements"
    ON public.achievements FOR SELECT
    USING (true);

-- Policies for user_achievements
CREATE POLICY "Users can read own achievements"
    ON public.user_achievements FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Service can insert user achievements"
    ON public.user_achievements FOR INSERT
    WITH CHECK (true); -- Backend service handles this

-- Seed some basic achievements
INSERT INTO public.achievements (name, description, requirement_type, requirement_value)
VALUES 
    ('First Blood', 'Place your first paper bet', 'bets_placed', 1),
    ('Hot Streak', 'Log in for 7 consecutive days', 'streak_days', 7),
    ('Sharpshooter', 'Achieve a 10% ROI across 50 bets', 'roi_percent', 10)
ON CONFLICT DO NOTHING;

