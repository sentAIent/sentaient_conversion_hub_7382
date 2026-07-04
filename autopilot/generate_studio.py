import os

def create_file(filepath, content):
    """Creates a file and its parent directories if they don't exist."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created: {filepath}")

# --- File Contents ---

api_route_content = """import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Replace with your actual n8n webhook URL
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "http://localhost:5678/webhook/campaign-intake";

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        brand: body.brand || "sentaient",
        input_type: body.inputType || "text",
        input_value: body.inputValue,
        campaign_type: body.campaignType || "short_form_video",
        requested_formats: body.formats || ["9:16"]
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Studio Generation Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
"""

campaign_form_content = """import React, { useState } from 'react';

export default function CampaignForm({ onGenerate, isLoading }: { onGenerate: (data: any) => void, isLoading: boolean }) {
  const [inputValue, setInputValue] = useState('');
  const [campaignType, setCampaignType] = useState('short_form_video');
  const [brand, setBrand] = useState('sentaient');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    
    onGenerate({
      inputValue,
      campaignType,
      brand,
      inputType: inputValue.startsWith('http') ? 'url' : 'text'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Campaign Intake</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Brand Context</label>
        <select 
          value={brand} 
          onChange={(e) => setBrand(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="sentaient">SentAIent</option>
          <option value="cloveh2o">CloveH2O</option>
          <option value="mindwave">Mindwave</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Content Style</label>
        <select 
          value={campaignType} 
          onChange={(e) => setCampaignType(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="short_form_video">Short-Form Video (TikTok/Reels)</option>
          <option value="ugc_avatar">AI-Avatar UGC</option>
          <option value="static_carousel">Static Carousel</option>
          <option value="text_thread">Thought Leadership Thread</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Brief or URL</label>
        <textarea 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste a product URL or describe the campaign objective..."
          className="w-full p-3 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Architecting Strategy...' : 'Generate Assets'}
      </button>
    </form>
  );
}
"""

asset_editor_content = """import React, { useState } from 'react';

export default function AssetEditor({ assetData }: { assetData: any }) {
  const [script, setScript] = useState(assetData.script || '');
  const [caption, setCaption] = useState(assetData.caption || '');

  const handleApprove = () => {
    // Future expansion: POST to another n8n webhook to move file from /staging to /approved
    console.log("Approved Campaign ID:", assetData.campaign_id);
    alert("Campaign assets approved and sent to scheduling queue!");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Generated Assets</h2>
          <p className="text-sm text-gray-500">Status: {assetData.status} | Confidence: {(assetData.confidence * 100).toFixed(0)}%</p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wide">
          {assetData.viral_angle || "Strategy Ready"}
        </span>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-800 mb-2">Visual Direction</label>
        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap font-mono">
          {assetData.visual_direction}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-800 mb-2">Drafted Script / Copy</label>
        <textarea 
          value={script}
          onChange={(e) => setScript(e.target.value)}
          className="w-full p-4 border border-gray-200 rounded-lg h-64 focus:ring-2 focus:ring-blue-500 font-mono text-sm leading-relaxed text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-800 mb-2">Social Caption</label>
        <textarea 
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-4 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed text-black"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 font-semibold rounded-lg transition-colors">
          Request Revision
        </button>
        <button 
          onClick={handleApprove}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
        >
          Approve & Schedule
        </button>
      </div>
    </div>
  );
}
"""

studio_page_content = """"use client";

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Generation Studio</h1>
          <p className="text-gray-500 mt-2">Powered by the SentAIent Strategy Engine</p>
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
              <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-white text-gray-400">
                Awaiting campaign parameters...
              </div>
            )}

            {isLoading && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-gray-100 shadow-sm rounded-xl bg-white text-blue-600 animate-pulse">
                <svg className="w-12 h-12 mb-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="font-medium">Connecting to n8n strategy pipeline...</p>
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
"""

if __name__ == "__main__":
    # Define file paths relative to where the script is executed
    files = {
        "app/api/campaign/generate/route.ts": api_route_content,
        "components/studio/CampaignForm.tsx": campaign_form_content,
        "components/studio/AssetEditor.tsx": asset_editor_content,
        "app/studio/page.tsx": studio_page_content,
    }

    print("Generating SentAIent Content Studio Files...\n")
    for path, content in files.items():
        create_file(path, content)
    print("\nFile generation complete. Move these into your Next.js project directory.")