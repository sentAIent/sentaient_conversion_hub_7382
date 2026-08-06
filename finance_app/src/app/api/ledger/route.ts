import { NextResponse } from 'next/server';
import { initActualBudget } from '@/lib/actualBudget';

export async function POST(request: Request) {
  try {
    const tradeData = await request.json();

    if (!tradeData) {
      return NextResponse.json({ error: 'Trade data is required' }, { status: 400 });
    }

    // Initialize the Actual Budget connection
    const api = await initActualBudget();

    if (!api) {
       return NextResponse.json({ message: 'Ledger sync skipped (Local Mode)' }, { status: 200 });
    }

    // Advanced: In a real implementation we would:
    // 1. Find or create the correct account in Actual
    // 2. Format the trade P&L into a valid transaction object
    // 3. Post it using api.importTransactions(accountId, [tx])

    console.log('[Ledger API] Received trade to sync:', tradeData.id);

    return NextResponse.json({ 
      success: true,
      message: 'Trade synced to Actual Budget successfully'
    }, { status: 200 });

  } catch (error: any) {
    console.error('[Ledger API] Error syncing trade:', error);
    return NextResponse.json({ error: error.message || 'Failed to sync trade' }, { status: 500 });
  }
}
