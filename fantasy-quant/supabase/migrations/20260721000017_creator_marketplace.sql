-- Migration 17: Creator Marketplace (Stripe Connect)

-- 1. Create creator_profiles table
CREATE TABLE IF NOT EXISTS public.creator_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    is_creator BOOLEAN DEFAULT FALSE,
    stripe_connect_id TEXT UNIQUE,
    subscription_price NUMERIC(10, 2) DEFAULT 4.99, -- in USD
    subscription_price_coins INT DEFAULT 500, -- in Coins
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create creator_subscriptions table
CREATE TABLE IF NOT EXISTS public.creator_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscriber_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'active', -- 'active', 'canceled'
    payment_method TEXT NOT NULL, -- 'stripe', 'coins'
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(subscriber_id, creator_id)
);

-- 3. Add premium flag to paper_bets
ALTER TABLE public.paper_bets
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE;

-- Enable RLS
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow read access for anyone
CREATE POLICY "Allow anonymous read access on creator_profiles" ON public.creator_profiles FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read access on creator_subscriptions" ON public.creator_subscriptions FOR SELECT USING (true);

-- Allow updates/inserts for own records
CREATE POLICY "Users can manage own creator profile" ON public.creator_profiles 
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can view own subscriptions" ON public.creator_subscriptions
    FOR SELECT USING (auth.uid() = subscriber_id OR auth.uid() = creator_id);
