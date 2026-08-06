-- 1. Incidents Table (For errors, security threats, etc.)
CREATE TABLE IF NOT EXISTS incidents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  type text NOT NULL, -- e.g., 'security', 'error', 'database'
  title text NOT NULL,
  explanation text NOT NULL,
  fix_action text NOT NULL,
  is_fixed boolean DEFAULT false,
  source text, -- e.g., 'sentaient.com', 'ios_app'
  correlation_id text, -- Used to group similar alerts
  proposed_fix_iac text -- Used for auto-remediations
);

-- Enable Row Level Security (RLS) but allow anon reads (for our dashboard)
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on incidents" ON incidents;
CREATE POLICY "Allow public read access on incidents"
  ON incidents FOR SELECT
  USING (true);

-- Allow inserts from the web/mobile trackers
DROP POLICY IF EXISTS "Allow anon insert on incidents" ON incidents;
CREATE POLICY "Allow anon insert on incidents"
  ON incidents FOR INSERT
  WITH CHECK (true);

-- 2. Metrics Table (For real-time page loads, uptime, etc.)
CREATE TABLE IF NOT EXISTS metrics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  site text NOT NULL, -- 'sentaient.com' or 'cloveh2o.com'
  metric_name text NOT NULL, -- e.g., 'page_load_time', 'uptime_ping'
  value numeric NOT NULL,
  metadata jsonb -- For any extra tracking info like user agent
);

ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on metrics" ON metrics;
CREATE POLICY "Allow public read access on metrics"
  ON metrics FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow anon insert on metrics" ON metrics;
CREATE POLICY "Allow anon insert on metrics"
  ON metrics FOR INSERT
  WITH CHECK (true);

-- Enable Realtime for these tables so the dashboard updates instantly
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table incidents;
alter publication supabase_realtime add table metrics;

-- 3. Apps Table (For dynamically tracked websites/mobile apps)
CREATE TABLE IF NOT EXISTS apps (
  id text PRIMARY KEY, -- e.g., 'sentaient.com', 'ios-app'
  name text NOT NULL,
  type text NOT NULL, -- e.g., 'Website', 'Mobile'
  url text, -- The URL to monitor for uptime/performance
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on apps" ON apps;
CREATE POLICY "Allow public read access on apps"
  ON apps FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public insert access on apps" ON apps;
CREATE POLICY "Allow public insert access on apps"
  ON apps FOR INSERT
  WITH CHECK (true);

-- 4. User Preferences Table (For dynamic alerting)
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  email text,
  phone_number text,
  carrier_gateway text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on user_preferences" ON user_preferences;
CREATE POLICY "Allow public read access on user_preferences"
  ON user_preferences FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert/update access on user_preferences" ON user_preferences;
CREATE POLICY "Allow public insert/update access on user_preferences"
  ON user_preferences FOR ALL USING (true) WITH CHECK (true);

-- 5. Web Analytics Table (For comprehensive marketing and pixel tracking)
CREATE TABLE IF NOT EXISTS web_analytics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site text NOT NULL,
  session_id text,
  path text NOT NULL,
  referrer text,
  user_agent text,
  device_type text,
  screen_resolution text,
  language text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE web_analytics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert access on web_analytics" ON web_analytics;
CREATE POLICY "Allow public insert access on web_analytics"
  ON web_analytics FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public read access on web_analytics" ON web_analytics;
CREATE POLICY "Allow public read access on web_analytics"
  ON web_analytics FOR SELECT USING (true);

-- 6. Security Audits Table
CREATE TABLE IF NOT EXISTS security_audits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  app_id text REFERENCES apps(id) ON DELETE CASCADE,
  task_name text NOT NULL,
  status text DEFAULT 'Pending' CHECK (status IN ('Completed', 'In Progress', 'Pending')),
  stage text,
  details text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(app_id, task_name)
);

ALTER TABLE security_audits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on security_audits" ON security_audits;
CREATE POLICY "Allow public read access on security_audits"
  ON security_audits FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert access on security_audits" ON security_audits;
CREATE POLICY "Allow public insert access on security_audits"
  ON security_audits FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update access on security_audits" ON security_audits;
CREATE POLICY "Allow public update access on security_audits"
  ON security_audits FOR UPDATE USING (true) WITH CHECK (true);

-- Enable Realtime for security_audits
alter publication supabase_realtime add table security_audits;

-- 7. Database Webhooks (pg_net)
-- Ensure pg_net is enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Webhook: Trigger deep-research-asset on new app discovery
CREATE OR REPLACE FUNCTION trigger_deep_research_asset()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'http://host.docker.internal:54321/functions/v1/deep-research-asset',
    body := json_build_object('record', row_to_json(NEW))::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_app_created ON apps;
