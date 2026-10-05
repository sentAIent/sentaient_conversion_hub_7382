import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const { data: tables, error } = await supabase.rpc('get_tables'); // Or query information_schema if possible via postgrest, but usually it's not exposed.
  
  // Let's just try to query user_settings
  const { data: settings, error: setErr } = await supabase.from('user_settings').select('*').limit(5);
  console.log('user_settings:', settings || setErr);
  
  const { data: users, error: uErr } = await supabase.from('users').select('*').limit(5);
  console.log('users:', users || uErr);
}
main();
