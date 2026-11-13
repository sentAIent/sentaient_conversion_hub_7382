'use client';

import React, { useState } from 'react';
import {
  PieChart,
  ShieldAlert,
  AlertTriangle,
  Building,
  TrendingDown,
  Server,
  Cloud,
  CheckCircle2,
  DollarSign,
  Activity,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';

interface CustomerAccount {
  id: string;
  name: string;
  annualContractValue: number;
  percentageOfArr: number;
  industry: string;
  contractRenewal: string;
  isSecFlagged: boolean; // >10% of total ARR
}

interface CriticalVendor {
  id: string;
  vendorName: string;
  serviceCategory: string;
  monthlySpend: number;
  dependencyLevel: 'Extreme (Single Point of Failure)' | 'High' | 'Moderate';
  redundancyPlan: string;
}

export default function ConcentrationRiskPage() {
  const totalArr = 4200000; // $4.2M ARR
  const currentCashReserves = 4500000; // $4.5M cash
  const baseMonthlyBurn = 185000; // $185k/mo burn

  const [stressScenario, setStressScenario] = useState<'BASE' | 'TOP_1' | 'TOP_3'>('BASE');

  // Customer Concentration Data
  const customers: CustomerAccount[] = [
    {
      id: 'cust-01',
      name: 'Apex Global Logistics Corp',
      annualContractValue: 720000,
      percentageOfArr: 17.14, // >10% SEC threshold!
      industry: 'Supply Chain Logistics',
      contractRenewal: 'Oct 2027',
      isSecFlagged: true
    },
    {
      id: 'cust-02',
      name: 'Vanguard Biometric Intelligence',
      annualContractValue: 510000,
      percentageOfArr: 12.14, // >10% SEC threshold!
      industry: 'Defense & Biometrics',
      contractRenewal: 'Jan 2027',
      isSecFlagged: true
    },
    {
      id: 'cust-03',
      name: 'HyperScale Cloud Solutions',
      annualContractValue: 410000,
      percentageOfArr: 9.76,
      industry: 'Enterprise Infrastructure',
      contractRenewal: 'Mar 2027',
      isSecFlagged: false
    },
    {
      id: 'cust-04',
      name: 'Synapse Healthcare Systems',
      annualContractValue: 340000,
      percentageOfArr: 8.1,
      industry: 'Digital Health',
      contractRenewal: 'Jun 2027',
      isSecFlagged: false
    },
    {
      id: 'cust-05',
      name: 'Quantix AI Labs, Inc.',
      annualContractValue: 280000,
      percentageOfArr: 6.67,
      industry: 'Autonomous Systems',
      contractRenewal: 'Aug 2027',
      isSecFlagged: false
    }
  ];

  // Critical Upstream Vendors (SPOF Analysis)
  const criticalVendors: CriticalVendor[] = [
    {
      id: 'v-01',
      vendorName: 'Amazon Web Services (AWS)',
      serviceCategory: 'Core Multi-AZ Cloud Hosting & S3',
      monthlySpend: 42000,
      dependencyLevel: 'Extreme (Single Point of Failure)',
      redundancyPlan: 'Secondary warm replica deployed on GCP us-central1'
    },
    {
      id: 'v-02',
      vendorName: 'Stripe, Inc.',
      serviceCategory: 'Global Merchant Processing & ACH',
      monthlySpend: 14500,
      dependencyLevel: 'Extreme (Single Point of Failure)',
      redundancyPlan: 'Adyen secondary merchant processor integrated for failover'
    },
    {
      id: 'v-03',
      vendorName: 'OpenAI API Platform',
      serviceCategory: 'Fine-Tuned LLM Inference Core',
      monthlySpend: 28000,
      dependencyLevel: 'High',
      redundancyPlan: 'Self-hosted open-weights fallback on NVIDIA DGX cluster'
    }
  ];

  // Herfindahl-Hirschman Index (HHI) calculation:
  // Sum of squares of market shares: e.g. 17.14^2 + 12.14^2 + ...
  const top5HHI = Math.round(
    customers.reduce((sum, c) => sum + Math.pow(c.percentageOfArr, 2), 0)
  );

  const top1Concentration = customers[0].percentageOfArr;
  const top5Concentration = customers.reduce((sum, c) => sum + c.percentageOfArr, 0);

  // Dynamic Churn Scenario Calculations:
  let lostArr = 0;
  let scenarioLabel = 'Normal Operating Baseline';

  if (stressScenario === 'TOP_1') {
    lostArr = 720000;
    scenarioLabel = 'Immediate Loss of #1 Client (Apex Global - $720k)';
  } else if (stressScenario === 'TOP_3') {
    lostArr = 720000 + 510000 + 410000; // $1,640,000
    scenarioLabel = 'Catastrophic Loss of Top 3 Clients (-$1.64M ARR)';
  }

  const effectiveArr = totalArr - lostArr;
  const monthlyRevenueLoss = lostArr / 12;
  const stressedMonthlyBurn = baseMonthlyBurn + monthlyRevenueLoss;
  const stressedRunwayMonths = (currentCashReserves / stressedMonthlyBurn).toFixed(1);

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
            <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Customer & Vendor Concentration Risk Stress-Tester
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                SEC &gt;10% disclosure audits, Herfindahl-Hirschman Index (HHI) concentration scoring, and black-swan churn runway stress simulation.
              </p>
            </div>
          </div>
        </div>

        {/* Scenario Switcher Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStressScenario('BASE')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              stressScenario === 'BASE'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card border-border text-muted-foreground hover:bg-muted'
            }`}
          >
            Base Case
          </button>
          <button
            onClick={() => setStressScenario('TOP_1')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              stressScenario === 'TOP_1'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-card border-border text-muted-foreground hover:bg-muted'
            }`}
          >
            Stress: Lose Top 1
          </button>
          <button
            onClick={() => setStressScenario('TOP_3')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              stressScenario === 'TOP_3'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-card border-border text-muted-foreground hover:bg-muted'
            }`}
          >
            Stress: Lose Top 3
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>SEC &gt;10% Disclosures</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-amber-500">
            2 Accounts
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Apex Global (17.1%) &bull; Vanguard (12.1%)
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Top 5 Concentration</span>
            <PieChart className="w-4 h-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {top5Concentration.toFixed(1)}%
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Top 1 accounts for {top1Concentration.toFixed(1)}% of ARR
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Herfindahl Index (HHI)</span>
            <Activity className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-purple-500">
            {top5HHI}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Moderate concentration index (&lt;1500 = unconcentrated)
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Stressed Runway</span>
            <TrendingDown className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-rose-500">
            {stressedRunwayMonths} Months
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {stressScenario === 'BASE' ? '24.3m base runway' : `${scenarioLabel}`}
          </div>
        </div>
      </div>

      {/* Stress Test Simulation Box */}
      {stressScenario !== 'BASE' && (
        <div className="p-5 bg-rose-500/10 border border-rose-500/30 rounded-xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <h3 className="font-semibold text-foreground text-sm">
                Active Black-Swan Stress Scenario: {scenarioLabel}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-rose-500">
              Lost Revenue: -{formatCurrency(lostArr)}/yr (-{formatCurrency(monthlyRevenueLoss)}/mo)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-3 bg-card border border-border rounded-lg">
              <span className="text-muted-foreground">Post-Shock Effective ARR:</span>
              <p className="text-lg font-mono font-bold text-foreground mt-1">{formatCurrency(effectiveArr)}</p>
            </div>
            <div className="p-3 bg-card border border-border rounded-lg">
              <span className="text-muted-foreground">New Monthly Net Cash Burn:</span>
              <p className="text-lg font-mono font-bold text-rose-500 mt-1">{formatCurrency(stressedMonthlyBurn)}/mo</p>
            </div>
            <div className="p-3 bg-card border border-border rounded-lg">
              <span className="text-muted-foreground">Emergency OPEX Cut to Neutralize:</span>
              <p className="text-lg font-mono font-bold text-amber-500 mt-1">-{formatCurrency(monthlyRevenueLoss)}/mo</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Accounts Concentration Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Top Customer Portfolio Concentration</h3>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            SEC Regulation S-K mandates audit disclosure for any customer &gt;10% of revenue
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">Customer & Industry</th>
                <th className="px-6 py-3.5 text-right">Annual Contract (ACV)</th>
                <th className="px-6 py-3.5 text-right">% of Total ARR</th>
                <th className="px-6 py-3.5">Renewal Horizon</th>
                <th className="px-6 py-3.5 text-center">SEC Material Risk Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.industry}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-foreground">
                    {formatCurrency(c.annualContractValue)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-semibold">
                    <span className={c.isSecFlagged ? 'text-amber-500' : 'text-foreground'}>
                      {c.percentageOfArr.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-muted-foreground">
                    {c.contractRenewal}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {c.isSecFlagged ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        &gt;10% SEC Disclosure
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Within Safe Bounds
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical Infrastructure Supplier Single Points of Failure */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Critical Upstream Supplier SPOF Audit</h3>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Audits operational lock-in and disaster recovery contingency plans
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">Vendor & Service</th>
                <th className="px-6 py-3.5 text-right">Monthly Spend</th>
                <th className="px-6 py-3.5">Dependency Severity</th>
                <th className="px-6 py-3.5">Business Continuity / Failover Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {criticalVendors.map((v) => (
                <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{v.vendorName}</div>
                    <div className="text-xs text-muted-foreground">{v.serviceCategory}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-foreground">
                    {formatCurrency(v.monthlySpend)}/mo
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                        v.dependencyLevel.includes('Extreme')
                          ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 font-semibold'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}
                    >
                      {v.dependencyLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">
                    {v.redundancyPlan}
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
