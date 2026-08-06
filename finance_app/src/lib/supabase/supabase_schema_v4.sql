-- Supabase Schema v4: Crypto Holdings

CREATE TABLE IF NOT EXISTS public.crypto_holdings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    coin_id TEXT NOT NULL, -- e.g., 'bitcoin', 'ethereum', 'solana'
    symbol TEXT NOT NULL, -- e.g., 'BTC', 'ETH', 'SOL'
    amount NUMERIC(24, 8) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, coin_id)
);

-- RLS for crypto_holdings
ALTER TABLE public.crypto_holdings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own crypto holdings"
    ON public.crypto_holdings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own crypto holdings"
    ON public.crypto_holdings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own crypto holdings"
    ON public.crypto_holdings FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own crypto holdings"
    ON public.crypto_holdings FOR DELETE
    USING (auth.uid() = user_id);
