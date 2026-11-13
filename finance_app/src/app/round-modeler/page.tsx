'use client';

import React, { useState } from 'react';
import {
  PieChart,
  TrendingUp,
  Sliders,
  DollarSign,
  Percent,
  Users,
  Award,
  ArrowRight,
  Download,
  Info,
  ShieldCheck,
  Check
} from 'lucide-react';

interface InvestorProRata {
  name: string;
  currentOwnershipPct: number;
  proRataCheckNeeded: number;
  postRoundOwnershipIfExercised: number;
  postRoundOwnershipIfDiluted: number;
}

export default function RoundModelerPage() {
  const [preMoneyValuation, setPreMoneyValuation] = useState<number>(80000000); // $80M pre-money
  const [targetInvestment, setTargetInvestment] = useState<number>(20000000); // $20M new capital
  const [optionPoolExpansionPct, setOptionPoolExpansionPct] = useState<number>(10.0); // 10% unallocated post-money pool
  const [exerciseProRata, setExerciseProRata] = useState<boolean>(true); // Assume major investors exercise pro-rata

  // Existing cap table: Total pre-existing shares = 12,000,000
  // Previous Series A share price = $4.00 (Series A post-money was $48M)
  const existingShares = 12000000;
  const seriesAShares = 3000000; // 25%
  const seedShares = 1500000; // 12.5%
  const founderShares = 6000000; // 50%
  const esopShares = 1500000; // 12.5%

  // Post-Money Valuation
  const postMoneyValuation = preMoneyValuation + targetInvestment; // $100M default

  // New Lead Investor Ownership % = Target Investment / Post-Money
  const newInvestorOwnershipPct = (targetInvestment / postMoneyValuation) * 100; // 20%

  // Effective Dilution Factor:
  // Post-money shares include:
  // Existing shares + Option Pool expansion + New round shares
  // With post-money unallocated pool of optionPoolExpansionPct:
  // Non-investor equity is diluted by (newInvestorOwnershipPct + optionPoolExpansionPct)
  const totalDilutionFactor = (100 - newInvestorOwnershipPct - optionPoolExpansionPct) / 100;

  // New share price calculation
  // Price per share = Pre-Money Valuation / Pre-round fully diluted shares (adjusted for option pool shuffle)
  const effectivePricePerShare = (preMoneyValuation / existingShares) * (1 - optionPoolExpansionPct / 100);
  const seriesASharePrice = 4.0;
  const stepUpMultiple = (effectivePricePerShare / seriesASharePrice).toFixed(2);

  // Pro-Rata checks for existing investors:
  // To maintain ownership of 25% post-money in a $100M company:
  // Required value = 25% * $100M = $25M. Pre-existing value was 25% * $80M = $20M.
  // Pro-rata check = 25% * $20M new investment = $5.0M
  const seriesAProRataCheck = (seriesAShares / existingShares) * targetInvestment;
  const seedProRataCheck = (seedShares / existingShares) * targetInvestment;

  // Post-round founder ownership:
  const founderPostOwnership = (founderShares / existingShares) * totalDilutionFactor * 100;
  const esopPostOwnership = optionPoolExpansionPct + (esopShares / existingShares) * totalDilutionFactor * 100;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl border border-blue-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Series B/C Round Dilution & Pro-Rata Modeler
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Simulate next-round term sheets, option pool refreshes, major investor pro-rata check rights, and founder net dilution.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting Term Sheet Comparison & Cap Table Dilution Model to Board Deck...')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-card hover:bg-muted/80 text-foreground border border-border rounded-lg shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Export Dilution Deck
          </button>
        </div>
      </div>

      {/* Interactive Sliders & Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold text-foreground">Next-Round Valuation & Capital Controls</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground block">Resulting Post-Money Valuation</span>
              <span className="text-2xl font-bold font-mono text-emerald-500">
                {formatCurrency(postMoneyValuation)}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Pre-Money Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Pre-Money Valuation</span>
                <span className="font-mono font-bold text-foreground">{formatCurrency(preMoneyValuation)}</span>
              </div>
              <input
                type="range"
                min={40000000}
                max={250000000}
                step={5000000}
                value={preMoneyValuation}
                onChange={(e) => setPreMoneyValuation(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$40M</span>
                <span>$120M</span>
                <span>$250M</span>
              </div>
            </div>

            {/* Target Investment Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Target Primary Capital Raised</span>
                <span className="font-mono font-bold text-foreground">{formatCurrency(targetInvestment)}</span>
              </div>
              <input
                type="range"
                min={10000000}
                max={60000000}
                step={2500000}
                value={targetInvestment}
                onChange={(e) => setTargetInvestment(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$10M</span>
                <span>$30M</span>
                <span>$60M</span>
              </div>
            </div>

            {/* Option Pool Expansion Slider */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Post-Money Unallocated Option Pool (ESOP Refresh)</span>
                <span className="font-mono font-bold text-foreground">{optionPoolExpansionPct.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={20}
                step={0.5}
                value={optionPoolExpansionPct}
                onChange={(e) => setOptionPoolExpansionPct(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5% (Modest)</span>
                <span>10% (Market Standard)</span>
                <span>20% (Aggressive Hiring)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Price Step-up & Founder Impact */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="text-base font-semibold text-foreground">Round Pricing & Step-up</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
                <p className="text-xs font-medium text-primary uppercase tracking-wider">
                  New Share Price & Step-Up
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-3xl font-bold font-mono text-foreground">
                    ${effectivePricePerShare.toFixed(2)}
                  </p>
                  <span className="text-sm font-bold text-emerald-500">
                    ({stepUpMultiple}x Series A)
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Previous Series A Price: ${seriesASharePrice.toFixed(2)}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">New Lead Ownership:</span>
                  <span className="font-mono font-bold text-foreground">{newInvestorOwnershipPct.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Founder Ownership Retained:</span>
                  <span className="font-mono font-bold text-emerald-500">{founderPostOwnership.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Total ESOP Pool (Vested + Unallocated):</span>
                  <span className="font-mono font-medium text-foreground">{esopPostOwnership.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="w-4 h-4 text-primary shrink-0" />
            <span>
              Unallocated option pool refresh of {optionPoolExpansionPct}% is calculated on a post-closing fully diluted basis.
            </span>
          </div>
        </div>
      </div>

      {/* Pro-Rata Rights Calculator */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-semibold text-foreground">Major Investor Super Pro-Rata Rights Allocation</h3>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Mandatory checks required for existing syndicate to avoid equity dilution
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">Investor / Syndicate</th>
                <th className="px-6 py-3.5 text-center">Pre-Round Ownership</th>
                <th className="px-6 py-3.5 text-right">Pro-Rata Check Required</th>
                <th className="px-6 py-3.5 text-center">Post-Round (If Exercised)</th>
                <th className="px-6 py-3.5 text-center">Post-Round (If Diluted)</th>
                <th className="px-6 py-3.5 text-right">Implied Equity Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">Apex Horizon Ventures (Series A Lead)</div>
                  <div className="text-xs text-muted-foreground">Contractual Major Investor Information & Pro-Rata Rights</div>
                </td>
                <td className="px-6 py-4 text-center font-mono font-medium text-foreground">
                  25.0%
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-primary">
                  {formatCurrency(seriesAProRataCheck)}
                </td>
                <td className="px-6 py-4 text-center font-mono font-bold text-emerald-500">
                  {((seriesAShares / existingShares) * (1 - optionPoolExpansionPct / 100) * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-center font-mono text-muted-foreground">
                  {((seriesAShares / existingShares) * totalDilutionFactor * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-foreground">
                  {formatCurrency(postMoneyValuation * 0.225)}
                </td>
              </tr>

              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">Pioneer Angels Syndicate (Seed SAFE)</div>
                  <div className="text-xs text-muted-foreground">Side Letter Pro-Rata Agreement ($15M Cap Converted)</div>
                </td>
                <td className="px-6 py-4 text-center font-mono font-medium text-foreground">
                  12.5%
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-primary">
                  {formatCurrency(seedProRataCheck)}
                </td>
                <td className="px-6 py-4 text-center font-mono font-bold text-emerald-500">
                  {((seedShares / existingShares) * (1 - optionPoolExpansionPct / 100) * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-center font-mono text-muted-foreground">
                  {((seedShares / existingShares) * totalDilutionFactor * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-foreground">
                  {formatCurrency(postMoneyValuation * 0.1125)}
                </td>
              </tr>

              <tr className="hover:bg-muted/30 transition-colors bg-emerald-500/5">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">Founders & Common Shareholders</div>
                  <div className="text-xs text-emerald-600">6,000,000 Common Shares</div>
                </td>
                <td className="px-6 py-4 text-center font-mono font-medium text-foreground">
                  50.0%
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  $0 (Diluted)
                </td>
                <td className="px-6 py-4 text-center font-mono text-muted-foreground">-</td>
                <td className="px-6 py-4 text-center font-mono font-bold text-emerald-500 text-base">
                  {founderPostOwnership.toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-emerald-500">
                  {formatCurrency(postMoneyValuation * (founderPostOwnership / 100))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
