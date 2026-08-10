// Parses and anonymizes Plaid transactions for AI analysis

export interface PlaidTransaction {
  transaction_id: string;
  category: string[];
  amount: number;
  date: string;
  merchant_name: string | null;
}

export interface AnonymizedTransaction {
  category: string;
  amount_range: string;
  date_quarter: string;
  business_relevance: string; // e.g. "Software", "Travel"
}

/**
 * Scrubs financial and PII data from Plaid transactions.
 * Prevents passing exact numbers and vendors to the AI.
 */
export function anonymizePlaidData(transactions: PlaidTransaction[]): AnonymizedTransaction[] {
  return transactions.map(tx => {
    // Scrub amount into ranges
    let amountRange = "Unknown";
    if (tx.amount < 100) amountRange = "Under $100";
    else if (tx.amount < 1000) amountRange = "$100 - $1k";
    else if (tx.amount < 10000) amountRange = "$1k - $10k";
    else amountRange = "Over $10k";

    // Scrub exact date to quarter
    const date = new Date(tx.date);
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    const dateQuarter = `Q${quarter} ${date.getFullYear()}`;

    // Extract broad category, dropping specific merchant
    const category = tx.category.length > 0 ? tx.category[0] : "General";

    return {
      category,
      amount_range: amountRange,
      date_quarter: dateQuarter,
      business_relevance: category, // Pass general category to AI
    };
  });
}

/**
 * Aggregates transactions by calendar year to give the AI a macro view.
 */
export function aggregateByYear(transactions: AnonymizedTransaction[]) {
  const aggregated: Record<string, { total_transactions: number, categories: Record<string, number> }> = {};

  transactions.forEach(tx => {
    const year = tx.date_quarter.split(" ")[1];
    if (!aggregated[year]) {
      aggregated[year] = { total_transactions: 0, categories: {} };
    }
    
    aggregated[year].total_transactions++;
    
    if (!aggregated[year].categories[tx.category]) {
      aggregated[year].categories[tx.category] = 0;
    }
    aggregated[year].categories[tx.category]++;
  });

  return aggregated;
}
