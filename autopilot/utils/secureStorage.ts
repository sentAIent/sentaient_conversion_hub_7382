export const sanitize = (value: string | null): string | null => {
  if (typeof value !== 'string') return value;
  return value
    .replace(/<script[^>]*?>.*?<\/script>/gi, '')
    .replace(/<[\/\!]*?[^<>]*?>/gi, '')
    .replace(/<style[^>]*?>.*?<\/style>/gi, '')
    .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
};

export const secureStorage = {
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(`Error setting localStorage key "${key}":`, e);
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      const value = localStorage.getItem(key);
      return sanitize(value);
    } catch (e) {
      console.error(`Error getting localStorage key "${key}":`, e);
      return null;
    }
  },
  
  setJSON: (key: string, obj: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
      console.error(`Error setting JSON localStorage key "${key}":`, e);
    }
  },
  
  getJSON: (key: string): any => {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
      const sanitized = sanitize(value);
      return JSON.parse(sanitized || '');
    } catch (e) {
      console.error(`Error parsing JSON from localStorage key "${key}":`, e);
      return null;
    }
  }
};
