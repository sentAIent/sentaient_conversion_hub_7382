import { NextResponse } from 'next/server';
import { ReconciliationEngine } from '@/lib/reconciliationEngine';
import { ImmutableLedger } from '@/lib/immutableLedger';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const webhookType = payload.webhook_type;
    const webhookCode = payload.webhook_code;
    const itemId = payload.item_id;

    console.log(`[Plaid Webhook] Type: ${webhookType}, Code: ${webhookCode}, Item: ${itemId}`);

    // If transactions sync update is available
    if (webhookType === 'TRANSACTIONS' && (webhookCode === 'SYNC_UPDATES_AVAILABLE' || webhookCode === 'DEFAULT_UPDATE')) {
      const ledger = new ImmutableLedger();
      
      // Auto-journal bank sync event
      ledger.recordEntry({
        id: `plaid_sync_${Date.now()}`,
        reference: `PLD-${itemId || 'ITEM'}`,
        description: `Automated Plaid Bank Feed Ingestion (${webhookCode})`,
        entityId: 'ent-main',
        postings: [
          { accountId: '101', accountName: 'Operating Checking', accountType: 'ASSET', debit: 0, credit: 0 }
        ]
      });

      return NextResponse.json({
        received: true,
        action: 'TRANSACTIONS_SYNC_INITIATED',
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ received: true, status: 'IGNORED_EVENT_TYPE' });
  } catch (error: any) {
    console.error('Plaid Webhook Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
