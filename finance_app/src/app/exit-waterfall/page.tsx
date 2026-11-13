'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Sliders,
  ShieldAlert,
  ArrowRight,
  Download,
  Users,
  Award,
  HelpCircle,
  FileText
} from 'lucide-react';

interface CapTableRow {
  id: string;
  name: string;
  classType: 'Series A Preferred' | 'Seed SAFE' | 'Common Stock' | 'Option Pool';
  investmentAmount: number;
  preferenceMultiple: number; // e.g. 1.0x
  isParticipating: boolean;
  shares: number;
  ownershipPct: number; // base ownership %
  conversionValuationCap?: number;
}

export default function ExitWaterfallPage() {
  const [exitValuation, setExitValuation] = useState<number>(65000000); // $65M default
  const [carveoutPct, setCarveoutPct] = useState<number>(2.0); // 2% transaction/legal bonus pool carveout
  const [seriesAParticipation, setSeriesAParticipation] = useState<boolean>(false); // Non-participating vs Participating

  // Model cap table assumptions
  const initialCapTable: CapTableRow[] = [
    {
      id: 'ser-a',
      name: 'Apex Horizon Ventures (Series A)',
      classType: 'Series A Preferred',
      investmentAmount: 12000000, // $12M invested at $48M post-money (25%)
      preferenceMultiple: 1.0,
      isParticipating: seriesAParticipation,
      shares: 3000000,
      ownershipPct: 25.0
    },
    {
      id: 'seed-safe',
      name: 'Pioneer Angels Syndicate (SAFEs)',
      classType: 'Seed SAFE',
      investmentAmount: 3000000, // $3M SAFE with $15M valuation cap
      preferenceMultiple: 1.0,
      isParticipating: false,
      shares: 1500000,
      ownershipPct: 12.5,
      conversionValuationCap: 15000000
    },
    {
      id: 'founders',
      name: 'Founders & Core Executives',
      classType: 'Common Stock',
      investmentAmount: 50000,
      preferenceMultiple: 0,
      isParticipating: false,
      shares: 6000000,
      ownershipPct: 50.0
    },
    {
      id: 'esop',
      name: 'Employee Unexercised & Vested Pool',
      classType: 'Option Pool',
      investmentAmount: 0,
      preferenceMultiple: 0,
      isParticipating: false,
      shares: 1500000,
      ownershipPct: 12.5
    }
  ];

  // Waterfall calculation logic:
  // 1. Transaction Expenses / Legal Carveout
  const carveoutAmount = (exitValuation * carveoutPct) / 100;
  const netDistributable = Math.max(0, exitValuation - carveoutAmount);

  // 2. Series A Liquidation Preference check:
  // In 1.0x Non-Participating: Series A receives greater of:
  // a) Liquidation preference ($12M)
  // b) As-converted Common Share (% of total exit)
  const seriesAInvested = 12000000;
  const seriesAOwnership = 0.25;
  const seriesAAsConverted = netDistributable * seriesAOwnership;

  let seriesAPayout = 0;
  let seriesAConverted = false;

  if (seriesAParticipation) {
    // Participating: Gets 1x pref + pro-rata of remaining proceeds
    const remainingAfterPref = Math.max(0, netDistributable - seriesAInvested);
    seriesAPayout = Math.min(netDistributable, seriesAInvested + remainingAfterPref * seriesAOwnership);
  } else {
    // Non-Participating: converts if asConverted > preference
    if (seriesAAsConverted > seriesAInvested) {
      seriesAPayout = seriesAAsConverted;
      seriesAConverted = true;
    } else {
      seriesAPayout = Math.min(netDistributable, seriesAInvested);
      seriesAConverted = false;
    }
  }

  // 3. Seed SAFE conversion & payout
  // Seed SAFE at $15M cap converts into equity based on exit
  const seedSafeInvested = 3000000;
  const seedSafeCap = 15000000;
  // If exit > cap, ownership is effective relative to cap
  const seedSafeEffectivePct = 0.125;
  const seedSafeAsConverted = netDistributable * seedSafeEffectivePct;
  const seedSafePayout = Math.max(seedSafeInvested, seedSafeAsConverted);

  // 4. Remaining distributable to Common & ESOP
  const totalSeniorPayout = seriesAPayout + seedSafePayout;
  const remainingForCommon = Math.max(0, netDistributable - totalSeniorPayout);

  // Common is split 80% Founders / 20% Option Pool (50% / 12.5% of total company)
  const founderShareRatio = 50.0 / 62.5; // 80%
  const esopShareRatio = 12.5 / 62.5; // 20%

  const foundersPayout = remainingForCommon * founderShareRatio;
  const esopPayout = remainingForCommon * esopShareRatio;

  // Investor Multiples
  const seriesAMOIC = seriesAInvested > 0 ? (seriesAPayout / seriesAInvested).toFixed(2) : '0.00';
  const seedMOIC = seedSafeInvested > 0 ? (seedSafePayout / seedSafeInvested).toFixed(2) : '0.00';

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
            <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                M&A Exit Waterfall & Liquidation Preference Simulator
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Real-time exit payout distribution across Series A preferences, Seed SAFE conversion caps, and Founder net proceeds.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting Exit Waterfall Summary to Board M&A Deck...')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-card hover:bg-muted/80 text-foreground border border-border rounded-lg shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Export Waterfall Model
          </button>
        </div>
      </div>

      {/* Interactive Controls & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold text-foreground">Interactive M&A Valuation Slider</h2>
            </div>
            <span className="text-2xl font-bold font-mono text-emerald-500">
              {formatCurrency(exitValuation)}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>$10,000,000 (Downside / Acqui-hire)</span>
              <span>$100,000,000</span>
              <span>$250,000,000 (Unicorn Breakout)</span>
            </div>
            <input
              type="range"
              min={10000000}
              max={250000000}
              step={1000000}
              value={exitValuation}
              onChange={(e) => setExitValuation(Number(e.target.value))}
              className="w-full h-2.5 bg-muted rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Series A Preference Structure
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSeriesAParticipation(false)}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    !seriesAParticipation
                      ? 'bg-primary/10 border-primary text-primary shadow-sm'
                      : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  1.0x Non-Participating (Standard)
                </button>
                <button
                  type="button"
                  onClick={() => setSeriesAParticipation(true)}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    seriesAParticipation
                      ? 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-sm'
                      : 'bg-muted/30 border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  1.0x Participating (Investor Favored)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Transaction / Escrow / Legal Carveout: {carveoutPct}%
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={carveoutPct}
                  onChange={(e) => setCarveoutPct(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <span className="text-xs font-mono font-medium text-muted-foreground w-16 text-right">
                  {formatCurrency(carveoutAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Result Summary Card */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-emerald-500" />
              <h3 className="text-base font-semibold text-foreground">Founder Net Proceeds</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                  Net to Founders & Execs
                </p>
                <p className="text-3xl font-bold font-mono text-emerald-500 mt-1">
                  {formatCurrency(foundersPayout)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((foundersPayout / exitValuation) * 100).toFixed(1)}% of total headline enterprise value
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Distributable Proceeds:</span>
                  <span className="font-mono font-medium text-foreground">{formatCurrency(netDistributable)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Series A Return:</span>
                  <span className="font-mono font-medium text-foreground">
                    {formatCurrency(seriesAPayout)} ({seriesAMOIC}x MOIC)
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Seed SAFEs Return:</span>
                  <span className="font-mono font-medium text-foreground">
                    {formatCurrency(seedSafePayout)} ({seedMOIC}x MOIC)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
            <HelpCircle className="w-4 h-4 text-primary shrink-0" />
            <span>
              {seriesAConverted
                ? 'Series A elected common conversion (proceeds exceed 1x liquidation preference).'
                : 'Series A exercised liquidation preference priority.'}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Waterfall Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Waterfall Tier Allocation Breakdown</h3>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Senior Priority Order: Carveout &rarr; Series A Preference &rarr; Seed SAFEs &rarr; Common Stock
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">Shareholder / Class</th>
                <th className="px-6 py-3.5">Security Class</th>
                <th className="px-6 py-3.5 text-right">Capital Invested</th>
                <th className="px-6 py-3.5 text-right">Liquidation Pref</th>
                <th className="px-6 py-3.5 text-right">Exit Payout</th>
                <th className="px-6 py-3.5 text-right">Effective %</th>
                <th className="px-6 py-3.5 text-right">MOIC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* Series A */}
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">Apex Horizon Ventures</div>
                  <div className="text-xs text-muted-foreground">Series A Lead (Board Seat)</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    Series A Preferred (1.0x)
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  {formatCurrency(seriesAInvested)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  {seriesAParticipation ? '1.0x Participating' : seriesAConverted ? 'Converted to Common' : '$12,000,000'}
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-foreground">
                  {formatCurrency(seriesAPayout)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  {((seriesAPayout / exitValuation) * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right font-mono font-semibold text-emerald-500">
                  {seriesAMOIC}x
                </td>
              </tr>

              {/* Seed SAFE */}
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">Pioneer Angels Syndicate</div>
                  <div className="text-xs text-muted-foreground">Pre-Seed / Seed SAFEs ($15M Cap)</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                    Seed SAFE (Post-Money)
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  {formatCurrency(seedSafeInvested)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  As-Converted ($15M Cap)
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-foreground">
                  {formatCurrency(seedSafePayout)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  {((seedSafePayout / exitValuation) * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right font-mono font-semibold text-emerald-500">
                  {seedMOIC}x
                </td>
              </tr>

              {/* Founders */}
              <tr className="hover:bg-muted/30 transition-colors bg-emerald-500/5">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">Founders & Key Executives</div>
                  <div className="text-xs text-emerald-600">Common Stock (6,000,000 Shares)</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Common Stock
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  $50,000
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  Residual Pool
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-emerald-500 text-base">
                  {formatCurrency(foundersPayout)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  {((foundersPayout / exitValuation) * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right font-mono font-semibold text-emerald-500">
                  {(foundersPayout / 50000).toFixed(0)}x
                </td>
              </tr>

              {/* ESOP */}
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-foreground">Employee Option Pool (ESOP)</div>
                  <div className="text-xs text-muted-foreground">Vested Team Stock Options</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    Option Pool (Residual)
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  $0
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  Residual Pool
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-foreground">
                  {formatCurrency(esopPayout)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  {((esopPayout / exitValuation) * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  N/A
                </td>
              </tr>

              {/* Carveout row */}
              <tr className="hover:bg-muted/30 transition-colors bg-muted/10 font-semibold text-xs">
                <td className="px-6 py-3" colSpan={4}>
                  Legal Advisory, Investment Banking Fee & Escrow Carveout ({carveoutPct}%)
                </td>
                <td className="px-6 py-3 text-right font-mono text-muted-foreground">
                  {formatCurrency(carveoutAmount)}
                </td>
                <td className="px-6 py-3 text-right font-mono text-muted-foreground">
                  {carveoutPct.toFixed(1)}%
                </td>
                <td className="px-6 py-3 text-right font-mono text-muted-foreground">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
