"use client";
import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen, Search, X, AlertTriangle, Copy, Check, Star, Download,
  Wifi, WifiOff, HardDrive, ShieldCheck, Lock, RefreshCw, Trash2, ArrowUpRight
} from 'lucide-react';
import {
  SurvivalArticle, SURVIVAL_CATEGORIES, SURVIVAL_ARTICLES
} from '../lib/survival/survivalData';
import { offlineStorage, StorageStats } from '../lib/survival/offlineStorageEngine';
import { OfflineGisCacheEngine, GisCacheSummary, CRITICAL_GEOJSON_TARGETS } from '../lib/survival/offlineGisCacheEngine';

interface OfflineSurvivalHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: string;
  onUpgradeTier?: () => void;
}

export function OfflineSurvivalHubModal({
  isOpen,
  onClose,
  currentTier,
  onUpgradeTier
}: OfflineSurvivalHubModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Network and offline storage state
  const [isOnline, setIsOnline] = useState(true);
  const [storageStats, setStorageStats] = useState<StorageStats>({
    isDownloaded: false,
    usedBytes: 0,
    articleCount: SURVIVAL_ARTICLES.length,
    lastUpdated: null,
    version: '2.4.0'
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Tactical GIS offline cache state
  const [gisCacheSummary, setGisCacheSummary] = useState<GisCacheSummary>({
    isFullyCached: false,
    cachedLayersCount: 0,
    totalLayersCount: CRITICAL_GEOJSON_TARGETS.length,
    totalCachedBytes: 0,
    lastCachedTimestamp: null,
    cachedLayerIds: []
  });
  const [isDownloadingGis, setIsDownloadingGis] = useState(false);
  const [gisProgress, setGisProgress] = useState(0);
  const [currentGisLayerName, setCurrentGisLayerName] = useState<string>('');

  const isPremium = currentTier === 'pro' || currentTier === 'sovereign';

  // Monitor network status
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load storage stats, GIS cache stats, and bookmarks on open
  useEffect(() => {
    if (!isOpen) return;

    offlineStorage.getStorageStats().then(setStorageStats);
    offlineStorage.getBookmarks().then(setBookmarks);
    OfflineGisCacheEngine.getCacheSummary().then(setGisCacheSummary);
  }, [isOpen]);

  const handleDownloadGisCache = async () => {
    if (!isPremium) {
      if (onUpgradeTier) onUpgradeTier();
      return;
    }
    setIsDownloadingGis(true);
    setGisProgress(0);
    try {
      const res = await OfflineGisCacheEngine.downloadAllLayers((pct, name) => {
        setGisProgress(pct);
        setCurrentGisLayerName(name);
      });
      if (res.success) {
        setDownloadSuccessMessage(`Successfully cached ${res.layerCount} tactical GeoJSON layers (${Math.round(res.totalBytes / 1024)} KB) into offline CacheStorage.`);
        const summary = await OfflineGisCacheEngine.getCacheSummary();
        setGisCacheSummary(summary);
      }
    } catch (e) {
      console.error('Download GIS cache error', e);
    } finally {
      setIsDownloadingGis(false);
    }
  };

  const handleClearGisCache = async () => {
    await OfflineGisCacheEngine.clearGisCache();
    const summary = await OfflineGisCacheEngine.getCacheSummary();
    setGisCacheSummary(summary);
  };

  // Handle Download full vault
  const handleDownloadVault = async () => {
    if (!isPremium) {
      if (onUpgradeTier) onUpgradeTier();
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(5);
    setDownloadSuccessMessage(null);

    try {
      const result = await offlineStorage.downloadFullVault(currentTier, (pct) => {
        setDownloadProgress(pct);
      });

      if (result.success) {
        setDownloadSuccessMessage(`Successfully cached ${result.bytes.toLocaleString()} bytes into local IndexedDB storage.`);
        const updated = await offlineStorage.getStorageStats();
        setStorageStats(updated);
      }
    } catch (e: any) {
      console.error('Download vault failed', e);
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle Clear vault
  const handleClearVault = async () => {
    await offlineStorage.clearVault();
    const updated = await offlineStorage.getStorageStats();
    setStorageStats(updated);
    setDownloadSuccessMessage(null);
  };

  // Toggle bookmark
  const handleToggleBookmark = async (id: string) => {
    const isNowBookmarked = await offlineStorage.toggleBookmark(id);
    if (isNowBookmarked) {
      setBookmarks((prev) => [...prev, id]);
    } else {
      setBookmarks((prev) => prev.filter((b) => b !== id));
    }
  };

  // Copy full cheat sheet text to clipboard
  const handleCopyCheatSheet = (article: SurvivalArticle) => {
    const lines = [
      `=== ${article.title.toUpperCase()} ===`,
      `CATEGORY: ${article.category.toUpperCase()} | URGENCY: ${article.urgency.toUpperCase()}`,
      `SUMMARY: ${article.summary}`,
      '',
      ...(article.materials?.length ? ['REQUIRED MATERIALS / TOOLS:', ...article.materials.map((m) => `  - ${m}`), ''] : []),
      'PROTOCOLS & ACTION STEPS:',
      ...article.protocols.map((p, i) => `  ${i + 1}. ${p}`),
      '',
      ...(article.warnings?.length ? ['CRITICAL WARNINGS:', ...article.warnings.map((w) => `  ! ${w}`), ''] : []),
      ...(article.tips?.length ? ['TACTICAL PRO-TIPS:', ...article.tips.map((t) => `  * ${t}`), ''] : []),
      '======================================='
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered list
  const filteredArticles = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();

    return SURVIVAL_ARTICLES.filter((art) => {
      if (onlyBookmarks && !bookmarks.includes(art.id)) {
        return false;
      }

      if (selectedCategory !== 'all' && selectedCategory !== 'vault_manager' && art.category !== selectedCategory) {
        return false;
      }

      if (!q) return true;

      const inTitle = art.title.toLowerCase().includes(q);
      const inSummary = art.summary.toLowerCase().includes(q);
      const inKeywords = art.keywords.some((k) => k.toLowerCase().includes(q));
      const inProtocols = art.protocols.some((p) => p.toLowerCase().includes(q));

      return inTitle || inSummary || inKeywords || inProtocols;
    });
  }, [searchTerm, selectedCategory, onlyBookmarks, bookmarks]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: SURVIVAL_ARTICLES.length };
    SURVIVAL_CATEGORIES.forEach((cat) => {
      counts[cat.id] = SURVIVAL_ARTICLES.filter((a) => a.category === cat.id).length;
    });
    return counts;
  }, []);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Offline Survival and Lifesaving Hub"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 font-mono select-none"
    >
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[860px] bg-neutral-950 border border-cyan-800/80 rounded-2xl shadow-[0_0_50px_rgba(8,145,178,0.35)] flex flex-col overflow-hidden text-white">
        
        {/* Top Header Bar */}
        <div className="px-4 py-3 bg-gradient-to-r from-cyan-950/90 via-slate-950 to-emerald-950/90 border-b border-cyan-800/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/80 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              <BookOpen size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-sm tracking-wider text-white">TACTICAL SURVIVAL & LIFESAVING HUB</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-950 border border-cyan-500/50 text-cyan-300">
                  {currentTier.toUpperCase()}
                </span>
              </div>
              <p className="text-[10px] text-gray-400">
                Grid-Down Field Manuals, TCCC Trauma, Foraging, Toxin Triage, Recipes & Offline Encyclopedia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Network & Grid-Down State Indicator */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                isOnline
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'bg-amber-950/90 text-amber-300 border-amber-500/80 animate-pulse'
              }`}
              title={isOnline ? 'Online: Active Sat/Cell Connection' : 'Grid-Down: Network Offline, Using Local Vault'}
            >
              {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
              <span>{isOnline ? 'ONLINE' : 'GRID DOWN (OFFLINE)'}</span>
            </div>

            {/* Offline Cache Status Pill */}
            <div
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                storageStats.isDownloaded
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60'
                  : 'bg-neutral-900 text-gray-400 border-gray-700'
              }`}
            >
              <HardDrive size={12} />
              <span>{storageStats.isDownloaded ? '100% CACHED' : 'UNCACHED'}</span>
            </div>

            <button
              type="button"
              data-testid="btn-close-survival-hub"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Close Survival Hub"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter and Search Navigation Bar */}
        <div className="p-3 bg-neutral-900/80 border-b border-white/5 space-y-2.5 shrink-0">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                data-testid="input-survival-search"
                placeholder="Search protocols (e.g., tourniquet, radiation KI, wild carrot, tire plug, pemmican, hardtack)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/70 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/80"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2 text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Bookmark Filter Toggle */}
            <button
              type="button"
              data-testid="btn-toggle-bookmarks-filter"
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all border ${
                onlyBookmarks
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500 font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:text-white'
              }`}
            >
              <Star size={13} className={onlyBookmarks ? 'fill-amber-400 text-amber-400' : ''} />
              <span>Pinned ({bookmarks.length})</span>
            </button>
          </div>

          {/* Category Chips Bar */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <button
              type="button"
              data-testid="cat-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 font-medium ${
                selectedCategory === 'all'
                  ? 'bg-cyan-600 text-white font-bold shadow-[0_0_10px_rgba(8,145,178,0.5)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>🌐 All Guides</span>
              <span className="text-[10px] opacity-75 font-mono">({categoryCounts['all']})</span>
            </button>

            {SURVIVAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                data-testid={`cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 font-medium ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-600 text-white font-bold shadow-[0_0_10px_rgba(8,145,178,0.5)]'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-75 font-mono">({categoryCounts[cat.id] || 0})</span>
              </button>
            ))}

            {/* Offline Vault Manager Tab */}
            <button
              type="button"
              data-testid="cat-vault-manager"
              onClick={() => setSelectedCategory('vault_manager')}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 font-medium ${
                selectedCategory === 'vault_manager'
                  ? 'bg-emerald-600 text-white font-bold shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                  : 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 hover:bg-emerald-900/30'
              }`}
            >
              <HardDrive size={13} />
              <span>Offline Vault Manager</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* OFFLINE VAULT MANAGER VIEW */}
          {selectedCategory === 'vault_manager' ? (
            <div className="max-w-2xl mx-auto space-y-6 py-4 animate-in fade-in duration-200">
              
              {/* Vault Status Card */}
              <div className="bg-black/60 border border-cyan-800/60 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={22} className="text-emerald-400" />
                    <div>
                      <h3 className="font-bold text-white text-base">Grid-Down Survival Storage Vault</h3>
                      <p className="text-xs text-gray-400">Client-Side IndexedDB Offline Persistence</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      storageStats.isDownloaded
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/60'
                        : 'bg-amber-950 text-amber-300 border-amber-500/60'
                    }`}
                  >
                    {storageStats.isDownloaded ? 'READY DISCONNECTED' : 'NOT PERSISTED'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-white/5">
                    <div className="text-gray-400 text-[10px]">TOTAL GUIDES</div>
                    <div className="text-white font-bold text-base mt-0.5">{storageStats.articleCount} Articles</div>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-white/5">
                    <div className="text-gray-400 text-[10px]">CACHE FOOTPRINT</div>
                    <div className="text-cyan-300 font-bold text-base mt-0.5">
                      {storageStats.isDownloaded ? `${Math.round(storageStats.usedBytes / 1024)} KB` : '0 KB'}
                    </div>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-white/5 col-span-2 sm:col-span-1">
                    <div className="text-gray-400 text-[10px]">STORAGE ENGINE</div>
                    <div className="text-emerald-300 font-bold text-base mt-0.5">IndexedDB v{storageStats.version}</div>
                  </div>
                </div>

                {downloadSuccessMessage && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/60 rounded-lg text-emerald-200 text-xs flex items-center gap-2">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    <span>{downloadSuccessMessage}</span>
                  </div>
                )}

                {/* Progress Bar when downloading */}
                {isDownloading && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-cyan-300">
                      <span>Caching encyclopedic records...</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Download Actions */}
                <div className="pt-2 flex flex-wrap gap-3">
                  {isPremium ? (
                    <button
                      type="button"
                      data-testid="btn-download-vault"
                      onClick={handleDownloadVault}
                      disabled={isDownloading}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50"
                    >
                      {isDownloading ? <RefreshCw size={15} className="animate-spin" /> : <Download size={15} />}
                      <span>{storageStats.isDownloaded ? 'UPDATE OFFLINE VAULT CACHE' : 'DOWNLOAD COMPLETE OFFLINE VAULT'}</span>
                    </button>
                  ) : (
                    <div className="w-full bg-purple-950/40 border border-purple-500/40 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                        <Lock size={15} />
                        <span>PREMIUM GRID-DOWN CAPABILITY</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Offline storage and local IndexedDB downloads for blackouts, emergency field deployments, and grid collapses are reserved for Pro and Sovereign Sentinel tiers.
                      </p>
                      <button
                        type="button"
                        data-testid="btn-upgrade-offline-vault"
                        onClick={onUpgradeTier}
                        className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2"
                      >
                        <span>Upgrade to Pro / Sovereign</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  )}

                  {storageStats.isDownloaded && (
                    <button
                      type="button"
                      data-testid="btn-clear-vault"
                      onClick={handleClearVault}
                      className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-red-950/60 text-gray-400 hover:text-red-300 border border-white/10 hover:border-red-700/60 text-xs flex items-center gap-1.5 transition-colors"
                      title="Clear local IndexedDB cache"
                    >
                      <Trash2 size={14} />
                      <span>Clear Cache</span>
                    </button>
                  )}
                </div>
              </div>

              {/* TACTICAL OFFLINE GIS & MAP LAYERS CACHE CARD */}
              <div className="bg-black/60 border border-emerald-800/60 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <HardDrive size={22} className="text-emerald-400" />
                    <div>
                      <h3 className="font-bold text-white text-base">Tactical GIS & Map Layers Vault</h3>
                      <p className="text-xs text-gray-400">Offline GeoJSON Layers, Public Lands, Grid & Water Assets</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      gisCacheSummary.isFullyCached
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/60'
                        : gisCacheSummary.cachedLayersCount > 0
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-500/60'
                        : 'bg-amber-950 text-amber-300 border-amber-500/60'
                    }`}
                  >
                    {gisCacheSummary.isFullyCached
                      ? 'ALL LAYERS CACHED'
                      : gisCacheSummary.cachedLayersCount > 0
                      ? `${gisCacheSummary.cachedLayersCount}/${gisCacheSummary.totalLayersCount} CACHED`
                      : 'NOT PERSISTED'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-white/5">
                    <div className="text-gray-400 text-[10px]">GEOJSON TARGETS</div>
                    <div className="text-white font-bold text-base mt-0.5">{gisCacheSummary.totalLayersCount} Datasets</div>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-white/5">
                    <div className="text-gray-400 text-[10px]">CACHE FOOTPRINT</div>
                    <div className="text-emerald-300 font-bold text-base mt-0.5">
                      {gisCacheSummary.totalCachedBytes > 0
                        ? `${(gisCacheSummary.totalCachedBytes / (1024 * 1024)).toFixed(2)} MB`
                        : '0 MB'}
                    </div>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-white/5 col-span-2 sm:col-span-1">
                    <div className="text-gray-400 text-[10px]">STORAGE ENGINE</div>
                    <div className="text-cyan-300 font-bold text-base mt-0.5">CacheStorage API</div>
                  </div>
                </div>

                {isDownloadingGis && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs text-emerald-300 font-mono">
                      <span>Caching {currentGisLayerName || 'GeoJSON datasets'}...</span>
                      <span>{gisProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
                        style={{ width: `${gisProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap gap-3">
                  {isPremium ? (
                    <button
                      type="button"
                      data-testid="btn-download-gis-cache"
                      onClick={handleDownloadGisCache}
                      disabled={isDownloadingGis}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50"
                    >
                      {isDownloadingGis ? <RefreshCw size={15} className="animate-spin" /> : <Download size={15} />}
                      <span>{gisCacheSummary.isFullyCached ? 'REFRESH TACTICAL GIS CACHE' : 'DOWNLOAD TACTICAL GIS CACHE'}</span>
                    </button>
                  ) : null}

                  {gisCacheSummary.cachedLayersCount > 0 && (
                    <button
                      type="button"
                      data-testid="btn-clear-gis-cache"
                      onClick={handleClearGisCache}
                      className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-red-950/60 text-gray-400 hover:text-red-300 border border-white/10 hover:border-red-700/60 text-xs flex items-center gap-1.5 transition-colors"
                      title="Clear local GIS CacheStorage"
                    >
                      <Trash2 size={14} />
                      <span>Clear GIS</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Offline Capabilities Overview */}
              <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-4 space-y-2.5 text-xs text-gray-300">
                <h4 className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <span>⚡</span> What is cached offline in your browser?
                </h4>
                <ul className="space-y-1.5 pl-2 text-gray-300">
                  <li>• <strong>Trauma Resuscitation:</strong> TCCC MARCH algorithms, arterial windlass tourniquets, SAM splints.</li>
                  <li>• <strong>Wild Edibles & Foraging:</strong> Universal Edibility Test (UET), acorn leaching, deadly lookalikes.</li>
                  <li>• <strong>CBRN & Toxin Mitigation:</strong> Nuclear fallout 7/10 rule, potassium iodide schedules, nerve agent antidotes.</li>
                  <li>• <strong>Survival Food & Water:</strong> Bleach/boiling disinfection, mylar food storage calculations, authentic pemmican, hardtack.</li>
                  <li>• <strong>Field Repair Manuals:</strong> Off-grid solar/battery wiring, vehicle no-start diagnostics, tire plugs, generator carbs.</li>
                  <li>• <strong>Survival Wikipedia:</strong> 40+ reference compendiums on EMP shielding, field latrines, debris huts.</li>
                </ul>
              </div>
            </div>
          ) : (
            /* ARTICLES STREAM VIEW */
            filteredArticles.length === 0 ? (
              <div className="text-center text-gray-500 py-16 space-y-2">
                <BookOpen size={36} className="mx-auto text-gray-600 mb-2" />
                <p className="text-sm font-semibold">No survival guides match your filter.</p>
                <p className="text-xs text-gray-500">Try clearing the search query or switching categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredArticles.map((art) => {
                  const isBookmarked = bookmarks.includes(art.id);
                  const isCritical = art.urgency === 'critical';
                  const isHigh = art.urgency === 'high';

                  return (
                    <div
                      key={art.id}
                      data-testid={`article-${art.id}`}
                      className={`bg-black/60 border rounded-xl p-4 sm:p-5 space-y-3.5 transition-all ${
                        isCritical
                          ? 'border-red-900/60 hover:border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                          : isHigh
                          ? 'border-amber-900/60 hover:border-amber-500/60'
                          : 'border-white/10 hover:border-cyan-500/40'
                      }`}
                    >
                      {/* Top Card Meta Bar */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                                isCritical
                                  ? 'bg-red-950/80 text-red-300 border-red-700/60'
                                  : isHigh
                                  ? 'bg-amber-950/80 text-amber-300 border-amber-700/60'
                                  : 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60'
                              }`}
                            >
                              {art.urgency.toUpperCase()}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                              {art.subcategory.replace('_', ' ')}
                            </span>
                          </div>
                          <h3 className="text-white font-bold text-base leading-snug">{art.title}</h3>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleBookmark(art.id)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isBookmarked
                                ? 'bg-amber-950 text-amber-400 border-amber-600'
                                : 'bg-white/5 text-gray-400 hover:text-white border-white/5 hover:bg-white/10'
                            }`}
                            title={isBookmarked ? 'Remove from crisis quick cheat sheet' : 'Pin to crisis cheat sheet'}
                          >
                            <Star size={15} className={isBookmarked ? 'fill-amber-400' : ''} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyCheatSheet(art)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-colors"
                            title="Copy cheat sheet protocol to clipboard"
                          >
                            {copiedId === art.id ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                          </button>
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-gray-300 text-xs leading-relaxed">{art.summary}</p>

                      {/* Required Materials (if any) */}
                      {art.materials && art.materials.length > 0 && (
                        <div className="bg-neutral-900/60 border border-white/5 rounded-lg p-2.5 text-xs">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mb-1 block">
                            REQUIRED MATERIALS / TOOLS:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {art.materials.map((m, idx) => (
                              <span key={idx} className="text-[11px] bg-black/50 text-gray-300 px-2 py-0.5 rounded border border-white/10">
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Critical Warning Box (if any) */}
                      {art.warnings && art.warnings.length > 0 && (
                        <div className="bg-red-950/30 border border-red-800/60 rounded-lg p-3 text-xs text-red-200 flex items-start gap-2">
                          <AlertTriangle size={15} className="text-red-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            {art.warnings.map((w, idx) => (
                              <p key={idx} className="leading-relaxed font-medium">{w}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Steps / Protocols */}
                      <div className="bg-neutral-900/80 border border-white/5 rounded-lg p-3 space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                          ACTION PROTOCOL & STEP-BY-STEP CHECKLIST:
                        </span>
                        <div className="space-y-1.5 pl-1">
                          {art.protocols.map((step, idx) => (
                            <div key={idx} className="text-xs text-gray-200 leading-relaxed flex items-start gap-2">
                              <span className="text-cyan-400 font-bold font-mono shrink-0 select-none">
                                {step.startsWith('  -') || step.startsWith('  1') || step.startsWith('  2') || step.startsWith('  3') || step.startsWith('  4') || step.startsWith('  5') ? '↳' : '•'}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pro-Tips & Tactical Insights */}
                      {art.tips && art.tips.length > 0 && (
                        <div className="bg-amber-950/20 border border-amber-800/40 rounded-lg p-2.5 text-xs text-amber-200/90 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                            💡 TACTICAL PRO-TIPS:
                          </span>
                          {art.tips.map((t, idx) => (
                            <p key={idx} className="leading-relaxed">• {t}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>

        {/* Footer Status Bar */}
        <div className="px-4 py-2.5 bg-black/90 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] text-gray-400 shrink-0 gap-2">
          <div className="flex items-center gap-3">
            <span>OFFLINE READINESS: <strong className="text-emerald-400 font-bold">100% OPERATIONAL</strong></span>
            <span>DATA SOURCE: <strong className="text-gray-300">SPHINX TACTICAL VAULT v2.4</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>{filteredArticles.length} guides matching active filter</span>
          </div>
        </div>

      </div>
    </div>
  );
}
