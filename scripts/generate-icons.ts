/**
 * Regenerates the icon set in public/ from public/favicon.svg.
 *
 *   npm i --no-save playwright && npx tsx scripts/generate-icons.ts
 *
 * Run it after changing favicon.svg or the :root palette. It rewrites, in
 * place:
 *
 *   favicon.ico                   16/32/48, the classic fallback, also probed
 *                                 at /favicon.ico by convention
 *   favicon-96x96.png             the desktop PNG favicon; 96 is the size the
 *                                 favicon checkers expect and a multiple of
 *                                 the 48px square Google Search wants
 *   apple-touch-icon.png          180x180 for the iOS home screen, on the
 *                                 brand background because iOS composites
 *                                 transparency onto black
 *   web-app-manifest-192x192.png  the maskable icons named in
 *   web-app-manifest-512x512.png  site.webmanifest; the mark stays inside the
 *                                 safe zone so a circular crop keeps it whole
 *   site.webmanifest              name from src/lib/site.ts, colours from the
 *                                 :root palette in global.css
 *
 * Chromium is the SVG rasterizer, but playwright stays out of package.json
 * deliberately: Vercel installs devDependencies on every build, and this runs
 * by hand about once a rebrand.
 *
 * Why it is not a one-liner:
 *
 * 1. **Render big, then downscale.** Rasterizing straight to 16px asks Skia to
 *    resolve the whole mark on a 16-pixel grid in one shot, and the outer curve
 *    comes out soft. Rendering one 768px master (an exact multiple of every
 *    target, so the filter sees no fractional grid) and downscaling it is
 *    measurably crisper.
 * 2. **The downscale itself runs in linear light with a Mitchell filter.** That
 *    part lives in scripts/lib/raster.ts, next to the PNG codec, because
 *    generate-og.ts needs the same treatment.
 *
 * The .ico carries 16/32/48 as 32-bit BGRA BMP frames, the shape every
 * consumer parses, including favicon crawlers that reject PNG-framed icons.
 * Frames are uncompressed, so do not add large ones: a 128px frame alone would
 * be 66 KB.
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { decodePng, encodePng, resize, type Image } from "./lib/raster.ts";
import { SITE_NAME } from "../src/lib/site.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = resolve(root, "public");
const MASTER = 768;
const ICO_SIZES = [16, 32, 48];
const PNG_SIZE = 96;
const TOUCH_SIZE = 180;
const MANIFEST_SIZES = [192, 512];
/** Mark width as a fraction of the touch icon; iOS rounds the corners itself. */
const TOUCH_MARK = 0.8;
/**
 * The maskable safe zone is a circle of radius 0.4 x size. The mark's bounding
 * box has to keep its diagonal inside that circle, which caps its width at
 * 0.59 x size for this mark's aspect; 0.58 leaves a hair of margin.
 */
const MASK_MARK = 0.58;

/** The brand colour out of the locked :root palette; never a literal here. */
function brand(): string {
  const css = readFileSync(resolve(root, "src/styles/global.css"), "utf8");
  const m = css.match(/--brand:\s*(#[0-9a-fA-F]{6})/);
  if (!m) throw new Error("no --brand in src/styles/global.css");
  return m[1];
}

// -------------------------------------------------------------------- .ico

function icoFrame({ width: w, height: h, data }: Image): Buffer {
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0);
  header.writeInt32LE(w, 4);
  header.writeInt32LE(h * 2, 8); // the DIB height counts image + AND mask
  header.writeUInt16LE(1, 12);
  header.writeUInt16LE(32, 14);
  const pixels = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const s = ((h - 1 - y) * w + x) * 4; // BMP rows run bottom-up
      const d = (y * w + x) * 4;
      pixels[d] = data[s + 2]; pixels[d + 1] = data[s + 1]; pixels[d + 2] = data[s]; pixels[d + 3] = data[s + 3];
    }
  }
  // All-zero AND mask: opacity comes from the alpha channel.
  return Buffer.concat([header, pixels, Buffer.alloc(Math.ceil(w / 32) * 4 * h)]);
}

function ico(images: Image[]): Buffer {
  const frames = images.map((img) => ({ size: img.width, data: icoFrame(img) }));
  const dir = Buffer.alloc(6 + frames.length * 16);
  dir.writeUInt16LE(1, 2); // type: icon
  dir.writeUInt16LE(frames.length, 4);
  let offset = dir.length;
  frames.forEach((f, i) => {
    const e = 6 + i * 16;
    dir[e] = dir[e + 1] = f.size === 256 ? 0 : f.size; // 0 means 256
    dir.writeUInt16LE(1, e + 4);
    dir.writeUInt16LE(32, e + 6);
    dir.writeUInt32LE(f.data.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += f.data.length;
  });
  return Buffer.concat([dir, ...frames.map((f) => f.data)]);
}

// -------------------------------------------------------------------- main

const svg = readFileSync(resolve(publicDir, "favicon.svg"), "utf8");
const bg = brand();
// CHROMIUM_EXECUTABLE lets a machine that already has a Chromium build (CI
// images, sandboxes) skip `npx playwright install`, including when its build
// number does not match the pinned playwright.
const browser = await chromium.launch(
  process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {},
);
const page = await browser.newPage({ viewport: { width: MASTER, height: MASTER } });

/** One square 768px master; `fraction` scales the mark, `fill` paints the canvas. */
async function master(fraction: number, fill?: string): Promise<Image> {
  await page.setContent(
    `<style>html,body{margin:0;padding:0;background:transparent}
     #b{width:${MASTER}px;height:${MASTER}px;display:grid;place-items:center;background:${fill ?? "transparent"}}
     #b svg{width:${Math.round(MASTER * fraction)}px;height:${Math.round(MASTER * fraction)}px;display:block}</style><div id="b">${svg}</div>`,
  );
  return decodePng(await page.screenshot({ omitBackground: !fill }));
}

const bare = await master(1);
const touch = await master(TOUCH_MARK, bg);
const mask = await master(MASK_MARK, bg);
await browser.close();

writeFileSync(resolve(publicDir, `favicon-${PNG_SIZE}x${PNG_SIZE}.png`), encodePng(resize(bare, PNG_SIZE, PNG_SIZE)));
writeFileSync(resolve(publicDir, "favicon.ico"), ico(ICO_SIZES.map((s) => resize(bare, s, s))));
writeFileSync(resolve(publicDir, "apple-touch-icon.png"), encodePng(resize(touch, TOUCH_SIZE, TOUCH_SIZE)));
for (const s of MANIFEST_SIZES) {
  writeFileSync(resolve(publicDir, `web-app-manifest-${s}x${s}.png`), encodePng(resize(mask, s, s)));
}
writeFileSync(
  resolve(publicDir, "site.webmanifest"),
  JSON.stringify(
    {
      name: SITE_NAME,
      short_name: SITE_NAME,
      start_url: "/",
      display: "standalone",
      background_color: bg,
      theme_color: bg,
      icons: MANIFEST_SIZES.map((s) => ({
        src: `/web-app-manifest-${s}x${s}.png`,
        sizes: `${s}x${s}`,
        type: "image/png",
        purpose: "maskable",
      })),
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `favicon-${PNG_SIZE}x${PNG_SIZE}.png, favicon.ico (${ICO_SIZES.join("/")}), apple-touch-icon.png, ` +
    `web-app-manifest (${MANIFEST_SIZES.join("/")}) and site.webmanifest written to public/`,
);
