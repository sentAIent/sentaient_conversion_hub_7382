import { createClient } from '@supabase/supabase-js';

// Requires SUPABASE_URL and SUPABASE_ANON_KEY to be set in environment
const supabaseUrl = process.env.SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key-here'; // For testing, this is usually the local anon key

const supabase = createClient(supabaseUrl, supabaseKey);

async function simulateAttack() {
  console.log("🔥 Starting End-to-End Attack Simulation...");
  
  const payload = {
    type: 'security',
    title: 'Suspicious IAM AssumeRole Detected',
    explanation: 'A highly privileged IAM role (arn:aws:iam::123456789012:role/ProductionAdmin) was assumed by an unrecognized IP address (198.51.100.23).',
    fix_action: 'Revoke temporary credentials and block IP.',
    source: 'aws-cloudtrail',
    is_fixed: false,
    severity: 'critical', // This is what triggers the ALLaMA webhook
    status: 'action_required'
  };

  console.log("Payload generated:", payload);
  console.log("Injecting into Supabase...");

  const { data, error } = await supabase
    .from('incidents')
    .insert([payload])
    .select();

  if (error) {
    console.error("❌ Failed to inject incident:", error.message);
  } else {
    console.log("✅ Incident successfully injected!");
    console.log("View the LightSpeed Dashboard to see it appear in real-time.");
    console.log("If your ALLaMA Webhooks are active, the 'dispatch-to-allama' Edge Function has just been fired!");
  }
}

simulateAttack();
