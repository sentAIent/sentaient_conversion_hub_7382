import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('player_stats').select('*').limit(1);
  console.log('player_stats:', Object.keys(data?.[0] || {}));
  
  const { data: d2 } = await supabase.from('player_advanced_stats').select('*').limit(1);
  console.log('player_advanced_stats:', Object.keys(d2?.[0] || {}));
}
check();
