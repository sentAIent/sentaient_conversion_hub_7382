'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AssetEditor from '@/components/studio/AssetEditor';

export default function EditQueueItemPage() {
  const { id } = useParams();
  const [assetData, setAssetData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(`/api/campaign/queue/${id}`);
        const data = await response.json();
        
        if (data.success && data.item) {
          setAssetData(data.item);
        } else {
          setError(data.message || "Failed to load scheduled campaign.");
        }
      } catch (err: any) {
        setError(err.message || "Network error.");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (id) {
      fetchItem();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8 text-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between text-center md:text-left gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#60a9ff] drop-shadow-sm">
              Edit Scheduled Campaign
            </h1>
            <p className="text-gray-300 mt-2 font-medium tracking-wide">ID: {id}</p>
          </div>
        </header>

        {isLoading && (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-white/10 shadow-lg rounded-2xl bg-white/5 backdrop-blur-md text-blue-400 animate-pulse">
            <svg className="w-12 h-12 mb-4 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="font-medium tracking-wide">Fetching campaign data...</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-6 bg-red-500/10 text-red-300 border border-red-500/30 rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-2">Error Loading Campaign</h3>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && assetData && (
          <div className="max-w-4xl mx-auto">
            <AssetEditor assetData={assetData} isEditing={true} />
          </div>
        )}
      </div>
    </div>
  );
}
