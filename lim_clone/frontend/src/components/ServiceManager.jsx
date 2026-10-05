import React, { useState } from 'react';

const services = [
  { id: 'nocodb', name: 'NocoDB (CRM & Data)' },
  { id: 'databasement', name: 'Databasement' },
  { id: 'open-design', name: 'Open Design UI Builder' },
  { id: 'meilisearch', name: 'Meilisearch (Global Search)' },
  { id: 'openalice', name: 'OpenAlice (Copilot)' },
  { id: 'autohedge', name: 'AutoHedge (Swarm)' }
];

const ServiceManager = ({ activeServices, onToggleService }) => {
  const [loading, setLoading] = useState(null);

  const handleToggle = async (id, isCurrentlyActive) => {
    setLoading(id);
    const action = isCurrentlyActive ? 'stop' : 'start';
    try {
      const res = await fetch('http://127.0.0.1:8000/api/services/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: id, action })
      });
      if (res.ok) {
        onToggleService(id, !isCurrentlyActive);
      } else {
        alert('Failed to toggle service');
      }
    } catch (e) {
      alert('Error connecting to backend');
    }
    setLoading(null);
  };

  return (
    <div style={{ padding: '20px', background: '#1e1e1e', color: '#fff', borderRadius: '8px' }}>
      <h3>On-Demand Services</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {services.map(svc => {
          const isActive = activeServices[svc.id];
          return (
            <div key={svc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#2d2d2d', borderRadius: '4px' }}>
              <span>{svc.name}</span>
              <button 
                disabled={loading === svc.id}
                onClick={() => handleToggle(svc.id, isActive)}
                style={{
                  padding: '5px 15px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: loading === svc.id ? 'not-allowed' : 'pointer',
                  background: isActive ? '#d32f2f' : '#2e7d32',
                  color: 'white'
                }}
              >
                {loading === svc.id ? 'Working...' : isActive ? 'Stop' : 'Start'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceManager;
