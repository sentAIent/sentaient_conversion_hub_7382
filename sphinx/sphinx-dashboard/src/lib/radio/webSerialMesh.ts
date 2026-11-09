// webSerialMesh.ts
// Tactical Meshtastic LoRa & APRS WebSerial Mesh Bridge
// Provides hardware WebSerial connectivity (115200 baud) with fallback simulation mode

export interface MeshNode {
  id: string;
  name: string;
  shortName: string;
  lat: number;
  lon: number;
  altitudeMeters: number;
  batteryPercent: number;
  snr: number;
  lastHeard: string;
  hopsAway: number;
  role: 'ROUTER' | 'CLIENT' | 'REPEATER' | 'TRACKER';
}

export interface MeshMessage {
  id: string;
  senderId: string;
  senderName: string;
  channel: string;
  text: string;
  timestamp: string;
  snr?: number;
  hopLimit: number;
}

export type MeshChannelPreset = 'LongFast' | 'LongSlow' | 'MediumFast' | 'ShortFast';

export class WebSerialMeshService {
  private static instance: WebSerialMeshService | null = null;
  private port: any = null;
  private reader: any = null;
  private isConnected = false;
  private isSimulated = false;

  private listeners: ((nodes: MeshNode[], messages: MeshMessage[]) => void)[] = [];

  private nodes: MeshNode[] = [
    {
      id: '!3a8f9c12',
      name: 'Sphinx-Tactical-Alpha',
      shortName: 'ALPH',
      lat: 39.7392,
      lon: -104.9903,
      altitudeMeters: 1609,
      batteryPercent: 94,
      snr: 11.5,
      lastHeard: 'Just now',
      hopsAway: 0,
      role: 'ROUTER'
    },
    {
      id: '!8f220b5e',
      name: 'HighPeak-Relay-East',
      shortName: 'REL1',
      lat: 39.7555,
      lon: -104.9720,
      altitudeMeters: 1720,
      batteryPercent: 88,
      snr: 8.2,
      lastHeard: '1m ago',
      hopsAway: 1,
      role: 'REPEATER'
    },
    {
      id: '!4c91d84a',
      name: 'FieldScout-Mobile-3',
      shortName: 'SCT3',
      lat: 39.7280,
      lon: -105.0110,
      altitudeMeters: 1590,
      batteryPercent: 71,
      snr: 5.7,
      lastHeard: '3m ago',
      hopsAway: 2,
      role: 'CLIENT'
    }
  ];

  private messages: MeshMessage[] = [
    {
      id: 'msg-1',
      senderId: '!8f220b5e',
      senderName: 'REL1',
      channel: 'LongFast',
      text: '[AUTO-BEACON] HighPeak-Relay solar array operating at 100% capacity.',
      timestamp: '12:04:15',
      snr: 8.2,
      hopLimit: 3
    },
    {
      id: 'msg-2',
      senderId: '!4c91d84a',
      senderName: 'SCT3',
      channel: 'LongFast',
      text: 'Visual on road closure at Sector 4 checkpoint. Rerouting west.',
      timestamp: '12:06:40',
      snr: 5.7,
      hopLimit: 2
    }
  ];

  public static getInstance(): WebSerialMeshService {
    if (!WebSerialMeshService.instance) {
      WebSerialMeshService.instance = new WebSerialMeshService();
    }
    return WebSerialMeshService.instance;
  }

  public isHardwareSupported(): boolean {
    return typeof navigator !== 'undefined' && 'serial' in navigator;
  }

  public getConnectionStatus(): { isConnected: boolean; isSimulated: boolean } {
    return { isConnected: this.isConnected, isSimulated: this.isSimulated };
  }

  public subscribe(listener: (nodes: MeshNode[], messages: MeshMessage[]) => void): () => void {
    this.listeners.push(listener);
    listener(this.nodes, this.messages);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l([...this.nodes], [...this.messages]));
  }

  public async connectHardware(): Promise<{ success: boolean; simulated: boolean; error?: string }> {
    if (!this.isHardwareSupported()) {
      this.isConnected = true;
      this.isSimulated = true;
      this.notify();
      return { success: true, simulated: true };
    }

    try {
      // @ts-ignore
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: 115200 });
      this.isConnected = true;
      this.isSimulated = false;
      this.startReading();
      this.notify();
      return { success: true, simulated: false };
    } catch (err: any) {
      this.isConnected = true;
      this.isSimulated = true;
      this.notify();
      return { success: true, simulated: true, error: err?.message };
    }
  }

  public async disconnect(): Promise<void> {
    if (this.reader) {
      try { await this.reader.cancel(); } catch (_) {}
      this.reader = null;
    }
    if (this.port) {
      try { await this.port.close(); } catch (_) {}
      this.port = null;
    }
    this.isConnected = false;
    this.isSimulated = false;
    this.notify();
  }

  private async startReading() {
    if (!this.port || !this.port.readable) return;
    try {
      this.reader = this.port.readable.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (this.isConnected && this.reader) {
        const { value, done } = await this.reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          this.parseIncomingLine(line.trim());
        }
      }
    } catch (err) {
      console.warn('WebSerial reading error:', err);
    }
  }

  private parseIncomingLine(line: string) {
    if (!line) return;
    try {
      const data = JSON.parse(line);
      if (data.type === 'nodeinfo' && data.node) {
        this.upsertNode(data.node);
      } else if (data.type === 'packet' && data.text) {
        this.addMessage({
          id: `msg-${Date.now()}`,
          senderId: data.from || '!unknown',
          senderName: data.sender || 'Node',
          channel: data.channel || 'LongFast',
          text: data.text,
          timestamp: new Date().toLocaleTimeString(),
          snr: data.snr || 7.0,
          hopLimit: data.hopLimit || 3
        });
      }
    } catch (_) {
      this.addMessage({
        id: `raw-${Date.now()}`,
        senderId: '!serial-raw',
        senderName: 'RAW-HW',
        channel: 'Serial',
        text: line,
        timestamp: new Date().toLocaleTimeString(),
        snr: 9.0,
        hopLimit: 1
      });
    }
  }

  public upsertNode(node: MeshNode) {
    const idx = this.nodes.findIndex(n => n.id === node.id);
    if (idx >= 0) {
      this.nodes[idx] = { ...this.nodes[idx], ...node };
    } else {
      this.nodes.push(node);
    }
    this.notify();
  }

  public addMessage(msg: MeshMessage) {
    this.messages = [msg, ...this.messages.slice(0, 49)];
    this.notify();
  }

  public async sendMessage(channel: MeshChannelPreset, text: string, hopLimit = 3): Promise<boolean> {
    const newMsg: MeshMessage = {
      id: `local-${Date.now()}`,
      senderId: '!3a8f9c12',
      senderName: 'Sphinx-Tactical-Alpha',
      channel,
      text,
      timestamp: new Date().toLocaleTimeString(),
      snr: 12.0,
      hopLimit
    };

    this.addMessage(newMsg);

    if (this.port && this.port.writable) {
      try {
        const encoder = new TextEncoder();
        const writer = this.port.writable.getWriter();
        await writer.write(encoder.encode(JSON.stringify({ channel, text, hopLimit }) + '\n'));
        writer.releaseLock();
      } catch (err) {
        console.warn('Failed to transmit via hardware WebSerial:', err);
      }
    }
    return true;
  }
}
