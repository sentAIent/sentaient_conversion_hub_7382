'use client';

import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Percent,
  Download,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

interface LeaseScheduleRow {
  month: number;
  date: string;
  payment: number;
  interestExpense: number;
  liabilityReduction: number;
  leaseLiabilityEnding: number;
  rouAssetAmortization: number;
  rouAssetEnding: number;
}

export default function LeaseAccountingPage() {
  const [monthlyRent, setMonthlyRent] = useState<number>(24000); // $24k/mo
  const [leaseTermMonths, setLeaseTermMonths] = useState<number>(36); // 36 months remaining
  const [ibrAnnualRate, setIbrAnnualRate] = useState<number>(7.25); // 7.25% Incremental Borrowing Rate
  const [annualEscalationPct, setAnnualEscalationPct] = useState<number>(3.0); // 3% annual escalation

  const monthlyDiscountRate = ibrAnnualRate / 100 / 12;

  // Present value calculation of remaining lease payments:
  // PV = Sum( Payment_t / (1 + r)^t )
  let presentValueLiability = 0;
  for (let t = 1; t <= leaseTermMonths; t++) {
    const yearIndex = Math.floor((t - 1) / 12);
    const payment = monthlyRent * Math.pow(1 + annualEscalationPct / 100, yearIndex);
    presentValueLiability += payment / Math.pow(1 + monthlyDiscountRate, t);
  }

  // ROU Asset initial value = PV of lease payments + initial direct costs - lease incentives
  const initialRouAsset = presentValueLiability;

  // Generate 12-month preview schedule
  const scheduleRows: LeaseScheduleRow[] = [];
  let currentLiability = presentValueLiability;
  let currentRou = initialRouAsset;
  const straightLineMonthlyExpense = (monthlyRent * 36) / 36; // Simplified straight line

  for (let m = 1; m <= 12; m++) {
    const payment = monthlyRent;
    const interestExpense = currentLiability * monthlyDiscountRate;
    const liabilityReduction = payment - interestExpense;
    currentLiability = Math.max(0, currentLiability - liabilityReduction);

    const rouAmortization = payment - interestExpense;
    currentRou = Math.max(0, currentRou - rouAmortization);

    scheduleRows.push({
      month: m,
      date: `Month ${m} (2026/2027)`,
      payment,
      interestExpense,
      liabilityReduction,
      leaseLiabilityEnding: currentLiability,
      rouAssetAmortization: rouAmortization,
      rouAssetEnding: currentRou
    });
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl border border-blue-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Office Lease Accounting & ROU Asset Schedule (ASC 842)
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                GAAP operating lease recognition, Incremental Borrowing Rate (IBR) discounting, and dual Right-of-Use Asset & Lease Liability schedules.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting ASC 842 Balance Sheet Disclosure & Auditor Footnotes to Excel...')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-card hover:bg-muted/80 text-foreground border border-border rounded-lg shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Export ASC 842 Schedule
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Right-of-Use (ROU) Asset</span>
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {formatCurrency(initialRouAsset)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Capitalized on Corporate Balance Sheet
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Operating Lease Liability</span>
            <DollarSign className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-purple-500">
            {formatCurrency(presentValueLiability)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            PV of future payments discounted at {ibrAnnualRate}%
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Monthly Cash Rent</span>
            <Calendar className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-500">
            {formatCurrency(monthlyRent)}/mo
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            San Francisco HQ (120 Montgomery St)
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Remaining Lease Term</span>
            <Building2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {leaseTermMonths} Months
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Maturity: Oct 2029 ({annualEscalationPct}% annual step)
          </div>
        </div>
      </div>

      {/* Interactive Parameter Controls */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Lease Terms & IBR Discount Rate Configuration
              </h2>
              <p className="text-xs text-muted-foreground">
                Calibrates GAAP present value discount factor and annual contract escalations.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            ASC 842 Compliant
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground uppercase font-medium">Incremental Borrowing Rate (IBR)</span>
              <span className="font-mono font-bold text-foreground">{ibrAnnualRate.toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min={4.0}
              max={12.0}
              step={0.25}
              value={ibrAnnualRate}
              onChange={(e) => setIbrAnnualRate(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-xs text-muted-foreground">
              Company’s collateralized borrowing rate over a similar term.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground uppercase font-medium">Monthly Contract Rent</span>
              <span className="font-mono font-bold text-foreground">{formatCurrency(monthlyRent)}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={60000}
              step={1000}
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-xs text-muted-foreground">
              Base monthly contract payment excluding NNN pass-through operating expenses.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground uppercase font-medium">Lease Term: {leaseTermMonths} Months</span>
              <span className="font-mono font-bold text-foreground">{(leaseTermMonths / 12).toFixed(1)} Years</span>
            </div>
            <input
              type="range"
              min={12}
              max={60}
              step={6}
              value={leaseTermMonths}
              onChange={(e) => setLeaseTermMonths(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <p className="text-xs text-muted-foreground">
              Non-cancelable lease period plus reasonably certain extension options.
            </p>
          </div>
        </div>
      </div>

      {/* 12-Month Amortization Schedule Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">ASC 842 12-Month Roll-Forward Amortization Schedule</h3>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Balance Sheet Asset & Liability Decay Schedule
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">Period</th>
                <th className="px-6 py-3.5 text-right">Rent Payment</th>
                <th className="px-6 py-3.5 text-right">Interest Accretion</th>
                <th className="px-6 py-3.5 text-right">Liability Reduction</th>
                <th className="px-6 py-3.5 text-right">Ending Lease Liability</th>
                <th className="px-6 py-3.5 text-right">ROU Amortization</th>
                <th className="px-6 py-3.5 text-right">Ending ROU Asset</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scheduleRows.map((row) => (
                <tr key={row.month} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-foreground">
                    {row.date}
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono font-bold text-foreground">
                    {formatCurrency(row.payment)}
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono text-muted-foreground">
                    {formatCurrency(row.interestExpense)}
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono text-emerald-500">
                    {formatCurrency(row.liabilityReduction)}
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono font-medium text-purple-500">
                    {formatCurrency(row.leaseLiabilityEnding)}
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono text-muted-foreground">
                    {formatCurrency(row.rouAssetAmortization)}
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono font-medium text-primary">
                    {formatCurrency(row.rouAssetEnding)}
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
