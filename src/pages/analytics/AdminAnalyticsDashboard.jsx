import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area
} from 'recharts';
import { 
  Activity, Clock, Globe, Compass, AlertTriangle, MessageSquare, Mail, 
  Send, RefreshCw, CheckCircle2, ChevronRight, UserCheck, ShieldAlert, Cpu
} from 'lucide-react';
import analytics from '../../services/ComprehensiveAnalytics';

export default function AdminAnalyticsDashboard() {
  const [data, setData] = useState(() => analytics.getAllAnalyticsData());
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'worlds' | 'apps' | 'errors' | 'feedback' | 'email'
  const [recipientEmail, setRecipientEmail] = useState('bleonard@sentaient.com');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const refreshData = () => {
    setData(analytics.getAllAnalyticsData());
    setLastRefreshed(new Date());
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const handleSendDigest = async () => {
    setIsSendingEmail(true);
    setSendResult(null);
    try {
      const res = await analytics.sendDailyDigest(recipientEmail);
      setSendResult({
        success: true,
        message: res.message || `Daily analytics report generated and sent to ${recipientEmail}!`
      });
    } catch (e) {
      setSendResult({
        success: false,
        message: `Failed to dispatch email: ${e.message}`
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const formatSeconds = (secs) => {
    if (!secs) return '0s';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  const { kpis, worlds, apps, features, errors, feedback, sessions } = data;

  // Transform world data for charts
  const worldChartData = Object.entries(worlds)
    .map(([name, stat]) => ({
      name,
      totalSeconds: stat.totalSeconds || 0,
      visitCount: stat.visitCount || 0,
      avgSeconds: stat.avgSeconds || 0
    }))
    .sort((a, b) => b.totalSeconds - a.totalSeconds);

  // Transform app data for charts
  const appChartData = Object.entries(apps)
    .map(([name, stat]) => ({
      name,
      totalSeconds: stat.totalSeconds || 0,
      visitCount: stat.visitCount || 0,
      avgSeconds: stat.avgSeconds || 0
    }))
    .sort((a, b) => b.totalSeconds - a.totalSeconds);

  // Transform feature usage for charts
  const featureChartData = Object.values(features)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const COLORS = ['#38bdf8', '#00f0ff', '#10b981', '#a855f7', '#f59e0b', '#ec4899', '#6366f1', '#14b8a6'];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans p-4 md:p-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-semibold mb-1">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>sentAIent Telemetry OS // Admin Analytics</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span>Executive Performance Dashboard</span>
            <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              LIVE TELEMETRY
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={refreshData}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-mono border border-slate-700/80 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refreshed: {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg text-xs font-bold tracking-wider uppercase shadow-lg shadow-cyan-900/30 transition-all active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Daily Email Digest</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
              <span>Total Visitors</span>
              <UserCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white">{kpis.totalSessions || 1}</div>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">Unique recorded sessions</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
              <span>Avg Time on Site</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-400">{formatSeconds(kpis.avgSecondsOnSite)}</div>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">Across all journeys</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
              <span>Top 3D World</span>
              <Globe className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-emerald-400 truncate">
              {worldChartData[0]?.name || 'MindWave'}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">
              {formatSeconds(worldChartData[0]?.totalSeconds)} dwell
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
              <span>Inferred Affinity</span>
              <Compass className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-400">
              {kpis.avgEngagementScore || 78}/100
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">Interaction depth score</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
              <span>User CSAT</span>
              <MessageSquare className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-2xl font-black text-yellow-400">{kpis.csatScore} ★</div>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">{kpis.totalFeedback} reviews submitted</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
              <span>Crash Alerts</span>
              <AlertTriangle className={`w-4 h-4 ${kpis.totalErrors > 0 ? 'text-red-400' : 'text-slate-500'}`} />
            </div>
            <div className={`text-2xl font-black ${kpis.totalErrors > 0 ? 'text-red-400' : 'text-slate-200'}`}>
              {kpis.totalErrors || 0}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">Broken feature incidents</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1">
          {[
            { id: 'overview', label: 'Overview & Visuals', icon: Activity },
            { id: 'worlds', label: '3D World Dwell Times', icon: Globe },
            { id: 'apps', label: 'App Usage & Features', icon: Cpu },
            { id: 'errors', label: `Broken Features / Crashes (${errors.length})`, icon: ShieldAlert },
            { id: 'feedback', label: `User Feedback & Voice (${feedback.length})`, icon: MessageSquare },
            { id: 'email', label: 'Daily Analytics Email', icon: Mail }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wide uppercase whitespace-nowrap transition-all border-b-2 ${
                  isActive
                    ? 'border-cyan-400 text-cyan-400 bg-slate-900/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3D World Dwell Time Bar Chart */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">3D World Dwell Times (Seconds)</h3>
                  <p className="text-xs text-slate-400 font-mono">Time spent per 3D station</p>
                </div>
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="h-64">
                {worldChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={worldChartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                      <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{ fontSize: 11 }} width={100} />
                      <Tooltip 
                        contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        formatter={(val) => [`${formatSeconds(val)}`, 'Total Dwell']}
                      />
                      <Bar dataKey="totalSeconds" radius={[0, 4, 4, 0]}>
                        {worldChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500 text-xs font-mono">
                    Navigate through 3D worlds to record live dwell telemetry
                  </div>
                )}
              </div>
            </div>

            {/* In-App Feature Usage Leaderboard */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Feature Engagement Ranking</h3>
                  <p className="text-xs text-slate-400 font-mono">Most triggered in-app actions</p>
                </div>
                <Cpu className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="h-64">
                {featureChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={featureChartData} margin={{ left: 10, right: 10 }}>
                      <XAxis dataKey="feature" stroke="#64748b" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={50} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        formatter={(val) => [`${val} times`, 'Actions']}
                      />
                      <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500 text-xs font-mono">
                    Interact with app tools and controls to populate feature telemetry
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 3D Worlds Dwell Times */}
        {activeTab === 'worlds' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white">Complete 3D World Dwell Telemetry</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider">
                    <th className="py-3 px-4">World Name</th>
                    <th className="py-3 px-4">Total Time Spent</th>
                    <th className="py-3 px-4">Station Visits</th>
                    <th className="py-3 px-4">Avg Dwell / Visit</th>
                    <th className="py-3 px-4">Last Visited</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {worldChartData.length > 0 ? (
                    worldChartData.map((row) => (
                      <tr key={row.name} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                          <span>{row.name}</span>
                        </td>
                        <td className="py-3 px-4 text-cyan-400 font-mono font-bold">
                          {formatSeconds(row.totalSeconds)}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-mono">{row.visitCount} visits</td>
                        <td className="py-3 px-4 text-slate-400 font-mono">{formatSeconds(row.avgSeconds)}</td>
                        <td className="py-3 px-4 text-slate-500 text-xs">
                          {worlds[row.name]?.lastVisited ? new Date(worlds[row.name].lastVisited).toLocaleTimeString() : 'N/A'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-500 font-mono text-xs">
                        No world dwell telemetry recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Apps & Features */}
        {activeTab === 'apps' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white">Sub-App Dwell & In-App Feature Usage</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* App Dwell Time */}
              <div>
                <h4 className="text-sm font-semibold text-cyan-400 mb-2 font-mono uppercase">Time Spent in Apps</h4>
                <div className="space-y-2">
                  {appChartData.length > 0 ? (
                    appChartData.map((app) => (
                      <div key={app.name} className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-slate-200">{app.name}</div>
                          <div className="text-xs text-slate-500 font-mono">{app.visitCount} visits • Avg {formatSeconds(app.avgSeconds)}</div>
                        </div>
                        <div className="text-base font-mono font-bold text-cyan-400">{formatSeconds(app.totalSeconds)}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-500 text-xs font-mono p-4">No app dwell records yet.</div>
                  )}
                </div>
              </div>

              {/* Feature Actions */}
              <div>
                <h4 className="text-sm font-semibold text-emerald-400 mb-2 font-mono uppercase">In-App Feature Interactions</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {Object.values(features).length > 0 ? (
                    Object.values(features).sort((a,b) => b.count - a.count).map((f, idx) => (
                      <div key={idx} className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-slate-200">{f.feature}</div>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">{f.app}</span>
                        </div>
                        <div className="text-sm font-mono font-bold text-emerald-400">{f.count} actions</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-500 text-xs font-mono p-4">No feature actions recorded yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Broken Features & Errors */}
        {activeTab === 'errors' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                  <span>Broken Features & Crash Incident Log</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">Immediate alerts when user interactions fail or crash</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
                {errors.length} incidents logged
              </span>
            </div>

            <div className="space-y-3">
              {errors.length > 0 ? (
                errors.map((err) => (
                  <div key={err.id} className="p-4 bg-slate-950/80 border border-red-900/50 rounded-xl space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${err.isWarning ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}>
                          {err.type}
                        </span>
                        <span className="text-xs font-semibold text-slate-300">[{err.world || err.app || 'Global'}]</span>
                      </div>
                      <span className="text-xs font-mono text-slate-500">{new Date(err.timestamp).toLocaleString()}</span>
                    </div>

                    <div className="font-mono text-xs text-red-300 bg-red-950/30 p-2.5 rounded border border-red-900/40 break-all">
                      {err.message}
                    </div>

                    {err.stack && (
                      <details className="text-xs font-mono text-slate-400">
                        <summary className="cursor-pointer hover:text-white">View Full Stack Trace</summary>
                        <pre className="mt-2 p-2.5 bg-black/80 rounded text-[11px] overflow-x-auto text-slate-400">{err.stack}</pre>
                      </details>
                    )}

                    {err.breadcrumbs && err.breadcrumbs.length > 0 && (
                      <div className="text-[11px] text-slate-400 pt-1">
                        <span className="text-slate-500 font-semibold font-mono">Last User Actions Before Error: </span>
                        {err.breadcrumbs.map((b, i) => `${b.action}${b.data?.target ? ` (${b.data.target})` : ''}`).join(' → ')}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 border border-dashed border-slate-800 rounded-xl">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="font-semibold text-white">System 100% Operational</p>
                  <p className="text-xs text-slate-500 mt-1">Zero crash incidents or broken feature errors recorded.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: User Feedback & Suggestions */}
        {activeTab === 'feedback' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-yellow-400" />
                  <span>User Feedback & Improvement Suggestions</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">Direct responses submitted via the interactive feedback widget</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                {feedback.length} submissions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feedback.length > 0 ? (
                feedback.map((fb) => (
                  <div key={fb.id} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-400 font-bold">
                        {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                        <span className="text-xs text-slate-400 font-normal ml-1">({fb.app || 'Global'})</span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{new Date(fb.timestamp).toLocaleDateString()}</span>
                    </div>

                    {fb.liked && (
                      <div className="text-xs text-slate-300">
                        <strong className="text-cyan-400">Liked:</strong> {fb.liked}
                      </div>
                    )}

                    {fb.suggestions && (
                      <div className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800">
                        <strong className="text-emerald-400">Suggestion for Improvement:</strong>
                        <p className="mt-1 text-slate-200">{fb.suggestions}</p>
                      </div>
                    )}

                    {fb.userEmail && (
                      <div className="text-[11px] text-slate-500 font-mono">
                        User: <a href={`mailto:${fb.userEmail}`} className="text-cyan-400 hover:underline">{fb.userEmail}</a>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                  No explicit feedback submitted yet. Users will be invited to share their thoughts via the floating widget.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 6: Daily Analytics Email */}
        {activeTab === 'email' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span>Daily Analytics Email Dispatcher</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">Automatic 24-hour summary rollup delivered to your inbox</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400 w-64"
                  placeholder="recipient@example.com"
                />
                <button
                  onClick={handleSendDigest}
                  disabled={isSendingEmail}
                  className="flex items-center gap-2 px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-cyan-500/25 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSendingEmail ? 'Sending...' : 'Send Digest Now'}</span>
                </button>
              </div>
            </div>

            {sendResult && (
              <div className={`p-4 rounded-lg text-xs font-mono flex items-center gap-2 ${sendResult.success ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' : 'bg-red-950/60 border border-red-500/40 text-red-300'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>{sendResult.message}</span>
              </div>
            )}

            {/* Live HTML Email Preview Frame */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2 font-semibold uppercase flex items-center justify-between">
                <span>Live Email Preview (Recipient: {recipientEmail})</span>
                <span className="text-cyan-400 text-[11px]">Matches Netlify Scheduled Email Format</span>
              </div>
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <iframe
                  title="Daily Email Preview"
                  srcDoc={analytics.generateDailyEmailHtml(recipientEmail)}
                  className="w-full h-[600px] border-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
