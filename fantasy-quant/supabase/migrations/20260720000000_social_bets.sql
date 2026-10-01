-- Migration 07: Social Bets and Virtual Bankrolls

CREATE TABLE IF NOT EXISTS public.virtual_bankrolls (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    balance NUMERIC(10, 2) NOT NULL DEFAULT 100000.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.paper_bets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    bankroll_id UUID REFERENCES public.virtual_bankrolls(id) ON DELETE CASCADE,
    bet_type TEXT NOT NULL, -- e.g., 'straight', 'parlay'
    target_id TEXT NOT NULL, -- e.g., 'Patrick Mahomes'
    market TEXT NOT NULL, -- e.g., 'passing_yds'
    line NUMERIC(10, 2), -- e.g., 265.5
    selection TEXT NOT NULL, -- 'OVER' or 'UNDER'
    odds INTEGER NOT NULL, -- e.g., -110
    wager NUMERIC(10, 2) NOT NULL,
    to_win NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'won', 'lost'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.virtual_bankrolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_bets ENABLE ROW LEVEL SECURITY;

-- Policies for virtual_bankrolls
CREATE POLICY "Users can read own bankroll" ON public.virtual_bankrolls
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service can insert bankroll" ON public.virtual_bankrolls
    FOR INSERT WITH CHECK (true);
    
CREATE POLICY "Service can update bankroll" ON public.virtual_bankrolls
    FOR UPDATE USING (true);

-- Policies for paper_bets
CREATE POLICY "Anyone can read bets for feed" ON public.paper_bets
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own bets" ON public.paper_bets
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service can update bets" ON public.paper_bets
    FOR UPDATE USING (true);

-- Trigger to auto-create bankroll for new users
CREATE OR REPLACE FUNCTION public.handle_new_user_bankroll()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.virtual_bankrolls (user_id, balance)
  VALUES (new.id, 100000.00);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop if exists and recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created_bankroll ON auth.users;
CREATE TRIGGER on_auth_user_created_bankroll
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_bankroll();
