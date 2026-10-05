-- Migration 19: B2B Developer API Portal

-- 1. Create api_keys table
CREATE TABLE IF NOT EXISTS public.api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    key_value TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'active', -- 'active', 'revoked'
    usage_limit INT DEFAULT 5000,
    usage_count INT DEFAULT 0,
    tier TEXT DEFAULT 'developer', -- 'developer', 'pro', 'enterprise'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create api_usage_logs table
CREATE TABLE IF NOT EXISTS public.api_usage_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key_id UUID REFERENCES public.api_keys(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL,
    status_code INT NOT NULL,
    latency_ms INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage_logs ENABLE ROW LEVEL SECURITY;

-- Allow read access for key owner
CREATE POLICY "Users can manage own API keys" ON public.api_keys 
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own usage logs" ON public.api_usage_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.api_keys 
            WHERE public.api_keys.id = public.api_usage_logs.key_id 
            AND public.api_keys.user_id = auth.uid()
        )
    );
