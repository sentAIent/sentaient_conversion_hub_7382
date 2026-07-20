import React, { useState } from 'react';
import { Search, Loader2, Globe } from 'lucide-react';
import { executeAISearch } from '@/services/searchService';
import { analyzeWebDocument } from '@/services/analysisService';
import toast from 'react-hot-toast';
import { renderFormattedText } from '@/utils/formatting';

interface WebSearchViewProps {
    theme: any;
}

export const WebSearchView: React.FC<WebSearchViewProps> = ({ theme }) => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progressMsg, setProgressMsg] = useState('');
    const [result, setResult] = useState<any>(null);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setIsLoading(true);
        setProgressMsg('Starting process...');
        setResult(null);
        setAnalysisResult(null);
        
        try {
            const res = await executeAISearch(url, undefined, (msg) => setProgressMsg(msg));
            if (res.success && res.data) {
                setResult(res.data);
                
                setProgressMsg('Analyzing content with Gemini AI...');
                
                // The crawl4ai result markdown might be directly in res.data.markdown or res.data.result.markdown
                const markdownContent = res.data.markdown || res.data.result?.markdown || JSON.stringify(res.data);
                
                const analysis = await analyzeWebDocument(markdownContent);
                setAnalysisResult(analysis);
                
                toast.success('Analysis complete!');
            } else {
                toast.error(res.error || 'Failed to crawl website');
            }
        } catch (error: any) {
            toast.error(error.message || 'An error occurred during search.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`h-full flex flex-col ${theme.bg} ${theme.text}`}>
            <div className="p-8 max-w-4xl mx-auto w-full flex-1 flex flex-col">
                <div className="mb-8 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <Globe className={`w-12 h-12 ${theme.accent}`} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">AI Web Analysis</h1>
                    <p className={`text-lg ${theme.text} opacity-80`}>
                        Paste a URL to a legal document, terms of service, or news article. We'll crawl it and extract insights.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="mb-8">
                    <div className="relative flex items-center">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 opacity-50" />
                        </div>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com/terms"
                            className={`block w-full pl-12 pr-32 py-4 rounded-xl border focus:ring-2 focus:ring-offset-2 transition-all ${
                                theme.id === 'dark' 
                                    ? 'bg-slate-800/50 border-slate-700 text-white focus:ring-blue-500/50 focus:border-blue-500/50' 
                                    : 'bg-white border-slate-200 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                            required
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !url}
                            className={`absolute right-2 top-2 bottom-2 px-6 rounded-lg font-medium transition-all flex items-center gap-2 ${
                                isLoading || !url
                                    ? 'bg-slate-500/50 cursor-not-allowed text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {progressMsg || 'Analyzing...'}
                                </>
                            ) : (
                                'Analyze'
                            )}
                        </button>
                    </div>
                </form>

                {/* Result Display */}
                {analysisResult && (
                    <div className={`flex-1 overflow-y-auto rounded-xl border p-8 shadow-sm ${
                        theme.id === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Globe className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">AI Legal Analysis</h2>
                                <p className="text-sm text-slate-500 truncate max-w-xl">{url}</p>
                            </div>
                        </div>
                        
                        <div className={`prose max-w-none ${theme.id === 'dark' ? 'prose-invert' : 'prose-slate'}`}>
                            {renderFormattedText(analysisResult, theme)}
                        </div>
                        
                        {/* Optionally show raw crawl data */}
                        <details className="mt-8 border-t border-slate-100 pt-4">
                            <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-700">View Raw Crawl Markdown</summary>
                            <pre className="mt-4 p-4 bg-slate-100 text-slate-800 text-xs rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
                                {result?.markdown || result?.result?.markdown || "No markdown available."}
                            </pre>
                        </details>
                    </div>
                )}
            </div>
        </div>
    );
};
