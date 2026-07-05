// GLOBAL ERROR HANDLER
window.onerror = function (msg, url, line, col, error) {
    if (msg && msg.includes && msg.includes('ResizeObserver')) return false;
    // alert(`Error: ${msg}\nLine: ${line}`);
    console.error("Global Error:", msg, error);
    return false;
};

// Fallback Config
if (typeof __firebase_config === 'undefined') {
    window.__firebase_config = JSON.stringify({
        apiKey: "AIzaSyBTZveJffu2Ed33hhU_G025FVMedIKyg28",
        authDomain: "mindwave-binaural-beats.firebaseapp.com",
        projectId: "mindwave-binaural-beats",
        storageBucket: "mindwave-binaural-beats.firebasestorage.app",
        messagingSenderId: "281133643186",
        appId: "1:281133643186:web:f61fb74e2fcf4cc4e660ab",
        measurementId: "G-TENPZ98XDX"
    });
}

if (typeof __app_id === 'undefined') window.__app_id = 'local-dev-id';

console.log("[Init] Global handlers and config initialized.");
