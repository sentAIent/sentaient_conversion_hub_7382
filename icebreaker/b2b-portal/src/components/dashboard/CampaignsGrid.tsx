'use client';
import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function CampaignsGrid({ campaigns }: { campaigns: any[] }) {
  const [rowData] = useState(campaigns || []);

  const [columnDefs] = useState([
    { field: 'title', headerName: 'Campaign Name', flex: 2 },
    { field: 'targetCheckIns', headerName: 'Target Check-Ins', flex: 1 },
    { field: 'maxDiscount', headerName: 'Max Discount', flex: 1 },
    { field: 'totalBudget', headerName: 'Budget (Cents)', flex: 1 },
    { 
      field: 'isActive', 
      headerName: 'Status',
      flex: 1,
      cellRenderer: (params: any) => (
        <span style={{ color: params.value ? '#00FF00' : '#FF0000', fontWeight: 'bold' }}>
          {params.value ? 'ACTIVE' : 'INACTIVE'}
        </span>
      )
    },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  return (
    <div className="ag-theme-alpine-dark" style={{ height: 500, width: '100%', borderRadius: 12, overflow: 'hidden' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowSelection="single"
      />
    </div>
  );
}
