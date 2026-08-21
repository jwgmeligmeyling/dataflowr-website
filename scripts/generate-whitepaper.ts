/**
 * Renders the whitepaper PDFs behind the download form on /whitepaper:
 *
 *   npm i --no-save playwright && npx tsx scripts/generate-whitepaper.ts
 *
 * Writes public/downloads/dataflowr-claire-whitepaper-nl.pdf and -en.pdf
 * (A4, fixed pagination). Runs by hand, like scripts/generate-og.ts, so
 * playwright stays out of package.json.
 *
 * The copy lives in scripts/lib/whitepaper-copy.ts and is published copy.
 * Nothing here restates the design: the palette comes out of the `:root`
 * block in src/styles/global.css, the logo vectors out of
 * src/components/Logo.astro, and Hanken Grotesk is inlined from Google
 * Fonts, exactly as the share-card generator does.
 *
 * Pagination is authored: each entry in WpDoc.pages is one A4 sheet, plus
 * the generated cover, contents, about and back-cover sheets. The script
 * measures every sheet after layout and fails when content overflows its
 * page, so a copy change that no longer fits breaks the build instead of
 * clipping silently.
 */
import { chromium } from "playwright";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { WHITEPAPERS, type WpBlock, type WpDoc } from "./lib/whitepaper-copy.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public", "downloads");

/** The only strings that live here rather than in whitepaper-copy.ts. */
const UI = {
  nl: { chapter: "Hoofdstuk", page: "Pagina" },
  en: { chapter: "Chapter", page: "Page" },
} as const;

// --------------------------------------------------- locked design sources

/** The `:root` custom properties from global.css, verbatim. */
function palette(): string {
  const css = readFileSync(resolve(root, "src/styles/global.css"), "utf8");
  const block = css.match(/:root\s*\{([\s\S]*?)\}/);
  if (!block) throw new Error("no :root block in src/styles/global.css");
  return block[1].trim();
}

/** The logo paths from Logo.astro, parsed rather than copied (see CLAUDE.md). */
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

/** Hanken Grotesk, latin subset, inlined as data URIs (as in generate-og.ts). */
async function fontFaces(weights: number[]): Promise<string> {
  const url = `https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@${weights.join(";")}&display=swap`;
  const res = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36" },
  });
  if (!res.ok) throw new Error(`Google Fonts returned ${res.status}; this script needs network access`);
  const css = await res.text();

  const faces: string[] = [];
  for (const block of css.split("@font-face").slice(1)) {
    if (!/unicode-range:\s*U\+0000-00FF/.test(block)) continue;
    const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
    const src = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    if (!weight || !src) continue;
    const woff2 = Buffer.from(await (await fetch(src)).arrayBuffer());
    faces.push(
      `@font-face{font-family:'Hanken Grotesk';font-style:normal;font-weight:${weight};` +
        `src:url(data:font/woff2;base64,${woff2.toString("base64")}) format('woff2')}`,
    );
  }
  if (faces.length !== weights.length) throw new Error(`inlined ${faces.length} of ${weights.length} weights`);
  return faces.join("\n");
}

/** The founder photos on the about page, inlined. */
function photo(file: string): string {
  const data = readFileSync(resolve(root, "src/assets", file));
  return `data:image/jpeg;base64,${data.toString("base64")}`;
}

