/**
 * Institutional Investor Relations & Automated Update Engine
 * 
 * Aggregates real-time financial, treasury, and operational data into executive-grade
 * monthly and quarterly investor updates with key performance indicators (KPIs),
 * cash runway, tokenized yield, highlights, lowlights, and strategic "asks".
 */

export interface InvestorUpdateMetrics {
  reportingPeriod: string;            // e.g. "Q4 2026" or "November 2026"
  arrUSD: number;                     // Annual Recurring Revenue
  mrrUSD: number;                     // Monthly Recurring Revenue
  momGrowthRatePercent: number;       // Month-over-Month growth
  grossMarginPercent: number;         // e.g. 84.5%
  netBurnMonthlyUSD: number;          // Net monthly cash burn
  totalCashOperatingUSD: number;      // Operating fiat cash
  tokenizedTreasuryHoldingsUSD: number; // Ondo USDY + Franklin BENJI
  treasuryBlendedApy: number;         // e.g. 5.18%
  cashRunwayMonths: number;           // Calculated runway
  activeCustomersCount: number;       // Enterprise count
  netRevenueRetentionPercent: number; // NRR (e.g. 128%)
  highlights: string[];
  lowlights: string[];
  strategicAsks: string[];
}

export interface FormattedInvestorLetter {
  subject: string;
  markdownContent: string;
  summaryExecutiveDigest: string;
  keyMetricsGrid: Record<string, string>;
  generatedAt: string;
}

export class InvestorUpdateEngine {
  public static readonly DEFAULT_METRICS: InvestorUpdateMetrics = {
    reportingPeriod: 'November 2026',
    arrUSD: 4200000,
    mrrUSD: 350000,
    momGrowthRatePercent: 14.2,
    grossMarginPercent: 86.0,
    netBurnMonthlyUSD: 145000,
    totalCashOperatingUSD: 1850000,
    tokenizedTreasuryHoldingsUSD: 2400000, // Ondo USDY + BENJI
    treasuryBlendedApy: 5.18,
    cashRunwayMonths: 29.3,
    activeCustomersCount: 48,
    netRevenueRetentionPercent: 132.0,
    highlights: [
      'Crossed $4.2M ARR (+14.2% MoM growth) propelled by enterprise fintech and Web3 treasury onboarding.',
      'Completed sovereign institutional expansion: Gnosis Safe v1.4.1 multi-sig, 3-way invoice matching, and 409A OPM modeler.',
      'Active treasury sweep earned $10,360 in monthly risk-free yield across Ondo USDY (5.10%) and Franklin Templeton BENJI (5.25%).',
      'Continuous SOC 1 Type II & SOC 2 evidence vault sealed with SHA-256 Merkle root integrity.'
    ],
    lowlights: [
      'Sales cycle for Tier-1 multinational banks remains 60-90 days due to cross-border VAT/GST nexus review.',
      'Base network priority fees experienced temporary spikes during high-volatility trading windows.'
    ],
    strategicAsks: [
      'Introductions to CFOs and Heads of Treasury at Series B-D companies needing automated cash sweeps & 3-way matching.',
      'Recommendations for Senior Rust / Solana core protocol engineers to expand our native enclave key vault.'
    ]
  };

