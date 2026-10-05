'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, MapPin, Landmark, UserCheck, Play, 
  TrendingUp, CreditCard, RefreshCw, Send, CheckCircle2, Ticket, ChevronRight
} from '@/components/icons';
import { PickemProp, PickemLeg, PickemEntry, RealMoneyAccount, mockPickemProps, ILLEGAL_STATES } from '@/types/models';

export default function PickemPage() {
  const [account, setAccount] = useState<RealMoneyAccount | null>(null);
  const [entries, setEntries] = useState<PickemEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Selections slip state
  const [slipLegs, setSlipLegs] = useState<Omit<PickemLeg, 'status'>[]>([]);
  const [entryFee, setEntryFee] = useState<number>(10);
  const [placing, setPlacing] = useState(false);
  const [successSlip, setSuccessSlip] = useState(false);

  // KYC modal/form state
  const [showKycForm, setShowKycForm] = useState(false);
  const [kycName, setKycName] = useState('');
  const [kycDob, setKycDob] = useState('');
  const [kycState, setKycState] = useState('NY');
  const [kycSsn, setKycSsn] = useState('');
  const [kycAddress, setKycAddress] = useState('');
  const [verifying, setVerifying] = useState(false);

  // Deposit state
  const [depositing, setDepositing] = useState(false);

  async function loadData() {
    try {
      const accRes = await fetch('/api/pickem/account');
      const accJson = await accRes.json();
      if (accJson.success && accJson.data) {
        setAccount(accJson.data);
      }

      const entriesRes = await fetch('/api/pickem/entry');
      const entriesJson = await entriesRes.json();
      if (entriesJson.success && entriesJson.data) {
        setEntries(entriesJson.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    const params = new URLSearchParams(window.location.search);
    if (params.get('deposit') === 'success') {
      alert("Deposit successfully completed via Stripe!");
      window.history.replaceState({}, '', window.location.pathname);
    } else if (params.get('deposit') === 'cancel') {
      alert("Stripe deposit canceled.");
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    try {
      const res = await fetch('/api/pickem/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'kyc',
          fullName: kycName,
          dob: kycDob,
          state: kycState,
          ssnLast4: kycSsn,
          address: kycAddress
        })
      });
      const json = await res.json();
      if (json.success) {
        setAccount(json.data);
        setShowKycForm(false);
        alert("KYC Onboarding Verification Approved!");
      } else {
        alert(json.error || "KYC verification failed.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  const handleDeposit = async () => {
    setDepositing(true);
    try {
      const res = await fetch('/api/pickem/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deposit',
          depositAmount: 50.00
        })
      });
      const json = await res.json();
      if (json.success && json.sessionUrl) {
        window.location.href = json.sessionUrl;
      } else {
        alert(json.error || "Failed to initiate Stripe Checkout session.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDepositing(false);
    }
  };

  const selectProp = (prop: PickemProp, selection: 'OVER' | 'UNDER') => {
    // If leg already selected, remove it
    const exists = slipLegs.find(l => l.playerId === prop.id);
    if (exists && exists.selection === selection) {
      setSlipLegs(slipLegs.filter(l => l.playerId !== prop.id));
      return;
    }

    const newLeg: Omit<PickemLeg, 'status'> = {
      playerId: prop.id,
      playerName: prop.playerName,
      position: prop.position,
      team: prop.team,
      propType: prop.propType,
      line: prop.line,
      selection
    };

    if (exists) {
      setSlipLegs(slipLegs.map(l => l.playerId === prop.id ? newLeg : l));
    } else {
      if (slipLegs.length >= 5) {
        alert("Maximum 5 selections allowed per Pick'em slip.");
        return;
      }
      setSlipLegs([...slipLegs, newLeg]);
    }
  };

  const submitSlip = async () => {
    if (slipLegs.length < 2) {
      alert("Please select at least 2 player props to place a slip.");
      return;
    }
    if (!account) return;

    if (account.kyc_status !== 'verified') {
      alert("Please complete KYC verification before placing wagers.");
      setShowKycForm(true);
      return;
    }

    setPlacing(true);
    try {
      const formattedLegs = slipLegs.map(l => ({ ...l, status: 'pending' }));
      const res = await fetch('/api/pickem/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          legs: formattedLegs,
          entryFee
        })
      });
      const json = await res.json();
      if (json.success) {
        setSuccessSlip(true);
        setSlipLegs([]);
        loadData();
        setTimeout(() => setSuccessSlip(false), 3000);
      } else {
        alert(json.error || "Failed to place Pick'em entry.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPlacing(false);
    }
  };

  const getMultiplier = () => {
    if (slipLegs.length === 2) return 3;
    if (slipLegs.length === 3) return 5;
    if (slipLegs.length === 4) return 8;
    if (slipLegs.length >= 5) return 10;
    return 0;
  };

  const isGeoBlocked = account ? ILLEGAL_STATES.includes(account.state_residency) : false;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent flex items-center gap-2">
            <Ticket className="text-red-400" /> Real-Money Pick'em Lobby
          </h1>
          <p className="text-gray-400 mt-1">
            Build player prop pick wagers. Predict Over/Under lines to unlock up to 10x multiplier payouts.
          </p>
        </div>

        {/* Residency State Geo-Located Bar */}
        {account && (
          <div className="flex items-center gap-3 bg-gray-900 border border-gray-850 px-4 py-2.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs">
              <MapPin size={14} className="text-amber-400" />
              <span className="text-gray-400">Geofenced Location:</span>
            </div>
            <span className="text-xs text-white font-black bg-gray-950 border border-gray-800 rounded px-2.5 py-0.5">
              {account.state_residency} (Verified)
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-80 text-gray-500 text-sm gap-2">
          <RefreshCw size={16} className="animate-spin text-red-400" /> Loading Pick'em Lobby...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Columns: KYC, Balance, Props Board */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Account Status bar */}
            {account && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Balance Card */}
                <div className="bg-gray-900 border border-gray-850 p-4 rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black flex items-center gap-1">
                      <Landmark size={10} /> Real-Money Wallet
                    </span>
                    <span className="text-3xl font-black text-white block">${account.balance.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleDeposit}
                    disabled={depositing || isGeoBlocked}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all"
                  >
                    {depositing ? <RefreshCw size={12} className="animate-spin" /> : <><CreditCard size={12} /> Deposit $50</>}
                  </button>
                </div>

                {/* KYC Card */}
                <div className="bg-gray-900 border border-gray-850 p-4 rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black flex items-center gap-1">
                      <UserCheck size={10} /> Identity Verification (KYC)
                    </span>
                    <span className={`text-sm font-bold flex items-center gap-1.5 ${
                      account.kyc_status === 'verified' ? 'text-green-400' : 'text-amber-400'
                    }`}>
                      {account.kyc_status === 'verified' ? (
                        <><ShieldCheck size={16} /> Verified Account</>
                      ) : (
                        <><ShieldAlert size={16} /> Action Required</>
                      )}
                    </span>
                  </div>
                  {account.kyc_status !== 'verified' && (
                    <button
                      onClick={() => setShowKycForm(true)}
                      className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-black transition-all"
                    >
                      Verify KYC
                    </button>
                  )}
                </div>

              </div>
            )}

            {/* Geo-Blocking Banner */}
            {isGeoBlocked && (
              <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-2xl flex items-start gap-3">
                <ShieldAlert className="text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-red-200">State Gaming Restriction Alert</h4>
                  <p className="text-xs text-red-300/80 leading-relaxed">
                    Real-money Pick'em contests are currently illegal or restricted under gaming laws in <strong>{account?.state_residency}</strong>. 
                    Your account has been restricted to demo capabilities. Change residency state to test wagers.
                  </p>
                </div>
              </div>
            )}

            {/* KYC Onboarding Form */}
            {showKycForm && (
              <form onSubmit={handleKycSubmit} className="bg-gray-905 border border-amber-500/20 p-6 rounded-2xl space-y-4">
                <div className="border-b border-gray-850 pb-2">
                  <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest">KYC Compliance Registration</h3>
                  <p className="text-xs text-gray-500">Provide legal identification details to enable real-money deposits.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase">Legal Full Name</label>
                    <input 
                      type="text"
                      value={kycName}
                      onChange={(e) => setKycName(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs focus:outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase">Date of Birth</label>
                    <input 
                      type="date"
                      value={kycDob}
                      onChange={(e) => setKycDob(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase">Residential Address</label>
                    <input 
                      type="text"
                      value={kycAddress}
                      onChange={(e) => setKycAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs focus:outline-none"
                      placeholder="123 Quant Ave"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase">State</label>
                    <input 
                      type="text"
                      value={kycState}
                      onChange={(e) => setKycState(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs focus:outline-none"
                      placeholder="NY"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 uppercase">SSN (Last 4 digits)</label>
                  <input 
                    type="password"
                    maxLength={4}
                    value={kycSsn}
                    onChange={(e) => setKycSsn(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs focus:outline-none font-mono"
                    placeholder="••••"
                    required
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowKycForm(false)}
                    className="px-4 py-2 hover:bg-gray-800 rounded-xl text-xs text-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={verifying}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-black transition-all"
                  >
                    {verifying ? <RefreshCw size={12} className="animate-spin" /> : "Verify Identity"}
                  </button>
                </div>
              </form>
            )}

            {/* Props board */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-1.5">
                <TrendingUp size={18} className="text-red-400" /> Active Prop Lines
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockPickemProps.map((prop) => {
                  const legSelected = slipLegs.find(l => l.playerId === prop.id);
                  const isOver = legSelected?.selection === 'OVER';
                  const isUnder = legSelected?.selection === 'UNDER';

                  return (
                    <div key={prop.id} className="bg-gray-900 border border-gray-850 p-4 rounded-2xl flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{prop.playerName}</span>
                          <span className="text-[9px] text-gray-500 uppercase">{prop.position} • {prop.team}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {prop.propType}: <strong className="text-white font-mono">{prop.line}</strong>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => selectProp(prop, 'OVER')}
                          disabled={isGeoBlocked}
                          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                            isOver 
                              ? 'bg-green-600 text-white shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
                              : 'bg-gray-950 border border-gray-800 text-green-400 hover:bg-green-950/20'
                          }`}
                        >
                          OVER
                        </button>
                        <button
                          onClick={() => selectProp(prop, 'UNDER')}
                          disabled={isGeoBlocked}
                          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                            isUnder 
                              ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
                              : 'bg-gray-950 border border-gray-800 text-red-400 hover:bg-red-950/20'
                          }`}
                        >
                          UNDER
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Slip & Ledger Entries */}
          <div className="space-y-6">
            
            {/* Bet Slip */}
            <div className="bg-gray-900 border border-gray-850 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                <Ticket size={14} className="text-red-400" /> Entry Slips ({slipLegs.length}/5)
              </h3>

              {successSlip ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="mx-auto text-green-400" size={36} />
                  <p className="text-sm font-black text-white">Pick'em Entry Placed!</p>
                  <p className="text-xs text-gray-500">Good luck! Payout will settle shortly.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {slipLegs.map((leg) => (
                      <div key={leg.playerId} className="p-3 bg-gray-950 border border-gray-850 rounded-xl flex justify-between items-center text-xs">
                        <div>
                          <div className="font-bold text-white">{leg.playerName}</div>
                          <div className="text-[10px] text-gray-500">{leg.propType} ({leg.line})</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                          leg.selection === 'OVER' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {leg.selection}
                        </span>
                      </div>
                    ))}

                    {slipLegs.length === 0 && (
                      <div className="py-8 text-center text-xs text-gray-500">
                        No lines selected. Select lines from the board.
                      </div>
                    )}
                  </div>

                  {slipLegs.length >= 2 && (
                    <div className="space-y-4 pt-3 border-t border-gray-850">
                      
                      {/* Entry Fee Slider / Input */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Entry Fee:</span>
                        <div className="flex items-center gap-1.5 bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5">
                          <span className="text-xs text-gray-500">$</span>
                          <input 
                            type="number"
                            value={entryFee}
                            onChange={(e) => setEntryFee(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-12 bg-transparent text-xs focus:outline-none font-bold text-white text-right"
                          />
                        </div>
                      </div>

                      {/* Multiplier / Payout display */}
                      <div className="p-3 bg-gray-950 rounded-xl border border-gray-850 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Multiplier:</span>
                          <span className="font-black text-amber-400">{getMultiplier()}x Payout</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-white">To Win:</span>
                          <span className="font-black text-green-400">${(entryFee * getMultiplier()).toFixed(2)}</span>
                        </div>
                      </div>

                      <button
                        onClick={submitSlip}
                        disabled={placing || isGeoBlocked}
                        className="w-full py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 disabled:from-red-800 disabled:to-amber-800 text-white rounded-xl text-xs font-black shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all flex items-center justify-center gap-1.5"
                      >
                        {placing ? <RefreshCw size={12} className="animate-spin" /> : "Place Pick'em Entry"}
                      </button>

                    </div>
                  )}
                </>
              )}
            </div>

            {/* Entries History */}
            <div className="bg-gray-900 border border-gray-850 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
                Recent Entries History
              </h3>

              <div className="space-y-3">
                {entries.map((entry) => (
                  <div key={entry.id} className="p-3 bg-gray-950 border border-gray-850 rounded-xl space-y-2">
                    <div className="flex justify-between items-center border-b border-gray-850 pb-1.5">
                      <span className="text-[10px] text-gray-500 font-bold">Fee: ${entry.entry_fee.toFixed(2)}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                        entry.status === 'won' ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {entry.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {entry.legs.map((leg) => (
                        <div key={leg.playerId} className="flex justify-between items-center text-[10px]">
                          <span className="text-gray-400">{leg.playerName} ({leg.propType})</span>
                          <span className="font-mono text-white font-bold">{leg.selection} {leg.line}</span>
                        </div>
                      ))}
                    </div>

                    {entry.status === 'won' && (
                      <div className="text-[10px] font-bold text-green-400 text-right pt-1">
                        Payout: ${entry.payout.toFixed(2)} ({entry.multiplier}x)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
