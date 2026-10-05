import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase
    .from('positional_sos_heatmaps')
    .select('opponent, position, sos_rank');
    
  if (error) {
    console.error(error);
    return;
  }
  
  const defenseMap = {};
  data.forEach((row) => {
    if (!row.opponent || row.opponent === 'BYE') return;
    const defTeam = row.opponent.replace('@', '');
    if (!defenseMap[defTeam]) {
      defenseMap[defTeam] = { team: defTeam, QB: 0, RB: 0, WR: 0, TE: 0 };
    }
    defenseMap[defTeam][row.position] = row.sos_rank;
  });

  const results = Object.values(defenseMap);
  results.sort((a, b) => (a.QB + a.RB + a.WR + a.TE) - (b.QB + b.RB + b.WR + b.TE));
  
  console.log(results);
}
check();
