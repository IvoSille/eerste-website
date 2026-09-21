// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://go.crystalhelder.nl',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/bedankt/') &&
        !page.includes('/bekijken/') &&
        !page.includes('/evaluatie-jpie/') &&
        !page.includes('/dashboard/') &&
        // Korte sales page /thuiskomen/: alleen per WhatsApp, nooit vindbaar.
        // Exacte match, zodat de lange pagina (/thuiskomen-in-je-vrouwenlijf/) wel in de sitemap blijft.
        new URL(page).pathname !== '/thuiskomen/' &&
        !page.includes('/de-taal-van-je-lichaam/e-book/'),
    }),
  ],
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});