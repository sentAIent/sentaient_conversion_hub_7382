// Sphinx Crowdsourced Intelligence & Consensus Verification Engine
// Enables users to report cameras, cell towers, road hazards, water springs, and toxic sites.
// Items reach "Global System Verified" status when 3 independent user reports/confirmations are recorded.

export type ReportEntityType = 'camera' | 'cell_tower' | 'road_hazard' | 'spring' | 'toxic_site' | 'custom';

export type ReportStatus = 'pending_consensus' | 'verified_system' | 'decommission_pending' | 'removed_verified';

export interface CameraReportDetails {
  vendor: 'flock' | 'axon' | 'ring' | 'motorola' | 'genetec' | 'enforcement' | 'cctv' | 'other';
  vendor_display?: string;
  model?: string;
  camera_type?: 'ALPR' | 'Fixed Optical' | 'PTZ Dome' | 'Doorbell Mesh';
  operational_status: 'Active' | 'Removed' | 'Decommissioned';
  direction?: number;
  install_date?: string;
  removal_date?: string;
  removal_reason?: string;
  mount_type?: string;
  power_source?: string;
  sharing_network?: string;
  notes?: string;
  evidence_url?: string;
}

export interface GenericReportDetails {
  operational_status?: string;
  notes?: string;
  evidence_url?: string;
  severity?: 'low' | 'moderate' | 'high' | 'critical';
  hazard_type?: string;
  carrier?: string;
  potability?: string;
  [key: string]: any;
}

export interface CommunityReport {
  id: string;
  type: ReportEntityType;
  category_label: string;
  name: string;
  coordinates: [number, number]; // [lon, lat]
  reportedBy: string; // User or device identifier
  reporters: string[]; // List of unique contributor device IDs
  confirmationsCount: number;
  consensusThreshold: number; // Defaults to 3
  status: ReportStatus;
  details: CameraReportDetails | GenericReportDetails;
  createdAt: string;
  updatedAt: string;
  promotedToSystemAt?: string;
}

export const COMMUNITY_CONSENSUS_THRESHOLD = 3;
export const SPATIAL_CLUSTER_RADIUS_METERS = 25; // Group reports within 25 meters as the same object
const STORAGE_KEY = 'sphinx_community_reports_v1';
const DEVICE_ID_KEY = 'sphinx_reporter_device_id';

/**
 * Returns or initializes a persistent pseudonymous device identifier
 */
export function getReporterDeviceId(): string {
  if (typeof window === 'undefined') return 'device_server_fallback';
  let devId = localStorage.getItem(DEVICE_ID_KEY);
  if (!devId) {
    devId = `dev_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
    localStorage.setItem(DEVICE_ID_KEY, devId);
  }
  return devId;
}

/**
 * Calculates Haversine distance in meters between two [lon, lat] coordinates
 */
export function calculateDistanceMeters(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Loads all community reports from localStorage
 */
export function loadLocalCommunityReports(): CommunityReport[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Persists community reports to localStorage
 */
export function saveLocalCommunityReports(reports: CommunityReport[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (e) {
    console.warn('[Sphinx Reports] Failed to save reports to localStorage', e);
  }
}

/**
 * Submits a new community report or attaches a confirmation if nearby report exists
 */
export function submitCommunityReport(input: {
  type: ReportEntityType;
  name: string;
  coordinates: [number, number];
  details: CameraReportDetails | GenericReportDetails;
  deviceId?: string;
}): { report: CommunityReport; isNew: boolean; justPromoted: boolean } {
  const reports = loadLocalCommunityReports();
  const deviceId = input.deviceId || getReporterDeviceId();
  const now = new Date().toISOString();

  // 1. Check if a report of the same type exists within the 25m cluster threshold
  const existingIdx = reports.findIndex(
    r => r.type === input.type && calculateDistanceMeters(r.coordinates, input.coordinates) <= SPATIAL_CLUSTER_RADIUS_METERS
  );

  if (existingIdx >= 0) {
    const existing = reports[existingIdx];
    const uniqueReporters = new Set(existing.reporters || [existing.reportedBy]);
    uniqueReporters.add(deviceId);

    const confirmationsCount = uniqueReporters.size;
    let newStatus = existing.status;
    let justPromoted = false;

    // Check if consensus threshold reached
    if (confirmationsCount >= COMMUNITY_CONSENSUS_THRESHOLD && existing.status !== 'verified_system') {
      newStatus = 'verified_system';
      justPromoted = true;
    }

    const updated: CommunityReport = {
      ...existing,
      reporters: Array.from(uniqueReporters),
      confirmationsCount,
      status: newStatus,
      updatedAt: now,
      promotedToSystemAt: justPromoted ? now : existing.promotedToSystemAt,
      details: {
        ...existing.details,
        ...input.details
      }
    };

    reports[existingIdx] = updated;
    saveLocalCommunityReports(reports);

    // Sync in background with API
    syncReportWithApi(updated).catch(() => {});

    return { report: updated, isNew: false, justPromoted };
  }

  // 2. Create new report
  const isSelfPromoted = COMMUNITY_CONSENSUS_THRESHOLD <= 1;
  const newReport: CommunityReport = {
    id: `rep-${input.type}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    type: input.type,
    category_label: getCategoryLabel(input.type, input.details),
    name: input.name,
    coordinates: input.coordinates,
    reportedBy: deviceId,
    reporters: [deviceId],
    confirmationsCount: 1,
    consensusThreshold: COMMUNITY_CONSENSUS_THRESHOLD,
    status: isSelfPromoted ? 'verified_system' : 'pending_consensus',
    details: input.details,
    createdAt: now,
    updatedAt: now,
    promotedToSystemAt: isSelfPromoted ? now : undefined
  };

  reports.push(newReport);
  saveLocalCommunityReports(reports);

  // Sync in background with API
  syncReportWithApi(newReport).catch(() => {});

  return { report: newReport, isNew: true, justPromoted: isSelfPromoted };
}

