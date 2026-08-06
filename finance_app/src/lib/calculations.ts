import { InvoiceData } from './invoiceTypes';

export interface ExpenseDataRow {
  id: string;
  amount: number;
  date: string;
  category: string;
  merchant_name: string;
}

export interface InvoiceDataRow {
  id: string;
  data: InvoiceData;
  status: string;
  date: string;
  due_date: string;
}

// Helper to calculate total for an invoice
export const calculateInvoiceTotal = (invoice: InvoiceData) => {
  let subtotal = invoice.items?.reduce((sum, item) => sum + (item.quantity * item.rate), 0) || 0;
  
  // discount
  if (invoice.discountValue > 0) {
    if (invoice.discountType === 'percentage') {
      subtotal -= subtotal * (invoice.discountValue / 100);
    } else {
      subtotal -= invoice.discountValue;
    }
  }

  // tax
  let taxAmt = 0;
  if (invoice.taxValue > 0) {
    if (invoice.taxType === 'percentage') {
      taxAmt = subtotal * (invoice.taxValue / 100);
    } else {
      taxAmt = invoice.taxValue;
    }
  }

  // shipping
  let shipAmt = invoice.shippingValue || 0;
  
  return subtotal + taxAmt + shipAmt;
};

// 1. Tax Liability
export const calculateTaxLiability = (invoices: InvoiceDataRow[], expenses: ExpenseDataRow[], taxRate = 0.25) => {
  const totalRevenue = invoices.reduce((sum, inv) => sum + calculateInvoiceTotal(inv.data), 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const taxableIncome = Math.max(0, totalRevenue - totalExpenses);
  return taxableIncome * taxRate;
};

// 2. Profit Margins & COGS
export const calculateProfitMetrics = (invoices: InvoiceDataRow[], expenses: ExpenseDataRow[]) => {
  const totalRevenue = invoices.reduce((sum, inv) => sum + calculateInvoiceTotal(inv.data), 0);
  
  // Mock logic: classify "Inventory", "Materials", "Cost of Goods Sold" as COGS.
  // The rest are OPEX.
  let cogs = 0;
  let opex = 0;
  
  expenses.forEach(exp => {
    const cat = exp.category.toLowerCase();
    if (cat.includes('inventory') || cat.includes('material') || cat.includes('cogs') || cat.includes('supplies')) {
      cogs += exp.amount;
    } else {
      opex += exp.amount;
    }
  });

  const grossProfit = totalRevenue - cogs;
  const netProfit = grossProfit - opex;

  const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
  const netMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  return {
    totalRevenue,
    cogs,
    opex,
    grossProfit,
    netProfit,
    grossMargin,
    netMargin
  };
};

// 3. Cash Flow Forecasting (30 days)
export const calculateCashFlow = (invoices: InvoiceDataRow[], expenses: ExpenseDataRow[], currentBalance: number) => {
  const today = new Date();
  const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  // Incoming cash: Unpaid invoices due in the next 30 days (mocking "unpaid" if not explicitly 'paid')
  let incomingCash = 0;
  invoices.forEach(inv => {
    const dueDate = new Date(inv.due_date);
    if (dueDate >= today && dueDate <= next30Days && inv.status !== 'paid') {
      incomingCash += calculateInvoiceTotal(inv.data);
    }
  });

  // Outgoing cash: Average monthly expenses over the past 90 days.
  // We'll just take total expenses, divide by (days difference) and multiply by 30 to project.
  // Or just a simple mock: last 30 days of expenses replicated.
  let recentExpenses = 0;
  const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  expenses.forEach(exp => {
    const expDate = new Date(exp.date);
    if (expDate >= last30Days && expDate <= today) {
      recentExpenses += exp.amount;
    }
  });

  const projectedOutgoing = recentExpenses; // Simple projection: next 30 days = last 30 days
  const projectedBalance = currentBalance + incomingCash - projectedOutgoing;

  return {
    currentBalance,
    incomingCash,
    projectedOutgoing,
    projectedBalance,
    runwayMonths: projectedOutgoing > 0 ? projectedBalance / projectedOutgoing : 999
  };
};
