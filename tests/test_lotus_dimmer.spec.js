import { test, expect } from '@playwright/test';

test('Lotus Glow opacity is independent of global dimmer', async ({ page }) => {
  // Catch errors
  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`BROWSER ERROR: ${msg.text()}`);
  });

  await page.goto('http://localhost:5173/mindwave.html');
  
  // Wait for visualizer
  await page.evaluate(() => {
      return new Promise(resolve => {
          if (window.VIZ_READY_DISPATCHED || (window.getVisualizer && window.getVisualizer())) resolve();
          else {
              window.addEventListener('visualizerReady', resolve, {once: true});
              setTimeout(resolve, 15000); // safety timeout
          }
      });
  });

  // Small delay for init
  await page.waitForTimeout(1000);
  
  // Drag slider programmatically
  await page.evaluate(() => {
    const slider = document.querySelector('#globalDimmerSlider');
    if (slider) {
      slider.value = 1.0;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      console.error('Slider #globalDimmerSlider not found!');
    }
  });

  await page.waitForTimeout(500); // Give it a frame or two to update

  // Verify Lotus opacity > 0
  const lotusOpacity = await page.evaluate(() => {
    const viz = window.getVisualizer ? window.getVisualizer() : (window.viz3D || window.visualizer);
    if (!viz) return -1.0; // Fail if no viz
    
    // In visualizer_v5_deeceee_root.js it was `this.logoMesh.material.opacity`
    if (viz.logoMesh && viz.logoMesh.material) {
        return viz.logoMesh.material.opacity;
    }
    
    if (viz._lotusCurrentOpacity !== undefined) return viz._lotusCurrentOpacity;
    
    return -2.0; // Fail if properties don't exist
  });

  expect(lotusOpacity).toBeGreaterThan(0);
});
