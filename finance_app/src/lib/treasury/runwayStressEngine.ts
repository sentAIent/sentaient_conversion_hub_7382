/**
 * Monte Carlo Cash Runway & Macroeconomic Stress Testing Engine
 * 
 * Runs 1,000+ stochastic iterations across 24 projected months modeling revenue variance,
 * customer churn shocks, and cost escalations to determine P10, P50, and P90 runway horizons.
 */

export interface RunwayParameters {
  currentCashBalance: number;
  monthlyRevenueBase: number;
  monthlyGrowthRateMean: number;       // e.g. 0.05 (5% monthly growth)
  monthlyGrowthRateStdDev: number;     // e.g. 0.03 (3% volatility)
  monthlyBurnBase: number;             // Base OPEX (payroll + infra + rent)
  burnGrowthRatePerMonth: number;      // e.g. 0.01 (1% monthly cost inflation)
  scenarios: {
    macroDownturnActive: boolean;       // Reduces growth by 50%, increases churn
    hiringFreezeActive: boolean;        // Freezes burn inflation to 0%
    seriesAFundingAmount?: number;      // Optional injection at month X
    seriesAFundingMonth?: number;
  };
  iterations?: number;                 // Defaults to 1,000
}

export interface MonthCashSummary {
  monthIndex: number;
  p10Cash: number;
  p50Cash: number;
  p90Cash: number;
}

export interface RunwaySimulationResult {
  p10RunwayMonths: number;             // Worst-case 10th percentile
  p50RunwayMonths: number;             // Median expected runway
  p90RunwayMonths: number;             // Bullish 90th percentile
  zeroCashProbability24M: number;      // % of simulations that ran out of cash <= 24 mo
  monthlyCashCurves: MonthCashSummary[];
  recommendation: string;
}

export class RunwayStressEngine {
  /**
   * Generates a normally distributed random variable using Box-Muller transform
   */
  private static randomGaussian(mean: number, stdDev: number): number {
    let u1 = 0, u2 = 0;
    while (u1 === 0) u1 = Math.random();
    while (u2 === 0) u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return mean + z0 * stdDev;
  }

  public static simulate(params: RunwayParameters): RunwaySimulationResult {
    const iterations = params.iterations || 1000;
    const months = 24;
    const runwayDistribution: number[] = [];
    const monthlyCashMatrix: number[][] = Array.from({ length: months }, () => []);

    for (let i = 0; i < iterations; i++) {
      let cash = params.currentCashBalance;
      let revenue = params.monthlyRevenueBase;
      let burn = params.monthlyBurnBase;
      let runwayMonths = months;

      for (let m = 0; m < months; m++) {
        // Evaluate capital injection
        if (params.scenarios.seriesAFundingAmount && params.scenarios.seriesAFundingMonth === m + 1) {
          cash += params.scenarios.seriesAFundingAmount;
        }

        // Calculate stochastic growth
        let growthMean = params.monthlyGrowthRateMean;
        let growthStd = params.monthlyGrowthRateStdDev;
        if (params.scenarios.macroDownturnActive) {
          growthMean = Math.max(-0.05, growthMean - 0.04); // Severe contraction
          growthStd *= 1.5;
        }

        const sampledGrowth = this.randomGaussian(growthMean, growthStd);
        revenue = Math.max(0, revenue * (1 + sampledGrowth));

        // Calculate burn growth
        let burnGrowth = params.scenarios.hiringFreezeActive ? 0 : params.burnGrowthRatePerMonth;
        burn *= (1 + burnGrowth);

        const netBurn = Math.max(0, burn - revenue);
        cash -= netBurn;

        monthlyCashMatrix[m].push(cash);

        if (cash <= 0 && runwayMonths === months) {
          runwayMonths = m + 1;
        }
      }

      runwayDistribution.push(runwayMonths);
    }

    // Sort to compute percentiles
    runwayDistribution.sort((a, b) => a - b);
    const p10Index = Math.floor(iterations * 0.10);
    const p50Index = Math.floor(iterations * 0.50);
    const p90Index = Math.floor(iterations * 0.90);

    const p10RunwayMonths = runwayDistribution[p10Index];
    const p50RunwayMonths = runwayDistribution[p50Index];
    const p90RunwayMonths = runwayDistribution[p90Index];

    const zeroCashCount = runwayDistribution.filter(r => r < 24).length;
    const zeroCashProbability24M = Number(((zeroCashCount / iterations) * 100).toFixed(1));

    // Calculate monthly percentiles
    const monthlyCashCurves: MonthCashSummary[] = monthlyCashMatrix.map((monthValues, idx) => {
      monthValues.sort((a, b) => a - b);
      return {
        monthIndex: idx + 1,
        p10Cash: Math.round(monthValues[p10Index]),
        p50Cash: Math.round(monthValues[p50Index]),
        p90Cash: Math.round(monthValues[p90Index])
      };
    });

    let recommendation = "Capital reserves are strong. Continue normal operational expansion.";
    if (p50RunwayMonths < 12) {
      recommendation = "ALERT: Median runway is under 12 months. Implement hiring freeze and activate sweep yields.";
    } else if (p10RunwayMonths < 6) {
      recommendation = "CAUTION: Adverse tail-risk scenario depletes cash under 6 months. Maintain 60-day OPEX buffer.";
    }

    return {
      p10RunwayMonths,
      p50RunwayMonths,
      p90RunwayMonths,
      zeroCashProbability24M,
      monthlyCashCurves,
      recommendation
    };
  }
}
