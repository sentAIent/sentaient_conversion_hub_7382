"use client";

import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Zap, 
  Hash, 
  Users 
} from 'lucide-react';
import { 
  SafeMultiSigService, 
  SafeTransactionData, 
  SignerConfirmation 
} from '@/lib/web3/safeMultiSigService';
import { 
  ContractVerificationService, 
  VerificationRequest 
} from '@/lib/web3/contractVerificationService';
import { MevGasOptimizer } from '@/lib/web3/mevGasOptimizer';

export default function SafeMultiSigView() {
  const [activeTab, setActiveTab] = useState<'multisig' | 'verification' | 'mevRpc'>('multisig');

  // --- Safe Multi-Sig State ---
  const [safeAddress, setSafeAddress] = useState<string>('0x71C836d5D0D3e061a7B77443F86D1217e13fe3a4');
  const [chainId, setChainId] = useState<number>(1); // Ethereum Mainnet
  const [threshold] = useState<number>(2);
  const owners = [
    '0x1aD91ee0Da773a05952978d4771F5D211e65b842',
    '0x2bE45aA5200fE84F7BE485D57e84992694bB30c9',
    '0x3cF7648312e319859f7762a4Fa6e1c61858a719B'
  ];

  const [txData, setTxData] = useState<SafeTransactionData>({
    to: '0x1111111254fb6c44bac0bed2854e76f90643097d', // 1inch Aggregator
    value: '0',
    data: '0xa9059cbb00000000000000000000000049059cbb00000000000000000000000000000000',
    operation: 0,
    safeTxGas: '0',
    baseGas: '0',
    gasPrice: '0',
    gasToken: '0x0000000000000000000000000000000000000000',
    refundReceiver: '0x0000000000000000000000000000000000000000',
    nonce: 14
  });

  const [confirmations, setConfirmations] = useState<SignerConfirmation[]>([
    {
      signerAddress: '0x2bE45aA5200fE84F7BE485D57e84992694bB30c9',
      signature: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1b',
      signedAt: '2026-11-21T14:32:00Z'
    }
  ]);

  const safeTxHash = useMemo(() => {
    try {
      return SafeMultiSigService.computeSafeTxHash(safeAddress, chainId, txData);
    } catch {
      return '0x...';
    }
  }, [safeAddress, chainId, txData]);

  const addSimulatedSignature = () => {
    const nextOwner = owners.find(o => !confirmations.some(c => c.signerAddress.toLowerCase() === o.toLowerCase()));
    if (nextOwner) {
      setConfirmations([
        ...confirmations,
        {
          signerAddress: nextOwner,
          signature: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1c',
          signedAt: new Date().toISOString()
        }
      ]);
    }
  };

  const isExecutable = confirmations.length >= threshold;
  const aggregatedSignatures = useMemo(() => {
    if (confirmations.length === 0) return '0x';
    return SafeMultiSigService.aggregateSignatures(confirmations);
  }, [confirmations]);

  // --- Contract Verification State ---
  const [verificationReq, setVerificationReq] = useState<VerificationRequest>({
    contractAddress: '0x888888888889758F76e7103c6CbF23AEB5377771',
    contractName: 'InstitutionalStablecoinMinter',
    sourceCode: '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract InstitutionalStablecoinMinter {\n    address public immutable treasury;\n    constructor(address _treasury) { treasury = _treasury; }\n}',
    compilerVersion: 'v0.8.20+commit.a1b79de6',
    optimizationUsed: true,
    runs: 200,
    constructorArgumentsHex: '00000000000000000000000071c836d5d0d3e061a7b77443f86d1217e13fe3a4',
    chainId: 1
  });

  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

  const handleSimulateVerification = async () => {
    setVerificationStatus('Packaging source code and constructor ABI...');
    const result = await ContractVerificationService.submitVerification(verificationReq);
    setVerificationStatus(`Submission Received: GUID ${result.guid} (${result.status}) - ${result.message}`);
  };

  // --- MEV & Gas Optimizer State ---
  const [speedTier, setSpeedTier] = useState<'standard' | 'fast' | 'urgent'>('fast');
  const gasEstimate = useMemo(() => {
    return MevGasOptimizer.calculateEip1559Fees(speedTier);
  }, [speedTier]);

  return (
    <div className="p-8 space-y-8 bg-gray-950 min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">Safe Multi-Sig & Smart Contracts</h1>
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Gnosis Safe v1.4.1
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            EIP-712 structured multi-party treasury signing, automated block explorer source verification, and MEV-shielded RPC.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('multisig')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'multisig' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Key size={16} />
            <span>Safe Multi-Sig Vault</span>
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'verification' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code2 size={16} />
            <span>Contract Verification</span>
          </button>
          <button
            onClick={() => setActiveTab('mevRpc')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'mevRpc' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Zap size={16} />
            <span>MEV & EIP-1559</span>
          </button>
        </div>
      </div>

      {activeTab === 'multisig' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Transaction Builder */}
          <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-white flex items-center space-x-2">
              <Key size={18} className="text-blue-400" />
              <span>Multi-Sig Transaction Builder</span>
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <label className="text-xs text-gray-400 font-medium">Safe Contract Address</label>
                <input
                  type="text"
                  value={safeAddress}
                  onChange={(e) => setSafeAddress(e.target.value)}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 font-medium">Chain ID</label>
                  <select
                    value={chainId}
                    onChange={(e) => setChainId(parseInt(e.target.value))}
                    className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-xs"
                  >
                    <option value={1}>1 (Ethereum)</option>
                    <option value={8453}>8453 (Base)</option>
                    <option value={137}>137 (Polygon)</option>
                    <option value={42161}>42161 (Arbitrum)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-medium">Nonce</label>
                  <input
                    type="number"
                    value={txData.nonce}
                    onChange={(e) => setTxData({ ...txData, nonce: parseInt(e.target.value) || 0 })}
                    className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium">Destination `to` Address</label>
                <input
                  type="text"
                  value={txData.to}
                  onChange={(e) => setTxData({ ...txData, to: e.target.value })}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium">ETH Value (Wei)</label>
                <input
                  type="text"
                  value={txData.value}
                  onChange={(e) => setTxData({ ...txData, value: e.target.value })}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium">Calldata (Hex)</label>
                <textarea
                  rows={3}
                  value={txData.data}
                  onChange={(e) => setTxData({ ...txData, data: e.target.value })}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-xs resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Signing Matrix & Execution Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* EIP-712 SafeTxHash Preview */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center space-x-2">
                  <Hash size={14} className="text-blue-400" />
                  <span>EIP-712 SafeTxHash (Digest for Hardware Signers)</span>
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Domain: {chainId}
                </span>
              </div>
              <div className="bg-black/40 p-3 rounded-lg font-mono text-xs text-blue-300 break-all border border-gray-800">
                {safeTxHash}
              </div>
            </div>

            {/* Threshold & Signers Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-white flex items-center space-x-2">
                  <Users size={18} className="text-blue-400" />
                  <span>Signer Quorum ({confirmations.length} of {threshold} Required Approvals)</span>
                </h4>
                <button
                  onClick={addSimulatedSignature}
                  disabled={confirmations.length >= owners.length}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  + Simulate Next Co-Signer
                </button>
              </div>

              <div className="space-y-3">
                {owners.map((owner, idx) => {
                  const conf = confirmations.find(c => c.signerAddress.toLowerCase() === owner.toLowerCase());
                  return (
                    <div key={idx} className="p-3 bg-gray-800/40 rounded-lg border border-gray-800 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {conf ? (
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-600" />
                        )}
                        <div>
                          <div className="font-mono text-xs text-white">Owner #{idx + 1}: {owner}</div>
                          {conf && (
                            <div className="text-[10px] text-gray-400">Signed at: {new Date(conf.signedAt).toLocaleTimeString()}</div>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                        conf ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-500'
                      }`}>
                        {conf ? 'Signed' : 'Awaiting Sign'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Execution Dispatcher */}
            <div className={`p-6 rounded-xl border flex items-center justify-between ${
              isExecutable ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-gray-900 border-gray-800'
            }`}>
              <div>
                <h4 className="font-bold text-white text-base">
                  {isExecutable ? 'Quorum Met: Ready for Execution' : `Awaiting ${threshold - confirmations.length} More Signature(s)`}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  {isExecutable 
                    ? 'Ascending order signature serialization validated per Safe contract specification.' 
                    : 'Transaction cannot be submitted until required signature threshold is reached.'}
                </p>
                <div className="mt-2 text-xs font-mono text-gray-500 truncate max-w-lg">
                  Aggregated: {aggregatedSignatures}
                </div>
              </div>

              <button
                disabled={!isExecutable}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 text-sm transition-all ${
                  isExecutable 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
                <span>Execute SafeTx</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'verification' && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white flex items-center space-x-2">
              <Code2 size={18} className="text-blue-400" />
              <span>Block Explorer Automated Source Code Verification</span>
            </h3>
            <span className="text-xs text-gray-400">Etherscan / Basescan API Direct</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="text-xs text-gray-400 font-medium">Target Contract Address</label>
              <input
                type="text"
                value={verificationReq.contractAddress}
                onChange={(e) => setVerificationReq({ ...verificationReq, contractAddress: e.target.value })}
                className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium">Contract Name</label>
              <input
                type="text"
                value={verificationReq.contractName}
                onChange={(e) => setVerificationReq({ ...verificationReq, contractName: e.target.value })}
                className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium">Solidity Compiler Version</label>
              <input
                type="text"
                value={verificationReq.compilerVersion}
                onChange={(e) => setVerificationReq({ ...verificationReq, compilerVersion: e.target.value })}
                className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium">Constructor Arguments (Hex)</label>
              <input
                type="text"
                value={verificationReq.constructorArgumentsHex}
                onChange={(e) => setVerificationReq({ ...verificationReq, constructorArgumentsHex: e.target.value })}
                className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 font-medium">Solidity Single File Source</label>
            <textarea
              rows={6}
              value={verificationReq.sourceCode}
              onChange={(e) => setVerificationReq({ ...verificationReq, sourceCode: e.target.value })}
              className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white font-mono text-xs resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleSimulateVerification}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors flex items-center space-x-2"
            >
              <Cpu size={16} />
              <span>Submit for Explorer Verification</span>
            </button>

            {verificationStatus && (
              <div className="text-xs font-mono text-blue-400 bg-blue-950/40 px-3 py-2 rounded-lg border border-blue-500/20">
                {verificationStatus}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'mevRpc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-white flex items-center space-x-2">
              <Zap size={18} className="text-amber-400" />
              <span>EIP-1559 Dynamic Gas Estimator</span>
            </h3>

            <div className="flex space-x-2">
              {(['standard', 'fast', 'urgent'] as const).map(tier => (
                <button
                  key={tier}
                  onClick={() => setSpeedTier(tier)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                    speedTier === tier ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            <div className="bg-black/30 p-4 rounded-xl border border-gray-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Base Fee:</span>
                <span className="text-white font-bold">{gasEstimate.baseFeeGwei} Gwei</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Max Priority Fee (Tip):</span>
                <span className="text-amber-400 font-bold">{gasEstimate.maxPriorityFeePerGasGwei} Gwei</span>
              </div>
              <div className="flex justify-between border-t border-gray-800 pt-2">
                <span className="text-gray-400">Max Fee Per Gas:</span>
                <span className="text-white font-bold">{gasEstimate.maxFeePerGasGwei} Gwei</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated 21k Tx Cost:</span>
                <span className="text-emerald-400 font-bold">${gasEstimate.estimatedCostUSD.toFixed(3)} USD</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-white flex items-center space-x-2">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span>MEV-Shielded Private RPC Routing</span>
            </h3>
            <p className="text-xs text-gray-400">
              Institutional transactions are routed through Flashbots Protect and private builder endpoints to prevent frontrunning, sandwich attacks, and public mempool leakages.
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-gray-800/40 rounded-lg border border-gray-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Flashbots Protect</div>
                  <div className="text-[11px] text-gray-400">https://rpc.flashbots.net</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Protected
                </span>
              </div>
              <div className="p-3 bg-gray-800/40 rounded-lg border border-gray-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Titan Builder RPC</div>
                  <div className="text-[11px] text-gray-400">https://rpc.titanbuilder.xyz</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Direct Builder
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
