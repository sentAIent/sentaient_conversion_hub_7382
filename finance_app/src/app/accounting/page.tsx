"use client";

import { useMemo } from 'react';
import { Transaction, categorizeTransaction, generateFinancialStatements } from '@/lib/categorizationEngine';
import ReceiptUploader from '@/components/ReceiptUploader';
import ComingSoonOverlay from '@/components/ComingSoonOverlay';

// Mock Data
const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-24', merchant: 'Stripe Client Payment', amount: 4500.00 },
  { id: '2', date: '2023-10-23', merchant: 'AWS Services', amount: -120.00 },
  { id: '3', date: '2023-10-20', merchant: 'Uber Trip', amount: -35.50 },
  { id: '4', date: '2023-10-18', merchant: 'Starbucks Coffee', amount: -8.50 },
  { id: '5', date: '2023-10-15', merchant: 'Github Pro', amount: -4.00 },
  { id: '6', date: '2023-10-10', merchant: 'Amazon Office Desk', amount: -299.99 },
  { id: '7', date: '2023-10-05', merchant: 'PayPal Transfer', amount: 1500.00 },
  { id: '8', date: '2023-10-02', merchant: 'Local Hardware Store', amount: -45.00 },
];

const mockAccounts: { name: string; type: 'ASSET' | 'LIABILITY'; balance: number }[] = [
  { name: 'Chase Checking', type: 'ASSET', balance: 14500.20 },
  { name: 'Coinbase BTC (0.5)', type: 'ASSET', balance: 30000.00 },
  { name: 'Amex Platinum', type: 'LIABILITY', balance: 2450.00 },
];

export default function AccountingPage() {
  const { categorizedTxs, financials } = useMemo(() => {
    const categorizedTxs = mockTransactions.map(categorizeTransaction);
    const financials = generateFinancialStatements(categorizedTxs, mockAccounts);
    return { categorizedTxs, financials };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print-container">
      {/* Hide this header when printing */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 print-hide">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounting & P&L</h1>
          <p className="text-gray-500 mt-1">Automated income statement and balance sheet.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => {
              import('@/lib/exportUtils').then(module => {
                module.exportTransactionsToCSV(mockTransactions, 'cpa_export_transactions.csv');
              });
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
          >
            Export for CPA (CSV)
          </button>
          <button 
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Print Statements
          </button>
        </div>
      </div>

      <ComingSoonOverlay>
      <ReceiptUploader />

      {/* Print only header */}
      <div className="hidden print-show text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Financial Statements</h1>
        <p className="text-gray-500 mt-2">Generated on {new Date().toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print-grid">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 print-card">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Income</h3>
          <p className="text-3xl font-bold text-green-600">${financials.totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 print-card">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">${financials.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 print-card">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Net Profit</h3>
          <p className={`text-3xl font-bold ${financials.netProfit >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
            ${financials.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print-grid">
        {/* Income Statement */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 print-card">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Income Statement</h2>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700 bg-gray-50 p-2 rounded print-bg-gray">Revenue</h3>
            {Object.entries(financials.breakdown).map(([category, amount]) => {
              if (amount > 0) {
                return (
                  <div key={category} className="flex justify-between px-2 text-sm">
                    <span>{category}</span>
                    <span>${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                );
              }
              return null;
            })}
            
            <h3 className="font-medium text-gray-700 bg-gray-50 p-2 rounded mt-4 print-bg-gray">Operating Expenses</h3>
            {Object.entries(financials.breakdown).map(([category, amount]) => {
              if (amount < 0) {
                return (
                  <div key={category} className="flex justify-between px-2 text-sm">
                    <span>{category}</span>
                    <span>${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                );
              }
              return null;
            })}

            <div className="border-t border-gray-200 mt-4 pt-2 flex justify-between px-2 font-bold text-lg">
              <span>Net Income</span>
              <span>${financials.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Balance Sheet */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 print-card">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Balance Sheet</h2>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700 bg-gray-50 p-2 rounded print-bg-gray">Assets</h3>
            {financials.balanceSheet.assets.map((asset) => (
              <div key={asset.name} className="flex justify-between px-2 text-sm">
                <span>{asset.name}</span>
                <span>${asset.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-1 flex justify-between px-2 font-semibold text-sm">
              <span>Total Assets</span>
              <span>${financials.balanceSheet.totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <h3 className="font-medium text-gray-700 bg-gray-50 p-2 rounded mt-4 print-bg-gray">Liabilities</h3>
            {financials.balanceSheet.liabilities.map((liab) => (
              <div key={liab.name} className="flex justify-between px-2 text-sm">
                <span>{liab.name}</span>
                <span>${liab.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-1 flex justify-between px-2 font-semibold text-sm">
              <span>Total Liabilities</span>
              <span>${financials.balanceSheet.totalLiabilities.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-2 flex justify-between px-2 font-bold text-lg">
              <span>Net Worth (Equity)</span>
              <span>${(financials.balanceSheet.totalAssets - financials.balanceSheet.totalLiabilities).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
      </ComingSoonOverlay>
    </div>
  );
}
