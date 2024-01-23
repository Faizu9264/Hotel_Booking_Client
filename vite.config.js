import commonjs from 'vite-plugin-commonjs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), commonjs()],
  server: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit:1024*1500,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
});
