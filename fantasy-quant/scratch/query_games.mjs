import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
supabase.from('games').select('*').eq('season', 2026).then(({data, error}) => {
  console.log("Length:", data ? data.length : error);
  process.exit(0);
});
