-- Enforce Row Level Security (RLS) across all core tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to select their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Create policy for users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Ensure secure deletion policy (soft-delete via application logic, or hard-delete via Admin)
-- We do not allow standard users to hard-delete directly via SQL to prevent accidental drops
CREATE POLICY "Users cannot hard-delete profiles directly"
  ON public.profiles
  FOR DELETE
  USING (false);

-- Enable RLS on Ledger (Transactions)
ALTER TABLE IF EXISTS public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions"
  ON public.transactions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON public.transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions"
  ON public.transactions
  FOR UPDATE
  USING (auth.uid() = user_id);
