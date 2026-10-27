"use client";

import { CustomPin } from '../useSettings';

export interface MeshMessage {
  type: 'PIN_SYNC' | 'THREAT_REPORT' | 'HEARTBEAT';
  senderId: string;
  timestamp: number;
  payload: any;
}

class OfflineMeshService {
  private channel: BroadcastChannel | null = null;
  private nodeId: string = '';
  private onlinePeers: Set<string> = new Set();
  private listeners: Array<(msg: MeshMessage) => void> = [];
  private peerCountListeners: Array<(count: number) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.nodeId = 'sentinel-' + Math.random().toString(36).substring(2, 8);
      try {
        this.channel = new BroadcastChannel('sphinx_tactical_mesh_v1');
        this.channel.onmessage = (event) => this.handleMessage(event.data);
        
        // Announce node presence & broadcast heartbeat
        this.broadcastHeartbeat();
        setInterval(() => this.broadcastHeartbeat(), 8000);
      } catch (e) {
        console.warn('BroadcastChannel not supported in this environment');
      }
    }
  }

  private handleMessage(msg: MeshMessage) {
    if (!msg || msg.senderId === this.nodeId) return;

    if (msg.type === 'HEARTBEAT') {
      this.onlinePeers.add(msg.senderId);
      this.notifyPeerCount();
      return;
    }

    this.listeners.forEach(cb => cb(msg));
  }

  private broadcastHeartbeat() {
    if (!this.channel) return;
    this.channel.postMessage({
      type: 'HEARTBEAT',
      senderId: this.nodeId,
      timestamp: Date.now(),
      payload: { role: 'mesh_node' }
    });
  }

  private notifyPeerCount() {
    const count = this.onlinePeers.size;
    this.peerCountListeners.forEach(cb => cb(count));
  }

  public getNodeId(): string {
    return this.nodeId;
  }

  public getOnlinePeersCount(): number {
    // Return at least simulated local mesh node if isolated
    return Math.max(1, this.onlinePeers.size + 1);
  }

  public subscribePeersCount(cb: (count: number) => void): () => void {
    this.peerCountListeners.push(cb);
    cb(this.getOnlinePeersCount());
    return () => {
      this.peerCountListeners = this.peerCountListeners.filter(l => l !== cb);
    };
  }

  public subscribe(cb: (msg: MeshMessage) => void): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  public broadcastPin(pin: CustomPin) {
    if (!this.channel) return;
    this.channel.postMessage({
      type: 'PIN_SYNC',
      senderId: this.nodeId,
      timestamp: Date.now(),
      payload: pin
    });
  }

  public broadcastThreat(threat: any) {
    if (!this.channel) return;
    this.channel.postMessage({
      type: 'THREAT_REPORT',
      senderId: this.nodeId,
      timestamp: Date.now(),
      payload: threat
    });
  }
}

export const offlineMesh = new OfflineMeshService();
