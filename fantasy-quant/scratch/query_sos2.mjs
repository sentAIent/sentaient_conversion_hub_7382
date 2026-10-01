import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const { data: sos, error } = await supabase.from('strength_of_schedule').select('*').eq('position', 'QB');
  if (sos && sos.length > 0) {
    console.log("SOS records for QB:", sos.length);
    console.log("Sample:", sos[0]);
    // group by season?
    const seasons = new Set(sos.map(s => s.season));
    console.log("Seasons:", Array.from(seasons));
  } else {
    console.log("No SOS records for QB found. Error:", error);
  }
  process.exit(0);
}
main();
