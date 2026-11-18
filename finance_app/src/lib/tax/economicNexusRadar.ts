/**
 * 50-State Economic Nexus & Sales Tax Radar
 * 
 * Monitors revenue and transaction volumes against state-by-state economic nexus
 * statutory thresholds (South Dakota v. Wayfair post-decision rules), warning
 * companies before triggering mandatory sales tax collection obligations.
 */

export interface StateNexusRule {
  stateCode: string;
  stateName: string;
  revenueThresholdUSD: number;
  transactionThreshold?: number;
  thresholdType: 'REVENUE_OR_TRANSACTIONS' | 'REVENUE_ONLY' | 'REVENUE_AND_TRANSACTIONS';
  standardTaxRatePercent: number;
}

export interface StateSalesActivity {
  stateCode: string;
  currentRevenueUSD: number;
  currentTransactionCount: number;
}

export interface NexusStatus {
  stateCode: string;
  stateName: string;
  currentRevenueUSD: number;
  revenueThresholdUSD: number;
  revenueProgressPercent: number;
  currentTransactionCount: number;
  transactionThreshold?: number;
  transactionProgressPercent?: number;
  isNexusTriggered: boolean;
  status: 'SAFE' | 'APPROACHING' | 'TRIGGERED';
  recommendedAction: string;
}

export const US_STATE_NEXUS_RULES: Record<string, StateNexusRule> = {
  CA: { stateCode: 'CA', stateName: 'California', revenueThresholdUSD: 500_000, thresholdType: 'REVENUE_ONLY', standardTaxRatePercent: 7.25 },
  NY: { stateCode: 'NY', stateName: 'New York', revenueThresholdUSD: 500_000, transactionThreshold: 100, thresholdType: 'REVENUE_AND_TRANSACTIONS', standardTaxRatePercent: 8.875 },
  TX: { stateCode: 'TX', stateName: 'Texas', revenueThresholdUSD: 500_000, thresholdType: 'REVENUE_ONLY', standardTaxRatePercent: 6.25 },
  FL: { stateCode: 'FL', stateName: 'Florida', revenueThresholdUSD: 100_000, thresholdType: 'REVENUE_ONLY', standardTaxRatePercent: 6.0 },
  IL: { stateCode: 'IL', stateName: 'Illinois', revenueThresholdUSD: 100_000, transactionThreshold: 200, thresholdType: 'REVENUE_OR_TRANSACTIONS', standardTaxRatePercent: 6.25 },
  WA: { stateCode: 'WA', stateName: 'Washington', revenueThresholdUSD: 100_000, thresholdType: 'REVENUE_ONLY', standardTaxRatePercent: 6.5 },
  CO: { stateCode: 'CO', stateName: 'Colorado', revenueThresholdUSD: 100_000, thresholdType: 'REVENUE_ONLY', standardTaxRatePercent: 2.9 },
  MA: { stateCode: 'MA', stateName: 'Massachusetts', revenueThresholdUSD: 100_000, thresholdType: 'REVENUE_ONLY', standardTaxRatePercent: 6.25 },
  PA: { stateCode: 'PA', stateName: 'Pennsylvania', revenueThresholdUSD: 100_000, thresholdType: 'REVENUE_ONLY', standardTaxRatePercent: 6.0 },
  SD: { stateCode: 'SD', stateName: 'South Dakota', revenueThresholdUSD: 100_000, thresholdType: 'REVENUE_ONLY', standardTaxRatePercent: 4.2 }
};

export class EconomicNexusRadar {
  /**
   * Evaluates current state sales data against economic nexus laws
   */
  public static evaluateNexus(salesData: StateSalesActivity[]): NexusStatus[] {
    const results: NexusStatus[] = [];

    for (const [code, rule] of Object.entries(US_STATE_NEXUS_RULES)) {
      const activity = salesData.find(s => s.stateCode === code) || {
        stateCode: code,
        currentRevenueUSD: 0,
        currentTransactionCount: 0
      };

      const revProgress = Math.min(100, (activity.currentRevenueUSD / rule.revenueThresholdUSD) * 100);
      let txProgress: number | undefined;

      let isTriggered = false;

      if (rule.thresholdType === 'REVENUE_ONLY') {
        isTriggered = activity.currentRevenueUSD >= rule.revenueThresholdUSD;
      } else if (rule.thresholdType === 'REVENUE_OR_TRANSACTIONS') {
        const txHit = rule.transactionThreshold ? activity.currentTransactionCount >= rule.transactionThreshold : false;
        isTriggered = activity.currentRevenueUSD >= rule.revenueThresholdUSD || txHit;
        if (rule.transactionThreshold) {
          txProgress = Math.min(100, (activity.currentTransactionCount / rule.transactionThreshold) * 100);
        }
      } else if (rule.thresholdType === 'REVENUE_AND_TRANSACTIONS') {
        const txHit = rule.transactionThreshold ? activity.currentTransactionCount >= rule.transactionThreshold : true;
        isTriggered = activity.currentRevenueUSD >= rule.revenueThresholdUSD && txHit;
        if (rule.transactionThreshold) {
          txProgress = Math.min(100, (activity.currentTransactionCount / rule.transactionThreshold) * 100);
        }
      }

      let status: 'SAFE' | 'APPROACHING' | 'TRIGGERED' = 'SAFE';
      let action = 'No action required.';

      if (isTriggered) {
        status = 'TRIGGERED';
        action = 'Mandatory: Register for sales tax permit with State Department of Revenue.';
      } else if (revProgress >= 80 || (txProgress && txProgress >= 80)) {
        status = 'APPROACHING';
        action = 'Warning: Over 80% of nexus threshold. Prepare state tax registration forms.';
      }

      results.push({
        stateCode: code,
        stateName: rule.stateName,
        currentRevenueUSD: activity.currentRevenueUSD,
        revenueThresholdUSD: rule.revenueThresholdUSD,
        revenueProgressPercent: Number(revProgress.toFixed(1)),
        currentTransactionCount: activity.currentTransactionCount,
        transactionThreshold: rule.transactionThreshold,
        transactionProgressPercent: txProgress ? Number(txProgress.toFixed(1)) : undefined,
        isNexusTriggered: isTriggered,
        status,
        recommendedAction: action
      });
    }

    // Sort triggered first, then approaching, then by highest revenue progress
    return results.sort((a, b) => {
      const score = (x: NexusStatus) => (x.status === 'TRIGGERED' ? 2 : x.status === 'APPROACHING' ? 1 : 0);
      const diff = score(b) - score(a);
      if (diff !== 0) return diff;
      return b.revenueProgressPercent - a.revenueProgressPercent;
    });
  }
}
