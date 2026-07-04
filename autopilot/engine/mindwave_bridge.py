import asyncio
from playwright.async_api import async_playwright
import os
import subprocess
import time
import uuid

async def record_mindwave_visuals(visual_style: str, audio_beats: str = "none", audio_atmos: str = "none", audio_music: str = "none", duration_sec: int = 15) -> str:
    """
    Spins up a headless browser, navigates to the local Mindwave app,
    triggers the correct visual and audio style, and records the WebGL canvas to an mp4.
    """
    mindwave_dir = "/Users/infinitealpha/Dev/BinauralBeats/v7_restore"
    
    # 1. Start a temporary static server for the Mindwave app
    server_process = subprocess.Popen(
        ["python3", "-m", "http.server", "8081"],
        cwd=mindwave_dir,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    
    time.sleep(1) # Give the server a moment to start
    
    output_filename = f"temp/mindwave_{uuid.uuid4().hex}.webm"
    os.makedirs("temp", exist_ok=True)
    
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True, args=[
                '--use-gl=egl',
                '--disable-web-security',
                '--autoplay-policy=no-user-gesture-required'
            ])
            
            # Record video of the page
            context = await browser.new_context(
                viewport={'width': 1280, 'height': 720},
                record_video_dir="temp/",
                record_video_size={"width": 1280, "height": 720}
            )
            
            page = await context.new_page()
            
            # Hide specific non-essential UI before the page even loads to prevent ANY flash of UI
            await page.add_init_script("""
                // Prevent app from trying to show onboarding/disclaimers
                localStorage.setItem('mindwave_disclaimer_accepted', 'true');
                localStorage.setItem('mindwave_onboarding_complete_v5', 'true');
                localStorage.setItem('mindwave_age_verified', 'true');
                
                document.addEventListener('DOMContentLoaded', () => {
                    let style = document.createElement('style');
                    style.innerHTML = `
                        #leftPanel, #rightPanel, #bottomControlBar, header, #authModal, 
                        #complianceModal, #videoModal, #statsModal, #themeModal, #profileModal, 
                        #saveModal, #hyperGammaModal, #journeyModal, #installPrompt, 
                        .mobile-bottom-nav, #intentSurveyOverlay, #disclaimerModal,
                        #loadingScreen, .modal, .overlay, #complianceOverlay {
                            display: none !important;
                            opacity: 0 !important;
                            pointer-events: none !important;
                            visibility: hidden !important;
                        }
                    `;
                    document.head.appendChild(style);
                });
            """)
            
            # Navigate to the local server
            await page.goto("http://localhost:8081/mindwave.html")
            
            # Wait for WebGL to load
            await asyncio.sleep(2)

            # Automatically accept the disclaimer to proceed (if it's not hidden by the CSS above)
            try:
                await page.evaluate("""
                    let acceptBtn = document.getElementById('disclaimerAcceptBtn') || document.getElementById('complianceAge');
                    if(acceptBtn) acceptBtn.click();
                    let continueBtn = document.getElementById('disclaimerContinueBtn');
                    if(continueBtn && !continueBtn.disabled) continueBtn.click();
                """)
            except Exception as e:
                pass
                
            # Wait a moment for any transitions
            await asyncio.sleep(1)
            
            # Inject JS to trigger the correct visual and audio style
            await page.evaluate(f"""
                let visual_styles = "{visual_style}".split(',').filter(Boolean);
                let beats = "{audio_beats}".split(',').filter(Boolean);
                let atmos = "{audio_atmos}".split(',').filter(Boolean);
                let music = "{audio_music}".split(',').filter(Boolean);
                
                // 1. Set Visual State
                let v = window.getVisualizer && window.getVisualizer();
                if (v) {{
                    for (let vs of visual_styles) {{
                        if (vs === "mindwave_kanagawa") {{
                            if (v.setTsunamiKanagawa) v.setTsunamiKanagawa(1.0);
                            if (v.setTsunamiLoop) v.setTsunamiLoop(true);
                            if (v.setTsunamiStyle) v.setTsunamiStyle(1.0);
                            if (v.setCymaticPattern) v.setCymaticPattern(0.0);
                        }} else if (vs === "mindwave_cymatics") {{
                            if (v.setTsunamiKanagawa) v.setTsunamiKanagawa(0.0);
                            if (v.setTsunamiStyle) v.setTsunamiStyle(2.0);
                            if (v.setCymaticPattern) v.setCymaticPattern(1.0);
                        }} else if (vs === "mindwave_particle_swarm") {{
                            if (v.setTsunamiKanagawa) v.setTsunamiKanagawa(0.0);
                            if (window.state && window.state.visualizer) {{
                                window.state.visualizer.toggleMode("particles");
                            }}
                        }} else {{
                            // Standard visuals (e.g. dragon, galaxy, ocean, matrix, etc)
                            if (window.state && window.state.visualizer) {{
                                window.state.visualizer.toggleMode(vs);
                            }}
                        }}
                    }}
                }}
                
                // 2. Set Audio Frequencies (Beats)
                if (window.applyPreset) {{
                    for (let b of beats) {{
                        if (b !== "none") window.applyPreset(b);
                    }}
                }}
                
                // 3. Set Atmos & Music
                if (window.updateSoundscape) {{
                    for (let a of atmos) {{
                        if (a !== "none") window.updateSoundscape(a, 'nature', true);
                    }}
                    for (let m of music) {{
                        if (m !== "none") window.updateSoundscape(m, 'drone', true);
                    }}
                }}
                
                // We also trigger play if needed.
                if (window.handlePlayClick) window.handlePlayClick();
            """)
            
            # Record for X seconds
            print(f"Recording Mindwave visual: {visual_style} for {duration_sec}s...")
            await asyncio.sleep(duration_sec)
            
            # Close page/context to save the video
            video_path = await page.video.path()
            await context.close()
            await browser.close()
            
            # Rename video to our deterministic output name
            os.rename(video_path, output_filename)
            print(f"Saved Mindwave recording to {output_filename}")
            
    finally:
        # Kill the local server
        server_process.terminate()
        
    return output_filename
