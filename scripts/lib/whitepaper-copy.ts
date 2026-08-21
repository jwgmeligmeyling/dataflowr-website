/**
 * The whitepaper's copy, both languages. This is published copy: the rules in
 * CLAUDE.md apply in full, and every claim must match what the site itself
 * says (the source for each chapter is named below). Rendered into
 * public/downloads/ by scripts/generate-whitepaper.ts; a copy change here
 * means re-running that script, or the PDFs and the source drift apart.
 *
 * Sources per chapter:
 *   1. MCP           src/data/articles.ts (mcp-voor-finance)
 *   2. Four tasks    src/components/pages/ClairePage.astro (doCards, caps, closeSteps, ways)
 *   3. Security      ClairePage (secCard, secItems) + the mcp-voor-finance article
 *   4. Pricing       ClairePage (pricing), prices as of August 2026
 *   5. Getting going ClairePage (ob steps) + src/data/docs.ts topics
 */

export type WpBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ol'; items: { strong: string; rest: string }[] }
  | { type: 'ul'; items: string[] }
  | { type: 'steps'; items: { kicker: string; title: string; body: string }[] }
  | { type: 'table'; cols: string[]; align?: ('left' | 'right')[]; rows: string[][]; note?: string }
  | { type: 'note'; text: string };

export interface WpPage {
  /** Set on the first page of a chapter: renders the big chapter opener. */
  chapter?: { num: number; title: string };
  blocks: WpBlock[];
}

export interface WpDoc {
  lang: 'nl' | 'en';
  file: string;
  cover: { eyebrow: string; titlePre: string; titleAccent: string; titlePost: string; sub: string; foot: string };
  tocTitle: string;
  summaryTitle: string;
  summary: string[];
  audienceTitle: string;
  audience: string;
  colophon: string;
  /** Running footer on content pages. */
  footer: string;
  pages: WpPage[];
  about: { title: string; blocks: WpBlock[]; contact: string[]; company: string };
  backCover: { line: string };
}

