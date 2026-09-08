"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Server, Activity, CheckCircle2, Circle, Upload, Link2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AccountsTestingDashboard() {
  const [accounts, setAccounts] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedHandle, setSelectedHandle] = useState<string>('');
  const [testText, setTestText] = useState('This is an automated test from AutoPilot.');
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await fetch('http://localhost:18080/admin/accounts');
      if (res.ok) {
        const data = await res.json();
        setAccounts(data);
        
        // Auto-select first available account
        for (const [platform, handles] of Object.entries(data)) {
          const handlesArr = handles as string[];
          if (handlesArr.length > 0) {
            setSelectedPlatform(platform);
            setSelectedHandle(handlesArr[0]);
            break;
          }
        }
      }
    } catch (err) {
      console.error("Failed to load accounts", err);
      toast.error("Failed to connect to Orchestrator API");
    } finally {
      setLoading(false);
    }
  };

  const handleTestPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlatform || !selectedHandle) {
      toast.error("Select an account first");
      return;
    }

    setIsTesting(true);
    setTestResult(null);
    let mediaUrl = null;

    // 1. Upload Media if present
    if (selectedFile) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('saveToKB', 'false');

      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        
        if (uploadData.success) {
          mediaUrl = uploadData.url;
        } else {
          toast.error("Media upload failed");
          setIsTesting(false);
          setIsUploading(false);
          return;
        }
      } catch (err) {
        toast.error("Media upload error");
        setIsTesting(false);
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    // 2. Send Test Publish Request
    try {
      const res = await fetch('http://localhost:18080/admin/test-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: selectedPlatform,
          handle: selectedHandle,
          text: testText,
          mediaUrl: mediaUrl
        })
      });
      
      const data = await res.json();
      setTestResult(data);
      
      if (res.ok && data.success) {
        toast.success(`Test post to ${selectedHandle} succeeded!`);
      } else {
        toast.error(`Test post failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      setTestResult({ error: err.message });
      toast.error("Test request failed");
    } finally {
      setIsTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Activity className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8 text-white">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-emerald-400 drop-shadow-sm flex items-center gap-4">
            <Link2 className="w-10 h-10" />
            Accounts Testing
          </h1>
          <p className="text-gray-400 mt-2 font-medium tracking-wide">Select an integrated account and execute a dry-run or live test post.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Account Selection */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold mb-4">Select Target</h3>
            {Object.entries(accounts).every(([_, handles]) => handles.length === 0) ? (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center text-gray-500">
                No accounts connected. Please link accounts in the Studio.
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(accounts).map(([platform, handles]) => (
                  handles.length > 0 && (
                    <div key={platform} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                      <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800">
                        <span className="font-semibold text-neutral-300">{platform}</span>
                      </div>
                      <div className="p-2 space-y-1">
                        {handles.map(handle => {
                          const isSelected = selectedPlatform === platform && selectedHandle === handle;
                          return (
                            <div 
                              key={handle}
                              onClick={() => { setSelectedPlatform(platform); setSelectedHandle(handle); setTestResult(null); }}
                              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${isSelected ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-transparent border-transparent hover:bg-neutral-800'}`}
                            >
                              {isSelected ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-gray-600" />}
                              <span className={`font-medium ${isSelected ? 'text-emerald-300' : 'text-gray-300'}`}>{handle}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Test Payload */}
          <div className="lg:col-span-7">
            <form onSubmit={handleTestPost} className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Payload Editor</h3>
                {selectedPlatform && (
                  <span className="bg-neutral-800 px-3 py-1 rounded-full text-xs text-emerald-400 border border-emerald-500/30">
                    Target: {selectedPlatform} | {selectedHandle}
                  </span>
                )}
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Test Caption / Text</label>
                <textarea 
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all h-28 resize-none"
                />
              </div>

              {/* Media Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Attach Media (Optional)</label>
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${selectedFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-neutral-700 hover:border-neutral-500 bg-neutral-950'}`}
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
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-sm font-medium text-emerald-400 truncate max-w-xs">{selectedFile.name}</span>
                      <button 
                        type="button" 
                        className="text-red-400 text-xs hover:underline flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        <XCircle className="w-3 h-3" /> Remove Media
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <Upload className="w-6 h-6" />
                      <span className="text-sm">Click to browse media files (Images, Video, Audio)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isTesting || (!testText && !selectedFile) || !selectedPlatform}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-bold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 disabled:shadow-none flex justify-center items-center gap-2"
              >
                {isUploading ? (
                  <><Activity className="w-5 h-5 animate-spin" /> Uploading Media...</>
                ) : isTesting ? (
                  <><Activity className="w-5 h-5 animate-spin" /> Executing Test...</>
                ) : (
                  <><Server className="w-5 h-5" /> Execute Test Post</>
                )}
              </button>

              {/* Result Area */}
              {testResult && (
                <div className={`mt-4 p-4 rounded-xl border ${testResult.success ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <h4 className={`text-sm font-bold mb-2 ${testResult.success ? 'text-emerald-400' : 'text-red-400'}`}>
                    {testResult.success ? 'Execution Result' : 'Execution Failed'}
                  </h4>
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
