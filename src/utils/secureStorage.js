// A utility to wrap localStorage with input sanitization to prevent XSS.

const sanitize = (value) => {
  if (typeof value !== 'string') return value;
  // Basic sanitization to prevent script tags and dangerous attributes
  return value
    .replace(/<script[^>]*?>.*?<\/script>/gi, '')
    .replace(/<[\/\!]*?[^<>]*?>/gi, '')
    .replace(/<style[^>]*?>.*?<\/style>/gi, '')
    .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
};

export const secureStorage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(`Error setting localStorage key "${key}":`, e);
    }
  },
  
  getItem: (key) => {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;
      return sanitize(value);
    } catch (e) {
      console.error(`Error getting localStorage key "${key}":`, e);
      return null;
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing localStorage key "${key}":`, e);
    }
  },
  
  setJSON: (key, obj) => {
    try {
      localStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
      console.error(`Error setting JSON localStorage key "${key}":`, e);
    }
  },
  
  getJSON: (key) => {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;
      const sanitized = sanitize(value);
      return JSON.parse(sanitized);
    } catch (e) {
      console.error(`Error parsing JSON from localStorage key "${key}":`, e);
      return null;
    }
  }
};
