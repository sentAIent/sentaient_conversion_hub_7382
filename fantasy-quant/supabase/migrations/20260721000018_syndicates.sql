-- Migration 18: DFS Syndicates

-- 1. Create syndicates table
CREATE TABLE IF NOT EXISTS public.syndicates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    description TEXT,
    target_contest TEXT NOT NULL,
    contest_entry_fee NUMERIC(10, 2) NOT NULL,
    total_target_pool NUMERIC(10, 2) NOT NULL,
    current_pool_balance NUMERIC(10, 2) DEFAULT 0.00,
    max_entries INT DEFAULT 150,
    status TEXT DEFAULT 'funding', -- 'funding', 'funded', 'entered', 'completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create syndicate_contributions table
CREATE TABLE IF NOT EXISTS public.syndicate_contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    syndicate_id UUID REFERENCES public.syndicates(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    shares_percentage NUMERIC(5, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(syndicate_id, user_id)
);

-- 3. Create syndicate_lineups table
CREATE TABLE IF NOT EXISTS public.syndicate_lineups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    syndicate_id UUID REFERENCES public.syndicates(id) ON DELETE CASCADE,
    players JSONB NOT NULL,
    entry_score NUMERIC(10, 2) DEFAULT 0.00,
    winnings NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.syndicates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syndicate_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.syndicate_lineups ENABLE ROW LEVEL SECURITY;

-- Allow read access for anyone
CREATE POLICY "Allow anonymous read access on syndicates" ON public.syndicates FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access on syndicate_contributions" ON public.syndicate_contributions FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access on syndicate_lineups" ON public.syndicate_lineups FOR SELECT USING (true);

-- Allow updates/inserts for own records
CREATE POLICY "Users can manage own syndicates" ON public.syndicates FOR ALL USING (auth.uid() = creator_id);
CREATE POLICY "Users can manage own contributions" ON public.syndicate_contributions FOR ALL USING (auth.uid() = user_id);
