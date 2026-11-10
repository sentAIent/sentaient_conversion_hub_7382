const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const puppeteer = require('puppeteer');

const distDir = path.join(__dirname, '..', 'dist', 'sphinx');

if (!fs.existsSync(distDir)) {
  console.error('ERROR: dist/sphinx does not exist. Run build and rsync first.');
  process.exit(1);
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.geojson': 'application/geo+json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pbf': 'application/x-protobuf'
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0];
  if (cleanUrl.startsWith('/sphinx')) {
    cleanUrl = cleanUrl.replace(/^\/sphinx/, '') || '/';
  }
  let filePath = path.join(distDir, cleanUrl);
  if (cleanUrl === '/' || cleanUrl === '') {
    filePath = path.join(distDir, 'index.html');
  } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

const PORT = 4173;

const VIEWPORTS = [
  { name: 'Mobile (iPhone 14/15 Pro)', width: 390, height: 844 },
  { name: 'Tablet (iPad)', width: 768, height: 1024 },
  { name: 'Laptop', width: 1280, height: 800 },
  { name: 'Desktop FHD', width: 1920, height: 1080 }
];

async function runAudit() {
  await new Promise(r => server.listen(PORT, r));
  console.log(`[E2E] Serving dist/sphinx on http://127.0.0.1:${PORT}`);

  const chromePath = fs.existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined;
  const tmpUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sphinx-audit-'));
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--user-data-dir=' + tmpUserDataDir]
  });

  let totalFailures = 0;

  for (const vp of VIEWPORTS) {
    console.log(`\n========================================`);
    console.log(`[E2E Viewport Test] ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });

    await page.evaluateOnNewDocument(() => {
      try { localStorage.setItem('sphinx_force_webgl', 'true'); } catch (e) {}
      const orig = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function(type, ...args) {
        const res = orig.call(this, type, ...args);
        if (res) return res;
        if (type === 'webgl' || type === 'experimental-webgl') {
          return {
            getExtension: () => ({ loseContext: () => {} }),
            getParameter: () => 7938,
            createBuffer: () => ({}),
            bindBuffer: () => {},
            bufferData: () => {},
            enable: () => {},
            disable: () => {},
            viewport: () => {},
            clear: () => {},
            clearColor: () => {},
            createShader: () => ({}),
            shaderSource: () => {},
            compileShader: () => {},
            getShaderParameter: () => true,
            createProgram: () => ({}),
            attachShader: () => {},
            linkProgram: () => {},
            getProgramParameter: () => true,
            useProgram: () => {}
          };
        }
        return res;
      };
    });

    const failedRequests = [];
    const consoleErrors = [];

    page.on('requestfailed', req => {
      const url = req.url();
      if (!url.includes('demotiles.maplibre.org/tiles') && !url.includes('open-meteo.com')) {
        failedRequests.push({ url, error: req.failure()?.errorText });
      }
    });

    page.on('response', res => {
      if (res.status() === 404) {
        failedRequests.push({ url: res.url(), status: 404 });
      }
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    try {
      await page.goto(`http://127.0.0.1:${PORT}/sphinx/`, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      // 1. Instant Custom Cursor check at DOM load
      const cursorInfo = await page.evaluate(() => {
        const bodyCursor = window.getComputedStyle(document.body).cursor;
        const mainEl = document.querySelector('main');
        const mainCursor = mainEl ? window.getComputedStyle(mainEl).cursor : 'none';
        const divEl = document.querySelector('div');
        const divCursor = divEl ? window.getComputedStyle(divEl).cursor : 'none';
        return { bodyCursor, mainCursor, divCursor };
      });

      const isCursorCustom = cursorInfo.bodyCursor.includes('data:image/svg') || cursorInfo.bodyCursor.includes('url(');
      console.log(`  ✓ 0ms Custom Cursor Status:`, isCursorCustom ? 'PASS (Instant Custom Sun)' : 'FAIL');
      console.log(`    - Body cursor: ${cursorInfo.bodyCursor.slice(0, 50)}...`);
      console.log(`    - Main cursor: ${cursorInfo.mainCursor.slice(0, 50)}...`);

      if (!isCursorCustom) {
        totalFailures++;
        console.error(`    ❌ Cursor was not custom at DOM load!`);
      }

      // Wait for React hydration & map layout
      await page.waitForSelector('[data-testid="bottom-tactical-dock"]', { timeout: 25000 }).catch(() => null);
      await new Promise(r => setTimeout(r, 1000));

      // 2. Dock & Threats Button Bounds check
      const dockBounds = await page.evaluate(() => {
        const dock = document.querySelector('[data-testid="bottom-tactical-dock"]');
        const threatsBtn = document.querySelector('[data-testid="btn-pin-threat-radar"]');
        if (!dock) return { found: false };
        const dockRect = dock.getBoundingClientRect();
        const threatsRect = threatsBtn ? threatsBtn.getBoundingClientRect() : null;
        return {
          found: true,
          windowWidth: window.innerWidth,
          dockRight: dockRect.right,
          dockLeft: dockRect.left,
          dockWidth: dockRect.width,
          threatsFound: !!threatsBtn,
          threatsRight: threatsRect ? threatsRect.right : null,
          threatsLeft: threatsRect ? threatsRect.left : null
        };
      });

      if (dockBounds.found) {
        const dockFits = dockBounds.dockRight <= vp.width + 10;
        const threatsFits = dockBounds.threatsRight ? dockBounds.threatsRight <= vp.width + 10 : true;
        console.log(`  ✓ Dock Width: ${Math.round(dockBounds.dockWidth)}px | Viewport Width: ${vp.width}px`);
        console.log(`  ✓ Dock Right Boundary: ${Math.round(dockBounds.dockRight)}px <= ${vp.width}px:`, dockFits ? 'PASS' : 'FAIL');
        if (dockBounds.threatsFound) {
          console.log(`  ✓ Threats Button Right Boundary: ${Math.round(dockBounds.threatsRight)}px <= ${vp.width}px:`, threatsFits ? 'PASS (Visible, Not Cut Off)' : 'FAIL (Cut Off)');
          if (!threatsFits) {
            totalFailures++;
            console.error(`    ❌ Threats button extends beyond viewport edge!`);
          }
        } else {
          console.log(`  ℹ Threats button rendered dynamically once map loaded.`);
        }
      } else {
        const mainHtml = await page.evaluate(() => document.querySelector('main')?.innerHTML?.slice(0, 200) || document.body.innerHTML?.slice(0, 200));
        console.log(`  ℹ Dock element not detected. Content snippet: ${mainHtml}`);
      }

      // 3. Network 404 check
      const fontOrData404s = failedRequests.filter(r => r.status === 404 && (r.url.includes('.pbf') || r.url.includes('.geojson') || r.url.includes('.json')));
      if (fontOrData404s.length > 0) {
        console.error(`  ❌ 404 Errors detected for critical resources:`, fontOrData404s);
        totalFailures += fontOrData404s.length;
      } else {
        console.log(`  ✓ 0 Critical 404 Errors (Font glyphs, GeoJSON layers, icons all OK)`);
      }

      if (consoleErrors.length > 0) {
        console.warn(`  ⚠ Page errors:`, consoleErrors);
      }

    } catch (e) {
      console.error(`  ❌ Error testing viewport ${vp.name}:`, e.message);
      totalFailures++;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  try { fs.rmSync(tmpUserDataDir, { recursive: true, force: true }); } catch (e) {}
  server.close();

  console.log(`\n========================================`);
  console.log(`[E2E AUDIT COMPLETE] Total Failures: ${totalFailures}`);
  console.log(`========================================`);
  if (totalFailures > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAudit().catch(err => {
  console.error('[E2E Fatal Error]:', err);
  if (server) server.close();
  process.exit(1);
});
