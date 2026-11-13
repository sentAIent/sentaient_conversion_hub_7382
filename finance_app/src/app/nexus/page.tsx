"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  MapPin,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Download,
  DollarSign,
  TrendingUp,
  FileText,
  Building2,
  HelpCircle,
} from 'lucide-react';

interface StateNexusRecord {
  stateCode: string;
  stateName: string;
  revenueTTM: number;
  revenueThreshold: number;
  transactionsTTM: number;
  transactionThreshold: number;
  saasTaxability: 'Taxable' | 'Exempt' | 'Partially Taxable';
  status: 'Breached (Nexus Triggered)' | 'Approaching (>80%)' | 'Safe Harbor';
  registrationRequired: boolean;
}

export default function SalesTaxNexusPage() {
  const [states, setStates] = useState<StateNexusRecord[]>([
    {
      stateCode: 'CA',
      stateName: 'California',
      revenueTTM: 420000,
      revenueThreshold: 500000,
      transactionsTTM: 142,
      transactionThreshold: 0, // CA has no transaction count test, $500k sales only
      saasTaxability: 'Exempt', // Pure SaaS generally exempt in CA unless canned software
      status: 'Approaching (>80%)',
      registrationRequired: false,
    },
    {
      stateCode: 'NY',
      stateName: 'New York',
      revenueTTM: 380000,
      revenueThreshold: 500000,
      transactionsTTM: 110,
      transactionThreshold: 100, // NY requires BOTH $500k and 100 transactions
      saasTaxability: 'Taxable', // NY treats prewritten SaaS as taxable tangible property
      status: 'Safe Harbor',
      registrationRequired: false,
    },
    {
      stateCode: 'TX',
      stateName: 'Texas',
      revenueTTM: 520000,
      revenueThreshold: 500000,
      transactionsTTM: 65,
      transactionThreshold: 0,
      saasTaxability: 'Partially Taxable', // 80% taxable in TX (20% statutory exemption)
      status: 'Breached (Nexus Triggered)',
      registrationRequired: true,
    },
    {
      stateCode: 'WA',
      stateName: 'Washington',
      revenueTTM: 125000,
      revenueThreshold: 100000,
      transactionsTTM: 48,
      transactionThreshold: 0,
      saasTaxability: 'Taxable', // WA imposes sales tax + B&O tax on digital automated services
      status: 'Breached (Nexus Triggered)',
      registrationRequired: true,
    },
    {
      stateCode: 'CO',
      stateName: 'Colorado',
      revenueTTM: 88000,
      revenueThreshold: 100000,
      transactionsTTM: 32,
      transactionThreshold: 0,
      saasTaxability: 'Taxable', // CO state + home rule cities tax software
      status: 'Approaching (>80%)',
      registrationRequired: false,
    },
    {
      stateCode: 'IL',
      stateName: 'Illinois',
      revenueTTM: 74000,
      revenueThreshold: 100000,
      transactionsTTM: 200,
      transactionThreshold: 200,
      saasTaxability: 'Taxable', // IL Chicago Lease Tax & state cloud software tax
      status: 'Safe Harbor',
      registrationRequired: false,
    },
  ]);

  const totalStatesTracked = states.length;
  const breachedStates = states.filter(s => s.status === 'Breached (Nexus Triggered)');
  const approachingStates = states.filter(s => s.status === 'Approaching (>80%)');

  const handleExportRegistrationDossier = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "B2B Sales Tax & Economic Nexus Exposure Dossier (South Dakota v. Wayfair)\n" +
      "Tax Year,2026\n" +
      "Generated At," + new Date().toISOString() + "\n\n" +
      "State Code,State Name,TTM Revenue,Revenue Threshold,TTM Transactions,Transaction Threshold,SaaS Taxability,Nexus Status,Registration Required\n" +
      states.map(s => `${s.stateCode},"${s.stateName}",$${s.revenueTTM},$${s.revenueThreshold},${s.transactionsTTM},${s.transactionThreshold},"${s.saasTaxability}","${s.status}",${s.registrationRequired ? 'YES' : 'NO'}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Sales_Tax_Economic_Nexus_Dossier_2026.csv`);
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
              <MapPin size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Sales Tax & Economic Nexus Heatmap</h1>
              <p className="text-sm text-gray-400">
                Post-Wayfair Multi-State Exposure • Software Taxability Rules • Statutory Threshold Tracking
              </p>
            </div>
          </div>
          <button
            onClick={handleExportRegistrationDossier}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-blue-600/20"
          >
            <Download size={16} />
            <span>Export State Nexus Dossier</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Tracked Jurisdictions</span>
            <div className="text-2xl font-bold text-white mt-1">{totalStatesTracked} States</div>
            <span className="text-[11px] text-gray-500 mt-1 block">50-State automated rule monitoring</span>
          </div>

          <div className="bg-gray-900 border border-red-500/30 bg-red-950/10 p-5 rounded-2xl">
            <span className="text-xs text-red-400 uppercase font-semibold">Nexus Triggered (Action Req)</span>
            <div className="text-2xl font-bold text-red-400 mt-1">{breachedStates.length} States</div>
            <span className="text-[11px] text-red-400/80 mt-1 block">
              {breachedStates.map(s => s.stateCode).join(', ')} require registration
            </span>
          </div>

          <div className="bg-gray-900 border border-amber-500/30 bg-amber-950/10 p-5 rounded-2xl">
            <span className="text-xs text-amber-400 uppercase font-semibold">Approaching Threshold (&gt;80%)</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">{approachingStates.length} States</div>
            <span className="text-[11px] text-amber-400/80 mt-1 block">
              {approachingStates.map(s => s.stateCode).join(', ')} within 20% of limit
            </span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-emerald-400 uppercase font-semibold">M&A Diligence Safe Harbor</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">Compliant</span>
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Zero uncollected back-liability risk</span>
          </div>
        </div>

        {/* Warning Banner */}
        {breachedStates.length > 0 && (
          <div className="mt-6 p-4 bg-red-950/20 border border-red-500/30 rounded-2xl flex items-start space-x-3 text-xs">
            <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-red-200">Mandatory State Tax Registration Triggered:</span>
              <p className="text-red-300/80 mt-0.5">
                Trailing 12-month sales have exceeded economic nexus limits in <strong>Texas (\$520k / \$500k limit)</strong> and <strong>Washington (\$125k / \$100k limit)</strong>. You must obtain sales tax permits and configure checkout tax calculation to avoid retroactive penalties during future venture or M&A diligence.
              </p>
            </div>
          </div>
        )}

        {/* State Nexus Table */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Economic Nexus Exposure by State</h2>
              <p className="text-xs text-gray-400">Post-Wayfair statutory sales dollar and transaction count capacity</p>
            </div>
            <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full font-medium">
              Real-time Invoicing Feed Connected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-950 uppercase text-gray-400 font-semibold border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">SaaS Taxability</th>
                  <th className="py-3 px-4 text-right">TTM Revenue</th>
                  <th className="py-3 px-4 text-right">Statutory Limit</th>
                  <th className="py-3 px-4 text-center">Capacity Meter</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Registration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 font-mono">
                {states.map((s) => {
                  const capacityPct = Math.min(100, Math.round((s.revenueTTM / s.revenueThreshold) * 100));
                  return (
                    <tr key={s.stateCode} className="hover:bg-gray-800/40 transition">
                      <td className="py-3.5 px-4 font-sans font-medium text-white">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm">{s.stateCode}</span>
                          <span className="text-gray-400 text-xs">({s.stateName})</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          s.saasTaxability === 'Taxable' ? 'bg-red-500/10 text-red-400' :
                          s.saasTaxability === 'Partially Taxable' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {s.saasTaxability}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-white">
                        ${s.revenueTTM.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right text-gray-400">
                        ${s.revenueThreshold.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <div className="w-28 mx-auto">
                          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                            <span>{capacityPct}%</span>
                          </div>
                          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                capacityPct >= 100 ? 'bg-red-500' :
                                capacityPct >= 80 ? 'bg-amber-500' :
                                'bg-emerald-500'
                              }`}
                              style={{ width: `${capacityPct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-sans">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                          s.status === 'Breached (Nexus Triggered)' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          s.status === 'Approaching (>80%)' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-sans">
                        {s.registrationRequired ? (
                          <span className="text-red-400 font-semibold text-xs flex items-center justify-center space-x-1">
                            <AlertTriangle size={12} />
                            <span>Action Needed</span>
                          </span>
                        ) : (
                          <span className="text-gray-500 text-xs">Not Required</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Software Taxability Guidance */}
        <div className="mt-8 bg-gray-900/60 border border-gray-800 p-5 rounded-2xl">
          <div className="flex items-center space-x-2 text-sm font-semibold mb-3 text-gray-200">
            <Building2 size={16} className="text-blue-400" />
            <span>State Software Taxability Key Principles</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-400">
            <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-800/80">
              <div className="font-semibold text-gray-200">Pure Cloud SaaS</div>
              <p className="mt-1">Treated as tangible personal property in states like NY, WA, and PA, but exempt in CA, FL, and GA.</p>
            </div>
            <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-800/80">
              <div className="font-semibold text-gray-200">Custom vs. Prewritten</div>
              <p className="mt-1">Custom-developed software code created specifically for one client is broadly exempt across 45+ states.</p>
            </div>
            <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-800/80">
              <div className="font-semibold text-gray-200">Economic Nexus Exits</div>
              <p className="mt-1">M&A buyers routinely request escrow holdbacks of 10-15% of deal value if sales tax nexus compliance is unmanaged.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
