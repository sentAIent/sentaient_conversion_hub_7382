import { NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export async function POST(request: Request) {
  try {
    const { public_token } = await request.json();

    if (!public_token) {
      return NextResponse.json({ error: 'Missing public token' }, { status: 400 });
    }

    const response = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // In a real application, you would save these securely to your database (e.g. Supabase)
    // linked to the currently authenticated user.
    console.log('[Plaid API] Token exchanged successfully. Item ID:', itemId);

    return NextResponse.json({ 
      success: true, 
      message: 'Bank account connected successfully',
      item_id: itemId 
    }, { status: 200 });

  } catch (error: any) {
    console.error('[Plaid API] exchange-public-token error:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to exchange public token' }, { status: 500 });
  }
}