const nl: WpDoc = {
  lang: 'nl',
  file: 'dataflowr-claire-whitepaper-nl.pdf',
  cover: {
    eyebrow: 'Whitepaper · augustus 2026',
    titlePre: 'AI in je ',
    titleAccent: 'Exact Online',
    titlePost: ' administratie',
    sub: 'Wat een AI-assistent op de boekhouding vandaag kan, waar de grenzen liggen en hoe je veilig begint. Geschreven voor controllers en CFO’s.',
    foot: 'Claire · de AI-laag boven op Exact Online',
  },
  tocTitle: 'Inhoud',
  summaryTitle: 'In het kort',
  summary: [
    'MCP maakt AI-assistenten bruikbaar op je administratie: antwoorden komen per vraag uit Exact Online, niet uit het geheugen van een taalmodel.',
    'Claire beantwoordt cijfervragen, bereidt de maandafsluiting voor, bewaakt debiteuren en draait planningen volgens schema.',
    'Lezen mag vrij, schrijven pas na jouw akkoord. Geen schaduwkopie van je data, toegang per gebruiker, elke actie gelogd.',
    'Starten kan klein: vanaf €99 per maand, live binnen een dag, maandelijks opzegbaar.',
  ],
  audienceTitle: 'Voor wie',
  audience:
    'Voor controllers, CFO’s en accountants die met Exact Online werken en willen beoordelen of een AI-assistent op de administratie iets voor hun team is. Je hoeft er niets van AI voor te weten; waar techniek langskomt, leggen we die uit.',
  colophon: 'DataFlowr B.V. · augustus 2026 · Vragen over deze whitepaper: info@dataflowr.nl',
  footer: 'DataFlowr · AI in je Exact Online administratie',
  pages: [
    {
      chapter: { num: 1, title: 'Wat MCP is en waarom het voor finance uitmaakt' },
      blocks: [
        {
          type: 'p',
          text: 'MCP staat voor Model Context Protocol, een open standaard die eind 2024 door Anthropic is geïntroduceerd en inmiddels breed wordt gedragen. Het beschrijft hoe een AI-assistent gereedschap van een systeem mag gebruiken: welke acties er zijn, welke gegevens erbij horen en hoe de toegang geregeld is. Wat USB-C is voor accessoires, is MCP voor AI-koppelingen: één stekker die in elke assistent past.',
        },
        { type: 'h3', text: 'Hoe het werkt' },
        {
          type: 'p',
          text: 'Een systeem, bijvoorbeeld je boekhoudpakket, biedt een MCP-server aan: een lijst van afgebakende tools zoals “haal de proef- en saldibalans op” of “toon de openstaande posten van deze klant”. De assistent kiest per vraag welke tool nodig is, roept die aan en formuleert het antwoord op basis van wat er terugkomt.',
        },
        {
          type: 'p',
          text: 'Het model krijgt daarbij geen kopie van je database. Elke vraag leidt tot een gerichte opvraging in de administratie zelf, op het moment dat je de vraag stelt. Er is geen datadump die ergens anders een eigen leven gaat leiden.',
        },
        {
          type: 'quote',
          text: 'De AI-assistent krijgt geen export van je administratie, hij krijgt een deurbel. Elke vraag gaat langs je autorisatie, en de cijfers blijven waar ze staan.',
        },
      ],
    },
    {
      blocks: [
        { type: 'h3', text: 'Waarom dit voor finance uitmaakt' },
        {
          type: 'p',
          text: 'Voor een marketingtekst maakt het weinig uit waar een antwoord vandaan komt. Voor een balanspositie wel. Drie eigenschappen maken het verschil tussen een chatbot en een controleerbaar antwoord:',
        },
        {
          type: 'ol',
          items: [
            {
              strong: 'Antwoorden komen uit de administratie, niet uit het model.',
              rest: ' Het taalmodel formuleert; de cijfers worden per vraag via een tool opgehaald. Daarmee is herleidbaar welke opvraging aan een antwoord ten grondslag ligt, en dat is precies wat een controller wil kunnen nalopen.',
            },
            {
              strong: 'Autorisatie blijft waar hij hoort.',
              rest: ' De toegang loopt via je bestaande login en rechten. Geen aparte kopie, geen gedeelde exportmap, geen service account met te ruime rechten.',
            },
            {
              strong: 'Je bent niet gebonden aan één assistent.',
              rest: ' Omdat MCP een open standaard is, werkt dezelfde koppeling in Claude, in andere MCP-clients en in eigen agents. De investering zit in de koppeling met je administratie, niet in de chatbot van één leverancier.',
            },
          ],
        },
        { type: 'h3', text: 'Werkt in de assistent die je al gebruikt' },
        {
          type: 'p',
          text: 'Dezelfde koppeling werkt in Claude, ChatGPT en Microsoft Copilot, en als bouwsteen in Make, n8n en Zapier. Wisselen van assistent kan altijd; wat je opbouwt raakt niet verloren.',
        },
      ],
    },
    {
      chapter: { num: 2, title: 'Vier taken die Claire vandaag overneemt' },
      blocks: [
        {
          type: 'p',
          text: 'Claire is de AI-collega van DataFlowr, gebouwd op een MCP-server voor Exact Online. Ze ontsluit vrijwel elk onderdeel van de administratie, in het gesprek én autonoom volgens schema. Vier taken waar dat direct werk scheelt.',
        },
        { type: 'h3', text: '1 · Vragen aan je cijfers' },
        {
          type: 'p',
          text: 'Stel de vraag zoals je die aan een collega zou stellen: “toon de winst-en-verliesrekening tegen vorig jaar”, “hoe staat onze cash-runway ervoor”, “welke artikelen raken bijna uit voorraad”. Claire haalt de actuele cijfers rechtstreeks uit Exact Online en antwoordt als tekst, tabel of overzichtskaart, tot op de grootboekrekening herleidbaar.',
        },
        { type: 'h3', text: '2 · De maandafsluiting voorbereiden' },
        {
          type: 'p',
          text: 'De afsluiting is waar controle en tijdsdruk botsen. Claire draait een vaste reeks deterministische controles op je administratie, onderzoekt afwijkingen en levert een close-readiness rapport met bevindingen en aanbevelingen.',
        },
        {
          type: 'steps',
          items: [
            { kicker: '01 · Vast', title: 'Controleren', body: 'Een vaste reeks afsluitcontroles draait op je administratie.' },
            { kicker: '02 · Analyse', title: 'Onderzoeken', body: 'Afwijkingen worden uitgezocht en boekingen gescand op posten die om een oordeel vragen.' },
            { kicker: '03 · Rapport', title: 'Rapporteren', body: 'Je ontvangt een close-readiness rapport met bevindingen en aanbevelingen.' },
            { kicker: '04 · Jij beslist', title: 'Beoordelen', body: 'Je beoordeelt elke bevinding; correcties pas na je akkoord.' },
          ],
        },
      ],
    },
    {
      blocks: [
        { type: 'h3', text: '3 · Debiteuren bewaken' },
        {
          type: 'p',
          text: 'Claire bewaakt openstaande posten, stelt ouderdomsanalyses op en zet herinneringen klaar, of stuurt ze op schema. Er gaat niets de deur uit zonder je akkoord.',
        },
        {
          type: 'table',
          cols: ['Factuur', 'Klant', 'Bedrag', 'Dagen'],
          align: ['left', 'left', 'right', 'right'],
          rows: [
            ['VK-2026-214', 'Acme Group', '€22.480', '18'],
            ['VK-2026-198', 'Helder BV', '€8.950', '34'],
            ['VK-2026-167', 'Van Dijk Techniek', '€18.200', '94'],
          ],
          note: '14 facturen open, samen €48.200. Herinneringen klaargezet. Voorbeeld uit onze demo-omgeving; bedragen en namen zijn fictief.',
        },
        { type: 'h3', text: '4 · Planningen: werk dat vanzelf terugkomt' },
        {
          type: 'p',
          text: 'Een agent voert volgens planning zelfstandig werk uit: afsluitcontroles op de eerste werkdag, een wekelijks debiteurenoverzicht, elke maandag een cashflowprognose in je mail. Je hoort het pas als er iets van je nodig is.',
        },
        { type: 'h3', text: 'Drie manieren om Claire in te zetten' },
        {
          type: 'ol',
          items: [
            { strong: 'Interactief.', rest: ' Open je AI-assistent en stel een vraag over je boekhouding in gewone taal.' },
            { strong: 'Autonoom.', rest: ' Een agent voert volgens planning zelfstandig werk uit en meldt zich alleen wanneer er iets van je nodig is.' },
            { strong: 'Geïntegreerd.', rest: ' Gebruik de connector in Make, n8n of Zapier als bouwsteen in je automatiseringen.' },
          ],
        },
      ],
    },
    {
      chapter: { num: 3, title: 'Veiligheid en controle' },
      blocks: [
        {
          type: 'p',
          text: 'De vraag die elke controller stelt: wat kan zo’n assistent allemaal, en wie houdt dat in de hand? De inrichting van Claire geeft daar een controleerbaar antwoord op.',
        },
        { type: 'h3', text: 'Lezen vrij, schrijven na akkoord' },
        {
          type: 'p',
          text: 'Claire leest en rekent zelfstandig, maar schrijft nooit ongevraagd: elke wijziging staat klaar als voorstel en wacht op je akkoord. Keur je een voorstel niet goed, dan gebeurt er niets en blijft het voorstel staan.',
        },
        { type: 'h3', text: 'Toegang per gebruiker' },
        {
          type: 'p',
          text: 'Iedereen koppelt met zijn eigen Exact Online-account, via de officiële API’s en beveiligde OAuth, en kan precies wat hij daar mag, niets meer. Elke actie wordt onder de eigen gebruiker gelogd, dus achteraf is te zien wie wat vroeg en wat er gebeurde.',
        },
        { type: 'h3', text: 'Geen schaduwkopie' },
        {
          type: 'p',
          text: 'Je data blijft in Exact Online. Claire haalt per vraag alleen op wat nodig is; er ontstaat geen kopie van je administratie in een extern platform.',
        },
        { type: 'h3', text: 'Rekenwerk buiten het taalmodel' },
        {
          type: 'p',
          text: 'Het rekenwerk gebeurt niet in het taalmodel, maar in een rekenlaag die deterministisch en herleidbaar is. Het taalmodel formuleert alleen het antwoord; de cijfers komen uit je eigen administratie, en elk antwoord toont de brongegevens.',
        },
      ],
    },
    {
      blocks: [
        { type: 'h3', text: 'Een beheerd product, geen losse scripts' },
        {
          type: 'p',
          text: 'Claire draait in een omgeving die DataFlowr ontwikkelt en beheert. Wijzigingen in de Exact Online-API en nieuwe functionaliteit zijn ons werk, niet het jouwe: centraal beheerd, met een stabiele interface.',
        },
        { type: 'h3', text: 'Waar de grenzen liggen' },
        {
          type: 'p',
          text: 'Claire vervangt geen boekhouder en geen oordeel. Ze bereidt voor, signaleert en onderbouwt; beslissen blijft mensenwerk. Antwoorden zijn zo goed als de administratie zelf: wat daar niet in staat, kan Claire niet weten. En omdat schrijven altijd langs jouw akkoord gaat, bepaal jij het tempo waarin je haar meer toevertrouwt.',
        },
        {
          type: 'note',
          text: 'Hoe we met gegevens omgaan staat in de privacyverklaring: dataflowr.nl/privacyverklaring.',
        },
      ],
    },
    {
      chapter: { num: 4, title: 'Wat het kost' },
      blocks: [
        {
          type: 'p',
          text: 'Alle plannen werken op je eigen Exact Online en zijn maandelijks opzegbaar.',
        },
        {
          type: 'table',
          cols: ['Plan', 'Per maand', 'Administraties', 'Erbij inbegrepen'],
          align: ['left', 'right', 'left', 'left'],
          rows: [
            ['Individueel', '€99', '3', 'Standaard support'],
            ['Bedrijf', '€299', '5', 'Onboarding met begeleiding'],
            ['Kantoor', '€749', 'Onbeperkt', 'Priority support + training'],
            ['Enterprise', 'Op offerte', 'Onbeperkt', 'Maatwerk, in overleg'],
          ],
          note: 'Prijzen excl. btw, per augustus 2026; actuele prijzen op dataflowr.nl/claire.',
        },
        {
          type: 'p',
          text: 'Standaard support betekent zelf aan de slag met de documentatie op dataflowr.nl/documentatie; Bedrijf en Kantoor voegen begeleiding en training toe. Individueel is ruim genoeg voor de dagelijkse vragen van één gebruiker; Bedrijf en Kantoor rekken vooral het gebruiksvolume op voor teams.',
        },
      ],
    },
    {
      chapter: { num: 5, title: 'Aan de slag' },
      blocks: [
        {
          type: 'p',
          text: 'Geen implementatietraject en geen migratie: de koppeling gebruikt de administratie zoals die er staat. Wie wil, is binnen een dag live.',
        },
        {
          type: 'steps',
          items: [
            { kicker: 'Stap 1', title: 'Koppeling', body: 'Klik op “Verbind Exact Online” op dataflowr.nl/claire. Registreren gebeurt onderweg, in dezelfde stap.' },
            { kicker: 'Stap 2', title: 'Inloggen', body: 'Je account bewaart de koppeling en je gesprekken; je komt na het inloggen precies terug waar je was.' },
            { kicker: 'Stap 3', title: 'Toestemming', body: 'Je keurt de koppeling goed in Exact Online zelf, met beveiligde OAuth. Klaar in zo’n 2 minuten.' },
            { kicker: 'Stap 4', title: 'Eerste vraag', body: 'Claire kijkt mee in je administratie en je stelt je eerste vraag, in Claude, ChatGPT of Copilot.' },
          ],
        },
        { type: 'h3', text: 'De eerste week' },
        {
          type: 'ul',
          items: [
            'Vraag om de openstaande verkoopfacturen, gesorteerd op ouderdom.',
            'Laat de afsluitcontroles voor de vorige maand draaien.',
            'Zet één planning aan, bijvoorbeeld een wekelijks debiteurenoverzicht.',
            'Nodig een collega uit; iedereen koppelt met zijn eigen account.',
          ],
        },
        {
          type: 'p',
          text: 'Liever samen doorlopen? Plan een kennismaking van 30 minuten via dataflowr.nl/contact en we zetten het samen op.',
        },
      ],
    },
  ],
  about: {
    title: 'Over DataFlowr',
    blocks: [
      {
        type: 'p',
        text: 'DataFlowr is een gespecialiseerde Exact Online Premium integratiepartner en hyperautomation-consultancy, in 2025 opgericht door Daan Jansen (financial control en consultancy) en Jan-Willem Gmelig Meyling (solution architect en software engineer). Kennis van het Exact Online-ecosysteem, finance-processen en software-engineering zit bij ons in één team.',
      },
      {
        type: 'p',
        text: 'Naast Claire bouwen we integraties, workflow-orkestratie en RPA, en trainen we finance-teams op hun eigen administratie. In de kennisbank op dataflowr.nl/kennisbank lees je hoe dat er in de praktijk uitziet, inclusief de artikelen waar deze whitepaper op leunt.',
      },
    ],
    contact: ['dataflowr.nl', 'info@dataflowr.nl', '023-2052813', 'linkedin.com/company/dataflowr'],
    company: 'DataFlowr B.V. · KVK 99021145 · Van Marsbergenstraat 71, 2134 LV Hoofddorp',
  },
  backCover: { line: '© 2026 DataFlowr · Claire, de AI-laag boven op Exact Online' },
};

