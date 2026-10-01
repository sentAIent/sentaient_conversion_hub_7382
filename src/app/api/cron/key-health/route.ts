import { NextResponse } from 'next/server';

// Mock Webhook URL
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/mock';

export async function GET(request: Request) {
  // Multi-broker API connection health check
  const brokers = [
    { name: 'OpenAI', endpoint: 'https://api.openai.com/v1/models', key: process.env.OPENAI_API_KEY },
    { name: 'Google', endpoint: 'https://generativelanguage.googleapis.com/v1beta/models', key: process.env.GOOGLE_API_KEY }
  ];

  const results = [];
  let issuesFound = false;

  for (const broker of brokers) {
    try {
      const res = await fetch(broker.endpoint, {
        headers: broker.key ? { 'Authorization': `Bearer ${broker.key}` } : {}
      });
      
      if (!res.ok) {
        issuesFound = true;
        results.push(`${broker.name}: Failed with status ${res.status}`);
      } else {
        results.push(`${broker.name}: OK`);
      }
    } catch (e) {
      issuesFound = true;
      results.push(`${broker.name}: Connection Error`);
    }
  }

  if (issuesFound) {
    // Report token expirations or issues
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚨 **API Key Health Alert**\nIssues detected:\n${results.join('\n')}`
        })
      });
    } catch (e) {
      console.error('Failed to send webhook', e);
    }
  }

  return NextResponse.json({ success: true, results });
}
