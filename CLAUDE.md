# CLAUDE.md

Marketing website for DataFlowr, the Exact Online Premium integration partner.
Astro, fully static, Dutch-first with an English mirror under `/en`.

## Commands

```bash
npm install
npm run dev          # local dev server
npm run build        # static build to dist/
npm run preview      # preview the build
npm run check:copy   # typography guard, see "Copy rules"
```

## Where the copy lives

User-facing text is data, not markup. Do not hard-code a sentence into a
component; put it in the data file and render it from there.

| File | Copy it holds |
| --- | --- |
| `src/lib/site.ts` | Nav, footer, breadcrumbs, shared UI strings, route table |
| `src/data/services.ts` | The six service pages, NL + EN |
| `src/data/articles.ts` | Knowledge-base articles, NL + EN |
| `src/data/legal.ts` | Privacy statement and terms of service, NL + EN |
| `src/components/pages/*.astro` | Page-specific copy, parameterised by `lang` |
| `public/llms.txt` | Machine-readable summary for generative engines |
| `scripts/*.spec.ts` | Demo copy that gets rendered into the article screenshots |
| `scripts/generate-og.ts` | The headline and kicker rendered into the share cards |

Every string exists twice, `nl` and `en`. A copy change that lands in one
language and not the other is an unfinished change.

## Copy rules

The readers are Dutch finance professionals: controllers, CFOs, accountants.
They read the site to judge whether we understand their work. Copy that reads
as generated, or as marketing, costs us that judgement before they reach the
argument.

### Never use an em dash

The em dash (U+2014, the long dash) must not appear anywhere in this
repository. Not in page copy, not in article text, not in alt text or meta
descriptions, not in code comments, and not in the demo copy inside
`scripts/*.spec.ts` that ends up rendered into published screenshots. It is the
clearest tell of AI-written text, and this audience notices it.

This file deliberately never types the character either, so that the guard
below can cover every file without exceptions.

Write the sentence the way a person would instead:

| Where an em dash wants to go | Use instead |
| --- | --- |
| An aside that explains what came before | A colon |
| An afterthought tacked onto the sentence | A full stop and a new sentence |
| A parenthetical set off by two dashes | Commas, or split into two sentences |
| A range between two numbers or dates | An en dash: `2020–2024` |

Punctuation that is house style and stays: the en dash in ranges (`jan–jul
2026`, `1440×810`), the middle dot as a separator (`Co-founder · Solution
Architect`), curly apostrophes and quotes in body text (`’`, `“ ”`), and `→` in
link labels.

### Register

- Dutch is formal: `u`, never `je`. English keeps the same distance without
  going stiff.
- Short declarative sentences. A sentence that needs a dash to hold together
  wants to be two sentences.
- Be concrete where a marketer would be enthusiastic. "€ 4.812,66 op
  kruisposten per 31 juli" tells a controller more than "volledig inzicht".
- Claim only what the product does today, and name the limits plainly. The
  credibility of the whole site rests on that.
- No hype words: `naadloos`, `krachtig`, `baanbrekend`, `ontzorgen`,
  `state-of-the-art`, `seamless`, `unlock`, `empower`, `game-changer`.
- No AI cadence either: "niet alleen X, maar ook Y", stacked rule-of-three
  adjectives, openers about a fast-changing world, and closing paragraphs that
  restate the opening.
- Locale conventions: amounts are `€ 4.812,66` in Dutch and `€4,812.66` in
  English; dates are `31 juli` and `31 July`.

### Before committing copy

```bash
npm run check:copy
```

It greps the tracked text for U+2014 and fails on a hit. Green means the
typography rule holds. The register rules above still need a read.

## Design locks

- Palette 0a "RGB origineel (12 juni)" is locked in `src/styles/global.css`.
  Those custom properties are the only source of colour; do not put hex values
  in components.
- The logo vectors in `src/components/Logo.astro` are traced exactly from the
  brand PDF. Do not redraw or tidy the paths.
- Hanken Grotesk (Google Fonts), with the local Poppins in `public/fonts` as
  the fallback.
- Text sizes are written in `rem`, never in pixels, so they all measure against
  the root font size in `src/styles/global.css`. 1rem is the 16px the design was
  drawn at, so a 14.5px size is `0.90625rem`. `--text-scale` there resizes the
  whole site at once; it holds up to `1.1`, past which the desktop nav runs out
  of room just above the width where it collapses.
- The colour-variant switcher from the prototypes was deliberately not shipped.

## i18n and routing

- `routes` in `src/lib/site.ts` is the canonical route table. Add a page there
  first, in both languages, then build the page around it. Nav, hreflang
  alternates and the language switcher all read from it.
- Dutch sits at the root with Dutch slugs; English lives under `/en` with
  English slugs. Slugs are translated, not copied.
- The build uses `build.format: 'file'`, so Vercel needs `"cleanUrls": true`
  in `vercel.json` or every page except the homepage 404s.

## Article screenshots

The images in `public/kennisbank/` are captured from the Claire app repo, not
from this one. The capture specs live in `scripts/` and each carries its own
run instructions in the file header; they must be copied into the Claire repo
and run with Playwright there.

The demo copy staged in those specs is published copy: it is rendered into the
images on the live site. The copy rules apply to it in full, and changing it
means re-capturing the images, or the screenshots and the source drift apart.

## Share images

`public/og/` is generated, never edited:

```bash
npm i --no-save playwright && npx tsx scripts/generate-og.ts
```

It writes the two default cards (`og-default-nl.png`, `og-default-en.png`) and
the Organization logo used in the JSON-LD (`logo-mark.png`). The card reads its
palette from the `:root` block in `global.css` and its logo paths from
`Logo.astro`, so a design change lands here by re-running the script. Do not put
a hex value or a traced path in the generator, and do not retouch the PNGs: the
next run overwrites them.

The headline on the card is published copy in both languages. Change it in
`CARDS` at the top of the script, re-run, and commit the PNGs with the copy.

## Favicons

The icon set in `public/` is the exception to the generated-here rule. These
seven files come from RealFaviconGenerator and are committed as delivered:

```
favicon.svg  favicon.ico  favicon-96x96.png  apple-touch-icon.png
web-app-manifest-192x192.png  web-app-manifest-512x512.png  site.webmanifest
```

Do not hand-edit them and do not add a script that rewrites them. To change the
mark, feed `favicon.svg` back through realfavicongenerator.net and commit the
new set whole, then check the filenames still match the `<link>` tags in
`BaseLayout.astro`. `favicon.svg` carries the same traced paths and palette
gradients as `Logo.astro`, so the design locks above apply to it too.
