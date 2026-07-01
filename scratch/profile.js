const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const client = await page.target().createCDPSession();
    await client.send('Profiler.enable');
    await client.send('Profiler.start');

    console.log("Navigating to page...");
    // Don't wait for load since it freezes! Wait until networkidle2 or just timeout
    try {
        await page.goto('http://localhost:8083/index.html', { waitUntil: 'domcontentloaded', timeout: 5000 });
    } catch (e) {
        console.log("Goto timeout, but continuing...");
    }

    console.log("Waiting 3 seconds to let it freeze...");
    await new Promise(r => setTimeout(r, 3000));

    console.log("Stopping profiler...");
    const { profile } = await client.send('Profiler.stop');
    
    // Simple analysis of top functions
    const nodes = profile.nodes;
    const hitCounts = {};
    const nodeDict = {};
    for (const node of nodes) {
        nodeDict[node.id] = node;
    }
    for (let i = 0; i < profile.samples.length; i++) {
        const nodeId = profile.samples[i];
        hitCounts[nodeId] = (hitCounts[nodeId] || 0) + 1;
    }
    
    const sorted = Object.keys(hitCounts).map(id => ({
        id,
        count: hitCounts[id],
        func: nodeDict[id].callFrame.functionName || '(anonymous)',
        url: nodeDict[id].callFrame.url,
        line: nodeDict[id].callFrame.lineNumber
    })).sort((a, b) => b.count - a.count);

    console.log("\nTop CPU consumers:");
    for (let i = 0; i < Math.min(10, sorted.length); i++) {
        console.log(`- ${sorted[i].func} (${sorted[i].count} hits) at ${sorted[i].url}:${sorted[i].line}`);
    }

    await browser.close();
    process.exit(0);
})();
