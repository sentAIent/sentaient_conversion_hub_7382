'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, DollarSign, Target, Plus, AlertCircle, 
  CheckCircle, Loader2, ArrowRight, RefreshCw, X, ShieldAlert, Cpu, MessageSquare, Send
} from '@/components/icons';
import { Syndicate } from '@/types/models';
import { createClient } from '@/utils/supabase/client';

export default function SyndicatesPage() {
  const [syndicates, setSyndicates] = useState<Syndicate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'my' | 'entered'>('all');
  
  // Modals
  const [showContributeModal, setShowContributeModal] = useState<Syndicate | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLineupsModal, setShowLineupsModal] = useState<Syndicate | null>(null);

  // Syndicate Chat Wall State
  const [chatMessages, setChatMessages] = useState<Record<string, any[]>>({});
  const [loadingChats, setLoadingChats] = useState<Record<string, boolean>>({});
  const [chatInputs, setChatInputs] = useState<Record<string, string>>({});
  const [expandedChatId, setExpandedChatId] = useState<string | null>(null);

  const fetchChats = async (syndicateId: string) => {
    setLoadingChats(prev => ({ ...prev, [syndicateId]: true }));
    try {
      const res = await fetch(`/api/syndicates/chat?syndicate_id=${syndicateId}`);
      const json = await res.json();
      if (json.success && json.data) {
        setChatMessages(prev => ({ ...prev, [syndicateId]: json.data }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingChats(prev => ({ ...prev, [syndicateId]: false }));
    }
  };

  const handlePostChat = async (syndicateId: string) => {
    const text = chatInputs[syndicateId] || '';
    if (!text.trim()) return;

    try {
      const res = await fetch('/api/syndicates/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          syndicate_id: syndicateId,
          username: 'DFS_Crusher',
          message: text
        })
      });
      const json = await res.json();
      if (json.success) {
        setChatInputs(prev => ({ ...prev, [syndicateId]: '' }));
        fetchChats(syndicateId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleChat = (syndicateId: string) => {
    if (expandedChatId === syndicateId) {
      setExpandedChatId(null);
    } else {
      setExpandedChatId(syndicateId);
    }
  };

  useEffect(() => {
    if (!expandedChatId) return;

    fetchChats(expandedChatId);

    const supabase = createClient();
    const channel = supabase
      .channel(`syndicate_chat:${expandedChatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'syndicate_chats',
          filter: `syndicate_id=eq.${expandedChatId}`
        },
        (payload) => {
          setChatMessages(prev => {
            const currentList = prev[expandedChatId] || [];
            if (currentList.some(msg => msg.id === payload.new.id)) {
              return prev;
            }
            return {
              ...prev,
              [expandedChatId]: [...currentList, payload.new]
            };
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [expandedChatId]);

  // Contribute Form
  const [contributeAmount, setContributeAmount] = useState<number>(250);
  const [submittingContrib, setSubmittingContrib] = useState(false);

  // Create Syndicate Form
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newContest, setNewContest] = useState('DraftKings NFL $1M Millionaire Maker ($20 entry fee)');
  const [newEntryFee, setNewEntryFee] = useState(20);
  const [newMaxEntries, setNewMaxEntries] = useState(150);
  const [submittingCreate, setSubmittingCreate] = useState(false);

  async function loadSyndicates() {
    setLoading(true);
    try {
      const res = await fetch('/api/syndicates');
      const json = await res.json();
      if (json.success && json.data) {
        setSyndicates(json.data);
      }
    } catch (err) {
      console.error("Error loading syndicates:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSyndicates();
  }, []);

  const handleContribute = async () => {
    if (!showContributeModal) return;
    setSubmittingContrib(true);
    try {
      const res = await fetch('/api/syndicates/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          syndicate_id: showContributeModal.id,
          amount: contributeAmount
        })
      });
      const json = await res.json();
      if (json.success) {
        alert(`Successfully pooled ${contributeAmount} Coins into ${showContributeModal.name}!`);
        setShowContributeModal(null);
        loadSyndicates();
      } else {
        alert(json.error || "Contribution failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingContrib(false);
    }
  };

  const handleCreateSyndicate = async () => {
    if (!newName || !newDesc) return;
    setSubmittingCreate(true);
    try {
      const res = await fetch('/api/syndicates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          description: newDesc,
          target_contest: newContest,
          contest_entry_fee: newEntryFee,
          max_entries: newMaxEntries
        })
      });
      const json = await res.json();
      if (json.success) {
        alert(`Syndicate "${newName}" spawned successfully!`);
        setShowCreateModal(false);
        setNewName('');
        setNewDesc('');
        loadSyndicates();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingCreate(false);
    }
  };

  const filteredSyndicates = syndicates.filter(s => {
    if (activeFilter === 'my') {
      return s.contributors.some(c => c.user_id === 'current_user_id');
    }
    if (activeFilter === 'entered') {
      return s.status === 'entered' || s.status === 'completed';
    }
    return true;
  });

  // Calculate totals
  const totalInvestment = syndicates.reduce((acc, s) => {
    const userContrib = s.contributors.find(c => c.user_id === 'current_user_id');
    return acc + (userContrib ? userContrib.amount : 0);
  }, 0);

  const totalWinnings = syndicates.reduce((acc, s) => {
    const userPercent = s.contributors.find(c => c.user_id === 'current_user_id')?.shares_percentage || 0;
    const winnings = s.lineups.reduce((w, l) => w + l.winnings, 0);
    return acc + (winnings * (userPercent / 100));
  }, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
            <Users className="text-purple-400" /> DFS Syndicates
          </h1>
          <p className="text-gray-400 mt-1">Pool virtual coins to entry-max major GPP contests with diversified optimized lineups.</p>
        </div>

        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl text-xs font-black shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
        >
          <Plus size={14} /> Create Syndicate Pool
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-purple-900/30 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Active Syndicate Pools</div>
          <div className="text-3xl font-black text-white">{syndicates.length}</div>
        </div>

        <div className="bg-gray-900 border border-gray-850 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Your Pool Contributions</div>
          <div className="text-3xl font-black text-purple-400">{totalInvestment.toLocaleString()} Coins</div>
        </div>

        <div className="bg-gray-900 border border-gray-850 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Syndicate Winnings</div>
          <div className="text-3xl font-black text-green-400">{totalWinnings.toFixed(0)} Coins</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-between items-center bg-gray-900 border border-gray-850 rounded-xl p-1">
        <div className="flex gap-1">
          {[
            { id: 'all', label: 'All Syndicates' },
            { id: 'my', label: 'My Contributions' },
            { id: 'entered', label: 'Live / Completed' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveFilter(t.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeFilter === t.id ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Syndicates List */}
      {loading ? (
        <div className="flex items-center justify-center h-60 text-gray-500 text-sm gap-2">
          <RefreshCw size={16} className="animate-spin text-purple-400" /> Loading syndicates...
        </div>
      ) : filteredSyndicates.length === 0 ? (
        <div className="p-12 border border-white/5 bg-white/[0.01] rounded-2xl text-center text-gray-500 text-sm">
          No syndicates match your current filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSyndicates.map(syn => {
            const progress = (syn.current_pool_balance / syn.total_target_pool) * 100;
            const isFunded = syn.status !== 'funding';
            const userPercent = syn.contributors.find(c => c.user_id === 'current_user_id')?.shares_percentage || 0;

            return (
              <div key={syn.id} className="bg-gray-900/60 border border-gray-850 hover:border-purple-900/30 rounded-2xl p-5 flex flex-col justify-between transition-colors relative overflow-hidden space-y-4">
                
                {/* Status Badge */}
                <div className="absolute top-0 right-0">
                  <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-bl border-b border-l ${
                    syn.status === 'funding' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                    syn.status === 'funded' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    syn.status === 'entered' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse' :
                    'bg-gray-500/10 text-gray-400 border-gray-500/20'
                  }`}>
                    {syn.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] text-purple-400 uppercase tracking-widest font-black">Target Contest</div>
                  <h3 className="text-lg font-black text-white leading-snug">{syn.name}</h3>
                  <div className="text-xs text-gray-500 italic flex items-center gap-1">
                    <span>Target: {syn.target_contest}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed pt-1">
                    {syn.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[10px] font-semibold">
                    <span className="text-gray-400">Funding Progress</span>
                    <span className="text-white">{syn.current_pool_balance.toLocaleString()} / {syn.total_target_pool.toLocaleString()} Coins ({progress.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-950 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Contributors */}
                <div className="bg-gray-950 p-3 rounded-xl border border-gray-850 text-[10px] space-y-1.5">
                  <div className="text-gray-500 font-bold uppercase tracking-wider">Contributors ({syn.contributors.length})</div>
                  <div className="flex flex-wrap gap-2">
                    {syn.contributors.map((c, i) => (
                      <span key={i} className={`px-2 py-0.5 rounded font-mono ${
                        c.user_id === 'current_user_id' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-gray-900 text-gray-400 border border-gray-850'
                      }`}>
                        {c.name} ({c.shares_percentage}%)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 justify-between items-center border-t border-gray-850">
                  <div className="text-xs text-gray-500">
                    {userPercent > 0 ? (
                      <div>Your share: <span className="font-bold text-purple-400">{userPercent}%</span></div>
                    ) : (
                      <div className="italic text-gray-600">Not participating yet</div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleChat(syn.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1 ${
                        expandedChatId === syn.id 
                          ? 'bg-purple-950/40 border-purple-800 text-purple-300' 
                          : 'bg-gray-800 hover:bg-gray-700 border-gray-750 text-gray-400 hover:text-white'
                      }`}
                    >
                      <MessageSquare size={11} /> Chat
                    </button>
                    {syn.status === 'funding' ? (
                      <button
                        onClick={() => setShowContributeModal(syn)}
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-extrabold transition-all"
                      >
                        Contribute Coins
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowLineupsModal(syn)}
                        className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs font-bold border border-gray-750 transition-all flex items-center gap-1"
                      >
                        <Cpu size={11} /> View Lineups ({syn.lineups.length || 150})
                      </button>
                    )}
                  </div>
                </div>

                {/* Syndicate Collapsible Chat Wall */}
                {expandedChatId === syn.id && (
                  <div className="bg-gray-950 p-4 rounded-xl border border-gray-850 space-y-3 pt-3 mt-2">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black flex justify-between items-center">
                      <span>Syndicate Discussion Board</span>
                      {loadingChats[syn.id] && <RefreshCw size={10} className="animate-spin text-purple-400" />}
                    </div>
                    
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {(chatMessages[syn.id] || []).map((msg, i) => (
                        <div key={i} className="text-xs space-y-0.5 animate-fade-in">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-bold text-purple-400">{msg.username}</span>
                            <span className="text-gray-600 font-mono">{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                          <p className="text-gray-300 bg-gray-900 px-2.5 py-1.5 rounded-lg border border-gray-850/50 leading-relaxed">{msg.message}</p>
                        </div>
                      ))}

                      {(!chatMessages[syn.id] || chatMessages[syn.id].length === 0) && !loadingChats[syn.id] && (
                        <div className="text-center text-gray-600 py-4 text-xs italic">
                          No messages yet. Be the first to start the correlation strategy discussion!
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discuss stacking strategies..."
                        value={chatInputs[syn.id] || ''}
                        onChange={(e) => setChatInputs(prev => ({ ...prev, [syn.id]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && handlePostChat(syn.id)}
                        className="flex-1 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-xs focus:outline-none focus:border-purple-500/50 text-white"
                      />
                      <button
                        onClick={() => handlePostChat(syn.id)}
                        className="p-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all"
                      >
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* Contribute Modal */}
      {showContributeModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <div className="bg-gray-900 border border-purple-900/30 rounded-3xl p-6 max-w-sm w-full space-y-5 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
            <button onClick={() => setShowContributeModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-300">
              <X size={16} />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">Pool Funds</h3>
              <p className="text-xs text-gray-400">{showContributeModal.name}</p>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black block">Select Contribution Amount</label>
              <div className="grid grid-cols-4 gap-2">
                {[100, 250, 500, 1000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setContributeAmount(amt)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      contributeAmount === amt 
                        ? 'bg-purple-600 border-purple-500 text-white' 
                        : 'bg-gray-950 border-gray-850 text-gray-400 hover:text-white'
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>

              <div className="bg-gray-950 p-3 rounded-xl border border-gray-850 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Contesting entry cost:</span>
                  <span className="text-white">${showContributeModal.contest_entry_fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Projected Pool Share:</span>
                  <span className="text-purple-400 font-bold">
                    {+((contributeAmount / showContributeModal.total_target_pool) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>

              <button
                onClick={handleContribute}
                disabled={submittingContrib}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all flex items-center justify-center gap-1.5"
              >
                {submittingContrib ? <RefreshCw size={12} className="animate-spin" /> : "Confirm Pool Contribution"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Syndicate Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <div className="bg-gray-900 border border-purple-900/30 rounded-3xl p-6 max-w-md w-full space-y-4 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-300">
              <X size={16} />
            </button>

            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-1.5">
                <Plus size={16} className="text-purple-400" /> Spawn Syndicate Pool
              </h3>
              <p className="text-xs text-gray-400">Launch a new pooled GPP entry pool.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black block mb-1">Syndicate Name</label>
                <input
                  type="text"
                  placeholder="e.g. DK Milly Maker Max Pool"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-950 border border-gray-850 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black block mb-1">Description</label>
                <textarea
                  placeholder="What is your strategy, overlay edge, or stacking setup?"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-3 bg-gray-950 border border-gray-850 rounded-xl text-xs focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black block mb-1">Entry Fee ($)</label>
                  <input
                    type="number"
                    value={newEntryFee}
                    onChange={(e) => setNewEntryFee(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-950 border border-gray-850 rounded-xl text-xs focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black block mb-1">Max Entries</label>
                  <input
                    type="number"
                    value={newMaxEntries}
                    onChange={(e) => setNewMaxEntries(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-950 border border-gray-850 rounded-xl text-xs focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div className="bg-gray-950 p-3 rounded-xl border border-gray-850 text-xs">
                <span className="text-gray-500">Target Pool Budget:</span> <span className="font-bold text-white">{(newEntryFee * newMaxEntries).toLocaleString()} Coins</span>
              </div>

              <button
                onClick={handleCreateSyndicate}
                disabled={submittingCreate}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all flex items-center justify-center gap-1.5"
              >
                {submittingCreate ? <RefreshCw size={12} className="animate-spin" /> : "Launch Syndicate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lineups Modal */}
      {showLineupsModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <div className="bg-gray-900 border border-purple-900/30 rounded-3xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-4 relative">
            <button onClick={() => setShowLineupsModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-300">
              <X size={16} />
            </button>

            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-1.5">
                <Cpu size={16} className="text-purple-400" /> Syndicate Lineups
              </h3>
              <p className="text-xs text-gray-400">{showLineupsModal.name}</p>
            </div>

            <div className="space-y-4">
              {showLineupsModal.lineups.length === 0 ? (
                <div className="p-8 bg-gray-950 border border-gray-850 rounded-2xl text-center space-y-4">
                  <div className="text-xs text-gray-400">
                    Syndicate fully funded. Click below to generate diversified lineups using the optimization engine.
                  </div>
                  <button 
                    onClick={async () => {
                      try {
                        const res = await fetch('/api/syndicates/contribute', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ syndicate_id: showLineupsModal.id, amount: 0 })
                        });
                        const json = await res.json();
                        if (json.success && json.syndicate) {
                          setShowLineupsModal(json.syndicate);
                          loadSyndicates();
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="px-4 py-2 bg-purple-600 text-white text-xs font-black rounded-lg hover:bg-purple-500"
                  >
                    Generate Optimized Lineups
                  </button>
                </div>
              ) : (
                showLineupsModal.lineups.map((lineup, lIdx) => (
                  <div key={lineup.id} className="bg-gray-950 border border-gray-850 rounded-2xl p-4 space-y-3 relative">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                      <span className="text-xs font-bold text-white">Entry #{lIdx + 1}</span>
                      <span className="text-[10px] text-gray-400">Proj: <span className="text-purple-400 font-bold">{lineup.projected_pts} pts</span></span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {lineup.players.map((p, pIdx) => (
                        <div key={pIdx} className="flex justify-between items-center bg-white/[0.01] p-1.5 rounded border border-white/[0.02]">
                          <span>
                            <span className="text-gray-500 font-bold mr-1">{p.position}</span>
                            <span className="text-gray-300 font-medium">{p.name}</span>
                          </span>
                          <span className="text-gray-500 font-mono text-[9px]">{p.team}</span>
                        </div>
                      ))}
                    </div>

                    {showLineupsModal.status === 'entered' && (
                      <div className="flex justify-between items-center pt-2 border-t border-gray-850 text-[10px]">
                        <span className="text-gray-400">Live Score: <span className="font-mono text-white font-bold">{lineup.entry_score}</span></span>
                        <span className="text-green-400 font-bold">Winnings: {lineup.winnings} Coins</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
