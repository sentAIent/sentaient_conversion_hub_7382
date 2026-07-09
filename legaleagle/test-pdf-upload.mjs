import puppeteer from 'puppeteer';
import fs from 'fs';

const minimalPdf = Buffer.from(
  "JVBERi0xLgoxIDAgb2JqPDwvUGFnZXMgMiAwIFI+PmVuZG9iagoyIDAgb2JqPDwvS2lkc1szIDAgUl0vQ291bnQgMT4+ZW5kb2JqCjMgMCBvYmo8PC9QYXJlbnQgMiAwIFIvUmVzb3VyY2VzPDwvRm9udDw8L0YxIDQgMCBSPj4+Pi9Db250ZW50cyA1IDAgUj4+ZW5kb2JqCjQgMCBvYmo8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2E+PmVuZG9iago1IDAgb2JqPDwvTGVuZ3RoIDIxPj5zdHJlYW0KQlQvRjEgMTAgVGYgVGoKRVQKZW5kc3RyZWFtCmVuZG9iago=", 
  "base64"
);
fs.writeFileSync('test.pdf', minimalPdf);

(async () => {
  console.log("Launching browser to test PDF upload...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.goto('http://localhost:4173/legaleagle/');
  await new Promise(r => setTimeout(r, 2000));
  
  // We need to trigger the file upload, but we are at the login page.
  // Actually, we can just execute the PDF parsing function directly in the browser console if we can access it!
  // Let's just create a test HTML file that imports our documentParser.ts and runs it.
  await browser.close();
})();
