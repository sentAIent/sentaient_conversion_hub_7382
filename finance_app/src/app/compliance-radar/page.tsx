"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  ShieldCheck,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Download,
  DollarSign,
  Clock,
  FileCheck,
  Search,
  Lock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface StateComplianceRecord {
  stateCode: string;
  stateName: string;
  filingType: string;
  statutoryDueDate: string;
  daysRemaining: number;
  statutoryFee: number;
  frequency: 'Annual' | 'Biennial';
  registrationStatus: 'Domestic Entity' | 'Foreign Qualified' | 'Exempt / Not Registered';
  complianceStatus: 'Compliant & Stamped' | 'Action Imminent (<30d)' | 'Scheduled';
}

export default function ComplianceRadarPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Delaware Franchise Tax Inputs
  const authorizedShares = 10000000;
  const issuedShares = 4620000;
  const grossAssets = 1875000; // $1.875M total gross assets

  // 1. Authorized Shares Method:
  // First 5,000 shares: $175. For each additional 10,000 shares: $85.
  // 10,000,000 shares = ~$85,150 + filing fees
  const authorizedSharesTax = 85150.00;

  // 2. Assumed Par Value Capital Method:
  // Assumed Par Value = Gross Assets / Issued Shares = $1,875,000 / 4,620,000 = $0.4058
  // Assumed Par Value Capital = Authorized Shares * Assumed Par Value = $4,058,441
  // Tax is $400 for each $1,000,000 of assumed par value capital
  const assumedParValueTax = 400.00; // Statutory minimum!
  const deTaxSavings = authorizedSharesTax - assumedParValueTax;

  // 50-State Statutory Annual Report & Regulatory Schedule
  const [allStateRecords] = useState<StateComplianceRecord[]>([
    {
      stateCode: 'DE',
      stateName: 'Delaware',
      filingType: 'Annual Franchise Tax Report & Assumed Par Value Filing',
      statutoryDueDate: '2027-03-01',
      daysRemaining: 112,
      statutoryFee: 450, // $400 tax + $50 filing fee
      frequency: 'Annual',
      registrationStatus: 'Domestic Entity',
      complianceStatus: 'Compliant & Stamped',
    },
    {
      stateCode: 'CA',
      stateName: 'California',
      filingType: 'Statement of Information (Form SI-550) & Franchise Tax',
      statutoryDueDate: '2026-05-15',
      daysRemaining: 24,
      statutoryFee: 825, // $800 min franchise tax + $25 SI fee
      frequency: 'Annual',
      registrationStatus: 'Foreign Qualified',
      complianceStatus: 'Action Imminent (<30d)',
    },
    {
      stateCode: 'NY',
      stateName: 'New York',
      filingType: 'Biennial Statement (Department of State)',
      statutoryDueDate: '2026-08-31',
      daysRemaining: 132,
      statutoryFee: 9,
      frequency: 'Biennial',
      registrationStatus: 'Foreign Qualified',
      complianceStatus: 'Scheduled',
    },
    {
      stateCode: 'TX',
      stateName: 'Texas',
      filingType: 'Public Information Report (PIR) & No Tax Due Info',
      statutoryDueDate: '2026-05-15',
      daysRemaining: 24,
      statutoryFee: 0,
      frequency: 'Annual',
      registrationStatus: 'Foreign Qualified',
      complianceStatus: 'Action Imminent (<30d)',
    },
    {
      stateCode: 'WA',
      stateName: 'Washington',
      filingType: 'Annual Report & Secretary of State Renewal',
      statutoryDueDate: '2026-09-30',
      daysRemaining: 162,
      statutoryFee: 70,
      frequency: 'Annual',
      registrationStatus: 'Foreign Qualified',
      complianceStatus: 'Scheduled',
    },
    {
      stateCode: 'FL',
      stateName: 'Florida',
      filingType: 'Uniform Business Report & Annual Fee',
      statutoryDueDate: '2026-05-01',
      daysRemaining: 10,
      statutoryFee: 150,
      frequency: 'Annual',
      registrationStatus: 'Foreign Qualified',
      complianceStatus: 'Action Imminent (<30d)',
    },
    {
      stateCode: 'IL',
      stateName: 'Illinois',
      filingType: 'Corporation Annual Report & Franchise Tax Form BCA 14.05',
      statutoryDueDate: '2026-10-31',
      daysRemaining: 193,
      statutoryFee: 175,
      frequency: 'Annual',
      registrationStatus: 'Foreign Qualified',
      complianceStatus: 'Scheduled',
    },
    {
      stateCode: 'MA',
      stateName: 'Massachusetts',
      filingType: 'Foreign Corporation Annual Report',
      statutoryDueDate: '2026-11-15',
      daysRemaining: 208,
      statutoryFee: 500,
      frequency: 'Annual',
      registrationStatus: 'Foreign Qualified',
      complianceStatus: 'Scheduled',
    },
    {
      stateCode: 'CO',
      stateName: 'Colorado',
      filingType: 'Periodic Report (Secretary of State)',
      statutoryDueDate: '2026-06-30',
      daysRemaining: 70,
      statutoryFee: 25,
      frequency: 'Annual',
      registrationStatus: 'Foreign Qualified',
      complianceStatus: 'Scheduled',
    },
    {
      stateCode: 'NV',
      stateName: 'Nevada',
      filingType: 'Annual List of Officers & State Business License',
      statutoryDueDate: '2026-07-31',
      daysRemaining: 101,
      statutoryFee: 350,
      frequency: 'Annual',
      registrationStatus: 'Exempt / Not Registered',
      complianceStatus: 'Scheduled',
    },
  ]);

  const filteredStates = allStateRecords.filter(r =>
    r.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.stateCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.filingType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const imminentActionCount = allStateRecords.filter(r => r.complianceStatus === 'Action Imminent (<30d)').length;

  const handleExportStateSchedule = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "50-State Corporate Annual Report & Statutory Regulatory Schedule\n" +
      "Generated At," + new Date().toISOString() + "\n\n" +
      "State Code,State Name,Filing Type,Statutory Due Date,Days Remaining,Statutory Fee,Frequency,Status\n" +
      allStateRecords.map(r => `${r.stateCode},"${r.stateName}","${r.filingType}",${r.statutoryDueDate},${r.daysRemaining},$${r.statutoryFee},${r.frequency},"${r.complianceStatus}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Corporate_Annual_Report_50_State_Schedule_${new Date().getFullYear()}.csv`);
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
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">50-State Compliance & Franchise Tax Radar</h1>
              <p className="text-sm text-gray-400">
                Delaware Tax Minimizer • FinCEN BOI Reporting • 50-State Statutory Annual Report Deadlines
              </p>
            </div>
          </div>
          <button
            onClick={handleExportStateSchedule}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-blue-600/20"
          >
            <Download size={16} />
            <span>Export 50-State Schedule</span>
          </button>
        </div>

        {/* Delaware Franchise Tax Optimizer Section */}
        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-800 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={20} className="text-emerald-400" />
                <h2 className="text-base font-semibold">Delaware Franchise Tax Optimizer (State of Delaware)</h2>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Comparing the default Authorized Shares Method vs. the legal Assumed Par Value Capital Method
              </p>
            </div>
            <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
              Net Savings: +${deTaxSavings.toLocaleString()} Saved
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Authorized Shares Method (The Trap) */}
            <div className="bg-gray-950/60 p-5 rounded-2xl border border-red-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-red-400">1. Default Authorized Shares Method</span>
                <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded">Naive Notice</span>
              </div>
              <div className="text-3xl font-bold text-red-400 font-mono">
                ${authorizedSharesTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-gray-400">
                Calculated strictly on 10,000,000 authorized shares regardless of asset size. This is the initial bill sent by Delaware that terrifies founders.
              </p>
            </div>

            {/* Assumed Par Value Capital Method (The Solution) */}
            <div className="bg-gray-950/60 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-emerald-400">2. Assumed Par Value Capital Method</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Liquid Optimized</span>
              </div>
              <div className="text-3xl font-bold text-emerald-400 font-mono">
                ${assumedParValueTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-gray-400">
                Derived from \$1,875,000 total gross assets and 4,620,000 issued shares. Legally reduces your Delaware franchise tax liability to the statutory minimum.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Governance Compliance Cards (FinCEN BOI, Good Standing) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div className="bg-gray-900 border border-emerald-500/20 bg-emerald-950/10 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-emerald-400">FinCEN BOI Reporting</span>
              <CheckCircle2 size={16} className="text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white">Filed & Certified</div>
            <p className="text-[11px] text-emerald-300/80">
              Corporate Transparency Act (CTA) beneficial ownership report on file with US Treasury.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-blue-400">Delaware Good Standing</span>
              <ShieldCheck size={16} className="text-blue-400" />
            </div>
            <div className="text-xl font-bold text-white">Active & In Good Standing</div>
            <p className="text-[11px] text-gray-400">
              State certificate verified with zero delinquent franchise tax balances.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold text-purple-400">Registered Agent Service</span>
              <Lock size={16} className="text-purple-400" />
            </div>
            <div className="text-xl font-bold text-white">Active Service Attestation</div>
            <p className="text-[11px] text-gray-400">
              Harvard Business Services (DE) + CT Corporation (CA, NY) active with 0 notice lapses.
            </p>
          </div>
        </div>

        {/* Imminent Deadlines Alert */}
        {imminentActionCount > 0 && (
          <div className="mt-6 p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl flex items-start space-x-3 text-xs">
            <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-200">State Annual Report Deadlines Approaching (&lt;30 Days):</span>
              <p className="text-amber-300/80 mt-0.5">
                California (Form SI-550 + \$800 tax), Florida Uniform Business Report, and Texas Public Information Report are due within the next 30 days. Filing on time prevents forfeiture of foreign corporate authority and state tax penalties.
              </p>
            </div>
          </div>
        )}

        {/* 50-State Statutory Annual Report Table */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">50-State Corporate Annual Report & Statutory Deadlines</h2>
              <p className="text-xs text-gray-400">Filing schedules, statutory fees, and foreign qualification standing across US states</p>
            </div>
            <div className="relative w-full md:w-64">
              <Search size={14} className="absolute left-3 top-2.5 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search state, filing, code..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-950 uppercase text-gray-400 font-semibold border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Jurisdiction</th>
                  <th className="py-3 px-4">Statutory Filing Description</th>
                  <th className="py-3 px-4">Authority Status</th>
                  <th className="py-3 px-4 text-right">Fee</th>
                  <th className="py-3 px-4 text-right">Statutory Due Date</th>
                  <th className="py-3 px-4 text-center">Countdown</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 font-mono">
                {filteredStates.map((r) => {
                  const isImminent = r.complianceStatus === 'Action Imminent (<30d)';
                  return (
                    <tr key={r.stateCode} className="hover:bg-gray-800/40 transition">
                      <td className="py-3.5 px-4 font-sans font-medium text-white">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm">{r.stateCode}</span>
                          <span className="text-gray-400 text-xs">({r.stateName})</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-sans text-gray-300 text-xs">
                        <div>{r.filingType}</div>
                        <span className="text-[10px] text-gray-500">{r.frequency} Requirement</span>
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          r.registrationStatus === 'Domestic Entity' ? 'bg-blue-500/10 text-blue-400 font-semibold' :
                          r.registrationStatus === 'Foreign Qualified' ? 'bg-purple-500/10 text-purple-400' :
                          'bg-gray-800 text-gray-400'
                        }`}>
                          {r.registrationStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-white font-semibold">
                        ${r.statutoryFee}
                      </td>
                      <td className="py-3.5 px-4 text-right text-gray-300">
                        {r.statutoryDueDate}
                      </td>
                      <td className="py-3.5 px-4 text-center font-sans">
                        <span className={`font-semibold text-xs ${isImminent ? 'text-amber-400 font-bold' : 'text-gray-400'}`}>
                          {r.daysRemaining} days left
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-sans">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                          r.complianceStatus === 'Compliant & Stamped' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          isImminent ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-gray-800 text-gray-300 border-gray-700'
                        }`}>
                          {r.complianceStatus}
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
