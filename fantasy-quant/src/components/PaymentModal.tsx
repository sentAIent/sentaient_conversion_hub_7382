'use client';

import React, { useState } from 'react';
import { Shield, Zap, Crown, Loader2, X } from '@/components/icons';
import { createClient } from '@/utils/supabase/client';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Optional if we just redirect
}

export default function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpgrade = async (tier: 'pro' | 'elite') => {
    setLoading(tier);
    setError(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('You must be logged in to upgrade');
      }

      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to initiate checkout');

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Crown className="text-yellow-400" />
            Upgrade to Premium
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="p-4 mx-6 mt-6 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Pricing Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Pro Tier */}
          <div className="bg-slate-800/50 border border-white/5 hover:border-blue-500/50 transition-all rounded-xl p-6 flex flex-col relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="text-blue-400" size={20} />
                  Pro
                </h3>
                <span className="text-2xl font-black text-white">$19<span className="text-sm font-normal text-slate-400">/mo</span></span>
              </div>
              
              <ul className="space-y-3 mb-8 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-emerald-400" /> Advanced Analytics (SAPE)
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-emerald-400" /> Save up to 10 Dashboard Views
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={16} className="text-emerald-400" /> Priority Lineup Optimizer
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade('pro')}
              disabled={loading !== null}
              className="mt-auto w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading === 'pro' ? <Loader2 className="animate-spin" size={18} /> : 'Upgrade to Pro'}
            </button>
          </div>

          {/* Elite Tier */}
          <div className="bg-slate-800/80 border border-indigo-500/30 rounded-xl p-6 flex flex-col relative shadow-[0_0_30px_rgba(99,102,241,0.1)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Crown className="text-indigo-400" size={20} />
                Elite
              </h3>
              <span className="text-2xl font-black text-white">$49<span className="text-sm font-normal text-slate-400">/mo</span></span>
            </div>
            
            <ul className="space-y-3 mb-8 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Shield size={16} className="text-indigo-400" /> Everything in Pro
              </li>
              <li className="flex items-center gap-2">
                <Shield size={16} className="text-indigo-400" /> Unlimited Paper Trading
              </li>
              <li className="flex items-center gap-2">
                <Shield size={16} className="text-indigo-400" /> Save up to 30 Dashboard Views
              </li>
              <li className="flex items-center gap-2">
                <Shield size={16} className="text-indigo-400" /> Early Access to Live Data
              </li>
            </ul>

            <button
              onClick={() => handleUpgrade('elite')}
              disabled={loading !== null}
              className="mt-auto w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading === 'elite' ? <Loader2 className="animate-spin" size={18} /> : 'Upgrade to Elite'}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
