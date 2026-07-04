import React, { useState, useEffect } from 'react';

export default function AssetEditor({ assetData }: { assetData: any }) {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // Aggressively extract text from varied n8n/Redis payload structures
  useEffect(() => {
    if (!assetData) return;
    
    let extractedText = "";
    
    // Hunt down the text wherever it might be nested
    if (typeof assetData.content === 'string') extractedText = assetData.content;
    else if (assetData.content?.script) extractedText = assetData.content.script;
    else if (assetData.content?.thread) extractedText = assetData.content.thread;
    else if (assetData.result?.text) extractedText = assetData.result.text;
    else if (assetData.result?.output) extractedText = assetData.result.output;
    else if (typeof assetData.result === 'string') extractedText = assetData.result;
    else if (assetData.result) extractedText = JSON.stringify(assetData.result, null, 2);
    else extractedText = JSON.stringify(assetData, null, 2);

    // Sync it to both fields so it appears regardless of campaignType
    setContent({
      script: extractedText,
      thread: extractedText,
      ...(typeof assetData.content === 'object' ? assetData.content : {})
    });
  }, [assetData?.campaign_id]);

  const approveCampaign = async () => {
    console.log("DEBUG: Approve button clicked!");
    setLoading(true);
    
    // Ensure the edited text (content) is fed into the payload sent to the API
    const payload = {
      campaign_id: assetData?.campaign_id || 'unknown',
      platform: 'all',
      schedule_time: new Date().toISOString(),
      content: content,
      final_text: content.script || content.thread || ''
    };
    
    console.log("DEBUG: Sending to Brain (8081):", payload);

    try {
      const response = await fetch('http://localhost:8081/api/campaign/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      alert("Campaign successfully approved and sent to Brain!");
    } catch (err) {
      console.error("Connection Error:", err);
      alert("Error: Brain (8081) unreachable. Check console logs.");
    } finally {
      setLoading(false);
    }
  };

  const renderByType = (type: string) => {
    const handleUpdate = (key: string, val: string) => {
      setContent((prev: any) => ({ ...prev, [key]: val }));
    };

    switch(type) {
      case 'short_form_video':
      case 'ugc_avatar':
        return (
          <div className="space-y-4">
            <label className="font-bold block text-sm">Video Script</label>
            <textarea 
              className="w-full h-64 p-4 border rounded font-mono text-sm leading-relaxed" 
              value={content.script || ''} 
              onChange={(e) => handleUpdate('script', e.target.value)}
            />
          </div>
        );

      case 'text_thread':
        return (
          <div className="space-y-2">
            <label className="font-bold block text-sm">Thread Body</label>
            <textarea 
              className="w-full h-64 p-4 border rounded font-mono text-sm leading-relaxed" 
              value={content.thread || ''} 
              onChange={(e) => handleUpdate('thread', e.target.value)}
            />
          </div>
        );

      default:
        return (
          <pre className="w-full h-64 p-4 border rounded bg-gray-50 font-mono text-sm overflow-auto">
            {JSON.stringify(content, null, 2)}
          </pre>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow rounded-xl border border-gray-100">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold uppercase">{assetData?.campaignType?.replace('_', ' ') || 'Editor'}</h2>
        <div 
          onClick={() => {
            console.log("DEBUG: Div click detected");
            approveCampaign();
          }}
          className={`${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 cursor-pointer'} text-white px-6 py-2 rounded-lg font-bold transition-colors select-none`}
        >
          {loading ? 'Processing...' : 'Approve'}
        </div>
      </div>
      <div className="min-h-[400px]">
        {renderByType(assetData?.campaignType || 'default')}
      </div>
    </div>
  );
}