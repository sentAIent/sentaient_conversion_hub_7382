'use client';
import React, { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import toast from 'react-hot-toast';

export default function PricingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, credits: number) => {
    if (!user) {
      toast.error("You must be logged in to purchase credits.");
      return;
    }

    setLoading(priceId);
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          credits
        }),
      });
      const data = await response.json();
      
      if (data.url) {
        // Redirect to Stripe or Simulated Checkout
        window.location.href = data.url;
      } else {
        toast.error("Failed to initiate checkout");
      }
    } catch (err) {
      toast.error("Network error during checkout.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-12 text-white relative">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            Generation Credits
          </h1>
          <p className="text-gray-400 text-lg">Fuel your autonomous marketing engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Starter Plan */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden group hover:border-blue-500/30 transition-all">
            <h3 className="text-xl font-bold text-gray-300">Starter Pack</h3>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-extrabold text-white">$49</span>
            </div>
            <p className="text-sm text-gray-400">Perfect for testing campaigns.</p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span>✨</span> 50 Generation Credits</li>
              <li className="flex items-center gap-2"><span>🎬</span> Playwright Video Crawling</li>
              <li className="flex items-center gap-2"><span>🧠</span> Gemini Vision Reasoning</li>
            </ul>
            <button 
              onClick={() => handleCheckout('price_starter', 50)}
              disabled={loading === 'price_starter'}
              className="mt-auto w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              {loading === 'price_starter' ? 'Loading...' : 'Buy 50 Credits'}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-indigo-900/40 to-[#202733] border border-indigo-500/50 rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden transform md:-translate-y-4 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-500"></div>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-indigo-300">Pro Pack</h3>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30">Most Popular</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-extrabold text-white">$149</span>
            </div>
            <p className="text-sm text-gray-400">For aggressive cross-platform scaling.</p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span>✨</span> 200 Generation Credits</li>
              <li className="flex items-center gap-2"><span>🚀</span> Priority Queue Access</li>
              <li className="flex items-center gap-2"><span>🧠</span> Gemini Vision Reasoning</li>
            </ul>
            <button 
              onClick={() => handleCheckout('price_pro', 200)}
              disabled={loading === 'price_pro'}
              className="mt-auto w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50"
            >
              {loading === 'price_pro' ? 'Loading...' : 'Buy 200 Credits'}
            </button>
          </div>

          {/* Agency Plan */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden group hover:border-purple-500/30 transition-all">
            <h3 className="text-xl font-bold text-gray-300">Agency Pack</h3>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-extrabold text-white">$399</span>
            </div>
            <p className="text-sm text-gray-400">Manage multiple client accounts.</p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span>✨</span> 1000 Generation Credits</li>
              <li className="flex items-center gap-2"><span>🤖</span> Custom App Playbooks</li>
              <li className="flex items-center gap-2"><span>📊</span> Analytics Loop API</li>
            </ul>
            <button 
              onClick={() => handleCheckout('price_agency', 1000)}
              disabled={loading === 'price_agency'}
              className="mt-auto w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              {loading === 'price_agency' ? 'Loading...' : 'Buy 1000 Credits'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
