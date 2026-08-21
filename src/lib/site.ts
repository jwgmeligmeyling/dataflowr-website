export const SITE_URL = 'https://dataflowr.nl';
export const SITE_NAME = 'DataFlowr';
export const APP_URL = 'https://app.dataflowr.nl/';
export const CALENDLY_URL = 'https://calendly.com/daan-dataflowr';
export const CALENDLY_MEETING_URL = `${CALENDLY_URL}/30min`;
export const LINKEDIN_URL = 'https://linkedin.com/company/dataflowr';
export const LINKEDIN_DAAN = 'https://www.linkedin.com/in/daan-jansen-329a541a1/';
export const LINKEDIN_JANWILLEM = 'https://www.linkedin.com/in/jwgmeligmeyling/';
export const EMAIL_DAAN = 'daan@dataflowr.nl';
export const EMAIL_JANWILLEM = 'janwillem@dataflowr.nl';
/** Mailboxes named on the legal pages, carried over from the previous site. */
export const EMAIL_PRIVACY = 'privacy@dataflowr.nl';
export const EMAIL_INFO = 'info@dataflowr.nl';
/** Display form per language; the tel: href below dials the same number. */
export const PHONE_DISPLAY = { nl: '023-2052813', en: '+31 23 2052813' } as const;
export const PHONE_TEL = '+31232052813';
/**
 * Exact's own site. The App Store partner guidelines require the landing
 * page behind "Meer informatie" to link to it.
 */
export const EXACT_URL = { nl: 'https://www.exact.com/nl', en: 'https://www.exact.com/en' } as const;

/** Registered company details (KVK). */
export const COMPANY = {
  legalName: 'DataFlowr B.V.',
  kvk: '99021145',
  vestigingsnummer: '000064143481',
  street: 'Van Marsbergenstraat 71',
  postalCode: '2134 LV',
  city: 'Hoofddorp',
  country: 'NL',
} as const;

export type Lang = 'nl' | 'en';

/**
 * Documentation routes; NL under /documentatie, EN under /en/docs.
 * The order here is the reading order: the index page and the
 * previous/next links on the doc pages both follow it.
 */
const docRoutes = {
  'aan-de-slag': {
    nl: '/documentatie/aan-de-slag-met-claire',
    en: '/en/docs/getting-started-with-claire',
  },
  /**
   * One connect page per client, so each ranks on its own query
   * ("Claude koppelen aan Exact Online") instead of sharing one URL.
   */
  claude: {
    nl: '/documentatie/claude-koppelen-aan-exact-online',
    en: '/en/docs/connect-claude-to-exact-online',
  },
  chatgpt: {
    nl: '/documentatie/chatgpt-koppelen-aan-exact-online',
    en: '/en/docs/connect-chatgpt-to-exact-online',
  },
  copilot: {
    nl: '/documentatie/copilot-koppelen-aan-exact-online',
    en: '/en/docs/connect-copilot-to-exact-online',
  },
  automatisering: {
    nl: '/documentatie/make-zapier-n8n-koppelen-aan-exact-online',
    en: '/en/docs/connect-make-zapier-n8n-to-exact-online',
  },
  'werken-met-claire': {
    nl: '/documentatie/werken-met-claire',
    en: '/en/docs/working-with-claire',
  },
  vragen: {
    nl: '/documentatie/wat-je-claire-kunt-vragen',
    en: '/en/docs/what-to-ask-claire',
  },
  debiteuren: {
    nl: '/documentatie/debiteurenbeheer-met-claire',
    en: '/en/docs/receivables-management-with-claire',
  },
  maandafsluiting: {
    nl: '/documentatie/maandafsluiting-en-planningen',
    en: '/en/docs/month-end-close-and-schedules',
  },
  'team-en-toegang': {
    nl: '/documentatie/team-toegang-en-logboek',
    en: '/en/docs/team-access-and-audit-log',
  },
  abonnement: {
    nl: '/documentatie/abonnement-en-facturen',
    en: '/en/docs/subscription-and-invoices',
  },
  'problemen-oplossen': {
    nl: '/documentatie/problemen-oplossen',
    en: '/en/docs/troubleshooting',
  },
} as const;

