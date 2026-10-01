-- Migration: 25_advanced_stats.sql
-- Run this in the Supabase SQL Editor

ALTER TABLE public.player_advanced_stats
ADD COLUMN IF NOT EXISTS expected_fantasy_points NUMERIC(5,2),
ADD COLUMN IF NOT EXISTS fantasy_points_over_expected NUMERIC(5,2),
ADD COLUMN IF NOT EXISTS yards_per_route_run NUMERIC(5,2),
ADD COLUMN IF NOT EXISTS targets_per_route_run NUMERIC(5,2),
ADD COLUMN IF NOT EXISTS route_participation NUMERIC(5,2),
ADD COLUMN IF NOT EXISTS air_yards_share NUMERIC(5,2),
ADD COLUMN IF NOT EXISTS red_zone_targets INTEGER,
ADD COLUMN IF NOT EXISTS yards_after_catch NUMERIC(6,2),
ADD COLUMN IF NOT EXISTS epa_per_play NUMERIC(5,2);

-- Update the view or any other dependencies if needed, but none depend on this directly yet.
