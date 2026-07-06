import React from 'react';
import { Clock, UserCheck, Cloud, FileText, ChevronRight, Trash2 } from 'lucide-react';
import type { Theme, ChangeLogEntry } from '@/types';

interface HistoryViewProps {
    changeLog: ChangeLogEntry[];
    cloudHistory?: any[];
    onLoadItem?: (item: any) => void;
    onDeleteDocument?: (id: string) => void;
    currentTheme: Theme;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
    changeLog,
    cloudHistory = [],
    onLoadItem,
    onDeleteDocument,
    currentTheme
}) => {
    return (
        <div className={`flex-1 p-8 overflow-auto ${currentTheme.main || currentTheme.appBg}`}>
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Cloud Documents Section */}
                <section>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Cloud Documents</h1>
                    <p className="text-slate-500 mb-6">
                        Access your previously analyzed and drafted documents synced across devices.
                    </p>

                    <div className="space-y-4">
                        {cloudHistory.length === 0 ? (
                            <div className={`text-center py-12 rounded-xl border ${currentTheme.card || currentTheme.panelBg}`}>
                                <Cloud className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                <h3 className="text-base font-medium text-slate-500">No cloud history yet</h3>
                                <p className="text-sm text-slate-400 mt-1">
                                    Analyze or draft documents to save them automatically.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {cloudHistory.map((item, index) => (
                                    <div key={item.id || index} className={`p-4 rounded-xl border shadow-sm flex items-center justify-between text-left transition-all ${currentTheme.card || currentTheme.panelBg}`}>
                                        <button
                                            onClick={() => onLoadItem && onLoadItem(item)}
                                            className="flex-1 flex items-center gap-4 hover:opacity-80"
                                        >
                                            <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="font-bold text-slate-800">{item.document_name || item.documentName || "Untitled Document"}</h4>
                                                <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                                                    <span>{new Date(item.created_at || item.timestamp).toLocaleDateString()} at {new Date(item.created_at || item.timestamp).toLocaleTimeString()}</span>
                                                    {item.score > 0 && <span className="font-semibold text-blue-600">Score: {item.score}</span>}
                                                    {item.contractType && <span>{item.contractType}</span>}
                                                </div>
                                            </div>
                                        </button>
                                        <div className="flex items-center gap-2">
                                            {onDeleteDocument && item.id && (
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (window.confirm("Are you sure you want to permanently delete this document? This cannot be undone.")) {
                                                            onDeleteDocument(item.id);
                                                        }
                                                    }}
                                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Permanently Delete Document"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                            <ChevronRight className="w-5 h-5 text-slate-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Local Change Log Section */}
                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2 mt-8 border-t pt-8">Current Document Change Log</h2>
                    <p className="text-slate-500 mb-6">
                        Track modifications made to the active document by you or the AI.
                    </p>

                    <div className="space-y-4">
                        {changeLog.length === 0 && (
                            <div className={`text-center py-12 rounded-xl border ${currentTheme.card || currentTheme.panelBg}`}>
                                <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                <h3 className="text-base font-medium text-slate-500">No changes recorded yet</h3>
                            </div>
                        )}

                        {changeLog.map((log) => (
                            <div
                                key={log.id}
                                className={`p-4 rounded-xl border shadow-sm flex items-start gap-4 ${currentTheme.card || currentTheme.panelBg}`}
                            >
                                <div className="bg-slate-100 p-2 rounded-full text-slate-600 mt-1">
                                    <UserCheck className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-slate-800">{log.title}</h4>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {log.timestamp}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Accepted by: <span className="font-medium">{log.user}</span>
                                    </p>
                                    <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
                                        <div className="bg-red-50 p-3 rounded border border-red-100">
                                            <span className="font-bold text-red-700 block mb-1">Original:</span>
                                            <span className="text-red-800 line-through opacity-75">{log.original}</span>
                                        </div>
                                        <div className="bg-emerald-50 p-3 rounded border border-emerald-100">
                                            <span className="font-bold text-emerald-700 block mb-1">Updated:</span>
                                            <span className="text-emerald-800">{log.new}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HistoryView;
