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
  const week = 14, season = 2023, platform = 'dk';
  const { data: salaryData, error } = await supabase
    .from('player_dfs_salaries')
    .select('*, players (id, name, position, team)')
    .eq('week', week)
    .eq('season', season)
    .eq('platform', platform)
    .order('projected_pts', { ascending: false })
    .limit(5);

  console.log('Error:', error);
  console.log('Length:', salaryData ? salaryData.length : 0);
  if (salaryData && salaryData.length > 0) {
    console.log('First:', JSON.stringify(salaryData[0], null, 2));
  }
}
check().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
