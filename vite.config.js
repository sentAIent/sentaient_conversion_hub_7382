import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/icebreaker': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/icebreaker/, ''),
      },
      '/_expo': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/icebusiness': {
        target: 'http://localhost:3000',
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
          if (id.includes('binaural-assets/js/vendor/three.module.js')) {
            return 'three';
          }
        }
      }
    },
  },
});
