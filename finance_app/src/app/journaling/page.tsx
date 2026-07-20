"use client";

import { useState, useMemo } from 'react';
import { Plus, BarChart3, TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';
import { JournaledTrade, calculateJournalMetrics } from '@/lib/journalAnalytics';
import TradeJournalEntry from '@/components/TradeJournalEntry';
import ComingSoonOverlay from '@/components/ComingSoonOverlay';
import { createClient } from '@/lib/supabase/client';
import { useEffect } from 'react';

// Initial Mock Data
const MOCK_JOURNAL: JournaledTrade[] = [
  {
    id: 'j1', asset: 'BTC', entryDate: new Date('2024-01-10'), exitDate: new Date('2024-01-15'),
    entryPrice: 42000, exitPrice: 48000, positionSize: 1.5, isLong: true,
    strategyTag: 'Breakout', notes: 'Broke key resistance at 41.5k with high volume.', fees: 25
  },
  {
    id: 'j2', asset: 'ETH', entryDate: new Date('2024-01-12'), exitDate: new Date('2024-01-18'),
    entryPrice: 2600, exitPrice: 2400, positionSize: 10, isLong: true,
    strategyTag: 'Support Bounce', notes: 'Attempted to catch the falling knife at 2600. Failed.', fees: 10
  },
  {
    id: 'j3', asset: 'SOL', entryDate: new Date('2024-02-05'), exitDate: new Date('2024-02-08'),
    entryPrice: 95, exitPrice: 105, positionSize: 50, isLong: true,
    strategyTag: 'Momentum', notes: 'Strong narrative push, trailed stop loss.', fees: 5
  },
  {
    id: 'j4', asset: 'TSLA', entryDate: new Date('2024-03-01'), exitDate: new Date('2024-03-05'),
    entryPrice: 200, exitPrice: 180, positionSize: 100, isLong: false, // Short trade
    strategyTag: 'Mean Reversion', notes: 'Overextended on the daily RSI, faded the gap up.', fees: 12
  },
  {
    id: 'j5', asset: 'NVDA', entryDate: new Date('2024-03-10'), exitDate: new Date('2024-03-15'),
    entryPrice: 850, exitPrice: 920, positionSize: 20, isLong: true,
    strategyTag: 'Breakout', notes: 'Earnings blowout continuation play.', fees: 8
  }
];

export default function JournalingPage() {
  const [trades, setTrades] = useState<JournaledTrade[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState<JournaledTrade | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTrades() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsLoading(false);
        // If not logged in, we could fall back to mock data or show nothing
        setTrades(MOCK_JOURNAL);
        return;
      }

      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .order('entry_date', { ascending: false });

      if (error) {
        console.error('Error fetching trades:', error);
      } else if (data) {
        // Map database row to our JournaledTrade interface
        const mappedTrades: JournaledTrade[] = data.map(row => ({
          id: row.id,
          asset: row.asset,
          entryDate: new Date(row.entry_date),
          exitDate: row.exit_date ? new Date(row.exit_date) : undefined,
          entryPrice: Number(row.entry_price),
          exitPrice: row.exit_price ? Number(row.exit_price) : undefined,
          positionSize: Number(row.position_size),
          isLong: row.is_long,
          strategyTag: row.strategy_tag,
          notes: row.notes,
          fees: Number(row.fees)
        }));
        setTrades(mappedTrades);
      }
      setIsLoading(false);
    }
    
    fetchTrades();
  }, [supabase]);

  const metrics = useMemo(() => calculateJournalMetrics(trades), [trades]);

  const handleSaveTrade = async (tradeData: Omit<JournaledTrade, 'id'>) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert('Please log in to save trades.');
      return;
    }

    const tradeRow = {
      user_id: session.user.id,
      asset: tradeData.asset,
      entry_date: tradeData.entryDate.toISOString(),
      exit_date: tradeData.exitDate ? tradeData.exitDate.toISOString() : null,
      entry_price: tradeData.entryPrice,
      exit_price: tradeData.exitPrice,
      position_size: tradeData.positionSize,
      is_long: tradeData.isLong,
      strategy_tag: tradeData.strategyTag,
      notes: tradeData.notes,
      fees: tradeData.fees
    };

    if (editingTrade) {
      const { error } = await supabase
        .from('trades')
        .update(tradeRow)
        .eq('id', editingTrade.id);
        
      if (!error) {
        setTrades(trades.map(t => t.id === editingTrade.id ? { ...tradeData, id: t.id } : t));
      }
    } else {
      const { data, error } = await supabase
        .from('trades')
        .insert(tradeRow)
        .select()
        .single();
        
      if (!error && data) {
        setTrades([{ ...tradeData, id: data.id }, ...trades]);
      }
    }
  };

  const openNewTradeModal = () => {
    setEditingTrade(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (trade: JournaledTrade) => {
    setEditingTrade(trade);
    setIsModalOpen(true);
  };

  const deleteTrade = async (id: string) => {
    const { error } = await supabase
      .from('trades')
      .delete()
      .eq('id', id);
      
    if (!error) {
      setTrades(trades.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trade Journal</h1>
          <p className="text-gray-500 mt-1">Track your strategies, analyze win rates, and optimize performance.</p>
        </div>
        <button
          onClick={openNewTradeModal}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Log Trade</span>
        </button>
      </div>

      <ComingSoonOverlay>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard title="Total Trades" value={metrics.totalTrades} icon={<BarChart3 className="w-5 h-5 text-gray-400" />} />
        <MetricCard 
          title="Win Rate" 
          value={`${metrics.winRate.toFixed(1)}%`} 
          valueColor={metrics.winRate > 50 ? 'text-green-600' : 'text-red-600'}
          icon={<Target className="w-5 h-5 text-gray-400" />} 
        />
        <MetricCard title="Profit Factor" value={metrics.profitFactor.toFixed(2)} icon={<Zap className="w-5 h-5 text-gray-400" />} />
        <MetricCard 
          title="Net PnL" 
          value={`$${metrics.netPnL.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
          valueColor={metrics.netPnL >= 0 ? 'text-green-600' : 'text-red-600'}
          icon={metrics.netPnL >= 0 ? <TrendingUp className="w-5 h-5 text-green-500" /> : <TrendingDown className="w-5 h-5 text-red-500" />} 
        />
        <MetricCard title="Avg Win" value={`$${metrics.averageWin.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} valueColor="text-green-600" />
        <MetricCard title="Avg Loss" value={`$${metrics.averageLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} valueColor="text-red-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Trade History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asset</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dir</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Strategy</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">PnL</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {trades.slice().reverse().map((t) => {
                  const pnl = t.exitPrice ? ((t.isLong ? t.exitPrice - t.entryPrice : t.entryPrice - t.exitPrice) * t.positionSize) - t.fees : 0;
                  const isWin = pnl > 0;
                  return (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{t.entryDate.toLocaleDateString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-gray-900">{t.asset}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${t.isLong ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {t.isLong ? 'LONG' : 'SHORT'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{t.strategyTag}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm text-right font-semibold ${t.exitPrice ? (isWin ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}`}>
                        {t.exitPrice ? `${isWin ? '+' : ''}$${pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : 'Open'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => openEditModal(t)} className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button onClick={() => deleteTrade(t.id)} className="text-red-600 hover:text-red-900">Del</button>
                      </td>
                    </tr>
                  );
                })}
                {trades.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No trades logged yet. Click 'Log Trade' to begin.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Advanced Stats</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Expectancy (Per Trade)</span>
                <span className="font-semibold text-gray-900">${metrics.expectancy.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Largest Win</span>
                <span className="font-semibold text-green-600">${metrics.largestWin.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Largest Loss</span>
                <span className="font-semibold text-red-600">-${metrics.largestLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Max Drawdown</span>
                <span className="font-semibold text-red-600">-${metrics.maxDrawdown.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Longest Win Streak</span>
                <span className="font-semibold text-gray-900">{metrics.consecutiveWins}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Longest Loss Streak</span>
                <span className="font-semibold text-gray-900">{metrics.consecutiveLosses}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 p-6 rounded-xl shadow-sm text-white">
            <h3 className="text-lg font-semibold mb-2">Alpha Insights</h3>
            <p className="text-sm text-indigo-100 leading-relaxed">
              Based on your recent trades, your <strong>{MOCK_JOURNAL.find(t => t.id === 'j1')?.strategyTag}</strong> strategy is highly effective in current market conditions. 
              However, your shorts are suffering a <strong>0%</strong> win rate. Consider sizing down counter-trend trades.
            </p>
          </div>
        </div>
      </div>

      <TradeJournalEntry 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTrade}
        initialData={editingTrade}
      />
      </ComingSoonOverlay>
    </div>
  );
}

function MetricCard({ title, value, icon, valueColor = 'text-gray-900' }: { title: string, value: string | number, icon?: React.ReactNode, valueColor?: string }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div>{icon}</div>}
      </div>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
