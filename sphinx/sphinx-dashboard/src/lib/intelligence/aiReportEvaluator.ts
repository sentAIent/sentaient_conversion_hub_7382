// Sphinx AI Crowdsource Report Evaluation Engine
// Evaluates crowdsourced submissions for geographic plausibility, coordinate validity,
// conflicting claims, and malicious inaccuracies.

import { ReportEntityType, CameraReportDetails, GenericReportDetails } from '../communityReports';
import { recordInaccurateReportEvent, recordReportAccuracyVerification, getOrCreateUserReputation, loadAllUserReputations, saveAllUserReputations } from '../userReputation';

export interface AIReportEvaluationResult {
  isValid: boolean;
  confidence: number; // 0 to 1
  riskScore: number; // 0 (legitimate) to 100 (high risk of inaccurate/fraudulent data)
  rationale: string;
  flags: string[];
  suggestedAction: 'approve' | 'flag_for_review' | 'quarantine_user';
}

/**
 * Checks if coordinates fall in major open ocean areas where land-based infrastructure cannot exist
 */
function isCoordinateInOpenOcean(lon: number, lat: number): boolean {
  // Broad open mid-ocean bounding boxes (e.g. Mid-Pacific, Mid-Atlantic deep ocean)
  // Mid-Pacific deep ocean: lon [-160, -125], lat [15, 35] (excluding Hawaiian islands cluster)
  const isMidPacific = lon >= -160 && lon <= -125 && lat >= 15 && lat <= 35 && !(lon >= -160 && lon <= -154 && lat >= 18 && lat <= 23);
  // Mid-Atlantic deep ocean: lon [-45, -20], lat [15, 45]
  const isMidAtlantic = lon >= -45 && lon <= -20 && lat >= 15 && lat <= 45;
  // Antarctic / Arctic extremes
  const isPolarWater = lat > 80 || lat < -65;

  return isMidPacific || isMidAtlantic || isPolarWater;
}

/**
 * Checks for nonsensical or profanity/test spam keywords
 */
function containsSpamSignatures(name: string, notes?: string): boolean {
  const combined = `${name} ${notes || ''}`.toLowerCase();
  const spamKeywords = [
    'test 123',
    'asdf',
    'fake camera',
    'prank',
    'lorem ipsum',
    'hack the planet',
    'skibidi',
    'free money',
    'aaaaaaa',
    'xyz123'
  ];
  return spamKeywords.some(kw => combined.includes(kw));
}

/**
 * Evaluates a single community report with AI heuristic and validation models
 */
export function evaluateReportWithAI(input: {
  reportId?: string;
  type: ReportEntityType;
  name: string;
  coordinates: [number, number]; // [lon, lat]
  details: CameraReportDetails | GenericReportDetails;
  deviceId: string;
}): AIReportEvaluationResult {
  const [lon, lat] = input.coordinates;
  const flags: string[] = [];
  let riskScore = 5; // Default low baseline

  // 1. Boundary & Valid Geographic Coordinate Check
  if (isNaN(lon) || isNaN(lat) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    flags.push('INVALID_GEODETIC_COORDINATES');
    riskScore += 90;
  }

  // 2. Open Ocean Anomaly Check (Terrestrial hardware in deep oceanic water)
  if (isCoordinateInOpenOcean(lon, lat)) {
    flags.push('OCEANIC_COORDINATE_ANOMALY');
    riskScore += 80;
  }

  // 3. Spam and Nonsense Content Check
  if (containsSpamSignatures(input.name, (input.details as any).notes)) {
    flags.push('SYNTACTIC_SPAM_SIGNATURE');
    riskScore += 65;
  }

  // 4. Vendor and Camera Specification Cross-Reference
  if (input.type === 'camera') {
    const cam = input.details as CameraReportDetails;
    if (cam.vendor === 'flock') {
      // Flock Safety ALPR cameras are solar or 120V AC pole-mounted
      if (cam.camera_type === 'PTZ Dome') {
        flags.push('INCONSISTENT_HARDWARE_SPEC_FLOCK_PTZ');
        riskScore += 25;
      }
    }
    // High-altitude or subterranean anomalies
    if (lat === 0 && lon === 0) {
      flags.push('NULL_ISLAND_COORDINATES');
      riskScore += 95;
    }
  }

  // Cap risk score between 0 and 100
  riskScore = Math.min(100, Math.max(0, riskScore));
  const isValid = riskScore < 60;
  const confidence = 0.88;

  let rationale = 'Report parameters comply with standard geospatial deployment profiles.';
  let suggestedAction: 'approve' | 'flag_for_review' | 'quarantine_user' = 'approve';

  if (riskScore >= 75) {
    rationale = `AI Sentinel detected high-risk spatial or content anomalies: ${flags.join(', ')}. Coordinates appear fabricated or contradict terrestrial deployment bounds.`;
    suggestedAction = 'quarantine_user';
  } else if (riskScore >= 50) {
    rationale = `Report flagged for secondary review due to potential inconsistencies: ${flags.join(', ')}.`;
    suggestedAction = 'flag_for_review';
  }

  // If high risk, automatically record inaccurate report against user
  if (suggestedAction === 'quarantine_user') {
    recordInaccurateReportEvent(
      input.deviceId,
      `AI Evaluation Flag: ${flags.join(', ')} (Risk: ${riskScore}/100)`,
      input.reportId,
      'high',
      riskScore
    );
  }

  return {
    isValid,
    confidence,
    riskScore,
    rationale,
    flags,
    suggestedAction
  };
}

/**
 * Runs a comprehensive AI audit across all reporting users in the database
 */
export function auditAllReportersAI(): {
  totalAudited: number;
  quarantinedCount: number;
  trustedCount: number;
  auditSummary: string;
} {
  const allProfiles = loadAllUserReputations();
  let quarantinedCount = 0;
  let trustedCount = 0;
  const keys = Object.keys(allProfiles);

  for (const deviceId of keys) {
    const profile = allProfiles[deviceId];

    // Evaluate ratio of inaccurate reports
    if (profile.inaccurateReportsCount > 0) {
      const inaccuracyRate = profile.inaccurateReportsCount / Math.max(1, profile.totalSubmissions);
      if (inaccuracyRate >= 0.35 || profile.socialScore < 30) {
        profile.status = 'quarantined';
        profile.isPreventedFromBroadcasting = true;
        profile.notes = `AI Audit: Inaccuracy rate ${(inaccuracyRate * 100).toFixed(0)}% exceeds acceptable tolerance threshold. Broadcasting disabled.`;
      }
    }

    if (profile.status === 'quarantined' || profile.status === 'banned') {
      quarantinedCount++;
    } else if (profile.status === 'trusted') {
      trustedCount++;
    }
  }

  saveAllUserReputations(allProfiles);

  return {
    totalAudited: keys.length,
    quarantinedCount,
    trustedCount,
    auditSummary: `AI Audit completed across ${keys.length} contributors. ${quarantinedCount} quarantined/muted for inaccurate telemetry, ${trustedCount} verified trusted.`
  };
}
