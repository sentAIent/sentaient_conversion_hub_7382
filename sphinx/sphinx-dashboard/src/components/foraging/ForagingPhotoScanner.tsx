import React, { useState, useRef, useEffect } from 'react';
import { ForagingAiClassifier, ForagingAnalysisResult } from '../../lib/foraging/foragingAiClassifier';
import { DEEP_FORAGING_DATABASE } from '../../lib/foraging/foragingData';
import { Camera, Upload, AlertTriangle, ShieldAlert, CheckCircle, Sparkles, RefreshCw, Eye, Info, BookOpen, Image as ImageIcon, Trash2 } from 'lucide-react';

interface ForagingPhotoScannerProps {
  onSelectSpecies?: (speciesId: string) => void;
}

export const ForagingPhotoScanner: React.FC<ForagingPhotoScannerProps> = ({ onSelectSpecies }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<ForagingAnalysisResult | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadedHistory, setUploadedHistory] = useState<Array<{ id: string; dataUrl: string; name: string; speciesName: string; time: string; result: ForagingAnalysisResult }>>([]);

  const processFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);
      setIsAnalyzing(true);
      try {
        const analysis = await ForagingAiClassifier.analyzePhoto(dataUrl, file.name);
        setResult(analysis);
        setUploadedHistory(prev => [
          {
            id: `up-${Date.now()}`,
            dataUrl,
            name: file.name,
            speciesName: analysis.speciesName,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            result: analysis
          },
          ...prev.filter(p => p.dataUrl !== dataUrl).slice(0, 5)
        ]);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const loadSample = (speciesId: string) => {
    const species = DEEP_FORAGING_DATABASE.find(s => s.id === speciesId);
    if (!species) return;
    setImagePreview(species.imageUrl);
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(ForagingAiClassifier.getSampleAnalysis(speciesId));
      setIsAnalyzing(false);
    }, 500);
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) processFile(file);
          break;
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const resetScanner = () => {
    setImagePreview(null);
    setResult(null);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  return (
    <div className="space-y-4 font-mono text-xs text-gray-200">
      {/* Top Banner & Quick Presets */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
        <div>
          <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Camera size={13} className="text-emerald-400" />
            AI Computer Vision Foraging Scanner
          </div>
          <div className="text-white font-bold text-xs">Upload or Take Photo of Wild Plant, Berry, or Mushroom</div>
        </div>

        {/* Quick Sample Chips (Zero Slider Rule) */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="text-[9px] text-gray-400 uppercase font-bold mr-1">Test Samples:</span>
          {DEEP_FORAGING_DATABASE.slice(0, 4).map(s => (
            <button
              key={s.id}
              onClick={() => loadSample(s.id)}
              className="px-2 py-0.5 rounded bg-emerald-900/60 hover:bg-emerald-800 text-[10px] text-emerald-200 border border-emerald-600 transition-colors"
            >
              {s.commonName}
            </button>
          ))}
        </div>
      </div>

      {/* Main Upload / Dropzone Box */}
      {!imagePreview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) processFile(file);
          }}
          className={`border-2 border-dashed ${
            isDragging ? 'border-cyan-400 bg-cyan-950/40 scale-[1.01]' : 'border-emerald-600/50 hover:border-emerald-400 bg-slate-950/60'
          } rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center space-y-4 shadow-inner`}
        >
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Upload size={24} />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide">
              {isDragging ? 'Drop Your Photo to Begin Neural Analysis' : 'Upload or Capture Foraging Specimen'}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Supports JPEG, PNG, WEBP • Drag & drop file, paste (Ctrl+V), or select an option below
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950 transition-colors"
            >
              <ImageIcon size={15} /> BROWSE PHOTOS / FILES
            </button>
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-950 transition-colors"
            >
              <Camera size={15} /> OPEN LIVE CAMERA
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Photo Preview & Reticle Overlay */}
          <div className="relative rounded-xl border border-emerald-500/40 bg-black overflow-hidden flex flex-col items-center justify-center p-3 max-h-72">
            <img
              src={imagePreview}
              alt="Foraging Target"
              className="max-h-56 max-w-full object-contain rounded"
            />
            {/* Tactical Scanning Reticle Animation */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-emerald-950/40 flex flex-col items-center justify-center backdrop-blur-xs">
                <div className="w-16 h-16 border-2 border-emerald-400 rounded-lg animate-spin flex items-center justify-center mb-2">
                  <div className="w-12 h-12 border-2 border-cyan-400 rounded-full animate-ping" />
                </div>
                <span className="text-emerald-300 font-bold tracking-widest text-[11px] animate-pulse">
                  NEURAL MORPHOLOGY SCAN...
                </span>
              </div>
            )}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 w-full">
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="px-2 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-[10px] font-bold flex items-center gap-1 border border-emerald-600 transition-colors"
              >
                <Upload size={10} /> Change Photo
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="px-2 py-1 rounded-lg bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 text-[10px] font-bold flex items-center gap-1 border border-cyan-600 transition-colors"
              >
                <Camera size={10} /> Live Camera
              </button>
              <button
                type="button"
                onClick={resetScanner}
                className="px-2 py-1 rounded-lg bg-black/60 hover:bg-black/90 text-gray-400 hover:text-white text-[10px] font-bold flex items-center gap-1 border border-gray-800 transition-colors"
              >
                <RefreshCw size={10} /> Reset
              </button>
            </div>
          </div>

          {/* Analysis Results & Lookalike Warning Card */}
          <div className="md:col-span-2 space-y-3">
            {result ? (
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-3">
                {/* Species Header & Confidence */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-white">{result.speciesName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-bold">
                        {result.confidenceScore}% CONFIDENCE
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-400 italic font-sans">{result.scientificName}</div>
                  </div>

                  {/* Edibility Badge */}
                  <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1.5 ${
                    result.edibility === 'CHOICE_EDIBLE'
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                      : result.edibility === 'EDIBLE_WITH_PREPARATION'
                      ? 'bg-amber-950/90 text-amber-300 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                      : 'bg-red-950/90 text-red-300 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                  }`}>
                    {result.edibility === 'CHOICE_EDIBLE' ? <CheckCircle size={13} /> : <AlertTriangle size={13} />}
                    <span>{result.edibilityBadgeText}</span>
                  </div>
                </div>

                {/* CRITICAL TOXIC LOOKALIKE HAZARD BANNER */}
                {result.toxicLookalikes.length > 0 && (
                  <div className="p-3 rounded-xl bg-red-950/70 border-2 border-red-600 space-y-2 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                    <div className="flex items-center justify-between text-red-300 font-bold text-xs border-b border-red-800/80 pb-1">
                      <span className="flex items-center gap-1.5">
                        <ShieldAlert size={15} className="text-red-400 animate-pulse" />
                        CRITICAL LOOKALIKE HAZARDS & POISONS
                      </span>
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-red-900 text-white font-bold">
                        DO NOT SKIP VERIFICATION
                      </span>
                    </div>

                    {result.toxicLookalikes.map((tl) => (
                      <div key={tl.name} className="space-y-1.5 text-[11px] bg-black/60 p-2.5 rounded-lg border border-red-900/60">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-red-300">{tl.name} ({tl.scientificName})</span>
                          <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-400 border border-red-700 text-[9px] font-bold">
                            {tl.dangerLevel.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="text-amber-300 text-[10px] font-bold">
                          TOXIN: {tl.poisonToxin}
                        </div>
                        <div className="text-gray-300 space-y-1 pt-1">
                          <div className="text-[10px] text-gray-400 font-bold uppercase">PHYSICAL TESTS TO DIFFERENTIATE:</div>
                          {tl.distinguishingMarkers.map((marker, mIdx) => (
                            <div key={mIdx} className="text-[10px] text-slate-200 pl-2 border-l-2 border-red-500">
                              {marker}
                            </div>
                          ))}
                        </div>
                        <div className="text-[9px] text-red-400 pt-0.5 italic">
                          ⚠️ {tl.warningAdvice}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Benefits & Nutritional Profile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-black/50 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                      <Sparkles size={11} /> Nutritional & Survival Benefits
                    </div>
                    <ul className="space-y-0.5 text-gray-300 text-[10px]">
                      {result.nutritionalBenefits.map((b, idx) => (
                        <li key={idx}>• {b}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/50 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-cyan-400 font-bold uppercase flex items-center gap-1">
                      <Info size={11} /> Cooking & Preparation Rules
                    </div>
                    <ul className="space-y-0.5 text-gray-300 text-[10px]">
                      {result.preparationGuidelines.map((p, idx) => (
                        <li key={idx}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {result.speciesId && onSelectSpecies && (
                  <button
                    type="button"
                    onClick={() => onSelectSpecies(result.speciesId!)}
                    className="w-full mt-2 py-1.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-emerald-500/50"
                  >
                    <BookOpen size={13} />
                    <span>Open Full Monograph & Materia Medica</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-500 text-center text-xs">
                {isAnalyzing ? 'Extracting morphological contours & cross-referencing poison catalog...' : 'Standby for image input...'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* User's Uploaded Field Scans Gallery */}
      {uploadedHistory.length > 0 && (
        <div className="p-3 rounded-xl bg-slate-900/50 border border-emerald-900/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon size={12} />
              <span>Your Uploaded Field Photos ({uploadedHistory.length})</span>
            </div>
            <button
              type="button"
              onClick={() => setUploadedHistory([])}
              className="text-[9px] text-gray-500 hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={10} /> Clear Uploads
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {uploadedHistory.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  setImagePreview(item.dataUrl);
                  setResult(item.result);
                }}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer flex flex-col items-center gap-1 group ${
                  imagePreview === item.dataUrl
                    ? 'border-emerald-500 bg-emerald-950/40 shadow-sm'
                    : 'border-gray-800 bg-black/40 hover:border-gray-600'
                }`}
              >
                <div className="w-full h-14 rounded overflow-hidden bg-black flex items-center justify-center">
                  <img src={item.dataUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="w-full text-center truncate">
                  <span className="text-[10px] font-bold text-white block truncate">{item.speciesName}</span>
                  <span className="text-[9px] text-gray-400 block">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
