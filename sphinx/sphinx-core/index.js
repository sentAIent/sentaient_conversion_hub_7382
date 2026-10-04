import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import dotenv from 'dotenv';
import { createLLMProvider } from './lib/llm/index.mjs';
import { ThreatEvaluator } from './lib/evaluator.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3117;

app.use(cors());
app.use(express.json());


// ============================================
// OFFLINE MAP TILE PROXY
// ============================================
import fsPromises from 'fs/promises';
import path from 'path';

app.get('/api/tiles/:z/:x/:y.png', async (req, res) => {
   const { z, x, y } = req.params;
   const tileCacheDir = path.join(process.cwd(), 'tile_cache', z, x);
   const tilePath = path.join(tileCacheDir, `${y}.png`);
   
   try {
     // Check if we have it cached locally
     const tile = await fsPromises.readFile(tilePath);
     res.set('Content-Type', 'image/png');
     // Max age 1 year since tiles don't change often
     res.set('Cache-Control', 'public, max-age=31536000');
     return res.send(tile);
   } catch (e) {
     // File not found on disk, so we proxy to OSM and save it!
     try {
       const fetch = (await import('node-fetch')).default || (await import('node-fetch'));
       const response = await fetch(`https://tile.openstreetmap.org/${z}/${x}/${y}.png`, {
         headers: { 'User-Agent': 'SphinxOSINT/2.0 (sentaient_dev@sentaient.com)' }
       });
       
       if (!response.ok) throw new Error(`OSM returned ${response.status}`);
       
       const arrayBuffer = await response.arrayBuffer();
       const buffer = Buffer.from(arrayBuffer);
       
       // Write to disk silently in the background
       fsPromises.mkdir(tileCacheDir, { recursive: true }).then(() => {
         fsPromises.writeFile(tilePath, buffer).catch(err => console.error(`[Tile Cache Error]`, err));
       });
       
       res.set('Content-Type', 'image/png');
       res.set('Cache-Control', 'public, max-age=31536000');
       return res.send(buffer);
     } catch (err) {
       console.error(`[Tile Fetch Error] ${z}/${x}/${y}: ${err.message}`);
       return res.status(500).send('Tile error');
     }
   }
});

// ============================================
// TIER 3: ZERO-TRUST SECURE MESH (Tailscale)
// ============================================
// In production, uncomment this middleware to ONLY allow traffic from your Tailscale VPN subnet
/*
app.use((req, res, next) => {
  const clientIp = req.ip || req.socket.remoteAddress;
  // Tailscale IPs always start with 100.
  if (!clientIp.startsWith('100.') && !clientIp.includes('127.0.0.1')) {
    console.warn(`[Sphinx Mesh] Unauthorized access attempt blocked from ${clientIp}`);
    return res.status(403).send('Zero-Trust Mesh Authentication Failed.');
  }
  next();
});
*/

// ============================================
// TIER 1 -> TIER 2: MOBILE SYNC API
// ============================================
app.post('/api/sync/memory', async (req, res) => {
  const { offline_events } = req.body;
  if (!offline_events || !Array.isArray(offline_events)) {
    return res.status(400).send('Invalid sync payload');
  }

  console.log(`[Sphinx Sync] Receiving ${offline_events.length} offline events from Mobile Edge...`);
  for (const event of offline_events) {
    // Ingest offline mobile events into the master ChromaDB
    await evaluator.memory.storeEvent(event.source, event.data, event.assessment);
  }
  
  res.json({ status: 'synced', inserted: offline_events.length });
});

// Initialize Local LLM (Ollama)
const llmProvider = createLLMProvider({
  LLM_PROVIDER: 'ollama',
  LLM_MODEL: 'llama3:8b', // Adjust based on your hardware
  OLLAMA_BASE_URL: 'http://localhost:11434'
});

const evaluator = new ThreatEvaluator(llmProvider);

console.log(`[Sphinx] Central Core Initializing...`);

// 1. OSINT & Recon Routes (Ported from Osiris)
app.post('/api/recon/ip', async (req, res) => {
  // Placeholder for Osiris IP intel logic
  res.json({ status: 'active', message: 'Osiris IP Intel integrated.' });
});

app.post('/api/recon/vulnerability', async (req, res) => {
  // Placeholder for Osiris CVE scanning
  res.json({ status: 'active', message: 'Osiris Vuln Scanner integrated.' });
});

import { OpenSkyService } from './lib/opensky.mjs';
import { WatchtowerService } from './lib/watchtower.mjs';
import { DisastersService } from './lib/disasters.mjs';
import { downloadQueue } from './lib/download_queue.mjs';
import { startRTMPServer } from "./lib/drone/rtmp_server.mjs";
import { startTelemetryBridge } from "./lib/drone/telemetry_bridge.mjs";
import { SDRController } from "./lib/radio/sdr_controller.mjs";
import { fetchLiveIncidents } from "./lib/crime/live_incidents.mjs";

