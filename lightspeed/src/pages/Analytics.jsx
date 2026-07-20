import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function Analytics() {
  const [analytics, setAnalytics] = useState([]);
  const [selectedApp, setSelectedApp] = useState('All Apps');
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch unique apps from analytics and apps table
      const { data: appsData } = await supabase.from('apps').select('name');
      const { data: analyticsSites } = await supabase.from('web_analytics').select('site');
      
      const uniqueApps = new Set();
      if (appsData) appsData.forEach(a => uniqueApps.add(a.name));
      if (analyticsSites) analyticsSites.forEach(a => uniqueApps.add(a.site));
      
      setApps(['All Apps', ...Array.from(uniqueApps)]);

      // Fetch analytics
      let query = supabase.from('web_analytics').select('*').order('created_at', { ascending: false }).limit(500);
      if (selectedApp !== 'All Apps') {
        query = query.eq('site', selectedApp);
      }
      
      const { data } = await query;
      if (data && data.length > 0) {
        setAnalytics(data);
      } else {
        setAnalytics([]);
      }
    };

    fetchData();
  }, [selectedApp]);

  // Mock data for when table is empty (wow factor)
  const mockTrend = [
    { time: '08:00', views: 120 }, { time: '09:00', views: 250 }, { time: '10:00', views: 340 },
    { time: '11:00', views: 280 }, { time: '12:00', views: 500 }, { time: '13:00', views: 420 },
    { time: '14:00', views: 610 }, { time: '15:00', views: 800 }
  ];
  
  const mockReferrers = [
    { name: 'Google', value: 45 }, { name: 'Direct', value: 30 }, { name: 'Twitter', value: 15 }, { name: 'LinkedIn', value: 10 }
  ];

  const mockDevices = [
    { name: 'Mobile', value: 65 }, { name: 'Desktop', value: 35 }
  ];
  const COLORS = ['#00ffcc', '#ff00cc', '#00ccff', '#ffcc00'];

  const hasData = analytics.length > 0;

  // Data Processing
  let realTrend = [];
  let realReferrers = [];
  let realDevices = [];
  let liveVisitors = 0;
  
  let mobilePerc = 65;
  let desktopPerc = 35;

  if (hasData) {
    // Referrers
    const refMap = {};
    analytics.forEach(v => {
      let r = v.referrer || 'Direct';
      if (r === '') r = 'Direct';
      if (r.includes('google')) r = 'Google';
      if (r.includes('twitter') || r.includes('x.com')) r = 'Twitter';
      if (r.includes('linkedin')) r = 'LinkedIn';
      refMap[r] = (refMap[r] || 0) + 1;
    });
    realReferrers = Object.entries(refMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // Devices
    const devMap = {};
    analytics.forEach(v => {
      let d = v.device_type || 'Unknown';
      devMap[d] = (devMap[d] || 0) + 1;
    });
    realDevices = Object.entries(devMap).map(([name, value]) => ({ name, value }));

    const totalDev = realDevices.reduce((sum, d) => sum + d.value, 0);
    const mobileCount = devMap['Mobile'] || 0;
    const desktopCount = devMap['Desktop'] || 0;
    if (totalDev > 0) {
      mobilePerc = Math.round((mobileCount / totalDev) * 100);
      desktopPerc = Math.round((desktopCount / totalDev) * 100);
    }

    // Trend (group by time)
    const trendMap = {};
    [...analytics].reverse().forEach(v => {
      const time = new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      trendMap[time] = (trendMap[time] || 0) + 1;
    });
    realTrend = Object.entries(trendMap).map(([time, views]) => ({ time, views }));

    // Live visitors (unique sessions in last 5 mins)
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recent = analytics.filter(v => new Date(v.created_at) > fiveMinsAgo);
    const uniqueSessions = new Set(recent.map(v => v.session_id));
    liveVisitors = uniqueSessions.size;
  }

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Marketing & Traffic Analytics</h1>
        <select 
          className="input-field" 
          value={selectedApp} 
          onChange={(e) => setSelectedApp(e.target.value)}
          style={{ width: '200px', backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          {apps.map(app => (
            <option key={app} value={app}>{app}</option>
          ))}
        </select>
      </div>
      
      <div className="widgets-grid" style={{ marginBottom: '2rem' }}>
        <div className="widget glass" style={{ gridColumn: '1 / -1', height: '350px' }}>
          <h3>Traffic Trends (Page Views)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={hasData ? realTrend : mockTrend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid var(--border-glass)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--accent)' }}
              />
              <Line type="monotone" dataKey="views" stroke="#00ccff" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="widgets-grid">
        <div className="widget glass" style={{ height: '300px' }}>
          <h3>Top Referrers</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={hasData ? realReferrers : mockReferrers} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="var(--text-muted)" />
              <YAxis dataKey="name" type="category" stroke="var(--text-muted)" width={80} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: 'rgba(20,20,20,0.9)', borderColor: 'var(--border-glass)' }} />
              <Bar dataKey="value" fill="#ff00cc" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="widget glass" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
          <h3>Device Breakdown</h3>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={hasData ? realDevices : mockDevices}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {(hasData ? realDevices : mockDevices).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'rgba(20,20,20,0.9)', borderColor: 'var(--border-glass)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: 'auto' }}>
            <span style={{ color: COLORS[0] }}>● Mobile ({mobilePerc}%)</span>
            <span style={{ color: COLORS[1] }}>● Desktop ({desktopPerc}%)</span>
          </div>
        </div>
        
        <div className="widget glass" style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>Active Live Visitors</h3>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#00ffcc', textShadow: '0 0 20px rgba(0, 255, 204, 0.5)' }}>
            {hasData ? liveVisitors : 42}
          </div>
          <p className="subtitle">Right now</p>
          {!hasData && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
              Waiting for real user traffic...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
