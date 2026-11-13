"use client";

import { useEntity } from '@/context/EntityContext';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, TrendingUp, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const CASH_FLOW_DATA = [
  { month: 'Jan', income: 4000, expenses: 2400 },
  { month: 'Feb', income: 3000, expenses: 1398 },
  { month: 'Mar', income: 2000, expenses: 9800 },
  { month: 'Apr', income: 2780, expenses: 3908 },
  { month: 'May', income: 1890, expenses: 4800 },
  { month: 'Jun', income: 2390, expenses: 3800 },
  { month: 'Jul', income: 3490, expenses: 4300 },
];

const REVENUE_DATA = [
  { name: 'SaaS Subscriptions', value: 400 },
  { name: 'Consulting', value: 300 },
  { name: 'Digital Products', value: 300 },
  { name: 'Affiliate', value: 200 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function Dashboard() {
  const { activeEntity } = useEntity();
  const currentEntity = activeEntity || { name: 'Loading...', type: '...' };
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (e) {
        console.warn("Auth not configured locally");
      }
    }
    checkAuth();
  }, []);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-gray-500 mt-1">Financial snapshot for {currentEntity.name}</p>
        </div>
        <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          Entity Type: <span className="text-blue-600">{currentEntity.type}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Balance" amount="$124,500.00" trend="+12.5%" isPositive={true} icon={<Wallet />} />
        <KPICard title="Monthly Revenue" amount="$34,200.00" trend="+8.2%" isPositive={true} icon={<DollarSign />} />
        <KPICard title="Burn Rate" amount="$12,450.00" trend="-2.4%" isPositive={true} icon={<TrendingUp />} />
        <KPICard title="Outstanding Invoices" amount="$8,240.00" trend="+4.1%" isPositive={false} icon={<CreditCard />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Flow Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Cash Flow (YTD)</h2>
          <div className="h-80 w-full flex flex-col justify-between pt-4">
            <div className="flex items-center gap-6 text-xs text-gray-500 mb-2">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Income
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" /> Expenses
              </span>
            </div>
            <div className="flex-1 flex items-end gap-3 pb-2 border-b border-gray-100">
              {CASH_FLOW_DATA.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                  <div className="w-full flex items-end justify-center gap-1 h-48">
                    <div
                      className="w-full max-w-[14px] bg-emerald-500/80 hover:bg-emerald-500 rounded-t transition-all"
                      style={{ height: `${(d.income / 10000) * 100}%` }}
                      title={`Income: $${d.income}`}
                    />
                    <div
                      className="w-full max-w-[14px] bg-rose-500/80 hover:bg-rose-500 rounded-t transition-all"
                      style={{ height: `${(d.expenses / 10000) * 100}%` }}
                      title={`Expenses: $${d.expenses}`}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-500">{d.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Sources</h2>
          <div className="h-64 w-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-48 h-48 -rotate-90">
              <circle cx="50" cy="50" r="36" fill="none" stroke="#3b82f6" strokeWidth="16" strokeDasharray="75 226" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="36" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="56 226" strokeDashoffset="-75" />
              <circle cx="50" cy="50" r="36" fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray="56 226" strokeDashoffset="-131" />
              <circle cx="50" cy="50" r="36" fill="none" stroke="#8b5cf6" strokeWidth="16" strokeDasharray="39 226" strokeDashoffset="-187" />
            </svg>
          </div>
          
          <div className="mt-6 space-y-3">
            {REVENUE_DATA.map((item, i) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">${item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, amount, trend, isPositive, icon }: { title: string, amount: string, trend: string, isPositive: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{amount}</p>
      </div>
    </div>
  );
}
