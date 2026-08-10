import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { THEMES } from '../constants/themes';
import { Globe, RefreshCw, Copy, CheckCircle2 } from 'lucide-react';

export const WebScraperView: React.FC = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleScrape = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setError(null);
        setContent(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_DOCKER_API_URL || 'http://localhost:11236'}/api/web-scraper`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_DOCKER_API_KEY || 'super-secret-local-key'
                },
                body: JSON.stringify({ url })
            });
            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to scrape URL');
            }
            
            setContent(data.content);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (content) {
            navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar 
                activeTab="scraper"
                setActiveTab={() => {}}
                analysisComplete={false}
                score={0}
                currentTheme={THEMES.light}
                analysisDepth="quick"
                setAnalysisDepth={() => {}}
                onAnalyze={() => {}}
                isRoastMode={false}
                
            />
            
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Globe className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Web Scraper</h1>
                            <p className="text-gray-500 mt-1">Extract Terms of Service or Privacy Policies from any public URL.</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        
                        <form onSubmit={handleScrape} className="bg-white p-6 rounded-xl border shadow-sm">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Target URL</label>
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input 
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://example.com/terms"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={loading || !url.trim()}
                                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Globe className="w-5 h-5" />}
                                    Extract Text
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                                {error}
                            </div>
                        )}

                        {loading && (
                            <div className="bg-white p-12 rounded-xl border shadow-sm text-center">
                                <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900">Extracting content...</h3>
                            </div>
                        )}

                        {content && !loading && (
                            <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col" style={{ height: '500px' }}>
                                <div className="p-4 border-b bg-gray-50 flex justify-between items-center shrink-0">
                                    <h3 className="font-bold text-gray-700">Extracted Text</h3>
                                    <button 
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                                    </button>
                                </div>
                                <div className="p-4 flex-1 overflow-y-auto">
                                    <pre className="font-mono text-sm whitespace-pre-wrap text-gray-700">{content}</pre>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};
