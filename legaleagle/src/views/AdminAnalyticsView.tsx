import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Activity, Users, Database, Server, Play, Square, RefreshCw } from 'lucide-react';
import { Theme } from '@/types';

interface UsageLog {
    id: string;
    user_email: string;
    model_used: string;
    action_type: string;
    tokens_used: number;
    status: string;
    created_at: string;
}

interface AdminAnalyticsViewProps {
    currentTheme: Theme;
}

export const AdminAnalyticsView: React.FC<AdminAnalyticsViewProps> = ({ currentTheme }) => {
    const [logs, setLogs] = useState<UsageLog[]>([]);
    const [totalTokens, setTotalTokens] = useState(0);
    const [totalScans, setTotalScans] = useState(0);
    
    // Infrastructure State
    const [dockerStatus, setDockerStatus] = useState<'checking' | 'running' | 'stopped' | 'error'>('checking');
    const [dockerErrorMsg, setDockerErrorMsg] = useState('');
    const ADMIN_API_KEY = 'super-secret-local-key';
    const DOCKER_API_URL = 'http://localhost:11236';

    const fetchLogs = async () => {
        let localFailures = [];
        try {
            localFailures = JSON.parse(localStorage.getItem('supabase_failures') || '[]');
        } catch (e) {}

        const { data, error } = await supabase
            .from('usage_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (!error && data) {
            const combinedLogs = [...localFailures, ...data];
            setLogs(combinedLogs);
            
            // Calculate totals
            const tokens = combinedLogs.reduce((sum, log) => sum + (log.tokens_used || 0), 0);
            setTotalTokens(tokens);
            setTotalScans(combinedLogs.filter(log => log.action_type === 'standard_analysis' || log.action_type === 'deep_analysis').length);
        } else if (error) {
            setLogs(localFailures);
            console.error("Failed to fetch logs from Supabase", error);
        }
    };

    useEffect(() => {
        fetchLogs();

        // Subscribe to real-time updates
        const channel = supabase.channel('usage_logs_changes')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'usage_logs' },
                (payload) => {
                    const newLog = payload.new as UsageLog;
                    setLogs((prev) => [newLog, ...prev].slice(0, 100));
                    setTotalTokens((prev) => prev + (newLog.tokens_used || 0));
                    if (newLog.action_type === 'standard_analysis' || newLog.action_type === 'deep_analysis') {
                        setTotalScans((prev) => prev + 1);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Infrastructure Functions
    const checkDockerStatus = async () => {
        setDockerStatus('checking');
        setDockerErrorMsg('');
        try {
            const res = await fetch(`${DOCKER_API_URL}/status`, {
                headers: { 'x-api-key': ADMIN_API_KEY }
            });
            if (!res.ok) throw new Error('API unreachable');
            const json = await res.json();
            if (json.status === 'success') {
                setDockerStatus(json.data.isRunning ? 'running' : 'stopped');
            } else {
                throw new Error(json.message);
            }
        } catch (e: any) {
            setDockerStatus('error');
            setDockerErrorMsg(e.message || 'Could not connect to Local Docker Manager.');
        }
    };

    const startDocker = async () => {
        setDockerStatus('checking');
        try {
            const res = await fetch(`${DOCKER_API_URL}/start`, {
                method: 'POST',
                headers: { 'x-api-key': ADMIN_API_KEY }
            });
            await res.json();
            await checkDockerStatus();
        } catch (e: any) {
            setDockerStatus('error');
            setDockerErrorMsg(e.message);
        }
    };

    const stopDocker = async () => {
        setDockerStatus('checking');
        try {
            const res = await fetch(`${DOCKER_API_URL}/stop`, {
                method: 'POST',
                headers: { 'x-api-key': ADMIN_API_KEY }
            });
            await res.json();
            await checkDockerStatus();
        } catch (e: any) {
            setDockerStatus('error');
            setDockerErrorMsg(e.message);
        }
    };

    useEffect(() => {
        checkDockerStatus();
    }, []);

    return (
        <div className={`flex flex-col h-full w-full overflow-hidden ${currentTheme.appBg}`}>
            <div className={`p-6 border-b ${currentTheme.docBorder}`}>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    Admin Analytics Dashboard
                </h1>
                <p className="text-sm opacity-80 mt-1">Real-time usage and token tracking</p>
            </div>

            <div className="flex-1 overflow-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className={`p-6 rounded-xl border shadow-sm ${currentTheme.panelBg} ${currentTheme.docBorder}`}>
                        <div className="flex items-center gap-3 mb-2 opacity-80">
                            <Database className="w-5 h-5" />
                            <h3 className="font-semibold">Total Tokens</h3>
                        </div>
                        <p className="text-3xl font-bold">{totalTokens.toLocaleString()}</p>
                    </div>
                    <div className={`p-6 rounded-xl border shadow-sm ${currentTheme.panelBg} ${currentTheme.docBorder}`}>
                        <div className="flex items-center gap-3 mb-2 opacity-80">
                            <Activity className="w-5 h-5" />
                            <h3 className="font-semibold">Total Scans</h3>
                        </div>
                        <p className="text-3xl font-bold">{totalScans}</p>
                    </div>
                    <div className={`p-6 rounded-xl border shadow-sm ${currentTheme.panelBg} ${currentTheme.docBorder}`}>
                        <div className="flex items-center gap-3 mb-2 opacity-80">
                            <Users className="w-5 h-5" />
                            <h3 className="font-semibold">Recent Events</h3>
                        </div>
                        <p className="text-3xl font-bold">{logs.length}</p>
                    </div>
                </div>

                <div className={`rounded-xl border shadow-sm overflow-hidden mb-8 ${currentTheme.panelBg} ${currentTheme.docBorder}`}>
                    <div className={`p-4 border-b font-semibold flex items-center justify-between ${currentTheme.docBorder}`}>
                        <div className="flex items-center gap-2">
                            <Server className="w-5 h-5 text-blue-500" />
                            Infrastructure Management (Crawl4AI)
                        </div>
                        <button onClick={checkDockerStatus} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                            <RefreshCw className={`w-4 h-4 ${dockerStatus === 'checking' ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="font-medium text-lg">Docker Container Status</h3>
                                <p className="text-sm opacity-80">Manage the local crawl4ai container required for Web Search.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Status:</span>
                                {dockerStatus === 'checking' && <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-semibold animate-pulse">Checking...</span>}
                                {dockerStatus === 'running' && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Running</span>}
                                {dockerStatus === 'stopped' && <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-semibold">Stopped</span>}
                                {dockerStatus === 'error' && <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">Unreachable</span>}
                            </div>
                        </div>
                        
                        {dockerStatus === 'error' && (
                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-900/50">
                                {dockerErrorMsg}. Ensure the `docker-manager` service is running on port 11236.
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button 
                                onClick={startDocker}
                                disabled={dockerStatus === 'running' || dockerStatus === 'checking'}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                            >
                                <Play className="w-4 h-4" /> Start Container
                            </button>
                            <button 
                                onClick={stopDocker}
                                disabled={dockerStatus === 'stopped' || dockerStatus === 'error' || dockerStatus === 'checking'}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                            >
                                <Square className="w-4 h-4" /> Stop Container
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`rounded-xl border shadow-sm overflow-hidden ${currentTheme.panelBg} ${currentTheme.docBorder}`}>
                    <div className={`p-4 border-b font-semibold ${currentTheme.docBorder}`}>
                        Recent Activity Log
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className={`text-xs uppercase opacity-80 border-b ${currentTheme.docBorder}`}>
                                <tr>
                                    <th className="px-6 py-3">Time</th>
                                    <th className="px-6 py-3">User</th>
                                    <th className="px-6 py-3">Action</th>
                                    <th className="px-6 py-3">Model</th>
                                    <th className="px-6 py-3">Tokens</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log) => (
                                    <tr key={log.id} className={`border-b last:border-0 ${currentTheme.docBorder}`}>
                                        <td className="px-6 py-4">{new Date(log.created_at).toLocaleTimeString()}</td>
                                        <td className="px-6 py-4 font-medium">{log.user_email || 'Anonymous'}</td>
                                        <td className="px-6 py-4">{log.action_type}</td>
                                        <td className="px-6 py-4">{log.model_used || 'N/A'}</td>
                                        <td className="px-6 py-4">{log.tokens_used}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                log.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                log.status === 'aborted' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {logs.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center opacity-60">
                                            No usage logs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
