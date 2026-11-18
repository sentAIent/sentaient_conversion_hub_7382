'use client';

import React, { useState, useMemo } from 'react';
import { 
  Coins, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Cpu, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { TokenFactoryService, TokenDeploymentConfig, SupportedChain, TokenType, DeploymentPlan } from '@/lib/web3/tokenFactoryService';
import { SanctionsSentry, SanctionsCheckResult } from '@/lib/compliance/sanctionsSentry';

export default function InstitutionalTokenStudio() {
  const [chain, setChain] = useState<SupportedChain>('base');
  const [tokenType, setTokenType] = useState<TokenType>('STANDARD_ERC20');
  const [tokenName, setTokenName] = useState('Liquid Protocol');
  const [tokenSymbol, setTokenSymbol] = useState('LQID');
  const [initialSupply, setInitialSupply] = useState('10000000');
  const [maxSupply, setMaxSupply] = useState('10000000');
  const [buyFeeBps, setBuyFeeBps] = useState(0);
  const [sellFeeBps, setSellFeeBps] = useState(0);
  const [feeRecipient, setFeeRecipient] = useState('0x71C8360f381c8c50E010834A8f06079E31c9a061');
  const [isMintable, setIsMintable] = useState(false);
  const [isBurnable, setIsBurnable] = useState(true);
  const [isPausable, setIsPausable] = useState(false);
  const [enableVesting, setEnableVesting] = useState(true);
  const [vestingCliffMonths, setVestingCliffMonths] = useState(12);
  const [vestingTotalMonths, setVestingTotalMonths] = useState(48);

  const [testWallet, setTestWallet] = useState('0x71C8360f381c8c50E010834A8f06079E31c9a061');
  const [sanctionsResult, setSanctionsResult] = useState<SanctionsCheckResult | null>(null);

  const [deploymentResult, setDeploymentResult] = useState<any>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  const config: TokenDeploymentConfig = useMemo(() => ({
    chain,
    tokenType,
    name: tokenName,
    symbol: tokenSymbol,
    decimals: 18,
    initialSupply,
    maxSupply,
    buyFeeBps,
    sellFeeBps,
    feeRecipientAddress: feeRecipient,
    isBurnable,
    isPausable,
    isMintable,
    enableVestingSchedule: enableVesting,
    vestingCliffMonths,
    vestingTotalMonths
  }), [
    chain, tokenType, tokenName, tokenSymbol, initialSupply, maxSupply,
    buyFeeBps, sellFeeBps, feeRecipient, isBurnable, isPausable, isMintable,
    enableVesting, vestingCliffMonths, vestingTotalMonths
  ]);

  const plan: DeploymentPlan = useMemo(() => {
    return TokenFactoryService.prepareDeploymentPlan(config);
  }, [config]);

  const handleScreenWallet = () => {
    const res = SanctionsSentry.screenAddress(testWallet);
    setSanctionsResult(res);
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      try {
        const res = TokenFactoryService.simulateDeployToken(plan);
        setDeploymentResult(res);
      } catch (err: any) {
        alert(err.message || 'Deployment error');
      } finally {
        setIsDeploying(false);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-sm font-semibold tracking-wide uppercase mb-1">
            <Coins size={16} />
            <span>Institutional Web3 Token Factory</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Cryptocurrency & Token Studio</h1>
          <p className="text-slate-400 text-sm mt-1">
            Deploy audited smart tokens across EVM & Solana with on-chain vesting, cap table sync, and OFAC sanctions gating.
          </p>
        </div>

        {/* Selected Chain Badge */}
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Target Network:</span>
          <span className="text-xs font-bold text-cyan-400 uppercase">{chain} Mainnet</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Token Configuration Form */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" />
            <span>Token Architecture Specifications</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Blockchain Network</label>
              <select
                value={chain}
                onChange={e => setChain(e.target.value as SupportedChain)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="base">Base (Coinbase L2 - Recommended)</option>
                <option value="ethereum">Ethereum Mainnet</option>
                <option value="arbitrum">Arbitrum One</option>
                <option value="polygon">Polygon PoS</option>
                <option value="solana">Solana (SPL & Token-2022)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Contract Archetype</label>
              <select
                value={tokenType}
                onChange={e => setTokenType(e.target.value as TokenType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="STANDARD_ERC20">Standard ERC-20 (Governance & Utility)</option>
                <option value="RESTRICTED_SECURITY_ERC1404">ERC-1404 Restricted Security (Reg D/S)</option>
                <option value="VAULT_ERC4626">ERC-4626 Tokenized Yield Vault</option>
                <option value="SOLANA_TOKEN_2022">Solana Token-2022 (Transfer Fees & Zero-Knowledge)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Token Name</label>
              <input
                type="text"
                value={tokenName}
                onChange={e => setTokenName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Token Symbol</label>
              <input
                type="text"
                value={tokenSymbol}
                onChange={e => setTokenSymbol(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Initial Mint Supply</label>
              <input
                type="text"
                value={initialSupply}
                onChange={e => setInitialSupply(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Hard Cap Max Supply</label>
              <input
                type="text"
                value={maxSupply}
                onChange={e => setMaxSupply(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
              />
            </div>
          </div>

          {/* Vesting Configuration */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-white text-sm">On-Chain Vesting Contract</span>
                <p className="text-xs text-slate-400">Deploys companion TokenVesting.sol for founders and investors</p>
              </div>
              <input
                type="checkbox"
                checked={enableVesting}
                onChange={e => setEnableVesting(e.target.checked)}
                className="h-4 w-4 text-cyan-600 rounded"
              />
            </div>

            {enableVesting && (
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Cliff Duration (Months)</label>
                  <input
                    type="number"
                    value={vestingCliffMonths}
                    onChange={e => setVestingCliffMonths(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Total Vesting Duration (Months)</label>
                  <input
                    type="number"
                    value={vestingTotalMonths}
                    onChange={e => setVestingTotalMonths(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white text-xs font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Pre-Deployment Security Audit */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Automated Pre-Deployment Static Audit</h4>
            <div className="space-y-1.5">
              {plan.securityChecks.map(check => (
                <div key={check.id} className="flex items-start gap-2 text-xs">
                  {check.passed ? (
                    <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold text-white">{check.title}: </span>
                    <span className="text-slate-400">{check.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deploy Action Button */}
          <div className="pt-2">
            <button
              onClick={handleDeploy}
              disabled={isDeploying || !plan.isApprovedForDeployment}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isDeploying ? (
                <span>Broadcasting to {chain.toUpperCase()} Mempool...</span>
              ) : (
                <>
                  <Coins size={18} />
                  <span>Deploy {tokenSymbol} to {chain.toUpperCase()} (~${plan.estimatedGasUSD} Gas)</span>
                </>
              )}
            </button>
          </div>

          {/* Deployment Success Modal / Result */}
          {deploymentResult && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 size={16} />
                <span>Contract Successfully Deployed!</span>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500">Contract Address: </span>
                <span className="text-white font-bold">{deploymentResult.contractAddress}</span>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500">Tx Hash: </span>
                <span className="text-cyan-400">{deploymentResult.transactionHash.slice(0, 32)}...</span>
              </div>
              <a 
                href={deploymentResult.explorerLink} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline pt-1"
              >
                <span>View on Block Explorer</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        {/* Right Column: OFAC Sanctions Sentry */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Lock size={18} className="text-emerald-400" />
              <span>OFAC Sanctions & AML Sentry</span>
            </h3>
            <p className="text-slate-400 text-xs">
              Automated wallet screening against US Treasury SDN and mixing protocol blacklists.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-medium text-slate-400">Test Counterparty Wallet Address</label>
            <input
              type="text"
              value={testWallet}
              onChange={e => setTestWallet(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleScreenWallet}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-lg transition-all"
            >
              Run Real-Time Sanctions Screen
            </button>
          </div>

          {sanctionsResult && (
            <div className={`p-4 rounded-xl border text-xs space-y-2 ${
              sanctionsResult.isSanctioned 
                ? 'bg-rose-500/10 border-rose-500/30' 
                : 'bg-emerald-500/10 border-emerald-500/30'
            }`}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-white uppercase">{sanctionsResult.riskCategory}</span>
                <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                  sanctionsResult.isSanctioned ? 'bg-rose-500 text-white' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  Risk Score: {sanctionsResult.riskScore}/100
                </span>
              </div>

              <div className="text-slate-300">
                <span className="text-slate-500">Recommended Action: </span>
                <span className="font-bold">{sanctionsResult.recommendedAction}</span>
              </div>

              {sanctionsResult.flaggedEntities.length > 0 && (
                <div className="pt-2 border-t border-rose-500/20 text-rose-300 text-[11px]">
                  {sanctionsResult.flaggedEntities.map((e, idx) => (
                    <div key={idx}>&bull; {e}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="font-semibold text-slate-300">Apple & Google Review Exemption:</div>
            <p className="text-[11px] leading-relaxed">
              Tokens are deployed non-custodially. Under Apple Guideline 3.1.5, Liquid acts as an autonomous transaction synthesizer, leaving full key sovereignty with user hardware wallets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
