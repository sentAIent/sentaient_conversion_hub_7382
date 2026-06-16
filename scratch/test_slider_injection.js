const puppeteer = require('puppeteer');

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    console.log("Injecting slider logic...");
    await page.evaluate(() => {
        window.injectNumberInputs = function() {
            document.querySelectorAll('input[type="range"]').forEach(range => {
                if (range.nextElementSibling && range.nextElementSibling.classList.contains('auto-number-input')) return;
                
                const numInput = document.createElement('input');
                numInput.type = 'number';
                numInput.className = 'auto-number-input bg-black/50 border border-white/20 text-white text-[10px] rounded px-1 text-center font-mono w-14 outline-none focus:border-indigo-500 transition-colors ml-2';
                
                if(range.min) numInput.min = range.min;
                if(range.max) numInput.max = range.max;
                if(range.step) numInput.step = range.step;
                numInput.value = range.value;
                
                range.parentNode.insertBefore(numInput, range.nextSibling);
                
                range.addEventListener('input', (e) => { numInput.value = e.target.value; });
                numInput.addEventListener('input', (e) => {
                    range.value = e.target.value;
                    range.dispatchEvent(new Event('input', { bubbles: true }));
                    range.dispatchEvent(new Event('change', { bubbles: true }));
                });
            });
            return document.querySelectorAll('.auto-number-input').length;
        };
        return window.injectNumberInputs();
    }).then(count => console.log(`Injected ${count} number inputs.`));
    
    await browser.close();
    process.exit(0);
})();
