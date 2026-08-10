// Brand-only Claude Design bundle builder for the DataFlowr website.
// The repo has no runnable component library (Astro, static HTML at build
// time), so this ships the brand surface instead: tokens, fonts, the shared
// class idiom from global.css, and the logo/Claire marks as standalone SVGs.
import { mkdirSync, readFileSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(root, 'ds-bundle');

rmSync(out, { recursive: true, force: true });
for (const d of ['tokens', 'fonts', 'guidelines']) mkdirSync(join(out, d), { recursive: true });

// ---- tokens/colors.css + shared classes, split out of global.css ----
const globalCss = readFileSync(join(root, 'src/styles/global.css'), 'utf8');

const rootBlock = globalCss.match(/:root \{[\s\S]*?\n\}/);
if (!rootBlock) throw new Error('could not find :root token block in global.css');
writeFileSync(join(out, 'tokens/colors.css'), `/* DataFlowr tokens — palette 0a "RGB origineel", locked. Source: src/styles/global.css */\n${rootBlock[0]}\n`);

// Everything except the :root block and the local @font-face lines (fonts.css replaces those).
const shared = globalCss
  .replace(rootBlock[0], '')
  .replace(/@font-face \{[^}]*\}\n/g, '')
  .replace(/\/\* Poppins is the local fallback[^*]*\*\/\n/, '')
  .replace(/\n{3,}/g, '\n\n');
writeFileSync(join(out, 'tokens/shared.css'), `/* DataFlowr shared class idiom. Source: src/styles/global.css (tokens + fonts split out) */\n${shared}`);

// ---- fonts ----
const poppins = [
  ['Poppins-Light.ttf', 300],
  ['Poppins-Regular.ttf', 400],
  ['Poppins-Medium.ttf', 500],
  ['Poppins-Bold.ttf', 700],
];
for (const [f] of poppins) copyFileSync(join(root, 'public/fonts', f), join(out, 'fonts', f));

let fontsCss = '/* Hanken Grotesk is the primary face (site loads it from Google Fonts; woff2 vendored here so designs are self-contained). Poppins is the repo’s local fallback. */\n';
// hanken.css is written by the download step in the shell wrapper; imported if present.
fontsCss += poppins
  .map(([f, w]) => `@font-face { font-family: 'Poppins'; src: url('${f}') format('truetype'); font-weight: ${w}; font-display: swap; }`)
  .join('\n') + '\n';
writeFileSync(join(out, 'fonts/fonts.css'), fontsCss);

// ---- styles.css entry: the @import closure is all a rendered design receives ----
writeFileSync(join(out, 'styles.css'), `/* DataFlowr brand — entry stylesheet. Rendered designs receive this file's @import closure. */
@import './fonts/hanken.css';
@import './fonts/fonts.css';
@import './tokens/colors.css';
@import './tokens/shared.css';
`);

// ---- Logo SVGs, extracted from the .astro sources (never re-drawn) ----
const logoSrc = readFileSync(join(root, 'src/components/Logo.astro'), 'utf8');
const grab = (name) => {
  const m = logoSrc.match(new RegExp(`const ${name} = '([^']+)'`));
  if (!m) throw new Error(`missing ${name} in Logo.astro`);
  return m[1];
};
const DBASE = grab('DBASE'), BOVEN = grab('BOVEN'), ONDER = grab('ONDER'), RECHTS = grab('RECHTS');
const GLYPHS = [...logoSrc.matchAll(/^  '([^']+)',$/gm)].map((m) => m[1]);
if (GLYPHS.length !== 9) throw new Error(`expected 9 wordmark glyphs, got ${GLYPHS.length}`);
const DOTS = [...logoSrc.matchAll(/\{ cx: ([\d.]+), cy: ([\d.]+), r: ([\d.]+) \}/g)].map((m) => ({ cx: m[1], cy: m[2], r: m[3] }));
if (DOTS.length !== 3) throw new Error('expected 3 dots');

