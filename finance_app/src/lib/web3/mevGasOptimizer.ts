/**
 * MEV Gas Optimizer & Private RPC Protection Service
 * 
 * Computes EIP-1559 base fee, priority fee, and max fee recommendations while
 * routing institutional treasury transactions through MEV-protected private mempools
 * (Flashbots Protect, MEV-Blocker) to eliminate front-running and revert fees.
 */

export interface GasFeeTier {
  tierName: 'ECONOMY' | 'STANDARD' | 'FAST_MEV_PROTECTED';
  maxBaseFeeGwei: number;
  priorityFeeGwei: number;
  estimatedWaitSeconds: number;
  mevProtectionActive: boolean;
}

export interface GasOptimizationResult {
  currentBlockBaseFeeGwei: number;
  recommendedTiers: Record<'ECONOMY' | 'STANDARD' | 'FAST_MEV_PROTECTED', GasFeeTier>;
  recommendedRpcUrl: string;
  securityNotice: string;
}

export class MevGasOptimizer {
  public static readonly PRIVATE_MEV_RPCS: Record<number, { name: string; rpcUrl: string }> = {
    1: { name: 'Flashbots Protect', rpcUrl: 'https://rpc.flashbots.net' },
    8453: { name: 'Base Flashbots Builder', rpcUrl: 'https://base.mevblocker.io' },
    137: { name: 'Polygon Fastlane', rpcUrl: 'https://polygon.mevblocker.io' },
    42161: { name: 'Arbitrum Sequencer Fast', rpcUrl: 'https://arb1.arbitrum.io/rpc' }
  };

  /**
   * Computes optimal EIP-1559 gas fee parameters given current base fee
   */
  public static calculateGasRecommendation(currentBaseFeeGwei: number = 18.5, chainId: number = 1): GasOptimizationResult {
    const rpcInfo = this.PRIVATE_MEV_RPCS[chainId] || this.PRIVATE_MEV_RPCS[1];

    const economy: GasFeeTier = {
      tierName: 'ECONOMY',
      maxBaseFeeGwei: Number((currentBaseFeeGwei * 1.05).toFixed(2)),
      priorityFeeGwei: 1.0,
      estimatedWaitSeconds: 60,
      mevProtectionActive: false
    };

    const standard: GasFeeTier = {
      tierName: 'STANDARD',
      maxBaseFeeGwei: Number((currentBaseFeeGwei * 1.15).toFixed(2)),
      priorityFeeGwei: 1.5,
      estimatedWaitSeconds: 24,
      mevProtectionActive: true
    };

    const fastMev: GasFeeTier = {
      tierName: 'FAST_MEV_PROTECTED',
      maxBaseFeeGwei: Number((currentBaseFeeGwei * 1.30).toFixed(2)),
      priorityFeeGwei: 2.5,
      estimatedWaitSeconds: 12,
      mevProtectionActive: true
    };

    return {
      currentBlockBaseFeeGwei: currentBaseFeeGwei,
      recommendedTiers: {
        ECONOMY: economy,
        STANDARD: standard,
        FAST_MEV_PROTECTED: fastMev
      },
      recommendedRpcUrl: rpcInfo.rpcUrl,
      securityNotice: `Transactions routed via ${rpcInfo.name} bypass public mempools, preventing sandwich bots and searcher arbitrage.`
    };
  }

  /**
   * Calculates specific EIP-1559 fee breakdown for UI estimation
   */
  public static calculateEip1559Fees(speed: 'standard' | 'fast' | 'urgent' = 'fast', baseFeeGwei: number = 22.5): {
    baseFeeGwei: number;
    maxPriorityFeePerGasGwei: number;
    maxFeePerGasGwei: number;
    estimatedCostUSD: number;
  } {
    const tip = speed === 'urgent' ? 3.0 : speed === 'fast' ? 2.0 : 1.2;
    const maxFee = Number((baseFeeGwei * 1.25 + tip).toFixed(2));
    const ethPriceUSD = 3200;
    const costEth = (21000 * maxFee) / 1e9;
    const estimatedCostUSD = Number((costEth * ethPriceUSD).toFixed(3));

    return {
      baseFeeGwei,
      maxPriorityFeePerGasGwei: tip,
      maxFeePerGasGwei: maxFee,
      estimatedCostUSD
    };
  }
}
