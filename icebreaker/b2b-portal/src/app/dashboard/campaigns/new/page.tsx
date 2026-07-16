"use client";

import { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from "next/dynamic";

const Excalidraw = dynamic(() => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw), { ssr: false });

const CREATE_SWARM_CAMPAIGN = gql`
  mutation CreateSwarmCampaign($title: String!, $description: String!, $maxDiscount: String!, $latitude: Float!, $longitude: Float!, $totalBudget: Int!, $targetCheckIns: Int!) {
    createSwarmCampaign(
      title: $title,
      description: $description,
      maxDiscount: $maxDiscount,
      latitude: $latitude,
      longitude: $longitude,
      totalBudget: $totalBudget,
      targetCheckIns: $targetCheckIns
    ) {
      id
      title
      maxDiscount
      checkoutUrl
    }
  }
`;

export default function NewSwarmCampaignPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [targetCheckIns, setTargetCheckIns] = useState('10');
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  
  // Dual-mode budget state
  const [inputValue, setInputValue] = useState('');
  const [budgetMode, setBudgetMode] = useState<'INCLUSIVE' | 'EXCLUSIVE'>('INCLUSIVE');
  
  const [createCampaign, { loading, error }] = useMutation<any, any>(CREATE_SWARM_CAMPAIGN);

  const PLATFORM_FEE_RATE = 0.10; // 10%

  // Calculate the actual values based on the mode
  let rawInput = parseFloat(inputValue) || 0;
  let marketingBudget = 0;
  let fee = 0;
  let totalCharged = 0;

  if (rawInput > 0) {
    if (budgetMode === 'INCLUSIVE') {
      // Input is total max spend. Total = Budget + 10% Budget = 1.1 * Budget
      marketingBudget = rawInput / (1 + PLATFORM_FEE_RATE);
      fee = rawInput - marketingBudget;
      totalCharged = rawInput;
    } else {
      // Input is exactly the marketing budget
      marketingBudget = rawInput;
      fee = rawInput * PLATFORM_FEE_RATE;
      totalCharged = rawInput + fee;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (marketingBudget <= 0) return;

    try {
      const totalBudgetCents = Math.round(marketingBudget * 100);

      const { data } = await createCampaign({
        variables: {
          title,
          description,
          maxDiscount,
          targetCheckIns: parseInt(targetCheckIns),
          latitude: 37.7749, // Placeholder for Venue coordinates
          longitude: -122.4194,
          totalBudget: totalBudgetCents
        }
      });

      if (data?.createSwarmCampaign?.checkoutUrl) {
        window.location.href = data.createSwarmCampaign.checkoutUrl;
      } else {
        router.push('/dashboard/campaigns');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/campaigns" className="text-white/40 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create Swarm Campaign</h1>
          <p className="text-white/60">Launch a flash mob and drive instant foot traffic by offering tiered discounts based on group size.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">Campaign Title</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-all" 
            placeholder="e.g. 50% off if 10 people show up!"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">Maximum Discount Offered</label>
            <input 
              type="text" 
              required
              value={maxDiscount}
              onChange={(e) => setMaxDiscount(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-all" 
              placeholder="e.g. 50%"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">Target Check-ins</label>
            <input 
              type="number" 
              required
              min="1"
              value={targetCheckIns}
              onChange={(e) => setTargetCheckIns(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-all" 
              placeholder="e.g. 10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">Campaign Moodboard (Optional)</label>
          <div className="w-full bg-white/5 border border-white/10 rounded-xl h-[400px] relative overflow-hidden" style={{ minHeight: "400px" }}>
             <Excalidraw 
                theme="dark" 
                excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
             />
          </div>
          <p className="text-xs text-white/40 mt-2">Sketch out your vision for the content you want influencers to create.</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">Campaign Description</label>
          <textarea 
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-all min-h-[100px]" 
            placeholder="Describe the campaign to users"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">Budget Amount ($ USD)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-white/40">$</span>
            </div>
            <input 
              type="number" 
              required
              min="5"
              step="0.01"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-all" 
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-4 p-4 rounded-xl bg-black/20 border border-white/5">
          <label className="block text-sm font-medium text-white/80">How should we apply this budget?</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className={`flex-1 flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${budgetMode === 'INCLUSIVE' ? 'border-[#00ffcc] bg-[#00ffcc]/10' : 'border-white/10 hover:bg-white/5'}`}>
              <input 
                type="radio" 
                name="budgetMode"
                checked={budgetMode === 'INCLUSIVE'} 
                onChange={() => setBudgetMode('INCLUSIVE')}
                className="mt-1"
              />
              <div>
                <div className="font-semibold text-white">This is my Total Spend</div>
                <div className="text-xs text-white/60 mt-1">We'll deduct our 10% fee from this total.</div>
              </div>
            </label>
            
            <label className={`flex-1 flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${budgetMode === 'EXCLUSIVE' ? 'border-[#00ffcc] bg-[#00ffcc]/10' : 'border-white/10 hover:bg-white/5'}`}>
              <input 
                type="radio" 
                name="budgetMode"
                checked={budgetMode === 'EXCLUSIVE'} 
                onChange={() => setBudgetMode('EXCLUSIVE')}
                className="mt-1"
              />
              <div>
                <div className="font-semibold text-white">This is my Marketing Budget</div>
                <div className="text-xs text-white/60 mt-1">We'll add our 10% fee on top of this.</div>
              </div>
            </label>
          </div>
          
          {rawInput > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10 text-sm space-y-2 text-white/80">
              <div className="flex justify-between">
                <span>Marketing Budget:</span>
                <span className="font-mono">${marketingBudget.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee (10%):</span>
                <span className="font-mono">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-white pt-2">
                <span>Total Amount Charged:</span>
                <span className="font-mono text-[#00ffcc]">${totalCharged.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
            {error.message}
          </div>
        )}

        <div className="pt-6 border-t border-white/5 flex justify-end">
          <button 
            type="submit" 
            disabled={loading || rawInput <= 0}
            className="bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] hover:opacity-90 text-black font-bold py-3 px-8 rounded-full transition-opacity disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </form>
    </div>
  );
}
