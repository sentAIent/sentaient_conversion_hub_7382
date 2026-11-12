// Sphinx Internal User Reputation & Social Score Registry
// Tracks crowdsourced contribution metrics, internal social scores, and quarantine status.
// Prevents users with consistently inaccurate reports from broadcasting to other users.

export type ReporterStatus = 'trusted' | 'active' | 'probation' | 'quarantined' | 'banned';

export interface AIEvaluationFlag {
  flaggedAt: string;
  reason: string;
  reportId?: string;
  severity: 'low' | 'medium' | 'high';
  riskScore: number;
}

export interface UserReputationProfile {
  deviceId: string;
  alias: string;
  socialScore: number; // 0 to 100
  status: ReporterStatus;
  totalSubmissions: number;
  totalVouches: number;
  confirmedAccurateReports: number;
  inaccurateReportsCount: number;
  disputedReportsCount: number;
  aiFlags: AIEvaluationFlag[];
  isPreventedFromBroadcasting: boolean; // When true, reports are shadowbanned/quarantined from other users
  firstSeenAt: string;
  lastActiveAt: string;
  notes?: string;
}

const REPUTATION_STORAGE_KEY = 'sphinx_user_reputations_v1';

// Initial seed contributors for audit baseline
const SEED_PROFILES: UserReputationProfile[] = [
  {
    deviceId: 'dev_austin_watchdog',
    alias: 'Austin Watchdog (Verified)',
    socialScore: 98,
    status: 'trusted',
    totalSubmissions: 24,
    totalVouches: 62,
    confirmedAccurateReports: 23,
    inaccurateReportsCount: 0,
    disputedReportsCount: 0,
    aiFlags: [],
    isPreventedFromBroadcasting: false,
    firstSeenAt: '2023-01-15T08:00:00.000Z',
    lastActiveAt: new Date().toISOString(),
    notes: 'Exemplary civic OSINT contributor; high spatial accuracy.'
  },
  {
    deviceId: 'dev_osint_auditor_02',
    alias: 'Travis County Sentinel',
    socialScore: 92,
    status: 'trusted',
    totalSubmissions: 18,
    totalVouches: 41,
    confirmedAccurateReports: 17,
    inaccurateReportsCount: 0,
    disputedReportsCount: 1,
    aiFlags: [],
    isPreventedFromBroadcasting: false,
    firstSeenAt: '2023-03-20T11:30:00.000Z',
    lastActiveAt: new Date().toISOString(),
    notes: 'Consistently provides verified intersection pole mount ALPR data.'
  },
  {
    deviceId: 'dev_rogue_spammer_99',
    alias: 'Suspicious Teleporter',
    socialScore: 18,
    status: 'quarantined',
    totalSubmissions: 12,
    totalVouches: 1,
    confirmedAccurateReports: 0,
    inaccurateReportsCount: 9,
    disputedReportsCount: 8,
    aiFlags: [
      {
        flaggedAt: '2024-04-10T14:15:00.000Z',
        reason: 'AI Audit: Submitted 5 fictitious ALPR camera points in open Pacific ocean waters (lat: 25.12, lon: -135.40).',
        severity: 'high',
        riskScore: 95
      },
      {
        flaggedAt: '2024-04-11T09:20:00.000Z',
        reason: 'Contradicted: Reported active Flock camera inside restricted military runway without physical presence.',
        severity: 'high',
        riskScore: 88
      }
    ],
    isPreventedFromBroadcasting: true,
    firstSeenAt: '2024-04-09T03:00:00.000Z',
    lastActiveAt: '2024-04-11T09:20:00.000Z',
    notes: 'Quarantined by AI Sentinel: multiple ocean coordinate anomalies and spam.'
  }
];

/**
 * Loads all user reputation profiles from localStorage or seed defaults
 */
