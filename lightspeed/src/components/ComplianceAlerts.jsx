import React from 'react';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';

export default function ComplianceAlerts({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return (
      <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>No active compliance alerts.</p>
      </div>
    );
  }

  const getIcon = (severity) => {
    switch(severity) {
      case 'critical': return <ShieldAlert size={20} color="#ff4444" />;
      case 'high': return <AlertTriangle size={20} color="#ffaa00" />;
      case 'medium': return <AlertTriangle size={20} color="#ffff00" />;
      default: return <Info size={20} color="#00aaff" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      {alerts.map(alert => (
        <div 
          key={alert.id}
          style={{ 
            display: 'flex', 
            gap: '1rem', 
            padding: '1rem', 
            background: 'rgba(25, 25, 35, 0.8)', 
            borderRadius: '8px', 
            borderLeft: `4px solid ${
              alert.severity === 'critical' ? '#ff4444' : 
              alert.severity === 'high' ? '#ffaa00' : 
              alert.severity === 'medium' ? '#ffff00' : '#00aaff'
            }`
          }}
        >
          <div style={{ marginTop: '2px' }}>
            {getIcon(alert.severity)}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>{alert.message}</p>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'block' }}>
              {new Date(alert.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
