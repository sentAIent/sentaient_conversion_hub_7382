import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coachName = searchParams.get('coachName');
  const season = searchParams.get('season');

  if (!coachName) {
    return NextResponse.json({ error: 'Missing coachName' }, { status: 400 });
  }

  let query = supabase
    .from('scheme_stats')
    .select('*')
    .eq('coach_name', coachName);

  if (season) {
    query = query.eq('season', parseInt(season));
  }

  const { data: stats, error: statsError } = await query;

  if (statsError) {
    return NextResponse.json({ error: statsError.message }, { status: 500 });
  }

  // Also fetch the coach info
  const { data: coachInfo, error: coachError } = await supabase
    .from('coaches')
    .select('*')
    .eq('coach_name', coachName)
    .limit(1)
    .single();

  if (coachError && coachError.code !== 'PGRST116') {
    return NextResponse.json({ error: coachError.message }, { status: 500 });
  }

  return NextResponse.json({
    coach: coachInfo || null,
    stats: stats || []
  });
}
