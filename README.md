# DataFlowr website

Marketing website for DataFlowr, the boutique Exact Online Premium integration
partner. Production implementation of the Claude Design handoff (leading design:
`DataFlowr Landing v4`, palette **0a** locked, Hanken Grotesk).

Built with [Astro](https://astro.build) as a fully static site.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # static build to dist/
npm run preview   # preview the build
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/lib/site.ts` | Site constants, route table (NL/EN), shared UI strings |
| `src/data/services.ts` | Copy for the six service pages, both languages |
| `src/components/Logo.astro` | Brand logo, exact vectors, rendered statically (no JS) |
| `src/components/pages/*` | One component per page design, parameterized by `lang` |
| `src/layouts/BaseLayout.astro` | SEO head (canonical, hreflang, OG, JSON-LD), nav, footers |
| `src/scripts/home-fx.ts` | Hero neural-network canvas, parallax, scroll reveals |

## Pages

- `/` + `/en`: landing (DataFlowr Landing v4)
- `/claire` + `/en/claire`: Claire product page, interactive onboarding flow
- `/diensten/*` + `/en/services/*`: six service pages from one template
- `/over-ons` + `/en/about`: about page
- `/kennisbank/...` + `/en/resources/...`: article / content template

## i18n

Dutch is the default locale at the root; English lives under `/en` with English
slugs. Every page emits `rel=alternate hreflang` for both languages plus
`x-default` (Dutch). The language switcher in the nav links to the translated
equivalent of the current page.

## SEO / GEO

- Per-page titles, meta descriptions, canonical URLs, Open Graph + Twitter cards
- JSON-LD: Organization + WebSite on all pages; ProfessionalService (home),
  SoftwareApplication (Claire), Service + BreadcrumbList (services), Article
  (kennisbank), AboutPage (over ons)
- `sitemap-index.xml` via @astrojs/sitemap (with NL/EN alternates), `robots.txt`
- `llms.txt` for generative-engine discovery
- 301 redirects for the legacy `/services/*` URLs (`public/_redirects` for
  Netlify, `vercel.json` for Vercel; keep the one your host uses)
- The build uses `build.format: 'file'`, so pages land on disk as
  `diensten/make.html` and are linked as `/diensten/make`. Vercel only serves
  those extensionless paths with `"cleanUrls": true` in `vercel.json`. Without
  it every page except the homepage returns a 404.
- Share cards per language: `/og/og-default-nl.png` and `/og/og-default-en.png`,
  1200×630, with `og:image:alt`. Articles override the card with their own hero.
  Regenerate with `npx tsx scripts/generate-og.ts`; the script composes the card
  from the locked palette and the logo vectors, so nothing is redrawn by hand.
- The favicon set in `public/` (SVG, ICO, 96px PNG, Apple touch icon, the two
  maskable manifest icons and `site.webmanifest`) comes from
  RealFaviconGenerator and is committed as delivered. Regenerate it there from
  `favicon.svg` rather than editing the files.

## Before launch

- **Photos**: image slots (article hero, author, founder portraits, related
  posts) are dashed placeholders. Drop in licensed photos and replace the
  `.img-slot` divs with `<img>` elements including alt text.
- **Domain**: `src/lib/site.ts` and `astro.config.mjs` assume
  `https://dataflowr.nl`.
- The color-variant switcher from the prototypes was intentionally not shipped;
  palette 0a is baked into `src/styles/global.css`.
