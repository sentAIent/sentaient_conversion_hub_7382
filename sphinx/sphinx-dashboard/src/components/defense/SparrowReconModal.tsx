"use client";
import React, { useState, useMemo } from 'react';
import { X, ShieldAlert, Radio, Eye, Crosshair, AlertTriangle, ChevronRight, Check, Plus, RefreshCw, Trash2, MapPin } from 'lucide-react';
import {
  SparrowReconEngine,
  SURVEILLANCE_BEACON_SIGNATURES,
  STRATEGIC_ALPR_CORRIDORS,
  SURVEILLANCE_AIRCRAFT_REGISTRY,
  CitizenReconSighting,
  SurveillanceBeaconSignature,
  IS_STORE_SUBMISSION_BUILD
} from '../../lib/defense/sparrowReconEngine';

interface SparrowReconModalProps {
  isOpen: boolean;
  onClose: () => void;
  operatorCoords: { lat: number; lon: number };
  onFlyTo?: (lat: number, lon: number, zoom?: number) => void;
}

export const SparrowReconModal: React.FC<SparrowReconModalProps> = ({
  isOpen,
  onClose,
  operatorCoords,
  onFlyTo
}) => {
  // Dual-layer App Store Anti-Rejection Shield: never render on store submission builds
  if (IS_STORE_SUBMISSION_BUILD) {
    return null;
  }

  const [activeTab, setActiveTab] = useState<'BEACONS' | 'ALPR' | 'AIRCRAFT' | 'SIGHTINGS'>('BEACONS');
  const [testSsid, setTestSsid] = useState('');
  const [matchedBeacon, setMatchedBeacon] = useState<SurveillanceBeaconSignature | null>(null);

  // Sightings state
  const [sightings, setSightings] = useState<CitizenReconSighting[]>(() => SparrowReconEngine.getActiveSightings());
  const [newSightingType, setNewSightingType] = useState<CitizenReconSighting['type']>('STATIONARY_PATROL');
  const [newSightingDesc, setNewSightingDesc] = useState('');

  const nearbyAlpr = useMemo(() => {
    return SparrowReconEngine.getNearbyAlprChokepoints(operatorCoords.lat, operatorCoords.lon, 100);
  }, [operatorCoords.lat, operatorCoords.lon]);

  if (!isOpen) return null;

  const handleTestSsid = () => {
    if (!testSsid.trim()) return;
    const match = SparrowReconEngine.matchSsid(testSsid);
    setMatchedBeacon(match);
  };

  const handleAddSighting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSightingDesc.trim()) return;
    const item = SparrowReconEngine.addSighting(
      operatorCoords.lat,
      operatorCoords.lon,
      newSightingType,
      newSightingDesc
    );
    setSightings(prev => [item, ...prev]);
    setNewSightingDesc('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[90vh] bg-neutral-950 border border-red-500/40 rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.25)] flex flex-col overflow-hidden text-gray-200 font-sans">
        
        {/* Header (Admin Badge & App Store Shield Disclosure) */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-red-500/20 bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-red-400 tracking-wider uppercase">
                  Sparrow Recon Sentry
                </h2>
                <span className="text-[10px] bg-red-950 text-red-300 border border-red-700/60 px-1.5 py-0.5 rounded font-mono font-bold">
                  ADMIN ONLY / AIR-GAPPED
                </span>
                <span className="text-[10px] bg-neutral-800 text-gray-400 border border-white/10 px-1.5 py-0.5 rounded font-mono">
                  STORE-EXCLUDED
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Counter-surveillance beacon sniffing, ALPR choke-point detection &amp; government surveillance aircraft sentry
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (100% Zero-Slider Rule) */}
        <div className="p-3 bg-neutral-900/50 border-b border-white/5 flex flex-wrap gap-2 items-center">
          <button
            type="button"
            onClick={() => setActiveTab('BEACONS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'BEACONS' ? 'bg-red-950 text-red-300 border border-red-500/60 shadow-[0_0_10px_rgba(220,38,38,0.3)]' : 'bg-black/40 text-gray-400 hover:text-gray-200 border border-white/5'}`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Surveillance Beacons ({SURVEILLANCE_BEACON_SIGNATURES.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ALPR')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'ALPR' ? 'bg-red-950 text-red-300 border border-red-500/60 shadow-[0_0_10px_rgba(220,38,38,0.3)]' : 'bg-black/40 text-gray-400 hover:text-gray-200 border border-white/5'}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Fixed ALPR Corridors ({nearbyAlpr.length} Nearby)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('AIRCRAFT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'AIRCRAFT' ? 'bg-red-950 text-red-300 border border-red-500/60 shadow-[0_0_10px_rgba(220,38,38,0.3)]' : 'bg-black/40 text-gray-400 hover:text-gray-200 border border-white/5'}`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Surveillance Aircraft ({SURVEILLANCE_AIRCRAFT_REGISTRY.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('SIGHTINGS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'SIGHTINGS' ? 'bg-red-950 text-red-300 border border-red-500/60 shadow-[0_0_10px_rgba(220,38,38,0.3)]' : 'bg-black/40 text-gray-400 hover:text-gray-200 border border-white/5'}`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Citizen Sightings ({sightings.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* TAB 1: SURVEILLANCE BEACON SNIFFER */}
          {activeTab === 'BEACONS' && (
            <div className="space-y-4">
              {/* Manual SSID / Beacon Tester */}
              <div className="p-4 rounded-xl bg-black/60 border border-red-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                    <Radio className="w-4 h-4" />
                    <span>Wi-Fi &amp; BLE Beacon Signature Matcher</span>
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">MATCH AGAINST HARDWARE OUIs</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testSsid}
                    onChange={(e) => setTestSsid(e.target.value)}
                    placeholder="Enter detected Wi-Fi SSID (e.g. Flock-4829, AXON_BV-12, AirLink-998)..."
                    className="flex-1 px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleTestSsid}
                    className="px-4 py-2 bg-red-900/80 hover:bg-red-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>Analyze Beacon</span>
                  </button>
                </div>

                {matchedBeacon ? (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/60 space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-red-300 font-bold">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span>SURVEILLANCE BEACON MATCH: {matchedBeacon.name}</span>
                    </div>
                    <p className="text-gray-300 text-[11px]">{matchedBeacon.description}</p>
                    <p className="text-red-200 text-[10px] font-mono"><strong>Tactical Implication:</strong> {matchedBeacon.tacticalImplication}</p>
                  </div>
                ) : testSsid && (
                  <div className="p-2.5 rounded bg-neutral-900 text-[11px] text-gray-400 font-mono">
                    No known surveillance signatures matched &ldquo;{testSsid}&rdquo;.
                  </div>
                )}
              </div>

              {/* Hardware Signatures Directory */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Recognized Surveillance Device Signatures:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SURVEILLANCE_BEACON_SIGNATURES.map(sig => (
                    <div key={sig.name} className="p-3.5 rounded-lg bg-black/40 border border-white/10 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-red-400 uppercase">{sig.manufacturer}</span>
                          <h5 className="text-xs font-bold text-white">{sig.name}</h5>
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-neutral-800 text-gray-300 border border-white/10">
                          {sig.frequencyBand}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">{sig.description}</p>
                      <div className="text-[10px] font-mono text-gray-500 space-y-0.5">
                        <div>SSID Patterns: <span className="text-gray-300">{sig.ssidPatterns.join(', ')}</span></div>
                        {sig.ouiPrefixes && <div>MAC OUIs: <span className="text-gray-300">{sig.ouiPrefixes.join(', ')}</span></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FIXED ALPR CORRIDORS */}
          {activeTab === 'ALPR' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Strategic Fixed ALPR Highway Corridors:
                </h4>
                <span className="text-[10px] font-mono text-gray-500">Sorted by proximity to operator</span>
              </div>
              <div className="space-y-2">
                {nearbyAlpr.map(({ site, distanceKm }) => (
                  <div key={site.id} className="p-3.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{site.name}</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-red-950 text-red-300 border border-red-700/60">
                          {site.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">Agency: {site.agency} | Monitors: {site.directionMonitored}</p>
                      <p className="text-[10px] font-mono text-red-400">Distance: {distanceKm.toFixed(1)} km ({ (distanceKm * 0.621371).toFixed(1) } miles)</p>
                    </div>
                    {onFlyTo && (
                      <button
                        type="button"
                        onClick={() => onFlyTo(site.lat, site.lon, 14)}
                        className="px-2.5 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-xs text-gray-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1 shrink-0"
                      >
                        <MapPin className="w-3 h-3 text-red-400" />
                        <span>View on Map</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SURVEILLANCE AIRCRAFT */}
          {activeTab === 'AIRCRAFT' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Government &amp; Law Enforcement Aircraft Signatures:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SURVEILLANCE_AIRCRAFT_REGISTRY.map(ac => (
                  <div key={ac.registration} className="p-3.5 rounded-lg bg-black/40 border border-white/10 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-red-400 font-mono">{ac.registration}</span>
                        <h5 className="text-xs font-bold text-white">{ac.aircraftModel}</h5>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-neutral-800 text-gray-300 border border-white/10">
                        ICAO: {ac.icao24}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 font-medium">{ac.operator}</p>
                    <div className="text-[10px] text-gray-400 space-y-1">
                      <div><strong>Sensor Turret:</strong> {ac.sensorEquipment}</div>
                      <div><strong>Mission Profile:</strong> {ac.typicalMission}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CITIZEN SIGHTINGS (ZERO-PII & 2-HOUR TTL) */}
          {activeTab === 'SIGHTINGS' && (
            <div className="space-y-4">
              {/* Add New Sighting Form */}
              <form onSubmit={handleAddSighting} className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-red-400" />
                  <span>Log Tactical Sighting (Auto-Expires in 2 Hours)</span>
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {(['STATIONARY_PATROL', 'SPEED_TRAP', 'ALPR_CHECKPOINT', 'CIRCLING_AIRCRAFT'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewSightingType(t)}
                      className={`px-2.5 py-1 rounded-full border text-[10px] font-bold transition-all ${newSightingType === t ? 'bg-red-950 border-red-500 text-red-300' : 'bg-black/40 border-white/10 text-gray-400'}`}
                    >
                      {t.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSightingDesc}
                    onChange={(e) => setNewSightingDesc(e.target.value)}
                    placeholder="Describe sighting (e.g. marked cruiser stationary on shoulder, FLIR helicopter circling)..."
                    className="flex-1 px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-400 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={!newSightingDesc.trim()}
                    className="px-4 py-2 bg-red-900/80 hover:bg-red-800 disabled:opacity-40 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    Post Sighting
                  </button>
                </div>
              </form>

              {/* Active Sightings List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Active Sightings ({sightings.length}):
                </h4>
                {sightings.length === 0 ? (
                  <p className="text-xs text-gray-500 italic p-3">No active local sightings reported within the 2-hour window.</p>
                ) : (
                  sightings.map(s => {
                    const remainingMins = Math.max(0, Math.round((s.expiresAt - Date.now()) / 60000));
                    return (
                      <div key={s.id} className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-red-300 font-mono text-[10px]">{s.type}</span>
                            <span className="text-[10px] text-gray-500 font-mono">Expires in {remainingMins}m</span>
                          </div>
                          <p className="text-gray-200">{s.description}</p>
                        </div>
                        {onFlyTo && (
                          <button
                            type="button"
                            onClick={() => onFlyTo(s.lat, s.lon, 14)}
                            className="p-1 text-gray-400 hover:text-white"
                            title="View coordinates on map"
                          >
                            <MapPin className="w-4 h-4 text-red-400" />
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
