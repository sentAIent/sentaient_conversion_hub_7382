import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  // Define endpoints to query and assert on
  const tests = [
    {
      name: "Creator Marketplace Feed Gating API",
      url: `${origin}/api/bets/feed`,
      method: "GET"
    },
    {
      name: "DFS Syndicates Listing API",
      url: `${origin}/api/syndicates`,
      method: "GET"
    },
    {
      name: "B2B Developer Keys API",
      url: `${origin}/api/developer/keys`,
      method: "GET"
    },
    {
      name: "Real-Money Pick'em Wallet Account API",
      url: `${origin}/api/pickem/account`,
      method: "GET"
    },
    {
      name: "J.A.R.V.I.S. AI Chat Agent API",
      url: `${origin}/api/agent/chat`,
      method: "POST",
      body: { message: "Show QB values" }
    }
  ];

  const results = [];
  let allPassed = true;

  for (const t of tests) {
    const start = Date.now();
    try {
      const fetchOpts: RequestInit = {
        method: t.method,
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store'
      };

      if (t.method === 'POST' && t.body) {
        fetchOpts.body = JSON.stringify(t.body);
      }

      const res = await fetch(t.url, fetchOpts);
      const latency = Date.now() - start;
      const json = await res.json().catch(() => null);

      const statusOk = res.ok;
      const validSchema = json && json.success === true;
      const passed = statusOk && validSchema;

      if (!passed) allPassed = false;

      results.push({
        name: t.name,
        endpoint: t.url.replace(origin, ''),
        status: res.status,
        latency_ms: latency,
        schema_valid: !!validSchema,
        result: passed ? "PASSED" : "FAILED"
      });
    } catch (err: any) {
      allPassed = false;
      results.push({
        name: t.name,
        endpoint: t.url.replace(origin, ''),
        status: 500,
        latency_ms: Date.now() - start,
        schema_valid: false,
        result: "FAILED",
        error: err.message
      });
    }
  }

  return NextResponse.json({
    success: true,
    all_passed: allPassed,
    test_run: {
      timestamp: new Date().toISOString(),
      tests_count: tests.length,
      passed_count: results.filter(r => r.result === 'PASSED').length,
      failed_count: results.filter(r => r.result === 'FAILED').length
    },
    results
  });
}
