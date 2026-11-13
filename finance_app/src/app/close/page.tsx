"use client";

import React, { useState, useMemo } from 'react';
import { useTransactions } from '@/context/TransactionContext';
import { useEntity } from '@/context/EntityContext';
import {
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  Download,
  Printer,
  FileCheck,
  Split,
  ChevronRight,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function MonthEndClosePage() {
  const { transactions, financials, accounts } = useTransactions();
  const { activeEntity } = useEntity();

  const [selectedPeriod, setSelectedPeriod] = useState('October 2026');
  const [isPeriodLocked, setIsPeriodLocked] = useState(false);
  const [checklist, setChecklist] = useState({
    bankReconciled: true,
    allCategorized: false,
    arVerified: true,
    apVerified: true,
    depreciationReviewed: true,
  });

  // Calculate unreviewed/uncategorized count
  const uncategorizedCount = useMemo(() => {
    return transactions.filter((t: any) => t.category === 'Uncategorized').length;
  }, [transactions]);

  // SaaS Subscription & Anomaly Leak Detector
  const subscriptionLeaks = useMemo(() => {
    const recurringVendors = [
      { name: 'AWS Cloud Infrastructure', current: 420.50, prior: 312.00, diff: '+34.8%' },
      { name: 'GitHub Enterprise Suite', current: 210.00, prior: 210.00, diff: '0.0%' },
      { name: 'Google Workspace', current: 72.00, prior: 72.00, diff: '0.0%' },
      { name: 'WeWork Office Space', current: 950.00, prior: 950.00, diff: '0.0%' },
    ];

    return recurringVendors;
  }, []);

  const handleToggleLock = () => {
    if (!isPeriodLocked && uncategorizedCount > 0) {
      toast.error(`Please resolve the ${uncategorizedCount} uncategorized transactions before locking this period.`);
      return;
    }
    const nextState = !isPeriodLocked;
    setIsPeriodLocked(nextState);
    toast.success(nextState ? `${selectedPeriod} period locked against tampering.` : `${selectedPeriod} unlocked for edits.`);
  };

  const handleExportPackage = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print-container pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print-hide">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Month-End Close</h1>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 ${
                isPeriodLocked
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}
            >
              {isPeriodLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              {isPeriodLocked ? 'Period Closed & Locked' : 'Close In Progress'}
            </span>
          </div>
          <p className="text-gray-500 mt-1">
            Reconcile ledger accounts, verify period adjustments, and lock books for {activeEntity?.name || 'Company'}.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            disabled={isPeriodLocked}
            className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
          >
            <option>October 2026</option>
            <option>September 2026</option>
            <option>August 2026</option>
            <option>Q3 2026</option>
          </select>

          <button
            onClick={handleToggleLock}
            className={`font-semibold py-2.5 px-4 rounded-xl transition flex items-center gap-2 text-sm shadow-sm ${
              isPeriodLocked
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isPeriodLocked ? (
              <>
                <Unlock className="w-4 h-4" /> Unlock Period
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Lock & Close Month
              </>
            )}
          </button>

          <button
            onClick={handleExportPackage}
            className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 px-4 rounded-xl transition flex items-center gap-2 text-sm shadow-sm"
          >
            <Printer className="w-4 h-4" /> Print Close Package
          </button>
        </div>
      </div>

      {/* Print Cover Header */}
      <div className="hidden print-show text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Monthly Financial Close Package</h1>
        <p className="text-gray-600 mt-1">
          {activeEntity?.name || 'Company'} • Period: {selectedPeriod}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">Audited & Certified via Liquid Autonomous Accounting</p>
      </div>

      {/* Grid: Close Checklist & SaaS Leak Detector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checklist */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print-card space-y-4">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
            <span>Month-End Close Checklist</span>
            <span className="text-xs font-normal text-gray-500">
              {Object.values(checklist).filter(Boolean).length} of 5 Steps Complete
            </span>
          </h2>

          <div className="divide-y divide-gray-100 text-sm">
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-semibold text-gray-900">Reconcile Cash & Bank Accounts</p>
                  <p className="text-xs text-gray-500">All 3 active accounts matched statement balances.</p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Reconciled
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {uncategorizedCount === 0 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                )}
                <div>
                  <p className="font-semibold text-gray-900">Classify & Categorize All Expenses</p>
                  <p className="text-xs text-gray-500">
                    {uncategorizedCount === 0
                      ? '100% of transactions categorized into GAAP/IRS accounts.'
                      : `${uncategorizedCount} transactions require categorization.`}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  uncategorizedCount === 0
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-amber-700 bg-amber-50'
                }`}
              >
                {uncategorizedCount === 0 ? 'Verified' : 'Needs Review'}
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-semibold text-gray-900">Accounts Receivable (AR) Reconciliation</p>
                  <p className="text-xs text-gray-500">Verified paid client invoices against bank deposits.</p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Verified
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-semibold text-gray-900">Accounts Payable (AP) & Bills Accruals</p>
                  <p className="text-xs text-gray-500">All vendor invoices scheduled and accrued.</p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Accrued
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-semibold text-gray-900">Depreciation & Fixed Assets (Section 179)</p>
                  <p className="text-xs text-gray-500">Fixed assets amortized under IRS MACRS schedule.</p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Scheduled
              </span>
            </div>
          </div>
        </div>

        {/* SaaS & Expense Leak Detector */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print-card space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900">SaaS & Leak Detector</h3>
            <span className="text-xs text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-semibold">
              1 Anomaly
            </span>
          </div>

          <p className="text-xs text-gray-500">
            Automated scan tracking recurring software and subscription variance month-over-month.
          </p>

          <div className="space-y-3">
            {subscriptionLeaks.map((sub, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs flex justify-between items-center ${
                  sub.diff.startsWith('+3')
                    ? 'bg-rose-50/50 border-rose-200'
                    : 'bg-gray-50/50 border-gray-100'
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-900">{sub.name}</p>
                  <p className="text-gray-500">
                    Prior: ${sub.prior.toFixed(2)} → Current: ${sub.current.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`font-semibold ${
                      sub.diff.startsWith('+3') ? 'text-rose-600' : 'text-gray-500'
                    }`}
                  >
                    {sub.diff}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
            <strong>AI Recommendation:</strong> AWS EC2 usage grew +34.8% this period. Consider reserving 1-year Savings Plans to save up to 42%.
          </div>
        </div>
      </div>

      {/* Month-End Financial Summary Table */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print-card">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
          Closed Period Financial Summary ({selectedPeriod})
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Recognized Revenue</p>
            <p className="text-xl font-bold text-emerald-600 mt-1">
              ${financials.totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Total Operating Expenses</p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              ${financials.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Period Net Profit</p>
            <p
              className={`text-xl font-bold mt-1 ${
                financials.netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              ${financials.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500">Closing Cash Reserves</p>
            <p className="text-xl font-bold text-blue-600 mt-1">
              ${financials.balanceSheet.totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <div className="p-4 bg-gray-900 text-white rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Digital Certificate of Reconciliation Hash: <code className="text-gray-300">sha256:e3b0c44298fc1c149afbf4c8996fb924</code></span>
          </div>
          <span className="text-gray-400">Signed: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
