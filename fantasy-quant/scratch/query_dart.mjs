import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
supabase.from('players').select('*').ilike('name', '%Dart%').then(({data, error}) => {
  console.log("Dart:", data);
  supabase.from('players').select('*').ilike('name', '%Shough%').then(({data, error}) => {
    console.log("Shough:", data);
    process.exit(0);
  });
});
