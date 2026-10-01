import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const { data, error, count } = await supabase.from('players').select('*', { count: 'exact', head: true });
  console.log('Total players:', count, 'Error:', error);
  
  const { data: noAdp, count: noAdpCount } = await supabase.from('players').select('id, name', { count: 'exact' }).limit(5);
  console.log('Sample players in DB:', noAdp);
}
main();
