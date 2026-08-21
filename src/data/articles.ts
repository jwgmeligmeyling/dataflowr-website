import type { ImageMetadata } from 'astro';
import { EMAIL_DAAN, EMAIL_JANWILLEM, type ArticleKey, type Lang } from '../lib/site';
import daanPhoto from '../assets/daan.jpeg';
import janWillemPhoto from '../assets/jan-willem.jpeg';

/**
 * Knowledge-base article content. One entry per article in routes.articles;
 * ArticlePage.astro renders the blocks and derives the TOC from the h2 blocks
 * and the "more from the knowledge base" cards from the other articles.
 */

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ol'; items: { strong: string; rest: string }[] }
  /** Inline screenshot (16:9, 2880×1620), captured from the Claire app. */
  | { type: 'figure'; src: string; alt: string; caption: string };

export interface ArticleContent {
  metaTitle: string;
  metaDescription: string;
  crumbCurrent: string;
  /** Category label, shown on the "more" cards. */
  cat: string;
  /** Chip above the title. */
  tag: string;
  date: string;
  title: string;
  lead: string;
  /**
   * Hero image (16:9). Screenshots from the Claire app are 2880×1620, the
   * assumed size when width/height are omitted. With heroVideo set this image
   * is not shown on the article page itself, but still feeds the share card,
   * the JSON-LD and the overview cards.
   */
  hero: { src: string; alt: string; width?: number; height?: number };
  /** When set, the article page renders this embed in the hero slot instead of the image. */
  heroVideo?: { embedUrl: string; title: string };
  blocks: ArticleBlock[];
  claireTitle: string;
  claireBody: string;
}

export type AuthorKey = 'daan' | 'janwillem';

export interface Article {
  author: AuthorKey;
  dateIso: string;
  nl: ArticleContent;
  en: ArticleContent;
}

export const authors: Record<
  AuthorKey,
  { name: string; jobTitle: string; email: string; photo: ImageMetadata; role: Record<Lang, string> }
> = {
  daan: {
    name: 'Daan Jansen',
    jobTitle: 'Co-founder · Financial Consultant',
    email: EMAIL_DAAN,
    photo: daanPhoto,
    role: {
      nl: 'Co-founder · Financial Consultant bij DataFlowr',
      en: 'Co-founder · Financial Consultant at DataFlowr',
    },
  },
  janwillem: {
    name: 'Jan-Willem Gmelig Meyling',
    jobTitle: 'Co-founder · Solution Architect',
    email: EMAIL_JANWILLEM,
    photo: janWillemPhoto,
    role: {
      nl: 'Co-founder · Solution Architect bij DataFlowr',
      en: 'Co-founder · Solution Architect at DataFlowr',
    },
  },
};

/** Shared page furniture strings. */
export const articleUi = {
  nl: {
    crumbResources: 'Kennisbank',
    authorSlot: 'Foto',
    authorCta: 'Neem contact op →',
    tocTitle: 'Op deze pagina',
    claireCta: 'Bekijk Claire',
    moreTitle: 'Meer uit de kennisbank',
  },
  en: {
    crumbResources: 'Resources',
    authorSlot: 'Photo',
    authorCta: 'Get in touch →',
    tocTitle: 'On this page',
    claireCta: 'Discover Claire',
    moreTitle: 'More from the knowledge base',
  },
} as const;

