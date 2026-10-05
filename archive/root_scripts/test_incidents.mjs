import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://zbwnpclnxamiynwpdbed.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpid25wY2xueGFtaXlud3BkYmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzk5NDgsImV4cCI6MjA5OTcxNTk0OH0.0GkslQpzdsatDNI5qLuccamMAG_PATIpAW988FIUuO8";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testFetch() {
  console.log("Fetching incidents...");
  const { data, error } = await supabase.from('incidents').select('*');
  console.log("Data:", data);
  console.log("Error:", error);
}

testFetch();
