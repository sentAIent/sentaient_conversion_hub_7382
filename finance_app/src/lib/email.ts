import { env } from '../env.mjs';

// Minimal email client abstraction (e.g. wrapping Resend or SendGrid)
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Simulating email send.');
    console.log(`[Email] To: ${to} | Subject: ${subject}`);
    return { success: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM_ADDRESS,
        to,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${await res.text()}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}
