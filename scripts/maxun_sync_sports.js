#!/usr/bin/env node

/**
 * maxun_sync_sports.js
 * 
 * SRE Script intended to run on a CRON schedule (e.g. daily at 3 AM).
 * Triggers a Maxun Web Extraction robot to scrape the latest NFL Fantasy Sports
 * points/game (PPG) projections and pushes the structured JSON into Supabase.
 */

const fetch = require('node-fetch'); // Assuming node-fetch is available in the environment

// Configuration
const MAXUN_API_URL = process.env.MAXUN_API_URL || 'http://localhost:8080';
const MAXUN_API_KEY = process.env.MAXUN_API_KEY;
const ROBOT_ID = process.env.MAXUN_SPORTS_ROBOT_ID || 'default-nfl-robot-id';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!MAXUN_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing required environment variables (MAXUN_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).");
  process.exit(1);
}

async function runSync() {
  console.log(`🏈 Starting Maxun NFL Sports Sync via ${MAXUN_API_URL}...`);

  try {
    // 1. Trigger Maxun Robot
    console.log(`🤖 Triggering Maxun Robot ID: ${ROBOT_ID}`);
    const triggerRes = await fetch(`${MAXUN_API_URL}/api/v1/robots/${ROBOT_ID}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAXUN_API_KEY}`
      },
      body: JSON.stringify({
        // Parameters to pass to the Maxun robot (e.g., target week or specific URL)
        "url": "https://www.fantasypros.com/nfl/projections/qb.php"
      })
    });

    if (!triggerRes.ok) {
      throw new Error(`Failed to trigger robot: ${triggerRes.statusText}`);
    }

    const { runId } = await triggerRes.json();
    console.log(`⏱️ Job ${runId} started. Polling for completion...`);

    // 2. Poll for Results
    let isComplete = false;
    let data = null;
    let attempts = 0;

    while (!isComplete && attempts < 30) {
      attempts++;
      await new Promise(r => setTimeout(r, 5000)); // wait 5 seconds

      const pollRes = await fetch(`${MAXUN_API_URL}/api/v1/runs/${runId}`, {
        headers: { 'Authorization': `Bearer ${MAXUN_API_KEY}` }
      });
      const pollData = await pollRes.json();

      if (pollData.status === 'completed') {
        isComplete = true;
        data = pollData.data;
      } else if (pollData.status === 'failed') {
        throw new Error("Maxun extraction failed.");
      }
    }

    if (!data) {
      throw new Error("Timeout waiting for Maxun extraction.");
    }

    console.log(`✅ Extraction successful. Found ${data.length || 0} records.`);

    // 3. Push to Supabase
    console.log("💾 Pushing data to Supabase (table: nfl_projections)...");
    
    // In a real environment, you might use the Supabase SDK here. 
    // We are using a direct REST call for the script.
    const supaRes = await fetch(`${SUPABASE_URL}/rest/v1/nfl_projections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(data)
    });

    if (!supaRes.ok) {
      const supaErr = await supaRes.text();
      throw new Error(`Supabase push failed: ${supaErr}`);
    }

    console.log("🎉 NFL Sports Sync completed successfully.");

  } catch (error) {
    console.error("❌ Sync failed:", error.message);
    process.exit(1);
  }
}

runSync();
