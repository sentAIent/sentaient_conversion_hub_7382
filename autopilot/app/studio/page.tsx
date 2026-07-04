"use client";

import React, { useState } from 'react';
import CampaignForm from '@/components/studio/CampaignForm';
import AssetEditor from '@/components/studio/AssetEditor';

export default function ContentGenerationStudio() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaignData, setCampaignData] = useState(null);
  const [error, setError] = useState('');

  const generateCampaign = async (payload: any) => {
    setIsLoading(true);
    setError('');
    setCampaignData(null);

    try {
      const response = await fetch('/api/campaign/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || "Failed to generate campaign");
      }

      setCampaignData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between text-center md:text-left gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#60a9ff] drop-shadow-sm">
              Content Studio
            </h1>
            <p className="text-gray-300 mt-2 font-medium tracking-wide">Powered by SentAIent Orchestration</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-4">
            <CampaignForm onGenerate={generateCampaign} isLoading={isLoading} />
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Right Column: Generation Output */}
          <div className="lg:col-span-8">
            {!isLoading && !campaignData && (
              <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-white/20 rounded-2xl bg-white/5 backdrop-blur-md text-gray-300">
                Awaiting campaign parameters...
              </div>
            )}

            {isLoading && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-white/10 shadow-lg rounded-2xl bg-white/5 backdrop-blur-md text-blue-400 animate-pulse">
                <svg className="w-12 h-12 mb-4 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="font-medium tracking-wide">Connecting to orchestration layer...</p>
              </div>
            )}

            {campaignData && !isLoading && (
              <AssetEditor assetData={campaignData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
