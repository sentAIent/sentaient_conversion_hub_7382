import React, { useState, useEffect } from 'react';
import './index.css';

import { supabase } from './lib/supabase';

import Dashboard from './pages/Dashboard';
import Cybersecurity from './pages/Cybersecurity';
import Performance from './pages/Performance';
import Incidents from './pages/Incidents';
import ErrorReference from './pages/ErrorReference';
import AppDirectory from './pages/AppDirectory';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import ClientPortal from './pages/ClientPortal';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [errors, setErrors] = useState([]);
  const [clientToken, setClientToken] = useState(null);

  useEffect(() => {
    // Check for client portal route
    const path = window.location.pathname;
    if (path.startsWith('/client/')) {
      const token = path.split('/client/')[1];
      if (token) {
        setClientToken(token);
        return; // Skip other setup for client portal
      }
    }
    // 1. Fetch initial incidents
    const fetchIncidents = async () => {
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching incidents:', error);
      } else if (data) {
        // Map database fields to the frontend state structure
        const mappedErrors = data.map(inc => ({
          id: inc.id,
          title: inc.title,
          explanation: inc.explanation,
          fixAction: inc.fix_action,
          fixed: inc.is_fixed
        }));
        setErrors(mappedErrors);
      }
    };

    fetchIncidents();

    // 2. Set up Realtime Subscription
    const channel = supabase
      .channel('public:incidents')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, payload => {
        console.log('Realtime update received!', payload);
        fetchIncidents(); // Quick and easy way to sync state on any change
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleFixError = async (id) => {
    // Optimistic UI update
    setErrors(errors.map(err => 
      err.id === id ? { ...err, fixed: true } : err
    ));

    // Persist to Supabase
    const { error } = await supabase
      .from('incidents')
      .update({ is_fixed: true })
      .eq('id', id);

    if (error) {
      console.error('Error fixing incident:', error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard errors={errors} onFix={handleFixError} />;
      case 'directory':
        return <AppDirectory errors={errors} onFix={handleFixError} />;
      case 'cybersecurity':
        return <Cybersecurity />;
      case 'performance':
        return <Performance />;
      case 'incidents':
        return <Incidents />;
      case 'errors':
        return <ErrorReference errors={errors} onFix={handleFixError} />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard errors={errors} onFix={handleFixError} />;
    }
  };

  if (clientToken) {
    // Render ClientPortal without sidebar and header
    return (
      <div className="app-container" style={{ display: 'block' }}>
        <ClientPortal token={clientToken} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="top-nav">
        <div className="logo">LightSpeed</div>
        <div className="nav-actions">
          <div className="status-indicator safe"></div>
          <span>System Healthy</span>
        </div>
      </header>
      
      <div className="main-content">
        <aside className="sidebar">
          <nav>
            <a 
              href="#dashboard" 
              className={currentPage === 'dashboard' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setCurrentPage('dashboard'); }}
            >
              Dashboard
            </a>
            <a 
              href="#directory" 
              className={currentPage === 'directory' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setCurrentPage('directory'); }}
            >
              App Directory
            </a>
            <a 
              href="#cybersecurity" 
              className={currentPage === 'cybersecurity' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setCurrentPage('cybersecurity'); }}
            >
              Cybersecurity
            </a>
            <a 
              href="#performance" 
              className={currentPage === 'performance' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setCurrentPage('performance'); }}
            >
              Performance
            </a>
            <a 
              href="#incidents" 
              className={currentPage === 'incidents' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setCurrentPage('incidents'); }}
            >
              Incidents
            </a>
            <a 
              href="#errors" 
              className={currentPage === 'errors' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setCurrentPage('errors'); }}
            >
              Error Reference
            </a>
            <a 
              href="#analytics" 
              className={currentPage === 'analytics' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setCurrentPage('analytics'); }}
            >
              Analytics
            </a>
            <a 
              href="#settings" 
              className={currentPage === 'settings' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); setCurrentPage('settings'); }}
            >
              Settings
            </a>
          </nav>
        </aside>
        
        <main className="dashboard">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
