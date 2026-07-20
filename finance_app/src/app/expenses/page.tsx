"use client";

import { useState, useMemo } from 'react';
import { MOCK_EXPENSES, Expense, getExpensesByCategory, OCRExtractionResult } from '@/lib/expenseMockEngine';
import ReceiptScanner from '@/components/ReceiptScanner';
import ExpenseList from '@/components/ExpenseList';
import ComingSoonOverlay from '@/components/ComingSoonOverlay';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);

  const handleSaveExpense = (scanResult: Omit<OCRExtractionResult, 'confidence'>) => {
    const newExpense: Expense = {
      id: Math.random().toString(36).substring(7),
      ...scanResult,
    };
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const categoryTotals = useMemo(() => getExpensesByCategory(expenses), [expenses]);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses & Receipts</h1>
          <p className="text-gray-500 mt-1">Scan receipts with AI and automatically categorize your business expenses.</p>
        </div>
      </div>

      <ComingSoonOverlay title="Mock OCR & Expenses" description="This page uses a simulated AI scanner and mock data to demonstrate the flow. We'll connect a real OCR API soon!">
        <div className="space-y-6">
          <ReceiptScanner onSave={handleSaveExpense} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
              <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Spending by Category</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="mb-4">
                  <span className="text-sm text-gray-500">Total Logged Expenses</span>
                  <p className="text-3xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
                </div>
                
                <div className="space-y-4 mt-6">
                  {Object.entries(categoryTotals)
                    .sort(([, a], [, b]) => b - a)
                    .map(([category, amount]) => {
                      if (amount === 0) return null;
                      const percentage = (amount / totalExpenses) * 100;
                      return (
                        <div key={category}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">{category}</span>
                            <span className="text-gray-900 font-semibold">${amount.toFixed(2)} ({percentage.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComingSoonOverlay>
    </div>
  );
}
