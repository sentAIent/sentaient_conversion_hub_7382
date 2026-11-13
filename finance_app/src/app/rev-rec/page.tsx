"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  Layers,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Download,
  DollarSign,
  FileSpreadsheet,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface SaaSContract {
  id: string;
  customer: string;
  plan: string;
  totalContractValue: number;
  startDate: string;
  durationMonths: number;
  monthlyRecognition: number;
  recognizedToDate: number;
  deferredRevenue: number;
}

export default function RevenueRecognitionPage() {
  const [contracts] = useState<SaaSContract[]>([
    {
      id: 'c-101',
      customer: 'Acme Global Enterprises',
      plan: 'Enterprise Sovereign Cloud Tier',
      totalContractValue: 60000,
      startDate: '2026-01-01',
      durationMonths: 12,
      monthlyRecognition: 5000,
      recognizedToDate: 15000,
      deferredRevenue: 45000,
    },
    {
      id: 'c-102',
      customer: 'Hyperion Defense Dynamics',
      plan: 'Tactical Mission Command License',
      totalContractValue: 96000,
      startDate: '2026-02-01',
      durationMonths: 24,
      monthlyRecognition: 4000,
      recognizedToDate: 8000,
      deferredRevenue: 88000,
    },
    {
      id: 'c-103',
      customer: 'Nexus Biotech Labs',
      plan: 'AI Structure Screening Multi-Seat',
      totalContractValue: 36000,
      startDate: '2026-03-01',
      durationMonths: 12,
      monthlyRecognition: 3000,
      recognizedToDate: 3000,
      deferredRevenue: 33000,
    },
  ]);

  // Aggregate metrics
  const totalTCV = contracts.reduce((acc, c) => acc + c.totalContractValue, 0);
  const totalRecognized = contracts.reduce((acc, c) => acc + c.recognizedToDate, 0);
  const totalDeferredRevenue = contracts.reduce((acc, c) => acc + c.deferredRevenue, 0);
  const currentMonthlyRunRate = contracts.reduce((acc, c) => acc + c.monthlyRecognition, 0);

  // 12-Month Deferred Revenue Waterfall Model
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Simulated monthly waterfall
  const waterfallData = [
    { month: 'Jan 2026', opening: 0, billings: 60000, recognized: 5000, ending: 55000 },
    { month: 'Feb 2026', opening: 55000, billings: 96000, recognized: 9000, ending: 142000 },
    { month: 'Mar 2026', opening: 142000, billings: 36000, recognized: 12000, ending: 166000 },
    { month: 'Apr 2026', opening: 166000, billings: 0, recognized: 12000, ending: 154000 },
    { month: 'May 2026', opening: 154000, billings: 0, recognized: 12000, ending: 142000 },
    { month: 'Jun 2026', opening: 142000, billings: 0, recognized: 12000, ending: 130000 },
    { month: 'Jul 2026', opening: 130000, billings: 0, recognized: 12000, ending: 118000 },
    { month: 'Aug 2026', opening: 118000, billings: 0, recognized: 12000, ending: 106000 },
    { month: 'Sep 2026', opening: 106000, billings: 0, recognized: 12000, ending: 94000 },
    { month: 'Oct 2026', opening: 94000, billings: 0, recognized: 12000, ending: 82000 },
    { month: 'Nov 2026', opening: 82000, billings: 0, recognized: 12000, ending: 70000 },
    { month: 'Dec 2026', opening: 70000, billings: 0, recognized: 12000, ending: 58000 },
  ];

  const handleExportWaterfall = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "ASC 606 SaaS Revenue Recognition Waterfall\n" +
      "Period,Opening Deferred Revenue,New Billings,Recognized Revenue (P&L),Ending Deferred Revenue Liability\n" +
      waterfallData.map(w => `${w.month},$${w.opening},$${w.billings},$${w.recognized},$${w.ending}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ASC606_Revenue_Recognition_Waterfall_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Layers size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Revenue Recognition (ASC 606)</h1>
              <p className="text-sm text-gray-400">
                Deferred Revenue Waterfalls • Contract Amortization • GAAP / IFRS 15 Compliance
              </p>
            </div>
          </div>
          <button
            onClick={handleExportWaterfall}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-indigo-600/20"
          >
            <Download size={16} />
            <span>Export Amortization Waterfall</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Total Contract Value (TCV)</span>
            <div className="text-2xl font-bold text-white mt-1">
              ${totalTCV.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Active committed multi-period contracts</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-amber-400 uppercase font-semibold">Deferred Revenue Liability</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              ${totalDeferredRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-amber-500/80 mt-1 block">Balance Sheet unearned revenue</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-emerald-400 uppercase font-semibold">Recognized to Date</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              ${totalRecognized.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-500/80 mt-1 block">Transferred to Income Statement</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-indigo-400 uppercase font-semibold">Current Monthly Run-Rate</span>
            <div className="text-2xl font-bold text-indigo-400 mt-1">
              ${currentMonthlyRunRate.toLocaleString('en-US', { minimumFractionDigits: 2 })}/mo
            </div>
            <span className="text-[11px] text-indigo-500/80 mt-1 block">Contractual straight-line recognition</span>
          </div>
        </div>

        {/* ASC 606 5-Step Framework Banner */}
        <div className="mt-6 bg-gray-900 border border-gray-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-gray-300 uppercase tracking-wider text-[11px]">ASC 606 5-Step Framework:</span>
          <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            <CheckCircle2 size={13} />
            <span>1. Identify Contract</span>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            <CheckCircle2 size={13} />
            <span>2. Separate Obligations</span>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            <CheckCircle2 size={13} />
            <span>3. Determine Price</span>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            <CheckCircle2 size={13} />
            <span>4. Allocate Consideration</span>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            <CheckCircle2 size={13} />
            <span>5. Recognize Over Time</span>
          </div>
        </div>

        {/* 12-Month Deferred Revenue Waterfall Matrix */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">12-Month Deferred Revenue Waterfall Matrix</h2>
              <p className="text-xs text-gray-400">Monthly progression of deferred liabilities converted into recognized revenue</p>
            </div>
            <span className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 font-medium">
              Straight-Line Amortization
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-950 uppercase text-gray-400 font-semibold border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4 text-right">Opening Deferred</th>
                  <th className="py-3 px-4 text-right">New Billings</th>
                  <th className="py-3 px-4 text-right text-emerald-400">Recognized (P&L)</th>
                  <th className="py-3 px-4 text-right text-amber-400 font-bold">Ending Deferred Liability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 font-mono">
                {waterfallData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/40 transition">
                    <td className="py-3 px-4 font-sans font-medium text-white">{row.month}</td>
                    <td className="py-3 px-4 text-right">${row.opening.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-indigo-300">
                      {row.billings > 0 ? `+$${row.billings.toLocaleString()}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-semibold">
                      -${row.recognized.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-amber-400 font-semibold">
                      ${row.ending.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Contract Schedules */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-base font-semibold">Active SaaS Multi-Period Customer Contracts</h2>
            <span className="text-xs text-gray-400">{contracts.length} enterprise agreements active</span>
          </div>

          <div className="divide-y divide-gray-800">
            {contracts.map((contract) => {
              const progressPct = Math.round((contract.recognizedToDate / contract.totalContractValue) * 100);
              return (
                <div key={contract.id} className="p-5 hover:bg-gray-800/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white text-sm">{contract.customer}</span>
                      <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono">
                        {contract.id}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{contract.plan} • {contract.durationMonths} Months ({contract.startDate})</div>
                  </div>

                  <div className="flex items-center space-x-6 text-xs font-mono">
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase">Monthly Rec</div>
                      <div className="text-white font-semibold">${contract.monthlyRecognition.toLocaleString()}/mo</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase">Recognized</div>
                      <div className="text-emerald-400 font-semibold">${contract.recognizedToDate.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase">Deferred Liab</div>
                      <div className="text-amber-400 font-semibold">${contract.deferredRevenue.toLocaleString()}</div>
                    </div>
                    <div className="w-28 font-sans">
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full" style={{ width: `${progressPct}%` }} />
                      </div>
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
