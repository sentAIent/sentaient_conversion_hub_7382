"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Transaction,
  CategorizedTransaction,
  categorizeTransaction,
  generateFinancialStatements,
} from '@/lib/categorizationEngine';

export interface BankAccount {
  id: string;
  name: string;
  type: 'ASSET' | 'LIABILITY';
  balance: number;
  lastSynced?: string;
}

interface TransactionContextType {
  transactions: CategorizedTransaction[];
  accounts: BankAccount[];
  addTransactions: (newTxs: Transaction[]) => number;
  deleteTransaction: (id: string) => void;
  updateCategory: (id: string, newCategory: string) => void;
  financials: ReturnType<typeof generateFinancialStatements>;
  isLoaded: boolean;
  clearTransactions: () => void;
}

const DEFAULT_SAMPLE_TXS: Transaction[] = [
  { id: 'tx_init_1', date: '2026-11-01', merchant: 'Stripe Client Retainer', amount: 8500.00 },
  { id: 'tx_init_2', date: '2026-10-29', merchant: 'AWS Cloud Infrastructure', amount: -420.50 },
  { id: 'tx_init_3', date: '2026-10-25', merchant: 'GitHub Enterprise Suite', amount: -210.00 },
  { id: 'tx_init_4', date: '2026-10-20', merchant: 'WeWork Office Space', amount: -950.00 },
  { id: 'tx_init_5', date: '2026-10-15', merchant: 'Google Workspace', amount: -72.00 },
  { id: 'tx_init_6', date: '2026-10-10', merchant: 'Client ACH Settlement', amount: 12400.00 },
  { id: 'tx_init_7', date: '2026-10-05', merchant: 'Delta Air Lines - Client Onsite', amount: -614.20 },
  { id: 'tx_init_8', date: '2026-10-02', merchant: 'Legal & Compliance Counsel', amount: -1500.00 },
];

const DEFAULT_ACCOUNTS: BankAccount[] = [
  { id: 'acc_1', name: 'Mercury Operating (Checking)', type: 'ASSET', balance: 48920.40, lastSynced: 'Just now' },
  { id: 'acc_2', name: 'Chase Corporate Card', type: 'LIABILITY', balance: 3410.15, lastSynced: 'Today' },
  { id: 'acc_3', name: 'Stripe Balance (Clearing)', type: 'ASSET', balance: 14250.00, lastSynced: 'Real-time' },
];

const STORAGE_KEY_TXS = 'liquid_company_transactions_v1';
const STORAGE_KEY_ACCS = 'liquid_company_accounts_v1';

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<CategorizedTransaction[]>([]);
  const [accounts, setAccounts] = useState<BankAccount[]>(DEFAULT_ACCOUNTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedTxs = localStorage.getItem(STORAGE_KEY_TXS);
      const storedAccs = localStorage.getItem(STORAGE_KEY_ACCS);

      if (storedTxs) {
        setTransactions(JSON.parse(storedTxs));
      } else {
        setTransactions(DEFAULT_SAMPLE_TXS.map(categorizeTransaction));
      }

      if (storedAccs) {
        setAccounts(JSON.parse(storedAccs));
      }
    } catch (e) {
      console.warn('Failed to read from localStorage', e);
      setTransactions(DEFAULT_SAMPLE_TXS.map(categorizeTransaction));
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_TXS, JSON.stringify(transactions));
      localStorage.setItem(STORAGE_KEY_ACCS, JSON.stringify(accounts));
    } catch (e) {
      console.error('Failed to persist transactions', e);
    }
  }, [transactions, accounts, isLoaded]);

  const addTransactions = (newTxs: Transaction[]): number => {
    const existingIds = new Set(transactions.map((t) => t.id));
    const toAdd: CategorizedTransaction[] = [];

    for (const raw of newTxs) {
      if (!existingIds.has(raw.id)) {
        toAdd.push(categorizeTransaction(raw));
        existingIds.add(raw.id);
      }
    }

    if (toAdd.length > 0) {
      setTransactions((prev) => [...toAdd, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }

    return toAdd.length;
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateCategory = (id: string, newCategory: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, category: newCategory, confidence: 'HIGH', method: 'EXACT' } : t))
    );
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const financials = useMemo(() => {
    return generateFinancialStatements(transactions, accounts);
  }, [transactions, accounts]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        accounts,
        addTransactions,
        deleteTransaction,
        updateCategory,
        financials,
        isLoaded,
        clearTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
