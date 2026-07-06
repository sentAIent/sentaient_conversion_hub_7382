// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Theme } from '@/types';
import { Shield, Clock, FileText, User, Settings } from 'lucide-react';

interface AuditLogViewProps {
    currentTheme: Theme;
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ currentTheme }) => {
    const { profile } = useAuth();
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (profile?.current_team_id) {
            fetchLogs();
        }
    }, [profile?.current_team_id]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('audit_logs')
                .select('*, profiles:user_id(full_name, username, email)')
                .eq('team_id', profile!.current_team_id)
                .order('created_at', { ascending: false })
                .limit(100);
                
            if (error) throw error;
            setLogs(data || []);
        } catch (err) {
            console.error('Error fetching audit logs', err);
        } finally {
            setLoading(false);
        }
    };

    const getActionIcon = (action: string) => {
        if (action.includes('document') || action.includes('analysis')) return <FileText className="w-4 h-4 text-blue-500" />;
        if (action.includes('user') || action.includes('member')) return <User className="w-4 h-4 text-green-500" />;
        if (action.includes('retention') || action.includes('policy')) return <Settings className="w-4 h-4 text-purple-500" />;
        return <Shield className="w-4 h-4 text-gray-500" />;
    };

    const formatAction = (action: string) => {
        return action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
            <div>
                <h2 className={`text-2xl font-bold mb-2 ${currentTheme.text}`}>Audit Logs</h2>
                <p className={`${currentTheme.textMuted} mb-6`}>
                    View a chronological history of security and compliance events for your workspace.
                </p>
            </div>

            <div className={`p-6 rounded-xl shadow-sm ${currentTheme.card} border ${currentTheme.border}`}>
                {loading ? (
                    <div className="flex justify-center p-8">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : logs.length === 0 ? (
                    <div className={`text-center p-12 ${currentTheme.textMuted}`}>
                        <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No audit events found for this workspace.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {logs.map(log => (
                            <div key={log.id} className={`flex items-start gap-4 p-4 rounded-lg border ${currentTheme.border} hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}>
                                <div className="mt-1 p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                                    {getActionIcon(log.action)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className={`font-semibold text-sm ${currentTheme.text}`}>
                                            {formatAction(log.action)}
                                        </div>
                                        <div className={`flex items-center gap-1 text-xs ${currentTheme.textMuted}`}>
                                            <Clock className="w-3 h-3" />
                                            {new Date(log.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className={`text-sm ${currentTheme.textMuted}`}>
                                        <span className="font-medium">{log.profiles?.full_name || log.profiles?.email || 'System'}</span> performed this action.
                                        {log.details && (
                                            <pre className="mt-2 text-xs bg-black/5 dark:bg-white/5 p-2 rounded overflow-x-auto">
                                                {JSON.stringify(log.details, null, 2)}
                                            </pre>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
