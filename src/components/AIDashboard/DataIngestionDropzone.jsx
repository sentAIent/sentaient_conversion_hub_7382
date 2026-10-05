import React, { useState, useRef } from 'react';
import Icon from '../AppIcon';
import GDPRParser from '../../services/gdprParser';
import ModelRouter from '../../services/ModelRouter';

export default function DataIngestionDropzone({ onIngestionComplete }) {
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, unzipping, embedding, done, error
    const [progress, setProgress] = useState(0);
    const [logMsg, setLogMsg] = useState("");
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            await processFile(files[0]);
        }
    };

    const handleFileSelect = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            await processFile(files[0]);
        }
    };

    const processFile = async (file) => {
        if (!file.name.endsWith('.zip')) {
            setStatus('error');
            setLogMsg("Only .zip files are supported.");
            return;
        }

        try {
            setStatus('unzipping');
            setLogMsg("Parsing ZIP archive...");
            setProgress(10);

            const parser = new GDPRParser();
            const data = await parser.parseZipArchive(file);

            if (data.length === 0) {
                setStatus('error');
                setLogMsg("No supported data found in ZIP.");
                return;
            }

            setStatus('embedding');
            setLogMsg(`Generating local embeddings for ${data.length} items. This may take a while...`);
            
            const router = new ModelRouter();
            await router.initSemanticSearch(); // Ensure model is loaded

            // Process in batches so we don't freeze the browser
            let count = 0;
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const id = `${item.source}-${Date.now()}-${i}`;
                await router.ingestDocument(id, item);
                count++;
                setProgress(10 + Math.floor((count / data.length) * 90));
            }

            setStatus('done');
            setLogMsg(`Successfully ingested ${data.length} items from ${file.name}.`);
            if (onIngestionComplete) onIngestionComplete();

        } catch (err) {
            console.error(err);
            setStatus('error');
            setLogMsg(`Error: ${err.message}`);
        }
    };

    return (
        <div className="w-full">
            <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    isDragging ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 bg-slate-900/40 hover:border-slate-500'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input 
                    type="file" 
                    accept=".zip" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                />
                
                {status === 'idle' && (
                    <div className="flex flex-col items-center cursor-pointer">
                        <Icon name="UploadCloud" size={48} className="text-slate-400 mb-4" />
                        <h3 className="font-bold text-slate-200 mb-2">Drop your GDPR ZIP export here</h3>
                        <p className="text-sm text-slate-500">Supports Instagram, Twitter/X, and Google Takeout archives.</p>
                        <p className="text-xs text-emerald-500 mt-4"><Icon name="ShieldCheck" size={12} className="inline mr-1" /> Processed 100% locally. Zero data leaves your device.</p>
                    </div>
                )}

                {(status === 'unzipping' || status === 'embedding') && (
                    <div className="flex flex-col items-center">
                        <Icon name="Cpu" size={48} className="text-blue-400 mb-4 animate-pulse" />
                        <h3 className="font-bold text-slate-200 mb-2">{logMsg}</h3>
                        <div className="w-full max-w-md bg-slate-800 rounded-full h-2 mt-4">
                            <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                )}

                {status === 'done' && (
                    <div className="flex flex-col items-center cursor-pointer">
                        <Icon name="CheckCircle" size={48} className="text-emerald-500 mb-4" />
                        <h3 className="font-bold text-slate-200 mb-2">{logMsg}</h3>
                        <p className="text-sm text-slate-500">Drop another ZIP or start searching.</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center cursor-pointer">
                        <Icon name="AlertTriangle" size={48} className="text-rose-500 mb-4" />
                        <h3 className="font-bold text-rose-400 mb-2">Ingestion Failed</h3>
                        <p className="text-sm text-slate-500">{logMsg}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
