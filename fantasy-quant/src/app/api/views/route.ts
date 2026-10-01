import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { data, error } = await supabase
      .from('user_views')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching views:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, config } = body;

    // Check tier limits - For now assume Free Tier = 1 limit
    const { count, error: countError } = await supabase
      .from('user_views')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);
      
    if (countError) throw countError;
    
    // Simulating free tier limit of 1
    if (count !== null && count >= 1) {
       // Just update the first one instead of failing for this demo
       const { data: existingData } = await supabase
        .from('user_views')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);
        
       if (existingData && existingData.length > 0) {
           const { data, error } = await supabase
             .from('user_views')
             .update({ name, config, updated_at: new Date().toISOString() })
             .eq('id', existingData[0].id)
             .select()
             .single();
           if (error) throw error;
           return NextResponse.json(data);
       }
    }

    const { data, error } = await supabase
      .from('user_views')
      .insert({
        user_id: user.id,
        name,
        config
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error saving view:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
