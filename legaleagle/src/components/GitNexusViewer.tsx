import React from 'react';

export const GitNexusViewer: React.FC = () => {
    return (
        <div className="w-full h-[800px] border border-slate-700 rounded-xl overflow-hidden bg-slate-900">
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-white">IP & Codebase Due Diligence (Powered by GitNexus)</h3>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/50">
                    Client-Side Sandbox Active
                </span>
            </div>
            
            {/* 
              GitNexus is an interactive client-side React application. 
              In production, we would mount the GitNexus core components here directly,
              or host it securely on a subdomain (e.g., ip-scanner.sentaient.com) and iframe it.
            */}
            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Drop a Git Repository or ZIP file here</h2>
                <p className="max-w-md mb-8">
                    GitNexus will instantly generate an interactive knowledge graph and allow you to chat with the codebase using our local Graph-RAG agent.
                    <strong> Your code never leaves your browser.</strong>
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Upload Codebase (.zip)
                </button>
            </div>
        </div>
    );
};
