import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const { data, count } = await supabase.from('player_adp').select('player_id', { count: 'exact' });
  console.log('Total ADP records:', count);
  
  if (data && data.length > 0) {
    const pids = [...new Set(data.map(d => d.player_id))];
    console.log('Unique players with ADP:', pids.length);
    
    // Check which players they are
    const { data: players } = await supabase.from('players').select('name, team, position').in('id', pids.slice(0, 10));
    console.log('Sample players with ADP:', players);
  }
}
main();
