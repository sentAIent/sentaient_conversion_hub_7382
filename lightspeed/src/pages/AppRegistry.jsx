import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './AppRegistry.css';

export default function AppRegistry() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: 'Website',
    url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching apps:', error);
    } else {
      setApps(data || []);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Auto-generate ID from name if not provided
    const appId = formData.id.trim() || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const { error } = await supabase
      .from('apps')
      .insert([
        { 
          id: appId,
          name: formData.name,
          type: formData.type,
          url: formData.url
        }
      ]);

    if (error) {
      alert('Error registering app: ' + error.message);
    } else {
      setFormData({ id: '', name: '', type: 'Website', url: '' });
      fetchApps();
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to remove ${id}?`)) return;
    
    const { error } = await supabase
      .from('apps')
      .delete()
      .eq('id', id);
      
    if (error) {
      alert('Error deleting app: ' + error.message);
    } else {
      fetchApps();
    }
  };

  return (
    <div className="app-registry">
      <header className="registry-header">
        <h1>App Registry</h1>
        <p>Register applications to be monitored for uptime and performance.</p>
      </header>

      <div className="registry-content">
        <section className="registration-form-section">
          <div className="glass-panel">
            <h2>Add New Application</h2>
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label>App Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Sentaient API" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>App ID (Optional)</label>
                <input 
                  type="text" 
                  name="id" 
                  value={formData.id} 
                  onChange={handleInputChange} 
                  placeholder="Auto-generated if left blank" 
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange}>
                  <option value="Website">Website</option>
                  <option value="API">API</option>
                  <option value="Mobile">Mobile App Endpoint</option>
                </select>
              </div>

              <div className="form-group">
                <label>Target URL (For monitoring)</label>
                <input 
                  type="url" 
                  name="url" 
                  value={formData.url} 
                  onChange={handleInputChange} 
                  placeholder="https://sentaient.com" 
                  required 
                />
              </div>

              <button type="submit" className="glass-button primary" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register App'}
              </button>
            </form>
          </div>
        </section>

        <section className="registered-apps-section">
          <h2>Monitored Applications</h2>
          {loading ? (
            <p>Loading apps...</p>
          ) : apps.length === 0 ? (
            <p className="no-data">No applications registered yet.</p>
          ) : (
            <div className="apps-grid">
              {apps.map(app => (
                <div key={app.id} className="app-card">
                  <div className="app-card-header">
                    <h3>{app.name}</h3>
                    <span className="app-type-badge">{app.type}</span>
                  </div>
                  <p className="app-id">ID: <code>{app.id}</code></p>
                  <p className="app-url"><a href={app.url} target="_blank" rel="noopener noreferrer">{app.url}</a></p>
                  <div className="app-card-actions">
                    <button className="text-button danger" onClick={() => handleDelete(app.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
