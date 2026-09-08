"use client";

import React from 'react';
import { ShieldCheck, Target, TrendingUp, Lightbulb } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#1a202c] text-white p-12">
      <h1 className="text-4xl font-extrabold mb-2 text-[#60a9ff]">Admin Dashboard</h1>
      <p className="text-gray-400 mb-10">System-level metrics and quality assurance (Internal Use Only)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Trust Score Panel */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10">
            <ShieldCheck className="w-48 h-48 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <ShieldCheck /> System Trust Score
          </h2>
          <div className="text-6xl font-black text-white mb-6">
            87<span className="text-2xl text-emerald-400">/100</span>
          </div>
          
          <div className="space-y-4 relative z-10">
            <h3 className="font-semibold text-emerald-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Suggestions to Improve Trust
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Reduce hallucination rates in the AI generation pipeline by explicitly enforcing factual grounding in the prompts.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Enable manual "Human-in-the-Loop" approval for all automated posts targeting enterprise brands.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Improve transparency by logging exact prompt inputs alongside outputs in the Historical Ledger.</li>
            </ul>
          </div>
        </div>

        {/* Accuracy Score Panel */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10">
            <Target className="w-48 h-48 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <Target /> AI Accuracy Score
          </h2>
          <div className="text-6xl font-black text-white mb-6">
            92<span className="text-2xl text-blue-400">/100</span>
          </div>
          
          <div className="space-y-4 relative z-10">
            <h3 className="font-semibold text-blue-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Suggestions to Improve Accuracy
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" /> Fine-tune the Gemini orchestration prompts to heavily penalize stylistic deviations from brand guidelines.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" /> Introduce a self-correction loop where the LLM evaluates its own output against brand rules before passing it to the publisher.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" /> Leverage Crawlee to scrape more up-to-date source context right before generation.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
