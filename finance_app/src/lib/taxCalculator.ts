export type TradeType = 'BUY' | 'SELL';
export type AccountingMethod = 'FIFO' | 'LIFO' | 'HIFO' | 'SPEC_ID';

export interface Trade {
  id: string;
  asset: string;
  type: TradeType;
  amount: number;
  priceUSD: number;
  date: Date;
  specificLotIds?: string[]; // Used for SPEC_ID method
}

export interface TaxLot {
  id: string;
  amount: number;
  priceUSD: number;
  date: Date;
}

export interface CapitalGainEvent {
  sellTradeId: string;
  asset: string;
  amountSold: number;
  buyPriceUSD: number;
  sellPriceUSD: number;
  gainUSD: number;
  term: 'SHORT' | 'LONG';
  buyDate: Date;
  sellDate: Date;
  isWashSale?: boolean;
  disallowedLossUSD?: number;
}

export function calculateCapitalGains(trades: Trade[], method: AccountingMethod, applyWashSales: boolean = false): CapitalGainEvent[] {
  // Group trades by asset
  const tradesByAsset: Record<string, Trade[]> = {};
  for (const trade of trades) {
    if (!tradesByAsset[trade.asset]) {
      tradesByAsset[trade.asset] = [];
    }
    tradesByAsset[trade.asset].push(trade);
  }

  const allGains: CapitalGainEvent[] = [];

  for (const asset in tradesByAsset) {
    // Sort trades chronologically
    const assetTrades = tradesByAsset[asset].sort((a, b) => a.date.getTime() - b.date.getTime());
    let inventory: TaxLot[] = [];

    for (const trade of assetTrades) {
      if (trade.type === 'BUY') {
        inventory.push({
          id: trade.id,
          amount: trade.amount,
          priceUSD: trade.priceUSD,
          date: trade.date,
        });
      } else if (trade.type === 'SELL') {
        let remainingToSell = trade.amount;
        
        // Sort inventory based on accounting method
        if (method === 'FIFO') {
          inventory.sort((a, b) => a.date.getTime() - b.date.getTime());
        } else if (method === 'LIFO') {
          inventory.sort((a, b) => b.date.getTime() - a.date.getTime());
        } else if (method === 'HIFO') {
          inventory.sort((a, b) => b.priceUSD - a.priceUSD);
        } else if (method === 'SPEC_ID' && trade.specificLotIds) {
          // Move specific lots to the front of the inventory array
          const specificLots = inventory.filter(lot => trade.specificLotIds?.includes(lot.id));
          const otherLots = inventory.filter(lot => !trade.specificLotIds?.includes(lot.id));
          inventory = [...specificLots, ...otherLots];
        }

        const newInventory: TaxLot[] = [];
        for (let i = 0; i < inventory.length; i++) {
          const lot = inventory[i];
          if (remainingToSell <= 0) {
            newInventory.push(lot);
            continue;
          }

          const amountFromLot = Math.min(lot.amount, remainingToSell);
          
          // Calculate term (assuming > 365 days is long term)
          const daysHeld = (trade.date.getTime() - lot.date.getTime()) / (1000 * 60 * 60 * 24);
          const term = daysHeld > 365 ? 'LONG' : 'SHORT';

          let gain = amountFromLot * (trade.priceUSD - lot.priceUSD);
          let isWashSale = false;
          let disallowedLoss = 0;

          // Simplified Wash Sale Detection: Check for buys within 30 days before/after this sale
          if (gain < 0 && applyWashSales) {
            const hasReplacementBuy = assetTrades.some(t => {
              if (t.type === 'BUY' && t.id !== lot.id) {
                const diffDays = Math.abs((t.date.getTime() - trade.date.getTime()) / (1000 * 60 * 60 * 24));
                return diffDays <= 30;
              }
              return false;
            });

            if (hasReplacementBuy) {
              isWashSale = true;
              disallowedLoss = Math.abs(gain);
              gain = 0; // Loss is disallowed
              // Note: In a full implementation, we would add disallowedLoss to the replacement lot's basis
            }
          }

          allGains.push({
            sellTradeId: trade.id,
            asset,
            amountSold: amountFromLot,
            buyPriceUSD: lot.priceUSD,
            sellPriceUSD: trade.priceUSD,
            gainUSD: gain,
            term,
            buyDate: lot.date,
            sellDate: trade.date,
            isWashSale,
            disallowedLossUSD: disallowedLoss
          });

          remainingToSell -= amountFromLot;

          if (lot.amount > amountFromLot) {
            newInventory.push({
              ...lot,
              amount: lot.amount - amountFromLot
            });
          }
        }
        inventory = newInventory;
      }
    }
  }

  return allGains;
}

