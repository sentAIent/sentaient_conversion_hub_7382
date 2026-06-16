import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    
    // Pre-set localStorage
    await page.goto('http://localhost:5173/mindwave', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
        localStorage.setItem('mindwave_disclaimer_accepted', 'true');
        localStorage.setItem('mindwave_onboarding_complete_v5', 'true');
        localStorage.removeItem('mixerSectionStates');
    });
    
    // Reload
    await page.goto('http://localhost:5173/mindwave', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 5000));
    
    // Simulate mouse movement to wake up the idle-hidden UI
    await page.mouse.move(700, 450);
    await new Promise(r => setTimeout(r, 500));
    await page.mouse.move(100, 300);
    await new Promise(r => setTimeout(r, 1000));
    
    // Force: remove idle-hidden from ALL panels, remove translate-x-full from sidebar
    await page.evaluate(() => {
        // Remove idle-hidden
        document.querySelectorAll('.idle-hidden').forEach(el => {
            el.classList.remove('idle-hidden');
        });
        // Remove loading screen
        const ls = document.getElementById('loadingScreen');
        if (ls) ls.remove();
        // Remove any modals/overlays
        document.querySelectorAll('[class*="modal"], [id*="Modal"]').forEach(el => {
            el.style.display = 'none';
        });
        // Open right sidebar (where Cymatics tab lives)
        const rp = document.getElementById('rightPanel');
        if (rp) rp.classList.remove('translate-x-full');
        // Click Cymatics tab
        const tabPills = document.querySelectorAll('.tab-pill');
        tabPills.forEach(tp => {
            const onclick = tp.getAttribute('onclick');
            if (onclick && onclick.includes('active')) {
                tp.click();
            }
        });
    });
    
    await new Promise(r => setTimeout(r, 2000));
    
    // Screenshot right sidebar with Cymatics tab
    await page.screenshot({ path: path.join(__dirname, 'mindwave_cymatics_right.png'), fullPage: false });
    console.log('Screenshot: Right sidebar with Cymatics tab');
    
    // Now scroll down in the right sidebar to show Advanced Cymatics
    await page.evaluate(() => {
        const scrollContainer = document.querySelector('#rightPanel .overflow-y-auto');
        if (scrollContainer) {
            scrollContainer.scrollTop = 1500; // Scroll way down to Advanced Cymatics
        }
    });
    
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(__dirname, 'mindwave_cymatics_scrolled.png'), fullPage: false });
    console.log('Screenshot: Scrolled to Advanced Cymatics');
    
    // Now scroll to bottom for Classic Cymatics
    await page.evaluate(() => {
        const scrollContainer = document.querySelector('#rightPanel .overflow-y-auto');
        if (scrollContainer) {
            scrollContainer.scrollTop = 2500;
        }
    });
    
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(__dirname, 'mindwave_cymatics_classic.png'), fullPage: false });
    console.log('Screenshot: Classic Cymatics section');
    
    // Verify pattern count and indices
    const patternAudit = await page.evaluate(() => {
        const btns = document.querySelectorAll('.cymatics-pattern-btn');
        const patterns = [];
        btns.forEach(btn => {
            const onclick = btn.getAttribute('onclick');
            const match = onclick?.match(/selectCymaticPattern\((\d+)\)/);
            patterns.push({
                text: btn.textContent.trim().substring(0, 30),
                index: match ? parseInt(match[1]) : null
            });
        });
        return {
            total: btns.length,
            patterns: patterns
        };
    });
    console.log(`Total pattern buttons: ${patternAudit.total}`);
    console.log('Pattern audit:', JSON.stringify(patternAudit.patterns, null, 2));
    
    await browser.close();
})();
