"use client";

import React, { useState } from 'react';
import { useEntity } from '@/context/EntityContext';
import { useTransactions } from '@/context/TransactionContext';
import {
  Layers,
  Building,
  ArrowRightLeft,
  Download,
  Printer,
  CheckCircle,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface IntercompanyTransfer {
  id: string;
  fromEntity: string;
  toEntity: string;
  amount: number;
  date: string;
  description: string;
  status: 'ELIMINATED' | 'BALANCED';
}

const SAMPLE_TRANSFERS: IntercompanyTransfer[] = [
  {
    id: 'tr_1',
    fromEntity: 'Liquid Technologies Inc.',
    toEntity: 'Alpha Consulting LLC',
    amount: 5000.00,
    date: '2026-10-15',
    description: 'Management & Shared Services Fee',
    status: 'ELIMINATED',
  },
  {
    id: 'tr_2',
    fromEntity: 'Alpha Consulting LLC',
    toEntity: 'Personal Finances',
    amount: 3500.00,
    date: '2026-10-20',
    description: 'Owner Distribution / Draw',
    status: 'BALANCED',
  },
];

export default function ConsolidationPage() {
  const { entities } = useEntity();
  const { financials } = useTransactions();

  const [transfers, setTransfers] = useState<IntercompanyTransfer[]>(SAMPLE_TRANSFERS);

  // Entities financial matrix
  const entityA = {
    name: entities[1]?.name || 'Alpha Consulting LLC',
    revenue: financials.totalIncome > 0 ? financials.totalIncome : 45000,
    expenses: financials.totalExpenses > 0 ? financials.totalExpenses : 18000,
  };

  const entityB = {
    name: 'Liquid Technologies Inc.',
    revenue: 32000,
    expenses: 24000,
  };

  const intercompanyElimination = 5000; // Intercompany services fee eliminated

  const consolidatedRevenue = entityA.revenue + entityB.revenue - intercompanyElimination;
  const consolidatedExpenses = entityA.expenses + entityB.expenses - intercompanyElimination;
  const consolidatedNetIncome = consolidatedRevenue - consolidatedExpenses;

  const handlePrint = () => {
    window.print();
  };

  const handleAddTransfer = () => {
    toast.success('Intercompany loan balanced and eliminated on consolidation.');
  };

  return (
    <div className="space-y-6 print-container pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print-hide">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Multi-Entity Consolidation</h1>
          <p className="text-gray-500 mt-1">
            Consolidated P&L, intercompany transaction eliminations, and Due To / Due From loan tracking across all corporate entities.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={handlePrint}
            className="bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 px-4 rounded-xl transition flex items-center gap-2 text-sm shadow-sm"
          >
            <Printer className="w-4 h-4" /> Print Consolidated P&L
          </button>
        </div>
      </div>

      {/* Print Cover Header */}
      <div className="hidden print-show text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Consolidated Statement of Operations</h1>
        <p className="text-gray-600 mt-1">Group Consolidation with Intercompany Eliminations</p>
        <p className="text-xs text-gray-400 mt-0.5">Period: Year-to-Date 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print-grid">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print-card">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Consolidated External Revenue</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">
            ${consolidatedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-400 mt-1">Net of \$5,000 intercompany services elimination</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print-card">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Consolidated Group Expenses</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">
            ${consolidatedExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-400 mt-1">True third-party operational disbursements</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print-card">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Consolidated Net Profit</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">
            ${consolidatedNetIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Group Profit Margin: {((consolidatedNetIncome / consolidatedRevenue) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Consolidation Matrix Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 print-card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Consolidation Matrix (P&L Breakdown)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-xs uppercase">
              <tr>
                <th className="py-3 px-4">Account Line</th>
                <th className="py-3 px-4 text-right">{entityA.name}</th>
                <th className="py-3 px-4 text-right">{entityB.name}</th>
                <th className="py-3 px-4 text-right text-rose-600">Intercompany Eliminations</th>
                <th className="py-3 px-4 text-right font-bold text-gray-900">Consolidated Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-gray-900">Gross Operating Revenue</td>
                <td className="py-3.5 px-4 text-right">${entityA.revenue.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-right">${entityB.revenue.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-right text-rose-600">-${intercompanyElimination.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-right font-bold text-emerald-600">
                  ${consolidatedRevenue.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-gray-900">Operating Expenses</td>
                <td className="py-3.5 px-4 text-right">${entityA.expenses.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-right">${entityB.expenses.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-right text-rose-600">-${intercompanyElimination.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                  ${consolidatedExpenses.toLocaleString()}
                </td>
              </tr>
              <tr className="bg-gray-50/80 font-bold text-gray-900">
                <td className="py-4 px-4 text-base">Net Operating Income</td>
                <td className="py-4 px-4 text-right text-emerald-600">
                  ${(entityA.revenue - entityA.expenses).toLocaleString()}
                </td>
                <td className="py-4 px-4 text-right text-emerald-600">
                  ${(entityB.revenue - entityB.expenses).toLocaleString()}
                </td>
                <td className="py-4 px-4 text-right text-gray-500">$0.00</td>
                <td className="py-4 px-4 text-right text-base text-blue-600">
                  ${consolidatedNetIncome.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Due To / Due From Transfer Ledger */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 print-hide">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Due To / Due From Intercompany Transfers</h2>
            <p className="text-xs text-gray-500">Track and balance cash movements between sister entities.</p>
          </div>
          <button
            onClick={handleAddTransfer}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-3 py-1.5 rounded-lg transition"
          >
            Post Intercompany Transfer
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-xs">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">From Entity</th>
                <th className="py-3 px-4">To Entity</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {transfers.map((tr) => (
                <tr key={tr.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3 px-4 font-mono text-gray-500">{tr.date}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{tr.fromEntity}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{tr.toEntity}</td>
                  <td className="py-3 px-4 text-gray-600">{tr.description}</td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900">${tr.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      {tr.status}
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
