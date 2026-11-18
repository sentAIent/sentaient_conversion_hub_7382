/**
 * Complex GAAP/IFRS Standards: ASC 606 & ASC 842 Engine
 * 
 * Implements:
 * 1. ASC 606: 5-step revenue recognition model, performance obligation allocation, deferred revenue waterfalls.
 * 2. ASC 842: Right-of-Use (ROU) asset valuation, lease liability amortization, operating vs finance lease classification.
 */

// ==================== ASC 606 REVENUE RECOGNITION ====================

export interface PerformanceObligation {
  id: string;
  description: string;
  standaloneSellingPrice: number;
  deliveryDate: string; // ISO 8601
  status: 'PENDING' | 'FULFILLED' | 'IN_PROGRESS';
  recognizedRevenue: number;
}

export interface ASC606Contract {
  contractId: string;
  customerName: string;
  totalTransactionPrice: number;
  startDate: string;
  endDate: string;
  obligations: PerformanceObligation[];
}

export interface RevenueScheduleMonth {
  yearMonth: string; // "YYYY-MM"
  recognizedRevenue: number;
  deferredRevenueBalance: number;
}

export class ASC606Engine {
  /**
   * Allocates transaction price across performance obligations based on relative Standalone Selling Price (SSP)
   */
  public static allocateTransactionPrice(contract: ASC606Contract): PerformanceObligation[] {
    const totalSSP = contract.obligations.reduce((sum, o) => sum + o.standaloneSellingPrice, 0);
    if (totalSSP === 0) return contract.obligations;

    return contract.obligations.map(obligation => {
      const allocationRatio = obligation.standaloneSellingPrice / totalSSP;
      const allocatedPrice = contract.totalTransactionPrice * allocationRatio;
      const recognized = obligation.status === 'FULFILLED' ? allocatedPrice : 0;

      return {
        ...obligation,
        recognizedRevenue: Number(recognized.toFixed(2))
      };
    });
  }

  /**
   * Generates a monthly straight-line deferred revenue amortization waterfall
   */
  public static generateDeferredRevenueSchedule(
    contractAmount: number,
    startYearMonth: string, // "YYYY-MM"
    termMonths: number
  ): RevenueScheduleMonth[] {
    if (termMonths <= 0) return [];
    const monthlyRate = contractAmount / termMonths;
    const schedule: RevenueScheduleMonth[] = [];
    let remainingDeferred = contractAmount;

    let [year, month] = startYearMonth.split('-').map(Number);

    for (let i = 0; i < termMonths; i++) {
      const yearMonthStr = `${year}-${String(month).padStart(2, '0')}`;
      const rec = (i === termMonths - 1) ? remainingDeferred : Number(monthlyRate.toFixed(2));
      remainingDeferred = Math.max(0, remainingDeferred - rec);

      schedule.push({
        yearMonth: yearMonthStr,
        recognizedRevenue: Number(rec.toFixed(2)),
        deferredRevenueBalance: Number(remainingDeferred.toFixed(2))
      });

      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
    }

    return schedule;
  }
}

// ==================== ASC 842 LEASE ACCOUNTING ====================

export interface LeaseScheduleRow {
  periodMonth: number;
  date: string;
  payment: number;
  interestExpense: number;
  liabilityReduction: number;
  endingLiability: number;
  rouAmortization: number;
  endingRouAsset: number;
}

export interface ASC842LeaseAnalysis {
  classification: 'OPERATING' | 'FINANCE';
  presentValueOfLeasePayments: number;
  initialRouAsset: number;
  totalPayments: number;
  totalInterest: number;
  schedule: LeaseScheduleRow[];
}

export class ASC842Engine {
  /**
   * Analyzes and schedules a lease under ASC 842
   * @param monthlyPayment Monthly cash lease payment
   * @param termMonths Lease duration in months
   * @param annualDiscountRate Discount rate (Incremental Borrowing Rate) e.g. 0.06 for 6%
   * @param fairValueOfAsset Fair market value of leased property
   * @param economicLifeMonths Useful economic life of the property
   */
  public static calculateLease(
    monthlyPayment: number,
    termMonths: number,
    annualDiscountRate: number,
    fairValueOfAsset: number,
    economicLifeMonths: number
  ): ASC842LeaseAnalysis {
    const monthlyRate = annualDiscountRate / 12;

    // Present value of ordinary annuity: PV = PMT * (1 - (1 + r)^(-n)) / r
    const pv = monthlyRate > 0
      ? monthlyPayment * ((1 - Math.pow(1 + monthlyRate, -termMonths)) / monthlyRate)
      : monthlyPayment * termMonths;

    // Classification criteria:
    // 1. Term >= 75% of economic life
    // 2. PV >= 90% of fair value
    const isMajorTerm = (termMonths / economicLifeMonths) >= 0.75;
    const isSubstantialValue = (pv / fairValueOfAsset) >= 0.90;
    const classification: 'OPERATING' | 'FINANCE' = (isMajorTerm || isSubstantialValue) ? 'FINANCE' : 'OPERATING';

    const schedule: LeaseScheduleRow[] = [];
    let currentLiability = pv;
    let currentRouAsset = pv;
    const monthlyRouAmort = pv / termMonths;
    let totalInterest = 0;

    const startDate = new Date();

    for (let period = 1; period <= termMonths; period++) {
      const interest = currentLiability * monthlyRate;
      totalInterest += interest;
      const principal = monthlyPayment - interest;
      currentLiability = Math.max(0, currentLiability - principal);
      currentRouAsset = Math.max(0, currentRouAsset - monthlyRouAmort);

      const periodDate = new Date(startDate.getFullYear(), startDate.getMonth() + (period - 1), 1);
      const dateStr = periodDate.toISOString().slice(0, 10);

      schedule.push({
        periodMonth: period,
        date: dateStr,
        payment: monthlyPayment,
        interestExpense: Number(interest.toFixed(2)),
        liabilityReduction: Number(principal.toFixed(2)),
        endingLiability: Number(currentLiability.toFixed(2)),
        rouAmortization: Number(monthlyRouAmort.toFixed(2)),
        endingRouAsset: Number(currentRouAsset.toFixed(2))
      });
    }

    return {
      classification,
      presentValueOfLeasePayments: Number(pv.toFixed(2)),
      initialRouAsset: Number(pv.toFixed(2)),
      totalPayments: Number((monthlyPayment * termMonths).toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      schedule
    };
  }
}
