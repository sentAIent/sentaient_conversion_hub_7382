"use client";

import { useMemo } from 'react';
import { MOCK_DEFI_POSITIONS, calculateDeFiMetrics } from '@/lib/defiMockEngine';
import ProtocolWidget from '@/components/ProtocolWidget';
import { Wallet, TrendingUp, DollarSign, Activity } from 'lucide-react';
import ComingSoonOverlay from '@/components/ComingSoonOverlay';

export default function DefiDashboard() {
  const metrics = useMemo(() => calculateDeFiMetrics(MOCK_DEFI_POSITIONS), []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DeFi & Staking Tracker</h1>
          <p className="text-gray-500 mt-1">Monitor your yield-generating assets across all chains.</p>
        </div>
      </div>

      <ComingSoonOverlay>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Value Locked" 
          value={`$${metrics.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
          icon={<Wallet className="w-5 h-5 text-blue-500" />} 
        />
        <MetricCard 
          title="Average APY" 
          value={`${metrics.averageApy.toFixed(2)}%`} 
          valueColor="text-green-600"
          icon={<TrendingUp className="w-5 h-5 text-green-500" />} 
        />
        <MetricCard 
          title="Daily Yield" 
          value={`+$${metrics.totalDailyYield.toFixed(2)}/day`} 
          valueColor="text-green-600"
          icon={<DollarSign className="w-5 h-5 text-gray-400" />} 
        />
        <MetricCard 
          title="Active Protocols" 
          value={MOCK_DEFI_POSITIONS.length.toString()} 
          icon={<Activity className="w-5 h-5 text-purple-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Active Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_DEFI_POSITIONS.map(position => (
              <ProtocolWidget key={position.id} position={position} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Chain Allocation</h3>
            <div className="space-y-4">
              {Object.entries(metrics.chainAllocation).map(([chain, value]) => {
                const percentage = (value / metrics.totalValue) * 100;
                return (
                  <div key={chain}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{chain}</span>
                      <span className="text-gray-500">{percentage.toFixed(1)}%</span>
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
          
          <div className="bg-gradient-to-br from-green-900 to-emerald-900 p-6 rounded-xl shadow-sm text-white">
            <h3 className="text-lg font-semibold mb-2">Yield Optimization</h3>
            <p className="text-sm text-green-50 leading-relaxed mb-3">
              Your largest allocation is currently on <strong>Ethereum</strong>, which has high gas fees.
            </p>
            <p className="text-sm text-green-50 leading-relaxed">
              Consider bridging idle USDC to <strong>Arbitrum</strong> or <strong>Base</strong> to capture higher LP yields with lower transaction costs.
            </p>
          </div>
        </div>
      </div>
      </ComingSoonOverlay>
    </div>
  );
}

function MetricCard({ title, value, icon, valueColor = 'text-gray-900' }: { title: string, value: string | number, icon?: React.ReactNode, valueColor?: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div>{icon}</div>}
      </div>
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
