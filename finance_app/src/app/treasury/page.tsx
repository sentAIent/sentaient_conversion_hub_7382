"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  Building2,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  ArrowRightLeft,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface BankAccountCoverage {
  id: string;
  institution: string;
  accountType: string;
  balanceUSD: number;
  currency: string;
  fdicLimit: number;
  sweepEnabled: boolean;
}

interface CurrencyBalance {
  currency: string;
  amount: number;
  rateToUSD: number;
  valueUSD: number;
  unrealizedGainLoss: number;
}

export default function TreasuryPage() {
  const [isSimulatingSweep, setIsSimulatingSweep] = useState(false);

  // Bank balances across institutions
  const [bankAccounts, setBankAccounts] = useState<BankAccountCoverage[]>([
    {
      id: 'bk-1',
      institution: 'Mercury Checking (Choice Bank)',
      accountType: 'Operating Payroll',
      balanceUSD: 310000.00,
      currency: 'USD',
      fdicLimit: 250000.00,
      sweepEnabled: false,
    },
    {
      id: 'bk-2',
      institution: 'JPMorgan Chase Business',
      accountType: 'Operating Inflows',
      balanceUSD: 145000.00,
      currency: 'USD',
      fdicLimit: 250000.00,
      sweepEnabled: true,
    },
    {
      id: 'bk-3',
      institution: 'Brex Treasury (BNY Mellon)',
      accountType: 'Yield Reserve',
      balanceUSD: 420000.00,
      currency: 'USD',
      fdicLimit: 250000.00,
      sweepEnabled: true, // Has sweep network up to $5M
    },
  ]);

  // Multi-Currency holdings
  const [currencies] = useState<CurrencyBalance[]>([
    { currency: 'USD', amount: 875000, rateToUSD: 1.0, valueUSD: 875000, unrealizedGainLoss: 0 },
    { currency: 'EUR', amount: 45000, rateToUSD: 1.09, valueUSD: 49050, unrealizedGainLoss: 1250 },
    { currency: 'GBP', amount: 28000, rateToUSD: 1.28, valueUSD: 35840, unrealizedGainLoss: -420 },
    { currency: 'USDC', amount: 65000, rateToUSD: 1.0, valueUSD: 65000, unrealizedGainLoss: 0 },
  ]);

  const totalTreasuryUSD = currencies.reduce((sum, c) => sum + c.valueUSD, 0);
  const totalUnrealizedFX = currencies.reduce((sum, c) => sum + c.unrealizedGainLoss, 0);

  // Accounts exceeding FDIC single-entity $250k cap without sweep
  const atRiskAccounts = bankAccounts.filter(b => b.balanceUSD > b.fdicLimit && !b.sweepEnabled);
  const uninsuredExposure = atRiskAccounts.reduce((sum, b) => sum + (b.balanceUSD - b.fdicLimit), 0);

  const handleSimulateSweep = () => {
    setIsSimulatingSweep(true);
    setBankAccounts(bankAccounts.map(b => ({
      ...b,
      sweepEnabled: true,
    })));
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Multi-Currency Treasury & FDIC Safeguard</h1>
              <p className="text-sm text-gray-400">
                Institutional Cash Concentration • Multi-Bank FDIC Sweeps • Foreign Exchange Gain/Loss
              </p>
            </div>
          </div>
          <button
            onClick={handleSimulateSweep}
            disabled={isSimulatingSweep || atRiskAccounts.length === 0}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg ${
              isSimulatingSweep || atRiskAccounts.length === 0
                ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/20'
            }`}
          >
            <ShieldCheck size={16} />
            <span>{isSimulatingSweep || atRiskAccounts.length === 0 ? 'FDIC Sweep Fully Active ($5M Insured)' : 'Activate Cash Sweep Safeguard'}</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Total Liquidity (USD)</span>
            <div className="text-2xl font-bold text-white mt-1">
              ${totalTreasuryUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Consolidated treasury reserves</span>
          </div>

          <div className={`bg-gray-900 border p-5 rounded-2xl ${
            uninsuredExposure > 0 ? 'border-amber-500/30 bg-amber-950/10' : 'border-emerald-500/30 bg-emerald-950/10'
          }`}>
            <span className={`text-xs uppercase font-semibold ${uninsuredExposure > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              Uninsured Concentration Risk
            </span>
            <div className={`text-2xl font-bold mt-1 ${uninsuredExposure > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              ${uninsuredExposure.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              {uninsuredExposure > 0 ? 'Exceeds single $250k FDIC threshold' : '100% Insured via Sweep Network'}
            </span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-blue-400 uppercase font-semibold">Unrealized FX Gain/Loss</span>
            <div className={`text-2xl font-bold mt-1 ${totalUnrealizedFX >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {totalUnrealizedFX >= 0 ? `+$${totalUnrealizedFX.toLocaleString()}` : `-$${Math.abs(totalUnrealizedFX).toLocaleString()}`}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">EUR & GBP balance fluctuations</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Sweep Yield (APY)</span>
            <div className="text-2xl font-bold text-indigo-400 mt-1">4.85% APY</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Automated overnight interest sweep</span>
          </div>
        </div>

        {/* FDIC Warning (if any) */}
        {uninsuredExposure > 0 && (
          <div className="mt-6 p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl flex items-start space-x-3 text-xs">
            <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-200">FDIC Single-Entity Insurance Exposure Alert:</span>
              <p className="text-amber-300/80 mt-0.5">
                Choice Bank (Mercury Checking) holds \$310,000.00, exposing \$60,000.00 above the statutory \$250,000.00 FDIC insurance limit. Activate the Multi-Bank Sweep to distribute funds across up to 20 partner institutions for full insurance up to \$5,000,000.
              </p>
            </div>
          </div>
        )}

        {/* Bank Account FDIC Concentration Table */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Institution Cash Concentration & Sweep Safeguards</h2>
              <p className="text-xs text-gray-400">Statutory \$250k FDIC threshold compliance and multi-bank coverage</p>
            </div>
            <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full font-medium">
              3 Financial Institutions Connected
            </span>
          </div>

          <div className="divide-y divide-gray-800">
            {bankAccounts.map((account) => {
              const isOverCap = account.balanceUSD > account.fdicLimit;
              const insuredCap = account.sweepEnabled ? 5000000 : account.fdicLimit;
              const exposure = !account.sweepEnabled && isOverCap ? account.balanceUSD - account.fdicLimit : 0;

              return (
                <div key={account.id} className="p-5 hover:bg-gray-800/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white text-sm">{account.institution}</span>
                      <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono">
                        {account.accountType}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Coverage Ceiling: ${insuredCap.toLocaleString()} {account.sweepEnabled ? '(Multi-Bank Sweep Active)' : '(Standard FDIC)'}
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-xs font-mono">
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase">Cash Balance</div>
                      <div className="text-white font-semibold text-sm">${account.balanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    </div>

                    <div>
                      <div className="text-gray-400 text-[10px] uppercase">Insurance Status</div>
                      {account.sweepEnabled ? (
                        <div className="flex items-center space-x-1 text-emerald-400 font-sans font-medium text-xs">
                          <CheckCircle2 size={13} />
                          <span>100% Insured ($5M Sweep)</span>
                        </div>
                      ) : isOverCap ? (
                        <div className="flex items-center space-x-1 text-amber-400 font-sans font-medium text-xs">
                          <AlertTriangle size={13} />
                          <span>${exposure.toLocaleString()} Uninsured</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-emerald-400 font-sans font-medium text-xs">
                          <CheckCircle2 size={13} />
                          <span>100% Insured</span>
                        </div>
                      )}
                    </div>

                    <div className="font-sans">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        account.sweepEnabled ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-800 text-gray-400 border-gray-700'
                      }`}>
                        {account.sweepEnabled ? 'Sweep Active' : 'Direct Deposit Only'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Multi-Currency Portfolio Table */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Multi-Currency & Stablecoin Treasury Holdings</h2>
              <p className="text-xs text-gray-400">Foreign exchange real-time mark-to-market balances and gain/loss</p>
            </div>
            <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full font-medium">
              Live FX Rates Synchronized
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-950 uppercase text-gray-400 font-semibold border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Currency</th>
                  <th className="py-3 px-4 text-right">Foreign Balance</th>
                  <th className="py-3 px-4 text-right">USD Exchange Rate</th>
                  <th className="py-3 px-4 text-right">Value in USD</th>
                  <th className="py-3 px-4 text-right">Unrealized FX P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 font-mono">
                {currencies.map((c) => (
                  <tr key={c.currency} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-sans font-medium text-white flex items-center space-x-2">
                      <span className="font-bold">{c.currency}</span>
                      {c.currency === 'USDC' && (
                        <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-mono">ERC-20</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-200">
                      {c.amount.toLocaleString()} {c.currency}
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-400">
                      ${c.rateToUSD.toFixed(4)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-white">
                      ${c.valueUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold">
                      {c.unrealizedGainLoss > 0 ? (
                        <span className="text-emerald-400">+${c.unrealizedGainLoss.toLocaleString()}</span>
                      ) : c.unrealizedGainLoss < 0 ? (
                        <span className="text-red-400">-${Math.abs(c.unrealizedGainLoss).toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-500">$0.00</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
