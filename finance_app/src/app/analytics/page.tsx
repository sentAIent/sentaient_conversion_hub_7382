"use client";

import { useState, useEffect } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function AnalyticsPage() {
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetabaseUrl() {
      try {
        const response = await fetch('/api/metabase?dashboardId=1');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch analytics');
        }
        
        setIframeUrl(data.iframeUrl);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchMetabaseUrl();
  }, []);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Advanced Analytics</h1>
        <p className="text-gray-500 mt-1">Full Financial Statements and Ledger Analysis powered by Metabase</p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Metabase Configuration Required</h3>
              <p className="text-sm text-gray-500">
                {error}. Please ensure Metabase is running (via the enterprise Docker profile) and you have configured METABASE_SECRET_KEY in your environment variables.
              </p>
            </div>
          </div>
        )}

        {iframeUrl && !error && (
          <iframe
            src={iframeUrl}
            frameBorder="0"
            width="100%"
            height="100%"
            allowTransparency={true}
            className="w-full h-full"
            title="Financial Statements"
          />
        )}
      </div>
    </div>
  );
}
