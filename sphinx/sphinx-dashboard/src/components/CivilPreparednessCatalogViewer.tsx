"use client";
import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers, Search, CheckSquare, Square, ExternalLink,
  Copy, Check, Download, BookOpen, Shield, Radio, Wrench, Droplet
} from 'lucide-react';

export interface CatalogEntry {
  id: string;
  sheetKey: string;
  sheetTitle: string;
  item: string;
  recommendation: string;
  details: string;
  link: string;
}

export function CivilPreparednessCatalogViewer() {
  const [catalog, setCatalog] = useState<CatalogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSheet, setSelectedSheet] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Load catalog data
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const res = await fetch('/data/civil_preparedness_catalog.json');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setCatalog(data);
            setLoading(false);
          }
        } else {
          // Fallback to /sphinx/data/ if on subpath
          const fallback = await fetch('/sphinx/data/civil_preparedness_catalog.json');
          if (fallback.ok) {
            const data = await fallback.json();
            if (isMounted) {
              setCatalog(data);
              setLoading(false);
            }
          }
        }
      } catch (e) {
        console.error('Failed to load civil preparedness catalog', e);
        if (isMounted) setLoading(false);
      }
    }
    loadData();

    // Load checked items from localStorage
    try {
      const saved = localStorage.getItem('sphinx_civil_catalog_checked_v1');
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load checked state', e);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Save checked state
  const toggleItemChecked = (id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('sphinx_civil_catalog_checked_v1', JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save checked state', e);
      }
      return next;
    });
  };

  // Distinct sheets with counts
  const sheetCategories = useMemo(() => {
    const map = new Map<string, { title: string; count: number }>();
    catalog.forEach((item) => {
      const cur = map.get(item.sheetKey) || { title: item.sheetTitle, count: 0 };
      cur.count += 1;
      map.set(item.sheetKey, cur);
    });
    return Array.from(map.entries()).map(([key, val]) => ({
      key,
      title: val.title,
      count: val.count
    }));
  }, [catalog]);

  // Filtered items
  const filteredItems = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return catalog.filter((item) => {
      if (selectedSheet !== 'all' && item.sheetKey !== selectedSheet) {
        return false;
      }
      if (!q) return true;
      return (
        item.item.toLowerCase().includes(q) ||
        item.sheetTitle.toLowerCase().includes(q) ||
        item.recommendation.toLowerCase().includes(q) ||
        item.details.toLowerCase().includes(q)
      );
    });
  }, [catalog, selectedSheet, searchTerm]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Category', 'Item / Requirement', 'Recommendation', 'Details & Specifications', 'Status', 'Reference Link'];
    const rows = filteredItems.map((item) => {
      const isChecked = checkedItems[item.id] ? 'ACQUIRED' : 'PENDING';
      return [
        `"${item.sheetTitle.replace(/"/g, '""')}"`,
        `"${item.item.replace(/"/g, '""')}"`,
        `"${item.recommendation.replace(/"/g, '""')}"`,
        `"${item.details.replace(/"/g, '""')}"`,
        `"${isChecked}"`,
        `"${item.link}"`
      ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    navigator.clipboard.writeText(csv);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  if (loading) {
    return (
      <div className="text-center py-20 space-y-3">
        <div className="w-8 h-8 mx-auto border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-gray-400 font-mono">Loading Civil Preparedness Master Logistics Catalog (1,500 Items)...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-gray-200">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-900/90 via-cyan-950/70 to-slate-900/90 border border-cyan-800/80 rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(8,145,178,0.2)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/80 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              <Layers size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
                <span>CIVIL PREPAREDNESS MASTER LOGISTICS CATALOG</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-950 text-cyan-300 border border-cyan-600/50 font-mono">
                  {catalog.length} ITEMS • 28 DOMAINS
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Complete equipment, literature, communications frequencies, medical supplies, and tool matrix
              </p>
            </div>
          </div>

          <button
            type="button"
            data-testid="btn-export-catalog-csv"
            onClick={handleExportCSV}
            className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            {copiedNotification ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copiedNotification ? 'CSV COPIED!' : 'EXPORT CURRENT VIEW'}</span>
          </button>
        </div>

        {/* Quick Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between text-xs pt-1">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search across all 1,500 items (e.g. dosimeter, shortwave, Berkey, Celox, 870, comfrey)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
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

          {/* Category Dropdown for Rapid Selection */}
          <select
            value={selectedSheet}
            onChange={(e) => setSelectedSheet(e.target.value)}
            className="bg-black/70 border border-white/10 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="all">🌐 All 28 Domains ({catalog.length} items)</option>
            {sheetCategories.map((sheet) => (
              <option key={sheet.key} value={sheet.key}>
                {sheet.title} ({sheet.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Domain Quick-Pill Navigation */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        <button
          type="button"
          onClick={() => setSelectedSheet('all')}
          className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap font-medium ${
            selectedSheet === 'all'
              ? 'bg-cyan-600 text-white font-bold'
              : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          All Domains ({catalog.length})
        </button>
        {sheetCategories.map((sheet) => (
          <button
            key={sheet.key}
            type="button"
            onClick={() => setSelectedSheet(sheet.key)}
            className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap font-medium ${
              selectedSheet === sheet.key
                ? 'bg-cyan-600 text-white font-bold shadow-[0_0_10px_rgba(8,145,178,0.5)]'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <span>{sheet.title}</span>
            <span className="text-[10px] opacity-75 font-mono ml-1">({sheet.count})</span>
          </button>
        ))}
      </div>

      {/* Catalog Items Stream */}
      <div className="space-y-2">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-gray-500 space-y-1">
            <p className="text-sm font-semibold">No catalog entries match your query.</p>
            <p className="text-xs text-gray-600">Try clearing the search or choosing a different domain.</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isChecked = !!checkedItems[item.id];

            return (
              <div
                key={item.id}
                data-testid={`catalog-item-${item.id}`}
                className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                  isChecked
                    ? 'bg-emerald-950/20 border-emerald-800/40'
                    : 'bg-black/50 border-white/10 hover:border-cyan-800/60'
                }`}
              >
                {/* Left Content Area */}
                <div className="flex items-start gap-2.5 flex-1">
                  <button
                    type="button"
                    onClick={() => toggleItemChecked(item.id)}
                    className="mt-0.5 text-gray-400 hover:text-cyan-300 transition-colors"
                    title={isChecked ? 'Mark as pending' : 'Mark as acquired/stocked'}
                  >
                    {isChecked ? (
                      <CheckSquare size={16} className="text-emerald-400" />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-xs leading-snug">{item.item}</span>
                      <span className="text-[9px] uppercase font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                        {item.sheetTitle}
                      </span>
                    </div>

                    {item.recommendation && (
                      <div className="text-xs text-gray-300">
                        <span className="text-gray-500 font-semibold">Recommended: </span>
                        <span>{item.recommendation}</span>
                      </div>
                    )}

                    {item.details && (
                      <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                        {item.details}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Status & External Link */}
                <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-950/80 text-gray-400 hover:text-cyan-300 border border-white/5 transition-colors"
                      title="Open external documentation or reference"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}

                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      isChecked
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                        : 'bg-white/5 text-gray-400 border border-white/5'
                    }`}
                  >
                    {isChecked ? 'ACQUIRED' : 'PENDING'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
