import React from 'react';
import Header from '../components/ui/Header';
import { Download, Share2 } from 'lucide-react';

const AgentMarketplace = () => {
  const handleExport = () => {
    // Generate a dummy JSON representing the canvas state
    const canvasState = {
      nodes: [
        { id: '1', type: 'llm', data: { prompt: 'Analyze this data' } }
      ],
      edges: []
    };
    const blob = new Blob([JSON.stringify(canvasState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agent_playbook.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#12141A] to-[#1A1C24] text-white overflow-hidden selection:bg-primary/30 relative">
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-conversion/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="relative z-20">
        <Header />
      </div>
      
      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-4 text-white">Agent Marketplace</h1>
            <p className="text-xl text-white/60 font-light">Discover, export, and deploy enterprise-grade cognitive playbooks.</p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            <button 
              onClick={handleExport}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center gap-2 transition-all backdrop-blur-md text-white/80 hover:text-white"
            >
              <Download size={18} />
              <span>Export Current Playbook</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dummy Playbook Cards */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-6 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 group cursor-pointer shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-6 relative overflow-hidden border border-white/5">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-white">Automated Legal Analyst</h3>
                <p className="text-white/60 text-sm mb-6">Processes 100+ PDFs for compliance mapping automatically.</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-primary text-sm font-medium">Enterprise Tier</span>
                  <button className="text-white/40 hover:text-white transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AgentMarketplace;
