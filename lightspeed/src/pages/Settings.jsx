import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Settings() {
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const carriers = [
    { name: 'Verizon', gateway: '@vtext.com' },
    { name: 'AT&T', gateway: '@txt.att.net' },
    { name: 'T-Mobile', gateway: '@tmomail.net' },
    { name: 'Sprint', gateway: '@messaging.sprintpcs.com' },
    { name: 'Google Fi', gateway: '@msg.fi.google.com' },
    { name: 'US Cellular', gateway: '@email.uscc.net' }
  ];

  useEffect(() => {
    loadProfiles();
  }, []);

  async function loadProfiles() {
    const { data } = await supabase.from('user_preferences').select('*').order('created_at', { ascending: false });
    if (data) {
      setProfiles(data);
    }
  }

  const handleAddNew = () => {
    setActiveProfile({ id: null, name: '', email: '', phone_number: '', carrier_gateway: '@vtext.com' });
    setIsEditing(true);
    setMessage(null);
  };

  const handleEdit = (profile) => {
    setActiveProfile({ ...profile });
    setIsEditing(true);
    setMessage(null);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this alert profile?")) return;
    
    try {
      const { error } = await supabase.from('user_preferences').delete().eq('id', id);
      if (error) throw error;
      
      setProfiles(profiles.filter(p => p.id !== id));
      if (activeProfile?.id === id) {
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error deleting profile", err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    
    try {
      if (activeProfile.id) {
        const { error } = await supabase.from('user_preferences').update({
          name: activeProfile.name,
          email: activeProfile.email,
          phone_number: activeProfile.phone_number,
          carrier_gateway: activeProfile.carrier_gateway
        }).eq('id', activeProfile.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase.from('user_preferences').insert([{
          name: activeProfile.name,
          email: activeProfile.email,
          phone_number: activeProfile.phone_number,
          carrier_gateway: activeProfile.carrier_gateway
        }]);
        
        if (error) throw error;
      }
      
      setMessage({ type: 'success', text: 'Profile saved successfully.' });
      loadProfiles();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error saving profile.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-content fade-in">
      <h2>Global Settings</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Configure your alert routing destinations. Manage multiple profiles to alert different teams simultaneously.
      </p>

      {message && (
        <div style={{ 
          padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px', maxWidth: '800px',
          background: message.type === 'success' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
          color: message.type === 'success' ? 'var(--accent-green)' : 'var(--accent-red)',
          border: `1px solid ${message.type === 'success' ? 'var(--accent-green)' : 'var(--accent-red)'}`
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '1000px' }}>
        
        {/* Left Column: Saved Profiles */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Saved Profiles</h3>
            <button 
              className="btn" 
              onClick={handleAddNew}
              style={{ background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              + Add New
            </button>
          </div>
          
          {profiles.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>No profiles created yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {profiles.map(profile => (
                <div 
                  key={profile.id}
                  className="widget glass hover-glow"
                  onClick={() => handleEdit(profile)}
                  style={{ 
                    padding: '1rem', 
                    cursor: 'pointer', 
                    borderLeft: activeProfile?.id === profile.id ? '3px solid var(--accent-blue)' : '3px solid transparent'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0' }}>{profile.name || 'Unnamed Profile'}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <div>📧 {profile.email || 'No email'}</div>
                        <div>📱 {profile.phone_number ? `${profile.phone_number}${profile.carrier_gateway}` : 'No phone'}</div>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => handleDelete(profile.id, e)}
                      style={{ background: 'transparent', border: '1px solid var(--border-glass)', color: 'var(--accent-red)', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Edit Form */}
        {isEditing ? (
          <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>{activeProfile.id ? 'Edit Profile' : 'New Profile'}</h3>
              <button 
                onClick={() => setIsEditing(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Profile Name</label>
                <input 
                  type="text" 
                  value={activeProfile.name || ''} 
                  onChange={e => setActiveProfile({...activeProfile, name: e.target.value})}
                  placeholder="e.g., DevOps Team"
                  required
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address</label>
                <input 
                  type="email" 
                  value={activeProfile.email || ''} 
                  onChange={e => setActiveProfile({...activeProfile, email: e.target.value})}
                  placeholder="e.g., admin@lightspeed.com"
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 2 }}>
                  <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Phone Number (SMS)</label>
                  <input 
                    type="tel" 
                    value={activeProfile.phone_number || ''} 
                    onChange={e => setActiveProfile({...activeProfile, phone_number: e.target.value.replace(/\D/g, '')})}
                    placeholder="1234567890"
                    maxLength="10"
                    className="form-input"
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mobile Carrier</label>
                  <select 
                    value={activeProfile.carrier_gateway || '@vtext.com'} 
                    onChange={e => setActiveProfile({...activeProfile, carrier_gateway: e.target.value})}
                    className="form-input"
                  >
                    {carriers.map(c => <option key={c.gateway} value={c.gateway}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={saving}
                style={{
                  padding: '1rem', marginTop: '1rem', borderRadius: '6px', border: 'none',
                  background: 'var(--accent-blue)', color: 'white', fontWeight: 'bold',
                  cursor: saving ? 'wait' : 'pointer'
                }}
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderColor: 'var(--border-glass)', opacity: 0.8 }}>
            <p style={{ color: 'var(--text-muted)' }}>Select a profile to edit or add a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