export const articles: Record<ArticleKey, Article> = {
  maandafsluiting: {
    author: 'daan',
    dateIso: '2026-07-12',
    nl: {
      metaTitle: 'Waarom de maandafsluiting nog een week kost, en wat er écht helpt',
      metaDescription:
        'De maandafsluiting bestaat uit tientallen handmatige controles. Drie ingrepen die meetbaar helpen: deterministische controles, signaleren scheiden van beoordelen, en besluiten vastleggen. Praktijkgids van DataFlowr.',
      crumbCurrent: 'Maandafsluiting',
      cat: 'Finance',
      tag: 'Praktijkgids',
      date: '12 juli 2026',
      title: 'Waarom de maandafsluiting nog een week kost, en wat er écht helpt',
      lead:
        'Dezelfde checklist, elke maand opnieuw: kloppen de openingsbalansen, zijn de tussenrekeningen leeg, sluiten de subadministraties aan? Belangrijk werk, maar grotendeels routine, en juist daar sluipt het erin.',
      hero: { src: '/kennisbank/maandafsluiting-nl.png', alt: 'Claire’s agentwerkruimte met een close-readiness rapport: controleresultaten en aanbevolen acties voor de maandafsluiting van juli' },
      blocks: [
        {
          type: 'p',
          text: 'Wat je niet ziet, of waar je niet aan toekomt, schuift door naar de volgende maand. Niet omdat je team onzorgvuldig werkt, maar omdat de afsluiting bestaat uit tientallen kleine controles die allemaal met de hand langs dezelfde administratie gaan. Bij drukte valt de eerste controle weg. Bij vakantie de tweede.',
        },
        { type: 'h2', id: 'probleem', text: 'Het probleem is niet de hoeveelheid werk' },
        {
          type: 'p',
          text: 'Meer mensen aannemen lost dit zelden op: het werk is niet te veel, het werk is te handmatig. Elke vraag begint opnieuw met exports, draaitabellen en overtypwerk, en bij de volgende vraag begint hetzelfde proces van voren af aan. De cijfers bestaan al. Ze zijn alleen moeilijk bereikbaar.',
        },
        {
          type: 'quote',
          text: '"De afsluiting verschuift van zoekwerk naar beoordelingswerk. Je team loopt niet meer elke tussenrekening na, maar beoordeelt een voorbereide lijst bevindingen."',
        },
        { type: 'h2', id: 'drie-dingen', text: 'Drie dingen die meetbaar helpen' },
        {
          type: 'p',
          text: 'Niet elke verbetering vraagt een implementatietraject. In de praktijk zien we drie ingrepen die het verschil maken, in deze volgorde:',
        },
        {
          type: 'ol',
          items: [
            { strong: 'Maak de controles deterministisch.', rest: ' Dezelfde administratie moet dezelfde uitkomst geven. Zodra een controle afhangt van wie hem uitvoert, is het geen controle maar een inschatting.' },
            { strong: 'Scheid signaleren van beoordelen.', rest: ' Laat een systeem opvallende posten naar boven halen, vraagposten, mogelijke dubbelen, afwijkende tegenrekeningen, en houd het oordeel bij je controller.' },
            { strong: 'Leg het besluit vast, niet alleen de correctie.', rest: ' Wat is er onderzocht, wat kwam eruit en wat heb je besloten? Die drie samen verlichten komende maanden het werk.' },
          ],
        },
        { type: 'h2', id: 'praktijk', text: 'Hoe dat er in de praktijk uitziet' },
        {
          type: 'p',
          text: 'Een agent doorloopt op de eerste werkdag een vaste reeks afsluitcontroles, onderzoekt de afwijkingen die daaruit komen en levert een close-readiness rapport op: een helder overzicht van wat de afsluiting nog blokkeert, met bevindingen en concrete aanbevelingen. Je controller begint niet met zoeken, maar met beoordelen, en niets wordt geboekt zonder akkoord.',
        },
        {
          type: 'p',
          text: 'Het rekenwerk gebeurt daarbij niet in het taalmodel, maar in een rekenlaag die deterministisch en herleidbaar is. Het taalmodel formuleert alleen het antwoord; de cijfers komen uit je eigen administratie.',
        },
      ],
      claireTitle: 'Laat Claire de afsluiting voorbereiden',
      claireBody: 'Vaste controles, bevindingen met onderbouwing, correcties pas na je akkoord.',
    },
    en: {
      metaTitle: 'Why the month-end close still takes a week, and what actually shortens it',
      metaDescription:
        'The month-end close consists of dozens of manual checks. Three interventions that measurably help: deterministic checks, separating flagging from judging, and recording decisions. A practical guide by DataFlowr.',
      crumbCurrent: 'Month-end close',
      cat: 'Finance',
      tag: 'Guide',
      date: '12 July 2026',
      title: 'Why the month-end close still takes a week, and what actually shortens it',
      lead:
        "The same checklist every month: do the opening balances add up, are the suspense accounts empty, do the sub-ledgers reconcile? Important work, but largely routine, and exactly where things slip through.",
      hero: { src: '/kennisbank/maandafsluiting-en.png', alt: 'Claire’s agent workspace with a close-readiness report: check results and recommended actions for the July month-end close' },
      blocks: [
        {
          type: 'p',
          text: "What you don't see, or don't get to, shifts to the next month. Not because your team works carelessly, but because the close consists of dozens of small checks that all walk through the same administration by hand. When it gets busy, the first check drops. During holidays, the second.",
        },
        { type: 'h2', id: 'problem', text: "The problem isn't the amount of work" },
        {
          type: 'p',
          text: "Hiring more people rarely fixes this: the work isn't too much, the work is too manual. Every question starts again with exports, pivot tables and re-typing, and with the next question the same process starts from scratch. The figures already exist. They're just hard to reach.",
        },
        {
          type: 'quote',
          text: '"The close shifts from searching to reviewing. Your team no longer walks through every suspense account, they review a prepared list of findings."',
        },
        { type: 'h2', id: 'three-things', text: 'Three things that measurably help' },
        {
          type: 'p',
          text: "Not every improvement requires an implementation project. In practice we see three interventions that make the difference, in this order:",
        },
        {
          type: 'ol',
          items: [
            { strong: 'Make the checks deterministic.', rest: ' The same administration must give the same outcome. As soon as a check depends on who performs it, it is not a check but an estimate.' },
            { strong: 'Separate flagging from judging.', rest: ' Let a system surface notable items, query items, possible duplicates, unusual contra accounts, and keep the judgement with your controller.' },
            { strong: 'Record the decision, not just the correction.', rest: ' What was investigated, what came out and what did you decide? Those three together lighten the work in the months ahead.' },
          ],
        },
        { type: 'h2', id: 'in-practice', text: 'What this looks like in practice' },
        {
          type: 'p',
          text: 'On the first working day an agent walks through a fixed set of close checks, investigates the deviations that come out and delivers a close-readiness report: a clear overview of what still blocks the close, with findings and concrete recommendations. Your controller starts not with searching but with reviewing, and nothing is posted without approval.',
        },
        {
          type: 'p',
          text: 'The number-crunching does not happen in the language model, but in a calculation layer that is deterministic and traceable. The language model only phrases the answer; the figures come from your own administration.',
        },
      ],
      claireTitle: 'Let Claire prepare the close',
      claireBody: 'Fixed checks, findings with substantiation, corrections only after your approval.',
    },
  },

  'psp-reconciliatie': {
    author: 'janwillem',
    dateIso: '2026-07-26',
    nl: {
      metaTitle: 'PSP-reconciliatie: waarom de bank nooit precies aansluit',
      metaDescription:
        'Uitbetalingen van een payment service provider sluiten zelden één-op-één aan op de omzet. Waarom dat in het model zit, en hoe je met settlement-rapporten en aparte stromen de aansluiting deterministisch maakt.',
      crumbCurrent: 'PSP-reconciliatie',
      cat: 'Integraties',
      tag: 'Praktijkgids',
      date: '26 juli 2026',
      title: 'PSP-reconciliatie: waarom de bank nooit precies aansluit',
      lead:
        'Wie via een payment service provider ontvangt, kent het patroon: de omzet staat in de webshop of het kassasysteem, de uitbetaling staat op de bank, en daartussen zit een bedrag dat nooit precies klopt. Dat is geen slordigheid. Het zit in het model ingebakken.',
      hero: { src: '/kennisbank/psp-reconciliatie-nl.png', alt: 'Chatgesprek waarin Claire het verschil tussen de PSP-uitbetaling en de omzet verklaart met een aansluittabel van kosten, refunds en chargebacks' },
      blocks: [
        {
          type: 'p',
          text: 'Een PSP betaalt niet per transactie uit, maar in batches. Eén uitbetaling bundelt de transacties van een of meer dagen, netto na inhouding van de transactiekosten, en met restituties en chargebacks in dezelfde batch verrekend. Op de bank landt dus één bedrag dat de optelsom is van honderden transacties, minus kosten, minus terugbetalingen, plus correcties. Dat bedrag terugrekenen naar de omzet is precies het zoekwerk waar elke maand uren in verdwijnen.',
        },
        { type: 'h2', id: 'kruispost', text: 'Waarom de kruispost volloopt' },
        {
          type: 'p',
          text: 'De klassieke aanpak boekt de uitbetalingen op een tussenrekening en probeert die achteraf leeg te maken. Zolang alles klopt gaat dat goed, maar elke afwijking blijft staan: een chargeback zonder tegenboeking, een uitbetaling die over de maandgrens heen valt, kosten die net anders zijn dan verwacht. Aan het einde van het kwartaal staat er een saldo waarvan niemand meer weet waaruit het is opgebouwd, en dat uiteindelijk als “verschil” wordt weggeboekt.',
        },
        {
          type: 'quote',
          text: '"Het verschil tussen webshop en bank is geen afrondingsverschil. Het is de optelsom van transactiekosten, restituties en clearingtermijnen, en wie die drie apart boekt, heeft niets meer te zoeken."',
        },
        { type: 'h2', id: 'drie-stromen', text: 'Drie stromen, drie boekingen' },
        {
          type: 'p',
          text: 'De aansluiting wordt pas deterministisch als je haar opbouwt vanuit de bron die alles specificeert, en de stromen die nu op één hoop liggen uit elkaar haalt:',
        },
        {
          type: 'ol',
          items: [
            { strong: 'Reconcilieer op het settlement-rapport, niet op het bankafschrift.', rest: ' Elke PSP levert per uitbetaling een rapport dat exact specificeert welke transacties, transactiekosten en restituties erin zitten. Dat rapport is de brug tussen omzet en bank; het bankafschrift toont alleen de uitkomst.' },
            { strong: 'Boek transactiekosten en restituties als aparte stromen.', rest: ' De transactiekosten naar de kostenrekening, restituties tegen de omzet. Wat overblijft sluit één-op-één aan op de uitbetaling, en verschillen krijgen een naam in plaats van een vergaarbak.' },
            { strong: 'Maak de tussenrekening een controle in plaats van een parkeerplaats.', rest: ' Een lege kruispost aan het einde van de periode is het bewijs dat de aansluiting klopt. Elke rest die blijft staan is een bevinding met een aanwijsbare oorzaak, geen post om volgend kwartaal weg te boeken.' },
          ],
        },
        { type: 'h2', id: 'praktijk', text: 'Hoe dat er in de praktijk uitziet' },
        {
          type: 'p',
          text: 'De settlement-rapporten zijn bij vrijwel elke PSP via een API of export beschikbaar, en het matchen van regels tegen omzet en bank is werk voor een systeem, niet voor een controller. Een koppeling haalt de rapporten automatisch op, legt de drie stromen vast en houdt alleen de regels over die niet automatisch te verklaren zijn.',
        },
        {
          type: 'p',
          text: 'Tijdens de maandafsluiting hoort daar een vaste controle bij: zijn de tussenrekeningen leeg, en zo niet, wat staat erop en waarom? Een agent die dat elke maand op dezelfde manier controleert en de restposten onderzoekt, maakt van de kruispost een controlepunt in plaats van een risico, en niets wordt geboekt zonder je akkoord.',
        },
      ],
      claireTitle: 'Laat Claire de tussenrekeningen bewaken',
      claireBody: 'Claire signaleert wat op de kruispost blijft staan en onderzoekt de oorzaak, voordat de afsluiting erop wacht.',
    },
    en: {
      metaTitle: 'PSP reconciliation: why the bank never quite matches',
      metaDescription:
        'Payouts from a payment service provider rarely match revenue one-to-one. Why that is built into the model, and how settlement reports and separate flows make the reconciliation deterministic.',
      crumbCurrent: 'PSP reconciliation',
      cat: 'Integrations',
      tag: 'Guide',
      date: '26 July 2026',
      title: 'PSP reconciliation: why the bank never quite matches',
      lead:
        'Anyone who collects payments through a payment service provider knows the pattern: revenue sits in the webshop or POS system, the payout sits on the bank statement, and in between is an amount that never quite adds up. That is not sloppiness. It is built into the model.',
      hero: { src: '/kennisbank/psp-reconciliatie-en.png', alt: 'Chat conversation in which Claire explains the gap between the PSP payout and revenue with a reconciliation table of fees, refunds and chargebacks' },
      blocks: [
        {
          type: 'p',
          text: 'A PSP does not pay out per transaction but in batches. One payout bundles the transactions of one or more days, net of transaction fees, with refunds and chargebacks settled in the same batch. What lands on the bank is a single amount that is the sum of hundreds of transactions, minus fees, minus refunds, plus corrections. Working that amount back to revenue is exactly the searching that swallows hours every month.',
        },
        { type: 'h2', id: 'suspense', text: 'Why the suspense account fills up' },
        {
          type: 'p',
          text: 'The classic approach books the payouts to a suspense account and tries to empty it afterwards. As long as everything matches that works, but every deviation stays behind: a chargeback without a contra entry, a payout that straddles the month boundary, fees that differ slightly from what was expected. By the end of the quarter there is a balance nobody can trace back, which eventually gets written off as a “difference”.',
        },
        {
          type: 'quote',
          text: '"The gap between webshop and bank is not a rounding difference. It is the sum of transaction fees, refunds and clearing times, and once you book those three separately, there is nothing left to search for."',
        },
        { type: 'h2', id: 'three-flows', text: 'Three flows, three postings' },
        {
          type: 'p',
          text: 'The reconciliation only becomes deterministic when you build it from the source that specifies everything, and pull apart the flows that currently sit in one pile:',
        },
        {
          type: 'ol',
          items: [
            { strong: 'Reconcile against the settlement report, not the bank statement.', rest: ' Every PSP provides a report per payout that specifies exactly which transactions, fees and refunds it contains. That report is the bridge between revenue and bank; the bank statement only shows the outcome.' },
            { strong: 'Book fees and refunds as separate flows.', rest: ' Transaction fees to the cost account, refunds against revenue. What remains matches the payout one-to-one, and differences get a name instead of a dumping ground.' },
            { strong: 'Turn the suspense account into a check instead of a parking lot.', rest: ' An empty suspense account at period end is the proof that the reconciliation holds. Any remainder is a finding with an identifiable cause, not an item to write off next quarter.' },
          ],
        },
        { type: 'h2', id: 'in-practice', text: 'What this looks like in practice' },
        {
          type: 'p',
          text: 'Settlement reports are available from virtually every PSP via an API or export, and matching lines against revenue and bank is work for a system, not for a controller. An integration fetches the reports automatically, records the three flows and leaves only the lines that cannot be explained automatically.',
        },
        {
          type: 'p',
          text: 'The month-end close then gains a fixed check: are the suspense accounts empty, and if not, what is on them and why? An agent that runs that check the same way every month and investigates the remainders turns the suspense account into a control point instead of a risk, and nothing is posted without your approval.',
        },
      ],
      claireTitle: 'Let Claire watch the suspense accounts',
      claireBody: 'Claire flags what lingers on the suspense account and investigates the cause, before the close is waiting on it.',
    },
  },

  'premium-features': {
    author: 'daan',
    dateIso: '2026-06-14',
    nl: {
      metaTitle: 'Premium-features waar je voor betaalt maar niets mee doet',
      metaDescription:
        'Smart Closing, de Power BI Connector en de Premium-API’s zitten in je Exact Online Premium-abonnement, maar blijven bij veel bedrijven ongebruikt. Wat ze doen en waar je begint.',
      crumbCurrent: 'Premium-features',
      cat: 'Exact Online',
      tag: 'Praktijkgids',
      date: '14 juni 2026',
      title: 'Premium-features waar je voor betaalt maar niets mee doet',
      lead:
        'De overstap naar Exact Online Premium wordt meestal gemaakt voor één reden: meer administraties, meer gebruikers of een rapportagewens. De rest van het pakket komt daarna zelden nog ter sprake. Zonde, want juist daar zit de winst.',
      hero: { src: '/kennisbank/premium-features-nl.png', alt: 'DataFlowr-dashboard met een verbonden Exact Online-administratie, recente agentactiviteit en een ingeplande maandafsluiting' },
      blocks: [
        {
          type: 'p',
          text: 'Aangezet is niet hetzelfde als in gebruik. De meeste implementaties stoppen zodra de migratie rond is en de facturen weer de deur uit gaan, en dat is precies het moment waarop de Premium-features nog in de kast liggen. Drie ervan verdienen het om eruit gehaald te worden.',
        },
        { type: 'h2', id: 'smart-closing', text: 'Smart Closing' },
        {
          type: 'p',
          text: 'Smart Closing geeft per periode inzicht in de status van je afsluiting: welke stappen zijn afgerond, welke staan open en waar zit een blokkade. Het vervangt de checklist die nu in Excel of in iemands hoofd zit, maar het werkt pas als de indicatoren zijn ingericht en periodes consequent worden afgesloten. Juist die inrichting blijft in de praktijk liggen.',
        },
        { type: 'h2', id: 'power-bi', text: 'De Power BI Connector' },
        {
          type: 'p',
          text: 'De Power BI Connector rapporteert rechtstreeks op de administratie, zonder maandelijkse exports. Het rapport dat nu elke maand uit downloads en draaitabellen wordt opgebouwd, kan één keer goed worden ingericht en ververst daarna zichzelf. De eenmalige investering in het datamodel betaalt zich elke maand terug in niet-gemaakt knipwerk.',
        },
        { type: 'h2', id: 'apis', text: 'De Premium-API’s' },
        {
          type: 'p',
          text: 'Het minst zichtbaar, maar het meest bepalend: de ruimere API-limieten en endpoints van Premium zijn de basis onder elke serieuze koppeling. Integraties met je PSP of webshop, workflow-automatisering, een AI-assistent op de administratie: het loopt allemaal via deze API’s, en op een standaardabonnement loopt het er ook op stuk.',
        },
        {
          type: 'quote',
          text: '"Je betaalt al voor het gereedschap. De vraag is niet of je het nodig hebt, maar waarom het nog in de kast ligt."',
        },
        { type: 'h2', id: 'begin', text: 'Waar je begint' },
        {
          type: 'ol',
          items: [
            { strong: 'Zet Smart Closing aan voor één administratie.', rest: ' Richt de indicatoren in voor de stappen die je nu op een checklist bijhoudt, en sluit er één maand mee af. Daarna weet je wat het oplevert.' },
            { strong: 'Vervang één rapport door de Power BI Connector.', rest: ' Het rapport dat nu maandelijks uit exports wordt opgebouwd is de beste kandidaat: bekende cijfers, bekende ontvangers, direct meetbare tijdwinst.' },
            { strong: 'Inventariseer wat er op de API’s kan.', rest: ' Overal waar cijfers worden overgetypt tussen twee systemen zit een koppeling die er al had kunnen zijn. Begin bij de plek waar het vaakst iets misgaat.' },
          ],
        },
        {
          type: 'p',
          text: 'Wil je dit niet zelf uitzoeken? Wij richten de features in op je eigen administratie en nemen je team erin mee, zodat de kennis intern blijft en het gebruik niet stopt zodra wij de deur uit zijn.',
        },
      ],
      claireTitle: 'AI in je Exact Online',
      claireBody: 'Claire werkt op dezelfde Premium-API’s: vragen in gewone taal, antwoorden uit je eigen administratie.',
    },
    en: {
      metaTitle: "Premium features you're paying for but not using",
      metaDescription:
        'Smart Closing, the Power BI Connector and the Premium APIs are part of your Exact Online Premium subscription, yet sit unused at many companies. What they do and where to start.',
      crumbCurrent: 'Premium features',
      cat: 'Exact Online',
      tag: 'Guide',
      date: '14 June 2026',
      title: "Premium features you're paying for but not using",
      lead:
        'The move to Exact Online Premium is usually made for one reason: more administrations, more users or a reporting need. The rest of the package rarely comes up afterwards. A shame, because that is exactly where the gains are.',
      hero: { src: '/kennisbank/premium-features-en.png', alt: 'DataFlowr dashboard with a connected Exact Online administration, recent agent activity and a scheduled month-end close' },
      blocks: [
        {
          type: 'p',
          text: 'Switched on is not the same as in use. Most implementations stop the moment the migration is done and invoices are going out again, and that is precisely when the Premium features are still sitting on the shelf. Three of them deserve to be taken off it.',
        },
        { type: 'h2', id: 'smart-closing', text: 'Smart Closing' },
        {
          type: 'p',
          text: 'Smart Closing shows the status of your close per period: which steps are done, which are open and where something is blocked. It replaces the checklist that currently lives in Excel or in someone’s head, but it only works once the indicators are configured and periods are closed consistently. In practice it is exactly that configuration that never happens.',
        },
        { type: 'h2', id: 'power-bi', text: 'The Power BI Connector' },
        {
          type: 'p',
          text: 'The Power BI Connector reports directly on the administration, without monthly exports. The report that is currently rebuilt every month from downloads and pivot tables can be set up properly once and then refreshes itself. The one-off investment in the data model pays itself back every month in copy-paste work that no longer happens.',
        },
        { type: 'h2', id: 'apis', text: 'The Premium APIs' },
        {
          type: 'p',
          text: 'The least visible but most decisive: the extended API limits and endpoints of Premium are the foundation under every serious integration. Connections to your PSP or webshop, workflow automation, an AI assistant on the books: it all runs through these APIs, and on a standard subscription it also runs aground on them.',
        },
        {
          type: 'quote',
          text: '"You are already paying for the tools. The question is not whether you need them, but why they are still on the shelf."',
        },
        { type: 'h2', id: 'start', text: 'Where to start' },
        {
          type: 'ol',
          items: [
            { strong: 'Switch on Smart Closing for one administration.', rest: ' Configure the indicators for the steps you currently track on a checklist, and close one month with it. Then you know what it is worth.' },
            { strong: 'Replace one report with the Power BI Connector.', rest: ' The report that is rebuilt from exports every month is the best candidate: familiar figures, familiar recipients, immediately measurable time savings.' },
            { strong: 'Take stock of what the APIs make possible.', rest: ' Wherever figures are retyped between two systems, there is an integration that could already have existed. Start where things go wrong most often.' },
          ],
        },
        {
          type: 'p',
          text: 'Rather not figure this out yourself? We configure the features on your own administration and train your team on them, so the knowledge stays in-house and usage does not stop the moment we walk out the door.',
        },
      ],
      claireTitle: 'AI in your Exact Online',
      claireBody: 'Claire runs on the same Premium APIs: questions in plain language, answers from your own administration.',
    },
  },

  'mcp-voor-finance': {
    author: 'janwillem',
    dateIso: '2026-08-02',
    nl: {
      metaTitle: 'Wat MCP is, en waarom het voor finance uitmaakt',
      metaDescription:
        'MCP (Model Context Protocol) is de open standaard die AI-assistenten veilig toegang geeft tot systemen zoals Exact Online. Hoe het werkt, en waarom het voor finance het verschil maakt tussen een chatbot en een controleerbaar antwoord.',
      crumbCurrent: 'MCP',
      cat: 'AI',
      tag: 'Uitleg',
      date: '2 augustus 2026',
      title: 'Wat MCP is, en waarom het voor finance uitmaakt',
      lead:
        'Elke leverancier bouwt momenteel “AI in het product”. Handig, maar het levert tien losse chatbots op die elkaar niet kennen en elk hun eigen stukje van je data zien. MCP draait het om: één open standaard waarmee je AI-assistent veilig bij je systemen kan.',
      hero: { src: '/kennisbank/mcp-voor-finance-nl.png', alt: 'Schema van Claire als MCP-koppeling: ChatGPT, Gemini, Claude en Copilot praten via Claire rechtstreeks met Exact Online' },
      blocks: [
        {
          type: 'p',
          text: 'MCP staat voor Model Context Protocol, een open standaard die eind 2024 door Anthropic is geïntroduceerd en inmiddels breed wordt gedragen. Het beschrijft hoe een AI-assistent gereedschap van een systeem mag gebruiken: welke acties er zijn, welke gegevens erbij horen en hoe de toegang geregeld is. Wat USB-C is voor apparaten, is MCP voor AI-assistenten: één stekker in plaats van voor elke combinatie een eigen kabel.',
        },
        { type: 'h2', id: 'hoe-het-werkt', text: 'Hoe het werkt' },
        {
          type: 'p',
          text: 'Een systeem, bijvoorbeeld je boekhoudpakket, biedt een MCP-server aan: een lijst van afgebakende tools zoals “haal de proef- en saldibalans op” of “toon de openstaande posten van deze klant”. De assistent kiest per vraag welke tool nodig is, roept die aan en formuleert het antwoord op basis van wat er terugkomt. Je logt in met je bestaande account, dus de assistent ziet precies wat je zelf mag zien, niets meer.',
        },
        {
          type: 'p',
          text: 'Belangrijk daarbij: het model krijgt geen kopie van je database. Elke vraag leidt tot een gerichte opvraging in de administratie zelf, op het moment dat je de vraag stelt. Er is geen datadump die ergens anders een eigen leven gaat leiden.',
        },
        {
          type: 'quote',
          text: '"De AI-assistent krijgt geen export van je administratie, hij krijgt een deurbel. Elke vraag gaat langs je autorisatie, en de cijfers blijven waar ze staan."',
        },
        { type: 'h2', id: 'finance', text: 'Waarom dit voor finance uitmaakt' },
        {
          type: 'p',
          text: 'Voor een marketingtekst maakt het weinig uit waar een antwoord vandaan komt. Voor een balanspositie wel. Drie eigenschappen van MCP maken het verschil tussen een chatbot en een controleerbaar antwoord:',
        },
        {
          type: 'ol',
          items: [
            { strong: 'Antwoorden komen uit de administratie, niet uit het model.', rest: ' Het taalmodel formuleert; de cijfers worden per vraag via een tool opgehaald. Daarmee is herleidbaar welke opvraging aan een antwoord ten grondslag ligt, en dat is precies wat een controller wil kunnen nalopen.' },
            { strong: 'Autorisatie blijft waar hij hoort.', rest: ' De toegang loopt via je bestaande login en rechten. Geen aparte kopie, geen gedeelde exportmap, geen service account met te ruime rechten.' },
            { strong: 'Je bent niet gebonden aan één assistent.', rest: ' Omdat MCP een open standaard is, werkt dezelfde koppeling in Claude, in andere MCP-clients en in eigen agents. De investering zit in de koppeling met je administratie, niet in de chatbot van één leverancier.' },
          ],
        },
        { type: 'h2', id: 'praktijk', text: 'Hoe dat er in de praktijk uitziet' },
        {
          type: 'p',
          text: 'Wij ontwikkelden een MCP-server voor Exact Online, met rapportagetools voor onder meer de proef- en saldibalans, de resultatenrekening en ouderdomsanalyses. Het rekenwerk gebeurt in een deterministische rekenlaag; het taalmodel formuleert alleen het antwoord. Dezelfde administratie geeft dus dezelfde uitkomst, wie er ook vraagt.',
        },
        {
          type: 'p',
          text: 'Claire gebruikt die server: vragen stellen in gewone taal, vaste afsluitcontroles, en boekingen alleen na je uitdrukkelijke akkoord. MCP is daarbij geen marketingterm maar de fundering: het is de reden dat Claire in je eigen administratie kan werken in plaats van in een kopie ervan.',
        },
        {
          type: 'p',
          text: 'Claire zelf draait in een omgeving die wij bij DataFlowr hebben ontwikkeld, op infrastructuur van onze partners en met taalmodellen van onze leverancier. Wat dat controleerbaar maakt, zit in de inrichting: er wordt geen schaduwkopie van je administratie opgeslagen, elke vraag wordt op dat moment rechtstreeks in Exact Online opgevraagd, wijzigingen vereisen altijd een handmatige bevestiging, en alles wordt gelogd.',
        },
      ],
      claireTitle: 'Claire spreekt MCP',
      claireBody: 'Je administratie via je eigen login, antwoorden met onderbouwing, boekingen alleen na akkoord.',
    },
    en: {
      metaTitle: 'What MCP is, and why it matters for finance',
      metaDescription:
        'MCP (Model Context Protocol) is the open standard that gives AI assistants safe access to systems like Exact Online. How it works, and why for finance it makes the difference between a chatbot and a verifiable answer.',
      crumbCurrent: 'MCP',
      cat: 'AI',
      tag: 'Explainer',
      date: '2 August 2026',
      title: 'What MCP is, and why it matters for finance',
      lead:
        'Every vendor is currently building “AI into the product”. Convenient, but it produces ten separate chatbots that don’t know each other and each see their own slice of your data. MCP turns that around: one open standard through which your AI assistant can safely reach your systems.',
      hero: { src: '/kennisbank/mcp-voor-finance-en.png', alt: 'Diagram of Claire as MCP connector: ChatGPT, Gemini, Claude and Copilot talk directly to Exact Online through Claire' },
      blocks: [
        {
          type: 'p',
          text: 'MCP stands for Model Context Protocol, an open standard introduced by Anthropic in late 2024 and now broadly adopted. It describes how an AI assistant may use a system’s tools: which actions exist, which data they involve and how access is arranged. What USB-C is for devices, MCP is for AI assistants: one plug instead of a custom cable for every combination.',
        },
        { type: 'h2', id: 'how-it-works', text: 'How it works' },
        {
          type: 'p',
          text: 'A system, say your accounting package, offers an MCP server: a list of well-defined tools such as “fetch the trial balance” or “show this customer’s outstanding items”. Per question the assistant picks the tool it needs, calls it and phrases the answer based on what comes back. You sign in with your existing account, so the assistant sees exactly what you are allowed to see, nothing more.',
        },
        {
          type: 'p',
          text: 'Crucially, the model does not get a copy of your database. Every question triggers a targeted query in the administration itself, at the moment you ask it. There is no data dump living its own life somewhere else.',
        },
        {
          type: 'quote',
          text: '"The AI assistant does not get an export of your administration, it gets a doorbell. Every question passes through your authorisation, and the figures stay where they are."',
        },
        { type: 'h2', id: 'finance', text: 'Why this matters for finance' },
        {
          type: 'p',
          text: 'For a marketing text it hardly matters where an answer comes from. For a balance sheet position it does. Three properties of MCP make the difference between a chatbot and a verifiable answer:',
        },
        {
          type: 'ol',
          items: [
            { strong: 'Answers come from the administration, not from the model.', rest: ' The language model phrases; the figures are fetched per question through a tool. That makes it traceable which query underlies an answer, and that is exactly what a controller wants to be able to verify.' },
            { strong: 'Authorisation stays where it belongs.', rest: ' Access runs through your existing login and permissions. No separate copy, no shared export folder, no service account with overly broad rights.' },
            { strong: 'You are not tied to one assistant.', rest: ' Because MCP is an open standard, the same connection works in Claude, in other MCP clients and in your own agents. The investment is in the connection to your administration, not in one vendor’s chatbot.' },
          ],
        },
        { type: 'h2', id: 'in-practice', text: 'What this looks like in practice' },
        {
          type: 'p',
          text: 'We developed an MCP server for Exact Online, with reporting tools for the trial balance, the profit and loss statement and ageing analyses, among others. The number-crunching happens in a deterministic calculation layer; the language model only phrases the answer. The same administration gives the same outcome, no matter who asks.',
        },
        {
          type: 'p',
          text: 'Claire uses that server: questions in plain language, fixed close checks, and postings only after your explicit approval. MCP is not a marketing term here but the foundation: it is the reason Claire can work inside your own administration rather than in a copy of it.',
        },
        {
          type: 'p',
          text: 'Claire itself runs in an environment we developed at DataFlowr, on our partners’ infrastructure and with language models from our supplier. What makes that controllable is how it is set up: no shadow copy of your administration is stored, every question is answered by querying Exact Online directly at that moment, changes always require manual confirmation, and everything is logged.',
        },
      ],
      claireTitle: 'Claire speaks MCP',
      claireBody: 'Your administration through your own login, answers with substantiation, postings only after approval.',
    },
  },


  'mcp-release': {
    author: 'janwillem',
    dateIso: '2026-08-07',
    nl: {
      metaTitle: 'Wat er nieuw is in de nieuwe release van onze MCP-koppeling',
      metaDescription:
        'Dezelfde koppeling met Exact Online, een stuk slimmer: een agent die de maandafsluiting draait, een onderbouwde cashflowprognose, een vernieuwde chat met interactieve overzichten, en per administratie instellen welke controles gelden.',
      crumbCurrent: 'MCP-release',
      cat: 'AI',
      tag: 'Release',
      date: '7 augustus 2026',
      title: 'Wat er nieuw is in de nieuwe release van onze MCP-koppeling',
      lead:
        'We rollen een flink vernieuwde versie uit van de koppeling die je AI-assistent met Exact Online verbindt. Het is dezelfde koppeling, maar een stuk slimmer: je kunt nu vragen om de maand af te sluiten, en er komt een rapport terug dat je regel voor regel afvinkt.',
      hero: {
        src: '/kennisbank/mcp-release-close-nl.png',
        alt: 'Het afsluitrapport in de agentwerkruimte van Claire: afsluitgereedheid “Sluit met voorbehoud”, nul blokkades, drie aandachtspunten en per bevinding een knop om te accepteren of af te wijzen',
      },
      blocks: [
        {
          type: 'p',
          text: 'Wat hetzelfde blijft, is de basis: je werkt in je eigen administratie, via je eigen toegang, en er wordt niets geboekt zonder je akkoord. Wat verandert, is wat de koppeling zelf al voor je doet voordat je zelf begint te kijken.',
        },
        { type: 'h2', id: 'afsluiting', text: 'De maandafsluiting als opdracht' },
        {
          type: 'p',
          text: 'De grootste toevoeging is een afsluitagent. Je vraagt je assistent om de maand af te sluiten, en er draait automatisch een reeks controles: sluit de beginbalans aan op het vorige jaar, staan de tussenrekeningen op nul, sluiten de subadministraties van debiteuren en crediteuren aan op het grootboek, kloppen de bank- en kassaldi, dragen alle boekingen een btw-code, en zijn de afschrijvingen verwerkt.',
        },
        {
          type: 'p',
          text: 'Het resultaat is geen lap tekst maar een rapport, zoals je hierboven ziet. Bovenaan staat het oordeel: gereed, met voorbehoud, of nog niet gereed, en waarom. Daaronder staan de bevindingen op ernst gesorteerd, elk met de concrete post erbij: welk bedrag, op welke rekening, per wanneer. Per bevinding accepteer je hem of wijs je hem af, en wat je hebt afgehandeld verdwijnt uit de openstaande lijst.',
        },
        {
          type: 'quote',
          text: '"Het verschil met een checklist is dat de controles al gedraaid hebben tegen de tijd dat je kijkt. Je beoordeelt de uitzonderingen in plaats van ze eerst te zoeken."',
        },
        { type: 'h2', id: 'prognose', text: 'Een onderbouwde cashflowprognose' },
        {
          type: 'p',
          text: 'Daarnaast is er een prognoseagent voor de liquiditeit. Die bouwt de prognose op uit wat er in de administratie staat: de openstaande debiteuren en crediteuren met hun vervaldatums, het feitelijke betaalgedrag uit de historie, en je budget in Exact voor de perioden die nog moeten komen.',
        },
        {
          type: 'p',
          text: 'De uitkomst is niet één lijn maar een bandbreedte, gemeten aan hoe goed dezelfde methode het in het verleden op je eigen cijfers deed. Zo zie je niet alleen wat de verwachting is, maar ook hoe hard die verwachting is. De berekening loopt in de achtergrond door, dus je kunt ondertussen gewoon verder werken.',
        },
        { type: 'h2', id: 'chat', text: 'Een vernieuwde chat' },
        {
          type: 'p',
          text: 'Antwoorden komen nu live binnen, met de overzichten erbij in plaats van eronder. Een financieel rapport verschijnt als uitklapbare tabel, een ouderdomsanalyse als staafjes per bucket, KPI’s als kaarten, en het afsluitrapport als het overzicht hierboven. Je klapt een regel open om de onderliggende posten te zien of zoomt door naar de grootboekrekeningen, zonder de vraag opnieuw te stellen.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-app-view-nl.png',
          alt: 'Een uitklapbare resultatenrekening in de chat, met de kolommen jan–jul 2026, jan–jul 2025 en het verschil per regel',
          caption:
            'De resultatenrekening als uitklapbaar overzicht, met vergelijking op vorig jaar en het verschil per regel.',
        },
        {
          type: 'ol',
          items: [
            { strong: 'Spraak in en uit.', rest: ' Je vraag inspreken en het antwoord laten voorlezen, handig als je met iets anders bezig bent.' },
            { strong: 'Bestanden erbij slepen.', rest: ' Een bankafschrift of een spreadsheet in het gesprek zetten en er meteen vragen over stellen.' },
            { strong: 'Grip op het gesprek.', rest: ' Een lopend antwoord stoppen, je vraag aanpassen en opnieuw sturen, of hetzelfde antwoord opnieuw laten opstellen.' },
            { strong: 'Doorzoekbare geschiedenis.', rest: ' Gesprekken krijgen automatisch een titel en zijn gegroepeerd op datum, dus je vindt terug wat je vorige maand vroeg.' },
          ],
        },
        { type: 'h2', id: 'rapportage', text: 'Rapportages die de vergelijking maken die je nodig hebt' },
        {
          type: 'p',
          text: 'De rapportages zijn uitgebreid met de vergelijkingen waar in de praktijk om gevraagd wordt. Je kunt de realisatie afzetten tegen het budget van dit jaar in plaats van alleen tegen vorig jaar. Je kunt een voortschrijdend jaar opvragen, de twaalf perioden tot en met de gekozen periode. Dat is de rollende reeks die een directieverslag wil.',
        },
        {
          type: 'p',
          text: 'En je kunt een rolling forecast opvragen: de afgesloten perioden zijn realisatie, de rest van het boekjaar wordt met het budget opgevuld, zodat je een volledig jaarbeeld hebt. Periode en cumulatief staan daarbij naast elkaar in één rapport, met actueel, vergelijking en verschil voor zowel de maand als het jaar tot dan toe.',
        },
        { type: 'h2', id: 'controle', text: 'Meer te bepalen per verbinding' },
        {
          type: 'p',
          text: 'Je stelt nu per verbinding in welke tools aanstaan. Werkt je team alleen met rapportage en de afsluiting, dan zet je de rest uit. Voor je assistent bestaan die dan simpelweg niet, en de keuze wordt korter en scherper.',
        },
        {
          type: 'p',
          text: 'Hetzelfde geldt voor de afsluitcontroles zelf. Onder “Afsluitsignalen” staat de volledige lijst controles met hun uitleg, en zet je per administratie aan welke gelden en hoe zwaar ze wegen: blokkerend, ter beoordeling of louter informatief. Wat bij de ene BV een blokkade is, is bij de andere een aandachtspunt.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-signals-nl.png',
          alt: 'De pagina Afsluitsignalen met de lijst afsluitcontroles, elk met uitleg, een ernstniveau en een schakelaar om hem aan of uit te zetten',
          caption:
            'Afsluitsignalen: per administratie instellen welke controles meedoen en hoe zwaar ze wegen.',
        },
        { type: 'h2', id: 'clients', text: 'Je assistent naar keuze, via één adres' },
        {
          type: 'p',
          text: 'De koppeling heeft nu één adres, ongeacht welke assistent je gebruikt en hoeveel administraties je hebt. Welke administratie erachter zit, wordt bij het koppelen bepaald: heb je er één, dan is er niets te kiezen; heb je er meer, dan krijg je de vraag welke het moet worden. En je kunt een assistent later op een andere administratie zetten.',
        },
        {
          type: 'p',
          text: 'Op de verbindingspagina staat per client een uitgewerkte route: Claude, ChatGPT en Codex, Microsoft 365 Copilot, en voor automatiseringen Make en Zapier. Die routes verschillen echt van elkaar: Microsoft 365 Copilot kan bijvoorbeeld geen koppeling op adres toevoegen en krijgt daarom een kant-en-klaar pakket. Voor de drie assistenten zijn vermeldingen ingediend bij de marktplaatsen van hun leveranciers; zodra er één wordt goedgekeurd, verandert de kaart in één knop daarheen.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-nl.png',
          alt: 'De verbindingspagina met het adres van de koppeling en daaronder de setup-gids per client voor Claude, ChatGPT, Microsoft 365 Copilot, Make en Zapier',
          caption:
            'Eén adres, met daaronder per assistent de route die voor die assistent daadwerkelijk werkt.',
        },
        { type: 'h2', id: 'zicht', text: 'Zicht op wat er gebeurt' },
        {
          type: 'p',
          text: 'Het auditlog vermeldt nu welke assistent elke aanroep deed. Niet “er is een rapport opgehaald”, maar “Claude heeft om 07:41 een financieel rapport opgehaald voor Voorbeeld B.V.”. Het log is te filteren op type, module en tool, en te exporteren naar CSV, handig als je accountant wil zien wat er is opgevraagd.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-audit-nl.png',
          alt: 'Het auditlog van een verbinding met per regel het tijdstip, de tool, de administratie, de assistent die de aanroep deed, het type actie en de status',
          caption:
            'Per aanroep de tool, de administratie en de assistent die hem deed.',
        },
        {
          type: 'p',
          text: 'Er is ook een sessieoverzicht: welke assistenten op deze verbinding zijn ingelogd en wanneer voor het laatst, met per assistent een knop om de sessie te beëindigen. Iemand die de organisatie verlaat of een assistent die je niet meer gebruikt, zet je er zo weer af.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-sessions-nl.png',
          alt: 'Het sessieoverzicht van een verbinding met Claude, ChatGPT en Microsoft 365 Copilot, elk met een knop om de sessie te beëindigen',
          caption:
            'Welke assistenten zijn ingelogd, en één knop om er één af te sluiten.',
        },
        { type: 'h2', id: 'eromheen', text: 'Nieuw eromheen' },
        {
          type: 'p',
          text: 'Buiten de koppeling zelf zijn er twee dingen bijgekomen. Er is een iOS-app, zodat je onderweg een vraag kunt stellen of een afsluitronde kunt volgen. En de webomgeving heeft een vernieuwde interface: elke verbinding heeft nu een eigen pagina met overzicht, sessies, auditlog, tools, afsluitsignalen en planningen, in plaats van alles op één lijst.',
        },
        { type: 'h2', id: 'actie', text: 'Eén actie: opnieuw een account aanmaken' },
        {
          type: 'p',
          text: 'Er is één ding dat je zelf moet doen. We zijn overgestapt op een nieuw inlogsysteem, zodat we een eigen inlogscherm kunnen bouwen in plaats van dat van een ander te lenen. Daardoor moet je eenmalig opnieuw een account aanmaken.',
        },
        {
          type: 'p',
          text: 'Gebruik daarbij hetzelfde e-mailadres als voorheen. Dan staat alles er weer zoals je het achterliet: je verbindingen, je instellingen en je gespreksgeschiedenis. Je kunt meteen verder. Duurt een minuut.',
        },
        {
          type: 'p',
          text: 'Vragen over wat er is veranderd, of wil je dat we de afsluitcontroles samen met jou op je eigen administratie inrichten? Neem gerust contact op; we lopen het graag met je door.',
        },
      ],
      claireTitle: 'Claire draait op deze release',
      claireBody: 'De maandafsluiting als opdracht, een onderbouwde cashflowprognose en antwoorden met de overzichten erbij.',
    },
    en: {
      metaTitle: 'What’s new in the latest release of our MCP connector',
      metaDescription:
        'The same connection to Exact Online, considerably smarter: an agent that runs the month-end close, a substantiated cashflow forecast, a renewed chat with interactive overviews, and per-administration control over which checks apply.',
      crumbCurrent: 'MCP release',
      cat: 'AI',
      tag: 'Release',
      date: '7 August 2026',
      title: 'What’s new in the latest release of our MCP connector',
      lead:
        'We are rolling out a substantially renewed version of the connection between your AI assistant and Exact Online. It is the same connection, considerably smarter: you can now ask it to close the month, and a report comes back that you tick off line by line.',
      hero: {
        src: '/kennisbank/mcp-release-close-en.png',
        alt: 'The close report in Claire’s agent workspace: readiness “Close with caution”, zero blockers, three items to review, and an accept or dismiss button per finding',
      },
      blocks: [
        {
          type: 'p',
          text: 'What stays the same is the foundation: you work in your own administration, through your own access, and nothing is posted without your approval. What changes is how much the connection already does for you before you start looking yourself.',
        },
        { type: 'h2', id: 'close', text: 'The month-end close as an instruction' },
        {
          type: 'p',
          text: 'The biggest addition is a closing agent. You ask your assistant to close the month, and a series of checks runs automatically: does the opening balance tie to last year, are the suspense accounts at zero, do the receivables and payables sub-ledgers tie to the general ledger, do the bank and cash balances match, does every entry carry a VAT code, and has depreciation been posted.',
        },
        {
          type: 'p',
          text: 'The result is not a wall of text but a report, as shown above. At the top sits the verdict: ready, ready with caution, or not yet ready, and why. Below it the findings are sorted by severity, each with the concrete item attached: which amount, on which account, as at when. Per finding you accept it or dismiss it, and what you have handled drops out of the open list.',
        },
        {
          type: 'quote',
          text: '"The difference with a checklist is that the checks have already run by the time you look. You assess the exceptions instead of first having to find them."',
        },
        { type: 'h2', id: 'forecast', text: 'A substantiated cashflow forecast' },
        {
          type: 'p',
          text: 'There is also a forecasting agent for liquidity. It builds the forecast from what is in the administration: open receivables and payables with their due dates, actual payment behaviour from history, and your budget in Exact for the periods still to come.',
        },
        {
          type: 'p',
          text: 'The outcome is not a single line but a band, measured against how well the same method did on your own figures in the past. So you see not only what the expectation is, but how firm that expectation is. The calculation runs in the background, so you can carry on working meanwhile.',
        },
        { type: 'h2', id: 'chat', text: 'A renewed chat' },
        {
          type: 'p',
          text: 'Answers now arrive live, with the overviews alongside them rather than underneath. A financial report appears as an expandable table, an ageing analysis as bars per bucket, KPIs as cards, and the close report as the overview above. You expand a line to see what sits underneath it, or drill through to the GL accounts, without asking the question again.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-app-view-en.png',
          alt: 'An expandable profit and loss statement in the chat, with columns for Jan–Jul 2026, Jan–Jul 2025 and the variance per line',
          caption:
            'The P&L as an expandable overview, compared with last year and with the variance per line.',
        },
        {
          type: 'ol',
          items: [
            { strong: 'Voice in and out.', rest: ' Dictate your question and have the answer read back, handy when your hands are busy elsewhere.' },
            { strong: 'Drag files in.', rest: ' Drop a bank statement or a spreadsheet into the conversation and ask about it straight away.' },
            { strong: 'Control over the conversation.', rest: ' Stop an answer in progress, edit your question and resend it, or have the same answer regenerated.' },
            { strong: 'Searchable history.', rest: ' Conversations get a title automatically and are grouped by date, so you can find what you asked last month.' },
          ],
        },
        { type: 'h2', id: 'reporting', text: 'Reporting that makes the comparison you need' },
        {
          type: 'p',
          text: 'Reporting has gained the comparisons people actually ask for. You can set actuals against this year’s budget instead of only against last year. You can request a rolling year, the twelve periods through the period you name. That is the rolling series a management report wants.',
        },
        {
          type: 'p',
          text: 'And you can request a rolling forecast: the closed periods are actuals, the rest of the financial year is filled from the budget, so you have a full-year picture. Period and year-to-date sit side by side in one report, with actual, comparison and variance for both the month and the year so far.',
        },
        { type: 'h2', id: 'control', text: 'More to decide per connection' },
        {
          type: 'p',
          text: 'You now set per connection which tools are switched on. If your team only works with reporting and the close, you switch the rest off. For your assistant they then simply do not exist, and the choice gets shorter and sharper.',
        },
        {
          type: 'p',
          text: 'The same goes for the close checks themselves. Under “Closing signals” you find the full list of checks with their explanations, and you set per administration which ones apply and how heavily they weigh: blocking, for review, or purely informative. What is a blocker at one entity is a point of attention at another.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-signals-en.png',
          alt: 'The Closing signals page with the list of close checks, each with an explanation, a severity level and a switch to turn it on or off',
          caption:
            'Closing signals: set per administration which checks take part and how heavily they weigh.',
        },
        { type: 'h2', id: 'clients', text: 'The assistant of your choice, through one address' },
        {
          type: 'p',
          text: 'The connection now has one address, whichever assistant you use and however many administrations you have. Which administration sits behind it is decided when you connect: with one there is nothing to choose; with several you are asked which it should be. And you can point an assistant at a different administration later.',
        },
        {
          type: 'p',
          text: 'The connection page carries a worked-out route per client: Claude, ChatGPT and Codex, Microsoft 365 Copilot, and for automation Make and Zapier. Those routes genuinely differ: Microsoft 365 Copilot, for instance, cannot add a connection by address at all and therefore gets a ready-made package. Listings have been submitted to the three assistants’ vendor marketplaces; as soon as one is approved, that card turns into a single button to it.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-en.png',
          alt: 'The connection page with the connector’s address and, below it, the setup guide per client for Claude, ChatGPT, Microsoft 365 Copilot, Make and Zapier',
          caption:
            'One address, with the route that actually works for each assistant below it.',
        },
        { type: 'h2', id: 'visibility', text: 'Visibility into what happens' },
        {
          type: 'p',
          text: 'The audit log now names the assistant behind every call. Not “a report was fetched”, but “Claude fetched a financial report for Example Ltd at 07:41”. The log filters by type, module and tool, and exports to CSV, useful when your accountant wants to see what was queried.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-audit-en.png',
          alt: 'A connection’s audit log with the time, tool, administration, the assistant that made the call, the action type and the status per row',
          caption:
            'Per call the tool, the administration and the assistant that made it.',
        },
        {
          type: 'p',
          text: 'There is also a sessions overview: which assistants are signed in to this connection and when they last were, with a button per assistant to end the session. Someone leaving the organisation, or an assistant you no longer use, is taken off there.',
        },
        {
          type: 'figure',
          src: '/kennisbank/mcp-release-sessions-en.png',
          alt: 'A connection’s sessions overview with Claude, ChatGPT and Microsoft 365 Copilot, each with a button to end the session',
          caption:
            'Which assistants are signed in, and one button to end any of them.',
        },
        { type: 'h2', id: 'around-it', text: 'New around it' },
        {
          type: 'p',
          text: 'Two things have appeared outside the connection itself. There is an iOS app, so you can ask a question or follow a close run while out of the office. And the web environment has a renewed interface: every connection now has its own page with overview, sessions, audit log, tools, closing signals and schedules, instead of everything on one list.',
        },
        { type: 'h2', id: 'action', text: 'One action: create your account again' },
        {
          type: 'p',
          text: 'There is one thing you need to do yourself. We have moved to a new sign-in system, so that we can build our own sign-in screen rather than borrowing someone else’s. Because of that, you need to create your account once more.',
        },
        {
          type: 'p',
          text: 'Use the same email address as before. Everything will then be there exactly as you left it: your connections, your settings and your conversation history. You can carry straight on. It takes a minute.',
        },
        {
          type: 'p',
          text: 'Questions about what has changed, or would you like us to set the close checks up with you on your own administration? Do get in touch; we are happy to walk through it with you.',
        },
      ],
      claireTitle: 'Claire runs on this release',
      claireBody: 'The month-end close as an instruction, a substantiated cashflow forecast, and answers with the overviews alongside them.',
    },
  },

  aandeelhoudersrapportage: {
    author: 'daan',
    dateIso: '2026-08-15',
    nl: {
      metaTitle: 'Van vraag tot aandeelhoudersrapportage met Claude en Exact Online',
      metaDescription:
        'Eén vraag in Claude en de winst- en verliesrekening, de KPI’s en een analyse komen rechtstreeks uit Exact Online, met een aandeelhoudersrapportage in huisstijl als sluitstuk. Met video: zo werkt de MCP-koppeling in de praktijk.',
      crumbCurrent: 'Aandeelhoudersrapportage',
      cat: 'AI',
      tag: 'Use case',
      date: '15 augustus 2026',
      title: 'Van vraag tot aandeelhoudersrapportage: Claude op je Exact Online administratie',
      lead:
        'De cijfers zijn klaar, en dan begint het eigenlijke werk pas: diezelfde cijfers omzetten in een verhaal dat aandeelhouders kunnen lezen. In de video hieronder doet Claude dat werk, van de eerste vraag tot een presentatie in huisstijl, rechtstreeks op een Exact Online administratie.',
      hero: {
        src: '/kennisbank/claude-exact-demo-video.jpg',
        alt: 'Openingsbeeld van de demovideo: jouw eigen Claude in Exact Online, zonder export en zonder Excel, met een grafiek van netto-omzet, brutomarge en EBITDA',
        width: 1280,
        height: 720,
      },
      heroVideo: {
        embedUrl: 'https://www.youtube-nocookie.com/embed/8u5pG68nPs0',
        title: 'Videodemo: van vraag tot aandeelhoudersrapportage met Claude en Exact Online',
      },
      blocks: [
        {
          type: 'p',
          text: 'De demo draait op onze eigen demo-administratie en begint met één zin: laat de winst- en verliesrekening van dit jaar zien, met een analyse erbij. Geen export, geen draaitabel, geen sjabloon dat eerst gevuld moet worden. Wat er in de minuten daarna gebeurt, is precies waar de MCP-koppeling voor is gebouwd, en het loont om er stap voor stap doorheen te lopen.',
        },
        { type: 'h2', id: 'toegang', text: 'Hoe Claude bij je cijfers komt' },
        {
          type: 'p',
          text: 'Claude zoekt eerst uit welke administratie je bedoelt. Aan de verbinding in de video hangt er één, dus die is snel gevonden; hangen er meer aan je account, dan vraagt hij welke het moet zijn. Daarna volgt de vraag of hij in de administratie mag kijken. Eén klik op toestaan, en de winst- en verliesrekening staat in het gesprek: de afgelopen periode en het jaar tot en met nu, en op de vervolgvraag dezelfde cijfers per maand.',
        },
        {
          type: 'p',
          text: 'Onder water kiest Claude per vraag een tool van de koppeling: het financiële rapport, de KPI-set, een ouderdomsanalyse. Het rekenwerk gebeurt in een deterministische rekenlaag, dus dezelfde administratie geeft dezelfde uitkomst, hoe vaak je ook vraagt. Het taalmodel formuleert alleen het antwoord; de cijfers komen rechtstreeks uit Exact Online.',
        },
        {
          type: 'p',
          text: 'Er verhuist daarbij geen kopie van je administratie naar het model. Elke vraag is een gerichte opvraging op het moment dat je hem stelt, via je eigen toegang, en elke aanroep staat in het auditlog. Hoe dat protocol werkt hebben we eerder in de kennisbank uitgelegd, in het stuk over MCP.',
        },
        {
          type: 'quote',
          text: '"Je rapporteert niet over een export van vorige week, maar over de administratie zoals die er nu bij staat. En elke vervolgvraag begint waar de vorige ophield."',
        },
        { type: 'h2', id: 'analyse', text: 'De analyse die er meteen achteraan komt' },
        {
          type: 'p',
          text: 'Cijfers ophalen is de helft. De prompt in de video vraagt ook om een analyse, en daar wordt het interessant: Claude kijkt naar de hele reeks en benoemt wat eruit springt. Groeit de omzet hard terwijl de kostprijs in absolute zin daalt, dan constateert hij dat die twee niet bij elkaar passen en dat je wilt weten waarom. Leunt de omzet zwaar op een handvol klanten, dan benoemt hij dat concentratierisico. In een demo-administratie is dat onschuldig; in een echte wil je het weten voordat je aandeelhouders het vragen.',
        },
        {
          type: 'p',
          text: 'Dat zijn richtingen, geen oordelen: plekken waar jij als eerste kijkt. Het beoordelen blijft bij jou, en omdat elke bevinding op een concrete opvraging rust, kun je hem narekenen. Het verschil met een dashboard zit in het doorvragen: waarom wijkt maart af, welke boekingen zitten erachter, hoe zag dezelfde maand er vorig jaar uit. Elk antwoord is een nieuwe gerichte opvraging, geen nieuwe export.',
        },
        { type: 'h2', id: 'rapportage', text: 'Van cijfers naar aandeelhoudersrapportage' },
        {
          type: 'p',
          text: 'Dan de stap waar in een maandcyclus de meeste tijd in zit: van de cijfers een stuk maken dat aandeelhouders kunnen lezen. In de video is dat één opdracht, met een logo als bijlage. Het resultaat is een complete presentatie: omzet en resultaat, de maandreeks in grafieken, tabellen met de kerncijfers en per onderwerp een korte toelichting.',
        },
        {
          type: 'ol',
          items: [
            { strong: 'De opdracht is één zin.', rest: ' “Maak hier een presentatie van voor onze aandeelhouders, in onze huisstijl.” Het meegestuurde logo is genoeg om de kleuren en letters over te nemen.' },
            { strong: 'De inhoud komt uit het gesprek.', rest: ' Claude bouwt de slides op uit de cijfers en de analyse die hij net heeft opgehaald, en neemt context mee die eerder ter sprake kwam. In de demo rekent hij uit zichzelf een normalisatie voor het gebruikelijk loon van de twee DGA’s door, omdat hij weet dat die er zijn.' },
            { strong: 'Het resultaat is een gewoon PowerPoint-bestand.', rest: ' Je opent het, past zelf een slide aan of vraagt Claude om de wijziging, en verstuurt het daarna zoals elke andere rapportage.' },
          ],
        },
        { type: 'h2', id: 'grenzen', text: 'Wat dit wel en niet is' },
        {
          type: 'p',
          text: 'De presentatie is een concept, geen persklaar stuk. De cijfers erin komen rechtstreeks uit de administratie, maar de duiding komt van een taalmodel, dus je leest het geheel na voordat het naar aandeelhouders gaat. Behandel het als het werk van een goede assistent: het staat er, jij tekent ervoor.',
        },
        {
          type: 'p',
          text: 'De hele demo is lezen, geen schrijven: er verandert niets in Exact Online, en wijzigingen via de koppeling vragen altijd een handmatig akkoord. De video draait bovendien op een demo-administratie, dus de bedragen zijn niet echt; de route van vraag naar rapportage is wel precies hoe het op een echte administratie werkt.',
        },
        {
          type: 'p',
          text: 'De koppeling zelf is niet aan Claude gebonden: dezelfde verbinding werkt in ChatGPT en Microsoft 365 Copilot, omdat MCP een open standaard is. De presentatiestap uit de video leunt wel op wat Claude zelf kan, bestanden maken en een huisstijl overnemen. De cijferkant loopt bij elke assistent via dezelfde koppeling.',
        },
        { type: 'h2', id: 'zelf-proberen', text: 'Zelf proberen' },
        {
          type: 'p',
          text: 'De verbinding leg je in een paar minuten: één adres, inloggen met je Exact Online account, administratie kiezen. Begin daarna met de vraag uit de video, de winst- en verliesrekening van dit jaar met een analyse erbij, en kijk wat er bij jouw cijfers uit komt. De aandeelhoudersrapportage die erop volgt is nog één opdracht.',
        },
      ],
      claireTitle: 'Dezelfde koppeling, met Claire erbij',
      claireBody: 'Claire draait op de koppeling uit de video: vragen in gewone taal, rapportages uit je eigen administratie, boekingen alleen na akkoord.',
    },
    en: {
      metaTitle: 'From question to shareholder report with Claude and Exact Online',
      metaDescription:
        'One question in Claude and the profit and loss statement, the KPIs and an analysis come straight from Exact Online, with a shareholder deck in your house style to finish. With video: the MCP connection at work.',
      crumbCurrent: 'Shareholder report',
      cat: 'AI',
      tag: 'Use case',
      date: '15 August 2026',
      title: 'From question to shareholder report: Claude on your Exact Online administration',
      lead:
        'The figures are done, and then the real work starts: turning those same figures into a story shareholders can read. In the video below Claude does that work, from the first question to a deck in your house style, directly on an Exact Online administration.',
      hero: {
        src: '/kennisbank/claude-exact-demo-video.jpg',
        alt: 'Opening frame of the demo video: your own Claude in Exact Online, without exports and without Excel, with a chart of net revenue, gross margin and EBITDA',
        width: 1280,
        height: 720,
      },
      heroVideo: {
        embedUrl: 'https://www.youtube-nocookie.com/embed/8u5pG68nPs0',
        title: 'Video demo (in Dutch): from question to shareholder report with Claude and Exact Online',
      },
      blocks: [
        {
          type: 'p',
          text: 'The demo, recorded in Dutch, runs on our own demo administration and starts with one sentence: show this year’s profit and loss statement, with an analysis. No export, no pivot table, no template that needs filling first. What happens in the minutes after that is exactly what the MCP connection was built for, and it is worth walking through step by step.',
        },
        { type: 'h2', id: 'access', text: 'How Claude reaches your figures' },
        {
          type: 'p',
          text: 'Claude first works out which administration you mean. The connection in the video has one behind it, so it is found quickly; with several on your account, it asks which one it should be. Then comes the question whether it may look inside the administration. One click on allow, and the profit and loss statement appears in the conversation: the most recent period and the year to date, and on the follow-up question the same figures per month.',
        },
        {
          type: 'p',
          text: 'Under the hood Claude picks a tool from the connection per question: the financial report, the KPI set, an ageing analysis. The number-crunching happens in a deterministic calculation layer, so the same administration gives the same outcome, however often you ask. The language model only phrases the answer; the figures come straight from Exact Online.',
        },
        {
          type: 'p',
          text: 'No copy of your administration moves to the model along the way. Every question is a targeted query at the moment you ask it, through your own access, and every call lands in the audit log. How that protocol works we explained earlier in the knowledge base, in the piece on MCP.',
        },
        {
          type: 'quote',
          text: '"You are not reporting on last week’s export, but on the administration as it stands right now. And every follow-up question starts where the previous one left off."',
        },
        { type: 'h2', id: 'analysis', text: 'The analysis that follows straight after' },
        {
          type: 'p',
          text: 'Fetching figures is half of it. The prompt in the video also asks for an analysis, and that is where it gets interesting: Claude looks at the whole series and names what stands out. If revenue grows fast while the cost of sales falls in absolute terms, it points out that those two do not fit together and that you want to know why. If revenue leans heavily on a handful of customers, it names that concentration risk. In a demo administration that is harmless; in a real one you want to know before your shareholders ask.',
        },
        {
          type: 'p',
          text: 'Those are directions, not verdicts: the places where you look first. The judgement stays with you, and because every finding rests on a concrete query, you can recompute it. The difference with a dashboard is the follow-up: why does March deviate, which entries sit behind it, what did the same month look like last year. Every answer is a new targeted query, not a new export.',
        },
        { type: 'h2', id: 'report', text: 'From figures to shareholder report' },
        {
          type: 'p',
          text: 'Then the step that takes the most time in a monthly cycle: turning the figures into a piece shareholders can read. In the video that is one instruction, with a logo attached. The result is a complete deck: revenue and result, the monthly series in charts, tables with the key figures and a short explanation per topic.',
        },
        {
          type: 'ol',
          items: [
            { strong: 'The instruction is one sentence.', rest: ' “Turn this into a presentation for our shareholders, in our house style.” The attached logo is enough to carry over the colours and typefaces.' },
            { strong: 'The content comes from the conversation.', rest: ' Claude builds the slides from the figures and the analysis it just fetched, and carries along context that came up earlier. In the demo it works out a normalisation for the Dutch customary salary of the two director-shareholders on its own, because it knows they are there.' },
            { strong: 'The result is an ordinary PowerPoint file.', rest: ' You open it, adjust a slide yourself or ask Claude for the change, and send it out like any other report.' },
          ],
        },
        { type: 'h2', id: 'limits', text: 'What this is and is not' },
        {
          type: 'p',
          text: 'The deck is a draft, not a print-ready piece. The figures in it come straight from the administration, but the interpretation comes from a language model, so you read the whole thing before it goes to shareholders. Treat it as the work of a good assistant: it is on paper, you sign for it.',
        },
        {
          type: 'p',
          text: 'The entire demo is reading, not writing: nothing changes in Exact Online, and changes through the connection always require manual approval. The video also runs on a demo administration, so the amounts are not real; the route from question to report is exactly how it works on a real one.',
        },
        {
          type: 'p',
          text: 'The connection itself is not tied to Claude: the same connection works in ChatGPT and Microsoft 365 Copilot, because MCP is an open standard. The presentation step in the video does lean on what Claude itself can do, creating files and adopting a house style. The figures side runs through the same connection with every assistant.',
        },
        { type: 'h2', id: 'try-it', text: 'Try it yourself' },
        {
          type: 'p',
          text: 'Connecting takes a few minutes: one address, sign in with your Exact Online account, pick the administration. Then start with the question from the video, this year’s profit and loss statement with an analysis, and see what comes out of your own figures. The shareholder report that follows is one more instruction.',
        },
      ],
      claireTitle: 'The same connection, with Claire on top',
      claireBody: 'Claire runs on the connection from the video: questions in plain language, reports from your own administration, postings only after approval.',
    },
  },

  'copilot-facturen': {
    author: 'daan',
    dateIso: '2026-08-20',
    nl: {
      metaTitle: 'Facturen maken tijdens de meeting, met Copilot in Teams',
      metaDescription:
        'Videodemo: Microsoft 365 Copilot maakt vanuit Teams een verkoopfactuur aan in Exact Online, via de MCP-koppeling van DataFlowr. Wat Copilot daarbij precies doet, hoe de bevestigingsstappen werken en waar de grenzen liggen.',
      crumbCurrent: 'Copilot in Teams',
      cat: 'AI',
      tag: 'Use case',
      date: '20 augustus 2026',
      title: 'Facturen maken tijdens de meeting, met Copilot in Teams',
      lead:
        'De afspraak is rond: 40 uur consultancy voor € 100 per uur. Normaal schrijf je dat op en maakt iemand er later in de week een factuur van. In deze demo staat de conceptfactuur al in Exact Online voordat de meeting is afgelopen, gemaakt vanuit een chat in Microsoft Teams.',
      hero: {
        src: '/kennisbank/copilot-facturen.jpg',
        alt: 'Openingsbeeld van de videodemo “Factuur in Exact vanuit Teams”: de prompt voor Meijer Logistiek BV in het Copilot-scherm van Microsoft Teams',
        width: 1280,
        height: 720,
      },
      heroVideo: {
        embedUrl: 'https://www.youtube-nocookie.com/embed/F58aaGdGB_s',
        title: 'Videodemo: een verkoopfactuur aanmaken in Exact Online vanuit Microsoft Teams',
      },
      blocks: [
        {
          type: 'p',
          text: 'De video hierboven laat de volledige route zien: van een prompt in het Copilot-scherm van Microsoft Teams tot een conceptfactuur in Exact Online, met artikelregel, contactpersoon en btw erop. Er komt geen export en geen overtypwerk aan te pas. Exact zelf gaat pas open aan het einde, om te controleren of alles klopt.',
        },
        { type: 'h2', id: 'demo', text: 'Wat er in de demo gebeurt' },
        {
          type: 'p',
          text: 'Het scenario is een gesprek zoals je dat elke week voert. Meijer Logistiek BV neemt 40 uur consultancy af voor € 100 per uur. De contactpersoon is Willem van der Laan, zijn telefoonnummer staat in de prompt, en de relatie bestaat nog niet in de administratie. Die ene prompt is genoeg om het proces te starten.',
        },
        {
          type: 'ol',
          items: [
            { strong: 'De agent controleert eerst wat er al bestaat.', rest: ' Voordat er iets wordt aangemaakt, zoekt de koppeling in de administratie of de relatie en de contactpersoon al voorkomen en of ze aan elkaar gekoppeld zijn. Wat er al staat wordt hergebruikt; bij een bestaande klant slaat de agent het aanmaken gewoon over.' },
            { strong: 'Elke schrijfactie vraagt om jouw bevestiging.', rest: ' Copilot toont per actie een kaart met wat er precies gaat gebeuren, en jij klikt op Confirm. De contactpersoon, de relatie en de factuur: geen van de drie ontstaat zonder akkoord.' },
            { strong: 'De factuur staat als concept klaar.', rest: ' Meijer Logistiek, 40 uur consultancy à € 100, met het artikel gekoppeld: € 4.840 inclusief 21% btw. Een factuurnummer is er nog niet; dat wordt pas toegekend als jij de factuur in Exact Online verwerkt en verstuurt.' },
          ],
        },
        {
          type: 'p',
          text: 'De demo is bewust niet gladgestreken. Halverwege meldt de agent dat hij de relatie niet kan vinden, direct nadat die is aangemaakt. Eén vervolgprompt, “controleer of Meijer Logistiek BV als klant bestaat”, en hij pakt de draad weer op: klant gevonden, contactpersoon gekoppeld, factuur aangemaakt. Zo ziet werken met een agent er in de praktijk uit: hij doet het werk, jij stuurt bij waar nodig.',
        },
        {
          type: 'quote',
          text: '"De factuur ontstaat waar de afspraak ontstaat. Wat overblijft voor later is niet het invoerwerk, maar alleen de controle en de verzendknop."',
        },
        { type: 'h2', id: 'copilot', text: 'Wat Microsoft 365 Copilot hier doet' },
        {
          type: 'p',
          text: 'Copilot is in deze opzet meer dan een chatvenster: het is de omgeving waarin agents draaien. De DataFlowr-agent is er daar één van. Je opent hem in het Copilot-scherm van Teams, naast je chats en je agenda, en dat is precies het punt: het werk gebeurt in de applicatie waar de afspraak wordt gemaakt, niet in het pakket waar de factuur landt.',
        },
        {
          type: 'p',
          text: 'Copilot doet daarbij drie dingen zelf. Het vertaalt je zin naar concrete acties op de koppeling, in een logische volgorde: eerst zoeken, dan aanmaken, dan koppelen. Het bewaakt de schrijfacties met een bevestigingsstap, zodat een agent nooit ongevraagd iets in je administratie zet. En het houdt de context van het gesprek vast: “koppel de contactpersoon aan deze klant” is genoeg, zonder opnieuw te benoemen om wie het gaat.',
        },
        { type: 'h2', id: 'mcp', text: 'De rol van MCP' },
        {
          type: 'p',
          text: 'Onder de motorkap praat Copilot met onze MCP-server voor Exact Online. MCP, het Model Context Protocol, is de open standaard die beschrijft welk gereedschap een AI-assistent op een systeem mag gebruiken. Voor deze demo zijn dat tools als relaties zoeken, een contactpersoon aanmaken en een conceptfactuur wegschrijven. De assistent kiest per stap een tool, en de gegevens komen op dat moment rechtstreeks uit je eigen administratie. Er staat geen kopie van je boekhouding tussen.',
        },
        {
          type: 'p',
          text: 'De toegang loopt via je eigen Exact Online-login, dus de agent ziet precies wat jij mag zien. En omdat MCP een open standaard is, is Copilot een keuze en geen verplichting: dezelfde koppeling werkt in Claude en ChatGPT. Twee praktische kanttekeningen bij Microsoft: Copilot vraagt een eigen licentie bovenop Microsoft 365, en het kan geen koppeling op adres toevoegen. Daarom leveren we voor Copilot een kant-en-klaar pakket dat je beheerder eenmalig installeert.',
        },
        { type: 'h2', id: 'winst', text: 'Waar de winst zit' },
        {
          type: 'p',
          text: 'De winst zit niet in de paar minuten typwerk, maar in de stap die vervalt. Normaal reist zo’n afspraak van een aantekening naar een taak naar het boekhoudpakket, en bij elke overdracht kan er iets sneuvelen: het tarief, de tenaamstelling, de contactpersoon. Hier wordt de afspraak vastgelegd terwijl hij vers is. Wat later nog moet gebeuren is het concept controleren en versturen.',
        },
        {
          type: 'p',
          text: 'Even belangrijk is wat er niet gebeurt. De agent verstuurt niets en boekt niets definitief; de factuur wacht als concept op jouw controle. Elke aanmaakactie heb je expliciet bevestigd. En het resultaat is geen black box: aan het einde van de video zie je de factuur gewoon in Exact Online staan, met relatie, contactpersoon en artikel op de juiste plek.',
        },
        { type: 'h2', id: 'zelf', text: 'Zelf proberen' },
        {
          type: 'p',
          text: 'De route uit de video werkt op elke Exact Online-administratie met onze koppeling. De installatie voor Microsoft 365 Copilot staat stap voor stap in de documentatie, inclusief het pakket voor je beheerder, en de agent bevat voorbeeldprompts voor onder meer dit scenario. Liever eerst zien of dit bij jullie proces past? Plan een kennismaking, dan laten we de demo op een testadministratie zien.',
        },
      ],
      claireTitle: 'Dezelfde koppeling, ook zonder Teams',
      claireBody: 'Claire werkt op dezelfde MCP-koppeling: vragen in gewone taal, facturen en boekingen alleen na jouw akkoord.',
    },
    en: {
      metaTitle: 'Creating invoices during the meeting, with Copilot in Teams',
      metaDescription:
        'Video demo: Microsoft 365 Copilot creates a sales invoice in Exact Online straight from Teams, through DataFlowr’s MCP connector. What Copilot actually does, how the confirmation steps work and where the limits are.',
      crumbCurrent: 'Copilot in Teams',
      cat: 'AI',
      tag: 'Use case',
      date: '20 August 2026',
      title: 'Creating invoices during the meeting, with Copilot in Teams',
      lead:
        'The deal is done: 40 hours of consultancy at €100 per hour. Normally you write that down and someone turns it into an invoice later in the week. In this demo the draft invoice is in Exact Online before the meeting ends, created from a chat in Microsoft Teams.',
      hero: {
        src: '/kennisbank/copilot-facturen.jpg',
        alt: 'Opening frame of the video demo: the Copilot prompt for Meijer Logistiek BV in Microsoft Teams, under the Dutch title “Factuur in Exact vanuit Teams”',
        width: 1280,
        height: 720,
      },
      heroVideo: {
        embedUrl: 'https://www.youtube-nocookie.com/embed/F58aaGdGB_s',
        title: 'Video demo (in Dutch): creating a sales invoice in Exact Online from Microsoft Teams',
      },
      blocks: [
        {
          type: 'p',
          text: 'The video above shows the whole route: from a prompt in the Copilot pane of Microsoft Teams to a draft invoice in Exact Online, with the item line, the contact person and VAT in place. No export, no retyping. Exact itself only opens at the end, to check that everything is right. The demo is recorded in Dutch, but the flow is easy to follow.',
        },
        { type: 'h2', id: 'demo', text: 'What happens in the demo' },
        {
          type: 'p',
          text: 'The scenario is a conversation you have every week. Meijer Logistiek BV buys 40 hours of consultancy at €100 per hour. The contact person is Willem van der Laan, his phone number is in the prompt, and the customer does not exist in the administration yet. That single prompt is enough to start the process.',
        },
        {
          type: 'ol',
          items: [
            { strong: 'The agent first checks what already exists.', rest: ' Before anything is created, the connector searches the administration for the customer and the contact person, and whether they are linked. Whatever is already there gets reused; with an existing customer the agent simply skips the creating.' },
            { strong: 'Every write action asks for your confirmation.', rest: ' Per action Copilot shows a card with exactly what is about to happen, and you click Confirm. The contact person, the customer and the invoice: none of the three is created without approval.' },
            { strong: 'The invoice is ready as a draft.', rest: ' Meijer Logistiek, 40 hours of consultancy at €100, with the item linked: €4,840 including 21% VAT. There is no invoice number yet; that is only assigned once you process and send the invoice in Exact Online.' },
          ],
        },
        {
          type: 'p',
          text: 'The demo is deliberately not polished. Halfway through, the agent reports that it cannot find the customer, right after creating it. One follow-up prompt, “check whether Meijer Logistiek BV exists as a customer”, and it picks the thread back up: customer found, contact person linked, invoice created. That is what working with an agent looks like in practice: it does the work, you steer where needed.',
        },
        {
          type: 'quote',
          text: '"The invoice is created where the agreement is made. What remains for later is not the data entry, only the review and the send button."',
        },
        { type: 'h2', id: 'copilot', text: 'What Microsoft 365 Copilot does here' },
        {
          type: 'p',
          text: 'In this setup Copilot is more than a chat window: it is the environment agents run in. The DataFlowr agent is one of them. You open it in the Copilot pane of Teams, next to your chats and your calendar, and that is exactly the point: the work happens in the application where the agreement is made, not in the package where the invoice lands.',
        },
        {
          type: 'p',
          text: 'Copilot itself does three things here. It translates your sentence into concrete actions on the connector, in a sensible order: search first, then create, then link. It guards the write actions with a confirmation step, so an agent never puts anything in your administration unasked. And it holds on to the context of the conversation: “link the contact person to this customer” is enough, without naming again who it is about.',
        },
        { type: 'h2', id: 'mcp', text: 'The role of MCP' },
        {
          type: 'p',
          text: 'Under the hood Copilot talks to our MCP server for Exact Online. MCP, the Model Context Protocol, is the open standard that describes which tools an AI assistant may use on a system. For this demo those are tools like searching customers, creating a contact person and writing a draft invoice. The assistant picks a tool per step, and the data comes straight from your own administration at that moment. There is no copy of your books in between.',
        },
        {
          type: 'p',
          text: 'Access runs through your own Exact Online login, so the agent sees exactly what you are allowed to see. And because MCP is an open standard, Copilot is a choice, not an obligation: the same connector works in Claude and ChatGPT. Two practical notes on Microsoft: Copilot requires its own licence on top of Microsoft 365, and it cannot add a connection by address. That is why we provide a ready-made package for Copilot that your administrator installs once.',
        },
        { type: 'h2', id: 'gain', text: 'Where the gain is' },
        {
          type: 'p',
          text: 'The gain is not the few minutes of typing, but the step that disappears. Normally an agreement like this travels from a note to a task to the accounting package, and something can get lost at every handover: the rate, the company name, the contact person. Here the agreement is recorded while it is fresh. What remains for later is reviewing the draft and sending it.',
        },
        {
          type: 'p',
          text: 'Just as important is what does not happen. The agent sends nothing and posts nothing final; the invoice waits as a draft for your review. Every create action was explicitly confirmed by you. And the result is no black box: at the end of the video you see the invoice sitting in Exact Online, with the customer, the contact person and the item in the right place.',
        },
        { type: 'h2', id: 'try', text: 'Try it yourself' },
        {
          type: 'p',
          text: 'The route in the video works on any Exact Online administration with our connector. The setup for Microsoft 365 Copilot is documented step by step, including the package for your administrator, and the agent ships with example prompts for this scenario among others. Rather see first whether this fits your process? Book an intro call and we will run the demo on a test administration.',
        },
      ],
      claireTitle: 'The same connector, without Teams too',
      claireBody: 'Claire runs on the same MCP connector: questions in plain language, invoices and postings only after your approval.',
    },
  },
};


/**
 * Reading time, derived from the rendered text rather than authored per
 * article. The hand-written values had drifted badly: the flagship piece
 * was labelled the same as one three times its length. 200 words a minute
 * is the usual figure for prose read on screen, rounded up, floor of 1.
 */
const WORDS_PER_MINUTE = 200;

function blockWords(block: ArticleBlock): string {
  switch (block.type) {
    case 'p':
    case 'h2':
    case 'quote':
      return block.text;
    case 'ol':
      return block.items.map((item) => `${item.strong} ${item.rest}`).join(' ');
    case 'figure':
      return block.caption;
  }
}

export function readTime(content: ArticleContent, lang: Lang): string {
  const text = [content.lead, ...content.blocks.map(blockWords)].join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return lang === 'nl' ? `${minutes} min leestijd` : `${minutes} min read`;
}
