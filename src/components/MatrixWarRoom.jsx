import React, { useState } from 'react';
import { Users, Radio, Mic, MicOff, Volume2, Eye, Navigation, MessageSquare, Sparkles, CheckCircle2, Shield, Signal } from 'lucide-react';

export default function MatrixWarRoom() {
    const [isMuted, setIsMuted] = useState(false);
    const [followingUser, setFollowingUser] = useState(null);
    const [recentPings, setRecentPings] = useState([
        { id: 1, user: 'Sarah (Growth Lead)', action: 'Promoted Variant C (+32.7% Lift) to Netlify Production', time: '1m ago', color: 'text-indigo-400' },
        { id: 2, user: 'Marcus (Client CTO)', action: 'Reviewed Open-Glean RAG Catalog for Q4 Holiday Lines', time: '4m ago', color: 'text-emerald-400' },
        { id: 3, user: 'Matrix AI Autopilot', action: 'Finished headless 390x844 mobile checkout friction audit', time: '8m ago', color: 'text-cyan-400' },
    ]);

    const collaborators = [
        { id: 'user_you', name: 'You (Lead Admin)', role: 'Super-Admin', status: 'Speaking', color: 'border-amber-400 bg-amber-500/20 text-amber-300', isLocal: true },
        { id: 'user_sarah', name: 'Sarah Jenkins', role: 'Growth Engineer', status: 'Listening', color: 'border-indigo-400 bg-indigo-500/20 text-indigo-300', isLocal: false },
        { id: 'user_marcus', name: 'Marcus Vance', role: 'Client Executive', status: 'Viewing Card 22', color: 'border-emerald-400 bg-emerald-500/20 text-emerald-300', isLocal: false },
        { id: 'user_bot', name: 'Sentaient Copilot', role: 'Autonomous Agent', status: 'Active Dispatch', color: 'border-purple-400 bg-purple-500/20 text-purple-300', isLocal: false },
    ];

    const broadcastCanvasPing = () => {
        const newPing = {
            id: Date.now(),
            user: 'You (Lead Admin)',
            action: 'Broadcasted live canvas sync anchor to all collaborators',
            time: 'Just now',
            color: 'text-amber-400'
        };
        setRecentPings(prev => [newPing, ...prev]);
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        <Radio size={16} className="animate-pulse" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            Matrix War Room • Live Multiplayer
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                                <Signal size={10} /> 4 Live Peers
                            </span>
                        </h3>
                        <p className="text-[11px] text-slate-400">Real-Time Cursor Presence • Low-Latency Audio Intercom</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                            isMuted 
                                ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}
                    >
                        {isMuted ? <MicOff size={13} /> : <Mic size={13} />}
                        {isMuted ? 'Muted' : 'Intercom Live'}
                    </button>

                    <button
                        onClick={broadcastCanvasPing}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        <Navigation size={13} /> Ping Canvas
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#0a0d14] space-y-4">
                {/* Active Collaborators Grid */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1">
                        <span>Connected War Room Peers</span>
                        <span className="font-mono text-[10px] text-slate-500">LiveKit Channel: #room-matrix-ops</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {collaborators.map((c) => (
                            <div key={c.id} className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl hover:border-slate-700 transition-all flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-xs ${c.color}`}>
                                        {c.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-200">{c.name}</h4>
                                        <p className="text-[10px] text-slate-400 font-mono">{c.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {!c.isLocal && (
                                        <button
                                            onClick={() => setFollowingUser(followingUser === c.id ? null : c.id)}
                                            className={`p-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 border transition-all ${
                                                followingUser === c.id 
                                                    ? 'bg-indigo-600 text-white border-indigo-500' 
                                                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                                            }`}
                                            title="Follow Viewport"
                                        >
                                            <Eye size={12} />
                                            {followingUser === c.id ? 'Following' : 'Follow'}
                                        </button>
                                    )}
                                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                        {c.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Following Banner */}
                {followingUser && (
                    <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-between text-xs text-indigo-300 animate-in fade-in">
                        <div className="flex items-center gap-2">
                            <Eye size={14} />
                            <span>Viewport locked to: <strong>{collaborators.find(c => c.id === followingUser)?.name}</strong></span>
                        </div>
                        <button
                            onClick={() => setFollowingUser(null)}
                            className="text-[11px] underline font-semibold text-indigo-400"
                        >
                            Release Viewport
                        </button>
                    </div>
                )}

                {/* Shared Event Log Stream */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-semibold text-slate-300">
                        Live Matrix Canvas Event Stream
                    </div>
                    <div className="divide-y divide-slate-800/70 text-xs">
                        {recentPings.map((p) => (
                            <div key={p.id} className="p-3 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                                <div className="space-y-0.5">
                                    <span className={`font-bold ${p.color}`}>{p.user}:</span>
                                    <span className="text-slate-300 ml-2">{p.action}</span>
                                </div>
                                <span className="font-mono text-[10px] text-slate-500 whitespace-nowrap ml-4">{p.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Policy Footer */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                        <Shield size={14} className="text-indigo-400" />
                        Encrypted Channel: <strong>DTLS-SRTP 256-bit WebRTC Data Channel Active</strong>
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">Latency: 28ms</span>
                </div>
            </div>
        </div>
    );
}
