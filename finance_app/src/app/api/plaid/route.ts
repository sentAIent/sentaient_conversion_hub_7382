import { NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid';
import { createClient } from '@/lib/supabase/server';

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
  const { action, public_token } = await request.json();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (action === 'create_link_token') {
      const tokenResponse = await plaidClient.linkTokenCreate({
        user: { client_user_id: user.id },
        client_name: 'Finance App',
        products: [Products.Transactions],
        country_codes: [CountryCode.Us],
        language: 'en',
      });
      return NextResponse.json(tokenResponse.data);
    } 
    else if (action === 'exchange_public_token') {
      const exchangeResponse = await plaidClient.itemPublicTokenExchange({
        public_token: public_token,
      });

      const accessToken = exchangeResponse.data.access_token;
      const itemId = exchangeResponse.data.item_id;
      
      // Get institution name
      const itemResponse = await plaidClient.itemGet({ access_token: accessToken });
      const institutionId = itemResponse.data.item.institution_id;
      let institutionName = 'Unknown Institution';
      if (institutionId) {
        const instResponse = await plaidClient.institutionsGetById({
          institution_id: institutionId,
          country_codes: [CountryCode.Us],
        });
        institutionName = instResponse.data.institution.name;
      }

      // Save to Supabase
      const { error } = await supabase.from('plaid_items').insert({
        user_id: user.id,
        item_id: itemId,
        access_token: accessToken,
        institution_name: institutionName
      });

      if (error) {
        throw new Error('Failed to save to database');
      }

      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Plaid API Error:', error.response?.data || error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
