"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Calendar,
  Building2,
  Percent,
  Lock,
} from 'lucide-react';

export default function VentureDebtPage() {
  // Facility parameters
  const [loanFacility] = useState({
    lender: 'Silicon Valley Bank (First Citizens)',
    facilityType: 'Growth Capital Term Loan',
    totalPrincipal: 2500000,
    outstandingBalance: 2500000,
    interestRateSpread: 'SOFR + 3.50% (8.80% Current)',
    currentMonthlyInterest: 18333.33,
    ioExpirationDate: '2026-12-31',
    monthsRemainingIO: 9,
    amortizationMonths: 24,
    monthlyPrincipalPostIO: 104166.67,
    minimumCashCovenant: 1000000, // Must keep >= $1M in accounts
    currentCashReserves: 1875000, // Current company cash
    warrantCoveragePct: 1.5,      // 1.5% equity warrant coverage
  });

  const covenantHeadroom = loanFacility.currentCashReserves - loanFacility.minimumCashCovenant;
  const covenantHeadroomPct = Math.round((covenantHeadroom / loanFacility.currentCashReserves) * 100);
  const isCovenantSafe = covenantHeadroom > 500000;

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <CreditCard size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Venture Debt & Covenant Monitor</h1>
              <p className="text-sm text-gray-400">
                Credit Facility Amortization • Minimum Liquidity Covenants • Warrant Dilution Tracking
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-gray-400">Lender:</span>
            <span className="font-semibold text-white bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-800">
              {loanFacility.lender}
            </span>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Outstanding Facility</span>
            <div className="text-2xl font-bold text-white mt-1">
              ${loanFacility.outstandingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">{loanFacility.facilityType}</span>
          </div>

          <div className="bg-gray-900 border border-emerald-500/20 bg-emerald-950/10 p-5 rounded-2xl">
            <span className="text-xs text-emerald-400 uppercase font-semibold">Covenant Cash Buffer</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              +${covenantHeadroom.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-300/80 mt-1 block">
              Above ${loanFacility.minimumCashCovenant.toLocaleString()} minimum floor
            </span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-blue-400 uppercase font-semibold">Interest-Only Period</span>
            <div className="text-2xl font-bold text-blue-400 mt-1">{loanFacility.monthsRemainingIO} Months Left</div>
            <span className="text-[11px] text-gray-500 mt-1 block">I/O expires {loanFacility.ioExpirationDate}</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-purple-400 uppercase font-semibold">Warrant Dilution</span>
            <div className="text-2xl font-bold text-purple-400 mt-1">{loanFacility.warrantCoveragePct}% Equity</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Tied to Cap Table in /equity</span>
          </div>
        </div>

        {/* Covenant Health Banner */}
        <div className="mt-6 bg-gray-900 border border-gray-800 p-5 rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={18} className="text-emerald-400" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
                  Minimum Liquidity Covenant Compliance Status
                </h2>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Loan agreement stipulates that unrestricted cash in operating bank accounts must not fall below \$1,000,000.00 at any time.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1.5 text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 font-medium">
                <CheckCircle2 size={14} />
                <span>Covenant Met ({covenantHeadroomPct}% Safety Buffer)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Amortization Schedule & Step-Up Preview */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold mb-4">Debt Service & Repayment Trajectory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-gray-950/60 p-4 rounded-xl border border-gray-800/80 space-y-3">
              <div className="font-semibold text-gray-200 text-sm">Phase 1: Current Interest-Only Window</div>
              <div className="flex justify-between text-gray-400">
                <span>Interest Rate:</span>
                <span className="text-white font-mono">{loanFacility.interestRateSpread}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Monthly Cash Outflow:</span>
                <span className="text-blue-400 font-mono font-semibold">
                  ${loanFacility.currentMonthlyInterest.toLocaleString('en-US', { minimumFractionDigits: 2 })}/mo
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Principal Reduction:</span>
                <span className="text-gray-500 font-mono">$0.00 (Deferred)</span>
              </div>
            </div>

            <div className="bg-gray-950/60 p-4 rounded-xl border border-gray-800/80 space-y-3">
              <div className="font-semibold text-amber-300 text-sm">Phase 2: Principal Amortization Step-Up (Post-2026)</div>
              <div className="flex justify-between text-gray-400">
                <span>Monthly Principal Outflow:</span>
                <span className="text-amber-400 font-mono font-semibold">
                  +${loanFacility.monthlyPrincipalPostIO.toLocaleString('en-US', { minimumFractionDigits: 2 })}/mo
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Total Monthly Debt Service:</span>
                <span className="text-white font-mono font-bold">
                  ~${(loanFacility.monthlyPrincipalPostIO + 15000).toLocaleString('en-US', { minimumFractionDigits: 2 })}/mo
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Cash Runway Impact:</span>
                <span className="text-amber-400 font-mono">Incorporated in /forecast scenarios</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
