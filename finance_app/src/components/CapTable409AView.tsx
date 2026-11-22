"use client";

import React, { useState, useMemo } from 'react';
import { Users, PieChart, TrendingUp, FileText, Clock, AlertTriangle, CheckCircle, ShieldCheck, Download } from 'lucide-react';
import { CapTableEngine, ShareholderStake } from '@/lib/equity/capTableEngine';
import { Valuation409AEngine } from '@/lib/equity/valuation409A';
import { Section83bEngine, Section83bElectionInput } from '@/lib/equity/section83bEngine';

export default function CapTable409AView() {
  const [activeTab, setActiveTab] = useState<'waterfall' | 'valuation409a' | 'section83b'>('waterfall');

  // Cap Table & Waterfall State
  const capEngine = useMemo(() => new CapTableEngine(), []);
  const stakes = useMemo(() => capEngine.getStakes(), [capEngine]);
  const totalShares = useMemo(() => capEngine.getTotalFullyDilutedShares(), [capEngine]);
  const [exitValuation, setExitValuation] = useState<number>(35000000);

  const waterfallResult = useMemo(() => {
    return capEngine.simulateWaterfall(exitValuation);
  }, [capEngine, exitValuation]);

  // 409A Valuation State
  const [valInputs, setValInputs] = useState({
    enterpriseValuation: 30000000,
    liquidationPreferenceTotal: 6000000,
    totalCommonShares: 7000000,
    totalPreferredShares: 2000000,
    timeToLiquidityYears: 2.5,
    riskFreeRate: 0.042,
    volatility: 0.65,
    dlomDiscountRate: 0.25
  });

  const val409aResult = useMemo(() => {
    return Valuation409AEngine.calculate409A(valInputs);
  }, [valInputs]);

  // Section 83(b) State
  const [sec83bInputs, setSec83bInputs] = useState<Section83bElectionInput>({
    taxpayerName: 'Sarah Jenkins',
    taxpayerSSN: 'XXX-XX-4892',
    taxpayerAddress: '450 Mission St, San Francisco, CA 94105',
    companyName: 'Liquid Technologies Inc.',
    companyEIN: 'XX-XXXXXXX',
    companyAddress: '100 Montgomery St, San Francisco, CA 94104',
    sharesCount: 500000,
    shareClassDescription: 'Common Stock ($0.0001 par value)',
    transferDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    fairMarketValuePerShare: 0.08,
    amountPaidPerShare: 0.0001,
    vestingScheduleDescription: '25% cliff after 12 months, remaining 75% monthly over 36 months'
  });

  const sec83bPackage = useMemo(() => {
    return Section83bEngine.generatePackage(sec83bInputs);
  }, [sec83bInputs]);

  const download83bPackage = () => {
    const blob = new Blob([sec83bPackage.electionLetterText + '\n\n' + sec83bPackage.coverLetterText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IRS_Section_83b_Election_${sec83bInputs.taxpayerName.replace(/\s+/g, '_')}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-900 border border-gray-800 p-4 rounded-2xl gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <PieChart className="text-blue-400 w-5 h-5" />
            Cap Table, 409A Valuation & Section 83(b) Engine
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Carta-grade equity governance, Black-Scholes OPM backsolve, and statutory tax election generation.
          </p>
        </div>

        <div className="flex bg-gray-800 p-1 rounded-xl text-sm font-medium">
          <button
            onClick={() => setActiveTab('waterfall')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'waterfall' ? 'bg-blue-600 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
          >
            Cap Table & Waterfall
          </button>
          <button
            onClick={() => setActiveTab('valuation409a')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'valuation409a' ? 'bg-blue-600 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
          >
            409A OPM Model
          </button>
          <button
            onClick={() => setActiveTab('section83b')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'section83b' ? 'bg-blue-600 text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
          >
            Section 83(b) Vault
          </button>
        </div>
      </div>

      {/* TAB 1: CAP TABLE & LIQUIDATION WATERFALL */}
      {activeTab === 'waterfall' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Fully Diluted Shares</span>
              <div className="text-2xl font-bold text-white mt-1">{totalShares.toLocaleString()}</div>
              <span className="text-xs text-emerald-400 mt-1 inline-block">Common, Preferred, SAFEs & Pool</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Simulated Exit Valuation</span>
              <div className="text-2xl font-bold text-blue-400 mt-1">${(exitValuation / 1000000).toFixed(1)}M</div>
              <input
                type="range"
                min="5000000"
                max="100000000"
                step="1000000"
                value={exitValuation}
                onChange={(e) => setExitValuation(Number(e.target.value))}
                className="w-full mt-2 accent-blue-500"
              />
            </div>
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Common Payout / Share</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">${waterfallResult.commonSharePrice.toFixed(4)}</div>
              <span className="text-xs text-gray-400 mt-1 inline-block">At ${(exitValuation / 1000000).toFixed(0)}M enterprise exit</span>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-semibold text-white">Waterfall Liquidation Proceeds Distribution</h3>
              <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                Senior Preference Followed by Pro-Rata Common
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-gray-800/50 text-xs text-gray-400 uppercase">
                  <tr>
                    <th className="p-3">Shareholder / Class</th>
                    <th className="p-3">Class</th>
                    <th className="p-3">Shares</th>
                    <th className="p-3">Fully Diluted %</th>
                    <th className="p-3">Preference Payout</th>
                    <th className="p-3">Common Payout</th>
                    <th className="p-3">Total Exit Proceeds</th>
                    <th className="p-3">Multiple</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {waterfallResult.distributions.map((d) => (
                    <tr key={d.shareholderId} className="hover:bg-gray-800/30 transition-colors">
                      <td className="p-3 font-medium text-white">{d.name}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-xs bg-gray-800 border border-gray-700 text-gray-300">
                          {d.shareClass}
                        </span>
                      </td>
                      <td className="p-3">{(stakes.find(s => s.id === d.shareholderId)?.shares || 0).toLocaleString()}</td>
                      <td className="p-3 font-semibold text-blue-400">{d.ownershipPercentage.toFixed(1)}%</td>
                      <td className="p-3">${Math.round(d.preferenceProceeds).toLocaleString()}</td>
                      <td className="p-3">${Math.round(d.commonProceeds).toLocaleString()}</td>
                      <td className="p-3 font-bold text-emerald-400">${Math.round(d.totalProceeds).toLocaleString()}</td>
                      <td className="p-3 font-semibold text-purple-400">{d.effectiveMultiple > 0 ? `${d.effectiveMultiple}x` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 409A BLACK-SCHOLES OPM VALUATION */}
      {activeTab === 'valuation409a' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <TrendingUp className="text-emerald-400 w-5 h-5" />
              OPM Backsolve Inputs
            </h3>
            <div>
              <label className="text-xs text-gray-400">Enterprise Valuation ($)</label>
              <input
                type="number"
                value={valInputs.enterpriseValuation}
                onChange={(e) => setValInputs({ ...valInputs, enterpriseValuation: Number(e.target.value) })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Total Senior Preference ($)</label>
              <input
                type="number"
                value={valInputs.liquidationPreferenceTotal}
                onChange={(e) => setValInputs({ ...valInputs, liquidationPreferenceTotal: Number(e.target.value) })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400">Time to Exit (Years)</label>
                <input
                  type="number"
                  step="0.5"
                  value={valInputs.timeToLiquidityYears}
                  onChange={(e) => setValInputs({ ...valInputs, timeToLiquidityYears: Number(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Volatility (σ)</label>
                <input
                  type="number"
                  step="0.05"
                  value={valInputs.volatility}
                  onChange={(e) => setValInputs({ ...valInputs, volatility: Number(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm mt-1"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400">DLOM Discount Rate</label>
              <input
                type="number"
                step="0.05"
                value={valInputs.dlomDiscountRate}
                onChange={(e) => setValInputs({ ...valInputs, dlomDiscountRate: Number(e.target.value) })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm mt-1"
              />
            </div>
          </div>

          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <span className="text-xs text-gray-400 uppercase">Pre-Discount Share Price</span>
                <div className="text-xl font-bold text-white mt-1">${val409aResult.preDiscountSharePrice.toFixed(4)}</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <span className="text-xs text-gray-400 uppercase">DLOM Applied</span>
                <div className="text-xl font-bold text-amber-400 mt-1">-{val409aResult.dlomApplied}%</div>
              </div>
              <div className="bg-blue-600/20 p-4 rounded-xl border border-blue-500/30">
                <span className="text-xs text-blue-300 uppercase font-semibold">Statutory 409A FMV</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">${val409aResult.final409AFairMarketValue.toFixed(4)}</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white text-sm">AICPA Valuation Methodology Notes:</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                {val409aResult.methodologyNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-gray-800/30 p-2.5 rounded-lg border border-gray-800">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SECTION 83(b) VAULT */}
      {activeTab === 'section83b' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Clock className="text-amber-400 w-5 h-5" />
              Statutory 30-Day Countdown
            </h3>

            <div className={`p-4 rounded-xl border ${sec83bPackage.isExpired ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-5 h-5 ${sec83bPackage.isExpired ? 'text-red-400' : 'text-amber-400'}`} />
                <span className="font-bold text-white text-sm">
                  {sec83bPackage.isExpired ? 'EXPIRED' : `${sec83bPackage.daysRemaining} Days Remaining`}
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-2">
                IRS postmark deadline: <strong>{sec83bPackage.filingDeadline}</strong> (30 days from grant date {sec83bInputs.transferDate}).
              </p>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-400">Taxpayer Name</label>
                <input
                  type="text"
                  value={sec83bInputs.taxpayerName}
                  onChange={(e) => setSec83bInputs({ ...sec83bInputs, taxpayerName: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Shares Count</label>
                <input
                  type="number"
                  value={sec83bInputs.sharesCount}
                  onChange={(e) => setSec83bInputs({ ...sec83bInputs, sharesCount: Number(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Grant Date</label>
                <input
                  type="date"
                  value={sec83bInputs.transferDate}
                  onChange={(e) => setSec83bInputs({ ...sec83bInputs, transferDate: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white text-sm"
                />
              </div>
            </div>

            <button
              onClick={download83bPackage}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
            >
              <Download className="w-4 h-4" />
              Export Signed IRS Packet
            </button>
          </div>

          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <FileText className="text-blue-400 w-5 h-5" />
              Generated IRS Section 83(b) Election Document
            </h3>
            <pre className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-xs text-gray-300 font-mono overflow-y-auto max-h-96 whitespace-pre-wrap">
              {sec83bPackage.electionLetterText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
