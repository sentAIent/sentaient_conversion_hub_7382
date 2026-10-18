import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const PROFILE_FILE = path.join(DATA_DIR, 'user_profile.json');

export class ProfileService {
  constructor() {
    this.profile = null;
    this.loaded = false;
  }

  async init() {
    if (this.loaded) return;
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      const raw = await fs.readFile(PROFILE_FILE, 'utf-8');
      this.profile = JSON.parse(raw);
    } catch (e) {
      this.profile = {
        custom_pins: [],
        saved_locations: [],
        updated_at: new Date().toISOString()
      };
      await this.persist();
    }
    this.loaded = true;
  }

  async persist() {
    try {
      const tempFile = `${PROFILE_FILE}.tmp.${Date.now()}`;
      await fs.writeFile(tempFile, JSON.stringify(this.profile, null, 2), 'utf-8');
      await fs.rename(tempFile, PROFILE_FILE);
    } catch (err) {
      console.error('[Sphinx Profile] Failed to persist profile to disk:', err);
    }
  }

  async getPins() {
    await this.init();
    return this.profile.custom_pins || [];
  }

  async savePin(pin) {
    await this.init();
    if (!pin.id) pin.id = Date.now().toString();
    if (!pin.createdAt) pin.createdAt = new Date().toISOString();

    const existingIndex = (this.profile.custom_pins || []).findIndex(p => p.id === pin.id);
    if (existingIndex >= 0) {
      this.profile.custom_pins[existingIndex] = { ...this.profile.custom_pins[existingIndex], ...pin };
    } else {
      this.profile.custom_pins = [...(this.profile.custom_pins || []), pin];
    }
    this.profile.updated_at = new Date().toISOString();
    await this.persist();
    return pin;
  }

  async deletePin(id) {
    await this.init();
    this.profile.custom_pins = (this.profile.custom_pins || []).filter(p => p.id !== id);
    this.profile.updated_at = new Date().toISOString();
    await this.persist();
    return { success: true, id };
  }

  async syncPins(pins) {
    await this.init();
    if (Array.isArray(pins)) {
      this.profile.custom_pins = pins;
      this.profile.updated_at = new Date().toISOString();
      await this.persist();
    }
    return this.profile.custom_pins;
  }
}