/** Knowledge-base article routes; NL under /kennisbank, EN under /en/resources. */
const articleRoutes = {
  maandafsluiting: {
    nl: '/kennisbank/waarom-de-maandafsluiting-nog-een-week-kost',
    en: '/en/resources/why-the-month-end-close-still-takes-a-week',
  },
  'psp-reconciliatie': {
    nl: '/kennisbank/psp-reconciliatie-waarom-de-bank-nooit-precies-aansluit',
    en: '/en/resources/psp-reconciliation-why-the-bank-never-quite-matches',
  },
  'premium-features': {
    nl: '/kennisbank/premium-features-waar-je-voor-betaalt-maar-niets-mee-doet',
    en: '/en/resources/premium-features-you-pay-for-but-are-not-using',
  },
  'mcp-voor-finance': {
    nl: '/kennisbank/wat-mcp-is-en-waarom-het-voor-finance-uitmaakt',
    en: '/en/resources/what-mcp-is-and-why-it-matters-for-finance',
  },
  'mcp-release': {
    nl: '/kennisbank/wat-er-nieuw-is-in-de-mcp-release',
    en: '/en/resources/what-is-new-in-the-mcp-release',
  },
  aandeelhoudersrapportage: {
    nl: '/kennisbank/van-vraag-tot-aandeelhoudersrapportage-met-claude',
    en: '/en/resources/from-question-to-shareholder-report-with-claude',
  },
  cashflowprognose: {
    nl: '/kennisbank/elke-maandag-een-cashflowprognose-in-je-mail',
    en: '/en/resources/a-cashflow-forecast-in-your-inbox-every-monday',
  },
  'copilot-facturen': {
    nl: '/kennisbank/facturen-maken-tijdens-de-meeting-met-copilot',
    en: '/en/resources/creating-invoices-during-the-meeting-with-copilot',
  },
} as const;

/**
 * Canonical route table. Every page exists in NL (default, no prefix) and
 * EN (under /en with English slugs). Used for nav, hreflang alternates and
 * the language switcher.
 */
export const routes = {
  home: { nl: '/', en: '/en' },
  /** Overview pages. Every article and service page breadcrumbs back to one of these. */
  resources: { nl: '/kennisbank', en: '/en/resources' },
  servicesIndex: { nl: '/diensten', en: '/en/services' },
  claire: { nl: '/claire', en: '/en/claire' },
  /**
   * Handoff into the app. `/claire/start` is the stable, brand-shaped entry
   * the app keeps for this site (it redirects to the connector page behind
   * its auth wall; sign-in preserves the intent via `returnTo`). The demo
   * section on the Claire page is anchored with plain `#aan-de-slag` /
   * `#get-started`: deliberately not routed through this table.
   */
  claireStart: { nl: `${APP_URL}claire/start`, en: `${APP_URL}en/claire/start` },
  about: { nl: '/over-ons', en: '/en/about' },
  /**
   * Contact and support. The Exact Online App Store review requires both to
   * exist as explicit pages with a phone number; the same details also stay
   * in the footer and on the about page.
   */
  contact: { nl: '/contact', en: '/en/contact' },
  support: { nl: '/ondersteuning', en: '/en/support' },
  /**
   * Product documentation for Claire. Standard support means a customer works
   * from these pages, so they are linked from the support page, the pricing
   * note on the Claire page and the footer: deliberately not from the nav.
   */
  docs: { nl: '/documentatie', en: '/en/docs' },
  docPages: docRoutes,
  articles: articleRoutes,
  /**
   * Flagship article. The "Kennisbank" nav item points at `resources` above;
   * this alias stays for links that deliberately open the lead piece.
   */
  article: articleRoutes.maandafsluiting,
  /**
   * Legal pages. The English slugs are the ones the previous site served, and
   * shipped artefacts still point at the bare `/privacy` and `/terms`: the
   * Codex plugin manifest, the Copilot package and the marketplace
   * submissions. Those two paths redirect to the Dutch pages below
   * (vercel.json, public/_redirects), so the published URLs keep resolving.
   */
  legal: {
    privacy: { nl: '/privacyverklaring', en: '/en/privacy' },
    terms: { nl: '/algemene-voorwaarden', en: '/en/terms' },
  },
  services: {
    'exact-online-premium': { nl: '/diensten/exact-online-premium', en: '/en/services/exact-online-premium' },
    integraties: { nl: '/diensten/integraties', en: '/en/services/integrations' },
    make: { nl: '/diensten/make', en: '/en/services/make' },
    camunda: { nl: '/diensten/camunda', en: '/en/services/camunda' },
    rpa: { nl: '/diensten/rpa', en: '/en/services/rpa' },
    training: { nl: '/diensten/training', en: '/en/services/training' },
  },
} as const;

