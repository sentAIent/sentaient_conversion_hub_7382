// AI Coaching Telemetry & Solvent Agent Integration
class TelemetryCoach {
    constructor() {
        this.sessionStart = Date.now();
        this.metrics = {
            maneuvers: 0,
            modesSwitched: 0,
            distanceTraveled: 0,
            accuracy: Math.random() * 40 + 50, // Mock for now
            encounters: Math.floor(Math.random() * 5),
            score: 0
        };
        this.backendUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:8787' 
            : 'https://solvent-coach-backend.onrender.com'; // Render URL
            
        this.initUI();
        this.startTracking();
    }

    startTracking() {
        // Track generic events by proxying window functions or listening to clicks
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.closest('.hud-panel')) {
                this.metrics.modesSwitched++;
            }
        });
        
        // Mock distance/score accumulation
        setInterval(() => {
            this.metrics.distanceTraveled += Math.random() * 10;
            this.metrics.score += Math.floor(Math.random() * 5);
        }, 5000);
    }

    initUI() {
        const container = document.createElement('div');
        container.id = 'ai-coach-panel';
        container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            background: rgba(0, 10, 20, 0.85);
            border: 1px solid #00ff88;
            border-radius: 8px;
            padding: 15px;
            color: #00ff88;
            font-family: 'Courier New', monospace;
            width: 250px;
            box-shadow: 0 0 15px rgba(0,255,136,0.2);
            backdrop-filter: blur(5px);
        `;
        
        container.innerHTML = `
            <h3 style="margin:0 0 10px 0; font-size:14px; text-transform:uppercase; border-bottom:1px solid #00ff88; padding-bottom:5px;">AI Tactical Coach</h3>
            <div id="coach-status" style="font-size:12px; margin-bottom:15px; color:#aaa;">Monitoring telemetry...</div>
            <button id="btn-request-coach" style="width:100%; padding:10px; background:#00ff88; color:#000; border:none; border-radius:4px; font-weight:bold; cursor:pointer; text-transform:uppercase;">Get Report ($0.50)</button>
        `;
        
        document.body.appendChild(container);
        
        document.getElementById('btn-request-coach').addEventListener('click', () => this.requestCoaching());
    }
    
    showReportModal(markdownText) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 80%; max-width: 600px; max-height: 80vh; overflow-y: auto;
            background: #001122; border: 2px solid #00ff88; border-radius: 12px;
            padding: 25px; color: #fff; z-index: 10000; box-shadow: 0 0 30px #00ff88;
        `;
        // Quick/dirty markdown to HTML conversion for the modal
        const html = markdownText
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
            .replace(/\n/gim, '<br>');
            
        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #00ff88; margin-bottom:15px; padding-bottom:10px;">
                <h2 style="margin:0; color:#00ff88; font-family:monospace;">SCOUTING REPORT</h2>
                <button onclick="this.parentElement.parentElement.remove()" style="background:transparent; border:none; color:#00ff88; font-size:20px; cursor:pointer;">&times;</button>
            </div>
            <div style="font-family:sans-serif; line-height:1.6; font-size:14px;">${html}</div>
        `;
        document.body.appendChild(modal);
    }

    async requestCoaching() {
        const btn = document.getElementById('btn-request-coach');
        const status = document.getElementById('coach-status');
        
        btn.disabled = true;
        btn.innerText = 'Connecting...';
        
        const flightTime = Math.round((Date.now() - this.sessionStart) / 1000);
        
        const telemetryPayload = {
            client_name: "Commander " + Math.floor(Math.random() * 9999),
            topic: \`Analyze my gameplay: Flight Time: \${flightTime}s, Score: \${this.metrics.score}, Accuracy: \${this.metrics.accuracy.toFixed(1)}%, Maneuvers: \${this.metrics.maneuvers}. Provide a 3-paragraph tactical scouting report.\`
        };

        try {
            status.innerText = 'Submitting telemetry...';
            
            const response = await fetch(\`\${this.backendUrl}/api/jobs\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(telemetryPayload)
            });
            
            if (!response.ok) throw new Error("Backend connection failed");
            
            const jobData = await response.json();
            
            if (jobData.payment_url) {
                status.innerText = 'Awaiting payment...';
                window.open(jobData.payment_url, '_blank');
                this.pollJobStatus(jobData.id);
            } else if (jobData.status === 'declined') {
                status.innerText = 'Agent declined job: Margin too low.';
                btn.innerText = 'Try Again';
                btn.disabled = false;
            } else {
                this.pollJobStatus(jobData.id);
            }
            
        } catch (error) {
            console.error('Coaching Error:', error);
            status.innerText = 'Error connecting to Solvent AI';
            status.style.color = '#ff3333';
            btn.innerText = 'Get Report ($0.50)';
            btn.disabled = false;
        }
    }
    
    async pollJobStatus(jobId) {
        const status = document.getElementById('coach-status');
        const btn = document.getElementById('btn-request-coach');
        
        const poll = setInterval(async () => {
            try {
                const response = await fetch(\`\${this.backendUrl}/api/jobs/\${jobId}\`);
                const data = await response.json();
                
                if (data.status === 'completed') {
                    clearInterval(poll);
                    status.innerText = 'Report received!';
                    btn.innerText = 'Get New Report';
                    btn.disabled = false;
                    this.showReportModal(data.brief);
                } else if (data.status === 'in_progress') {
                    status.innerText = 'Nemotron is analyzing...';
                } else if (data.status === 'failed') {
                    clearInterval(poll);
                    status.innerText = 'Analysis failed.';
                    btn.innerText = 'Get Report ($0.50)';
                    btn.disabled = false;
                }
            } catch (e) {
                console.warn("Polling error:", e);
            }
        }, 3000);
    }
}

// Initialize on load
window.addEventListener('load', () => {
    window.telemetryCoach = new TelemetryCoach();
});