// ------------------------------------------------------------------ render

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function renderBlock(block: WpBlock): string {
  switch (block.type) {
    case "p":
      return `<p>${esc(block.text)}</p>`;
    case "h3":
      return `<h3>${esc(block.text)}</h3>`;
    case "quote":
      return `<blockquote><p>${esc(block.text)}</p></blockquote>`;
    case "ol":
      return `<ol>${block.items.map((i) => `<li><strong>${esc(i.strong)}</strong>${esc(i.rest)}</li>`).join("")}</ol>`;
    case "ul":
      return `<ul>${block.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    case "steps":
      return `<div class="steps">${block.items
        .map(
          (s) => `<div class="step"><p class="step-kicker">${esc(s.kicker)}</p><p class="step-title">${esc(s.title)}</p><p class="step-body">${esc(s.body)}</p></div>`,
        )
        .join("")}</div>`;
    case "table": {
      const align = block.align ?? block.cols.map(() => "left" as const);
      const head = block.cols.map((c, i) => `<th class="al-${align[i]}">${esc(c)}</th>`).join("");
      const rows = block.rows
        .map((r) => `<tr>${r.map((c, i) => `<td class="al-${align[i]}">${esc(c)}</td>`).join("")}</tr>`)
        .join("");
      const note = block.note ? `<p class="tbl-note">${esc(block.note)}</p>` : "";
      return `<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>${note}`;
    }
    case "note":
      return `<p class="side-note">${esc(block.text)}</p>`;
  }
}

function docHtml(doc: WpDoc, css: string, fonts: string): string {
  const ui = UI[doc.lang];
  // PDF page numbers: cover 1, contents 2, content pages from 3.
  const chapterEntries = doc.pages
    .map((page, i) => ({ page, pdfPage: i + 3 }))
    .filter((e) => e.page.chapter)
    .map((e) => ({ num: e.page.chapter!.num, title: e.page.chapter!.title, pdfPage: e.pdfPage }));
  const aboutPage = doc.pages.length + 3;

  const contentSheets = doc.pages
    .map((page, i) => {
      const opener = page.chapter
        ? `<p class="ch-kicker">${ui.chapter} ${page.chapter.num}</p><h2>${esc(page.chapter.title)}</h2>`
        : "";
      return sheet(
        `${opener}${page.blocks.map(renderBlock).join("")}`,
        `${i + 3}`,
        doc.footer,
      );
    })
    .join("");

  const aboutSheet = sheet(
    `<p class="ch-kicker">${esc(doc.about.title)}</p>
     <h2>DataFlowr</h2>
     ${doc.about.blocks.map(renderBlock).join("")}
     <div class="founders">
       <img src="${photo("daan.jpeg")}" alt="">
       <img src="${photo("jan-willem.jpeg")}" alt="">
     </div>
     <div class="contact">${doc.about.contact.map((c) => `<span>${esc(c)}</span>`).join('<span class="dot">·</span>')}</div>
     <p class="side-note">${esc(doc.about.company)}</p>`,
    `${aboutPage}`,
    doc.footer,
  );

  return `<!doctype html><html lang="${doc.lang === "nl" ? "nl-NL" : "en"}"><head><meta charset="utf-8">
<title>${esc(doc.cover.titlePre + doc.cover.titleAccent + doc.cover.titlePost)}</title>
<style>
${fonts}
:root{${css}}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff}
body{font-family:'Hanken Grotesk','Poppins',system-ui,sans-serif;color:var(--brand);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
@page{size:210mm 297mm;margin:0}

.sheet{position:relative;width:210mm;height:297mm;overflow:hidden;background:#fff;page-break-after:always}
.sheet:last-child{page-break-after:auto}
.content{padding:18mm 20mm 24mm;font-size:10.5pt;line-height:1.62}
.pfoot{position:absolute;left:20mm;right:20mm;bottom:9mm;display:flex;justify-content:space-between;
  font-size:7.5pt;letter-spacing:.04em;color:var(--muted);border-top:1px solid var(--line);padding-top:3mm}

.ch-kicker{display:flex;align-items:center;gap:10px;margin-bottom:5mm;font-size:9pt;font-weight:500;
  letter-spacing:.22em;text-transform:uppercase;color:var(--hl)}
.ch-kicker::before{content:'';width:26px;height:2px;background:currentColor}
h2{font-size:21pt;line-height:1.12;font-weight:700;letter-spacing:-.03em;margin-bottom:6mm;max-width:150mm;text-wrap:balance}
h3{font-size:12.5pt;font-weight:700;letter-spacing:-.015em;margin:6.5mm 0 2.5mm}
p{margin-bottom:3.4mm;max-width:158mm;text-wrap:pretty}
blockquote{margin:5mm 0;padding:6mm 7mm;background:var(--bg);border-radius:8px;max-width:158mm}
blockquote p{margin:0;font-size:11.5pt;line-height:1.5;font-weight:500;letter-spacing:-.01em}
ol,ul{margin:2mm 0 4mm;padding-left:5.5mm;max-width:158mm;display:grid;gap:2.6mm}
li{line-height:1.55}
li strong{font-weight:700}
.side-note,.tbl-note{font-size:8.5pt;color:var(--muted);max-width:158mm}
.tbl-note{margin-top:2.5mm}

.steps{display:grid;grid-template-columns:1fr 1fr;gap:4mm;margin:4mm 0}
.step{border:1px solid var(--line);border-radius:8px;padding:4.5mm 5mm}
.step-kicker{font-size:7.5pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--hl);margin-bottom:1.6mm}
.step-title{font-size:11pt;font-weight:700;letter-spacing:-.01em;margin-bottom:1.2mm}
.step-body{font-size:9pt;line-height:1.5;color:var(--muted);margin:0}

table{width:100%;max-width:158mm;border-collapse:collapse;margin:3mm 0 0}
th{font-size:8pt;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);
  padding:2.2mm 3mm;border-bottom:1.5px solid var(--line)}
td{font-size:9.5pt;padding:2.6mm 3mm;border-bottom:1px solid var(--line)}
.al-left{text-align:left}
.al-right{text-align:right}

/* Cover and back cover */
.dark{background:var(--brand);color:var(--bg)}
.nebula{position:absolute;right:-40mm;top:-55mm;line-height:0;filter:blur(70px) saturate(1.1);opacity:.5;--logoBase:transparent}
.cover-inner{position:relative;height:100%;padding:24mm 22mm 20mm;display:flex;flex-direction:column}
.cover-eyebrow{display:flex;align-items:center;gap:12px;font-size:10pt;font-weight:500;letter-spacing:.22em;
  text-transform:uppercase;color:var(--pos)}
.cover-eyebrow::before{content:'';width:30px;height:2px;background:currentColor}
.cover-mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:14mm}
.cover-title{font-size:33pt;line-height:1.08;font-weight:700;letter-spacing:-.035em;max-width:150mm;margin-bottom:8mm;text-wrap:balance}
.cover-title span{color:var(--pos)}
.cover-sub{font-size:12.5pt;line-height:1.6;color:color-mix(in srgb,var(--bg) 72%,transparent);max-width:125mm}
.cover-foot{display:flex;align-items:baseline;justify-content:space-between;gap:8mm;
  padding-top:7mm;border-top:1px solid color-mix(in srgb,var(--bg) 16%,transparent)}
