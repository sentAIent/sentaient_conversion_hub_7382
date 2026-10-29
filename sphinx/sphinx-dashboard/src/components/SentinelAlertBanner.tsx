"use client";
import React, { useEffect, useState } from 'react';
import { tacticalSentinel, SentinelAlert } from '../lib/sentinel/TacticalSentinelService';
import { Volume2, VolumeX, ShieldAlert, X, Eye, Navigation, AlertTriangle } from 'lucide-react';

interface SentinelAlertBannerProps {
  onJumpTo?: (lat: number, lon: number, zoom?: number) => void;
}

export const SentinelAlertBanner: React.FC<SentinelAlertBannerProps> = ({ onJumpTo }) => {
  const [alerts, setAlerts] = useState<SentinelAlert[]>([]);
  const [isMuted, setIsMuted] = useState(tacticalSentinel.getMuted());

  useEffect(() => {
    const unsubscribe = tacticalSentinel.subscribe((newAlerts) => {
      setAlerts(newAlerts);
    });
    return unsubscribe;
  }, []);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    tacticalSentinel.setMuted(nextMuted);
  };

  if (alerts.length === 0) return null;

  const currentAlert = alerts[0];

  const getThreatIcon = (type: SentinelAlert['type']) => {
    switch (type) {
      case 'alpr_camera':
        return '📸';
      case 'crime_hotspot':
        return '🚨';
      case 'wildfire_vector':
        return '🔥';
      case 'aircraft_loiter':
        return '🛸';
      default:
        return '⚠️';
    }
  };

  const getSeverityBg = (severity: SentinelAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-950/95 border-red-500 text-red-200 shadow-[0_0_25px_rgba(239,68,68,0.7)]';
      case 'high':
        return 'bg-amber-950/95 border-amber-500 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.6)]';
      case 'medium':
        return 'bg-cyan-950/95 border-cyan-500 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.5)]';
      default:
        return 'bg-slate-900/95 border-slate-700 text-slate-200';
    }
  };

  return (
    <div 
      data-testid="sentinel-alert-banner"
      className="fixed top-20 sm:top-5 left-1/2 -translate-x-1/2 z-50 max-w-[92vw] sm:max-w-xl w-full pointer-events-auto transition-all animate-in fade-in slide-in-from-top-4 duration-200"
    >
      <div className={`p-3 sm:p-3.5 rounded-xl border backdrop-blur-xl flex items-center justify-between gap-3 ${getSeverityBg(currentAlert.severity)}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0 text-lg shadow-inner">
            <span>{getThreatIcon(currentAlert.type)}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-widest font-black uppercase px-1.5 py-0.2 rounded bg-black/60 border border-white/10">
                SENTINEL ADVISORY
              </span>
              <span className="font-mono text-xs font-bold text-white tracking-wide">
                {Math.round(currentAlert.distanceMeters)}m
              </span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-white truncate font-mono">
              {currentAlert.title}
            </h4>
            <p className="text-[11px] opacity-80 truncate font-mono">
              {currentAlert.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {currentAlert.targetCoords && onJumpTo && (
            <button
              type="button"
              data-testid="btn-sentinel-evade"
              onClick={() => {
                onJumpTo(currentAlert.targetCoords!.lat, currentAlert.targetCoords!.lng, 15);
              }}
              className="px-2 py-1 bg-black/50 hover:bg-black/80 text-white rounded text-[11px] font-mono font-bold border border-white/20 transition-all flex items-center gap-1"
              title="Center on threat location"
            >
              <Eye size={12} />
              <span className="hidden sm:inline">VIEW</span>
            </button>
          )}

          <button
            type="button"
            data-testid="btn-sentinel-mute"
            onClick={toggleMute}
            className={`p-1.5 rounded border transition-colors ${
              isMuted 
                ? 'bg-red-900/40 border-red-700/60 text-red-300' 
                : 'bg-black/40 border-white/10 text-gray-300 hover:text-white'
            }`}
            title={isMuted ? 'Unmute Audio Sentinel' : 'Mute Audio Sentinel'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            type="button"
            data-testid="btn-sentinel-dismiss"
            onClick={() => tacticalSentinel.clearAlert(currentAlert.id)}
            className="p-1.5 rounded hover:bg-black/40 text-gray-400 hover:text-white transition-colors"
            title="Dismiss advisory"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
