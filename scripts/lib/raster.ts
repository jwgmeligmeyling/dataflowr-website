/**
 * Minimal PNG codec and a high-quality downscaler, shared by the asset
 * generators in scripts/ (generate-icons.ts, generate-og.ts).
 *
 * Everything here is dependency-free on purpose: the generators run by hand a
 * few times a year, and adding sharp or jimp to the project would mean Vercel
 * installing them on every build for no runtime benefit.
 *
 * The two quality rules the resampler follows:
 *
 * 1. **Downscale in linear light, with premultiplied alpha.** Averaging
 *    gamma-encoded sRGB values darkens every edge, and averaging colour without
 *    weighting by alpha bleeds transparent pixels into the result. Both are why
 *    a naive resize of a logo looks muddy.
 * 2. **Cubic kernels, not Lanczos.** Lanczos-3 is sharper but overshoots,
 *    which puts a visible dark halo around the white triangle where it meets
 *    the blue. The resampler offers two kernels from the Mitchell-Netravali
 *    family instead: Mitchell (B = C = 1/3), the soft, ring-free default the
 *    OG cards use, and Catmull-Rom (B = 0, C = 1/2), which keeps vector edges
 *    crisp at small sizes and is what the icon set downscales with.
 */
import { deflateSync, inflateSync } from "node:zlib";

export type Image = { width: number; height: number; data: Buffer };

// ---------------------------------------------------------------- PNG codec

export function decodePng(buf: Buffer): Image {
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const colorType = buf[25];
  // Chromium writes RGB when a screenshot has no transparent pixel anywhere
  // and RGBA when it does, so both shapes turn up depending on the page.
  if (buf[24] !== 8 || (colorType !== 6 && colorType !== 2) || buf[28] !== 0) {
    throw new Error("expected an 8-bit RGB or RGBA non-interlaced PNG");
  }
  const idat: Buffer[] = [];
  for (let off = 8; off < buf.length; ) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    if (type === "IDAT") idat.push(buf.subarray(off + 8, off + 8 + len));
    if (type === "IEND") break;
    off += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat));
  const bpp = colorType === 6 ? 4 : 3;
  const stride = width * bpp;
  const out = Buffer.alloc(width * height * bpp);
  let pos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const line = raw.subarray(pos, pos + stride);
    pos += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let val: number;
      switch (filter) {
        case 0: val = line[x]; break;
        case 1: val = line[x] + a; break;
        case 2: val = line[x] + b; break;
        case 3: val = line[x] + ((a + b) >> 1); break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          val = line[x] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default: throw new Error(`unknown PNG filter ${filter}`);
      }
      cur[x] = val & 0xff;
    }
  }
  if (bpp === 4) return { width, height, data: out };
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = out[i * 3];
    rgba[i * 4 + 1] = out[i * 3 + 1];
    rgba[i * 4 + 2] = out[i * 3 + 2];
    rgba[i * 4 + 3] = 255;
  }
  return { width, height, data: rgba };
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function chunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typed = Buffer.concat([Buffer.from(type, "ascii"), data]);
  let crc = 0xffffffff;
  for (const b of typed) crc = CRC_TABLE[(crc ^ b) & 0xff] ^ (crc >>> 8);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE((crc ^ 0xffffffff) >>> 0);
  return Buffer.concat([len, typed, crcBuf]);
}

