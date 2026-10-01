CREATE TABLE IF NOT EXISTS public.stripe_events (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    data JSONB NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.stripe_events ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write to stripe events
CREATE POLICY "Service role full access on stripe_events"
    ON public.stripe_events
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role');
