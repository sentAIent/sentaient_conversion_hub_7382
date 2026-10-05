import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const tables = [
  'players', 'player_weekly_stats', 'player_projections', 'player_advanced_stats',
  'player_vegas_props', 'team_coverage_tendencies', 'player_matchups', 'player_dfs_salaries',
  'dfs_salaries', 'player_injuries', 'player_signals'
];

async function main() {
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*').limit(1);
    if (error) {
      console.log(`Error on ${t}:`, error.message);
    } else {
      console.log(`TABLE ${t}: ${data.length > 0 ? Object.keys(data[0]).join(', ') : 'EMPTY'}`);
    }
  }
}
main();
