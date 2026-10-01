CREATE TABLE IF NOT EXISTS public.user_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    config JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.user_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved views" ON public.user_views FOR SELECT USING (true);
CREATE POLICY "Users can insert their own saved views" ON public.user_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own saved views" ON public.user_views FOR UPDATE USING (true);
CREATE POLICY "Users can delete their own saved views" ON public.user_views FOR DELETE USING (true);
