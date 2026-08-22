import type { Lang, LegalKey } from '../lib/site';

/**
 * Copy for the two legal pages, reintroduced from the previous site
 * (client/src/components/{privacy,terms}-page.tsx in the app repository,
 * removed there by ADR 0081 when the marketing site split off).
 *
 * The old text was generic: it never named Exact Online, the Claire
 * subscription or a single processor. It is rewritten here against what the
 * product actually does, so the Connectors Directory requirement (collection,
 * use, storage, third-party sharing, retention, contact) is met by naming
 * things rather than by covering the headings.
 *
 * Periods and thresholds that are business decisions rather than facts about
 * the code are marked with CONFIRM below. They read as ordinary commitments to
 * a visitor, so they need a decision from DataFlowr before this goes live.
 */

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: { strong: string; rest: string }[] }
  /** Sentence ending in a mailto link, rendered with a full stop after it. */
  | { type: 'mail'; text: string; address: 'privacy' | 'info' }
  /** Sentence ending in a link to the other legal page. */
  | { type: 'doclink'; text: string; label: string; to: LegalKey };

export interface LegalSection {
  /** Anchor and table-of-contents target. */
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  lastUpdated: string;
  sections: LegalSection[];
}

/** Shared chrome around the two documents. */
export const legalUi = {
  nl: {
    tocTitle: 'Op deze pagina',
    detailsTitle: 'Bedrijfsgegevens',
    detailsAddress: 'Vestigingsadres',
    detailsPhone: 'Telefoon',
    detailsKvk: 'KVK-nummer',
    detailsBranch: 'Vestigingsnummer',
    crumbLegal: 'Juridisch',
  },
  en: {
    tocTitle: 'On this page',
    detailsTitle: 'Company details',
    detailsAddress: 'Registered address',
    detailsPhone: 'Phone',
    detailsKvk: 'Chamber of Commerce (KVK)',
    detailsBranch: 'Branch number',
    crumbLegal: 'Legal',
  },
} as const;

