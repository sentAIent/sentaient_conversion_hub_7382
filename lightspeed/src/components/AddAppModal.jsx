import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AddAppModal({ onClose, onAppAdded }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ id: '', name: '', type: 'Website', client_token: '' });
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const generateId = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const generatedToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setFormData({ ...formData, name, id: generateId(name), client_token: generatedToken });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name) return;
    
    setSaving(true);
    setErrorMsg(null);

    const { error } = await supabase.from('apps').insert([formData]);
    setSaving(false);

    if (error) {
      if (error.code === '23505') {
        setErrorMsg('An app with this ID already exists. Try a different name or manually change the ID.');
      } else {
        setErrorMsg(error.message);
      }
    } else {
      setStep(2); // Show snippet
      if (onAppAdded) onAppAdded(formData);
    }
  };

  const renderSnippet = () => {
    if (formData.type === 'Website') {
      return (
        <pre style={{ background: '#111', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.8rem', color: 'var(--text-main)', border: '1px solid var(--border-glass)' }}>
{`<script>
  window.LIGHTSPEED_CONFIG = {
    source: "${formData.id}",
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
      );
    } else {
      return (
        <pre style={{ background: '#111', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.8rem', color: 'var(--text-main)', border: '1px solid var(--border-glass)' }}>
{`// iOS / Android Setup
// Send standard HTTP POST to Supabase REST API
POST /rest/v1/metrics
Headers:
  apikey: YOUR_ANON_KEY
  Authorization: Bearer YOUR_ANON_KEY
Body: {
  "site": "${formData.id}",
  "metric_name": "app_launch_time",
  "value": 1.2
}`}
        </pre>
      );
    }
  };

  return (
    <div className="modal-backdrop fade-in" onClick={step === 2 ? onClose : undefined} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div className="modal-content glass" onClick={e => e.stopPropagation()} style={{
        width: '90%', maxWidth: '500px', padding: '2rem',
        borderRadius: '12px', border: '1px solid var(--border-glass)'
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>{step === 1 ? 'Add Application' : 'Integration Setup'}</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {errorMsg && (
              <div style={{ padding: '0.8rem', background: 'rgba(255,0,0,0.1)', color: 'var(--accent-red)', border: '1px solid var(--accent-red)', borderRadius: '6px', fontSize: '0.9rem' }}>
                {errorMsg}
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Application Name</label>
              <input 
                autoFocus
                required
                value={formData.name} 
                onChange={handleNameChange}
                placeholder="e.g., Marketing Site"
                style={{ padding: '0.8rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', color: 'white' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Unique ID (Used in logs)</label>
              <input 
                required
                value={formData.id} 
                onChange={e => setFormData({...formData, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})}
                placeholder="e.g., marketing-site"
                style={{ padding: '0.8rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', color: 'white' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Platform</label>
              <select 
                value={formData.type} 
                onChange={e => setFormData({...formData, type: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', color: 'white' }}
              >
                <option>Website</option>
                <option>iOS App</option>
                <option>Android App</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={saving}
              style={{
                padding: '1rem', marginTop: '1rem', borderRadius: '6px', border: 'none',
                background: 'var(--accent-blue)', color: 'white', fontWeight: 'bold', cursor: saving ? 'wait' : 'pointer'
              }}
            >
              {saving ? 'Saving...' : 'Register App'}
            </button>
          </form>
        ) : (
          <div>
            <div style={{ marginBottom: '1rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>✓</span> Successfully registered {formData.name}!
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Paste the following code into your project to begin sending metrics and errors to LightSpeed.
            </p>
            
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '6px', marginBottom: '1rem', border: '1px solid var(--border-glass)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-blue)' }}>Client Portal URL</h4>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Share this secure link with your client so they can view their specific audits and status page:</p>
              <a href={`/client/${formData.client_token}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', wordBreak: 'break-all' }}>
                {window.location.origin}/client/{formData.client_token}
              </a>
            </div>
            
            {renderSnippet()}

            <button 
              onClick={onClose}
              style={{
                width: '100%', padding: '1rem', marginTop: '1.5rem', borderRadius: '6px', border: 'none',
                background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 'bold', cursor: 'pointer'
              }}
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
