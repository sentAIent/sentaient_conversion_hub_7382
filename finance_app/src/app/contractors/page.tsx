"use client";

import React, { useState } from 'react';
import { useEntity } from '@/context/EntityContext';
import {
  Users,
  FileCheck,
  Download,
  Send,
  Plus,
  AlertCircle,
  CheckCircle,
  FileText,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Contractor {
  id: string;
  name: string;
  businessType: 'Individual / Sole Prop' | 'Single-Member LLC' | 'LLC-C' | 'LLC-S';
  email: string;
  w9Status: 'VERIFIED' | 'PENDING_SIGNATURE';
  ytdPaid: number;
}

const INITIAL_CONTRACTORS: Contractor[] = [
  {
    id: 'c_1',
    name: 'Alex Rivera (Frontend Engineer)',
    businessType: 'Single-Member LLC',
    email: 'alex@riveradev.com',
    w9Status: 'VERIFIED',
    ytdPaid: 14500.00,
  },
  {
    id: 'c_2',
    name: 'Elena Rostova (UI/UX Design)',
    businessType: 'Individual / Sole Prop',
    email: 'elena.rostova@design.io',
    w9Status: 'VERIFIED',
    ytdPaid: 4200.00,
  },
  {
    id: 'c_3',
    name: 'Marcus Vance (Copywriting & SEO)',
    businessType: 'Individual / Sole Prop',
    email: 'marcus@vancecopy.com',
    w9Status: 'PENDING_SIGNATURE',
    ytdPaid: 850.00,
  },
  {
    id: 'c_4',
    name: 'Sarah Chen (DevOps Contractor)',
    businessType: 'Single-Member LLC',
    email: 'schen@cloudops.net',
    w9Status: 'VERIFIED',
    ytdPaid: 500.00,
  },
];

export default function ContractorsPage() {
  const [contractors, setContractors] = useState<Contractor[]>(INITIAL_CONTRACTORS);
  const { activeEntity } = useEntity();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContractor, setNewContractor] = useState({
    name: '',
    email: '',
    businessType: 'Individual / Sole Prop' as Contractor['businessType'],
    initialPaid: '',
  });

  const totalContractorWages = contractors.reduce((sum, c) => sum + c.ytdPaid, 0);
  const requires1099Count = contractors.filter((c) => c.ytdPaid >= 600).length;

  const handleSendW9Request = (contractor: Contractor) => {
    toast.success(`W-9 electronic signature link dispatched to ${contractor.email}!`);
  };

  const handleExport1099Summary = () => {
    const csvRows = [
      ['Contractor Name', 'Tax Classification', 'Email', 'W9 On File', 'Box 1 Nonemployee Compensation (USD)'],
      ...contractors
        .filter((c) => c.ytdPaid >= 600)
        .map((c) => [c.name, c.businessType, c.email, c.w9Status, c.ytdPaid.toFixed(2)]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `irs_1099_nec_summary_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Form 1099-NEC annual export generated!');
  };

  const handleCreateContractor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContractor.name || !newContractor.email) {
      toast.error('Please enter name and email');
      return;
    }

    const created: Contractor = {
      id: `c_${Date.now()}`,
      name: newContractor.name,
      email: newContractor.email,
      businessType: newContractor.businessType,
      w9Status: 'PENDING_SIGNATURE',
      ytdPaid: parseFloat(newContractor.initialPaid || '0'),
    };

    setContractors([...contractors, created]);
    setShowAddModal(false);
    setNewContractor({ name: '', email: '', businessType: 'Individual / Sole Prop', initialPaid: '' });
    toast.success('Contractor added to compliance roster.');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Contractors & 1099-NEC</h1>
          <p className="text-gray-500 mt-1">
            W-9 collection, IRS \$600 threshold compliance, and automated 1099 tax filing summaries for {activeEntity?.name || 'Company'}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleExport1099Summary}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl transition flex items-center gap-2 text-sm shadow-sm"
          >
            <Download className="w-4 h-4" /> Export 1099-NECs (CPA / IRS)
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition flex items-center gap-2 text-sm shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Contractor
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
            <span>YTD Contractor Wages</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${totalContractorWages.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-400 mt-1">Total nonemployee compensation paid</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
            <span>Mandatory 1099-NEC Filings</span>
            <FileText className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-amber-600 mt-2">{requires1099Count} Contractors</p>
          <p className="text-xs text-gray-400 mt-1">Contractors exceeding IRS \$600 filing rule</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
            <span>W-9 Compliance Rate</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {Math.round((contractors.filter((c) => c.w9Status === 'VERIFIED').length / contractors.length) * 100)}%
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {contractors.filter((c) => c.w9Status === 'VERIFIED').length} of {contractors.length} tax forms on file
          </p>
        </div>
      </div>

      {/* Contractors Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Contractor Compliance Roster</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Contractor</th>
                <th className="py-3 px-4">Entity Classification</th>
                <th className="py-3 px-4 text-center">W-9 Form Status</th>
                <th className="py-3 px-4 text-right">YTD Payments</th>
                <th className="py-3 px-4">IRS \$600 Threshold Progress</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contractors.map((c) => {
                const isOverThreshold = c.ytdPaid >= 600;
                const percent = Math.min(100, Math.round((c.ytdPaid / 600) * 100));

                return (
                  <tr key={c.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      <div>{c.name}</div>
                      <div className="text-xs font-normal text-gray-400">{c.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-600">{c.businessType}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          c.w9Status === 'VERIFIED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {c.w9Status === 'VERIFIED' ? 'W-9 Signed' : 'W-9 Missing'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                      ${c.ytdPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 w-48">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${isOverThreshold ? 'bg-amber-500' : 'bg-blue-500'}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-gray-500 whitespace-nowrap">
                          {isOverThreshold ? 'Req 1099' : `${percent}%`}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {c.w9Status === 'PENDING_SIGNATURE' ? (
                        <button
                          onClick={() => handleSendW9Request(c)}
                          className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-semibold px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" /> Request W-9
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium">Compliant</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Contractor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Add New Contractor</h3>
            <form onSubmit={handleCreateContractor} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={newContractor.name}
                  onChange={(e) => setNewContractor({ ...newContractor, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="contractor@domain.com"
                  value={newContractor.email}
                  onChange={(e) => setNewContractor({ ...newContractor, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tax Classification</label>
                <select
                  value={newContractor.businessType}
                  onChange={(e) =>
                    setNewContractor({
                      ...newContractor,
                      businessType: e.target.value as Contractor['businessType'],
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Individual / Sole Prop">Individual / Sole Prop</option>
                  <option value="Single-Member LLC">Single-Member LLC</option>
                  <option value="LLC-S">LLC (Treated as S-Corp)</option>
                  <option value="LLC-C">LLC (Treated as C-Corp)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Initial YTD Payouts ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={newContractor.initialPaid}
                  onChange={(e) => setNewContractor({ ...newContractor, initialPaid: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm"
                >
                  Add to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
