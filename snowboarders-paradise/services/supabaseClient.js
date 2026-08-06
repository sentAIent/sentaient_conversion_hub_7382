import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and Anon Key
// Once replaced, the app will automatically switch from mock data to live data
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

export const isSupabaseConfigured = () => {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';
};

// We create the client only if it's configured, otherwise we export null.
// The app already falls back to MOCK data if isSupabaseConfigured() is false.
export const supabase = isSupabaseConfigured() 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;
