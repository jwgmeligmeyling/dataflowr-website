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
  | { type: 'code'; label: string; text: string };

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
  group: 'start' | 'use' | 'manage';
  nl: DocContent;
  en: DocContent;
}

/** Shared page furniture strings. */
export const docsUi = {
  nl: {
    crumbDocs: 'Documentatie',
    tocTitle: 'Op deze pagina',
    groups: { start: 'Starten', use: 'Gebruiken', manage: 'Beheren' },
    prev: '← Vorige',
    next: 'Volgende →',
    supportTitle: 'Kom je er niet uit?',
    supportBody: 'Supportvragen komen direct terecht bij de founders die Claire bouwen.',
    supportCta: 'Naar ondersteuning',
  },
  en: {
    crumbDocs: 'Documentation',
    tocTitle: 'On this page',
    groups: { start: 'Getting started', use: 'Everyday use', manage: 'Managing' },
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

  'ai-assistenten': {
    group: 'start',
    nl: {
      metaTitle: 'Claire koppelen aan Claude, ChatGPT of Microsoft 365 Copilot',
      metaDescription:
        'Verbind Claire met je eigen AI-assistent via MCP: één adres voor Claude, ChatGPT en Microsoft 365 Copilot, en een token voor platformen als Make en Zapier.',
      crumbCurrent: 'AI-assistenten',
      title: 'Claire in Claude, ChatGPT en Copilot',
      summary: 'Eén MCP-adres voor je eigen AI-assistent, en een token voor automatiseringsplatformen.',
      lead:
        'Claire werkt in de AI-assistent die je al gebruikt. Je voegt één adres toe, logt in met je DataFlowr-account en werkt verder waar je gewend bent.',
      blocks: [
        { type: 'h2', id: 'adres', text: 'Eén adres voor elke assistent' },
        {
          type: 'p',
          text: 'Elke assistent gebruikt hetzelfde MCP-adres. Je logt in met je DataFlowr-account; er komt geen token aan te pas.',
        },
        { type: 'code', label: 'MCP-adres', text: 'https://app.dataflowr.nl/mcp' },
        {
          type: 'p',
          text: 'Heb je meerdere administraties, dan vraagt DataFlowr bij het inloggen in welke administratie deze assistent moet werken. Bij één administratie slaat die vraag over.',
        },
        { type: 'h2', id: 'claude', text: 'Claude' },
        {
          type: 'steps',
          items: [
            { strong: 'Open Instellingen → Connectors', rest: ' en kies Aangepaste connector toevoegen.' },
            { strong: 'Plak het MCP-adres', rest: ' hierboven en bevestig.' },
            { strong: 'Log in met je DataFlowr-account', rest: ' en kies zo nodig de administratie.' },
          ],
        },
        {
          type: 'p',
          text: 'Eén keer toevoegen is genoeg: de connector werkt daarna in Claude in je browser, op je telefoon en in de desktop-app.',
        },
        { type: 'h2', id: 'chatgpt', text: 'ChatGPT' },
        {
          type: 'steps',
          items: [
            { strong: 'Open Instellingen → Connectors', rest: ' en kies Create.' },
            { strong: 'Plak het MCP-adres', rest: ' hierboven.' },
            { strong: 'Log in met je DataFlowr-account', rest: ' zodra ChatGPT daarom vraagt.' },
          ],
        },
        {
          type: 'note',
          text: 'Zie je geen Create onder Connectors? Eigen connectors toevoegen moet eerst aanstaan voor je ChatGPT-werkomgeving (ontwikkelaarsmodus) en kan een betaald ChatGPT-plan vragen. Vraag degene die de werkomgeving beheert.',
        },
        { type: 'h2', id: 'copilot', text: 'Microsoft 365 Copilot' },
        {
          type: 'p',
          text: `Copilot werkt niet met een adres maar met een agentpakket. Download het pakket op je [verbindingspagina](${APP_URL}connections) en upload het in Copilot of Teams via Apps, Uw apps beheren, Een app uploaden. Log daarna in de DataFlowr-agent in met je DataFlowr-account.`,
        },
        {
          type: 'note',
          text: 'Het uploaden van een eigen app moet door je Microsoft 365-beheerder zijn ingeschakeld. GitHub Copilot in VS Code is een ander product: daar voeg je het MCP-adres toe in .vscode/mcp.json.',
        },
        { type: 'h2', id: 'automatisering', text: 'Make, Zapier en andere platformen' },
        {
          type: 'p',
          text: 'Automatiseringsplatformen loggen niet zelf in. Die gebruiken hetzelfde adres met een bearer token in de Authorization-header. Het token staat op je verbindingspagina en hoort bij precies één administratie. Andere MCP-clients met tokenondersteuning, zoals n8n, werken op dezelfde manier.',
        },
        { type: 'h2', id: 'wisselen', text: 'Wisselen en toegang intrekken' },
        {
          type: 'p',
          text: `Wil je een assistent in een andere administratie laten werken, log dan vanuit die assistent opnieuw in en kies de andere. Onder Sessies op de verbindingspagina zie je welke assistenten toegang hebben; beëindig je een sessie, dan is die toegang binnen een uur weg totdat er opnieuw wordt ingelogd. Meer daarover in [Team, toegang en logboek](${routes.docPages['team-en-toegang'].nl}).`,
        },
      ],
    },
    en: {
      metaTitle: 'Connecting Claire to Claude, ChatGPT or Microsoft 365 Copilot',
      metaDescription:
        'Connect Claire to your own AI assistant through MCP: one address for Claude, ChatGPT and Microsoft 365 Copilot, and a token for platforms like Make and Zapier.',
      crumbCurrent: 'AI assistants',
      title: 'Claire in Claude, ChatGPT and Copilot',
      summary: 'One MCP address for your own AI assistant, and a token for automation platforms.',
      lead:
        'Claire works in the AI assistant you already use. You add one address, sign in with your DataFlowr account and carry on where you are at home.',
      blocks: [
        { type: 'h2', id: 'adres', text: 'One address for every assistant' },
        {
          type: 'p',
          text: 'Every assistant uses the same MCP address. You sign in with your DataFlowr account; no token is involved.',
        },
        { type: 'code', label: 'MCP address', text: 'https://app.dataflowr.nl/mcp' },
        {
          type: 'p',
          text: 'If you have more than one administration, DataFlowr asks at sign-in which administration this assistant should work in. With a single administration that question is skipped.',
        },
        { type: 'h2', id: 'claude', text: 'Claude' },
        {
          type: 'steps',
          items: [
            { strong: 'Open Settings → Connectors', rest: ' and choose Add custom connector.' },
            { strong: 'Paste the MCP address', rest: ' above and confirm.' },
            { strong: 'Sign in with your DataFlowr account', rest: ' and pick the administration if asked.' },
          ],
        },
        {
          type: 'p',
          text: 'Adding it once is enough: the connector then works in Claude in your browser, on your phone and in the desktop app.',
        },
        { type: 'h2', id: 'chatgpt', text: 'ChatGPT' },
        {
          type: 'steps',
          items: [
            { strong: 'Open Settings → Connectors', rest: ' and choose Create.' },
            { strong: 'Paste the MCP address', rest: ' above.' },
            { strong: 'Sign in with your DataFlowr account', rest: ' when ChatGPT asks.' },
          ],
        },
        {
          type: 'note',
          text: 'No Create option under Connectors? Adding your own connectors has to be switched on for your ChatGPT workspace first (developer mode) and may require a paid ChatGPT plan. Ask whoever manages the workspace.',
        },
        { type: 'h2', id: 'copilot', text: 'Microsoft 365 Copilot' },
        {
          type: 'p',
          text: `Copilot does not take an address but an agent package. Download the package on your [connection page](${APP_URL}en/connections) and upload it in Copilot or Teams via Apps, Manage your apps, Upload an app. Then sign in to the DataFlowr agent with your DataFlowr account.`,
        },
        {
          type: 'note',
          text: 'Uploading a custom app has to be enabled by your Microsoft 365 administrator. GitHub Copilot in VS Code is a different product: there you add the MCP address to .vscode/mcp.json.',
        },
        { type: 'h2', id: 'automatisering', text: 'Make, Zapier and other platforms' },
        {
          type: 'p',
          text: 'Automation platforms do not sign in themselves. They use the same address with a bearer token in the Authorization header. The token lives on your connection page and belongs to exactly one administration. Other MCP clients with token support, such as n8n, work the same way.',
        },
        { type: 'h2', id: 'wisselen', text: 'Switching and revoking access' },
        {
          type: 'p',
          text: `To move an assistant to another administration, sign in again from that assistant and pick the other one. Under Sessions on the connection page you see which assistants have access; end a session and that access is gone within the hour, until someone signs in again. More in [Team, access and audit log](${routes.docPages['team-en-toegang'].en}).`,
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
        { type: 'h2', id: 'akkoord', text: 'Lezen is vrij, schrijven wacht op jou' },
        {
          type: 'p',
          text: 'Claire leest en rekent zelfstandig, maar wijzigt niets zonder akkoord. Voor elke wijziging verschijnt een voorstel: wat er gebeurt, in welke administratie, met welke gegevens. Bij een aanpassing van bestaande gegevens zie je precies wat er verandert. Bevat een stap meerdere acties, dan staat dat erbij en keur je ze samen goed. Afwijzen kan altijd; het voorstel vervalt dan zonder gevolgen.',
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
        { type: 'h2', id: 'akkoord', text: 'Reading is free, writing waits for you' },
        {
          type: 'p',
          text: 'Claire reads and calculates on her own, but changes nothing without approval. Every change appears as a proposal first: what happens, in which administration, with which data. When existing data is updated you see exactly what changes. If a step carries several actions, the proposal says so and you approve them together. Rejecting is always possible; the proposal then lapses without consequences.',
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
        { type: 'h2', id: 'planningen', text: 'Planningen' },
        {
          type: 'p',
          text: 'Een planning is een terugkerende opdracht voor Claire: een naam, de instructie, de administratie en een frequentie. Dagelijks, wekelijks of maandelijks; dag 31 telt als de laatste dag van de maand. Je kiest het tijdstip en de tijdzone. Zo draait de afsluiting elke maand op een vaste dag, of een KPI-overzicht elke maandagochtend.',
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
        { type: 'h2', id: 'planningen', text: 'Schedules' },
        {
          type: 'p',
          text: 'A schedule is a recurring instruction for Claire: a name, the instruction, the administration and a frequency. Daily, weekly or monthly; day 31 counts as the last day of the month. You pick the time and the time zone. That way the close runs on a fixed day each month, or a KPI overview every Monday morning.',
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
        { type: 'h2', id: 'sessies', text: 'Sessies van assistenten' },
        {
          type: 'p',
          text: 'Per verbinding zie je onder Sessies welke AI-assistenten zijn ingelogd en wanneer voor het laatst. Vertrekt een collega, of vertrouw je een sessie niet, dan beëindig je die: binnen een uur is de toegang weg totdat er opnieuw wordt ingelogd. In je Exact Online verandert er niets.',
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
        { type: 'h2', id: 'sessies', text: 'Assistant sessions' },
        {
          type: 'p',
          text: 'Under Sessions on the connection page you see which AI assistants are signed in and when they last did. When a colleague leaves, or a session looks off, end it: access is gone within the hour, until someone signs in again. Nothing changes in your Exact Online.',
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
          text: 'Eigen connectors toevoegen staat dan uit voor je werkomgeving. Vraag de beheerder van je ChatGPT-werkomgeving om de ontwikkelaarsmodus aan te zetten; ook kan een betaald ChatGPT-plan nodig zijn.',
        },
        { type: 'h2', id: 'copilot', text: 'Copilot accepteert het agentpakket niet' },
        {
          type: 'p',
          text: 'Het uploaden van eigen apps staat dan uit. Vraag je Microsoft 365-beheerder om het uploaden van een aangepaste app in te schakelen, of om het pakket voor de hele organisatie uit te rollen vanuit het Microsoft 365-beheercentrum.',
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
          text: 'Adding your own connectors is switched off for your workspace. Ask your ChatGPT workspace administrator to enable developer mode; a paid ChatGPT plan may also be required.',
        },
        { type: 'h2', id: 'copilot', text: 'Copilot rejects the agent package' },
        {
          type: 'p',
          text: 'Uploading custom apps is switched off. Ask your Microsoft 365 administrator to enable custom app upload, or to deploy the package organisation-wide from the Microsoft 365 admin center.',
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
