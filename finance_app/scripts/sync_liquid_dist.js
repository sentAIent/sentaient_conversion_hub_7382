const fs = require('fs');
const path = require('path');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function syncDist() {
  const root = path.resolve(__dirname, '..');
  const projectRoot = path.resolve(root, '..');

  const nextStatic = path.join(root, '.next', 'static');
  const nextServerApp = path.join(root, '.next', 'server', 'app');

  const targets = [
    path.join(projectRoot, 'dist', 'liquid'),
    path.join(projectRoot, 'public', 'liquid')
  ];

  console.log('=== SYNCING LIQUID BUILD ASSETS ===');

  for (const target of targets) {
    console.log(`Syncing to ${target}...`);
    fs.mkdirSync(target, { recursive: true });

    // 1. Copy _next/static
    const targetStatic = path.join(target, '_next', 'static');
    if (fs.existsSync(nextStatic)) {
      copyDirRecursive(nextStatic, targetStatic);
      console.log(`  ✓ Copied static assets to ${targetStatic}`);
    }

    // 2. Copy generated HTML and route folders from server/app
    if (fs.existsSync(nextServerApp)) {
      const items = fs.readdirSync(nextServerApp, { withFileTypes: true });
      for (const item of items) {
        if (item.name.startsWith('_') || item.name.endsWith('.js') || item.name.endsWith('.json')) {
          continue;
        }
        const srcPath = path.join(nextServerApp, item.name);
        const destPath = path.join(target, item.name);

        if (item.isDirectory()) {
          copyDirRecursive(srcPath, destPath);
        } else if (item.name.endsWith('.html')) {
          fs.copyFileSync(srcPath, destPath);
          const routeName = item.name.replace('.html', '');
          if (routeName !== 'index' && !routeName.startsWith('_')) {
            const routeFolder = path.join(target, routeName);
            fs.mkdirSync(routeFolder, { recursive: true });
            fs.copyFileSync(srcPath, path.join(routeFolder, 'index.html'));
          }
        }
      }

      // Check if page.html exists and copy as index.html
      const rootPageHtml = path.join(nextServerApp, 'page.html');
      const rootIndexHtml = path.join(nextServerApp, 'index.html');
      if (fs.existsSync(rootPageHtml)) {
        fs.copyFileSync(rootPageHtml, path.join(target, 'index.html'));
      } else if (fs.existsSync(rootIndexHtml)) {
        fs.copyFileSync(rootIndexHtml, path.join(target, 'index.html'));
      }
      console.log(`  ✓ Copied route HTML pages to ${target}`);
    }
  }

  console.log('=== SYNC COMPLETE ===');
}

syncDist();
