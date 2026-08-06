-- RUN THESE SQL COMMANDS IN YOUR SUPABASE DASHBOARD -> SQL EDITOR

-- 1. Create Riders Table (Leaderboard Data)
CREATE TABLE IF NOT EXISTS public.riders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL,
    days_ridden INTEGER DEFAULT 0,
    vert_skied_ft INTEGER DEFAULT 0,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create Gear Table (Inventory Data)
CREATE TABLE IF NOT EXISTS public.gear (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rider_id UUID REFERENCES public.riders(id) ON DELETE CASCADE,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    type TEXT NOT NULL, -- e.g., 'Snowboard', 'Boots', 'Bindings'
    days_ridden INTEGER DEFAULT 0,
    lifespan INTEGER NOT NULL, -- Estimated max days before replacement
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Insert some mock data to get started
INSERT INTO public.riders (username, days_ridden, vert_skied_ft) VALUES
('TravisRice', 142, 4500000),
('SnowNinja', 89, 1200000),
('PowderHound', 64, 850000);

-- Enable Row Level Security (RLS)
ALTER TABLE public.riders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gear ENABLE ROW LEVEL SECURITY;

-- For this prototype, allow all authenticated/anon reads and writes
-- WARNING: In a production app, you should restrict writes to the logged-in user
CREATE POLICY "Enable read access for all users" ON public.riders FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.riders FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.riders FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON public.gear FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.gear FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.gear FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.gear FOR DELETE USING (true);
