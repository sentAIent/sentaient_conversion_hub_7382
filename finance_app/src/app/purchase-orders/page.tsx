'use client';

import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  ArrowRight,
  Filter,
  DollarSign,
  Building,
  UserCheck,
  FileSpreadsheet,
  Check,
  Sparkles
} from 'lucide-react';

interface PurchaseOrderItem {
  id: string;
  poNumber: string;
  vendorName: string;
  department: 'Engineering' | 'Growth' | 'Product' | 'G&A';
  requestedAmount: number;
  invoiceAmount?: number;
  receivingVerified: boolean;
  variancePct: number;
  approvalTier: 'Tier 1 (Dept Head)' | 'Tier 2 (VP)' | 'Tier 3 (CFO/CEO)';
  status: 'Matched' | 'Exception Flagged' | 'Pending Approval' | 'Draft';
  createdAt: string;
  description: string;
}

export default function PurchaseOrdersPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrderItem[]>([
    {
      id: 'po-101',
      poNumber: 'PO-2026-0412',
      vendorName: 'NVIDIA Enterprise AI Cloud',
      department: 'Engineering',
      requestedAmount: 48000,
      invoiceAmount: 48000,
      receivingVerified: true,
      variancePct: 0.0,
      approvalTier: 'Tier 3 (CFO/CEO)',
      status: 'Matched',
      createdAt: 'Nov 02, 2026',
      description: 'H100 GPU compute cluster reservation (November capacity)'
    },
    {
      id: 'po-102',
      poNumber: 'PO-2026-0415',
      vendorName: 'Scale AI Data Labeling',
      department: 'Product',
      requestedAmount: 18500,
      invoiceAmount: 19450,
      receivingVerified: true,
      variancePct: 5.14,
      approvalTier: 'Tier 2 (VP)',
      status: 'Exception Flagged',
      createdAt: 'Nov 04, 2026',
      description: 'RLHF annotation batches for fine-tuned reasoning model'
    },
    {
      id: 'po-103',
      poNumber: 'PO-2026-0418',
      vendorName: 'Datadog Observability Suite',
      department: 'Engineering',
      requestedAmount: 12400,
      invoiceAmount: 12400,
      receivingVerified: true,
      variancePct: 0.0,
      approvalTier: 'Tier 2 (VP)',
      status: 'Matched',
      createdAt: 'Nov 06, 2026',
      description: 'APM infrastructure monitoring & log ingestion tier'
    },
    {
      id: 'po-104',
      poNumber: 'PO-2026-0422',
      vendorName: 'Latham & Watkins LLP',
      department: 'G&A',
      requestedAmount: 35000,
      invoiceAmount: undefined,
      receivingVerified: false,
      variancePct: 0.0,
      approvalTier: 'Tier 3 (CFO/CEO)',
      status: 'Pending Approval',
      createdAt: 'Nov 08, 2026',
      description: 'Series B venture financing legal counsel retainer'
    },
    {
      id: 'po-105',
      poNumber: 'PO-2026-0425',
      vendorName: 'Figma Enterprise Workspace',
      department: 'Product',
      requestedAmount: 3600,
      invoiceAmount: 3600,
      receivingVerified: true,
      variancePct: 0.0,
      approvalTier: 'Tier 1 (Dept Head)',
      status: 'Matched',
      createdAt: 'Nov 09, 2026',
      description: 'Annual design seat license renewal (24 seats)'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'Matched' | 'Exception Flagged' | 'Pending Approval'>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = (id: string, poNum: string) => {
    setPurchaseOrders(prev =>
      prev.map(po => (po.id === id ? { ...po, status: 'Matched' } : po))
    );
    showToast(`Approved ${poNum} and queued to AP Bill Pay.`);
  };

  const handleOverrideVariance = (id: string, poNum: string) => {
    setPurchaseOrders(prev =>
      prev.map(po => (po.id === id ? { ...po, status: 'Matched' } : po))
    );
    showToast(`Variance exception cleared for ${poNum}. Matched for disbursement.`);
  };

  const filteredPOs = purchaseOrders.filter(po =>
    activeFilter === 'ALL' ? true : po.status === activeFilter
  );

  const totalCommittedSpend = purchaseOrders.reduce((sum, p) => sum + p.requestedAmount, 0);
  const totalExceptions = purchaseOrders.filter(p => p.status === 'Exception Flagged').length;
  const matchEfficiency = (
    (purchaseOrders.filter(p => p.status === 'Matched').length / purchaseOrders.length) *
    100
  ).toFixed(1);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-500 text-sm animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-xl border border-indigo-500/20">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Purchase Order (PO) & 3-Way Match Verification
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Automated reconciliation of Purchase Orders $\leftrightarrow$ Goods/Service Receipts $\leftrightarrow$ Vendor AP Invoices with spend authorization matrices.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast('Dispatched automated 3-way match batch across open AP invoices.')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-card hover:bg-muted/80 text-foreground border border-border rounded-lg shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            Auto-Match Open AP
          </button>
          <button
            onClick={() => showToast('Opening New Purchase Order requisition modal...')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Purchase Order
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Committed PO Pipeline</span>
            <DollarSign className="w-4 h-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {formatCurrency(totalCommittedSpend)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {purchaseOrders.length} active requisitions tracked
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>3-Way Match Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-500">
            {matchEfficiency}%
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            PO amount, receipt & invoice align perfectly
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Variance Exceptions</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-amber-500">
            {totalExceptions}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Discrepancies exceeding $\pm 2\%$ tolerance threshold
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Approval Matrix Status</span>
            <UserCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            3-Tier Enforced
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Dept Head ($&lt;$5k) &bull; VP ($25k) &bull; CFO ($&gt;$25k)
          </div>
        </div>
      </div>

      {/* 3-Way Match Visual Explainer */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-base font-semibold text-foreground">
            Enterprise 3-Way Reconciler Architecture
          </h2>
          <span className="text-xs text-muted-foreground font-mono">
            Variance Threshold: &plusmn;2.0% ($250 max auto-cleared)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 bg-muted/30 border border-border rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">1. Purchase Order</span>
              <span className="text-xs font-mono font-medium text-primary">Pre-Approved</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Department manager issues PO before vendor engagement. Automatically checks department budget availability before lock.
            </p>
          </div>

          <div className="p-4 bg-muted/30 border border-border rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">2. Receiving Verification</span>
              <span className="text-xs font-mono font-medium text-emerald-500">Attested</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Team attests delivery of physical goods or completion of software/consulting deliverables before vendor payment release.
            </p>
          </div>

          <div className="p-4 bg-muted/30 border border-border rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">3. Vendor AP Invoice</span>
              <span className="text-xs font-mono font-medium text-indigo-500">Reconciled</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Matches vendor line items, tax, and total against PO #. Flags unexpected charges or quantity mismatches.
            </p>
          </div>
        </div>
      </div>

      {/* Requisitions Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Active Purchase Orders & 3-Way Match Status</h3>
          </div>

          <div className="flex items-center gap-2">
            {(['ALL', 'Matched', 'Exception Flagged', 'Pending Approval'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {filter === 'ALL' ? 'All Orders' : filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">PO Number & Vendor</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5 text-right">PO Amount</th>
                <th className="px-6 py-3.5 text-right">Invoice Amount</th>
                <th className="px-6 py-3.5 text-center">Receipt Verified</th>
                <th className="px-6 py-3.5">Approval Tier</th>
                <th className="px-6 py-3.5 text-center">Match Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPOs.map((po) => (
                <tr key={po.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{po.vendorName}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {po.poNumber} &bull; {po.createdAt}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{po.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-foreground border border-border">
                      {po.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-foreground">
                    {formatCurrency(po.requestedAmount)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                    {po.invoiceAmount ? (
                      <span className={po.variancePct > 2 ? 'text-amber-500 font-bold' : 'text-foreground'}>
                        {formatCurrency(po.invoiceAmount)}
                        {po.variancePct > 0 && ` (+${po.variancePct.toFixed(1)}%)`}
                      </span>
                    ) : (
                      <span className="italic text-xs">Awaiting Invoice</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {po.receivingVerified ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-500 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
                        <XCircle className="w-3.5 h-3.5" /> Unconfirmed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono">
                    <span className="text-muted-foreground">{po.approvalTier}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${
                        po.status === 'Matched'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : po.status === 'Exception Flagged'
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 font-semibold'
                          : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}
                    >
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {po.status === 'Pending Approval' && (
                      <button
                        onClick={() => handleApprove(po.id, po.poNumber)}
                        className="px-2.5 py-1 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm transition-all"
                      >
                        Approve PO
                      </button>
                    )}
                    {po.status === 'Exception Flagged' && (
                      <button
                        onClick={() => handleOverrideVariance(po.id, po.poNumber)}
                        className="px-2.5 py-1 text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20 rounded-md shadow-sm transition-all"
                      >
                        Clear Variance
                      </button>
                    )}
                    {po.status === 'Matched' && (
                      <button
                        onClick={() => showToast(`Opening audit voucher for ${po.poNumber}...`)}
                        className="px-2.5 py-1 text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border rounded-md shadow-sm transition-all"
                      >
                        View Voucher
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
