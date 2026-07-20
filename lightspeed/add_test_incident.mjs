import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zbwnpclnxamiynwpdbed.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpid25wY2xueGFtaXlud3BkYmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzk5NDgsImV4cCI6MjA5OTcxNTk0OH0.0GkslQpzdsatDNI5qLuccamMAG_PATIpAW988FIUuO8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('incidents').insert([
    {
      title: 'Database Connection Timeout (TEST)',
      explanation: 'The primary PostgreSQL cluster failed to respond to the connection pool within the 5000ms timeout threshold due to a temporary CPU spike on the database host.',
      fix_action: 'Increase pool size and reboot db instance',
      type: 'database',
      source: 'System Monitor',
      is_fixed: false
    }
  ]);

  if (error) {
    console.error('Error inserting incident:', error);
  } else {
    console.log('Inserted active test incident successfully!');
  }
}

run();
