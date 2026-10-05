import JSZip from 'jszip';

/**
 * Service to parse GDPR exports (Facebook, Instagram) from a ZIP file
 * entirely on the client side.
 */
export class GDPRZipParser {
    
    /**
     * Parse the provided zip file.
     * @param {File} file - The .zip file uploaded by the user.
     * @param {Function} onProgress - Callback for logging status updates `(message) => void`
     * @returns {Promise<Array>} - Normalized array of cognitive nodes.
     */
    static async parseGDPRArchive(file, onProgress) {
        onProgress(`📦 Loading archive: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)...`);
        
        const zip = new JSZip();
        let loadedZip;
        try {
            loadedZip = await zip.loadAsync(file);
        } catch (error) {
            onProgress(`❌ Error loading zip: ${error.message}`);
            throw error;
        }

        const nodes = [];
        let dmCount = 0;
        let savedCount = 0;

        onProgress(`🔍 Scanning internal directory structure...`);
        
        // Loop through all files in the zip
        for (const [relativePath, zipEntry] of Object.entries(loadedZip.files)) {
            if (zipEntry.dir) continue; // Skip directories

            // Instagram/Facebook DM patterns (e.g., messages/inbox/.../message_1.json)
            if (relativePath.includes('messages/inbox') && relativePath.endsWith('.json')) {
                const content = await zipEntry.async("string");
                try {
                    const data = JSON.parse(content);
                    if (data.messages && Array.isArray(data.messages)) {
                        // We aggregate the thread into a single semantic node to save tokens/db space,
                        // or we could split them. Aggregating the last 50 messages of a thread is a good start.
                        const threadContent = data.messages
                            .slice(0, 50)
                            .map(m => `${m.sender_name || 'User'}: ${m.content || '[Media/Link]'}`)
                            .join('\\n');

                        nodes.push({
                            source: relativePath.includes('instagram') ? 'instagram' : 'facebook',
                            type: 'dm',
                            title: `DM Thread: ${data.title || 'Unknown'}`,
                            content: threadContent,
                            timestamp: Date.now()
                        });
                        dmCount++;
                    }
                } catch (e) {
                    console.warn(`Failed to parse DM json: ${relativePath}`);
                }
            }

            // Instagram Saved Posts pattern
            if ((relativePath.includes('saved_posts.json') || relativePath.includes('saved_collections.json')) && relativePath.endsWith('.json')) {
                const content = await zipEntry.async("string");
                try {
                    const data = JSON.parse(content);
                    const savedItems = data.saved_saved_media || data.items || [];
                    savedItems.forEach(item => {
                        const title = item.title || item.string_map_data?.['Saved on']?.value || 'Saved Media';
                        nodes.push({
                            source: 'instagram',
                            type: 'saved_post',
                            title: title,
                            content: `Saved Media Link/Ref: ${title}`,
                            timestamp: Date.now()
                        });
                        savedCount++;
                    });
                } catch (e) {
                    console.warn(`Failed to parse saved posts: ${relativePath}`);
                }
            }
            
            // Note: In a production app, we would yield to the main thread here if the zip is massive
            // await new Promise(r => setTimeout(r, 0));
        }

        onProgress(`✅ Extraction complete. Found ${dmCount} DM threads and ${savedCount} saved items.`);
        return nodes;
    }
}
