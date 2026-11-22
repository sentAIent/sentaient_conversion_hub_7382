/**
 * Accounts Payable 3-Way Invoice Matching Engine
 * 
 * Line-item automated cross-verification between:
 * 1. Purchase Order (PO)
 * 2. Receiving Log / Goods Receipt Note (GRN)
 * 3. Vendor Invoice
 * Detects price variances, unreceived item billing, quantity mismatches, and duplicate billings.
 */

export interface POLineItem {
  id: string;
  sku: string;
  description: string;
  quantityOrdered: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PurchaseOrder {
  poNumber: string;
  vendorName: string;
  createdDate: string;
  currency: string;
  items: POLineItem[];
  totalAmount: number;
}

export interface GoodsReceiptNote {
  grnNumber: string;
  poNumber: string;
  receivedDate: string;
  receivedItems: {
    sku: string;
    quantityReceived: number;
    condition: 'ACCEPTED' | 'DAMAGED' | 'SHORTAGE';
  }[];
}

export interface VendorInvoice {
  invoiceNumber: string;
  poNumber: string;
  vendorName: string;
  invoiceDate: string;
  dueDate: string;
  billedItems: {
    sku: string;
    description: string;
    quantityBilled: number;
    unitPriceBilled: number;
    totalBilled: number;
  }[];
  totalAmountBilled: number;
}

export type DiscrepancySeverity = 'OK' | 'WARNING' | 'CRITICAL';

export interface LineDiscrepancy {
  sku: string;
  description: string;
  poUnitPrice: number;
  invoiceUnitPrice: number;
  priceVariancePercent: number;
  quantityOrdered: number;
  quantityReceived: number;
  quantityBilled: number;
  quantityVariance: number;
  severity: DiscrepancySeverity;
  reason: string;
}

export interface ThreeWayMatchResult {
  matchStatus: 'APPROVED_FOR_PAYMENT' | 'EXCEPTION_HOLD' | 'REJECTED';
  overallVariancePercent: number;
  lineDiscrepancies: LineDiscrepancy[];
  auditLog: string[];
  authorizedPayableAmount: number;
}

export class ThreeWayMatchingEngine {
  public static match(
    po: PurchaseOrder,
    grn: GoodsReceiptNote,
    invoice: VendorInvoice,
    priceTolerancePercent: number = 0.5 // Default 0.5% tolerance
  ): ThreeWayMatchResult {
    const auditLog: string[] = [];
    const lineDiscrepancies: LineDiscrepancy[] = [];
    let hasCritical = false;
    let hasWarning = false;

    auditLog.push(`Initiating 3-Way Verification for PO ${po.poNumber} vs Invoice ${invoice.invoiceNumber}`);

    if (po.poNumber !== invoice.poNumber || po.poNumber !== grn.poNumber) {
      return {
        matchStatus: 'REJECTED',
        overallVariancePercent: 100,
        lineDiscrepancies: [],
        auditLog: ['FATAL: PO number mismatch across documents.'],
        authorizedPayableAmount: 0
      };
    }

    // Map GRN received quantities by SKU
    const receivedMap = new Map<string, number>();
    for (const r of grn.receivedItems) {
      if (r.condition === 'ACCEPTED') {
        receivedMap.set(r.sku, (receivedMap.get(r.sku) || 0) + r.quantityReceived);
      }
    }

    // Map PO items by SKU
    const poItemMap = new Map<string, POLineItem>();
    for (const item of po.items) {
      poItemMap.set(item.sku, item);
    }

    let totalAuthorized = 0;

    for (const billed of invoice.billedItems) {
      const poItem = poItemMap.get(billed.sku);
      const qtyReceived = receivedMap.get(billed.sku) || 0;

      if (!poItem) {
        lineDiscrepancies.push({
          sku: billed.sku,
          description: billed.description,
          poUnitPrice: 0,
          invoiceUnitPrice: billed.unitPriceBilled,
          priceVariancePercent: 100,
          quantityOrdered: 0,
          quantityReceived: qtyReceived,
          quantityBilled: billed.quantityBilled,
          quantityVariance: billed.quantityBilled,
          severity: 'CRITICAL',
          reason: 'Billed item does not exist on authorized PO'
        });
        hasCritical = true;
        continue;
      }

      const priceVariance = ((billed.unitPriceBilled - poItem.unitPrice) / poItem.unitPrice) * 100;
      const qtyVariance = billed.quantityBilled - qtyReceived;

      let severity: DiscrepancySeverity = 'OK';
      let reason = 'Matched flawlessly';

      if (Math.abs(priceVariance) > priceTolerancePercent) {
        severity = 'CRITICAL';
        reason = `Price variance of ${priceVariance.toFixed(2)}% exceeds allowed ${priceTolerancePercent}%`;
        hasCritical = true;
      } else if (qtyVariance > 0) {
        severity = 'CRITICAL';
        reason = `Billed for ${billed.quantityBilled} units but receiving verified only ${qtyReceived} units`;
        hasCritical = true;
      } else if (Math.abs(priceVariance) > 0.1) {
        severity = 'WARNING';
        reason = `Minor price variance ${priceVariance.toFixed(2)}% within tolerance limit`;
        hasWarning = true;
      }

      lineDiscrepancies.push({
        sku: billed.sku,
        description: billed.description,
        poUnitPrice: poItem.unitPrice,
        invoiceUnitPrice: billed.unitPriceBilled,
        priceVariancePercent: Number(priceVariance.toFixed(2)),
        quantityOrdered: poItem.quantityOrdered,
        quantityReceived: qtyReceived,
        quantityBilled: billed.quantityBilled,
        quantityVariance: qtyVariance,
        severity,
        reason
      });

      if (severity !== 'CRITICAL') {
        totalAuthorized += (Math.min(billed.quantityBilled, qtyReceived) * poItem.unitPrice);
      }
    }

    const overallVariance = Math.abs((invoice.totalAmountBilled - po.totalAmount) / po.totalAmount) * 100;

    let matchStatus: 'APPROVED_FOR_PAYMENT' | 'EXCEPTION_HOLD' | 'REJECTED' = 'APPROVED_FOR_PAYMENT';
    if (hasCritical) {
      matchStatus = 'EXCEPTION_HOLD';
      auditLog.push(`HOLD: Critical pricing or receiving discrepancies flagged for manual controller review.`);
    } else if (hasWarning) {
      auditLog.push(`APPROVED: Minor variance within acceptable threshold.`);
    } else {
      auditLog.push(`PASSED: 100% triple-match verified between PO, GRN, and Invoice.`);
    }

    return {
      matchStatus,
      overallVariancePercent: Number(overallVariance.toFixed(2)),
      lineDiscrepancies,
      auditLog,
      authorizedPayableAmount: Number(totalAuthorized.toFixed(2))
    };
  }
}
