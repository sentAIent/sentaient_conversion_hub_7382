import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const { data: sos, error } = await supabase.from('strength_of_schedule').select('*').limit(1);
  if (sos) {
    console.log("SOS Sample:", sos[0]);
  } else {
    console.log("Error:", error);
  }
  process.exit(0);
}
main();
