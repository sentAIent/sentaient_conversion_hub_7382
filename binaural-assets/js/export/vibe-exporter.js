import { state, els } from '../state.js';
import { getInviteLink } from '../services/referral-engine.js';

export async function captureViralVibe(durationMs = 10000, format = 'webm') {
    if (!els.canvas) {
        alert("Visualizer canvas not found.");
        return;
    }

    console.log(`[VibeExport] Starting viral vibe capture for ${durationMs}ms...`);
    
    // Create an offscreen canvas for watermarking
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = els.canvas.width || 1280;
    exportCanvas.height = els.canvas.height || 720;
    const ctx = exportCanvas.getContext('2d');
    
    const inviteLink = await getInviteLink();
    let isCapturing = true;

    // Draw loop for watermarked canvas
    function renderFrame() {
        if (!isCapturing) return;

        // Draw original visualizer
        ctx.drawImage(els.canvas, 0, 0, exportCanvas.width, exportCanvas.height);
        
        // Add vignette
        const grad = ctx.createRadialGradient(exportCanvas.width/2, exportCanvas.height/2, 0, exportCanvas.width/2, exportCanvas.height/2, exportCanvas.width/2);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, 'rgba(0,0,0,0.6)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

        // Draw MindWave branding and referral link
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('M I N D W A V E', exportCanvas.width / 2, 80);
        
        ctx.font = '24px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText('Join me in the flow state', exportCanvas.width / 2, 120);
        
        ctx.font = '20px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(inviteLink, exportCanvas.width / 2, exportCanvas.height - 40);
        
        requestAnimationFrame(renderFrame);
    }
    
    renderFrame();

    // Setup recording stream
    const videoStream = exportCanvas.captureStream(30);
    let tracks = [...videoStream.getVideoTracks()];
    
    if (state.destStreamNode && state.destStreamNode.stream) {
        tracks.push(...state.destStreamNode.stream.getAudioTracks());
    } else if (state.audioCtx && state.videoCaptureGain) {
        state.destStreamNode = state.audioCtx.createMediaStreamDestination();
        state.videoCaptureGain.connect(state.destStreamNode);
        tracks.push(...state.destStreamNode.stream.getAudioTracks());
    }

    const combinedStream = new MediaStream(tracks);
    const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm;codecs=vp8,opus' });
    const chunks = [];

    mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
        isCapturing = false;
        const webmBlob = new Blob(chunks, { type: 'video/webm' });
        
        if (format === 'mp4') {
            await convertAndDownloadMP4(webmBlob);
        } else {
            downloadBlob(webmBlob, `mindwave_vibe_${Date.now()}.webm`);
        }
        
        alert("Vibe Export Complete!");
    };

    mediaRecorder.start();
    
    // Auto-stop after duration
    setTimeout(() => {
        if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
    }, durationMs);
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

async function convertAndDownloadMP4(webmBlob) {
    console.log("[VibeExport] Converting to MP4 using FFmpeg.wasm...");
    alert("Converting to MP4, this may take a moment...");
    
    try {
        const { FFmpeg } = await import('https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js');
        const { fetchFile } = await import('https://unpkg.com/@ffmpeg/util@0.12.1/dist/esm/index.js');
        
        const ffmpeg = new FFmpeg();
        await ffmpeg.load();
        
        ffmpeg.writeFile('input.webm', await fetchFile(webmBlob));
        // Run conversion
        await ffmpeg.exec(['-i', 'input.webm', '-c:v', 'copy', 'output.mp4']);
        const data = await ffmpeg.readFile('output.mp4');
        
        const mp4Blob = new Blob([data.buffer], { type: 'video/mp4' });
        downloadBlob(mp4Blob, `mindwave_vibe_${Date.now()}.mp4`);
    } catch (e) {
        console.error("FFmpeg conversion failed:", e);
        alert("MP4 conversion failed. Downloading WebM instead.");
        downloadBlob(webmBlob, `mindwave_vibe_${Date.now()}.webm`);
    }
}
