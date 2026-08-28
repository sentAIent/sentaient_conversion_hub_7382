import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import { sri } from 'vite-plugin-sri3';

export default defineConfig({
  plugins: [
    react(),
    sri(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Sentaient AI Companion',
        short_name: 'Sentaient',
        description: 'Your proactive AI companion',
        theme_color: '#000000',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,glb,json}'],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        navigateFallback: '/index.html'
      }
    })
  ],
  server: {
    hmr: {
      clientPort: 5173
    },
    proxy: {
      '/icebusiness': {
        target: 'https://sentaient-icebusiness-hub.netlify.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/icebusiness/, ''),
      },
      '/dashboard': {
        target: 'https://sentaient-icebusiness-hub.netlify.app',
        changeOrigin: true,
      },
    },
  },
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      '/binaural-assets': path.resolve(__dirname, 'binaural-assets'),
      'binaural-assets': path.resolve(__dirname, 'binaural-assets'),
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    target: 'esnext',
    emptyOutDir: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        mindwave: path.resolve(__dirname, 'mindwave.html'),
        'mindwave-beta': path.resolve(__dirname, 'mindwave-beta.html'),
        'mindwave-friday': path.resolve(__dirname, 'mindwave-friday.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
          if (id.includes('node_modules/three')) {
            return 'three';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
        }
      }
    },
  },
});
