import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    let allData: any[] = [];
    let hasMore = true;
    let offset = 0;
    const limit = 1000;

    while (hasMore) {
      const { data, error } = await supabase
        .from('positional_sos_heatmaps')
        .select('*')
        .order('position')
        .order('team')
        .order('week')
        .range(offset, offset + limit - 1);

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      if (data && data.length > 0) {
        allData = [...allData, ...data];
        offset += limit;
      } else {
        hasMore = false;
      }

      if (data && data.length < limit) {
        hasMore = false;
      }
    }

    return NextResponse.json({
      success: true,
      data: allData
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
