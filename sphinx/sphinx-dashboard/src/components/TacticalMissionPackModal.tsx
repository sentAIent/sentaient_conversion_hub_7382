import React, { useState, useEffect } from 'react';
import { CotXmlEngine, CotEventPoint } from '../lib/mission/cotXmlEngine';
import { MissionPackCrypto, MissionPackageData } from '../lib/mission/missionPackCrypto';
import { X, Shield, Lock, Download, Copy, Check, FileCode, Play, Square, QrCode } from 'lucide-react';

interface TacticalMissionPackModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCoordinates?: [number, number];
}

export const TacticalMissionPackModal: React.FC<TacticalMissionPackModalProps> = ({
  isOpen,
  onClose,
  activeCoordinates = [-104.9903, 39.7392]
}) => {
  const [activeTab, setActiveTab] = useState<'cot' | 'crypto' | 'qr'>('cot');
  const [passphrase, setPassphrase] = useState<string>('TacticalSphinx2026!');
  const [classification, setClassification] = useState<'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET'>('CONFIDENTIAL');
  const [copied, setCopied] = useState<boolean>(false);
  const [cryptoStatus, setCryptoStatus] = useState<string>('');
  const [qrFrameIndex, setQrFrameIndex] = useState<number>(0);
  const [isQrPlaying, setIsQrPlaying] = useState<boolean>(true);

  // Sample tactical entities based on current map position
  const samplePoints: CotEventPoint[] = [
    {
      uid: 'SPHINX-CP-ALPHA',
      callsign: 'HQ_COMMAND_POST',
      type: 'a-f-G-U-C',
      lat: activeCoordinates[1],
      lon: activeCoordinates[0],
      haeMeters: 1609,
      remarks: 'Sphinx Primary Sovereign Node'
    },
    {
      uid: 'SPHINX-RECON-1',
      callsign: 'SCOUT_TEAM_BRAVO',
      type: 'a-f-G-E-V',
      lat: activeCoordinates[1] + 0.02,
      lon: activeCoordinates[0] + 0.03,
      haeMeters: 1640,
      remarks: 'Forward perimeter observation post'
    },
    {
      uid: 'SPHINX-THREAT-ALPHA',
      callsign: 'HOSTILE_UAV_CONTACT',
      type: 'a-h-A',
      lat: activeCoordinates[1] + 0.04,
      lon: activeCoordinates[0] - 0.02,
      haeMeters: 2100,
      remarks: 'Low altitude unidentified rotary UAS'
    }
  ];

  const cotXmlOutput = CotXmlEngine.generateCotBundleXml(samplePoints);

  // Mission package data
  const missionPkg: MissionPackageData = {
    packageId: `PKG-${Date.now()}`,
    title: 'Operation High Ground - Tactical Recon',
    createdIso: new Date().toISOString(),
    classification,
    callsign: 'SPHINX-TACTICAL-ALPHA',
    entities: samplePoints.map(p => ({
      id: p.uid,
      name: p.callsign,
      type: p.type,
      lat: p.lat,
      lon: p.lon,
      details: p.remarks
    }))
  };

  const qrChunks = MissionPackCrypto.generateQrChunks(cotXmlOutput, 120);

  // QR playback cycle
  useEffect(() => {
    if (!isQrPlaying || qrChunks.length <= 1) return;
    const timer = setInterval(() => {
      setQrFrameIndex(prev => (prev + 1) % qrChunks.length);
    }, 350);
    return () => clearInterval(timer);
  }, [isQrPlaying, qrChunks.length]);

  if (!isOpen) return null;

  const handleCopyCot = () => {
    navigator.clipboard?.writeText(cotXmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCot = () => {
    const blob = new Blob([cotXmlOutput], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sphinx-mission-${Date.now()}.cot.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEncryptAndDownload = async () => {
    try {
      setCryptoStatus('Encrypting with AES-256-GCM (100k PBKDF2 rounds)...');
      const cipherText = await MissionPackCrypto.encryptPackage(missionPkg, passphrase);
      const blob = new Blob([cipherText], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mission-package-${Date.now()}.sphinx`;
      a.click();
      URL.revokeObjectURL(url);
      setCryptoStatus('SUCCESS: Encrypted .sphinx mission pack generated.');
    } catch (err: any) {
      setCryptoStatus(`ERROR: ${err?.message || err}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn font-mono">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden text-gray-200 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-cyan-500/20 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="text-white font-bold text-sm flex items-center gap-2">
                <span>ATAK / CoT & ENCRYPTED MISSION PACKAGE</span>
                <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[9px] uppercase font-bold">
                  MIL-STD-2525C
                </span>
              </div>
              <div className="text-[10px] text-gray-400">
                Interoperable Cursor-on-Target XML, AES-256-GCM .sphinx packs & air-gapped QR sync
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-cyan-500/20 bg-black/60 text-xs">
          <button
            onClick={() => setActiveTab('cot')}
            className={`flex-1 py-2 font-bold transition-colors flex items-center justify-center gap-1.5 border-r border-white/10 ${
              activeTab === 'cot' ? 'bg-cyan-950/60 text-cyan-300 border-b-2 border-b-cyan-400' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <FileCode size={13} /> ATAK CoT XML
          </button>
          <button
            onClick={() => setActiveTab('crypto')}
            className={`flex-1 py-2 font-bold transition-colors flex items-center justify-center gap-1.5 border-r border-white/10 ${
              activeTab === 'crypto' ? 'bg-cyan-950/60 text-cyan-300 border-b-2 border-b-cyan-400' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <Lock size={13} /> AES-256 .SPHINX PACK
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 font-bold transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'qr' ? 'bg-cyan-950/60 text-cyan-300 border-b-2 border-b-cyan-400' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <QrCode size={13} /> AIR-GAP ANIMATED QR
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 overflow-y-auto space-y-3.5">
          {activeTab === 'cot' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>MIL-STD-2525C Cursor-on-Target XML Output ({samplePoints.length} entities):</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={handleCopyCot}
                    className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copied ? 'COPIED' : 'COPY XML'}</span>
                  </button>
                  <button
                    onClick={handleDownloadCot}
                    className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1 transition-colors"
                  >
                    <Download size={12} /> DOWNLOAD .COT.XML
                  </button>
                </div>
              </div>

              {/* Code preview block */}
              <div className="p-3 bg-black/90 rounded-lg border border-slate-800 text-[10px] text-cyan-300 font-mono h-56 overflow-y-auto whitespace-pre leading-relaxed">
                {cotXmlOutput}
              </div>
            </div>
          )}

          {activeTab === 'crypto' && (
            <div className="space-y-3">
              {/* Classification Selector */}
              <div>
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Security Classification Tier</div>
                <div className="flex gap-2">
                  {(['UNCLASSIFIED', 'CONFIDENTIAL', 'SECRET'] as const).map(c => (
                    <button
                      key={c}
                      onClick={() => setClassification(c)}
                      className={`px-3 py-1 rounded text-[10px] font-bold border transition-colors ${
                        classification === c
                          ? c === 'SECRET' ? 'bg-red-950 border-red-500 text-red-300' : 'bg-amber-950 border-amber-500 text-amber-300'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password Key */}
              <div>
                <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Passphrase (PBKDF2 SHA-256)</div>
                <input
                  type="password"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={handleEncryptAndDownload}
                  className="flex-1 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Lock size={13} /> ENCRYPT & DOWNLOAD .SPHINX
                </button>
              </div>

              {cryptoStatus && (
                <div className="p-2.5 rounded bg-black/60 border border-cyan-800/60 text-cyan-300 text-[11px] font-mono">
                  {cryptoStatus}
                </div>
              )}
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-3 text-center">
              <div className="text-gray-400 text-[11px]">
                Air-Gapped Optical Data Transfer: Frame {qrFrameIndex + 1} of {qrChunks.length}
              </div>

              {/* Optical QR Frame Display */}
              <div className="p-4 bg-white text-black rounded-xl max-w-xs mx-auto border-4 border-cyan-400 font-mono shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <div className="text-xs font-black tracking-widest border-b-2 border-black pb-1 mb-2">
                  SPHINX OPTICAL BURST
                </div>
                <div className="text-[9px] break-all leading-tight text-slate-800 bg-slate-100 p-2 rounded">
                  {qrChunks[qrFrameIndex] || 'BURST-STANDBY'}
                </div>
                <div className="mt-2 text-[10px] font-bold text-black flex justify-between">
                  <span>CHUNKS: {qrChunks.length}</span>
                  <span>4 FPS</span>
                </div>
              </div>

              {/* Play / Pause Stepper */}
              <div className="flex justify-center gap-2 pt-1">
                <button
                  onClick={() => setIsQrPlaying(!isQrPlaying)}
                  className="px-4 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1.5 text-xs transition-colors"
                >
                  {isQrPlaying ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                  <span>{isQrPlaying ? 'PAUSE STREAM' : 'CYCLE FRAMES'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-[10px] text-slate-400">
          <span>AIR-GAPPED COMPLIANT • ZERO SERVER EXPOSURE</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
