import React, { useState, useRef } from 'react';
import { ForagingAiClassifier, ForagingAnalysisResult } from '../../lib/foraging/foragingAiClassifier';
import { DEEP_FORAGING_DATABASE } from '../../lib/foraging/foragingData';
import { Camera, Upload, AlertTriangle, ShieldAlert, CheckCircle, Sparkles, RefreshCw, Eye, Info, BookOpen } from 'lucide-react';

interface ForagingPhotoScannerProps {
  onSelectSpecies?: (speciesId: string) => void;
}

export const ForagingPhotoScanner: React.FC<ForagingPhotoScannerProps> = ({ onSelectSpecies }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<ForagingAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);
      setIsAnalyzing(true);
      try {
        const analysis = await ForagingAiClassifier.analyzePhoto(dataUrl, file.name);
        setResult(analysis);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
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

  const resetScanner = () => {
    setImagePreview(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-emerald-600/50 hover:border-emerald-400 rounded-2xl p-8 text-center cursor-pointer bg-slate-950/60 transition-all flex flex-col items-center justify-center space-y-3 shadow-inner"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Upload size={24} />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide">
              Click to Open Device Camera or Upload Photo
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Supports JPEG, PNG, WEBP • Analyzes cap, stem, leaves, and poisonous lookalikes
            </div>
          </div>
          <button
            type="button"
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950"
          >
            <Camera size={14} /> SELECT CAMERA SHUTTER / FILE
          </button>
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
            <button
              onClick={resetScanner}
              className="mt-2 text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw size={11} /> SCAN ANOTHER SPECIMEN
            </button>
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
    </div>
  );
};