const privacyNl: LegalContent = {
  metaTitle: 'Privacyverklaring',
  metaDescription:
    'Welke gegevens DataFlowr verwerkt, waarvoor, met wie wij ze delen en hoe lang wij ze bewaren. Inclusief wat er met je Exact Online-administratie gebeurt wanneer je Claire gebruikt.',
  eyebrow: 'Juridisch',
  title: 'Privacyverklaring',
  lead: 'Deze verklaring beschrijft welke persoonsgegevens wij verwerken, waarvoor wij dat doen en welke rechten je hebt. Waar het om je Exact Online-administratie gaat, staat er ook bij wat wij niet doen.',
  lastUpdated: 'Laatst bijgewerkt: augustus 2026',
  sections: [
    {
      id: 'wie-wij-zijn',
      title: '1. Wie wij zijn',
      blocks: [
        {
          type: 'p',
          text: 'DataFlowr B.V. is verwerkingsverantwoordelijke voor de persoonsgegevens die in deze verklaring worden beschreven. Wij leveren consultancy binnen het Exact Online ecosysteem en Claire, de AI-laag boven op Exact Online. Onze bedrijfsgegevens staan onderaan deze pagina.',
        },
        { type: 'mail', text: 'Vragen over je gegevens of over deze verklaring stuur je naar', address: 'privacy' },
      ],
    },
    {
      id: 'welke-gegevens',
      title: '2. Welke gegevens wij verwerken',
      blocks: [
        { type: 'p', text: 'Wij verzamelen niet meer dan de dienst nodig heeft. Welke gegevens dat zijn, hangt af van hoe je ons gebruikt.' },
        {
          type: 'list',
          items: [
            {
              strong: 'Contactgegevens.',
              rest: 'Je naam, e-mailadres, telefoonnummer, bedrijfsnaam en de inhoud van je bericht, wanneer je ons mailt of een kennismaking inplant.',
            },
            {
              strong: 'Nieuwsbrief- en downloadgegevens.',
              rest: 'Je e-mailadres, het aanmeldmoment en de pagina waarvandaan je je aanmeldde, wanneer je je aanmeldt voor de nieuwsbrief of de whitepaper downloadt.',
            },
            {
              strong: 'Accountgegevens.',
              rest: 'Je naam, e-mailadres en het inlogaccount waarmee je je aanmeldt bij app.dataflowr.nl. Het inloggen zelf loopt via onze identiteitsleverancier. Wij bewaren geen wachtwoorden.',
            },
            {
              strong: 'Koppelingsgegevens.',
              rest: 'De toegangstokens waarmee Claire namens jou met Exact Online praat, en welke administraties je hebt gekoppeld.',
            },
            {
              strong: 'Administratiegegevens.',
              rest: 'Wat Claire per vraag uit je Exact Online-administratie ophaalt, en de gesprekken die je met haar voert. Die staan in je account, zodat je ze kunt teruglezen.',
            },
            {
              strong: 'Gebruiks- en beveiligingslogs.',
              rest: 'Welke actie wanneer en onder welk account is uitgevoerd, plus technische gegevens zoals IP-adres en tijdstip. Die hebben wij nodig om misbruik te zien en storingen te herstellen.',
            },
            {
              strong: 'Facturatiegegevens.',
              rest: 'Bedrijfsnaam, adres, btw-nummer en factuurhistorie. De betaling zelf verwerkt onze betaaldienstverlener. Volledige kaartgegevens komen niet bij ons binnen.',
            },
          ],
        },
      ],
    },
    {
      id: 'waarvoor',
      title: '3. Waarvoor wij ze gebruiken',
      blocks: [
        { type: 'p', text: 'Wij gebruiken je gegevens voor zes dingen.' },
        {
          type: 'list',
          items: [
            { strong: 'De dienst leveren.', rest: 'Je account, de koppeling met Exact Online en de antwoorden die Claire geeft.' },
            { strong: 'Je ondersteunen.', rest: 'Vragen beantwoorden, storingen onderzoeken en meekijken wanneer je daarom vraagt.' },
            { strong: 'Factureren.', rest: 'Abonnementen en opdrachten in rekening brengen en onze eigen boekhouding voeren.' },
            { strong: 'Beveiligen.', rest: 'Misbruik en ongeautoriseerde toegang signaleren, en achteraf kunnen nagaan wat er is gebeurd.' },
            { strong: 'De dienst verbeteren.', rest: 'Zien waar Claire vastloopt of het mis heeft, zodat wij dat kunnen verhelpen.' },
            { strong: 'Contact houden.', rest: 'Je op de hoogte brengen van wijzigingen die je raken. Afmelden voor niet-noodzakelijke berichten kan altijd.' },
          ],
        },
        {
          type: 'p',
          text: 'Wij doen dat om onze overeenkomst met jou uit te voeren, om te voldoen aan een wettelijke plicht zoals de fiscale bewaarplicht, of op grond van een gerechtvaardigd belang zoals de beveiliging van het platform. Waar wij toestemming nodig hebben, vragen wij die vooraf en kun je die weer intrekken.',
        },
      ],
    },
    {
      id: 'exact-online',
      title: '4. Je administratie in Exact Online',
      blocks: [
        { type: 'p', text: 'Claire werkt op je eigen Exact Online-administratie. Daarvoor gelden vier regels die wij niet oprekken.' },
        {
          type: 'list',
          items: [
            {
              strong: 'Toegang per gebruiker.',
              rest: 'Je koppelt met je eigen Exact Online-account. Claire kan precies wat je daar mag, niets meer, en elke actie wordt onder je eigen gebruiker gelogd.',
            },
            {
              strong: 'Ophalen per vraag.',
              rest: 'Claire haalt op wat een antwoord nodig heeft, op het moment dat je het vraagt. Er ontstaat geen kopie van je administratie in een extern platform.',
            },
            {
              strong: 'Lezen vrij, schrijven na akkoord.',
              rest: 'Claire leest en rekent zelfstandig. Een wijziging in je administratie komt eerst als voorstel bij je te staan en wordt pas uitgevoerd nadat je akkoord geeft.',
            },
            {
              strong: 'Intrekken werkt meteen.',
              rest: 'Je trekt de koppeling in vanuit je account of vanuit Exact Online. Daarna haalt Claire niets meer op.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Gebruik je Claire vanuit je eigen AI-client, bijvoorbeeld Claude, ChatGPT of Microsoft Copilot, dan lopen je vragen en de antwoorden ook door dat programma heen. Wat die aanbieder daarmee doet, valt onder je overeenkomst met die aanbieder en niet onder deze verklaring.',
        },
      ],
    },
    {
      id: 'delen',
      title: '5. Met wie wij gegevens delen',
      blocks: [
        {
          type: 'p',
          text: 'Wij verkopen je gegevens niet en gebruiken ze niet voor advertenties. Voor het draaien van de dienst schakelen wij een beperkt aantal verwerkers in, met elk een verwerkersovereenkomst.',
        },
        {
          type: 'list',
          items: [
            { strong: 'Inloggen en accountbeheer.', rest: 'Auth0 (Okta) verzorgt de aanmelding en het beheer van accounts.' },
            { strong: 'Betalingen.', rest: 'Stripe verwerkt de abonnementsbetalingen en bewaart de betaalgegevens.' },
            { strong: 'AI-modellen.', rest: 'OpenRouter routeert je vraag naar het taalmodel dat het antwoord opstelt.' },
            { strong: 'Hosting en database.', rest: 'Onze hostingpartij draait de applicatie en de database waarin je account staat.' },
            // CONFIRM: noem hier de gekozen mailingtool (bijv. Laposta of Brevo)
            // zodra het account bestaat; zie CLAUDE.md, "Nieuwsbrief en whitepaper".
            { strong: 'Nieuwsbrief en whitepaper.', rest: 'Onze mailingsoftware bewaart de aanmeldingen en verzorgt het versturen en het afmelden.' },
          ],
        },
        { type: 'p', text: 'Daarnaast verstrekken wij gegevens wanneer de wet ons daartoe verplicht.' },
      ],
    },
    {
      id: 'bewaartermijnen',
      title: '6. Hoe lang wij ze bewaren',
      blocks: [
        { type: 'p', text: 'Wij bewaren niets langer dan nodig. Per soort gegeven houden wij deze termijnen aan.' },
        {
          type: 'list',
          items: [
            // CONFIRM: 24 maanden, 90 dagen en 12 maanden zijn beleidskeuzes, geen
            // feiten uit de code. Vaststellen voordat dit live gaat.
            { strong: 'Contactgegevens.', rest: 'Tot 24 maanden na het laatste contact, tenzij er een opdracht uit voortkomt.' },
            { strong: 'Nieuwsbriefaanmeldingen.', rest: 'Tot je je afmeldt. Afmelden kan onderaan elke mail; daarna verdwijnt je adres uit de verzendlijst.' },
            { strong: 'Account en gesprekken.', rest: 'Zolang je abonnement loopt. Na opzegging verwijderen wij het account en de bewaarde gesprekken binnen 90 dagen.' },
            { strong: 'Koppelingsgegevens.', rest: 'Tot je de koppeling intrekt of je account opzegt. Daarna vervallen de tokens en verwijderen wij ze.' },
            { strong: 'Logs.', rest: 'Twaalf maanden, zodat wij een incident achteraf kunnen onderzoeken.' },
            { strong: 'Facturen en boekhouding.', rest: 'Zeven jaar, omdat de fiscale bewaarplicht ons daartoe verplicht.' },
          ],
        },
      ],
    },
    {
      id: 'beveiliging',
      title: '7. Beveiliging',
      blocks: [
        {
          type: 'p',
          text: 'Al het verkeer met onze applicatie en met Exact Online loopt over een versleutelde verbinding. De koppeling verloopt via OAuth, zodat je ons nooit je Exact Online-wachtwoord geeft. Toegang tot productiesystemen is beperkt tot de medewerkers die hem nodig hebben, en elke handeling in Claire wordt gelogd onder de gebruiker die hem uitvoerde.',
        },
        { type: 'mail', text: 'Vermoed je een kwetsbaarheid of een datalek, meld dat dan zo snel mogelijk op', address: 'privacy' },
      ],
    },
    {
      id: 'rechten',
      title: '8. Je rechten',
      blocks: [
        {
          type: 'p',
          text: 'Je hebt het recht om je gegevens in te zien, te laten corrigeren of te laten verwijderen. Ook kun je de verwerking laten beperken, bezwaar maken tegen een verwerking en je gegevens in een gangbaar bestandsformaat opvragen.',
        },
        { type: 'mail', text: 'Een verzoek stuur je naar', address: 'privacy' },
        {
          type: 'p',
          text: 'Wij reageren binnen een maand. Ben je het niet eens met de afhandeling, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.',
        },
      ],
    },
    {
      id: 'cookies',
      title: '9. Cookies',
      blocks: [
        {
          type: 'p',
          text: 'Deze website plaatst geen trackingcookies en gebruikt geen analytics. Twee onderdelen halen wel gegevens bij derden op: het lettertype komt van Google Fonts, en op de pagina Over ons staat een agenda van Calendly waarmee je een afspraak inplant. Beide zien daarbij je IP-adres.',
        },
        {
          type: 'p',
          text: 'De applicatie op app.dataflowr.nl gebruikt een functionele cookie om je sessie vast te houden. Die is nodig om ingelogd te blijven en volgt je niet.',
        },
      ],
    },
    {
      id: 'wijzigingen',
      title: '10. Wijzigingen',
      blocks: [
        {
          type: 'p',
          text: 'Verandert de dienst, dan passen wij deze verklaring aan. De datum bovenaan de pagina laat zien wanneer dat voor het laatst gebeurde. Raakt een wijziging je wezenlijk, dan melden wij die voordat zij ingaat.',
        },
        { type: 'doclink', text: 'De voorwaarden waaronder wij leveren staan in onze', label: 'algemene voorwaarden', to: 'terms' },
      ],
    },
  ],
};

const privacyEn: LegalContent = {
  metaTitle: 'Privacy Policy',
  metaDescription:
    'What data DataFlowr processes, what for, who we share it with and how long we keep it. Including what happens to your Exact Online administration when you use Claire.',
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  lead: 'This policy sets out which personal data we process, what we use it for and which rights you have. Where your Exact Online administration is concerned, it also states what we do not do.',
  lastUpdated: 'Last updated: August 2026',
  sections: [
    {
      id: 'who-we-are',
      title: '1. Who we are',
      blocks: [
        {
          type: 'p',
          text: 'DataFlowr B.V. is the controller for the personal data described in this policy. We provide consultancy within the Exact Online ecosystem and Claire, the AI layer on top of Exact Online. Our company details are at the bottom of this page.',
        },
        { type: 'mail', text: 'For questions about your data or about this policy, write to', address: 'privacy' },
      ],
    },
    {
      id: 'what-we-collect',
      title: '2. What we collect',
      blocks: [
        { type: 'p', text: 'We collect no more than the service needs. Which data that is depends on how you use DataFlowr.' },
        {
          type: 'list',
          items: [
            {
              strong: 'Contact details.',
              rest: 'Your name, email address, phone number, company name and the content of your message, when you email us or book an intro call.',
            },
            {
              strong: 'Newsletter and download data.',
              rest: 'Your email address, the signup moment and the page you signed up from, when you subscribe to the newsletter or download the whitepaper.',
            },
            {
              strong: 'Account details.',
              rest: 'Your name, email address and the login account you sign in with at app.dataflowr.nl. Signing in runs through our identity provider. We hold no passwords.',
            },
            {
              strong: 'Connection data.',
              rest: 'The access tokens Claire uses to talk to Exact Online on your behalf, and which administrations you have connected.',
            },
            {
              strong: 'Administration data.',
              rest: 'What Claire fetches from your Exact Online administration for a given question, and the conversations you have with her. Those sit in your account so you can read them back.',
            },
            {
              strong: 'Usage and security logs.',
              rest: 'Which action ran when and under which account, plus technical data such as IP address and timestamp. We need those to spot misuse and to fix outages.',
            },
            {
              strong: 'Billing details.',
              rest: 'Company name, address, VAT number and invoice history. The payment itself is handled by our payment provider. Full card details never reach us.',
            },
          ],
        },
      ],
    },
    {
      id: 'what-we-use-it-for',
      title: '3. What we use it for',
      blocks: [
        { type: 'p', text: 'We use your data for six things.' },
        {
          type: 'list',
          items: [
            { strong: 'Running the service.', rest: 'Your account, the connection to Exact Online and the answers Claire gives.' },
            { strong: 'Supporting you.', rest: 'Answering questions, investigating faults and looking along when you ask us to.' },
            { strong: 'Billing.', rest: 'Invoicing subscriptions and engagements, and keeping our own books.' },
            { strong: 'Security.', rest: 'Spotting misuse and unauthorised access, and being able to establish afterwards what happened.' },
            { strong: 'Improving the service.', rest: 'Seeing where Claire gets stuck or gets it wrong, so we can fix it.' },
            { strong: 'Staying in touch.', rest: 'Telling you about changes that affect you. You can opt out of anything non-essential at any time.' },
          ],
        },
        {
          type: 'p',
          text: 'We do so to perform our agreement with you, to meet a legal obligation such as the statutory retention period for accounting records, or on the basis of a legitimate interest such as securing the platform. Where we need consent we ask for it up front, and you can withdraw it again.',
        },
      ],
    },
    {
      id: 'exact-online',
      title: '4. Your administration in Exact Online',
      blocks: [
        { type: 'p', text: 'Claire works on your own Exact Online administration. Four rules apply there, and we do not stretch them.' },
        {
          type: 'list',
          items: [
            {
              strong: 'Access per user.',
              rest: 'You connect with your own Exact Online account. Claire can do exactly what you are allowed to do there, nothing more, and every action is logged under your own user.',
            },
            {
              strong: 'Fetched per question.',
              rest: 'Claire fetches what an answer needs, at the moment you ask. No copy of your administration ends up in an external platform.',
            },
            {
              strong: 'Reads freely, writes after approval.',
              rest: 'Claire reads and calculates on her own. A change to your administration is first put to you as a proposal and is only carried out once you approve it.',
            },
            {
              strong: 'Revoking takes effect at once.',
              rest: 'You revoke the connection from your account or from Exact Online. After that Claire fetches nothing.',
            },
          ],
        },
        {
          type: 'p',
          text: 'If you use Claire from your own AI client, for instance Claude, ChatGPT or Microsoft Copilot, your questions and the answers also pass through that program. What that provider does with them falls under your agreement with that provider, not under this policy.',
        },
      ],
    },
    {
      id: 'sharing',
      title: '5. Who we share it with',
      blocks: [
        {
          type: 'p',
          text: 'We do not sell your data and we do not use it for advertising. To run the service we rely on a small number of processors, each under a data processing agreement.',
        },
        {
          type: 'list',
          items: [
            { strong: 'Sign-in and account management.', rest: 'Auth0 (Okta) handles authentication and account management.' },
            { strong: 'Payments.', rest: 'Stripe processes subscription payments and holds the payment details.' },
            { strong: 'AI models.', rest: 'OpenRouter routes your question to the language model that drafts the answer.' },
            { strong: 'Hosting and database.', rest: 'Our hosting provider runs the application and the database your account lives in.' },
            // CONFIRM: name the chosen mailing tool (e.g. Laposta or Brevo) once
            // the account exists; see CLAUDE.md, "Newsletter and whitepaper".
            { strong: 'Newsletter and whitepaper.', rest: 'Our mailing software stores the signups and handles sending and unsubscribing.' },
          ],
        },
        { type: 'p', text: 'Beyond that, we disclose data where the law obliges us to.' },
      ],
    },
    {
      id: 'retention',
      title: '6. How long we keep it',
      blocks: [
        { type: 'p', text: 'We keep nothing longer than we need to. These are the periods we apply.' },
        {
          type: 'list',
          items: [
            { strong: 'Contact details.', rest: 'Up to 24 months after the last contact, unless an engagement follows from it.' },
            { strong: 'Newsletter signups.', rest: 'Until you unsubscribe. You can unsubscribe at the bottom of every email; after that your address disappears from the mailing list.' },
            { strong: 'Account and conversations.', rest: 'For as long as your subscription runs. After you cancel, we delete the account and the stored conversations within 90 days.' },
            { strong: 'Connection data.', rest: 'Until you revoke the connection or cancel your account. The tokens then lapse and we delete them.' },
            { strong: 'Logs.', rest: 'Twelve months, so we can investigate an incident after the fact.' },
            { strong: 'Invoices and accounting records.', rest: 'Seven years, because Dutch tax law requires it.' },
          ],
        },
      ],
    },
    {
      id: 'security',
      title: '7. Security',
      blocks: [
        {
          type: 'p',
          text: 'All traffic with our application and with Exact Online runs over an encrypted connection. The connection is made through OAuth, so you never hand us your Exact Online password. Access to production systems is limited to the staff who need it, and every action in Claire is logged under the user who performed it.',
        },
        { type: 'mail', text: 'If you suspect a vulnerability or a data breach, report it as soon as you can to', address: 'privacy' },
      ],
    },
    {
      id: 'your-rights',
      title: '8. Your rights',
      blocks: [
        {
          type: 'p',
          text: 'You have the right to access your data, to have it corrected and to have it deleted. You can also have processing restricted, object to a particular processing and request your data in a common file format.',
        },
        { type: 'mail', text: 'Send a request to', address: 'privacy' },
        {
          type: 'p',
          text: 'We respond within a month. If you disagree with how we handle it, you can lodge a complaint with the Dutch Data Protection Authority.',
        },
      ],
    },
    {
      id: 'cookies',
      title: '9. Cookies',
      blocks: [
        {
          type: 'p',
          text: 'This website sets no tracking cookies and runs no analytics. Two elements do fetch from third parties: the typeface comes from Google Fonts, and the About us page carries a Calendly scheduler for booking a call. Both see your IP address in the process.',
        },
        {
          type: 'p',
          text: 'The application at app.dataflowr.nl uses one functional cookie to hold your session. It is needed to stay signed in and it does not track you.',
        },
      ],
    },
    {
      id: 'changes',
      title: '10. Changes',
      blocks: [
        {
          type: 'p',
          text: 'When the service changes, we update this policy. The date at the top of the page shows when that last happened. If a change materially affects you, we say so before it takes effect.',
        },
        { type: 'doclink', text: 'The terms we deliver under are set out in our', label: 'terms of service', to: 'terms' },
      ],
    },
  ],
};

const termsNl: LegalContent = {
  metaTitle: 'Algemene voorwaarden',
  metaDescription:
    'De voorwaarden waaronder DataFlowr consultancy levert en Claire als abonnement aanbiedt: wat je krijgt, wat je zelf blijft doen, en hoe opzeggen en aansprakelijkheid geregeld zijn.',
  eyebrow: 'Juridisch',
  title: 'Algemene voorwaarden',
  lead: 'Deze voorwaarden gelden voor onze consultancy-opdrachten en voor het gebruik van Claire. Spreekt een offerte of opdrachtbevestiging iets anders af, dan gaat die afspraak voor.',
  lastUpdated: 'Laatst bijgewerkt: augustus 2026',
  sections: [
    {
      id: 'toepasselijkheid',
      title: '1. Toepasselijkheid',
      blocks: [
        {
          type: 'p',
          text: 'Deze voorwaarden gelden voor elk aanbod en elke overeenkomst van DataFlowr B.V., en voor het gebruik van onze website en van Claire. Wijkt een ondertekende offerte of opdrachtbevestiging hiervan af, dan geldt wat daarin staat.',
        },
        { type: 'p', text: 'Je eigen inkoopvoorwaarden zijn niet van toepassing, tenzij wij die schriftelijk hebben aanvaard.' },
      ],
    },
    {
      id: 'diensten',
      title: '2. Wat wij leveren',
      blocks: [
        { type: 'p', text: 'Ons werk valt uiteen in twee vormen.' },
        {
          type: 'list',
          items: [
            {
              strong: 'Consultancy.',
              rest: 'Implementatie en optimalisatie binnen Exact Online Premium, integraties, workflow-orkestratie, RPA en training. De omvang leggen wij per opdracht vast in een offerte of opdrachtbevestiging.',
            },
            {
              strong: 'Claire.',
              rest: 'Een abonnement op de AI-laag boven op je eigen Exact Online-administratie, te gebruiken via app.dataflowr.nl en via MCP-clients zoals Claude, ChatGPT en Microsoft Copilot.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Een consultancy-opdracht voeren wij uit als inspanningsverplichting, met de zorg die je van een specialist mag verwachten. Een afgesproken resultaat garanderen wij alleen wanneer dat met zoveel woorden in de opdrachtbevestiging staat.',
        },
      ],
    },
    {
      id: 'account',
      title: '3. Je account',
      blocks: [
        {
          type: 'p',
          text: 'Voor Claire heb je een account nodig en koppel je je eigen Exact Online-administratie. Je bent verantwoordelijk voor wat er onder je account gebeurt en houdt je inloggegevens voor jezelf. Deel je een account met collega’s, dan kunnen wij een handeling niet meer aan één persoon toerekenen.',
        },
        { type: 'p', text: 'Vermoed je dat iemand anders bij je account kan, meld dat dan meteen, dan blokkeren wij de toegang.' },
      ],
    },
    {
      id: 'gebruik',
      title: '4. Gebruik van Claire, en wat je zelf blijft doen',
      blocks: [
        { type: 'p', text: 'Claire stelt haar antwoorden op met een taalmodel. Een taalmodel kan zich vergissen, ook wanneer het antwoord stellig klinkt. Daarom geldt het volgende.' },
        {
          type: 'list',
          items: [
            {
              strong: 'Je administratie blijft van jou.',
              rest: 'Je boekingen, je aangiften en je jaarrekening blijven je verantwoordelijkheid. Claire is een hulpmiddel, geen accountant en geen belastingadviseur.',
            },
            {
              strong: 'Beoordeel voordat je akkoord geeft.',
              rest: 'Claire schrijft niets naar Exact Online zonder je akkoord. Dat akkoord is het moment waarop je het voorstel controleert.',
            },
            {
              strong: 'Gebruik binnen de wet.',
              rest: 'Je zet de dienst niet in voor onrechtmatige doeleinden en niet op een manier die onze systemen of die van Exact Online overbelast.',
            },
            {
              strong: 'Geen doorverkoop.',
              rest: 'Je verkoopt de toegang niet door en geeft hem niet aan derden buiten je organisatie, tenzij je abonnement daar ruimte voor biedt of wij het anders afspreken.',
            },
          ],
        },
      ],
    },
    {
      id: 'prijzen',
      title: '5. Prijzen, betaling en duur',
      blocks: [
        // CONFIRM: de betaaltermijn van 14 dagen en de aankondigingstermijn van
        // een maand bij een prijsverhoging zijn beleidskeuzes. Vaststellen
        // voordat dit live gaat.
        {
          type: 'p',
          text: 'De abonnementsprijzen staan op de Claire-pagina en zijn exclusief btw. Een abonnement loopt per maand en is maandelijks opzegbaar. Opzeggen doe je in je account; de opzegging gaat in aan het einde van de lopende periode. Over een periode die al is gefactureerd, betalen wij niet terug.',
        },
        {
          type: 'p',
          text: 'Abonnementen worden geïncasseerd via onze betaaldienstverlener. Consultancy factureren wij volgens de offerte, met een betaaltermijn van 14 dagen. Betaal je niet op tijd, dan mogen wij de wettelijke handelsrente en incassokosten in rekening brengen.',
        },
        {
          type: 'p',
          text: 'Wij mogen onze prijzen aanpassen. Een verhoging kondigen wij minimaal een maand van tevoren aan, zodat je kunt opzeggen tegen de datum waarop zij ingaat.',
        },
      ],
    },
    {
      id: 'beschikbaarheid',
      title: '6. Beschikbaarheid en onderhoud',
      blocks: [
        {
          type: 'p',
          text: 'Wij houden Claire zo goed mogelijk bereikbaar, maar beloven geen ononderbroken beschikbaarheid. Onderhoud kondigen wij aan waar dat kan. Claire draait bovendien op de API van Exact Online: valt die weg of verandert die, dan raakt dat de dienst. Wij verhelpen dat zo snel als het ons lukt.',
        },
        { type: 'p', text: 'Wij mogen functionaliteit wijzigen of uitfaseren. Verdwijnt iets waar je op leunt, dan melden wij dat vooraf.' },
      ],
    },
    {
      id: 'intellectueel-eigendom',
      title: '7. Intellectueel eigendom',
      blocks: [
        {
          type: 'p',
          text: 'Alle rechten op de website, op Claire, op onze connectoren en op het materiaal dat wij daarbij leveren, blijven bij DataFlowr. Je krijgt een gebruiksrecht dat loopt zolang je abonnement of opdracht loopt en dat je niet aan een ander mag overdragen.',
        },
        {
          type: 'p',
          text: 'Je gegevens blijven van jou. Wat in je Exact Online-administratie staat en wat je aan Claire vraagt, wordt geen eigendom van ons.',
        },
      ],
    },
    {
      id: 'vertrouwelijkheid',
      title: '8. Vertrouwelijkheid',
      blocks: [
        { type: 'p', text: 'Wat wij tijdens een opdracht over je organisatie te weten komen, houden wij vertrouwelijk, ook nadat de opdracht is afgerond.' },
        { type: 'doclink', text: 'Hoe wij persoonsgegevens verwerken, staat in onze', label: 'privacyverklaring', to: 'privacy' },
      ],
    },
    {
      id: 'aansprakelijkheid',
      title: '9. Aansprakelijkheid',
      blocks: [
        // CONFIRM: de aansprakelijkheidscap van twaalf maanden vergoeding is een
        // beleidskeuze. Vaststellen voordat dit live gaat.
        {
          type: 'p',
          text: 'Wij zijn niet aansprakelijk voor indirecte schade, waaronder gederfde winst, gemiste besparingen, gevolgschade en schade door verlies van gegevens.',
        },
        {
          type: 'p',
          text: 'Onze aansprakelijkheid is per gebeurtenis en per kalenderjaar beperkt tot het bedrag dat je in de twaalf maanden vóór de schade aan ons hebt betaald voor de dienst waaruit de schade voortkomt. Die beperking vervalt bij opzet of bewuste roekeloosheid van onze kant.',
        },
        {
          type: 'p',
          text: 'Wij zijn niet aansprakelijk voor de gevolgen van een boeking die je hebt goedgekeurd, of van een beslissing die je op een antwoord van Claire hebt gebaseerd. Zie het artikel hierboven over wat je zelf blijft doen.',
        },
      ],
    },
    {
      id: 'opzegging',
      title: '10. Opzegging en beëindiging',
      blocks: [
        {
          type: 'p',
          text: 'Je zegt een abonnement op in je account, tegen het einde van de lopende maand. Wij mogen een account opschorten of beëindigen wanneer je deze voorwaarden schendt of wanneer een factuur na aanmaning open blijft staan.',
        },
        {
          type: 'p',
          text: 'Na beëindiging trek je de koppeling met Exact Online in, of doen wij dat. Je gegevens verwijderen wij volgens de termijnen in de privacyverklaring. Vraag je vooraf om een export van je gesprekken, dan leveren wij die.',
        },
      ],
    },
    {
      id: 'wijzigingen',
      title: '11. Wijzigingen in deze voorwaarden',
      blocks: [
        {
          type: 'p',
          text: 'Wij mogen deze voorwaarden aanpassen. De nieuwe versie publiceren wij op deze pagina, met de datum van wijziging bovenaan. Raakt een wijziging je wezenlijk, dan melden wij die minimaal een maand van tevoren en kun je opzeggen tegen de datum waarop zij ingaat.',
        },
      ],
    },
    {
      id: 'recht',
      title: '12. Toepasselijk recht',
      blocks: [
        // CONFIRM: forumkeuze Noord-Holland volgt uit de vestiging in Hoofddorp.
        // Laat een jurist bevestigen dat dit zo blijft staan.
        {
          type: 'p',
          text: 'Op deze voorwaarden en op onze overeenkomsten is Nederlands recht van toepassing. Geschillen leggen wij voor aan de bevoegde rechter in Noord-Holland, tenzij de wet een andere rechter aanwijst.',
        },
        { type: 'mail', text: 'Vragen over deze voorwaarden stuur je naar', address: 'info' },
      ],
    },
  ],
};

const termsEn: LegalContent = {
  metaTitle: 'Terms of Service',
  metaDescription:
    'The terms DataFlowr delivers consultancy and the Claire subscription under: what you get, what stays yours to do, and how cancellation and liability are arranged.',
  eyebrow: 'Legal',
  title: 'Terms of Service',
  lead: 'These terms apply to our consultancy engagements and to the use of Claire. Where a quotation or order confirmation agrees something else, that agreement prevails.',
  lastUpdated: 'Last updated: August 2026',
  sections: [
    {
      id: 'scope',
      title: '1. Scope',
      blocks: [
        {
          type: 'p',
          text: 'These terms apply to every offer and every agreement of DataFlowr B.V., and to the use of our website and of Claire. Where a signed quotation or order confirmation departs from them, what it says applies.',
        },
        { type: 'p', text: 'Your own purchasing conditions do not apply unless we have accepted them in writing.' },
      ],
    },
    {
      id: 'services',
      title: '2. What we deliver',
      blocks: [
        { type: 'p', text: 'Our work comes in two forms.' },
        {
          type: 'list',
          items: [
            {
              strong: 'Consultancy.',
              rest: 'Implementation and optimisation within Exact Online Premium, integrations, workflow orchestration, RPA and training. We record the scope per engagement in a quotation or order confirmation.',
            },
            {
              strong: 'Claire.',
              rest: 'A subscription to the AI layer on top of your own Exact Online administration, used through app.dataflowr.nl and through MCP clients such as Claude, ChatGPT and Microsoft Copilot.',
            },
          ],
        },
        {
          type: 'p',
          text: 'We carry out a consultancy engagement as a best-efforts obligation, with the care you may expect from a specialist. We guarantee a specific result only where the order confirmation says so in as many words.',
        },
      ],
    },
    {
      id: 'account',
      title: '3. Your account',
      blocks: [
        {
          type: 'p',
          text: 'Claire requires an account, and you connect your own Exact Online administration to it. You are responsible for what happens under your account and you keep your credentials to yourself. If you share an account with colleagues, we can no longer attribute an action to one person.',
        },
        { type: 'p', text: 'If you suspect someone else can reach your account, tell us at once and we will block access.' },
      ],
    },
    {
      id: 'use',
      title: '4. Using Claire, and what stays yours to do',
      blocks: [
        { type: 'p', text: 'Claire drafts her answers with a language model. A language model can be wrong, including when the answer sounds certain. So the following applies.' },
        {
          type: 'list',
          items: [
            {
              strong: 'Your administration stays yours.',
              rest: 'Your entries, your filings and your annual accounts remain your responsibility. Claire is a tool, not an accountant and not a tax adviser.',
            },
            {
              strong: 'Review before you approve.',
              rest: 'Claire writes nothing to Exact Online without your approval. That approval is the moment you check the proposal.',
            },
            {
              strong: 'Use within the law.',
              rest: 'You do not use the service for unlawful purposes, nor in a way that overloads our systems or those of Exact Online.',
            },
            {
              strong: 'No resale.',
              rest: 'You do not resell access and do not pass it to third parties outside your organisation, unless your subscription allows for it or we agree otherwise.',
            },
          ],
        },
      ],
    },
    {
      id: 'pricing',
      title: '5. Pricing, payment and term',
      blocks: [
        {
          type: 'p',
          text: 'Subscription prices are listed on the Claire page and exclude VAT. A subscription runs by the month and can be cancelled monthly. You cancel in your account, and the cancellation takes effect at the end of the current period. We do not refund a period already invoiced.',
        },
        {
          type: 'p',
          text: 'Subscriptions are collected through our payment provider. Consultancy is invoiced as set out in the quotation, with a payment term of 14 days. If you pay late, we may charge statutory commercial interest and collection costs.',
        },
        {
          type: 'p',
          text: 'We may adjust our prices. We announce an increase at least a month in advance, so you can cancel with effect from the date it takes hold.',
        },
      ],
    },
    {
      id: 'availability',
      title: '6. Availability and maintenance',
      blocks: [
        {
          type: 'p',
          text: 'We keep Claire available as best we can, but we promise no uninterrupted availability. We announce maintenance where we can. Claire also runs on the Exact Online API: if that goes down or changes, the service feels it. We put that right as quickly as we manage.',
        },
        { type: 'p', text: 'We may change or retire functionality. If something you rely on disappears, we say so in advance.' },
      ],
    },
    {
      id: 'intellectual-property',
      title: '7. Intellectual property',
      blocks: [
        {
          type: 'p',
          text: 'All rights to the website, to Claire, to our connectors and to the material we deliver alongside them remain with DataFlowr. You receive a right of use that runs for as long as your subscription or engagement runs and that you may not transfer to anyone else.',
        },
        {
          type: 'p',
          text: 'Your data stays yours. What sits in your Exact Online administration and what you ask Claire does not become our property.',
        },
      ],
    },
    {
      id: 'confidentiality',
      title: '8. Confidentiality',
      blocks: [
        { type: 'p', text: 'What we learn about your organisation during an engagement we keep confidential, including after the engagement ends.' },
        { type: 'doclink', text: 'How we process personal data is set out in our', label: 'privacy policy', to: 'privacy' },
      ],
    },
    {
      id: 'liability',
      title: '9. Liability',
      blocks: [
        {
          type: 'p',
          text: 'We are not liable for indirect damage, including lost profit, missed savings, consequential loss and damage from loss of data.',
        },
        {
          type: 'p',
          text: 'Our liability is limited, per event and per calendar year, to the amount you paid us in the twelve months before the damage for the service the damage arises from. That limit falls away in the case of intent or wilful recklessness on our part.',
        },
        {
          type: 'p',
          text: 'We are not liable for the consequences of an entry you approved, or of a decision you based on an answer from Claire. See the article above on what stays yours to do.',
        },
      ],
    },
    {
      id: 'termination',
      title: '10. Cancellation and termination',
      blocks: [
        {
          type: 'p',
          text: 'You cancel a subscription in your account, with effect from the end of the current month. We may suspend or terminate an account if you breach these terms or if an invoice stays unpaid after a reminder.',
        },
        {
          type: 'p',
          text: 'After termination you revoke the connection to Exact Online, or we do. We delete your data on the periods set out in the privacy policy. If you ask for an export of your conversations beforehand, we provide one.',
        },
      ],
    },
    {
      id: 'changes',
      title: '11. Changes to these terms',
      blocks: [
        {
          type: 'p',
          text: 'We may amend these terms. We publish the new version on this page, with the date of the change at the top. If a change materially affects you, we announce it at least a month in advance and you can cancel with effect from the date it takes hold.',
        },
      ],
    },
    {
      id: 'governing-law',
      title: '12. Governing law',
      blocks: [
        {
          type: 'p',
          text: 'Dutch law applies to these terms and to our agreements. We bring disputes before the competent court in Noord-Holland, unless the law designates another court.',
        },
        { type: 'mail', text: 'For questions about these terms, write to', address: 'info' },
      ],
    },
  ],
};

export const legal: Record<Lang, Record<LegalKey, LegalContent>> = {
  nl: { privacy: privacyNl, terms: termsNl },
  en: { privacy: privacyEn, terms: termsEn },
};
