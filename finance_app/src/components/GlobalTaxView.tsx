"use client";

import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Percent, 
  Download, 
  Scale, 
  DollarSign 
} from 'lucide-react';
import { 
  FbarFatcaTracker, 
  ForeignAccount, 
  FbarFatcaEvaluationResult 
} from '@/lib/tax/fbarFatcaTracker';
import { 
  GlobalVatGstEngine, 
  GLOBAL_JURISDICTION_RULES 
} from '@/lib/tax/globalVatGstEngine';
import { 
  TransferPricingEngine, 
  IntercompanyService 
} from '@/lib/tax/transferPricingEngine';

export default function GlobalTaxView() {
  const [activeTab, setActiveTab] = useState<'fbarFatca' | 'vatGst' | 'transferPricing'>('fbarFatca');

  // --- FBAR & FATCA State ---
  const [foreignAccounts, setForeignAccounts] = useState<ForeignAccount[]>([
    {
      id: 'fa-1',
      institutionName: 'Barclays Bank UK',
      countryCode: 'GB',
      accountType: 'FOREIGN_BANK',
      accountNumberMasked: '****4921',
      currency: 'GBP',
      currentBalanceUSD: 24500,
      peakBalanceCalendarYearUSD: 38200
    },
    {
      id: 'fa-2',
      institutionName: 'Binance International (BVI)',
      countryCode: 'VG',
      accountType: 'FOREIGN_CRYPTO_EXCHANGE',
      accountNumberMasked: '****8102',
      currency: 'USDT',
      currentBalanceUSD: 14200,
      peakBalanceCalendarYearUSD: 26500
    },
    {
      id: 'fa-3',
      institutionName: 'UBS Switzerland AG',
      countryCode: 'CH',
      accountType: 'FOREIGN_BANK',
      accountNumberMasked: '****3390',
      currency: 'CHF',
      currentBalanceUSD: 8500,
      peakBalanceCalendarYearUSD: 9400
    }
  ]);

  const fbarEvaluation: FbarFatcaEvaluationResult = useMemo(() => {
    return FbarFatcaTracker.evaluate(foreignAccounts);
  }, [foreignAccounts]);

  // --- Global VAT/GST State ---
  const [salesByJurisdiction, setSalesByJurisdiction] = useState<Record<string, number>>({
    EU: 42000,   // Exceeds $10,800 (€10,000) OSS threshold -> Mandatory Registration
    GB: 95000,   // Approaching / Exceeds £85k depending on exchange
    CA: 28500,   // Approaching $30k CAD
    AU: 12000,   // Under $75k AUD
    SG: 64000    // Under $100k SGD
  });

  const vatNexusList = useMemo(() => {
    const inputs = Object.entries(salesByJurisdiction).map(([countryCode, salesVolumeUSD]) => ({
      countryCode,
      salesVolumeUSD
    }));
    return GlobalVatGstEngine.evaluateNexus(inputs).statuses;
  }, [salesByJurisdiction]);

  // --- Transfer Pricing State ---
  const [intercompanyServices, setIntercompanyServices] = useState<IntercompanyService[]>([
    {
      serviceId: 'RD-IP-CORE',
      description: 'Core Next.js & Multi-Chain Protocol Engineering',
      providerEntity: 'Liquid US Inc.',
      providerCountry: 'US',
      recipientEntity: 'Liquid Ireland Technologies Ltd.',
      recipientCountry: 'IE',
      directCostUSD: 450000,
      indirectCostAllocatedUSD: 65000,
      markupPercent: 8.5, // Arm's length benchmark
      serviceType: 'SOFTWARE_RD'
    },
    {
      serviceId: 'MGMT-EXEC-01',
      description: 'Central Executive Management & Compliance Supervision',
      providerEntity: 'Liquid US Inc.',
      providerCountry: 'US',
      recipientEntity: 'Liquid Ireland Technologies Ltd.',
      recipientCountry: 'IE',
      directCostUSD: 120000,
      indirectCostAllocatedUSD: 25000,
      markupPercent: 5.0,
      serviceType: 'MANAGEMENT_SERVICES'
    }
  ]);

  const transferPricingReport = useMemo(() => {
    return TransferPricingEngine.calculate(intercompanyServices);
  }, [intercompanyServices]);

  const downloadAgreement = () => {
    const blob = new Blob([transferPricingReport.agreementContractText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intercompany_transfer_pricing_agreement_${transferPricingReport.taxYear}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-950 min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">Global Tax & Cross-Border Compliance</h1>
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              OECD & IRS Compliant
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            FinCEN 114 (FBAR) / FATCA foreign account thresholds, multi-jurisdiction VAT/GST digital nexus, and OECD transfer pricing.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('fbarFatca')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'fbarFatca' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShieldAlert size={16} />
            <span>FBAR / FATCA Sentry</span>
          </button>
          <button
            onClick={() => setActiveTab('vatGst')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'vatGst' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe size={16} />
            <span>Global VAT & GST</span>
          </button>
          <button
            onClick={() => setActiveTab('transferPricing')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'transferPricing' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Scale size={16} />
            <span>OECD Transfer Pricing</span>
          </button>
        </div>
      </div>

      {activeTab === 'fbarFatca' && (
        <div className="space-y-6">
          {/* FBAR Evaluation Summary Banner */}
          <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
            fbarEvaluation.fbarFilingRequired
              ? 'bg-rose-950/30 border-rose-500/30 text-rose-200'
              : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
          }`}>
            <div className="flex items-center space-x-4">
              {fbarEvaluation.fbarFilingRequired ? (
                <AlertTriangle size={32} className="text-rose-400" />
              ) : (
                <CheckCircle2 size={32} className="text-emerald-400" />
              )}
              <div>
                <h3 className="text-lg font-bold">
                  {fbarEvaluation.fbarFilingRequired 
                    ? 'Mandatory Filing Required: FinCEN Form 114 (FBAR)' 
                    : 'Compliant: Below Foreign Account Reporting Thresholds'}
                </h3>
                <p className="text-sm opacity-90">
                  Statutory Due Date: {fbarEvaluation.statutoryDueDate} | Aggregate Peak: ${fbarEvaluation.aggregatePeakBalanceUSD.toLocaleString()} USD
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">FBAR ($10k Limit)</div>
                <div className={`text-xl font-mono font-bold ${fbarEvaluation.fbarFilingRequired ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {fbarEvaluation.fbarFilingRequired ? 'EXCEEDED' : 'EXEMPT'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">FATCA ($50k Limit)</div>
                <div className={`text-xl font-mono font-bold ${fbarEvaluation.fatcaFilingRequired ? 'text-amber-400' : 'text-gray-300'}`}>
                  {fbarEvaluation.fatcaFilingRequired ? 'EXCEEDED' : 'BELOW'}
                </div>
              </div>
            </div>
          </div>

          {/* Accounts Breakdown Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center space-x-2">
                <Building2 size={18} className="text-blue-400" />
                <span>Monitored Foreign Financial & Crypto Exchange Accounts</span>
              </h3>
              <span className="text-xs text-gray-400">{foreignAccounts.length} Monitored Entities</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Financial Institution</th>
                    <th className="p-3">Country</th>
                    <th className="p-3">Account Type</th>
                    <th className="p-3 text-right">Current Balance</th>
                    <th className="p-3 text-right">Peak Cal-Year USD</th>
                    <th className="p-3 text-right">% Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 font-mono">
                  {fbarEvaluation.accountBreakdown.map((item, idx) => {
                    const acc = foreignAccounts.find(a => a.institutionName === item.institution);
                    return (
                      <tr key={idx} className="hover:bg-gray-800/30">
                        <td className="p-3">
                          <div className="text-white font-medium">{item.institution}</div>
                          <div className="text-xs text-gray-500">{acc?.accountNumberMasked}</div>
                        </td>
                        <td className="p-3 text-xs text-gray-300">{item.country}</td>
                        <td className="p-3 text-xs text-gray-400">{acc?.accountType}</td>
                        <td className="p-3 text-right text-white">
                          ${acc?.currentBalanceUSD.toLocaleString()} {acc?.currency}
                        </td>
                        <td className="p-3 text-right text-blue-400 font-bold">
                          ${item.peakUSD.toLocaleString()}
                        </td>
                        <td className="p-3 text-right text-gray-400">
                          {item.contributionPercent.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vatGst' && (
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center space-x-2">
                <Globe size={18} className="text-blue-400" />
                <span>International VAT/GST Nexus & Registration Sentry</span>
              </h3>
              <span className="text-xs text-gray-400">OECD BEPS Action 1 Cross-Border Digital Services</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Jurisdiction</th>
                    <th className="p-3">Registration Scheme</th>
                    <th className="p-3 text-right">Statutory Threshold</th>
                    <th className="p-3 text-right">Current Sales (USD)</th>
                    <th className="p-3 text-center">Tax Rate</th>
                    <th className="p-3 text-center">Nexus Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {vatNexusList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/30">
                      <td className="p-3">
                        <div className="font-semibold text-white">{item.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{item.countryCode} ({item.currency})</div>
                      </td>
                      <td className="p-3 text-xs text-gray-400">
                        {item.registrationScheme}
                      </td>
                      <td className="p-3 text-right font-mono text-xs text-gray-300">
                        ${item.thresholdUSD.toLocaleString()} USD
                      </td>
                      <td className="p-3 text-right font-mono text-sm font-bold text-white">
                        <input
                          type="number"
                          value={salesByJurisdiction[item.countryCode] || 0}
                          onChange={(e) => setSalesByJurisdiction({
                            ...salesByJurisdiction,
                            [item.countryCode]: parseFloat(e.target.value) || 0
                          })}
                          className="w-28 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-right text-white font-mono text-xs"
                        />
                      </td>
                      <td className="p-3 text-center font-mono text-xs text-blue-400 font-bold">
                        {item.standardTaxRatePercent.toFixed(1)}%
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          item.thresholdMet
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : item.utilizationPercent >= 75
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {item.thresholdMet ? 'REGISTRATION MANDATORY' : item.utilizationPercent >= 75 ? 'APPROACHING (75%+)' : 'EXEMPT'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transferPricing' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Intercompany Invoicing</span>
              <div className="text-2xl font-mono font-bold text-white mt-1">
                ${transferPricingReport.totalIntercompanyChargesUSD.toLocaleString()}
              </div>
              <span className="text-xs text-gray-500">Tax Year {transferPricingReport.taxYear}</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Allocated Cost Basis</span>
              <div className="text-2xl font-mono font-bold text-blue-400 mt-1">
                ${transferPricingReport.totalCostBasisUSD.toLocaleString()}
              </div>
              <span className="text-xs text-gray-500">Direct + Indirect Headcount</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Arm&apos;s Length Markup Profit</span>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
                ${transferPricingReport.totalMarkupProfitUSD.toLocaleString()}
              </div>
              <span className="text-xs text-gray-500">Cost-Plus / TNMM Benchmark</span>
            </div>
          </div>

          {/* Transfer Pricing Schedules */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-semibold text-white flex items-center space-x-2">
                <Scale size={18} className="text-blue-400" />
                <span>Active Intercompany Service Agreements (ISA)</span>
              </h3>
              <button
                onClick={downloadAgreement}
                className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <Download size={14} />
                <span>Export ISA Master Agreement</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Service Code & Description</th>
                    <th className="p-3">Provider → Recipient</th>
                    <th className="p-3 text-right">Cost Base</th>
                    <th className="p-3 text-right">Markup ($)</th>
                    <th className="p-3 text-right">Intercompany Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 font-mono">
                  {transferPricingReport.schedules.map((s, idx) => {
                    const raw = intercompanyServices.find(is => is.serviceId === s.serviceId);
                    return (
                      <tr key={idx} className="hover:bg-gray-800/30">
                        <td className="p-3">
                          <div className="text-white font-medium">{s.serviceId}</div>
                          <div className="text-xs text-gray-500">{s.description}</div>
                        </td>
                        <td className="p-3 text-xs text-gray-300">
                          {raw?.providerEntity} ({raw?.providerCountry}) → {raw?.recipientEntity} ({raw?.recipientCountry})
                        </td>
                        <td className="p-3 text-right text-gray-300">${s.totalCostBaseUSD.toLocaleString()}</td>
                        <td className="p-3 text-right text-emerald-400">+${s.markupAmountUSD.toLocaleString()} ({raw?.markupPercent}%)</td>
                        <td className="p-3 text-right text-white font-bold">${s.totalIntercompanyInvoiceUSD.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
