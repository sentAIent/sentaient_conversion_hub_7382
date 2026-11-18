'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  FileSpreadsheet, 
  Download, 
  AlertCircle, 
  ShieldAlert, 
  Sparkles,
  TrendingDown,
  Building,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { Form1099DAEngine, DigitalAssetTransaction } from '@/lib/tax/form1099DA';
import { Section174Engine, RDExpenseItem } from '@/lib/tax/section174Engine';
import { EconomicNexusRadar, StateSalesActivity } from '@/lib/tax/economicNexusRadar';
import { IRSEfileFormatter, PayeeRecord, PayerInfo } from '@/lib/tax/irsEfileFormatter';

export default function TaxVaultView() {
  const [activeTab, setActiveTab] = useState<'FORM_1099DA' | 'SEC_174' | 'NEXUS_RADAR' | '1099_NEC'>('FORM_1099DA');

  // Sample Digital Asset Dispositions
  const cryptoDispositions: DigitalAssetTransaction[] = [
    { id: 'tx-1', assetSymbol: 'BTC', assetName: 'Bitcoin', units: 0.75, dateAcquired: '2025-03-10', dateSoldOrDisposed: '2026-08-14', grossProceedsUSD: 48500, costBasisUSD: 31200, brokerOrWalletAddress: '0x12a9...89b1' },
    { id: 'tx-2', assetSymbol: 'ETH', assetName: 'Ethereum', units: 5.0, dateAcquired: '2026-02-01', dateSoldOrDisposed: '2026-09-20', grossProceedsUSD: 16200, costBasisUSD: 12500, brokerOrWalletAddress: '0x33f1...e992' },
    { id: 'tx-3', assetSymbol: 'SOL', assetName: 'Solana', units: 40.0, dateAcquired: '2026-04-15', dateSoldOrDisposed: '2026-10-05', grossProceedsUSD: 6800, costBasisUSD: 7400, washSaleDisallowedUSD: 600, brokerOrWalletAddress: 'sol-mint-88a' },
  ];

  const form1099Summary = useMemo(() => {
    return Form1099DAEngine.processDispositions(cryptoDispositions, 2026);
  }, []);

  // Sample R&D Expenses
  const rdExpenses: RDExpenseItem[] = [
    { id: 'rd-1', category: 'DOMESTIC_WAGES', description: 'Senior AI Engineer Base Salary', amount: 185000, taxYear: 2026 },
    { id: 'rd-2', category: 'DOMESTIC_WAGES', description: 'Full Stack Smart Contract Dev', amount: 160000, taxYear: 2026 },
    { id: 'rd-3', category: 'CLOUD_COMPUTE', description: 'AWS GPU Training & Distributed Clusters', amount: 48000, taxYear: 2026 },
    { id: 'rd-4', category: 'FOREIGN_CONTRACTOR', description: 'Frontend Polish Contractor (Germany)', amount: 35000, taxYear: 2026 }
  ];

  const sec174Report = useMemo(() => {
    return Section174Engine.calculateSection174(rdExpenses, 2026);
  }, []);

  const form6765Estimate = useMemo(() => {
    return Section174Engine.calculateForm6765PayrollCredit(345000, 0, 48000, 1200000, 2);
  }, []);

  // Sample State Sales Activity
  const stateSales: StateSalesActivity[] = [
    { stateCode: 'CA', currentRevenueUSD: 410000, currentTransactionCount: 450 },
    { stateCode: 'NY', currentRevenueUSD: 180000, currentTransactionCount: 140 },
    { stateCode: 'TX', currentRevenueUSD: 520000, currentTransactionCount: 310 }, // Triggered
    { stateCode: 'FL', currentRevenueUSD: 94000, currentTransactionCount: 65 },  // Approaching
    { stateCode: 'IL', currentRevenueUSD: 35000, currentTransactionCount: 220 }, // Triggered via transaction count
  ];

  const nexusStatuses = useMemo(() => {
    return EconomicNexusRadar.evaluateNexus(stateSales);
  }, []);

  // Sample Contractor Records
  const contractorPayees: PayeeRecord[] = [
    { id: 'c-1', recipientTIN: '12-3456789', tinType: 'EIN', name: 'Alpha Design LLC', addressLine1: '123 Market St', city: 'San Francisco', state: 'CA', zip: '94105', nonemployeeCompensation: 24500 },
    { id: 'c-2', recipientTIN: '98-7654321', tinType: 'EIN', name: 'CloudOps Consulting Inc', addressLine1: '456 Austin Ave', city: 'Austin', state: 'TX', zip: '78701', nonemployeeCompensation: 18200 },
    { id: 'c-3', recipientTIN: '11-2233445', tinType: 'SSN', name: 'Alex Rivera', addressLine1: '789 Broadway', city: 'New York', state: 'NY', zip: '10003', nonemployeeCompensation: 4500 }
  ];

  const payerData: PayerInfo = {
    payerEIN: '88-9991112',
    payerName: 'Liquid Financial Inc',
    addressLine1: '500 Howard St Ste 400',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    phone: '4155550199',
    tccCode: 'LQ99X'
  };

  const handleDownloadForm8949 = () => {
    const csv = Form1099DAEngine.exportToCSV(form1099Summary);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IRS_Form_8949_Dispositions_2026.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadIRISXml = () => {
    const xml = IRSEfileFormatter.generateIRISXml(payerData, contractorPayees, 2026);
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IRS_IRIS_Form1099NEC_Submission_2026.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase mb-1">
            <Calculator size={16} />
            <span>Unified Federal & Multi-State Tax Vault</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Tax Reporting & Compliance Engine</h1>
          <p className="text-slate-400 text-sm mt-1">
            Automated Form 1099-DA/8949 digital asset cost basis, IRC Section 174 R&D amortization, 50-state nexus radar, and IRIS e-filing.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('FORM_1099DA')}
            className={`px-3 py-2 rounded-lg transition-all ${activeTab === 'FORM_1099DA' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Form 1099-DA / 8949
          </button>
          <button
            onClick={() => setActiveTab('SEC_174')}
            className={`px-3 py-2 rounded-lg transition-all ${activeTab === 'SEC_174' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Sec 174 & R&D Credit
          </button>
          <button
            onClick={() => setActiveTab('NEXUS_RADAR')}
            className={`px-3 py-2 rounded-lg transition-all ${activeTab === 'NEXUS_RADAR' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            50-State Nexus Radar
          </button>
          <button
            onClick={() => setActiveTab('1099_NEC')}
            className={`px-3 py-2 rounded-lg transition-all ${activeTab === '1099_NEC' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            1099-NEC IRIS e-File
          </button>
        </div>
      </div>

      {/* TAB 1: FORM 1099-DA / 8949 */}
      {activeTab === 'FORM_1099DA' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <span className="text-xs text-slate-400 uppercase font-semibold">Gross Proceeds (Box 1d)</span>
              <div className="text-2xl font-bold text-white mt-1">${form1099Summary.totalGrossProceeds.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">{form1099Summary.allRows.length} reportable events</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Cost Basis (Box 1e)</span>
              <div className="text-2xl font-bold text-slate-200 mt-1">${form1099Summary.totalCostBasis.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">Verified with on-chain receipts</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <span className="text-xs text-slate-400 uppercase font-semibold">Realized Net Gain</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">+${form1099Summary.totalRealizedNetGain.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">Includes wash adjustments</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
              <span className="text-xs text-slate-400 uppercase font-semibold">1-Click IRS Export</span>
              <button
                onClick={handleDownloadForm8949}
                className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition-all shadow"
              >
                <Download size={14} />
                <span>Export Form 8949 CSV</span>
              </button>
            </div>
          </div>

          {/* Form 8949 Disposition Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-semibold text-white">IRS Form 8949 Capital Asset Dispositions (Tax Year 2026)</h3>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-medium">Form 1099-DA Compliant</span>
            </div>
            <div className="overflow-x-auto font-mono text-xs">
              <table className="w-full text-left text-slate-300">
                <thead className="bg-slate-950/70 text-[11px] text-slate-400 uppercase border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Property (1a)</th>
                    <th className="py-3 px-4">Acquired (1b)</th>
                    <th className="py-3 px-4">Sold (1c)</th>
                    <th className="py-3 px-4">Proceeds (1d)</th>
                    <th className="py-3 px-4">Basis (1e)</th>
                    <th className="py-3 px-4">Adj Code (1f)</th>
                    <th className="py-3 px-4">Net Gain (1h)</th>
                    <th className="py-3 px-4">Term</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {form1099Summary.allRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-white">{row.descriptionOfProperty}</td>
                      <td className="py-3 px-4 text-slate-400">{row.dateAcquired}</td>
                      <td className="py-3 px-4 text-slate-400">{row.dateSold}</td>
                      <td className="py-3 px-4 text-slate-200">${row.proceeds.toLocaleString()}</td>
                      <td className="py-3 px-4 text-slate-400">${row.costOrOtherBasis.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        {row.adjustmentCode ? (
                          <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                            {row.adjustmentCode} (${row.adjustmentAmount})
                          </span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>
                      <td className={`py-3 px-4 font-bold ${row.gainOrLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {row.gainOrLoss >= 0 ? '+' : ''}${row.gainOrLoss.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-[10px]">
                        <span className={`px-2 py-0.5 rounded ${row.term === 'LONG_TERM' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                          {row.term}
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

      {/* TAB 2: SECTION 174 & R&D TAX CREDIT */}
      {activeTab === 'SEC_174' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 174 Amortization */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <div>
              <div className="text-indigo-400 text-xs font-semibold uppercase">IRS Mandatory Capitalization</div>
              <h3 className="text-xl font-bold text-white">Section 174 R&D Amortization Schedule</h3>
              <p className="text-slate-400 text-xs mt-1">
                Mandatory 5-year domestic and 15-year foreign software development amortization (Mid-Year Convention).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[11px]">Total Domestic R&D</span>
                <div className="text-lg font-bold text-white mt-0.5">${sec174Report.totalDomesticRD.toLocaleString()}</div>
                <div className="text-[10px] text-emerald-400 mt-1">Year 1 Deduction: ${sec174Report.year1DomesticDeduction.toLocaleString()} (10%)</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[11px]">Total Foreign R&D</span>
                <div className="text-lg font-bold text-slate-300 mt-0.5">${sec174Report.totalForeignRD.toLocaleString()}</div>
                <div className="text-[10px] text-amber-400 mt-1">Year 1 Deduction: ${sec174Report.year1ForeignDeduction.toLocaleString()} (3.3%)</div>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto font-mono text-xs">
              <table className="w-full text-left">
                <thead className="text-slate-500 border-b border-slate-800 text-[11px] sticky top-0 bg-slate-900">
                  <tr>
                    <th className="py-2">Tax Year</th>
                    <th className="py-2">Rate</th>
                    <th className="py-2">Amortization Expense</th>
                    <th className="py-2">Remaining Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {sec174Report.domestic5YearSchedule.map(row => (
                    <tr key={row.year}>
                      <td className="py-2 text-slate-300">{row.year}</td>
                      <td className="py-2 text-slate-400">{(row.amortizationRate * 100).toFixed(0)}%</td>
                      <td className="py-2 text-emerald-400 font-semibold">${row.amortizationExpense.toLocaleString()}</td>
                      <td className="py-2 text-slate-400">${row.remainingBasis.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form 6765 Payroll Tax Credit */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <div>
              <div className="text-emerald-400 text-xs font-semibold uppercase">Startup Cash Preservation</div>
              <h3 className="text-xl font-bold text-white">Form 6765 Payroll Tax Credit Offset</h3>
              <p className="text-slate-400 text-xs mt-1">
                Offsets up to $500,000 against employer portion of FICA payroll taxes for companies with &lt; $5M revenue.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Qualified Research Expenses (QRE):</span>
                <span className="font-bold text-white">${form6765Estimate.qualifiedResearchExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">IRS Small Business Qualification:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Qualified Startup (&lt; 5 Yrs)
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Annual Statutory Cap:</span>
                <span className="font-mono text-slate-300">$500,000 / year</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-sm font-bold text-white">Estimated Payroll Offset:</span>
                <span className="text-xl font-bold text-emerald-400 font-mono">+${form6765Estimate.actualPayrollOffset.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl text-xs text-indigo-300">
              <span className="font-semibold">Actionable Savings: </span>
              This credit will directly reduce quarterly Form 941 payroll tax liabilities, preserving runway without waiting for income tax filing.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 50-STATE ECONOMIC NEXUS RADAR */}
      {activeTab === 'NEXUS_RADAR' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <h3 className="font-semibold text-white">50-State Sales Tax Economic Nexus Radar</h3>
            <p className="text-xs text-slate-400 mt-1">
              Tracks sales volume and transaction count thresholds established by South Dakota v. Wayfair to prevent uncollected sales tax penalties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nexusStatuses.map(s => (
              <div 
                key={s.stateCode} 
                className={`p-5 rounded-xl border transition-all ${
                  s.status === 'TRIGGERED' 
                    ? 'bg-rose-500/10 border-rose-500/40 shadow-lg' 
                    : s.status === 'APPROACHING'
                      ? 'bg-amber-500/10 border-amber-500/40'
                      : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className={s.status === 'TRIGGERED' ? 'text-rose-400' : 'text-blue-400'} />
                    <span className="font-bold text-white">{s.stateName} ({s.stateCode})</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    s.status === 'TRIGGERED'
                      ? 'bg-rose-500 text-white'
                      : s.status === 'APPROACHING'
                        ? 'bg-amber-500 text-black'
                        : 'bg-slate-800 text-slate-400'
                  }`}>
                    {s.status}
                  </span>
                </div>

                <div className="space-y-2 mt-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Revenue: ${s.currentRevenueUSD.toLocaleString()}</span>
                      <span>Target: ${s.revenueThresholdUSD.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${s.status === 'TRIGGERED' ? 'bg-rose-500' : s.status === 'APPROACHING' ? 'bg-amber-400' : 'bg-blue-500'}`}
                        style={{ width: `${s.revenueProgressPercent}%` }}
                      />
                    </div>
                  </div>

                  {s.transactionThreshold && (
                    <div className="text-[11px] text-slate-400 pt-1">
                      Transactions: {s.currentTransactionCount} / {s.transactionThreshold} orders
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <span className="text-slate-500">Action: </span>{s.recommendedAction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 1099-NEC IRIS E-FILE */}
      {activeTab === '1099_NEC' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">IRS IRIS Application-to-Application (A2A) e-Filer</h3>
              <p className="text-slate-400 text-xs mt-1">
                Generates compliant XML data packages for 1099-NEC nonemployee contractor compensation (&ge; $600 threshold).
              </p>
            </div>
            <button
              onClick={handleDownloadIRISXml}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-xs flex items-center gap-2 transition-all shadow"
            >
              <Download size={14} />
              <span>Download IRIS XML Package</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800">
              <h4 className="text-sm font-semibold text-white">Eligible Contractors ({contractorPayees.length} Verified)</h4>
            </div>
            <div className="divide-y divide-slate-800/60 font-mono text-xs">
              {contractorPayees.map(payee => (
                <div key={payee.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 hover:bg-slate-800/30">
                  <div>
                    <div className="font-bold text-white font-sans">{payee.name}</div>
                    <div className="text-[11px] text-slate-500">TIN: {payee.recipientTIN} ({payee.tinType}) &bull; {payee.city}, {payee.state}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold text-sm">${payee.nonemployeeCompensation.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500">Box 1 Nonemployee Comp</div>
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
