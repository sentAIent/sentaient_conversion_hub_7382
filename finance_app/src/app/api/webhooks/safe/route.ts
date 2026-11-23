import { NextResponse } from 'next/server';
import { PushNotificationSentry } from '@/lib/mobile/pushNotificationSentry';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const eventType = payload.type || payload.event;
    const address = payload.address || payload.safeAddress;

    console.log(`[Gnosis Safe Webhook] Event: ${eventType}, Safe: ${address}`);

    if (eventType === 'PENDING_MULTISIG_TRANSACTION' || eventType === 'NEW_CONFIRMATION') {
      const alert = PushNotificationSentry.createMultiSigSignRequest(
        'Main Treasury Safe',
        payload.amountUSD || 50000,
        payload.to || '0xDestination'
      );

      return NextResponse.json({
        received: true,
        action: 'PUSH_NOTIFICATION_DISPATCHED',
        notificationId: alert.notificationId,
        priority: alert.priority
      });
    }

    return NextResponse.json({ received: true, status: 'ACKNOWLEDGED' });
  } catch (error: any) {
    console.error('Safe Webhook Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
