import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useWorkspace } from '@/components/providers/WorkspaceProvider';
import AVSelector from './AVSelector';

export default function AssetEditor({ assetData, isEditing = false }: { assetData: any, isEditing?: boolean }) {
  const { activeWorkspace } = useWorkspace();
  const [isApproved, setIsApproved] = useState(false);
  const [script, setScript] = useState(assetData.script || '');
  const [caption, setCaption] = useState(assetData.caption || '');
  const [visualStyle, setVisualStyle] = useState(assetData.visual_style || 'ai_image');
  const [audioBeats, setAudioBeats] = useState(assetData.audio_beats || 'none');
  const [audioAtmos, setAudioAtmos] = useState(assetData.audio_atmos || 'none');
  const [audioMusic, setAudioMusic] = useState(assetData.audio_music || 'none');
  const [audioVoiceover, setAudioVoiceover] = useState(assetData.audio_voiceover !== undefined ? assetData.audio_voiceover : true);
  const [mindwavePreset, setMindwavePreset] = useState('custom');

  const [savedPresets, setSavedPresets] = useState<{name: string, data: any}[]>([]);

  useEffect(() => {
    const loaded = localStorage.getItem('mindwave_custom_presets');
    if (loaded) {
      try {
        setSavedPresets(JSON.parse(loaded));
      } catch (e) {}
    }
  }, []);

  const saveCurrentPreset = () => {
    const name = window.prompt("Enter a name for this custom combination:");
    if (!name) return;
    const newPreset = {
      name,
      data: { visualStyle, audioBeats, audioAtmos, audioMusic, audioVoiceover }
    };
    const updated = [...savedPresets, newPreset];
    setSavedPresets(updated);
    localStorage.setItem('mindwave_custom_presets', JSON.stringify(updated));
    setMindwavePreset(`custom_${name}`);
    toast.success("Preset saved!");
  };

  const applyPreset = (presetId: string) => {
    setMindwavePreset(presetId);
    
    if (presetId.startsWith('custom_')) {
      const pName = presetId.replace('custom_', '');
      const p = savedPresets.find(x => x.name === pName);
      if (p) {
        setVisualStyle(p.data.visualStyle || 'none');
        setAudioBeats(p.data.audioBeats || 'none');
        setAudioAtmos(p.data.audioAtmos || 'none');
        setAudioMusic(p.data.audioMusic || 'none');
        setAudioVoiceover(p.data.audioVoiceover !== undefined ? p.data.audioVoiceover : false);
      }
      return;
    }

    switch(presetId) {
      case 'deep_focus':
        setVisualStyle('mindwave_kanagawa');
        setAudioBeats('432hz');
        setAudioAtmos('rain');
        setAudioMusic('none');
        break;
      case 'meditation_journey':
        setVisualStyle('mindwave_cymatics');
        setAudioBeats('528hz');
        setAudioAtmos('forest');
        setAudioMusic('ambient_journey');
        break;
      case 'cosmic_drift':
        setVisualStyle('mindwave_particle_swarm');
        setAudioBeats('432hz');
        setAudioAtmos('space');
        setAudioMusic('cinematic_swell');
        break;
      case 'custom':
      default:
        // Do nothing, let user customize
        break;
    }
  };

  const [scheduleDelay, setScheduleDelay] = useState(120); // Default 2 hours
  const [scheduleMode, setScheduleMode] = useState<'preset' | 'custom'>('preset');
  const [customScheduleTime, setCustomScheduleTime] = useState('');
  
  const availableAccounts = [
    '@CloveH2O_Main',
    '@Mindwave_Official',
    '@SentAIent_Demo',
    '@Founder_Personal'
  ];

  // Determine prepopulated accounts based on workspace
  const workspaceAccountMap: Record<string, string> = {
    'cloveh2o': '@CloveH2O_Main',
    'mindwave': '@Mindwave_Official',
    'sentaient': '@SentAIent_Demo',
  };
  
  const defaultAccount = workspaceAccountMap[activeWorkspace] || '@SentAIent_Demo';
  // SentAIent is always prepopulated + active workspace account
  const defaultAccountsForPlatform = Array.from(new Set(['@SentAIent_Demo', defaultAccount]));

  // Initialize from previous state, or default
  const [platformAccounts, setPlatformAccounts] = useState<Record<string, string[]>>(
    assetData.platformAccounts || {
      'Instagram': defaultAccountsForPlatform,
      'Twitter/X': defaultAccountsForPlatform
    }
  );
  
  const [isPublishing, setIsPublishing] = useState(false);

  const togglePlatform = (platform: string) => {
    setPlatformAccounts(prev => {
      const next = { ...prev };
      if (next[platform]) {
        delete next[platform]; // Turn off platform completely
      } else {
        next[platform] = defaultAccountsForPlatform; // Turn on with default accounts
      }
      return next;
    });
  };

  const toggleAccountForPlatform = (platform: string, account: string) => {
    setPlatformAccounts(prev => {
      const next = { ...prev };
      if (!next[platform]) return prev;
      
      const accounts = next[platform];
      if (accounts.includes(account)) {
        next[platform] = accounts.filter(a => a !== account);
      } else {
        next[platform] = [...accounts, account];
      }
      return next;
    });
  };

  const handleGenerateVideo = async () => {
    setIsPublishing(true);
    const toastId = toast.loading("Compiling video from Python engine...");
    try {
      const response = await fetch('/api/campaign/produce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...assetData, script, caption, visual_direction: assetData.visual_direction, visual_style: visualStyle, audio_beats: audioBeats, audio_atmos: audioAtmos, audio_music: audioMusic, audio_voiceover: audioVoiceover })
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Video compiled!", { id: toastId });
        // Force re-render to show new video or assets
        if (data.assets && data.assets.final_video) {
          assetData.video_url = `${data.assets.final_video}?t=${Date.now()}`;
        } else if (data.assets && data.assets.image_url) {
          assetData.media_url = `${data.assets.image_url}?t=${Date.now()}`;
          assetData.video_url = '';
        } else {
          assetData.video_url = '';
          assetData.media_url = '';
        }
        assetData.assets = data.assets;
        setPlatformAccounts({...platformAccounts}); 
      } else {
        toast.error("Error compiling video: " + data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Network error.", { id: toastId });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleApproveContent = () => {
    if (!assetData.video_url || assetData.video_url === '/mock.mp4') {
      toast.error("Please generate a video preview before approving content.");
      return;
    }
    setIsApproved(true);
  };

  const handleSchedule = async () => {
    setIsPublishing(true);
    const toastId = toast.loading(isEditing ? "Saving updates..." : "Scheduling campaign...");
    
    try {
      const endpoint = isEditing ? `/api/campaign/queue/${assetData.campaign_id}` : '/api/campaign/schedule';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...assetData,
          script,
          caption,
          visual_style: visualStyle,
          audio_beats: audioBeats,
          audio_atmos: audioAtmos,
          audio_music: audioMusic,
          audio_voiceover: audioVoiceover,
          scheduleMode,
          scheduleDelay,
          customScheduleTime,
          platformAccounts
        })
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success(isEditing ? "Updates saved successfully!" : "Campaign scheduled!", { id: toastId });
        
        if (isEditing) {
          setTimeout(() => {
            window.location.href = '/queue'; // Redirect back to queue after save
          }, 1000);
        } else {
            // Optional: reset state or redirect after fresh schedule
        }
      } else {
        toast.error(`Error ${isEditing ? 'updating' : 'scheduling'}: ` + data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Network error while trying to schedule.", { id: toastId });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            {isApproved ? "Schedule Campaign" : "Generated Assets"}
          </h2>
          <p className="text-sm text-gray-300 mt-1">Status: {assetData.status} | Confidence: {(assetData.confidence * 100).toFixed(0)}%</p>
        </div>
        <div className="flex items-center gap-3">
          {isApproved && (
            <button 
              onClick={() => setIsApproved(false)}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold rounded-lg transition-all"
            >
              ← Edit Content
            </button>
          )}
          <span className="px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
            {assetData.viral_angle || "Strategy Ready"}
          </span>
        </div>
      </div>

      {!isApproved && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Visual Direction</label>
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
              {assetData.visual_direction}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Drafted Script / Copy</label>
            <textarea 
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl h-64 focus:ring-2 focus:ring-blue-500 font-mono text-sm leading-relaxed text-white resize-none"
            />
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Mindwave Studio Setup</h3>
              <div className="flex gap-2">
                <button 
                  onClick={saveCurrentPreset}
                  className="px-3 py-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors"
                >
                  💾 Save Setup
                </button>
                <select 
                  value={mindwavePreset}
                  onChange={(e) => applyPreset(e.target.value)}
                  className="p-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500"
                >
                  <option value="custom">⚙️ Custom Setup</option>
                  <option value="deep_focus">🧘 Deep Focus (Kanagawa + 432Hz + Rain)</option>
                  <option value="meditation_journey">🚀 Meditation Journey (Cymatics + 528Hz + Forest)</option>
                  <option value="cosmic_drift">🌌 Cosmic Drift (Particles + 432Hz + Space)</option>
                  {savedPresets.length > 0 && <optgroup label="Saved Presets">
                    {savedPresets.map((p, i) => (
                      <option key={i} value={`custom_${p.name}`}>⭐ {p.name}</option>
                    ))}
                  </optgroup>}
                </select>
              </div>
            </div>

            <AVSelector 
              visualStyle={visualStyle} setVisualStyle={(v) => { setVisualStyle(v); setMindwavePreset('custom'); }}
              audioBeats={audioBeats} setAudioBeats={(v) => { setAudioBeats(v); setMindwavePreset('custom'); }}
              audioAtmos={audioAtmos} setAudioAtmos={(v) => { setAudioAtmos(v); setMindwavePreset('custom'); }}
              audioMusic={audioMusic} setAudioMusic={(v) => { setAudioMusic(v); setMindwavePreset('custom'); }}
            />

            <div className="flex items-center gap-3 pt-2">
              <input 
                type="checkbox" 
                id="audioVoiceover" 
                checked={audioVoiceover} 
                onChange={(e) => { setAudioVoiceover(e.target.checked); setMindwavePreset('custom'); }}
                className="w-5 h-5 bg-black/40 border-white/10 rounded text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <label htmlFor="audioVoiceover" className="text-sm font-medium text-gray-200">Include AI Voiceover (Script reading)</label>
            </div>
          </div>

          {(assetData.assets || (assetData.video_url && assetData.video_url !== '/mock.mp4') || (assetData.media_url && !assetData.media_url.includes('mock-s3-bucket.sentaient.com'))) && (
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">OpenMontage Render (Preview)</label>
              
              {assetData.video_url && (
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/50 mb-4">
                  <video 
                    key={assetData.video_url}
                    src={assetData.video_url} 
                    controls 
                    className="w-full h-auto max-h-[28rem] object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              
              {assetData.media_url && !assetData.video_url && (
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/50 mb-4 flex justify-center">
                  <img 
                    key={assetData.media_url}
                    src={assetData.media_url} 
                    alt="Asset Preview"
                    className="w-full h-auto max-h-[28rem] object-contain"
                  />
                </div>
              )}
              
              {!assetData.video_url && !assetData.media_url && assetData.assets && (
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/50 mb-4 p-8 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-xl font-bold text-white mb-2">Asset Generated Successfully</h3>
                  <p className="text-gray-400">Download your compiled format using the buttons below.</p>
                </div>
              )}

              {assetData.assets && (
                <div className="flex flex-wrap gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                   {assetData.assets.final_video && (
                     <a href={assetData.assets.final_video} download className="px-4 py-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-sm font-medium transition-all flex-1 text-center">📦 Download Final Video</a>
                   )}
                   {assetData.assets.raw_video && (
                     <a href={assetData.assets.raw_video} download className="px-4 py-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-sm font-medium transition-all flex-1 text-center">🎬 Download Raw Video</a>
                   )}
                   {assetData.assets.audio_mix && (
                     <a href={assetData.assets.audio_mix} download className="px-4 py-2 bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-sm font-medium transition-all flex-1 text-center">🎵 Download Audio Mix</a>
                   )}
                   {assetData.assets.document_url && (
                     <a href={assetData.assets.document_url} download className="px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-sm font-medium transition-all flex-1 text-center">📄 Download PDF</a>
                   )}
                   {assetData.assets.archive_url && (
                     <a href={assetData.assets.archive_url} download className="px-4 py-2 bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-sm font-medium transition-all flex-1 text-center">🗂️ Download Images ZIP</a>
                   )}
                   {assetData.assets.text_url && (
                     <a href={assetData.assets.text_url} download className="px-4 py-2 bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 border border-gray-500/30 rounded-lg text-sm font-medium transition-all flex-1 text-center">📝 Download Text Copy</a>
                   )}
                   {assetData.assets.image_url && (
                     <a href={assetData.assets.image_url} download className="px-4 py-2 bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 border border-pink-500/30 rounded-lg text-sm font-medium transition-all flex-1 text-center">🖼️ Download Final Image</a>
                   )}
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Social Caption</label>
            <textarea 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl h-32 focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed text-white resize-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button className="px-6 py-2.5 text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 font-medium rounded-xl transition-all">
              Request Revision
            </button>
            <button 
              onClick={handleGenerateVideo}
              disabled={isPublishing}
              className="px-8 py-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[#8b5cf6]/25 disabled:opacity-50 tracking-wide"
            >
              {isPublishing ? "Compiling..." : "Generate Video Preview"}
            </button>
            <button 
              onClick={handleApproveContent}
              className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-green-500/25 tracking-wide"
            >
              Approve Content
            </button>
          </div>
        </>
      )}

      {isApproved && (
        <>
          <div className="flex flex-col gap-4 pt-4 border-white/10">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-4">Multi-Account Platform Targeting</label>
              <div className="flex flex-col gap-4">
                {['Twitter/X', 'Instagram', 'TikTok', 'LinkedIn'].map(platform => {
                  const isPlatformActive = !!platformAccounts[platform];
                  return (
                    <div key={platform} className={`p-4 rounded-xl border transition-all ${isPlatformActive ? 'bg-white/10 border-blue-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => togglePlatform(platform)}
                          className={`flex-shrink-0 w-32 py-2 text-sm font-bold rounded-lg transition-all ${isPlatformActive ? 'bg-[#60a9ff] text-white shadow-lg shadow-blue-500/20' : 'bg-black/20 text-gray-400'}`}
                        >
                          {platform}
                        </button>
                        
                        {isPlatformActive && (
                          <div className="flex flex-wrap gap-2">
                            {availableAccounts.map(account => {
                              const isAccountSelected = platformAccounts[platform].includes(account);
                              return (
                                <button
                                  key={account}
                                  onClick={() => toggleAccountForPlatform(platform, account)}
                                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isAccountSelected ? 'bg-white/20 text-white border border-white/30' : 'bg-black/20 text-gray-400 border border-transparent hover:border-white/10'}`}
                                >
                                  {isAccountSelected ? '✓ ' : ''}{account}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
            <label className="block text-sm font-medium text-gray-200">Schedule Time</label>
            <div className="flex flex-col md:flex-row gap-4">
              <select 
                value={scheduleMode === 'custom' ? 'custom' : scheduleDelay}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setScheduleMode('custom');
                  } else {
                    setScheduleMode('preset');
                    setScheduleDelay(Number(e.target.value));
                  }
                }}
                className="w-full md:w-1/2 p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value={0} className="bg-[#202733]">Post Now</option>
                <option value={5} className="bg-[#202733]">In 5 minutes</option>
                <option value={10} className="bg-[#202733]">In 10 minutes</option>
                <option value={15} className="bg-[#202733]">In 15 minutes</option>
                <option value={30} className="bg-[#202733]">In 30 minutes</option>
                <option value={45} className="bg-[#202733]">In 45 minutes</option>
                <option value={60} className="bg-[#202733]">In 1 hour</option>
                <option value={90} className="bg-[#202733]">In 1.5 hours</option>
                <option value={120} className="bg-[#202733]">In 2 hours</option>
                <option value={180} className="bg-[#202733]">In 3 hours</option>
                <option value={360} className="bg-[#202733]">In 6 hours</option>
                <option value={720} className="bg-[#202733]">In 12 hours</option>
                <option value={1440} className="bg-[#202733]">In 24 hours</option>
                <option value="custom" className="bg-[#202733]">Custom Date / Time...</option>
              </select>

              {scheduleMode === 'custom' && (
                <input 
                  type="datetime-local" 
                  value={customScheduleTime}
                  onChange={(e) => setCustomScheduleTime(e.target.value)}
                  className="w-full md:w-1/2 p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 text-sm [color-scheme:dark]"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 mt-2 border-t border-white/10">
            <button 
              onClick={handleSchedule}
              disabled={isPublishing}
              className="px-8 py-2.5 bg-[#60a9ff] hover:bg-[#4a85cc] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[#60a9ff]/25 disabled:opacity-50 tracking-wide"
            >
              {isPublishing ? (isEditing ? "Saving..." : "Scheduling...") : (isEditing ? "Save Scheduled Time" : "Confirm Schedule")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
