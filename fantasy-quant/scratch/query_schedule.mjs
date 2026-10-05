import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const { data: games, error } = await supabase.from('games').select('*').eq('season', 2026);
  if (games) {
    console.log(`Found ${games.length} games for 2026.`);
    if (games.length > 0) {
      console.log(games[0]);
    }
  } else {
    console.error(error);
  }
}
main();
