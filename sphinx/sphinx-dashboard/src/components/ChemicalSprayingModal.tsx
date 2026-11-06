"use client";
import React, { useState, useMemo } from 'react';
import { 
  ChemicalSprayingEngine, 
  ChemicalProfile, 
  SprayIncident, 
  EradicationEvaluation, 
  KNOWN_CHEMICAL_PROFILES 
} from '../lib/intelligence/chemicalSprayingEngine';
import { 
  FlaskConical, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  X, 
  PlusCircle, 
  Activity, 
  Sprout, 
  Sun, 
  Droplets, 
  Compass, 
  Search,
  Calendar,
  Layers
} from 'lucide-react';

interface ChemicalSprayingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIncidentId?: string | null;
  currentCenterCoords?: [number, number];
  onSelectIncident?: (incidentId: string) => void;
}

export const ChemicalSprayingModal: React.FC<ChemicalSprayingModalProps> = ({
  isOpen,
  onClose,
  selectedIncidentId,
  currentCenterCoords = [-98.5795, 39.8283],
  onSelectIncident
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'list' | 'report'>('details');
  const [activeIncidentId, setActiveIncidentId] = useState<string>(
    selectedIncidentId || 'spray-ca-central-valley-01'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Report Form State (NO SLIDERS - Pure steppers & preset chips)
  const [reportChemicalId, setReportChemicalId] = useState<string>('glyphosate');
  const [reportLocationName, setReportLocationName] = useState<string>('');
  const [reportCoordinates, setReportCoordinates] = useState<[number, number]>(currentCenterCoords);
  const [reportRadiusMiles, setReportRadiusMiles] = useState<number>(5.0);
  const [reportDosage, setReportDosage] = useState<string>('32 oz / acre');
  const [reportTarget, setReportTarget] = useState<string>('Agricultural Desiccation');
  const [reportAppliedBy, setReportAppliedBy] = useState<string>('Local Aerial Applicator');
  const [reportNotes, setReportNotes] = useState<string>('');
  const [reportCustomName, setReportCustomName] = useState<string>('');
  const [reportCustomCas, setReportCustomCas] = useState<string>('');
  const [reportCustomHalfLife, setReportCustomHalfLife] = useState<number>(60);
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  // Sync with prop when selected from map
  React.useEffect(() => {
    if (selectedIncidentId) {
      setActiveIncidentId(selectedIncidentId);
      setActiveTab('details');
    }
  }, [selectedIncidentId]);

  const allIncidents = useMemo(() => {
    return ChemicalSprayingEngine.getAllIncidents();
  }, [reportSuccess]);

  const activeIncident = useMemo(() => {
    return allIncidents.find(i => i.id === activeIncidentId) || allIncidents[0];
  }, [allIncidents, activeIncidentId]);

  const evaluation: EradicationEvaluation | null = useMemo(() => {
    if (!activeIncident) return null;
    return ChemicalSprayingEngine.evaluateEradication(activeIncident, new Date());
  }, [activeIncident]);

  const filteredIncidents = useMemo(() => {
    if (!searchQuery.trim()) return allIncidents;
    const q = searchQuery.toLowerCase();
    return allIncidents.filter(inc => {
      const chem = ChemicalSprayingEngine.getChemicalProfile(inc.chemicalId);
      return (
        inc.locationName.toLowerCase().includes(q) ||
        chem.name.toLowerCase().includes(q) ||
        chem.commonName.toLowerCase().includes(q) ||
        chem.casNumber.toLowerCase().includes(q)
      );
    });
  }, [allIncidents, searchQuery]);

  if (!isOpen) return null;

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `user-spray-${Date.now()}`;
    const newIncident: SprayIncident = {
      id: newId,
      locationName: reportLocationName.trim() || `Field Parcel near [${reportCoordinates[1].toFixed(3)}, ${reportCoordinates[0].toFixed(3)}]`,
      coordinates: reportCoordinates,
      sprayRadiusMiles: reportRadiusMiles,
      chemicalId: reportChemicalId,
      dosageApplied: reportDosage,
      applicationTimestamp: new Date().toISOString(),
      appliedBy: reportAppliedBy.trim() || 'Citizen Recon Logged',
      targetSpeciesOrCrop: reportTarget.trim() || 'Unspecified Weed/Pest Target',
      notes: reportNotes.trim() || 'Field detected chemical application recorded by user.',
      customChemicalName: reportChemicalId === 'novel_synthetic_generic' ? reportCustomName : undefined,
      customCasNumber: reportChemicalId === 'novel_synthetic_generic' ? reportCustomCas : undefined
    };

    ChemicalSprayingEngine.addSprayIncident(newIncident);
    setReportSuccess(true);
    setActiveIncidentId(newId);
    setTimeout(() => {
      setReportSuccess(false);
      setActiveTab('details');
      if (onSelectIncident) onSelectIncident(newId);
    }, 1200);
  };

  const getDecayBadgeColor = (phase: EradicationEvaluation['decayPhase']) => {
    switch (phase) {
      case 'PURIFIED_BY_EARTH':
        return 'text-emerald-300 bg-emerald-950/90 border-emerald-700/80';
      case 'TRACE_BENCHMARK':
        return 'text-cyan-300 bg-cyan-950/90 border-cyan-700/80';
      case 'PERSISTENT_METABOLITE_PHASE':
        return 'text-amber-300 bg-amber-950/90 border-amber-700/80';
      case 'RESIDUAL_MICROBIAL_DECAY':
        return 'text-orange-300 bg-orange-950/90 border-orange-700/80';
      case 'ACTIVE_TOXIC_SURFACE':
      default:
        return 'text-red-300 bg-red-950/90 border-red-700/80';
    }
  };

  return (
    <div 
      data-testid="chemical-spraying-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md font-mono select-none animate-in fade-in duration-200"
    >
      <div className="w-full max-w-3xl bg-slate-950 border border-emerald-900/80 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden text-white flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 px-5 border-b border-emerald-900/60 bg-gradient-to-r from-emerald-950/90 via-slate-950 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-900/50 border border-emerald-500/60 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <FlaskConical size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wider text-emerald-200">
                  CHEMICAL SPRAYING & NATURAL ERADICATION TRACKER
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-600/60 bg-emerald-950 text-emerald-400">
                  EARTH KINETICS
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Glyphosate, Agro-Toxins, Poisons & Planetary Eradication Countdowns
              </p>
            </div>
          </div>
          <button 
            type="button"
            data-testid="btn-close-chemical-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-800 bg-black/50 px-5 pt-2 gap-2 text-xs">
          <button
            type="button"
            data-testid="tab-chemical-details"
            onClick={() => setActiveTab('details')}
            className={`pb-2.5 px-3 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'details'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Activity size={14} />
            <span>Dossier & Eradication</span>
          </button>
          <button
            type="button"
            data-testid="tab-chemical-list"
            onClick={() => setActiveTab('list')}
            className={`pb-2.5 px-3 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'list'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Layers size={14} />
            <span>Active Sprays ({allIncidents.length})</span>
          </button>
          <button
            type="button"
            data-testid="tab-chemical-report"
            onClick={() => setActiveTab('report')}
            className={`pb-2.5 px-3 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'report'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <PlusCircle size={14} />
            <span>Log New Spray Incident</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-gray-300 flex-1">
          
          {/* TAB 1: DETAILS & NATURAL ERADICATION */}
          {activeTab === 'details' && evaluation && (
            <div className="space-y-5">
              
              {/* Incident Header Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800/80 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{evaluation.incident.locationName}</span>
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Coordinates: {evaluation.incident.coordinates[1].toFixed(4)}°N, {evaluation.incident.coordinates[0].toFixed(4)}°W · Radius: {evaluation.incident.sprayRadiusMiles} mi
                    </p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wide uppercase ${getDecayBadgeColor(evaluation.decayPhase)}`}>
                    {evaluation.decayPhase.replace(/_/g, ' ')}
                  </div>
                </div>

                {/* Primary Chemical Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
                  <div className="bg-black/40 border border-gray-800 p-2.5 rounded-lg">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Chemical Applied</span>
                    <span className="font-bold text-emerald-300 text-xs block truncate" title={evaluation.chemical.commonName}>
                      {evaluation.chemical.commonName}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">CAS: {evaluation.chemical.casNumber}</span>
                  </div>

                  <div className="bg-black/40 border border-gray-800 p-2.5 rounded-lg">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Application Date</span>
                    <span className="font-bold text-white text-xs block">
                      {new Date(evaluation.incident.applicationTimestamp).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {evaluation.daysElapsed} days ({evaluation.hoursElapsed} hrs) ago
                    </span>
                  </div>

                  <div className="bg-black/40 border border-gray-800 p-2.5 rounded-lg">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Target & Vector</span>
                    <span className="font-bold text-white text-xs block truncate" title={evaluation.incident.targetSpeciesOrCrop}>
                      {evaluation.incident.targetSpeciesOrCrop}
                    </span>
                    <span className="text-[10px] text-gray-400">{evaluation.incident.appliedBy}</span>
                  </div>

                  <div className="bg-black/40 border border-gray-800 p-2.5 rounded-lg">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold block">Dosage Volume</span>
                    <span className="font-bold text-amber-300 text-xs block truncate">
                      {evaluation.incident.dosageApplied}
                    </span>
                    <span className="text-[10px] text-gray-400">{evaluation.chemical.epaToxicityClass}</span>
                  </div>
                </div>
              </div>

              {/* NATURAL ERADICATION COUNTDOWN & PROGRESS GAUGE */}
              <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-slate-950 border border-emerald-800/60 rounded-xl p-4.5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/40 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-emerald-400" />
                    <span className="font-bold text-white text-sm">
                      Planetary Natural Eradication Countdown
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400">Estimated Clearance:</span>
                    <span className="font-bold text-emerald-300">
                      {new Date(evaluation.estimatedEradicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Countdown Large Timer */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-black/60 border border-emerald-900/60 p-3.5 rounded-xl">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                      Time Remaining for Complete Natural Breakdown
                    </span>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-300 mt-0.5">
                      {evaluation.daysRemaining > 0 ? (
                        <>
                          <span>{evaluation.daysRemaining}</span>
                          <span className="text-xs text-gray-400 font-normal ml-1 mr-3">days</span>
                          <span className="text-emerald-400">({evaluation.hoursRemaining.toLocaleString()} hrs)</span>
                        </>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-2">
                          <CheckCircle2 size={20} />
                          <span>100% Naturally Eradicated by Earth</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                      Earth Purification Level
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">
                      {evaluation.percentPurifiedByEarth}%
                    </span>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Sprout size={13} />
                      <span>Natural Eradication Progress</span>
                    </span>
                    <span className="text-red-400">
                      Remaining Active Residual: {evaluation.remainingConcentrationPercent}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-black/70 rounded-full border border-gray-800 overflow-hidden flex">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-500 rounded-l-full"
                      style={{ width: `${Math.min(100, evaluation.percentPurifiedByEarth)}%` }}
                    />
                    <div 
                      className="bg-red-500/80 h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, evaluation.remainingConcentrationPercent)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>Application Day 0</span>
                    <span>Soil Half-Life ({evaluation.chemical.soilHalfLifeDays}d)</span>
                    {evaluation.chemical.primaryMetaboliteHalfLifeDays && (
                      <span>Metabolite ({evaluation.chemical.primaryMetaboliteHalfLifeDays}d)</span>
                    )}
                    <span>Complete Clearance ({evaluation.chemical.completeEradicationDays}d)</span>
                  </div>
                </div>

                {/* Current Earth Degradation Action */}
                <div className="bg-emerald-950/40 border border-emerald-900/50 p-3 rounded-lg text-emerald-200">
                  <span className="font-bold text-[11px] block text-emerald-300 mb-1 flex items-center gap-1.5">
                    <Activity size={13} />
                    <span>Current Stage: {evaluation.decayPhase.replace(/_/g, ' ')}</span>
                  </span>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    {evaluation.soilActionSummary}
                  </p>
                </div>
              </div>

              {/* THREE-COLUMN NATURAL SYSTEM METRICS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. Soil Microbial Breakdown */}
                <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-gray-800 pb-1.5">
                    <Sprout size={15} />
                    <span>Soil Microbiome Action</span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    {evaluation.chemical.eradicationMechanism}
                  </p>
                  <div className="text-[10px] text-gray-400 bg-black/40 p-2 rounded border border-gray-800/60">
                    <span className="block font-bold text-gray-300">Soil Half-Life:</span>
                    <span>{evaluation.chemical.soilHalfLifeDays} days (Aerobic microbial)</span>
                  </div>
                </div>

                {/* 2. Solar Photolysis & Water */}
                <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-gray-800 pb-1.5">
                    <Sun size={15} />
                    <span>Photolysis & Water Table</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Aquatic Half-Life:</span>
                      <span className="font-bold text-white">{evaluation.chemical.aquaticHalfLifeDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Atmospheric Half-Life:</span>
                      <span className="font-bold text-white">{evaluation.chemical.atmosphericHalfLifeDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Aquifer Leaching Risk:</span>
                      <span className="font-bold text-amber-400">{evaluation.chemical.waterTableLeachingRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pollinator Hazard:</span>
                      <span className="font-bold text-red-400">{evaluation.chemical.pollinatorToxicity}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Earth Regeneration Remedy */}
                <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-gray-800 pb-1.5">
                    <Droplets size={15} />
                    <span>Regenerative Earth Healing</span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    {evaluation.chemical.earthRegenerationRemedy}
                  </p>
                  <div className="text-[10px] text-gray-400 bg-black/40 p-2 rounded border border-gray-800/60">
                    <span className="block font-bold text-gray-300">Carcinogenicity / Hazards:</span>
                    <span>{evaluation.chemical.iarcCarcinogenRating}</span>
                  </div>
                </div>
              </div>

              {/* Chemical Health Hazards */}
              <div className="bg-black/50 border border-gray-800 rounded-xl p-3.5 space-y-2">
                <span className="font-bold text-gray-300 text-[11px] block flex items-center gap-1.5">
                  <ShieldAlert size={14} className="text-red-400" />
                  <span>Documented Toxicological & Biological Hazards</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {evaluation.chemical.primaryHealthHazards.map((hazard, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded bg-red-950/60 border border-red-800/60 text-red-300 text-[10px]"
                    >
                      {hazard}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ACTIVE SPRAY INCIDENTS LIST */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by chemical name, CAS #, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {filteredIncidents.map(inc => {
                  const ev = ChemicalSprayingEngine.evaluateEradication(inc, new Date());
                  const isSelected = inc.id === activeIncidentId;

                  return (
                    <div
                      key={inc.id}
                      onClick={() => {
                        setActiveIncidentId(inc.id);
                        setActiveTab('details');
                        if (onSelectIncident) onSelectIncident(inc.id);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                        isSelected
                          ? 'bg-emerald-950/60 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'bg-slate-900/60 border-gray-800/80 hover:bg-slate-800/60 hover:border-gray-700'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{inc.locationName}</span>
                          <span className={`px-2 py-0.2 rounded-full border text-[9px] font-bold ${getDecayBadgeColor(ev.decayPhase)}`}>
                            {ev.decayPhase.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-400">
                          <span className="text-emerald-400 font-semibold">{ev.chemical.commonName}</span>
                          <span>·</span>
                          <span>Applied: {new Date(inc.applicationTimestamp).toLocaleDateString()}</span>
                          <span>·</span>
                          <span>Radius: {inc.sprayRadiusMiles} mi</span>
                        </div>
                      </div>

                      <div className="text-right sm:shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                        <div className="text-xs font-bold text-white font-mono">
                          {ev.daysRemaining > 0 ? (
                            <span className="text-emerald-300">{ev.daysRemaining} days remaining</span>
                          ) : (
                            <span className="text-emerald-400">Purified</span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400">
                          {ev.percentPurifiedByEarth}% Purified ({ev.remainingConcentrationPercent}% active)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: LOG / REPORT NEW CHEMICAL SPRAYING INCIDENT (NO SLIDERS) */}
          {activeTab === 'report' && (
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-4">
                <div className="border-b border-gray-800 pb-2">
                  <h4 className="font-bold text-white text-xs flex items-center gap-2">
                    <PlusCircle size={15} className="text-emerald-400" />
                    <span>Register Chemical Spraying or Emerging Synthetic Toxin</span>
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Log aerial or ground chemical applications with precise natural earth eradication kinetics.
                  </p>
                </div>

                {reportSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-950/90 border border-emerald-500 text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>Spray incident recorded successfully! Calculating natural eradication timeline...</span>
                  </div>
                )}

                {/* 1. Chemical Selection */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-300 uppercase block">
                    Select Chemical / Toxin Formulation
                  </label>
                  <select
                    value={reportChemicalId}
                    onChange={(e) => setReportChemicalId(e.target.value)}
                    className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    {Object.values(KNOWN_CHEMICAL_PROFILES).map(chem => (
                      <option key={chem.id} value={chem.id}>
                        {chem.commonName} ({chem.category.toUpperCase()}) - CAS: {chem.casNumber}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Novel Synthetic Fields if Selected */}
                {reportChemicalId === 'novel_synthetic_generic' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-black/50 border border-amber-900/60 rounded-lg">
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                        Chemical / Brand Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Next-Gen Isoxaflutole"
                        value={reportCustomName}
                        onChange={(e) => setReportCustomName(e.target.value)}
                        className="w-full bg-slate-900 border border-gray-800 rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                        CAS # or Formula
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 141112-29-0"
                        value={reportCustomCas}
                        onChange={(e) => setReportCustomCas(e.target.value)}
                        className="w-full bg-slate-900 border border-gray-800 rounded p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                )}

                {/* 2. Location Name & Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-bold text-gray-300 uppercase block">
                      Location / Parcel Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., San Joaquin Valley Orchard Block 4"
                      value={reportLocationName}
                      onChange={(e) => setReportLocationName(e.target.value)}
                      className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-300 uppercase block">
                      Target Lat / Lon
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={`${reportCoordinates[1].toFixed(4)}, ${reportCoordinates[0].toFixed(4)}`}
                      className="w-full bg-black/60 border border-gray-800 rounded-lg p-2 text-xs text-emerald-400 font-mono"
                    />
                  </div>
                </div>

                {/* 3. Spray Radius (NO SLIDERS - Discrete chips + steppers) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-gray-300 uppercase">Spray Zone Radius: {reportRadiusMiles.toFixed(1)} miles</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setReportRadiusMiles(Math.max(0.5, reportRadiusMiles - 1))}
                        className="px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-white font-bold"
                      >
                        -1 mi
                      </button>
                      <button
                        type="button"
                        onClick={() => setReportRadiusMiles(Math.min(30, reportRadiusMiles + 1))}
                        className="px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-white font-bold"
                      >
                        +1 mi
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[1, 3, 5, 8, 12, 20].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setReportRadiusMiles(val)}
                        className={`px-3 py-1 rounded text-[11px] font-semibold border transition-all ${
                          reportRadiusMiles === val
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {val} mi
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Dosage Volume (Preset Chips) */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-gray-300 uppercase block">
                    Dosage / Application Rate
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['16 oz / acre', '32 oz / acre', '48 oz / acre', '64 oz / acre', 'ULV 0.75 fl oz/ac', 'High-Altitude Aerosol'].map(dose => (
                      <button
                        key={dose}
                        type="button"
                        onClick={() => setReportDosage(dose)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
                          reportDosage === dose
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {dose}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Target Crop & Applied By */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-300 uppercase block">
                      Target Crop / Purpose
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Corn Pre-emergence, Vector Fogging"
                      value={reportTarget}
                      onChange={(e) => setReportTarget(e.target.value)}
                      className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-300 uppercase block">
                      Applied By / Vector
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aerial Air Tractor AT-802, Ground Boom"
                      value={reportAppliedBy}
                      onChange={(e) => setReportAppliedBy(e.target.value)}
                      className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* 6. Notes */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-300 uppercase block">
                    Field Observations & Drift Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Wind drift direction, nearby waterways, school or residential proximity..."
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  data-testid="btn-submit-chemical-spray"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  Log Spray Incident & Start Eradication Countdown
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 px-5 border-t border-gray-800 bg-black/60 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Earth Natural Eradication Kinetics Active</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
