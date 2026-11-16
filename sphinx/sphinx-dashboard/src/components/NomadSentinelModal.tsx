"use client";
import React, { useState, useEffect } from 'react';
import { X, Server, Wifi, WifiOff, HardDrive, Cpu, Radio, Check, Copy, RefreshCw, Terminal, ExternalLink, ShieldCheck, Database } from 'lucide-react';
import { LocalLlmConnector } from '../lib/intelligence/localLlmConnector';

interface NomadSentinelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceStatus {
  name: string;
  port: number;
  protocol: string;
  status: 'ONLINE' | 'OFFLINE' | 'CHECKING';
  latencyMs?: number;
  description: string;
}

export const NomadSentinelModal: React.FC<NomadSentinelModalProps> = ({
  isOpen,
  onClose
}) => {
  const [nodeAddress, setNodeAddress] = useState('http://nomad.local:8080');
  const [isScanning, setIsScanning] = useState(false);
  const [overallConnected, setOverallConnected] = useState(false);
  const [copiedCompose, setCopiedCompose] = useState(false);
  const [activeTab, setActiveTab] = useState<'SERVICES' | 'DOCKER_COMPOSE' | 'HARDWARE_GUIDE'>('SERVICES');

  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Ollama LLM Engine', port: 11434, protocol: 'HTTP', status: 'CHECKING', description: 'Local neural network inference for offline conversational AI' },
    { name: 'Kiwix ZIM Server', port: 8080, protocol: 'HTTP /kiwix', status: 'CHECKING', description: 'Offline Wikipedia, WikiMed & iFixit compressed digital libraries' },
    { name: 'Qdrant Vector Database', port: 6333, protocol: 'REST / gRPC', status: 'CHECKING', description: 'High-dimensional semantic embeddings for document RAG' },
    { name: 'ProtoMaps Tile Server', port: 8080, protocol: 'HTTP /maps', status: 'CHECKING', description: 'Single-file PMTiles regional offline vector map server' },
    { name: 'FlatNotes Knowledge Base', port: 8080, protocol: 'REST /api/notes', status: 'CHECKING', description: 'Markdown field note storage and synchronization' },
    { name: 'Kolibri Education', port: 8080, protocol: 'HTTP /kolibri', status: 'CHECKING', description: 'Offline digital learning curriculum & Khan Academy' }
  ]);

  const probeServices = async () => {
    setIsScanning(true);
    const host = nodeAddress.replace(/\/+$/, '');

    // Check Ollama
    const ollamaCheck = await LocalLlmConnector.checkConnection('http://localhost:11434');

    setServices(prev => prev.map(s => {
      if (s.name.includes('Ollama')) {
        return {
          ...s,
          status: ollamaCheck.connected ? 'ONLINE' : 'OFFLINE',
          latencyMs: ollamaCheck.latencyMs
        };
      }
      return {
        ...s,
        status: 'OFFLINE'
      };
    }));

    setOverallConnected(ollamaCheck.connected);
    setIsScanning(false);
  };

  useEffect(() => {
    if (isOpen) {
      probeServices();
    }
  }, [isOpen, nodeAddress]);

  if (!isOpen) return null;

  const DOCKER_COMPOSE_TEMPLATE = `# Project NOMAD Tactical Field Appliance Docker Compose
# Hardened for off-grid deployment with Sphinx Tactical Intelligence HUD
version: '3.8'

services:
  nomad-core:
    image: crosstalk/project-nomad-core:latest
    container_name: nomad-core
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - /opt/nomad/data:/data
      - /opt/nomad/zim:/zim
      - /opt/nomad/maps:/maps

  ollama-ai:
    image: ollama/ollama:latest
    container_name: nomad-ollama
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - /opt/nomad/ollama:/root/.ollama
    # Uncomment for NVIDIA GPU acceleration:
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - driver: nvidia
    #           count: 1
    #           capabilities: [gpu]

  qdrant-vector:
    image: qdrant/qdrant:latest
    container_name: nomad-qdrant
    restart: unless-stopped
    ports:
      - "6333:6333"
    volumes:
      - /opt/nomad/qdrant:/qdrant/storage

  kiwix-serve:
    image: kiwix/kiwix-serve:latest
    container_name: nomad-kiwix
    restart: unless-stopped
    ports:
      - "8081:80"
    volumes:
      - /opt/nomad/zim:/data
    command: ["*.zim"]
`;

  const copyDockerCompose = () => {
    navigator.clipboard.writeText(DOCKER_COMPOSE_TEMPLATE);
    setCopiedCompose(true);
    setTimeout(() => setCopiedCompose(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[90vh] bg-neutral-950 border border-blue-500/30 rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.2)] flex flex-col overflow-hidden text-gray-200 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-blue-500/20 bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Server className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-blue-300 tracking-wider uppercase">
                  Project NOMAD Sentinel &amp; LAN Link
                </h2>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold border ${overallConnected ? 'bg-emerald-950 text-emerald-400 border-emerald-600/60' : 'bg-amber-950 text-amber-400 border-amber-600/60'}`}>
                  {overallConnected ? '🟢 NODE PAIRED' : '🟡 STANDALONE MODE'}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Hardware appliance discovery, microservice status &amp; 1-click tactical Docker orchestration
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

        {/* Node Scanner Toolbar (100% Zero-Slider Rule) */}
        <div className="p-3 bg-neutral-900/50 border-b border-white/5 space-y-2">
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
            <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
              <span className="text-xs text-gray-400 font-mono shrink-0">Node IP:</span>
              <input
                type="text"
                value={nodeAddress}
                onChange={(e) => setNodeAddress(e.target.value)}
                placeholder="http://nomad.local:8080 or http://192.168.1.50:8080"
                className="flex-1 px-3 py-1.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-blue-400"
              />
            </div>

            <button
              type="button"
              onClick={probeServices}
              disabled={isScanning}
              className="px-3 py-1.5 bg-blue-900/80 hover:bg-blue-800 text-white rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>Probe Node</span>
            </button>
          </div>

          {/* Quick Tabs (100% Zero-Slider Rule) */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('SERVICES')}
              className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold border transition-all ${activeTab === 'SERVICES' ? 'bg-blue-950 border-blue-500 text-blue-300' : 'bg-black/30 border-white/10 text-gray-400'}`}
            >
              Services Status ({services.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('DOCKER_COMPOSE')}
              className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold border transition-all ${activeTab === 'DOCKER_COMPOSE' ? 'bg-blue-950 border-blue-500 text-blue-300' : 'bg-black/30 border-white/10 text-gray-400'}`}
            >
              Docker Compose Field Kit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('HARDWARE_GUIDE')}
              className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold border transition-all ${activeTab === 'HARDWARE_GUIDE' ? 'bg-blue-950 border-blue-500 text-blue-300' : 'bg-black/30 border-white/10 text-gray-400'}`}
            >
              Hardware Recommendations
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* TAB 1: SERVICES STATUS */}
          {activeTab === 'SERVICES' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span>NOMAD Appliance Stack Services</span>
                <span className="text-[10px] font-mono text-gray-500">Autonomous off-grid microservices</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.map(s => (
                  <div key={s.name} className="p-3.5 rounded-lg bg-black/40 border border-white/10 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{s.name}</span>
                        </h4>
                        <span className="text-[10px] font-mono text-gray-500">{s.protocol} (Port {s.port})</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        s.status === 'ONLINE'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-600/60'
                          : s.status === 'CHECKING'
                          ? 'bg-neutral-800 text-yellow-300 border-yellow-600/60'
                          : 'bg-neutral-900 text-gray-400 border-white/10'
                      }`}>
                        {s.status}
                        {s.latencyMs !== undefined && s.status === 'ONLINE' && ` (${s.latencyMs}ms)`}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DOCKER COMPOSE FIELD KIT */}
          {activeTab === 'DOCKER_COMPOSE' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Optimized Tactical Docker Compose (Field Kit)
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    Deploy this configuration onto any x86 mini-PC (Intel NUC / Minisforum) or vehicle server
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyDockerCompose}
                  className="px-3 py-1.5 bg-blue-900/80 hover:bg-blue-800 text-white rounded text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  {copiedCompose ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCompose ? 'Copied' : 'Copy Compose'}</span>
                </button>
              </div>

              <div className="p-3 bg-black/80 border border-white/10 rounded-xl overflow-x-auto">
                <pre className="text-xs font-mono text-blue-300 leading-relaxed">
                  {DOCKER_COMPOSE_TEMPLATE}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: HARDWARE RECOMMENDATIONS */}
          {activeTab === 'HARDWARE_GUIDE' && (
            <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-sans">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Recommended Hardware Architectures for Project NOMAD + Sphinx
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
                <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Tier 1: Ultra-Portable ($150–$250)</span>
                  <h5 className="font-bold text-white">MeLE Quieter / Intel N100</h5>
                  <p className="text-[11px] text-gray-400">Fanless 12V stick PC with 16GB RAM, 512GB SSD. Perfect for vehicle glovebox or backpack field kit. Runs Kiwix, FlatNotes, and lightweight 3B quantized LLMs.</p>
                </div>
                <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 space-y-2">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Tier 2: Tactical Basecamp ($400–$600)</span>
                  <h5 className="font-bold text-white">Minisforum / Beelink Ryzen 7</h5>
                  <p className="text-[11px] text-gray-400">8-core AMD Ryzen 7 7735HS, 32GB DDR5, 2TB NVMe SSD. Capable of running fast 8B LLMs (Llama 3, Mistral) alongside full Wikipedia + WikiMed ZIM archives.</p>
                </div>
                <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 space-y-2">
                  <span className="text-[10px] font-bold text-purple-400 uppercase">Tier 3: Bunker Command ($1,000+)</span>
                  <h5 className="font-bold text-white">Discrete GPU Rig (RTX 4060/4070)</h5>
                  <p className="text-[11px] text-gray-400">Dedicated NVIDIA VRAM rig capable of running 70B quantized models, multi-user Qdrant vector retrieval, and serving simultaneous Sphinx tactical clients over Wi-Fi.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
