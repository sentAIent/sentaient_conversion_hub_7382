'use client';

import React, { useEffect, useState } from 'react';

export default function PaperTradingPage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [accountRes, betsRes] = await Promise.all([
          fetch('/api/paper-trading/account'),
          fetch('/api/paper-trading/bet')
        ]);
        
        const accountData = await accountRes.json();
        const betsData = await betsRes.json();
        
        if (accountData.data) {
          setBalance(Number(accountData.data.balance));
        }
        
        if (betsData.data) {
          setBets(betsData.data);
        }
      } catch (err) {
        console.error('Failed to load paper trading data', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  const activeBetsCount = bets.filter(b => b.status === 'PENDING').length;
  // A naive lifetime PnL calculation: current balance - starting balance (10000)
  // Plus active bets stake if we consider that money still "in play" but deducted from balance
  const activeStake = bets.filter(b => b.status === 'PENDING').reduce((acc, curr) => acc + Number(curr.stake), 0);
  const pnl = balance !== null ? (balance + activeStake - 10000) : 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Paper Trading</h1>
      <p className="text-gray-600 mb-8">
        Simulate bets and DFS lineups without risking real money. Test your optimizer strategies here.
      </p>

      {loading ? (
        <div className="text-center py-8">Loading account...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white border rounded shadow">
              <h2 className="text-lg font-semibold text-gray-500">Available Balance</h2>
              <p className="text-4xl font-bold mt-2">
                Virtual {balance !== null ? balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
              </p>
            </div>
            <div className="p-6 bg-white border rounded shadow">
              <h2 className="text-lg font-semibold text-gray-500">Active Bets</h2>
              <p className="text-4xl font-bold mt-2">{activeBetsCount}</p>
            </div>
            <div className="p-6 bg-white border rounded shadow">
              <h2 className="text-lg font-semibold text-gray-500">Lifetime PnL</h2>
              <p className={`text-4xl font-bold mt-2 ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {pnl >= 0 ? '+' : '-'}Virtual {Math.abs(pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          {bets.length === 0 ? (
            <div className="bg-white border rounded shadow p-6 text-center text-gray-500">
              No paper bets placed yet. Generate a lineup in the DFS Dashboard to start simulating!
            </div>
          ) : (
            <div className="bg-white border rounded shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stake</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bets.map(bet => (
                    <tr key={bet.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(bet.created_at).toLocaleDateString()} {new Date(bet.created_at).toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {bet.bet_type.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {bet.target_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Virtual {Number(bet.stake).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          bet.status === 'WON' ? 'bg-green-100 text-green-800' : 
                          bet.status === 'LOST' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {bet.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Compliance Disclaimer */}
      <div className="mt-12 p-4 bg-gray-50 border-t border-gray-200 text-center rounded-b">
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Simulated Platform</p>
        <p className="text-xs text-gray-400 mt-1 max-w-2xl mx-auto">
          FantasyQuant is a simulated analytics and paper-trading environment. All balances, stakes, and PnL are virtual and hold no cash value. 
          No real money can be deposited, wagered, or withdrawn. Not a gambling operator.
        </p>
      </div>
    </div>
  );
}
