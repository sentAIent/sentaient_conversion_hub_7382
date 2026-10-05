import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  try {
    // In production we would query api_usage_logs, group by hour, and aggregate.
    // E.g. SELECT date_trunc('hour', created_at) as hour, count(*) as requests, avg(latency_ms) as latency, count(case when status_code >= 400 then 1 end) as errors FROM api_usage_logs GROUP BY hour ORDER BY hour ASC LIMIT 24;
    // For now we try a basic check.
    const { data: logs } = await supabase
      .from('api_usage_logs')
      .select('*')
      .limit(10);
    
    if (logs && logs.length > 0) {
      // In production, build usage stats from real logs. For demonstration we'll yield our mock list.
    }
  } catch (err) {
    console.error("DB connection error fetching usage stats:", err);
  }

  return NextResponse.json({ data: mockUsageData, success: true, fallback: true });
}
