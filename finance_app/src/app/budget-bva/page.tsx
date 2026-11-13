"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  PieChart,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Download,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Building2,
} from 'lucide-react';

interface DepartmentBudget {
  id: string;
  department: string;
  lead: string;
  monthlyBudget: number;
  monthlyActual: number;
  ytdBudget: number;
  ytdActual: number;
  headcount: number;
}

export default function BudgetBvAPage() {
  const [departments, setDepartments] = useState<DepartmentBudget[]>([
    {
      id: 'd1',
      department: 'Engineering & Infrastructure',
      lead: 'Alex Rivera (VP Eng)',
      monthlyBudget: 75000,
      monthlyActual: 82400, // +$7,400 over budget (Cloud spike)
      ytdBudget: 225000,
      ytdActual: 236200,
      headcount: 8,
    },
    {
      id: 'd2',
      department: 'Sales & Growth Marketing',
      lead: 'Jordan Hayes (VP Growth)',
      monthlyBudget: 35000,
      monthlyActual: 31200, // -$3,800 favorable variance
      ytdBudget: 105000,
      ytdActual: 98400,
      headcount: 3,
    },
    {
      id: 'd3',
      department: 'Product & Design Prototyping',
      lead: 'Elena Rostova (Head of Product)',
      monthlyBudget: 22000,
      monthlyActual: 21800, // on plan
      ytdBudget: 66000,
      ytdActual: 65100,
      headcount: 2,
    },
    {
      id: 'd4',
      department: 'General & Administrative (G&A)',
      lead: 'Finance Operations',
      monthlyBudget: 18000,
      monthlyActual: 16500, // favorable
      ytdBudget: 54000,
      ytdActual: 51200,
      headcount: 2,
    },
  ]);

  const totalMonthlyBudget = departments.reduce((sum, d) => sum + d.monthlyBudget, 0);
  const totalMonthlyActual = departments.reduce((sum, d) => sum + d.monthlyActual, 0);
  const netMonthlyVariance = totalMonthlyActual - totalMonthlyBudget; // Positive = Over budget
  const netVariancePct = (netMonthlyVariance / totalMonthlyBudget) * 100;

  const handleExportBvAReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Departmental Budget vs. Actuals (BvA) Variance Report\n" +
      "Generated At," + new Date().toISOString() + "\n\n" +
      "Department,Department Lead,Monthly Budget,Monthly Actual,Variance $,Variance %,YTD Budget,YTD Actual,YTD Variance $\n" +
      departments.map(d => {
        const v = d.monthlyActual - d.monthlyBudget;
        const vPct = ((v / d.monthlyBudget) * 100).toFixed(1);
        const ytdV = d.ytdActual - d.ytdBudget;
        return `"${d.department}","${d.lead}",$${d.monthlyBudget},$${d.monthlyActual},$${v},${vPct}%,$${d.ytdBudget},$${d.ytdActual},$${ytdV}`;
      }).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Departmental_Budget_vs_Actuals_BvA_${new Date().getFullYear()}.csv`);
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
              <PieChart size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Departmental Budget vs. Actuals (BvA)</h1>
              <p className="text-sm text-gray-400">
                Mosaic & Cube Alternative • Real-Time Variance Tolerance • Full-Year Run-Rate Re-Forecasting
              </p>
            </div>
          </div>
          <button
            onClick={handleExportBvAReport}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-indigo-600/20"
          >
            <Download size={16} />
            <span>Export BvA Variance Report</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Monthly Plan (Budget)</span>
            <div className="text-2xl font-bold text-white mt-1">
              ${totalMonthlyBudget.toLocaleString()}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Board approved OPEX baseline</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Actual Month Incurred</span>
            <div className="text-2xl font-bold text-white mt-1">
              ${totalMonthlyActual.toLocaleString()}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Live ledger OPEX disbursement</span>
          </div>

          <div className={`bg-gray-900 border p-5 rounded-2xl ${
            netMonthlyVariance > 0 ? 'border-amber-500/30 bg-amber-950/10' : 'border-emerald-500/30 bg-emerald-950/10'
          }`}>
            <span className={`text-xs uppercase font-semibold ${netMonthlyVariance > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              Net Variance ($ / %)
            </span>
            <div className={`text-2xl font-bold mt-1 ${netMonthlyVariance > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {netMonthlyVariance > 0 ? `+$${netMonthlyVariance.toLocaleString()}` : `-$${Math.abs(netMonthlyVariance).toLocaleString()}`}
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              {netVariancePct > 0 ? `+${netVariancePct.toFixed(1)}% over budget` : `${netVariancePct.toFixed(1)}% under budget`}
            </span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Spend Discipline Score</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">96%</span>
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">3 of 4 departments strictly on plan</span>
          </div>
        </div>

        {/* Variance Warning if any */}
        {netMonthlyVariance > 0 && (
          <div className="mt-6 p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl flex items-start space-x-3 text-xs">
            <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-200">Department Overspend Warning:</span>
              <p className="text-amber-300/80 mt-0.5">
                <strong>Engineering & Infrastructure</strong> exceeded monthly plan by +\$7,400.00 (+9.9%) driven by cloud cluster training spikes. Re-baselining this run-rate across the remaining 9 months would reduce year-end cash runway by 0.6 months unless compensated by sales favorable variance.
              </p>
            </div>
          </div>
        )}

        {/* Department BvA Table */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Departmental Spend vs. Approved Budget</h2>
              <p className="text-xs text-gray-400">Monthly and YTD budget allocations, actual run-rates, and variance tolerances</p>
            </div>
            <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full font-medium">
              Tolerance: ±10% Threshold
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-950 uppercase text-gray-400 font-semibold border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Department & Lead</th>
                  <th className="py-3 px-4 text-center">Headcount</th>
                  <th className="py-3 px-4 text-right">Monthly Budget</th>
                  <th className="py-3 px-4 text-right">Monthly Actual</th>
                  <th className="py-3 px-4 text-right">Variance ($ / %)</th>
                  <th className="py-3 px-4 text-right">YTD Actual</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 font-mono">
                {departments.map((d) => {
                  const variance = d.monthlyActual - d.monthlyBudget;
                  const variancePct = (variance / d.monthlyBudget) * 100;
                  const isOver = variance > 0;
                  const isWarning = variancePct > 8;

                  return (
                    <tr key={d.id} className="hover:bg-gray-800/40 transition">
                      <td className="py-3.5 px-4 font-sans font-medium text-white">
                        <div>{d.department}</div>
                        <div className="text-[11px] text-gray-400 font-normal">{d.lead}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center text-gray-400 font-sans">{d.headcount}</td>
                      <td className="py-3.5 px-4 text-right text-gray-300 font-semibold">
                        ${d.monthlyBudget.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right text-white font-bold">
                        ${d.monthlyActual.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className={`font-semibold ${isOver ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {isOver ? `+$${variance.toLocaleString()}` : `-$${Math.abs(variance).toLocaleString()}`}
                          <span className="text-[10px] ml-1">({variancePct > 0 ? `+${variancePct.toFixed(1)}%` : `${variancePct.toFixed(1)}%`})</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-gray-300">
                        ${d.ytdActual.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center font-sans">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                          isWarning ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {isWarning ? 'Over Plan (+9.9%)' : 'On Plan'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
