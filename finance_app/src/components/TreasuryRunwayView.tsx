"use client";

import React, { useState, useMemo } from 'react';
import { Landmark, TrendingUp, Sliders, AlertCircle, ArrowRight, ShieldCheck, DollarSign, Download, Zap } from 'lucide-react';
import { TreasurySweepsEngine, INSTITUTIONAL_YIELD_INSTRUMENTS, TreasuryAccount } from '@/lib/treasury/treasurySweepsEngine';
import { RunwayStressEngine, RunwayParameters } from '@/lib/treasury/runwayStressEngine';

export default function TreasuryRunwayView() {
  const [activeTab, setActiveTab] = useState<'sweeps' | 'runway'>('sweeps');

  // Treasury Accounts & Sweeps State
  const [account, setAccount] = useState<TreasuryAccount>({
    accountNumber: '****9182',
    bankName: 'Silicon Valley Bank / First Republic',
    currentBalance: 3250000,
    targetOperatingBalance: 500000,
    sweepEnabled: true,
    designatedYieldId: 'yield-usdy'
  });

  const sweepOrder = useMemo(() => {
    return TreasurySweepsEngine.evaluateSweep(account);
  }, [account]);

  // Monte Carlo Stress Simulation State
  const [runwayParams, setRunwayParams] = useState<RunwayParameters>({
    currentCashBalance: 4250000,
    monthlyRevenueBase: 120000,
    monthlyGrowthRateMean: 0.05,
    monthlyGrowthRateStdDev: 0.03,
    monthlyBurnBase: 250000,
    burnGrowthRatePerMonth: 0.015,
    scenarios: {
      macroDownturnActive: false,
      hiringFreezeActive: false,
      seriesAFundingAmount: 0,
      seriesAFundingMonth: 12
    },
    iterations: 500
  });

  const simulationResult = useMemo(() => {
    return RunwayStressEngine.simulate(runwayParams);
  }, [runwayParams]);

  const [showIsoXml, setShowIsoXml] = useState(false);

  const isoXmlContent = useMemo(() => {
    if (!sweepOrder) return '';
    return TreasurySweepsEngine.generateISO20022CreditTransfer(
      sweepOrder.iso20022InstructionId,
      sweepOrder.sweepAmount,
      account.accountNumber,
      sweepOrder.destinationYield.provider,
      sweepOrder.destinationYield.tokenAddress || 'BENEFICIARY-VAULT-PRIMARY'
    );
  }, [sweepOrder, account]);

  return (
    <div className="space-y-6">
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-900 border border-gray-800 p-4 rounded-2xl gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Landmark className="text-emerald-400 w-5 h-5" />
            Corporate Treasury Sweeps & Monte Carlo Runway Engine
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Automated target balance sweeps into tokenized US Treasuries and stochastic 24-month cash runway stress testing.
          </p>
        </div>

        <div className="flex bg-gray-800 p-1 rounded-xl text-sm font-medium">
          <button
            onClick={() => setActiveTab('sweeps')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'sweeps' ? 'bg-emerald-600 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
          >
            Target Sweeps & Yield
          </button>
          <button
            onClick={() => setActiveTab('runway')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'runway' ? 'bg-emerald-600 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
          >
            Monte Carlo Runway
          </button>
        </div>
      </div>

      {/* TAB 1: SWEEPS & YIELD */}
      {activeTab === 'sweeps' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Operating Bank Balance</span>
              <div className="text-2xl font-bold text-white mt-1">${account.currentBalance.toLocaleString()}</div>
              <span className="text-xs text-gray-400 mt-1 inline-block">{account.bankName} ({account.accountNumber})</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Target Operating Buffer</span>
              <div className="text-2xl font-bold text-amber-400 mt-1">${account.targetOperatingBalance.toLocaleString()}</div>
              <span className="text-xs text-emerald-400 mt-1 inline-block">60-day OPEX reserve preserved</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Identified Excess Liquidity</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">
                ${sweepOrder ? sweepOrder.sweepAmount.toLocaleString() : '0'}
              </div>
              <span className="text-xs text-blue-400 mt-1 inline-block">
                {sweepOrder ? `Projected Yield: +$${sweepOrder.projectedAnnualYield.toLocaleString()}/yr` : 'Within buffer'}
              </span>
            </div>
          </div>

          {/* Institutional Yield Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-semibold text-white">Institutional Tokenized US Treasury Destinations</h3>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                Regulated SEC / Bankruptcy-Remote Vehicles
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-gray-800/50 text-xs text-gray-400 uppercase">
                  <tr>
                    <th className="p-3">Instrument</th>
                    <th className="p-3">Annualized Yield (APY)</th>
                    <th className="p-3">Provider / Custody</th>
                    <th className="p-3">Liquidity Tier</th>
                    <th className="p-3">Network / Token</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {INSTITUTIONAL_YIELD_INSTRUMENTS.map((inst) => (
                    <tr key={inst.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="p-3 font-medium text-white">{inst.name} ({inst.symbol})</td>
                      <td className="p-3 font-bold text-emerald-400">{inst.apy.toFixed(2)}%</td>
                      <td className="p-3 text-gray-400">{inst.provider}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-xs bg-gray-800 border border-gray-700 text-blue-400">
                          {inst.liquidityTier}
                        </span>
                      </td>
                      <td className="p-3 text-xs font-mono text-gray-400">{inst.chain}</td>
                      <td className="p-3">
                        <button
                          onClick={() => setAccount({ ...account, designatedYieldId: inst.id })}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${account.designatedYieldId === inst.id ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        >
                          {account.designatedYieldId === inst.id ? 'Selected Route' : 'Route Here'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sweep Order Details & ISO 20022 Preview */}
          {sweepOrder && (
            <div className="bg-emerald-950/20 border border-emerald-900/40 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    <Zap className="text-emerald-400 w-5 h-5" />
                    Automated Liquidity Sweep Ready: Order {sweepOrder.orderId}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Directing ${sweepOrder.sweepAmount.toLocaleString()} to {sweepOrder.destinationYield.name} earning {sweepOrder.destinationYield.apy}% APY (+$ {sweepOrder.projectedAnnualYield.toLocaleString()}/yr).
                  </p>
                </div>
                <button
                  onClick={() => setShowIsoXml(!showIsoXml)}
                  className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold py-2 px-3 rounded-lg border border-gray-700 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  {showIsoXml ? 'Hide ISO 20022 XML' : 'View ISO 20022 pain.001'}
                </button>
              </div>

              {showIsoXml && (
                <pre className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-xs text-gray-300 font-mono overflow-y-auto max-h-64 whitespace-pre-wrap">
                  {isoXmlContent}
                </pre>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MONTE CARLO RUNWAY */}
      {activeTab === 'runway' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Sliders className="text-blue-400 w-5 h-5" />
              Simulation Stress Toggles
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={runwayParams.scenarios.macroDownturnActive}
                  onChange={(e) => setRunwayParams({
                    ...runwayParams,
                    scenarios: { ...runwayParams.scenarios, macroDownturnActive: e.target.checked }
                  })}
                  className="rounded bg-gray-800 border-gray-700 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="font-medium">Macroeconomic Downturn (-50% growth)</span>
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={runwayParams.scenarios.hiringFreezeActive}
                  onChange={(e) => setRunwayParams({
                    ...runwayParams,
                    scenarios: { ...runwayParams.scenarios, hiringFreezeActive: e.target.checked }
                  })}
                  className="rounded bg-gray-800 border-gray-700 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="font-medium">Hiring & CAPEX Freeze (0% burn inflation)</span>
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-800">
              <div>
                <label className="text-xs text-gray-400">Current Cash ($)</label>
                <input
                  type="number"
                  value={runwayParams.currentCashBalance}
                  onChange={(e) => setRunwayParams({ ...runwayParams, currentCashBalance: Number(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Monthly Burn Base ($)</label>
                <input
                  type="number"
                  value={runwayParams.monthlyBurnBase}
                  onChange={(e) => setRunwayParams({ ...runwayParams, monthlyBurnBase: Number(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Monthly Revenue ($)</label>
                <input
                  type="number"
                  value={runwayParams.monthlyRevenueBase}
                  onChange={(e) => setRunwayParams({ ...runwayParams, monthlyRevenueBase: Number(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm mt-1"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <span className="text-xs text-red-400 uppercase font-semibold">Worst-Case (P10)</span>
                <div className="text-2xl font-bold text-white mt-1">{simulationResult.p10RunwayMonths} Months</div>
                <span className="text-xs text-gray-400 mt-1 inline-block">10th percentile adverse shock</span>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                <span className="text-xs text-blue-400 uppercase font-semibold">Median Expected (P50)</span>
                <div className="text-2xl font-bold text-white mt-1">{simulationResult.p50RunwayMonths} Months</div>
                <span className="text-xs text-gray-400 mt-1 inline-block">50th percentile baseline plan</span>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                <span className="text-xs text-emerald-400 uppercase font-semibold">Zero-Cash Risk (24M)</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">{simulationResult.zeroCashProbability24M}%</div>
                <span className="text-xs text-gray-400 mt-1 inline-block">Depletion probability</span>
              </div>
            </div>

            <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-800">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="text-emerald-400 w-4 h-4" />
                Autonomous Treasury Directive:
              </h4>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                {simulationResult.recommendation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
