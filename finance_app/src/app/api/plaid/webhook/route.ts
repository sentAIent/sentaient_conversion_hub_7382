import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Webhook endpoint for Plaid
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    
    // Plaid webhook structure
    if (payload.webhook_type === 'TRANSACTIONS') {
      console.log(`Received Plaid Webhook: ${payload.webhook_code} for item ${payload.item_id}`);
      
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // Log webhook for the Edge Function sync daemon to process
      await supabase.from('plaid_webhooks').insert([
        {
          item_id: payload.item_id,
          webhook_code: payload.webhook_code,
          payload: payload
        }
      ]);

      // If SYNC_UPDATES_AVAILABLE, we could also trigger the edge function immediately here,
      // but for reliability, the edge function will process the plaid_webhooks queue via pg_cron.
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
