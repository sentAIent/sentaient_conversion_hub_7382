import { spawn } from 'child_process';

export class SDRController {
  constructor(broadcastFn) {
    this.broadcast = broadcastFn;
    this.adsbProcess = null;
    this.scannerProcess = null;
  }

  startADSB() {
    if (this.adsbProcess) return;
    console.log('[Sphinx Radio] Starting ADS-B dump1090...');
    // Assuming dump1090 is installed on the host
    this.adsbProcess = spawn('dump1090', ['--net', '--quiet']);
    
    this.adsbProcess.on('error', (err) => {
      console.error('[Sphinx Radio] Failed to start dump1090:', err.message);
    });

    // In a real implementation, we would connect to dump1090's port 30003 (SBS-1 format) 
    // or port 8080 (JSON) to parse aircraft and broadcast them to the frontend map.
    // For now, this is a skeleton process wrapper.
  }

  stopADSB() {
    if (this.adsbProcess) {
      this.adsbProcess.kill();
      this.adsbProcess = null;
    }
  }

  startScanner(freqStart, freqEnd) {
    if (this.scannerProcess) return;
    console.log(`[Sphinx Radio] Scanning ${freqStart} - ${freqEnd} ...`);
    // Scanner implementation using rtl_power
    this.scannerProcess = spawn('rtl_power', ['-f', `${freqStart}:${freqEnd}:100k`, '-i', '1', '-']);
    
    this.scannerProcess.stdout.on('data', (data) => {
       // Parse CSV output from rtl_power to detect spikes
    });
  }

  stopScanner() {
    if (this.scannerProcess) {
      this.scannerProcess.kill();
      this.scannerProcess = null;
    }
  }
}
