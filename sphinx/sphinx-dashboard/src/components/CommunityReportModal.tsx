import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Camera, Radio, AlertOctagon, Droplet, Skull } from 'lucide-react';
import { submitCommunityReport, ReportEntityType, CameraReportDetails } from '../lib/communityReports';

interface CommunityReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCoordinates?: [number, number]; // [lon, lat]
  onReportSubmitted?: (report: any) => void;
}

export function CommunityReportModal({
  isOpen,
  onClose,
  initialCoordinates = [-87.6298, 41.8827],
  onReportSubmitted
}: CommunityReportModalProps) {
  const [entityType, setEntityType] = useState<ReportEntityType>('camera');
  const [name, setName] = useState('');
  const [lon, setLon] = useState(initialCoordinates[0].toFixed(5));
  const [lat, setLat] = useState(initialCoordinates[1].toFixed(5));
  
  // Camera-specific fields
  const [vendor, setVendor] = useState<'flock' | 'axon' | 'ring' | 'motorola' | 'genetec' | 'enforcement' | 'cctv' | 'other'>('flock');
  const [cameraType, setCameraType] = useState<'ALPR' | 'Fixed Optical' | 'PTZ Dome' | 'Doorbell Mesh'>('ALPR');
  const [operationalStatus, setOperationalStatus] = useState<'Active' | 'Removed'>('Active');
  const [installDate, setInstallDate] = useState(new Date().toISOString().split('T')[0]);
  const [removalDate, setRemovalDate] = useState(new Date().toISOString().split('T')[0]);
  const [removalReason, setRemovalReason] = useState('City Council Resolution / Automated Tracking Non-Renewal');
  const [direction, setDirection] = useState(180);
  const [mountType, setMountType] = useState('Solar Pole Mount');
  const [notes, setNotes] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [submittedReport, setSubmittedReport] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lonNum = parseFloat(lon);
    const latNum = parseFloat(lat);

    if (isNaN(lonNum) || isNaN(latNum)) {
      alert('Please provide valid longitude and latitude coordinates.');
      return;
    }

    const reportName = name.trim() || (
      entityType === 'camera' 
        ? `${vendor.toUpperCase()} ${cameraType} Node${operationalStatus === 'Removed' ? ' [REMOVED]' : ''}`
        : `Community ${entityType.replace('_', ' ').toUpperCase()} Node`
    );

    let details: any = {};
    if (entityType === 'camera') {
      const camDetails: CameraReportDetails = {
        vendor,
        vendor_display: vendor === 'flock' ? 'Flock Safety' : vendor === 'axon' ? 'Axon Enterprise' : vendor === 'ring' ? 'Amazon Ring' : vendor === 'motorola' ? 'Motorola Solutions' : vendor === 'genetec' ? 'Genetec AutoVu' : vendor === 'enforcement' ? 'Traffic Enforcement' : 'CCTV Sentry',
        camera_type: cameraType,
        operational_status: operationalStatus,
        direction,
        install_date: installDate,
        removal_date: operationalStatus === 'Removed' ? removalDate : undefined,
        removal_reason: operationalStatus === 'Removed' ? removalReason : undefined,
        mount_type: mountType,
        notes,
        evidence_url: evidenceUrl
      };
      details = camDetails;
    } else {
      details = {
        operational_status: operationalStatus,
        notes,
        evidence_url: evidenceUrl
      };
    }

    const { report, isNew, justPromoted } = submitCommunityReport({
      type: entityType,
      name: reportName,
      coordinates: [lonNum, latNum],
      details
    });

    setSubmittedReport({ report, isNew, justPromoted });
    if (onReportSubmitted) {
      onReportSubmitted(report);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-cyan-500/80 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto text-slate-100 font-mono text-xs shadow-2xl p-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-900/60 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-lg">📢</span>
            <div>
              <h2 className="text-sm font-bold tracking-wider text-cyan-300 uppercase">
                Crowdsourced OSINT Intelligence Report
              </h2>
              <p className="text-[10px] text-gray-400">
                Community verification protocol • 3 confirmations promotes to system
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {submittedReport ? (
          <div className="space-y-4 py-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 mb-2">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-sm font-bold text-emerald-300 uppercase">
              {submittedReport.justPromoted ? '🎉 Promoted to Global System Verified!' : 'Report Recorded in Consensus Pool'}
            </h3>
            <p className="text-[11px] text-gray-300 max-w-md mx-auto">
              {submittedReport.justPromoted
                ? `Consensus threshold reached (3/3). This ${submittedReport.report.type} has been permanently added to the global Sphinx system feed for all users!`
                : `Current Consensus: ${submittedReport.report.confirmationsCount}/3 confirmations. When 3 independent users vouch for this item, it will be elevated to the global system map.`}
            </p>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded text-left text-[11px] space-y-1">
              <div><strong>Name:</strong> {submittedReport.report.name}</div>
              <div><strong>Category:</strong> {submittedReport.report.category_label}</div>
              <div><strong>Coordinates:</strong> {submittedReport.report.coordinates[1].toFixed(5)}, {submittedReport.report.coordinates[0].toFixed(5)}</div>
              {submittedReport.report.details.install_date && (
                <div><strong>Install Date:</strong> {submittedReport.report.details.install_date}</div>
              )}
              {submittedReport.report.details.removal_date && (
                <div><strong>Removed Date:</strong> {submittedReport.report.details.removal_date} ({submittedReport.report.details.removal_reason})</div>
              )}
            </div>
            <button
              onClick={() => {
                setSubmittedReport(null);
                onClose();
              }}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold uppercase tracking-wider text-xs transition-colors"
            >
              Done & Return to Map
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Consensus Notice Banner */}
            <div className="bg-amber-950/40 border border-amber-500/50 rounded-lg p-2.5 flex items-start gap-2.5 text-amber-200 text-[11px]">
              <ShieldCheck size={18} className="shrink-0 text-amber-400 mt-0.5" />
              <div>
                <strong className="block font-bold uppercase tracking-wider text-amber-300">
                  Automated Consensus Elevation Protocol
                </strong>
                <span>
                  Items submitted by users start in Community Review. Once <strong>3 independent users</strong> verify or confirm this location, Sphinx automatically promotes it to a <strong>Global System Entity</strong> visible to everyone.
                </span>
              </div>
            </div>

            {/* Entity Type Selector */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5">
                Select Tracked Entity Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'camera', label: 'Surveillance / ALPR', icon: <Camera size={13} /> },
                  { id: 'cell_tower', label: 'Cell Tower', icon: <Radio size={13} /> },
                  { id: 'road_hazard', label: 'Road Hazard', icon: <AlertOctagon size={13} /> },
                  { id: 'spring', label: 'Water Spring', icon: <Droplet size={13} /> },
                  { id: 'toxic_site', label: 'Toxic Site', icon: <Skull size={13} /> },
                  { id: 'custom', label: 'Other OSINT', icon: <AlertTriangle size={13} /> }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEntityType(item.id as ReportEntityType)}
                    className={`flex items-center gap-1.5 p-2 rounded border text-left transition-all ${
                      entityType === item.id
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-gray-400 hover:text-gray-200 hover:border-slate-700'
                    }`}
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Specific Fields */}
            {entityType === 'camera' && (
              <div className="space-y-3 p-3 bg-slate-900/40 rounded-lg border border-slate-800">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                  <span className="text-[10px] uppercase text-cyan-400 font-bold">Surveillance Specifications</span>
                  {/* Status Toggle: Active vs Removed */}
                  <div className="flex gap-1.5 bg-slate-950 p-0.5 rounded border border-slate-700">
                    <button
                      type="button"
                      onClick={() => setOperationalStatus('Active')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                        operationalStatus === 'Active' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400'
                      }`}
                    >
                      🟢 Active
                    </button>
                    <button
                      type="button"
                      onClick={() => setOperationalStatus('Removed')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                        operationalStatus === 'Removed' ? 'bg-red-600 text-white shadow' : 'text-gray-400'
                      }`}
                    >
                      🔴 Removed / Hist.
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1 uppercase font-medium">Hardware Vendor</label>
                    <select
                      value={vendor}
                      onChange={(e) => setVendor(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="flock">Flock Safety (Falcon/Sparrow ALPR)</option>
                      <option value="axon">Axon Enterprise (Fleet 3 ALPR)</option>
                      <option value="ring">Amazon Ring (Neighbors Mesh)</option>
                      <option value="motorola">Motorola Solutions (Vigilant ALPR)</option>
                      <option value="genetec">Genetec AutoVu (SharpV ALPR)</option>
                      <option value="enforcement">Traffic Enforcement (Speed/Red-Light)</option>
                      <option value="cctv">Municipal CCTV Optical</option>
                      <option value="other">Other / Custom Surveillance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1 uppercase font-medium">Camera Type</label>
                    <select
                      value={cameraType}
                      onChange={(e) => setCameraType(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="ALPR">ALPR (Automated License Plate Reader)</option>
                      <option value="Fixed Optical">Fixed Optical Sentry</option>
                      <option value="PTZ Dome">PTZ 360° Dome</option>
                      <option value="Doorbell Mesh">Doorbell / Porch Mesh</option>
                    </select>
                  </div>
                </div>

                {/* Installation Date Input */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1 uppercase font-medium">
                      📅 Installation Date
                    </label>
                    <input
                      type="date"
                      value={installDate}
                      onChange={(e) => setInstallDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1 uppercase font-medium">
                      🧭 Sightline Direction ({direction}°)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="5"
                      value={direction}
                      onChange={(e) => setDirection(parseInt(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                </div>

                {/* If Removed: Removal Date & Reason */}
                {operationalStatus === 'Removed' && (
                  <div className="bg-red-950/30 border border-red-800/40 p-2.5 rounded-lg space-y-2">
                    <div className="flex items-center gap-1.5 text-red-300 font-bold text-[10px] uppercase">
                      <span>🚫</span> Historical Decommissioning Telemetry
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase">Removal Date</label>
                        <input
                          type="date"
                          value={removalDate}
                          onChange={(e) => setRemovalDate(e.target.value)}
                          className="w-full bg-slate-950 border border-red-900/80 rounded p-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-gray-400 uppercase">Removal Reason</label>
                        <select
                          value={removalReason}
                          onChange={(e) => setRemovalReason(e.target.value)}
                          className="w-full bg-slate-950 border border-red-900/80 rounded p-1 text-xs text-white"
                        >
                          <option value="City Council Resolution / Automated Tracking Non-Renewal">City Council Resolution / Non-Renewal</option>
                          <option value="Community Privacy Audit & Oversight Removal">Community Privacy Audit Directive</option>
                          <option value="Contract Terminated by Municipal Authority">Contract Terminated</option>
                          <option value="Corridor Redesign / Road Construction">Corridor Redesign / Road Work</option>
                          <option value="Hardware Retired / Upgraded to New Node">Hardware Retired / Upgraded</option>
                          <option value="Physically Removed / Struck by Vehicle">Physically Removed / Struck</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Coordinates & Custom Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-gray-400 mb-1 uppercase font-medium">Latitude</label>
                <input
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 mb-1 uppercase font-medium">Longitude</label>
                <input
                  type="text"
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 mb-1 uppercase font-medium">
                Descriptive Name / Intersection (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Flock Falcon ALPR at Congress & Riverside"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 mb-1 uppercase font-medium">
                Notes, Physical Description or Evidence URL
              </label>
              <textarea
                rows={2}
                placeholder="Physical pole details, solar panel angle, council contract number, or verification link..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-gray-400 text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-1.5"
              >
                <span>📢</span> Submit to Community Consensus
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
