-- Add billing and usage tracking columns to auth.users (via a public.profiles table or similar)
-- Assuming we extend the public.users or create one if it doesn't exist.

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  stripe_customer_id text,
  subscription_tier text default 'free',
  video_generation_count integer default 0,
  social_post_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile." ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, stripe_customer_id)
  VALUES (new.id, null);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