export type ServiceKey = keyof typeof routes.services;
export type ArticleKey = keyof typeof routes.articles;
export type DocKey = keyof typeof routes.docPages;
export type LegalKey = keyof typeof routes.legal;

/** Shared UI strings (nav, footer, breadcrumbs). */
export const ui = {
  nl: {
    solutions: 'Oplossingen',
    product: 'Product',
    services: 'Diensten',
    claireTag: 'AI in je Exact Online',
    resources: 'Kennisbank',
    servicesIndex: 'Alle diensten',
    about: 'Over ons',
    signIn: 'Inloggen',
    cta: 'Plan een kennismaking',
    langSwitch: 'EN',
    langSwitchLabel: 'Switch to English',
    home: 'Home',
    menu: 'Menu',
    skip: 'Naar hoofdinhoud',
    /** Describes /og/og-default-nl.png for readers who get the alt text instead of the card. */
    ogImageAlt: 'Deelkaart van DataFlowr: het logo op donkerblauw, met de regel “Financiële processen die stromen” en de kicker “Exact Online Premium · Integratiepartner”.',
    footerTagline: 'Gespecialiseerde integratiepartner',
    footerBody: 'Procesoptimalisatie en integraties binnen het Exact Online ecosysteem, met de precisie van een specialist.',
    footerContact: 'Contact',
    footerOnline: 'Online',
    footerExplore: 'Op deze site',
    footerCopyright: '© 2026 DataFlowr',
    footerMotto: 'Premium partner van',
    footerCompact: '© 2026 DataFlowr · Gespecialiseerde Exact Online integratiepartner',
    footerPrivacy: 'Privacyverklaring',
    footerTerms: 'Algemene voorwaarden',
    contactPage: 'Contact',
    supportPage: 'Ondersteuning',
    docsPage: 'Documentatie',
    serviceNavDescriptions: {
      'exact-online-premium': 'Implementatie & partner',
      integraties: 'Systemen & data koppelen',
      make: 'Automatiseren zonder code',
      camunda: 'Workflow-orkestratie',
      rpa: 'Repetitief werk robotiseren',
      training: 'Je team meenemen',
    } as Record<ServiceKey, string>,
    serviceNavTitles: {
      'exact-online-premium': 'Exact Online Premium',
      integraties: 'Integraties',
      make: 'Make & low-code',
      camunda: 'Camunda',
      rpa: 'RPA',
      training: 'Training',
    } as Record<ServiceKey, string>,
  },
  en: {
    solutions: 'Solutions',
    product: 'Product',
    services: 'Services',
    claireTag: 'AI in your Exact Online',
    resources: 'Resources',
    servicesIndex: 'All services',
    about: 'About',
    signIn: 'Sign in',
    cta: 'Get in touch',
    langSwitch: 'NL',
    langSwitchLabel: 'Wissel naar Nederlands',
    home: 'Home',
    menu: 'Menu',
    skip: 'Skip to main content',
    /** Describes /og/og-default-en.png for readers who get the alt text instead of the card. */
    ogImageAlt: 'DataFlowr share card: the logo on dark blue, with the line “Financial processes that flow” and the kicker “Exact Online Premium · Integration partner”.',
    footerTagline: 'Specialised integration partner',
    footerBody: 'Process optimisation and integrations within the Exact Online ecosystem, with the precision of a specialist.',
    footerContact: 'Contact',
    footerOnline: 'Online',
    footerExplore: 'On this site',
    footerCopyright: '© 2026 DataFlowr',
    footerMotto: 'Premium partner of',
    footerCompact: '© 2026 DataFlowr · Specialised Exact Online integration partner',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    contactPage: 'Contact',
    supportPage: 'Support',
    docsPage: 'Documentation',
    serviceNavDescriptions: {
      'exact-online-premium': 'Implementation & partner',
      integraties: 'Connect systems & data',
      make: 'Automate without code',
      camunda: 'Workflow orchestration',
      rpa: 'Robotise repetitive work',
      training: 'Get your team on board',
    } as Record<ServiceKey, string>,
    serviceNavTitles: {
      'exact-online-premium': 'Exact Online Premium',
      integraties: 'Integrations',
      make: 'Make & low-code',
      camunda: 'Camunda',
      rpa: 'RPA',
      training: 'Training',
    } as Record<ServiceKey, string>,
  },
} as const;

/** Absolute URL helper. */
export const abs = (path: string) => new URL(path, SITE_URL).href;