const en: WpDoc = {
  lang: 'en',
  file: 'dataflowr-claire-whitepaper-en.pdf',
  cover: {
    eyebrow: 'Whitepaper · August 2026',
    titlePre: 'AI in your ',
    titleAccent: 'Exact Online',
    titlePost: ' administration',
    sub: 'What an AI assistant on the books can do today, where the limits are and how to start safely. Written for controllers and CFOs.',
    foot: 'Claire · the AI layer on top of Exact Online',
  },
  tocTitle: 'Contents',
  summaryTitle: 'In short',
  summary: [
    'MCP makes AI assistants usable on your administration: answers come from Exact Online per question, not from a language model’s memory.',
    'Claire answers questions about your figures, prepares the month-end close, watches receivables and runs schedules.',
    'Reading is free, writing only after your approval. No shadow copy of your data, access per user, every action logged.',
    'Starting small is fine: from €99 per month, live within a day, cancel monthly.',
  ],
  audienceTitle: 'Who this is for',
  audience:
    'For controllers, CFOs and accountants who work with Exact Online and want to judge whether an AI assistant on the administration is something for their team. No AI background needed; where technology comes up, we explain it.',
  colophon: 'DataFlowr B.V. · August 2026 · Questions about this whitepaper: info@dataflowr.nl',
  footer: 'DataFlowr · AI in your Exact Online administration',
  pages: [
    {
      chapter: { num: 1, title: 'What MCP is and why it matters for finance' },
      blocks: [
        {
          type: 'p',
          text: 'MCP stands for Model Context Protocol, an open standard introduced by Anthropic in late 2024 and now broadly adopted. It describes how an AI assistant may use a system’s tools: which actions exist, which data they involve and how access is arranged. What USB-C is for accessories, MCP is for AI connections: one plug that fits every assistant.',
        },
        { type: 'h3', text: 'How it works' },
        {
          type: 'p',
          text: 'A system, say your accounting package, offers an MCP server: a list of well-defined tools such as “fetch the trial balance” or “show this customer’s outstanding items”. Per question the assistant picks the tool it needs, calls it and phrases the answer based on what comes back.',
        },
        {
          type: 'p',
          text: 'Crucially, the model does not get a copy of your database. Every question triggers a targeted query in the administration itself, at the moment you ask it. There is no data dump living its own life somewhere else.',
        },
        {
          type: 'quote',
          text: 'The AI assistant does not get an export of your administration, it gets a doorbell. Every question passes through your authorisation, and the figures stay where they are.',
        },
      ],
    },
    {
      blocks: [
        { type: 'h3', text: 'Why this matters for finance' },
        {
          type: 'p',
          text: 'For a marketing text it hardly matters where an answer comes from. For a balance sheet position it does. Three properties make the difference between a chatbot and a verifiable answer:',
        },
        {
          type: 'ol',
          items: [
            {
              strong: 'Answers come from the administration, not from the model.',
              rest: ' The language model phrases; the figures are fetched per question through a tool. That makes it traceable which query underlies an answer, and that is exactly what a controller wants to be able to verify.',
            },
            {
              strong: 'Authorisation stays where it belongs.',
              rest: ' Access runs through your existing login and permissions. No separate copy, no shared export folder, no service account with overly broad rights.',
            },
            {
              strong: 'You are not tied to one assistant.',
              rest: ' Because MCP is an open standard, the same connection works in Claude, in other MCP clients and in your own agents. The investment is in the connection to your administration, not in one vendor’s chatbot.',
            },
          ],
        },
        { type: 'h3', text: 'Works in the assistant you already use' },
        {
          type: 'p',
          text: 'The same connection works in Claude, ChatGPT and Microsoft Copilot, and as a building block in Make, n8n and Zapier. You can switch assistants at any time; what you build up is not lost.',
        },
      ],
    },
    {
      chapter: { num: 2, title: 'Four tasks Claire takes over today' },
      blocks: [
        {
          type: 'p',
          text: 'Claire is DataFlowr’s AI colleague, built on an MCP server for Exact Online. She opens up nearly every part of the administration, in the chat and autonomously on a schedule. Four tasks where that saves work right away.',
        },
        { type: 'h3', text: '1 · Questions about your figures' },
        {
          type: 'p',
          text: 'Ask the question the way you would ask a colleague: “show the profit and loss against last year”, “how is our cash runway doing”, “which items are about to run out of stock”. Claire fetches the current figures straight from Exact Online and answers as text, a table or an overview card, traceable down to the ledger.',
        },
        { type: 'h3', text: '2 · Preparing the month-end close' },
        {
          type: 'p',
          text: 'The close is where control and time pressure collide. Claire runs a fixed set of deterministic checks on your books, investigates anomalies and delivers a close-readiness report with findings and recommendations.',
        },
        {
          type: 'steps',
          items: [
            { kicker: '01 · Fixed', title: 'Check', body: 'A fixed set of close checks runs on your books.' },
            { kicker: '02 · Analysis', title: 'Investigate', body: 'Anomalies are investigated and entries scanned for items that need a judgement.' },
            { kicker: '03 · Report', title: 'Report', body: 'You get a close-readiness report with findings and recommendations.' },
            { kicker: '04 · You decide', title: 'Review', body: 'You review each finding; corrections only happen after your approval.' },
          ],
        },
      ],
    },
    {
      blocks: [
        { type: 'h3', text: '3 · Watching receivables' },
        {
          type: 'p',
          text: 'Claire watches outstanding items, builds ageing analyses and prepares reminders, or sends them on schedule. Nothing goes out the door without your approval.',
        },
        {
          type: 'table',
          cols: ['Invoice', 'Customer', 'Amount', 'Days'],
          align: ['left', 'left', 'right', 'right'],
          rows: [
            ['VK-2026-214', 'Acme Group', '€22,480', '18'],
            ['VK-2026-198', 'Helder BV', '€8,950', '34'],
            ['VK-2026-167', 'Van Dijk Techniek', '€18,200', '94'],
          ],
          note: '14 invoices open, €48,200 in total. Reminders prepared. Example from our demo environment; amounts and names are fictitious.',
        },
        { type: 'h3', text: '4 · Schedules: work that comes back on its own' },
        {
          type: 'p',
          text: 'An agent runs work on a schedule: close checks on the first working day, a weekly receivables overview, a cash flow forecast in your inbox every Monday. You only hear from it when it needs you.',
        },
        { type: 'h3', text: 'Three ways to put Claire to work' },
        {
          type: 'ol',
          items: [
            { strong: 'Interactive.', rest: ' Open your AI assistant and ask a question about your books in plain language.' },
            { strong: 'Autonomous.', rest: ' An agent runs work on a schedule and only reports back when it needs you.' },
            { strong: 'Integrated.', rest: ' Use the connector in Make, n8n or Zapier as a building block in your automations.' },
          ],
        },
      ],
    },
    {
      chapter: { num: 3, title: 'Security and control' },
      blocks: [
        {
          type: 'p',
          text: 'The question every controller asks: what can such an assistant do, and who keeps that in check? The way Claire is set up gives a verifiable answer.',
        },
        { type: 'h3', text: 'Read freely, write on approval' },
        {
          type: 'p',
          text: 'Claire reads and calculates on her own, but never writes unprompted: every change waits as a proposal for your explicit approval. If you do not approve a proposal, nothing happens and the proposal stays ready.',
        },
        { type: 'h3', text: 'Access per user' },
        {
          type: 'p',
          text: 'Everyone connects with their own Exact Online account, through the official APIs and secure OAuth, and can do exactly what they may there, nothing more. Every action is logged under their name, so afterwards you can see who asked what and what happened.',
        },
        { type: 'h3', text: 'No shadow copy' },
        {
          type: 'p',
          text: 'Your data stays in Exact Online. Claire fetches only what a given answer needs; no copy of your books ends up in an external platform.',
        },
        { type: 'h3', text: 'Calculation outside the language model' },
        {
          type: 'p',
          text: 'The calculation work does not happen in the language model but in a calculation layer that is deterministic and traceable. The language model only phrases the answer; the figures come from your own administration, and every answer shows its source data.',
        },
      ],
    },
    {
      blocks: [
        { type: 'h3', text: 'A managed product, not loose scripts' },
        {
          type: 'p',
          text: 'Claire runs in an environment DataFlowr develops and manages. Changes to the Exact Online API and new features are our job, not yours: centrally managed, with a stable interface.',
        },
        { type: 'h3', text: 'Where the limits are' },
        {
          type: 'p',
          text: 'Claire replaces neither a bookkeeper nor judgement. She prepares, flags and substantiates; deciding remains human work. Answers are as good as the administration itself: what is not in there, Claire cannot know. And because writing always passes through your approval, you set the pace at which you trust her with more.',
        },
        {
          type: 'note',
          text: 'How we handle data is in the privacy policy: dataflowr.nl/en/privacy.',
        },
      ],
    },
    {
      chapter: { num: 4, title: 'What it costs' },
      blocks: [
        {
          type: 'p',
          text: 'Every plan runs on your own Exact Online and can be cancelled monthly.',
        },
        {
          type: 'table',
          cols: ['Plan', 'Per month', 'Administrations', 'Included'],
          align: ['left', 'right', 'left', 'left'],
          rows: [
            ['Individual', '€99', '3', 'Standard support'],
            ['Business', '€299', '5', 'Guided onboarding'],
            ['Firm', '€749', 'Unlimited', 'Priority support + training'],
            ['Enterprise', 'On quote', 'Unlimited', 'Custom, by agreement'],
          ],
          note: 'Prices excl. VAT, as of August 2026; current prices at dataflowr.nl/en/claire.',
        },
        {
          type: 'p',
          text: 'Standard support means working from the documentation at dataflowr.nl/en/docs; Business and Firm add guidance and training. Individual is ample room for one user’s day-to-day questions; Business and Firm mainly stretch the usage volume for teams.',
        },
      ],
    },
    {
      chapter: { num: 5, title: 'Getting started' },
      blocks: [
        {
          type: 'p',
          text: 'No implementation project and no migration: the connection uses the administration as it stands. If you want to, you are live within a day.',
        },
        {
          type: 'steps',
          items: [
            { kicker: 'Step 1', title: 'Connect', body: 'Click “Connect Exact Online” on dataflowr.nl/en/claire. Registration happens along the way, in the same step.' },
            { kicker: 'Step 2', title: 'Sign in', body: 'Your account keeps the connection and your conversations; after signing in you land right back where you were.' },
            { kicker: 'Step 3', title: 'Approve', body: 'You approve the connection in Exact Online itself, with secure OAuth. Ready in about 2 minutes.' },
            { kicker: 'Step 4', title: 'First question', body: 'Claire looks into your administration and you ask your first question, in Claude, ChatGPT or Copilot.' },
          ],
        },
        { type: 'h3', text: 'The first week' },
        {
          type: 'ul',
          items: [
            'Ask for the outstanding sales invoices, sorted by age.',
            'Run the close checks for last month.',
            'Turn on one schedule, for example a weekly receivables overview.',
            'Invite a colleague; everyone connects with their own account.',
          ],
        },
        {
          type: 'p',
          text: 'Prefer to walk through it together? Book a 30-minute intro via dataflowr.nl/en/contact and we set it up with you.',
        },
      ],
    },
  ],
  about: {
    title: 'About DataFlowr',
    blocks: [
      {
        type: 'p',
        text: 'DataFlowr is a specialised Exact Online Premium integration partner and hyperautomation consultancy, founded in 2025 by Daan Jansen (financial control and consultancy) and Jan-Willem Gmelig Meyling (solution architect and software engineer). Knowledge of the Exact Online ecosystem, finance processes and software engineering sits in one team.',
      },
      {
        type: 'p',
        text: 'Besides Claire we build integrations, workflow orchestration and RPA, and we train finance teams on their own administration. The knowledge base at dataflowr.nl/en/resources shows what that looks like in practice, including the articles this whitepaper draws on.',
      },
    ],
    contact: ['dataflowr.nl', 'info@dataflowr.nl', '+31 23 2052813', 'linkedin.com/company/dataflowr'],
    company: 'DataFlowr B.V. · Chamber of Commerce (KVK) 99021145 · Van Marsbergenstraat 71, 2134 LV Hoofddorp, the Netherlands',
  },
  backCover: { line: '© 2026 DataFlowr · Claire, the AI layer on top of Exact Online' },
};

export const WHITEPAPERS: WpDoc[] = [nl, en];
