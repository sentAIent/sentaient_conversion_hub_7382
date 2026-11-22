/**
 * Global VAT/GST & Digital Services Tax Nexus Engine
 * 
 * Monitors cross-border B2B/B2C SaaS sales against statutory registration thresholds
 * across the European Union (OSS), United Kingdom (HMRC), Canada (CRA GST/HST),
 * Australia (ATO), Japan (NTA), and Singapore (IRAS).
 */

export interface JurisdictionTaxRule {
  countryCode: string;
  name: string;
  currency: string;
  statutoryThresholdLocal: number;
  statutoryThresholdUSD: number;
  standardTaxRatePercent: number;
  b2bReverseChargeAllowed: boolean;
  registrationScheme: string; // e.g. 'EU Non-Union OSS', 'HMRC Digital Services'
}

export const GLOBAL_JURISDICTION_RULES: Record<string, JurisdictionTaxRule> = {
  EU: {
    countryCode: 'EU',
    name: 'European Union (All 27 Member States)',
    currency: 'EUR',
    statutoryThresholdLocal: 10000,
    statutoryThresholdUSD: 10800,
    standardTaxRatePercent: 21.0,
    b2bReverseChargeAllowed: true,
    registrationScheme: 'EU Non-Union One-Stop-Shop (OSS)'
  },
  GB: {
    countryCode: 'GB',
    name: 'United Kingdom (HMRC)',
    currency: 'GBP',
    statutoryThresholdLocal: 85000,
    statutoryThresholdUSD: 110000,
    standardTaxRatePercent: 20.0,
    b2bReverseChargeAllowed: true,
    registrationScheme: 'HMRC Non-Established Taxable Person (NETP)'
  },
  CA: {
    countryCode: 'CA',
    name: 'Canada (CRA)',
    currency: 'CAD',
    statutoryThresholdLocal: 30000,
    statutoryThresholdUSD: 22000,
    standardTaxRatePercent: 5.0, // Federal GST base (excluding provincial HST/QST)
    b2bReverseChargeAllowed: true,
    registrationScheme: 'CRA Simplified GST/HST for Non-Resident Digital Platforms'
  },
  AU: {
    countryCode: 'AU',
    name: 'Australia (ATO)',
    currency: 'AUD',
    statutoryThresholdLocal: 75000,
    statutoryThresholdUSD: 49000,
    standardTaxRatePercent: 10.0,
    b2bReverseChargeAllowed: true,
    registrationScheme: 'ATO Simplified GST for Inbound Intangible Supplies'
  },
  SG: {
    countryCode: 'SG',
    name: 'Singapore (IRAS)',
    currency: 'SGD',
    statutoryThresholdLocal: 100000,
    statutoryThresholdUSD: 74000,
    standardTaxRatePercent: 9.0,
    b2bReverseChargeAllowed: true,
    registrationScheme: 'IRAS Overseas Vendor Registration (OVR)'
  }
};

export interface JurisdictionSalesInput {
  countryCode: string;
  salesVolumeUSD: number;
  transactionCount: number;
}

export interface JurisdictionNexusStatus {
  countryCode: string;
  name: string;
  currency: string;
  salesVolumeUSD: number;
  thresholdUSD: number;
  thresholdMet: boolean;
  utilizationPercent: number;
  standardTaxRatePercent: number;
  estimatedTaxObligationUSD: number;
  registrationScheme: string;
}

export class GlobalVatGstEngine {
  public static evaluateNexus(salesData: JurisdictionSalesInput[]): {
    totalInternationalSalesUSD: number;
    activeNexusCount: number;
    totalEstimatedTaxLiabilityUSD: number;
    statuses: JurisdictionNexusStatus[];
  } {
    let totalSales = 0;
    let activeCount = 0;
    let totalTax = 0;

    const statuses: JurisdictionNexusStatus[] = [];

    for (const [code, rule] of Object.entries(GLOBAL_JURISDICTION_RULES)) {
      const sales = salesData.find(s => s.countryCode.toUpperCase() === code.toUpperCase())?.salesVolumeUSD || 0;
      totalSales += sales;

      const thresholdMet = sales >= rule.statutoryThresholdUSD;
      if (thresholdMet) activeCount++;

      const utilization = rule.statutoryThresholdUSD > 0 ? (sales / rule.statutoryThresholdUSD) * 100 : 0;
      const estimatedTax = thresholdMet ? sales * (rule.standardTaxRatePercent / 100) : 0;
      totalTax += estimatedTax;

      statuses.push({
        countryCode: code,
        name: rule.name,
        currency: rule.currency,
        salesVolumeUSD: Number(sales.toFixed(2)),
        thresholdUSD: rule.statutoryThresholdUSD,
        thresholdMet,
        utilizationPercent: Number(utilization.toFixed(1)),
        standardTaxRatePercent: rule.standardTaxRatePercent,
        estimatedTaxObligationUSD: Number(estimatedTax.toFixed(2)),
        registrationScheme: rule.registrationScheme
      });
    }

    return {
      totalInternationalSalesUSD: Number(totalSales.toFixed(2)),
      activeNexusCount: activeCount,
      totalEstimatedTaxLiabilityUSD: Number(totalTax.toFixed(2)),
      statuses
    };
  }
}
