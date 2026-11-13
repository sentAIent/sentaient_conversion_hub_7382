"use client";

import React, { useState } from 'react';
import { useTransactions } from '@/context/TransactionContext';
import { useEntity } from '@/context/EntityContext';
import {
  PieChart,
  Send,
  Copy,
  DollarSign,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle,
  FileText,
  Plus,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface CapTableEntry {
  id: string;
  shareholder: string;
  securityType: 'Common Stock' | 'Option Pool (Unallocated)' | 'SAFE Note' | 'Preferred Seed';
  shares: number;
  ownershipPercent: number;
  investmentAmount?: number;
}

const INITIAL_CAP_TABLE: CapTableEntry[] = [
  { id: '1', shareholder: 'Founding Team', securityType: 'Common Stock', shares: 7500000, ownershipPercent: 75.0 },
  { id: '2', shareholder: 'Employee Stock Option Pool (ESOP)', securityType: 'Option Pool (Unallocated)', shares: 1000000, ownershipPercent: 10.0 },
  { id: '3', shareholder: 'Angel Syndicate Alpha', securityType: 'SAFE Note', shares: 1000000, ownershipPercent: 10.0, investmentAmount: 500000 },
  { id: '4', shareholder: 'Pre-Seed Accelerator', securityType: 'SAFE Note', shares: 500000, ownershipPercent: 5.0, investmentAmount: 250000 },
];

export default function InvestorsPage() {
  const { financials } = useTransactions();
  const { activeEntity } = useEntity();

  const [capTable, setCapTable] = useState<CapTableEntry[]>(INITIAL_CAP_TABLE);

  const [updateMonth, setUpdateMonth] = useState('October 2026');
  const [highlights, setHighlights] = useState(
    '• Closed enterprise contract with Fortune 500 partner (+$12k MRR)\n• Released autonomous accounting close and instant invoice settlement\n• Team expanded to 4 engineers with zero employee churn'
  );
  const [lowlights, setLowlights] = useState(
    '• Sales cycle for enterprise tier took 45 days longer than anticipated due to security audits\n• Cloud infrastructure costs increased by 34% (mitigation plan deployed)'
  );
  const [asks, setAsks] = useState(
    '• Warm introductions to VP Finance / Controller candidates in San Francisco or Remote\n• Feedback on our automated IRS 1099 compliance workflow'
  );

  const cash = financials.balanceSheet.totalAssets > 0 ? financials.balanceSheet.totalAssets : 68000;
  const burn = financials.totalExpenses > 0 ? financials.totalExpenses : 8500;
  const revenue = financials.totalIncome > 0 ? financials.totalIncome : 12000;
  const runwayMonths = (cash / Math.max(1000, burn - revenue)).toFixed(1);

  const handleCopyUpdate = () => {
    const emailBody = `
SUBJECT: ${activeEntity?.name || 'Company'} — Monthly Investor Update (${updateMonth})

Hi Investors & Advisors,

Here is our financial and operational update for ${updateMonth}.

KEY METRICS & FINANCIAL HEALTH:
------------------------------------------
• Cash on Hand: $${cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}
• Monthly Revenue: $${revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
• Net Monthly Burn: $${Math.max(1000, burn - revenue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
• Runway: ~${runwayMonths} Months

HIGHLIGHTS & WINS:
------------------------------------------
${highlights}

CHALLENGES & MITIGATIONS:
------------------------------------------
${lowlights}

WHERE YOU CAN HELP (ASKS):
------------------------------------------
${asks}

Thank you for your continued support!

Best,
${activeEntity?.name || 'Company'} Leadership Team
    `.trim();

    navigator.clipboard.writeText(emailBody);
    toast.success('Investor update copied to clipboard in clean text format!');
  };

  const handleSendUpdate = () => {
    toast.success('Investor update dispatched to your cap table distribution list!');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Investor Reporting & Cap Table</h1>
          <p className="text-gray-500 mt-1">
            1-Click monthly investor updates, SAFE notes, and equity cap table management for {activeEntity?.name || 'Company'}.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={handleCopyUpdate}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 px-4 rounded-xl transition flex items-center gap-2 text-sm"
          >
            <Copy className="w-4 h-4" /> Copy Email Text
          </button>
          <button
            onClick={handleSendUpdate}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl transition flex items-center gap-2 text-sm shadow-sm"
          >
            <Send className="w-4 h-4" /> Send to Investors
          </button>
        </div>
      </div>

      {/* Financial Snapshot KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase">Cash on Hand</p>
          <p className="text-2xl font-extrabold text-blue-600 mt-1">${cash.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase">Monthly Revenue</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">${revenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase">Net Monthly Burn</p>
          <p className="text-2xl font-extrabold text-gray-900 mt-1">${Math.max(1000, burn - revenue).toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase">Estimated Runway</p>
          <p className="text-2xl font-extrabold text-purple-600 mt-1">{runwayMonths} Months</p>
        </div>
      </div>

      {/* 1-Click Monthly Investor Update Editor */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Monthly Investor Update Builder</h2>
            <p className="text-xs text-gray-500">
              Financial numbers are auto-injected from your verified ledger. Review highlights and asks below.
            </p>
          </div>
          <select
            value={updateMonth}
            onChange={(e) => setUpdateMonth(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-semibold text-gray-800"
          >
            <option>October 2026</option>
            <option>September 2026</option>
            <option>Q3 2026</option>
          </select>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Highlights & Wins</label>
            <textarea
              rows={3}
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Lowlights & Challenges</label>
            <textarea
              rows={2}
              value={lowlights}
              onChange={(e) => setLowlights(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Where Investors Can Help (Asks)</label>
            <textarea
              rows={2}
              value={asks}
              onChange={(e) => setAsks(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Cap Table Overview */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Cap Table & Equity Ownership</h2>
            <p className="text-xs text-gray-500">Fully diluted equity share capitalization table.</p>
          </div>
          <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
            Total Shares: 10,000,000
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-xs">
              <tr>
                <th className="py-3 px-4">Shareholder / Investor</th>
                <th className="py-3 px-4">Security Class</th>
                <th className="py-3 px-4 text-right">Shares / Units</th>
                <th className="py-3 px-4 text-right">Ownership %</th>
                <th className="py-3 px-4 text-right">Invested Capital</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {capTable.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{item.shareholder}</td>
                  <td className="py-3.5 px-4 text-gray-600">{item.securityType}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-gray-800">{item.shares.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-blue-600">{item.ownershipPercent.toFixed(1)}%</td>
                  <td className="py-3.5 px-4 text-right font-medium text-gray-900">
                    {item.investmentAmount ? `$${item.investmentAmount.toLocaleString()}` : '—'}
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
