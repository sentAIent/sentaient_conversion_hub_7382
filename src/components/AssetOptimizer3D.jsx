import React, { useState } from 'react';
import { Box, Upload, Zap, Download, FileArchive } from 'lucide-react';

export default function AssetOptimizer3D() {
    const [status, setStatus] = useState('idle'); // idle, uploading, optimizing, complete
    const [stats, setStats] = useState(null);

    const handleOptimize = async () => {
        setStatus('optimizing');
        
        // Simulating @gltf-transform WebAssembly processing
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        setStats({
            originalSize: '14.2 MB',
            newSize: '1.8 MB',
            reduction: '87%',
            drawCallsSaved: 42,
            vitalsImpact: '+12 points to LCP'
        });
        
        setStatus('complete');
    };

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-sans text-slate-200">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Box size={18} className="text-amber-400" />
                    <h3 className="font-bold text-sm">glTF-Transform 3D Optimizer</h3>
                </div>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-1 rounded border border-amber-500/20">
                    WebAssembly Edge Worker
                </span>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 flex flex-col gap-4 bg-[#0b0c10]">
                <p className="text-xs text-slate-400 leading-relaxed">
                    Heavy 3D product models destroy Core Web Vitals and plummet e-commerce conversion rates. 
                    Upload a raw <code>.gltf</code> or <code>.glb</code> file to aggressively compress meshes and textures directly in the browser.
                </p>

                {/* Upload Zone */}
                {status === 'idle' && (
                    <button 
                        onClick={handleOptimize}
                        className="flex-1 border-2 border-dashed border-slate-700 hover:border-amber-500/50 bg-slate-900/50 rounded-xl flex flex-col items-center justify-center gap-3 transition-colors group"
                    >
                        <div className="p-3 bg-slate-800 group-hover:bg-amber-500/20 rounded-full transition-colors">
                            <Upload size={24} className="text-slate-400 group-hover:text-amber-400 transition-colors" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-slate-300">Click to upload 3D Model</p>
                            <p className="text-xs text-slate-500 mt-1">Supports .glb, .gltf up to 50MB</p>
                        </div>
                    </button>
                )}

                {/* Processing State */}
                {status === 'optimizing' && (
                    <div className="flex-1 border border-slate-800 bg-slate-900/50 rounded-xl flex flex-col items-center justify-center gap-4">
                        <Zap size={32} className="text-amber-400 animate-pulse" />
                        <div className="text-center space-y-2">
                            <p className="text-sm font-semibold text-amber-400">Draco Compressing Meshes...</p>
                            <p className="text-xs font-mono text-slate-500">Applying KTX2 texture compression via glTF-Transform</p>
                        </div>
                    </div>
                )}

                {/* Results State */}
                {status === 'complete' && stats && (
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Original</span>
                                <span className="text-xl font-mono text-slate-300 line-through opacity-50">{stats.originalSize}</span>
                            </div>
                            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                <span className="text-[10px] text-amber-500/70 uppercase tracking-wider mb-1">Optimized</span>
                                <span className="text-xl font-bold font-mono text-amber-400">{stats.newSize}</span>
                            </div>
                        </div>

                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg flex items-start gap-3">
                            <FileArchive size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-emerald-400 mb-1">Conversion Impact Forecast</p>
                                <p className="text-[10px] text-emerald-400/80 leading-relaxed">
                                    Size reduced by {stats.reduction}. Saved {stats.drawCallsSaved} GPU draw calls. 
                                    Estimated LCP improvement: {stats.vitalsImpact}.
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={() => setStatus('idle')}
                            className="mt-auto w-full bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                            <Download size={16} />
                            Download Optimized .glb
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
