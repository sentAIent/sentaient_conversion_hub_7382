"use client";

import React, { useState } from 'react';
import { useTransactions } from '@/context/TransactionContext';
import { useEntity } from '@/context/EntityContext';
import {
  FileText,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Calendar,
  ShieldAlert,
  ArrowRight,
  Plus,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Bill {
  id: string;
  vendor: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  category: string;
  status: 'PENDING_APPROVAL' | 'SCHEDULED' | 'PAID';
  requiresFounderApproval: boolean;
  approved: boolean;
}

const INITIAL_BILLS: Bill[] = [
  {
    id: 'bill_1',
    vendor: 'Cooley LLP (Legal Counsel)',
    invoiceNumber: 'INV-88210',
    amount: 3200.00,
    dueDate: '2026-11-20',
    category: 'Legal & Professional',
    status: 'PENDING_APPROVAL',
    requiresFounderApproval: true,
    approved: false,
  },
  {
    id: 'bill_2',
    vendor: 'Datadog Cloud Monitoring',
    invoiceNumber: 'DD-9921',
    amount: 450.00,
    dueDate: '2026-11-15',
    category: 'Software/Hosting',
    status: 'SCHEDULED',
    requiresFounderApproval: false,
    approved: true,
  },
  {
    id: 'bill_3',
    vendor: 'WeWork Global Facilities',
    invoiceNumber: 'WW-1092',
    amount: 1400.00,
    dueDate: '2026-11-12',
    category: 'Rent & Facilities',
    status: 'PENDING_APPROVAL',
    requiresFounderApproval: true,
    approved: false,
  },
  {
    id: 'bill_4',
    vendor: 'Design Studio Freelance',
    invoiceNumber: 'DS-004',
    amount: 800.00,
    dueDate: '2026-11-08',
    category: 'Contractor Wages',
    status: 'PAID',
    requiresFounderApproval: false,
    approved: true,
  },
];

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>(INITIAL_BILLS);
  const { addTransactions } = useTransactions();
  const { activeEntity } = useEntity();

  const [newBill, setNewBill] = useState({
    vendor: '',
    invoiceNumber: '',
    amount: '',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: 'Software/Hosting',
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const totalOutstanding = bills
    .filter((b) => b.status !== 'PAID')
    .reduce((sum, b) => sum + b.amount, 0);

  const dueThisWeek = bills
    .filter((b) => b.status !== 'PAID' && new Date(b.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    .reduce((sum, b) => sum + b.amount, 0);

  const pendingApprovalCount = bills.filter((b) => b.status === 'PENDING_APPROVAL').length;

  const handleApprove = (id: string) => {
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, approved: true, status: 'SCHEDULED' } : b))
    );
    toast.success('Bill approved and scheduled for automated payment.');
  };

  const handlePayBill = (bill: Bill) => {
    // Add negative transaction to ledger
    addTransactions([
      {
        id: `bill_pay_${bill.id}_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        merchant: `${bill.vendor} (Bill #${bill.invoiceNumber})`,
        amount: -bill.amount,
      },
    ]);

    setBills((prev) =>
      prev.map((b) => (b.id === bill.id ? { ...b, status: 'PAID' } : b))
    );
    toast.success(`Bill to ${bill.vendor} marked as Paid. Posted -$${bill.amount.toFixed(2)} to ledger.`);
  };

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBill.vendor || !newBill.amount) {
      toast.error('Please enter vendor name and amount');
      return;
    }

    const amountNum = parseFloat(newBill.amount);
    const requiresFounder = amountNum >= 1000;

    const created: Bill = {
      id: `bill_${Date.now()}`,
      vendor: newBill.vendor,
      invoiceNumber: newBill.invoiceNumber || `BILL-${Math.floor(100 + Math.random() * 900)}`,
      amount: amountNum,
      dueDate: newBill.dueDate,
      category: newBill.category,
      status: requiresFounder ? 'PENDING_APPROVAL' : 'SCHEDULED',
      requiresFounderApproval: requiresFounder,
      approved: !requiresFounder,
    };

    setBills([created, ...bills]);
    setShowAddModal(false);
    setNewBill({ vendor: '', invoiceNumber: '', amount: '', dueDate: '', category: 'Software/Hosting' });
    toast.success('Bill queued in Accounts Payable inbox.');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Accounts Payable & Bills</h1>
          <p className="text-gray-500 mt-1">
            Vendor invoice capture, approval hierarchies, and scheduled ACH disbursements for {activeEntity?.name || 'Company'}.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition flex items-center gap-2 text-sm shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Vendor Bill
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
            <span>Total Outstanding AP</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${totalOutstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-400 mt-1">{bills.filter((b) => b.status !== 'PAID').length} unpaid vendor bills</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
            <span>Due This Week</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-amber-600 mt-2">
            ${dueThisWeek.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-400 mt-1">Cash required in next 7 business days</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-500 font-medium">
            <span>Founder Approvals Required</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-3xl font-bold text-rose-600 mt-2">{pendingApprovalCount}</p>
          <p className="text-xs text-gray-400 mt-1">Bills exceeding \$1,000 threshold policy</p>
        </div>
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Vendor Invoices & Payment Schedule</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Vendor</th>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4 font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span>{bill.vendor}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-gray-500">{bill.invoiceNumber}</td>
                  <td className="py-3.5 px-4 text-xs text-gray-600">{bill.category}</td>
                  <td className="py-3.5 px-4 text-xs text-gray-700">{bill.dueDate}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                    ${bill.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        bill.status === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : bill.status === 'SCHEDULED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {bill.status === 'PAID'
                        ? 'Paid'
                        : bill.status === 'SCHEDULED'
                        ? 'Scheduled (ACH)'
                        : 'Approval Required'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {bill.status === 'PENDING_APPROVAL' && (
                      <button
                        onClick={() => handleApprove(bill.id)}
                        className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg transition"
                      >
                        Approve Bill
                      </button>
                    )}
                    {bill.status === 'SCHEDULED' && (
                      <button
                        onClick={() => handlePayBill(bill)}
                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg transition"
                      >
                        Mark as Paid
                      </button>
                    )}
                    {bill.status === 'PAID' && (
                      <span className="text-xs text-emerald-600 font-medium flex items-center justify-end gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Reconciled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Add Bill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Add Vendor Bill</h3>
            <form onSubmit={handleCreateBill} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Vendor / Payee</label>
                <input
                  type="text"
                  placeholder="e.g. AWS, Stripe, WeWork"
                  value={newBill.vendor}
                  onChange={(e) => setNewBill({ ...newBill, vendor: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Invoice Number</label>
                <input
                  type="text"
                  placeholder="e.g. INV-2026-001"
                  value={newBill.invoiceNumber}
                  onChange={(e) => setNewBill({ ...newBill, invoiceNumber: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newBill.amount}
                    onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newBill.dueDate}
                    onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Expense Account</label>
                <select
                  value={newBill.category}
                  onChange={(e) => setNewBill({ ...newBill, category: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Software/Hosting">Software & Hosting</option>
                  <option value="Legal & Professional">Legal & Professional</option>
                  <option value="Rent & Facilities">Rent & Facilities</option>
                  <option value="Contractor Wages">Contractor Wages</option>
                  <option value="Advertising & Marketing">Advertising & Marketing</option>
                  <option value="Office Supplies">Office Supplies</option>
                </select>
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
                  Save Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