/**
 * Confirms / vouches for an existing community report
 */
export function confirmCommunityReport(
  reportId: string,
  deviceId?: string
): { report: CommunityReport | null; justPromoted: boolean } {
  const reports = loadLocalCommunityReports();
  const devId = deviceId || getReporterDeviceId();
  const idx = reports.findIndex(r => r.id === reportId);
  if (idx === -1) return { report: null, justPromoted: false };

  const existing = reports[idx];
  const uniqueReporters = new Set(existing.reporters || [existing.reportedBy]);
  uniqueReporters.add(devId);

  const confirmationsCount = uniqueReporters.size;
  let newStatus = existing.status;
  let justPromoted = false;

  if (confirmationsCount >= existing.consensusThreshold && existing.status !== 'verified_system') {
    newStatus = 'verified_system';
    justPromoted = true;
  }

  const now = new Date().toISOString();
  const updated: CommunityReport = {
    ...existing,
    reporters: Array.from(uniqueReporters),
    confirmationsCount,
    status: newStatus,
    updatedAt: now,
    promotedToSystemAt: justPromoted ? now : existing.promotedToSystemAt
  };

  reports[idx] = updated;
  saveLocalCommunityReports(reports);

  syncReportWithApi(updated).catch(() => {});

  return { report: updated, justPromoted };
}

/**
 * Reports that an existing camera or node has been removed / decommissioned
 */
