'use client';

import React, { useState } from 'react';
import {
  RotateCcw,
  ShieldAlert,
  CheckCircle2,
  Clock,
  DollarSign,
  Send,
  AlertTriangle,
  Mail,
  Calendar,
  Filter,
  ArrowUpRight,
  UserCheck,
  CreditCard,
  Building,
  Check
} from 'lucide-react';

interface FailedInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  failureReason: 'Card Expired' | 'Insufficient Funds' | 'Corporate Spending Limit' | 'ACH Return (R01)' | 'Bank Velocity Limit';
  retryAttempt: number;
  maxRetries: number;
  nextScheduledRetry: string;
  dunningTier: 'Friendly Reminder (Day 1-3)' | 'Liquidity Cycle Retry (Day 5-10)' | 'Executive Escalation (Day 14)' | 'Suspension Warning (Day 21+)';
  status: 'In Recovery' | 'Recovered' | 'Suspension Warning' | 'Written Off';
}

export default function DunningPage() {
  const [invoices, setInvoices] = useState<FailedInvoice[]>([
    {
      id: 'inv-01',
      invoiceNumber: 'INV-2026-0891',
      customerName: 'Quantix AI Labs, Inc.',
      amount: 14500,
      dueDate: 'Nov 02, 2026',
      daysOverdue: 8,
      failureReason: 'Insufficient Funds',
      retryAttempt: 2,
      maxRetries: 4,
      nextScheduledRetry: 'Nov 15, 2026 (Mid-Month Payroll Cycle)',
      dunningTier: 'Liquidity Cycle Retry (Day 5-10)',
      status: 'In Recovery'
    },
    {
      id: 'inv-02',
      invoiceNumber: 'INV-2026-0844',
      customerName: 'AeroDynamics Propulsion Corp',
      amount: 28000,
      dueDate: 'Oct 20, 2026',
      daysOverdue: 21,
      failureReason: 'Corporate Spending Limit',
      retryAttempt: 3,
      maxRetries: 4,
      nextScheduledRetry: 'Nov 12, 2026 (Manual Wire Sync)',
      dunningTier: 'Suspension Warning (Day 21+)',
      status: 'Suspension Warning'
    },
    {
      id: 'inv-03',
      invoiceNumber: 'INV-2026-0902',
      customerName: 'Synapse Healthcare Technologies',
      amount: 8200,
      dueDate: 'Nov 07, 2026',
      daysOverdue: 3,
      failureReason: 'Card Expired',
      retryAttempt: 1,
      maxRetries: 4,
      nextScheduledRetry: 'Nov 11, 2026',
      dunningTier: 'Friendly Reminder (Day 1-3)',
      status: 'In Recovery'
    },
    {
      id: 'inv-04',
      invoiceNumber: 'INV-2026-0775',
      customerName: 'HyperScale Cloud Solutions',
      amount: 19500,
      dueDate: 'Oct 28, 2026',
      daysOverdue: 13,
      failureReason: 'ACH Return (R01)',
      retryAttempt: 2,
      maxRetries: 4,
      nextScheduledRetry: 'Nov 15, 2026',
      dunningTier: 'Executive Escalation (Day 14)',
      status: 'In Recovery'
    },
    {
      id: 'inv-05',
      invoiceNumber: 'INV-2026-0811',
      customerName: 'Vanguard Biometrics Ltd',
      amount: 12000,
      dueDate: 'Oct 15, 2026',
      daysOverdue: 26,
      failureReason: 'Bank Velocity Limit',
      retryAttempt: 4,
      maxRetries: 4,
      nextScheduledRetry: 'Completed',
      dunningTier: 'Suspension Warning (Day 21+)',
      status: 'Recovered'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'In Recovery' | 'Suspension Warning' | 'Recovered'>('ALL');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleManualRetry = (id: string, name: string) => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === id ? { ...inv, retryAttempt: inv.retryAttempt + 1, nextScheduledRetry: 'Processing Immediate Retry...' } : inv
      )
    );
    setSuccessToast(`Dispatched smart retry webhook for ${name}.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleSendSecureLink = (name: string, invNum: string) => {
    setSuccessToast(`Sent self-service payment update link for ${invNum} to finance@${name.toLowerCase().replace(/[^a-z]/g, '')}.com.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const filteredInvoices = invoices.filter(inv =>
    activeFilter === 'ALL' ? true : inv.status === activeFilter
  );

  const totalAtRisk = invoices.reduce((sum, i) => (i.status !== 'Recovered' ? sum + i.amount : sum), 0);
  const totalRecoveredThisMonth = 48200;
  const recoveryEfficiency = 89.2; // 89.2% recovery rate

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-500 text-sm animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                B2B Smart Dunning & Automated Payment Recovery
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Recovers failed recurring ARR using corporate liquidity-cycle timing, branded self-service payment links, and automated grace periods.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Simulating smart retry webhook across corporate accounts...')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Run Smart Batch Retry
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Delinquent ARR at Risk</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-rose-500">
            {formatCurrency(totalAtRisk)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {invoices.filter(i => i.status !== 'Recovered').length} enterprise contracts pending collection
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Recovered Past 30 Days</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-500">
            {formatCurrency(totalRecoveredThisMonth)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Saved without customer support intervention
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Recovery Efficiency</span>
            <RotateCcw className="w-4 h-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {recoveryEfficiency}%
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-medium">
            +18.4% above SaaS industry baseline (70.8%)
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Next Smart Sweep</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            Nov 15, 2026
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Mid-month corporate liquidity cash peak
          </div>
        </div>
      </div>

      {/* Dunning Strategy & Liquidity Cycle Engine Description */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Corporate Liquidity Cycle Retry Logic
            </h2>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Optimized for enterprise AP disbursement rhythms (1st, 15th, and month-end)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
          <div className="p-3.5 bg-muted/40 rounded-lg border border-border space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-foreground">
              <span>Step 1: Soft Retry</span>
              <span className="text-muted-foreground font-mono">Day 1 - 3</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Gentle silent retries timed at +24h and +72h to catch transient merchant card limits.
            </p>
          </div>

          <div className="p-3.5 bg-muted/40 rounded-lg border border-border space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-primary">
              <span>Step 2: Liquidity Cycle</span>
              <span className="text-muted-foreground font-mono">Day 5 - 10</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Retries dynamically scheduled around corporate 1st / 15th payroll & AP funding dates.
            </p>
          </div>

          <div className="p-3.5 bg-muted/40 rounded-lg border border-border space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-500">
              <span>Step 3: Executive Contact</span>
              <span className="text-muted-foreground font-mono">Day 14</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Automated high-touch email to AP controller with one-click ACH / Wire update portal.
            </p>
          </div>

          <div className="p-3.5 bg-muted/40 rounded-lg border border-border space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-rose-500">
              <span>Step 4: Suspension Warning</span>
              <span className="text-muted-foreground font-mono">Day 21+</span>
            </div>
            <p className="text-xs text-muted-foreground">
              7-day final grace period notice before API token suspension and churn mitigation flag.
            </p>
          </div>
        </div>
      </div>

      {/* Delinquent Accounts Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Delinquent Invoices & Active Workflows</h3>
          </div>

          <div className="flex items-center gap-2">
            {(['ALL', 'In Recovery', 'Suspension Warning', 'Recovered'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {filter === 'ALL' ? 'All Invoices' : filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">Customer & Invoice</th>
                <th className="px-6 py-3.5">Failure Diagnostic</th>
                <th className="px-6 py-3.5 text-right">Amount</th>
                <th className="px-6 py-3.5 text-center">Retries</th>
                <th className="px-6 py-3.5">Next Dunning Action</th>
                <th className="px-6 py-3.5 text-center">Status</th>
                <th className="px-6 py-3.5 text-right">Manual Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{inv.customerName}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {inv.invoiceNumber} &bull; Due {inv.dueDate} ({inv.daysOverdue}d ago)
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-500/10 text-rose-500 border border-rose-500/20">
                      {inv.failureReason}
                    </span>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {inv.dunningTier}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-foreground">
                    {formatCurrency(inv.amount)}
                  </td>
                  <td className="px-6 py-4 text-center font-mono text-xs">
                    {inv.retryAttempt} / {inv.maxRetries}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div className="text-foreground font-medium">{inv.nextScheduledRetry}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                        inv.status === 'Recovered'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : inv.status === 'Suspension Warning'
                          ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 font-semibold'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleManualRetry(inv.id, inv.customerName)}
                      className="px-2.5 py-1 text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border rounded-md shadow-sm transition-all"
                    >
                      Retry Now
                    </button>
                    <button
                      onClick={() => handleSendSecureLink(inv.customerName, inv.invoiceNumber)}
                      className="px-2.5 py-1 text-xs font-semibold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-md shadow-sm transition-all"
                    >
                      Send Portal Link
                    </button>
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
