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
  const { data: gameLines, error: glError } = await supabase
    .from('game_vegas_lines')
    .select('*, games!inner(id, week, season, home_team, away_team, game_date)')
    .eq('games.season', 2026)
    .eq('games.week', 1);
  console.log('Odds:', gameLines?.length, 'Err:', glError);
}
check().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
