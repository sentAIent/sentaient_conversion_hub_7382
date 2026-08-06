-- Supabase Schema v3: Plaid Integration

CREATE TABLE IF NOT EXISTS public.plaid_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL UNIQUE,
    access_token TEXT NOT NULL,
    institution_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for plaid_items
ALTER TABLE public.plaid_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own plaid items"
    ON public.plaid_items FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own plaid items"
    ON public.plaid_items FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own plaid items"
    ON public.plaid_items FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own plaid items"
    ON public.plaid_items FOR DELETE
    USING (auth.uid() = user_id);
