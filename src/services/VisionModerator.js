import { pipeline, env } from '@xenova/transformers';

// Configure transformers.js to use WebAssembly
env.backends.onnx.wasm.numThreads = 1;

/**
 * VisionModerator.js
 * 
 * An edge-based computer vision service implementing principles from `roboflow/supervision`.
 * This intercepts images before upload, detects objects, and applies privacy blurs
 * completely client-side to ensure zero-data-leak compliance.
 */
class VisionModerator {
    constructor() {
        this.detector = null;
        this.isInitializing = false;
        this.status = 'offline';
    }

    async init() {
        if (this.detector || this.isInitializing) return;
        this.isInitializing = true;
        this.status = 'loading';
        console.log("[VisionModerator] Initializing in-browser Object Detection (YOLOS)...");
        
        try {
            // YOLOS-tiny is fast enough for browser-side edge AI
            this.detector = await pipeline('object-detection', 'Xenova/yolos-tiny');
            this.status = 'online';
            console.log("[VisionModerator] Ready.");
        } catch (err) {
            console.error("[VisionModerator] Failed to load vision model:", err);
            this.status = 'error';
        } finally {
            this.isInitializing = false;
        }
    }

    /**
     * Analyze an image and return detection bounding boxes
     * @param {string} imageUrl - Blob URL or base64 image
     * @param {number} threshold - Confidence threshold
     */
    async detect(imageUrl, threshold = 0.8) {
        if (!this.detector) await this.init();
        if (!this.detector) throw new Error("Vision model not loaded");

        const results = await this.detector(imageUrl, { threshold });
        return results;
    }

    /**
     * Process an image, detect specified objects (e.g. 'person'), and blur them.
     * Returns a new Blob URL of the blurred image.
     */
    async processAndBlur(file, targetLabels = ['person', 'cell phone', 'car']) {
        const imageUrl = URL.createObjectURL(file);
        
        // 1. Detect Objects
        const detections = await this.detect(imageUrl);
        const targetsToBlur = detections.filter(d => targetLabels.includes(d.label));

        if (targetsToBlur.length === 0) {
            return { url: imageUrl, detections, blurred: false };
        }

        // 2. Load image into Canvas
        const img = new Image();
        img.src = imageUrl;
        await new Promise(res => img.onload = res);

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // 3. Apply blur to target bounding boxes
        ctx.filter = 'blur(15px)';
        targetsToBlur.forEach(det => {
            const { xmin, ymin, xmax, ymax } = det.box;
            const w = xmax - xmin;
            const h = ymax - ymin;
            
            // Re-draw the specific region with the blur filter
            ctx.drawImage(canvas, Math.max(0, xmin), Math.max(0, ymin), w, h, Math.max(0, xmin), Math.max(0, ymin), w, h);
        });

        // Reset filter for any future operations
        ctx.filter = 'none';

        // 4. Return the new blurred image
        const blurredBlob = await new Promise(res => canvas.toBlob(res, file.type));
        const blurredUrl = URL.createObjectURL(blurredBlob);

        return {
            url: blurredUrl,
            detections,
            blurred: true,
            originalUrl: imageUrl
        };
    }
}

export const visionModerator = new VisionModerator();
