import React, { useState, useEffect } from 'react';
import { DollarSign, ShieldCheck, Calendar, Info } from 'lucide-react';

interface Contract {
  id: string;
  signed_date: string;
  total_value: number;
  guaranteed_amount: number;
  years: number;
  aav: number;
  current_cap_hit: number | null;
  is_active: boolean;
}

export default function PlayerContracts({ playerName }: { playerName: string }) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  // MOCK DATA since DB docker is failing locally, but in production this would fetch from /api/contracts
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (playerName === 'Patrick Mahomes') {
        setContracts([
          { id: '1', signed_date: '2020-07-06', total_value: 450000000, guaranteed_amount: 141481905, years: 10, aav: 45000000, current_cap_hit: 37033381, is_active: true },
          { id: '2', signed_date: '2017-07-20', total_value: 16427600, guaranteed_amount: 16427600, years: 4, aav: 4106900, current_cap_hit: null, is_active: false }
        ]);
      } else if (playerName === 'Justin Jefferson') {
        setContracts([
          { id: '3', signed_date: '2024-06-03', total_value: 140000000, guaranteed_amount: 110000000, years: 4, aav: 35000000, current_cap_hit: 8612000, is_active: true },
          { id: '4', signed_date: '2020-07-22', total_value: 13122805, guaranteed_amount: 13122805, years: 4, aav: 3280701, current_cap_hit: null, is_active: false }
        ]);
      } else if (playerName === 'Lamar Jackson') {
        setContracts([
          { id: '5', signed_date: '2023-05-04', total_value: 260000000, guaranteed_amount: 185000000, years: 5, aav: 52000000, current_cap_hit: 32400000, is_active: true },
          { id: '6', signed_date: '2018-06-05', total_value: 9471648, guaranteed_amount: 7577318, years: 4, aav: 2367912, current_cap_hit: null, is_active: false }
        ]);
      } else if (playerName === 'Christian McCaffrey') {
        setContracts([
          { id: '7', signed_date: '2024-06-04', total_value: 38000000, guaranteed_amount: 24000000, years: 2, aav: 19000000, current_cap_hit: 6694000, is_active: true },
          { id: '8', signed_date: '2020-04-16', total_value: 64063500, guaranteed_amount: 38162500, years: 4, aav: 16015875, current_cap_hit: null, is_active: false },
          { id: '9', signed_date: '2017-05-04', total_value: 17224468, guaranteed_amount: 17224468, years: 4, aav: 4306117, current_cap_hit: null, is_active: false }
        ]);
      } else if (playerName === 'Tyreek Hill') {
        setContracts([
          { id: '10', signed_date: '2022-03-23', total_value: 120000000, guaranteed_amount: 72200000, years: 4, aav: 30000000, current_cap_hit: 31323750, is_active: true },
          { id: '11', signed_date: '2019-09-06', total_value: 54000000, guaranteed_amount: 35000000, years: 3, aav: 18000000, current_cap_hit: null, is_active: false },
          { id: '12', signed_date: '2016-05-17', total_value: 2580000, guaranteed_amount: 70000, years: 4, aav: 645000, current_cap_hit: null, is_active: false }
        ]);
      } else {
        setContracts([]);
      }
      setLoading(false);
    }, 500);
  }, [playerName]);

  const activeContract = contracts.find(c => c.is_active);
  const pastContracts = contracts.filter(c => !c.is_active);

  if (loading) {
    return <div className="text-gray-400 p-8 flex items-center justify-center">Loading contract data...</div>;
  }

  const formatMoney = (val: number | null | undefined) => {
    if (!val) return '—';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Contract & Salary Details</h2>
          <p className="text-sm text-gray-400 mt-1">General contract terms, cap hits, and historical deals for {playerName}.</p>
        </div>
      </div>

      {!activeContract && pastContracts.length === 0 ? (
        <div className="p-8 border border-white/5 bg-white/[0.02] rounded-xl text-center text-gray-400">
          No contract data available for {playerName}.
        </div>
      ) : (
        <>
          {activeContract && (
            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ShieldCheck size={14} /> Active Contract
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Total Value</div>
                  <div className="text-2xl font-black text-white">{formatMoney(activeContract.total_value)}</div>
                  <div className="text-xs text-gray-500 mt-1">{activeContract.years} Years</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Guaranteed</div>
                  <div className="text-2xl font-bold text-emerald-400">{formatMoney(activeContract.guaranteed_amount)}</div>
                  <div className="text-xs text-emerald-400/50 mt-1">At Signing</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">AAV</div>
                  <div className="text-2xl font-bold text-gray-300">{formatMoney(activeContract.aav)}</div>
                  <div className="text-xs text-gray-500 mt-1">Per Year</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">Current Cap Hit <Info size={12} className="text-gray-600" /></div>
                  <div className="text-2xl font-bold text-white">{formatMoney(activeContract.current_cap_hit)}</div>
                  <div className="text-xs text-gray-500 mt-1">2023 Season</div>
                </div>
              </div>
              
              {/* Guaranteed Money Visualizer */}
              <div className="mt-8 mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-400 font-bold">Guaranteed</span>
                  <span className="text-gray-500 font-bold">Base / Non-Guaranteed</span>
                </div>
                <div className="h-3 w-full bg-gray-900 rounded-full overflow-hidden flex border border-gray-800">
                  <div 
                    className="h-full bg-emerald-500 relative" 
                    style={{ width: `${(activeContract.guaranteed_amount / activeContract.total_value) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full" style={{ animation: 'shimmer 2s infinite' }} />
                  </div>
                  <div className="h-full bg-gray-700 flex-1" />
                </div>
                <div className="text-[10px] text-gray-500 mt-1 text-center font-semibold">
                  {((activeContract.guaranteed_amount / activeContract.total_value) * 100).toFixed(1)}% of total value is fully guaranteed at signing
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-emerald-500/10 text-xs text-emerald-500/70 flex items-center gap-2">
                <Calendar size={12} />
                Signed on {new Date(activeContract.signed_date).toLocaleDateString()}
              </div>
            </div>
          )}

          {pastContracts.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-300 mb-4">Historical Contracts</h3>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.02] border-b border-white/[0.06]">
                    <tr>
                      <th className="p-4 text-gray-400 font-medium">Signed Date</th>
                      <th className="p-4 text-gray-400 font-medium">Years</th>
                      <th className="p-4 text-gray-400 font-medium text-right">Total Value</th>
                      <th className="p-4 text-gray-400 font-medium text-right">Guaranteed</th>
                      <th className="p-4 text-gray-400 font-medium text-right hidden sm:table-cell">AAV</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {pastContracts.map((contract) => (
                      <tr key={contract.id} className="hover:bg-white/[0.02]">
                        <td className="p-4 text-gray-400">{new Date(contract.signed_date).toLocaleDateString()}</td>
                        <td className="p-4 text-gray-300">{contract.years}</td>
                        <td className="p-4 text-right font-medium text-white">{formatMoney(contract.total_value)}</td>
                        <td className="p-4 text-right text-gray-300">{formatMoney(contract.guaranteed_amount)}</td>
                        <td className="p-4 text-right text-gray-500 hidden sm:table-cell">{formatMoney(contract.aav)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
