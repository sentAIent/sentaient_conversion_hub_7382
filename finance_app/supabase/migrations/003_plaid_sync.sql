-- Table for incoming Plaid Webhooks
CREATE TABLE IF NOT EXISTS public.plaid_webhooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    item_id TEXT NOT NULL,
    webhook_code TEXT NOT NULL,
    payload JSONB NOT NULL,
    processed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

-- Protect table
ALTER TABLE public.plaid_webhooks ENABLE ROW LEVEL SECURITY;
-- Only service role can access webhooks
CREATE POLICY "Service role full access on webhooks"
    ON public.plaid_webhooks
    USING (true)
    WITH CHECK (true);

-- Schedule pg_cron to call the plaid-sync edge function every 5 minutes
-- This ensures transactions are continuously synced without manual user triggers
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM pg_extension 
    WHERE extname = 'pg_cron'
  ) THEN
    PERFORM cron.schedule(
      'plaid-sync-daemon',
      '*/5 * * * *',
      $$
      SELECT net.http_post(
          url:='https://' || current_setting('custom.project_ref') || '.supabase.co/functions/v1/plaid-sync',
          headers:=jsonb_build_object(
              'Content-Type', 'application/json',
              'Authorization', 'Bearer ' || current_setting('custom.service_role_key')
          )
      )
      $$
    );
  END IF;
END $$;
