import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { THEMES } from '../constants/themes';
import { Database, Search, Library, FileText, Bot, Folder, Plus } from 'lucide-react';
import { DragDropUpload } from '../components/DragDropUpload';

export const KnowledgeBaseView: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = (files: File[]) => {
        // Files are processed in the DragDropUpload component
        // This is a placeholder for actual backend integration
        console.log("Uploaded to RAG:", files.map(f => f.name));
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar 
                activeTab="knowledge-base"
                setActiveTab={() => {}}
                analysisComplete={false}
                score={0}
                currentTheme={THEMES.light}
                analysisDepth="quick"
                setAnalysisDepth={() => {}}
                onAnalyze={() => {}}
                isRoastMode={false}
                onOpenSettings={() => {}}
            />
            
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Database className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Custom Knowledge Base</h1>
                                <p className="text-gray-500 mt-1">Manage firm-specific guidelines, past cases, and internal playbooks (RAG).</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsUploading(!isUploading)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Documents
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-5xl mx-auto space-y-8">
                        
                        {isUploading && (
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Upload to Knowledge Base</h2>
                                <DragDropUpload onUpload={handleUpload} />
                            </div>
                        )}

                        {/* Search and Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search across your firm's knowledge base..."
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <button className="px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors">
                                    Search
                                </button>
                            </div>
                            <div className="bg-indigo-900 rounded-xl p-6 shadow-lg text-white flex flex-col justify-center">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-indigo-200 font-medium">Total Documents</span>
                                    <Library className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div className="text-3xl font-bold">1,204</div>
                                <div className="text-sm text-indigo-300 mt-1 flex items-center gap-1">
                                    <Bot className="w-3 h-3" />
                                    Vectorized & Ready for Agents
                                </div>
                            </div>
                        </div>

                        {/* Folders / Categories */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Collections</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { name: 'M&A Playbooks', count: 42 },
                                    { name: 'Past Litigation', count: 850 },
                                    { name: 'Firm Guidelines', count: 12 },
                                    { name: 'Standard Clauses', count: 300 }
                                ].map((folder, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-3">
                                        <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                                            <Folder className="w-6 h-6 fill-current opacity-20" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{folder.name}</h4>
                                            <p className="text-xs text-gray-500">{folder.count} files</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Documents */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h3 className="font-bold text-gray-900">Recently Uploaded</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {[
                                    { name: 'Acme Corp Merger Agreement vFinal.pdf', date: '2 hours ago', category: 'M&A Playbooks' },
                                    { name: 'Standard Non-Compete (California).docx', date: 'Yesterday', category: 'Standard Clauses' },
                                    { name: 'Litigation Strategy - TechCorp IP.pdf', date: '3 days ago', category: 'Past Litigation' },
                                    { name: 'Billing Guidelines 2026.pdf', date: '1 week ago', category: 'Firm Guidelines' }
                                ].map((doc, i) => (
                                    <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <h4 className="font-medium text-gray-900">{doc.name}</h4>
                                                <p className="text-xs text-gray-500">{doc.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {doc.date}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};
