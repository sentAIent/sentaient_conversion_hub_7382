-- Create deployed_tokens table
CREATE TABLE IF NOT EXISTS public.deployed_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    chain_id TEXT NOT NULL,
    token_address TEXT NOT NULL,
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    supply NUMERIC NOT NULL,
    decimals INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.deployed_tokens ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own tokens
CREATE POLICY "Users can create their own deployed tokens"
    ON public.deployed_tokens
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can select their own tokens
CREATE POLICY "Users can read their own deployed tokens"
    ON public.deployed_tokens
    FOR SELECT
    USING (auth.uid() = user_id);
