"use client";

import React, { useState, useMemo } from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  Download, 
  Layers, 
  CheckCircle2, 
  ArrowRightLeft, 
  Scale, 
  Hash, 
  Building 
} from 'lucide-react';
import { 
  DualReportingEngine, 
  DualReportingInput 
} from '@/lib/compliance/dualReportingEngine';
import { 
  SocAuditVault, 
  SocDossierReport 
} from '@/lib/compliance/socAuditVault';

export default function AuditorPortalView() {
  const [activeTab, setActiveTab] = useState<'dualReporting' | 'socVault'>('dualReporting');

  // --- Dual US GAAP vs IFRS State ---
  const [dualInput, setDualInput] = useState<DualReportingInput>({
    revenueGross: 12500000,
    softwareDevelopmentCostsTotal: 3200000,
    developmentPhaseQualifyingPercent: 70, // 70% meets IAS 38 capitalization criteria
    annualOperatingLeaseRent: 480000,
    leasePresentValueROU: 1850000,
    discountRate: 0.055,
    otherOpex: 4100000
  });

  const reconciliation = useMemo(() => {
    return DualReportingEngine.reconcile(dualInput);
  }, [dualInput]);

  // --- SOC 1 & 2 Evidence Vault State ---
  const [orgName] = useState<string>('Liquid Technologies Inc.');
  const [socDossier] = useState<SocDossierReport>(() => {
    return SocAuditVault.generateDossier(orgName);
  });

  const downloadSocDossier = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(socDossier, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `soc1_soc2_continuous_evidence_dossier_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="p-8 space-y-8 bg-gray-950 min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">Auditor & Compliance Portal</h1>
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              AICPA & IFRS Ready
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Dual US GAAP vs. IFRS side-by-side reconciliation bridge and continuous SOC 1 / SOC 2 tamper-evident cryptographic vault.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('dualReporting')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'dualReporting' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ArrowRightLeft size={16} />
            <span>Dual GAAP / IFRS Bridge</span>
          </button>
          <button
            onClick={() => setActiveTab('socVault')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'socVault' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShieldCheck size={16} />
            <span>SOC 1/2 Evidence Dossier</span>
          </button>
        </div>
      </div>

      {activeTab === 'dualReporting' && (
        <div className="space-y-6">
          {/* Executive Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">US GAAP Net Income</span>
              <div className="text-2xl font-mono font-bold text-white mt-1">
                ${reconciliation.gaapNetIncomeUSD.toLocaleString()}
              </div>
              <span className="text-xs text-gray-500">ASC 350 R&D Expense / ASC 842 Leases</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">IFRS Net Income</span>
              <div className="text-2xl font-mono font-bold text-blue-400 mt-1">
                ${reconciliation.ifrsNetIncomeUSD.toLocaleString()}
              </div>
              <span className="text-xs text-gray-500">IAS 38 Capitalized Dev / IFRS 16 Depreciation</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Net Income Variance</span>
              <div className={`text-2xl font-mono font-bold mt-1 ${
                reconciliation.netIncomeVarianceUSD >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {reconciliation.netIncomeVarianceUSD >= 0 ? '+' : ''}${reconciliation.netIncomeVarianceUSD.toLocaleString()}
              </div>
              <span className="text-xs text-gray-500">IFRS Delta vs US GAAP</span>
            </div>
          </div>

          {/* Interactive Parameters Drawer */}
          <div className="bg-gray-900/60 p-5 rounded-xl border border-gray-800">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
              <Scale size={16} className="text-blue-400" />
              <span>Accounting Bridge Drivers</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Gross Revenue ($)</label>
                <input
                  type="number"
                  value={dualInput.revenueGross}
                  onChange={(e) => setDualInput({ ...dualInput, revenueGross: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Software Dev Costs ($)</label>
                <input
                  type="number"
                  value={dualInput.softwareDevelopmentCostsTotal}
                  onChange={(e) => setDualInput({ ...dualInput, softwareDevelopmentCostsTotal: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1">IAS 38 Qualifying %</label>
                <input
                  type="number"
                  value={dualInput.developmentPhaseQualifyingPercent}
                  onChange={(e) => setDualInput({ ...dualInput, developmentPhaseQualifyingPercent: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Operating Lease Annual Rent ($)</label>
                <input
                  type="number"
                  value={dualInput.annualOperatingLeaseRent}
                  onChange={(e) => setDualInput({ ...dualInput, annualOperatingLeaseRent: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center space-x-2">
                <FileCheck size={18} className="text-blue-400" />
                <span>Side-by-Side Income Statement & Balance Sheet Comparison</span>
              </h3>
              <span className="text-xs text-gray-400">Values in USD</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Financial Line Item</th>
                    <th className="p-3 text-right">US GAAP (ASC)</th>
                    <th className="p-3 text-right">IFRS (IAS)</th>
                    <th className="p-3 text-right">Variance ($)</th>
                    <th className="p-3">Standard Accounting Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 font-mono">
                  {reconciliation.comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/30">
                      <td className="p-3 font-sans font-medium text-white">{row.metric}</td>
                      <td className="p-3 text-right text-gray-300">${row.usGaapAmountUSD.toLocaleString()}</td>
                      <td className="p-3 text-right text-blue-400">${row.ifrsAmountUSD.toLocaleString()}</td>
                      <td className={`p-3 text-right font-bold ${row.varianceUSD !== 0 ? 'text-amber-400' : 'text-gray-500'}`}>
                        {row.varianceUSD > 0 ? `+${row.varianceUSD.toLocaleString()}` : row.varianceUSD < 0 ? row.varianceUSD.toLocaleString() : '$0'}
                      </td>
                      <td className="p-3 font-sans text-xs text-gray-400">{row.varianceExplanation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'socVault' && (
        <div className="space-y-6">
          {/* SOC Dossier Overview */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 size={24} className="text-emerald-400" />
                <h3 className="text-lg font-bold text-white">AICPA SOC 1 Type II & SOC 2 Continuous Dossier</h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Audited Organization: <strong className="text-gray-200">{socDossier.organizationName}</strong> | Reporting Period: {socDossier.reportingPeriod}
              </p>
              <div className="flex items-center space-x-2 mt-3">
                <Hash size={14} className="text-blue-400" />
                <span className="text-xs font-mono text-gray-400">Merkle Root Seal:</span>
                <span className="text-xs font-mono text-blue-300 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20 truncate max-w-sm">
                  {socDossier.dossierMerkleRoot}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Continuous Score</div>
                <div className="text-3xl font-mono font-bold text-emerald-400">
                  {socDossier.overallComplianceScore}%
                </div>
              </div>

              <button
                onClick={downloadSocDossier}
                className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                <Download size={16} />
                <span>Export Dossier (JSON)</span>
              </button>
            </div>
          </div>

          {/* Audit Controls List */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center space-x-2">
                <Layers size={18} className="text-blue-400" />
                <span>Audited Trust Services Controls</span>
              </h3>
              <span className="text-xs text-gray-400">{socDossier.controlsAuditedCount} Controls Verified</span>
            </div>

            <div className="divide-y divide-gray-800">
              {socDossier.evidenceItems.map((ctrl, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-800/20 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-0.5 bg-gray-800 text-blue-400 font-mono text-xs rounded border border-gray-700">
                        {ctrl.controlId}
                      </span>
                      <span className="font-semibold text-white text-sm">{ctrl.criterion}</span>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {ctrl.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300">{ctrl.description}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-gray-500 pt-1 gap-2">
                    <div>Source: {ctrl.evidenceSource}</div>
                    <div className="truncate max-w-md">Proof: {ctrl.cryptographicProofHash}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
