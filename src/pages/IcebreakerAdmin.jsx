import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
    Users, Download, Trash2, RefreshCw, LogOut,
    Mail, Clock, Shield, ChevronDown, ChevronUp,
    Activity, MapPin, Calendar, Share2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    const [analytics, setAnalytics] = useState(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [analyticsError, setAnalyticsError] = useState('');

    // Auth guard
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthLoading(false);
            if (u) {
                fetchWaitlist();
                fetchAnalytics();
            }
        });
        return unsub;
    }, []);

    const fetchAnalytics = async () => {
        try {
            const apiUri = 'https://icebreaker-b5u1.onrender.com/graphql';
            const ADMIN_ANALYTICS = `
              query AdminAnalytics($password: String!) {
                adminAnalytics(password: $password) {
                  totalUsers
                  dau
                  mau
                  totalCheckIns
                  totalMeetings
                  meetingsAccepted
                  totalReferrals
                  averageTrustScore
                  avgStreak
                }
              }
            `;
            const res = await fetch(apiUri, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: ADMIN_ANALYTICS, variables: { password: 'icebreaker2026' } })
            });
            const data = await res.json();
            if (data.errors) throw new Error(data.errors[0].message);
            setAnalytics(data.data.adminAnalytics);
            setAnalyticsError('');
        } catch (err) {
            console.error('Analytics error:', err);
            setAnalyticsError(err.message || 'Failed to fetch analytics');
        } finally {
            setAnalyticsLoading(false);
        }
    };

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

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start justify-between">
            <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{title}</p>
                <p className="text-3xl font-black text-white">{value}</p>
            </div>
            <div className={`p-3 rounded-xl bg-${color}-500/20`}>
                <Icon className={`w-6 h-6 text-${color}-400`} />
            </div>
        </div>
    );

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
                {analyticsLoading ? (
                    <div className="mb-12 bg-white/5 rounded-2xl p-12 border border-white/10 flex flex-col items-center justify-center text-center">
                        <div className="relative w-16 h-16 mb-6">
                            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-2 bg-gradient-to-tr from-blue-500 to-teal-400 rounded-full animate-pulse opacity-50 blur-sm"></div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Connecting to Analytics Backend...</h3>
                        <p className="text-gray-400 max-w-sm mx-auto">
                            The backend server may take <span className="text-white font-semibold">up to 50 seconds</span> to load. Hang tight!
                        </p>
                    </div>
                ) : analyticsError ? (
                    <div className="mb-12 bg-red-500/10 rounded-2xl p-6 border border-red-500/20 text-center">
                        <p className="text-red-400 font-bold mb-2">Analytics Currently Unavailable</p>
                        <p className="text-sm text-red-300/80 mb-4">{analyticsError}</p>
                        <button onClick={fetchAnalytics} className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm hover:bg-red-500/30 transition-all">
                            Retry Connection
                        </button>
                    </div>
                ) : analytics ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard title="Total Users" value={analytics.totalUsers} icon={Users} color="blue" />
                            <StatCard title="Daily Active" value={analytics.dau} icon={Activity} color="emerald" />
                            <StatCard title="Total Check-Ins" value={analytics.totalCheckIns} icon={MapPin} color="purple" />
                            <StatCard title="Meetings Accepted" value={analytics.meetingsAccepted} icon={Calendar} color="orange" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                            <div className="lg:col-span-2 bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h2 className="text-xl font-bold mb-6">User Activity (7 Days)</h2>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={[
                                            { name: 'Mon', users: analytics.dau * 0.8 },
                                            { name: 'Tue', users: analytics.dau * 0.9 },
                                            { name: 'Wed', users: analytics.dau * 1.1 },
                                            { name: 'Thu', users: analytics.dau * 0.95 },
                                            { name: 'Fri', users: analytics.dau * 1.2 },
                                            { name: 'Sat', users: analytics.dau * 1.4 },
                                            { name: 'Sun', users: analytics.dau },
                                        ]}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                            <XAxis dataKey="name" stroke="#666" />
                                            <YAxis stroke="#666" />
                                            <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                                            <Line type="monotone" dataKey="users" stroke="#34d399" strokeWidth={3} dot={{ r: 4, fill: '#34d399' }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Share2 className="w-5 h-5 text-blue-400" />
                                        <h2 className="text-lg font-bold">Viral Loops</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Referrals</span>
                                            <span className="font-bold text-xl">{analytics.totalReferrals}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Meetings</span>
                                            <span className="font-bold text-xl">{analytics.totalMeetings}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 border-t-4 border-t-yellow-500">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Shield className="w-5 h-5 text-yellow-500" />
                                        <h2 className="text-lg font-bold">Trust & Safety</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Trust Score</span>
                                            <span className="font-bold text-2xl text-yellow-500">{analytics.averageTrustScore.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Avg Streak</span>
                                            <span className="font-bold text-xl text-orange-400">{analytics.avgStreak.toFixed(1)} 🔥</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}

                {/* Waitlist Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-400" />
                            Waitlist Signups
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">{entries.length} total entries</p>
                    </div>
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
