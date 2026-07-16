-- Phase 8: Player Contracts

CREATE TABLE IF NOT EXISTS public.player_contracts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
    signed_date DATE,
    total_value NUMERIC, -- Total value of the contract in dollars
    guaranteed_amount NUMERIC, -- Fully guaranteed amount
    years INT, -- Number of years
    aav NUMERIC, -- Average Annual Value
    current_cap_hit NUMERIC, -- The cap hit for the current season
    is_active BOOLEAN DEFAULT TRUE, -- TRUE if this is the player's current active deal
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.player_contracts ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated/anon users
CREATE POLICY "Allow anonymous read access on player_contracts" 
ON public.player_contracts FOR SELECT USING (true);

-- Index for querying by player
CREATE INDEX IF NOT EXISTS idx_player_contracts_player_id ON public.player_contracts(player_id);
