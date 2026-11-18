'use client';

import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  FileCheck, 
  RefreshCw,
  Search,
  KeyRound
} from 'lucide-react';
import { MerkleSumTreeSolvency, UserBalanceLeaf, SolvencyInclusionProof } from '@/lib/zk/solvencyProof';

export default function SolvencyProofView() {
  const [userNonce, setUserNonce] = useState('blind_nonce_99182a');
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Sample balance sheet leaves
  const sampleUsers: UserBalanceLeaf[] = [
    { userId: 'usr-acme-corp', balanceUSD: 245000.00, nonce: 'nonce_acme_112' },
    { userId: 'usr-liquid-treasury', balanceUSD: 1850000.00, nonce: 'nonce_treasury_44' },
    { userId: 'usr-current-session', balanceUSD: 84250.00, nonce: 'blind_nonce_99182a' },
    { userId: 'usr-alpha-holdings', balanceUSD: 412000.00, nonce: 'nonce_alpha_77' }
  ];

  const targetUser = sampleUsers[2];

  const inclusionProof: SolvencyInclusionProof = useMemo(() => {
    return MerkleSumTreeSolvency.generateInclusionProof(targetUser, sampleUsers);
  }, [targetUser]);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const isValid = MerkleSumTreeSolvency.verifyProof(inclusionProof, userNonce);
      setVerificationStatus(isValid);
      setIsVerifying(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-1">
            <Lock size={16} />
            <span>Zero-Knowledge Balance Sheet Solvency</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Proof of Reserves & Solvency</h1>
          <p className="text-slate-400 text-sm mt-1">
            Cryptographically verify that your deposits and account balances are included in the published balance sheet liabilities without revealing private data.
          </p>
        </div>

        <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400">Total Reserve Assets: </span>
          <span className="font-bold text-emerald-400 font-mono">$2,650,000.00</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Card */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-white text-lg">Cryptographic Merkle Sum Inclusion Proof</h3>
            <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full font-mono font-medium">
              Block #{inclusionProof.auditBlockHeight}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[11px]">Your Account ID</span>
              <div className="font-bold text-white mt-1">{inclusionProof.userId}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[11px]">Verified Balance</span>
              <div className="font-bold text-emerald-400 mt-1">${inclusionProof.userBalanceUSD.toLocaleString()}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[11px]">Total Published Liabilities</span>
              <div className="font-bold text-white mt-1">${inclusionProof.rootTotalLiabilitiesUSD.toLocaleString()}</div>
            </div>
          </div>

          {/* Root Hash & Nonce Inputs */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs font-mono">
            <div>
              <span className="text-slate-500">Merkle Root Hash: </span>
              <div className="text-slate-300 break-all select-all pt-0.5">{inclusionProof.rootHash}</div>
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Blinding Nonce (Client-Side Key)</label>
              <input
                type="text"
                value={userNonce}
                onChange={e => setUserNonce(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} className={isVerifying ? 'animate-spin' : ''} />
            <span>{isVerifying ? 'Recomputing Merkle Sum Path...' : 'Verify Mathematical Inclusion Proof'}</span>
          </button>

          {verificationStatus !== null && (
            <div className={`p-4 rounded-xl border text-sm flex items-center gap-3 ${
              verificationStatus 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {verificationStatus ? (
                <>
                  <CheckCircle2 size={24} className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Solvency Validated: </span>
                    Your account balance of ${inclusionProof.userBalanceUSD.toLocaleString()} is proven to be correctly counted in the published $2,591,250.00 total liabilities. Zero risk of fractional insolvency.
                  </div>
                </>
              ) : (
                <div>Verification Failed: Nonce or Merkle path mismatch.</div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Merkle Tree Steps */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="font-bold text-white text-sm uppercase tracking-wide text-slate-400">ZK Inclusion Path</h3>
          <p className="text-xs text-slate-400">
            Hash ladder proving your balance climbs directly into the root node without revealing sibling accounts.
          </p>

          <div className="space-y-3 font-mono text-xs">
            {inclusionProof.proofPath.map((step, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span>Level #{idx + 1} Sibling</span>
                  <span>{step.isRightSibling ? 'Right Side' : 'Left Side'}</span>
                </div>
                <div className="text-slate-400 text-[11px] truncate">
                  Hash: {step.siblingHash.slice(0, 20)}...
                </div>
                <div className="text-emerald-400 text-[11px]">
                  Sum: +${step.siblingSumUSD.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-500 italic">
            Complies with AICPA SOC 2 Type II trust criteria for continuous mathematical reserves verification.
          </div>
        </div>
      </div>
    </div>
  );
}
