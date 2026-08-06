import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical production origin. Update here (and in src/lib/site.ts) if the domain changes.
const SITE = 'https://dataflowr.nl';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  // `file` emits `diensten/make.html` rather than `diensten/make/index.html`.
  // Hosts must strip the extension themselves: Netlify does it by default,
  // Vercel needs `cleanUrls: true` (see vercel.json) or every page but `/` 404s.
  build: { format: 'file' },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'nl',
        locales: { nl: 'nl-NL', en: 'en' },
      },
      // hreflang alternates are emitted per-page in BaseLayout; the sitemap
      // integration additionally links nl/en entries for crawlers.
    }),
  ],
});
