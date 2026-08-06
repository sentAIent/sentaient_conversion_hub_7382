import { NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid';

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
    const { clientUserId } = await request.json();

    if (!process.env.PLAID_CLIENT_ID || !process.env.PLAID_SECRET) {
      return NextResponse.json({ error: 'Plaid credentials missing in environment' }, { status: 500 });
    }

    const tokenResponse = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: clientUserId || 'user-id-mock',
      },
      client_name: 'Liquid',
      products: [Products.Auth, Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    });

    return NextResponse.json(tokenResponse.data, { status: 200 });
  } catch (error: any) {
    console.error('[Plaid API] create-link-token error:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to create Plaid link token' }, { status: 500 });
  }
}