const opensky = new OpenSkyService();
const watchtower = new WatchtowerService();
const disasters = new DisastersService();


// Download Queue Endpoints
app.post('/api/cache/region/enqueue', async (req, res) => {
  const { bbox, minZoom, maxZoom, clientId, deadline } = req.body;
  if (!bbox || !deadline) return res.status(400).json({ error: 'Missing bbox or deadline' });

  // Premium tier mock validation
  // In a real app, verify a JWT or API key for client tier
  if (!clientId || !clientId.includes('premium')) {
     return res.status(403).json({ error: 'Offline region downloads are restricted to premium clients.' });
  }

  const jobId = await downloadQueue.enqueueJob(bbox, minZoom, maxZoom, clientId, deadline);
  res.json({ jobId });
});

app.get('/api/cache/region/status/:jobId', (req, res) => {
  const status = downloadQueue.getJobStatus(req.params.jobId);
  if (!status) return res.status(404).json({ error: 'Job not found' });
  res.json(status);
});

// On-demand OSINT Sweeps based on frontend viewport
app.get('/api/osint/aircraft', async (req, res) => {
  try {
    const { bbox } = req.query;
    const aircraft = await opensky.fetchLiveAircraft(bbox);
    
    // Look for anomalies (e.g., squawking emergency 7700 or special purpose)
    const anomalies = aircraft.filter(a => a.squawk === '7700' || a.spi === true);
    if (anomalies.length > 0) {
      const assessment = await evaluator.evaluateData('OpenSky Network', { anomalies });
      console.log(`[Sphinx OSINT] Airspace Anomaly Assessment: ${assessment}`);
    }
    
    res.json({ aircraft });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});



app.get('/api/osint/celltowers', async (req, res) => {
  try {
    const { bbox } = req.query;
    const cellTowersData = await watchtower.fetchCellTowers(bbox);
    res.json(cellTowersData);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

app.get('/api/osint/disasters', async (req, res) => {
  try {
    const { timeframe } = req.query;
    const disastersData = await disasters.fetchSevereWeather(timeframe);
    res.json(disastersData);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

app.get('/api/osint/earthquakes', async (req, res) => {
  try {
    const { timeframe } = req.query;
    const earthquakesData = await disasters.fetchEarthquakes(timeframe);
    res.json(earthquakesData);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

app.get('/api/osint/overpass', async (req, res) => {
  try {
    const data = await watchtower.fetchAllOverpass(req.query.bbox);
    console.log("OSINT OVERPASS returned:", data); res.json(data);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});






// 2. Global Sweeps (Ported from Crucix)
app.post('/api/sweep/ingest', async (req, res) => {
  const { source, payload } = req.body;
  if (!source || !payload) return res.status(400).send('Missing source or payload');
  
  const assessment = await evaluator.evaluateData(source, payload);
  res.json({ status: 'evaluated', assessment });
});

// ============================================
// BASE DEFENSE INTEGRATIONS
// ============================================

import { HomeAssistantController } from './lib/ha_controller.mjs';
const haController = new HomeAssistantController();

// Frigate AI Object Detection Webhook
app.post('/api/defense/frigate', async (req, res) => {
  const event = req.body;
  
  if (event && event.type === 'new' && event.after) {
    const { label, camera } = event.after;
    console.log(`[Sphinx Base Defense] Camera ${camera} detected a ${label}.`);
    
    // Evaluate the physical threat using the LLM
    const assessment = await evaluator.evaluateData(`Frigate Camera: ${camera}`, { detected: label, event });
    console.log(`[Sphinx Base Defense] Assessment: ${assessment}`);
    
    // Execute automated defense if threat is FLASH
    if (assessment.includes('[FLASH]')) {
      await haController.lockAllDoors();
      await haController.pulseRedLights();
      
      // Notify user via TTS
      const warningMessage = `Warning. Perimeter breach detected on ${camera}. Initiating base lockdown.`;
      const ttsProcess = spawn('python3', ['./voice/tts.py', warningMessage]);
      ttsProcess.stderr.on('data', (data) => console.error(`[TTS Error] ${data}`));
    }
  }
  
  res.status(200).send('OK');
});

// Home Assistant Sensor Webhook
app.post('/api/defense/home-assistant', async (req, res) => {
  const { entity_id, state } = req.body;
  
  console.log(`[Sphinx Base Defense] Sensor ${entity_id} changed to ${state}.`);
  const assessment = await evaluator.evaluateData('Home Assistant', { entity: entity_id, state });
  console.log(`[Sphinx Base Defense] Assessment: ${assessment}`);
  res.status(200).send('OK');
});

// ============================================
// EXTENDED PERIMETER (Phase 3)
// ============================================

// RuView (ESP32 WiFi Sensing) Telemetry
app.post('/api/perimeter/ruview', async (req, res) => {
  const { device_id, vitals, motion, distance } = req.body;
  
  if (motion === 'detected' || vitals.heart_rate > 100) {
    console.log(`[Sphinx Perimeter] Through-wall movement detected by ${device_id}. Distance: ${distance}m.`);
    const assessment = await evaluator.evaluateData('RuView', { device_id, vitals, motion, distance });
    
    if (assessment.includes('[FLASH]') || assessment.includes('[PRIORITY]')) {
      const warningMessage = `Unidentified presence detected behind wall at ${distance} meters.`;
      spawn('python3', ['./voice/tts.py', warningMessage]);
    }
  }
  res.status(200).send('OK');
});

// RTL-SDR (Signals Intelligence) Telemetry
app.post('/api/perimeter/sigint', async (req, res) => {
  const { frequency, type, audio_transcript } = req.body;
  
  console.log(`[Sphinx SIGINT] Intercepted local radio traffic on ${frequency}MHz (${type}).`);
  const assessment = await evaluator.evaluateData('RTL-SDR', { frequency, type, transcript: audio_transcript });
  
  if (assessment.includes('[PRIORITY]')) {
    spawn('python3', ['./voice/tts.py', `Priority alert on local radio band: ${audio_transcript}`]);
  }
  res.status(200).send('OK');
});

const sdr = new SDRController((payload) => {
  const message = JSON.stringify(payload);
  if (global.wss) {
    global.wss.clients.forEach(client => {
      if (client.readyState === 1) client.send(message);
    });
  }
});

app.post('/api/radio/adsb', (req, res) => {
  const { action } = req.body;
  if (action === 'start') sdr.startADSB();
  else sdr.stopADSB();
  res.send('OK');
});

app.post('/api/radio/scan', (req, res) => {
  const { action, freqStart, freqEnd } = req.body;
  if (action === 'start') sdr.startScanner(freqStart || '136M', freqEnd || '174M');
  else sdr.stopScanner();
  res.send('OK');
});

// ============================================
// VISION & MEMORY (Phase 4)
// ============================================

app.post('/api/vision/detect', async (req, res) => {
  const { objects, confidence } = req.body;
  
  console.log(`[Sphinx Vision] Visual threat detected: ${objects.join(', ')} (Confidence: ${confidence})`);
  const assessment = await evaluator.evaluateData('YOLO Vision', { objects, confidence });
  
  if (assessment.includes('[FLASH]')) {
    await haController.lockAllDoors();
    spawn('python3', ['./voice/tts.py', `Imminent visual threat detected. Locking doors.`]);
  }
  res.status(200).send('OK');
});
// 3. Voice Interface Hooks (openWakeWord + Whisper + Piper)
app.post('/api/voice/command', async (req, res) => {
  const { command } = req.body;
  if (!command) return res.status(400).send('No command provided.');

  console.log(`[Sphinx] Received audio transcription: "${command}"`);
  
  // Evaluate the command using Ollama
  try {
    const response = await llmProvider.complete(
      "You are Sphinx, a highly advanced personal security AI. Be brief, clinical, and helpful.",
      command
    );
    
    const replyText = response.text;
    console.log(`[Sphinx] Speaking: ${replyText}`);
    
    // Invoke the TTS Python script
    const ttsProcess = spawn('python3', ['./voice/tts.py', replyText]);
    ttsProcess.stderr.on('data', (data) => console.error(`[TTS Error] ${data}`));
    
    res.json({ response: replyText });
  } catch (error) {
    console.error(error);
    res.status(500).send('LLM Evaluation failed.');
  }
});

// Start DJI RTMP Server
startRTMPServer();
// Start Live Crime Incident Polling
setInterval(async () => {
  // In a real app, locations come from the DB. Using hardcoded user ZIPs for now.
  const incidents = await fetchLiveIncidents([{zip: "96150"}, {zip: "89460"}]);
  const message = JSON.stringify({ type: "crime_incidents", data: incidents });
  if (global.wss) {
    global.wss.clients.forEach(client => {
      if (client.readyState === 1) client.send(message);
    });
  }
}, 15000);
// Start Drone Telemetry Bridge
startTelemetryBridge((payload) => {
  const message = JSON.stringify(payload);
  if (global.wss) {
    global.wss.clients.forEach(client => {
      if (client.readyState === 1) client.send(message);
    });
  }
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Sphinx] Server running on http://localhost:${PORT}`);
  console.log(`[Sphinx] Ready to receive sensory inputs and voice commands.`);
});
