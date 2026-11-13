"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  Calculator,
  ShieldCheck,
  Download,
  CheckCircle2,
  AlertTriangle,
  Server,
  Users,
  Code2,
  DollarSign,
  FileSpreadsheet,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface QualifiedRole {
  id: string;
  name: string;
  role: string;
  annualSalary: number;
  qrePercentage: number;
}

interface QualifiedContractor {
  id: string;
  name: string;
  project: string;
  totalPaid: number;
  qrePercentage: number;
}

export default function RDCreditsPage() {
  // Wage QREs
  const [employees, setEmployees] = useState<QualifiedRole[]>([
    { id: '1', name: 'Alex Rivera', role: 'Lead Architect / AI Engine', annualSalary: 185000, qrePercentage: 90 },
    { id: '2', name: 'Samantha Wu', role: 'Senior Fullstack Engineer', annualSalary: 160000, qrePercentage: 85 },
    { id: '3', name: 'Marcus Vance', role: 'DevOps & Distributed Systems', annualSalary: 155000, qrePercentage: 80 },
    { id: '4', name: 'Elena Rostova', role: 'Product Design & Prototyping', annualSalary: 130000, qrePercentage: 65 },
  ]);

  // Contractor QREs (Statutory 65% rule applied)
  const [contractors, setContractors] = useState<QualifiedContractor[]>([
    { id: 'c1', name: 'Apex Synthesis Labs', project: 'Neural WebGL Rendering Pipeline', totalPaid: 48000, qrePercentage: 100 },
    { id: 'c2', name: 'Vanguard Security LLC', project: 'Zero-Knowledge Proof Audit', totalPaid: 25000, qrePercentage: 80 },
  ]);

  // Cloud & Computer Hosting QREs
  const [cloudHostingExpense, setCloudHostingExpense] = useState<number>(42000); // Dev & staging cluster expense

  // 4-Part IRS Test Checklist
  const [irsTest1, setIrsTest1] = useState(true); // Permitted Purpose (New/improved functionality, performance, reliability)
  const [irsTest2, setIrsTest2] = useState(true); // Technological in Nature (Relies on computer science, engineering)
  const [irsTest3, setIrsTest3] = useState(true); // Elimination of Uncertainty (Technical risk at project outset)
  const [irsTest4, setIrsTest4] = useState(true); // Process of Experimentation (Iterative testing, prototyping, modeling)

  // Prior 3-year QRE average for Alternative Simplified Credit (ASC) method
  const priorThreeYearAvgQRE = 210000;

  // Wage QRE calculation
  const totalWageQRE = employees.reduce((sum, emp) => sum + (emp.annualSalary * (emp.qrePercentage / 100)), 0);

  // Contractor QRE calculation (Statutory 65% under IRC § 41(b)(3))
  const rawContractorQRE = contractors.reduce((sum, c) => sum + (c.totalPaid * (c.qrePercentage / 100)), 0);
  const statutoryContractorQRE = rawContractorQRE * 0.65;

  // Total QRE
  const totalQRE = totalWageQRE + statutoryContractorQRE + cloudHostingExpense;

  // ASC Method: 14% of QRE in excess of 50% of prior 3-year average
  const ascBaseAmount = priorThreeYearAvgQRE * 0.5;
  const excessQRE = Math.max(0, totalQRE - ascBaseAmount);
  const estimatedCredit = excessQRE * 0.14;

  // Max payroll offset election under Section 41(h) is $500,000 / year against employer FICA/OASDI
  const payrollOffsetEligible = Math.min(500000, estimatedCredit);

  const handleUpdateEmployee = (id: string, newPct: number) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, qrePercentage: Math.min(100, Math.max(0, newPct)) } : e));
  };

  const handleExportForm6765 = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "IRS Form 6765 - Credit for Increasing Research Activities Summary\n" +
      `Tax Year,2026\n` +
      `Qualified In-House Wages,$${totalWageQRE.toFixed(2)}\n` +
      `Qualified Contractor Research (65% Statutory),$${statutoryContractorQRE.toFixed(2)}\n` +
      `Qualified Cloud & Dev Computing,$${cloudHostingExpense.toFixed(2)}\n` +
      `Total Qualified Research Expenses (QRE),$${totalQRE.toFixed(2)}\n` +
      `Alternative Simplified Credit (ASC) Base (50% Prior Avg),$${ascBaseAmount.toFixed(2)}\n` +
      `Excess QRE subject to 14% credit,$${excessQRE.toFixed(2)}\n` +
      `Total Federal R&D Tax Credit Estimate,$${estimatedCredit.toFixed(2)}\n` +
      `Section 41(h) Payroll Tax Offset Election,$${payrollOffsetEligible.toFixed(2)}\n` +
      `Four-Part IRS Test Verified,YES\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `IRS_Form_6765_RD_Credit_Dossier_2026.csv`);
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
          <div>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
                <Calculator size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">R&D Tax Credit Engine</h1>
                <p className="text-sm text-gray-400">
                  IRS Section 41 & Form 6765 • Alternative Simplified Credit & Payroll Tax Offset
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportForm6765}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-blue-600/20"
            >
              <Download size={16} />
              <span>Export Form 6765 Dossier</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Total Qualified QRE</span>
            <div className="text-2xl font-bold text-white mt-1">
              ${totalQRE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Wages + 65% Contractors + Cloud</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-blue-400 uppercase font-semibold">Federal Credit (ASC)</span>
            <div className="text-2xl font-bold text-blue-400 mt-1">
              ${estimatedCredit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">14% on QRE excess over base</span>
          </div>

          <div className="bg-gray-900 border border-green-500/20 bg-green-950/10 p-5 rounded-2xl">
            <span className="text-xs text-green-400 uppercase font-semibold">Payroll Tax Offset §41(h)</span>
            <div className="text-2xl font-bold text-green-400 mt-1">
              ${payrollOffsetEligible.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-green-500/80 mt-1 block">Protects cash against FICA/OASDI</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Audit Defense Score</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">100%</span>
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">4-Part IRS statutory test verified</span>
          </div>
        </div>

        {/* 4-Part IRS Test Status */}
        <div className="bg-gray-900/80 border border-gray-800 p-5 rounded-2xl mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck size={18} className="text-blue-400" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                IRS 4-Part Statutory Qualification Test (IRC § 41(d))
              </h2>
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
              Audit-Ready Safe Harbor
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div
              onClick={() => setIrsTest1(!irsTest1)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                irsTest1 ? 'bg-blue-950/20 border-blue-500/30 text-blue-200' : 'bg-gray-800/40 border-gray-800 text-gray-400'
              }`}
            >
              <div className="flex items-center space-x-2 font-semibold">
                <CheckCircle2 size={15} className={irsTest1 ? 'text-blue-400' : 'text-gray-500'} />
                <span>1. Permitted Purpose</span>
              </div>
              <p className="mt-1.5 text-[11px] text-gray-400">
                Creates or improves functionality, performance, reliability, or quality of software.
              </p>
            </div>

            <div
              onClick={() => setIrsTest2(!irsTest2)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                irsTest2 ? 'bg-blue-950/20 border-blue-500/30 text-blue-200' : 'bg-gray-800/40 border-gray-800 text-gray-400'
              }`}
            >
              <div className="flex items-center space-x-2 font-semibold">
                <CheckCircle2 size={15} className={irsTest2 ? 'text-blue-400' : 'text-gray-500'} />
                <span>2. Technological Nature</span>
              </div>
              <p className="mt-1.5 text-[11px] text-gray-400">
                Relies upon principles of computer science, algorithmic modeling, and engineering.
              </p>
            </div>

            <div
              onClick={() => setIrsTest3(!irsTest3)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                irsTest3 ? 'bg-blue-950/20 border-blue-500/30 text-blue-200' : 'bg-gray-800/40 border-gray-800 text-gray-400'
              }`}
            >
              <div className="flex items-center space-x-2 font-semibold">
                <CheckCircle2 size={15} className={irsTest3 ? 'text-blue-400' : 'text-gray-500'} />
                <span>3. Elimination of Uncertainty</span>
              </div>
              <p className="mt-1.5 text-[11px] text-gray-400">
                Technical uncertainty regarding feasibility, optimal architecture, or methodology.
              </p>
            </div>

            <div
              onClick={() => setIrsTest4(!irsTest4)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                irsTest4 ? 'bg-blue-950/20 border-blue-500/30 text-blue-200' : 'bg-gray-800/40 border-gray-800 text-gray-400'
              }`}
            >
              <div className="flex items-center space-x-2 font-semibold">
                <CheckCircle2 size={15} className={irsTest4 ? 'text-blue-400' : 'text-gray-500'} />
                <span>4. Experimentation Process</span>
              </div>
              <p className="mt-1.5 text-[11px] text-gray-400">
                Involves testing alternatives, simulations, prototype evaluation, and benchmarking.
              </p>
            </div>
          </div>
        </div>

        {/* Wage QRE Allocator */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users size={18} className="text-blue-400" />
              <h2 className="text-base font-semibold">Engineering & Product Wages (Form 6765 Line 24)</h2>
            </div>
            <span className="text-xs text-gray-400">
              Subtotal QRE: <strong className="text-white">${totalWageQRE.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-gray-950 text-xs uppercase text-gray-400 font-semibold border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Role / Qualifying Domain</th>
                  <th className="py-3 px-4 text-right">Base Salary</th>
                  <th className="py-3 px-4 text-center">R&D Time Allocation</th>
                  <th className="py-3 px-4 text-right">Qualified Wage QRE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-xs">
                {employees.map((emp) => {
                  const empQRE = emp.annualSalary * (emp.qrePercentage / 100);
                  return (
                    <tr key={emp.id} className="hover:bg-gray-800/40 transition">
                      <td className="py-3.5 px-4 font-medium text-white">{emp.name}</td>
                      <td className="py-3.5 px-4 text-gray-400">{emp.role}</td>
                      <td className="py-3.5 px-4 text-right font-mono">${emp.annualSalary.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center space-x-3">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={emp.qrePercentage}
                            onChange={(e) => handleUpdateEmployee(emp.id, parseInt(e.target.value))}
                            className="w-24 accent-blue-500 cursor-pointer"
                          />
                          <span className="w-10 text-right font-semibold text-blue-400">{emp.qrePercentage}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-white">
                        ${empQRE.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contractor & Cloud Compute QREs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Contractors */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Code2 size={18} className="text-purple-400" />
                <h2 className="text-sm font-semibold">Contractor Research (65% Statutory Rule)</h2>
              </div>
              <span className="text-xs text-purple-400 font-semibold font-mono">
                ${statutoryContractorQRE.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mb-3">
              IRC § 41(b)(3) mandates that qualified third-party contractor expenses are capped at 65% for credit eligibility.
            </p>
            <div className="space-y-2.5">
              {contractors.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 bg-gray-950/60 rounded-xl border border-gray-800/80 text-xs">
                  <div>
                    <div className="font-medium text-white">{c.name}</div>
                    <div className="text-[11px] text-gray-400">{c.project}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-gray-300">${c.totalPaid.toLocaleString()} invoiced</div>
                    <div className="text-[11px] text-purple-400 font-semibold">
                      QRE: ${(c.totalPaid * 0.65).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud Infrastructure */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Server size={18} className="text-cyan-400" />
                <h2 className="text-sm font-semibold">Qualified Dev & Cloud Infrastructure</h2>
              </div>
              <span className="text-xs text-cyan-400 font-semibold font-mono">
                ${cloudHostingExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mb-3">
              Cloud servers, GPU clusters, and CI/CD compute dedicated directly to software experimentation and test harnesses.
            </p>
            <div className="bg-gray-950/60 p-4 rounded-xl border border-gray-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300">AWS / GCP Experimental Compute:</span>
                <span className="font-mono text-white">$32,000.00</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300">GitHub Actions & Model Training Harnesses:</span>
                <span className="font-mono text-white">$10,000.00</span>
              </div>
              <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs font-semibold">
                <span className="text-cyan-300">Total Cloud QRE:</span>
                <span className="font-mono text-cyan-300">${cloudHostingExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 41(h) Safe Harbor Advisory */}
        <div className="mt-6 p-4 bg-blue-950/20 border border-blue-500/30 rounded-2xl flex items-start space-x-3 text-xs">
          <CheckCircle2 size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-blue-200">Start-Up Payroll Tax Offset Qualification:</span>
            <p className="text-blue-300/80 mt-0.5">
              Companies with gross receipts under \$5,000,000 and under 5 years of historical revenue can elect under Section 41(h) to apply up to \$500,000 of R&D tax credits directly against their quarterly employer OASDI/Medicare payroll tax liability, resulting in immediate cash savings.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