.cover-lockup{--logoText:var(--bg)}
.cover-meta{font-size:9pt;font-weight:500;color:color-mix(in srgb,var(--bg) 58%,transparent)}

.back-inner{position:relative;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7mm}
.back-inner .url{font-size:13pt;font-weight:600;letter-spacing:-.01em;color:var(--bg)}
.back-line{font-size:8.5pt;color:color-mix(in srgb,var(--bg) 58%,transparent)}

/* Contents page */
.toc-grid{display:grid;grid-template-columns:1fr 62mm;gap:12mm;margin-top:4mm}
.panel{background:var(--bg);border-radius:8px;padding:7mm}
.panel-title,.toc-title{font-size:8.5pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:3.5mm}
.panel ul{margin:0;padding:0;list-style:none;display:grid;gap:3mm}
.panel li{position:relative;padding-left:5.5mm;font-size:9.5pt;line-height:1.55}
.panel li::before{content:'';position:absolute;left:0;top:2.1mm;width:2.4mm;height:2.4mm;border-radius:50%;background:var(--teal)}
.toc-list{display:grid;gap:0}
.toc-row{display:flex;align-items:baseline;gap:3mm;padding:3.2mm 0;border-bottom:1px solid var(--line);font-size:10pt}
.toc-num{color:var(--hl);font-weight:700;width:5mm;flex:none}
.toc-t{flex:1;font-weight:600;letter-spacing:-.01em}
.toc-p{color:var(--muted);font-size:9pt}
.audience{margin-top:7mm}
.colophon{position:absolute;left:20mm;right:20mm;bottom:9mm;font-size:7.5pt;color:var(--muted);
  border-top:1px solid var(--line);padding-top:3mm}

