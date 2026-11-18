'use client';

import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight, 
  FileCheck2,
  Lock,
  Layers
} from 'lucide-react';
import { ImmutableLedger, JournalEntry } from '@/lib/immutableLedger';
import { ReconciliationEngine, RawFeedTransaction, InternalLedgerCandidate } from '@/lib/reconciliationEngine';
import { ASC606Engine, ASC842Engine } from '@/lib/ascAccounting';

export default function ContinuousCloseView() {
  const [activeTab, setActiveTab] = useState<'RECONCILIATION' | 'LEDGER_VERIFY' | 'ASC_ACCOUNTING'>('RECONCILIATION');
  const [isVerifying, setIsVerifying] = useState(false);

  // Sample data for demonstration
  const rawFeeds: RawFeedTransaction[] = [
    { id: 'feed-1', source: 'PLAID', date: '2026-11-15T10:00:00Z', amount: 15400.00, currency: 'USD', description: 'Stripe Payout - Enterprise Subscription', reference: 'STRIPE-PAY-9821' },
    { id: 'feed-2', source: 'TELLER', date: '2026-11-14T14:20:00Z', amount: -2450.00, currency: 'USD', description: 'AWS Cloud Services Hosting', reference: 'INV-AWS-8821' },
    { id: 'feed-3', source: 'STRIPE', date: '2026-11-12T09:15:00Z', amount: 8900.00, currency: 'USD', description: 'Acme Corp Annual SaaS License', reference: 'INV-1092' },
    { id: 'feed-4', source: 'PLAID', date: '2026-11-10T11:45:00Z', amount: -350.00, currency: 'USD', description: 'GitHub Enterprise Copilot Seats', reference: 'GH-OCT-990' },
    { id: 'feed-5', source: 'PLAID', date: '2026-11-08T16:00:00Z', amount: -18500.00, currency: 'USD', description: 'Unmatched Wire Transfer to Escrow', reference: 'WIRE-UNKNOWN-01' },
  ];

  const ledgerCandidates: InternalLedgerCandidate[] = [
    { id: 'cand-1', date: '2026-11-15T10:00:00Z', amount: 15400.00, description: 'Stripe Payout - Enterprise Subscription', reference: 'STRIPE-PAY-9821', entityId: 'ent-1' },
    { id: 'cand-2', date: '2026-11-14T12:00:00Z', amount: -2450.00, description: 'Amazon Web Services Cloud Infrastructure', reference: 'INV-AWS-8821', entityId: 'ent-1' },
    { id: 'cand-3', date: '2026-11-11T18:00:00Z', amount: 8900.00, description: 'Acme Corp Annual SaaS License', reference: 'INV-1092', entityId: 'ent-1' },
    { id: 'cand-4', date: '2026-11-10T08:00:00Z', amount: -350.00, description: 'GitHub Enterprise Seats', reference: 'GH-OCT-990', entityId: 'ent-1' },
  ];

  const reconSummary = useMemo(() => {
    return ReconciliationEngine.reconcile(rawFeeds, ledgerCandidates);
  }, []);

  // Demo ledger with chained entries
  const demoLedger = useMemo(() => {
    const ledger = new ImmutableLedger();
    ledger.recordEntry({
      id: 'tx-001',
      reference: 'INV-1092',
      description: 'Acme Corp Annual Contract',
      entityId: 'ent-1',
      timestamp: '2026-11-11T18:00:00Z',
      postings: [
        { accountId: '101', accountName: 'Cash (Chase Business)', accountType: 'ASSET', debit: 8900, credit: 0 },
        { accountId: '401', accountName: 'Subscription Revenue', accountType: 'REVENUE', debit: 0, credit: 8900 }
      ]
    });
    ledger.recordEntry({
      id: 'tx-002',
      reference: 'INV-AWS-8821',
      description: 'AWS Server Hosting',
      entityId: 'ent-1',
      timestamp: '2026-11-14T12:00:00Z',
      postings: [
        { accountId: '501', accountName: 'Cloud Hosting Expense', accountType: 'EXPENSE', debit: 2450, credit: 0 },
        { accountId: '101', accountName: 'Cash (Chase Business)', accountType: 'ASSET', debit: 0, credit: 2450 }
      ]
    });
    return ledger;
  }, []);

  const [ledgerIntegrity, setLedgerIntegrity] = useState(demoLedger.verifyLedgerIntegrity());

  const asc606Waterfall = useMemo(() => {
    return ASC606Engine.generateDeferredRevenueSchedule(120000, '2026-11', 12);
  }, []);

  const asc842Analysis = useMemo(() => {
    return ASC842Engine.calculateLease(4500, 36, 0.065, 180000, 60);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 text-sm font-semibold tracking-wide uppercase mb-1">
            <Lock size={16} />
            <span>Continuous Close & Audit Verification</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Continuous Financial Close</h1>
          <p className="text-slate-400 text-sm mt-1">
            Multi-source bank feed reconciliation, cryptographic triple-entry hash verification, and ASC 606/842 automation.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('RECONCILIATION')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'RECONCILIATION' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Machine Reconciliation
          </button>
          <button
            onClick={() => setActiveTab('LEDGER_VERIFY')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'LEDGER_VERIFY' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Merkle Ledger Hash Verification
          </button>
          <button
            onClick={() => setActiveTab('ASC_ACCOUNTING')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'ASC_ACCOUNTING' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            ASC 606 / 842 Waterfalls
          </button>
        </div>
      </div>

      {/* TAB 1: RECONCILIATION */}
      {activeTab === 'RECONCILIATION' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <span className="text-xs text-slate-400 uppercase font-semibold">Auto-Reconcile Rate</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{reconSummary.reconciliationRatePercent}%</div>
              <p className="text-xs text-slate-500 mt-1">{reconSummary.exactMatchesCount + reconSummary.probableMatchesCount} of {reconSummary.totalFeedItems} items matched</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <span className="text-xs text-slate-400 uppercase font-semibold">Matched Volume</span>
              <div className="text-2xl font-bold text-white mt-1">${reconSummary.matchedVolumeUSD.toLocaleString()}</div>
              <p className="text-xs text-slate-500 mt-1">Verified with banking receipts</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <span className="text-xs text-slate-400 uppercase font-semibold">Exceptions Queue</span>
              <div className="text-2xl font-bold text-amber-400 mt-1">{reconSummary.unmatchedCount}</div>
              <p className="text-xs text-slate-500 mt-1">${reconSummary.unmatchedVolumeUSD.toLocaleString()} pending allocation</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <span className="text-xs text-slate-400 uppercase font-semibold">Audit Status</span>
              <div className="text-2xl font-bold text-blue-400 mt-1 flex items-center gap-1.5">
                <CheckCircle2 size={22} className="text-emerald-400" />
                <span>Continuous</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Refreshed every 6 hours</p>
            </div>
          </div>

          {/* Reconciliation Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-semibold text-white">Live Feed Reconciliation Stream</h3>
              <span className="text-xs text-slate-400">Plaid / Teller / Stripe Live Synchronized</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/70 text-xs text-slate-400 uppercase border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Date & Source</th>
                    <th className="py-3 px-4">Feed Description</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Ledger Candidate</th>
                    <th className="py-3 px-4">Confidence</th>
                    <th className="py-3 px-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  {reconSummary.matches.map(m => (
                    <tr key={m.feedTransactionId} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-white">{m.feedTransaction.date.slice(0, 10)}</div>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">{m.feedTransaction.source}</span>
                      </td>
                      <td className="py-3 px-4 font-sans text-slate-200">
                        {m.feedTransaction.description}
                        {m.feedTransaction.reference && (
                          <div className="text-[11px] text-slate-500 font-mono">Ref: {m.feedTransaction.reference}</div>
                        )}
                      </td>
                      <td className={`py-3 px-4 font-semibold ${m.feedTransaction.amount >= 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                        {m.feedTransaction.amount >= 0 ? '+' : ''}${m.feedTransaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 font-sans">
                        {m.internalCandidate ? (
                          <div className="text-slate-200">
                            {m.internalCandidate.description}
                            <div className="text-[11px] text-slate-500 font-mono">ID: {m.internalCandidate.id}</div>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic">No candidate found</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {m.confidenceScore > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${m.confidenceScore > 0.9 ? 'bg-emerald-400' : 'bg-blue-400'}`}
                                style={{ width: `${m.confidenceScore * 100}%` }}
                              />
                            </div>
                            <span>{(m.confidenceScore * 100).toFixed(0)}%</span>
                          </div>
                        ) : (
                          <span className="text-slate-500">0%</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {m.status === 'EXACT' && (
                          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[11px]">
                            <CheckCircle2 size={12} /> Auto-Matched
                          </span>
                        )}
                        {m.status === 'PROBABLE' && (
                          <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-[11px]">
                            <RefreshCw size={12} /> Review Match
                          </span>
                        )}
                        {m.status === 'UNMATCHED' && (
                          <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded text-[11px]">
                            <AlertTriangle size={12} /> Unallocated Wire
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEDGER MERKLE VERIFICATION */}
      {activeTab === 'LEDGER_VERIFY' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck size={22} className="text-emerald-400" />
                  <span>Triple-Entry Cryptographic Ledger Status</span>
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Every transaction is hashed and chained to the previous record in a Merkle DAG. Any alteration invalidates downstream hashes.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsVerifying(true);
                  setTimeout(() => {
                    setLedgerIntegrity(demoLedger.verifyLedgerIntegrity());
                    setIsVerifying(false);
                  }, 600);
                }}
                disabled={isVerifying}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all"
              >
                <RefreshCw size={16} className={isVerifying ? 'animate-spin' : ''} />
                <span>{isVerifying ? 'Computing Hashes...' : 'Re-verify Entire Ledger'}</span>
              </button>
            </div>

            {ledgerIntegrity.isValid ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center gap-3 text-emerald-300 text-sm">
                <CheckCircle2 size={24} className="text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Cryptographic Integrity Confirmed: </span>
                  All {ledgerIntegrity.totalEntries} journal entries verified with 0 broken links and balanced debits/credits. Audit trail is mathematically tamper-evident.
                </div>
              </div>
            ) : (
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl flex items-center gap-3 text-rose-300 text-sm">
                <AlertTriangle size={24} className="text-rose-400 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Tampering Detected: </span>
                  {ledgerIntegrity.reason}
                </div>
              </div>
            )}

            {/* Chained Entries Explorer */}
            <div className="mt-6 space-y-3 font-mono text-xs">
              {demoLedger.getEntries().map((entry, idx) => (
                <div key={entry.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="font-bold text-blue-400">#00{idx + 1} - {entry.reference}</span>
                    <span>{entry.timestamp}</span>
                  </div>
                  <div className="text-slate-300 font-sans">{entry.description}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-500">Prev Hash: </span>
                      <span className="text-slate-400">{entry.previousHash.slice(0, 24)}...</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Entry Hash: </span>
                      <span className="text-emerald-400 font-semibold">{entry.entryHash.slice(0, 24)}...</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ASC 606 & 842 WATERFALLS */}
      {activeTab === 'ASC_ACCOUNTING' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ASC 606 Deferred Revenue Waterfall */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <div>
              <div className="text-blue-400 text-xs font-semibold uppercase">GAAP Revenue Recognition</div>
              <h3 className="text-lg font-bold text-white">ASC 606 Deferred Revenue Schedule</h3>
              <p className="text-slate-400 text-xs mt-1">$120,000 Annual Enterprise Contract (12 Months Amortization)</p>
            </div>

            <div className="max-h-72 overflow-y-auto font-mono text-xs">
              <table className="w-full text-left">
                <thead className="text-slate-500 border-b border-slate-800 text-[11px] sticky top-0 bg-slate-900">
                  <tr>
                    <th className="py-2">Month</th>
                    <th className="py-2">Recognized</th>
                    <th className="py-2">Deferred Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {asc606Waterfall.map(m => (
                    <tr key={m.yearMonth}>
                      <td className="py-2 text-slate-300">{m.yearMonth}</td>
                      <td className="py-2 text-emerald-400 font-medium">+${m.recognizedRevenue.toLocaleString()}</td>
                      <td className="py-2 text-slate-400">${m.deferredRevenueBalance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ASC 842 Lease Analysis */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <div>
              <div className="text-indigo-400 text-xs font-semibold uppercase">Lease Standard Compliance</div>
              <h3 className="text-lg font-bold text-white">ASC 842 Right-of-Use (ROU) Asset</h3>
              <p className="text-slate-400 text-xs mt-1">36-Month Office Lease @ $4,500/mo (6.5% Discount Rate)</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[11px]">Classification</span>
                <div className="text-sm font-bold text-white mt-0.5">{asc842Analysis.classification} LEASE</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[11px]">Initial ROU Asset (PV)</span>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">${asc842Analysis.initialRouAsset.toLocaleString()}</div>
              </div>
            </div>

            <div className="max-h-56 overflow-y-auto font-mono text-xs">
              <table className="w-full text-left">
                <thead className="text-slate-500 border-b border-slate-800 text-[11px] sticky top-0 bg-slate-900">
                  <tr>
                    <th className="py-2">Period</th>
                    <th className="py-2">Payment</th>
                    <th className="py-2">Interest</th>
                    <th className="py-2">ROU Asset</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {asc842Analysis.schedule.slice(0, 6).map(row => (
                    <tr key={row.periodMonth}>
                      <td className="py-2 text-slate-300">Mo {row.periodMonth}</td>
                      <td className="py-2 text-slate-200">${row.payment.toLocaleString()}</td>
                      <td className="py-2 text-amber-400">${row.interestExpense.toLocaleString()}</td>
                      <td className="py-2 text-slate-400">${row.endingRouAsset.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-[11px] text-slate-500 text-center py-2 italic">+ 30 additional scheduled periods</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