export function calculateEstimatedTaxes(shortTermGains: number, longTermGains: number, ordinaryIncome: number = 0) {
  // Simplified 2024 single filer brackets
  const totalOrdinary = Math.max(0, ordinaryIncome + shortTermGains); // Short term taxed as ordinary income
  
  // Ordinary Income Brackets
  let ordinaryTax = 0;
  if (totalOrdinary > 609350) ordinaryTax += (totalOrdinary - 609350) * 0.37 + 183647;
  else if (totalOrdinary > 243725) ordinaryTax += (totalOrdinary - 243725) * 0.35 + 55678;
  else if (totalOrdinary > 191950) ordinaryTax += (totalOrdinary - 191950) * 0.32 + 39110;
  else if (totalOrdinary > 100525) ordinaryTax += (totalOrdinary - 100525) * 0.24 + 17168;
  else if (totalOrdinary > 47150) ordinaryTax += (totalOrdinary - 47150) * 0.22 + 5426;
  else if (totalOrdinary > 11600) ordinaryTax += (totalOrdinary - 11600) * 0.12 + 1160;
  else ordinaryTax += totalOrdinary * 0.10;

  // Base ordinary income tax (to isolate the tax just on the short term gains if needed)
  let baseOrdinaryTax = 0;
  if (ordinaryIncome > 609350) baseOrdinaryTax += (ordinaryIncome - 609350) * 0.37 + 183647;
  else if (ordinaryIncome > 243725) baseOrdinaryTax += (ordinaryIncome - 243725) * 0.35 + 55678;
  // ... omitting full base calc for brevity, assuming we just want total taxes
  
  // Long Term Capital Gains Brackets (based on taxable income)
  let longTermTax = 0;
  const taxableForLTCG = totalOrdinary; 
  if (longTermGains > 0) {
    if (taxableForLTCG > 518900) {
      longTermTax = longTermGains * 0.20;
    } else if (taxableForLTCG > 47025) {
      longTermTax = longTermGains * 0.15;
    } else {
      longTermTax = 0;
    }
  }

  return {
    ordinaryIncomeTax: ordinaryTax,
    shortTermTaxEstimate: ordinaryTax, // Simplified
    longTermTaxEstimate: longTermTax,
    totalEstimatedTax: ordinaryTax + longTermTax
  };
}

export interface HarvestOpportunity {
  lotId: string;
  asset: string;
  unrealizedLossUSD: number;
  amount: number;
  buyPriceUSD: number;
  currentPriceUSD: number;
  buyDate: Date;
  washSaleRisk: boolean;
}

export function findHarvestingOpportunities(
  trades: Trade[], 
  currentPrices: Record<string, number>
): HarvestOpportunity[] {
  const tradesByAsset: Record<string, Trade[]> = {};
  for (const trade of trades) {
    if (!tradesByAsset[trade.asset]) {
      tradesByAsset[trade.asset] = [];
    }
    tradesByAsset[trade.asset].push(trade);
  }

  const opportunities: HarvestOpportunity[] = [];
  const today = new Date();

  for (const asset in tradesByAsset) {
    const assetTrades = tradesByAsset[asset].sort((a, b) => a.date.getTime() - b.date.getTime());
    let inventory: TaxLot[] = [];

    // Rebuild current inventory
    for (const trade of assetTrades) {
      if (trade.type === 'BUY') {
        inventory.push({
          id: trade.id,
          amount: trade.amount,
          priceUSD: trade.priceUSD,
          date: trade.date,
        });
      } else if (trade.type === 'SELL') {
        let remainingToSell = trade.amount;
        // Assume FIFO for inventory reconstruction for simplicity
        inventory.sort((a, b) => a.date.getTime() - b.date.getTime());
        
        const newInventory: TaxLot[] = [];
        for (let i = 0; i < inventory.length; i++) {
          const lot = inventory[i];
          if (remainingToSell <= 0) {
            newInventory.push(lot);
            continue;
          }
          const amountFromLot = Math.min(lot.amount, remainingToSell);
          remainingToSell -= amountFromLot;
          if (lot.amount > amountFromLot) {
            newInventory.push({ ...lot, amount: lot.amount - amountFromLot });
          }
        }
        inventory = newInventory;
      }
    }

    const currentPrice = currentPrices[asset];
    if (!currentPrice) continue;

    for (const lot of inventory) {
      if (currentPrice < lot.priceUSD) {
        const unrealizedLoss = lot.amount * (lot.priceUSD - currentPrice);
        
        // Check wash sale risk: Did they buy this asset within the last 30 days?
        const hasRecentBuy = assetTrades.some(t => 
          t.type === 'BUY' && 
          Math.abs((today.getTime() - t.date.getTime()) / (1000 * 60 * 60 * 24)) <= 30
        );

        opportunities.push({
          lotId: lot.id,
          asset,
          unrealizedLossUSD: unrealizedLoss,
          amount: lot.amount,
          buyPriceUSD: lot.priceUSD,
          currentPriceUSD: currentPrice,
          buyDate: lot.date,
          washSaleRisk: hasRecentBuy
        });
      }
    }
  }

  return opportunities.sort((a, b) => b.unrealizedLossUSD - a.unrealizedLossUSD);
}
