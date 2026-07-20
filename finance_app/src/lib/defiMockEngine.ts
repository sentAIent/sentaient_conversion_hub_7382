export interface ProtocolPosition {
  id: string;
  protocolName: string;
  chain: string;
  asset: string;
  balance: number;
  valueUSD: number;
  apy: number;
  type: 'Staking' | 'Liquidity Pool' | 'Lending' | 'Yield Farming';
  riskLevel: 'Low' | 'Medium' | 'High';
}

export const MOCK_DEFI_POSITIONS: ProtocolPosition[] = [
  {
    id: 'p1',
    protocolName: 'Lido',
    chain: 'Ethereum',
    asset: 'stETH',
    balance: 4.5,
    valueUSD: 13500, // Assuming ETH at 3000
    apy: 3.2,
    type: 'Staking',
    riskLevel: 'Low'
  },
  {
    id: 'p2',
    protocolName: 'Aave V3',
    chain: 'Arbitrum',
    asset: 'USDC',
    balance: 25000,
    valueUSD: 25000,
    apy: 5.1,
    type: 'Lending',
    riskLevel: 'Low'
  },
  {
    id: 'p3',
    protocolName: 'Aerodrome',
    chain: 'Base',
    asset: 'WETH/USDC LP',
    balance: 15.2,
    valueUSD: 8500,
    apy: 45.5,
    type: 'Liquidity Pool',
    riskLevel: 'High'
  },
  {
    id: 'p4',
    protocolName: 'Jito',
    chain: 'Solana',
    asset: 'JitoSOL',
    balance: 150,
    valueUSD: 22500, // Assuming SOL at 150
    apy: 7.4,
    type: 'Staking',
    riskLevel: 'Medium'
  },
  {
    id: 'p5',
    protocolName: 'Pendle',
    chain: 'Ethereum',
    asset: 'PT-eETH',
    balance: 2.1,
    valueUSD: 6300,
    apy: 12.5,
    type: 'Yield Farming',
    riskLevel: 'Medium'
  }
];

export function calculateDeFiMetrics(positions: ProtocolPosition[]) {
  const totalValue = positions.reduce((sum, p) => sum + p.valueUSD, 0);
  
  // Weighted APY calculation
  const weightedApySum = positions.reduce((sum, p) => sum + (p.apy * p.valueUSD), 0);
  const averageApy = totalValue > 0 ? weightedApySum / totalValue : 0;
  
  const totalDailyYield = positions.reduce((sum, p) => {
    const annualYield = p.valueUSD * (p.apy / 100);
    return sum + (annualYield / 365);
  }, 0);

  const chainAllocation = positions.reduce((acc, p) => {
    acc[p.chain] = (acc[p.chain] || 0) + p.valueUSD;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalValue,
    averageApy,
    totalDailyYield,
    chainAllocation
  };
}
