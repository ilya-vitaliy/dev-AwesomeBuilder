import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  // ⚡ обязательно для GitHub Pages
  base: '/dev-AwesomeBuilder/',

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  plugins: [
    tailwindcss(),
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
    FullReload(['src/partials/**/*']),
  ],
});
