"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  Clock,
  AlertTriangle,
  Download,
  CheckCircle2,
  TrendingDown,
  DollarSign,
  FileText,
  Calendar,
  Building2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface SaaSContractRenewal {
  id: string;
  vendor: string;
  category: string;
  annualSpend: number;
  monthlySpend: number;
  renewalDate: string;
  daysUntilRenewal: number;
  noticeWindowDays: number; // e.g. 60 days required notice to prevent auto-renew
  daysUntilNoticeDeadline: number;
  benchmarkStatus: 'Above Market (+24%)' | 'At Market' | 'Below Market';
  benchmarkAdvice: string;
  autoRenewClause: boolean;
}

export default function RenewalsRadarPage() {
  const [contracts, setContracts] = useState<SaaSContractRenewal[]>([
    {
      id: 'ren-1',
      vendor: 'Datadog Observability',
      category: 'Infrastructure Monitoring',
      annualSpend: 22200,
      monthlySpend: 1850,
      renewalDate: '2026-04-15',
      daysUntilRenewal: 37,
      noticeWindowDays: 30,
      daysUntilNoticeDeadline: 7, // CRITICAL: 7 days to give notice!
      benchmarkStatus: 'Above Market (+24%)',
      benchmarkAdvice: 'Peers with <50 engineers pay $1,400/mo ($15/host). Request tier reduction to reclaim $450/mo.',
      autoRenewClause: true,
    },
    {
      id: 'ren-2',
      vendor: 'Salesforce Enterprise CRM',
      category: 'Sales & Pipeline',
      annualSpend: 28800,
      monthlySpend: 2400,
      renewalDate: '2026-05-30',
      daysUntilRenewal: 82,
      noticeWindowDays: 60,
      daysUntilNoticeDeadline: 22,
      benchmarkStatus: 'Above Market (+24%)',
      benchmarkAdvice: '12 inactive licenses detected. Downsizing from 30 to 18 seats yields $960/mo savings.',
      autoRenewClause: true,
    },
    {
      id: 'ren-3',
      vendor: 'Snowflake Data Cloud',
      category: 'Data Warehouse',
      annualSpend: 37200,
      monthlySpend: 3100,
      renewalDate: '2026-07-01',
      daysUntilRenewal: 114,
      noticeWindowDays: 30,
      daysUntilNoticeDeadline: 84,
      benchmarkStatus: 'At Market',
      benchmarkAdvice: 'Current compute rate is competitive under 2-year capacity reservation.',
      autoRenewClause: false,
    },
    {
      id: 'ren-4',
      vendor: 'GitHub Enterprise Cloud',
      category: 'Developer Tooling',
      annualSpend: 10080,
      monthlySpend: 840,
      renewalDate: '2026-08-15',
      daysUntilRenewal: 159,
      noticeWindowDays: 30,
      daysUntilNoticeDeadline: 129,
      benchmarkStatus: 'Below Market',
      benchmarkAdvice: 'Grandfathered pricing with startup tier discount.',
      autoRenewClause: true,
    },
  ]);

  const totalAnnualSpend = contracts.reduce((sum, c) => sum + c.annualSpend, 0);
  const criticalNoticeCount = contracts.filter(c => c.daysUntilNoticeDeadline <= 14).length;
  const potentialSavingsAnnual = 16920; // Simulated benchmark savings

  const handleGenerateNoticeLetter = (c: SaaSContractRenewal) => {
    const text = `FORMAL CONTRACT NOTICE: NON-RENEWAL & RENEGOTIATION
To: ${c.vendor} Accounts & Renewal Team
From: Liquid Financial Technologies, Inc.
Date: ${new Date().toISOString().split('T')[0]}

RE: Formal Written Notice of Non-Renewal for Contract #${c.id}

Please accept this letter as formal written notice pursuant to the Master Services Agreement that Liquid Financial Technologies, Inc. elects NOT to automatically renew the subscription expiring on ${c.renewalDate}.

This timely notice is delivered in compliance with the required ${c.noticeWindowDays}-day prior notification window.

We are interested in discussing revised renewal terms based on current market rate benchmarks and our rightsized seat requirements. Please have our dedicated account representative reach out before the contract expiration date.

Authorized Officer Signature:
_______________________________________
Liquid Corporate Finance Operations`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Notice_of_Non_Renewal_${c.vendor.replace(/\s+/g, '_')}.txt`;
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
            <div className="p-2.5 bg-amber-600/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Clock size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">SaaS Contract Renewal Radar</h1>
              <p className="text-sm text-gray-400">
                Vendr Alternative • 90/60/30-Day Cancellation Deadlines • Market Benchmark Negotiator
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-gray-400">Annual Software Spend:</span>
            <span className="font-mono font-bold text-white bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-800">
              ${totalAnnualSpend.toLocaleString()} / year
            </span>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Active Subscriptions</span>
            <div className="text-2xl font-bold text-white mt-1">{contracts.length} Vendors</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Monitored for auto-renew lock-in</span>
          </div>

          <div className="bg-gray-900 border border-red-500/30 bg-red-950/10 p-5 rounded-2xl">
            <span className="text-xs text-red-400 uppercase font-semibold">Critical Notice Windows (&lt;14d)</span>
            <div className="text-2xl font-bold text-red-400 mt-1">{criticalNoticeCount} Contract</div>
            <span className="text-[11px] text-red-400/80 mt-1 block">Datadog: 7 days until auto-renew</span>
          </div>

          <div className="bg-gray-900 border border-emerald-500/20 bg-emerald-950/10 p-5 rounded-2xl">
            <span className="text-xs text-emerald-400 uppercase font-semibold">Negotiation Savings Target</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">${potentialSavingsAnnual.toLocaleString()}/yr</div>
            <span className="text-[11px] text-emerald-400/80 mt-1 block">Based on peer pricing benchmarks</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Contract Coverage</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">100%</span>
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Zero unexpected renewals</span>
          </div>
        </div>

        {/* Critical Deadline Callout */}
        {criticalNoticeCount > 0 && (
          <div className="mt-6 p-4 bg-red-950/20 border border-red-500/30 rounded-2xl flex items-start space-x-3 text-xs">
            <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-red-200">Urgent Notice Window Action Required:</span>
              <p className="text-red-300/80 mt-0.5">
                <strong>Datadog Observability</strong> auto-renews on April 15 with a required 30-day notice window. You have <strong>7 days remaining</strong> to deliver written notice of non-renewal or you will be locked into another 12-month contract at +7% escalated rates.
              </p>
            </div>
          </div>
        )}

        {/* Contracts Table */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Vendor Contract Radar & Renewal Calendar</h2>
              <p className="text-xs text-gray-400">Notification deadlines, benchmark comparisons, and non-renewal dispatch</p>
            </div>
            <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full font-medium">
              4 Enterprise Agreements
            </span>
          </div>

          <div className="divide-y divide-gray-800">
            {contracts.map((c) => {
              const isUrgent = c.daysUntilNoticeDeadline <= 14;
              return (
                <div key={c.id} className="p-5 hover:bg-gray-800/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-md">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white text-sm">{c.vendor}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                        c.benchmarkStatus.includes('Above') ? 'bg-red-500/10 text-red-400' :
                        c.benchmarkStatus.includes('Below') ? 'bg-emerald-500/10 text-emerald-400' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        {c.benchmarkStatus}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{c.category} • Renewal: {c.renewalDate} ({c.noticeWindowDays}d notice required)</div>
                    <div className="text-[11px] text-indigo-300/90 pt-1 italic">{c.benchmarkAdvice}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase">Annual Spend</div>
                      <div className="text-white font-semibold">${c.annualSpend.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-500 font-sans">${c.monthlySpend.toLocaleString()}/mo</div>
                    </div>

                    <div>
                      <div className="text-gray-400 text-[10px] uppercase">Notice Deadline</div>
                      <div className={`font-semibold ${isUrgent ? 'text-red-400 font-bold' : 'text-gray-200'}`}>
                        {c.daysUntilNoticeDeadline} days left
                      </div>
                      <div className="text-[10px] text-gray-500 font-sans">{c.daysUntilRenewal}d to renewal</div>
                    </div>

                    <div className="font-sans">
                      <button
                        onClick={() => handleGenerateNoticeLetter(c)}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                          isUrgent
                            ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20'
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                        }`}
                      >
                        <Download size={13} />
                        <span>Generate Notice</span>
                      </button>
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
