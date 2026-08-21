/**
 * Forwards signup form submissions to the mailing provider. Server-only:
 * imported by src/pages/api/subscribe.ts (the one on-demand route) and never
 * shipped to the browser.
 *
 * The provider is picked with environment variables, so swapping tools is a
 * dashboard change plus new keys rather than a code change:
 *
 *   NEWSLETTER_PROVIDER=laposta
 *   LAPOSTA_API_KEY=...            (Laposta > Instellingen > API-sleutel)
 *   LAPOSTA_LIST_NEWSLETTER=...    (list_id of the newsletter list)
 *   LAPOSTA_LIST_WHITEPAPER=...    (list_id of the whitepaper list)
 *
 *   NEWSLETTER_PROVIDER=brevo
 *   BREVO_API_KEY=...
 *   BREVO_LIST_NEWSLETTER=...     (numeric list id)
 *   BREVO_LIST_WHITEPAPER=...     (numeric list id)
 *
 * Double opt-in, the welcome mail that delivers the whitepaper and the
 * unsubscribe flow are configured on the list in the provider's dashboard,
 * not here. Without configuration subscribe() reports `not_configured` and
 * the endpoint logs the address so a submission is never silently lost.
 */

export type SignupKind = 'newsletter' | 'whitepaper';

export interface Signup {
  email: string;
  kind: SignupKind;
  lang: 'nl' | 'en';
  /** Whitepaper form only: the "also send me new articles" checkbox. */
  alsoNewsletter: boolean;
  /** Page the form was submitted from; stored as the signup source. */
  sourceUrl: string;
  /** Client IP; Laposta's member API requires it. */
  ip: string;
}

export type SubscribeResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'provider_error' };

/**
 * Env vars are read at runtime on Vercel (process.env) and from .env in
 * `astro dev` (import.meta.env); non-PUBLIC_ vars never reach the client.
 */
const env = (name: string): string | undefined => {
  const meta = (import.meta.env as Record<string, string | undefined>)[name];
  return meta ?? process.env[name];
};

/** The lists a submission lands on: its own kind, plus opt-in extras. */
const listKinds = (signup: Signup): SignupKind[] =>
  signup.kind === 'whitepaper' && signup.alsoNewsletter ? ['whitepaper', 'newsletter'] : [signup.kind];

async function subscribeLaposta(signup: Signup): Promise<SubscribeResult> {
  const apiKey = env('LAPOSTA_API_KEY');
  const lists: Record<SignupKind, string | undefined> = {
    newsletter: env('LAPOSTA_LIST_NEWSLETTER'),
    whitepaper: env('LAPOSTA_LIST_WHITEPAPER'),
  };
  if (!apiKey) return { ok: false, reason: 'not_configured' };

  for (const kind of listKinds(signup)) {
    const listId = lists[kind];
    if (!listId) return { ok: false, reason: 'not_configured' };
    const body = new URLSearchParams({
      list_id: listId,
      email: signup.email,
      ip: signup.ip,
      source_url: signup.sourceUrl,
      // Re-submitting an address updates it instead of erroring; people
      // download a whitepaper twice more often than you'd think.
      'options[upsert]': 'true',
    });
    const res = await fetch('https://api.laposta.nl/v2/member', {
      method: 'POST',
      headers: { Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}` },
      body,
    });
    if (!res.ok) {
      console.error(`laposta: ${res.status} for list ${kind}`, await res.text().catch(() => ''));
      return { ok: false, reason: 'provider_error' };
    }
  }
  return { ok: true };
}

async function subscribeBrevo(signup: Signup): Promise<SubscribeResult> {
  const apiKey = env('BREVO_API_KEY');
  const lists: Record<SignupKind, string | undefined> = {
    newsletter: env('BREVO_LIST_NEWSLETTER'),
    whitepaper: env('BREVO_LIST_WHITEPAPER'),
  };
  if (!apiKey) return { ok: false, reason: 'not_configured' };

  const listIds: number[] = [];
  for (const kind of listKinds(signup)) {
    const listId = Number(lists[kind]);
    if (!Number.isInteger(listId) || listId <= 0) return { ok: false, reason: 'not_configured' };
    listIds.push(listId);
  }
  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': apiKey, 'content-type': 'application/json' },
    body: JSON.stringify({ email: signup.email, listIds, updateEnabled: true }),
  });
  // 201 created, 204 updated; anything else is the provider refusing.
  if (!res.ok) {
    console.error(`brevo: ${res.status}`, await res.text().catch(() => ''));
    return { ok: false, reason: 'provider_error' };
  }
  return { ok: true };
}

export async function subscribe(signup: Signup): Promise<SubscribeResult> {
  const provider = env('NEWSLETTER_PROVIDER');
  try {
    if (provider === 'laposta') return await subscribeLaposta(signup);
    if (provider === 'brevo') return await subscribeBrevo(signup);
  } catch (err) {
    console.error(`${provider}: request failed`, err);
    return { ok: false, reason: 'provider_error' };
  }
  return { ok: false, reason: 'not_configured' };
}
