export interface Expense {
  id: string;
  merchant: string;
  date: string;
  amount: number;
  tax: number;
  category: string;
  receiptUrl?: string;
}

// Initial mock data
export const MOCK_EXPENSES: Expense[] = [
  { id: '1', merchant: 'AWS', date: '2024-03-01', amount: 150.00, tax: 12.00, category: 'Software' },
  { id: '2', merchant: 'WeWork', date: '2024-03-05', amount: 500.00, tax: 40.00, category: 'Office' },
  { id: '3', merchant: 'Delta Airlines', date: '2024-03-12', amount: 450.00, tax: 35.00, category: 'Travel' },
  { id: '4', merchant: 'Uber', date: '2024-03-15', amount: 45.50, tax: 3.50, category: 'Travel' },
  { id: '5', merchant: 'GitHub', date: '2024-03-18', amount: 10.00, tax: 0.80, category: 'Software' },
];

export const EXPENSE_CATEGORIES = [
  'Software',
  'Office',
  'Travel',
  'Meals',
  'Marketing',
  'Hardware',
  'Other'
];

export interface OCRExtractionResult {
  merchant: string;
  date: string;
  amount: number;
  tax: number;
  category: string;
  confidence: number;
}

// Simulates an API call to an OCR service
export const mockScanReceipt = async (file: File): Promise<OCRExtractionResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate some somewhat random but plausible data based on file name or just random
      const isUber = file.name.toLowerCase().includes('uber') || Math.random() > 0.8;
      
      resolve({
        merchant: isUber ? 'Uber Technologies' : 'Local Coffee Shop',
        date: new Date().toISOString().split('T')[0],
        amount: isUber ? 34.50 : 12.75,
        tax: isUber ? 2.50 : 1.00,
        category: isUber ? 'Travel' : 'Meals',
        confidence: 0.85 + (Math.random() * 0.1) // 85% - 95% confidence
      });
    }, 2500); // Simulate network and processing delay
  });
};

export const getExpensesByCategory = (expenses: Expense[]) => {
  const totals: Record<string, number> = {};
  EXPENSE_CATEGORIES.forEach(cat => totals[cat] = 0);
  
  expenses.forEach(exp => {
    if (totals[exp.category] !== undefined) {
      totals[exp.category] += exp.amount;
    } else {
      totals['Other'] = (totals['Other'] || 0) + exp.amount;
    }
  });
  
  return totals;
};
