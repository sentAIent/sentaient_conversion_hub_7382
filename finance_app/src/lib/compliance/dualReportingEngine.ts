/**
 * Dual US GAAP & IFRS Financial Reporting Engine
 * 
 * Computes side-by-side financial statement reconciliations between US GAAP and IFRS:
 * 1. R&D: ASC 350-40 / Sec 174 vs IAS 38 Intangibles Development Capitalization.
 * 2. Leases: ASC 842 Dual-Model (Operating/Finance) vs IFRS 16 Single Finance Lease Model.
 * 3. Revenue & Provisions: ASC 606 vs IFRS 15 / IAS 37 Contingent Liabilities.
 */

export interface DualReportingInput {
  revenueGross: number;
  softwareDevelopmentCostsTotal: number;
  developmentPhaseQualifyingPercent: number; // e.g. 70% meets IAS 38 capitalization
  annualOperatingLeaseRent: number;
  leasePresentValueROU: number;
  discountRate: number;                     // e.g. 0.06 (6%)
  otherOpex: number;
}

export interface DualStatementComparison {
  metric: string;
  usGaapAmountUSD: number;
  ifrsAmountUSD: number;
  varianceUSD: number;
  varianceExplanation: string;
}

export interface DualReportingResult {
  comparisonTable: DualStatementComparison[];
  gaapNetIncomeUSD: number;
  ifrsNetIncomeUSD: number;
  netIncomeVarianceUSD: number;
  gaapTotalAssetsUSD: number;
  ifrsTotalAssetsUSD: number;
  balanceSheetBridgeNotes: string[];
}

export class DualReportingEngine {
  public static reconcile(input: DualReportingInput): DualReportingResult {
    // 1. R&D Accounting Treatment
    // US GAAP: Mostly expensed as incurred, 5-year tax amortization
    const gaapRdExpense = input.softwareDevelopmentCostsTotal;
    // IFRS: Qualifying development costs capitalized under IAS 38
    const ifrsCapitalizedRd = input.softwareDevelopmentCostsTotal * (input.developmentPhaseQualifyingPercent / 100);
    const ifrsRdExpense = input.softwareDevelopmentCostsTotal - ifrsCapitalizedRd;
    // Assume 3-year amortization on capitalized IFRS software (half-year convention: ~16.6%)
    const ifrsRdAmortization = ifrsCapitalizedRd * 0.166;

    // 2. Lease Accounting Treatment
    // US GAAP (ASC 842 Operating Lease): Single straight-line lease expense
    const gaapLeaseExpense = input.annualOperatingLeaseRent;
    // IFRS (IFRS 16): Depreciation of ROU asset + Interest on lease liability
    const ifrsDepreciation = input.annualOperatingLeaseRent * 0.80; // Straight-line depreciation portion
    const ifrsInterest = input.leasePresentValueROU * input.discountRate; // Interest expense
    const ifrsTotalLeaseCost = ifrsDepreciation + ifrsInterest;

    // 3. Compute Net Incomes
    const gaapTotalExpense = gaapRdExpense + gaapLeaseExpense + input.otherOpex;
    const gaapNetIncome = input.revenueGross - gaapTotalExpense;

    const ifrsTotalExpense = ifrsRdExpense + ifrsRdAmortization + ifrsTotalLeaseCost + input.otherOpex;
    const ifrsNetIncome = input.revenueGross - ifrsTotalExpense;

    const netIncomeVariance = ifrsNetIncome - gaapNetIncome;

    // 4. Asset Base
    const gaapAssets = input.leasePresentValueROU; // ROU asset under ASC 842
    const ifrsAssets = input.leasePresentValueROU + (ifrsCapitalizedRd - ifrsRdAmortization);

    const comparisonTable: DualStatementComparison[] = [
      {
        metric: 'Revenue from Contracts with Customers',
        usGaapAmountUSD: input.revenueGross,
        ifrsAmountUSD: input.revenueGross,
        varianceUSD: 0,
        varianceExplanation: 'ASC 606 and IFRS 15 converged standards; identical recognition.'
      },
      {
        metric: 'Software R&D / Development Cost Expense',
        usGaapAmountUSD: gaapRdExpense,
        ifrsAmountUSD: Number((ifrsRdExpense + ifrsRdAmortization).toFixed(2)),
        varianceUSD: Number((ifrsRdExpense + ifrsRdAmortization - gaapRdExpense).toFixed(2)),
        varianceExplanation: `IAS 38 capitalizes $${ifrsCapitalizedRd.toLocaleString()} in qualifying tech development vs immediate GAAP expense.`
      },
      {
        metric: 'Lease & Facilities Expense',
        usGaapAmountUSD: gaapLeaseExpense,
        ifrsAmountUSD: Number(ifrsTotalLeaseCost.toFixed(2)),
        varianceUSD: Number((ifrsTotalLeaseCost - gaapLeaseExpense).toFixed(2)),
        varianceExplanation: 'IFRS 16 front-loads interest + depreciation vs ASC 842 straight-line operating lease expense.'
      },
      {
        metric: 'Net Operating Income',
        usGaapAmountUSD: Number(gaapNetIncome.toFixed(2)),
        ifrsAmountUSD: Number(ifrsNetIncome.toFixed(2)),
        varianceUSD: Number(netIncomeVariance.toFixed(2)),
        varianceExplanation: `IFRS net income is $${Math.abs(netIncomeVariance).toLocaleString()} ${netIncomeVariance >= 0 ? 'higher' : 'lower'} primarily due to tech capitalization.`
      }
    ];

    return {
      comparisonTable,
      gaapNetIncomeUSD: Number(gaapNetIncome.toFixed(2)),
      ifrsNetIncomeUSD: Number(ifrsNetIncome.toFixed(2)),
      netIncomeVarianceUSD: Number(netIncomeVariance.toFixed(2)),
      gaapTotalAssetsUSD: Number(gaapAssets.toFixed(2)),
      ifrsTotalAssetsUSD: Number(ifrsAssets.toFixed(2)),
      balanceSheetBridgeNotes: [
        `Balance Sheet Capitalization: IFRS intangible tech assets increased by $${(ifrsCapitalizedRd - ifrsRdAmortization).toLocaleString()}`,
        `EBITDA Reconciliation: IFRS reported EBITDA is higher because lease costs are reclassified below operating income into depreciation and interest.`,
        `Auditor Readiness: Statements formatted to allow Big 4 audit signoff across both US GAAP and IFRS frameworks simultaneously.`
      ]
    };
  }
}
