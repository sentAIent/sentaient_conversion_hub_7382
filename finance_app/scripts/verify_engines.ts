/**
 * Comprehensive Automated Verification Suite for Liquid Core Engines
 */

import { ImmutableLedger } from '../src/lib/immutableLedger';
import { ReconciliationEngine, RawFeedTransaction, InternalLedgerCandidate } from '../src/lib/reconciliationEngine';
import { ASC606Engine, ASC842Engine } from '../src/lib/ascAccounting';
import { Form1099DAEngine, DigitalAssetTransaction } from '../src/lib/tax/form1099DA';
import { Section174Engine, RDExpenseItem } from '../src/lib/tax/section174Engine';
import { EconomicNexusRadar, StateSalesActivity } from '../src/lib/tax/economicNexusRadar';
import { SanctionsSentry } from '../src/lib/compliance/sanctionsSentry';
import { MerkleSumTreeSolvency, UserBalanceLeaf } from '../src/lib/zk/solvencyProof';

function runAssertions() {
  console.log('=== RUNNING LIQUID ENGINE VERIFICATION ===\n');

  // 1. Immutable Ledger Test
  console.log('1. Testing Triple-Entry Immutable Ledger...');
  const ledger = new ImmutableLedger();
  const e1 = ledger.recordEntry({
    id: 'tx-1',
    reference: 'REF-001',
    description: 'Initial Capital Injection',
    entityId: 'ent-main',
    postings: [
      { accountId: '101', accountName: 'Cash', accountType: 'ASSET', debit: 50000, credit: 0 },
      { accountId: '301', accountName: 'Common Stock', accountType: 'EQUITY', debit: 0, credit: 50000 }
    ]
  });
  const e2 = ledger.recordEntry({
    id: 'tx-2',
    reference: 'REF-002',
    description: 'Cloud Infrastructure',
    entityId: 'ent-main',
    postings: [
      { accountId: '501', accountName: 'Server Opex', accountType: 'EXPENSE', debit: 2000, credit: 0 },
      { accountId: '101', accountName: 'Cash', accountType: 'ASSET', debit: 0, credit: 2000 }
    ]
  });

  const integrity1 = ledger.verifyLedgerIntegrity();
  if (!integrity1.isValid) throw new Error('Ledger integrity check failed on clean data');
  console.log('   ✓ Merkle DAG chain valid (2 entries verified).');

  // 2. Reconciliation Engine Test
  console.log('2. Testing Continuous Close Reconciliation Engine...');
  const feeds: RawFeedTransaction[] = [
    { id: 'f-1', source: 'PLAID', date: '2026-11-15T12:00:00Z', amount: 5000, currency: 'USD', description: 'Stripe SaaS Payout', reference: 'STRIPE-5000' }
  ];
  const candidates: InternalLedgerCandidate[] = [
    { id: 'c-1', date: '2026-11-15T10:00:00Z', amount: 5000, description: 'Stripe SaaS Payout', reference: 'STRIPE-5000', entityId: 'ent-main' }
  ];
  const recon = ReconciliationEngine.reconcile(feeds, candidates);
  if (recon.reconciliationRatePercent !== 100 || recon.exactMatchesCount !== 1) {
    throw new Error('Reconciliation failed on exact match test');
  }
  console.log('   ✓ 100% reconciliation rate on exact match candidate.');

  // 3. ASC 606 & 842 GAAP Standards
  console.log('3. Testing ASC 606 & ASC 842 Accounting...');
  const schedule606 = ASC606Engine.generateDeferredRevenueSchedule(60000, '2026-01', 12);
  if (schedule606.length !== 12 || schedule606[0].recognizedRevenue !== 5000) {
    throw new Error('ASC 606 deferred revenue waterfall calculation incorrect');
  }
  console.log('   ✓ ASC 606 12-month waterfall correctly recognized $5,000/mo.');

  const lease842 = ASC842Engine.calculateLease(3000, 24, 0.05, 100000, 36);
  if (lease842.presentValueOfLeasePayments <= 0 || lease842.schedule.length !== 24) {
    throw new Error('ASC 842 lease calculation failed');
  }
  console.log(`   ✓ ASC 842 ROU Asset PV computed: $${lease842.initialRouAsset.toLocaleString()}`);

  // 4. Form 1099-DA & 8949 Engine
  console.log('4. Testing Form 1099-DA Digital Asset Engine...');
  const cryptoDispositions: DigitalAssetTransaction[] = [
    { id: 'd-1', assetSymbol: 'ETH', assetName: 'Ethereum', units: 2, dateAcquired: '2025-01-01', dateSoldOrDisposed: '2026-06-01', grossProceedsUSD: 7000, costBasisUSD: 4000, brokerOrWalletAddress: '0xabc' }
  ];
  const taxSummary = Form1099DAEngine.processDispositions(cryptoDispositions, 2026);
  if (taxSummary.totalRealizedNetGain !== 3000 || taxSummary.longTermRows.length !== 1) {
    throw new Error('Form 1099-DA disposition gain or holding period term calculation incorrect');
  }
  console.log('   ✓ Form 1099-DA & Form 8949 processed $3,000 Long-Term gain correctly.');

  // 5. Section 174 & Form 6765
  console.log('5. Testing Section 174 & Form 6765 R&D Credit Engine...');
  const rdList: RDExpenseItem[] = [
    { id: 'rd-1', category: 'DOMESTIC_WAGES', description: 'Engineer', amount: 100000, taxYear: 2026 }
  ];
  const sec174 = Section174Engine.calculateSection174(rdList, 2026);
  if (sec174.year1DomesticDeduction !== 10000) { // 10% mid-year convention
    throw new Error('Section 174 mid-year deduction incorrect');
  }
  console.log('   ✓ Section 174 10% Year-1 deduction computed ($10,000 of $100,000).');

  // 6. Economic Nexus Radar
  console.log('6. Testing 50-State Economic Nexus Radar...');
  const stateData: StateSalesActivity[] = [
    { stateCode: 'CA', currentRevenueUSD: 550000, currentTransactionCount: 200 }
  ];
  const nexus = EconomicNexusRadar.evaluateNexus(stateData);
  const ca = nexus.find(n => n.stateCode === 'CA');
  if (!ca || !ca.isNexusTriggered || ca.status !== 'TRIGGERED') {
    throw new Error('California economic nexus trigger failed to fire on $550k revenue');
  }
  console.log('   ✓ California economic nexus triggered correctly on $550k (> $500k threshold).');

  // 7. OFAC Sanctions Screening
  console.log('7. Testing OFAC Sanctions Sentry...');
  const tornadoCashAddr = '0x8576acc5c05d6ce0b48b3b3370182306984e0822';
  const screenSanctioned = SanctionsSentry.screenAddress(tornadoCashAddr);
  if (!screenSanctioned.isSanctioned || screenSanctioned.riskScore !== 100) {
    throw new Error('OFAC sanctions sentry failed to flag Tornado Cash address');
  }
  console.log('   ✓ OFAC Sanctions Sentry accurately blocked Tornado Cash contract (Risk 100/100).');

  // 8. ZK Solvency & Merkle Sum Tree
  console.log('8. Testing Zero-Knowledge Solvency Merkle Sum Tree...');
  const users: UserBalanceLeaf[] = [
    { userId: 'u-1', balanceUSD: 1000, nonce: 'n-1' },
    { userId: 'u-2', balanceUSD: 2500, nonce: 'n-2' }
  ];
  const proof = MerkleSumTreeSolvency.generateInclusionProof(users[0], users);
  const isProofValid = MerkleSumTreeSolvency.verifyProof(proof, 'n-1');
  if (!isProofValid) {
    throw new Error('ZK Solvency proof verification failed');
  }
  console.log('   ✓ ZK Merkle Sum Tree verified inclusion proof mathematically.');

  console.log('\n======================================================');
  console.log('ALL LIQUID CORE ENGINES TESTED & VERIFIED FLAWLESSLY!');
  console.log('======================================================');
}

runAssertions();
