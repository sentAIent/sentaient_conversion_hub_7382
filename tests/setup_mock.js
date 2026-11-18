// Mock browser globals for test environment
if (typeof globalThis.window === 'undefined') {
    globalThis.window = {
        Capacitor: { isNativePlatform: () => false },
        dispatchEvent: () => true,
        addEventListener: () => {},
        removeEventListener: () => {},
        showToast: () => {}
    };
}
if (typeof globalThis.document === 'undefined') {
    globalThis.document = {
        readyState: 'complete',
        addEventListener: () => {},
        removeEventListener: () => {},
        getElementById: () => null,
        querySelector: () => null,
        querySelectorAll: () => [],
        createElement: () => ({ appendChild: () => {}, style: {}, classList: { add: () => {}, remove: () => {} } }),
        body: { appendChild: () => {}, insertAdjacentHTML: () => {} }
    };
}
if (typeof globalThis.navigator === 'undefined') {
    globalThis.navigator = {
        userAgent: 'NodeTest',
        bluetooth: undefined
    };
}
if (typeof globalThis.localStorage === 'undefined') {
    const storage = new Map();
    globalThis.localStorage = {
        getItem: (k) => storage.get(k) || null,
        setItem: (k, v) => storage.set(k, String(v)),
        removeItem: (k) => storage.delete(k),
        clear: () => storage.clear()
    };
}
