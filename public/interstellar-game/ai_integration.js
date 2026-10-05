// --- AI Integration Methods ---
if (!window.game) window.game = {};
if (!window.app) window.app = {};

window.game.askFinancialOfficer = async function() {
    const input = document.getElementById('aiFinancialQuery');
    const display = document.getElementById('aiFinancialAdvisorText');
    if (!input || !display) return;
    
    const query = input.value.trim();
    if (!query) return;
    
    input.value = '';
    display.innerHTML = `<span style="color: #00ff88;">Analyzing query...</span>`;
    
    try {
        const res = await fetch('/api/finance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        
        display.innerHTML = data.reply;
    } catch (e) {
        console.error("AI Financial Error:", e);
        display.innerHTML = `<span style="color: #ff3333;">Error contacting mainframe.</span>`;
    }
};

window.app.generateAIMusic = async function() {
    const input = document.getElementById('aiMusicAtmosphere');
    const status = document.getElementById('aiMusicStatus');
    const paramsDisplay = document.getElementById('aiMusicParamsDisplay');
    const paramsJson = document.getElementById('aiMusicParamsJson');
    
    if (!input) return;
    const desc = input.value.trim() || "epic space battle";
    
    if (status) status.style.display = 'block';
    if (paramsDisplay) paramsDisplay.style.display = 'none';
    
    try {
        const res = await fetch('/api/music', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: desc })
        });
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);
        
        if (status) status.style.display = 'none';
        if (paramsDisplay) paramsDisplay.style.display = 'block';
        if (paramsJson) paramsJson.textContent = JSON.stringify(data.parameters, null, 2);
        
        // TODO: Plug these parameters into Tone.js or Web Audio API
        // For now, we display them as requested.
        console.log("AI Music Params:", data.parameters);
        
    } catch (e) {
        console.error("AI Music Error:", e);
        if (status) {
            status.style.display = 'block';
            status.innerHTML = `<span style="color: #ff3333;">Generation failed.</span>`;
        }
    }
};

// GNN Ticker Logic
window.app.fetchNews = async function() {
    const ticker = document.getElementById('newsTickerContent');
    if (!ticker) return;
    
    try {
        const res = await fetch('/api/news');
        const data = await res.json();
        
        if (data.news) {
            ticker.textContent = data.news;
        }
    } catch (e) {
        console.error("GNN News Error:", e);
    }
};

// Start News loop
setInterval(() => {
    if (window.app && window.app.fetchNews) {
        window.app.fetchNews();
    }
}, 30000); // Fetch every 30s for demo
// initial fetch
setTimeout(() => {
    if (window.app && window.app.fetchNews) {
        window.app.fetchNews();
    }
}, 2000);
