"use client";

import { useMemo } from 'react';
import { generateCashFlowForecast } from '@/lib/cashFlowForecasting';
import { Transaction } from '@/lib/categorizationEngine';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const mockTransactions: Transaction[] = [
  { id: '1', date: new Date().toISOString(), merchant: 'Stripe Client Payment', amount: 4500.00 },
  { id: '2', date: new Date().toISOString(), merchant: 'AWS Services', amount: -120.00 },
  { id: '3', date: new Date().toISOString(), merchant: 'Uber Trip', amount: -35.50 },
  { id: '4', date: new Date(Date.now() - 86400000).toISOString(), merchant: 'Starbucks Coffee', amount: -8.50 },
  { id: '5', date: new Date(Date.now() - 86400000 * 2).toISOString(), merchant: 'Github Pro', amount: -4.00 },
  { id: '6', date: new Date(Date.now() - 86400000 * 5).toISOString(), merchant: 'Amazon Office Desk', amount: -299.99 },
  { id: '7', date: new Date(Date.now() - 86400000 * 10).toISOString(), merchant: 'PayPal Transfer', amount: 1500.00 },
  { id: '8', date: new Date(Date.now() - 86400000 * 15).toISOString(), merchant: 'Local Hardware Store', amount: -45.00 },
];

export default function CashFlowWidget() {
  const currentAssetBalance = 14500.20; // Example mock
  
  const forecast = useMemo(() => {
    return generateCashFlowForecast(mockTransactions, currentAssetBalance);
  }, [currentAssetBalance]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Cash Flow Forecast</h2>
        <span className="text-sm text-gray-500">Based on 30d Run Rate</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Monthly Run Rate</h3>
          <p className={`text-2xl font-bold flex items-center ${forecast.monthlyRunRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {forecast.monthlyRunRate >= 0 ? <TrendingUp className="mr-2 h-5 w-5" /> : <TrendingDown className="mr-2 h-5 w-5" />}
            ${Math.abs(forecast.monthlyRunRate).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Current Cash</h3>
          <p className="text-2xl font-bold text-gray-900">${forecast.currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="space-y-4 relative">
        {/* Connection Line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 z-0"></div>

        <div className="flex items-center relative z-10">
          <div className="w-12 text-xs font-semibold text-gray-500">30 Day</div>
          <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm z-10"></div>
          <div className="flex-1 ml-4 bg-white border border-gray-100 shadow-sm p-3 rounded-lg flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Projected Balance</span>
            <span className="font-bold text-gray-900">${forecast.thirtyDayProjection.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="flex items-center relative z-10">
          <div className="w-12 text-xs font-semibold text-gray-500">60 Day</div>
          <div className="w-4 h-4 rounded-full bg-blue-400 border-4 border-white shadow-sm z-10"></div>
          <div className="flex-1 ml-4 bg-white border border-gray-100 shadow-sm p-3 rounded-lg flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Projected Balance</span>
            <span className="font-bold text-gray-900">${forecast.sixtyDayProjection.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="flex items-center relative z-10">
          <div className="w-12 text-xs font-semibold text-gray-500">90 Day</div>
          <div className="w-4 h-4 rounded-full bg-blue-300 border-4 border-white shadow-sm z-10"></div>
          <div className="flex-1 ml-4 bg-white border border-gray-100 shadow-sm p-3 rounded-lg flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Projected Balance</span>
            <span className="font-bold text-gray-900">${forecast.ninetyDayProjection.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