CREATE TRIGGER on_app_created
  AFTER INSERT ON apps
  FOR EACH ROW
  EXECUTE FUNCTION trigger_deep_research_asset();

-- Webhook: Trigger dispatch-to-allama on critical incident
CREATE OR REPLACE FUNCTION trigger_dispatch_to_allama()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.severity = 'critical' OR NEW.status = 'action_required' THEN
    PERFORM net.http_post(
      url := 'http://host.docker.internal:54321/functions/v1/dispatch-to-allama',
      body := json_build_object('record', row_to_json(NEW))::jsonb
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_incident_critical ON incidents;
CREATE TRIGGER on_incident_critical
  AFTER INSERT OR UPDATE ON incidents
  FOR EACH ROW
  EXECUTE FUNCTION trigger_dispatch_to_allama();

-- 8. AI Insights Table (For CISO Briefing & Architecture Upgrades)
CREATE TABLE IF NOT EXISTS ai_insights (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  insight_type text NOT NULL, -- 'ciso_briefing' or 'architecture_upgrade'
  data jsonb NOT NULL,
  is_active boolean DEFAULT true
);

ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on ai_insights" ON ai_insights;
CREATE POLICY "Allow public read access on ai_insights"
  ON ai_insights FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert access on ai_insights" ON ai_insights;
CREATE POLICY "Allow public insert access on ai_insights"
  ON ai_insights FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update access on ai_insights" ON ai_insights;
CREATE POLICY "Allow public update access on ai_insights"
  ON ai_insights FOR UPDATE USING (true) WITH CHECK (true);

-- Enable Realtime for ai_insights
alter publication supabase_realtime add table ai_insights;

-- 9. User Roles Table (For RBAC)
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role text NOT NULL CHECK (role IN ('ciso', 'secops', 'devops')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow users to read their own role" ON user_roles;
CREATE POLICY "Allow users to read their own role"
  ON user_roles FOR SELECT
  USING (auth.uid() = id);

-- For local development/testing auto-provisioning, we will allow inserts. 
-- In production, this should be restricted to super_admin or trigger-based.
DROP POLICY IF EXISTS "Allow anon insert on user_roles" ON user_roles;
CREATE POLICY "Allow anon insert on user_roles"
  ON user_roles FOR INSERT
  WITH CHECK (true);

-- 10. Compliance Checks Table
CREATE TABLE IF NOT EXISTS compliance_checks (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  framework text NOT NULL, -- e.g., 'SOC2', 'HIPAA'
  rule_id text NOT NULL,
  description text NOT NULL,
  status text NOT NULL CHECK (status IN ('passed', 'failed', 'warning')),
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_checked timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE compliance_checks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read compliance" ON compliance_checks;
CREATE POLICY "Allow authenticated users to read compliance"
  ON compliance_checks FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow insert/update for automation" ON compliance_checks;
CREATE POLICY "Allow insert/update for automation"
  ON compliance_checks FOR ALL
  USING (true)
  WITH CHECK (true); -- Relaxed for local agent scanner

-- Enable Realtime for compliance_checks
alter publication supabase_realtime add table compliance_checks;

-- 11. ChatOps Messages Table
CREATE TABLE IF NOT EXISTS chatops_messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender text NOT NULL, -- e.g., 'User', 'System', 'Agent', 'CISO'
  message text NOT NULL,
  channel text DEFAULT 'general' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE chatops_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read chatops" ON chatops_messages;
CREATE POLICY "Allow authenticated users to read chatops"
  ON chatops_messages FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert chatops" ON chatops_messages;
CREATE POLICY "Allow authenticated users to insert chatops"
  ON chatops_messages FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow agent scanner (anon) to insert
DROP POLICY IF EXISTS "Allow anon insert chatops" ON chatops_messages;
CREATE POLICY "Allow anon insert chatops"
  ON chatops_messages FOR INSERT
  WITH CHECK (true);

-- Enable Realtime for chatops_messages
alter publication supabase_realtime add table chatops_messages;



-- 12. Audit Logs Table (For compliance and security auditing)
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  actor text NOT NULL, -- e.g., user id or 'system', 'agent'
  action text NOT NULL, -- e.g., 'deploy_fix', 'login', 'update_policy'
  resource text, -- what was affected
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read audit_logs" ON audit_logs;
CREATE POLICY "Allow authenticated users to read audit_logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow anon insert audit_logs" ON audit_logs;
CREATE POLICY "Allow anon insert audit_logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true);
