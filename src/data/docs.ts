import { APP_URL, EMAIL_INFO, PHONE_DISPLAY, PHONE_TEL, routes, type DocKey } from '../lib/site';

/**
 * Product documentation for Claire. One entry per page in routes.docPages;
 * DocPage.astro renders the blocks, derives the TOC from the h2 blocks and
 * builds the previous/next links from the route-table order.
 *
 * These pages are what "Standaard support" refers to on the pricing cards:
 * a customer on that plan starts here instead of a guided onboarding. Claim
 * only what the app does today; the terminology follows the app's own UI
 * (verbinding, administratie, planningen, afsluitsignalen, auditlog).
 *
 * Text fields support one inline form: [label](href) becomes a link.
 */

export type DocBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'steps'; items: { strong: string; rest: string }[] }
  | { type: 'note'; text: string }
  | { type: 'code'; label: string; text: string }
  /**
   * Product screenshot (16:9, 2880×1620), captured from the Claire app via
   * scripts/capture-documentatie.spec.ts into public/documentatie/. A few
   * reuse the kennisbank captures where the staged state is identical.
   */
  | { type: 'figure'; src: string; alt: string; caption: string };

export interface DocContent {
  metaTitle: string;
  metaDescription: string;
  crumbCurrent: string;
  title: string;
  /** One sentence for the card on the documentation index. */
  summary: string;
  lead: string;
  blocks: DocBlock[];
}

export interface Doc {
  /** Index group; the overview page renders the groups in this order. */
  group: 'start' | 'connect' | 'use' | 'manage';
  nl: DocContent;
  en: DocContent;
}

/** Shared page furniture strings. */
export const docsUi = {
  nl: {
    crumbDocs: 'Documentatie',
    tocTitle: 'Op deze pagina',
    groups: { start: 'Starten', connect: 'Koppelen', use: 'Gebruiken', manage: 'Beheren' },
    prev: '← Vorige',
    next: 'Volgende →',
    supportTitle: 'Kom je er niet uit?',
    supportBody: 'Supportvragen komen direct terecht bij de founders die Claire bouwen.',
    supportCta: 'Naar ondersteuning',
  },
  en: {
    crumbDocs: 'Documentation',
    tocTitle: 'On this page',
    groups: { start: 'Getting started', connect: 'Connecting', use: 'Everyday use', manage: 'Managing' },
    prev: '← Previous',
    next: 'Next →',
    supportTitle: 'Stuck on something?',
    supportBody: 'Support questions go straight to the founders who build Claire.',
    supportCta: 'Go to support',
  },
} as const;

