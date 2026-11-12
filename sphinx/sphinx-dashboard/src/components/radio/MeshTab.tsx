import React, { useState, useEffect } from 'react';
import { WebSerialMeshService, MeshNode, MeshMessage, MeshChannelPreset } from '../../lib/radio/webSerialMesh';
import { Users, Wifi, Send, Battery, Signal, Plus, Minus } from 'lucide-react';

export const MeshTab: React.FC = () => {
  const meshService = WebSerialMeshService.getInstance();
  const [status, setStatus] = useState(meshService.getConnectionStatus());
  const [nodes, setNodes] = useState<MeshNode[]>([]);
  const [messages, setMessages] = useState<MeshMessage[]>([]);
  const [channel, setChannel] = useState<MeshChannelPreset>('LongFast');
  const [hopLimit, setHopLimit] = useState<number>(3);
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    const unsub = meshService.subscribe((n, m) => {
      setNodes(n);
      setMessages(m);
      setStatus(meshService.getConnectionStatus());
    });
    return unsub;
  }, []);

  const toggleConnect = async () => {
    if (status.isConnected) {
      await meshService.disconnect();
      setStatus(meshService.getConnectionStatus());
    } else {
      await meshService.connectHardware();
      setStatus(meshService.getConnectionStatus());
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    await meshService.sendMessage(channel, inputText.trim(), hopLimit);
    setInputText('');
  };

  return (
    <div className="space-y-2.5 text-xs font-mono">
      {/* Top Connection Bar */}
      <div className="flex items-center justify-between p-2 rounded-lg bg-blue-950/40 border border-blue-900/60">
        <div className="flex items-center gap-2">
          <Wifi size={14} className={status.isConnected ? "text-emerald-400 animate-pulse" : "text-gray-500"} />
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">Meshtastic 915 MHz</div>
            <div className="text-white font-bold flex items-center gap-1.5">
              <span>{status.isSimulated ? 'VIRTUAL MESH' : status.isConnected ? 'SERIAL COMM LINK' : 'OFF-GRID DISCONNECTED'}</span>
              <span className={`px-1.5 py-0.2 text-[9px] rounded font-mono ${
                status.isConnected && !status.isSimulated ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50' : 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
              }`}>
                {status.isSimulated ? 'TEST-NET' : status.isConnected ? 'USB CDC' : 'OFFLINE'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={toggleConnect}
          className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-wider transition-colors border ${
            status.isConnected
              ? 'bg-red-950/60 text-red-300 border-red-500/50 hover:bg-red-900/80'
              : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 hover:bg-emerald-900/90'
          }`}
        >
          {status.isConnected ? 'DISCONNECT' : 'INIT SERIAL'}
        </button>
      </div>

      {/* Preset Channel & Hop Limit Stepper */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">LoRa Modulation Preset</div>
          <div className="grid grid-cols-2 gap-1">
            {(['LongFast', 'LongSlow', 'MediumFast', 'ShortFast'] as MeshChannelPreset[]).map((cp) => (
              <button
                key={cp}
                onClick={() => setChannel(cp)}
                className={`py-1 px-1.5 rounded text-[10px] font-mono transition-colors text-center border ${
                  channel === cp
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {cp}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Max Hop Limit (Zero-Slider)</div>
          <div className="flex items-center justify-between p-1.5 rounded bg-black/60 border border-white/10 h-[calc(100%-20px)]">
            <button
              onClick={() => setHopLimit(Math.max(1, hopLimit - 1))}
              className="p-1 rounded bg-white/10 hover:bg-white/20 text-gray-300"
            >
              <Minus size={12} />
            </button>
            <span className="font-mono text-cyan-400 font-bold text-xs">{hopLimit} HOPS</span>
            <button
              onClick={() => setHopLimit(Math.min(7, hopLimit + 1))}
              className="p-1 rounded bg-white/10 hover:bg-white/20 text-gray-300"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Discovered Mesh Nodes */}
      <div>
        <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1">
          <span className="flex items-center gap-1 font-bold uppercase"><Users size={12} /> Mesh Nodes Online ({nodes.length})</span>
          <span className="text-emerald-400">915.000 MHz</span>
        </div>
        <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="p-1.5 rounded bg-black/50 border border-white/10 flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-[11px]">{node.name}</span>
                  <span className="px-1 py-0.1 text-[9px] rounded bg-white/10 text-cyan-300 font-mono">
                    {node.role}
                  </span>
                </div>
                <div className="text-[9px] text-gray-400 flex items-center gap-2">
                  <span>{node.lat.toFixed(4)}, {node.lon.toFixed(4)}</span>
                  <span>•</span>
                  <span>{node.lastHeard}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono">
                <div className="flex items-center gap-0.5 text-cyan-300">
                  <Signal size={10} />
                  <span>{node.snr}dB</span>
                </div>
                <div className="flex items-center gap-0.5 text-emerald-400">
                  <Battery size={10} />
                  <span>{node.batteryPercent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mesh Messages Feed */}
      <div>
        <div className="text-[10px] text-gray-400 mb-1 uppercase font-bold">Decoded Packets Feed</div>
        <div className="bg-black/70 border border-white/10 rounded p-2 h-20 overflow-y-auto space-y-1.5">
          {messages.map((m) => (
            <div key={m.id} className="text-[10px] space-y-0.5">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-cyan-400 font-bold">{m.senderName} ({m.channel})</span>
                <span className="text-[9px]">{m.timestamp}</span>
              </div>
              <div className="text-gray-200 break-words">{m.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Packet Dispatch Input */}
      <form onSubmit={handleSend} className="flex gap-1">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Broadcast over ${channel}...`}
          className="flex-1 bg-black/70 border border-white/20 rounded px-2.5 py-1.5 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-400 font-mono"
        />
        <button
          type="submit"
          className="px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded flex items-center justify-center transition-colors"
        >
          <Send size={12} />
        </button>
      </form>
    </div>
  );
};
