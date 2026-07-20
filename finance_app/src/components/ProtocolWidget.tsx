import { ProtocolPosition } from '@/lib/defiMockEngine';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface Props {
  position: ProtocolPosition;
}

export default function ProtocolWidget({ position }: Props) {
  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return <ShieldCheck className="w-5 h-5 text-green-500" />;
      case 'High': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      default: return <Shield className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  const dailyYield = (position.valueUSD * (position.apy / 100)) / 365;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{position.protocolName}</h3>
          <p className="text-sm text-gray-500">{position.chain}</p>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getRiskBg(position.riskLevel)}`}>
          {getRiskIcon(position.riskLevel)}
          <span>{position.riskLevel} Risk</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-500">Asset</p>
            <p className="font-semibold text-gray-900">{position.asset}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Balance</p>
            <p className="font-semibold text-gray-900">{position.balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Value</p>
            <p className="font-bold text-gray-900">${position.valueUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">APY</p>
            <p className="font-bold text-green-600">+{position.apy.toFixed(2)}%</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{position.type}</span>
          <span className="text-sm font-semibold text-blue-600">+${dailyYield.toFixed(2)} / day</span>
        </div>
      </div>
    </div>
  );
}
