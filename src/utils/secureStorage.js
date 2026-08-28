// A utility to wrap localStorage with input sanitization to prevent XSS.

import DOMPurify from 'dompurify';
import { Preferences } from '@capacitor/preferences';

const sanitize = (value) => {
  if (typeof value !== 'string') return value;
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

export const secureStorage = {
  setItem: async (key, value) => {
    try {
      await Preferences.set({ key, value });
    } catch (e) {
      console.error(`Error setting Preferences key "${key}":`, e);
    }
  },
  
  getItem: async (key) => {
    try {
      const { value } = await Preferences.get({ key });
      if (value === null) return null;
      return sanitize(value);
    } catch (e) {
      console.error(`Error getting Preferences key "${key}":`, e);
      return null;
    }
  },
  
  removeItem: async (key) => {
    try {
      await Preferences.remove({ key });
    } catch (e) {
      console.error(`Error removing Preferences key "${key}":`, e);
    }
  },
  
  setJSON: async (key, obj) => {
    try {
      await Preferences.set({ key, value: JSON.stringify(obj) });
    } catch (e) {
      console.error(`Error setting JSON Preferences key "${key}":`, e);
    }
  },
  
  getJSON: async (key) => {
    try {
      const { value } = await Preferences.get({ key });
      if (value === null) return null;
      const sanitized = sanitize(value);
      return JSON.parse(sanitized);
    } catch (e) {
      console.error(`Error parsing JSON from Preferences key "${key}":`, e);
      return null;
    }
  }
};

