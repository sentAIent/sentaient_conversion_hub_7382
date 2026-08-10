-- ==========================================
-- 4. AUDIT LOGS (Compliance Tracking)
-- ==========================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    metadata JSONB,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Users can view their own audit logs (for data export)
CREATE POLICY "Users can read own audit logs"
    ON public.audit_logs
    FOR SELECT
    USING (auth.uid() = user_id);

-- System (Service Role) can insert logs
CREATE POLICY "Service role can insert audit logs"
    ON public.audit_logs
    FOR INSERT
    WITH CHECK (true); -- Usually inserted from edge functions or backend

-- Prevent any updates or deletes to audit logs (Immutable)
-- No UPDATE or DELETE policies are created, defaulting to DENY.
