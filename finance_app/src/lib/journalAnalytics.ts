export interface JournaledTrade {
  id: string;
  asset: string;
  entryDate: Date;
  exitDate?: Date;
  entryPrice: number;
  exitPrice?: number;
  positionSize: number;
  isLong: boolean;
  strategyTag: string;
  notes: string;
  fees: number;
}

export interface JournalMetrics {
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  grossProfit: number;
  grossLoss: number;
  netPnL: number;
  averageWin: number;
  averageLoss: number;
  expectancy: number;
  largestWin: number;
  largestLoss: number;
  maxDrawdown: number;
  consecutiveWins: number;
  consecutiveLosses: number;
}

export function calculateJournalMetrics(trades: JournaledTrade[]): JournalMetrics {
  const completed = trades.filter(t => t.exitPrice !== undefined);
  if (completed.length === 0) {
    return {
      totalTrades: 0, winRate: 0, profitFactor: 0, grossProfit: 0, grossLoss: 0, netPnL: 0,
      averageWin: 0, averageLoss: 0, expectancy: 0, largestWin: 0, largestLoss: 0,
      maxDrawdown: 0, consecutiveWins: 0, consecutiveLosses: 0
    };
  }

  let grossProfit = 0;
  let grossLoss = 0;
  let wins = 0;
  let largestWin = 0;
  let largestLoss = 0;
  
  let currentStreak = 0;
  let maxWinStreak = 0;
  let maxLossStreak = 0;
  
  let peakCapital = 0;
  let maxDrawdown = 0;
  let runningPnL = 0;

  for (const trade of completed) {
    const exit = trade.exitPrice!;
    const entry = trade.entryPrice;
    
    // PnL calculation
    const priceDiff = trade.isLong ? (exit - entry) : (entry - exit);
    const pnl = (priceDiff * trade.positionSize) - trade.fees;
    
    runningPnL += pnl;
    
    // Drawdown calculation
    if (runningPnL > peakCapital) {
      peakCapital = runningPnL;
    }
    const drawdown = peakCapital - runningPnL;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }

    if (pnl > 0) {
      grossProfit += pnl;
      wins++;
      if (pnl > largestWin) largestWin = pnl;
      
      // Streaks
      if (currentStreak > 0) currentStreak++;
      else currentStreak = 1;
      if (currentStreak > maxWinStreak) maxWinStreak = currentStreak;
      
    } else if (pnl < 0) {
      const loss = Math.abs(pnl);
      grossLoss += loss;
      if (loss > largestLoss) largestLoss = loss;
      
      // Streaks
      if (currentStreak < 0) currentStreak--;
      else currentStreak = -1;
      if (Math.abs(currentStreak) > maxLossStreak) maxLossStreak = Math.abs(currentStreak);
    }
  }

  const losses = completed.length - wins;
  const winRate = (wins / completed.length) * 100;
  const profitFactor = grossLoss === 0 ? grossProfit : (grossProfit / grossLoss);
  const averageWin = wins > 0 ? grossProfit / wins : 0;
  const averageLoss = losses > 0 ? grossLoss / losses : 0;
  const expectancy = (winRate / 100 * averageWin) - ((1 - winRate / 100) * averageLoss);

  return {
    totalTrades: completed.length,
    winRate,
    profitFactor,
    grossProfit,
    grossLoss,
    netPnL: grossProfit - grossLoss,
    averageWin,
    averageLoss,
    expectancy,
    largestWin,
    largestLoss,
    maxDrawdown,
    consecutiveWins: maxWinStreak,
    consecutiveLosses: maxLossStreak
  };
}
