"use client";
import React, { useState, useEffect } from 'react';
import {
  Crown, ShieldCheck, Download, HardDrive, RefreshCw, CheckCircle2,
  AlertTriangle, Lock, Smartphone, Globe, Terminal, Check, ArrowUpRight
} from 'lucide-react';

interface SovereignPWAManagerProps {
  currentTier: string;
  onUpgradeTier?: () => void;
}

export function SovereignPWAManager({ currentTier, onUpgradeTier }: SovereignPWAManagerProps) {
  const isSovereign = currentTier === 'sovereign';

  const [swStatus, setSwStatus] = useState<'unsupported' | 'unregistered' | 'installing' | 'active'>('unregistered');
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [cacheBytes, setCacheBytes] = useState<number | null>(null);
  const [isCachingCatalog, setIsCachingCatalog] = useState(false);
  const [catalogCached, setCatalogCached] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Check SW support and registration
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Standalone check
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(!!isStandaloneMode);

    // Listen for beforeinstallprompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (!('serviceWorker' in navigator)) {
      setSwStatus('unsupported');
      return;
    }

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg) {
        setSwRegistration(reg);
        if (reg.active) setSwStatus('active');
        else if (reg.installing) setSwStatus('installing');
      } else {
        setSwStatus('unregistered');
      }
    });

    // Estimate storage usage
    if (navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then((est) => {
        if (est.usage) setCacheBytes(est.usage);
      });
    }

    // Check if catalog is cached
    if ('caches' in window) {
      caches.open('sphinx-grid-down-v1').then((cache) => {
        cache.match('/data/civil_preparedness_catalog.json').then((resp) => {
          if (resp) setCatalogCached(true);
        });
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Register Service Worker
  const handleRegisterSW = async () => {
    if (!isSovereign) {
      if (onUpgradeTier) onUpgradeTier();
      return;
    }

    if (!('serviceWorker' in navigator)) {
      setActionMessage('Service Workers not supported in this browser.');
      return;
    }

    try {
      setActionMessage('Registering Grid-Down Service Worker...');
      const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      setSwRegistration(reg);
      setSwStatus('active');
      setActionMessage('Grid-Down Autonomous Service Worker registered and active.');

      // Refresh storage estimate
      if (navigator.storage && navigator.storage.estimate) {
        const est = await navigator.storage.estimate();
        if (est.usage) setCacheBytes(est.usage);
      }
    } catch (err: any) {
      console.error('[SPHINX PWA] Registration error:', err);
      setActionMessage(`Service worker registration failed: ${err.message}`);
    }
  };

  // Cache Master Catalog
  const handlePrecacheCatalog = async () => {
    if (!isSovereign) {
      if (onUpgradeTier) onUpgradeTier();
      return;
    }

    setIsCachingCatalog(true);
    setActionMessage('Fetching and caching Master Logistics Catalog (30 Tabs)...');

    try {
      const resp = await fetch('/data/civil_preparedness_catalog.json');
      if (resp.ok) {
        if ('caches' in window) {
          const cache = await caches.open('sphinx-grid-down-v1');
          await cache.put('/data/civil_preparedness_catalog.json', resp.clone());
        }
        setCatalogCached(true);
        setActionMessage('Master Logistics Catalog successfully persisted in offline cache.');
        if (navigator.storage && navigator.storage.estimate) {
          const est = await navigator.storage.estimate();
          if (est.usage) setCacheBytes(est.usage);
        }
      } else {
        setActionMessage(`Catalog fetch returned HTTP ${resp.status}`);
      }
    } catch (err: any) {
      setActionMessage(`Catalog pre-cache failed: ${err.message}`);
    } finally {
      setIsCachingCatalog(false);
    }
  };

  // Install PWA
  const handleInstallPWA = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setActionMessage('SPHINX Tactical OS installation accepted.');
        setInstallPrompt(null);
      }
    } else {
      setActionMessage('To install: click your browser’s menu or address bar icon (Install / Add to Home Screen).');
    }
  };

  // Render Lock Card for Free & Pro tiers
  if (!isSovereign) {
    return (
      <div className="p-6 rounded-xl bg-gradient-to-br from-black/90 via-purple-950/20 to-black/90 border border-purple-800/50 text-center space-y-4 font-mono select-none">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-950/80 border border-purple-500/60 flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <Crown size={28} />
        </div>

        <div className="space-y-1">
          <div className="inline-block px-2.5 py-0.5 rounded bg-purple-950/80 border border-purple-700/60 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-1">
            Sovereign Sentinel Exclusive
          </div>
          <h3 className="text-lg font-bold text-white tracking-wide">
            Grid-Down Progressive Web App (PWA) & Autonomous Service Worker
          </h3>
          <p className="text-xs text-gray-400 max-w-lg mx-auto leading-relaxed">
            Autonomous zero-network standalone execution, background service worker asset mesh, and local device installation are exclusively reserved for Sovereign Sentinel tier members.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto text-left text-xs pt-2">
          <div className="p-3 rounded-lg bg-black/60 border border-purple-950">
            <span className="text-purple-400 font-bold block mb-1">⚡ Standalone OS</span>
            <span className="text-gray-400 text-[11px]">Install SPHINX as a standalone desktop or mobile application without browser frames.</span>
          </div>
          <div className="p-3 rounded-lg bg-black/60 border border-purple-950">
            <span className="text-purple-400 font-bold block mb-1">📦 Catalog Caching</span>
            <span className="text-gray-400 text-[11px]">Complete local persistence of the 30-tab Civil Logistics Catalog and all 24 manual articles.</span>
          </div>
          <div className="p-3 rounded-lg bg-black/60 border border-purple-950">
            <span className="text-purple-400 font-bold block mb-1">🛡️ True Grid-Down</span>
            <span className="text-gray-400 text-[11px]">Operates during total cellular blackout, EMP collapse, or deep subterranean isolation.</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onUpgradeTier}
            className="px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wide transition-colors border border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            Upgrade to Sovereign Sentinel
          </button>
        </div>
      </div>
    );
  }

  // Sovereign Tier Active Interface
  return (
    <div className="space-y-5 font-mono select-none">
      {/* Sovereign Header Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-black to-cyan-950/30 border border-purple-600/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/70 text-purple-300">
            <Crown size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                SOVEREIGN SENTINEL GRID-DOWN PWA ENGINE
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-500/60">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Service Worker Mesh & Offline Standalone Application Controls
            </p>
          </div>
        </div>

        {isStandalone && (
          <span className="px-3 py-1 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-1.5 self-start sm:self-center">
            <CheckCircle2 size={14} />
            RUNNING IN STANDALONE PWA
          </span>
        )}
      </div>

      {actionMessage && (
        <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/80 text-cyan-300 text-xs flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Diagnostics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Status Card 1 */}
        <div className="p-4 rounded-xl bg-black/60 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Service Worker</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
              swStatus === 'active' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60' : 'bg-amber-950/80 text-amber-300 border border-amber-500/60'
            }`}>
              {swStatus}
            </span>
          </div>
          <p className="text-[11px] text-gray-500">
            Background worker caching static runtime assets and offline fallbacks.
          </p>
          {swStatus !== 'active' ? (
            <button
              onClick={handleRegisterSW}
              className="w-full mt-2 py-1.5 rounded bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-600/50 text-xs transition-colors"
            >
              Register Service Worker
            </button>
          ) : (
            <div className="text-[10px] text-emerald-400 pt-1 flex items-center gap-1">
              <CheckCircle2 size={12} /> Registered & Intercepting Requests
            </div>
          )}
        </div>

        {/* Status Card 2 */}
        <div className="p-4 rounded-xl bg-black/60 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Master Logistics Catalog</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
              catalogCached ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60' : 'bg-gray-800 text-gray-400'
            }`}>
              {catalogCached ? 'CACHED' : 'UNCACHED'}
            </span>
          </div>
          <p className="text-[11px] text-gray-500">
            30 spreadsheet tabs / 1,500 emergency supply & equipment items.
          </p>
          <button
            onClick={handlePrecacheCatalog}
            disabled={isCachingCatalog}
            className="w-full mt-2 py-1.5 rounded bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-600/50 text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isCachingCatalog ? <RefreshCw size={12} className="animate-spin" /> : <Download size={12} />}
            <span>{catalogCached ? 'Re-Cache Catalog' : 'Cache Master Catalog'}</span>
          </button>
        </div>

        {/* Status Card 3 */}
        <div className="p-4 rounded-xl bg-black/60 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Storage Used</span>
            <span className="text-xs font-bold text-white">
              {cacheBytes != null ? `${(cacheBytes / (1024 * 1024)).toFixed(1)} MB` : 'Calculating...'}
            </span>
          </div>
          <p className="text-[11px] text-gray-500">
            Total browser storage quota consumed by offline caches and IndexedDB.
          </p>
          <button
            onClick={handleInstallPWA}
            className="w-full mt-2 py-1.5 rounded bg-black/60 hover:bg-white/10 text-gray-300 border border-gray-700 text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Smartphone size={12} />
            <span>Install PWA to Device</span>
          </button>
        </div>
      </div>
    </div>
  );
}
