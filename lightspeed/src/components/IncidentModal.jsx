import React, { useState, useEffect } from 'react';

export default function IncidentModal({ incident, onClose, onFix }) {
  const [fixState, setFixState] = useState('idle');

  useEffect(() => {
    setFixState('idle');
  }, [incident]);

  if (!incident) return null;

  const handleExecuteFix = async () => {
    setFixState('analyzing');
    await new Promise(r => setTimeout(r, 1500));
    setFixState('applying');
    await new Promise(r => setTimeout(r, 2000));
    setFixState('verifying');
    await new Promise(r => setTimeout(r, 1500));
    
    if (onFix) await onFix(incident.id);
    setFixState('success');
  };

  const getProgressText = () => {
    switch (fixState) {
      case 'analyzing': return 'Analyzing root cause and generating patch...';
      case 'applying': return 'Applying automated hotfix to production...';
      case 'verifying': return 'Verifying stability and running integration tests...';
      case 'success': return 'Resolution Protocol Complete.';
      default: return '';
    }
  };

  return (
    <div className="modal-backdrop fade-in" onClick={fixState === 'success' || fixState === 'idle' ? onClose : null} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div className="modal-content glass" onClick={e => e.stopPropagation()} style={{
        width: '90%', maxWidth: '600px', padding: '2rem',
        borderRadius: '12px', border: '1px solid var(--border-glass)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative', overflow: 'hidden'
      }}>
        {fixState !== 'idle' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(10, 10, 10, 0.95)', display: 'flex',
            flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            zIndex: 10, padding: '2rem', textAlign: 'center'
          }}>
            {fixState === 'success' ? (
              <>
                <div style={{ fontSize: '4rem', color: 'var(--accent-green)', marginBottom: '1rem' }}>✓</div>
                <h2 style={{ margin: '0 0 1rem 0' }}>Incident Resolved</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  The automated agent has successfully applied the patch and verified system stability. All telemetry looks nominal.
                </p>
                <button 
                  className="btn" 
                  onClick={onClose}
                  style={{ padding: '0.75rem 2rem' }}
                >
                  Close Report
                </button>
              </>
            ) : (
              <>
                <div className="spinner" style={{ 
                  width: '50px', height: '50px', border: '3px solid rgba(255,255,255,0.1)', 
                  borderTop: '3px solid var(--accent)', borderRadius: '50%', 
                  animation: 'spin 1s linear infinite', marginBottom: '2rem' 
                }}></div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Automated Resolution Protocol</h3>
                <p style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{getProgressText()}</p>
              </>
            )}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge danger" style={{ marginBottom: '0.5rem' }}>{incident.source || 'System'}</span>
            <h2 style={{ margin: 0, fontSize: '1.4rem' }}>{incident.title}</h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Incident ID: {incident.id}
            </div>
          </div>
          <button onClick={onClose} style={{ 
            background: 'transparent', border: 'none', color: 'var(--text-muted)', 
            cursor: 'pointer', fontSize: '1.5rem' 
          }}>&times;</button>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Root Cause / AI Diagnosis:</strong>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{incident.explanation}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
          <div>
            <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Recommended Action:</strong>
            <span style={{ fontWeight: '500' }}>{incident.fixAction || incident.fix_action}</span>
          </div>
          {!incident.fixed && onFix && (
            <button 
              className="btn" 
              onClick={handleExecuteFix}
              style={{
                background: 'var(--accent)', color: '#000', padding: '0.5rem 1rem', 
                borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              Deploy Fix to Production
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
