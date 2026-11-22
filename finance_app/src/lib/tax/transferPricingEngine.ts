/**
 * OECD Transfer Pricing & Intercompany Agreement Engine
 * 
 * Implements the Arm's Length Principle under OECD Transfer Pricing Guidelines and IRC Section 482.
 * Calculates Cost Plus Method (CPM) and Transactional Net Margin Method (TNMM) markups
 * for cross-border IP licensing, R&D, and centralized management services.
 */

export interface IntercompanyService {
  serviceId: string;
  description: string;
  providerEntity: string;      // e.g. 'Liquid US Inc.'
  providerCountry: string;
  recipientEntity: string;     // e.g. 'Liquid Ireland Ltd.'
  recipientCountry: string;
  directCostUSD: number;
  indirectCostAllocatedUSD: number;
  markupPercent: number;       // e.g. 8.0% (Arm's length benchmark)
  serviceType: 'SOFTWARE_RD' | 'MANAGEMENT_SERVICES' | 'SALES_MARKETING' | 'CUSTOMER_SUPPORT';
}

export interface TransferPricingSchedule {
  serviceId: string;
  description: string;
  totalCostBaseUSD: number;
  markupAmountUSD: number;
  totalIntercompanyInvoiceUSD: number;
  effectiveTaxRateProvider: number;
  effectiveTaxRateRecipient: number;
}

export interface TransferPricingReport {
  taxYear: number;
  totalIntercompanyChargesUSD: number;
  totalCostBasisUSD: number;
  totalMarkupProfitUSD: number;
  schedules: TransferPricingSchedule[];
  agreementContractText: string;
}

export class TransferPricingEngine {
  public static calculate(services: IntercompanyService[], taxYear: number = new Date().getFullYear()): TransferPricingReport {
    let totalCharges = 0;
    let totalCost = 0;
    let totalMarkup = 0;

    const schedules: TransferPricingSchedule[] = services.map(s => {
      const costBase = s.directCostUSD + s.indirectCostAllocatedUSD;
      const markup = costBase * (s.markupPercent / 100);
      const invoice = costBase + markup;

      totalCost += costBase;
      totalMarkup += markup;
      totalCharges += invoice;

      return {
        serviceId: s.serviceId,
        description: s.description,
        totalCostBaseUSD: Number(costBase.toFixed(2)),
        markupAmountUSD: Number(markup.toFixed(2)),
        totalIntercompanyInvoiceUSD: Number(invoice.toFixed(2)),
        effectiveTaxRateProvider: 21.0, // US Corporate rate
        effectiveTaxRateRecipient: 12.5  // Irish corporate rate / global average
      };
    });

    const agreementContractText = `MASTER INTERCOMPANY SERVICES AGREEMENT (TRANSFER PRICING COMPLIANT)

This Master Intercompany Services Agreement (the "Agreement") is entered into effective as of January 1, ${taxYear}, by and between:
1. Liquid Technologies Inc., a Delaware corporation ("Service Provider"), and
2. Its qualified foreign subsidiaries and affiliates ("Service Recipients").

RECITALS:
WHEREAS, Service Provider maintains specialized technical personnel, software infrastructure, and management expertise; and
WHEREAS, Service Recipients desire to engage Service Provider to provide technical software development, sales coordination, and administrative services on an arm's length basis conforming with the OECD Transfer Pricing Guidelines and Internal Revenue Code Section 482.

NOW, THEREFORE, the parties agree as follows:
1. Scope of Services: Service Provider shall render the technical and management services specified in Schedule A.
2. Compensation & Pricing Methodology: 
   Charges shall be determined using the Cost Plus Method (CPM), consisting of total direct and indirect costs plus an arm's length markup of 5.0% - 10.0%, verified through comparable uncontrolled transaction (CUT) studies.
3. Invoicing & Settlement: Services shall be invoiced quarterly and settled within thirty (30) days in United States Dollars (USD).
4. Documentation & Audits: Both parties shall maintain contemporaneous transfer pricing documentation supporting the economic substance and arm's length character of all transactions.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.
`;

    return {
      taxYear,
      totalIntercompanyChargesUSD: Number(totalCharges.toFixed(2)),
      totalCostBasisUSD: Number(totalCost.toFixed(2)),
      totalMarkupProfitUSD: Number(totalMarkup.toFixed(2)),
      schedules,
      agreementContractText
    };
  }
}
