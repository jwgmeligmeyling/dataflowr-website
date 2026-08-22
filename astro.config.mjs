import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Canonical production origin. Update here (and in src/lib/site.ts) if the domain changes.
const SITE = 'https://dataflowr.nl';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  // `file` emits `diensten/make.html` rather than `diensten/make/index.html`.
  // The Vercel adapter restructures that into `diensten/make/index.html` in
  // its build output, so `/diensten/make` resolves through plain filesystem
  // serving; Netlify strips the extension by itself.
  build: { format: 'file' },
  /*
   * The site stays fully static; the adapter exists for the one on-demand
   * route, POST /api/subscribe (src/pages/api/subscribe.ts), which runs as a
   * Vercel serverless function. Every page keeps prerendering by default.
   *
   * With the adapter, Vercel routes from the emitted build output and ignores
   * vercel.json, so the redirects below moved here from the deleted
   * vercel.json. public/_redirects keeps the same list in Netlify format.
   */
  adapter: vercel(),
  redirects: {
    // Legacy URLs from the previous dataflowr.nl site. The MCP server
    // product was rebranded as Claire.
    '/services/premium': { status: 301, destination: '/diensten/exact-online-premium' },
    '/services/integrations': { status: 301, destination: '/diensten/integraties' },
    '/services/make': { status: 301, destination: '/diensten/make' },
    '/services/mcp': { status: 301, destination: '/claire' },
    '/services/camunda': { status: 301, destination: '/diensten/camunda' },
    '/services/rpa': { status: 301, destination: '/diensten/rpa' },
    '/services/training': { status: 301, destination: '/diensten/training' },
    '/kennisbank/premium-features-waar-u-voor-betaalt-maar-niets-mee-doet': {
      status: 301,
      destination: '/kennisbank/premium-features-waar-je-voor-betaalt-maar-niets-mee-doet',
    },
    // The legal pages moved to Dutch slugs. The bare paths stay published in
    // the Codex plugin manifest, the Copilot package and the marketplace
    // submissions.
    '/privacy': { status: 301, destination: '/privacyverklaring' },
    '/terms': { status: 301, destination: '/algemene-voorwaarden' },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'nl',
        locales: { nl: 'nl-NL', en: 'en' },
      },
      // hreflang alternates are emitted per-page in BaseLayout; the sitemap
      // integration additionally links nl/en entries for crawlers.
      // The thank-you pages after a signup are noindex and stay out.
      filter: (page) => !/\/(bedankt|thank-you)$/.test(page),
    }),
  ],
});
