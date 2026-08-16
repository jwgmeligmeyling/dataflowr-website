# DataFlowr brand conventions

This design system ships **no component bundle** — it is the brand surface of the DataFlowr marketing site (an Astro static site). Build screens with your own layout and components, styled entirely from the tokens, classes, and fonts below. The site's copy is Dutch-first (English lives under `/en/`).

## Setup

No provider or wrapper is needed. `styles.css` already styles `body`: background `var(--bg)`, text `var(--brand)`, font `'Hanken Grotesk', 'Poppins', system-ui, sans-serif` (both families ship in `fonts/`). Links are `var(--hl)`, hover `var(--teal)` — no underline. If you don't put content on `body` directly, set `background: var(--bg)` on your root element or the page reads as unbranded white.

## Styling idiom: tokens first, then a small class vocabulary

Style with CSS custom properties — never hardcode brand hex values:

| Token | Value | Role |
|---|---|---|
| `--brand` | `#0D1B27` | ink / dark-navy section backgrounds and body text |
| `--bg` | `#F3F6F8` | page background (cool light gray-blue) |
| `--hl` | `#1B5FB3` | primary blue — links, eyebrows, accents |
| `--teal` / `--pos` | `#4DCBC9` | positive/teal accent; `--posText` `#0E7C86` for text on light |
| `--ok` | `#12A594` | success green-teal |
| `--muted` | `#394655` | secondary text |
| `--line` | `#E0E6ED` | hairline borders |
| `--signal` | `#FF301D` | CTA red — use ONLY for primary calls-to-action; `--signalText` is white |

Shared classes (defined in `tokens/shared.css`): `.wrap` (max-width 1320px page container — wrap every section's content in it), `.eyebrow` (uppercase letter-spaced kicker with a leading dash; modifiers `.eyebrow--thin`, `.eyebrow--teal`, `.eyebrow--pos`, `.eyebrow--dim`, `.eyebrow--bare`), `.btn-signal` (red pill CTA — add your own padding, e.g. `14px 28px`), `.btn-ghost-dark` (outline pill for dark sections), `.grain` (noise overlay on dark heroes), `.img-slot` (+`--rounded`/`--circle`, dashed photo placeholder), `.skip-link`. Buttons are always pills (`border-radius: 99px`, bold label).

Dark sections use `background: var(--brand)` with `var(--bg)` text and `.btn-ghost-dark`; keyframes `df-marq` (marquee) and `df-cue` (scroll cue) exist in `tokens/shared.css`.

## Brand marks

Use the real SVGs in `guidelines/` — never redraw them: `logo-lockup.svg` (mark + "DataFlowr" wordmark, for headers/footers), `logo-mark.svg` (D-mark alone), `logo-mark-dots.svg` (mark with three dots), `claire-mark.svg` (the Claire finance-agent squircle). On dark backgrounds, override `--logoBase: transparent` and `--logoText: #F3F6F8` where the SVG is inlined.

## Where the truth lives

Read before styling: `styles.css` (entry) → `tokens/colors.css` (all tokens incl. the `--logo*` tonal set), `tokens/shared.css` (every shared class + keyframes), `fonts/hanken.css` + `fonts/fonts.css`.

## Idiomatic example

```html
<section style="background: var(--bg); padding: 96px 0;">
  <div class="wrap">
    <p class="eyebrow">Exact Online Premium</p>
    <h1 style="font-size: 56px; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 18px;">
      Boutique integraties voor <span style="color: var(--hl);">Exact Online</span>
    </h1>
    <p style="color: var(--muted); max-width: 560px; margin: 0 0 32px;">Ondertitel in rustige muted-toon.</p>
    <a class="btn-signal" style="padding: 14px 28px;" href="#">Plan een gesprek</a>
  </div>
</section>
```
