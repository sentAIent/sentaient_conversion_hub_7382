const fs = require('fs');
const file = './public/interstellar-game/script.js';
let content = fs.readFileSync(file, 'utf8');

const helper = `
// --- SAFE STORAGE HELPERS ---
const safeStorage = {
    getItem: function(key) {
        try { return localStorage.getItem(key); }
        catch (e) { return window.__fallbackStorage ? window.__fallbackStorage[key] : null; }
    },
    setItem: function(key, value) {
        try { localStorage.setItem(key, value); }
        catch (e) {
            if (!window.__fallbackStorage) window.__fallbackStorage = {};
            window.__fallbackStorage[key] = value;
        }
    },
    removeItem: function(key) {
        try { localStorage.removeItem(key); }
        catch (e) { if (window.__fallbackStorage) delete window.__fallbackStorage[key]; }
    },
    key: function(index) {
        try { return localStorage.key(index); }
        catch (e) { return Object.keys(window.__fallbackStorage || {})[index]; }
    },
    get length() {
        try { return localStorage.length; }
        catch (e) { return Object.keys(window.__fallbackStorage || {}).length; }
    }
};
`;

// Insert helper at the very beginning of the script
content = helper + '\n' + content;

// Replace all localStorage.* with safeStorage.*
// Need to be careful about not replacing it inside the helper itself.
content = content.replace(/localStorage\.getItem/g, 'safeStorage.getItem');
content = content.replace(/localStorage\.setItem/g, 'safeStorage.setItem');
content = content.replace(/localStorage\.removeItem/g, 'safeStorage.removeItem');
content = content.replace(/localStorage\.key/g, 'safeStorage.key');
content = content.replace(/localStorage\.length/g, 'safeStorage.length');

// Fix the helper itself to use localStorage
content = content.replace(/safeStorage\.getItem\(key\); }/, 'localStorage.getItem(key); }');
content = content.replace(/safeStorage\.setItem\(key, value\); }/, 'localStorage.setItem(key, value); }');
content = content.replace(/safeStorage\.removeItem\(key\); }/, 'localStorage.removeItem(key); }');
content = content.replace(/safeStorage\.key\(index\); }/, 'localStorage.key(index); }');
content = content.replace(/safeStorage\.length; }/, 'localStorage.length; }');

fs.writeFileSync(file, content);
console.log("Successfully replaced localStorage with safeStorage.");
