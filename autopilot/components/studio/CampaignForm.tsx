import React, { useState } from 'react';
import { useWorkspace } from '@/components/providers/WorkspaceProvider';

export default function CampaignForm({ onGenerate, isLoading }: { onGenerate: (data: any) => void, isLoading: boolean }) {
  const [inputValue, setInputValue] = useState('');
  const [campaignType, setCampaignType] = useState('short_form_video');
  const { activeWorkspace } = useWorkspace();

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
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20">
      <h2 className="text-xl font-bold mb-6 text-white tracking-wide">Campaign Intake</h2>
      
      <div className="mb-5 p-4 bg-white/5 border border-white/10 rounded-xl">
        <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Active Brand Context</label>
        <p className="text-lg font-bold text-[#60a9ff] capitalize">{activeWorkspace === 'sentaient' ? 'SentAIent Demo' : activeWorkspace}</p>
        <p className="text-xs text-gray-500 mt-1">Change this in the sidebar workspace switcher.</p>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-200 mb-2">Content Style</label>
        <select 
          value={campaignType} 
          onChange={(e) => setCampaignType(e.target.value)}
          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 text-white [&>option]:bg-gray-800"
        >
          <option value="short_form_video">Short-Form Video (TikTok/Reels - 9:16)</option>
          <option value="long_form_video">Long-Form Video Essay (YouTube - 16:9)</option>
          <option value="ugc_avatar">UGC AI-Avatar Video</option>
          <option value="static_carousel">Static Carousel (Instagram 1:1 image sequence)</option>
          <option value="document_carousel">Document Carousel (LinkedIn multi-page PDF)</option>
          <option value="text_thread">Thought Leadership Thread (Twitter/X/LinkedIn)</option>
          <option value="audiogram">Audiogram / Waveform</option>
          <option value="pinterest_pin">Pinterest Idea Pin</option>
          <option value="newsletter_asset">Email Newsletter Asset</option>
          <option value="instagram_grid">Instagram Grid Split</option>
          <option value="meme_reaction">Meme / Reaction Overlay</option>
          <option value="seo_blog">SEO Blog Article</option>
          <option value="cinematic_broll">Cinematic B-Roll Loop</option>
          <option value="podcast_audio">Podcast Audio Generation</option>
          <option value="live_stream_asset">Live Stream Asset</option>
          <option value="quote_graphic">Quote Graphic</option>
        </select>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-200 mb-2">Brief or URL</label>
        <textarea 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste a product URL or describe the campaign objective..."
          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl h-32 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none"
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-[#60a9ff] hover:bg-[#4a85cc] text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-[#60a9ff]/25 disabled:opacity-50 tracking-wide"
      >
        {isLoading ? 'Architecting Strategy...' : 'Generate Campaign'}
      </button>
    </form>
  );
}
