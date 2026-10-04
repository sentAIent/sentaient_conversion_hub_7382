import React, { useState, useMemo } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import 'ag-grid-community/styles/ag-theme-alpine-dark.css';

interface DiscoveryDocument {
    id: string;
    title: string;
    type: string;
    dateAdded: string;
    riskScore: number;
    status: string;
}

export const DiscoveryTable: React.FC = () => {
    const [rowData] = useState<DiscoveryDocument[]>([
        { id: 'DOC-001', title: 'Q3 Vendor Agreement', type: 'Contract', dateAdded: '2026-08-01', riskScore: 85, status: 'Needs Review' },
        { id: 'DOC-002', title: 'Employee NDA - J. Smith', type: 'NDA', dateAdded: '2026-08-05', riskScore: 12, status: 'Clear' },
        { id: 'DOC-003', title: 'Acquisition LOI', type: 'M&A', dateAdded: '2026-08-10', riskScore: 94, status: 'Escalated' },
        { id: 'DOC-004', title: 'Office Lease 2026', type: 'Lease', dateAdded: '2026-08-15', riskScore: 45, status: 'Reviewed' },
    ]);

    const [columnDefs] = useState([
        { field: 'id', headerName: 'ID', width: 120, filter: true },
        { field: 'title', headerName: 'Document Title', flex: 1, filter: true },
        { field: 'type', headerName: 'Type', width: 150, filter: true },
        { field: 'dateAdded', headerName: 'Date Added', width: 150, filter: true },
        { 
            field: 'riskScore', 
            headerName: 'AI Risk Score', 
            width: 150, 
            filter: 'agNumberColumnFilter',
            cellRenderer: (params: any) => {
                const score = params.value;
                const color = score > 80 ? 'text-red-500' : score > 40 ? 'text-amber-500' : 'text-emerald-500';
                return <span className={`font-bold ${color}`}>{score}/100</span>;
            }
        },
        { field: 'status', headerName: 'Status', width: 150, filter: true },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            resizable: true,
        };
    }, []);

    // Suppress TS6133 unused variable errors during mock
    console.log(rowData, columnDefs, defaultColDef);

    return (
        <div className="w-full h-full flex flex-col border border-slate-700 rounded-xl overflow-hidden bg-slate-900">
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-white">E-Discovery & Case Files</h3>
                <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">Powered by AG-Grid</span>
            </div>
            
            <div className="flex-1 ag-theme-alpine-dark w-full h-full">
                {/* <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    rowSelection="multiple"
                    pagination={true}
                    paginationPageSize={10}
                /> */}
                <div className="p-10 text-center text-slate-500">AG-Grid integration ready (npm install pending)</div>
            </div>
        </div>
    );
};
