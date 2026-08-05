export const SITE_URL = 'https://dataflowr.nl';
export const SITE_NAME = 'DataFlowr';
export const CALENDLY_URL = 'https://calendly.com/daan-dataflowr';
export const LINKEDIN_URL = 'https://linkedin.com/company/dataflowr';
export const EMAIL_DAAN = 'daan@dataflowr.nl';
export const EMAIL_JANWILLEM = 'janwillem@dataflowr.nl';

export type Lang = 'nl' | 'en';

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
    nl: '/kennisbank/premium-features-waar-u-voor-betaalt-maar-niets-mee-doet',
    en: '/en/resources/premium-features-you-pay-for-but-are-not-using',
  },
  'mcp-voor-finance': {
    nl: '/kennisbank/wat-mcp-is-en-waarom-het-voor-finance-uitmaakt',
    en: '/en/resources/what-mcp-is-and-why-it-matters-for-finance',
  },
} as const;

/**
 * Canonical route table. Every page exists in NL (default, no prefix) and
 * EN (under /en with English slugs). Used for nav, hreflang alternates and
 * the language switcher.
 */
export const routes = {
  home: { nl: '/', en: '/en' },
  claire: { nl: '/claire', en: '/en/claire' },
  claireStart: { nl: '/claire#aan-de-slag', en: '/en/claire#get-started' },
  about: { nl: '/over-ons', en: '/en/about' },
  articles: articleRoutes,
  /** Flagship article; also where the "Kennisbank" nav item points. */
  article: articleRoutes.maandafsluiting,
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

/** Shared UI strings (nav, footer, breadcrumbs). */
export const ui = {
  nl: {
    solutions: 'Oplossingen',
    product: 'Product',
    services: 'Diensten',
    claireTag: 'AI in uw Exact Online',
    resources: 'Kennisbank',
    about: 'Over ons',
    signIn: 'Inloggen',
    cta: 'Plan een kennismaking',
    langSwitch: 'EN',
    langSwitchLabel: 'Switch to English',
    home: 'Home',
    menu: 'Menu',
    skip: 'Naar hoofdinhoud',
    footerTagline: 'Boutique integratiepartner',
    footerBody: 'Procesoptimalisatie en integraties binnen het Exact Online ecosysteem, met de precisie van een boetiek.',
    footerContact: 'Contact',
    footerOnline: 'Online',
    footerMeet: 'Ontmoet ons',
    footerMeetItems: ['Exact Online Live', 'CFO User Groups', 'Partnerevents'],
    footerCopyright: '© 2026 DataFlowr',
    footerMotto: 'All You Need is a Premium Partner',
    footerCompact: '© 2026 DataFlowr · Boutique Exact Online integratiepartner',
    serviceNavDescriptions: {
      'exact-online-premium': 'Implementatie & partner',
      integraties: 'Systemen & data koppelen',
      make: 'Automatiseren zonder code',
      camunda: 'Workflow-orkestratie',
      rpa: 'Repetitief werk robotiseren',
      training: 'Uw team meenemen',
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
    about: 'About',
    signIn: 'Sign in',
    cta: 'Get in touch',
    langSwitch: 'NL',
    langSwitchLabel: 'Wissel naar Nederlands',
    home: 'Home',
    menu: 'Menu',
    skip: 'Skip to main content',
    footerTagline: 'Boutique integration partner',
    footerBody: 'Process optimisation and integrations within the Exact Online ecosystem, with the precision of a boutique.',
    footerContact: 'Contact',
    footerOnline: 'Online',
    footerMeet: 'Meet us',
    footerMeetItems: ['Exact Online Live', 'CFO User Groups', 'Partner events'],
    footerCopyright: '© 2026 DataFlowr',
    footerMotto: 'All You Need is a Premium Partner',
    footerCompact: '© 2026 DataFlowr · Boutique Exact Online integration partner',
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
