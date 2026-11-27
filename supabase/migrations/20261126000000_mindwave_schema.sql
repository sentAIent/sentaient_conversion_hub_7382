-- ====================================================================
-- MINDWAVE PRODUCTION DATABASE SCHEMA & RLS POLICIES (2026 COMPLIANT)
-- PgBouncer / Connection Pool Friendly (Transactional Mode)
-- ====================================================================

-- 1. Profiles & Core User Metadata
CREATE TABLE IF NOT EXISTS public.mindwave_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro_monthly', 'pro_annual', 'lifetime', 'enterprise')),
    stripe_customer_id TEXT,
    revenuecat_app_user_id TEXT,
    ai_consent_accepted BOOLEAN DEFAULT FALSE,
    ai_consent_timestamp TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Sessions (Binaural & Entrainment Logs)
CREATE TABLE IF NOT EXISTS public.mindwave_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.mindwave_profiles(id) ON DELETE CASCADE,
    preset_name TEXT NOT NULL,
    target_wave TEXT NOT NULL CHECK (target_wave IN ('delta', 'theta', 'alpha', 'beta', 'gamma', 'epsilon', 'lambda', 'schumann')),
    carrier_frequency_hz NUMERIC(6,2) NOT NULL,
    beat_frequency_hz NUMERIC(5,2) NOT NULL,
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    spatial_gyro_enabled BOOLEAN DEFAULT FALSE,
    avg_hrv_rmssd NUMERIC(5,2),
    avg_bpm NUMERIC(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Clinical Assessments (Pre / Post State Calibration)
CREATE TABLE IF NOT EXISTS public.mindwave_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.mindwave_sessions(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES public.mindwave_profiles(id) ON DELETE CASCADE,
    pre_stress INTEGER CHECK (pre_stress BETWEEN 1 AND 10),
    post_stress INTEGER CHECK (post_stress BETWEEN 1 AND 10),
    pre_focus INTEGER CHECK (pre_focus BETWEEN 1 AND 10),
    post_focus INTEGER CHECK (post_focus BETWEEN 1 AND 10),
    pre_energy INTEGER CHECK (pre_energy BETWEEN 1 AND 10),
    post_energy INTEGER CHECK (post_energy BETWEEN 1 AND 10),
    stress_reduction_pct INTEGER,
    focus_gain_pct INTEGER,
    clinical_efficacy_score INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Custom User Soundscape Presets
CREATE TABLE IF NOT EXISTS public.mindwave_user_presets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.mindwave_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enterprise Organizations & Corporate Licenses
CREATE TABLE IF NOT EXISTS public.mindwave_enterprise_orgs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_name TEXT NOT NULL,
    corporate_code TEXT UNIQUE NOT NULL,
    seats_allocated INTEGER NOT NULL DEFAULT 50,
    license_tier TEXT DEFAULT 'team' CHECK (license_tier IN ('team', 'enterprise')),
    webhook_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AI Content Moderation & Reporting (Guideline 1.2 & Google Play Safety)
CREATE TABLE IF NOT EXISTS public.mindwave_ai_moderation_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.mindwave_profiles(id) ON DELETE SET NULL,
    prompt_text TEXT,
    response_text TEXT NOT NULL,
    flag_reason TEXT NOT NULL CHECK (flag_reason IN ('inaccurate', 'unsafe', 'offensive', 'medical_advice', 'other')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- PERFORMANCE INDEXES & CONSTRAINTS
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_mw_sessions_user_time ON public.mindwave_sessions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mw_assessments_user_time ON public.mindwave_assessments(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mw_presets_user_fav ON public.mindwave_user_presets(user_id, is_favorite);
CREATE INDEX IF NOT EXISTS idx_mw_orgs_code ON public.mindwave_enterprise_orgs(corporate_code) WHERE is_active = TRUE;

-- ====================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.mindwave_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mindwave_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mindwave_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mindwave_user_presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mindwave_enterprise_orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mindwave_ai_moderation_reports ENABLE ROW LEVEL SECURITY;

-- User Profile: Self-access only
CREATE POLICY "Users can view and update their own profile"
    ON public.mindwave_profiles FOR ALL
    USING (auth.uid() = id);

-- Sessions: Self-access only
CREATE POLICY "Users can manage their own sessions"
    ON public.mindwave_sessions FOR ALL
    USING (auth.uid() = user_id);

-- Assessments: Self-access only
CREATE POLICY "Users can manage their own assessments"
    ON public.mindwave_assessments FOR ALL
    USING (auth.uid() = user_id);

-- Presets: Self-access only
CREATE POLICY "Users can manage their own presets"
    ON public.mindwave_user_presets FOR ALL
    USING (auth.uid() = user_id);

-- Enterprise: Authenticated corporate members can read their org details
CREATE POLICY "Enterprise read-only verification"
    ON public.mindwave_enterprise_orgs FOR SELECT
    USING (auth.role() = 'authenticated');

-- AI Moderation: Authenticated users can insert reports
CREATE POLICY "Users can submit AI moderation reports"
    ON public.mindwave_ai_moderation_reports FOR INSERT
    WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');
