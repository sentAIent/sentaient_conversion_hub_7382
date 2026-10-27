"use client";
import React, { useState } from 'react';
import { Shield, Zap, Crown, Check, X, Sparkles, Navigation, Flame, Eye, Lock, ArrowRight } from 'lucide-react';
import { UserTier, TIER_CONFIG, UserSettings } from '../lib/useSettings';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';

interface TierUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: UserTier;
  onSelectTier: (tier: UserTier) => void;
  featureTrigger?: string | null;
}

export const TierUpgradeModal: React.FC<TierUpgradeModalProps> = ({
  isOpen,
  onClose,
  currentTier = 'free',
  onSelectTier,
  featureTrigger
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'sovereign'>('pro');
  const [checkoutTier, setCheckoutTier] = useState<'pro' | 'sovereign' | null>(null);

  if (!isOpen) return null;

  const getTriggerNotice = () => {
    switch (featureTrigger) {
      case 'stealth_routing':
        return {
          title: 'Stealth / Anti-ALPR Routing is a Pro Capability',
          desc: 'Evade automated license plate recognition corridors and camera sightline cones with calculated privacy detours.'
        };
      case 'crime_heatmap':
        return {
          title: 'Crime Density Heatmaps are a Pro Capability',
          desc: 'Unlock continuous GPU thermal density gradients across urban corridors to spot high-risk zones instantly.'
        };
      case 'satellite_map':
        return {
          title: 'True-Color Satellite Imagery is a Pro Capability',
          desc: 'Access global high-resolution satellite imagery with sub-meter clarity alongside cartographic vector layers.'
        };
      case 'live_flight_hazards':
        return {
          title: 'Real-Time Flight Phase Risk is a Pro Capability',
          desc: 'Monitor empirical hazard windows (Approach & Landing 53.4% critical margin) on live airborne targets.'
        };
      case 'deep_ai_research':
        return {
          title: 'Deep Multi-Source AI Research is a Pro Capability',
          desc: 'Perform exhaustive NTSB, FBI UCR, and geospatial synthesis queries with verified regulatory citations.'
        };
      case 'offline_downloader':
        return {
          title: 'Offline Map Packs are a Sovereign Sentinel Capability',
          desc: 'Download and cache local vector tiles for zero-network grid survival and field deployment.'
        };
      default:
        return null;
    }
  };

  const notice = getTriggerNotice();

  const handleUpgradeSim = (tier: UserTier) => {
    onSelectTier(tier);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-slate-950 border border-cyan-800/80 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden font-mono text-white relative"
        data-testid="tier-upgrade-modal"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-cyan-950/80 via-black to-purple-950/80 border-b border-cyan-900/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/80 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Shield className="text-cyan-400" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wider">
                  SPHINX TIER ENTITLEMENTS
                </h2>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${TIER_CONFIG[currentTier]?.bg || 'bg-slate-800 text-gray-300'}`}>
                  {TIER_CONFIG[currentTier]?.label || 'FREE'} ACTIVE
                </span>
              </div>
              <p className="text-xs text-gray-400">Tactical geospatial autonomy, privacy navigation, and operational risk intelligence.</p>
            </div>
          </div>
          <button 
            type="button"
            data-testid="btn-close-tier-modal"
            onClick={onClose} 
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center border border-gray-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Contextual Notice */}
        {notice && (
          <div className="px-6 py-2.5 bg-cyan-950/40 border-b border-cyan-800/40 flex items-center gap-2.5 text-xs text-cyan-300">
            <Sparkles size={16} className="text-cyan-400 shrink-0" />
            <div>
              <strong className="text-white">{notice.title}:</strong> {notice.desc}
            </div>
          </div>
        )}

        {/* Scrollable Comparison Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick Simulator Switcher for Dev / Testing */}
          <div className="p-3 bg-black/60 border border-cyan-900/50 rounded-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Zap size={15} className="text-amber-400" />
              <span className="text-xs font-bold text-gray-200">LIVE TIER SIMULATOR:</span>
              <span className="text-[11px] text-gray-400 hidden sm:inline">Instantly test the free vs pro experience:</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                data-testid="sim-tier-free"
                onClick={() => handleUpgradeSim('free')}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  currentTier === 'free'
                    ? 'bg-slate-800 text-white border-slate-500 shadow-[0_0_8px_white]'
                    : 'bg-black text-gray-400 border-gray-800 hover:text-white'
                }`}
              >
                Free
              </button>
              <button
                type="button"
                data-testid="sim-tier-pro"
                onClick={() => handleUpgradeSim('pro')}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  currentTier === 'pro'
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]'
                    : 'bg-black text-cyan-400 border-cyan-900 hover:border-cyan-600'
                }`}
              >
                Pro Tactical
              </button>
              <button
                type="button"
                data-testid="sim-tier-sovereign"
                onClick={() => handleUpgradeSim('sovereign')}
                className={`px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                  currentTier === 'sovereign'
                    ? 'bg-purple-950 text-purple-300 border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                    : 'bg-black text-purple-400 border-purple-900 hover:border-purple-600'
                }`}
              >
                Sovereign Sentinel
              </button>
            </div>
          </div>

          {/* Pricing Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Free Tier */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
              currentTier === 'free' 
                ? 'bg-slate-900/90 border-slate-600 shadow-[0_0_20px_rgba(148,163,184,0.15)] ring-1 ring-slate-500' 
                : 'bg-black/60 border-gray-800 hover:border-gray-700'
            }`}>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-white">FREE CITIZEN</h3>
                  {currentTier === 'free' && (
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">CURRENT</span>
                  )}
                </div>
                <div className="text-2xl font-black text-white mb-1">$0 <span className="text-xs text-gray-500 font-normal">/ forever</span></div>
                <p className="text-xs text-gray-400 mb-4">Complete situational awareness with unrestricted personal tactical mapping.</p>

                <ul className="space-y-2 text-xs text-gray-300 border-t border-gray-800 pt-3">
                  <li className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Check size={14} className="shrink-0" />
                    <span>UNLIMITED custom map pins & notes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>Continental Wildfire & Quake feeds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>Public power, water springs & towers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>Standard SPHINX AI (5 queries/day)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>Standard Day-of-Week crash overview</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-500">
                    <X size={14} className="shrink-0" />
                    <span>Stealth Anti-ALPR routing</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-500">
                    <X size={14} className="shrink-0" />
                    <span>Crime density heatmaps</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-500">
                    <X size={14} className="shrink-0" />
                    <span>Live flight phase hazard badges</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleUpgradeSim('free')}
                disabled={currentTier === 'free'}
                className="mt-5 w-full py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all border border-slate-700"
              >
                {currentTier === 'free' ? 'Active Plan' : 'Select Free'}
              </button>
            </div>

            {/* Pro Tactical */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between relative transition-all ${
              currentTier === 'pro'
                ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                : 'bg-cyan-950/30 border-cyan-800/80 hover:border-cyan-500'
            }`}>
              <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider shadow-md">
                RECOMMENDED
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-cyan-300 flex items-center gap-1.5">
                    <Zap size={16} className="text-cyan-400" />
                    PRO TACTICAL
                  </h3>
                  {currentTier === 'pro' && (
                    <span className="text-[10px] bg-cyan-900 text-cyan-300 px-2 py-0.5 rounded font-bold border border-cyan-700">CURRENT</span>
                  )}
                </div>
                <div className="text-2xl font-black text-white mb-1">$29 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
                <p className="text-xs text-gray-300 mb-4">Tactical stealth routing, live flight hazards, and ALPR directional cones.</p>

                <ul className="space-y-2 text-xs text-gray-200 border-t border-cyan-900/60 pt-3">
                  <li className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Check size={14} className="shrink-0" />
                    <span>Everything in Free (UNLIMITED pins)</span>
                  </li>
                  <li className="flex items-center gap-2 text-cyan-300 font-semibold">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>🥷 Stealth / Anti-ALPR Camera Avoidance</span>
                  </li>
                  <li className="flex items-center gap-2 text-cyan-300 font-semibold">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>📸 Flock & Axon ALPR Sightline FOV Cones</span>
                  </li>
                  <li className="flex items-center gap-2 text-cyan-300 font-semibold">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>🛫 Live Flight Phase Hazard Badges (53.4%)</span>
                  </li>
                  <li className="flex items-center gap-2 text-cyan-300 font-semibold">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>🔥 GPU Crime Density Heatmaps</span>
                  </li>
                  <li className="flex items-center gap-2 text-cyan-300 font-semibold">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>🛰️ High-Resolution True-Color Satellite</span>
                  </li>
                  <li className="flex items-center gap-2 text-cyan-300">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>🧠 Unlimited SPHINX AI + Deep Research</span>
                  </li>
                  <li className="flex items-center gap-2 text-cyan-300">
                    <Check size={14} className="text-cyan-400 shrink-0" />
                    <span>🌪️ Multi-Horizon Weather & Wind HUD</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                data-testid="btn-activate-pro"
                onClick={() => setCheckoutTier('pro')}
                className={`mt-5 w-full py-2.5 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                  currentTier === 'pro'
                    ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                }`}
              >
                <span>{currentTier === 'pro' ? 'Active Plan' : 'Activate Pro Tactical'}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Sovereign Sentinel */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
              currentTier === 'sovereign'
                ? 'bg-purple-950/80 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.3)] ring-1 ring-purple-400'
                : 'bg-purple-950/30 border-purple-900/60 hover:border-purple-600'
            }`}>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-purple-300 flex items-center gap-1.5">
                    <Crown size={16} className="text-purple-400" />
                    SOVEREIGN SENTINEL
                  </h3>
                  {currentTier === 'sovereign' && (
                    <span className="text-[10px] bg-purple-900 text-purple-300 px-2 py-0.5 rounded font-bold border border-purple-700">CURRENT</span>
                  )}
                </div>
                <div className="text-2xl font-black text-white mb-1">$99 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
                <p className="text-xs text-gray-300 mb-4">Maximum operational autonomy with grid-down offline deployment.</p>

                <ul className="space-y-2 text-xs text-gray-200 border-t border-purple-900/60 pt-3">
                  <li className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Check size={14} className="shrink-0" />
                    <span>Everything in Pro Tactical</span>
                  </li>
                  <li className="flex items-center gap-2 text-purple-300 font-semibold">
                    <Check size={14} className="text-purple-400 shrink-0" />
                    <span>💾 Offline Tile Pack Downloader</span>
                  </li>
                  <li className="flex items-center gap-2 text-purple-300 font-semibold">
                    <Check size={14} className="text-purple-400 shrink-0" />
                    <span>🌌 3D Celestial Ephemeris Dome</span>
                  </li>
                  <li className="flex items-center gap-2 text-purple-300 font-semibold">
                    <Check size={14} className="text-purple-400 shrink-0" />
                    <span>🎯 Dynamic Standoff Range Rings</span>
                  </li>
                  <li className="flex items-center gap-2 text-purple-300">
                    <Check size={14} className="text-purple-400 shrink-0" />
                    <span>🛸 Tactical Drone RTSP Feeds</span>
                  </li>
                  <li className="flex items-center gap-2 text-purple-300">
                    <Check size={14} className="text-purple-400 shrink-0" />
                    <span>📻 RF Radio & Spectrum Scanner</span>
                  </li>
                  <li className="flex items-center gap-2 text-purple-300">
                    <Check size={14} className="text-purple-400 shrink-0" />
                    <span>🛡️ Base Defense Perimeter Editor</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                data-testid="btn-activate-sovereign"
                onClick={() => setCheckoutTier('sovereign')}
                className={`mt-5 w-full py-2.5 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                  currentTier === 'sovereign'
                    ? 'bg-purple-900/60 text-purple-300 border border-purple-700'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                }`}
              >
                <span>{currentTier === 'sovereign' ? 'Active Plan' : 'Activate Sovereign Sentinel'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-black/80 border-t border-cyan-900/60 flex items-center justify-between text-xs text-gray-400 shrink-0">
          <div>
            🔒 Local Encrypted Vault • Zero Remote Telemetry Leakage
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>

      {checkoutTier && (
        <PaymentCheckoutModal
          isOpen={true}
          tier={checkoutTier}
          onClose={() => setCheckoutTier(null)}
          onSuccess={(newTier) => {
            onSelectTier(newTier);
            setCheckoutTier(null);
            onClose();
          }}
        />
      )}
    </div>
  );
};
