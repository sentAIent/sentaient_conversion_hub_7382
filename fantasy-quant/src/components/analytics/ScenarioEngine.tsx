import React, { useState, useRef } from 'react';
import { llmService } from '../../lib/InBrowserLLM';
import { createClient } from '@/utils/supabase/client';
const supabase = createClient();
import Papa from 'papaparse';
import alasql from 'alasql';
import { Database, FileSpreadsheet, Upload, AlertCircle } from '@/components/icons';

export const ScenarioEngine: React.FC = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Idle');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const [dataSource, setDataSource] = useState<'core' | 'custom'>('core');
  
  // Custom Data State
  const [customData, setCustomData] = useState<any[]>([]);
  const [customSchemaInfo, setCustomSchemaInfo] = useState<string>('');
  const [rawText, setRawText] = useState('');
  
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // Complete Core Schema for the LLM
  const coreSchema = `
  Table: players
  - id: uuid (pk)
  - name: string
  - position: string
  - team: string
  - draft_year: integer
  
  Table: player_projections
  - id: uuid (pk)
  - player_id: uuid (fk players)
  - season: integer
  - week: integer
  - league_type: string
  - base_projection_ppr: numeric
  - floor_ppr: numeric
  - ceiling_ppr: numeric
  
  Table: game_environment
  - game_id: string (pk)
  - temperature: integer
  - weather_condition: string
  - wind_speed: integer
  - surface: string
  
  Table: syndicates
  - id: uuid (pk)
  - name: string
  - target_contest: string
  - total_target_pool: numeric
  - current_pool_balance: numeric
  - status: string
  
  Table: creator_profiles
  - id: uuid (pk)
  - is_creator: boolean
  - subscription_price: numeric
  - bio: string
  
  Table: game_vegas_lines
  - game_id: string (pk)
  - spread: numeric
  - total: numeric
  - home_ml: integer
  - away_ml: integer
  - implied_home_pts: numeric
  - implied_away_pts: numeric
  `;

  const processCsvData = (data: any[]) => {
    if (data.length === 0) return;
    setCustomData(data);
    
    // Create Schema Info for the LLM based on the headers
    const headers = Object.keys(data[0]);
    
    // Create a robust schema info
    let schemaStr = `Table: custom_data\n`;
    headers.forEach(h => {
        // Simple type inference based on first row
        const val = data[0][h];
        let type = 'string';
        if (typeof val === 'number') type = 'numeric';
        if (typeof val === 'boolean') type = 'boolean';
        schemaStr += `  - ${h}: ${type}\n`;
    });
    
    setCustomSchemaInfo(schemaStr);
    
    // Load data into AlaSQL
    try {
        alasql('DROP TABLE IF EXISTS custom_data');
        alasql('CREATE TABLE custom_data');
        alasql.tables.custom_data = { data: data };
        
        setStatus(`Loaded ${data.length} rows successfully.`);
        setError(null);
    } catch(err: any) {
        setError(`Failed to load data into memory: ${err.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5MB limit.');
        return;
    }

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
            if (results.errors.length > 0) {
                setError(`CSV Parsing Error: ${results.errors[0].message}`);
                return;
            }
            processCsvData(results.data);
        },
        error: (err: any) => {
            setError(`Error reading file: ${err.message}`);
        }
    });
  };

  const handlePasteData = () => {
    if (!rawText.trim()) return;
    
    // Try to parse as JSON first
    if (rawText.trim().startsWith('[')) {
        try {
            const data = JSON.parse(rawText);
            if (Array.isArray(data)) {
                processCsvData(data);
                return;
            }
        } catch (e) {
            // Fallthrough to CSV
        }
    }
    
    // Parse as CSV
    Papa.parse(rawText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
            if (results.errors.length > 0) {
                setError(`CSV Parsing Error: ${results.errors[0].message}`);
                return;
            }
            processCsvData(results.data);
        }
    });
  };

  const handleQuery = async () => {
    if (!query) return;
    setError(null);
    setResults([]);
    
    try {
      if (dataSource === 'custom' && customData.length === 0) {
          throw new Error('Please upload or paste data first.');
      }

      const activeSchema = dataSource === 'core' ? coreSchema : customSchemaInfo;
      
      setStatus('Initializing In-Browser LLM...');
      llmService.setOnProgress((p) => setStatus(p));
      
      setStatus('Translating Query to SQL...');
      let sql = await llmService.generateSQL(query, activeSchema);
      
      // Safety/cleanup on LLM output
      sql = sql.replace(/```sql|```/gi, '').trim();

      setStatus('Executing SQL...');
      
      if (dataSource === 'core') {
          // Execute the generated SQL securely via Supabase RPC
          const { data, error: rpcError } = await supabase.rpc('execute_read_only_query', {
            query_text: sql
          });
          if (rpcError) throw rpcError;
          setResults(data || []);
      } else {
          // Execute against AlaSQL
          // Because LLM might generate query with lowercase/uppercase mismatches or markdown
          const res = alasql(sql);
          setResults(res || []);
      }
      
      setStatus('Complete');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during execution');
      setStatus('Error');
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg text-white border border-gray-700 w-full shadow-2xl">
      <div className="flex justify-between items-start mb-6 border-b border-gray-800 pb-4">
          <div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Contango Quant: Scenario Analysis
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Ask natural language questions to query the database or your own uploaded raw data. Powered by local, on-device AI.
              </p>
          </div>
          
          <div className="flex bg-gray-950 p-1 border border-gray-800 rounded-xl">
            <button
                onClick={() => { setDataSource('core'); setResults([]); setError(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    dataSource === 'core' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                }`}
            >
                <Database size={16} /> Core DB
            </button>
            <button
                onClick={() => { setDataSource('custom'); setResults([]); setError(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    dataSource === 'custom' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                }`}
            >
                <FileSpreadsheet size={16} /> Custom Data
            </button>
          </div>
      </div>

      {dataSource === 'custom' && (
          <div className="mb-6 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                  <Upload size={16} className="text-emerald-400" />
                  Upload or Paste Data (CSV/JSON)
              </h3>
              
              <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                      <label className="block w-full cursor-pointer bg-gray-900 border border-dashed border-gray-600 hover:border-emerald-500 rounded-xl p-6 text-center transition-all">
                          <span className="text-sm font-semibold text-gray-300">Choose CSV File (Max 5MB)</span>
                          <input type="file" accept=".csv,.json" className="hidden" onChange={handleFileUpload} />
                      </label>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-2">
                      <textarea
                          placeholder="Or paste raw CSV / JSON data here..."
                          value={rawText}
                          onChange={e => setRawText(e.target.value)}
                          className="w-full h-20 bg-gray-900 border border-gray-700 rounded-xl p-3 text-xs focus:border-emerald-500 outline-none text-gray-300"
                      />
                      <button 
                          onClick={handlePasteData}
                          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                      >
                          Load Pasted Data
                      </button>
                  </div>
              </div>
              
              {customData.length > 0 && (
                  <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-900/50 rounded-lg text-xs text-emerald-400 flex items-center justify-between">
                      <span>✓ Successfully loaded <strong>{customData.length}</strong> records into memory table <code>custom_data</code>.</span>
                      <button onClick={() => setCustomData([])} className="text-gray-400 hover:text-white">Clear</button>
                  </div>
              )}
          </div>
      )}

      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dataSource === 'core' ? "e.g., 'Give me the stats for all rookie RBs drafted in the top 10'" : "e.g., 'Show me the top 5 rows sorted by Points'"}
          className="flex-1 px-4 py-3 bg-gray-950 rounded-xl border border-gray-700 focus:outline-none focus:border-emerald-500 font-medium placeholder-gray-600"
          onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
        />
        <button 
          onClick={handleQuery}
          disabled={status.includes('Translating') || status.includes('Executing') || (dataSource === 'custom' && customData.length === 0)}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl font-bold shadow-lg disabled:opacity-50 transition-all"
        >
          Analyze Scenario
        </button>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status:</span>
        <span className={`text-sm font-semibold ${error ? 'text-red-400' : 'text-emerald-400'}`}>
          {status}
        </span>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <div className="break-all">{error}</div>
        </div>
      )}

      {results.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-950">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900 text-gray-400 font-bold text-xs uppercase tracking-wider">
              <tr>
                {Object.keys(results[0]).map(key => (
                  <th key={key} className="px-5 py-3 border-b border-gray-800 whitespace-nowrap">{key.replace(/_/g, ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-850">
              {results.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  {Object.values(row).map((val: any, j) => (
                    <td key={j} className="px-5 py-3 text-gray-300">
                      {typeof val === 'number' 
                          ? (Number.isInteger(val) ? val : val.toLocaleString(undefined, {maximumFractionDigits: 2})) 
                          : String(val ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
