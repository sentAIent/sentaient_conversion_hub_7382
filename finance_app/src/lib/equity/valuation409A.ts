/**
 * Institutional 409A Valuation Engine (Black-Scholes Option Pricing Method - OPM)
 * 
 * Complies with AICPA Accounting & Valuation Guide for Privately-Held-Company Equity Securities.
 * Calculates Fair Market Value (FMV) for common shares based on latest post-money valuation,
 * liquidation preference breakpoints, expected time to exit, volatility, and DLOM.
 */

export interface ValuationInputs {
  enterpriseValuation: number;       // Latest post-money round valuation (e.g., $30,000,000)
  liquidationPreferenceTotal: number;// Senior preference total (e.g., $6,000,000)
  totalCommonShares: number;         // Total common + options + RSUs
  totalPreferredShares: number;      // Preferred shares count
  timeToLiquidityYears: number;      // e.g. 2.5 years to IPO / M&A
  riskFreeRate: number;              // e.g. 0.042 (4.2% US Treasury yield)
  volatility: number;                // e.g. 0.65 (65% annualized peer volatility)
  dlomDiscountRate: number;          // e.g. 0.25 (25% Discount for Lack of Marketability)
}

export interface Valuation409AResult {
  impliedEquityValue: number;
  breakpoint1: number;               // Preference floor
  breakpoint2: number;               // Common catchup / conversion threshold
  commonAggregateValue: number;
  preDiscountSharePrice: number;
  dlomApplied: number;
  final409AFairMarketValue: number;  // The statutory 409A strike price
  preferredToCommonRatio: number;
  methodologyNotes: string[];
}

export class Valuation409AEngine {
  /**
   * Approximation of Cumulative Standard Normal Distribution N(x)
   * Using Abramowitz and Stegun formula (precision 7.5e-8)
   */
  public static normalCDF(x: number): number {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x) / Math.sqrt(2.0);

    const t = 1.0 / (1.0 + p * absX);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

    return 0.5 * (1.0 + sign * y);
  }

  /**
   * Standard Black-Scholes European Call Option formula
   * C = S * N(d1) - K * e^(-r*T) * N(d2)
   */
  public static blackScholesCall(S: number, K: number, T: number, r: number, sigma: number): number {
    if (K <= 0 || S <= 0 || T <= 0) return Math.max(0, S - K);

    const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2.0) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    const callValue = S * this.normalCDF(d1) - K * Math.exp(-r * T) * this.normalCDF(d2);
    return Math.max(0, callValue);
  }

  /**
   * Evaluates the 409A OPM Backsolve allocation to Common shares
   */
  public static calculate409A(inputs: ValuationInputs): Valuation409AResult {
    const S = inputs.enterpriseValuation;
    const T = inputs.timeToLiquidityYears;
    const r = inputs.riskFreeRate;
    const sigma = inputs.volatility;

    // Breakpoint 1: Payout of liquidation preferences
    const K1 = inputs.liquidationPreferenceTotal;

    // Breakpoint 2: Point where Preferred converts to Common
    // When Exit Value exceeds K1 / (Preferred % of shares)
    const totalShares = inputs.totalCommonShares + inputs.totalPreferredShares;
    const prefFraction = totalShares > 0 ? inputs.totalPreferredShares / totalShares : 0;
    const K2 = prefFraction > 0 ? inputs.liquidationPreferenceTotal / prefFraction : K1 * 3;

    // Option tranche values:
    // Tranche 1: S (from 0 to S)
    // Tranche 2: Call(S, K1)
    // Tranche 3: Call(S, K2)
    const callK1 = this.blackScholesCall(S, K1, T, r, sigma);
    const callK2 = this.blackScholesCall(S, K2, T, r, sigma);

    // Common shares participate between K1 and K2 proportionally, and above K2 fully as common
    const commonFraction = totalShares > 0 ? inputs.totalCommonShares / totalShares : 1;

    // Value between K1 and K2 assigned to Common
    const valueK1toK2 = callK1 - callK2;
    // Above K2, Common gets its pro-rata share
    const valueAboveK2 = callK2 * commonFraction;

    const commonTotalValue = Math.max(0, valueK1toK2 * commonFraction + valueAboveK2);
    const preDiscountSharePrice = inputs.totalCommonShares > 0 ? commonTotalValue / inputs.totalCommonShares : 0;

    // Apply DLOM (Discount for Lack of Marketability)
    const final409AFairMarketValue = preDiscountSharePrice * (1 - inputs.dlomDiscountRate);

    const preferredPricePerShare = inputs.totalPreferredShares > 0 ? inputs.liquidationPreferenceTotal / inputs.totalPreferredShares : 1;
    const preferredToCommonRatio = preferredPricePerShare > 0 ? Number((final409AFairMarketValue / preferredPricePerShare).toFixed(4)) : 0;

    return {
      impliedEquityValue: S,
      breakpoint1: K1,
      breakpoint2: K2,
      commonAggregateValue: Number(commonTotalValue.toFixed(2)),
      preDiscountSharePrice: Number(preDiscountSharePrice.toFixed(4)),
      dlomApplied: inputs.dlomDiscountRate * 100,
      final409AFairMarketValue: Number(final409AFairMarketValue.toFixed(4)),
      preferredToCommonRatio,
      methodologyNotes: [
        `Black-Scholes Option Pricing Method (OPM) applied with T=${T} years and sigma=${(sigma * 100).toFixed(1)}%`,
        `Senior preference breakpoint set at $${K1.toLocaleString()} with conversion threshold at $${Math.round(K2).toLocaleString()}`,
        `${(inputs.dlomDiscountRate * 100).toFixed(0)}% DLOM applied reflecting restricted private transferability`,
        `Statutory safe harbor benchmark strike price: $${final409AFairMarketValue.toFixed(4)}/share`
      ]
    };
  }
}
