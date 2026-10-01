import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

// Include AG Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const IntelDataGrid = ({ rowData }) => {
  // Column Definitions
  const columnDefs = useMemo(() => [
    { 
      field: 'url', 
      headerName: 'Competitor URL', 
      flex: 1.5, 
      filter: true,
      cellRenderer: (params) => {
        return <a href={params.value} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{params.value}</a>
      }
    },
    { field: 'title', headerName: 'Page Title', flex: 2, filter: true },
    { field: 'h1', headerName: 'H1 Tag', flex: 1.5, filter: true },
    { 
      field: 'pricingSignals', 
      headerName: 'Pricing Mentions', 
      flex: 2,
      cellRenderer: (params) => {
        if (!params.value) return '';
        return (
          <div className="text-emerald-400 text-xs truncate" title={params.value}>
            {params.value}
          </div>
        );
      }
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
  }), []);

  return (
    <div className="ag-theme-alpine-dark w-full h-96 mt-6 rounded-lg overflow-hidden border border-slate-700 shadow-xl">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowSelection="multiple"
        pagination={true}
        paginationPageSize={10}
        domLayout="normal"
      />
    </div>
  );
};

export default IntelDataGrid;
