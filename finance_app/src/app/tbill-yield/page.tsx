'use client';

import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  TrendingUp,
  Percent,
  Calendar,
  AlertTriangle,
  RefreshCw,
  ArrowUpRight,
  DollarSign,
  Lock,
  Layers,
  ChevronRight
} from 'lucide-react';

interface TBillTranche {
  id: string;
  duration: '4-Week' | '8-Week' | '13-Week' | '26-Week';
  cusip: string;
  maturityDate: string;
  principalAmount: number;
  annualizedYield: number; // in %
  accruedInterest: number;
  expectedPayout: number;
  autoRoll: boolean;
  status: 'Active' | 'Maturing Soon' | 'Matured';
}

export default function TBillYieldPage() {
  const [totalOperatingCash, setTotalOperatingCash] = useState<number>(4500000); // $4.5M cash
  const [monthlyBurn, setMonthlyBurn] = useState<number>(185000); // $185k/mo burn
  const [bufferMonths, setBufferMonths] = useState<number>(4); // 4 months liquid checking buffer
  const [autoRollAll, setAutoRollAll] = useState<boolean>(true);

  // Buffer calculation
  const requiredLiquidBuffer = monthlyBurn * bufferMonths; // $740,000
  const totalAllocatedToTBills = 3200000; // $3.2M deployed
  const unallocatedIdleCash = Math.max(0, totalOperatingCash - requiredLiquidBuffer - totalAllocatedToTBills);

  // Active Ladder Tranches
  const [tranches, setTranches] = useState<TBillTranche[]>([
    {
      id: 'tbill-01',
      duration: '4-Week',
      cusip: '912797-FA-4',
      maturityDate: 'Nov 26, 2026',
      principalAmount: 800000,
      annualizedYield: 5.18,
      accruedInterest: 3198,
      expectedPayout: 803198,
      autoRoll: true,
      status: 'Maturing Soon'
    },
    {
      id: 'tbill-02',
      duration: '8-Week',
      cusip: '912797-FB-2',
      maturityDate: 'Dec 24, 2026',
      principalAmount: 800000,
      annualizedYield: 5.12,
      accruedInterest: 6284,
      expectedPayout: 806284,
      autoRoll: true,
      status: 'Active'
    },
    {
      id: 'tbill-03',
      duration: '13-Week',
      cusip: '912797-FC-0',
      maturityDate: 'Jan 21, 2027',
      principalAmount: 800000,
      annualizedYield: 4.95,
      accruedInterest: 9872,
      expectedPayout: 809872,
      autoRoll: true,
      status: 'Active'
    },
    {
      id: 'tbill-04',
      duration: '26-Week',
      cusip: '912797-FD-8',
      maturityDate: 'Apr 22, 2027',
      principalAmount: 800000,
      annualizedYield: 4.88,
      accruedInterest: 19520,
      expectedPayout: 819520,
      autoRoll: true,
      status: 'Active'
    }
  ]);

  const toggleAutoRoll = (id: string) => {
    setTranches(prev =>
      prev.map(t => (t.id === id ? { ...t, autoRoll: !t.autoRoll } : t))
    );
  };

  const blendedYield = (
    tranches.reduce((sum, t) => sum + t.principalAmount * t.annualizedYield, 0) /
    totalAllocatedToTBills
  ).toFixed(2);

  const totalAccruedYield = tranches.reduce((sum, t) => sum + t.accruedInterest, 0);
  const projectedAnnualIncome = (totalAllocatedToTBills * (Number(blendedYield) / 100));

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
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Automated T-Bill Yield Ladder & Cash Optimizer
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                US Treasury Bill ladder earning ~5% APY on idle startup reserves with automated roll-over and liquidity buffer guards.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setAutoRollAll(!autoRollAll);
              setTranches(prev => prev.map(t => ({ ...t, autoRoll: !autoRollAll })));
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-card hover:bg-muted/80 text-foreground border border-border rounded-lg shadow-sm transition-all"
          >
            <RefreshCw className="w-4 h-4 text-primary" />
            {autoRollAll ? 'Auto-Roll Active (All Tranches)' : 'Auto-Roll Paused'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Ladder Principal Deployed</span>
            <Lock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {formatCurrency(totalAllocatedToTBills)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            4 tranches backed by full faith & credit of US Govt
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Blended Weighted APY</span>
            <Percent className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-500">
            {blendedYield}%
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Exempt from state & local income taxes
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Projected Annual Yield</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {formatCurrency(projectedAnnualIncome)}
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-medium">
            Extends runway by ~{(projectedAnnualIncome / monthlyBurn).toFixed(1)} months
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Immediate Liquid Buffer</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {formatCurrency(totalOperatingCash - totalAllocatedToTBills)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {((totalOperatingCash - totalAllocatedToTBills) / monthlyBurn).toFixed(1)} months operating burn in checking
          </div>
        </div>
      </div>

      {/* Liquidity Guardrail Policy Configurator */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <div>
              <h2 className="text-base font-semibold text-foreground">Automated Liquidity Guardrail Rules</h2>
              <p className="text-xs text-muted-foreground">
                Prevents over-allocation into lockups by safeguarding operating cash needs.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            Guardrails Enforced
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Operating Checking Buffer: {bufferMonths} Months ({formatCurrency(requiredLiquidBuffer)})
            </label>
            <input
              type="range"
              min={2}
              max={6}
              step={1}
              value={bufferMonths}
              onChange={(e) => setBufferMonths(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-xs text-muted-foreground">
              Always maintained in SVB/Mercury instant checking for payroll & AP.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Current Monthly Net Burn
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground text-sm">$</span>
              <input
                type="number"
                value={monthlyBurn}
                onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                className="w-full pl-7 pr-3 py-1.5 bg-background border border-border rounded-lg text-sm font-mono text-foreground"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Used to dynamically calibrate required operating reserves.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Sweep Actionable Idle Cash
            </label>
            <div className="p-2.5 bg-muted/40 border border-border rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm font-bold font-mono text-foreground">
                  {formatCurrency(unallocatedIdleCash)}
                </div>
                <div className="text-[11px] text-muted-foreground">Excess cash ready to deploy</div>
              </div>
              <button
                disabled={unallocatedIdleCash <= 0}
                onClick={() => alert(`Initiating T-Bill auction bid for ${formatCurrency(unallocatedIdleCash)}...`)}
                className="px-3 py-1 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md disabled:opacity-50"
              >
                Sweep to T-Bills
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ladder Tranches Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Active T-Bill Ladder Tranches</h3>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Staggered maturities guarantee rolling monthly liquidity without early liquidation penalties
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">Ladder Tranche</th>
                <th className="px-6 py-3.5">CUSIP / Maturity</th>
                <th className="px-6 py-3.5 text-right">Principal</th>
                <th className="px-6 py-3.5 text-right">Yield (APY)</th>
                <th className="px-6 py-3.5 text-right">Accrued Interest</th>
                <th className="px-6 py-3.5 text-right">Maturity Payout</th>
                <th className="px-6 py-3.5 text-center">Auto Re-invest</th>
                <th className="px-6 py-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tranches.map((t) => (
                <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      {t.duration} T-Bill
                    </div>
                    <div className="text-xs text-muted-foreground">Weekly Treasury Auction allocation</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                    <div className="text-foreground">{t.cusip}</div>
                    <div className="text-muted-foreground">{t.maturityDate}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-foreground">
                    {formatCurrency(t.principalAmount)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-semibold text-emerald-500">
                    {t.annualizedYield.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                    {formatCurrency(t.accruedInterest)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-foreground">
                    {formatCurrency(t.expectedPayout)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => toggleAutoRoll(t.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                        t.autoRoll
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-muted/40 text-muted-foreground border-border'
                      }`}
                    >
                      <RefreshCw className="w-3 h-3" />
                      {t.autoRoll ? 'Enabled' : 'Disabled'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                        t.status === 'Maturing Soon'
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}
                    >
                      {t.status}
                    </span>
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
