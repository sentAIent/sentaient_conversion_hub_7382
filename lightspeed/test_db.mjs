import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: apps, error: e1 } = await supabase.from('apps').select('*');
  console.log("Apps:", apps, e1);
  const { data: metrics, error: e2 } = await supabase.from('metrics').select('id, site, metric_name').limit(5);
  console.log("Metrics sample:", metrics, e2);
  const { count, error: e3 } = await supabase.from('metrics').select('*', { count: 'exact', head: true });
  console.log("Metrics count:", count, e3);
}
run();
