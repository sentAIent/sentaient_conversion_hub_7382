/**
 * GDPRParser.js
 * Ingests, parses, and harmonizes official GDPR data export archives
 * from top platforms (Instagram, Twitter/X, Google Takeout) purely in-browser.
 */
export class GDPRParser {
    constructor() {
        this.harmonizedData = [];
    }

    async loadJSZip() {
        if (window.JSZip) return window.JSZip;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
            script.onload = () => resolve(window.JSZip);
            script.onerror = () => reject(new Error('Failed to load JSZip from CDN'));
            document.head.appendChild(script);
        });
    }

    /**
     * Parse a ZIP file uploaded via browser.
     * @param {File} file The .zip file object
     * @returns {Promise<Array<Object>>} Harmonized data items
     */
    async parseZipArchive(file) {
        this.harmonizedData = [];
        
        const JSZipLib = await this.loadJSZip();
        const zip = new JSZipLib();
        let loadedZip;
        try {
            loadedZip = await zip.loadAsync(file);
        } catch (err) {
            throw new Error(`Failed to read ZIP archive: ${err.message}`);
        }

        const filePaths = Object.keys(loadedZip.files);
        
        // 1. Detect platform type based on directory markers
        
        // Detect Instagram: has 'messages' and 'saved' folders
        if (filePaths.some(p => p.includes('messages/') || p.includes('saved/'))) {
            console.log('[GDPRParser] Instagram archive detected.');
            await this.parseInstagramZip(loadedZip, filePaths);
        }
        // Detect Twitter: has 'data' folder and 'manifest.js'
        else if (filePaths.some(p => p.includes('data/') && (p.includes('manifest.js') || p.includes('manifest.json')))) {
            console.log('[GDPRParser] X/Twitter archive detected.');
            await this.parseTwitterZip(loadedZip, filePaths);
        }
        // Detect Google Takeout: has 'Google Keep' or 'Calendar'
        else if (filePaths.some(p => p.toLowerCase().includes('keep') || p.toLowerCase().includes('calendar') || p.toLowerCase().includes('takeout'))) {
            console.log('[GDPRParser] Google Takeout archive detected.');
            await this.parseGoogleTakeoutZip(loadedZip, filePaths);
        }
        else {
            console.warn('[GDPRParser] Generic file directory parser initiated.');
            await this.parseGenericZip(loadedZip, filePaths);
        }

        return this.harmonizedData;
    }

    /**
     * Parse Instagram JSON schemas from ZIP.
     */
    async parseInstagramZip(zip, filePaths) {
        // A. Parse Saved Posts
        const savedPath = filePaths.find(p => p.endsWith('saved/saved_posts.json'));
        if (savedPath) {
            try {
                const content = await zip.file(savedPath).async("string");
                const data = JSON.parse(content);
                const savedItems = data.saved_saved_media || [];
                savedItems.forEach(item => {
                    this.harmonizedData.push({
                        source: 'instagram',
                        type: 'saved_post',
                        timestamp: item.string_map_data?.['Saved Time']?.timestamp 
                            ? new Date(item.string_map_data['Saved Time'].timestamp * 1000).toISOString() 
                            : new Date().toISOString(),
                        title: item.title || 'Saved Instagram Media',
                        content: item.string_map_data?.['Caption']?.value || '',
                        mediaUrl: item.media_url_key || null
                    });
                });
            } catch (err) {
                console.error('[GDPRParser] Failed to parse Instagram saved posts:', err.message);
            }
        }

        // B. Parse Messages / DMs
        const messageFiles = filePaths.filter(p => p.includes('messages/inbox/') && p.endsWith('.json'));
        for (const file of messageFiles) {
            try {
                const content = await zip.file(file).async("string");
                const chatData = JSON.parse(content);
                const participantNames = (chatData.participants || []).map(p => p.name).join(', ');
                const messages = chatData.messages || [];
                
                messages.forEach(msg => {
                    if (msg.content) {
                        this.harmonizedData.push({
                            source: 'instagram',
                            type: 'dm',
                            timestamp: new Date(msg.ms_timestamp_value || msg.timestamp_ms || Date.now()).toISOString(),
                            title: `DM with ${participantNames}`,
                            content: msg.content,
                            sender: msg.sender_name
                        });
                    }
                });
            } catch (err) {
                console.error(`[GDPRParser] Failed to parse Instagram DM file: ${file}`, err.message);
            }
        }
    }

    /**
     * Parse Twitter/X JS-JSON schemas from ZIP.
     */
    async parseTwitterZip(zip, filePaths) {
        const parseTwitterJS = async (filePath, jsPrefix) => {
            if (!filePath) return [];
            try {
                let content = await zip.file(filePath).async("string");
                if (content.startsWith(jsPrefix)) {
                    content = content.substring(jsPrefix.length);
                }
                if (content.trim().endsWith(';')) {
                    content = content.trim().slice(0, -1);
                }
                return JSON.parse(content);
            } catch (err) {
                console.error(`[GDPRParser] Failed parsing Twitter JS file: ${filePath}`, err.message);
                return [];
            }
        };

        // A. Parse Bookmarks
        const bookmarkPath = filePaths.find(p => p.endsWith('data/bookmark.js'));
        if (bookmarkPath) {
            const bookmarks = await parseTwitterJS(bookmarkPath, 'window.YTD.bookmark.part0 = ');
            bookmarks.forEach(entry => {
                const tweet = entry.bookmark;
                if (tweet) {
                    this.harmonizedData.push({
                        source: 'twitter',
                        type: 'bookmark',
                        timestamp: new Date(tweet.createdAt || Date.now()).toISOString(),
                        title: `X Bookmark by @${tweet.screenName || 'user'}`,
                        content: tweet.text || '',
                        mediaUrl: tweet.mediaUrls?.[0] || null
                    });
                }
            });
        }

        // B. Parse Tweets
        const tweetsPath = filePaths.find(p => p.endsWith('data/tweets.js'));
        if (tweetsPath) {
            const tweets = await parseTwitterJS(tweetsPath, 'window.YTD.tweets.part0 = ');
            tweets.forEach(entry => {
                const tweet = entry.tweet;
                if (tweet) {
                    this.harmonizedData.push({
                        source: 'twitter',
                        type: 'post',
                        timestamp: new Date(tweet.created_at || Date.now()).toISOString(),
                        title: `Tweet id ${tweet.id}`,
                        content: tweet.full_text || '',
                        engagement: {
                            likes: tweet.favorite_count || 0,
                            retweets: tweet.retweet_count || 0
                        }
                    });
                }
            });
        }
    }

    /**
     * Parse Google Takeout archives from ZIP.
     */
    async parseGoogleTakeoutZip(zip, filePaths) {
        const keepFiles = filePaths.filter(p => p.includes('Google Keep') && p.endsWith('.json'));
        for (const noteFile of keepFiles) {
            try {
                const content = await zip.file(noteFile).async("string");
                const note = JSON.parse(content);
                if (note.title || note.textContent) {
                    this.harmonizedData.push({
                        source: 'google-keep',
                        type: 'note',
                        timestamp: new Date((note.userEditedTimestampUsec || Date.now() * 1000) / 1000).toISOString(),
                        title: note.title || 'Google Keep Note',
                        content: note.textContent || '',
                        isTrashed: note.isTrashed || false
                    });
                }
            } catch (err) {
                console.error(`[GDPRParser] Failed to parse Google Keep note: ${noteFile}`, err.message);
            }
        }
    }

    /**
     * Generic fallback for ZIP files.
     */
    async parseGenericZip(zip, filePaths) {
        const jsonFiles = filePaths.filter(p => p.endsWith('.json'));
        for (const file of jsonFiles) {
            try {
                const content = await zip.file(file).async("string");
                const data = JSON.parse(content);
                if (Array.isArray(data)) {
                    data.slice(0, 100).forEach(entry => {
                        if (entry.text || entry.content) {
                            this.harmonizedData.push({
                                source: 'generic-json',
                                type: 'entry',
                                timestamp: entry.date || entry.timestamp || new Date().toISOString(),
                                title: entry.title || 'JSON Log Entry',
                                content: entry.text || entry.content
                            });
                        }
                    });
                }
            } catch (e) {
                // Ignore non-list JSONs
            }
        }
    }
}

export default GDPRParser;
