"use client";
import React, { useState } from 'react';
import { Shield, MapPin, Eye, Camera, AlertTriangle, Droplets, CheckCircle2, X, Send } from 'lucide-react';
import { offlineMesh } from '../lib/mesh/OfflineMeshService';
import { tacticalSentinel } from '../lib/sentinel/TacticalSentinelService';

export interface CitizenReport {
  id: string;
  type: 'camera' | 'checkpoint' | 'hazard' | 'resource' | 'perimeter';
  title: string;
  lat: number;
  lon: number;
  azimuth?: number;
  description: string;
  verifiedCount: number;
  confidenceScore: number;
  timestamp: string;
}

interface CitizenReconModalProps {
  isOpen: boolean;
  currentCoords: { lat: number; lon: number };
  onClose: () => void;
  onSubmitReport: (report: CitizenReport) => void;
}

export const CitizenReconModal: React.FC<CitizenReconModalProps> = ({
  isOpen,
  currentCoords,
  onClose,
  onSubmitReport
}) => {
  const [reportType, setReportType] = useState<CitizenReport['type']>('camera');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [azimuth, setAzimuth] = useState<number>(45);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newReport: CitizenReport = {
      id: 'recon-' + Date.now().toString(36),
      type: reportType,
      title: title.trim() || `${reportType.toUpperCase()} Field Observation`,
      lat: currentCoords.lat,
      lon: currentCoords.lon,
      azimuth: reportType === 'camera' ? azimuth : undefined,
      description: description.trim() || 'Observed by Sentinel in field.',
      verifiedCount: 1,
      confidenceScore: 92,
      timestamp: new Date().toISOString()
    };

    // Broadcast across offline mesh
    offlineMesh.broadcastThreat(newReport);
    tacticalSentinel.playTacticalSound('caution');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSubmitReport(newReport);

      setTimeout(() => {
        setSubmitted(false);
        setTitle('');
        setDescription('');
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div 
      data-testid="citizen-recon-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div 
        className="w-full max-w-md bg-black border border-cyan-800/80 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col font-mono text-xs text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border-b border-cyan-900/60 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-base">🌐</span>
            <div>
              <h3 className="font-bold text-sm tracking-wider text-cyan-300">CITIZEN RECON INTEL</h3>
              <p className="text-[10px] text-gray-400">Cryptographically signed decentralized field reporting</p>
            </div>
          </div>
          <button 
            type="button"
            data-testid="btn-close-recon"
            onClick={onClose}
            className="p-1 rounded text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-2 animate-in zoom-in duration-150">
            <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
            <h4 className="font-bold text-sm text-white">FIELD REPORT BROADCAST</h4>
            <p className="text-gray-400 text-[11px]">
              Intel distributed to peer mesh sentinels and plotted to tactical map.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Category Selector */}
            <div>
              <label className="block text-gray-400 mb-1.5 uppercase font-bold text-[10px]">Observation Category</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'camera', label: '📸 Camera / ALPR', icon: Camera },
                  { id: 'checkpoint', label: '🛑 Roadblock / Stop', icon: AlertTriangle },
                  { id: 'hazard', label: '⚠️ Road Hazard', icon: AlertTriangle },
                  { id: 'resource', label: '💧 Water / Cache', icon: Droplets }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setReportType(item.id as any)}
                    className={`py-2 px-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                      reportType === item.id 
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                        : 'bg-slate-950 border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Coordinates */}
            <div className="p-2 bg-slate-950 rounded-lg border border-gray-800 flex justify-between items-center text-[11px]">
              <span className="text-gray-400 flex items-center gap-1">
                <MapPin size={12} className="text-cyan-400" />
                GEO COORDINATES:
              </span>
              <span className="text-cyan-300 font-bold font-mono">
                {currentCoords.lat.toFixed(4)}, {currentCoords.lon.toFixed(4)}
              </span>
            </div>

            {reportType === 'camera' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-gray-400 uppercase font-bold text-[10px]">Lens Azimuth (Bearing)</label>
                  <span className="text-cyan-400 font-bold">{azimuth}°</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="360"
                  value={azimuth}
                  onChange={e => setAzimuth(parseInt(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-400 mb-1 uppercase font-bold text-[10px]">Observation Summary</label>
              <input
                type="text"
                placeholder="e.g. New Flock Falcon ALPR mounted on traffic pole"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-gray-700 rounded-lg text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyan-400 text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1 uppercase font-bold text-[10px]">Field Notes & Details</label>
              <textarea
                placeholder="Mount height, solar panel orientation, camera vendor ID..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-gray-700 rounded-lg text-white font-mono placeholder:text-gray-600 focus:outline-none focus:border-cyan-400 text-xs min-h-[60px]"
              />
            </div>

            <button
              type="submit"
              data-testid="btn-submit-recon-report"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black flex items-center justify-center gap-1.5 transition-all text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
            >
              <Send size={13} />
              <span>{isSubmitting ? 'SIGNING & BROADCASTING...' : 'DISPATCH CITIZEN REPORT'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
