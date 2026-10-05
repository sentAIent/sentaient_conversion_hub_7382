'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, ChevronDown, CheckCircle2 } from '@/components/icons';

export default function PaperTradingDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [openBets, setOpenBets] = useState(0);
  const [pnl, setPnl] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaperAccount() {
      try {
        const res = await fetch('/api/paper-trading');
        if (res.ok) {
          const data = await res.json();
          setBalance(data.balance);
          setOpenBets(data.openBets);
          setPnl(data.pnl);
        }
      } catch (e) {
        console.error("Failed to fetch paper account", e);
      } finally {
        setLoading(false);
      }
    }
    fetchPaperAccount();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all font-semibold text-sm"
      >
        <Wallet size={16} />
        ${balance.toLocaleString()}
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#111] border border-white/10 shadow-2xl z-50 backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Bankroll</span>
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <TrendingUp size={12} /> +${pnl.toFixed(2)} (All-time)
                </span>
              </div>
              <div className="text-2xl font-black text-white">${balance.toLocaleString()}</div>
            </div>
            
            <div className="p-2 space-y-1">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between group">
                <div>
                  <div className="text-sm text-gray-200 font-medium group-hover:text-white transition-colors">Active Bets</div>
                  <div className="text-xs text-gray-500">{openBets} props currently open</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                  {openBets}
                </div>
              </button>
              
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between group">
                <div>
                  <div className="text-sm text-gray-200 font-medium group-hover:text-white transition-colors">Bet History</div>
                  <div className="text-xs text-gray-500">View settled props & lines</div>
                </div>
                <CheckCircle2 size={16} className="text-gray-600 group-hover:text-white transition-colors" />
              </button>

              {/* Test Button for gamification loop */}
              <button 
                onClick={async () => {
                  try {
                    const res = await fetch('/api/paper-trading', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        bet_type: 'PROP',
                        target_id: 'test-player-id',
                        stake: 100,
                        details: { prop: 'Over 1.5 TDs' }
                      })
                    });
                    const data = await res.json();
                    if (data.success) {
                      setBalance(data.newBalance);
                      setOpenBets(prev => prev + 1);
                      alert('Bet placed successfully! Balance deducted.');
                    } else {
                      alert('Error: ' + data.error);
                    }
                  } catch (e) {
                    alert('Failed to place bet');
                  }
                }}
                className="w-full mt-2 text-center px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
              >
                TEST: Place $100 Bet
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
