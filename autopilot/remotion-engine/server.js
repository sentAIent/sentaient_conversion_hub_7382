const express = require('express');
const { renderMedia, selectComposition } = require('@remotion/renderer');
const { bundle } = require('@remotion/bundler');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8007;

app.post('/render', async (req, res) => {
  try {
    const { clips, captions, audio_url, brand_color } = req.body;
    console.log("[Remotion Engine] Starting programmatic render...");

    // In a full production environment, we bundle the React composition and render it.
    // However, Remotion requires a bundled React environment and an installation of Chromium 
    // inside the Docker container to render the frames.
    
    // To simulate the engine locally without a full Chromium installation, 
    // we return a success response with a mock rendered video URL.
    
    const mock_render_delay = 3000;
    await new Promise(resolve => setTimeout(resolve, mock_render_delay));
    
    // Mock S3 URL representing the "rendered" video.
    const renderedUrl = "https://mock-s3-bucket.sentaient.com/video/programmatic_render_final.mp4";

    console.log("[Remotion Engine] Render completed. Output: ", renderedUrl);

    res.json({
      success: true,
      url: renderedUrl,
      mode: "mock_engine",
      details: {
        composition: "MarketingShortTemplate",
        frames_rendered: 360,
        fps: 30
      }
    });

  } catch (error) {
    console.error("[Remotion Engine] Rendering failed:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'remotion-engine' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Remotion Engine] Server listening on port ${PORT}`);
});
