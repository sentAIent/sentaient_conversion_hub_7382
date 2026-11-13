"use client";

import { useState, useMemo, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { createClient } from '@/lib/supabase/client';
import ReceiptScanner from '@/components/ReceiptScanner';
import ExpenseList from '@/components/ExpenseList';
import {
  Camera,
  AlertTriangle,
  CheckCircle2,
  Send,
  DollarSign,
  ShieldCheck,
  CreditCard,
  FileText,
  UserCheck,
  Building2,
  Clock,
} from 'lucide-react';

interface Expense {
  id: string;
  merchant: string;
  date: string;
  amount: number;
  tax: number;
  category: string;
  confidence?: number;
  employeeName?: string;
  status?: 'Pending' | 'Approved' | 'Queued to AP' | 'Reimbursed';
  policyWarning?: string;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 'exp-1',
      merchant: 'L\'Atelier de Joel Robuchon',
      date: '2026-03-08',
      amount: 142.50,
      tax: 12.50,
      category: 'Meals & Entertainment',
      employeeName: 'Sarah Jenkins (VP Eng)',
      status: 'Pending',
      policyWarning: 'Meal exceeds $75.00 policy cap ($142.50). Requires founder sign-off.',
    },
    {
      id: 'exp-2',
      merchant: 'Delta Air Lines',
      date: '2026-03-04',
      amount: 485.20,
      tax: 38.00,
      category: 'Travel & Transport',
      employeeName: 'Marcus Vance',
      status: 'Approved',
    },
    {
      id: 'exp-3',
      merchant: 'WeWork Member Services',
      date: '2026-03-01',
      amount: 850.00,
      tax: 0,
      category: 'Office & Facilities',
      employeeName: 'Elena Rostova',
      status: 'Queued to AP',
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const supabase = createClient();

  // Policy rules:
  // 1. Meals > $75 require memo and founder review
  // 2. Out-of-pocket expenses > $500 require dual approval
  const checkPolicy = (amount: number, category: string): string | undefined => {
    if (category === 'Meals & Entertainment' && amount > 75) {
      return `Meal expense of $${amount.toFixed(2)} exceeds $75.00 limit.`;
    }
    if (amount > 500) {
      return `Amount of $${amount.toFixed(2)} exceeds $500 single-charge threshold. Requires dual approval.`;
    }
    return undefined;
  };

  const handleSaveExpense = async (scanResult: { merchant: string; date: string; amount: number; category: string; tax?: number; confidence?: number }) => {
    const warning = checkPolicy(scanResult.amount, scanResult.category);
    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      merchant: scanResult.merchant,
      date: scanResult.date,
      amount: scanResult.amount,
      tax: scanResult.tax || 0,
      category: scanResult.category,
      confidence: scanResult.confidence,
      employeeName: 'Founder / Active User',
      status: warning ? 'Pending' : 'Approved',
      policyWarning: warning,
    };

    setExpenses([newExp, ...expenses]);
    setShowScanner(false);
  };

  const handleApprove = (id: string) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...exp, status: 'Approved' } : exp));
  };

  const handleQueueToAP = (id: string) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...exp, status: 'Queued to AP' } : exp));
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const pendingCount = expenses.filter(exp => exp.status === 'Pending').length;
  const queuedToAPTotal = expenses.filter(exp => exp.status === 'Queued to AP').reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Camera size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Receipts & Employee Reimbursements</h1>
              <p className="text-sm text-gray-400">
                Automated Policy Enforcement • OCR Ingestion • 1-Click Accounts Payable Queuing
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-blue-600/20"
          >
            <Camera size={16} />
            <span>{showScanner ? 'Close Scanner' : 'Scan Receipt with AI'}</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Total Claims</span>
            <div className="text-2xl font-bold text-white mt-1">${totalExpenses.toFixed(2)}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">{expenses.length} claims submitted this period</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-amber-400 uppercase font-semibold">Pending Policy Review</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">{pendingCount} claims</div>
            <span className="text-[11px] text-amber-500/80 mt-1 block">Meals &gt; $75 or high-value items</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-indigo-400 uppercase font-semibold">Queued to AP Bill Pay</span>
            <div className="text-2xl font-bold text-indigo-400 mt-1">${queuedToAPTotal.toFixed(2)}</div>
            <span className="text-[11px] text-indigo-500/80 mt-1 block">Ready for next payroll / ACH batch</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-emerald-400 uppercase font-semibold">Policy Health Score</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">98%</span>
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <span className="text-[11px] text-emerald-500/80 mt-1 block">IRS compliance & receipt archiving</span>
          </div>
        </div>

        {/* OCR Scanner Dropzone (if active) */}
        {showScanner && (
          <div className="mt-6 bg-gray-900 border border-blue-500/30 p-6 rounded-2xl shadow-xl">
            <h2 className="text-base font-semibold mb-4 text-blue-300">AI Receipt Scanner & Metadata Extractor</h2>
            <ReceiptScanner onSave={handleSaveExpense as any} />
          </div>
        )}

        {/* Expense Reimbursements Table */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Out-of-Pocket Expense Claims & Audit Status</h2>
              <p className="text-xs text-gray-400">Review employee receipts, approve claims, and schedule payments</p>
            </div>
            <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full font-medium">
              Real-time Policy Guard Active
            </span>
          </div>

          <div className="divide-y divide-gray-800">
            {expenses.map((exp) => (
              <div key={exp.id} className="p-5 hover:bg-gray-800/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white text-sm">{exp.merchant}</span>
                    <span className="text-xs text-gray-400">• {exp.category}</span>
                    {exp.policyWarning && (
                      <span className="flex items-center space-x-1 text-[11px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md border border-amber-500/20">
                        <AlertTriangle size={12} />
                        <span>Policy Flag</span>
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center space-x-3">
                    <span>{exp.employeeName || 'Staff Member'}</span>
                    <span>•</span>
                    <span>{exp.date}</span>
                    {exp.policyWarning && (
                      <span className="text-amber-400/90 italic">{exp.policyWarning}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-mono text-base font-bold text-white">${exp.amount.toFixed(2)}</div>
                    <div className="text-[10px] text-gray-500">Tax: ${exp.tax.toFixed(2)}</div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                    exp.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    exp.status === 'Queued to AP' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {exp.status || 'Pending'}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    {exp.status === 'Pending' && (
                      <button
                        onClick={() => handleApprove(exp.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition"
                      >
                        Approve
                      </button>
                    )}
                    {exp.status === 'Approved' && (
                      <button
                        onClick={() => handleQueueToAP(exp.id)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition"
                      >
                        <CreditCard size={13} />
                        <span>Queue to AP</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteExpense(exp.id)}
                      className="px-2.5 py-1.5 text-gray-500 hover:text-red-400 text-xs transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Expense Policy Guidelines */}
        <div className="mt-8 bg-gray-900/60 border border-gray-800 p-5 rounded-2xl">
          <div className="flex items-center space-x-2 text-sm font-semibold mb-3 text-gray-200">
            <Building2 size={16} className="text-blue-400" />
            <span>Active Automated Corporate Expense Policy Rules</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-400">
            <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-800/80">
              <div className="font-semibold text-gray-200">Meals & Entertainment</div>
              <p className="mt-1">$75.00/person max per meal. Alcohol permitted only with client entertainment memo.</p>
            </div>
            <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-800/80">
              <div className="font-semibold text-gray-200">Commercial Travel</div>
              <p className="mt-1">Standard Economy for domestic flights &lt; 5 hours. Hotel lodging capped at $300/night.</p>
            </div>
            <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-800/80">
              <div className="font-semibold text-gray-200">Approval Hierarchy</div>
              <p className="mt-1">Charges &gt; $500 require founder co-signature. Automatically syncs to Accounts Payable.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
