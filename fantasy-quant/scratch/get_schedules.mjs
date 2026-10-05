import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const teams = ['NE', 'JAX', 'CHI', 'WAS', 'LAC', 'SF', 'DAL', 'KC'];
const qbs = {
  'NE': 'Maye',
  'JAX': 'Lawrence',
  'CHI': 'CWilliams',
  'WAS': 'Daniels',
  'LAC': 'Herbert',
  'SF': 'Purdy',
  'DAL': 'Prescott',
  'KC': 'Mahomes'
};

async function main() {
  const { data: games, error } = await supabase.from('games').select('*').eq('season', 2026);
  
  const schedules = {};
  for (const t of teams) {
    schedules[t] = Array(18).fill('BYE');
  }

  for (const g of games) {
    if (g.week > 18) continue;
    if (teams.includes(g.home_team)) {
      schedules[g.home_team][g.week - 1] = g.away_team;
    }
    if (teams.includes(g.away_team)) {
      schedules[g.away_team][g.week - 1] = `@${g.home_team}`;
    }
  }

  // Print Header
  const header = ['Week', ...teams.map(t => qbs[t])];
  console.log(`| ${header.join(' | ')} |`);
  console.log(`| ${header.map(() => '---').join(' | ')} |`);
  
  for (let w = 0; w < 18; w++) {
    const row = [w + 1];
    for (const t of teams) {
      row.push(schedules[t][w]);
    }
    console.log(`| ${row.join(' | ')} |`);
  }
  process.exit(0);
}
main();
