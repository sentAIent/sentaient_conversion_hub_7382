'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw, AlertTriangle, Database } from '@/components/icons';

interface ProjectionData {
  id: string;
  name: string;
  position: string;
  team: string;
  yahoo_pts: number | null;
  espn_pts: number | null;
  cbs_pts: number | null;
}

export default function VerificationDashboard() {
  const [data, setData] = useState<ProjectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/verification');
      if (!res.ok) throw new Error(`Failed to fetch verification data: ${res.status}`);
      const json = await res.json();
      setData(json.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full border-2 border-zinc-800 bg-black text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b-2 border-zinc-800">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter flex items-center gap-3">
            <Database size={28} className="text-white" />
            Verification Matrix
          </h1>
          <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest">
            Multi-Source Projection Analysis
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 font-bold uppercase tracking-wider hover:bg-zinc-200 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
          Refresh Data
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 bg-[#0a0a0a]">
        {error ? (
          <div className="border-2 border-red-900 bg-red-950/20 p-6 flex items-start gap-4 text-red-500">
            <AlertTriangle size={24} className="mt-1" />
            <div>
              <h3 className="font-bold uppercase tracking-widest mb-2">System Failure</h3>
              <p className="font-mono text-sm">{error}</p>
            </div>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
            <Loader2 className="animate-spin mb-4" size={32} />
            <div className="uppercase tracking-widest text-sm font-bold">Establishing Secure Link...</div>
          </div>
        ) : data.length === 0 ? (
          <div className="border-2 border-zinc-800 border-dashed p-12 text-center text-zinc-500">
            <Database size={48} className="mx-auto mb-4 opacity-50" />
            <div className="uppercase tracking-widest font-bold">No Data Found</div>
            <div className="text-xs mt-2">Run the ingestion pipeline to populate sources.</div>
          </div>
        ) : (
          <div className="overflow-x-auto border-2 border-zinc-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-800 bg-zinc-900/50">
                  <th className="p-4 font-bold uppercase tracking-widest text-xs border-r-2 border-zinc-800">Player</th>
                  <th className="p-4 font-bold uppercase tracking-widest text-xs border-r-2 border-zinc-800">Team/Pos</th>
                  <th className="p-4 font-bold uppercase tracking-widest text-xs border-r-2 border-zinc-800 bg-purple-900/10 text-purple-400">Yahoo PTS</th>
                  <th className="p-4 font-bold uppercase tracking-widest text-xs border-r-2 border-zinc-800 bg-red-900/10 text-red-400">ESPN PTS</th>
                  <th className="p-4 font-bold uppercase tracking-widest text-xs bg-blue-900/10 text-blue-400">CBS PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-zinc-800">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-zinc-900 transition-colors">
                    <td className="p-4 border-r-2 border-zinc-800 font-bold whitespace-nowrap">{row.name}</td>
                    <td className="p-4 border-r-2 border-zinc-800 text-zinc-500 text-sm whitespace-nowrap">
                      {row.team} • {row.position}
                    </td>
                    <td className="p-4 border-r-2 border-zinc-800 font-mono text-purple-300">
                      {row.yahoo_pts !== null ? row.yahoo_pts.toFixed(1) : '--'}
                    </td>
                    <td className="p-4 border-r-2 border-zinc-800 font-mono text-red-300">
                      {row.espn_pts !== null ? row.espn_pts.toFixed(1) : '--'}
                    </td>
                    <td className="p-4 font-mono text-blue-300">
                      {row.cbs_pts !== null ? row.cbs_pts.toFixed(1) : '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
