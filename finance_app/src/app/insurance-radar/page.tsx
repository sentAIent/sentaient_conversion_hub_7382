'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  Building2,
  Calendar,
  DollarSign,
  Download,
  CheckCircle2,
  Lock,
  Plus,
  ArrowUpRight,
  Info
} from 'lucide-react';

interface InsurancePolicy {
  id: string;
  policyType: 'Directors & Officers (D&O)' | 'Cyber Liability & Data Breach' | 'Key Person Life Insurance' | 'Errors & Omissions (E&O)' | 'Commercial General Liability (CGL)' | 'Employment Practices (EPLI)';
  carrier: string;
  policyNumber: string;
  coverageLimit: number;
  deductible: number;
  annualPremium: number;
  effectiveDate: string;
  expirationDate: string;
  daysRemaining: number;
  status: 'Active' | 'Renewal Required' | 'Covenant Attention';
  mandatedBy: string;
}

interface CustomerMsaRequirement {
  id: string;
  customerName: string;
  contractTier: 'Fortune 50 Enterprise' | 'Tier 1 Strategic' | 'Growth Enterprise';
  requiredCyber: number;
  requiredEAndO: number;
  currentCompliance: 'Fully Compliant' | 'Cyber Gap Flagged';
}

export default function InsuranceRadarPage() {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([
    {
      id: 'pol-01',
      policyType: 'Directors & Officers (D&O)',
      carrier: 'Travelers Casualty and Surety',
      policyNumber: 'TRV-DO-2026-9912',
      coverageLimit: 3000000,
      deductible: 25000,
      annualPremium: 14200,
      effectiveDate: 'Feb 15, 2026',
      expirationDate: 'Feb 15, 2027',
      daysRemaining: 97,
      status: 'Active',
      mandatedBy: 'Series A Board Governance & NVCA Charter'
    },
    {
      id: 'pol-02',
      policyType: 'Cyber Liability & Data Breach',
      carrier: 'Chubb Insurance Group',
      policyNumber: 'CHB-CYB-8831',
      coverageLimit: 5000000,
      deductible: 50000,
      annualPremium: 22500,
      effectiveDate: 'Apr 01, 2026',
      expirationDate: 'Apr 01, 2027',
      daysRemaining: 142,
      status: 'Active',
      mandatedBy: 'SOC 2 Type II & Fortune 500 Vendor Master Agreements'
    },
    {
      id: 'pol-03',
      policyType: 'Key Person Life Insurance',
      carrier: 'Prudential Financial',
      policyNumber: 'PRU-KP-4401',
      coverageLimit: 5000000,
      deductible: 0,
      annualPremium: 8400,
      effectiveDate: 'Dec 01, 2025',
      expirationDate: 'Dec 01, 2026',
      daysRemaining: 21,
      status: 'Renewal Required',
      mandatedBy: 'Silicon Valley Venture Debt Facility Covenant'
    },
    {
      id: 'pol-04',
      policyType: 'Errors & Omissions (E&O)',
      carrier: 'Hiscox Insurance',
      policyNumber: 'HIS-EO-7192',
      coverageLimit: 3000000,
      deductible: 15000,
      annualPremium: 11800,
      effectiveDate: 'Mar 15, 2026',
      expirationDate: 'Mar 15, 2027',
      daysRemaining: 125,
      status: 'Active',
      mandatedBy: 'Enterprise SaaS Customer MSAs'
    },
    {
      id: 'pol-05',
      policyType: 'Employment Practices (EPLI)',
      carrier: 'Hartford Fire Insurance',
      policyNumber: 'HFD-EPL-1109',
      coverageLimit: 1000000,
      deductible: 25000,
      annualPremium: 7200,
      effectiveDate: 'Jun 01, 2026',
      expirationDate: 'Jun 01, 2027',
      daysRemaining: 203,
      status: 'Active',
      mandatedBy: 'Corporate HR Risk Management'
    }
  ]);

  const customerMsaRequirements: CustomerMsaRequirement[] = [
    {
      id: 'msa-01',
      customerName: 'JPMorgan Chase & Co.',
      contractTier: 'Fortune 50 Enterprise',
      requiredCyber: 10000000, // Requires $10M cyber, current policy is $5M!
      requiredEAndO: 3000000,
      currentCompliance: 'Cyber Gap Flagged'
    },
    {
      id: 'msa-02',
      customerName: 'Salesforce, Inc.',
      contractTier: 'Tier 1 Strategic',
      requiredCyber: 5000000,
      requiredEAndO: 3000000,
      currentCompliance: 'Fully Compliant'
    },
    {
      id: 'msa-03',
      customerName: 'Stripe, Inc.',
      contractTier: 'Tier 1 Strategic',
      requiredCyber: 5000000,
      requiredEAndO: 2000000,
      currentCompliance: 'Fully Compliant'
    }
  ];

  const totalCoverage = policies.reduce((sum, p) => sum + p.coverageLimit, 0);
  const totalAnnualPremium = policies.reduce((sum, p) => sum + p.annualPremium, 0);
  const upcomingRenewalsCount = policies.filter(p => p.daysRemaining <= 60).length;

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
            <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl border border-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Corporate Insurance & D&O Coverage Radar
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Monitors mandatory venture policies, D&O indemnification, Key Person debt covenants, and customer MSA contractual limits.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Generating standardized ACORD 25 Certificate of Insurance (COI) PDF...')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-card hover:bg-muted/80 text-foreground border border-border rounded-lg shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Generate COI (ACORD 25)
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Total Insured Limits</span>
            <Lock className="w-4 h-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {formatCurrency(totalCoverage)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Across 5 core enterprise liability policies
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Annual Insurance Premium</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {formatCurrency(totalAnnualPremium)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {formatCurrency(totalAnnualPremium / 12)}/mo amortized OPEX
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Upcoming Expirations (&lt;60d)</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-amber-500">
            {upcomingRenewalsCount} Policy
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Key Person Life expires in 21 days
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground text-xs uppercase tracking-wider font-semibold">
            <span>Enterprise MSA Compliance</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-rose-500">
            1 Gap Flagged
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            JPMorgan requires $10M Cyber Liability
          </div>
        </div>
      </div>

      {/* Customer MSA Contractual Gap Audit Banner */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">
              Customer MSA Insurance Covenant Compliance Audit
            </h2>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Flags contractual indemnity breach risk across active customer Master Service Agreements
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {customerMsaRequirements.map((msa) => (
            <div
              key={msa.id}
              className={`p-4 rounded-xl border space-y-2 transition-all ${
                msa.currentCompliance === 'Cyber Gap Flagged'
                  ? 'bg-rose-500/5 border-rose-500/30'
                  : 'bg-muted/30 border-border'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground text-sm">{msa.customerName}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-medium border ${
                    msa.currentCompliance === 'Cyber Gap Flagged'
                      ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 font-bold'
                      : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  }`}
                >
                  {msa.currentCompliance}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{msa.contractTier}</p>
              <div className="pt-2 border-t border-border/50 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mandated Cyber:</span>
                  <span className="font-mono font-medium text-foreground">{formatCurrency(msa.requiredCyber)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Cyber Limit:</span>
                  <span className="font-mono font-medium text-foreground">$5,000,000</span>
                </div>
              </div>
              {msa.currentCompliance === 'Cyber Gap Flagged' && (
                <p className="text-[11px] text-rose-500 font-medium pt-1">
                  &bull; Contract requires $10M excess umbrella endorsement before Dec 31 audit.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Policies Registry Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Active Insurance Policies Registry</h3>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Carrier Underwriting & Governance Mandates
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">Policy & Carrier</th>
                <th className="px-6 py-3.5">Governance / Covenant Mandate</th>
                <th className="px-6 py-3.5 text-right">Coverage Limit</th>
                <th className="px-6 py-3.5 text-right">Deductible</th>
                <th className="px-6 py-3.5 text-right">Annual Premium</th>
                <th className="px-6 py-3.5 text-center">Days to Expiration</th>
                <th className="px-6 py-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {policies.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{p.policyType}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {p.carrier} &bull; {p.policyNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground max-w-xs">
                    {p.mandatedBy}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-foreground">
                    {formatCurrency(p.coverageLimit)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                    {formatCurrency(p.deductible)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-foreground">
                    {formatCurrency(p.annualPremium)}
                  </td>
                  <td className="px-6 py-4 text-center font-mono text-xs">
                    <span className={p.daysRemaining <= 30 ? 'text-amber-500 font-bold' : 'text-foreground'}>
                      {p.daysRemaining} days ({p.expirationDate})
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                        p.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20 font-bold'
                      }`}
                    >
                      {p.status}
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
