-- Create virtual bankrolls table
CREATE TABLE IF NOT EXISTS public.virtual_bankrolls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    balance INT NOT NULL DEFAULT 10000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, name)
);

-- Create paper bets table
CREATE TABLE IF NOT EXISTS public.paper_bets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    bankroll_id UUID REFERENCES public.virtual_bankrolls(id) ON DELETE CASCADE,
    bet_type TEXT NOT NULL, -- e.g. 'player_prop', 'game_spread', 'game_moneyline', 'game_total'
    target_id UUID, -- References player.id or game.id (we keep it loose as UUID since it can be either)
    market TEXT NOT NULL, -- e.g. 'passing_yds', 'spread'
    line NUMERIC, -- e.g. 265.5 or -3.5
    selection TEXT NOT NULL, -- e.g. 'OVER', 'UNDER', 'HOME', 'AWAY'
    odds INT NOT NULL, -- American odds e.g. -110
    wager INT NOT NULL, -- Amount of coins bet
    to_win INT NOT NULL, -- Potential payout
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'won', 'lost', 'push'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.virtual_bankrolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_bets ENABLE ROW LEVEL SECURITY;

-- Policies for virtual bankrolls
CREATE POLICY "Users can view their own virtual bankrolls"
    ON public.virtual_bankrolls FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own virtual bankrolls"
    ON public.virtual_bankrolls FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own virtual bankrolls"
    ON public.virtual_bankrolls FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own virtual bankrolls"
    ON public.virtual_bankrolls FOR DELETE
    USING (auth.uid() = user_id);

-- Policies for paper bets
CREATE POLICY "Anyone can view all paper bets for social feed"
    ON public.paper_bets FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own paper bets"
    ON public.paper_bets FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own paper bets"
    ON public.paper_bets FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own paper bets"
    ON public.paper_bets FOR DELETE
    USING (auth.uid() = user_id);

-- Add indexes for social feed performance
CREATE INDEX IF NOT EXISTS idx_paper_bets_created_at ON public.paper_bets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_paper_bets_user_id ON public.paper_bets(user_id);
CREATE INDEX IF NOT EXISTS idx_paper_bets_target_id ON public.paper_bets(target_id);
