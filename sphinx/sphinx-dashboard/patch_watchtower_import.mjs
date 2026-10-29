import fs from 'fs';

let content = fs.readFileSync('../sphinx-core/lib/watchtower.mjs', 'utf8');
if (!content.includes('import { OsintCache }')) {
  content = `import { OsintCache } from './cache.mjs';\n` + content;
  fs.writeFileSync('../sphinx-core/lib/watchtower.mjs', content);
}
