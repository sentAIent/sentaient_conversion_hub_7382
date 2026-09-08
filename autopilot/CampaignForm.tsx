import React, { useState, useRef } from 'react';
import { useWorkspace } from './components/providers/WorkspaceProvider';

export default function CampaignForm({ onGenerate, isLoading }: { onGenerate: (data: any) => void, isLoading: boolean }) {
  const [inputValue, setInputValue] = useState('');
  const [campaignType, setCampaignType] = useState('short_form_video');
  const { activeWorkspace, setActiveWorkspace, brands } = useWorkspace();
  
  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saveToKB, setSaveToKB] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      // 1. Upload the file first
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
            base64: uploadData.base64,
            mimeType: uploadData.mimeType,
            filename: uploadData.filename
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
      media: mediaPayload
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

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Reference Material (Optional)</label>
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
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
            <div className="text-sm font-medium text-blue-600 truncate">
              {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              <button 
                type="button" 
                className="ml-2 text-red-500 hover:text-red-700 text-xs"
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
            <div className="text-sm text-gray-500">
              Drag & drop an image, video, audio, or text file here, or <span className="text-blue-500 font-semibold">click to browse</span>
            </div>
          )}
        </div>
        
        {selectedFile && (
          <div className="mt-2 flex items-center gap-2">
            <input 
              type="checkbox" 
              id="saveToKB" 
              checked={saveToKB}
              onChange={(e) => setSaveToKB(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="saveToKB" className="text-sm text-gray-700 font-medium cursor-pointer">
              Save to Knowledge Base / Library
            </label>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
          <span>Brief, URL, or JSON Payload</span>
        </label>
        <textarea 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste a product URL, describe the campaign objective, or provide a JSON payload..."
          className="w-full p-4 border border-gray-200 rounded-lg min-h-[300px] resize-y focus:ring-2 focus:ring-blue-500 text-black font-mono text-sm leading-relaxed"
        />
        <div className="mt-2 p-3 bg-gray-50 border border-gray-100 rounded text-xs text-gray-500 overflow-x-auto">
          <p className="font-semibold mb-1">Sample JSON Format (Optional):</p>
          <pre>{`{
  "targetAccounts": ["TikTok:@brand", "LinkedIn:@professional"],
  "platforms": ["TikTok", "LinkedIn"],
  "prompt_template": "Focus heavily on productivity hacks."
}`}</pre>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading || (!inputValue && !selectedFile)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Architecting Strategy...' : 'Generate Assets'}
      </button>
    </form>
  );
}
