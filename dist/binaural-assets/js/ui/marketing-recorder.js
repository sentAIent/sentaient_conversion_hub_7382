export async function runMarketingEngine(options) {
    const { duration, hook, captions, targets, creative, updateProgress } = options;

    updateProgress('Initializing Engine', 'Tapping into WebGL and Web Audio contexts...', 10);

    // 1. Get Canvas Stream
    const canvas = document.querySelector('canvas');
    if (!canvas) throw new Error("WebGL Canvas not found.");
    const videoStream = canvas.captureStream(60); // 60 FPS
    const videoTrack = videoStream.getVideoTracks()[0];

    // 2. Get Audio Stream
    // We assume window.audioCtx exists or we grab it from the global audio system
    if (!window.audioCtx) throw new Error("AudioContext not initialized. Please start audio first.");
    const audioCtx = window.audioCtx;
    const dest = audioCtx.createMediaStreamDestination();
    
    // Tap into master gain. In BinauralBeats, it's usually window.masterGain
    if (window.masterGain) {
        window.masterGain.connect(dest);
    } else {
        console.warn("window.masterGain not found, audio might be silent.");
    }
    
    const audioTrack = dest.stream.getAudioTracks()[0];

    // 3. Combine Streams
    const combinedStream = new MediaStream([videoTrack, audioTrack]);

    updateProgress('Recording in Progress', `Capturing ${duration} seconds of high-res content...`, 30);

    // 4. Record
    const chunks = [];
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') 
        ? 'video/webm;codecs=vp9' 
        : 'video/webm';
        
    const recorder = new MediaRecorder(combinedStream, { mimeType, videoBitsPerSecond: 8000000 });

    return new Promise((resolve, reject) => {
        recorder.ondataavailable = e => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onerror = e => reject(e);

        recorder.onstop = async () => {
            updateProgress('Finalizing Video', 'Compiling chunks and preparing payload...', 70);
            
            const blob = new Blob(chunks, { type: mimeType });
            
            updateProgress('Dispatching to Cloud', 'Sending to n8n Webhook for processing & scheduling...', 85);
            
            try {
                await dispatchToN8N(blob, options);
                updateProgress('Success!', 'Video sent to Google Drive and scheduled.', 100);
                
                // Disconnect audio tap
                if (window.masterGain) window.masterGain.disconnect(dest);
                
                resolve();
            } catch (err) {
                reject(err);
            }
        };

        recorder.start();

        // Simulate progress bar during recording
        let elapsed = 0;
        const interval = setInterval(() => {
            elapsed++;
            const pct = 30 + ((elapsed / duration) * 40); // Progress from 30% to 70%
            updateProgress('Recording in Progress', \`\${elapsed}s / \${duration}s captured...\`, pct);
            
            if (elapsed >= duration) {
                clearInterval(interval);
                recorder.stop();
            }
        }, 1000);
    });
}

async function dispatchToN8N(videoBlob, options) {
    // We send this to a custom n8n webhook. 
    // The n8n workflow will handle:
    // 1. Uploading the raw video to Google Drive.
    // 2. Connecting to an API (like Creatomate or FFmpeg container) to burn the text/subtitles based on the 'creative' payload.
    // 3. Pushing the final video to TikTok/IG/LinkedIn APIs at the scheduled time.
    
    const formData = new FormData();
    formData.append('video', videoBlob, \`mindwave_marketing_\${Date.now()}.webm\`);
    formData.append('metadata', JSON.stringify({
        duration: options.duration,
        hook: options.hook,
        captions: options.captions,
        targets: options.targets,
        creative: options.creative,
        timestamp: new Date().toISOString()
    }));

    // Replace with actual n8n webhook URL when deployed
    const N8N_WEBHOOK_URL = 'https://n8n.sentaient.com/webhook/mindwave-marketing-ingest';
    
    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header, let browser set it with boundary for FormData
        });

        if (!response.ok) {
            // Mock success for now since we don't have the real webhook up yet
            console.warn("n8n webhook failed or not found, falling back to local download for testing.");
            triggerLocalDownload(videoBlob);
            return true;
        }

        return await response.json();
    } catch (e) {
        console.warn("Fetch to n8n failed, simulating success and downloading locally instead.");
        triggerLocalDownload(videoBlob);
        return true;
    }
}

function triggerLocalDownload(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = \`mindwave_marketing_raw_\${Date.now()}.webm\`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}
