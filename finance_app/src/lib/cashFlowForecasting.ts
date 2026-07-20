import { Transaction } from './categorizationEngine';

export interface ForecastResult {
  currentBalance: number;
  thirtyDayProjection: number;
  sixtyDayProjection: number;
  ninetyDayProjection: number;
  monthlyRunRate: number;
  recurringIncome: number;
  recurringExpenses: number;
}

export function generateCashFlowForecast(
  transactions: Transaction[],
  currentAssetBalance: number
): ForecastResult {
  // Very simplified logic to identify "recurring" transactions
  // In a real app, we'd look for transactions with similar merchants and amounts that occur ~every 30 days.
  // For this mock, we'll just sum up all negative transactions from the last 30 days and assume they recur.
  
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  let monthlyIncome = 0;
  let monthlyExpenses = 0;

  transactions.forEach(tx => {
    const txDate = new Date(tx.date);
    if (txDate >= thirtyDaysAgo) {
      if (tx.amount > 0) {
        monthlyIncome += tx.amount;
      } else {
        monthlyExpenses += Math.abs(tx.amount);
      }
    }
  });

  const netMonthlyCashFlow = monthlyIncome - monthlyExpenses;

  return {
    currentBalance: currentAssetBalance,
    thirtyDayProjection: currentAssetBalance + netMonthlyCashFlow,
    sixtyDayProjection: currentAssetBalance + (netMonthlyCashFlow * 2),
    ninetyDayProjection: currentAssetBalance + (netMonthlyCashFlow * 3),
    monthlyRunRate: netMonthlyCashFlow,
    recurringIncome: monthlyIncome,
    recurringExpenses: monthlyExpenses
  };
}
