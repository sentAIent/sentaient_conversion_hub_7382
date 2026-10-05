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
    .select(`*, players (id, name, position, team, data_source)`)
    .eq('week', week)
    .eq('season', season)
    .eq('platform', platform)
    .order('projected_pts', { ascending: false })
    .limit(300);

  if (error) { console.error('Error:', error); return; }

  const playerIds = salaryData.map(r => r.player_id);
  const { data: advStats, error: e1 } = await supabase
    .from('player_advanced_stats')
    .select('player_id, snap_pct, target_share, wopr, adot, racr')
    .in('player_id', playerIds)
    .eq('season', season)
    .eq('week', week);

  if (e1) console.error('E1:', e1);

  console.log('advStats count:', advStats?.length);
}
check().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
