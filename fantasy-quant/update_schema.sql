CREATE TABLE IF NOT EXISTS public.player_injuries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    player_id UUID REFERENCES public.players(id),
    season INT NOT NULL,
    week INT NOT NULL,
    game_id UUID REFERENCES public.games(id),
    injury_status VARCHAR(255),
    practice_status VARCHAR(255),
    UNIQUE (player_id, season, week)
);
