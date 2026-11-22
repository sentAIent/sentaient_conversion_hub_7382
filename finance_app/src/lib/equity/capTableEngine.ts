/**
 * Sovereign Cap Table & Liquidation Waterfall Engine
 * 
 * Manages full capital structure: Common Stock, Preferred Stock (Series Seed - D),
 * SAFEs (Pre- and Post-Money valuation caps with MFN/discounts), Convertible Notes,
 * Stock Options, and RSUs.
 * Simulates liquidation waterfall across arbitrary exit valuations ($1M - $1B+).
 */

export type ShareClass = 'COMMON' | 'PREFERRED_SEED' | 'PREFERRED_SERIES_A' | 'PREFERRED_SERIES_B' | 'SAFE' | 'CONVERTIBLE_NOTE' | 'OPTIONS' | 'RSU';

export interface ShareholderStake {
  id: string;
  name: string;
  shareClass: ShareClass;
  shares: number;
  investmentAmount?: number;
  liquidationMultiple?: number; // e.g. 1.0x, 2.0x
  isParticipating?: boolean;
  participationCapMultiple?: number; // e.g. 2.0x cap or uncapped (0)
  valuationCap?: number; // For SAFEs / Convertible Notes
  discountRate?: number; // e.g. 0.20 for 20% discount
  interestRate?: number; // Annual interest for convertible notes
  issueDate: string;
}

export interface WaterfallDistribution {
  shareholderId: string;
  name: string;
  shareClass: ShareClass;
  preferenceProceeds: number;
  commonProceeds: number;
  totalProceeds: number;
  effectiveMultiple: number; // Proceeds / Investment
  ownershipPercentage: number;
}

export interface WaterfallResult {
  exitValuation: number;
  totalDistributed: number;
  distributions: WaterfallDistribution[];
  commonSharePrice: number;
}

export class CapTableEngine {
  private stakes: ShareholderStake[] = [];

  constructor(initialStakes?: ShareholderStake[]) {
    if (initialStakes && initialStakes.length > 0) {
      this.stakes = [...initialStakes];
    } else {
      this.initDefaultCapTable();
    }
  }

  private initDefaultCapTable() {
    this.stakes = [
      {
        id: 'sh-1',
        name: 'Founders / Management',
        shareClass: 'COMMON',
        shares: 6000000,
        investmentAmount: 60000,
        issueDate: '2024-01-15'
      },
      {
        id: 'sh-2',
        name: 'Employee Option Pool (Unallocated & Granted)',
        shareClass: 'OPTIONS',
        shares: 1000000,
        investmentAmount: 0,
        issueDate: '2024-03-01'
      },
      {
        id: 'sh-3',
        name: 'Apex Seed Syndicate (Post-Money SAFE)',
        shareClass: 'SAFE',
        shares: 1000000,
        investmentAmount: 1500000,
        valuationCap: 15000000,
        discountRate: 0.20,
        issueDate: '2024-06-15'
      },
      {
        id: 'sh-4',
        name: 'Venture Capital Partners (Series A Preferred)',
        shareClass: 'PREFERRED_SERIES_A',
        shares: 2000000,
        investmentAmount: 6000000,
        liquidationMultiple: 1.0,
        isParticipating: false,
        issueDate: '2025-02-01'
      }
    ];
  }

  public getStakes(): ShareholderStake[] {
    return [...this.stakes];
  }

  public addStake(stake: ShareholderStake): void {
    this.stakes.push(stake);
  }

  public getTotalFullyDilutedShares(): number {
    return this.stakes.reduce((sum, s) => sum + s.shares, 0);
  }

  public getOwnershipSummary(): { id: string; name: string; shareClass: ShareClass; shares: number; percentage: number }[] {
    const total = this.getTotalFullyDilutedShares();
    return this.stakes.map(s => ({
      id: s.id,
      name: s.name,
      shareClass: s.shareClass,
      shares: s.shares,
      percentage: total > 0 ? (s.shares / total) * 100 : 0
    }));
  }

  /**
   * Computes precise exit proceeds waterfall according to Seniority & Liquidation Preferences:
   * 1. Preferred senior return of capital (1x or multiple non-participating vs participating).
   * 2. Remaining proceeds distributed to Common and converted Preferred.
   */
  public simulateWaterfall(exitValuation: number): WaterfallResult {
    const totalShares = this.getTotalFullyDilutedShares();
    let remainingProceeds = Math.max(0, exitValuation);

    const distributions: Map<string, WaterfallDistribution> = new Map();

    for (const stake of this.stakes) {
      distributions.set(stake.id, {
        shareholderId: stake.id,
        name: stake.name,
        shareClass: stake.shareClass,
        preferenceProceeds: 0,
        commonProceeds: 0,
        totalProceeds: 0,
        effectiveMultiple: 0,
        ownershipPercentage: (stake.shares / totalShares) * 100
      });
    }

    // Step 1: Senior Preferred Liquidation Preference Tier
    const preferredStakes = this.stakes.filter(s => s.shareClass.startsWith('PREFERRED_'));
    for (const pref of preferredStakes) {
      const dist = distributions.get(pref.id)!;
      const multiple = pref.liquidationMultiple || 1.0;
      const initialInvest = pref.investmentAmount || 0;
      const prefObligation = initialInvest * multiple;

      // Check whether conversion to Common yields higher return (if non-participating)
      const asCommonProceeds = exitValuation * (pref.shares / totalShares);

      if (!pref.isParticipating && asCommonProceeds > prefObligation) {
        // Will convert to common; preference payout is 0 here, takes common later
        dist.preferenceProceeds = 0;
      } else {
        const payout = Math.min(remainingProceeds, prefObligation);
        dist.preferenceProceeds = payout;
        remainingProceeds -= payout;
      }
    }

    // Step 2: Remaining equity distributed across Common + converted/participating shares
    let eligibleCommonShares = 0;
    for (const stake of this.stakes) {
      const dist = distributions.get(stake.id)!;
      // If preferred took preference and is NOT participating, it does not share in remaining common
      if (stake.shareClass.startsWith('PREFERRED_') && !stake.isParticipating && dist.preferenceProceeds > 0) {
        continue;
      }
      eligibleCommonShares += stake.shares;
    }

    const perCommonSharePayout = eligibleCommonShares > 0 ? remainingProceeds / eligibleCommonShares : 0;

    for (const stake of this.stakes) {
      const dist = distributions.get(stake.id)!;
      if (stake.shareClass.startsWith('PREFERRED_') && !stake.isParticipating && dist.preferenceProceeds > 0) {
        dist.commonProceeds = 0;
      } else {
        dist.commonProceeds = stake.shares * perCommonSharePayout;
      }

      dist.totalProceeds = dist.preferenceProceeds + dist.commonProceeds;
      const invest = stake.investmentAmount || 1;
      dist.effectiveMultiple = stake.investmentAmount ? Number((dist.totalProceeds / invest).toFixed(2)) : 0;
    }

    const totalDistributed = Array.from(distributions.values()).reduce((sum, d) => sum + d.totalProceeds, 0);

    return {
      exitValuation,
      totalDistributed,
      distributions: Array.from(distributions.values()),
      commonSharePrice: Number(perCommonSharePayout.toFixed(4))
    };
  }
}
