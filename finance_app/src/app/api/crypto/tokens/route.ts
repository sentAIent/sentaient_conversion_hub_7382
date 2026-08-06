import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { userId, chainId, tokenAddress, name, symbol, supply, decimals } = await req.json();

    if (!userId || !chainId || !tokenAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('deployed_tokens')
      .insert([
        {
          user_id: userId,
          chain_id: chainId,
          token_address: tokenAddress,
          name,
          symbol,
          supply,
          decimals,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving deployed token:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
