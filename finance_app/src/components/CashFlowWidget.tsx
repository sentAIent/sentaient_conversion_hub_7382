"use client";

import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface CashFlowWidgetProps {
  currentBalance: number;
  monthlyRunRate: number;
}

export default function CashFlowWidget({ currentBalance, monthlyRunRate }: CashFlowWidgetProps) {
  
  const forecast = {
    monthlyRunRate,
    currentBalance,
    thirtyDayProjection: currentBalance + monthlyRunRate,
    sixtyDayProjection: currentBalance + (monthlyRunRate * 2),
    ninetyDayProjection: currentBalance + (monthlyRunRate * 3)
  };

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
