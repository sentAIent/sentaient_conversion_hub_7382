import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { supabase } from '../lib/supabase';
import IncidentModal from '../components/IncidentModal';
import AddAppModal from '../components/AddAppModal';

const TIMEZONES = [
  { label: 'Local Browser Time', value: 'local' },
  { label: 'UTC', value: 'UTC' },
  { label: 'US Eastern', value: 'America/New_York' },
  { label: 'US Central', value: 'America/Chicago' },
  { label: 'US Mountain', value: 'America/Denver' },
  { label: 'US Pacific', value: 'America/Los_Angeles' },
  { label: 'Europe/London', value: 'Europe/London' },
  { label: 'Europe/Paris', value: 'Europe/Paris' },
  { label: 'Asia/Tokyo', value: 'Asia/Tokyo' },
  { label: 'Australia/Sydney', value: 'Australia/Sydney' }
];

const LOOKBACKS = [
  { label: 'Last 4 Hours', value: '4h' },
  { label: 'Last 24 Hours', value: '24h' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 1 Year', value: '1y' }
];

export default function AppDirectory({ errors, onFix }) {
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [apps, setApps] = useState([]);
  const [isAddingApp, setIsAddingApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');
  const [editStatusPageValue, setEditStatusPageValue] = useState('');
  
  // Performance History States
  const [appMetrics, setAppMetrics] = useState([]);
  const [timeZone, setTimeZone] = useState('local');
  const [lookback, setLookback] = useState('24h');
  const [metricsLoading, setMetricsLoading] = useState(false);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const { data } = await supabase.from('apps').select('*').order('created_at', { ascending: false });
    if (data) setApps(data);
    setLoading(false);
  };

  const handleAppAdded = (newApp) => {
    setApps([newApp, ...apps]);
  };

  const handleSaveName = async () => {
    const { error } = await supabase
      .from('apps')
      .update({ name: editNameValue, status_page_url: editStatusPageValue })
      .eq('id', selectedApp.id);
      
    if (!error) {
      const updatedApp = { ...selectedApp, name: editNameValue, status_page_url: editStatusPageValue };
      setSelectedApp(updatedApp);
      setApps(apps.map(a => a.id === selectedApp.id ? updatedApp : a));
      setIsEditingName(false);
    } else {
      console.error("Error updating app name:", error);
    }
  };

  const handleGenerateToken = async () => {
    const generatedToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const { error } = await supabase
      .from('apps')
      .update({ client_token: generatedToken })
      .eq('id', selectedApp.id);
      
    if (!error) {
      const updatedApp = { ...selectedApp, client_token: generatedToken };
      setSelectedApp(updatedApp);
      setApps(apps.map(a => a.id === selectedApp.id ? updatedApp : a));
    }
  };

  const fetchAndAggregateMetrics = async () => {
    if (!selectedApp) return;
    setMetricsLoading(true);

    const now = new Date();
    let startTime = new Date();
    if (lookback === '4h') startTime.setHours(now.getHours() - 4);
    else if (lookback === '24h') startTime.setHours(now.getHours() - 24);
    else if (lookback === '7d') startTime.setDate(now.getDate() - 7);
    else if (lookback === '30d') startTime.setDate(now.getDate() - 30);
    else if (lookback === '1y') startTime.setFullYear(now.getFullYear() - 1);

    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .eq('site', selectedApp.id)
      .eq('metric_name', 'page_load_time')
      .gte('created_at', startTime.toISOString())
      .order('created_at', { ascending: true });

    if (error || !data) {
      console.error("Failed to fetch metrics", error);
      setAppMetrics([]);
      setMetricsLoading(false);
      return;
    }

    const targetTZ = timeZone === 'local' ? Intl.DateTimeFormat().resolvedOptions().timeZone : timeZone;

    const formatInTZ = (dateObj, options) => {
      try {
        return new Intl.DateTimeFormat('en-US', { ...options, timeZone: targetTZ }).format(dateObj);
      } catch (e) {
        return new Intl.DateTimeFormat('en-US', options).format(dateObj);
      }
    };

    let groupKeyFn;
    let formatDisplayFn;

    if (lookback === '4h' || lookback === '24h') {
      // Group by Hour
      groupKeyFn = (d) => formatInTZ(d, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false });
      formatDisplayFn = (d) => formatInTZ(d, { hour: 'numeric', minute: '2-digit' });
    } else if (lookback === '7d' || lookback === '30d') {
      // Group by Day
      groupKeyFn = (d) => formatInTZ(d, { year: 'numeric', month: '2-digit', day: '2-digit' });
      formatDisplayFn = (d) => formatInTZ(d, { month: 'short', day: 'numeric' });
    } else {
      // Group by Month
      groupKeyFn = (d) => formatInTZ(d, { year: 'numeric', month: '2-digit' });
      formatDisplayFn = (d) => formatInTZ(d, { month: 'short', year: '2-digit' });
    }

    const grouped = {};
    data.forEach(row => {
      const d = new Date(row.created_at);
      const key = groupKeyFn(d);
      if (!grouped[key]) {
        grouped[key] = {
          dateObj: d,
          displayTime: formatDisplayFn(d),
          totalLatency: 0,
          count: 0
        };
      }
      grouped[key].totalLatency += parseFloat(row.value) || 0;
      grouped[key].count += 1;
    });

    const aggregated = Object.values(grouped).map(bucket => ({
      time: bucket.displayTime,
      latency: Math.round(bucket.totalLatency / bucket.count),
      timestamp: bucket.dateObj.getTime()
    })).sort((a, b) => a.timestamp - b.timestamp);

    setAppMetrics(aggregated);
    setMetricsLoading(false);
  };

  useEffect(() => {
    if (selectedApp) {
      fetchAndAggregateMetrics();
    }
  }, [selectedApp, lookback, timeZone]);

  const appErrors = errors ? errors.filter(e => e.source === selectedApp?.id) : [];

  return (
    <div className="page-content fade-in">
      <h2>App Directory & History</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Select an application or website to view its individual performance history and incident logs.
      </p>

      {!selectedApp ? (
        <div className="widgets-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {apps.map(app => (
            <div 
              key={app.id} 
              className="widget glass hover-glow" 
              onClick={() => { setSelectedApp(app); setIsEditingName(false); }}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1rem' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {app.type === 'Website' ? '🌐' : '📱'}
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{app.name}</h3>
              <span className="badge safe" style={{ fontSize: '0.75rem' }}>{app.type}</span>
            </div>
          ))}
          
          <div 
            className="widget glass hover-glow" 
            onClick={() => setIsAddingApp(true)}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 1rem', borderStyle: 'dashed', opacity: 0.8 }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>+</div>
            <h3 style={{ margin: 0 }}>Add Application</h3>
          </div>
        </div>
      ) : (
        <div className="app-details fade-in">
          <button 
            className="btn" 
            onClick={() => setSelectedApp(null)}
            style={{ background: 'transparent', border: '1px solid var(--border-glass)', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', marginBottom: '2rem' }}
          >
            &larr; Back to Directory
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2.5rem' }}>{selectedApp.type === 'Website' ? '🌐' : '📱'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                {isEditingName ? (
                  <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        value={editNameValue} 
                        onChange={(e) => setEditNameValue(e.target.value)}
                        className="form-input"
                        placeholder="App Name"
                        style={{ fontSize: '1.2rem', padding: '0.2rem 0.5rem', width: '300px' }}
                        autoFocus
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        value={editStatusPageValue} 
                        onChange={(e) => setEditStatusPageValue(e.target.value)}
                        className="form-input"
                        placeholder="Status Page URL (e.g. http://localhost:3001/status/app)"
                        style={{ fontSize: '0.9rem', padding: '0.2rem 0.5rem', width: '300px' }}
                      />
                      <button className="btn" onClick={handleSaveName} style={{ padding: '0.2rem 1rem' }}>Save</button>
                      <button className="btn" onClick={() => setIsEditingName(false)} style={{ padding: '0.2rem 1rem', background: 'transparent', border: '1px solid var(--border-glass)' }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{selectedApp.name}</h2>
                    <button 
                      onClick={() => { setEditNameValue(selectedApp.name); setEditStatusPageValue(selectedApp.status_page_url || ''); setIsEditingName(true); }}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}
                      title="Edit Settings"
                    >
                      ✏️
                    </button>
                  </>
                )}
              </div>
              <span className="badge safe">{selectedApp.type}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <h3>Performance History (Latency)</h3>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select 
                    className="form-input" 
                    value={timeZone} 
                    onChange={(e) => setTimeZone(e.target.value)}
                    style={{ padding: '0.4rem', fontSize: '0.85rem' }}
                  >
                    {TIMEZONES.map(tz => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
                  </select>
                  
                  <select 
                    className="form-input" 
                    value={lookback} 
                    onChange={(e) => setLookback(e.target.value)}
                    style={{ padding: '0.4rem', fontSize: '0.85rem' }}
                  >
                    {LOOKBACKS.map(lb => <option key={lb.value} value={lb.value}>{lb.label}</option>)}
                  </select>
                </div>
              </div>
              
              <div style={{ height: '250px', marginTop: '1rem', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {metricsLoading ? (
                  <div style={{ color: 'var(--text-muted)' }}>Loading metrics...</div>
                ) : appMetrics.length === 0 ? (
                  <div style={{ color: 'var(--text-muted)' }}>No performance data in this timeframe.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={appMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" vertical={false} />
                      <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid var(--border-glass)', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="latency" name="Latency (ms)" stroke="var(--accent-blue)" strokeWidth={3} dot={{ r: 4, fill: 'var(--accent-blue)' }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3>Incident History</h3>
              {appErrors.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
                  No incidents recorded for this app.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', maxHeight: '250px', overflowY: 'auto' }}>
                  {appErrors.map(error => (
                    <div 
                      key={error.id} 
                      className="glass hover-glow" 
                      onClick={() => setSelectedIncident(error)}
                      style={{ padding: '1rem', borderLeft: error.fixed ? '3px solid var(--accent-green)' : '3px solid var(--accent-red)', cursor: 'pointer' }}
                    >
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>{error.title}</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {error.id}</span>
                        <span className={`badge ${error.fixed ? 'safe' : 'danger'}`} style={{ fontSize: '0.65rem' }}>
                          {error.fixed ? 'Resolved' : 'Active'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedApp.client_token ? (
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Client Portal Access</h3>
                <a href={`/client/${selectedApp.client_token}`} target="_blank" rel="noreferrer" className="btn" style={{ background: 'var(--accent-blue)', color: 'white', textDecoration: 'none', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                  Open Portal ↗
                </a>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Share this secure link with your client so they can view their specific audits and status page:
                <br/>
                <code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'block', marginTop: '0.5rem' }}>
                  {window.location.origin}/client/{selectedApp.client_token}
                </code>
              </p>
              
              <h4 style={{ margin: '1rem 0 0.5rem 0', color: 'var(--accent-blue)' }}>Tracking Snippet</h4>
              <pre style={{ background: '#111', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.8rem', color: 'var(--text-main)', border: '1px solid var(--border-glass)' }}>
{`<script>
  window.LIGHTSPEED_CONFIG = {
    source: "${selectedApp.id}",
    supabaseUrl: "YOUR_SUPABASE_URL",
    anonKey: "YOUR_ANON_KEY"
  };

  window.addEventListener('load', () => {
    setTimeout(() => {
      try {
        const config = window.LIGHTSPEED_CONFIG;
        let loadTimeMs = 0;
        
        const navEntries = performance.getEntriesByType("navigation");
        if (navEntries.length > 0 && navEntries[0].loadEventEnd > 0) {
          loadTimeMs = navEntries[0].loadEventEnd - navEntries[0].startTime;
        } else {
          const timing = performance.timing;
          loadTimeMs = timing.loadEventEnd - timing.navigationStart;
        }

        if (loadTimeMs > 0 && loadTimeMs <= 60000) {
          fetch(config.supabaseUrl + '/rest/v1/metrics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': config.anonKey,
              'Authorization': 'Bearer ' + config.anonKey
            },
            body: JSON.stringify({
              site: config.source,
              metric_name: 'page_load_time',
              value: loadTimeMs
            }),
            keepalive: true
          });
        }
      } catch (e) {
        console.error("Lightspeed Tracker Error:", e);
      }
    }, 0);
  });
</script>`}
              </pre>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Client Portal Access</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Generate a unique token to give your client a secure view of this app.</p>
              </div>
              <button onClick={handleGenerateToken} className="btn" style={{ background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
                Generate Portal Link
              </button>
            </div>
          )}

          {selectedApp.status_page_url && (
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-glass)' }}>
                <h3 style={{ margin: 0 }}>Live Status Page</h3>
              </div>
              <iframe 
                src={selectedApp.status_page_url} 
                style={{ width: '100%', height: '100%', border: 'none' }}
                title={`${selectedApp.name} Status Page`}
              />
            </div>
          )}
        </div>
      )}

      <IncidentModal 
        incident={selectedIncident} 
        onClose={() => setSelectedIncident(null)} 
        onFix={onFix} 
      />

      {isAddingApp && (
        <AddAppModal 
          onClose={() => setIsAddingApp(false)} 
          onAppAdded={(app) => { handleAppAdded(app); setIsAddingApp(false); }} 
        />
      )}
    </div>
  );
}
