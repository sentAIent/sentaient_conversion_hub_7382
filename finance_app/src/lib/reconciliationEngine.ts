/**
 * Continuous Close & Multi-Source Reconciliation Engine
 * 
 * Provides automated, confidence-scored matching between bank feed line items,
 * payment processor charges (Stripe, Square), on-chain transactions, and internal ledger entries.
 */

export interface RawFeedTransaction {
  id: string;
  source: 'PLAID' | 'TELLER' | 'STRIPE' | 'BLOCKCHAIN' | 'MANUAL';
  date: string; // ISO 8601
  amount: number; // positive = credit/deposit, negative = debit/spend
  currency: string;
  description: string;
  reference?: string;
  metadata?: Record<string, any>;
}

export interface InternalLedgerCandidate {
  id: string;
  date: string;
  amount: number;
  description: string;
  reference: string;
  entityId: string;
}

export type MatchStatus = 'EXACT' | 'PROBABLE' | 'UNMATCHED';

export interface ReconciliationMatch {
  feedTransactionId: string;
  feedTransaction: RawFeedTransaction;
  internalCandidateId?: string;
  internalCandidate?: InternalLedgerCandidate;
  confidenceScore: number; // 0.0 to 1.0
  status: MatchStatus;
  reconciliationRule: string;
  suggestedAction: 'AUTO_APPROVE' | 'REQUIRES_REVIEW' | 'CREATE_LEDGER_ENTRY';
}

export interface ReconciliationSummary {
  totalFeedItems: number;
  exactMatchesCount: number;
  probableMatchesCount: number;
  unmatchedCount: number;
  matchedVolumeUSD: number;
  unmatchedVolumeUSD: number;
  reconciliationRatePercent: number;
  matches: ReconciliationMatch[];
}

// Simple Levenshtein distance for fuzzy merchant matching
function similarityScore(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0.0;
  if (s1.includes(s2) || s2.includes(s1)) return 0.85;

  const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  const distance = track[s2.length][s1.length];
  const maxLen = Math.max(s1.length, s2.length);
  return Math.max(0, 1 - distance / maxLen);
}

export class ReconciliationEngine {
  /**
   * Reconciles a batch of raw external transactions against internal ledger records
   */
  public static reconcile(
    feedItems: RawFeedTransaction[],
    ledgerCandidates: InternalLedgerCandidate[]
  ): ReconciliationSummary {
    const availableCandidates = [...ledgerCandidates];
    const matches: ReconciliationMatch[] = [];

    let exactCount = 0;
    let probableCount = 0;
    let unmatchedCount = 0;
    let matchedVolume = 0;
    let unmatchedVolume = 0;

    for (const feed of feedItems) {
      const feedTime = new Date(feed.date).getTime();
      let bestCandidateIdx = -1;
      let highestScore = 0;
      let matchedRule = 'NO_MATCH';

      for (let i = 0; i < availableCandidates.length; i++) {
        const candidate = availableCandidates[i];
        const candidateTime = new Date(candidate.date).getTime();
        const daysDiff = Math.abs(feedTime - candidateTime) / (1000 * 60 * 60 * 24);

        // Rule 1: Exact reference code & identical amount
        if (feed.reference && candidate.reference && feed.reference === candidate.reference) {
          if (Math.abs(feed.amount - candidate.amount) < 0.01) {
            bestCandidateIdx = i;
            highestScore = 1.0;
            matchedRule = 'EXACT_REFERENCE_AND_AMOUNT';
            break;
          }
        }

        // Rule 2: Exact amount and close date (within 3 calendar days)
        const amountDiff = Math.abs(feed.amount - candidate.amount);
        if (amountDiff < 0.01 && daysDiff <= 3) {
          const sim = similarityScore(feed.description, candidate.description);
          // Combined confidence
          const score = 0.70 + (sim * 0.25) + ((3 - daysDiff) / 3 * 0.05);
          if (score > highestScore) {
            highestScore = score;
            bestCandidateIdx = i;
            matchedRule = sim > 0.6 ? 'EXACT_AMOUNT_CLOSE_DATE_NAME' : 'EXACT_AMOUNT_CLOSE_DATE';
          }
        }

        // Rule 3: Fuzzy description match and exact amount
        if (amountDiff < 0.01 && daysDiff <= 7) {
          const sim = similarityScore(feed.description, candidate.description);
          if (sim > 0.75) {
            const score = 0.65 + (sim * 0.30);
            if (score > highestScore) {
              highestScore = score;
              bestCandidateIdx = i;
              matchedRule = 'FUZZY_NAME_EXACT_AMOUNT';
            }
          }
        }
      }

      if (bestCandidateIdx >= 0 && highestScore >= 0.70) {
        const candidate = availableCandidates[bestCandidateIdx];
        // Consume candidate so it cannot match twice
        availableCandidates.splice(bestCandidateIdx, 1);

        const isExact = highestScore >= 0.95;
        if (isExact) exactCount++;
        else probableCount++;

        matchedVolume += Math.abs(feed.amount);

        matches.push({
          feedTransactionId: feed.id,
          feedTransaction: feed,
          internalCandidateId: candidate.id,
          internalCandidate: candidate,
          confidenceScore: Number(highestScore.toFixed(3)),
          status: isExact ? 'EXACT' : 'PROBABLE',
          reconciliationRule: matchedRule,
          suggestedAction: isExact ? 'AUTO_APPROVE' : 'REQUIRES_REVIEW'
        });
      } else {
        unmatchedCount++;
        unmatchedVolume += Math.abs(feed.amount);

        matches.push({
          feedTransactionId: feed.id,
          feedTransaction: feed,
          confidenceScore: 0,
          status: 'UNMATCHED',
          reconciliationRule: 'NONE',
          suggestedAction: 'CREATE_LEDGER_ENTRY'
        });
      }
    }

    const total = feedItems.length;
    const reconciledItems = exactCount + probableCount;
    const rate = total > 0 ? (reconciledItems / total) * 100 : 100;

    return {
      totalFeedItems: total,
      exactMatchesCount: exactCount,
      probableMatchesCount: probableCount,
      unmatchedCount,
      matchedVolumeUSD: Number(matchedVolume.toFixed(2)),
      unmatchedVolumeUSD: Number(unmatchedVolume.toFixed(2)),
      reconciliationRatePercent: Number(rate.toFixed(1)),
      matches
    };
  }
}
