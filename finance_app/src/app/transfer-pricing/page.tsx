"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  ArrowRightLeft,
  Globe,
  Building2,
  FileCheck,
  CheckCircle2,
  Download,
  DollarSign,
  Percent,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface SubsidiaryCrossCharge {
  id: string;
  subsidiaryName: string;
  jurisdiction: string;
  role: string;
  monthlyOperatingCost: number;
  statutoryMarkupPct: number;
  markupAmount: number;
  totalInvoiceAmount: number;
  status: 'Invoiced & Reconciled' | 'Pending Monthly Run';
}

export default function TransferPricingPage() {
  const [markupRate, setMarkupRate] = useState<number>(10); // 10% statutory cost-plus
  const [subsidiaries, setSubsidiaries] = useState<SubsidiaryCrossCharge[]>([
    {
      id: 'sub-uk',
      subsidiaryName: 'Liquid Labs UK Ltd',
      jurisdiction: 'United Kingdom (HMRC)',
      role: 'Contract Software R&D & AI Engine',
      monthlyOperatingCost: 65000,
      statutoryMarkupPct: 10,
      markupAmount: 6500,
      totalInvoiceAmount: 71500,
      status: 'Invoiced & Reconciled',
    },
    {
      id: 'sub-eu',
      subsidiaryName: 'Liquid Europe B.V.',
      jurisdiction: 'Netherlands (Belastingdienst)',
      role: 'European Sales, Customer Support & Marketing',
      monthlyOperatingCost: 32000,
      statutoryMarkupPct: 8,
      markupAmount: 2560,
      totalInvoiceAmount: 34560,
      status: 'Pending Monthly Run',
    },
  ]);

  const totalMonthlyCrossCharges = subsidiaries.reduce((sum, s) => sum + s.totalInvoiceAmount, 0);
  const totalMarkupProfits = subsidiaries.reduce((sum, s) => sum + s.markupAmount, 0);

  const handleExportTransferPricingAgreement = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Intercompany Transfer Pricing & Cost-Plus Cross-Charge Register\n" +
      "IRC § 482 and OECD Transfer Pricing Compliance\n" +
      "Generated At," + new Date().toISOString() + "\n\n" +
      "Subsidiary Name,Jurisdiction,Functional Profile,Operating Costs,Cost-Plus Markup %,Markup Fee,Total Cross-Charge Invoice,Status\n" +
      subsidiaries.map(s => `"${s.subsidiaryName}","${s.jurisdiction}","${s.role}",$${s.monthlyOperatingCost},${s.statutoryMarkupPct}%,$${s.markupAmount},$${s.totalInvoiceAmount},"${s.status}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Intercompany_Transfer_Pricing_Cost_Plus_Register.csv`);
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
              <Globe size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Transfer Pricing & Cost-Plus Cross-Charge</h1>
              <p className="text-sm text-gray-400">
                OECD & IRS § 482 Compliance • International Subsidiary Cost-Plus Markup • Intercompany Journaling
              </p>
            </div>
          </div>
          <button
            onClick={handleExportTransferPricingAgreement}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-blue-600/20"
          >
            <Download size={16} />
            <span>Export Transfer Pricing Register</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Active Subsidiaries</span>
            <div className="text-2xl font-bold text-white mt-1">{subsidiaries.length} Foreign Entities</div>
            <span className="text-[11px] text-gray-500 mt-1 block">UK Ltd + Netherlands B.V.</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-blue-400 uppercase font-semibold">Monthly Cross-Charge</span>
            <div className="text-2xl font-bold text-blue-400 mt-1">
              ${totalMonthlyCrossCharges.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Billed from subsidiaries to Parent</span>
          </div>

          <div className="bg-gray-900 border border-emerald-500/20 bg-emerald-950/10 p-5 rounded-2xl">
            <span className="text-xs text-emerald-400 uppercase font-semibold">Subsidiary Retained Profit</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              +${totalMarkupProfits.toLocaleString('en-US', { minimumFractionDigits: 2 })}/mo
            </div>
            <span className="text-[11px] text-emerald-300/80 mt-1 block">Statutory arm&apos;s length margin</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Audit Defense Protocol</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">Arm&apos;s Length</span>
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">IRS & OECD safe harbor compliant</span>
          </div>
        </div>

        {/* Arm's Length Advisory */}
        <div className="mt-6 p-4 bg-gray-900 border border-gray-800 rounded-2xl flex items-start space-x-3 text-xs text-gray-400">
          <ShieldCheck size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-200">International Arm&apos;s Length Statutory Standard (IRC § 482):</span>
            <p className="mt-0.5">
              When a US parent company funds foreign software engineering or sales subsidiaries, the subsidiary cannot simply pass through costs at zero margin. Tax authorities (HMRC, Belastingdienst) mandate a reasonable cost-plus markup (typically 8% to 12%) so the subsidiary reports taxable local income, preventing double-taxation audits.
            </p>
          </div>
        </div>

        {/* Subsidiaries Cross-Charge Table */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Intercompany Subsidiary Agreements & Monthly Billing</h2>
              <p className="text-xs text-gray-400">Operating expense base, statutory markups, and cross-charge balances</p>
            </div>
            <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full font-medium">
              Synchronized with /consolidation
            </span>
          </div>

          <div className="divide-y divide-gray-800">
            {subsidiaries.map((sub) => (
              <div key={sub.id} className="p-5 hover:bg-gray-800/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white text-sm">{sub.subsidiaryName}</span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono">
                      {sub.jurisdiction}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">{sub.role}</div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase">Subsidiary Costs</div>
                    <div className="text-white font-semibold">${sub.monthlyOperatingCost.toLocaleString()}/mo</div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-[10px] uppercase">Markup ({sub.statutoryMarkupPct}%)</div>
                    <div className="text-emerald-400 font-semibold">+${sub.markupAmount.toLocaleString()}/mo</div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-[10px] uppercase">Invoice to Parent</div>
                    <div className="text-white font-bold text-sm">${sub.totalInvoiceAmount.toLocaleString()}/mo</div>
                  </div>

                  <div className="font-sans">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                      sub.status === 'Invoiced & Reconciled' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
