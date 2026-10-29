import React, { useState } from 'react';
import { VENDOR_PALETTE, CameraVendor } from '../lib/intelligence/cameraData';
import { confirmCommunityReport, reportEntityRemoval } from '../lib/communityReports';

interface SurveillancePopupCardProps {
  properties: any;
  onOpenReportModal?: (props: any) => void;
}

export function SurveillancePopupCard({ properties, onOpenReportModal }: SurveillancePopupCardProps) {
  const p = properties || {};
  const vendorKey: CameraVendor = (p.vendor as CameraVendor) || 'cctv';
  const vendorConfig = VENDOR_PALETTE[vendorKey] || VENDOR_PALETTE.cctv;

  const vendorName = p.vendor_display || vendorConfig.label;
  const modelName = p.model || p.sub_type || 'Automated Surveillance Node';
  const cameraType = p.camera_type || (vendorKey === 'flock' || vendorKey === 'axon' ? 'ALPR' : 'Optical CCTV');
  const bearingLabel = p.direction_label || (p.direction != null ? `${p.direction}° Azimuth` : 'Omni-Directional');
  const rangeMeters = p.range_meters || 35;
  const fovAngle = p.fov_angle || 45;
  const mount = p.mount_type || p.mount || 'Solar Pole Mount';
  const power = p.power_source || 'Solar + Battery';
  const agency = p.agency || p.operator || 'Municipal Jurisdiction';
  const retention = p.retention_days ? `${p.retention_days} Days` : '30–60 Days';
  const network = p.sharing_network || (vendorKey === 'flock' ? 'TALON Regional Network' : 'Municipal Open Portal');

  // Installation & Historical Telemetry
  const isHistorical = Boolean(p.is_historical || p.status === 'Removed' || p.status === 'Decommissioned' || p.status === 'removed_verified');
  const isPendingCommunity = p.status === 'pending_consensus' || p.status === 'decommission_pending' || p.is_pending;
  const isCommunityVerified = Boolean(p.is_community_verified || p.status === 'verified_system');
  const installDate = p.install_date || '2022-09-15';
  const removalDate = p.removal_date;
  const removalReason = p.removal_reason;

  const [confirmCount, setConfirmCount] = useState<number>(p.confirmations || 1);
  const [hasVouched, setHasVouched] = useState<boolean>(false);
  const [showRemovalConfirm, setShowRemovalConfirm] = useState<boolean>(false);
  const [removalReported, setRemovalReported] = useState<boolean>(false);

  // Compute operational duration
  let activeDurationLabel = '';
  try {
    const startMs = new Date(installDate).getTime();
    const endMs = isHistorical && removalDate ? new Date(removalDate).getTime() : Date.now();
    if (!isNaN(startMs) && !isNaN(endMs) && endMs > startMs) {
      const days = Math.round((endMs - startMs) / (1000 * 60 * 60 * 24));
      if (days > 365) {
        activeDurationLabel = `${(days / 365).toFixed(1)} yrs active`;
      } else {
        activeDurationLabel = `${Math.round(days / 30)} mos active`;
      }
    }
  } catch {}

  // Capabilities
  let capabilities: string[] = [];
  if (Array.isArray(p.capabilities)) {
    capabilities = p.capabilities;
  } else if (typeof p.capabilities === 'string') {
    try { capabilities = JSON.parse(p.capabilities); } catch { capabilities = [p.capabilities]; }
  } else {
    if (cameraType === 'ALPR') {
      capabilities = ['License Plate OCR', 'Vehicle Make/Model/Color', 'Night-Vision IR'];
    } else {
      capabilities = ['Optical Stream', 'Motion Detection'];
    }
  }

  const handleVouch = () => {
    if (hasVouched) return;
    const { report } = confirmCommunityReport(p.id);
    setHasVouched(true);
    setConfirmCount(prev => prev + 1);
  };

  const handleReportRemoval = () => {
    reportEntityRemoval(
      p.id,
      'camera',
      [p.longitude || p.lng || 0, p.latitude || p.lat || 0],
      new Date().toISOString().split('T')[0],
      'Community Audit: Camera hardware observed physically removed or disused'
    );
    setRemovalReported(true);
    setShowRemovalConfirm(false);
  };

  return (
    <div className="font-mono text-xs space-y-2 mt-2 pt-2 border-t border-gray-200">
      {/* Vendor Badge Header */}
      <div className={`flex items-center justify-between gap-1.5 p-2 rounded-md shadow-sm ${
        isHistorical ? 'bg-slate-900 border border-red-800/80 text-slate-100' : 'bg-slate-900 text-slate-100'
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="text-base">{isHistorical ? '🚫' : vendorConfig.icon}</span>
          <div>
            <div className={`font-bold text-[11px] uppercase tracking-wider ${
              isHistorical ? 'text-red-400 line-through' : 'text-amber-400'
            }`}>
              {vendorName}
            </div>
            <div className="text-[10px] text-gray-300 font-sans font-medium flex items-center gap-1">
              <span>{modelName}</span>
              {isHistorical && <span className="text-red-400 font-bold">[REMOVED]</span>}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span 
            className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-black shrink-0"
            style={{ backgroundColor: isHistorical ? '#ef4444' : vendorConfig.color }}
          >
            {isHistorical ? 'HISTORICAL' : cameraType}
          </span>
          {isCommunityVerified && (
            <span className="text-[8px] bg-emerald-950 text-emerald-400 px-1 py-0.2 rounded border border-emerald-600 font-bold">
              🛡️ VERIFIED (3+ REPORTERS)
            </span>
          )}
        </div>
      </div>

      {/* Operational Lifecycle & Installation Date Banner */}
      <div className={`p-1.5 rounded border text-[11px] font-medium space-y-1 ${
        isHistorical 
          ? 'bg-red-950/20 border-red-700/60 text-red-200' 
          : isPendingCommunity
          ? 'bg-amber-950/30 border-amber-600/70 text-amber-200'
          : 'bg-emerald-950/20 border-emerald-700/50 text-emerald-200'
      }`}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 font-bold">
            {isHistorical ? '🔴 DECOMMISSIONED / REMOVED' : isPendingCommunity ? `⏳ COMMUNITY CONSENSUS (${confirmCount}/3)` : '🟢 ACTIVE IN SERVICE'}
          </span>
          {activeDurationLabel && (
            <span className="text-[9px] px-1 rounded bg-black/40 text-gray-300">
              {activeDurationLabel}
            </span>
          )}
        </div>

        <div className="text-[10px] text-gray-300 grid grid-cols-2 gap-1 pt-0.5 border-t border-white/10">
          <div>
            <span className="text-gray-400">📅 Installed:</span> <strong>{installDate}</strong>
          </div>
          {isHistorical && removalDate ? (
            <div>
              <span className="text-red-400">🚫 Removed:</span> <strong>{removalDate}</strong>
            </div>
          ) : (
            <div>
              <span className="text-gray-400">⚡ Status:</span> <strong className="text-emerald-400">Operational</strong>
            </div>
          )}
        </div>

        {/* Removal Reason if Decommissioned */}
        {isHistorical && removalReason && (
          <div className="text-[9px] text-red-300/90 pt-1 border-t border-red-900/40">
            <strong>Audit Rationale:</strong> {removalReason}
          </div>
        )}
      </div>

      {/* Sightline & Directional Compass Bar */}
      <div className="bg-amber-50 border border-amber-300/80 rounded p-1.5 flex items-center justify-between text-[11px] text-amber-950 font-medium">
        <div className="flex items-center gap-1">
          <span>🧭</span>
          <span className="font-bold">{bearingLabel}</span>
        </div>
        <div className="text-[10px] text-amber-800">
          <span>{rangeMeters}m Depth</span> • <span>{fovAngle}° Beam</span>
        </div>
      </div>

      {/* Tactical Specs Grid */}
      <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-gray-50 p-2 rounded border border-gray-200">
        <div>
          <span className="text-gray-500 block text-[9px] uppercase">Mount & Power</span>
          <span className="font-semibold text-gray-800">{mount}</span>
          <span className="block text-gray-600 text-[9px]">{power}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-[9px] uppercase">Agency & Sharing</span>
          <span className="font-semibold text-gray-800 truncate block" title={agency}>{agency}</span>
          <span className="block text-cyan-700 text-[9px] truncate" title={network}>{network}</span>
        </div>
      </div>

      {/* Capabilities Badges */}
      <div>
        <span className="text-[9px] uppercase text-gray-500 font-bold block mb-1">Optical Capture Capabilities</span>
        <div className="flex flex-wrap gap-1">
          {capabilities.map((cap, i) => (
            <span key={i} className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-300 text-[9px] font-medium">
              ✓ {cap}
            </span>
          ))}
        </div>
      </div>

      {/* Data Retention Notice */}
      <div className="text-[9px] text-gray-500 flex items-center justify-between border-t border-gray-100 pt-1">
        <span>Data Retention Policy:</span>
        <span className="font-bold text-gray-700">{retention}</span>
      </div>

      {/* Community Consensus Actions */}
      <div className="pt-2 border-t border-gray-200 flex flex-col gap-1.5">
        {isPendingCommunity && (
          <button
            type="button"
            onClick={handleVouch}
            disabled={hasVouched}
            className={`w-full py-1 px-2 rounded text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-all ${
              hasVouched
                ? 'bg-emerald-800 text-emerald-200 cursor-default'
                : 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white'
            }`}
          >
            <span>👍</span> {hasVouched ? `Vouched (${confirmCount}/3 Consensus)` : `Confirm This Camera (${confirmCount}/3 Reports)`}
          </button>
        )}

        {!isHistorical && !removalReported && !showRemovalConfirm && (
          <button
            type="button"
            onClick={() => setShowRemovalConfirm(true)}
            className="w-full py-1 px-2 rounded text-[10px] text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-300 hover:border-red-300 transition-colors flex items-center justify-center gap-1"
          >
            <span>📢</span> Report Camera Removed / Disused
          </button>
        )}

        {showRemovalConfirm && (
          <div className="bg-red-50 border border-red-300 p-2 rounded space-y-1 text-[10px] text-red-900">
            <div className="font-bold">Confirm Camera Removal:</div>
            <div>Has this camera been taken down or decommissioned? Reporting this registers a community removal vote.</div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleReportRemoval}
                className="flex-1 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-[10px]"
              >
                Yes, Report Removed
              </button>
              <button
                type="button"
                onClick={() => setShowRemovalConfirm(false)}
                className="py-1 px-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-[10px]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {removalReported && (
          <div className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 p-1.5 rounded text-center font-bold">
            ✔ Removal vote recorded. When 3 users confirm, it will be moved to the Historical Layer.
          </div>
        )}
      </div>
    </div>
  );
}

export default SurveillancePopupCard;
