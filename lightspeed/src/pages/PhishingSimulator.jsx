import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Target, Send, Users, ShieldAlert, BarChart } from 'lucide-react';

export default function PhishingSimulator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [trend, setTrend] = useState('IT');
  const [campaign, setCampaign] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8001/generate-phishing-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trend, target_count: 50 })
      });
      const data = await res.json();
      setCampaign(data.campaign);
    } catch (err) {
      console.error(err);
      alert('Error generating campaign');
    }
    setLoading(false);
  };

  return (
    <div className="page-content fade-in" style={{ padding: '2rem', color: 'white' }}>
      <h1><Target size={32} /> Phishing Simulator & Training</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Autonomously generate highly personalized phishing tests for employees based on current trends.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* Generator Controls */}
        <div style={{ background: 'rgba(25, 25, 35, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3>New Campaign</h3>
          <label style={{ display: 'block', marginTop: '1rem', color: '#aaa' }}>Current Threat Trend Theme</label>
          <select 
            value={trend} 
            onChange={(e) => setTrend(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', marginTop: '0.5rem' }}
          >
            <option value="IT">IT Support/Password Expiry</option>
            <option value="HR">HR/Security Training</option>
            <option value="Tax">W2/Tax Season Scams</option>
          </select>
          
          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="glass-button" 
            style={{ marginTop: '2rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
          >
            <Send size={16} /> {loading ? 'Generating AI Campaign...' : 'Generate & Deploy'}
          </button>
        </div>

        {/* Live Campaign View */}
        <div style={{ background: 'rgba(25, 25, 35, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3>Live Campaign Status</h3>
          {campaign ? (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <p><strong>Name:</strong> {campaign.name}</p>
                <p><strong>Subject:</strong> {campaign.email_subject}</p>
                <p><strong>Spoofed Sender:</strong> {campaign.sender_spoof}</p>
                <div style={{ background: '#222', padding: '1rem', marginTop: '1rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
                  {campaign.email_body}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <Users size={24} color="#aaa" />
                  <h2 style={{ margin: '0.5rem 0' }}>{campaign.target_count}</h2>
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Employees Targeted</span>
                </div>
                <div style={{ background: 'rgba(255,50,50,0.1)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <ShieldAlert size={24} color="#ff4444" />
                  <h2 style={{ margin: '0.5rem 0', color: '#ff4444' }}>12%</h2>
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Click Rate (Vulnerable)</span>
                </div>
                <div style={{ background: 'rgba(50,255,50,0.1)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <BarChart size={24} color="#44ff44" />
                  <h2 style={{ margin: '0.5rem 0', color: '#44ff44' }}>88%</h2>
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Resilience Score</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h4>Live Webhook Testing</h4>
                <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Simulate an employee interacting with the payload.</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button onClick={async () => {
                    await fetch('http://localhost:8001/phishing/track/open/emp_123');
                    alert('Mock SES Open Webhook received.');
                  }} style={{ padding: '0.5rem', background: '#333', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Simulate 'Open' Event
                  </button>
                  <button onClick={async () => {
                    await fetch('http://localhost:8001/phishing/track/click/emp_123');
                    alert('Mock SES Click Webhook received.');
                  }} style={{ padding: '0.5rem', background: 'rgba(255,50,50,0.5)', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Simulate 'Click' Event (Fail)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: '2rem', color: '#666', textAlign: 'center' }}>
              No active campaigns. Generate one to see live tracking.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
