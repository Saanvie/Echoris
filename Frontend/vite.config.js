import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    // This tells Vite to allow JSX in .js files
    babel: {
      plugins: [],
      presets: [],
    },
    include: '**/*.js',
  })],
  build: {
    chunkSizeWarningLimit: 1000, // increase limit (default is 500 KB)
  }
});
