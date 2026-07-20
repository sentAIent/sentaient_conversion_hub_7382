import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkApps() {
  const { data: apps, error } = await supabase.from('apps').select('*');
  console.log("Apps found in DB:", apps?.length || 0);
  console.log(apps);
  if (error) console.error("Error fetching apps:", error);
  process.exit(0);
}
checkApps();
