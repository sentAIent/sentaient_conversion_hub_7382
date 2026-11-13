'use client';

import React, { useState } from 'react';
import {
  Layers,
  Code2,
  HardDrive,
  Calculator,
  Calendar,
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Download,
  Info
} from 'lucide-react';

interface AssetRecord {
  id: string;
  name: string;
  category: 'Capitalized Software (ASC 350-40)' | 'IT Hardware' | 'Server & GPU Infrastructure' | 'Leasehold Improvements';
  acquisitionDate: string;
  originalCost: number;
  usefulLifeMonths: number;
  accumulatedDepreciation: number;
  netBookValue: number;
  monthlyDepreciation: number;
  taxMethod: 'MACRS 5-Year' | 'Section 179 Expensed' | 'Straight-Line 36M';
  status: 'In Service' | 'Fully Depreciated' | 'Disposed';
}

export default function FixedAssetsPage() {
  // Software engineering capitalization assumptions
  const [totalEngWagesMonthly, setTotalEngWagesMonthly] = useState<number>(145000); // $145k/mo eng payroll
  const [devSprintCapitalizationPct, setDevSprintCapitalizationPct] = useState<number>(65.0); // 65% app dev phase
  const [usefulLifeMonths, setUsefulLifeMonths] = useState<number>(36); // 36 months straight-line

  // Fixed Asset Register
  const [assets, setAssets] = useState<AssetRecord[]>([
    {
      id: 'ast-01',
      name: 'Proprietary Core Autonomous Accounting Engine (v2.0)',
      category: 'Capitalized Software (ASC 350-40)',
      acquisitionDate: 'Jan 15, 2026',
      originalCost: 485000,
      usefulLifeMonths: 36,
      accumulatedDepreciation: 134720,
      netBookValue: 350280,
      monthlyDepreciation: 13472,
      taxMethod: 'Straight-Line 36M',
      status: 'In Service'
    },
    {
      id: 'ast-02',
      name: 'NVIDIA DGX Station & On-Premise GPU Dev Cluster',
      category: 'Server & GPU Infrastructure',
      acquisitionDate: 'Mar 10, 2026',
      originalCost: 120000,
      usefulLifeMonths: 60,
      accumulatedDepreciation: 16000,
      netBookValue: 104000,
      monthlyDepreciation: 2000,
      taxMethod: 'MACRS 5-Year',
      status: 'In Service'
    },
    {
      id: 'ast-03',
      name: 'Engineering Fleet MacBook Pro M3 Max (32 units)',
      category: 'IT Hardware',
      acquisitionDate: 'Apr 01, 2026',
      originalCost: 112000,
      usefulLifeMonths: 36,
      accumulatedDepreciation: 21776,
      netBookValue: 90224,
      monthlyDepreciation: 3111,
      taxMethod: 'Section 179 Expensed',
      status: 'In Service'
    },
    {
      id: 'ast-04',
      name: 'San Francisco HQ Acoustic Pods & Soundproofing',
      category: 'Leasehold Improvements',
      acquisitionDate: 'Feb 12, 2026',
      originalCost: 65000,
      usefulLifeMonths: 60,
      accumulatedDepreciation: 9750,
      netBookValue: 55250,
      monthlyDepreciation: 1083,
      taxMethod: 'Straight-Line 36M',
      status: 'In Service'
    }
  ]);

  // Derived ASC 350-40 monthly capitalization metrics:
  const monthlyCapitalizedRAndD = (totalEngWagesMonthly * devSprintCapitalizationPct) / 100;
  const monthlyExpensedRAndD = totalEngWagesMonthly - monthlyCapitalizedRAndD;
  const annualEbitdaBoost = monthlyCapitalizedRAndD * 12;

  const totalOriginalCost = assets.reduce((sum, a) => sum + a.originalCost, 0);
  const totalAccumulatedDepreciation = assets.reduce((sum, a) => sum + a.accumulatedDepreciation, 0);
  const totalNetBookValue = assets.reduce((sum, a) => sum + a.netBookValue, 0);
  const totalMonthlyDepreciation = assets.reduce((sum, a) => sum + a.monthlyDepreciation, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Capitalized Software & Fixed Asset Depreciation (ASC 350-40)
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                GAAP internal-use software capitalization, straight-line book depreciation, and IRS Section 179 / MACRS accelerated tax schedules.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting GAAP Fixed Asset & Amortization Roll-Forward Schedule to Excel...')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-card hover:bg-muted/80 text-foreground border border-border rounded-lg shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Export Roll-Forward
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Total Net Book Value (NBV)</span>
            <DollarSign className="w-4 h-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {formatCurrency(totalNetBookValue)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Original Cost: {formatCurrency(totalOriginalCost)}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Monthly Depreciation / Amort.</span>
            <Calculator className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-500">
            {formatCurrency(totalMonthlyDepreciation)}/mo
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            GAAP non-cash P&L amortization charge
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>ASC 350-40 Capitalized Software</span>
            <Code2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-blue-500">
            {formatCurrency(monthlyCapitalizedRAndD)}/mo
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {devSprintCapitalizationPct}% of eng sprint time capitalized
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Annualized EBITDA Boost</span>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-purple-500">
            +{formatCurrency(annualEbitdaBoost)}
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-medium">
            Reduces reported OPEX burn under GAAP
          </div>
        </div>
      </div>

      {/* ASC 350-40 Software Capitalization Controls */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-base font-semibold text-foreground">
                ASC 350-40 Internal-Use Software Capitalization Policy
              </h2>
              <p className="text-xs text-muted-foreground">
                Allocates engineering payroll between preliminary research (expensed) and application development (capitalized to Balance Sheet).
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            GAAP Compliant
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground uppercase font-medium">Application Dev Phase: {devSprintCapitalizationPct}%</span>
              <span className="font-mono font-bold text-foreground">{formatCurrency(monthlyCapitalizedRAndD)}/mo</span>
            </div>
            <input
              type="range"
              min={30}
              max={85}
              step={5}
              value={devSprintCapitalizationPct}
              onChange={(e) => setDevSprintCapitalizationPct(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-xs text-muted-foreground">
              Coding core architecture, feature development & integrations. Capitalized to Intangible Assets.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground uppercase font-medium">Preliminary & Maintenance Phase: {(100 - devSprintCapitalizationPct)}%</span>
              <span className="font-mono font-bold text-foreground">{formatCurrency(monthlyExpensedRAndD)}/mo</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-lg overflow-hidden flex">
              <div
                className="bg-primary transition-all duration-300"
                style={{ width: `${devSprintCapitalizationPct}%` }}
              />
              <div
                className="bg-amber-500 transition-all duration-300"
                style={{ width: `${100 - devSprintCapitalizationPct}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Feasibility studies, bug fixes, routine maintenance & DevOps. Expensed immediately in OPEX.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground uppercase font-medium">Monthly Engineering Payroll</span>
              <span className="font-mono font-bold text-foreground">{formatCurrency(totalEngWagesMonthly)}</span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground text-sm">$</span>
              <input
                type="number"
                value={totalEngWagesMonthly}
                onChange={(e) => setTotalEngWagesMonthly(Number(e.target.value))}
                className="w-full pl-7 pr-3 py-1.5 bg-background border border-border rounded-lg text-sm font-mono text-foreground"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Direct developer wages, bonuses, and employer payroll taxes.
            </p>
          </div>
        </div>
      </div>

      {/* Asset Registry Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Fixed & Intangible Asset Register</h3>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Dual GAAP Book & Tax Depreciation Methods
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">Asset Description & Category</th>
                <th className="px-6 py-3.5">Acquisition Date</th>
                <th className="px-6 py-3.5 text-right">Original Cost</th>
                <th className="px-6 py-3.5 text-right">Accumulated Depr.</th>
                <th className="px-6 py-3.5 text-right">Net Book Value (NBV)</th>
                <th className="px-6 py-3.5 text-right">Monthly Depr.</th>
                <th className="px-6 py-3.5">Tax Method</th>
                <th className="px-6 py-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {assets.map((ast) => (
                <tr key={ast.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{ast.name}</div>
                    <div className="text-xs text-muted-foreground">{ast.category} &bull; {ast.usefulLifeMonths}m Useful Life</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {ast.acquisitionDate}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-foreground">
                    {formatCurrency(ast.originalCost)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                    {formatCurrency(ast.accumulatedDepreciation)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-emerald-500">
                    {formatCurrency(ast.netBookValue)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-foreground">
                    {formatCurrency(ast.monthlyDepreciation)}/mo
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-muted text-foreground border border-border">
                      {ast.taxMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {ast.status}
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
