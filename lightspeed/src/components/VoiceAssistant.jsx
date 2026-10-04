import React, { useState } from 'react';
import { Mic, MicOff, Activity } from 'lucide-react';
// import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';

export default function VoiceAssistant() {
  const [connected, setConnected] = useState(false);

  return (
    <div style={{ background: 'rgba(25, 25, 35, 0.9)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0' }}>
        <Mic size={20} color="var(--primary)" /> War Room Voice Assistant
      </h3>
      <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '1rem' }}>
        Connect to a LiveKit WebRTC session for hands-free AI SRE assistance during P0 outages.
      </p>
      
      <button 
        onClick={() => setConnected(!connected)} 
        className="glass-button"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: connected ? 'rgba(255,50,50,0.2)' : '' }}
      >
        {connected ? <><MicOff size={16} /> Disconnect</> : <><Mic size={16} /> Join Voice Channel</>}
      </button>

      {connected && (
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80' }}>
          <Activity size={16} className="pulse-anim" /> AI is listening...
        </div>
      )}
    </div>
  );
}
