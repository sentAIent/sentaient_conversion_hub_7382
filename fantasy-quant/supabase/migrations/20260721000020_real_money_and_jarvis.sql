-- Migration 20: Real-Money Pick'em & J.A.R.V.I.S. logs

-- 1. Create real_money_accounts
CREATE TABLE IF NOT EXISTS public.real_money_accounts (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    balance NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    kyc_status TEXT DEFAULT 'unverified', -- 'unverified', 'pending', 'verified', 'rejected'
    kyc_data JSONB DEFAULT '{}'::jsonb,
    state_residency TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create real_money_entries
CREATE TABLE IF NOT EXISTS public.real_money_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    entry_fee NUMERIC(10, 2) NOT NULL,
    legs JSONB NOT NULL, -- Player, prop type, line, selection (Over/Under), status ('pending', 'won', 'lost')
    multiplier NUMERIC(4, 2) NOT NULL,
    payout NUMERIC(10, 2) DEFAULT 0.00,
    status TEXT DEFAULT 'pending', -- 'pending', 'won', 'lost'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.real_money_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.real_money_entries ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage own real money accounts" ON public.real_money_accounts
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own real money entries" ON public.real_money_entries
    FOR SELECT USING (auth.uid() = user_id);
