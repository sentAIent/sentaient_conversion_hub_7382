import React from 'react';
import { VENDOR_PALETTE, CameraVendor } from '../lib/intelligence/cameraData';

interface SurveillancePopupCardProps {
  properties: any;
}

export function SurveillancePopupCard({ properties }: SurveillancePopupCardProps) {
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

  return (
    <div className="font-mono text-xs space-y-2 mt-2 pt-2 border-t border-gray-200">
      {/* Vendor Badge Header */}
      <div className="flex items-center justify-between gap-1.5 bg-slate-900 text-slate-100 p-2 rounded-md shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-base">{vendorConfig.icon}</span>
          <div>
            <div className="font-bold text-[11px] uppercase tracking-wider text-amber-400">
              {vendorName}
            </div>
            <div className="text-[10px] text-gray-300 font-sans font-medium">
              {modelName} ({cameraType})
            </div>
          </div>
        </div>
        <span 
          className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-black shrink-0"
          style={{ backgroundColor: vendorConfig.color }}
        >
          {cameraType}
        </span>
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
    </div>
  );
}
export default SurveillancePopupCard;
