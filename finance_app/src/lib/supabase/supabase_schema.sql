-- Run this in your Supabase SQL Editor to create the tables for the Trade Journal

CREATE TABLE public.trades (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  asset text NOT NULL,
  entry_date timestamp with time zone NOT NULL,
  exit_date timestamp with time zone,
  entry_price numeric NOT NULL,
  exit_price numeric,
  position_size numeric NOT NULL,
  is_long boolean NOT NULL DEFAULT true,
  strategy_tag text,
  notes text,
  fees numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view their own trades"
ON public.trades FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trades"
ON public.trades FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trades"
ON public.trades FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trades"
ON public.trades FOR DELETE
USING (auth.uid() = user_id);
