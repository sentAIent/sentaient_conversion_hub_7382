"use client";

import { useState, useMemo, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import ReceiptScanner from '@/components/ReceiptScanner';
import ExpenseList from '@/components/ExpenseList';

// Types mapping to Supabase
interface Expense {
  id: string;
  merchant: string; // mapped from merchant_name
  date: string;
  amount: number;
  tax: number; // local concept
  category: string;
  confidence?: number;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching expenses:', error);
    } else if (data) {
      const formatted = data.map(d => ({
        id: d.id,
        merchant: d.merchant_name,
        date: d.date,
        amount: Number(d.amount),
        tax: 0,
        category: d.category,
        confidence: d.confidence_score
      }));
      setExpenses(formatted);
    }
    setIsLoading(false);
  };

  const handleSaveExpense = async (scanResult: Omit<Expense, 'id' | 'confidence'> & { confidence?: number }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newExpenseRecord = {
      user_id: user.id,
      merchant_name: scanResult.merchant,
      date: scanResult.date,
      amount: scanResult.amount,
      category: scanResult.category,
      confidence_score: scanResult.confidence || null
    };

    const { data, error } = await supabase
      .from('expenses')
      .insert(newExpenseRecord)
      .select()
      .single();

    if (error) {
      console.error('Error saving expense:', error);
      alert('Failed to save expense');
    } else if (data) {
      const newExpense: Expense = {
        id: data.id,
        merchant: data.merchant_name,
        date: data.date,
        amount: Number(data.amount),
        tax: 0,
        category: data.category,
        confidence: data.confidence_score
      };
      setExpenses([newExpense, ...expenses]);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting expense:', error);
    } else {
      setExpenses(expenses.filter(exp => exp.id !== id));
    }
  };

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    expenses.forEach(exp => {
      totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
    });
    return totals;
  }, [expenses]);
  
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses & Receipts</h1>
          <p className="text-gray-500 mt-1">Scan receipts with AI and automatically categorize your business expenses.</p>
        </div>
      </div>

      <div className="space-y-6">
        <ReceiptScanner onSave={handleSaveExpense} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
            {isLoading ? (
               <div className="text-gray-500 py-10 text-center">Loading expenses...</div>
            ) : (
               <ExpenseList expenses={expenses as any} onDelete={handleDeleteExpense} />
            )}
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
                    const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
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
    </div>
  );
}
