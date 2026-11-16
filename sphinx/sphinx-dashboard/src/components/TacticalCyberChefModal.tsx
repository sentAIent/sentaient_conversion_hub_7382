"use client";
import React, { useState } from 'react';
import { X, Lock, Unlock, Key, Code, Hash, Compass, Copy, Check, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

interface TacticalCyberChefModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCoords?: { lat: number; lon: number };
}

export const TacticalCyberChefModal: React.FC<TacticalCyberChefModalProps> = ({
  isOpen,
  onClose,
  initialCoords = { lat: 37.7749, lon: -122.4194 }
}) => {
  const [activeTab, setActiveTab] = useState<'ENCODING' | 'AES_CRYPTO' | 'ATAK_COT' | 'NMEA_GPS' | 'HASHING'>('ENCODING');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // AES Crypto State
  const [cryptoKey, setCryptoKey] = useState('TacticalSecretKey2026!');
  const [isEncrypting, setIsEncrypting] = useState(false);

  // CoT XML State
  const [callsign, setCallsign] = useState('ALPHA-01');
  const [cotLat, setCotLat] = useState(initialCoords.lat.toString());
  const [cotLon, setCotLon] = useState(initialCoords.lon.toString());
  const [cotType, setCotType] = useState('a-f-G-U-C');

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Text & Data Conversions
  const handleConversion = (type: 'TO_BASE64' | 'FROM_BASE64' | 'TO_HEX' | 'FROM_HEX' | 'ROT13' | 'REVERSE') => {
    setErrorMsg('');
    try {
      if (type === 'TO_BASE64') {
        setOutputText(btoa(unescape(encodeURIComponent(inputText))));
      } else if (type === 'FROM_BASE64') {
        setOutputText(decodeURIComponent(escape(atob(inputText.trim()))));
      } else if (type === 'TO_HEX') {
        const hex = Array.from(new TextEncoder().encode(inputText))
          .map(b => b.toString(16).padStart(2, '0'))
          .join(' ');
        setOutputText(hex.toUpperCase());
      } else if (type === 'FROM_HEX') {
        const cleanHex = inputText.replace(/[^0-9a-fA-F]/g, '');
        const bytes = new Uint8Array(cleanHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
        setOutputText(new TextDecoder().decode(bytes));
      } else if (type === 'ROT13') {
        setOutputText(inputText.replace(/[a-zA-Z]/g, (c) => {
          const base = c <= 'Z' ? 65 : 97;
          return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
        }));
      } else if (type === 'REVERSE') {
        setOutputText(inputText.split('').reverse().join(''));
      }
    } catch (err: any) {
      setErrorMsg(`Conversion failed: ${err.message || 'Invalid input format'}`);
    }
  };

  // 2. WebCrypto AES-GCM 256
  const deriveKey = async (password: string, salt: any): Promise<CryptoKey> => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt as any,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  };

  const handleAesEncrypt = async () => {
    setErrorMsg('');
    setIsEncrypting(true);
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(cryptoKey, salt);
      const encoded = new TextEncoder().encode(inputText);

      const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv as any },
        key,
        encoded
      );

      // Pack salt + iv + ciphertext as Base64
      const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(ciphertext), salt.length + iv.length);

      let binary = '';
      for (let i = 0; i < combined.byteLength; i++) {
        binary += String.fromCharCode(combined[i]);
      }
      setOutputText(btoa(binary));
    } catch (err: any) {
      setErrorMsg(`Encryption error: ${err.message}`);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleAesDecrypt = async () => {
    setErrorMsg('');
    setIsEncrypting(true);
    try {
      const binary = atob(inputText.trim());
      const combined = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        combined[i] = binary.charCodeAt(i);
      }

      if (combined.length < 28) {
        throw new Error('Payload too short for AES-GCM (needs salt + IV)');
      }

      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const ciphertext = combined.slice(28);

      const key = await deriveKey(cryptoKey, salt);
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv as any },
        key,
        ciphertext as any
      );

      setOutputText(new TextDecoder().decode(decrypted));
    } catch (err: any) {
      setErrorMsg(`Decryption error: ${err.message || 'Invalid key or corrupted ciphertext'}`);
    } finally {
      setIsEncrypting(false);
    }
  };

  // 3. ATAK CoT XML Generation
  const handleGenerateCot = () => {
    setErrorMsg('');
    const now = new Date();
    const stale = new Date(now.getTime() + 10 * 60 * 1000);
    const xml = `<?xml version="1.0" standalone="yes"?>
<event version="2.0" uid="SPHINX-${callsign}" type="${cotType}" how="m-g" time="${now.toISOString()}" start="${now.toISOString()}" stale="${stale.toISOString()}">
  <point lat="${cotLat}" lon="${cotLon}" hae="120.0" ce="10.0" le="5.0"/>
  <detail>
    <contact callsign="${callsign}"/>
    <remarks>${inputText || 'Sphinx Tactical Sensor Recon'}</remarks>
  </detail>
</event>`;
    setOutputText(xml);
  };

  // 4. NMEA GPS Parser
  const handleParseNmea = () => {
    setErrorMsg('');
    try {
      const lines = inputText.trim().split('\n');
      const results: string[] = [];

      for (const line of lines) {
        const clean = line.trim();
        if (clean.startsWith('$GPGGA') || clean.startsWith('$GNGGA')) {
          const parts = clean.split(',');
          // parts[2]: lat DDMM.MMMM, parts[3]: N/S, parts[4]: lon DDDMM.MMMM, parts[5]: E/W
          if (parts[2] && parts[4]) {
            const rawLat = parseFloat(parts[2]);
            const latDeg = Math.floor(rawLat / 100);
            const latMin = rawLat % 100;
            let lat = latDeg + latMin / 60;
            if (parts[3] === 'S') lat = -lat;

            const rawLon = parseFloat(parts[4]);
            const lonDeg = Math.floor(rawLon / 100);
            const lonMin = rawLon % 100;
            let lon = lonDeg + lonMin / 60;
            if (parts[5] === 'W') lon = -lon;

            const fix = parts[6] === '1' ? 'GPS Fix (SPS)' : parts[6] === '2' ? 'DGPS Fix' : 'No Fix';
            const alt = parts[9] ? `${parts[9]}m MSL` : 'N/A';
            results.push(`[GGA Fix] Lat: ${lat.toFixed(6)}, Lon: ${lon.toFixed(6)} | Status: ${fix} | Alt: ${alt}`);
          }
        } else if (clean.startsWith('$GPRMC') || clean.startsWith('$GNRMC')) {
          const parts = clean.split(',');
          const speedKnots = parts[7] ? parseFloat(parts[7]) : 0;
          results.push(`[RMC Sentence] Speed: ${speedKnots} kts (${(speedKnots * 1.15078).toFixed(1)} mph) | Heading: ${parts[8] || 0}°`);
        }
      }

      if (results.length === 0) {
        throw new Error('No valid $GPGGA or $GPRMC sentences found in input');
      }
      setOutputText(results.join('\n'));
    } catch (err: any) {
      setErrorMsg(`NMEA Parse Error: ${err.message}`);
    }
  };

  // 5. SHA-256 Hashing
  const handleComputeHash = async () => {
    setErrorMsg('');
    try {
      const data = new TextEncoder().encode(inputText);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setOutputText(hashHex);
    } catch (err: any) {
      setErrorMsg(`Hash error: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[90vh] bg-neutral-950 border border-cyan-500/30 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden text-gray-200 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-cyan-500/20 bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Code className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-cyan-300 tracking-wider uppercase">
                  Tactical CyberChef Workbench
                </h2>
                <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-700/60 px-1.5 py-0.5 rounded font-mono font-bold">
                  CLIENT-SIDE CRYPTO
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Data encoding, AES-GCM 256 encryption, ATAK CoT XML packaging &amp; NMEA GPS parsing
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

        {/* Tab Navigation (100% Zero-Slider Rule) */}
        <div className="p-3 bg-neutral-900/50 border-b border-white/5 flex flex-wrap gap-2 items-center">
          <button
            type="button"
            onClick={() => { setActiveTab('ENCODING'); setErrorMsg(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'ENCODING' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-black/40 text-gray-400 hover:text-gray-200 border border-white/5'}`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Base64 / Hex / ROT13</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('AES_CRYPTO'); setErrorMsg(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'AES_CRYPTO' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-black/40 text-gray-400 hover:text-gray-200 border border-white/5'}`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>AES-GCM 256 Cryptor</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('ATAK_COT'); setErrorMsg(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'ATAK_COT' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-black/40 text-gray-400 hover:text-gray-200 border border-white/5'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ATAK Cursor-on-Target XML</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('NMEA_GPS'); setErrorMsg(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'NMEA_GPS' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-black/40 text-gray-400 hover:text-gray-200 border border-white/5'}`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>NMEA GPS Parser</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('HASHING'); setErrorMsg(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'HASHING' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-black/40 text-gray-400 hover:text-gray-200 border border-white/5'}`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>SHA-256 Checksum</span>
          </button>
        </div>

        {/* Tab Controls Bar (100% Zero-Slider Rule) */}
        <div className="px-4 py-2 bg-neutral-900/30 border-b border-white/5 flex flex-wrap items-center gap-2">
          {activeTab === 'ENCODING' && (
            <>
              <button onClick={() => handleConversion('TO_BASE64')} className="px-2.5 py-1 rounded bg-black/60 hover:bg-neutral-800 text-xs font-mono text-cyan-300 border border-white/10">Base64 Encode</button>
              <button onClick={() => handleConversion('FROM_BASE64')} className="px-2.5 py-1 rounded bg-black/60 hover:bg-neutral-800 text-xs font-mono text-cyan-300 border border-white/10">Base64 Decode</button>
              <button onClick={() => handleConversion('TO_HEX')} className="px-2.5 py-1 rounded bg-black/60 hover:bg-neutral-800 text-xs font-mono text-cyan-300 border border-white/10">Hex Encode</button>
              <button onClick={() => handleConversion('FROM_HEX')} className="px-2.5 py-1 rounded bg-black/60 hover:bg-neutral-800 text-xs font-mono text-cyan-300 border border-white/10">Hex Decode</button>
              <button onClick={() => handleConversion('ROT13')} className="px-2.5 py-1 rounded bg-black/60 hover:bg-neutral-800 text-xs font-mono text-cyan-300 border border-white/10">ROT13</button>
              <button onClick={() => handleConversion('REVERSE')} className="px-2.5 py-1 rounded bg-black/60 hover:bg-neutral-800 text-xs font-mono text-cyan-300 border border-white/10">Reverse Text</button>
            </>
          )}

          {activeTab === 'AES_CRYPTO' && (
            <div className="flex flex-wrap items-center gap-2 w-full">
              <span className="text-[11px] text-gray-400 font-mono flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-cyan-400" /> Passphrase:
              </span>
              <input
                type="text"
                value={cryptoKey}
                onChange={(e) => setCryptoKey(e.target.value)}
                placeholder="Enter shared secret key..."
                className="px-2.5 py-1 bg-black/60 border border-white/15 rounded text-xs text-white font-mono flex-1 min-w-[200px]"
              />
              <button
                type="button"
                onClick={handleAesEncrypt}
                disabled={isEncrypting || !inputText}
                className="px-3 py-1 bg-cyan-900/80 hover:bg-cyan-800 text-white text-xs font-bold rounded flex items-center gap-1"
              >
                <Lock className="w-3 h-3" /> Encrypt (AES-GCM)
              </button>
              <button
                type="button"
                onClick={handleAesDecrypt}
                disabled={isEncrypting || !inputText}
                className="px-3 py-1 bg-emerald-900/80 hover:bg-emerald-800 text-white text-xs font-bold rounded flex items-center gap-1"
              >
                <Unlock className="w-3 h-3" /> Decrypt Payload
              </button>
            </div>
          )}

          {activeTab === 'ATAK_COT' && (
            <div className="flex flex-wrap items-center gap-2 w-full text-xs">
              <input
                type="text"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                placeholder="Callsign"
                className="px-2 py-1 bg-black/60 border border-white/10 rounded font-mono w-28 text-white"
              />
              <input
                type="text"
                value={cotLat}
                onChange={(e) => setCotLat(e.target.value)}
                placeholder="Lat"
                className="px-2 py-1 bg-black/60 border border-white/10 rounded font-mono w-24 text-white"
              />
              <input
                type="text"
                value={cotLon}
                onChange={(e) => setCotLon(e.target.value)}
                placeholder="Lon"
                className="px-2 py-1 bg-black/60 border border-white/10 rounded font-mono w-24 text-white"
              />
              <select
                value={cotType}
                onChange={(e) => setCotType(e.target.value)}
                className="px-2 py-1 bg-black border border-white/10 rounded font-mono text-white text-xs"
              >
                <option value="a-f-G-U-C">a-f-G-U-C (Friendly Ground Combat)</option>
                <option value="a-h-G">a-h-G (Hostile Ground Target)</option>
                <option value="a-u-G">a-u-G (Unknown Ground)</option>
                <option value="b-m-p-s-p-loc">b-m-p-s-p-loc (Sensor Waypoint)</option>
              </select>
              <button
                type="button"
                onClick={handleGenerateCot}
                className="px-3 py-1 bg-cyan-900/80 hover:bg-cyan-800 text-white font-bold rounded flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> Build CoT XML
              </button>
            </div>
          )}

          {activeTab === 'NMEA_GPS' && (
            <button
              type="button"
              onClick={handleParseNmea}
              className="px-3 py-1 bg-cyan-900/80 hover:bg-cyan-800 text-white text-xs font-bold rounded flex items-center gap-1"
            >
              <Compass className="w-3 h-3" /> Parse NMEA Sentences
            </button>
          )}

          {activeTab === 'HASHING' && (
            <button
              type="button"
              onClick={handleComputeHash}
              className="px-3 py-1 bg-cyan-900/80 hover:bg-cyan-800 text-white text-xs font-bold rounded flex items-center gap-1"
            >
              <Hash className="w-3 h-3" /> Compute SHA-256 Hash
            </button>
          )}
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-4 mt-2 p-2 bg-red-950/80 border border-red-500/60 rounded text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Two-Pane Workspace: Input & Output */}
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
          {/* Input Pane */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
              <span>Input Data / Raw Payload</span>
              <button
                type="button"
                onClick={() => setInputText('')}
                className="text-[10px] text-gray-500 hover:text-white"
              >
                Clear
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                activeTab === 'AES_CRYPTO'
                  ? 'Enter plaintext to encrypt or Base64 ciphertext to decrypt...'
                  : activeTab === 'NMEA_GPS'
                  ? 'Paste raw $GPGGA, $GPRMC strings from GPS receiver...'
                  : 'Enter text, hex string, or data...'
              }
              className="flex-1 w-full p-3 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 font-mono resize-none"
            />
          </div>

          {/* Output Pane */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
              <span>Transformed Output / Result</span>
              {outputText && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(outputText)}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Result'}</span>
                </button>
              )}
            </div>
            <textarea
              readOnly
              value={outputText}
              placeholder="Output will appear here..."
              className="flex-1 w-full p-3 bg-black/80 border border-cyan-500/20 rounded-xl text-xs text-cyan-200 placeholder-gray-600 font-mono resize-none select-all"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
