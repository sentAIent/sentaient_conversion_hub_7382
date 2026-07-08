import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { Mail, Clock, Trash2, RefreshCw, ChevronDown, ChevronUp, Users, Download } from 'lucide-react';

export default function WaitlistPanel() {
    const [entries, setEntries] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortAsc, setSortAsc] = useState(false);
    const [search, setSearch] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        fetchWaitlist();
    }, []);

    const fetchWaitlist = async () => {
        setLoading(true);
        setError('');
        try {
            const q = query(collection(db, 'icebreaker_waitlist'), orderBy('timestamp', 'desc'));
            const snap = await getDocs(q);
            setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err: any) {
            setError('Failed to load waitlist: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'icebreaker_waitlist', id));
            setEntries(prev => prev.filter(e => e.id !== id));
            setDeleteConfirm(null);
        } catch (err: any) {
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

    const filtered = entries
        .filter(e => e.email?.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const ta = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
            const tb = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
            return sortAsc ? ta.getTime() - tb.getTime() : tb.getTime() - ta.getTime();
        });

    const formatDate = (ts: any) => {
        if (!ts) return '—';
        const d = ts.toDate ? ts.toDate() : new Date(ts);
        return d.toLocaleString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="mt-8 bg-[#1e1e23]/60 backdrop-blur-md rounded-2xl p-6 border border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        Waitlist Signups
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">{entries.length} total entries</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={fetchWaitlist}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                    <button
                        onClick={exportCSV}
                        disabled={filtered.length === 0}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-50"
                    >
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-sm">
                    {error}
                </div>
            )}

            <div className="bg-black/20 border border-white/5 rounded-xl overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 border-b border-white/5 bg-white/5">
                    <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
                        <Mail className="w-3.5 h-3.5" /> Email
                    </div>
                    <button
                        onClick={() => setSortAsc(!sortAsc)}
                        className="flex items-center gap-1 text-xs text-gray-400 uppercase tracking-wide hover:text-white"
                    >
                        <Clock className="w-3.5 h-3.5" /> Signed Up
                        {sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    <div className="w-6"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-sm">
                        No signups found.
                    </div>
                ) : (
                    <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
                        {filtered.map(entry => (
                            <div key={entry.id} className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 items-center hover:bg-white/5">
                                <span className="text-sm text-white font-medium truncate">{entry.email}</span>
                                <span className="text-xs text-gray-400">{formatDate(entry.timestamp)}</span>
                                <div>
                                    {deleteConfirm === entry.id ? (
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleDelete(entry.id)} className="text-xs text-red-400 font-bold hover:text-red-300">Confirm</button>
                                            <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-500 hover:text-white">Cancel</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => setDeleteConfirm(entry.id)} className="text-gray-600 hover:text-red-400">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
