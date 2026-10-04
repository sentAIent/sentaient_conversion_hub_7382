import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import KanbanBoard from '../components/KanbanBoard';
import ComplianceAlerts from '../components/ComplianceAlerts';
import CodeAuditModal from '../components/CodeAuditModal';
import ReportGeneratorModal from '../components/ReportGeneratorModal';
import { ShieldCheck, Settings, Github, Search, FileText } from 'lucide-react';

export default function ComplianceBoard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);

  // Profile Form State
  const [industry, setIndustry] = useState('');
  const [regions, setRegions] = useState('');
  const [products, setProducts] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch Profile
    const { data: profileData } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (profileData) {
      setProfile(profileData);
      
      // Fetch Tasks
      const { data: taskData } = await supabase
        .from('compliance_tasks')
        .select('*')
        .eq('company_id', user.id)
        .order('created_at', { ascending: false });
      if (taskData) setTasks(taskData);

      // Fetch Alerts
      const { data: alertData } = await supabase
        .from('compliance_alerts')
        .select('*')
        .eq('company_id', user.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false });
      if (alertData) setAlerts(alertData);
    } else {
      setShowProfileModal(true);
    }
    
    setLoading(false);
  };

  const handleGenerateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const regionsList = regions.split(',').map(s => s.trim());
    const productsList = products.split(',').map(s => s.trim());

    // Call AI Engine to generate tasks
    try {
      const response = await fetch('http://localhost:8001/generate-compliance-checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry,
          operating_regions: regionsList,
          products_services: productsList
        })
      });

      if (!response.ok) throw new Error("Failed to generate checklist");
      
      const { tasks: generatedTasks } = await response.json();

      // Ask for user confirmation
      const confirmSave = window.confirm(`AI has generated ${generatedTasks.length} compliance tasks based on your profile. Confirm to save?`);
      
      if (confirmSave) {
        // Upsert Profile
        await supabase.from('company_profiles').upsert({
          id: user.id,
          industry,
          operating_regions: regionsList,
          products_services: productsList,
          is_confirmed: true,
          confirmed_at: new Date().toISOString()
        });

        // Insert Tasks
        const tasksToInsert = generatedTasks.map(t => ({
          company_id: user.id,
          ...t
        }));
        await supabase.from('compliance_tasks').insert(tasksToInsert);

        setShowProfileModal(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
      alert("Error communicating with AI engine.");
    }
    
    setLoading(false);
  };

  const handleTriggerCrawl = async () => {
    setIsCrawling(true);
    try {
      const response = await fetch('http://localhost:8001/trigger-crawl', { method: 'POST' });
      if (!response.ok) throw new Error("Crawl failed");
      const data = await response.json();
      
      const tasksToInsert = data.tasks.map(t => ({ company_id: user.id, ...t }));
      const alertsToInsert = data.alerts.map(a => ({ company_id: user.id, ...a }));

      await supabase.from('compliance_tasks').insert(tasksToInsert);
      await supabase.from('compliance_alerts').insert(alertsToInsert);
      
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to run Crawlee automation.");
    }
    setIsCrawling(false);
  };

  const handleScanComplete = async (scannedTasks) => {
    const tasksToInsert = scannedTasks.map(t => ({ company_id: user.id, ...t }));
    await supabase.from('compliance_tasks').insert(tasksToInsert);
    setShowAuditModal(false);
    fetchData();
  };

  if (loading && !showProfileModal) {
    return <div style={{ padding: '2rem', color: 'white' }}>Loading Compliance Board...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <ShieldCheck size={32} color="#00aaff" />
            Compliance & Legal Monitoring
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>
            {profile ? `Managing compliance for ${profile.industry} sector in ${profile.operating_regions?.join(', ')}` : 'Setup required'}
          </p>
        </div>
        
        {profile && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="glass-button" 
              onClick={handleTriggerCrawl}
              disabled={isCrawling}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem' }}
            >
              <Search size={16} /> {isCrawling ? 'Crawling...' : 'Fetch Reg Updates (Crawlee)'}
            </button>
            <button 
              className="glass-button" 
              onClick={() => setShowAuditModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem' }}
            >
              <Github size={16} /> Scan Code (GitNexus)
            </button>
            <button 
              className="glass-button" 
              onClick={() => setShowReportModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', background: 'rgba(0,100,200,0.3)', border: '1px solid #0066cc' }}
            >
              <FileText size={16} /> Generate Official Report
            </button>
            <button 
              className="glass-button" 
              onClick={() => setShowProfileModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem' }}
            >
              <Settings size={16} /> Edit Profile
            </button>
          </div>
        )}
      </div>

      {showAuditModal && <CodeAuditModal onClose={() => setShowAuditModal(false)} onScanComplete={handleScanComplete} />}
      {showReportModal && <ReportGeneratorModal onClose={() => setShowReportModal(false)} />}

      {showProfileModal ? (
        <div style={{ background: 'rgba(25, 25, 35, 0.8)', padding: '2rem', borderRadius: '12px', maxWidth: '600px', margin: '0 auto' }}>
          <h2>Configure Company Profile</h2>
          <p style={{ color: 'var(--text-muted)' }}>We will use this data to auto-generate your compliance task list.</p>
          <form onSubmit={handleGenerateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Industry</label>
              <input required value={industry} onChange={e=>setIndustry(e.target.value)} placeholder="e.g. Healthcare, Fintech, E-commerce" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Operating Regions (comma separated)</label>
              <input required value={regions} onChange={e=>setRegions(e.target.value)} placeholder="e.g. CA, NY, EU, UK" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Products / Services (comma separated)</label>
              <input required value={products} onChange={e=>setProducts(e.target.value)} placeholder="e.g. SaaS, Medical Devices, Crypto" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }} />
            </div>
            <button type="submit" className="glass-button" disabled={loading} style={{ padding: '1rem', marginTop: '1rem' }}>
              {loading ? 'Generating Checklist...' : 'Generate Compliance Checklist'}
            </button>
          </form>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '2rem', flex: 1, overflow: 'hidden' }}>
          {/* Main Kanban Area */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <KanbanBoard tasks={tasks} setTasks={setTasks} />
          </div>

          {/* Sidebar Alerts */}
          <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} /> Active Alerts
              </h3>
              <ComplianceAlerts alerts={alerts} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
