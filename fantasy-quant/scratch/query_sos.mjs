import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const { data: sos, error } = await supabase.from('sos_metrics').select('*').eq('season', 2026).eq('position', 'QB');
  if (sos && sos.length > 0) {
    console.log("Found SOS metrics:", sos.slice(0, 3));
  } else {
    console.log("No SOS metrics for 2026 QB found.");
    // check 2025?
    const { data: sos25 } = await supabase.from('sos_metrics').select('*').eq('season', 2025).eq('position', 'QB');
    console.log("2025 SOS metrics:", sos25 ? sos25.slice(0,3) : null);
  }
  process.exit(0);
}
main();
