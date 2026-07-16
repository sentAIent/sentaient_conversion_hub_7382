CREATE TABLE IF NOT EXISTS public.player_signals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    player_id UUID REFERENCES public.players(id),
    season INT NOT NULL,
    week INT, -- Null for season-long (Draft) analysis
    signal_type VARCHAR(10) CHECK (signal_type IN ('POSITIVE', 'NEGATIVE')),
    category VARCHAR(255), -- e.g., 'OPPONENT_DEFENSE', 'INJURY', 'OPPORTUNITY'
    description TEXT, -- e.g., "Opposing defense ranks 32nd against WRs"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.player_signals ENABLE ROW LEVEL SECURITY;

-- Allow read access
CREATE POLICY "Allow anonymous read access on player_signals" 
ON public.player_signals FOR SELECT USING (true);
