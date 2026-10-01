import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const { data, error } = await supabase.from('strength_of_schedule').select('*, players(name)');
  console.log("Count:", data ? data.length : error);
  if (data && data.length > 0) {
    console.log("Sample:", data[0]);
  }
  process.exit(0);
}
main();
