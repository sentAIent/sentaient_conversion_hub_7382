import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/**
 * MassiveDataTable.jsx
 * Enterprise-grade data grid capable of rendering millions of rows of extracted GDPR data
 * without crashing the browser. 
 */
export default function MassiveDataTable({ rowData }) {
    
    // Define columns based on our RxDB schema
    const [columnDefs] = useState([
        { field: 'id', headerName: 'ID', filter: true, width: 150 },
        { field: 'platform', headerName: 'Source', filter: true, width: 120 },
        { field: 'contentType', headerName: 'Type', filter: true, width: 120 },
        { field: 'rawContent', headerName: 'Extracted Content', flex: 1, tooltipField: 'rawContent' },
        { 
            field: 'timestamp', 
            headerName: 'Date', 
            valueFormatter: p => new Date(p.value).toLocaleString(),
            width: 180
        }
    ]);

    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            resizable: true,
        };
    }, []);

    // Mock data if none provided
    const data = rowData || [
        { id: 'msg_1', platform: 'Instagram', contentType: 'message', rawContent: 'Hi, interested in pricing.', timestamp: 1725835978000 },
        { id: 'ad_2', platform: 'Facebook', contentType: 'ad_click', rawContent: 'Clicked retargeting ad campaign_B', timestamp: 1725832978000 },
        { id: 'post_3', platform: 'Instagram', contentType: 'saved_reel', rawContent: 'Saved reel about real estate investing', timestamp: 1725815978000 },
    ];

    return (
        <div className="w-full h-full flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-100 font-mono">Data Lake Viewer (AG-Grid)</h3>
                <span className="text-xs text-emerald-400 font-mono">{data.length} rows</span>
            </div>
            
            {/* The ag-theme-alpine-dark class integrates well with our tailwind dark mode */}
            <div className="ag-theme-alpine-dark w-full flex-1" style={{ minHeight: '400px' }}>
                <AgGridReact
                    rowData={data}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={100}
                    animateRows={true}
                />
            </div>
        </div>
    );
}
