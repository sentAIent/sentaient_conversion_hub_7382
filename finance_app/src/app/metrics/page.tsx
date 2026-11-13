"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  TrendingUp,
  BarChart3,
  Percent,
  DollarSign,
  Users,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
} from 'lucide-react';

interface CohortRow {
  cohort: string;
  customers: number;
  initialMRR: number;
  month1: number;
  month3: number;
  month6: number;
  month12: number;
}

export default function SaaSMetricsPage() {
  // Institutional SaaS Metrics
  const nrr = 118; // Net Revenue Retention %
  const grr = 96;  // Gross Revenue Retention %
  const cacPaybackMonths = 7.8;
  const magicNumber = 1.28;
  const arrGrowthRate = 42; // % YoY
  const fcfMargin = 16;     // % Free cash flow
  const ruleOf40 = arrGrowthRate + fcfMargin; // 58%

  // Monthly Customer Cohort Matrix
  const [cohorts] = useState<CohortRow[]>([
    { cohort: 'Q1 2025', customers: 24, initialMRR: 18000, month1: 100, month3: 104, month6: 112, month12: 124 },
    { cohort: 'Q2 2025', customers: 31, initialMRR: 24500, month1: 100, month3: 102, month6: 109, month12: 118 },
    { cohort: 'Q3 2025', customers: 38, initialMRR: 32000, month1: 100, month3: 106, month6: 115, month12: 122 },
    { cohort: 'Q4 2025', customers: 46, initialMRR: 41000, month1: 100, month3: 105, month6: 116, month12: 120 },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <TrendingUp size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">SaaS Cohort Analytics & NRR Engine</h1>
              <p className="text-sm text-gray-400">
                ChartMogul & Baremetrics Alternative • Net Revenue Retention • Rule of 40 • CAC Payback
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-gray-400">Rule of 40 Score:</span>
            <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              {ruleOf40}% (Target: &gt;40%)
            </span>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-emerald-500/20 bg-emerald-950/10 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 uppercase font-semibold">Net Revenue Retention (NRR)</span>
              <ArrowUpRight size={16} className="text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400 mt-1">{nrr}%</div>
            <span className="text-[11px] text-emerald-300/80 mt-1 block">+22% expansion offset -4% churn</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 uppercase font-semibold">Gross Retention (GRR)</span>
              <Percent size={16} className="text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-white mt-1">{grr}%</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Baseline logo & contract stability</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-400 uppercase font-semibold">CAC Payback Period</span>
              <BarChart3 size={16} className="text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-400 mt-1">{cacPaybackMonths} mo</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Rapid capital recirculation</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-400 uppercase font-semibold">SaaS Magic Number</span>
              <TrendingUp size={16} className="text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-400 mt-1">{magicNumber}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">&gt; 1.0 indicates highly efficient S&M</span>
          </div>
        </div>

        {/* Rule of 40 Scorecard Banner */}
        <div className="mt-6 bg-gray-900 border border-gray-800 p-5 rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={18} className="text-emerald-400" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
                  Institutional Rule of 40 Scorecard
                </h2>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                The benchmark gold-standard used by Tier 1 venture funds and institutional public markets to evaluate capital efficiency.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-xs font-mono">
              <div>
                <span className="text-gray-400 text-[10px] uppercase block">ARR Growth</span>
                <span className="text-white font-bold text-base">+{arrGrowthRate}%</span>
              </div>
              <span className="text-gray-600 font-bold text-base">+</span>
              <div>
                <span className="text-gray-400 text-[10px] uppercase block">FCF Margin</span>
                <span className="text-white font-bold text-base">+{fcfMargin}%</span>
              </div>
              <span className="text-gray-600 font-bold text-base">=</span>
              <div>
                <span className="text-emerald-400 text-[10px] uppercase block">Score</span>
                <span className="text-emerald-400 font-bold text-base">{ruleOf40}% (Elite)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cohort Retention Decay Matrix */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Net Dollar Retention (NDR) by Customer Cohort</h2>
              <p className="text-xs text-gray-400">Historical expansion decay curves tracking expansion vs. contraction over time</p>
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-medium">
              Net Expansion across all cohorts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-950 uppercase text-gray-400 font-semibold border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Cohort</th>
                  <th className="py-3 px-4 text-center">Customers</th>
                  <th className="py-3 px-4 text-right">Starting MRR</th>
                  <th className="py-3 px-4 text-center">Month 1</th>
                  <th className="py-3 px-4 text-center">Month 3</th>
                  <th className="py-3 px-4 text-center">Month 6</th>
                  <th className="py-3 px-4 text-center">Month 12</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 font-mono">
                {cohorts.map((row) => (
                  <tr key={row.cohort} className="hover:bg-gray-800/40 transition">
                    <td className="py-3.5 px-4 font-sans font-medium text-white">{row.cohort}</td>
                    <td className="py-3.5 px-4 text-center text-gray-400">{row.customers}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-white">
                      ${row.initialMRR.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center bg-gray-850/60 font-semibold text-gray-300">
                      {row.month1}%
                    </td>
                    <td className="py-3.5 px-4 text-center bg-emerald-950/20 text-emerald-400 font-semibold">
                      {row.month3}%
                    </td>
                    <td className="py-3.5 px-4 text-center bg-emerald-950/30 text-emerald-400 font-bold">
                      {row.month6}%
                    </td>
                    <td className="py-3.5 px-4 text-center bg-emerald-950/40 text-emerald-300 font-extrabold">
                      {row.month12}%
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
