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
});
