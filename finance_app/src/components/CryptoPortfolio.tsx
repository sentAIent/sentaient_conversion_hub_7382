"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, RefreshCw } from 'lucide-react';

interface Holding {
  id: string;
  coin_id: string;
  symbol: string;
  amount: number;
}

export default function CryptoPortfolio() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  
  // Add holding states
  const [newCoinId, setNewCoinId] = useState('bitcoin');
  const [newAmount, setNewAmount] = useState('');
  
  const supabase = createClient();

  const fetchHoldingsAndPrices = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data: holdingsData, error } = await supabase
      .from('crypto_holdings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && holdingsData) {
      setHoldings(holdingsData);
      
      // Fetch prices from CoinGecko
      if (holdingsData.length > 0) {
        const coinIds = holdingsData.map(h => h.coin_id).join(',');
        try {
          const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`);
          const priceData = await res.json();
          const parsedPrices: Record<string, number> = {};
          Object.keys(priceData).forEach(key => {
            parsedPrices[key] = priceData[key].usd;
          });
          setPrices(parsedPrices);
        } catch (e) {
          console.error('Failed to fetch CoinGecko prices', e);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHoldingsAndPrices();
  }, []);

  const addHolding = async () => {
    if (!newAmount || isNaN(Number(newAmount))) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let symbol = 'BTC';
    if (newCoinId === 'ethereum') symbol = 'ETH';
    if (newCoinId === 'solana') symbol = 'SOL';

    const { error } = await supabase
      .from('crypto_holdings')
      .upsert({ 
        user_id: user.id, 
        coin_id: newCoinId, 
        symbol, 
        amount: Number(newAmount) 
      }, { onConflict: 'user_id, coin_id' });

    if (!error) {
      setNewAmount('');
      fetchHoldingsAndPrices();
    } else {
      alert('Failed to add holding');
    }
  };

  const removeHolding = async (id: string) => {
    await supabase.from('crypto_holdings').delete().eq('id', id);
    fetchHoldingsAndPrices();
  };

  const calculateTotal = () => {
    return holdings.reduce((sum, h) => {
      const price = prices[h.coin_id] || 0;
      return sum + (h.amount * price);
    }, 0);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Crypto Portfolio</h2>
        <button onClick={fetchHoldingsAndPrices} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-500">
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <select 
          value={newCoinId}
          onChange={e => setNewCoinId(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm sm:text-sm py-2"
        >
          <option value="bitcoin">Bitcoin (BTC)</option>
          <option value="ethereum">Ethereum (ETH)</option>
          <option value="solana">Solana (SOL)</option>
        </select>
        <input 
          type="number" 
          placeholder="Amount (e.g. 0.5)" 
          value={newAmount}
          onChange={e => setNewAmount(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm sm:text-sm py-2 flex-1"
        />
        <button 
          onClick={addHolding}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {holdings.length === 0 ? (
        <p className="text-gray-500 text-center py-4 text-sm">No crypto holdings yet.</p>
      ) : (
        <div className="space-y-4">
          {holdings.map((h) => {
            const price = prices[h.coin_id] || 0;
            const value = h.amount * price;
            
            return (
              <div key={h.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm">
                    {h.symbol}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{h.coin_id}</p>
                    <p className="text-xs text-gray-500">{h.amount} {h.symbol}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    <p className="text-xs text-gray-500">@ ${price.toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => removeHolding(h.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
        <span className="font-semibold text-gray-700">Total Portfolio Value</span>
        <span className="text-xl font-bold text-blue-600">${calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      </div>
    </div>
  );
}
