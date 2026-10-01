-- Migration: 24_accuracy.sql
-- Run this in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS projection_accuracy (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source_id UUID REFERENCES projection_sources(id),
    season INT NOT NULL,
    week INT NOT NULL,
    rmse NUMERIC(10, 4) NOT NULL,
    brier_score NUMERIC(10, 4),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(source_id, season, week)
);

-- Enable RLS
ALTER TABLE projection_accuracy ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow public read access to projection_accuracy" ON projection_accuracy
    FOR SELECT TO public USING (true);
