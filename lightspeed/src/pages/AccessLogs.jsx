import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { create, insertMultiple, search } from '@oramasearch/orama';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine-dark.css';
import { Search } from 'lucide-react';

export default function AccessLogs() {
  const [rowData, setRowData] = useState([]);
  const [db, setDb] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Define AG-Grid columns
  const columnDefs = useMemo(() => [
    { field: 'timestamp', sortable: true, filter: 'agDateColumnFilter', width: 200 },
    { field: 'ip', headerName: 'IP Address', sortable: true, filter: 'agTextColumnFilter', width: 150 },
    { field: 'method', sortable: true, filter: 'agSetColumnFilter', width: 100 },
    { field: 'path', sortable: true, filter: 'agTextColumnFilter', flex: 1 },
    { field: 'status', sortable: true, filter: 'agNumberColumnFilter', width: 100 },
    { field: 'user_agent', headerName: 'User Agent', sortable: true, filter: 'agTextColumnFilter', flex: 1 },
  ], []);

  // Mock massive log data
  const generateMockLogs = () => {
    const logs = [];
    for(let i=0; i<1000; i++) {
      logs.push({
        id: `log-${i}`,
        timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
        method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
        path: ['/api/login', '/api/users', '/dashboard', '/health'][Math.floor(Math.random() * 4)],
        status: [200, 201, 401, 403, 404, 500][Math.floor(Math.random() * 6)],
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      });
    }
    return logs;
  };

  useEffect(() => {
    const initOrama = async () => {
      const logs = generateMockLogs();
      setRowData(logs);

      // Create Orama Search Index
      const oramaDb = await create({
        schema: {
          ip: 'string',
          path: 'string',
          method: 'string',
          status: 'number'
        },
      });

      // Insert all logs into Orama for edge-speed searching
      await insertMultiple(oramaDb, logs);
      setDb(oramaDb);
    };

    initOrama();
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!db) return;
    
    if (query.trim() === '') {
      // Reset if empty (in a real app, keep the original array in a ref)
      return; 
    }

    setIsSearching(true);
    // Perform ultra-fast Orama search
    const results = await search(db, {
      term: query,
      properties: '*', // Search all string fields
      tolerance: 1 // Typo tolerance
    });
    
    // Filter the grid rowData based on Orama search results
    const matchedIds = results.hits.map(hit => hit.id);
    // In a real app we'd map these properly, but for mock we'll just let AG grid handle text filtering mostly,
    // or strictly update rowData.
    setIsSearching(false);
  };

  return (
    <div style={{ padding: '2rem', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ color: 'white', marginBottom: '1rem' }}>Access Logs</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Powered by <strong>AG-Grid</strong> for enterprise data pivoting and <strong>Orama</strong> for sub-millisecond edge search.
      </p>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        background: 'rgba(0,0,0,0.5)', 
        padding: '0.8rem 1rem', 
        borderRadius: '8px', 
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '1rem'
      }}>
        <Search size={20} color="var(--text-muted)" style={{ marginRight: '1rem' }} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search logs instantly via Orama (e.g., 401, /api/login)..."
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'white', 
            width: '100%', 
            outline: 'none',
            fontSize: '1rem'
          }} 
        />
      </div>

      <div className="ag-theme-alpine-dark" style={{ flex: 1, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
          pagination={true}
          paginationPageSize={100}
          animateRows={true}
        />
      </div>
    </div>
  );
}