export function reportEntityRemoval(
  entityId: string,
  entityType: ReportEntityType,
  coordinates: [number, number],
  removalDate: string,
  removalReason: string,
  notes?: string
): { report: CommunityReport; justDecommissioned: boolean } {
  const reports = loadLocalCommunityReports();
  const devId = getReporterDeviceId();
  const now = new Date().toISOString();

  // Find if removal report already pending within 25m
  const existingIdx = reports.findIndex(
    r => r.id === `removal-${entityId}` || 
         (r.details.operational_status === 'Removed' && calculateDistanceMeters(r.coordinates, coordinates) <= SPATIAL_CLUSTER_RADIUS_METERS)
  );

  if (existingIdx >= 0) {
    const existing = reports[existingIdx];
    const uniqueReporters = new Set(existing.reporters || [existing.reportedBy]);
    uniqueReporters.add(devId);

    const confirmationsCount = uniqueReporters.size;
    const justDecommissioned = confirmationsCount >= COMMUNITY_CONSENSUS_THRESHOLD && existing.status !== 'removed_verified';
    const newStatus: ReportStatus = justDecommissioned ? 'removed_verified' : 'decommission_pending';

    const updated: CommunityReport = {
      ...existing,
      reporters: Array.from(uniqueReporters),
      confirmationsCount,
      status: newStatus,
      updatedAt: now,
      promotedToSystemAt: justDecommissioned ? now : existing.promotedToSystemAt,
      details: {
        ...existing.details,
        operational_status: 'Removed',
        removal_date: removalDate || now.split('T')[0],
        removal_reason: removalReason,
        notes: notes || (existing.details as any).notes
      }
    };

    reports[existingIdx] = updated;
    saveLocalCommunityReports(reports);
    syncReportWithApi(updated).catch(() => {});
    return { report: updated, justDecommissioned };
  }

  const newRemoval: CommunityReport = {
    id: `removal-${entityId}`,
    type: entityType,
    category_label: `Removed ${entityType.toUpperCase()}`,
    name: `Decommissioned Node [${entityId}]`,
    coordinates,
    reportedBy: devId,
    reporters: [devId],
    confirmationsCount: 1,
    consensusThreshold: COMMUNITY_CONSENSUS_THRESHOLD,
    status: 'decommission_pending',
    details: {
      operational_status: 'Removed',
      removal_date: removalDate || now.split('T')[0],
      removal_reason: removalReason,
      notes
    },
    createdAt: now,
    updatedAt: now
  };

  reports.push(newRemoval);
  saveLocalCommunityReports(reports);
  syncReportWithApi(newRemoval).catch(() => {});
  return { report: newRemoval, justDecommissioned: false };
}

/**
 * Builds GeoJSON FeatureCollection of community reports
 */
export function buildCommunityReportsGeoJson(
  reports: CommunityReport[],
  includePending = true
): {
  type: 'FeatureCollection';
  features: any[];
} {
  const filtered = reports.filter(r => {
    if (!includePending && r.status === 'pending_consensus') return false;
    return true;
  });

  const features = filtered.map(r => {
    const isCamera = r.type === 'camera';
    const camDetails = isCamera ? (r.details as CameraReportDetails) : null;
    const isRemoved = r.details.operational_status === 'Removed' || r.status === 'removed_verified';
    const isVerified = r.status === 'verified_system' || r.status === 'removed_verified';

    let color = '#f59e0b'; // Amber default for pending
    if (isVerified) {
      color = isRemoved ? '#ef4444' : '#10b981'; // Red for removed, Green for verified
    }

    return {
      type: 'Feature',
      id: r.id,
      properties: {
        ...r.details,
        id: r.id,
        name: r.name,
        type: 'community_report',
        report_type: r.type,
        category_label: r.category_label,
        status: r.status,
        is_verified: isVerified,
        is_pending: !isVerified,
        confirmations: r.confirmationsCount,
        consensus_threshold: r.consensusThreshold,
        consensus_progress: `${r.confirmationsCount}/${r.consensusThreshold}`,
        reported_by: r.reportedBy,
        reporters_count: r.reporters.length,
        is_historical: isRemoved,
        install_date: camDetails?.install_date,
        removal_date: camDetails?.removal_date,
        removal_reason: camDetails?.removal_reason,
        vendor: camDetails?.vendor || 'custom',
        vendor_display: camDetails?.vendor_display || camDetails?.vendor?.toUpperCase() || 'COMMUNITY OSINT',
        direction: camDetails?.direction || 0,
        color
      },
      geometry: {
        type: 'Point',
        coordinates: r.coordinates
      }
    };
  });

  return {
    type: 'FeatureCollection',
    features
  };
}

function getCategoryLabel(type: ReportEntityType, details: any): string {
  switch (type) {
    case 'camera':
      return `Surveillance / ${details.vendor ? details.vendor.toUpperCase() : 'ALPR'}`;
    case 'cell_tower':
      return 'Cell Tower / Base Station';
    case 'road_hazard':
      return 'Road Hazard / Closure';
    case 'spring':
      return 'Natural Water Spring';
    case 'toxic_site':
      return 'Toxic Site / Hazard';
    default:
      return 'Custom OSINT Entity';
  }
}

async function syncReportWithApi(report: CommunityReport): Promise<void> {
  try {
    await fetch('/api/community-reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    });
  } catch {
    // Graceful offline fallback
  }
}
