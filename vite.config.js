import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        interstellar: path.resolve(__dirname, 'src/pages/interstellar/index.html'),
      },
    },
  },
});
