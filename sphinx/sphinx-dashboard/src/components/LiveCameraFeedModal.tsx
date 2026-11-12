import React, { useState, useEffect, useRef } from 'react';
import { CameraFeedsEngine, LiveCameraFeed, GLOBAL_CAMERA_FEEDS } from '../lib/intelligence/cameraFeedsEngine';

interface LiveCameraFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  feed: LiveCameraFeed | null;
  onSelectFeed: (feed: LiveCameraFeed) => void;
  onFlyTo?: (coords: [number, number], zoom?: number) => void;
  viewportBbox?: [number, number, number, number] | null;
}

export function LiveCameraFeedModal({
  isOpen,
  onClose,
  feed,
  onSelectFeed,
  onFlyTo,
  viewportBbox
}: LiveCameraFeedModalProps) {
  const currentFeed = feed || GLOBAL_CAMERA_FEEDS[0];
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [activeStreamUrl, setActiveStreamUrl] = useState<string>(currentFeed.streamUrl);
  const [showHudOverlay, setShowHudOverlay] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTimecode, setCurrentTimecode] = useState<string>('');
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isPipExpanded, setIsPipExpanded] = useState<boolean>(false);

  // Dragging state
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 80, y: 120 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; posX: number; posY: number }>({
    mouseX: 0,
    mouseY: 0,
    posX: 80,
    posY: 120
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync active stream URL when feed changes
  useEffect(() => {
    if (feed) {
      setActiveStreamUrl(feed.streamUrl);
      setVideoError(false);
    }
  }, [feed]);

  // Live UTC digital timecode ticker
  useEffect(() => {
    const updateTicker = () => {
      const now = new Date();
      setCurrentTimecode(now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
    };
    updateTicker();
    const interval = setInterval(updateTicker, 1000);
    return () => clearInterval(interval);
  }, []);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag from header, ignore buttons
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'INPUT') return;
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: position.x,
      posY: position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;
      const newX = Math.max(10, Math.min(window.innerWidth - 340, dragStartRef.current.posX + dx));
      const newY = Math.max(10, Math.min(window.innerHeight - 200, dragStartRef.current.posY + dy));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  const filteredFeeds = CameraFeedsEngine.getFeedsByCategory(selectedCategory);

  const handleConnectCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    setActiveStreamUrl(customUrlInput.trim());
    setVideoError(false);
  };

  const handleFlyToCamera = () => {
    if (onFlyTo && currentFeed) {
      onFlyTo([currentFeed.lon, currentFeed.lat], 16);
    }
  };

  return (
    <div
      data-testid="live-camera-feed-modal"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isPipExpanded ? '720px' : '480px',
        maxWidth: 'calc(100vw - 24px)',
        zIndex: 45
      }}
      className={`fixed bg-slate-950/95 border border-cyan-500/60 rounded-xl shadow-[0_0_35px_rgba(6,182,212,0.35)] backdrop-blur-xl text-white font-mono flex flex-col overflow-hidden transition-[width] duration-200 select-none ${
        isDragging ? 'ring-2 ring-cyan-400 cursor-grabbing' : ''
      }`}
    >
      {/* Draggable Header */}
      <div
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-cyan-800/60 cursor-grab active:cursor-grabbing shrink-0"
      >
        <div className="flex items-center gap-2">
          <span className="text-cyan-500 select-none text-xs">⠿</span>
          <span className="text-red-500 animate-pulse text-sm">●</span>
          <span className="text-cyan-300 font-bold text-xs tracking-wider uppercase">
            SPHINX TACTICAL OPTICAL FEED
          </span>
          <span className="text-[10px] bg-red-950/80 text-red-400 border border-red-700/60 px-1.5 py-0.2 rounded font-bold">
            LIVE
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowHudOverlay(!showHudOverlay)}
            className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
              showHudOverlay
                ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                : 'bg-black/50 border-gray-700 text-gray-400 hover:text-white'
            }`}
            title="Toggle HUD Crosshair & Telemetry Overlay"
          >
            HUD
          </button>
          <button
            type="button"
            onClick={() => setIsPipExpanded(!isPipExpanded)}
            className="text-[10px] text-gray-400 hover:text-cyan-300 px-1.5 py-0.5 rounded bg-black/40 border border-gray-700 transition-colors"
            title={isPipExpanded ? 'Standard Window' : 'Expand Video Window'}
          >
            {isPipExpanded ? '🗗 RESTORE' : '🗖 EXPAND'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-red-400 transition-colors text-sm px-1.5 py-0.5"
            title="Close Live Video Stream"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Video Viewport Area */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden border-b border-cyan-900/40">
        {!videoError ? (
          <video
            ref={videoRef}
            src={activeStreamUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4 space-y-2 bg-slate-950">
            <span className="text-2xl text-amber-500">⚠️</span>
            <div className="text-xs font-bold text-amber-400">REMOTE STREAM CONNECTING OR BUFFERING</div>
            <div className="text-[10px] text-gray-400 max-w-xs">
              Direct live stream is initializing or stream provider requires authenticated relay.
            </div>
            <button
              type="button"
              onClick={() => {
                setVideoError(false);
                setActiveStreamUrl(GLOBAL_CAMERA_FEEDS[0].streamUrl);
              }}
              className="text-[10px] px-2.5 py-1 bg-cyan-900/80 hover:bg-cyan-800 text-cyan-200 border border-cyan-600 rounded transition-colors"
            >
              Connect to Backup Tactical Relay
            </button>
          </div>
        )}

        {/* Tactical HUD Overlay Elements */}
        {showHudOverlay && !videoError && (
          <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between text-shadow">
            {/* Top Bar: UTC timecode, status, FPS */}
            <div className="flex items-center justify-between text-[10px] font-mono">
              <div className="flex items-center gap-2 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                <span className="font-bold text-red-400 tracking-wider">REC</span>
                <span className="text-cyan-200">{currentTimecode}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30 backdrop-blur-sm text-cyan-300">
                <span>{currentFeed.resolution}</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">{currentFeed.status}</span>
              </div>
            </div>

            {/* Center Tactical Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="relative w-20 h-20 border border-cyan-400/40 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                <div className="absolute top-0 w-0.5 h-3 bg-cyan-400/60" />
                <div className="absolute bottom-0 w-0.5 h-3 bg-cyan-400/60" />
                <div className="absolute left-0 h-0.5 w-3 bg-cyan-400/60" />
                <div className="absolute right-0 h-0.5 w-3 bg-cyan-400/60" />
              </div>
            </div>

            {/* Bottom Bar: Coordinates, azimuth, camera details */}
            <div className="flex items-end justify-between text-[10px] font-mono">
              <div className="bg-black/70 px-2 py-1 rounded border border-cyan-500/30 backdrop-blur-sm space-y-0.5 max-w-[70%]">
                <div className="font-bold text-white truncate flex items-center gap-1.5">
                  <span>{currentFeed.flag}</span>
                  <span className="text-cyan-300 truncate">{currentFeed.name}</span>
                </div>
                <div className="text-gray-300 text-[9px] flex items-center gap-2">
                  <span>{currentFeed.city}{currentFeed.state ? `, ${currentFeed.state}` : ''}</span>
                  <span>•</span>
                  <span className="text-cyan-400">{currentFeed.provider}</span>
                </div>
              </div>

              <div className="bg-black/70 px-2 py-1 rounded border border-cyan-500/30 backdrop-blur-sm text-right space-y-0.5">
                <div className="text-cyan-300 text-[9px]">
                  {currentFeed.lat.toFixed(4)}°N, {Math.abs(currentFeed.lon).toFixed(4)}°W
                </div>
                {currentFeed.azimuth != null && (
                  <div className="text-amber-300 text-[9px] font-bold">
                    🧭 {currentFeed.azimuth}° AZIMUTH
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Audio Mute Button in Video Corner */}
        <button
          type="button"
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white text-xs border border-white/20 transition-all pointer-events-auto shadow"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Control Panel & Camera Directory */}
      <div className="p-3 bg-slate-900/90 space-y-2.5 text-xs">
        {/* Category Selector Chips (Zero Sliders Rule) */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 custom-scrollbar">
          {(['ALL', 'TRAFFIC', 'METRO', 'ALPINE', 'COASTAL', 'CCTV'] as const).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider transition-all whitespace-nowrap shrink-0 border ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                  : 'bg-black/40 text-gray-300 border-cyan-900/60 hover:border-cyan-600 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? '🌐 ALL' : cat === 'TRAFFIC' ? '🚗 TRAFFIC' : cat === 'METRO' ? '🏙️ METRO' : cat === 'ALPINE' ? '🏔️ ALPINE' : cat === 'COASTAL' ? '🌊 COASTAL' : '📹 CCTV'}
            </button>
          ))}
        </div>

        {/* Camera Selector Dropdown & Fly-To Button */}
        <div className="flex items-center gap-2">
          <select
            data-testid="live-camera-feed-select"
            value={currentFeed.id}
            onChange={(e) => {
              const selected = GLOBAL_CAMERA_FEEDS.find(f => f.id === e.target.value);
              if (selected) {
                onSelectFeed(selected);
              }
            }}
            className="flex-1 bg-black/90 border border-cyan-700/80 text-cyan-200 text-xs font-mono rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 truncate"
          >
            {filteredFeeds.map(f => (
              <option key={f.id} value={f.id}>
                {f.flag} {f.city} — {f.name}
              </option>
            ))}
          </select>

          {onFlyTo && (
            <button
              type="button"
              onClick={handleFlyToCamera}
              className="px-2.5 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-600 rounded text-cyan-300 font-bold text-[11px] flex items-center gap-1 shrink-0 transition-colors"
              title="Fly 3D Map to Camera Location"
            >
              <span>🎯</span>
              <span>FLY TO</span>
            </button>
          )}
        </div>

        {/* Custom Stream Ingestion Bar (Paste Any HLS / WebRTC / MP4 URL) */}
        <div className="pt-2 border-t border-cyan-950/80 space-y-1">
          <div className="text-[10px] text-gray-400 font-medium flex items-center justify-between">
            <span>CUSTOM LIVE STREAM INGESTION:</span>
            <span className="text-[9px] text-cyan-500">Supports HLS (.m3u8), WebRTC, MP4</span>
          </div>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              placeholder="Paste stream URL (e.g. https://.../stream.m3u8)"
              value={customUrlInput}
              onChange={(e) => setCustomUrlInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleConnectCustomUrl(); }}
              className="flex-1 bg-black/80 border border-cyan-900 focus:border-cyan-400 px-2.5 py-1 text-[11px] rounded text-white font-mono placeholder-gray-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleConnectCustomUrl}
              className="px-2.5 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-bold text-[10px] rounded transition-all shrink-0"
            >
              CONNECT
            </button>
            {activeStreamUrl !== currentFeed.streamUrl && (
              <button
                type="button"
                onClick={() => {
                  setActiveStreamUrl(currentFeed.streamUrl);
                  setCustomUrlInput('');
                  setVideoError(false);
                }}
                className="px-1.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-[10px] rounded transition-colors"
                title="Reset to camera default feed"
              >
                RESET
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveCameraFeedModal;
