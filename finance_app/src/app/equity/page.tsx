"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  Briefcase,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Download,
  Calendar,
  DollarSign,
  FileText,
  UserCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface EquityGrant {
  id: string;
  stakeholder: string;
  role: string;
  grantDate: string;
  totalShares: number;
  strikePrice: number;
  vestingMonths: number;
  cliffMonths: number;
  monthsElapsed: number;
  election83bStatus: 'Filed & Certified' | 'Pending Filing' | 'Overdue / Expired' | 'N/A';
  election83bDeadline: string;
  daysRemaining83b: number;
}

export default function EquityPage() {
  const [grants, setGrants] = useState<EquityGrant[]>([
    {
      id: 'eq-001',
      stakeholder: 'Elena Vance (Founder & CEO)',
      role: 'Founder Common Stock',
      grantDate: '2024-01-15',
      totalShares: 4000000,
      strikePrice: 0.0001,
      vestingMonths: 48,
      cliffMonths: 12,
      monthsElapsed: 26,
      election83bStatus: 'Filed & Certified',
      election83bDeadline: '2024-02-14',
      daysRemaining83b: 0,
    },
    {
      id: 'eq-002',
      stakeholder: 'Alex Rivera (VP Eng)',
      role: 'Early Employee ISO Option',
      grantDate: '2024-06-01',
      totalShares: 500000,
      strikePrice: 0.05,
      vestingMonths: 48,
      cliffMonths: 12,
      monthsElapsed: 21,
      election83bStatus: 'Filed & Certified',
      election83bDeadline: '2024-07-01',
      daysRemaining83b: 0,
    },
    {
      id: 'eq-003',
      stakeholder: 'Maya Chen (Staff AI Researcher)',
      role: 'Restricted Stock Grant (RSA)',
      grantDate: '2026-03-01',
      totalShares: 120000,
      strikePrice: 0.15,
      vestingMonths: 48,
      cliffMonths: 12,
      monthsElapsed: 1,
      election83bStatus: 'Pending Filing',
      election83bDeadline: '2026-03-31',
      daysRemaining83b: 22,
    },
  ]);

  const currentFairMarketValue = 1.25; // 409A Valuation per share

  const handleGenerate83bLetter = (grant: EquityGrant) => {
    const letterText = `SECTION 83(b) ELECTION NOTICE
Department of the Treasury
Internal Revenue Service

Ladies and Gentlemen:

The undersigned taxpayer hereby makes an election pursuant to Section 83(b) of the Internal Revenue Code of 1986, as amended, to include in gross income the excess (if any) of the fair market value of the property described below over the amount paid for such property.

1. Taxpayer Name: ${grant.stakeholder}
2. Property Description: ${grant.totalShares.toLocaleString()} shares of Common Stock of Liquid Financial Technologies, Inc.
3. Date of Transfer: ${grant.grantDate}
4. Taxable Year: 2026
5. Restrictions: Shares vest over 48 months with a 1-year cliff.
6. Fair Market Value at Transfer: $${(grant.totalShares * grant.strikePrice).toFixed(2)}
7. Amount Paid: $${(grant.totalShares * grant.strikePrice).toFixed(2)}
8. Gross Income (Difference): $0.00

A copy of this election has been submitted to the Internal Revenue Service via USPS Certified Mail and provided to Liquid Financial Technologies, Inc.

Taxpayer Signature: ____________________________________
Date: ${new Date().toISOString().split('T')[0]}`;

    const blob = new Blob([letterText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IRS_Section_83b_Election_${grant.stakeholder.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-500/30">
              <Briefcase size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Equity Vesting & 83(b) Election Vault</h1>
              <p className="text-sm text-gray-400">
                Carta & Pulley Alternative • Real-Time Vesting Clocks • Statutory 30-Day 83(b) IRS Guardian
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-gray-400">Current 409A FMV:</span>
            <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              ${currentFairMarketValue.toFixed(2)} / share
            </span>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Total Pool Granted</span>
            <div className="text-2xl font-bold text-white mt-1">4,620,000</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Common & Option shares allocated</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-emerald-400 uppercase font-semibold">Vested Equity Value</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">$3,125,000</div>
            <span className="text-[11px] text-emerald-500/80 mt-1 block">At current $1.25/share 409A valuation</span>
          </div>

          <div className="bg-gray-900 border border-purple-500/20 bg-purple-950/10 p-5 rounded-2xl">
            <span className="text-xs text-purple-400 uppercase font-semibold">Active 83(b) Deadlines</span>
            <div className="text-2xl font-bold text-purple-400 mt-1">1 Action Required</div>
            <span className="text-[11px] text-purple-300/80 mt-1 block">Maya Chen: 22 days remaining</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Cap Table Cleanliness</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">100%</span>
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Board consents & timestamps logged</span>
          </div>
        </div>

        {/* 83(b) Statutory Alert Callout */}
        <div className="mt-6 p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl flex items-start space-x-3 text-xs">
          <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-200">IRS Strict 30-Day Statutory Rule (IRC § 83(b)):</span>
            <p className="text-amber-300/80 mt-0.5">
              An 83(b) election MUST be physically postmarked to the IRS within exactly 30 days of share grant. The IRS provides zero exceptions or late relief. Liquid provides automated pre-filled election forms and USPS certified mail tracking logging.
            </p>
          </div>
        </div>

        {/* Stakeholder Grants Table */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Stakeholder Equity & Stock Option Clocks</h2>
              <p className="text-xs text-gray-400">Real-time vesting progress, cliff enforcement, and 83(b) compliance</p>
            </div>
            <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full font-medium">
              Standard 1-Year Cliff / 4-Year Schedule
            </span>
          </div>

          <div className="divide-y divide-gray-800">
            {grants.map((grant) => {
              // Vesting math
              const isPastCliff = grant.monthsElapsed >= grant.cliffMonths;
              const vestedFraction = isPastCliff ? Math.min(1, grant.monthsElapsed / grant.vestingMonths) : 0;
              const vestedShares = Math.floor(grant.totalShares * vestedFraction);
              const unvestedShares = grant.totalShares - vestedShares;
              const progressPct = Math.round(vestedFraction * 100);

              return (
                <div key={grant.id} className="p-5 hover:bg-gray-800/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white text-sm">{grant.stakeholder}</span>
                      <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono">
                        {grant.role}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Granted: {grant.grantDate} • Strike Price: ${grant.strikePrice.toFixed(4)}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase">Vested Shares</div>
                      <div className="text-emerald-400 font-semibold">{vestedShares.toLocaleString()}</div>
                    </div>

                    <div>
                      <div className="text-gray-400 text-[10px] uppercase">Unvested</div>
                      <div className="text-gray-400">{unvestedShares.toLocaleString()}</div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-32 font-sans">
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>Vesting ({grant.monthsElapsed}/48 mo)</span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-emerald-500 h-full rounded-full"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* 83(b) Status & Generator */}
                    <div className="font-sans flex items-center space-x-2">
                      {grant.election83bStatus === 'Filed & Certified' ? (
                        <span className="flex items-center space-x-1 text-[11px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          <CheckCircle2 size={13} />
                          <span>83(b) Certified</span>
                        </span>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center space-x-1 text-[11px] bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/20">
                            <Clock size={13} />
                            <span>{grant.daysRemaining83b} Days Left</span>
                          </span>
                          <button
                            onClick={() => handleGenerate83bLetter(grant)}
                            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-lg text-xs transition"
                          >
                            <Download size={12} />
                            <span>Letter</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
