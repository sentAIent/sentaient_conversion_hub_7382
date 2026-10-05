import React, { useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, Search, MessageSquare, Database, File, Loader2, Sparkles } from 'lucide-react';

export default function RAGDocumentHub() {
    const [documents, setDocuments] = useState([
        { id: 1, name: 'Q3_Financial_Report.pdf', type: 'pdf', status: 'indexed', size: '2.4 MB' },
        { id: 2, name: 'Whiteboard_Brainstorm.jpg', type: 'image', status: 'indexed', size: '4.1 MB' },
        { id: 3, name: 'Client_Meeting_Notes.docx', type: 'doc', status: 'indexed', size: '124 KB' }
    ]);
    const [isDragging, setIsDragging] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [aiResponse, setAiResponse] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        // Mocking upload & vector indexing
        const newDoc = { id: Date.now(), name: 'New_Upload.pdf', type: 'pdf', status: 'indexing', size: '1.2 MB' };
        setDocuments([...documents, newDoc]);
        
        setTimeout(() => {
            setDocuments(docs => docs.map(d => d.id === newDoc.id ? { ...d, status: 'indexed' } : d));
        }, 3000);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            setIsSearching(true);
            setAiResponse(null);
            setTimeout(() => {
                setIsSearching(false);
                setAiResponse({
                    text: "Based on the 'Whiteboard_Brainstorm.jpg' and 'Client_Meeting_Notes.docx', the main focus for next quarter is increasing retention by 15% through the new Nhost GraphQL integration.",
                    sources: [2, 3]
                });
            }, 2500);
        }
    };

    const getIcon = (type) => {
        switch(type) {
            case 'pdf': return <FileText className="text-red-400" size={20} />;
            case 'image': return <ImageIcon className="text-emerald-400" size={20} />;
            case 'doc': return <File className="text-blue-400" size={20} />;
            default: return <File className="text-slate-400" size={20} />;
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans shadow-2xl">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Database size={18} className="text-indigo-400" />
                    <h3 className="font-bold text-slate-200 text-sm">Enterprise RAG Knowledge Hub</h3>
                </div>
                <div className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 flex items-center gap-1.5">
                    <Sparkles size={12} />
                    Powered by Open-Glean
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel: Document Management */}
                <div className="w-1/2 border-r border-slate-800 bg-slate-900/50 p-4 flex flex-col gap-4 overflow-y-auto">
                    {/* Drag and Drop Zone */}
                    <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 bg-slate-900 hover:border-slate-500'}`}
                    >
                        <UploadCloud size={28} className={isDragging ? 'text-indigo-400' : 'text-slate-500'} />
                        <p className="text-sm font-semibold text-slate-300 mt-2">Drop files to Vectorize</p>
                        <p className="text-[10px] text-slate-500 mt-1">PDF, DOCX, JPG, PNG (OCR Auto-Enabled)</p>
                    </div>

                    {/* Document List */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Indexed Knowledge Base</h4>
                        {documents.map(doc => (
                            <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {getIcon(doc.type)}
                                    <div className="truncate">
                                        <p className="text-xs font-medium text-slate-200 truncate">{doc.name}</p>
                                        <p className="text-[10px] text-slate-500">{doc.size}</p>
                                    </div>
                                </div>
                                {doc.status === 'indexing' ? (
                                    <Loader2 size={14} className="text-indigo-400 animate-spin" />
                                ) : (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Ready</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: RAG Search */}
                <div className="w-1/2 p-4 flex flex-col bg-[#0b0c10]">
                    <div className="relative mb-6">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Ask the AI about your documents..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 flex flex-col">
                        {isSearching && (
                            <div className="flex items-center gap-3 text-slate-400 m-auto">
                                <Loader2 size={18} className="animate-spin text-indigo-400" />
                                <span className="text-sm font-medium animate-pulse">Running OCR & Vector Search...</span>
                            </div>
                        )}

                        {aiResponse && !isSearching && (
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2">
                                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
                                    <MessageSquare size={16} className="text-indigo-400" />
                                    <span className="text-xs font-bold text-slate-300">AI Synthesis</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {aiResponse.text}
                                </p>
                                
                                <div className="mt-4 pt-3 border-t border-slate-800/50">
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2">Sources Cited:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {aiResponse.sources.map(sourceId => {
                                            const doc = documents.find(d => d.id === sourceId);
                                            return doc ? (
                                                <div key={doc.id} className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-400 border border-slate-700">
                                                    {getIcon(doc.type)}
                                                    {doc.name}
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {!aiResponse && !isSearching && (
                            <div className="m-auto text-center opacity-50">
                                <Database size={32} className="mx-auto text-slate-600 mb-3" />
                                <p className="text-xs font-medium text-slate-400">Search across images, PDFs, and notes</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
