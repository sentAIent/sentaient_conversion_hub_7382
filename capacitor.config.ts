import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sentaient.mindwave',
  appName: 'MindWave',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    BackgroundMode: {
      enable: true,
    },
    MediaSession: {
      enable: true,
    }
  }
};

export default config;
