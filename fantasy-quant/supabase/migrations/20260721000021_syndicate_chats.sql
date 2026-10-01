-- Migration 21: Syndicate Real-time Social Chat Wall

-- 1. Create syndicate_chats table
CREATE TABLE IF NOT EXISTS public.syndicate_chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    syndicate_id UUID REFERENCES public.syndicates(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.syndicate_chats ENABLE ROW LEVEL SECURITY;

-- Allow read and write for authenticated users
CREATE POLICY "Allow select for syndicate chats" ON public.syndicate_chats
    FOR SELECT USING (true);

CREATE POLICY "Allow insert for syndicate chats" ON public.syndicate_chats
    FOR INSERT WITH CHECK (auth.uid() = user_id);
