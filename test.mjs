import fs from 'fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('public/mindwave.html', 'utf8');
const dom = new JSDOM(html, { runScripts: "dangerously", url: "http://localhost:5173/mindwave.html", resources: "usable" });

dom.window.onerror = function(msg, url, line) {
  console.log('Error:', msg, url, line);
};
dom.window.addEventListener('unhandledrejection', (e) => {
  console.log('Unhandled Rejection:', e.reason);
});

setTimeout(() => {
  console.log('Done waiting 3s.');
}, 3000);
