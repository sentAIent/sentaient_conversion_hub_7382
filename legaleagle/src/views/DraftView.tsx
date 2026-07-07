import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Theme } from '@/types/theme.types';

interface DraftViewProps {
    currentTheme: Theme;
    onGenerate: (prompt: string) => Promise<string>;
    onSendToEditor: (text: string) => void;
    handleExportPdf: (text: string) => void;
    handleExportWord: (text: string, title: string) => void;
    scanProgress?: number;
    onAddAnnotation?: any;
}

const TEMPLATES = [
    { id: 'nda', name: 'Non-Disclosure Agreement', description: 'Standard mutual NDA for protecting confidential information.' },
    { id: 'employment', name: 'Employment Agreement', description: 'Standard employment contract covering terms, compensation, and IP.' },
    { id: 'lease', name: 'Commercial Lease', description: 'Basic commercial property lease agreement.' },
    { id: 'independent_contractor', name: 'Independent Contractor', description: 'Agreement for freelance or contracting work.' },
    { id: 'custom', name: 'Custom Contract', description: 'Describe the contract you want to generate from scratch.' },
];

export const DraftView: React.FC<DraftViewProps> = ({
    currentTheme,
    onGenerate,
    onSendToEditor,
    handleExportPdf,
    handleExportWord
}) => {
    const [selectedTemplate, setSelectedTemplate] = useState<string>('nda');
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedDraft, setGeneratedDraft] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim() && selectedTemplate === 'custom') {
            setError('Please provide a description of the contract you want to generate.');
            return;
        }

        setError(null);
        setIsGenerating(true);
        setGeneratedDraft('');

        try {
            const templateDetails = TEMPLATES.find(t => t.id === selectedTemplate);
            const fullPrompt = selectedTemplate === 'custom' 
                ? prompt 
                : `Generate a ${templateDetails?.name}. Additional details/requirements: ${prompt}`;
            
            const draft = await onGenerate(fullPrompt);
            setGeneratedDraft(draft);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An error occurred while generating the draft.');
        } finally {
            setIsGenerating(false);
        }
    };

    const isDarkPanel = currentTheme.panelBg.includes('900') || currentTheme.panelBg.includes('950');

    return (
        <div className={`flex flex-col h-full w-full ${currentTheme.main} p-6 overflow-y-auto`}>
            <div className="max-w-4xl mx-auto w-full space-y-6">
                
                <div className="flex items-center justify-between">
                    <h2 className={`text-2xl font-bold ${currentTheme.panelText}`}>Generate New Contract</h2>
                </div>

                {!generatedDraft ? (
                    <div className="space-y-6">
                        <div className={`p-6 rounded-xl border ${currentTheme.panelBg}`}>
                            <h3 className={`text-lg font-semibold ${currentTheme.panelText} mb-4`}>1. Select a Template</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {TEMPLATES.map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`p-4 rounded-lg text-left border transition-all ${
                                            selectedTemplate === template.id 
                                                ? 'border-indigo-500 bg-indigo-500/10' 
                                                : `border-transparent ${currentTheme.buttonSecondary}`
                                        }`}
                                    >
                                        <div className={`font-semibold ${selectedTemplate === template.id ? 'text-indigo-500' : currentTheme.panelText}`}>
                                            {template.name}
                                        </div>
                                        <div className={`text-sm opacity-70 mt-1 ${currentTheme.panelText}`}>
                                            {template.description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={`p-6 rounded-xl border ${currentTheme.panelBg}`}>
                            <h3 className={`text-lg font-semibold ${currentTheme.panelText} mb-4`}>2. Provide Details</h3>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={selectedTemplate === 'custom' 
                                    ? "Describe the contract in detail..." 
                                    : "Enter any specific clauses, parties involved, or special requirements (Optional)"}
                                className={`w-full h-32 p-4 rounded-lg bg-transparent border ${currentTheme.docBorder} ${currentTheme.panelText} placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            />
                        </div>

                        {error && (
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                                isGenerating 
                                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                            }`}
                        >
                            {isGenerating ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Drafting Contract...
                                </span>
                            ) : (
                                'Generate Contract Draft'
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className={`p-6 rounded-xl border ${currentTheme.panelBg} min-h-[400px] prose ${isDarkPanel ? 'prose-invert' : ''} max-w-none`}>
                            <ReactMarkdown>{generatedDraft}</ReactMarkdown>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => onSendToEditor(generatedDraft)}
                                className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                Send to Editor
                            </button>
                            <button
                                onClick={() => handleExportPdf(generatedDraft)}
                                className={`px-6 py-3 rounded-lg border border-white/10 ${currentTheme.accent} ${currentTheme.panelText} font-semibold transition-colors flex items-center gap-2`}
                            >
                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                Export PDF
                            </button>
                            <button
                                onClick={() => handleExportWord(generatedDraft, 'Generated_Draft')}
                                className={`px-6 py-3 rounded-lg border border-white/10 ${currentTheme.accent} ${currentTheme.panelText} font-semibold transition-colors flex items-center gap-2`}
                            >
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Export Word
                            </button>
                            
                            <div className="flex-1" />
                            
                            <button
                                onClick={() => {
                                    setGeneratedDraft('');
                                    setPrompt('');
                                }}
                                className={`px-6 py-3 rounded-lg border bg-transparent ${currentTheme.buttonSecondary} ${currentTheme.docBorder} font-semibold transition-colors`}
                            >
                                Start Over
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
