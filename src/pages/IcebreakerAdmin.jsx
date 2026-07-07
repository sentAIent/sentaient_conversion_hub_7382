import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
    Users, Download, Trash2, RefreshCw, LogOut,
    Mail, Clock, Shield, ChevronDown, ChevronUp
} from 'lucide-react';

const IcebreakerAdmin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortAsc, setSortAsc] = useState(false);
    const [search, setSearch] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Auth guard
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthLoading(false);
            if (u) fetchWaitlist();
        });
        return unsub;
    }, []);

    const fetchWaitlist = async () => {
        setLoading(true);
        setError('');
        try {
            const q = query(collection(db, 'icebreaker_waitlist'), orderBy('timestamp', 'desc'));
            const snap = await getDocs(q);
            setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) {
            setError('Failed to load waitlist: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'icebreaker_waitlist', id));
            setEntries(prev => prev.filter(e => e.id !== id));
            setDeleteConfirm(null);
        } catch (err) {
            setError('Delete failed: ' + err.message);
        }
    };

    const exportCSV = () => {
        const rows = [['Email', 'Signed Up At']];
        filtered.forEach(e => {
            const ts = e.timestamp?.toDate ? e.timestamp.toDate() : new Date(e.timestamp);
            rows.push([e.email, ts.toISOString()]);
        });
        const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `icebreaker-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/icelogin');
    };

    const filtered = entries
        .filter(e => e.email?.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const ta = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
            const tb = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
            return sortAsc ? ta - tb : tb - ta;
        });

    const formatDate = (ts) => {
        if (!ts) return '—';
        const d = ts.toDate ? ts.toDate() : new Date(ts);
        return d.toLocaleString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-sans">
                <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-10">
                    <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                    <p className="text-gray-400 mb-6">You must be signed in to view this page.</p>
                    <button
                        onClick={() => navigate('/icelogin')}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full font-bold text-sm"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans">
            {/* Header */}
            <div className="border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🧊</span>
                        <div>
                            <h1 className="text-lg font-bold leading-tight">Icebreaker Admin</h1>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Stats bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Signups</p>
                        <p className="text-3xl font-bold text-blue-400">{entries.length}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Last Signup</p>
                        <p className="text-sm font-semibold text-white">
                            {entries.length > 0 ? formatDate(entries[0].timestamp) : '—'}
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 col-span-2 sm:col-span-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Collection</p>
                        <p className="text-sm font-mono text-teal-400">icebreaker_waitlist</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                    />
                    <button
                        onClick={fetchWaitlist}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-all"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                    <button
                        onClick={exportCSV}
                        disabled={filtered.length === 0}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-sm">
                        {error}
                    </div>
                )}

                {/* Table */}
                <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden">
                    {/* Table header */}
                    <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
                            <Mail className="w-3.5 h-3.5" /> Email
                        </div>
                        <button
                            onClick={() => setSortAsc(!sortAsc)}
                            className="flex items-center gap-1 text-xs text-gray-400 uppercase tracking-wide hover:text-white transition-colors"
                        >
                            <Clock className="w-3.5 h-3.5" /> Signed Up
                            {sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                        <div className="w-6"></div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-16 text-gray-500">
                            <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p>{search ? 'No matches found.' : 'No signups yet.'}</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {filtered.map((entry, i) => (
                                <div key={entry.id} className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3.5 items-center hover:bg-white/3 transition-colors">
                                    <span className="text-sm text-white font-medium truncate">{entry.email}</span>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(entry.timestamp)}</span>
                                    <div>
                                        {deleteConfirm === entry.id ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDelete(entry.id)}
                                                    className="text-xs text-red-400 hover:text-red-300 font-bold"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(null)}
                                                    className="text-xs text-gray-500 hover:text-white"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteConfirm(entry.id)}
                                                className="text-gray-600 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer count */}
                    {filtered.length > 0 && (
                        <div className="px-5 py-3 border-t border-white/10 text-xs text-gray-500">
                            Showing {filtered.length} of {entries.length} entries
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IcebreakerAdmin;
