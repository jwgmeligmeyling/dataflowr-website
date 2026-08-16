# design-sync notes — dataflowr-website

- This repo is an Astro static marketing site, **not** a component library: no Storybook, no dist of runnable components. `.astro` components compile to static HTML, so the standard converter (compiled `_ds_bundle.js`) does not apply. The user chose a **brand-only sync** (2026-08-10).
- Build path: `node scripts/ds-brand-build.mjs && node scripts/ds-vendor-hanken.mjs` → `ds-bundle/` (git-ignored). No `_ds_bundle.js` and no `_ds_sync.json` are produced; every re-sync rebuilds and re-uploads the whole (small, ~1 MB) bundle.
- `ds-brand-build.mjs` extracts tokens and shared classes by splitting `src/styles/global.css` (matches the `:root {}` block and `@font-face` lines — if global.css gains a second `:root` block or nested braces in @font-face, revisit the regexes), and extracts the logo/Claire SVGs from the `.astro` sources by regex (asserts 9 wordmark glyphs, 3 dots, no leftover template syntax).
- Hanken Grotesk (primary face) is Google-hosted on the site; `ds-vendor-hanken.mjs` vendors latin-subset woff2 (weights 300–800) at build time so rendered designs are self-contained. Needs network on rebuild.
- SVG fidelity was verified visually (qlmanage thumbnails) on first sync: lockup, mark+dots, and Claire mark all render correctly.
- Existing projects "DataFlowr UI" / "Copy of DataFlowr UI" predate this sync and are unrelated to it — do not touch them.
