-- Migration 22: Keep-Alive Cron for Supabase Edge Functions
-- Prevents Edge Functions from shutting down due to project inactivity limits.

-- 1. Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Schedule Keep-Alive HTTP POST requests to the Edge Functions
-- We schedule these to run twice a week: 
-- Tuesday at 4:00 AM ('0 4 * * 2') and Friday at 4:00 AM ('0 4 * * 5')

-- Tuesday Keep-Alive
SELECT cron.schedule(
  'ping-edge-functions-tuesday',
  '0 4 * * 2',
  $$
  SELECT net.http_post(
    url := 'https://your-project-ref.supabase.co/functions/v1/ping',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{"ping": true}'::jsonb
  );
  $$
);

-- Friday Keep-Alive
SELECT cron.schedule(
  'ping-edge-functions-friday',
  '0 4 * * 5',
  $$
  SELECT net.http_post(
    url := 'https://your-project-ref.supabase.co/functions/v1/ping',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{"ping": true}'::jsonb
  );
  $$
);
