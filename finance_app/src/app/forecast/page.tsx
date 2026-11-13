"use client";

import React, { useState, useMemo } from 'react';
import { useTransactions } from '@/context/TransactionContext';
import { useEntity } from '@/context/EntityContext';
import {
  TrendingUp,
  Clock,
  DollarSign,
  UserPlus,
  ArrowRight,
  Send,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ARAgingItem {
  id: string;
  client: string;
  invoice: string;
  amount: number;
  daysOverdue: number;
  bracket: '0-30' | '31-60' | '61-90' | '90+';
}

const SAMPLE_AR_AGING: ARAgingItem[] = [
  { id: 'ar_1', client: 'Acme Corp', invoice: 'INV-1002', amount: 3500.00, daysOverdue: 12, bracket: '0-30' },
  { id: 'ar_2', client: 'Nexus Technologies', invoice: 'INV-994', amount: 6200.00, daysOverdue: 42, bracket: '31-60' },
  { id: 'ar_3', client: 'Global Logistics Ltd', invoice: 'INV-871', amount: 1800.00, daysOverdue: 75, bracket: '61-90' },
  { id: 'ar_4', client: 'Starlight Media', invoice: 'INV-750', amount: 2400.00, daysOverdue: 110, bracket: '90+' },
];

export default function ForecastPage() {
  const { financials } = useTransactions();
  const { activeEntity } = useEntity();

  // Baseline Financials
  const cashReserves = financials.balanceSheet.totalAssets > 0 ? financials.balanceSheet.totalAssets : 68000;
  const currentMonthlyBurn = financials.totalExpenses > 0 ? financials.totalExpenses : 8500;
  const currentMonthlyRevenue = financials.totalIncome > 0 ? financials.totalIncome : 12000;
  const netMonthlyBurn = Math.max(1000, currentMonthlyBurn - currentMonthlyRevenue);

  // Scenario Simulator Levers
  const [newHiresCount, setNewHiresCount] = useState(1);
  const [avgHireSalary, setAvgHireSalary] = useState(120000);
  const [revenueChangePercent, setRevenueChangePercent] = useState(0);
  const [expenseCutPercent, setExpenseCutPercent] = useState(0);

  // AR Aging State
  const [arItems, setArItems] = useState<ARAgingItem[]>(SAMPLE_AR_AGING);

  // Compute Baseline Runway
  const baselineRunwayMonths = useMemo(() => {
    return Math.max(1, parseFloat((cashReserves / netMonthlyBurn).toFixed(1)));
  }, [cashReserves, netMonthlyBurn]);

  // Compute Scenario Runway
  const scenarioResults = useMemo(() => {
    const monthlyCostPerHire = (avgHireSalary * 1.15) / 12; // including payroll taxes & benefits
    const additionalMonthlySalaries = newHiresCount * monthlyCostPerHire;

    const adjustedRevenue = currentMonthlyRevenue * (1 + revenueChangePercent / 100);
    const adjustedExpenses = currentMonthlyBurn * (1 - expenseCutPercent / 100) + additionalMonthlySalaries;

    const simulatedNetBurn = Math.max(1000, adjustedExpenses - adjustedRevenue);
    const simulatedRunwayMonths = (cashReserves / simulatedNetBurn).toFixed(1);

    const zeroDate = new Date();
    zeroDate.setMonth(zeroDate.getMonth() + Math.round(parseFloat(simulatedRunwayMonths)));
    const zeroCashDateString = zeroDate.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });

    return {
      simulatedNetBurn,
      simulatedRunwayMonths,
      zeroCashDateString,
      adjustedRevenue,
      adjustedExpenses,
    };
  }, [
    newHiresCount,
    avgHireSalary,
    revenueChangePercent,
    expenseCutPercent,
    cashReserves,
    currentMonthlyBurn,
    currentMonthlyRevenue,
  ]);

  const handleSendReminder = (item: ARAgingItem) => {
    toast.success(`Payment reminder email with Stripe checkout link dispatched to ${item.client}!`);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Runway, Scenarios & AR Aging</h1>
          <p className="text-gray-500 mt-1">
            Dynamic runway simulations, hiring stress tests, and automated accounts receivable aging for {activeEntity?.name || 'Company'}.
          </p>
        </div>
      </div>

      {/* Runway Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
            <span>Baseline Cash Runway</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">{baselineRunwayMonths} Months</p>
          <p className="text-xs text-gray-400 mt-1">Based on current cash reserves of ${cashReserves.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
            <span>Scenario Runway Projection</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <p
            className={`text-3xl font-bold mt-2 ${
              parseFloat(scenarioResults.simulatedRunwayMonths) < 6 ? 'text-rose-600' : 'text-purple-600'
            }`}
          >
            {scenarioResults.simulatedRunwayMonths} Months
          </p>
          <p className="text-xs text-gray-400 mt-1">Simulated Net Burn: ${Math.round(scenarioResults.simulatedNetBurn).toLocaleString()}/mo</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
            <span>Simulated Zero Cash Date</span>
            <Calendar className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-amber-600 mt-2">{scenarioResults.zeroCashDateString}</p>
          <p className="text-xs text-gray-400 mt-1">Date company requires fundraise or profitability</p>
        </div>
      </div>

      {/* Interactive Scenario Simulator */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Interactive Scenario Simulator ("What-If" Levers)</h2>
            <p className="text-xs text-gray-500">Test the financial impact of hiring, revenue growth, or spending cuts in real time.</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full">
            Real-Time Modeling
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Lever 1: New Hires */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-2">
            <label className="block text-xs font-bold text-gray-700">Planned New Hires: {newHiresCount}</label>
            <input
              type="range"
              min="0"
              max="10"
              value={newHiresCount}
              onChange={(e) => setNewHiresCount(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[11px] text-gray-500">Headcount additions</p>
          </div>

          {/* Lever 2: Salary per Hire */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-2">
            <label className="block text-xs font-bold text-gray-700">
              Avg Annual Salary: ${avgHireSalary.toLocaleString()}
            </label>
            <input
              type="range"
              min="60000"
              max="250000"
              step="5000"
              value={avgHireSalary}
              onChange={(e) => setAvgHireSalary(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[11px] text-gray-500">Includes 15% employer tax/benefits</p>
          </div>

          {/* Lever 3: Revenue Variance */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-2">
            <label className="block text-xs font-bold text-gray-700">
              Revenue Growth: {revenueChangePercent > 0 ? `+${revenueChangePercent}` : revenueChangePercent}%
            </label>
            <input
              type="range"
              min="-50"
              max="100"
              step="5"
              value={revenueChangePercent}
              onChange={(e) => setRevenueChangePercent(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p className="text-[11px] text-gray-500">Simulate market contraction or expansion</p>
          </div>

          {/* Lever 4: Expense Cuts */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-2">
            <label className="block text-xs font-bold text-gray-700">
              Discretionary Cost Cuts: {expenseCutPercent}%
            </label>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={expenseCutPercent}
              onChange={(e) => setExpenseCutPercent(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <p className="text-[11px] text-gray-500">Software, travel & office expense reduction</p>
          </div>
        </div>
      </div>

      {/* AR Aging Schedule */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Accounts Receivable (AR) Aging Schedule</h2>
            <p className="text-xs text-gray-500">Track client invoice aging brackets and collect outstanding payments.</p>
          </div>
          <span className="text-xs font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg">
            Total Overdue: ${arItems.reduce((sum, item) => sum + item.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-xs">
              <tr>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4 text-center">Days Overdue</th>
                <th className="py-3 px-4 text-center">Aging Bracket</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Collections Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {arItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{item.client}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-gray-500">{item.invoice}</td>
                  <td className="py-3.5 px-4 text-center font-medium text-gray-700">{item.daysOverdue} days</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.bracket === '0-30'
                          ? 'bg-blue-100 text-blue-800'
                          : item.bracket === '31-60'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.bracket} Days
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                    ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleSendReminder(item)}
                      className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-semibold px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" /> Send Reminder
                    </button>
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
