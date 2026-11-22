/**
 * Native Home Screen Widget Data Provider (WidgetKit & Android Glance)
 * 
 * Generates lightweight, serialized widget timelines for iOS WidgetKit and Android Glance:
 * 1. Cash Runway Pill (Months Remaining, Cash Balance, Trend)
 * 2. Daily Treasury Sweep Yield & Net Burn
 * 3. ZK Proof of Reserves Solvency Status Badge
 */

export interface WidgetTimelineData {
  lastUpdated: string;
  cashRunwayMonths: number;
  cashRunwayStatus: 'HEALTHY' | 'MODERATE' | 'CRITICAL';
  totalCashUSD: number;
  monthlyNetBurnUSD: number;
  annualizedTreasuryYieldUSD: number;
  activeSweepApy: number;
  zkSolvencyStatus: '100%_VERIFIED' | 'PENDING_ATTESTATION';
  pendingApprovalCount: number;
}

export class NativeWidgetEngine {
  public static readonly APP_GROUP_IDENTIFIER = 'group.com.sentaient.liquid';

  /**
   * Generates formatted widget payload for writing to App Group UserDefaults
   */
  public static generateWidgetData(
    totalCashUSD: number = 4250000,
    monthlyNetBurnUSD: number = 185000,
    activeSweepApy: number = 5.15,
    pendingApprovalCount: number = 2
  ): WidgetTimelineData {
    const runwayMonths = monthlyNetBurnUSD > 0 ? Number((totalCashUSD / monthlyNetBurnUSD).toFixed(1)) : 99.9;

    let runwayStatus: 'HEALTHY' | 'MODERATE' | 'CRITICAL' = 'HEALTHY';
    if (runwayMonths < 6) {
      runwayStatus = 'CRITICAL';
    } else if (runwayMonths < 12) {
      runwayStatus = 'MODERATE';
    }

    const annualYield = (totalCashUSD * (activeSweepApy / 100));

    return {
      lastUpdated: new Date().toISOString(),
      cashRunwayMonths: runwayMonths,
      cashRunwayStatus: runwayStatus,
      totalCashUSD,
      monthlyNetBurnUSD,
      annualizedTreasuryYieldUSD: Number(annualYield.toFixed(2)),
      activeSweepApy,
      zkSolvencyStatus: '100%_VERIFIED',
      pendingApprovalCount
    };
  }
}