// Tonal 0a gradient values, kept as var() with the precomputed hex fallbacks so
// standalone <img> use renders correctly and inline use responds to overrides.
const faces = [
  ['Boven', BOVEN, '#B1C9E5', '#6995CD'],
  ['Onder', ONDER, '#82A7D5', '#2667B7'],
  ['Rechts', RECHTS, '#729CD0', '#18549E'],
];
const logoSvg = (mode, dots) => {
  const H = 124.98, MARKW = 95.97, LOCKW = 565.31;
  const vw = mode === 'mark' ? MARKW : LOCKW;
  const y0 = dots ? 0 : 38.88;
  const id = mode + (dots ? 'd' : '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${y0} ${vw} ${H - y0}" role="img" aria-label="DataFlowr">
  <defs>
    <clipPath id="${id}c"><path d="${DBASE}"/></clipPath>
${faces.map(([k, , a, b]) => `    <linearGradient id="${id}${k}" gradientUnits="userSpaceOnUse" x1="14" y1="38.88" x2="82" y2="124.98"><stop offset="0" style="stop-color:var(--logo${k}A,${a})"/><stop offset="1" style="stop-color:var(--logo${k}B,${b})"/></linearGradient>`).join('\n')}
  </defs>
  <path d="${DBASE}" fill="var(--logoBase,#FFFFFF)"/>
  <g clip-path="url(#${id}c)">
${faces.map(([k, d]) => `    <path d="${d}" fill="url(#${id}${k})"/>`).join('\n')}
  </g>
${dots ? DOTS.map((dt, i) => `  <circle cx="${dt.cx}" cy="${dt.cy}" r="${dt.r}" fill="var(--logoDot${i + 1},#0A1E42)"/>`).join('\n') + '\n' : ''}${mode !== 'mark' ? `  <g fill="var(--logoText,#0D1B27)">\n${GLYPHS.map((g) => `    <path d="${g}"/>`).join('\n')}\n  </g>\n` : ''}</svg>\n`;
};
writeFileSync(join(out, 'guidelines/logo-lockup.svg'), logoSvg('lockup', false));
writeFileSync(join(out, 'guidelines/logo-mark.svg'), logoSvg('mark', false));
writeFileSync(join(out, 'guidelines/logo-mark-dots.svg'), logoSvg('mark', true));

// Claire mark: the .astro template is a plain SVG with a templated uid — freeze it.
const claireSrc = readFileSync(join(root, 'src/components/ClaireMark.astro'), 'utf8');
let claire = claireSrc.slice(claireSrc.indexOf('<svg'));
claire = claire
  .replace(/\s+width=\{size\}\s+height=\{size\}\s+class=\{className\}/, '')
  .replace(/\{`\$\{uid\}(\w+)`\}/g, '"claire$1"')
  .replace(/\{`url\(#\$\{uid\}(\w+)\)`\}/g, '"url(#claire$1)"')
  .replace(/<\/svg>[\s\S]*$/, '</svg>\n');
if (claire.includes('uid') || claire.includes('{')) throw new Error('ClaireMark extraction left template syntax behind');
writeFileSync(join(out, 'guidelines/claire-mark.svg'), claire);

// ---- README: conventions header (human-maintained) + generated inventory ----
const header = readFileSync(join(root, '.design-sync/conventions.md'), 'utf8');
const tokenLines = [...rootBlock[0].matchAll(/(--[\w]+): ([^;]+);/g)].map(([, n, v]) => `- \`${n}\`: \`${v.trim()}\``).join('\n');
writeFileSync(join(out, 'README.md'), `${header}

---

## Bundle inventory (generated)

- \`styles.css\` — entry; its \`@import\` closure is everything a rendered design receives.
- \`tokens/colors.css\` — all custom properties:
${tokenLines}
- \`tokens/shared.css\` — shared classes and keyframes from the site's \`global.css\`.
- \`fonts/\` — Hanken Grotesk 300–800 (woff2, primary) and Poppins 300/400/500/700 (ttf, fallback).
- \`guidelines/\` — brand marks as standalone SVGs: \`logo-lockup.svg\`, \`logo-mark.svg\`, \`logo-mark-dots.svg\`, \`claire-mark.svg\`.

Source of truth: the dataflowr-website repo (\`src/styles/global.css\`, \`src/components/Logo.astro\`, \`src/components/ClaireMark.astro\`). This bundle is brand-only — no component JS is shipped.
`);

console.log('ds-bundle built at', out);
