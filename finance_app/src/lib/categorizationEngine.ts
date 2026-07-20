import Fuse from 'fuse.js';

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
}

export interface CategorizedTransaction extends Transaction {
  category: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  method: 'EXACT' | 'FUZZY' | 'AI' | 'FALLBACK';
}

const categoryRules: Record<string, string[]> = {
  'Software/Hosting': ['AWS', 'Amazon Web Services', 'Google Cloud', 'DigitalOcean', 'Vercel', 'Github'],
  'Office Supplies': ['Staples', 'Office Depot', 'Amazon', 'Best Buy'],
  'Travel': ['Delta', 'Uber', 'Lyft', 'Airbnb', 'Marriott', 'United Airlines'],
  'Meals': ['Starbucks', 'McDonalds', 'Chipotle', 'Sweetgreen', 'Doordash'],
  'Income': ['Stripe', 'PayPal', 'Client Payment', 'Upwork', 'Wire Transfer']
};

// Flatten rules for Fuse.js
const fuseData = Object.entries(categoryRules).flatMap(([category, keywords]) => 
  keywords.map(keyword => ({ category, keyword }))
);

const fuse = new Fuse(fuseData, {
  keys: ['keyword'],
  threshold: 0.3, // 0.0 is perfect match, 1.0 is anything
});

export async function categorizeWithAI(merchant: string): Promise<string> {
  // Stub for LLM integration (e.g., Gemini or OpenAI)
  // In a real app, this would make an API call:
  // const response = await llm.prompt(`Categorize this merchant: ${merchant}`);
  console.log(`[AI Stub] Categorizing: ${merchant}`);
  return 'Uncategorized'; // Default fallback for now
}

export async function categorizeTransactionAsync(tx: Transaction): Promise<CategorizedTransaction> {
  // 1. Try Exact/Substring Match
  for (const [category, keywords] of Object.entries(categoryRules)) {
    for (const keyword of keywords) {
      if (tx.merchant.toLowerCase().includes(keyword.toLowerCase())) {
        return { ...tx, category, confidence: 'HIGH', method: 'EXACT' };
      }
    }
  }

  // 2. Try Fuzzy Match
  const result = fuse.search(tx.merchant);
  if (result.length > 0 && result[0].score !== undefined && result[0].score < 0.4) {
    return { ...tx, category: result[0].item.category, confidence: 'MEDIUM', method: 'FUZZY' };
  }

  // 3. Try AI Categorization (Fallback)
  const aiCategory = await categorizeWithAI(tx.merchant);
  if (aiCategory !== 'Uncategorized') {
    return { ...tx, category: aiCategory, confidence: 'MEDIUM', method: 'AI' };
  }

  // 4. Default Fallback
  let fallbackCategory = 'Uncategorized';
  if (tx.amount > 0) {
    fallbackCategory = 'Income';
  }

  return { ...tx, category: fallbackCategory, confidence: 'LOW', method: 'FALLBACK' };
}

// Keep the sync version for the mock UI to avoid complex async state management in the current page
export function categorizeTransaction(tx: Transaction): CategorizedTransaction {
  // 1. Try Exact/Substring Match
  for (const [category, keywords] of Object.entries(categoryRules)) {
    for (const keyword of keywords) {
      if (tx.merchant.toLowerCase().includes(keyword.toLowerCase())) {
        return { ...tx, category, confidence: 'HIGH', method: 'EXACT' };
      }
    }
  }

  // 2. Try Fuzzy Match
  const result = fuse.search(tx.merchant);
  if (result.length > 0 && result[0].score !== undefined && result[0].score < 0.4) {
    return { ...tx, category: result[0].item.category, confidence: 'MEDIUM', method: 'FUZZY' };
  }

  // 3. Default Fallback
  let fallbackCategory = 'Uncategorized';
  if (tx.amount > 0) {
    fallbackCategory = 'Income';
  }

  return { ...tx, category: fallbackCategory, confidence: 'LOW', method: 'FALLBACK' };
}

export function generateFinancialStatements(transactions: CategorizedTransaction[], accounts: { name: string; type: 'ASSET' | 'LIABILITY'; balance: number }[] = []) {
  const incomeStatement: Record<string, number> = {};
  let totalIncome = 0;
  let totalExpenses = 0;

  for (const tx of transactions) {
    if (!incomeStatement[tx.category]) {
      incomeStatement[tx.category] = 0;
    }
    
    // Amounts are generally positive for income, negative for expenses in this mock
    incomeStatement[tx.category] += tx.amount;

    if (tx.amount > 0) {
      totalIncome += tx.amount;
    } else {
      totalExpenses += Math.abs(tx.amount);
    }
  }

  // Balance Sheet Logic
  const balanceSheet = {
    assets: [] as { name: string; balance: number }[],
    liabilities: [] as { name: string; balance: number }[],
    totalAssets: 0,
    totalLiabilities: 0,
  };

  for (const acc of accounts) {
    if (acc.type === 'ASSET') {
      balanceSheet.assets.push({ name: acc.name, balance: acc.balance });
      balanceSheet.totalAssets += acc.balance;
    } else {
      balanceSheet.liabilities.push({ name: acc.name, balance: acc.balance });
      balanceSheet.totalLiabilities += acc.balance;
    }
  }

  return {
    breakdown: incomeStatement,
    totalIncome,
    totalExpenses,
    netProfit: totalIncome - totalExpenses,
    balanceSheet
  };
}