export const docs: Record<DocKey, Doc> = {
  'aan-de-slag': {
    group: 'start',
    nl: {
      metaTitle: 'Aan de slag met Claire, van plan tot eerste vraag',
      metaDescription:
        'Stap voor stap live met Claire: account aanmaken, een plan kiezen, Exact Online koppelen via OAuth en je eerste vraag stellen. Zonder implementatietraject.',
      crumbCurrent: 'Aan de slag',
      title: 'Aan de slag met Claire',
      summary: 'Account aanmaken, plan kiezen, Exact Online koppelen en je eerste vraag stellen.',
      lead:
        'Claire koppel je zelf, zonder implementatietraject. Dit is de route van plan kiezen tot eerste vraag, met wat je onderweg nodig hebt.',
      blocks: [
        { type: 'h2', id: 'nodig', text: 'Wat je nodig hebt' },
        {
          type: 'ul',
          items: [
            'Een Exact Online-account met toegang tot de administratie die je wilt koppelen.',
            'Een Google-account, Microsoft-account of e-mailadres om mee in te loggen bij DataFlowr.',
            'Ga je met een team werken, dan kiest de beheerder het plan en nodigt daarna de collega’s uit.',
          ],
        },
        { type: 'h2', id: 'stappen', text: 'Van plan tot koppeling' },
        {
          type: 'steps',
          items: [
            {
              strong: 'Kies je plan.',
              rest: ` Dat doe je op de [Claire-pagina](${routes.claire.nl}#pricing). Een account aanmaken kan ook eerst, op [app.dataflowr.nl](${APP_URL}); registreren kost niets.`,
            },
            {
              strong: 'Log in of registreer.',
              rest: ' Inloggen kan met Google, Microsoft of je e-mailadres. Je keuze reist mee door het inloggen heen, dus je komt terug waar je was.',
            },
            {
              strong: 'Rond de betaling af.',
              rest: ' Je rekent af via Stripe. Het abonnement geldt voor je hele team en is maandelijks opzegbaar.',
            },
            {
              strong: 'Keur de koppeling goed bij Exact Online.',
              rest: ' Na de betaling ga je met één knop door naar Exact Online en log je daar in met je eigen account. De koppeling loopt via de officiële API’s met OAuth; wij zien of bewaren je Exact-wachtwoord niet.',
            },
            {
              strong: 'Open Claire.',
              rest: ' Na de goedkeuring zie je je administratie bevestigd, met de knop Open Claire. Stel je eerste vraag, bijvoorbeeld: welke facturen staan open?',
            },
          ],
        },
        {
          type: 'figure',
          src: '/documentatie/plan-kiezen-nl.png',
          alt: 'De plankiezer in de Claire-app met de plannen Individueel, Bedrijf en Kantoor',
          caption: 'Stap 1 en 3: de plankiezer. Eén abonnement dekt je hele team en is maandelijks opzegbaar.',
        },
        {
          type: 'figure',
          src: '/documentatie/verbonden-nl.png',
          alt: 'De bevestigingspagina na het koppelen: Exact Online is gekoppeld, met de knop Open Claire',
          caption: 'Na de goedkeuring bij Exact Online: de administratie is bevestigd en Claire staat klaar.',
        },
        {
          type: 'p',
          text: 'De koppeling zelf is in een paar minuten rond. Daarna houdt het dashboard een korte checklist bij: tools kiezen voor de verbinding, je eerste vraag stellen, een AI-assistent koppelen en de maandafsluiting inplannen.',
        },
        { type: 'h2', id: 'meerdere-administraties', text: 'Meerdere administraties' },
        {
          type: 'p',
          text: `Eén koppeling ontsluit de administraties waar jouw Exact Online-account bij kan. In het gesprek wissel je van administratie met de bedrijfsknop naast het invoerveld. Hoeveel administraties bij je plan horen staat op de [Claire-pagina](${routes.claire.nl}#pricing).`,
        },
        {
          type: 'note',
          text: `Uitgenodigd door een collega? Accepteer de uitnodiging via de link in de e-mail en koppel daarna je eigen Exact Online-account op de verbindingspagina. Meer daarover in [Team, toegang en logboek](${routes.docPages['team-en-toegang'].nl}).`,
        },
      ],
    },
    en: {
      metaTitle: 'Getting started with Claire, from plan to first question',
      metaDescription:
        'Go live with Claire step by step: create an account, pick a plan, connect Exact Online through OAuth and ask your first question. No implementation project.',
      crumbCurrent: 'Getting started',
      title: 'Getting started with Claire',
      summary: 'Create an account, pick a plan, connect Exact Online and ask your first question.',
      lead:
        'You connect Claire yourself, without an implementation project. This is the route from picking a plan to your first question, with what you need along the way.',
      blocks: [
        { type: 'h2', id: 'nodig', text: 'What you need' },
        {
          type: 'ul',
          items: [
            'An Exact Online account with access to the administration you want to connect.',
            'A Google account, Microsoft account or email address to sign in to DataFlowr with.',
            'Working as a team? The admin picks the plan and invites the colleagues afterwards.',
          ],
        },
        { type: 'h2', id: 'stappen', text: 'From plan to connection' },
        {
          type: 'steps',
          items: [
            {
              strong: 'Pick your plan.',
              rest: ` You do that on the [Claire page](${routes.claire.en}#pricing). You can also create an account first, at [app.dataflowr.nl](${APP_URL}en); registering is free.`,
            },
            {
              strong: 'Sign in or register.',
              rest: ' Sign in with Google, Microsoft or your email address. Your choice travels with you through sign-in, so you land right back where you were.',
            },
            {
              strong: 'Complete the payment.',
              rest: ' Checkout runs through Stripe. The subscription covers your whole team and can be cancelled monthly.',
            },
            {
              strong: 'Approve the connection at Exact Online.',
              rest: ' After the payment, one button takes you to Exact Online, where you sign in with your own account. The connection uses the official APIs with OAuth; we never see or store your Exact password.',
            },
            {
              strong: 'Open Claire.',
              rest: ' After approval you see your administration confirmed, with the Open Claire button. Ask your first question, for example: which invoices are outstanding?',
            },
          ],
        },
        {
          type: 'figure',
          src: '/documentatie/plan-kiezen-en.png',
          alt: 'The plan chooser in the Claire app with the Individual, Business and Firm plans',
          caption: 'Steps 1 and 3: the plan chooser. One subscription covers your whole team and cancels monthly.',
        },
        {
          type: 'figure',
          src: '/documentatie/verbonden-en.png',
          alt: 'The confirmation page after connecting: Exact Online is connected, with the Open Claire button',
          caption: 'After approving at Exact Online: the administration is confirmed and Claire is ready.',
        },
        {
          type: 'p',
          text: 'The connection itself takes minutes. From there the dashboard keeps a short checklist: choose tools for the connection, ask your first question, connect an AI assistant and schedule the month-end close.',
        },
        { type: 'h2', id: 'meerdere-administraties', text: 'Multiple administrations' },
        {
          type: 'p',
          text: `One connection opens up the administrations your Exact Online account can reach. In the conversation you switch administrations with the company button next to the message box. How many administrations your plan includes is on the [Claire page](${routes.claire.en}#pricing).`,
        },
        {
          type: 'note',
          text: `Invited by a colleague? Accept the invitation through the link in the email, then connect your own Exact Online account on the connection page. More on that in [Team, access and audit log](${routes.docPages['team-en-toegang'].en}).`,
        },
      ],
    },
  },

  claude: {
    group: 'connect',
    nl: {
      metaTitle: 'Claude koppelen aan Exact Online',
      metaDescription:
        'Koppel Claude aan Exact Online via Claire: plak één MCP-adres, log in met je DataFlowr-account en vraag naar je cijfers. Werkt in de browser, op je telefoon en in de desktop-app.',
      crumbCurrent: 'Claude',
      title: 'Claude koppelen aan Exact Online',
      summary: 'Eén adres plakken, inloggen, en Claude werkt in je administratie.',
      lead:
        'Met de connector van Claire werkt Claude rechtstreeks in je Exact Online-administratie: actuele cijfers in het gesprek, zonder exports. De koppeling is een kwestie van plakken en inloggen.',
      blocks: [
        { type: 'h2', id: 'nodig', text: 'Wat je nodig hebt' },
        {
          type: 'ul',
          items: [
            `Een Claire-abonnement met een gekoppelde administratie; zie [Aan de slag met Claire](${routes.docPages['aan-de-slag'].nl}).`,
            'Een Claude-account waarin je connectors kunt toevoegen.',
          ],
        },
        { type: 'h2', id: 'stappen', text: 'Zo koppel je Claude' },
        { type: 'code', label: 'MCP-adres', text: 'https://app.dataflowr.nl/mcp' },
        {
          type: 'steps',
          items: [
            { strong: 'Open in Claude Instellingen → Connectors', rest: ' en kies Aangepaste connector toevoegen.' },
            { strong: 'Plak het MCP-adres', rest: ' hierboven en bevestig.' },
            { strong: 'Log in met je DataFlowr-account', rest: ' en kies zo nodig de administratie waarin Claude moet werken.' },
          ],
        },
        {
          type: 'figure',
          src: '/documentatie/koppelen-claude-nl.png',
          alt: 'De verbindingspagina in de Claire-app met het MCP-adres en de setup-gids voor Claude',
          caption: 'De setup-gids op je verbindingspagina toont hetzelfde adres en dezelfde stappen, met een kopieerknop.',
        },
        {
          type: 'p',
          text: 'Eén keer toevoegen is genoeg: de connector werkt daarna in Claude in je browser, op je telefoon en in de desktop-app. Claude toont DataFlowr nog niet in zijn connector-directory; tot die vermelding er is, is het adres plakken de route.',
        },
        { type: 'h2', id: 'vragen', text: 'Wat je Claude daarna kunt vragen' },
        {
          type: 'ul',
          items: [
            '"Welke verkoopfacturen staan langer dan 60 dagen open?"',
            '"Zet de winst-en-verliesrekening van dit kwartaal naast vorig jaar."',
            '"Voer de afsluitcontroles voor juli uit."',
          ],
        },
        { type: 'h2', id: 'meerdere', text: 'Meerdere administraties' },
        {
          type: 'p',
          text: `Heb je meerdere administraties, dan vraagt DataFlowr bij het inloggen in welke administratie Claude moet werken; bij één administratie slaat die vraag over. Wisselen doe je door vanuit Claude opnieuw in te loggen. Onder Sessies op de verbindingspagina trek je de toegang weer in; zie [Team, toegang en logboek](${routes.docPages['team-en-toegang'].nl}).`,
        },
        {
          type: 'note',
          text: `Komt de koppeling niet tot stand, kijk dan bij [Problemen oplossen](${routes.docPages['problemen-oplossen'].nl}).`,
        },
      ],
    },
    en: {
      metaTitle: 'Connect Claude to Exact Online',
      metaDescription:
        'Connect Claude to Exact Online through Claire: paste one MCP address, sign in with your DataFlowr account and ask about your figures. Works in the browser, on your phone and in the desktop app.',
      crumbCurrent: 'Claude',
      title: 'Connect Claude to Exact Online',
      summary: 'Paste one address, sign in, and Claude works in your administration.',
      lead:
        'With the Claire connector, Claude works directly in your Exact Online administration: current figures in the conversation, no exports. Connecting is a matter of pasting and signing in.',
      blocks: [
        { type: 'h2', id: 'nodig', text: 'What you need' },
        {
          type: 'ul',
          items: [
            `A Claire subscription with a connected administration; see [Getting started with Claire](${routes.docPages['aan-de-slag'].en}).`,
            'A Claude account that lets you add connectors.',
          ],
        },
        { type: 'h2', id: 'stappen', text: 'How to connect Claude' },
        { type: 'code', label: 'MCP address', text: 'https://app.dataflowr.nl/mcp' },
        {
          type: 'steps',
          items: [
            { strong: 'In Claude, open Settings → Connectors', rest: ' and choose Add custom connector.' },
            { strong: 'Paste the MCP address', rest: ' above and confirm.' },
            { strong: 'Sign in with your DataFlowr account', rest: ' and pick the administration Claude should work in, if asked.' },
          ],
        },
        {
          type: 'figure',
          src: '/documentatie/koppelen-claude-en.png',
          alt: 'The connection page in the Claire app with the MCP address and the setup guide for Claude',
          caption: 'The setup guide on your connection page shows the same address and the same steps, with a copy button.',
        },
        {
          type: 'p',
          text: 'Adding it once is enough: the connector then works in Claude in your browser, on your phone and in the desktop app. Claude does not list DataFlowr in its connector directory yet; until that listing exists, pasting the address is the route.',
        },
        { type: 'h2', id: 'vragen', text: 'What to ask Claude next' },
        {
          type: 'ul',
          items: [
            '"Which sales invoices have been open for more than 60 days?"',
            '"Put this quarter’s P&L next to last year."',
            '"Run the close checks for July."',
          ],
        },
        { type: 'h2', id: 'meerdere', text: 'Multiple administrations' },
        {
          type: 'p',
          text: `With more than one administration, DataFlowr asks at sign-in which administration Claude should work in; with a single one that question is skipped. To switch, sign in again from Claude. Under Sessions on the connection page you revoke the access again; see [Team, access and audit log](${routes.docPages['team-en-toegang'].en}).`,
        },
        {
          type: 'note',
          text: `If the connection does not come through, see [Troubleshooting](${routes.docPages['problemen-oplossen'].en}).`,
        },
      ],
    },
  },

  chatgpt: {
    group: 'connect',
    nl: {
      metaTitle: 'ChatGPT koppelen aan Exact Online',
      metaDescription:
        'Koppel ChatGPT aan Exact Online via Claire: maak een connector met één MCP-adres en log in. Vereist ontwikkelaarsmodus in je ChatGPT-werkomgeving; Codex gebruikt hetzelfde adres.',
      crumbCurrent: 'ChatGPT',
      title: 'ChatGPT koppelen aan Exact Online',
      summary: 'Een eigen connector in ChatGPT, met hetzelfde adres en je DataFlowr-login.',
      lead:
        'Met de connector van Claire beantwoordt ChatGPT vragen met actuele cijfers uit je Exact Online-administratie. Je maakt één keer een connector aan en logt in; daarna staat de koppeling er.',
      blocks: [
        { type: 'h2', id: 'nodig', text: 'Wat je nodig hebt' },
        {
          type: 'ul',
          items: [
            `Een Claire-abonnement met een gekoppelde administratie; zie [Aan de slag met Claire](${routes.docPages['aan-de-slag'].nl}).`,
            'Een ChatGPT-werkomgeving waarin eigen connectors aanstaan (ontwikkelaarsmodus); dit kan een betaald ChatGPT-plan vragen.',
          ],
        },
        { type: 'h2', id: 'stappen', text: 'Zo koppel je ChatGPT' },
        { type: 'code', label: 'MCP-adres', text: 'https://app.dataflowr.nl/mcp' },
        {
          type: 'steps',
          items: [
            { strong: 'Open in ChatGPT Instellingen → Connectors', rest: ' en kies Create.' },
            { strong: 'Plak het MCP-adres', rest: ' hierboven.' },
            { strong: 'Log in met je DataFlowr-account', rest: ' zodra ChatGPT daarom vraagt, en kies zo nodig de administratie.' },
          ],
        },
        {
          type: 'figure',
          src: '/documentatie/koppelen-chatgpt-nl.png',
          alt: 'De verbindingspagina in de Claire-app met het MCP-adres en de setup-gids voor ChatGPT',
          caption: 'De setup-gids op je verbindingspagina, met het adres dat je in ChatGPT plakt.',
        },
        {
          type: 'note',
          text: 'Zie je geen Create onder Connectors? Dan staat de ontwikkelaarsmodus uit voor je werkomgeving. Vraag degene die de werkomgeving beheert om hem aan te zetten.',
        },
        { type: 'h2', id: 'vragen', text: 'Wat je ChatGPT daarna kunt vragen' },
        {
          type: 'ul',
          items: [
            '"Hoe staat de omzet er deze maand voor, per klant?"',
            '"Welke inkoopfacturen vervallen deze week?"',
            '"Maak een ouderdomsanalyse van de debiteuren."',
          ],
        },
        { type: 'h2', id: 'meerdere', text: 'Meerdere administraties en Codex' },
        {
          type: 'p',
          text: `Bij het inloggen kies je in welke administratie ChatGPT werkt; wisselen doe je door opnieuw in te loggen. Codex, de ontwikkelaarsassistent van OpenAI, gebruikt hetzelfde adres. De toegang trek je in onder Sessies op de verbindingspagina; zie [Team, toegang en logboek](${routes.docPages['team-en-toegang'].nl}).`,
        },
        {
          type: 'note',
          text: `Komt de koppeling niet tot stand, kijk dan bij [Problemen oplossen](${routes.docPages['problemen-oplossen'].nl}).`,
        },
      ],
    },
    en: {
      metaTitle: 'Connect ChatGPT to Exact Online',
      metaDescription:
        'Connect ChatGPT to Exact Online through Claire: create a connector with one MCP address and sign in. Requires developer mode in your ChatGPT workspace; Codex uses the same address.',
      crumbCurrent: 'ChatGPT',
      title: 'Connect ChatGPT to Exact Online',
      summary: 'A custom connector in ChatGPT, with the same address and your DataFlowr sign-in.',
      lead:
        'With the Claire connector, ChatGPT answers questions with current figures from your Exact Online administration. You create a connector once and sign in; after that the connection stays.',
      blocks: [
        { type: 'h2', id: 'nodig', text: 'What you need' },
        {
          type: 'ul',
          items: [
            `A Claire subscription with a connected administration; see [Getting started with Claire](${routes.docPages['aan-de-slag'].en}).`,
            'A ChatGPT workspace with custom connectors switched on (developer mode); this may require a paid ChatGPT plan.',
          ],
        },
        { type: 'h2', id: 'stappen', text: 'How to connect ChatGPT' },
        { type: 'code', label: 'MCP address', text: 'https://app.dataflowr.nl/mcp' },
        {
          type: 'steps',
          items: [
            { strong: 'In ChatGPT, open Settings → Connectors', rest: ' and choose Create.' },
            { strong: 'Paste the MCP address', rest: ' above.' },
            { strong: 'Sign in with your DataFlowr account', rest: ' when ChatGPT asks, and pick the administration if needed.' },
          ],
        },
        {
          type: 'figure',
          src: '/documentatie/koppelen-chatgpt-en.png',
          alt: 'The connection page in the Claire app with the MCP address and the setup guide for ChatGPT',
          caption: 'The setup guide on your connection page, with the address you paste into ChatGPT.',
        },
        {
          type: 'note',
          text: 'No Create option under Connectors? Then developer mode is off for your workspace. Ask whoever manages the workspace to switch it on.',
        },
        { type: 'h2', id: 'vragen', text: 'What to ask ChatGPT next' },
        {
          type: 'ul',
          items: [
            '"How is revenue doing this month, by customer?"',
            '"Which purchase invoices fall due this week?"',
            '"Build an ageing analysis of the receivables."',
          ],
        },
        { type: 'h2', id: 'meerdere', text: 'Multiple administrations and Codex' },
        {
          type: 'p',
          text: `At sign-in you pick which administration ChatGPT works in; to switch, sign in again. Codex, OpenAI’s developer assistant, uses the same address. You revoke access under Sessions on the connection page; see [Team, access and audit log](${routes.docPages['team-en-toegang'].en}).`,
        },
        {
          type: 'note',
          text: `If the connection does not come through, see [Troubleshooting](${routes.docPages['problemen-oplossen'].en}).`,
        },
      ],
    },
  },

  copilot: {
    group: 'connect',
    nl: {
      metaTitle: 'Microsoft 365 Copilot koppelen aan Exact Online',
      metaDescription:
        'Koppel Microsoft 365 Copilot aan Exact Online via Claire: download het agentpakket, upload het in Copilot of Teams en log in. Je beheerder moet eigen apps toestaan.',
      crumbCurrent: 'Copilot',
      title: 'Microsoft 365 Copilot koppelen aan Exact Online',
      summary: 'Het agentpakket uploaden in Copilot of Teams, en inloggen met je DataFlowr-account.',
      lead:
        'Met de DataFlowr-agent werkt Microsoft 365 Copilot in je Exact Online-administratie, gewoon vanuit Teams of de Copilot-app. Copilot werkt niet met een adres maar met een agentpakket dat je uploadt.',
      blocks: [
        { type: 'h2', id: 'nodig', text: 'Wat je nodig hebt' },
        {
          type: 'ul',
          items: [
            `Een Claire-abonnement met een gekoppelde administratie; zie [Aan de slag met Claire](${routes.docPages['aan-de-slag'].nl}).`,
            'Een Microsoft 365-omgeving waarin het uploaden van eigen apps is toegestaan, of een beheerder die het pakket voor de organisatie uitrolt.',
          ],
        },
        { type: 'h2', id: 'stappen', text: 'Zo koppel je Copilot' },
        {
          type: 'steps',
          items: [
            { strong: 'Download het agentpakket', rest: ` (een zip) op je [verbindingspagina](${APP_URL}connections).` },
            { strong: 'Upload het in Copilot of Teams', rest: ' via Apps, Uw apps beheren, Een app uploaden.' },
            { strong: 'Open de DataFlowr-agent en log in', rest: ' met je DataFlowr-account; kies zo nodig de administratie.' },
          ],
        },
        {
          type: 'figure',
          src: '/documentatie/koppelen-copilot-nl.png',
          alt: 'De verbindingspagina in de Claire-app met de setup-gids en downloadknop voor Microsoft 365 Copilot',
          caption: 'De setup-gids op je verbindingspagina, met de download van het agentpakket.',
        },
        {
          type: 'note',
          text: 'Het uploaden van een eigen app moet door je Microsoft 365-beheerder zijn ingeschakeld. Ziet je organisatie de uploadoptie niet, dan kan de beheerder het pakket ook organisatiebreed uitrollen vanuit het Microsoft 365-beheercentrum.',
        },
        { type: 'h2', id: 'vragen', text: 'Wat je Copilot daarna kunt vragen' },
        {
          type: 'ul',
          items: [
            '"Vat de openstaande posten samen voor het maandagoverleg."',
            '"Welke projecten lopen boven hun budget?"',
            '"Hoe ontwikkelen de personeelskosten zich dit jaar?"',
          ],
        },
        { type: 'h2', id: 'meerdere', text: 'Meerdere administraties' },
        {
          type: 'p',
          text: `Bij het inloggen kies je in welke administratie de agent werkt; die keuze blijft staan tot je opnieuw inlogt. De toegang trek je in onder Sessies op de verbindingspagina; zie [Team, toegang en logboek](${routes.docPages['team-en-toegang'].nl}).`,
        },
        {
          type: 'note',
          text: `GitHub Copilot in VS Code is een ander product: daar voeg je het MCP-adres https://app.dataflowr.nl/mcp toe in .vscode/mcp.json. Komt de koppeling niet tot stand, kijk dan bij [Problemen oplossen](${routes.docPages['problemen-oplossen'].nl}).`,
        },
      ],
    },
    en: {
      metaTitle: 'Connect Microsoft 365 Copilot to Exact Online',
      metaDescription:
        'Connect Microsoft 365 Copilot to Exact Online through Claire: download the agent package, upload it in Copilot or Teams and sign in. Your admin must allow custom apps.',
      crumbCurrent: 'Copilot',
      title: 'Connect Microsoft 365 Copilot to Exact Online',
      summary: 'Upload the agent package in Copilot or Teams, and sign in with your DataFlowr account.',
      lead:
        'With the DataFlowr agent, Microsoft 365 Copilot works in your Exact Online administration, right from Teams or the Copilot app. Copilot does not take an address but an agent package you upload.',
      blocks: [
        { type: 'h2', id: 'nodig', text: 'What you need' },
        {
          type: 'ul',
          items: [
            `A Claire subscription with a connected administration; see [Getting started with Claire](${routes.docPages['aan-de-slag'].en}).`,
            'A Microsoft 365 environment that allows uploading custom apps, or an admin who deploys the package for the organisation.',
          ],
        },
        { type: 'h2', id: 'stappen', text: 'How to connect Copilot' },
        {
          type: 'steps',
          items: [
            { strong: 'Download the agent package', rest: ` (a zip) on your [connection page](${APP_URL}en/connections).` },
            { strong: 'Upload it in Copilot or Teams', rest: ' via Apps, Manage your apps, Upload an app.' },
            { strong: 'Open the DataFlowr agent and sign in', rest: ' with your DataFlowr account; pick the administration if needed.' },
          ],
        },
        {
          type: 'figure',
          src: '/documentatie/koppelen-copilot-en.png',
          alt: 'The connection page in the Claire app with the setup guide and download button for Microsoft 365 Copilot',
          caption: 'The setup guide on your connection page, with the agent package download.',
        },
        {
          type: 'note',
          text: 'Uploading a custom app has to be enabled by your Microsoft 365 administrator. If your organisation does not see the upload option, the admin can also deploy the package organisation-wide from the Microsoft 365 admin center.',
        },
        { type: 'h2', id: 'vragen', text: 'What to ask Copilot next' },
        {
          type: 'ul',
          items: [
            '"Summarise the open items for the Monday meeting."',
            '"Which projects are running over budget?"',
            '"How are personnel costs developing this year?"',
          ],
        },
        { type: 'h2', id: 'meerdere', text: 'Multiple administrations' },
        {
          type: 'p',
          text: `At sign-in you pick which administration the agent works in; that choice stays until you sign in again. You revoke access under Sessions on the connection page; see [Team, access and audit log](${routes.docPages['team-en-toegang'].en}).`,
        },
        {
          type: 'note',
          text: `GitHub Copilot in VS Code is a different product: there you add the MCP address https://app.dataflowr.nl/mcp to .vscode/mcp.json. If the connection does not come through, see [Troubleshooting](${routes.docPages['problemen-oplossen'].en}).`,
        },
      ],
    },
  },

  automatisering: {
    group: 'connect',
    nl: {
      metaTitle: 'Make, Zapier en n8n koppelen aan Exact Online',
      metaDescription:
        'Gebruik Exact Online als bouwsteen in Make, Zapier of n8n via de MCP-connector van Claire: één adres plus een bearer token per administratie. Zo zet je het op.',
      crumbCurrent: 'Make, Zapier en n8n',
      title: 'Make, Zapier en n8n koppelen aan Exact Online',
      summary: 'Hetzelfde adres met een bearer token, als bouwsteen in je automatiseringen.',
      lead:
        'Automatiseringsplatformen loggen niet zelf in; die gebruiken het MCP-adres met een bearer token. Daarmee wordt je administratie een bouwsteen in elk scenario, van factuurcontrole tot wekelijkse overzichten.',
      blocks: [
        { type: 'h2', id: 'stappen', text: 'Zo zet je de koppeling op' },
        {
          type: 'steps',
          items: [
            { strong: 'Open je verbindingspagina', rest: ` in [de app](${APP_URL}connections) en kies Make of Zapier in de setup-gids.` },
            { strong: 'Kopieer de MCP URL en het bearer token.', rest: ' Nog geen token? Genereer het met één klik.' },
            { strong: 'Maak in je platform een MCP-verbinding', rest: ' met die URL, en stuur het token mee als Authorization-header: Bearer gevolgd door het token.' },
          ],
        },
        {
          type: 'figure',
          src: '/documentatie/koppelen-make-nl.png',
          alt: 'De verbindingspagina in de Claire-app met het MCP-adres, het bearer token en de setup-gids voor Make',
          caption: 'De setup-gids voor Make: de URL en de Authorization-header staan klaar om te kopiëren.',
        },
        { type: 'h2', id: 'token', text: 'Het token en de administratie' },
        {
          type: 'p',
          text: 'Het token hoort bij precies één administratie, dus je scenario werkt altijd in de juiste omgeving. Behandel het als een wachtwoord. Genereer je het opnieuw, dan vervalt het oude token en werk je scenario’s bij met het nieuwe.',
        },
        { type: 'h2', id: 'begrenzen', text: 'Begrens wat een automatisering kan' },
        {
          type: 'p',
          text: `Een automatisering vraagt niet om akkoord in een chat; hij doet precies wat het scenario zegt. Kies daarom bewust welke tools voor de verbinding aanstaan: wat uitstaat kan ook via het token niet worden aangeroepen. Hoe dat werkt staat in [Team, toegang en logboek](${routes.docPages['team-en-toegang'].nl}).`,
        },
        { type: 'h2', id: 'voorbeelden', text: 'Voorbeelden van scenario’s' },
        {
          type: 'ul',
          items: [
            'Controleer elke binnenkomende factuur en meld mogelijke dubbele in je teamkanaal.',
            'Zet elke maandag de openstaande posten in een spreadsheet voor het werkoverleg.',
            'Maak een taak aan zodra een klant boven zijn kredietlimiet komt.',
          ],
        },
        { type: 'h2', id: 'n8n', text: 'Ook voor n8n en andere MCP-clients' },
        {
          type: 'p',
          text: 'n8n en andere MCP-clients met tokenondersteuning gebruiken dezelfde URL en hetzelfde token. In de setup-gids staan Make en Zapier uitgeschreven; de velden zijn overal dezelfde twee.',
        },
      ],
    },
    en: {
      metaTitle: 'Connect Make, Zapier and n8n to Exact Online',
      metaDescription:
        'Use Exact Online as a building block in Make, Zapier or n8n through the Claire MCP connector: one address plus a bearer token per administration. Here is the setup.',
      crumbCurrent: 'Make, Zapier and n8n',
      title: 'Connect Make, Zapier and n8n to Exact Online',
      summary: 'The same address with a bearer token, as a building block in your automations.',
      lead:
        'Automation platforms do not sign in themselves; they use the MCP address with a bearer token. That turns your administration into a building block for any scenario, from invoice checks to weekly overviews.',
      blocks: [
        { type: 'h2', id: 'stappen', text: 'How to set up the connection' },
        {
          type: 'steps',
          items: [
            { strong: 'Open your connection page', rest: ` in [the app](${APP_URL}en/connections) and pick Make or Zapier in the setup guide.` },
            { strong: 'Copy the MCP URL and the bearer token.', rest: ' No token yet? Generate one with a single click.' },
            { strong: 'Create an MCP connection in your platform', rest: ' with that URL, and send the token as the Authorization header: Bearer followed by the token.' },
          ],
        },
        {
          type: 'figure',
          src: '/documentatie/koppelen-make-en.png',
          alt: 'The connection page in the Claire app with the MCP address, the bearer token and the setup guide for Make',
          caption: 'The setup guide for Make: the URL and the Authorization header are ready to copy.',
        },
        { type: 'h2', id: 'token', text: 'The token and the administration' },
        {
          type: 'p',
          text: 'The token belongs to exactly one administration, so your scenario always works in the right environment. Treat it like a password. If you regenerate it, the old token stops working and you update your scenarios with the new one.',
        },
        { type: 'h2', id: 'begrenzen', text: 'Limit what an automation can do' },
        {
          type: 'p',
          text: `An automation does not ask for approval in a chat; it does exactly what the scenario says. So choose deliberately which tools are enabled for the connection: whatever is off cannot be invoked through the token either. How that works is in [Team, access and audit log](${routes.docPages['team-en-toegang'].en}).`,
        },
        { type: 'h2', id: 'voorbeelden', text: 'Example scenarios' },
        {
          type: 'ul',
          items: [
            'Check every incoming invoice and report possible duplicates in your team channel.',
            'Every Monday, put the open items in a spreadsheet for the stand-up.',
            'Create a task when a customer exceeds their credit limit.',
          ],
        },
        { type: 'h2', id: 'n8n', text: 'Also for n8n and other MCP clients' },
        {
          type: 'p',
          text: 'n8n and other MCP clients with token support use the same URL and the same token. The setup guide spells out Make and Zapier; the fields are the same two everywhere.',
        },
      ],
    },
  },

  'werken-met-claire': {
    group: 'use',
    nl: {
      metaTitle: 'Werken met Claire: vragen, goedkeuren en bestanden',
      metaDescription:
        'Zo werk je in het gesprek met Claire: administratie kiezen, vragen stellen, wijzigingen goedkeuren, bestanden delen en antwoorden exporteren naar Excel of PDF.',
      crumbCurrent: 'Werken met Claire',
      title: 'Werken met Claire',
      summary: 'Vragen stellen, wijzigingen goedkeuren, bestanden delen en antwoorden exporteren.',
      lead:
        'Je stelt vragen in gewone taal; Claire haalt per vraag de actuele cijfers uit Exact Online. Dit zijn de knoppen en regels die het dagelijkse werk bepalen.',
      blocks: [
        { type: 'h2', id: 'vragen', text: 'Vragen stellen' },
        {
          type: 'p',
          text: 'Kies eerst een bedrijf en administratie met de knop naast het invoerveld; wisselen kan op elk moment, ook midden in een gesprek. Claire antwoordt als tekst, tabel of grafiek en laat zien welke gegevens ze daarvoor ophaalde. Gesprekken blijven bewaard in de zijbalk, dus morgen verdergaan kan.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-app-view-nl.png',
          alt: 'Een gesprek met Claire waarin een winst-en-verliesrekening als interactieve tabel wordt getoond',
          caption: 'Een cijfervraag levert een interactieve tabel op, met de vergelijking en de toelichting erbij.',
        },
        { type: 'h2', id: 'akkoord', text: 'Lezen is vrij, schrijven wacht op jou' },
        {
          type: 'p',
          text: 'Claire leest en rekent zelfstandig, maar wijzigt niets zonder akkoord. Voor elke wijziging verschijnt een voorstel: wat er gebeurt, in welke administratie, met welke gegevens. Bij een aanpassing van bestaande gegevens zie je precies wat er verandert. Bevat een stap meerdere acties, dan staat dat erbij en keur je ze samen goed. Afwijzen kan altijd; het voorstel vervalt dan zonder gevolgen.',
        },
        {
          type: 'figure',
          src: '/documentatie/goedkeuring-nl.png',
          alt: 'Het goedkeuringsvenster van Claire voor het aanmaken van een verkoopfactuur, met administratie en factuurregels',
          caption: 'Het voorstel voor een wijziging: wat er gebeurt, waar, en met welke gegevens. Niets wordt geboekt zonder jouw akkoord.',
        },
        { type: 'h2', id: 'bestanden', text: 'Bestanden delen en bewaren' },
        {
          type: 'p',
          text: 'Sleep tekstbestanden in het gesprek of gebruik de bijlageknop: CSV, TXT, JSON, XML en Markdown, tot 2 MB per bestand. Exporteer een spreadsheet of pdf eerst als CSV of tekst. De werkruimte, de knop bovenin het gesprek, toont de taken, bestanden en achtergrondprocessen van het gesprek; bestanden die Claire maakt kun je daar downloaden of verwijderen.',
        },
        { type: 'h2', id: 'antwoorden', text: 'Meer uit een antwoord halen' },
        {
          type: 'ul',
          items: [
            'Kopieer een tabel in één klik in een formaat dat Excel begrijpt.',
            'Download een antwoord als pdf om het te delen.',
            'Spreek je vraag in; Claire schrijft hem uit. Antwoorden kun je laten voorlezen.',
            'Onder een antwoord staan vervolgvragen om direct door te klikken.',
          ],
        },
        { type: 'h2', id: 'fast-deep', text: 'Fast en Deep' },
        {
          type: 'p',
          text: 'Standaard antwoordt Claire snel. Zet Deep aan voor vragen die meer uitzoekwerk vragen, zoals een analyse over meerdere periodes; je ziet de tussenstappen dan in een uitklapbaar denkpaneel. De tools en de data zijn in beide standen gelijk.',
        },
        {
          type: 'note',
          text: `Claire kan alleen bij de tools die voor de verbinding aanstaan. Welke dat zijn beheer je zelf; zie [Team, toegang en logboek](${routes.docPages['team-en-toegang'].nl}).`,
        },
      ],
    },
    en: {
      metaTitle: 'Working with Claire: asking, approving and files',
      metaDescription:
        'How to work in the conversation with Claire: pick an administration, ask questions, approve changes, share files and export answers to Excel or PDF.',
      crumbCurrent: 'Working with Claire',
      title: 'Working with Claire',
      summary: 'Ask questions, approve changes, share files and export answers.',
      lead:
        'You ask questions in plain language; Claire fetches the current figures from Exact Online per question. These are the buttons and rules that shape the daily work.',
      blocks: [
        { type: 'h2', id: 'vragen', text: 'Asking questions' },
        {
          type: 'p',
          text: 'First pick a company and administration with the button next to the message box; you can switch at any moment, mid-conversation included. Claire answers as text, a table or a chart, and shows which data she fetched for it. Conversations stay in the sidebar, so continuing tomorrow works.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-app-view-en.png',
          alt: 'A conversation with Claire showing a profit and loss statement as an interactive table',
          caption: 'A numbers question yields an interactive table, with the comparison and the explanation alongside.',
        },
        { type: 'h2', id: 'akkoord', text: 'Reading is free, writing waits for you' },
        {
          type: 'p',
          text: 'Claire reads and calculates on her own, but changes nothing without approval. Every change appears as a proposal first: what happens, in which administration, with which data. When existing data is updated you see exactly what changes. If a step carries several actions, the proposal says so and you approve them together. Rejecting is always possible; the proposal then lapses without consequences.',
        },
        {
          type: 'figure',
          src: '/documentatie/goedkeuring-en.png',
          alt: 'The Claire approval dialog for creating a sales invoice, with administration and invoice lines',
          caption: 'The proposal for a change: what happens, where, and with which data. Nothing is posted without your approval.',
        },
        { type: 'h2', id: 'bestanden', text: 'Sharing and keeping files' },
        {
          type: 'p',
          text: 'Drag text files into the conversation or use the attachment button: CSV, TXT, JSON, XML and Markdown, up to 2 MB per file. Export a spreadsheet or PDF as CSV or text first. The workspace, the button at the top of the conversation, shows its to-dos, files and background processes; files Claire produces can be downloaded or deleted there.',
        },
        { type: 'h2', id: 'antwoorden', text: 'Getting more out of an answer' },
        {
          type: 'ul',
          items: [
            'Copy a table in one click, in a format Excel understands.',
            'Download an answer as a PDF to share it.',
            'Dictate your question; Claire writes it out. Answers can be read aloud.',
            'Below an answer sit follow-up questions to click straight through.',
          ],
        },
        { type: 'h2', id: 'fast-deep', text: 'Fast and Deep' },
        {
          type: 'p',
          text: 'By default Claire answers fast. Switch on Deep for questions that need more digging, such as an analysis across periods; you then see the intermediate steps in a collapsible thinking panel. Tools and data are identical in both modes.',
        },
        {
          type: 'note',
          text: `Claire can only reach the tools enabled for the connection. Which ones those are is up to you; see [Team, access and audit log](${routes.docPages['team-en-toegang'].en}).`,
        },
      ],
    },
  },

  maandafsluiting: {
    group: 'use',
    nl: {
      metaTitle: 'De maandafsluiting en planningen in Claire',
      metaDescription:
        'Claire draait vaste afsluitcontroles op je administratie, onderzoekt afwijkingen en levert een close-readiness rapport. Plan de afsluiting en andere controles in als terugkerend werk.',
      crumbCurrent: 'Maandafsluiting',
      title: 'De maandafsluiting en planningen',
      summary: 'Vaste afsluitcontroles met een rapport, en terugkerend werk op schema.',
      lead:
        'Terugkerend werk hoeft niet op een agendaherinnering te wachten. Claire draait de afsluitcontroles op je administratie en meldt zich met een rapport; andere controles plan je op dezelfde manier in.',
      blocks: [
        { type: 'h2', id: 'controles', text: 'Wat de afsluiting doet' },
        {
          type: 'p',
          text: 'Vraag Claire om de maandafsluiting, of plan hem in. Er draait dan een vaste reeks deterministische controles op je administratie: sluiten de openingsbalansen aan, zijn de tussenrekeningen leeg, sluiten debiteuren en crediteuren aan op de subadministratie, klopt de btw-berekening, is de nummering doorlopend, zijn er mogelijke dubbele facturen, hoe oud zijn de open posten en wijkt een rubriek opvallend af van eerdere periodes. Daarnaast scant een beoordelingsronde de boekingen op posten die om een oordeel vragen.',
        },
        {
          type: 'p',
          text: 'Het resultaat is een close-readiness rapport: per bevinding de ernst, de onderbouwing met brongegevens en een aanbeveling. Het rekenwerk gebeurt in een deterministische rekenlaag, niet in het taalmodel; dezelfde administratie geeft dezelfde uitkomst.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-close-nl.png',
          alt: 'Een afgeronde maandafsluiting in Claire: het rapport met bevindingen per controle en hun ernst',
          caption: 'Het rapport na een afsluitrun: per controle de bevindingen, met de ernst en het bedrag erbij.',
        },
        { type: 'h2', id: 'bevindingen', text: 'Bevindingen beoordelen' },
        {
          type: 'p',
          text: 'Elke bevinding handel je expliciet af: accepteren (terecht, blijft op de actielijst), afwijzen (beoordeeld, geen actie nodig) of later heropenen. Elk besluit wordt vastgelegd, en een correctie boekt Claire pas na je akkoord.',
        },
        { type: 'h2', id: 'instellen', text: 'Controles afstemmen op jouw administratie' },
        {
          type: 'p',
          text: 'Op de verbindingspagina staan onder Afsluitsignalen alle controles. Per verbinding of per administratie zet je controles aan of uit, pas je de ernst aan en stel je drempels en reikwijdte bij, bijvoorbeeld welke grootboekrekeningen of dagboeken meetellen. Eigen regels bouw je op een sjabloon of op een bestaande controle, en toleranties zoals het toegestane afrondingsverschil stel je centraal in. Zonder configuratie gelden de standaardwaarden.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-signals-nl.png',
          alt: 'Het scherm Afsluitsignalen met de lijst controles, hun ernst en de schakelaars per controle',
          caption: 'Afsluitsignalen op de verbindingspagina: elke controle heeft een ernst en een schakelaar.',
        },
        { type: 'h2', id: 'planningen', text: 'Planningen' },
        {
          type: 'p',
          text: 'Een planning is een terugkerende opdracht voor Claire: een naam, de instructie, de administratie en een frequentie. Dagelijks, wekelijks of maandelijks; dag 31 telt als de laatste dag van de maand. Je kiest het tijdstip en de tijdzone. Zo draait de afsluiting elke maand op een vaste dag, of een KPI-overzicht elke maandagochtend.',
        },
        {
          type: 'figure',
          src: '/documentatie/planningen-nl.png',
          alt: 'Het scherm Planningen met een maandelijkse afsluiting en een wekelijkse KPI-snapshot, beide met een schone laatste run',
          caption: 'Twee planningen op een verbinding: de maandafsluiting op dag 1 en een KPI-snapshot op maandagochtend.',
        },
        {
          type: 'p',
          text: 'De resultaten verschijnen als gesprekken in de zijbalk van de chat. E-mail krijg je alleen wanneer een run iets vindt dat aandacht vraagt; schone runs blijven stil. Met Nu uitvoeren test je een planning direct, en pauzeren kan altijd. Het dashboard toont de volgende run en het laatste resultaat.',
        },
        { type: 'h2', id: 'prognose', text: 'Cashflow-prognose' },
        {
          type: 'p',
          text: 'Vraag Claire om een cashflow-prognose en er draait een doorrekening op je administratie: de maandhistorie per rubriek wordt doorgetrokken en gecombineerd met de openstaande debiteuren en crediteuren tot één tijdlijn per week en per maand, met grafiek. Ook hier rekent de rekenlaag; het taalmodel licht alleen toe.',
        },
      ],
    },
    en: {
      metaTitle: 'The month-end close and schedules in Claire',
      metaDescription:
        'Claire runs a fixed set of close checks on your administration, investigates anomalies and delivers a close-readiness report. Schedule the close and other checks as recurring work.',
      crumbCurrent: 'Month-end close',
      title: 'The month-end close and schedules',
      summary: 'Fixed close checks with a report, and recurring work on a schedule.',
      lead:
        'Recurring work should not depend on a calendar reminder. Claire runs the close checks on your administration and reports back; other checks are scheduled the same way.',
      blocks: [
        { type: 'h2', id: 'controles', text: 'What the close does' },
        {
          type: 'p',
          text: 'Ask Claire for the month-end close, or schedule it. A fixed set of deterministic checks then runs on your administration: do the opening balances reconcile, are the suspense accounts clear, do receivables and payables match the sub-ledgers, does the VAT calculation hold, is the entry numbering sequential, are there possible duplicate invoices, how old are the open items and does a rubric deviate notably from earlier periods. On top of that, a judgment scan reads through the entries for items that need a human call.',
        },
        {
          type: 'p',
          text: 'The result is a close-readiness report: per finding the severity, the underlying source data and a recommendation. The number work happens in a deterministic calculation layer, not in the language model; the same administration gives the same outcome.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-close-en.png',
          alt: 'A finished month-end close in Claire: the report with findings per check and their severity',
          caption: 'The report after a close run: findings per check, with the severity and the amount alongside.',
        },
        { type: 'h2', id: 'bevindingen', text: 'Reviewing findings' },
        {
          type: 'p',
          text: 'You settle every finding explicitly: accept (real, stays on the follow-up list), dismiss (reviewed, no action needed) or reopen later. Every decision is recorded, and Claire posts a correction only after your approval.',
        },
        { type: 'h2', id: 'instellen', text: 'Tuning the checks to your administration' },
        {
          type: 'p',
          text: 'On the connection page, under Closing signals, you find every check. Per connection or per administration you switch checks on or off, adjust their severity and tune thresholds and scope, for example which ledger accounts or journals count. You build your own rules on a template or on an existing check, and tolerances such as the allowed rounding difference are set centrally. Without configuration, the defaults apply.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-signals-en.png',
          alt: 'The Closing signals screen with the list of checks, their severity and a switch per check',
          caption: 'Closing signals on the connection page: every check carries a severity and a switch.',
        },
        { type: 'h2', id: 'planningen', text: 'Schedules' },
        {
          type: 'p',
          text: 'A schedule is a recurring instruction for Claire: a name, the instruction, the administration and a frequency. Daily, weekly or monthly; day 31 counts as the last day of the month. You pick the time and the time zone. That way the close runs on a fixed day each month, or a KPI overview every Monday morning.',
        },
        {
          type: 'figure',
          src: '/documentatie/planningen-en.png',
          alt: 'The Schedules screen with a monthly close and a weekly KPI snapshot, both with a clean last run',
          caption: 'Two schedules on a connection: the month-end close on day 1 and a KPI snapshot on Monday morning.',
        },
        {
          type: 'p',
          text: 'Results appear as conversations in the chat sidebar. You get an email only when a run finds something that needs your attention; clean runs stay silent. Run now tests a schedule immediately, and pausing is always possible. The dashboard shows the next run and the last result.',
        },
        { type: 'h2', id: 'prognose', text: 'Cash-flow forecast' },
        {
          type: 'p',
          text: 'Ask Claire for a cash-flow forecast and a calculation runs on your administration: the monthly history per rubric is extended and combined with the outstanding receivables and payables into one weekly and monthly timeline, with a chart. Here too the calculation layer does the maths; the language model only explains.',
        },
      ],
    },
  },

  'team-en-toegang': {
    group: 'manage',
    nl: {
      metaTitle: 'Team, toegang en het auditlog in Claire',
      metaDescription:
        'Teamleden uitnodigen, tools per verbinding begrenzen, sessies van AI-assistenten beheren en elke actie terugzien in het auditlog. Iedereen werkt onder eigen naam.',
      crumbCurrent: 'Team en toegang',
      title: 'Team, toegang en logboek',
      summary: 'Collega’s uitnodigen, tools begrenzen, sessies beheren en het auditlog lezen.',
      lead:
        'Eén omgeving voor het team, met ieders eigen toegang, duidelijke grenzen per verbinding en een logboek van alles wat er gebeurde.',
      blocks: [
        { type: 'h2', id: 'uitnodigen', text: 'Teamleden uitnodigen' },
        {
          type: 'p',
          text: `Op de [Team-pagina](${APP_URL}team) nodig je collega’s uit per e-mail. De uitnodiging is 7 dagen geldig en werkt alleen voor het uitgenodigde e-mailadres. Er zijn twee rollen: beheerders beheren leden, abonnement en gevoelige instellingen; leden gebruiken de verbindingen. Hoeveel leden je kunt uitnodigen hangt af van je plan.`,
        },
        {
          type: 'figure',
          src: '/documentatie/team-nl.png',
          alt: 'De Team-pagina met drie leden, hun rollen, een openstaande uitnodiging en het uitnodigingsformulier',
          caption: 'De Team-pagina: leden met hun rol, de openstaande uitnodiging en het formulier voor de volgende collega.',
        },
        { type: 'h2', id: 'eigen-naam', text: 'Iedereen werkt onder eigen naam' },
        {
          type: 'p',
          text: 'Teamleden delen de verbindingen en het budget van de organisatie, maar iedereen logt bij Exact Online in met het eigen account. Wie iets niet mag in Exact Online, kan het via Claire ook niet. Elke actie wordt onder de eigen gebruiker vastgelegd. Nieuw lid? Koppel na het accepteren van de uitnodiging je eigen Exact Online-account op de verbindingspagina.',
        },
        { type: 'h2', id: 'tools', text: 'Tools begrenzen per verbinding' },
        {
          type: 'p',
          text: 'Per verbinding bepaal je welke tools en categorieën beschikbaar zijn. Wat uitstaat bestaat voor Claire niet: het is verborgen en kan niet worden aangeroepen, in de chat en in gekoppelde assistenten. Per tool zie je of die leest, schrijft of verwijdert. Grote categorieën zoals HRM, voorraad en productie staan standaard uit; je zet ze aan wanneer je ze nodig hebt.',
        },
        {
          type: 'figure',
          src: '/documentatie/tools-nl.png',
          alt: 'Het scherm Tools beheren met categorieën en per tool een schakelaar en het label lezen, schrijven of destructief',
          caption: 'Tools beheren: per tool zie je of die leest, schrijft of verwijdert, en een categorie gaat in één keer uit.',
        },
        { type: 'h2', id: 'sessies', text: 'Sessies van assistenten' },
        {
          type: 'p',
          text: 'Per verbinding zie je onder Sessies welke AI-assistenten zijn ingelogd en wanneer voor het laatst. Vertrekt een collega, of vertrouw je een sessie niet, dan beëindig je die: binnen een uur is de toegang weg totdat er opnieuw wordt ingelogd. In je Exact Online verandert er niets.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-sessions-nl.png',
          alt: 'Het scherm Sessies met de ingelogde AI-assistenten en per sessie een knop om hem te beëindigen',
          caption: 'Sessies op de verbindingspagina: wie is ingelogd, sinds wanneer, en de knop om een sessie te beëindigen.',
        },
        { type: 'h2', id: 'auditlog', text: 'Het auditlog' },
        {
          type: 'p',
          text: 'Het auditlog toont elke actie op de verbinding, meest recente eerst: de tool, de administratie, de bron (de chat, een planning, de afsluitagent, een token) en of de actie slaagde. Basisparameters zijn zichtbaar; het volledige verzoek en de resultaten niet. Je filtert op type, module of tool en exporteert het log als CSV.',
        },
      ],
    },
    en: {
      metaTitle: 'Team, access and the audit log in Claire',
      metaDescription:
        'Invite team members, limit tools per connection, manage AI assistant sessions and trace every action in the audit log. Everyone works under their own name.',
      crumbCurrent: 'Team and access',
      title: 'Team, access and audit log',
      summary: 'Invite colleagues, limit tools, manage sessions and read the audit log.',
      lead:
        'One environment for the team, with individual access, clear limits per connection and a log of everything that happened.',
      blocks: [
        { type: 'h2', id: 'uitnodigen', text: 'Inviting team members' },
        {
          type: 'p',
          text: `On the [Team page](${APP_URL}en/team) you invite colleagues by email. The invitation is valid for 7 days and only works for the invited email address. There are two roles: admins manage members, the subscription and sensitive settings; members use the connections. How many members you can invite depends on your plan.`,
        },
        {
          type: 'figure',
          src: '/documentatie/team-en.png',
          alt: 'The Team page with three members, their roles, a pending invitation and the invite form',
          caption: 'The Team page: members with their role, the pending invitation and the form for the next colleague.',
        },
        { type: 'h2', id: 'eigen-naam', text: 'Everyone works under their own name' },
        {
          type: 'p',
          text: 'Team members share the organization’s connections and budget, but everyone signs in to Exact Online with their own account. What you cannot do in Exact Online, you cannot do through Claire either. Every action is recorded under the user who took it. New member? After accepting the invitation, connect your own Exact Online account on the connection page.',
        },
        { type: 'h2', id: 'tools', text: 'Limiting tools per connection' },
        {
          type: 'p',
          text: 'Per connection you decide which tools and categories are available. Whatever is off does not exist for Claire: it is hidden and cannot be invoked, in the chat and in connected assistants alike. Per tool you see whether it reads, writes or deletes. Large categories such as HRM, inventory and manufacturing are off by default; switch them on when you need them.',
        },
        {
          type: 'figure',
          src: '/documentatie/tools-en.png',
          alt: 'The Manage tools screen with categories and, per tool, a switch and the label read, write or destructive',
          caption: 'Manage tools: per tool you see whether it reads, writes or deletes, and a category switches off in one go.',
        },
        { type: 'h2', id: 'sessies', text: 'Assistant sessions' },
        {
          type: 'p',
          text: 'Under Sessions on the connection page you see which AI assistants are signed in and when they last did. When a colleague leaves, or a session looks off, end it: access is gone within the hour, until someone signs in again. Nothing changes in your Exact Online.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-sessions-en.png',
          alt: 'The Sessions screen with the signed-in AI assistants and, per session, a button to end it',
          caption: 'Sessions on the connection page: who is signed in, since when, and the button to end a session.',
        },
        { type: 'h2', id: 'auditlog', text: 'The audit log' },
        {
          type: 'p',
          text: 'The audit log shows every action on the connection, most recent first: the tool, the administration, the source (the chat, a schedule, the close agent, a token) and whether the action succeeded. Basic parameters are visible; the full request and its results are not. You filter by type, module or tool and export the log as CSV.',
        },
      ],
    },
  },

  abonnement: {
    group: 'manage',
    nl: {
      metaTitle: 'Abonnement, verbruik en facturen van Claire',
      metaDescription:
        'Eén abonnement per team: plannen wisselen, het maandbudget volgen, opzeggen per periode-einde en facturen downloaden op de Team-pagina in de app.',
      crumbCurrent: 'Abonnement',
      title: 'Abonnement en facturen',
      summary: 'Plannen wisselen, het maandbudget volgen, opzeggen en facturen downloaden.',
      lead:
        'Eén abonnement dekt je hele team. Je beheert het op de Team-pagina in de app; alleen een beheerder kan het wijzigen.',
      blocks: [
        { type: 'h2', id: 'plannen', text: 'Hoe de plannen werken' },
        {
          type: 'p',
          text: `Individueel, Bedrijf en Kantoor verschillen in het aantal administraties en teamleden en in het maandbudget voor agentwerk. De actuele prijzen en limieten staan op de [Claire-pagina](${routes.claire.nl}#pricing) en in de plankiezer in de app. Enterprise is maatwerk op offerte. Elk plan is maandelijks opzegbaar.`,
        },
        { type: 'h2', id: 'budget', text: 'Het maandbudget' },
        {
          type: 'p',
          text: 'Bij elk plan hoort een maandbudget voor het werk dat Claire doet, uitgedrukt in agent-tokens en tool-aanroepen. Het team deelt dat budget; op de Team-pagina zie je het verbruik. Is het budget op, dan pauzeren nieuwe runs tot de volgende maand of tot een upgrade. Er verdwijnt niets: verbindingen, configuratie en gesprekken blijven staan.',
        },
        {
          type: 'figure',
          src: '/documentatie/abonnement-nl.png',
          alt: 'Het abonnementsblok op de Team-pagina met het plan Bedrijf, het verbruik van het maandbudget en de facturen',
          caption: 'Het abonnement op de Team-pagina: het plan, het verbruik tegen het maandbudget en de facturen eronder.',
        },
        { type: 'h2', id: 'wijzigen', text: 'Upgraden, downgraden en opzeggen' },
        {
          type: 'p',
          text: 'Een planwissel gaat direct in; het verschil wordt verrekend op de volgende factuur. Zeg je op, dan houdt het team toegang tot het einde van de betaalde periode en kun je tot die datum ook weer hervatten. Bij een opzegging blijven verbindingen, configuratie en gesprekken staan; alleen het plan stopt.',
        },
        { type: 'h2', id: 'facturen', text: 'Facturen en betaalgegevens' },
        {
          type: 'p',
          text: 'De betaling loopt via Stripe. Op de Team-pagina bekijk je facturen, download je de pdf en werk je betaalgegevens bij. Mislukt een betaling, dan loopt de toegang kort door terwijl Stripe het opnieuw probeert; werk de betaalmethode bij om het abonnement te houden.',
        },
        {
          type: 'note',
          text: 'Een verbinding verwijderen is definitiever dan opzeggen: het abonnement stopt per direct, de toegang vervalt en de opgeslagen koppeling en inloggegevens worden gewist. Je gegevens in Exact Online zelf blijven altijd staan.',
        },
      ],
    },
    en: {
      metaTitle: 'Subscription, usage and invoices for Claire',
      metaDescription:
        'One subscription per team: switch plans, follow the monthly budget, cancel at period end and download invoices on the Team page in the app.',
      crumbCurrent: 'Subscription',
      title: 'Subscription and invoices',
      summary: 'Switch plans, follow the monthly budget, cancel and download invoices.',
      lead:
        'One subscription covers your whole team. You manage it on the Team page in the app; only an admin can change it.',
      blocks: [
        { type: 'h2', id: 'plannen', text: 'How the plans work' },
        {
          type: 'p',
          text: `Individual, Business and Firm differ in the number of administrations and team members and in the monthly budget for agent work. Current prices and limits are on the [Claire page](${routes.claire.en}#pricing) and in the plan chooser in the app. Enterprise is quoted individually. Every plan can be cancelled monthly.`,
        },
        { type: 'h2', id: 'budget', text: 'The monthly budget' },
        {
          type: 'p',
          text: 'Every plan carries a monthly budget for the work Claire does, expressed in agent tokens and tool calls. The team shares that budget; the Team page shows the usage. When the budget runs out, new runs pause until the next month or an upgrade. Nothing disappears: connections, configuration and conversations stay put.',
        },
        {
          type: 'figure',
          src: '/documentatie/abonnement-en.png',
          alt: 'The subscription block on the Team page with the Business plan, the monthly budget usage and the invoices',
          caption: 'The subscription on the Team page: the plan, usage against the monthly budget and the invoices below.',
        },
        { type: 'h2', id: 'wijzigen', text: 'Upgrading, downgrading and cancelling' },
        {
          type: 'p',
          text: 'A plan change takes effect immediately; the difference is settled on the next invoice. If you cancel, the team keeps access until the end of the paid period and can resume up to that date. Cancelling leaves connections, configuration and conversations in place; only the plan ends.',
        },
        { type: 'h2', id: 'facturen', text: 'Invoices and payment details' },
        {
          type: 'p',
          text: 'Payment runs through Stripe. On the Team page you view invoices, download the PDF and update payment details. If a payment fails, access continues briefly while Stripe retries; update the payment method to keep the subscription.',
        },
        {
          type: 'note',
          text: 'Removing a connection is more final than cancelling: the subscription stops immediately, access ends and the stored connection and credentials are erased. Your records in Exact Online itself always remain.',
        },
      ],
    },
  },

  'problemen-oplossen': {
    group: 'manage',
    nl: {
      metaTitle: 'Problemen oplossen in Claire',
      metaDescription:
        'De meest voorkomende meldingen in Claire, met de oplossing erbij: verlopen koppelingen, assistenten die niet verbinden, betalingen onder het verkeerde account en een leeg maandbudget.',
      crumbCurrent: 'Problemen oplossen',
      title: 'Problemen oplossen',
      summary: 'De meest voorkomende meldingen, met de oplossing erbij.',
      lead:
        'De meldingen die we het vaakst zien, met de oplossing erbij. Kom je er niet uit, dan staan alle kanalen op de ondersteuningspagina.',
      blocks: [
        { type: 'h2', id: 'verbinding', text: 'De verbinding vraagt aandacht' },
        {
          type: 'p',
          text: 'Een verlopen toegangstoken vernieuw je op de verbindingspagina met Vernieuwen. Helpt dat niet, kies dan Opnieuw autoriseren en keur de koppeling opnieuw goed bij Exact Online. Weigerde Exact Online de autorisatie, dan was de toestemming afgewezen of de sessie daar verlopen; opnieuw autoriseren lost ook dat op.',
        },
        { type: 'h2', id: 'teamlid', text: 'Je ziet de administratie, maar Claire komt er niet in' },
        {
          type: 'p',
          text: 'De administratie is dan voor het team verbonden, maar jouw eigen Exact Online-account nog niet. Kies op de verbindingspagina Account koppelen en log in bij Exact Online. Daarna werkt de administratie ook voor jou.',
        },
        { type: 'h2', id: 'chatgpt', text: 'ChatGPT toont geen Create onder Connectors' },
        {
          type: 'p',
          text: `Eigen connectors toevoegen staat dan uit voor je werkomgeving. Vraag de beheerder van je ChatGPT-werkomgeving om de ontwikkelaarsmodus aan te zetten; ook kan een betaald ChatGPT-plan nodig zijn. De stappen staan in [ChatGPT koppelen aan Exact Online](${routes.docPages.chatgpt.nl}).`,
        },
        { type: 'h2', id: 'copilot', text: 'Copilot accepteert het agentpakket niet' },
        {
          type: 'p',
          text: `Het uploaden van eigen apps staat dan uit. Vraag je Microsoft 365-beheerder om het uploaden van een aangepaste app in te schakelen, of om het pakket voor de hele organisatie uit te rollen vanuit het Microsoft 365-beheercentrum. De stappen staan in [Copilot koppelen aan Exact Online](${routes.docPages.copilot.nl}).`,
        },
        { type: 'h2', id: 'administratie', text: 'Een assistent werkt in de verkeerde administratie' },
        {
          type: 'p',
          text: 'De administratiekeuze wordt per assistent vastgelegd bij het inloggen. Log vanuit die assistent opnieuw in bij DataFlowr en kies de juiste administratie; het adres blijft hetzelfde.',
        },
        { type: 'h2', id: 'betaling', text: 'Betaald, maar geen abonnement te zien' },
        {
          type: 'p',
          text: 'Dan ben je waarschijnlijk ingelogd met een ander account dan waarmee je afrekende. Wissel van account en kijk opnieuw op de Team-pagina. Is een betaling niet gelukt, dan is er niets afgeschreven; kies opnieuw een plan op de connectorpagina.',
        },
        { type: 'h2', id: 'budget', text: 'Runs pauzeren halverwege de maand' },
        {
          type: 'p',
          text: `Dan is het maandbudget van je plan op. Nieuwe runs starten weer bij de nieuwe maand, of direct na een upgrade. Het verbruik zie je op de Team-pagina; zie ook [Abonnement en facturen](${routes.docPages.abonnement.nl}).`,
        },
        {
          type: 'p',
          text: `Staat je situatie er niet bij? Mail [${EMAIL_INFO}](mailto:${EMAIL_INFO}) met wat je deed en wat je verwachtte, of bel [${PHONE_DISPLAY.nl}](tel:${PHONE_TEL}). Alle kanalen staan op de [ondersteuningspagina](${routes.support.nl}).`,
        },
      ],
    },
    en: {
      metaTitle: 'Troubleshooting Claire',
      metaDescription:
        'The most common messages in Claire, with their fix: expired connections, assistants that will not connect, payments under the wrong account and an exhausted monthly budget.',
      crumbCurrent: 'Troubleshooting',
      title: 'Troubleshooting',
      summary: 'The most common messages, with their fix.',
      lead:
        'The messages we see most often, with the fix included. If you get stuck, every channel is on the support page.',
      blocks: [
        { type: 'h2', id: 'verbinding', text: 'The connection needs attention' },
        {
          type: 'p',
          text: 'An expired access token is renewed on the connection page with Refresh. If that does not help, choose Reauthorize and approve the connection at Exact Online again. If Exact Online declined the authorization, the consent was refused or the session there had expired; reauthorizing fixes that too.',
        },
        { type: 'h2', id: 'teamlid', text: 'You see the administration, but Claire cannot reach it' },
        {
          type: 'p',
          text: 'The administration is connected for the team, but your own Exact Online account is not yet. Choose Connect your account on the connection page and sign in at Exact Online. After that the administration works for you as well.',
        },
        { type: 'h2', id: 'chatgpt', text: 'ChatGPT shows no Create under Connectors' },
        {
          type: 'p',
          text: `Adding your own connectors is switched off for your workspace. Ask your ChatGPT workspace administrator to enable developer mode; a paid ChatGPT plan may also be required. The steps are in [Connect ChatGPT to Exact Online](${routes.docPages.chatgpt.en}).`,
        },
        { type: 'h2', id: 'copilot', text: 'Copilot rejects the agent package' },
        {
          type: 'p',
          text: `Uploading custom apps is switched off. Ask your Microsoft 365 administrator to enable custom app upload, or to deploy the package organisation-wide from the Microsoft 365 admin center. The steps are in [Connect Copilot to Exact Online](${routes.docPages.copilot.en}).`,
        },
        { type: 'h2', id: 'administratie', text: 'An assistant works in the wrong administration' },
        {
          type: 'p',
          text: 'The administration choice is recorded per assistant at sign-in. Sign in again from that assistant and pick the right administration; the address stays the same.',
        },
        { type: 'h2', id: 'betaling', text: 'Paid, but no subscription in sight' },
        {
          type: 'p',
          text: 'You are probably signed in with a different account than the one that paid. Switch accounts and check the Team page again. If a payment failed, nothing was charged; pick a plan again from the connector page.',
        },
        { type: 'h2', id: 'budget', text: 'Runs pause halfway through the month' },
        {
          type: 'p',
          text: `Your plan’s monthly budget is used up. New runs start again with the new month, or right after an upgrade. Usage is on the Team page; see also [Subscription and invoices](${routes.docPages.abonnement.en}).`,
        },
        {
          type: 'p',
          text: `Situation not listed? Email [${EMAIL_INFO}](mailto:${EMAIL_INFO}) with what you did and what you expected, or call [${PHONE_DISPLAY.en}](tel:${PHONE_TEL}). Every channel is on the [support page](${routes.support.en}).`,
        },
      ],
    },
  },
};

/** Reading order: the route table's key order drives index and prev/next. */
export const docOrder = Object.keys(routes.docPages) as DocKey[];
