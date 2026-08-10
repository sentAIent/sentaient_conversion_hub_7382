import React, { useState } from 'react';
import { KnowledgeGraph } from '../components/knowledge-graph/KnowledgeGraph';
import { Sidebar } from '../components/layout/Sidebar';
import { THEMES } from '../constants/themes';
import { Activity, Network } from 'lucide-react';

export const KnowledgeGraphView: React.FC = () => {
  const [graphData, setGraphData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDemoGraph = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_DOCKER_API_URL || 'http://localhost:11236'}/api/generate-graph`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_DOCKER_API_KEY || 'super-secret-local-key'
        },
        body: JSON.stringify({ 
          text: "Acme Corp and Beta LLC entered into a Master Services Agreement on Jan 1, 2024. The agreement contains a Termination for Convenience clause allowing either party to terminate with 30 days notice. An email thread dated Jan 12 discusses Acme Corp intending to trigger this clause." 
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate graph');
      }

      const data = await response.json();
      setGraphData(data.graph);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab="graph"
        setActiveTab={() => {}}
        analysisComplete={false}
        score={0}
        currentTheme={THEMES.light}
        analysisDepth="quick"
        setAnalysisDepth={() => {}}
        onAnalyze={() => {}}
        isRoastMode={false}
        
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Network className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Interactive Knowledge Graph</h1>
              <p className="text-gray-500 mt-1">Explore relationships between cases, contracts, and evidence</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-hidden flex flex-col">
          {!graphData ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center max-w-lg">
                <Network className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Graph Loaded</h3>
                <p className="text-gray-500 mb-6">
                  Select a case file or run the extraction pipeline to build a visual map of your legal documents.
                </p>
                <button
                  onClick={fetchDemoGraph}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center w-full max-w-xs mx-auto"
                >
                  {loading ? (
                    <>
                      <Activity className="w-5 h-5 mr-2 animate-spin" />
                      Extracting Knowledge...
                    </>
                  ) : (
                    'Generate Demo Graph'
                  )}
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <KnowledgeGraph graphData={graphData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
