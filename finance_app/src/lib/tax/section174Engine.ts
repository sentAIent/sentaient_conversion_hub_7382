/**
 * IRC Section 174 & Form 6765 R&D Tax Credit Engine
 * 
 * Implements:
 * 1. Section 174 mandatory amortization for domestic (5-year) and foreign (15-year) research expenditures.
 * 2. Form 6765 R&D payroll tax credit calculations (Section 41/3111(f)) up to $500k offset.
 */

export interface RDExpenseItem {
  id: string;
  category: 'DOMESTIC_WAGES' | 'FOREIGN_CONTRACTOR' | 'DOMESTIC_CONTRACTOR' | 'CLOUD_COMPUTE' | 'SUPPLIES';
  description: string;
  amount: number;
  taxYear: number;
}

export interface AmortizationScheduleYear {
  year: number;
  amortizationRate: number;
  amortizationExpense: number;
  accumulatedAmortization: number;
  remainingBasis: number;
}

export interface Section174Report {
  taxYear: number;
  totalDomesticRD: number;
  totalForeignRD: number;
  totalRDExpenses: number;
  year1DomesticDeduction: number; // 10% mid-year convention
  year1ForeignDeduction: number; // 3.33% mid-year convention
  totalYear1Deduction: number;
  deferredTaxAssetImpact: number; // Disallowed immediate expensing difference * 21% corp rate
  domestic5YearSchedule: AmortizationScheduleYear[];
  foreign15YearSchedule: AmortizationScheduleYear[];
}

export interface Form6765PayrollCreditEstimate {
  qualifiedResearchExpenses: number;
  estimatedCreditAmount: number; // ~6-10% of QRE under Alternative Simplified Credit (ASC)
  maxPayrollTaxOffsetAllowed: number; // IRS statutory cap: $500,000
  actualPayrollOffset: number;
  isEligibleStartup: boolean; // Gross receipts < $5M and no gross receipts prior to 5-year window
}

export class Section174Engine {
  /**
   * Calculates IRC Section 174 Amortization Schedules
   */
  public static calculateSection174(
    expenses: RDExpenseItem[],
    taxYear: number = new Date().getFullYear(),
    corporateTaxRate: number = 0.21
  ): Section174Report {
    let domesticTotal = 0;
    let foreignTotal = 0;

    for (const exp of expenses) {
      if (exp.taxYear !== taxYear) continue;

      if (exp.category === 'FOREIGN_CONTRACTOR') {
        foreignTotal += exp.amount;
      } else {
        domesticTotal += exp.amount;
      }
    }

    // Domestic 5-Year Schedule (Mid-Year Convention: 10%, 20%, 20%, 20%, 20%, 10%)
    const domesticRates = [0.10, 0.20, 0.20, 0.20, 0.20, 0.10];
    const domesticSchedule: AmortizationScheduleYear[] = [];
    let accDom = 0;

    for (let i = 0; i < domesticRates.length; i++) {
      const rate = domesticRates[i];
      const expense = domesticTotal * rate;
      accDom += expense;
      domesticSchedule.push({
        year: taxYear + i,
        amortizationRate: rate,
        amortizationExpense: Number(expense.toFixed(2)),
        accumulatedAmortization: Number(accDom.toFixed(2)),
        remainingBasis: Number(Math.max(0, domesticTotal - accDom).toFixed(2))
      });
    }

    // Foreign 15-Year Schedule (Mid-Year Convention: 3.33% Yr 1, 6.67% Yrs 2-15, 3.33% Yr 16)
    const foreignSchedule: AmortizationScheduleYear[] = [];
    let accFor = 0;
    const foreignRates = [0.0333, ...Array(14).fill(0.0667), 0.0333];

    for (let i = 0; i < foreignRates.length; i++) {
      const rate = foreignRates[i];
      const expense = foreignTotal * rate;
      accFor += expense;
      foreignSchedule.push({
        year: taxYear + i,
        amortizationRate: rate,
        amortizationExpense: Number(expense.toFixed(2)),
        accumulatedAmortization: Number(accFor.toFixed(2)),
        remainingBasis: Number(Math.max(0, foreignTotal - accFor).toFixed(2))
      });
    }

    const year1Dom = domesticTotal * 0.10;
    const year1For = foreignTotal * 0.0333;
    const totalYear1 = year1Dom + year1For;

    // Disallowed immediate expensing impact on taxes
    const totalRD = domesticTotal + foreignTotal;
    const disallowedImmediate = totalRD - totalYear1;
    const deferredTaxImpact = disallowedImmediate * corporateTaxRate;

    return {
      taxYear,
      totalDomesticRD: Number(domesticTotal.toFixed(2)),
      totalForeignRD: Number(foreignTotal.toFixed(2)),
      totalRDExpenses: Number(totalRD.toFixed(2)),
      year1DomesticDeduction: Number(year1Dom.toFixed(2)),
      year1ForeignDeduction: Number(year1For.toFixed(2)),
      totalYear1Deduction: Number(totalYear1.toFixed(2)),
      deferredTaxAssetImpact: Number(deferredTaxImpact.toFixed(2)),
      domestic5YearSchedule: domesticSchedule,
      foreign15YearSchedule: foreignSchedule
    };
  }

  /**
   * Estimates Form 6765 Payroll Tax Credit under Section 41(h) / Section 3111(f)
   */
  public static calculateForm6765PayrollCredit(
    qualifiedWages: number,
    contractorCosts: number, // 65% eligible
    cloudComputeCosts: number,
    companyGrossReceiptsCurrentYear: number,
    yearsInBusiness: number
  ): Form6765PayrollCreditEstimate {
    const isEligibleStartup = companyGrossReceiptsCurrentYear < 5_000_000 && yearsInBusiness <= 5;

    // Eligible QRE = 100% of wages + 65% of contract research + 100% of cloud dev
    const totalQRE = qualifiedWages + (contractorCosts * 0.65) + cloudComputeCosts;

    // Alternative Simplified Credit (ASC) rate: approx 14% of excess or ~6.5% effective on gross QRE without prior baseline
    const estimatedCredit = totalQRE * 0.065;

    const STATUTORY_CAP = 500_000;
    const actualOffset = isEligibleStartup 
      ? Math.min(estimatedCredit, STATUTORY_CAP)
      : 0;

    return {
      qualifiedResearchExpenses: Number(totalQRE.toFixed(2)),
      estimatedCreditAmount: Number(estimatedCredit.toFixed(2)),
      maxPayrollTaxOffsetAllowed: STATUTORY_CAP,
      actualPayrollOffset: Number(actualOffset.toFixed(2)),
      isEligibleStartup
    };
  }
}
