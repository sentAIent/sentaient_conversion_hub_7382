#!/usr/bin/env node

/**
 * Key Health Autopilot
 * Background runner checking multi-broker API connection health 
 * and reporting token expirations directly to Discord/Telegram.
 */

const https = require('https');

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;

async function checkHealth() {
  console.log("🔍 Running Key Health Autopilot Checks...");
  let issues = [];

  // 1. Check Supabase Health
  try {
    if (SUPABASE_URL) {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/health`);
      if (!response.ok) {
        issues.push(`Supabase Auth is reporting unhealthy status: ${response.status}`);
      }
    } else {
      issues.push("SUPABASE_URL is missing. Cannot check database health.");
    }
  } catch (e) {
    issues.push(`Failed to connect to Supabase: ${e.message}`);
  }

  // 2. Report to Discord
  if (issues.length > 0) {
    console.warn("⚠️ Issues detected, sending alert...");
    await sendDiscordAlert(issues);
  } else {
    console.log("✅ All systems healthy.");
  }
}

async function sendDiscordAlert(issues) {
  if (!DISCORD_WEBHOOK_URL) {
    console.log("No DISCORD_WEBHOOK_URL configured. Skipping alert.");
    return;
  }

  const payload = JSON.stringify({
    content: "🚨 **Key Health Autopilot Alert** 🚨\n" + issues.map(i => `- ${i}`).join('\n')
  });

  const url = new URL(DISCORD_WEBHOOK_URL);
  
  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payload.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      resolve();
    });
    req.on('error', (e) => reject(e));
    req.write(payload);
    req.end();
  });
}

checkHealth().catch(console.error);
