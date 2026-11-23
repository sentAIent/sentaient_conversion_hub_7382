/**
 * Institutional Circle USDC & EURC Ramp Service
 * 
 * Provides automated corporate treasury mint and redeem rails between
 * commercial fiat bank wires (Fedwire/SWIFT) and on-chain stablecoins (USDC/EURC)
 * across Ethereum, Base, Arbitrum, and Polygon.
 */

export type StablecoinCurrency = 'USDC' | 'EURC';
export type RampDirection = 'FIAT_TO_STABLECOIN_MINT' | 'STABLECOIN_TO_FIAT_REDEEM';
export type SettlementRail = 'FEDWIRE' | 'SEN_CIRCA' | 'SEPA_INSTANT' | 'ON_CHAIN_ERC20';

export interface RampOrderRequest {
  entityId: string;
  direction: RampDirection;
  currency: StablecoinCurrency;
  amountUSD: number;
  sourceAccountOrWallet: string;
  destinationAccountOrWallet: string;
  targetChainId: number;              // 1 (ETH), 8453 (Base), 42161 (Arb)
  settlementRail: SettlementRail;
}

export interface RampExecutionOrder {
  orderId: string;
  trackingReference: string;
  status: 'PENDING_SETTLEMENT' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  grossAmountUSD: number;
  feeUSD: number;
  netSettlementAmount: number;
  currency: StablecoinCurrency;
  estimatedSettlementSeconds: number;
  timestamp: string;
  auditHash: string;
}

export class CircleRampService {
  public static readonly SUPPORTED_CHAINS: Record<number, string> = {
    1: 'Ethereum Mainnet',
    8453: 'Base',
    42161: 'Arbitrum One',
    137: 'Polygon PoS'
  };

  /**
   * Evaluates and creates an institutional mint or redeem order
   */
  public static createOrder(req: RampOrderRequest): RampExecutionOrder {
    if (req.amountUSD <= 0) {
      throw new Error('Order amount must be greater than zero.');
    }

    // Fee structure: 0.05% for institutional volumes >= $100k, 0.15% for retail
    const feeRate = req.amountUSD >= 100000 ? 0.0005 : 0.0015;
    const feeUSD = Number((req.amountUSD * feeRate).toFixed(2));
    const netSettlementAmount = Number((req.amountUSD - feeUSD).toFixed(2));

    const estimatedSettlementSeconds = req.settlementRail === 'ON_CHAIN_ERC20' ? 15 : 120; // 15s on-chain vs 2m Fedwire

    const trackingReference = `CIR-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const auditHash = `0x${Buffer.from(trackingReference + req.entityId + req.amountUSD).toString('hex').padStart(64, '0').slice(0, 64)}`;

    return {
      orderId: `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      trackingReference,
      status: 'PENDING_SETTLEMENT',
      grossAmountUSD: req.amountUSD,
      feeUSD,
      netSettlementAmount,
      currency: req.currency,
      estimatedSettlementSeconds,
      timestamp: new Date().toISOString(),
      auditHash
    };
  }

  /**
   * Simulates processing order transition to settlement
   */
  public static settleOrder(order: RampExecutionOrder): RampExecutionOrder {
    return {
      ...order,
      status: 'COMPLETED'
    };
  }
}
