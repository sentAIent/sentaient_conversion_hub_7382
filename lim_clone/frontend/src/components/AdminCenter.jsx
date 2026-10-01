import React from 'react';

const AdminCenter = ({ activeServices }) => {
  return (
    <div style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', gap: '10px', padding: '10px' }}>
        {activeServices['nocodb'] && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ color: '#fff', margin: '0 0 5px 0' }}>NocoDB</h4>
            <iframe src="http://localhost:8081" title="NocoDB" style={{ flex: 1, border: 'none', background: '#fff', borderRadius: '4px' }} />
          </div>
        )}
        {activeServices['databasement'] && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ color: '#fff', margin: '0 0 5px 0' }}>Databasement</h4>
            <iframe src="http://localhost:8082" title="Databasement" style={{ flex: 1, border: 'none', background: '#fff', borderRadius: '4px' }} />
          </div>
        )}
        {activeServices['open-design'] && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ color: '#fff', margin: '0 0 5px 0' }}>Open Design</h4>
            <iframe src="http://localhost:8083" title="Open Design" style={{ flex: 1, border: 'none', background: '#fff', borderRadius: '4px' }} />
          </div>
        )}
        {!activeServices['nocodb'] && !activeServices['databasement'] && !activeServices['open-design'] && (
          <div style={{ margin: 'auto', color: '#888' }}>
            No admin services are currently active. Turn them on via the Service Manager.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCenter;
