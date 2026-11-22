/**
 * FinCEN Form 114 (FBAR) & IRS Form 8938 (FATCA) Threshold Engine
 * 
 * Monitors foreign bank accounts and non-US crypto exchange accounts against:
 * - FinCEN Form 114 (FBAR): $10,000 aggregate calendar-year maximum balance threshold.
 * - IRS Form 8938 (FATCA): $50,000 year-end or $75,000 mid-year threshold.
 * Flags statutory filing liabilities and computes penalty exposure.
 */

export interface ForeignAccount {
  id: string;
  institutionName: string;
  countryCode: string;
  accountType: 'FOREIGN_BANK' | 'FOREIGN_CRYPTO_EXCHANGE' | 'FOREIGN_SECURITIES' | 'OFFSHORE_TRUST';
  accountNumberMasked: string;
  currency: string;
  currentBalanceUSD: number;
  peakBalanceCalendarYearUSD: number;
}

export interface FbarFatcaEvaluationResult {
  calendarYear: number;
  totalForeignAccountsCount: number;
  aggregatePeakBalanceUSD: number;
  fbarFilingRequired: boolean;         // Triggered if aggregate peak > $10,000
  fbarThreshold: number;               // $10,000
  fatcaFilingRequired: boolean;        // Triggered if aggregate peak > $50,000 / $75,000
  fatcaThreshold: number;              // $50,000
  statutoryDueDate: string;            // April 15 with automatic extension to October 15
  riskLevel: 'COMPLIANT_EXEMPT' | 'MANDATORY_FILING_REQUIRED' | 'PENALTY_EXPOSURE';
  alerts: string[];
  accountBreakdown: {
    institution: string;
    country: string;
    peakUSD: number;
    contributionPercent: number;
  }[];
}

export class FbarFatcaTracker {
  public static readonly FBAR_STATUTORY_THRESHOLD = 10000;
  public static readonly FATCA_YEAR_END_THRESHOLD = 50000;

  public static evaluate(accounts: ForeignAccount[], calendarYear: number = new Date().getFullYear()): FbarFatcaEvaluationResult {
    const aggregatePeak = accounts.reduce((sum, a) => sum + a.peakBalanceCalendarYearUSD, 0);

    const fbarRequired = aggregatePeak > this.FBAR_STATUTORY_THRESHOLD;
    const fatcaRequired = aggregatePeak > this.FATCA_YEAR_END_THRESHOLD;

    const alerts: string[] = [];
    let riskLevel: 'COMPLIANT_EXEMPT' | 'MANDATORY_FILING_REQUIRED' | 'PENALTY_EXPOSURE' = 'COMPLIANT_EXEMPT';

    if (fbarRequired) {
      riskLevel = 'MANDATORY_FILING_REQUIRED';
      alerts.push(
        `CRITICAL: Aggregate foreign accounts peak ($${aggregatePeak.toLocaleString()}) exceeds the FinCEN $10,000 threshold. Form 114 (FBAR) filing is mandatory for ${calendarYear}.`
      );
    } else {
      alerts.push(`Aggregate foreign balances ($${aggregatePeak.toLocaleString()}) are below the $10,000 FBAR threshold.`);
    }

    if (fatcaRequired) {
      alerts.push(
        `IRS Form 8938 (FATCA) required: Specified foreign financial assets exceed $50,000 threshold. Must attach to annual Form 1120 / Form 1040.`
      );
    }

    const accountBreakdown = accounts.map(a => ({
      institution: a.institutionName,
      country: a.countryCode,
      peakUSD: a.peakBalanceCalendarYearUSD,
      contributionPercent: aggregatePeak > 0 ? Number(((a.peakBalanceCalendarYearUSD / aggregatePeak) * 100).toFixed(1)) : 0
    }));

    return {
      calendarYear,
      totalForeignAccountsCount: accounts.length,
      aggregatePeakBalanceUSD: Number(aggregatePeak.toFixed(2)),
      fbarFilingRequired: fbarRequired,
      fbarThreshold: this.FBAR_STATUTORY_THRESHOLD,
      fatcaFilingRequired: fatcaRequired,
      fatcaThreshold: this.FATCA_YEAR_END_THRESHOLD,
      statutoryDueDate: `October 15, ${calendarYear + 1} (Automatic extension from April 15)`,
      riskLevel,
      alerts,
      accountBreakdown
    };
  }
}
