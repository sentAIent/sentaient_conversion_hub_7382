-- Migration 17: Draft Portal Tables

-- User Drafts
CREATE TABLE IF NOT EXISTS public.user_drafts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    platform TEXT NOT NULL, -- e.g. sleeper, espn, yahoo, manual
    league_name TEXT NOT NULL,
    season TEXT NOT NULL,
    scoring_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own drafts" ON public.user_drafts
    FOR ALL USING (auth.uid() = user_id);


-- User Draft Picks
CREATE TABLE IF NOT EXISTS public.user_draft_picks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    draft_id UUID REFERENCES public.user_drafts(id) ON DELETE CASCADE,
    manager_name TEXT NOT NULL,
    player_id UUID REFERENCES public.players(id), -- Nullable if we can't map a player
    raw_player_name TEXT, -- Fallback name if player_id is null
    pick_round INTEGER NOT NULL,
    pick_number INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_draft_picks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own draft picks" ON public.user_draft_picks
    FOR ALL USING (
        draft_id IN (
            SELECT id FROM public.user_drafts WHERE user_id = auth.uid()
        )
    );


-- Draft Tendencies (AI Analysis)
CREATE TABLE IF NOT EXISTS public.draft_tendencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    draft_id UUID REFERENCES public.user_drafts(id) ON DELETE CASCADE,
    manager_name TEXT NOT NULL,
    tendency_summary TEXT, -- LLM output
    positional_bias JSONB, -- JSON output of structural bias
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.draft_tendencies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view tendencies for their drafts" ON public.draft_tendencies
    FOR SELECT USING (
        draft_id IN (
            SELECT id FROM public.user_drafts WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert tendencies for their drafts" ON public.draft_tendencies
    FOR INSERT WITH CHECK (
        draft_id IN (
            SELECT id FROM public.user_drafts WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update tendencies for their drafts" ON public.draft_tendencies
    FOR UPDATE USING (
        draft_id IN (
            SELECT id FROM public.user_drafts WHERE user_id = auth.uid()
        )
    );
