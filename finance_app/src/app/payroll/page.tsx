"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  Users,
  CheckCircle2,
  AlertCircle,
  Download,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  PieChart,
} from 'lucide-react';

interface JournalLine {
  id: string;
  account: string;
  type: 'Debit' | 'Credit';
  category: 'Expense' | 'Liability' | 'Asset';
  amount: number;
  description: string;
}

export default function PayrollMirrorPage() {
  const [payrollPeriod, setPayrollPeriod] = useState('Feb 15 - Feb 28, 2026');
  const [disbursedDate, setDisbursedDate] = useState('2026-03-01');
  const [isPosted, setIsPosted] = useState(false);

  // Balanced double-entry journal items
  const [journalLines, setJournalLines] = useState<JournalLine[]>([
    {
      id: 'jl-1',
      account: '60100 - Gross Wages & Salaries',
      type: 'Debit',
      category: 'Expense',
      amount: 45000.00,
      description: 'Regular & overtime pay for engineering, product & ops staff',
    },
    {
      id: 'jl-2',
      account: '60200 - Employer Payroll Taxes (FICA/Medicare)',
      type: 'Debit',
      category: 'Expense',
      amount: 3442.50,
      description: 'Company 7.65% mandatory payroll tax match',
    },
    {
      id: 'jl-3',
      account: '60300 - Employer SUTA / FUTA Unemployment',
      type: 'Debit',
      category: 'Expense',
      amount: 850.00,
      description: 'State and federal unemployment insurance contributions',
    },
    {
      id: 'jl-4',
      account: '60400 - 401(k) Employer Match',
      type: 'Debit',
      category: 'Expense',
      amount: 1800.00,
      description: '4% matching contribution for participating employees',
    },
    {
      id: 'jl-5',
      account: '60500 - Health, Dental & Vision Benefits',
      type: 'Debit',
      category: 'Expense',
      amount: 3200.00,
      description: 'Employer health insurance premium share',
    },
    // Credits (Liabilities & Cash)
    {
      id: 'jl-6',
      account: '20100 - Federal Income Tax Withholding Payable',
      type: 'Credit',
      category: 'Liability',
      amount: 7200.00,
      description: 'IRS employee withholding to be remitted on 941 deposit',
    },
    {
      id: 'jl-7',
      account: '20200 - State Income Tax Withholding Payable',
      type: 'Credit',
      category: 'Liability',
      amount: 2850.00,
      description: 'State EDD/DOR employee tax withholdings',
    },
    {
      id: 'jl-8',
      account: '20300 - FICA / Medicare Tax Payable',
      type: 'Credit',
      category: 'Liability',
      amount: 6885.00,
      description: 'Combined employee + employer FICA liability to IRS',
    },
    {
      id: 'jl-9',
      account: '20400 - 401(k) Deductions & Match Payable',
      type: 'Credit',
      category: 'Liability',
      amount: 3600.00,
      description: 'Employee deferrals + company match awaiting custodian transfer',
    },
    {
      id: 'jl-10',
      account: '10100 - Operating Bank Cash Account',
      type: 'Credit',
      category: 'Asset',
      amount: 33757.50,
      description: 'Net direct deposit payroll sweep withdrawn from bank',
    },
  ]);

  const totalDebits = journalLines.filter(j => j.type === 'Debit').reduce((sum, j) => sum + j.amount, 0);
  const totalCredits = journalLines.filter(j => j.type === 'Credit').reduce((sum, j) => sum + j.amount, 0);
  const variance = Math.abs(totalDebits - totalCredits);
  const isBalanced = variance < 0.01;

  const handlePostToLedger = () => {
    setIsPosted(true);
  };

  const handleExportJournal = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Payroll Mirror Double-Entry Journal\n" +
      `Pay Period,${payrollPeriod}\n` +
      `Disbursement Date,${disbursedDate}\n\n` +
      "Account,Type,Category,Amount,Description\n" +
      journalLines.map(j => `"${j.account}",${j.type},${j.category},${j.amount.toFixed(2)},"${j.description}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Payroll_Mirror_Journal_${disbursedDate}.csv`);
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
            <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Payroll Liability & Benefits Mirror</h1>
              <p className="text-sm text-gray-400">
                Gusto & Rippling Ledger Bridge • Double-Entry Accrual Splitting • Tax Liability Matching
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportJournal}
              className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-gray-300 px-4 py-2.5 rounded-xl font-medium text-sm border border-gray-800 transition"
            >
              <Download size={16} />
              <span>Export CPA Journal</span>
            </button>
            <button
              onClick={handlePostToLedger}
              disabled={!isBalanced || isPosted}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg ${
                isPosted
                  ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 cursor-default'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/20'
              }`}
            >
              <CheckCircle2 size={16} />
              <span>{isPosted ? 'Journal Posted to General Ledger' : 'Post to General Ledger'}</span>
            </button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Gross Wages (Expense)</span>
            <div className="text-2xl font-bold text-white mt-1">$45,000.00</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Engineering, Sales & Exec salaries</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-indigo-400 uppercase font-semibold">Taxes & Benefits Expense</span>
            <div className="text-2xl font-bold text-indigo-400 mt-1">$9,292.50</div>
            <span className="text-[11px] text-indigo-500/80 mt-1 block">FICA + SUTA + 401(k) + Health</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-amber-400 uppercase font-semibold">Total Tax Withholdings</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">$16,935.00</div>
            <span className="text-[11px] text-amber-500/80 mt-1 block">Federal + State + FICA owed</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Double-Entry Audit</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-2xl font-bold ${isBalanced ? 'text-emerald-400' : 'text-red-400'}`}>
                {isBalanced ? '$0.00 Variance' : 'Out of Balance'}
              </span>
              {isBalanced ? <CheckCircle2 size={20} className="text-emerald-400" /> : <AlertCircle size={20} className="text-red-400" />}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Debits = Credits ($54,292.50)</span>
          </div>
        </div>

        {/* Double-Entry Journal Table */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Double-Entry Payroll Journal Entry #{disbursedDate.replace(/-/g, '')}</h2>
              <p className="text-xs text-gray-400">Pay Period: {payrollPeriod} • Direct Deposit Disbursed: {disbursedDate}</p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-400">Status:</span>
              <span className={`px-2.5 py-0.5 rounded-full font-medium ${
                isPosted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {isPosted ? 'Reconciled & Posted' : 'Draft Ready to Post'}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-950 uppercase text-gray-400 font-semibold border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Account Code & Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Subledger Notes</th>
                  <th className="py-3 px-4 text-right">Debit</th>
                  <th className="py-3 px-4 text-right">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 font-mono">
                {journalLines.map((line) => (
                  <tr key={line.id} className="hover:bg-gray-800/40 transition">
                    <td className="py-3 px-4 font-sans font-medium text-white">{line.account}</td>
                    <td className="py-3 px-4 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        line.category === 'Expense' ? 'bg-blue-500/10 text-blue-400' :
                        line.category === 'Liability' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-purple-500/10 text-purple-400'
                      }`}>
                        {line.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans text-gray-400 text-[11px]">{line.description}</td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-semibold">
                      {line.type === 'Debit' ? `$${line.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-right text-indigo-300 font-semibold">
                      {line.type === 'Credit' ? `$${line.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-950/80 font-mono font-bold text-xs border-t border-gray-700">
                <tr>
                  <td colSpan={3} className="py-3.5 px-4 font-sans text-white uppercase text-[11px] tracking-wider">
                    Total Balanced Entries
                  </td>
                  <td className="py-3.5 px-4 text-right text-emerald-400">
                    ${totalDebits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-right text-indigo-300">
                    ${totalCredits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Founder Advice Callout */}
        <div className="mt-6 p-4 bg-gray-900 border border-gray-800 rounded-2xl flex items-start space-x-3 text-xs text-gray-400">
          <ShieldCheck size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-200">GAAP / CPA Compliance Note:</span>
            <p className="mt-0.5">
              Recording net paycheck debits as a single monolithic &quot;Payroll&quot; expense causes balance sheet inaccuracies and misstates gross operating expenses. Liquid&apos;s Payroll Mirror splits employer tax liabilities, health benefits, and employee tax withholdings into standard double-entry format automatically.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
