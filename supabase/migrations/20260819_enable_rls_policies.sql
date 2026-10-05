-- Enable Row Level Security (RLS) for core user tables
-- This ensures users can only read, update, and delete their own data.

ALTER TABLE IF EXISTS "public"."users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "public"."profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "public"."settings" ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------
-- PROFILES POLICIES
-- ----------------------------------------------------

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" 
ON "public"."profiles" 
FOR SELECT 
USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON "public"."profiles" 
FOR UPDATE 
USING (auth.uid() = id);

-- Policy: Users can insert their own profile on signup
CREATE POLICY "Users can insert own profile" 
ON "public"."profiles" 
FOR INSERT 
WITH CHECK (auth.uid() = id);


-- ----------------------------------------------------
-- SETTINGS POLICIES
-- ----------------------------------------------------

-- Policy: Users can view their own settings
CREATE POLICY "Users can view own settings" 
ON "public"."settings" 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Users can update their own settings
CREATE POLICY "Users can update own settings" 
ON "public"."settings" 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Policy: Users can insert their own settings
CREATE POLICY "Users can insert own settings" 
ON "public"."settings" 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- ----------------------------------------------------
-- CONNECTION POOLING NOTE
-- ----------------------------------------------------
-- When connecting from an Edge Function or Serverless environment,
-- Ensure you use the Supavisor Connection Pooling URL:
-- e.g. postgres://postgres.[project]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true

