// Vendors Hanken Grotesk (the site's Google-hosted primary face) into
// ds-bundle/fonts so rendered designs are self-contained. Latin subset only.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'ds-bundle/fonts');
mkdirSync(outDir, { recursive: true });

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const cssUrl = 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700;800&display=swap';
const css = await (await fetch(cssUrl, { headers: { 'User-Agent': UA } })).text();

// Keep only the latin blocks (each face appears once per subset).
const blocks = [...css.matchAll(/\/\* ([a-z-]+) \*\/\n(@font-face \{[\s\S]*?\})/g)].filter((m) => m[1] === 'latin');
if (!blocks.length) throw new Error('no latin @font-face blocks found in Google Fonts CSS');

let outCss = '/* Hanken Grotesk, vendored from Google Fonts (latin subset), weights 300–800. */\n';
for (const [, , block] of blocks) {
  const url = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
  const weight = block.match(/font-weight: (\d+)/)?.[1];
  if (!url || !weight) throw new Error('unparseable @font-face block');
  const file = `HankenGrotesk-${weight}.woff2`;
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(join(outDir, file), buf);
  outCss += block.replace(/src: url\([^)]+\) format\('woff2'\);/, `src: url('${file}') format('woff2');`).replace(/\n\s*unicode-range:[^;]+;/, '') + '\n';
}
writeFileSync(join(outDir, 'hanken.css'), outCss);
console.log(`vendored ${blocks.length} Hanken Grotesk faces`);
