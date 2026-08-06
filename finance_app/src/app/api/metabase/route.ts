import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  const METABASE_SITE_URL = process.env.METABASE_SITE_URL;
  const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

  if (!METABASE_SITE_URL || !METABASE_SECRET_KEY) {
    return NextResponse.json({ error: 'Metabase configuration is missing in environment variables' }, { status: 500 });
  }

  // Identify the dashboard ID you want to embed. This is typically passed in as a query param, 
  // but we will hardcode it to 1 for the main financial statements dashboard as a default.
  const { searchParams } = new URL(request.url);
  const dashboardId = parseInt(searchParams.get('dashboardId') || '1', 10);

  const payload = {
    resource: { dashboard: dashboardId },
    params: {
      // You can pass specific filter params here based on the authenticated user.
      // e.g., "entity_id": currentUserId
    },
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };

  try {
    const token = jwt.sign(payload, METABASE_SECRET_KEY);
    
    // Construct the secure iframe URL
    const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;
    
    return NextResponse.json({ iframeUrl }, { status: 200 });
  } catch (error: any) {
    console.error('[Metabase API] JWT Sign Error:', error);
    return NextResponse.json({ error: 'Failed to generate signed Metabase URL' }, { status: 500 });
  }
}
