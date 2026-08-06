import React, { useState, useEffect } from 'react';
import { Shield, Activity, RefreshCw, AlertCircle, Server } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Sidebar } from '../components/layout/Sidebar';
import { THEMES } from '../constants/themes';

interface SystemLog {
  id: string;
  service_name: string;
  log_level: 'info' | 'warn' | 'error';
  message: string;
  metadata: any;
  created_at: string;
}

export const AdminDashboardView: React.FC = () => {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('system_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (fetchError) throw fetchError;
      setLogs(data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching logs:', err);
      setError('Failed to fetch system logs. Make sure you are authenticated as an admin and the system_logs table exists.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab="admin"
        setActiveTab={() => {}}
        analysisComplete={false}
        score={0}
        currentTheme={THEMES.light}
        analysisDepth="quick"
        setAnalysisDepth={() => {}}
        onAnalyze={() => {}}
        isRoastMode={false}
        onOpenSettings={() => {}}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-500 mt-1">System Health & Keepalive Logs</p>
            </div>
          </div>
          <button 
            onClick={fetchLogs}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Logs
          </button>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Server className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Supabase Status</h3>
                </div>
                <p className="text-sm text-gray-500">Database is active and accepting connections.</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-700">Online</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Keepalive Edge Function</h3>
                </div>
                <p className="text-sm text-gray-500">Pings DB twice weekly via pg_cron.</p>
                <div className="mt-4">
                    <span className="text-sm font-medium text-gray-700">
                        Last Ping: {logs.find(l => l.service_name === 'keepalive-ping')?.created_at ? new Date(logs.find(l => l.service_name === 'keepalive-ping')!.created_at).toLocaleString() : 'N/A'}
                    </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5" />
                <div>
                  <h3 className="font-medium">Error Loading Data</h3>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Logs Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Recent System Logs</h3>
              </div>
              
              {loading && logs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Loading logs...</div>
              ) : logs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No logs found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                      <tr>
                        <th className="px-6 py-3 font-medium">Timestamp</th>
                        <th className="px-6 py-3 font-medium">Level</th>
                        <th className="px-6 py-3 font-medium">Service</th>
                        <th className="px-6 py-3 font-medium">Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {logs.map(log => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                              ${log.log_level === 'info' ? 'bg-blue-100 text-blue-800' : 
                                log.log_level === 'warn' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}
                            >
                              {log.log_level}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {log.service_name}
                          </td>
                          <td className="px-6 py-4 text-gray-600 truncate max-w-md">
                            {log.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