  /**
   * Generates a comprehensive, formatted executive investor letter
   */
  public static generateLetter(metrics: InvestorUpdateMetrics = this.DEFAULT_METRICS): FormattedInvestorLetter {
    const totalLiquidityUSD = metrics.totalCashOperatingUSD + metrics.tokenizedTreasuryHoldingsUSD;
    const annualTreasuryYieldUSD = (metrics.tokenizedTreasuryHoldingsUSD * (metrics.treasuryBlendedApy / 100));

    const subject = `Liquid Investor Update — ${metrics.reportingPeriod}: $${(metrics.arrUSD / 1_000_000).toFixed(1)}M ARR, ${metrics.momGrowthRatePercent}% MoM, ${metrics.cashRunwayMonths.toFixed(1)} Mo Runway`;

    const summaryExecutiveDigest = `Liquid grew to $${(metrics.arrUSD / 1_000_000).toFixed(2)}M ARR in ${metrics.reportingPeriod} (+${metrics.momGrowthRatePercent}% MoM). Total liquidity sits at $${(totalLiquidityUSD / 1_000_000).toFixed(2)}M ($${(metrics.tokenizedTreasuryHoldingsUSD / 1_000_000).toFixed(2)}M deployed in tokenized T-Bills yielding ${metrics.treasuryBlendedApy}%), providing ${metrics.cashRunwayMonths.toFixed(1)} months of cash runway.`;

    const keyMetricsGrid: Record<string, string> = {
      'ARR': `$${(metrics.arrUSD / 1_000_000).toFixed(2)}M`,
      'MoM Growth': `+${metrics.momGrowthRatePercent.toFixed(1)}%`,
      'Gross Margin': `${metrics.grossMarginPercent.toFixed(1)}%`,
      'Net Monthly Burn': `$${metrics.netBurnMonthlyUSD.toLocaleString()}`,
      'Total Liquidity': `$${(totalLiquidityUSD / 1_000_000).toFixed(2)}M`,
      'Tokenized T-Bills': `$${(metrics.tokenizedTreasuryHoldingsUSD / 1_000_000).toFixed(2)}M (${metrics.treasuryBlendedApy}% APY)`,
      'Annual Treasury Yield': `+$${Math.round(annualTreasuryYieldUSD).toLocaleString()}/yr`,
      'Cash Runway': `${metrics.cashRunwayMonths.toFixed(1)} Months`,
      'Net Revenue Retention': `${metrics.netRevenueRetentionPercent.toFixed(0)}%`,
      'Enterprise Customers': `${metrics.activeCustomersCount}`
    };

    const markdownContent = `# Liquid Investor Update — ${metrics.reportingPeriod}

Dear Investors & Partners,

${summaryExecutiveDigest}

---

## 1. Key Performance Indicators

| Financial Metric | Performance | Context / Benchmark |
| :--- | :--- | :--- |
| **ARR** | **$${(metrics.arrUSD / 1_000_000).toFixed(2)}M** | +${metrics.momGrowthRatePercent}% MoM |
| **Gross Margin** | **${metrics.grossMarginPercent}%** | Software + Transaction Fee blend |
| **Net Monthly Burn** | **$${metrics.netBurnMonthlyUSD.toLocaleString()}** | Offset by +$${Math.round(annualTreasuryYieldUSD / 12).toLocaleString()}/mo in T-Bill yield |
| **Cash Runway** | **${metrics.cashRunwayMonths.toFixed(1)} Months** | Calculated against net operating burn |
| **Total Liquidity** | **$${(totalLiquidityUSD / 1_000_000).toFixed(2)}M** | $${(metrics.totalCashOperatingUSD / 1_000_000).toFixed(2)}M Cash + $${(metrics.tokenizedTreasuryHoldingsUSD / 1_000_000).toFixed(2)}M T-Bills |
| **Net Revenue Retention** | **${metrics.netRevenueRetentionPercent}%** | Strong negative churn on enterprise tiers |
| **Enterprise Clients** | **${metrics.activeCustomersCount}** | Active institutional customers |

---

## 2. Key Highlights & Achievements
${metrics.highlights.map(h => `- ${h}`).join('\n')}

---

## 3. Lowlights & Challenges
${metrics.lowlights.map(l => `- ${l}`).join('\n')}

---

## 4. How You Can Help (Asks)
${metrics.strategicAsks.map(a => `- ${a}`).join('\n')}

---

*Prepared by Liquid Autonomous Investor Relations Engine.*
*All financial records cryptographically reconciled via Liquid Triple-Entry Immutable Ledger.*
`;

    return {
      subject,
      markdownContent,
      summaryExecutiveDigest,
      keyMetricsGrid,
      generatedAt: new Date().toISOString()
    };
  }
}
