const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// This script simulates the browser-use / AI QA Bot
// It boots up headless, navigates to the game, records gameplay,
// and saves a raw video that can be auto-edited/cropped.

async function runSocialBot() {
  console.log("🚀 Starting Autonomous Social Bot...");
  
  // Set up export directory
  const exportDir = path.join(__dirname, '..', 'exports');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  // Launch browser with recording enabled
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    recordVideo: {
      dir: exportDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  
  console.log("🎥 Navigating to Snowboarder's Paradise...");
  try {
    // Assuming the Expo web server runs on 8081
    await page.goto('http://localhost:8081', { timeout: 10000 });
    console.log("✅ Game loaded! Executing gameplay loop...");

    // Simulate clicking 'Drop In' or focusing canvas
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    
    // Simulate AI playing the game for 10 seconds
    // (e.g. carving, jumping, doing tricks)
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('ArrowUp'); // Jump
      await page.keyboard.down('ArrowLeft'); // Spin
      await page.waitForTimeout(500);
      await page.keyboard.up('ArrowLeft');
      await page.waitForTimeout(500);
    }
    
    console.log("✂️ Session complete. Exporting clip...");
  } catch (err) {
    console.log("⚠️ Could not reach localhost:8081. Is the dev server running?");
  } finally {
    // Close context to ensure video is saved
    await context.close();
    await browser.close();
    console.log(`🎬 Video saved to ${exportDir}`);
    console.log("✨ To auto-crop to 9:16 for TikTok/Reels, run: ffmpeg -i raw.webm -vf 'crop=405:720' output.mp4");
  }
}

runSocialBot();
