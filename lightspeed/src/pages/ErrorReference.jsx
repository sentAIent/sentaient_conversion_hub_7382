import React, { useState } from 'react';
import IncidentModal from '../components/IncidentModal';

export default function ErrorReference({ errors, onFix }) {
  const [selectedIncident, setSelectedIncident] = useState(null);

  return (
    <div className="page-content fade-in">
      <h2>Error Reference & Resolution</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        A knowledge base of active system errors, their root causes, and automated fix actions. Click an error to view details.
      </p>

      <div className="error-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {errors.map(error => (
          <div 
            key={error.id} 
            className="glass-panel error-card hover-glow" 
            style={{ 
              padding: '1.5rem', 
              borderLeft: error.fixed ? '4px solid var(--accent-green)' : '4px solid var(--accent-red)',
              cursor: 'pointer' 
            }}
            onClick={() => setSelectedIncident(error)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0' }}>
              <div>
                <span className={`badge ${error.fixed ? 'safe' : 'danger'}`} style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                  {error.id}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: error.fixed ? 'var(--text-muted)' : 'var(--text-main)' }}>
                  {error.title}
                </h3>
              </div>
              <button 
                className="action-button" 
                disabled={error.fixed}
                onClick={(e) => { e.stopPropagation(); onFix(error.id); }}
                style={{
                  background: error.fixed ? 'transparent' : 'var(--accent-blue)',
                  border: error.fixed ? '1px solid var(--border-light)' : 'none',
                  color: error.fixed ? 'var(--text-muted)' : 'white',
                  cursor: error.fixed ? 'not-allowed' : 'pointer',
                  zIndex: 2,
                  position: 'relative'
                }}
              >
                {error.fixed ? 'Resolved' : error.fixAction || error.fix_action}
              </button>
            </div>
            
            <div className="error-details">
              <div className="error-details-inner">
                <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Root Cause Explanation:</strong>
                <p style={{ margin: 0, lineHeight: 1.5 }}>{error.explanation}</p>
              </div>
            </div>
            
            {error.fixed && (
              <div style={{ marginTop: '1rem', color: 'var(--accent-green)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>✓</span> LightSpeed AI has automatically deployed the fix. System stable.
              </div>
            )}
          </div>
        ))}
      </div>

      <IncidentModal 
        incident={selectedIncident} 
        onClose={() => setSelectedIncident(null)} 
        onFix={onFix} 
      />
    </div>
  );
}
