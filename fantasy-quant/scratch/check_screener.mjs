import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { data: players, error } = await supabase
    .from('players')
    .select(`
      id,
      name,
      position,
      team,
      player_adp (
        adp,
        format
      )
    `).limit(5);

  console.log('Error:', error);
  console.log('Players length:', players ? players.length : 0);
  if (players && players.length > 0) {
    console.log('Sample:', JSON.stringify(players[0], null, 2));
  }
}
check().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
