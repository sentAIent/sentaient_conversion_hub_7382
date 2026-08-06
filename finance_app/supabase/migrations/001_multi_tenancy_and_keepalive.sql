-- ==========================================
-- 1. MULTI-TENANCY (Row Level Security)
-- ==========================================

-- Create Entities (Companies / Workspaces) table
CREATE TABLE IF NOT EXISTS public.entities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on entities
ALTER TABLE public.entities ENABLE ROW LEVEL SECURITY;

-- Entities: Users can only select/insert/update entities they own
CREATE POLICY "Users can manage their own entities" 
ON public.entities FOR ALL 
USING (auth.uid() = owner_id);

-- Create Trades table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.trades (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_id uuid REFERENCES public.entities(id) ON DELETE CASCADE,
  symbol text NOT NULL,
  amount numeric NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Invoices table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_id uuid REFERENCES public.entities(id) ON DELETE CASCADE,
  client_email text NOT NULL,
  total_amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add entity_id to trades and invoices if they exist but are missing the column
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'trades') THEN
        ALTER TABLE public.trades ADD COLUMN IF NOT EXISTS entity_id uuid REFERENCES public.entities(id) ON DELETE CASCADE;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'invoices') THEN
        ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS entity_id uuid REFERENCES public.entities(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Enable RLS on trades and invoices
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Trades: Users can only see trades belonging to their user_id
CREATE POLICY "Users can manage their own trades" 
ON public.trades FOR ALL 
USING (auth.uid() = user_id);

-- Invoices: Users can only see invoices belonging to their user_id
CREATE POLICY "Users can manage their own invoices" 
ON public.invoices FOR ALL 
USING (auth.uid() = user_id);


-- ==========================================
-- 2. KEEP-ALIVE CRON JOB (pg_cron + pg_net)
-- ==========================================
-- Supabase automatically pauses inactive free-tier projects after 7 days.
-- We use pg_cron to ping our Edge Function twice a week to prevent this.

-- Ensure pg_net and pg_cron are enabled
CREATE EXTENSION IF NOT EXISTS pg_net;
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create the cron job.
-- Schedule: '0 12 * * 2,5' -> At 12:00 on Tuesday and Friday.
-- IMPORTANT: Replace 'YOUR-PROJECT-REF' with your actual Supabase project reference!
SELECT cron.schedule(
  'keep-alive-ping',
  '0 12 * * 2,5',
  $$
  SELECT net.http_post(
    url := 'https://YOUR-PROJECT-REF.supabase.co/functions/v1/keep-alive',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR-ANON-KEY"}'::jsonb,
    body := '{}'::jsonb
  ) as request_id;
  $$
);
