import React, { useState, useRef, useEffect } from 'react';
import { useWorkspace } from '@/components/providers/WorkspaceProvider';
import { CheckCircle2, Circle, ChevronDown, ChevronRight } from 'lucide-react';

export default function CampaignForm({ onGenerate, isLoading }: { onGenerate: (data: any) => void, isLoading: boolean }) {
  const [inputValue, setInputValue] = useState('');
  const [campaignType, setCampaignType] = useState('short_form_video');
  const [videoEngine, setVideoEngine] = useState('mpt');
  const { activeWorkspace } = useWorkspace();
  
  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saveToKB, setSaveToKB] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Accounts State
  const [accounts, setAccounts] = useState<Record<string, string[]>>({});
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  // Accordion State
  const [expanded, setExpanded] = useState({
    style: true,
    accounts: true,
    reference: false,
    brief: true
  });

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await fetch('http://localhost:18080/admin/accounts');
      if (res.ok) {
        const data = await res.json();
        setAccounts({
          TikTok: data.TikTok || [],
          Instagram: data.Instagram || [],
          X: data.X || [],
          LinkedIn: data.LinkedIn || []
        });
      }
    } catch (err) {
      console.error("Failed to load accounts", err);
    }
  };

  const toggleAccount = (accountPath: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountPath) 
        ? prev.filter(a => a !== accountPath)
        : [...prev, accountPath]
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue && !selectedFile) return;
    
    let mediaPayload = null;

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('saveToKB', saveToKB.toString());

      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        
        if (uploadData.success) {
          mediaPayload = {
            url: uploadData.url,
            mimeType: selectedFile.type,
            name: selectedFile.name,
            base64: uploadData.base64
          };
        } else {
          console.error("Upload failed:", uploadData.message);
          alert("Failed to upload reference file.");
          return;
        }
      } catch (err) {
        console.error("Upload Error:", err);
        alert("Upload error.");
        return;
      }
    }

    onGenerate({
      inputValue,
      campaignType,
      brand: activeWorkspace,
      inputType: inputValue.startsWith('http') ? 'url' : 'text',
      media: mediaPayload,
      targetAccounts: selectedAccounts,
      videoEngine
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

      <div className="mb-5 border border-white/10 rounded-xl overflow-hidden bg-white/5">
        <button 
          type="button" 
          onClick={() => toggleSection('style')}
          className="w-full flex items-center justify-between p-4 bg-black/40 hover:bg-black/60 transition-colors"
        >
          <span className="font-semibold text-white tracking-wide">Format & Engine Settings</span>
          {expanded.style ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
        
        {expanded.style && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Campaign Format</label>
              <select 
                value={campaignType} 
                onChange={(e) => setCampaignType(e.target.value)}
                className="w-full p-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 text-white [&>option]:bg-gray-800 mt-1"
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
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Video Generation Engine</label>
              <select 
                value={videoEngine} 
                onChange={(e) => setVideoEngine(e.target.value)}
                className="w-full p-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 text-white [&>option]:bg-gray-800 mt-1"
              >
                <option value="mpt">MoneyPrinterTurbo (Autonomous Fast API)</option>
                <option value="openmontage">OpenMontage (Agentic Pipeline)</option>
              </select>
              <p className="text-xs text-gray-400 mt-2 italic">Select the rendering engine for video outputs.</p>
            </div>
          </div>
        )}
      </div>

      {/* TARGET ACCOUNTS SECTION */}
      <div className="mb-5 border border-white/10 rounded-xl overflow-hidden bg-white/5">
        <button 
          type="button" 
          onClick={() => toggleSection('accounts')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-200">Target Accounts</span>
            {selectedAccounts.length > 0 && (
              <span className="bg-[#60a9ff] text-white text-xs px-2 py-0.5 rounded-full">{selectedAccounts.length}</span>
            )}
          </div>
          {expanded.accounts ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
        </button>
        {expanded.accounts && (
          <div className="p-4 pt-0 border-t border-white/10">
            <div className="space-y-3 mt-2">
              {Object.entries(accounts).every(([_, handles]) => handles.length === 0) ? (
                <p className="text-sm text-gray-400 italic">No connected accounts found. Link them in the settings above.</p>
              ) : (
                <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(accounts).map(([platform, handles]) => 
                    handles.map(handle => {
                      const accountPath = `${platform}:${handle}`;
                      const isSelected = selectedAccounts.includes(accountPath);
                      return (
                        <div 
                          key={accountPath} 
                          onClick={() => toggleAccount(accountPath)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${isSelected ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-black/20 border-transparent hover:bg-white/10'}`}
                        >
                          {isSelected ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-gray-500" />}
                          <div className="flex flex-col">
                            <span className={`text-sm font-medium ${isSelected ? 'text-emerald-100' : 'text-gray-300'}`}>{handle}</span>
                            <span className="text-xs text-gray-500">{platform}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mb-5 border border-white/10 rounded-xl overflow-hidden bg-white/5">
        <button 
          type="button" 
          onClick={() => toggleSection('reference')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-200">Reference Material</span>
            <span className="text-xs text-gray-500 uppercase tracking-widest">(Optional)</span>
            {selectedFile && <CheckCircle2 className="w-4 h-4 text-[#60a9ff]" />}
          </div>
          {expanded.reference ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
        </button>
        {expanded.reference && (
          <div className="p-4 pt-0 border-t border-white/10">
            <div 
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors mt-2 ${isDragging ? 'border-[#60a9ff] bg-blue-900/20' : 'border-white/20 hover:border-white/40 bg-black/20'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              {selectedFile ? (
                <div className="text-sm font-medium text-[#60a9ff] truncate">
                  {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  <button 
                    type="button" 
                    className="ml-2 text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-wide"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="text-sm text-gray-400">
                  Drag & drop an image, video, audio, or text file here, or <span className="text-[#60a9ff] font-semibold">click to browse</span>
                </div>
              )}
            </div>
            
            {selectedFile && (
              <div className="mt-3 flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/10">
                <input 
                  type="checkbox" 
                  id="saveToKB_studio" 
                  checked={saveToKB}
                  onChange={(e) => setSaveToKB(e.target.checked)}
                  className="w-4 h-4 text-[#60a9ff] rounded border-white/20 bg-white/10 focus:ring-[#60a9ff]"
                />
                <label htmlFor="saveToKB_studio" className="text-sm text-gray-300 font-medium cursor-pointer flex-1">
                  Save to Knowledge Base / Library
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mb-8 border border-white/10 rounded-xl overflow-hidden bg-white/5">
        <button 
          type="button" 
          onClick={() => toggleSection('brief')}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
        >
          <span className="text-sm font-medium text-gray-200">Brief or URL</span>
          {expanded.brief ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
        </button>
        {expanded.brief && (
          <div className="p-4 pt-0 border-t border-white/10">
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Paste a product URL, describe the campaign objective, or detail the uploaded reference..."
              className="w-full p-4 mt-2 bg-black/20 border border-white/10 rounded-xl h-32 focus:ring-2 focus:ring-[#60a9ff] text-white placeholder-gray-500 resize-none"
            />
          </div>
        )}
      </div>

      <button 
        type="submit" 
        disabled={isLoading || (!inputValue && !selectedFile)}
        className="w-full bg-[#60a9ff] hover:bg-[#4a85cc] text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-[#60a9ff]/25 disabled:opacity-50 tracking-wide"
      >
        {isLoading ? 'Architecting Strategy...' : 'Generate Campaign'}
      </button>
    </form>
  );
}
