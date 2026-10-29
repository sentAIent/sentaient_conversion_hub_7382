const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/sphinx/sphinx-dashboard/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.from('user_settings').select('*').eq('id', '00000000-0000-0000-0000-000000000000').single();
  console.log('Settings:', JSON.stringify(data.layers, null, 2));
  console.log('Clustering:', data.clustering_enabled);
}
check();
