/**
 * Regenerates the social share cards in public/og/.
 *
 *   npm i --no-save playwright && npx tsx scripts/generate-og.ts
 *
 * Writes public/og/og-default-nl.png, public/og/og-default-en.png (1200x630,
 * the aspect LinkedIn, X, Slack and WhatsApp all unfurl) and public/og/
 * logo-mark.png (512x512, the Organization logo in the JSON-LD).
 *
 * This runs by hand, so playwright stays out of package.json: Vercel installs
 * devDependencies on every build and none of this happens at build time.
 *
 * Nothing here restates the design. The card is composed from the same three
 * locked sources the site renders from, so a palette or logo change lands here
 * by re-running the script and never by editing a hex value:
 *
 *   - the palette comes out of the `:root` block in src/styles/global.css
 *   - the logo vectors come out of src/components/Logo.astro
 *   - Hanken Grotesk is pulled from Google Fonts and inlined, so the render
 *     cannot silently fall back to a system face
 *
 * The copy lives in CARDS below. It is published copy: the rules in CLAUDE.md
 * apply to it, and both languages have to say the same thing.
 *
 * Rendered at 2x and downscaled in linear light (scripts/lib/raster.ts). The
 * card is mostly flat colour behind a blurred glow, and Chromium's 1x output
 * bands visibly across that gradient where the supersampled one does not.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { decodePng, encodePng, resize } from "./lib/raster.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = resolve(root, "public");

const W = 1200;
const H = 630;
const SCALE = 2;
const MARK_SIZE = 512;

// ------------------------------------------------------------------- copy

interface Card {
  file: string;
  /** Kicker above the headline, in the shape of the site's .eyebrow. */
  eyebrow: string;
  /**
   * Headline, split so the last words can carry the accent colour. The line
   * break is written into the copy rather than left to the text engine: the
   * two languages are different lengths and only one break reads well in each.
   */
  headline: [string, string];
  /** Footer row, right-hand side: what we actually do. */
  meta: string;
}

const CARDS: Card[] = [
  {
    file: "og-default-nl.png",
    eyebrow: "Exact Online Premium · Integratiepartner",
    headline: ["Financiële processen\ndie ", "stromen."],
    meta: "Integraties · Workflow-orkestratie · RPA · Claire",
  },
  {
    file: "og-default-en.png",
    eyebrow: "Exact Online Premium · Integration partner",
    headline: ["Financial processes\nthat ", "flow."],
    meta: "Integrations · Workflow orchestration · RPA · Claire",
  },
];

const DOMAIN = "dataflowr.nl";

// --------------------------------------------------- locked design sources

/** The `:root` custom properties from global.css, verbatim. */
function palette(): string {
  const css = readFileSync(resolve(root, "src/styles/global.css"), "utf8");
  const block = css.match(/:root\s*\{([\s\S]*?)\}/);
  if (!block) throw new Error("no :root block in src/styles/global.css");
  return block[1].trim();
}

/**
 * The logo paths from Logo.astro. Parsed rather than copied: CLAUDE.md locks
 * those vectors, and a second hand-maintained copy is exactly how a lock drifts.
 */
