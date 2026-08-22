/**
 * POST /api/subscribe: the one on-demand route on an otherwise static site
 * (a Vercel serverless function via the adapter). Both signup forms post
 * here; src/lib/mailing.ts forwards the address to the mailing provider.
 *
 * Accepts a plain form post (no-JS fallback: answers with a redirect to the
 * thank-you page) and JSON from the enhanced newsletter form (answers with
 * JSON). A whitepaper submission always redirects to the thank-you page,
 * where the download lives: the PDF is not held hostage by mailing uptime.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { routes, type Lang } from '../../lib/site';
import { subscribe, type SignupKind } from '../../lib/mailing';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Abuse throttle, per IP and per address. In-memory, so it is per serverless
 * instance and resets on cold starts: enough against naive subscription
 * bombing and quota burn from a single source, not a substitute for a WAF
 * rule when the endpoint draws real abuse. Nobody signs up five times in
 * ten minutes with good intentions.
 */
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;
const rateHits = new Map<string, number[]>();

function rateLimited(...keys: string[]): boolean {
  const now = Date.now();
  // Bound the map so rotating keys cannot grow the instance's memory.
  if (rateHits.size > 10_000) rateHits.clear();
  let limited = false;
  for (const key of keys.filter(Boolean)) {
    const kept = (rateHits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
    if (kept.length >= RATE_MAX) limited = true;
    else kept.push(now);
    rateHits.set(key, kept);
  }
  return limited;
}

interface Submission {
  email: string;
  kind: SignupKind;
  lang: Lang;
  alsoNewsletter: boolean;
  /** Honeypot field; people leave it empty, naive bots do not. */
  honeypot: string;
  sourceUrl: string;
}

async function parseSubmission(request: Request, wantsJson: boolean): Promise<Submission> {
  const raw: Record<string, unknown> = wantsJson
    ? await request.json().catch(() => ({}))
    : Object.fromEntries((await request.formData().catch(() => new FormData())).entries());
  const str = (key: string) => (typeof raw[key] === 'string' ? (raw[key] as string).trim() : '');
  return {
    email: str('email'),
    kind: str('kind') === 'whitepaper' ? 'whitepaper' : 'newsletter',
    lang: str('lang') === 'en' ? 'en' : 'nl',
    alsoNewsletter: Boolean(raw['newsletter']),
    honeypot: str('website'),
    sourceUrl: str('source'),
  };
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const wantsJson = (request.headers.get('content-type') ?? '').includes('application/json');
  const json = (status: number, body: Record<string, unknown>) =>
    new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

  // Same-host check: the forms live on this site; a cross-site post is abuse.
  const origin = request.headers.get('origin');
  if (origin) {
    let sameHost = false;
    try {
      sameHost = new URL(origin).host === new URL(request.url).host;
    } catch {
      sameHost = false;
    }
    if (!sameHost) return json(403, { ok: false, error: 'forbidden' });
  }

  const sub = await parseSubmission(request, wantsJson);
  const thanksPath =
    sub.kind === 'whitepaper' ? routes.whitepaperThanks[sub.lang] : routes.newsletterThanks[sub.lang];
  const redirect = (path: string) =>
    new Response(null, { status: 303, headers: { location: new URL(path, request.url).href } });

  // A filled honeypot gets a friendly dead end and nothing is stored.
  if (sub.honeypot) return wantsJson ? json(200, { ok: true }) : redirect(thanksPath);

  if (!EMAIL_RE.test(sub.email) || sub.email.length > 254) {
    return wantsJson ? json(400, { ok: false, error: 'invalid_email' }) : redirect(`${thanksPath}?status=fout`);
  }

  let ip = '';
  try {
    ip = clientAddress;
  } catch {
    ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  }

  // Over the limit: nothing reaches the provider. The form post gets the
  // same friendly dead end as the honeypot; JSON callers get a real 429.
  if (rateLimited(ip && `ip:${ip}`, `email:${sub.email.toLowerCase()}`)) {
    return wantsJson ? json(429, { ok: false, error: 'rate_limited' }) : redirect(thanksPath);
  }

  const result = await subscribe({
    email: sub.email,
    kind: sub.kind,
    lang: sub.lang,
    alsoNewsletter: sub.alsoNewsletter,
    sourceUrl: sub.sourceUrl.slice(0, 500),
    ip: ip || '0.0.0.0',
  });

  if (!result.ok) {
    // Log enough to recover the address by hand from the function logs.
    console.error(`subscribe failed (${result.reason}): ${sub.kind} ${sub.email} [${sub.lang}]`);
    if (sub.kind === 'whitepaper' && !wantsJson) return redirect(thanksPath);
    const status = result.reason === 'not_configured' ? 503 : 502;
    return wantsJson ? json(status, { ok: false, error: result.reason }) : redirect(`${thanksPath}?status=fout`);
  }

  return wantsJson ? json(200, { ok: true }) : redirect(thanksPath);
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), {
    status: 405,
    headers: { allow: 'POST', 'content-type': 'application/json' },
  });
