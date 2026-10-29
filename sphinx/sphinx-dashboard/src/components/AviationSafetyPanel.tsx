import React, { useState } from 'react';
import { Plane, AlertTriangle, ShieldCheck, X, Calendar, Activity, Info, ExternalLink, ArrowRight } from 'lucide-react';
import {
  AVIATION_DAY_STATS,
  AVIATION_PHASE_STATS,
  getAviationStatsSummary,
  PROFESSIONAL_HIRED_STATS,
  getProfessionalAviationSummary
} from '../lib/intelligence/aviationData';

interface AviationSafetyPanelProps {
  aircraftCount: number;
  onClose: () => void;
  onOpenAI?: (query: string) => void;
  onToggleAircraftLayer?: () => void;
  isAircraftLayerActive?: boolean;
}

export const AviationSafetyPanel: React.FC<AviationSafetyPanelProps> = ({
  aircraftCount,
  onClose,
  onOpenAI,
  onToggleAircraftLayer,
  isAircraftLayerActive = false
}) => {
  const [filterMode, setFilterMode] = useState<'hired' | 'all'>('hired');
  const [activeTab, setActiveTab] = useState<'days' | 'phases' | 'regulations' | 'mitigations'>('days');

  const allSummary = getAviationStatsSummary();
  const hiredSummary = getProfessionalAviationSummary();

  return (
    <div className="fixed inset-0 sm:inset-auto sm:top-14 sm:right-6 sm:bottom-6 sm:w-[580px] sm:max-w-[calc(100vw-1.5rem)] sm:max-h-[calc(100vh-5rem)] z-50 flex flex-col bg-slate-950/95 border border-sky-800/80 rounded-none sm:rounded-2xl shadow-[0_15px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl font-mono text-white overflow-hidden animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-sky-950/80 via-black to-slate-950/80 border-b border-sky-900/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-500/80 flex items-center justify-center shadow-[0_0_12px_rgba(14,165,233,0.5)]">
            <Plane size={18} className="text-sky-400" />
          </div>
          <div>
            <div className="text-sky-300 font-bold text-sm tracking-wider flex items-center gap-2">
              AVIATION SAFETY & RISK INTEL
              <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
            </div>
            <div className="text-[10px] text-gray-400 flex items-center gap-2">
              <span>NTSB / FAA Empirical Dataset</span>
              <span>•</span>
              <span className="text-sky-400 font-semibold">{aircraftCount} ADS-B Targets Live</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          title="Close Panel"
        >
          <X size={18} />
        </button>
      </div>

      {/* Cohort Selector (Hired vs All) */}
      <div className="p-3 bg-black/60 border-b border-sky-900/40 shrink-0">
        <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 flex items-center justify-between">
          <span>Flight Operations Cohort Filter</span>
          <span className="text-[9px] text-amber-400 font-semibold">Inverts Weekend Curve</span>
        </div>
        <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-1 rounded-xl border border-sky-900/40">
          <button
            type="button"
            onClick={() => setFilterMode('hired')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-0.5 ${
              filterMode === 'hired'
                ? 'bg-sky-500 text-black shadow-[0_0_15px_rgba(14,165,233,0.6)] font-extrabold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span>🛡️</span>
              <span>Professional Hired Crews</span>
            </div>
            <span className="text-[9px] opacity-80 font-normal">Part 121 Airlines & Part 135 Charters</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-0.5 ${
              filterMode === 'all'
                ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.6)] font-extrabold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span>✈️</span>
              <span>All Aviation Combined</span>
            </div>
            <span className="text-[9px] opacity-80 font-normal">Includes Amateur GA & Student Solo</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 px-3 pt-2 bg-slate-950 border-b border-gray-800 text-xs shrink-0 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('days')}
          className={`px-3 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'days'
              ? 'border-sky-400 text-sky-300 font-bold'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          📅 Day-of-Week Risk
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('phases')}
          className={`px-3 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'phases'
              ? 'border-sky-400 text-sky-300 font-bold'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          🛫 Flight Phase Hazards
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('regulations')}
          className={`px-3 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'regulations'
              ? 'border-sky-400 text-sky-300 font-bold'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          📜 121 vs 135 vs 91
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('mitigations')}
          className={`px-3 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
            activeTab === 'mitigations'
              ? 'border-sky-400 text-sky-300 font-bold'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          🛡️ Tactical Mitigations
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {activeTab === 'days' && (
          <div className="space-y-4">
            {/* Cohort Insight Banner */}
            {filterMode === 'hired' ? (
              <div className="p-3 bg-sky-950/40 border border-sky-800/60 rounded-xl space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-wider">
                  <Activity size={14} className="text-sky-400" />
                  <span>The "Weekend Inversion" Reality</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-[11px]">
                  For professional hired pilots, <strong className="text-sky-300">Saturday is the SAFEST day (9.7% of incidents)</strong> because corporate business jet movements decrease by 42%. The hazard peak concentrates on <strong className="text-amber-400">Friday (18.2%)</strong> and <strong className="text-amber-400">Thursday (16.8%)</strong> driven by executive weekend getaway charter deadlines, dusk mountain landings, and late-night Part 91 ferry repositioning legs.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle size={14} className="text-amber-400" />
                  <span>The Weekend Hazard Gap (48.1% of All Accidents)</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-[11px]">
                  When including personal recreation (amateur Part 91 GA), <strong className="text-red-400">Saturday peaks at 17.5%</strong> and Sunday at 15.2%. Nearly 90% of weekend crashes involve non-commercial private pilots facing proficiency decay, get-there-itis, and loss-of-control (LOC-I) in single-engine aircraft.
                </p>
              </div>
            )}

            {/* Days Table */}
            <div className="border border-gray-800 rounded-xl overflow-hidden bg-black/60 shadow-inner">
              <div className="px-3 py-2 bg-slate-900 text-gray-300 font-bold text-[10px] uppercase tracking-wider border-b border-gray-800 flex justify-between">
                <span>Day of Week & Share</span>
                <span>Relative Risk Rating</span>
              </div>
              <div className="divide-y divide-gray-900">
                {(filterMode === 'hired' ? PROFESSIONAL_HIRED_STATS : AVIATION_DAY_STATS).map((d: any) => {
                  const isHired = filterMode === 'hired';
                  const pct = isHired ? d.sharePct : d.percentage;
                  const isPeak = (isHired && d.day === 'Friday') || (!isHired && d.day === 'Saturday');
                  const isSafe = (isHired && d.day === 'Saturday') || (!isHired && d.day === 'Tuesday');

                  return (
                    <div key={d.day} className={`p-3 transition-colors ${isPeak ? 'bg-red-950/20' : isSafe ? 'bg-emerald-950/20' : 'hover:bg-slate-900/40'}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${isPeak ? 'text-red-400' : isSafe ? 'text-emerald-400' : 'text-gray-200'}`}>
                            {d.day}
                          </span>
                          <span className="text-[11px] font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded">
                            {pct}%
                          </span>
                          {isPeak && <span className="text-[9px] bg-red-600/80 text-white font-bold px-1.5 py-0.5 rounded">PEAK</span>}
                          {isSafe && <span className="text-[9px] bg-emerald-600/80 text-white font-bold px-1.5 py-0.5 rounded">SAFEST</span>}
                        </div>
                        <span className={`text-[11px] font-mono font-bold ${isPeak ? 'text-red-400' : isSafe ? 'text-emerald-400' : 'text-gray-400'}`}>
                          {isHired ? d.riskRating : `${d.incidents.toLocaleString()} Events`}
                        </span>
                      </div>

                      {/* Bar indicator */}
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-1.5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isPeak ? 'bg-gradient-to-r from-red-500 to-amber-500' : isSafe ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-sky-500'
                          }`}
                          style={{ width: `${(pct / 20) * 100}%` }}
                        />
                      </div>

                      <p className="text-[10px] text-gray-400 leading-snug">
                        {isHired ? d.contributingFactors : d.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'phases' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900 border border-gray-800 rounded-xl space-y-1">
              <span className="font-bold text-sky-400 text-xs">Accident Distribution by Flight Phase</span>
              <p className="text-gray-400 text-[11px]">
                Over 73% of aviation accidents occur in the critical terminal phases (landing and takeoff) where margin for error is minimal.
              </p>
            </div>

            <div className="space-y-2.5">
              {AVIATION_PHASE_STATS.map((phase) => (
                <div key={phase.phase} className="p-3 bg-black/60 border border-gray-800 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-xs">{phase.phase}</span>
                    <span className="text-sky-400 font-bold">{phase.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full"
                      style={{ width: `${(phase.percentage / 60) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-400">{phase.description}</p>
                </div>
              ))}
            </div>

            {/* Comparison of Primary Causes */}
            <div className="p-3 bg-slate-900/80 border border-gray-800 rounded-xl space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-cyan-300">Primary Incident Breakdown (Hired vs Amateur)</span>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 bg-black/50 border border-sky-900/40 rounded-lg space-y-1">
                  <span className="font-bold text-sky-400">🛡️ Hired Commercial Crews:</span>
                  <ul className="text-gray-300 space-y-0.5 list-disc pl-3">
                    <li>Runway Excursions (44%)</li>
                    <li>Severe CAT Turbulence (24%)</li>
                    <li>Mountain Weather / CFIT (18%)</li>
                    <li>Ramp / Towing Collisions (14%)</li>
                  </ul>
                </div>
                <div className="p-2 bg-black/50 border border-amber-900/40 rounded-lg space-y-1">
                  <span className="font-bold text-amber-400">✈️ Amateur General Aviation:</span>
                  <ul className="text-gray-300 space-y-0.5 list-disc pl-3">
                    <li>Loss of Control LOC-I (38.5%)</li>
                    <li>CFIT / Cloud Entry (18.2%)</li>
                    <li>Engine Failure on Climb (12%)</li>
                    <li>Fuel Starvation (8%)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'regulations' && (
          <div className="space-y-3">
            <div className="p-3 bg-slate-900 border border-gray-800 rounded-xl space-y-1">
              <span className="font-bold text-cyan-300 text-xs">FAA Regulatory Safety Tiers</span>
              <p className="text-gray-400 text-[11px]">
                Accident probability scales directly with regulatory oversight, dual-pilot crew mandates, and recurrent simulator qualification.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-1">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-emerald-300">Part 121 Scheduled Major Airlines</span>
                  <span className="text-emerald-400 font-mono">0.00 - 0.01 / 100k hrs</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Two ATP-rated pilots, mandatory Part 117 rest limits, flight dispatchers, FAA Safety Management Systems (SMS). Over 16 million flights annually with virtually zero US fatal hull losses in over a decade.
                </p>
              </div>

              <div className="p-3 bg-sky-950/30 border border-sky-800/60 rounded-xl space-y-1">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-sky-300">Part 135 & 91K On-Demand Private Charters</span>
                  <span className="text-sky-400 font-mono">~1.3 / 100k hrs</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Executive business jet flights (NetJets, VistaJet, corporate jets). High training standards; 6x safer than amateur GA. Vulnerabilities include quick turnarounds, short runway hydroplaning, and night resort arrivals.
                </p>
              </div>

              <div className="p-3 bg-red-950/30 border border-red-800/60 rounded-xl space-y-1">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-red-300">Part 91 Personal / Recreational Flying</span>
                  <span className="text-red-400 font-mono">~6.8 / 100k hrs</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Single-engine piston aircraft operated by private owners. Lack of recurrent simulator training, single-pilot workload, and recreational weather decision-making contribute to over 85% of total fatal accidents.
                </p>
              </div>
            </div>

            {/* The Part 91 Ferry Trap Alert */}
            <div className="p-3 bg-amber-950/50 border border-amber-600/70 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                <AlertTriangle size={14} className="text-amber-400" />
                <span>The "Part 91 Ferry Trap" in Corporate Aviation</span>
              </div>
              <p className="text-[10px] text-amber-100 leading-snug">
                Charter jets frequently fly revenue passengers under strict Part 135 rules, then legally switch to Part 91 when flying empty repositioning legs back home. Under Part 91, duty time maximums do not apply, creating elevated fatigue risk during late-night Friday return flights.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'mitigations' && (
          <div className="space-y-3">
            <div className="p-3 bg-slate-900 border border-gray-800 rounded-xl space-y-1">
              <span className="font-bold text-emerald-400 text-xs">Tactical Operational Risk Mitigations</span>
              <p className="text-gray-400 text-[11px]">
                Protocols recommended by NTSB and NBAA safety boards to counter the peak Friday and mountain arrival hazard vectors.
              </p>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 bg-black/60 border border-gray-800 rounded-lg flex items-start gap-2">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">TALPA Runway Assessment:</strong>
                  <p className="text-gray-400 text-[10px]">Mandate Takeoff and Landing Performance Assessment runway condition code checks prior to top-of-descent on runways under 6,000 ft.</p>
                </div>
              </div>

              <div className="p-2.5 bg-black/60 border border-gray-800 rounded-lg flex items-start gap-2">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Sterile Cockpit on Mountain Arrivals:</strong>
                  <p className="text-gray-400 text-[10px]">Zero non-operational conversation below 10,000 ft; verify minimum sector altitudes (MSA) and go-around terrain escape routes on night arrivals into non-towered mountain valleys.</p>
                </div>
              </div>

              <div className="p-2.5 bg-black/60 border border-gray-800 rounded-lg flex items-start gap-2">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Fatigue Management on Ferry Legs:</strong>
                  <p className="text-gray-400 text-[10px]">Voluntarily apply Part 117/135 rest standards even when operating under Part 91 empty ferry legs.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Dispatch Bar */}
      <div className="p-3 bg-black/80 border-t border-sky-900/60 flex items-center justify-between gap-2 shrink-0">
        {onToggleAircraftLayer && (
          <button
            type="button"
            onClick={onToggleAircraftLayer}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${
              isAircraftLayerActive
                ? 'bg-sky-500 text-black border-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.5)]'
                : 'bg-slate-900 text-gray-300 border-gray-800 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Plane size={13} />
            <span>{isAircraftLayerActive ? 'Hide ADS-B Aircraft' : 'Show ADS-B Aircraft'}</span>
          </button>
        )}

        {onOpenAI && (
          <button
            type="button"
            data-testid="btn-aviation-ask-ai"
            onClick={() => onOpenAI('Break down airplane crashes by day of the week for commercial and private flights piloted by professional hired pilots.')}
            className="px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/60 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.3)] ml-auto"
          >
            <span>Ask SPHINX AI</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
};
