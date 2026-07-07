import fetch from 'node-fetch';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

export interface PushPayload {
  to: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  sound?: 'default' | null;
  badge?: number;
}

export async function sendPushNotification(payload: PushPayload | PushPayload[]): Promise<void> {
  const messages = Array.isArray(payload) ? payload : [payload];
  // Filter out non-Expo tokens
  const valid = messages.filter(m => m.to && m.to.startsWith('ExponentPushToken'));
  if (valid.length === 0) return;

  try {
    await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
      },
      body: JSON.stringify(valid),
    });
  } catch (err) {
    console.error('[Push] Failed to send push notification:', err);
  }
}
