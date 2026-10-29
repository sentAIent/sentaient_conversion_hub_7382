import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Log the CSP violation to the console (or external logging service like Sentry)
    console.warn('CSP Violation detected:', JSON.stringify(body, null, 2));

    // Here you would typically send this to an external monitoring tool
    // e.g., Sentry.captureException(new Error('CSP Violation'), { extra: body });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing CSP report:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
