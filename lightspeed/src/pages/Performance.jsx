import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Performance() {
  const [metrics, setMetrics] = useState([]);
  const [serverLoad, setServerLoad] = useState(0);
  const [iops, setIops] = useState(0);
  const [errorRate, setErrorRate] = useState(0);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .eq('metric_name', 'page_load_time')
        .order('created_at', { ascending: true })
        .limit(100);

      if (data) {
        const formattedData = data.map(m => ({
          time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          loadTime: Math.round(m.value),
          site: m.site
        }));
        setMetrics(formattedData);
      }

      // Calculate Server Load based on recent 5 min active users
      const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { data: recentTraffic } = await supabase
        .from('web_analytics')
        .select('session_id')
        .gt('created_at', fiveMinsAgo);
      
      const activeUsers = recentTraffic ? new Set(recentTraffic.map(r => r.session_id)).size : 0;
      setServerLoad(Math.min(100, activeUsers * 2)); // Example proxy metric

      // Calculate IOPS and Error Rate (last 24 hours)
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { count: dailyViews } = await supabase
        .from('web_analytics')
        .select('*', { count: 'exact', head: true })
        .gt('created_at', oneDayAgo);
        
      const { count: dailyErrors } = await supabase
        .from('incidents')
        .select('*', { count: 'exact', head: true })
        .gt('created_at', oneDayAgo);

      setIops((dailyViews || 0) * 5); // Example proxy metric: 5 ops per view
      
      if (dailyViews > 0) {
        setErrorRate(((dailyErrors || 0) / dailyViews) * 100);
      }
    };

    fetchMetrics();

    const channel = supabase
      .channel('public:metrics')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'metrics' }, payload => {
        fetchMetrics();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="page-content fade-in">
      <h1>IT Performance & Infrastructure</h1>
      
      <div className="widgets-grid" style={{ marginBottom: '2rem' }}>
        <div className="widget glass" style={{ gridColumn: '1 / -1', height: '350px' }}>
          <h3>Core Web Vitals: Page Load Time (ms)</h3>
          {metrics.length > 0 ? (
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={metrics} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid var(--border-glass)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--accent)' }}
                />
                <Line type="monotone" dataKey="loadTime" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={[
                { time: '10:00', loadTime: 450 },
                { time: '10:15', loadTime: 520 },
                { time: '10:30', loadTime: 480 },
                { time: '10:45', loadTime: 890 },
                { time: '11:00', loadTime: 320 },
                { time: '11:15', loadTime: 410 },
                { time: '11:30', loadTime: 390 }
              ]} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid var(--border-glass)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--accent)' }}
                />
                <Line type="monotone" dataKey="loadTime" stroke="var(--accent)" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} opacity={0.6} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="widgets-grid">
        <div className="widget glass">
          <h3>Global Server Load</h3>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${serverLoad}%`, backgroundColor: serverLoad > 80 ? 'var(--danger)' : 'var(--accent)' }}></div>
          </div>
          <p className="subtitle" style={{ marginTop: '0.5rem' }}>{serverLoad}% Capacity</p>
        </div>
        <div className="widget glass">
          <h3>Database IOPS</h3>
          <p className="value">{iops >= 1000 ? (iops/1000).toFixed(1) + 'k' : iops}</p>
          <p className="subtitle">Live Proxy Estimation</p>
        </div>
        <div className="widget glass">
          <h3>App Error Rate</h3>
          <p className={errorRate > 1 ? "value danger" : "value safe"}>{errorRate.toFixed(2)}%</p>
          <p className="subtitle">Last 24 hours</p>
        </div>
      </div>
    </div>
  );
}
