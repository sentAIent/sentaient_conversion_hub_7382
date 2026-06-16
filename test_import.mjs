(async () => {
    try {
        await import('./binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js');
        console.log("Syntax is OK!");
    } catch (e) {
        console.error("Syntax Error or Import Error:", e);
    }
})();
