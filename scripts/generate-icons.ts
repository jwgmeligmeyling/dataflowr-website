/**
 * Regenerates the raster favicons in public/ from public/favicon.svg.
 *
 *   npm i --no-save playwright && npx tsx scripts/generate-icons.ts
 *
 * Run it after changing favicon.svg; it rewrites public/favicon.ico and
 * public/favicon-192.png in place. Chromium is the SVG rasterizer, but
 * playwright stays out of package.json deliberately: Vercel installs
 * devDependencies on every build, and this runs by hand about once a rebrand.
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

const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public");
const MASTER = 768;
const ICO_SIZES = [16, 32, 48];
const PNG_SIZE = 192; // Google wants a square of at least 48px and prefers multiples of 48.

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
// CHROMIUM_EXECUTABLE lets a machine that already has a Chromium build (CI
// images, sandboxes) skip `npx playwright install`, including when its build
// number does not match the pinned playwright.
const browser = await chromium.launch(
  process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {},
);
const page = await browser.newPage({ viewport: { width: MASTER, height: MASTER } });
await page.setContent(
  `<style>html,body{margin:0;padding:0;background:transparent}
   #b{width:${MASTER}px;height:${MASTER}px}#b svg{width:100%;height:100%;display:block}</style><div id="b">${svg}</div>`,
);
const master = decodePng(await page.screenshot({ omitBackground: true }));
await browser.close();

const png = resize(master, PNG_SIZE, PNG_SIZE);
writeFileSync(resolve(publicDir, `favicon-${PNG_SIZE}.png`), encodePng(png));
writeFileSync(resolve(publicDir, "favicon.ico"), ico(ICO_SIZES.map((s) => resize(master, s, s))));
console.log(`favicon-${PNG_SIZE}.png and favicon.ico (${ICO_SIZES.join("/")}) written to public/`);
