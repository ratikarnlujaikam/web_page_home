import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()], // React plugin
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // TailwindCSS plugin
        autoprefixer(), // Autoprefixer plugin
      ],
    },
  },
  
});
