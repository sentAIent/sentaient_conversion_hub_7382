const { chromium } = require('playwright');
const { spawn } = require('child_process');

const serverProcess = spawn('npx', ['http-server', '-p', '8080', '--cors', '-c-1'], {
    cwd: '/Users/infinitealpha/Dev/BinauralBeats/v7_restore',
    shell: true
});

setTimeout(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

  await page.goto('http://127.0.0.1:8080/mindwave.html');
  
  await page.evaluate(() => {
    localStorage.setItem('mindwave_disclaimer_accepted', 'true');
    localStorage.setItem('mindwave_survey_completed', 'true');
  });
  
  await page.reload();

  // Wait for setupUI to finish by waiting for the log or just sleep 5 seconds
  await page.waitForTimeout(5000);

  await page.waitForSelector('#playBtn', { state: 'visible' });
  await page.click('#playBtn', { force: true });

  await page.waitForTimeout(2000);

  const audioState = await page.evaluate(() => {
     return {
         playing: window.isAudioPlaying ? window.isAudioPlaying() : false,
         audioCtxState: window.__debugAudioCtx ? window.__debugAudioCtx.state : 'unknown',
         isAudioPlayingExists: !!window.isAudioPlaying
     };
  });
  console.log("Audio State:", JSON.stringify(audioState));

  await browser.close();
  serverProcess.kill();
  process.exit(0);
}, 2000);