.founders{display:flex;margin:6mm 0 4mm}
.founders img{width:16mm;height:16mm;border-radius:50%;object-fit:cover;border:1.2mm solid #fff}
.founders img+img{margin-left:-4mm}
.contact{display:flex;flex-wrap:wrap;gap:2.5mm;font-size:10pt;font-weight:600;color:var(--hl);margin-bottom:3mm}
.contact .dot{color:var(--muted);font-weight:400}
</style></head><body>

<section class="sheet dark">
  <div class="nebula">${logoSvg("mark", 640, "neb")}</div>
  <div class="cover-inner">
    <p class="cover-eyebrow">${esc(doc.cover.eyebrow)}</p>
    <div class="cover-mid">
      <h1 class="cover-title">${esc(doc.cover.titlePre)}<span>${esc(doc.cover.titleAccent).replace(/ /g, "&nbsp;")}</span>${esc(doc.cover.titlePost)}</h1>
      <p class="cover-sub">${esc(doc.cover.sub)}</p>
    </div>
    <div class="cover-foot">
      <div class="cover-lockup">${logoSvg("lockup", 34, "lock")}</div>
      <span class="cover-meta">${esc(doc.cover.foot)}</span>
    </div>
  </div>
</section>

${sheetRaw(
  `<div class="content">
    <p class="ch-kicker">${esc(doc.tocTitle)}</p>
    <div class="toc-grid">
      <div>
        <div class="panel">
          <p class="panel-title">${esc(doc.summaryTitle)}</p>
          <ul>${doc.summary.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        </div>
        <div class="audience">
          <p class="panel-title">${esc(doc.audienceTitle)}</p>
          <p>${esc(doc.audience)}</p>
        </div>
      </div>
      <div>
        <p class="toc-title">${esc(doc.tocTitle)}</p>
        <div class="toc-list">
          ${chapterEntries
            .map(
              (e) => `<div class="toc-row"><span class="toc-num">${e.num}</span><span class="toc-t">${esc(e.title)}</span><span class="toc-p">${e.pdfPage}</span></div>`,
            )
            .join("")}
          <div class="toc-row"><span class="toc-num">·</span><span class="toc-t">${esc(doc.about.title)}</span><span class="toc-p">${aboutPage}</span></div>
        </div>
      </div>
    </div>
    <p class="colophon">${esc(doc.colophon)}</p>
  </div>`,
)}

${contentSheets}
${aboutSheet}

<section class="sheet dark">
  <div class="back-inner">
    ${logoSvg("mark", 60, "bk")}
    <span class="url">dataflowr.nl</span>
    <span class="back-line">${esc(doc.backCover.line)}</span>
  </div>
</section>

</body></html>`;
}

function sheet(inner: string, pageNo: string, footer: string): string {
  return sheetRaw(
    `<div class="content">${inner}</div>
     <div class="pfoot"><span>${esc(footer)}</span><span>${pageNo}</span></div>`,
  );
}

function sheetRaw(inner: string): string {
  return `<section class="sheet">${inner}</section>`;
}

// -------------------------------------------------------------------- main

const css = palette();
const fonts = await fontFaces([400, 500, 600, 700, 800]);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch(
  process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {},
);
const page = await browser.newPage();

for (const doc of WHITEPAPERS) {
  await page.setContent(docHtml(doc, css, fonts), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  // Fail loudly when a sheet overflows its A4 page instead of clipping.
  const overflow = await page.evaluate(() =>
    [...document.querySelectorAll(".sheet")]
      .map((s, i) => ({ page: i + 1, over: s.scrollHeight - s.clientHeight }))
      .filter((r) => r.over > 1),
  );
  if (overflow.length) {
    throw new Error(
      `${doc.file}: content overflows page(s) ` +
        overflow.map((o) => `${o.page} (${o.over}px)`).join(", "),
    );
  }

  const out = resolve(outDir, doc.file);
  await page.pdf({ path: out, width: "210mm", height: "297mm", printBackground: true });
  const sheets = await page.evaluate(() => document.querySelectorAll(".sheet").length);
  console.log(`downloads/${doc.file}  ${sheets} pages  ${(statSync(out).size / 1024).toFixed(0)} kB`);
}

await browser.close();
