import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { taxRate } = await request.json();
    
    // In a production environment, this would query Supabase for YTD income
    // from the user's actual `invoices` or `trades` table.
    // For this demonstration engine, we will calculate based on realistic mock data.
    
    const mockRevenue = 145000;
    const mockDeductibleExpenses = 32000;
    const netIncome = mockRevenue - mockDeductibleExpenses;
    
    // Calculate the estimated tax based on the user-provided rate (e.g. 25%)
    const rateDecimal = (taxRate || 0) / 100;
    const estimatedTax = netIncome * rateDecimal;
    
    // Calculate a quarterly breakdown
    const quarterlyEstimate = estimatedTax / 4;

    return NextResponse.json({
      success: true,
      data: {
        revenue: mockRevenue,
        expenses: mockDeductibleExpenses,
        netIncome: netIncome,
        estimatedTotalTax: estimatedTax,
        quarterlyEstimate: quarterlyEstimate
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
