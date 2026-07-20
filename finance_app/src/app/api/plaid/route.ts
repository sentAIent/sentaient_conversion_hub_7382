import { NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

// Note: To use this in production, you must set these environment variables in .env.local
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID || 'mock_client_id',
      'PLAID-SECRET': process.env.PLAID_SECRET || 'mock_secret',
    },
  },
});

const client = new PlaidApi(configuration);

export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (action === 'create_link_token') {
      // In a real app, you would fetch this from the user's session
      const clientUserId = 'user_good'; 

      if (!process.env.PLAID_CLIENT_ID) {
         // Return a mock token for frontend development if no keys exist
         return NextResponse.json({ link_token: 'mock-link-token-123' });
      }

      const request = {
        user: { client_user_id: clientUserId },
        client_name: 'AutoPilot Financials',
        products: ['auth', 'transactions'],
        country_codes: ['US'],
        language: 'en',
      };
      
      const createTokenResponse = await client.linkTokenCreate(request as any);
      return NextResponse.json(createTokenResponse.data);
    }

    if (action === 'exchange_public_token') {
      // Handle exchanging the public token for an access token
      // const exchangeResponse = await client.itemPublicTokenExchange({ public_token: ... });
      return NextResponse.json({ success: true, message: "Mock public token exchanged." });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Error in Plaid API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
