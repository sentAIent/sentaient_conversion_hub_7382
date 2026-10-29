import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './AiInsightsPanel.css';

export default function AiInsightsPanel({ appId }) {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [telemetry, setTelemetry] = useState({ status: 'Connecting...', latency: 0 });

  useEffect(() => {
    let channel;
    if (appId) {
      fetchInsights();
      
      // Set up real-time telemetry heartbeat
      const startTime = Date.now();
      channel = supabase.channel(`telemetry_${appId}`)
        .on('presence', { event: 'sync' }, () => {
          setTelemetry({ status: 'Live', latency: Date.now() - startTime });
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setTelemetry({ status: 'Live', latency: Date.now() - startTime });
          } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
            setTelemetry({ status: 'Disconnected', latency: '-' });
          }
        });
    } else {
      setLoading(false);
    }
    
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [appId]);

  const fetchInsights = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('app_id', appId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (!error && data) {
      setInsights(data);
    }
    setLoading(false);
  };

  if (!appId) return null;

  return (
    <div className="ai-insights-panel">
      <div className="ai-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>🤖 Autonomous SRE (Hugging Face)</h3>
        <div className="telemetry-indicator" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: telemetry.status === 'Live' ? '#64ffda' : '#8892b0' }}>
          <div className="status-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: telemetry.status === 'Live' ? '#64ffda' : '#8892b0', animation: telemetry.status === 'Live' ? 'pulse 2s infinite' : 'none' }}></div>
          <span>{telemetry.status} ({telemetry.latency}ms)</span>
        </div>
      </div>
      {loading ? (
        <p className="loading-text">Analyzing neural pathways...</p>
      ) : insights.length === 0 ? (
        <p className="no-insights">No AI insights generated yet. The app appears stable.</p>
      ) : (
        <div className="insights-list">
          {insights.map(insight => (
            <div key={insight.id} className="insight-card">
              <div className="insight-header">
                <span className={`badge ${insight.insight_type}`}>{insight.insight_type.toUpperCase()}</span>
                <span className="confidence">Confidence: {(insight.confidence * 100).toFixed(0)}%</span>
              </div>
              <p className="insight-content">{insight.content}</p>
              <span className="insight-time">{new Date(insight.created_at).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
