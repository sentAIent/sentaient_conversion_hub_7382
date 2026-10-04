import React from 'react';
import { Calendar, Users } from 'lucide-react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function VendorCRM() {
  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Vendor Risk CRM & Scheduling</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Manage enterprise vendors and schedule compliance audits automatically.
          </p>
        </div>
        <button 
          onClick={async () => {
            await fetch('http://localhost:8001/sync-helu-financials', { method: 'POST' });
            alert('Financial forecasting data synced to Helu.');
          }}
          className="glass-button" 
          style={{ background: 'rgba(0,150,250,0.2)', border: '1px solid #0096fa' }}
        >
          Sync with Helu Financials
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Twenty CRM Mock */}
        <div style={{ background: 'rgba(25, 25, 35, 0.8)', padding: '2rem', borderRadius: '12px' }}>
          <h2><Users size={20} /> Twenty CRM (Vendors)</h2>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Open-source CRM embedding for third-party risk tracking.</p>
          <div className="ag-theme-alpine-dark" style={{ height: 200, width: '100%', marginTop: '1rem' }}>
            {/* <AgGridReact
              rowData={[
                { vendor: 'Datadog', risk: 'High Risk (Data Processing)' },
                { vendor: 'AWS', risk: 'Low Risk (Infrastructure)' }
              ]}
              columnDefs={[
                { field: 'vendor', headerName: 'Vendor', flex: 1 },
                { field: 'risk', headerName: 'Risk Level', flex: 2 }
              ]}
            /> */}
            <p style={{color: 'orange'}}>AG-Grid integration ready (Run npm install first)</p>
          </div>
        </div>

        {/* Cal.com Mock */}
        <div style={{ background: 'rgba(25, 25, 35, 0.8)', padding: '2rem', borderRadius: '12px' }}>
          <h2><Calendar size={20} /> Cal.com (Audits)</h2>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Schedule SOC2 and GDPR compliance reviews effortlessly.</p>
          <button className="glass-button" style={{ marginTop: '1rem', padding: '1rem', width: '100%' }}>
            Book Audit with CISO
          </button>
        </div>
      </div>
    </div>
  );
}
