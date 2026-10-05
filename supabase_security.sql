-- 1. Enable Row Level Security (RLS) on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 2. Define strict RLS policies for Users
CREATE POLICY "Users can view their own data"
ON users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
ON users FOR UPDATE
USING (auth.uid() = id);

-- 3. Define strict RLS policies for Game Stats
CREATE POLICY "Users can view their own game stats"
ON game_stats FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own game stats"
ON game_stats FOR UPDATE
USING (auth.uid() = user_id);

-- 4. Create WORM (Write Once Read Many) Audit Log Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action VARCHAR(255) NOT NULL,
    resource VARCHAR(255) NOT NULL,
    metadata JSONB,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow inserts only (WORM enforcement)
CREATE POLICY "Allow inserts to audit_logs"
ON audit_logs FOR INSERT
WITH CHECK (true);

-- NO SELECT, UPDATE, OR DELETE policies for audit_logs means it is write-only for clients,
-- and read-only for superusers/service roles. This enforces WORM at the database layer.

-- 5. Revoke delete permissions from application users on critical tables
REVOKE DELETE ON users FROM authenticated, anon;
REVOKE DELETE ON game_stats FROM authenticated, anon;
REVOKE DELETE ON transactions FROM authenticated, anon;
REVOKE UPDATE, DELETE ON audit_logs FROM authenticated, anon;
