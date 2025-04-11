import { defineConfig } from 'astro/config';

import db from '@astrojs/db';

export default defineConfig({
  site: 'https://granondo.github.io',

  // Note the underscore, not hyphen
  base: '/browser_picker_site',

  integrations: [db()]
})