function logoPaths() {
  const src = readFileSync(resolve(root, "src/components/Logo.astro"), "utf8");
  const one = (name: string) => {
    const m = src.match(new RegExp(`const ${name} = '([^']+)'`));
    if (!m) throw new Error(`${name} not found in src/components/Logo.astro`);
    return m[1];
  };
  const glyphBlock = src.match(/const GLYPHS = \[([\s\S]*?)\n\];/);
  if (!glyphBlock) throw new Error("GLYPHS not found in src/components/Logo.astro");
  const glyphs = [...glyphBlock[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
  if (glyphs.length !== 9) throw new Error(`expected 9 glyphs (DataFlowr), parsed ${glyphs.length}`);
  return { base: one("DBASE"), boven: one("BOVEN"), onder: one("ONDER"), rechts: one("RECHTS"), glyphs };
}

const LOGO = logoPaths();
const LOGO_H = 86.1; // 124.98 - 38.88, the lockup box without the dots
const LOCKUP_W = 565.31;
const MARK_W = 95.97;

/** Same construction as Logo.astro: faces clipped to the D, filled with var()s. */
function logoSvg(mode: "lockup" | "mark", height: number, uid: string): string {
  const vw = mode === "mark" ? MARK_W : LOCKUP_W;
  const faces = [
    ["Boven", LOGO.boven],
    ["Onder", LOGO.onder],
    ["Rechts", LOGO.rechts],
  ] as const;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 38.88 ${vw} ${LOGO_H}"
    width="${(height * vw) / LOGO_H}" height="${height}" style="display:block">
    <defs>
      <clipPath id="${uid}c"><path d="${LOGO.base}"/></clipPath>
      ${faces
        .map(
          ([key]) => `<linearGradient id="${uid}${key}" gradientUnits="userSpaceOnUse" x1="14" y1="38.88" x2="82" y2="124.98">
        <stop offset="0" style="stop-color:var(--logo${key}A)"/>
        <stop offset="1" style="stop-color:var(--logo${key}B)"/>
      </linearGradient>`,
        )
        .join("")}
    </defs>
    <path d="${LOGO.base}" fill="var(--logoBase)"/>
    <g clip-path="url(#${uid}c)">
      ${faces.map(([key, d]) => `<path d="${d}" fill="url(#${uid}${key})"/>`).join("")}
    </g>
    ${mode === "lockup" ? `<g fill="var(--logoText)">${LOGO.glyphs.map((g) => `<path d="${g}"/>`).join("")}</g>` : ""}
  </svg>`;
}

// -------------------------------------------------------------------- font

/**
 * Hanken Grotesk, latin subset only, inlined as data URIs. Letting the page
 * link to Google Fonts would render whatever the machine happens to have when
 * the request is slow or blocked, and the card would ship in the wrong face
 * without anyone noticing.
 */
async function fontFaces(weights: number[]): Promise<string> {
  const url = `https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@${weights.join(";")}&display=swap`;
  const res = await fetch(url, {
    // Google serves woff2 only to browsers that advertise support.
    headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36" },
  });
  if (!res.ok) throw new Error(`Google Fonts returned ${res.status}; this script needs network access`);
  const css = await res.text();

  const faces: string[] = [];
  for (const block of css.split("@font-face").slice(1)) {
    if (!/unicode-range:\s*U\+0000-00FF/.test(block)) continue; // latin only
    const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
    const src = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    if (!weight || !src) continue;
    const woff2 = Buffer.from(await (await fetch(src)).arrayBuffer());
    faces.push(
      `@font-face{font-family:'Hanken Grotesk';font-style:normal;font-weight:${weight};` +
        `src:url(data:font/woff2;base64,${woff2.toString("base64")}) format('woff2')}`,
    );
  }
  if (faces.length !== weights.length) {
    throw new Error(`inlined ${faces.length} of ${weights.length} weights`);
  }
  return faces.join("\n");
}

// ------------------------------------------------------------ node fabric

/**
 * A still of the hero's neural network: nodes on a sphere shell, edges between
 * the closest pairs, projected the way src/scripts/home-fx.ts projects them.
 * Seeded, so re-running the script does not reshuffle the card.
 */
function fabric(): string {
  let seed = 0x9e3779b9;
  const rnd = (a: number, b: number) => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return a + (((t ^ (t >>> 14)) >>> 0) / 4294967296) * (b - a);
  };

  const N = 96;
  const nodes: { p: [number, number, number]; r: number; col: string }[] = [];
  for (let i = 0; i < N; i++) {
    let x = 0, y = 0, z = 0, L = 0;
    do {
      x = rnd(-1, 1); y = rnd(-1, 1); z = rnd(-1, 1);
      L = Math.sqrt(x * x + y * y + z * z);
    } while (L < 0.3 || L > 1);
    const sh = 0.68 + 0.32 * Math.sqrt(L);
    x = (x / L) * sh; y = (y / L) * sh; z = (z / L) * sh;
    y *= 0.78; z *= 1.24;
    if (Math.abs(x) < 0.13) x += (x >= 0 ? 1 : -1) * 0.13;
    y -= 0.07 * Math.cos(z * 2.2);
    nodes.push({ p: [x, y, z], r: rnd(1.3, 3.4), col: i % 6 === 2 ? "pos" : i % 3 === 0 ? "bg" : "hl" });
  }

  const cand: [number, number, number][] = [];
  for (let a = 0; a < N; a++) {
    for (let b = a + 1; b < N; b++) {
      const A = nodes[a].p, B = nodes[b].p;
      const d2 = (A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2 + (A[2] - B[2]) ** 2;
      if (d2 < 0.17) cand.push([d2, a, b]);
    }
  }
  cand.sort((u, v) => u[0] - v[0]);
  const edges = cand.slice(0, 190).map((c) => [c[1], c[2]] as [number, number]);

  const cx = W * 0.76, cy = H * 0.44, SC = Math.min(W * 0.5, H) * 0.52, F = 5;
  const rot = 0.62, tilt = -0.16;
  const cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);
  const pts = nodes.map((nd) => {
    const [px, py, pz] = nd.p;
    const x1 = px * cr + pz * sr;
    const z1 = -px * sr + pz * cr;
    const y2 = py * ct - z1 * st;
    const z2 = py * st + z1 * ct;
    const s = F / (F + z2 * 1.6);
    return { nd, s, x: cx + x1 * s * SC, y: cy + y2 * s * SC, near: Math.max(0, Math.min(1, (1 - z2 / 1.35) / 2)) };
  });

  // Heavier than the live canvas draws them: at the width a feed thumbnail
  // gets, the hero's 0.6px edges disappear entirely.
  const lines = edges.map(([a, b]) => {
    const A = pts[a], B = pts[b];
    const o = (0.05 + 0.17 * ((A.near + B.near) / 2)).toFixed(3);
    return `<line x1="${A.x.toFixed(1)}" y1="${A.y.toFixed(1)}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}" stroke="var(--hl)" stroke-opacity="${o}" stroke-width="1.1"/>`;
  });
  const dots = pts.map((P) => {
    const fill = P.nd.col === "pos" ? "var(--pos)" : P.nd.col === "bg" ? "var(--bg)" : "var(--hl)";
    const o = (0.22 + 0.55 * P.near).toFixed(3);
    return `<circle cx="${P.x.toFixed(1)}" cy="${P.y.toFixed(1)}" r="${(P.nd.r * P.s).toFixed(2)}" fill="${fill}" fill-opacity="${o}"/>`;
  });
  return `<svg class="net" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${lines.join("")}${dots.join("")}</svg>`;
}

// -------------------------------------------------------------------- card

function cardHtml(card: Card, css: string, fonts: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts}
:root{${css}}
*{box-sizing:border-box;margin:0}
html,body{background:var(--brand)}
body{width:${W}px;height:${H}px;font-family:'Hanken Grotesk',system-ui,sans-serif;-webkit-font-smoothing:antialiased}

.card{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:var(--brand);color:var(--bg)}

/* Same backdrop as the hero: the mark blurred into a glow, the network over
   it, then a shade that keeps the left column readable. */
.nebula{position:absolute;right:-190px;top:-300px;line-height:0;filter:blur(120px) saturate(1.1);opacity:.5;--logoBase:transparent}
.net{position:absolute;inset:0;width:100%;height:100%}
.shade{position:absolute;inset:0;background:linear-gradient(97deg,color-mix(in srgb,var(--brand) 92%,transparent) 22%,color-mix(in srgb,var(--brand) 40%,transparent) 56%,transparent 78%)}
.vignette{position:absolute;inset:0;background:linear-gradient(0deg,color-mix(in srgb,var(--brand) 70%,transparent) 0%,transparent 38%)}

.inner{position:relative;height:100%;padding:64px 72px 58px;display:flex;flex-direction:column}
.lockup{--logoText:var(--bg)}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:14px}

.eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:26px;font-size:17px;font-weight:500;
  letter-spacing:.22em;text-transform:uppercase;color:var(--pos)}
.eyebrow::before{content:'';width:40px;height:2px;background:currentColor}

h1{white-space:pre-line;font-size:66px;line-height:1.06;font-weight:700;letter-spacing:-.035em}
h1 span{color:var(--pos)}

.foot{display:flex;align-items:baseline;justify-content:space-between;gap:24px;
  padding-top:26px;border-top:1px solid color-mix(in srgb,var(--bg) 16%,transparent)}
.url{font-size:20px;font-weight:600;letter-spacing:-.01em;color:var(--bg)}
.meta{font-size:16px;font-weight:500;color:color-mix(in srgb,var(--bg) 58%,transparent)}
</style></head><body>
<div class="card">
  <div class="nebula">${logoSvg("mark", 900, "neb")}</div>
  ${fabric()}
  <div class="shade"></div>
  <div class="vignette"></div>
  <div class="inner">
    <div class="lockup">${logoSvg("lockup", 66, "lock")}</div>
    <div class="mid">
      <p class="eyebrow">${card.eyebrow}</p>
      <h1>${card.headline[0]}<span>${card.headline[1]}</span></h1>
    </div>
    <div class="foot">
      <span class="url">${DOMAIN}</span>
      <span class="meta">${card.meta}</span>
    </div>
  </div>
</div>
</body></html>`;
}

/**
 * The Organization logo in the JSON-LD, which is what Google may show next to
 * the site in search. Square, on brand, and with the mark inset: a logo that
 * runs off its own canvas reads as a broken crop wherever it is scaled down.
 */
function markHtml(css: string): string {
  const S = MARK_SIZE;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
:root{${css}}
*{box-sizing:border-box;margin:0}
body{width:${S}px;height:${S}px;background:transparent}
.tile{width:${S}px;height:${S}px;border-radius:${Math.round(S * 0.22)}px;background:var(--brand);
  display:grid;place-items:center}
</style></head><body>
<div class="tile">${logoSvg("mark", Math.round(S * 0.52), "mk")}</div>
</body></html>`;
}

// -------------------------------------------------------------------- main

const css = palette();
const fonts = await fontFaces([500, 600, 700]);

const browser = await chromium.launch(
  process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {},
);

async function shoot(html: string, width: number, height: number, out: string) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: SCALE,
  });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const master = decodePng(await page.screenshot({ omitBackground: true }));
  await page.close();
  const img = resize(master, width, height);
  writeFileSync(out, encodePng(img));
  return img;
}

for (const card of CARDS) {
  const out = resolve(publicDir, "og", card.file);
  await shoot(cardHtml(card, css, fonts), W, H, out);
  console.log(`og/${card.file}  ${W}x${H}`);
}
await shoot(markHtml(css), MARK_SIZE, MARK_SIZE, resolve(publicDir, "og", "logo-mark.png"));
console.log(`og/logo-mark.png  ${MARK_SIZE}x${MARK_SIZE}`);

await browser.close();
