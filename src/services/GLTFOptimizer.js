import { Document, NodeIO } from '@gltf-transform/core';
import { weld, dedup, center, unlit } from '@gltf-transform/functions';

/**
 * Enterprise 3D Optimization Service
 * Uses glTF-Transform to dynamically compress, optimize, and prepare
 * 3D models before rendering them in React Three Fiber or the Interstellar Game.
 */
class GLTFOptimizer {
    constructor() {
        // NodeIO is used to read/write the in-memory documents
        this.io = new NodeIO();
    }

    /**
     * Takes a raw ArrayBuffer of a .glb file, optimizes it, and returns the new Buffer.
     * @param {ArrayBuffer} arrayBuffer The raw GLB data
     * @returns {Promise<Uint8Array>} The optimized GLB data
     */
    async optimizeModelBuffer(arrayBuffer) {
        try {
            console.log('[GLTFOptimizer] Reading model buffer...');
            
            // 1. Read document from buffer
            const document = await this.io.readBinary(new Uint8Array(arrayBuffer));

            // 2. Run an optimization pipeline
            console.log('[GLTFOptimizer] Running optimization pipeline (Weld, Dedup, Center)...');
            await document.transform(
                // Weld vertices to fix split geometry
                weld({ tolerance: 0.0001 }),
                
                // Deduplicate meshes, accessors, materials
                dedup(),
                
                // Center the model at the origin (0,0,0)
                center({ pivot: 'center' }),

                // Convert materials to unlit (great for stylized cyberpunk looks, saves performance)
                // Commented out to preserve PBR by default, but available for specific styles.
                // unlit() 
            );

            // 3. Write back to binary
            console.log('[GLTFOptimizer] Optimization complete. Generating output buffer...');
            const optimizedGlb = await this.io.writeBinary(document);
            
            // Calculate compression savings
            const originalSize = arrayBuffer.byteLength / 1024;
            const newSize = optimizedGlb.byteLength / 1024;
            const savings = ((originalSize - newSize) / originalSize) * 100;
            
            console.log(`[GLTFOptimizer] Reduced size by ${savings.toFixed(2)}% (${originalSize.toFixed(1)}kb -> ${newSize.toFixed(1)}kb)`);

            return optimizedGlb;

        } catch (error) {
            console.error('[GLTFOptimizer] Failed to optimize model:', error);
            throw error;
        }
    }

    /**
     * Helper to fetch a model from a URL, optimize it, and create a blob URL for Three.js
     */
    async fetchAndOptimize(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        
        const optimizedBuffer = await this.optimizeModelBuffer(arrayBuffer);
        
        // Create a blob URL that can be passed to useGLTF() in React Three Fiber
        const blob = new Blob([optimizedBuffer], { type: 'model/gltf-binary' });
        return URL.createObjectURL(blob);
    }
}

export const gltfOptimizer = new GLTFOptimizer();
