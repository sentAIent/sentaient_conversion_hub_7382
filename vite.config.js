import { defineConfig } from "vite";
import path from "path";
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
    },
  },
});
