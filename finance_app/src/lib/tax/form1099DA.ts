/**
 * IRS Form 1099-DA & Form 8949 Engine
 * 
 * Implements the mandated IRS Form 1099-DA standard for Digital Asset Broker Reporting,
 * generating Form 8949 capital gain dispositions with cost basis, wash sale adjustments,
 * and standard tax return export envelopes.
 */

export interface DigitalAssetTransaction {
  id: string;
  assetSymbol: string;
  assetName: string;
  units: number;
  dateAcquired: string; // ISO 8601
  dateSoldOrDisposed: string; // ISO 8601
  grossProceedsUSD: number;
  costBasisUSD: number;
  washSaleDisallowedUSD?: number;
  brokerOrWalletAddress: string;
  transactionHash?: string;
}

export type TaxTerm = 'SHORT_TERM' | 'LONG_TERM';

export interface Form8949Row {
  descriptionOfProperty: string; // Box 1a: e.g. "0.5 BTC"
  dateAcquired: string; // Box 1b
  dateSold: string; // Box 1c
  proceeds: number; // Box 1d
  costOrOtherBasis: number; // Box 1e
  adjustmentCode?: string; // Box 1f (e.g. "W" for wash sale)
  adjustmentAmount?: number; // Box 1g
  gainOrLoss: number; // Box 1h
  term: TaxTerm;
}

export interface Form1099DASummary {
  taxYear: number;
  totalGrossProceeds: number;
  totalCostBasis: number;
  totalRealizedNetGain: number;
  totalWashSaleDisallowed: number;
  shortTermRows: Form8949Row[];
  longTermRows: Form8949Row[];
  allRows: Form8949Row[];
}

export class Form1099DAEngine {
  /**
   * Processes digital asset dispositions into IRS Form 1099-DA and Form 8949 records
   */
  public static processDispositions(
    transactions: DigitalAssetTransaction[],
    taxYear: number = new Date().getFullYear()
  ): Form1099DASummary {
    const shortTermRows: Form8949Row[] = [];
    const longTermRows: Form8949Row[] = [];
    const allRows: Form8949Row[] = [];

    let totalProceeds = 0;
    let totalCost = 0;
    let totalGain = 0;
    let totalWash = 0;

    for (const tx of transactions) {
      const acquired = new Date(tx.dateAcquired);
      const sold = new Date(tx.dateSoldOrDisposed);

      // Check tax year match
      if (sold.getFullYear() !== taxYear) continue;

      // Determine term: > 1 year (365 days) is Long Term
      const diffMs = sold.getTime() - acquired.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      const term: TaxTerm = diffDays > 365 ? 'LONG_TERM' : 'SHORT_TERM';

      const washDisallowed = tx.washSaleDisallowedUSD || 0;
      // Gain/Loss = Proceeds - Cost Basis + Wash Sale Disallowed Adjustment
      const gain = tx.grossProceedsUSD - tx.costBasisUSD + washDisallowed;

      const row: Form8949Row = {
        descriptionOfProperty: `${tx.units} ${tx.assetSymbol}`,
        dateAcquired: tx.dateAcquired.slice(0, 10),
        dateSold: tx.dateSoldOrDisposed.slice(0, 10),
        proceeds: Number(tx.grossProceedsUSD.toFixed(2)),
        costOrOtherBasis: Number(tx.costBasisUSD.toFixed(2)),
        adjustmentCode: washDisallowed > 0 ? 'W' : undefined,
        adjustmentAmount: washDisallowed > 0 ? Number(washDisallowed.toFixed(2)) : undefined,
        gainOrLoss: Number(gain.toFixed(2)),
        term
      };

      if (term === 'SHORT_TERM') shortTermRows.push(row);
      else longTermRows.push(row);

      allRows.push(row);

      totalProceeds += tx.grossProceedsUSD;
      totalCost += tx.costBasisUSD;
      totalGain += gain;
      totalWash += washDisallowed;
    }

    return {
      taxYear,
      totalGrossProceeds: Number(totalProceeds.toFixed(2)),
      totalCostBasis: Number(totalCost.toFixed(2)),
      totalRealizedNetGain: Number(totalGain.toFixed(2)),
      totalWashSaleDisallowed: Number(totalWash.toFixed(2)),
      shortTermRows,
      longTermRows,
      allRows
    };
  }

  /**
   * Generates standard IRS Form 8949 CSV export content
   */
  public static exportToCSV(summary: Form1099DASummary): string {
    const headers = [
      "Description of Property (Box 1a)",
      "Date Acquired (Box 1b)",
      "Date Sold (Box 1c)",
      "Proceeds (Box 1d)",
      "Cost Basis (Box 1e)",
      "Adjustment Code (Box 1f)",
      "Adjustment Amount (Box 1g)",
      "Gain or Loss (Box 1h)",
      "Term"
    ];

    const lines = [headers.join(",")];

    for (const r of summary.allRows) {
      lines.push([
        `"${r.descriptionOfProperty}"`,
        r.dateAcquired,
        r.dateSold,
        r.proceeds.toFixed(2),
        r.costOrOtherBasis.toFixed(2),
        r.adjustmentCode || "",
        (r.adjustmentAmount || 0).toFixed(2),
        r.gainOrLoss.toFixed(2),
        r.term
      ].join(","));
    }

    return lines.join("\n");
  }
}
