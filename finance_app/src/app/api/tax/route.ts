import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { anonymizePlaidData, aggregateByYear } from '@/lib/plaidParser';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore in edge runtime
            }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Fetch Trades for Tax Loss Harvesting opportunities
    const { data: trades } = await supabase
      .from('trades')
      .select('symbol, amount, created_at')
      .eq('user_id', user.id)
      .limit(100);

    // 2. Fetch Invoices to estimate revenue
    const { data: invoices } = await supabase
      .from('invoices')
      .select('status')
      .eq('user_id', user.id);

    // 3. Fetch Plaid Webhooks (simulating parsed transactions for MVP)
    // Normally we'd call Plaid API here based on webhook payload
    const { data: webhooks } = await supabase
      .from('plaid_webhooks')
      .select('payload')
      .limit(50);

    // Data Anonymization
    // We convert everything to relative percentages and categories.
    const anonymizedTrades = (trades || []).map(t => ({
      asset_type: t.symbol,
      status: "held",
      // Hide exact amount, just indicate it exists
      has_position: true, 
      acquisition_quarter: new Date(t.created_at).getFullYear()
    }));

    const totalInvoices = invoices?.length || 0;
    const paidInvoices = invoices?.filter(i => i.status === 'paid').length || 0;
    const revenueProfile = {
      invoice_volume: totalInvoices > 50 ? "High" : (totalInvoices > 10 ? "Medium" : "Low"),
      collection_rate: totalInvoices > 0 ? (paidInvoices / totalInvoices).toFixed(2) : "0"
    };

    // Simulate Plaid Transactions based on webhooks
    const mockPlaidTxs = (webhooks || []).map((w, i) => ({
      transaction_id: `mock_${i}`,
      category: ['Software', 'Travel', 'Meals'][i % 3] ? [['Software', 'Travel', 'Meals'][i % 3]] : ['General'],
      amount: Math.random() * 500,
      date: new Date().toISOString(),
      merchant_name: 'Hidden Merchant'
    }));
    
    const anonymizedExpenses = anonymizePlaidData(mockPlaidTxs);
    const aggregatedExpenses = aggregateByYear(anonymizedExpenses);

    // AI Generation
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert CPA and tax strategist specializing in US IRS tax law for corporate and high-net-worth individuals.
      Review the following ANONYMIZED financial profile for a client and generate 3-5 actionable tax strategies.
      
      Anonymized Financial Data:
      - Trading Profile: ${JSON.stringify(anonymizedTrades)}
      - Corporate Revenue Profile: ${JSON.stringify(revenueProfile)}
      - Aggregated Expenses by Year: ${JSON.stringify(aggregatedExpenses)}

      Focus areas:
      1. Tax Loss Harvesting (analyze the trading profile for opportunities).
      2. Corporate Deductions (analyze the expense categories for Section 162 deductions).
      3. Strategic Planning (SEP IRA, Section 179, etc.).
      
      CRITICAL: You are an AI. Do NOT mention specific dollar amounts since they were scrubbed.
      Output the response in strict JSON format matching this schema:
      {
        "strategies": [
          { "title": "Strategy Name", "description": "Detailed explanation", "category": "Trading | Corporate | Planning", "impact": "High | Medium | Low" }
        ]
      }
      Do not include markdown formatting like \`\`\`json.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Parse the JSON output (stripping any markdown if the model hallucinated it)
    const jsonStr = text.replace(/```json\n?|```/g, '');
    const strategies = JSON.parse(jsonStr);

    return NextResponse.json(strategies);
  } catch (error: any) {
    console.error('Tax API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
