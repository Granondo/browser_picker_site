import { defineConfig } from 'astro/config';

import db from '@astrojs/db';

export default defineConfig({
  site: 'https://granondo.github.io',
  base: '/browser_picker_site',
  integrations: [
    db({
      runtime: process.env.NODE_ENV === 'production',
      cache: true,
      seed: process.env.NODE_ENV !== 'production'
    })
  ]
})
