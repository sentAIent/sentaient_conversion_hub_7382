-- Run this script in the Supabase SQL Editor to add the status_page_url column to the apps table
ALTER TABLE apps ADD COLUMN IF NOT EXISTS status_page_url text;