export function loadAllUserReputations(): Record<string, UserReputationProfile> {
  if (typeof window === 'undefined') {
    return SEED_PROFILES.reduce((acc, p) => ({ ...acc, [p.deviceId]: p }), {});
  }

  try {
    const raw = localStorage.getItem(REPUTATION_STORAGE_KEY);
    if (!raw) {
      const initial: Record<string, UserReputationProfile> = {};
      for (const p of SEED_PROFILES) {
        initial[p.deviceId] = p;
      }
      localStorage.setItem(REPUTATION_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_PROFILES.reduce((acc, p) => ({ ...acc, [p.deviceId]: p }), {});
  }
}

/**
 * Persists all user reputation profiles to storage
 */
export function saveAllUserReputations(profiles: Record<string, UserReputationProfile>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REPUTATION_STORAGE_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.warn('[Sphinx Reputation] Failed to persist profiles', e);
  }
}

/**
 * Computes social score (0 to 100) based on accuracy, vouches, and penalties
 */
export function calculateSocialScore(profile: UserReputationProfile): number {
  if (profile.status === 'banned') return 0;

  // Base score 75 for active contributors
  let score = 75;

  // Reward confirmed accurate reports (+3 points each, up to +25)
  score += Math.min(25, profile.confirmedAccurateReports * 3);

  // Reward community vouches (+1 point for each 2 vouches, up to +15)
  score += Math.min(15, Math.floor(profile.totalVouches / 2));

  // Heavy penalty for inaccurate reports (-20 points each)
  score -= profile.inaccurateReportsCount * 20;

  // Moderate penalty for disputed reports (-8 points each)
  score -= profile.disputedReportsCount * 8;

  // Additional penalty for AI high severity flags (-15 points each)
  const highFlags = profile.aiFlags.filter(f => f.severity === 'high').length;
  score -= highFlags * 15;

  return Math.min(100, Math.max(0, score));
}

/**
 * Derives status tier from social score
 */
export function deriveStatusFromScore(score: number, currentStatus: ReporterStatus): ReporterStatus {
  if (currentStatus === 'banned') return 'banned';
  if (score >= 80) return 'trusted';
  if (score >= 50) return 'active';
  if (score >= 30) return 'probation';
  return 'quarantined';
}

/**
 * Gets or creates reputation profile for a given deviceId
 */
export function getOrCreateUserReputation(deviceId: string): UserReputationProfile {
  const all = loadAllUserReputations();
  if (all[deviceId]) {
    return all[deviceId];
  }

  const now = new Date().toISOString();
  const newProfile: UserReputationProfile = {
    deviceId,
    alias: `Reporter #${deviceId.slice(-6)}`,
    socialScore: 75,
    status: 'active',
    totalSubmissions: 0,
    totalVouches: 0,
    confirmedAccurateReports: 0,
    inaccurateReportsCount: 0,
    disputedReportsCount: 0,
    aiFlags: [],
    isPreventedFromBroadcasting: false,
    firstSeenAt: now,
    lastActiveAt: now
  };

  all[deviceId] = newProfile;
  saveAllUserReputations(all);
  return newProfile;
}

/**
 * Checks whether a user is allowed to broadcast reports to other users
 */
export function isUserBroadcastingAllowed(deviceId: string): boolean {
  const profile = getOrCreateUserReputation(deviceId);
  if (profile.status === 'banned' || profile.status === 'quarantined') return false;
  return !profile.isPreventedFromBroadcasting;
}

/**
 * Records a new submission from a user
 */
export function recordUserSubmissionEvent(deviceId: string): UserReputationProfile {
  const all = loadAllUserReputations();
  const profile = all[deviceId] || getOrCreateUserReputation(deviceId);

  profile.totalSubmissions += 1;
  profile.lastActiveAt = new Date().toISOString();
  profile.socialScore = calculateSocialScore(profile);
  profile.status = deriveStatusFromScore(profile.socialScore, profile.status);
  profile.isPreventedFromBroadcasting = profile.status === 'quarantined' || profile.status === 'banned';

  all[deviceId] = profile;
  saveAllUserReputations(all);
  return profile;
}

/**
 * Records when a user vouches for an entity
 */
export function recordUserVouchEvent(deviceId: string): UserReputationProfile {
  const all = loadAllUserReputations();
  const profile = all[deviceId] || getOrCreateUserReputation(deviceId);

  profile.totalVouches += 1;
  profile.lastActiveAt = new Date().toISOString();
  profile.socialScore = calculateSocialScore(profile);
  profile.status = deriveStatusFromScore(profile.socialScore, profile.status);
  profile.isPreventedFromBroadcasting = profile.status === 'quarantined' || profile.status === 'banned';

  all[deviceId] = profile;
  saveAllUserReputations(all);
  return profile;
}

/**
 * Records when a user's report is verified accurate by reaching consensus or other confirmations
 */
export function recordReportAccuracyVerification(authorDeviceId: string): UserReputationProfile {
  const all = loadAllUserReputations();
  const profile = all[authorDeviceId] || getOrCreateUserReputation(authorDeviceId);

  profile.confirmedAccurateReports += 1;
  profile.lastActiveAt = new Date().toISOString();
  profile.socialScore = calculateSocialScore(profile);
  profile.status = deriveStatusFromScore(profile.socialScore, profile.status);
  profile.isPreventedFromBroadcasting = profile.status === 'quarantined' || profile.status === 'banned';

  all[authorDeviceId] = profile;
  saveAllUserReputations(all);
  return profile;
}

/**
 * Flags a user for an inaccurate or spoofed report and updates their social score
 */
export function recordInaccurateReportEvent(
  deviceId: string,
  reason: string,
  reportId?: string,
  severity: 'low' | 'medium' | 'high' = 'high',
  riskScore = 80
): UserReputationProfile {
  const all = loadAllUserReputations();
  const profile = all[deviceId] || getOrCreateUserReputation(deviceId);

  profile.inaccurateReportsCount += 1;
  profile.lastActiveAt = new Date().toISOString();
  profile.aiFlags.push({
    flaggedAt: new Date().toISOString(),
    reason,
    reportId,
    severity,
    riskScore
  });

  profile.socialScore = calculateSocialScore(profile);
  profile.status = deriveStatusFromScore(profile.socialScore, profile.status);

  // If score drops below 30 or inaccurate count >= 2, prevent them from broadcasting to others
  if (profile.socialScore < 30 || profile.inaccurateReportsCount >= 2) {
    profile.status = 'quarantined';
    profile.isPreventedFromBroadcasting = true;
  }

  all[deviceId] = profile;
  saveAllUserReputations(all);
  return profile;
}

/**
 * Admin action: Manually sets status, broadcasting permission, or adjusts score
 */
export function adminUpdateUserReputation(
  deviceId: string,
  updates: {
    status?: ReporterStatus;
    socialScore?: number;
    isPreventedFromBroadcasting?: boolean;
    alias?: string;
    notes?: string;
  }
): UserReputationProfile {
  const all = loadAllUserReputations();
  const profile = all[deviceId] || getOrCreateUserReputation(deviceId);

  if (updates.status !== undefined) profile.status = updates.status;
  if (updates.socialScore !== undefined) profile.socialScore = updates.socialScore;
  if (updates.isPreventedFromBroadcasting !== undefined) {
    profile.isPreventedFromBroadcasting = updates.isPreventedFromBroadcasting;
  }
  if (updates.alias !== undefined) profile.alias = updates.alias;
  if (updates.notes !== undefined) profile.notes = updates.notes;

  profile.lastActiveAt = new Date().toISOString();

  // If set to banned or quarantined, enforce broadcasting lock
  if (profile.status === 'banned' || profile.status === 'quarantined') {
    profile.isPreventedFromBroadcasting = true;
  }

  all[deviceId] = profile;
  saveAllUserReputations(all);
  return profile;
}
