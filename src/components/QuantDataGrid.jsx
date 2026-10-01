import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { rxdbService } from '../services/RxDBService';
import Icon from './AppIcon';

export default function QuantDataGrid() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [isDbReady, setIsDbReady] = useState(false);

    // Column Definitions for AG-Grid
    const [columnDefs] = useState([
        { field: 'id', headerName: 'Trace ID', width: 150, sortable: true, filter: true },
        { field: 'userType', headerName: 'Tier', width: 120, sortable: true, filter: true, 
          cellStyle: params => params.value === 'Enterprise' ? { color: '#00f3ff', fontWeight: 'bold' } : { color: '#a855f7' } },
        { field: 'conversionScore', headerName: 'Win Prob (%)', width: 150, sortable: true, filter: 'agNumberColumnFilter',
          valueFormatter: params => params.value.toFixed(2) + '%' },
        { field: 'source', headerName: 'Source', width: 120, sortable: true, filter: true },
        { field: 'latencyMs', headerName: 'Latency (ms)', width: 120, sortable: true, filter: 'agNumberColumnFilter' }
    ]);

    // Grid Options
    const defaultColDef = useMemo(() => ({
        resizable: true,
        flex: 1,
        minWidth: 100,
    }), []);

    useEffect(() => {
        let subscription = null;

        const initDB = async () => {
            await rxdbService.init();
            setIsDbReady(true);
            
            // Subscribe to the reactive RxDB query
            const observable = rxdbService.getAnalyticsObservable();
            if (observable) {
                subscription = observable.subscribe(docs => {
                    // When DB changes, auto-update the grid
                    setRowData(docs.map(doc => doc.toJSON()));
                });
            }
        };

        initDB();

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    // Simulate an incoming live data stream from the AI agents
    const simulateLiveData = useCallback(() => {
        const newData = {
            userType: Math.random() > 0.5 ? 'Enterprise' : 'Pro',
            conversionScore: parseFloat((Math.random() * 100).toFixed(2)),
            source: 'Agent Stream',
            latencyMs: Math.floor(Math.random() * 200)
        };
        rxdbService.insertAnalytic(newData);
    }, []);

    return (
        <div className="flex flex-col h-full bg-slate-950 font-sans">
            {/* Toolbar */}
            <div className="flex justify-between items-center p-3 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs text-slate-300 font-mono">RxDB Reactive Stream Active</span>
                </div>
                <button 
                    onClick={simulateLiveData}
                    disabled={!isDbReady}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white text-xs rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
                >
                    <Icon name="Activity" size={14} />
                    Inject Live Data
                </button>
            </div>

            {/* The AG-Grid Container */}
            <div className="flex-1 w-full ag-theme-alpine-dark" style={{ '--ag-background-color': '#0f172a', '--ag-header-background-color': '#1e293b', '--ag-border-color': '#334155' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    rowSelection="multiple"
                    pagination={true}
                    paginationPageSize={10}
                    overlayNoRowsTemplate="<span class='text-slate-400'>Initializing local database...</span>"
                />
            </div>
        </div>
    );
}
