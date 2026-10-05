import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const names = ['Maye', 'Lawrence', 'C. Williams', 'Caleb Williams', 'Daniels', 'Herbert', 'Purdy', 'Prescott', 'Mahomes', 'Shough', 'Dart'];
  
  for (const n of names) {
    const { data, error } = await supabase.from('players').select('name, team, position').ilike('name', `%${n}%`).eq('position', 'QB');
    if (data && data.length > 0) {
      console.log(`Found: ${n} ->`, data.map(d => `${d.name} (${d.team})`).join(', '));
    } else {
      console.log(`Not found: ${n}`);
    }
  }
}
main();
