import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zbwnpclnxamiynwpdbed.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpid25wY2xueGFtaXlud3BkYmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzk5NDgsImV4cCI6MjA5OTcxNTk0OH0.0GkslQpzdsatDNI5qLuccamMAG_PATIpAW988FIUuO8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Clearing simulated data...');
  
  await supabase.from('web_analytics').delete().like('session_id', 'sim-session-%');
  
  await supabase.from('metrics').delete().eq('site', 'sim-site-1');
  await supabase.from('metrics').delete().eq('site', 'sim-app-1');
  
  await supabase.from('apps').delete().eq('id', 'sim-site-1');
  await supabase.from('apps').delete().eq('id', 'sim-app-1');
  
  console.log('Simulation data cleared successfully!');
}

run().catch(console.error);
