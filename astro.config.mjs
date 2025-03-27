import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://granondo.github.io',
  base: '/browser-picker-site',
  build: {
    assets: '_assets',
    inlineStylesheets: 'never'
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  }
});


