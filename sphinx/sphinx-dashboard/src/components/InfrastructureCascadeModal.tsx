"use client";
import React, { useState } from 'react';
import { 
  Zap, 
  Droplets, 
  ShieldAlert, 
  Activity, 
  RotateCcw, 
  X, 
  AlertTriangle, 
  Hospital, 
  Radio, 
  Server, 
  Clock, 
  Check, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { 
  STRATEGIC_INFRASTRUCTURE_NODES, 
  OutageCascadeEngine, 
  CascadeSimulationResult, 
  InfrastructureNode 
} from '../lib/intelligence/outageCascadeEngine';

interface InfrastructureCascadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFlyToCoordinates?: (coords: [number, number], zoom?: number) => void;
}

export const InfrastructureCascadeModal: React.FC<InfrastructureCascadeModalProps> = ({
  isOpen,
  onClose,
  onFlyToCoordinates
}) => {
  const [selectedRootId, setSelectedRootId] = useState<string>('sub-los-banos-500kv');
  const [severity, setSeverity] = useState<'minor_derate' | 'substation_trip' | 'black_sky_cascade'>('substation_trip');

  if (!isOpen) return null;

  const simulation: CascadeSimulationResult = OutageCascadeEngine.simulateCascade(selectedRootId, severity);
  const selectedNode = STRATEGIC_INFRASTRUCTURE_NODES.find((n) => n.id === selectedRootId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md font-mono pointer-events-auto">
      <div 
        data-testid="infrastructure-cascade-modal"
        className="bg-neutral-950 border border-cyan-500/80 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.95)]"
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-cyan-950/80 via-black to-neutral-950 border-b border-cyan-800/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Zap size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wider">
                  CRITICAL INFRASTRUCTURE CASCADE SIMULATOR
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-950 text-purple-300 border border-purple-500/60">
                  BLACK-SKY MODEL
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Interdependency Mapping & Multi-Stage Downstream Failure Analysis (Zero Sliders)
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="btn-close-cascade-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 text-xs">
          {/* Controls: Target Node and Failure Severity Selector Chips (Zero Sliders) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Target Substation / Pumping Plant Selector */}
            <div className="bg-neutral-900/80 border border-white/10 rounded-xl p-3 space-y-2">
              <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                Select Initiating Failure Point
              </label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {STRATEGIC_INFRASTRUCTURE_NODES.filter((n) => n.category === 'power_substation' || n.category === 'water_pump').map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    data-testid={`select-node-${node.id}`}
                    onClick={() => setSelectedRootId(node.id)}
                    className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between ${
                      selectedRootId === node.id
                        ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.3)] font-bold'
                        : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{node.category === 'power_substation' ? '⚡' : '💧'}</span>
                      <span className="truncate">{node.name}</span>
                    </div>
                    {selectedRootId === node.id && <Check size={12} className="text-cyan-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Chips (Zero Sliders) */}
            <div className="bg-neutral-900/80 border border-white/10 rounded-xl p-3 space-y-2.5">
              <label className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Disruption Severity Tier (Zero Sliders)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'minor_derate', label: 'Derate (Minor)', desc: 'Partial Capacity Loss' },
                  { id: 'substation_trip', label: 'Trip (Severe)', desc: 'Full Bus Voltage Drop' },
                  { id: 'black_sky_cascade', label: 'Black Sky', desc: 'Catastrophic Collapse' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    data-testid={`severity-${s.id}`}
                    onClick={() => setSeverity(s.id as any)}
                    className={`p-2 rounded-lg text-center border transition-all flex flex-col items-center justify-center gap-0.5 ${
                      severity === s.id
                        ? 'bg-amber-950 border-amber-400 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.4)] font-bold'
                        : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[11px]">{s.label}</span>
                    <span className="text-[8px] opacity-70">{s.desc}</span>
                  </button>
                ))}
              </div>

              {selectedNode && onFlyToCoordinates && (
                <button
                  type="button"
                  data-testid="btn-flyto-infrastructure"
                  onClick={() => onFlyToCoordinates(selectedNode.coordinates, 12)}
                  className="w-full py-2 px-3 rounded-lg bg-cyan-900/40 hover:bg-cyan-900/70 border border-cyan-500/50 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Fly to Initiating Infrastructure</span>
                  <ChevronRight size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Impact Metric Scorecard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-3 space-y-0.5">
              <div className="text-red-400 text-[10px] font-bold uppercase flex items-center gap-1">
                <Zap size={11} /> Power Outages
              </div>
              <div className="text-white font-bold text-lg">
                {simulation.customersWithoutPowerEst.toLocaleString()}
              </div>
              <div className="text-[9px] text-gray-400">Estimated meter disconnects</div>
            </div>

            <div className="bg-cyan-950/40 border border-cyan-500/40 rounded-xl p-3 space-y-0.5">
              <div className="text-cyan-400 text-[10px] font-bold uppercase flex items-center gap-1">
                <Droplets size={11} /> Water Pumps Down
              </div>
              <div className="text-white font-bold text-lg">
                {simulation.waterPumpsDown} Stations
              </div>
              <div className="text-[9px] text-gray-400">Aqueduct lift stations tripped</div>
            </div>

            <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3 space-y-0.5">
              <div className="text-amber-400 text-[10px] font-bold uppercase flex items-center gap-1">
                <Hospital size={11} /> Hospitals on Gen
              </div>
              <div className="text-white font-bold text-lg">
                {simulation.hospitalsOnGenerators} Medical Centers
              </div>
              <div className="text-[9px] text-gray-400">Diesel generator fuel countdown</div>
            </div>

            <div className="bg-purple-950/40 border border-purple-500/40 rounded-xl p-3 space-y-0.5">
              <div className="text-purple-400 text-[10px] font-bold uppercase flex items-center gap-1">
                <Server size={11} /> Telco Degradation
              </div>
              <div className="text-white font-bold text-lg">
                +{simulation.telecomDegradationPct}%
              </div>
              <div className="text-[9px] text-gray-400">Backhaul packet latency spike</div>
            </div>
          </div>

          {/* Sequential Downstream Failure Stages */}
          <div className="bg-black/60 border border-cyan-900/60 rounded-xl p-4 space-y-3">
            <h3 className="font-bold text-cyan-300 text-xs flex items-center gap-2">
              <Activity size={14} className="text-cyan-400" />
              <span>TIMELINE OF DOWNSTREAM CASCADE PROPAGATION</span>
            </h3>

            <div className="space-y-2">
              {simulation.cascadeStages.map((stg, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-neutral-900/90 border border-white/5 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500 text-cyan-300 font-bold text-[10px] shrink-0 mt-0.5">
                      Stage {stg.stageNumber}
                    </span>
                    <div>
                      <div className="font-bold text-white text-xs">{stg.affectedNodeName}</div>
                      <div className="text-[11px] text-gray-300 mt-0.5">{stg.impactDescription}</div>
                    </div>
                  </div>

                  <span className="text-[10px] text-amber-400 font-bold shrink-0 mt-0.5">
                    +{stg.delayMinutes} min
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-neutral-900 border-t border-white/10 flex items-center justify-between shrink-0">
          <div className="text-[10px] text-gray-400">
            Nodal dependency graph: {STRATEGIC_INFRASTRUCTURE_NODES.length} registered strategic nodes
          </div>
          <button
            type="button"
            data-testid="btn-reset-simulation"
            onClick={() => {
              setSelectedRootId('sub-los-banos-500kv');
              setSeverity('substation_trip');
            }}
            className="py-1 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white flex items-center gap-1.5 text-xs transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset Simulation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
