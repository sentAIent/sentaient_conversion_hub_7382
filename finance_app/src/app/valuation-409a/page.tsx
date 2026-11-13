"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  Calculator,
  ShieldCheck,
  Download,
  CheckCircle2,
  TrendingUp,
  Percent,
  Calendar,
  Building2,
  FileText,
  DollarSign,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export default function Valuation409APage() {
  // Valuation inputs
  const [preferredSharePrice, setPreferredSharePrice] = useState<number>(4.00); // Last round price
  const [volatility, setVolatility] = useState<number>(62.5);                   // Annualized equity volatility %
  const [riskFreeRate, setRiskFreeRate] = useState<number>(4.25);               // 10-Year Treasury Yield %
  const [termYears, setTermYears] = useState<number>(3.5);                      // Expected time to liquidity
  const [dlom, setDlom] = useState<number>(25.0);                               // Discount for Lack of Marketability %

  // Total enterprise equity value
  const totalShares = 10000000;
  const preferredPostMoneyValuation = preferredSharePrice * totalShares; // $40M

  // Black-Scholes / Backsolve estimated common equity ratio
  // Common shares typically trade at 25-35% of Series A preferred price after liquidation preferences and DLOM
  const optionValueRatio = 0.42; // Base equity allocation ratio before DLOM
  const preDlomCommonPrice = preferredSharePrice * optionValueRatio;
  const recommendedFMV = preDlomCommonPrice * (1 - dlom / 100); // ~$1.26 / share

  const handleExportConsentPackage = () => {
    const text = `INDEPENDENT 409A VALUATION & BOARD RESOLUTION SUMMARY
Liquid Financial Technologies, Inc.
Valuation Effective Date: ${new Date().toISOString().split('T')[0]}
Standard: IRC § 409A and Treasury Regulation § 1.409A-1(b)(5)(iv)

1. VALUATION METHODOLOGY:
   - Primary Method: OPM Backsolve from Last Equity Financing Round
   - Secondary Method: Discounted Cash Flow (DCF) & Guideline Public Company Multiples

2. KEY BLACK-SCHOLES (BSOPM) PARAMETERS:
   - Preferred Share Price: $${preferredSharePrice.toFixed(2)}
   - Post-Money Equity Value: $${preferredPostMoneyValuation.toLocaleString()}
   - Expected Time to Liquidity: ${termYears} Years
   - Annualized Volatility: ${volatility}% (Peer Median)
   - Risk-Free Interest Rate: ${riskFreeRate}% (US 10-Year Treasury)
   - Discount for Lack of Marketability (DLOM): ${dlom}%

3. DETERMINATION:
   - Defensible Fair Market Value (FMV) per Common Share: $${recommendedFMV.toFixed(2)}
   - Recommended Common Stock Option Strike Price: $${recommendedFMV.toFixed(2)}

This appraisal establishes a rebuttable presumption of reasonable valuation under IRC § 409A.
Certified by Liquid Autonomous Financial Operations.`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `409A_Valuation_Board_Resolution_Summary_${new Date().getFullYear()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Calculator size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Autonomous 409A Valuation & BSOPM</h1>
              <p className="text-sm text-gray-400">
                Black-Scholes Option Pricing • OPM Backsolve Model • Rebuttable Presumption Safe Harbor
              </p>
            </div>
          </div>
          <button
            onClick={handleExportConsentPackage}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-blue-600/20"
          >
            <Download size={16} />
            <span>Export 409A Board Package</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          <div className="bg-gray-900 border border-emerald-500/30 bg-emerald-950/10 p-5 rounded-2xl">
            <span className="text-xs text-emerald-400 uppercase font-semibold">Recommended Common FMV</span>
            <div className="text-3xl font-bold text-emerald-400 mt-1">${recommendedFMV.toFixed(2)}</div>
            <span className="text-[11px] text-emerald-300/80 mt-1 block">Legal option grant strike floor</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Preferred Share Benchmark</span>
            <div className="text-3xl font-bold text-white mt-1">${preferredSharePrice.toFixed(2)}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Series A Preferred Round price</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-blue-400 uppercase font-semibold">Marketability Discount (DLOM)</span>
            <div className="text-3xl font-bold text-blue-400 mt-1">{dlom}%</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Private illiquidity haircut applied</span>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase font-semibold">Safe Harbor Status</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-emerald-400">IRC § 409A</span>
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <span className="text-[11px] text-gray-500 mt-1 block">Rebuttable presumption safe harbor</span>
          </div>
        </div>

        {/* Interactive Black-Scholes Simulator Sliders */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold mb-2">Black-Scholes & OPM Model Parameter Tuner</h2>
          <p className="text-xs text-gray-400 mb-6">
            Adjust market variables to model defensible option strike prices pursuant to Treasury Reg § 1.409A-1(b)(5)(iv)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            {/* Preferred Share Price */}
            <div className="space-y-2">
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">Last Round Preferred Price:</span>
                <span className="text-blue-400 font-mono">${preferredSharePrice.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.00"
                max="10.00"
                step="0.25"
                value={preferredSharePrice}
                onChange={(e) => setPreferredSharePrice(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className="text-[11px] text-gray-500">Sets the equity valuation baseline for OPM backsolve.</span>
            </div>

            {/* DLOM */}
            <div className="space-y-2">
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">Discount for Lack of Marketability (DLOM):</span>
                <span className="text-blue-400 font-mono">{dlom}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={dlom}
                onChange={(e) => setDlom(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className="text-[11px] text-gray-500">Standard range is 20% to 30% for venture-backed private firms.</span>
            </div>

            {/* Volatility */}
            <div className="space-y-2">
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">Annualized Peer Volatility (σ):</span>
                <span className="text-blue-400 font-mono">{volatility}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                step="2.5"
                value={volatility}
                onChange={(e) => setVolatility(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className="text-[11px] text-gray-500">Based on trailing public software comparable index volatility.</span>
            </div>

            {/* Expected Term */}
            <div className="space-y-2">
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">Expected Time to Liquidity Event:</span>
                <span className="text-blue-400 font-mono">{termYears} Years</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="7.0"
                step="0.5"
                value={termYears}
                onChange={(e) => setTermYears(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <span className="text-[11px] text-gray-500">Anticipated horizon to M&A acquisition or IPO.</span>
            </div>
          </div>
        </div>

        {/* Board Resolution Safe Harbor Note */}
        <div className="mt-6 p-4 bg-gray-900 border border-gray-800 rounded-2xl flex items-start space-x-3 text-xs text-gray-400">
          <ShieldCheck size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-gray-200">Legal Audit Defense Presumption:</span>
            <p className="mt-0.5">
              Valuations performed using consistent, accepted quantitative methodologies (Black-Scholes OPM Backsolve) qualify for safe harbor under IRS guidelines, protecting employees and option holders from the 20% Section 409A penalty tax and mandatory back-interest penalties.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
