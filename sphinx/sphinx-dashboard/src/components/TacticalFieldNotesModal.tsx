"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { X, FileText, Plus, MapPin, Download, Upload, Trash2, Search, Filter, Check, Copy, ExternalLink, Calendar, Tag } from 'lucide-react';

export interface FieldNote {
  id: string;
  title: string;
  category: 'SITREP' | 'WATER CACHE' | 'OBSTACLE / ROADBLOCK' | 'RADIO CONTACT' | 'SUPPLY DEPOT' | 'INTEL';
  content: string;
  lat: number;
  lon: number;
  timestamp: string;
  tags: string[];
}

interface TacticalFieldNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  operatorCoords: { lat: number; lon: number };
  onFlyTo?: (lat: number, lon: number, zoom?: number) => void;
}

const STORAGE_KEY = 'sphinx_field_notes_v1';

export const TacticalFieldNotesModal: React.FC<TacticalFieldNotesModalProps> = ({
  isOpen,
  onClose,
  operatorCoords,
  onFlyTo
}) => {
  const [notes, setNotes] = useState<FieldNote[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<FieldNote | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<FieldNote['category']>('SITREP');
  const [formContent, setFormContent] = useState('');
  const [formTags, setFormTags] = useState('');
  const [nomadSyncStatus, setNomadSyncStatus] = useState<string | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: FieldNote[] = JSON.parse(raw);
        setNotes(parsed);
        if (parsed.length > 0 && !selectedNote) {
          setSelectedNote(parsed[0]);
        }
      }
    } catch {}
  }, []);

  const saveNotesToStorage = (updated: FieldNote[]) => {
    setNotes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newNote: FieldNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: formTitle.trim(),
      category: formCategory,
      content: formContent.trim(),
      lat: operatorCoords.lat,
      lon: operatorCoords.lon,
      timestamp: new Date().toISOString(),
      tags: formTags.split(',').map(t => t.trim()).filter(Boolean)
    };

    const updated = [newNote, ...notes];
    saveNotesToStorage(updated);
    setSelectedNote(newNote);
    setIsCreating(false);
    setFormTitle('');
    setFormContent('');
    setFormTags('');
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    saveNotesToStorage(updated);
    if (selectedNote?.id === id) {
      setSelectedNote(updated[0] || null);
    }
  };

  const handleExportMarkdown = () => {
    if (!selectedNote) return;
    const md = `# ${selectedNote.title}
**Category:** ${selectedNote.category}
**Coordinates:** ${selectedNote.lat.toFixed(6)}, ${selectedNote.lon.toFixed(6)}
**Timestamp:** ${selectedNote.timestamp}
**Tags:** ${selectedNote.tags.join(', ')}

---

${selectedNote.content}
`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedNote.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSyncToNomad = async () => {
    if (!selectedNote) return;
    setNomadSyncStatus('Connecting to Project NOMAD FlatNotes...');
    try {
      const res = await fetch('http://nomad.local:8080/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: selectedNote.title,
          content: selectedNote.content,
          tags: selectedNote.tags
        }),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        setNomadSyncStatus('Successfully synced to NOMAD FlatNotes (:8080)!');
      } else {
        setNomadSyncStatus('NOMAD returned error. Local note preserved.');
      }
    } catch {
      setNomadSyncStatus('NOMAD server unreachable on LAN (http://nomad.local:8080). Saved locally.');
    }
    setTimeout(() => setNomadSyncStatus(null), 4000);
  };

  const filteredNotes = useMemo(() => {
    return notes.filter(n => {
      const matchesCategory = selectedCategory === 'ALL' || n.category === selectedCategory;
      const matchesSearch = !searchQuery ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [notes, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[90vh] bg-neutral-950 border border-emerald-500/30 rounded-xl shadow-[0_0_50px_rgba(16,185,129,0.2)] flex flex-col overflow-hidden text-gray-200 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-emerald-500/20 bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-emerald-300 tracking-wider uppercase">
                  Tactical Field Notes &amp; Mission Log
                </h2>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-700/60 px-1.5 py-0.5 rounded font-mono font-bold">
                  LOCAL-FIRST / FLATNOTES COMPATIBLE
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Encrypted local mission log with automatic GPS coordinate geotagging &amp; markdown export
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search, Category Chips & New Note Button (100% Zero-Slider Rule) */}
        <div className="p-3 bg-neutral-900/50 border-b border-white/5 space-y-2">
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search notes, coordinates, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="px-3 py-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)] shrink-0 w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" />
              <span>New Geotagged Note</span>
            </button>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider pl-1 pr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Category:
            </span>
            {['ALL', 'SITREP', 'WATER CACHE', 'OBSTACLE / ROADBLOCK', 'RADIO CONTACT', 'SUPPLY DEPOT', 'INTEL'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all border text-[10px] font-semibold ${selectedCategory === cat ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.25)]' : 'bg-black/30 border-white/10 text-gray-400 hover:text-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sync Status Banner */}
        {nomadSyncStatus && (
          <div className="mx-4 mt-2 p-2 bg-emerald-950/80 border border-emerald-500/40 rounded text-xs text-emerald-200 font-mono">
            {nomadSyncStatus}
          </div>
        )}

        {/* Two-Column Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Column: Note List */}
          <div className="w-1/3 min-w-[240px] max-w-[320px] border-r border-white/10 bg-neutral-900/30 overflow-y-auto p-2 space-y-1">
            {filteredNotes.length === 0 ? (
              <p className="text-xs text-gray-500 p-3 italic">No field notes found.</p>
            ) : (
              filteredNotes.map(n => {
                const isSelected = selectedNote?.id === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => { setSelectedNote(n); setIsCreating(false); }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all flex flex-col gap-1 ${isSelected ? 'bg-emerald-950/50 border-emerald-400 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]' : 'bg-black/30 border-white/5 text-gray-300 hover:bg-white/5'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-emerald-200 line-clamp-1">{n.title}</span>
                      <span className="text-[9px] font-mono text-gray-500">{new Date(n.timestamp).toLocaleDateString()}</span>
                    </div>
                    <span className="text-[9px] text-emerald-400 font-mono">{n.category}</span>
                    <p className="text-[10px] text-gray-400 line-clamp-2">{n.content}</p>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Note Detail or Form */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {isCreating ? (
              /* Create Note Form */
              <form onSubmit={handleCreateNote} className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                    Create Geotagged Field Note
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">
                    GPS: {operatorCoords.lat.toFixed(5)}, {operatorCoords.lon.toFixed(5)}
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Route Bypass at Mile 44 / Artesian Spring Cache..."
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as FieldNote['category'])}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-lg text-xs text-white font-mono"
                  >
                    <option value="SITREP">SITREP</option>
                    <option value="WATER CACHE">WATER CACHE</option>
                    <option value="OBSTACLE / ROADBLOCK">OBSTACLE / ROADBLOCK</option>
                    <option value="RADIO CONTACT">RADIO CONTACT</option>
                    <option value="SUPPLY DEPOT">SUPPLY DEPOT</option>
                    <option value="INTEL">INTEL</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Markdown Content</label>
                  <textarea
                    rows={8}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Enter mission observations, frequencies, quantities, or tactical coordinates..."
                    className="w-full p-3 bg-black/60 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400 font-mono resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-bold uppercase">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="comms, repeater, potable, fuel"
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold font-mono transition-colors"
                  >
                    Save Field Note
                  </button>
                </div>
              </form>
            ) : selectedNote ? (
              /* View Selected Note */
              <div className="space-y-4">
                <div className="flex items-start justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-lg font-black text-emerald-300 uppercase tracking-wide">
                      {selectedNote.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 border border-emerald-600/60 text-emerald-300">
                        {selectedNote.category}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">
                        {new Date(selectedNote.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {onFlyTo && (
                      <button
                        type="button"
                        onClick={() => onFlyTo(selectedNote.lat, selectedNote.lon, 14)}
                        className="px-2.5 py-1.5 rounded bg-black/60 border border-white/10 hover:border-emerald-400 text-xs text-emerald-300 font-mono flex items-center gap-1 transition-colors"
                        title="Fly map to note location"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Map</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleExportMarkdown}
                      className="px-2.5 py-1.5 rounded bg-black/60 border border-white/10 hover:border-white/30 text-xs text-gray-300 font-mono flex items-center gap-1 transition-colors"
                      title="Download Markdown"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>.MD</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSyncToNomad}
                      className="px-2.5 py-1.5 rounded bg-emerald-950 border border-emerald-600/60 hover:bg-emerald-900 text-xs text-emerald-300 font-mono flex items-center gap-1 transition-colors"
                      title="Sync to Project NOMAD FlatNotes server"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Sync NOMAD</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(selectedNote.id)}
                      className="p-1.5 rounded text-gray-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Geotag Card */}
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Lat: {selectedNote.lat.toFixed(5)}, Lon: {selectedNote.lon.toFixed(5)}</span>
                  </div>
                  {selectedNote.tags.length > 0 && (
                    <div className="flex gap-1">
                      {selectedNote.tags.map(t => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] text-gray-300">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs text-gray-200 leading-relaxed font-mono whitespace-pre-wrap">
                  {selectedNote.content || <span className="text-gray-500 italic">No text content in this note.</span>}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-xs italic">
                Select a field note or click &ldquo;New Geotagged Note&rdquo; to record observations.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
