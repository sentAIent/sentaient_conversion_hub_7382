import React, { useState, useEffect } from 'react';
import { useWorkspace } from './components/providers/WorkspaceProvider';

export default function CampaignForm({ onGenerate, isLoading }: { onGenerate: (data: any) => void, isLoading: boolean }) {
  const [inputValue, setInputValue] = useState('');
  const [campaignType, setCampaignType] = useState('short_form_video');
  const { activeWorkspace, setActiveWorkspace, brands } = useWorkspace();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    
    onGenerate({
      inputValue,
      campaignType,
      brand: activeWorkspace,
      inputType: inputValue.startsWith('http') ? 'url' : 'text'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Campaign Intake</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Brand Context</label>
        <select 
          value={activeWorkspace} 
          onChange={(e) => setActiveWorkspace(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {brands.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
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
