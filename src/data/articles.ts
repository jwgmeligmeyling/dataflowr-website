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
  | { type: 'ol'; items: { strong: string; rest: string }[] };

export interface ArticleContent {
  metaTitle: string;
  metaDescription: string;
  crumbCurrent: string;
  /** Category label, shown on the "more" cards. */
  cat: string;
  /** Chip above the title. */
  tag: string;
  date: string;
  readTime: string;
  title: string;
  lead: string;
  /** Hero screenshot (16:9, 2880×1620), captured from the Claire app. */
  hero: { src: string; alt: string };
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
      readTime: '8 min leestijd',
      title: 'Waarom de maandafsluiting nog een week kost, en wat er écht helpt',
      lead:
        'Dezelfde checklist, elke maand opnieuw: kloppen de openingsbalansen, zijn de tussenrekeningen leeg, sluiten de subadministraties aan? Belangrijk werk, maar grotendeels routine, en juist daar sluipt het erin.',
      hero: { src: '/kennisbank/maandafsluiting-nl.png', alt: 'Claire’s agentwerkruimte met een close-readiness rapport: controleresultaten en aanbevolen acties voor de maandafsluiting van juli' },
      blocks: [
        {
          type: 'p',
          text: 'Wat u niet ziet, of waar u niet aan toekomt, schuift door naar de volgende maand. Niet omdat uw team onzorgvuldig werkt, maar omdat de afsluiting bestaat uit tientallen kleine controles die allemaal met de hand langs dezelfde administratie gaan. Bij drukte valt de eerste controle weg. Bij vakantie de tweede.',
        },
        { type: 'h2', id: 'probleem', text: 'Het probleem is niet de hoeveelheid werk' },
        {
          type: 'p',
          text: 'Meer mensen aannemen lost dit zelden op: het werk is niet te veel, het werk is te handmatig. Elke vraag begint opnieuw met exports, draaitabellen en overtypwerk, en bij de volgende vraag begint hetzelfde proces van voren af aan. De cijfers bestaan al. Ze zijn alleen moeilijk bereikbaar.',
        },
        {
          type: 'quote',
          text: '"De afsluiting verschuift van zoekwerk naar beoordelingswerk. Uw team loopt niet meer elke tussenrekening na, maar beoordeelt een voorbereide lijst bevindingen."',
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
            { strong: 'Scheid signaleren van beoordelen.', rest: ' Laat een systeem opvallende posten naar boven halen, vraagposten, mogelijke dubbelen, afwijkende tegenrekeningen, en houd het oordeel bij uw controller.' },
            { strong: 'Leg het besluit vast, niet alleen de correctie.', rest: ' Wat is er onderzocht, wat kwam eruit en wat heeft u besloten? Die drie samen maken volgende maand licht werk.' },
          ],
        },
        { type: 'h2', id: 'praktijk', text: 'Hoe dat er in de praktijk uitziet' },
        {
          type: 'p',
          text: 'Een agent doorloopt op de eerste werkdag een vaste reeks afsluitcontroles, onderzoekt de afwijkingen die daaruit komen en levert een close-readiness rapport op: een helder overzicht van wat de afsluiting nog blokkeert, met bevindingen en concrete aanbevelingen. Uw controller begint niet met zoeken, maar met beoordelen, en niets wordt geboekt zonder akkoord.',
        },
        {
          type: 'p',
          text: 'Het rekenwerk gebeurt daarbij niet in het taalmodel, maar in een rekenlaag die deterministisch en herleidbaar is. Het taalmodel formuleert alleen het antwoord; de cijfers komen uit uw eigen administratie.',
        },
      ],
      claireTitle: 'Laat Claire de afsluiting voorbereiden',
      claireBody: 'Vaste controles, bevindingen met onderbouwing, correcties pas na uw akkoord.',
    },
    en: {
      metaTitle: 'Why the month-end close still takes a week, and what actually shortens it',
      metaDescription:
        'The month-end close consists of dozens of manual checks. Three interventions that measurably help: deterministic checks, separating flagging from judging, and recording decisions. A practical guide by DataFlowr.',
      crumbCurrent: 'Month-end close',
      cat: 'Finance',
      tag: 'Guide',
      date: '12 July 2026',
      readTime: '8 min read',
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
            { strong: 'Record the decision, not just the correction.', rest: ' What was investigated, what came out and what did you decide? Those three together make next month light work.' },
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
        'Uitbetalingen van een payment service provider sluiten zelden één-op-één aan op de omzet. Waarom dat in het model zit, en hoe u met settlement-rapporten en aparte stromen de aansluiting deterministisch maakt.',
      crumbCurrent: 'PSP-reconciliatie',
      cat: 'Integraties',
      tag: 'Praktijkgids',
      date: '26 juli 2026',
      readTime: '6 min leestijd',
      title: 'PSP-reconciliatie: waarom de bank nooit precies aansluit',
      lead:
        'Wie via een payment service provider ontvangt, kent het patroon: de omzet staat in de webshop of het kassasysteem, de uitbetaling staat op de bank, en daartussen zit een bedrag dat nooit precies klopt. Dat is geen slordigheid. Het zit in het model ingebakken.',
      hero: { src: '/kennisbank/psp-reconciliatie-nl.png', alt: 'Chatgesprek waarin Claire het verschil tussen de PSP-uitbetaling en de omzet verklaart met een aansluittabel van kosten, refunds en chargebacks' },
      blocks: [
        {
          type: 'p',
          text: 'Een PSP betaalt niet per transactie uit, maar in batches. Eén uitbetaling bundelt de transacties van een of meer dagen, netto na inhouding van de transactiekosten, en met refunds en chargebacks in dezelfde batch verrekend. Op de bank landt dus één bedrag dat de optelsom is van honderden transacties, minus kosten, minus terugbetalingen, plus correcties. Dat bedrag terugrekenen naar de omzet is precies het zoekwerk waar elke maand uren in verdwijnen.',
        },
        { type: 'h2', id: 'kruispost', text: 'Waarom de kruispost volloopt' },
        {
          type: 'p',
          text: 'De klassieke aanpak boekt de uitbetalingen op een tussenrekening en probeert die achteraf leeg te maken. Zolang alles klopt gaat dat goed, maar elke afwijking blijft staan: een chargeback zonder tegenboeking, een uitbetaling die over de maandgrens heen valt, kosten die net anders zijn dan verwacht. Aan het einde van het kwartaal staat er een saldo waarvan niemand meer weet waaruit het is opgebouwd, en dat uiteindelijk als “verschil” wordt weggeboekt.',
        },
        {
          type: 'quote',
          text: '"Het verschil tussen webshop en bank is geen afrondingsverschil. Het is de optelsom van kosten, refunds en timing, en wie die drie apart boekt, heeft niets meer te zoeken."',
        },
        { type: 'h2', id: 'drie-stromen', text: 'Drie stromen, drie boekingen' },
        {
          type: 'p',
          text: 'De aansluiting wordt pas deterministisch als u haar opbouwt vanuit de bron die alles specificeert, en de stromen die nu op één hoop liggen uit elkaar haalt:',
        },
        {
          type: 'ol',
          items: [
            { strong: 'Reconcilieer op het settlement-rapport, niet op het bankafschrift.', rest: ' Elke PSP levert per uitbetaling een rapport dat exact specificeert welke transacties, kosten en refunds erin zitten. Dat rapport is de brug tussen omzet en bank; het bankafschrift toont alleen de uitkomst.' },
            { strong: 'Boek kosten en refunds als aparte stromen.', rest: ' De transactiekosten naar de kostenrekening, refunds tegen de omzet. Wat overblijft sluit één-op-één aan op de uitbetaling, en verschillen krijgen een naam in plaats van een vergaarbak.' },
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
          text: 'Tijdens de maandafsluiting hoort daar een vaste controle bij: zijn de tussenrekeningen leeg, en zo niet, wat staat erop en waarom? Een agent die dat elke maand op dezelfde manier controleert en de restposten onderzoekt, maakt van de kruispost een controlepunt in plaats van een risico, en niets wordt geboekt zonder uw akkoord.',
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
      readTime: '6 min read',
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
          text: '"The gap between webshop and bank is not a rounding difference. It is the sum of fees, refunds and timing, and once you book those three separately, there is nothing left to search for."',
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
      metaTitle: 'Premium-features waar u voor betaalt maar niets mee doet',
      metaDescription:
        'Smart Closing, de Power BI Connector en de Premium-API’s zitten in uw Exact Online Premium-abonnement, maar blijven bij veel bedrijven ongebruikt. Wat ze doen en waar u begint.',
      crumbCurrent: 'Premium-features',
      cat: 'Exact Online',
      tag: 'Praktijkgids',
      date: '14 juni 2026',
      readTime: '5 min leestijd',
      title: 'Premium-features waar u voor betaalt maar niets mee doet',
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
          text: 'Smart Closing geeft per periode inzicht in de status van uw afsluiting: welke stappen zijn afgerond, welke staan open en waar zit een blokkade. Het vervangt de checklist die nu in Excel of in iemands hoofd zit, maar het werkt pas als de indicatoren zijn ingericht en periodes consequent worden afgesloten. Juist die inrichting blijft in de praktijk liggen.',
        },
        { type: 'h2', id: 'power-bi', text: 'De Power BI Connector' },
        {
          type: 'p',
          text: 'De Power BI Connector rapporteert rechtstreeks op de administratie, zonder maandelijkse exports. Het rapport dat nu elke maand uit downloads en draaitabellen wordt opgebouwd, kan één keer goed worden ingericht en ververst daarna zichzelf. De eenmalige investering in het datamodel betaalt zich elke maand terug in niet-gemaakt knipwerk.',
        },
        { type: 'h2', id: 'apis', text: 'De Premium-API’s' },
        {
          type: 'p',
          text: 'Het minst zichtbaar, maar het meest bepalend: de ruimere API-limieten en endpoints van Premium zijn de basis onder elke serieuze koppeling. Integraties met uw PSP of webshop, workflow-automatisering, een AI-assistent op de administratie: het loopt allemaal via deze API’s, en op een standaardabonnement loopt het er ook op stuk.',
        },
        {
          type: 'quote',
          text: '"U betaalt al voor het gereedschap. De vraag is niet of u het nodig heeft, maar waarom het nog in de kast ligt."',
        },
        { type: 'h2', id: 'begin', text: 'Waar u begint' },
        {
          type: 'ol',
          items: [
            { strong: 'Zet Smart Closing aan voor één administratie.', rest: ' Richt de indicatoren in voor de stappen die u nu op een checklist bijhoudt, en sluit er één maand mee af. Daarna weet u wat het oplevert.' },
            { strong: 'Vervang één rapport door de Power BI Connector.', rest: ' Het rapport dat nu maandelijks uit exports wordt opgebouwd is de beste kandidaat: bekende cijfers, bekende ontvangers, direct meetbare tijdwinst.' },
            { strong: 'Inventariseer wat er op de API’s kan.', rest: ' Overal waar cijfers worden overgetypt tussen twee systemen zit een koppeling die er al had kunnen zijn. Begin bij de plek waar het vaakst iets misgaat.' },
          ],
        },
        {
          type: 'p',
          text: 'Wilt u dit niet zelf uitzoeken? Wij richten de features in op uw eigen administratie en nemen uw team erin mee, zodat de kennis intern blijft en het gebruik niet stopt zodra wij de deur uit zijn.',
        },
      ],
      claireTitle: 'AI in uw Exact Online',
      claireBody: 'Claire werkt op dezelfde Premium-API’s: vragen in gewone taal, antwoorden uit uw eigen administratie.',
    },
    en: {
      metaTitle: "Premium features you're paying for but not using",
      metaDescription:
        'Smart Closing, the Power BI Connector and the Premium APIs are part of your Exact Online Premium subscription, yet sit unused at many companies. What they do and where to start.',
      crumbCurrent: 'Premium features',
      cat: 'Exact Online',
      tag: 'Guide',
      date: '14 June 2026',
      readTime: '5 min read',
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
      readTime: '7 min leestijd',
      title: 'Wat MCP is, en waarom het voor finance uitmaakt',
      lead:
        'Elke leverancier bouwt momenteel “AI in het product”. Handig, maar het levert tien losse chatbots op die elkaar niet kennen en elk hun eigen stukje van uw data zien. MCP draait het om: één open standaard waarmee uw AI-assistent veilig bij uw systemen kan.',
      hero: { src: '/kennisbank/mcp-voor-finance-nl.png', alt: 'Toolbeheer van de MCP-server: rapportage- en afsluittools die de AI-assistent per verbinding mag gebruiken, elk gemarkeerd als lezen' },
      blocks: [
        {
          type: 'p',
          text: 'MCP staat voor Model Context Protocol, een open standaard die eind 2024 door Anthropic is geïntroduceerd en inmiddels breed wordt gedragen. Het beschrijft hoe een AI-assistent gereedschap van een systeem mag gebruiken: welke acties er zijn, welke gegevens erbij horen en hoe de toegang geregeld is. Wat USB-C is voor apparaten, is MCP voor AI-assistenten: één stekker in plaats van voor elke combinatie een eigen kabel.',
        },
        { type: 'h2', id: 'hoe-het-werkt', text: 'Hoe het werkt' },
        {
          type: 'p',
          text: 'Een systeem, bijvoorbeeld uw boekhoudpakket, biedt een MCP-server aan: een lijst van afgebakende tools zoals “haal de proef- en saldibalans op” of “toon de openstaande posten van deze klant”. De assistent kiest per vraag welke tool nodig is, roept die aan en formuleert het antwoord op basis van wat er terugkomt. U logt in met uw bestaande account, dus de assistent ziet precies wat u zelf mag zien, niets meer.',
        },
        {
          type: 'p',
          text: 'Belangrijk daarbij: het model krijgt geen kopie van uw database. Elke vraag leidt tot een gerichte opvraging in de administratie zelf, op het moment dat u de vraag stelt. Er is geen datadump die ergens anders een eigen leven gaat leiden.',
        },
        {
          type: 'quote',
          text: '"De AI-assistent krijgt geen export van uw administratie, hij krijgt een deurbel. Elke vraag gaat langs uw autorisatie, en de cijfers blijven waar ze staan."',
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
            { strong: 'Autorisatie blijft waar hij hoort.', rest: ' De toegang loopt via uw bestaande login en rechten. Geen aparte kopie, geen gedeelde exportmap, geen servicecount met te ruime rechten.' },
            { strong: 'U bent niet gebonden aan één assistent.', rest: ' Omdat MCP een open standaard is, werkt dezelfde koppeling in Claude, in andere MCP-clients en in eigen agents. De investering zit in de koppeling met uw administratie, niet in de chatbot van één leverancier.' },
          ],
        },
        { type: 'h2', id: 'praktijk', text: 'Hoe dat er in de praktijk uitziet' },
        {
          type: 'p',
          text: 'Wij bouwden een MCP-server voor Exact Online, met rapportagetools voor onder meer de proef- en saldibalans, de resultatenrekening en ouderdomsanalyses. Het rekenwerk gebeurt in een deterministische rekenlaag; het taalmodel formuleert alleen het antwoord. Dezelfde administratie geeft dus dezelfde uitkomst, wie er ook vraagt.',
        },
        {
          type: 'p',
          text: 'Op die server draait Claire: vragen stellen in gewone taal, vaste afsluitcontroles, en boekingen alleen na uw uitdrukkelijke akkoord. MCP is daarbij geen marketingterm maar de fundering: het is de reden dat Claire in uw administratie kan werken zonder dat uw data het pand verlaat.',
        },
      ],
      claireTitle: 'Claire spreekt MCP',
      claireBody: 'Uw administratie via uw eigen login, antwoorden met onderbouwing, boekingen alleen na akkoord.',
    },
    en: {
      metaTitle: 'What MCP is, and why it matters for finance',
      metaDescription:
        'MCP (Model Context Protocol) is the open standard that gives AI assistants safe access to systems like Exact Online. How it works, and why for finance it makes the difference between a chatbot and a verifiable answer.',
      crumbCurrent: 'MCP',
      cat: 'AI',
      tag: 'Explainer',
      date: '2 August 2026',
      readTime: '7 min read',
      title: 'What MCP is, and why it matters for finance',
      lead:
        'Every vendor is currently building “AI into the product”. Convenient, but it produces ten separate chatbots that don’t know each other and each see their own slice of your data. MCP turns that around: one open standard through which your AI assistant can safely reach your systems.',
      hero: { src: '/kennisbank/mcp-voor-finance-en.png', alt: 'Managing MCP server tools: reporting and closing tools the AI assistant may use per connection, each marked as read-only' },
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
          text: 'We built an MCP server for Exact Online, with reporting tools for the trial balance, the profit and loss statement and ageing analyses, among others. The number-crunching happens in a deterministic calculation layer; the language model only phrases the answer. The same administration gives the same outcome, no matter who asks.',
        },
        {
          type: 'p',
          text: 'Claire runs on that server: questions in plain language, fixed close checks, and postings only after your explicit approval. MCP is not a marketing term here but the foundation: it is the reason Claire can work inside your administration without your data leaving the building.',
        },
      ],
      claireTitle: 'Claire speaks MCP',
      claireBody: 'Your administration through your own login, answers with substantiation, postings only after approval.',
    },
  },
};
