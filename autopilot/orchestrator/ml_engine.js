import { pipeline, env, RawImage } from '@xenova/transformers';
import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';

// Fetch from HF Hub, disable local file system models for Docker
env.allowLocalModels = false;

let featureExtractionPipeline = null;
let objectDetectionPipeline = null;
let translationPipeline = null;
let segmentationPipeline = null;

// ==========================================
// 1. Semantic Embeddings (Deduplication)
// ==========================================
export async function getEmbedding(text) {
    if (!featureExtractionPipeline) {
        console.log("[ML Engine] Initializing Semantic Embedding Model (all-MiniLM-L6-v2)...");
        featureExtractionPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    // Truncate to 512 tokens to avoid limits
    const truncated = text.substring(0, 1500);
    const output = await featureExtractionPipeline(truncated, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
}

export function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] ** 2;
        normB += vecB[i] ** 2;
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ==========================================
// 2. Object Detection & Smart Cropping
// ==========================================
export async function cropToImportantUI(imagePath) {
    if (!objectDetectionPipeline) {
        console.log("[ML Engine] Initializing Object Detection Model (detr-resnet-50)...");
        objectDetectionPipeline = await pipeline('object-detection', 'Xenova/detr-resnet-50');
    }
    
    try {
        console.log(`[ML Engine] Running object detection on ${imagePath}...`);
        const image = await Jimp.read(imagePath);
        
        // Pass image path to pipeline
        const output = await objectDetectionPipeline(imagePath, { threshold: 0.8 });
        
        if (output.length === 0) {
            console.log("[ML Engine] No significant objects found. Returning original image.");
            return imagePath;
        }

        // Find the largest bounding box to focus on (heuristic for main UI element)
        let largestBox = output[0];
        let maxArea = 0;
        
        for (const obj of output) {
            const area = obj.box.width * obj.box.height;
            if (area > maxArea) {
                maxArea = area;
                largestBox = obj;
            }
        }

        console.log(`[ML Engine] Cropping to object: ${largestBox.label}`);
        
        const padding = 20;
        const x = Math.max(0, largestBox.box.xmin - padding);
        const y = Math.max(0, largestBox.box.ymin - padding);
        const w = Math.min(image.bitmap.width - x, largestBox.box.xmax - largestBox.box.xmin + (padding * 2));
        const h = Math.min(image.bitmap.height - y, largestBox.box.ymax - largestBox.box.ymin + (padding * 2));
        
        image.crop(x, y, w, h);
        
        const parsed = path.parse(imagePath);
        const croppedPath = path.join(parsed.dir, `${parsed.name}_cropped${parsed.ext}`);
        
        await image.writeAsync(croppedPath);
        return croppedPath;
        
    } catch (e) {
        console.error("[ML Engine] Failed to crop image:", e.message);
        return imagePath;
    }
}

// ==========================================
// 3. Multi-lingual Translation
// ==========================================
export async function translateText(text, targetLang) {
    if (!translationPipeline) {
        console.log("[ML Engine] Initializing Edge Translation Model (m2m100_418M)...");
        // We use Xenova/m2m100_418M which supports a vast range of languages
        translationPipeline = await pipeline('translation', 'Xenova/m2m100_418M');
    }
    
    console.log(`[ML Engine] Translating text to ${targetLang}...`);
    try {
        // text can be a string or array of strings. We pass a single string.
        const output = await translationPipeline(text, {
            src_lang: 'en',
            tgt_lang: targetLang
        });
        return output[0].translation_text;
    } catch (e) {
        console.error(`[ML Engine] Translation to ${targetLang} failed:`, e.message);
        return text;
    }
}

// ==========================================
// 4. Background Removal (Image Segmentation)
// ==========================================
export async function removeBackground(imagePath) {
    if (!segmentationPipeline) {
        console.log("[ML Engine] Initializing Image Segmentation Model (modnet)...");
        segmentationPipeline = await pipeline('image-segmentation', 'Xenova/modnet');
    }

    try {
        console.log(`[ML Engine] Removing background from ${imagePath}...`);
        
        const image = await RawImage.read(imagePath);
        const output = await segmentationPipeline(image);
        
        const jimpImage = await Jimp.read(imagePath);
        const maskData = output.mask.data;
        
        // Apply alpha mask
        jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, function(x, y, idx) {
            // Modnet output is grayscale 1 channel
            const maskIdx = (y * jimpImage.bitmap.width + x);
            // Alpha channel is the 4th index (idx + 3) in Jimp
            // We use the mask pixel value as the new alpha channel
            const alphaValue = maskData[maskIdx];
            this.bitmap.data[idx + 3] = alphaValue;
        });

        const parsed = path.parse(imagePath);
        const noBgPath = path.join(parsed.dir, `${parsed.name}_nobg.png`);
        
        await jimpImage.writeAsync(noBgPath);
        return noBgPath;

    } catch (e) {
        console.error("[ML Engine] Failed to remove background:", e.message);
        return null;
    }
}
