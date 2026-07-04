import React from 'react';
import { Clock, UserCheck } from 'lucide-react';
import type { Theme, ChangeLogEntry } from '@/types';

interface HistoryViewProps {
    changeLog: ChangeLogEntry[];
    currentTheme: Theme;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
    changeLog,
    currentTheme
}) => {
    return (
        <div className={`flex-1 p-8 overflow-auto ${currentTheme.main || currentTheme.appBg}`}>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Change History</h1>
                <p className="text-slate-500 mb-6">
                    Track all modifications made to the document by users or AI recommendations.
                </p>

                <div className="space-y-4">
                    {changeLog.length === 0 && (
                        <div className={`text-center py-16 rounded-xl border ${currentTheme.card || currentTheme.panelBg}`}>
                            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-500">No changes recorded yet</h3>
                            <p className="text-sm text-slate-400 mt-1">
                                Changes will appear here when you accept AI recommendations
                            </p>
                        </div>
                    )}

                    {changeLog.map((log) => (
                        <div
                            key={log.id}
                            className={`p-4 rounded-xl border shadow-sm flex items-start gap-4 ${currentTheme.card || currentTheme.panelBg}`}
                        >
                            <div className="bg-blue-50 p-2 rounded-full text-blue-600 mt-1">
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
            </div>
        </div>
    );
};

export default HistoryView;
