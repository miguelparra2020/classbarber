import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid', // Corregido a 'hybrid'
  integrations: [react()],
  resolve: {
    alias: {
      '@': '/src', // Asegúrate de que apunte a la carpeta src
    },
  },
});
