import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { rxdbService } from '../services/RxDBService';
import Icon from './AppIcon';

export function QuantDataGrid() {
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

            {/* Native Clean Table */}
            <div className="flex-1 w-full overflow-auto p-4 bg-slate-900/40">
                {rowData.length === 0 ? (
                    <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
                        Initializing local database...
                    </div>
                ) : (
                    <table className="w-full text-left text-xs text-slate-300">
                        <thead className="text-[11px] uppercase bg-slate-800/80 text-slate-400">
                            <tr>
                                <th className="p-2.5">Trace ID</th>
                                <th className="p-2.5">Tier</th>
                                <th className="p-2.5">Win Prob (%)</th>
                                <th className="p-2.5">Source</th>
                                <th className="p-2.5">Latency (ms)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {rowData.map((row, idx) => (
                                <tr key={row.id || idx} className="hover:bg-slate-800/30">
                                    <td className="p-2.5 font-mono text-[11px]">{row.id || `trace_${idx}`}</td>
                                    <td className={`p-2.5 font-bold ${row.userType === 'Enterprise' ? 'text-cyan-400' : 'text-purple-400'}`}>
                                        {row.userType}
                                    </td>
                                    <td className="p-2.5">{typeof row.conversionScore === 'number' ? row.conversionScore.toFixed(2) + '%' : row.conversionScore}</td>
                                    <td className="p-2.5 text-slate-400">{row.source}</td>
                                    <td className="p-2.5 font-mono">{row.latencyMs} ms</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default QuantDataGrid;