// Per-row filter chosen by minimum sum of absolute differences: still
// lossless, just smaller than writing filter 0 everywhere.
export function encodePng({ width: w, height: h, data }: Image): Buffer {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const bpp = 4;
  const stride = w * bpp;
  const raw = Buffer.alloc(h * (stride + 1));
  const prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) {
    const line = data.subarray(y * stride, (y + 1) * stride);
    let best: { f: number; bytes: Buffer; score: number } | null = null;
    for (let f = 0; f <= 4; f++) {
      const bytes = Buffer.alloc(stride);
      let score = 0;
      for (let x = 0; x < stride; x++) {
        const a = x >= bpp ? line[x - bpp] : 0;
        const b = prev[x];
        const c = x >= bpp ? prev[x - bpp] : 0;
        let v: number;
        if (f === 0) v = line[x];
        else if (f === 1) v = line[x] - a;
        else if (f === 2) v = line[x] - b;
        else if (f === 3) v = line[x] - ((a + b) >> 1);
        else {
          const p = a + b - c;
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          v = line[x] - (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
        }
        bytes[x] = v & 0xff;
        score += Math.min(bytes[x], 256 - bytes[x]);
      }
      if (!best || score < best.score) best = { f, bytes, score };
    }
    raw[y * (stride + 1)] = best!.f;
    best!.bytes.copy(raw, y * (stride + 1) + 1);
    line.copy(prev);
  }
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ------------------------------------------------------------- downscaling

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const toSrgb = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
const LINEAR = Float64Array.from({ length: 256 }, (_, i) => toLinear(i / 255));

// The BC-spline family: Mitchell-Netravali at the authors' recommended
// B = C = 1/3, Catmull-Rom at B = 0, C = 1/2.
export type Filter = "mitchell" | "catrom";
const BC: Record<Filter, [number, number]> = { mitchell: [1 / 3, 1 / 3], catrom: [0, 1 / 2] };

function cubic(x: number, [B, C]: [number, number]): number {
  x = Math.abs(x);
  const x2 = x * x, x3 = x2 * x;
  if (x < 1) return ((12 - 9 * B - 6 * C) * x3 + (-18 + 12 * B + 6 * C) * x2 + (6 - 2 * B)) / 6;
  if (x < 2) return ((-B - 6 * C) * x3 + (6 * B + 30 * C) * x2 + (-12 * B - 48 * C) * x + (8 * B + 24 * C)) / 6;
  return 0;
}

function taps(srcLen: number, dstLen: number, filter: Filter): [number, number][][] {
  const scale = dstLen / srcLen;
  const support = 2 / Math.min(scale, 1); // widen the kernel when minifying
  const rows: [number, number][][] = [];
  for (let d = 0; d < dstLen; d++) {
    const center = (d + 0.5) / scale;
    const row: [number, number][] = [];
    let sum = 0;
    for (let s = Math.max(0, Math.floor(center - support)); s <= Math.min(srcLen - 1, Math.ceil(center + support)); s++) {
      const w = cubic((s + 0.5 - center) * Math.min(scale, 1), BC[filter]);
      if (w !== 0) { row.push([s, w]); sum += w; }
    }
    rows.push(row.map(([s, w]) => [s, w / sum] as [number, number]));
  }
  return rows;
}

/** Resample to dstW x dstH. Separable, so it runs in two passes. */
export function resize(src: Image, dstW: number, dstH: number, filter: Filter = "mitchell"): Image {
  const { width: sw, height: sh, data } = src;
  const lin = new Float64Array(sw * sh * 4);
  for (let i = 0; i < sw * sh; i++) {
    const a = data[i * 4 + 3] / 255;
    lin[i * 4] = LINEAR[data[i * 4]] * a;
    lin[i * 4 + 1] = LINEAR[data[i * 4 + 1]] * a;
    lin[i * 4 + 2] = LINEAR[data[i * 4 + 2]] * a;
    lin[i * 4 + 3] = a;
  }
  const xTaps = taps(sw, dstW, filter);
  const mid = new Float64Array(dstW * sh * 4);
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < dstW; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (const [s, w] of xTaps[x]) {
        const i = (y * sw + s) * 4;
        r += lin[i] * w; g += lin[i + 1] * w; b += lin[i + 2] * w; a += lin[i + 3] * w;
      }
      const o = (y * dstW + x) * 4;
      mid[o] = r; mid[o + 1] = g; mid[o + 2] = b; mid[o + 3] = a;
    }
  }
  const yTaps = taps(sh, dstH, filter);
  const out = Buffer.alloc(dstW * dstH * 4);
  const clamp = (v: number) => Math.round(Math.min(1, Math.max(0, toSrgb(Math.max(0, v)))) * 255);
  for (let y = 0; y < dstH; y++) {
    for (let x = 0; x < dstW; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (const [s, w] of yTaps[y]) {
        const i = (s * dstW + x) * 4;
        r += mid[i] * w; g += mid[i + 1] * w; b += mid[i + 2] * w; a += mid[i + 3] * w;
      }
      a = Math.min(1, Math.max(0, a));
      const un = a > 0 ? 1 / a : 0; // back to straight alpha
      const o = (y * dstW + x) * 4;
      out[o] = clamp(r * un);
      out[o + 1] = clamp(g * un);
      out[o + 2] = clamp(b * un);
      out[o + 3] = Math.round(a * 255);
    }
  }
  return { width: dstW, height: dstH, data: out };
}
