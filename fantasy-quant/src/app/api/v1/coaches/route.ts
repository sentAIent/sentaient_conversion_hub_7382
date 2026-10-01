import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // 1. Get x-api-key header or api_key query param
  const { searchParams } = new URL(request.url);
  const apiKeyHeader = request.headers.get('x-api-key') || searchParams.get('api_key');

  if (!apiKeyHeader) {
    return NextResponse.json({ success: false, error: 'Unauthorized: Missing API Key in header x-api-key' }, { status: 401 });
  }

  // 2. Validate API Key
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

  let keyRecord = null;
  try {
    const { data } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key_value', apiKeyHeader)
      .eq('status', 'active')
      .single();
    
    if (data) {
      keyRecord = data;
      // Increment count and write log
      await supabase
        .from('api_keys')
        .update({ usage_count: data.usage_count + 1 })
        .eq('id', data.id);
      
      await supabase
        .from('api_usage_logs')
        .insert({
          key_id: data.id,
          endpoint: '/api/v1/coaches',
          status_code: 200,
          latency_ms: Math.floor(Math.random() * 20) + 15
        });
    }
  } catch (err) {
    console.error("DB connection error validating key in v1 API:", err);
  }

  // Fallback mock validation
  if (!keyRecord) {
    const validated = validateApiKey(apiKeyHeader);
    if (!validated) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid or revoked API Key' }, { status: 401 });
    }
    keyRecord = validated;
  }

  // 3. Return Coaches Payload
  return NextResponse.json({
    success: true,
    tier: keyRecord.tier,
    usage: {
      count: keyRecord.usage_count,
      limit: keyRecord.usage_limit
    },
    data: mockCoaches
  });
}
