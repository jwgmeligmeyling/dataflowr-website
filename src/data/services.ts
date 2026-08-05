import type { Lang, ServiceKey } from '../lib/site';

export interface ServiceResult {
  stat: string;
  title: string;
  body: string;
}

export interface ServiceDeliverable {
  num: string;
  title: string;
  body: string;
}

export interface ServiceContent {
  nav: string;
  eyebrow: string;
  title: string;
  intro: string;
  facts: string[];
  doTitle: string;
  deliverables: ServiceDeliverable[];
  /** Absent on Exact Online Premium (removed per design review). */
  results?: ServiceResult[];
  related: RelatedKey[];
  metaTitle: string;
  metaDescription: string;
}

export type RelatedKey = 'claire' | ServiceKey;

/**
 * Copy for the six service pages, straight from the final design handoff
 * (Dienst *.dc.html DATA()), plus the English translations.
 */
export const services: Record<Lang, Record<ServiceKey, ServiceContent>> = {
  nl: {
    'exact-online-premium': {
      nav: 'Exact Online Premium',
      eyebrow: 'Exact Online Premium',
      title: 'Alles uit Exact Online Premium halen.',
      intro:
        'Wij kennen het ecosysteem door en door, van de Power BI Connector en Smart Closing tot de API’s eronder. Als early adopter van de Premium-features weten we wat werkt, wat nog niet werkt en waar u omheen moet.',
      facts: [
        'Early adopter Power BI Connector & Smart Closing',
        'Multi-entiteit en multi-administratie',
        'Migraties vanuit legacy en na M&A',
        'Eén vast aanspreekpunt, geen accountmanager',
      ],
      doTitle: 'Van licentie naar werkend platform.',
      deliverables: [
        { num: '01', title: 'Implementatie & migratie', body: 'Inrichting van administraties, grootboek, dagboeken en rollen, of een volledige migratie vanuit uw huidige pakket.' },
        { num: '02', title: 'Premium-features inrichten', body: 'Smart Closing, de Power BI Connector en de Premium-API’s daadwerkelijk in gebruik, niet alleen aangezet.' },
        { num: '03', title: 'Multi-entiteit op één lijn', body: 'Eén manier van boeken, rapporteren en beheersen over alle entiteiten en merken heen.' },
        { num: '04', title: 'Governance & controls', body: 'Autorisaties, procuratie en audit trail zo ingericht dat uw accountant er zonder vragen doorheen loopt.' },
      ],
      related: ['integraties', 'claire', 'training'],
      metaTitle: 'Exact Online Premium implementatie & partner',
      metaDescription:
        'Alles uit Exact Online Premium halen: implementatie, migratie, Smart Closing, de Power BI Connector en multi-entiteit op één lijn. Gespecialiseerde Exact Online integratiepartner.',
    },
    integraties: {
      nav: 'Integraties',
      eyebrow: 'Integraties',
      title: 'Uw systemen praten met elkaar. Eindelijk.',
      intro:
        'Webshops, PSP’s, CRM, WMS en portalen gekoppeld aan Exact Online, met integraties die blijven werken als volumes verdubbelen. Geen exports, geen tussenbestanden, geen overtypwerk.',
      facts: [
        'Directe API-koppelingen, geen CSV-uitwisseling',
        'PSP-reconciliatie: Mollie, Pay.nl, Adyen',
        'Idempotent en herstelbaar bij storingen',
        'Monitoring en alerting standaard mee',
      ],
      doTitle: 'Koppelingen die u kunt vergeten.',
      deliverables: [
        { num: '01', title: 'API-integraties', body: 'Koppelingen op de Exact Online-API met foutafhandeling, retries en idempotentie, bestand tegen storingen en volumepieken.' },
        { num: '02', title: 'PSP-reconciliatie', body: 'Mollie, Pay.nl en Adyen automatisch gematcht met bank en grootboek, inclusief afwijkingen die om aandacht vragen.' },
        { num: '03', title: 'Webshop & order-to-cash', body: 'Van order in de shop tot factuur en betaling in Exact, zonder tussenkomst van een medewerker.' },
        { num: '04', title: 'Monitoring & alerting', body: 'U ziet het als een koppeling stilvalt, niet pas als de klant belt. Met logging die herleidbaar is per transactie.' },
      ],
      results: [
        { stat: '100%', title: 'PSP-reconciliatie', body: 'Geautomatiseerd gematcht met bank en grootboek.' },
        { stat: '0', title: 'Tussenbestanden', body: 'Geen CSV’s, geen mappen, geen handmatige import.' },
        { stat: '24/7', title: 'Bewaakt', body: 'Monitoring en alerting op elke datastroom.' },
      ],
      related: ['make', 'claire', 'exact-online-premium'],
      metaTitle: 'Integraties met Exact Online',
      metaDescription:
        'Webshops, PSP’s, CRM en portalen gekoppeld aan Exact Online. Directe API-integraties met PSP-reconciliatie, monitoring en alerting. Geen exports of overtypwerk.',
    },
    make: {
      nav: 'Make & low-code',
      eyebrow: 'Make · n8n · low-code',
      title: 'Automatiseren zonder afhankelijk te worden van ons.',
      intro:
        'Met Make en n8n bouwen we automatiseringen die uw team zelf kan lezen, begrijpen en aanpassen. Snel live, zichtbaar in één canvas, en met eigen connectors waar de standaard tekortkomt.',
      facts: [
        'Eigen Exact Online-connectors voor Make',
        'Zichtbaar canvas: uw team leest mee',
        'In dagen live, niet in kwartalen',
        'Overdracht en documentatie inbegrepen',
      ],
      doTitle: 'Flows die uw team zelf beheert.',
      deliverables: [
        { num: '01', title: 'Scenario-ontwerp', body: 'Wij ontwerpen de flow rond uw proces, met duidelijke stappen, foutpaden en verantwoordelijkheden.' },
        { num: '02', title: 'Eigen connectors', body: 'Waar de standaard-modules tekortschieten bouwen wij eigen Exact Online-modules voor Make en n8n.' },
        { num: '03', title: 'Bouw & test', body: 'Getest op uw echte data, met logging per stap zodat u ziet wat er gebeurd is en waarom.' },
        { num: '04', title: 'Overdracht', body: 'Documentatie en training zodat uw team zelf kan aanpassen. Wij blijven achter de hand.' },
      ],
      results: [
        { stat: 'Dagen', title: 'Tot live', body: 'Een eerste werkende flow binnen enkele dagen.' },
        { stat: 'Zelf', title: 'Aanpasbaar', body: 'Uw team leest en wijzigt de flow in het canvas.' },
        { stat: '1', title: 'Plek voor logica', body: 'Geen verborgen scripts of laptop-macro’s meer.' },
      ],
      related: ['integraties', 'rpa', 'claire'],
      metaTitle: 'Make & low-code automatisering voor Exact Online',
      metaDescription:
        'Automatiseringen in Make en n8n die uw team zelf kan lezen en aanpassen, met eigen Exact Online-connectors. In dagen live, inclusief overdracht en documentatie.',
    },
    camunda: {
      nav: 'Camunda',
      eyebrow: 'Camunda · BPMN & DMN',
      title: 'Grip op processen met veel stappen en uitzonderingen.',
      intro:
        'Waar low-code ophoudt, begint orkestratie. Met Camunda (BPMN/DMN) modelleren we processen die dagen doorlopen, langs meerdere mensen en systemen gaan en waarin elke uitzondering herleidbaar moet zijn.',
      facts: [
        'BPMN-modellen die business en IT samen lezen',
        'Beslisregels expliciet in DMN, niet in code',
        'Volledige historie per procesinstantie',
        'Geschikt voor audit en accountantscontrole',
      ],
      doTitle: 'Van impliciet proces naar bewaakte workflow.',
      deliverables: [
        { num: '01', title: 'Procesmodellering', body: 'Uw proces vastgelegd in BPMN: taken, rollen, termijnen en uitzonderingspaden expliciet in beeld.' },
        { num: '02', title: 'Beslisregels in DMN', body: 'Grenzen, mandaten en tariefregels in beheersbare beslistabellen, aanpasbaar zonder code.' },
        { num: '03', title: 'Systeemintegratie', body: 'Camunda orkestreert Exact Online en uw overige systemen, met compensatie als een stap faalt.' },
        { num: '04', title: 'Audit trail', body: 'Elke stap, elk besluit en elke wachttijd vastgelegd per instantie. Herleidbaar tot op de dag.' },
      ],
      results: [
        { stat: '100%', title: 'Herleidbaar', body: 'Elke processtap en elk besluit vastgelegd.' },
        { stat: 'Live', title: 'Procesinzicht', body: 'U ziet waar elke instantie op wacht, en op wie.' },
        { stat: 'Nul', title: 'Verloren zaken', body: 'Termijnen en escalaties bewaakt door het systeem.' },
      ],
      related: ['integraties', 'exact-online-premium', 'claire'],
      metaTitle: 'Camunda workflow-orkestratie (BPMN & DMN)',
      metaDescription:
        'Procesorkestratie met Camunda: BPMN-modellen, beslisregels in DMN en een volledige audit trail per procesinstantie. Grip op processen met veel stappen en uitzonderingen.',
    },
    rpa: {
      nav: 'RPA',
      eyebrow: 'RPA · robotic process automation',
      title: 'Ook zonder API valt er te automatiseren.',
      intro:
        'Sommige systemen geven u geen koppeling, een oud portaal, een bankomgeving, een leveranciersapplicatie. RPA neemt daar het klikwerk over: dezelfde handelingen, elke keer identiek, zonder dat iemand ernaar hoeft te kijken.',
      facts: [
        'Voor systemen zonder API of export',
        'Draait op schema of op een trigger',
        'Screenshots en logging per run',
        'Altijd als brug, nooit als eindoplossing',
      ],
      doTitle: 'Het klikwerk overgenomen, en bewaakt.',
      deliverables: [
        { num: '01', title: 'Procesopname', body: 'Wij leggen de exacte handelingen vast, inclusief de uitzonderingen die uw medewerker uit het hoofd kent.' },
        { num: '02', title: 'Robot bouwen', body: 'De robot doorloopt de stappen identiek, met validaties zodat hij stopt in plaats van fouten doorvoert.' },
        { num: '03', title: 'Bewaking', body: 'Elke run gelogd met screenshots. Bij een afwijking krijgt u bericht, geen stille fout.' },
        { num: '04', title: 'Uitfaseerpad', body: 'Komt er later een API? Dan vervangen we de robot door een echte integratie, het proces blijft gelijk.' },
      ],
      results: [
        { stat: 'Uren', title: 'Per week terug', body: 'Repetitief klikwerk verdwijnt uit de agenda.' },
        { stat: 'Identiek', title: 'Elke run', body: 'Geen variatie, geen vergeten stap, geen typefout.' },
        { stat: 'Gelogd', title: 'Elke actie', body: 'Met screenshots, dus controleerbaar achteraf.' },
      ],
      related: ['make', 'integraties', 'claire'],
      metaTitle: 'RPA: repetitief werk robotiseren',
      metaDescription:
        'RPA voor systemen zonder API: klikwerk overgenomen door robots die elke run identiek uitvoeren, gelogd met screenshots. Als brug naar echte integratie, nooit als eindoplossing.',
    },
    training: {
      nav: 'Training',
      eyebrow: 'Training & onboarding',
      title: 'Uw team neemt het over. Dat is het doel.',
      intro:
        'Automatisering die alleen wij begrijpen, is een risico. Wij leiden uw finance team op in de tools die ze nu echt gebruiken, Exact Online Premium, Make, en het werken met een AI-assistent in de administratie.',
      facts: [
        'Op uw eigen administratie, niet op een demo',
        'Voor finance, niet voor ontwikkelaars',
        'Inclusief werkinstructies en beslisregels',
        'Losse sessies of doorlopend meelopen',
      ],
      doTitle: 'Kennis die bij u blijft.',
      deliverables: [
        { num: '01', title: 'Exact Online Premium', body: 'Uw team leert de features die u al betaalt daadwerkelijk gebruiken, geoefend op uw eigen administratie.' },
        { num: '02', title: 'AI in de administratie', body: 'Hoe stelt u een goede vraag, wanneer vertrouwt u het antwoord en wanneer controleert u het? Praktisch, met echte cijfers.' },
        { num: '03', title: 'Zelf automatiseren', body: 'Uw team leert flows in Make lezen en aanpassen, zodat kleine wijzigingen geen project worden.' },
        { num: '04', title: 'Werkinstructies', body: 'Vastgelegd in uw eigen taal, zodat een nieuwe collega binnen een dag mee kan.' },
      ],
      results: [
        { stat: 'Zelf', title: 'Aan het roer', body: 'Uw team beheert de oplossing zonder ons.' },
        { stat: '1 dag', title: 'Nieuwe collega mee', body: 'Werkinstructies die aansluiten op uw praktijk.' },
        { stat: 'Blijvend', title: 'Kennis intern', body: 'Geen afhankelijkheid van één externe partij.' },
      ],
      related: ['claire', 'exact-online-premium', 'make'],
      metaTitle: 'Training & enablement voor uw finance team',
      metaDescription:
        'Training op uw eigen administratie: Exact Online Premium, Make en werken met AI in finance. Kennis blijft intern, geen afhankelijkheid van één externe partij.',
    },
  },
  en: {
    'exact-online-premium': {
      nav: 'Exact Online Premium',
      eyebrow: 'Exact Online Premium',
      title: 'Get everything out of Exact Online Premium.',
      intro:
        'We know the ecosystem inside out, from the Power BI Connector and Smart Closing to the APIs underneath. As an early adopter of the Premium features we know what works, what doesn’t yet, and what to work around.',
      facts: [
        'Early adopter of the Power BI Connector & Smart Closing',
        'Multi-entity and multi-administration',
        'Migrations from legacy systems and after M&A',
        'One fixed point of contact, no account manager',
      ],
      doTitle: 'From licence to working platform.',
      deliverables: [
        { num: '01', title: 'Implementation & migration', body: 'Setup of administrations, general ledger, journals and roles, or a full migration from your current package.' },
        { num: '02', title: 'Premium features configured', body: 'Smart Closing, the Power BI Connector and the Premium APIs actually in use, not just switched on.' },
        { num: '03', title: 'Multi-entity aligned', body: 'One way of booking, reporting and controlling across all entities and brands.' },
        { num: '04', title: 'Governance & controls', body: 'Authorisations, delegation and audit trail set up so your accountant walks through without questions.' },
      ],
      related: ['integraties', 'claire', 'training'],
      metaTitle: 'Exact Online Premium implementation & partner',
      metaDescription:
        'Get everything out of Exact Online Premium: implementation, migration, Smart Closing, the Power BI Connector and multi-entity alignment. Specialised Exact Online integration partner.',
    },
    integraties: {
      nav: 'Integrations',
      eyebrow: 'Integrations',
      title: 'Your systems talk to each other. Finally.',
      intro:
        'Webshops, PSPs, CRM, WMS and portals connected to Exact Online, with integrations that keep working when volumes double. No exports, no intermediate files, no retyping.',
      facts: [
        'Direct API connections, no CSV exchange',
        'PSP reconciliation: Mollie, Pay.nl, Adyen',
        'Idempotent and recoverable on failures',
        'Monitoring and alerting included as standard',
      ],
      doTitle: 'Integrations you can forget about.',
      deliverables: [
        { num: '01', title: 'API integrations', body: 'Connections on the Exact Online API with error handling, retries and idempotency, resilient to outages and volume peaks.' },
        { num: '02', title: 'PSP reconciliation', body: 'Mollie, Pay.nl and Adyen automatically matched to bank and ledger, including the deviations that need attention.' },
        { num: '03', title: 'Webshop & order-to-cash', body: 'From order in the shop to invoice and payment in Exact, without an employee in between.' },
        { num: '04', title: 'Monitoring & alerting', body: 'You see it when a connection stalls, not when the customer calls. With logging traceable per transaction.' },
      ],
      results: [
        { stat: '100%', title: 'PSP reconciliation', body: 'Automatically matched to bank and ledger.' },
        { stat: '0', title: 'Intermediate files', body: 'No CSVs, no folders, no manual imports.' },
        { stat: '24/7', title: 'Monitored', body: 'Monitoring and alerting on every data flow.' },
      ],
      related: ['make', 'claire', 'exact-online-premium'],
      metaTitle: 'Integrations with Exact Online',
      metaDescription:
        'Webshops, PSPs, CRM and portals connected to Exact Online. Direct API integrations with PSP reconciliation, monitoring and alerting. No exports or retyping.',
    },
    make: {
      nav: 'Make & low-code',
      eyebrow: 'Make · n8n · low-code',
      title: 'Automate without becoming dependent on us.',
      intro:
        'With Make and n8n we build automations your team can read, understand and adapt themselves. Live fast, visible on one canvas, and with our own connectors where the standard falls short.',
      facts: [
        'Our own Exact Online connectors for Make',
        'Visible canvas: your team reads along',
        'Live in days, not quarters',
        'Handover and documentation included',
      ],
      doTitle: 'Flows your team manages itself.',
      deliverables: [
        { num: '01', title: 'Scenario design', body: 'We design the flow around your process, with clear steps, error paths and responsibilities.' },
        { num: '02', title: 'Custom connectors', body: 'Where the standard modules fall short we build our own Exact Online modules for Make and n8n.' },
        { num: '03', title: 'Build & test', body: 'Tested on your real data, with logging per step so you see what happened and why.' },
        { num: '04', title: 'Handover', body: 'Documentation and training so your team can make changes themselves. We stay on call.' },
      ],
      results: [
        { stat: 'Days', title: 'To live', body: 'A first working flow within a few days.' },
        { stat: 'Yours', title: 'To adapt', body: 'Your team reads and edits the flow on the canvas.' },
        { stat: '1', title: 'Place for logic', body: 'No more hidden scripts or laptop macros.' },
      ],
      related: ['integraties', 'rpa', 'claire'],
      metaTitle: 'Make & low-code automation for Exact Online',
      metaDescription:
        'Automations in Make and n8n your team can read and adapt themselves, with custom Exact Online connectors. Live in days, handover and documentation included.',
    },
    camunda: {
      nav: 'Camunda',
      eyebrow: 'Camunda · BPMN & DMN',
      title: 'Grip on processes with many steps and exceptions.',
      intro:
        'Where low-code ends, orchestration begins. With Camunda (BPMN/DMN) we model processes that run for days, pass through several people and systems, and where every exception must be traceable.',
      facts: [
        'BPMN models business and IT read together',
        'Decision rules explicit in DMN, not in code',
        'Full history per process instance',
        'Fit for audit and accountant review',
      ],
      doTitle: 'From implicit process to monitored workflow.',
      deliverables: [
        { num: '01', title: 'Process modelling', body: 'Your process captured in BPMN: tasks, roles, deadlines and exception paths explicitly in view.' },
        { num: '02', title: 'Decision rules in DMN', body: 'Limits, mandates and rate rules in manageable decision tables, adjustable without code.' },
        { num: '03', title: 'System integration', body: 'Camunda orchestrates Exact Online and your other systems, with compensation when a step fails.' },
        { num: '04', title: 'Audit trail', body: 'Every step, decision and waiting time recorded per instance. Traceable to the day.' },
      ],
      results: [
        { stat: '100%', title: 'Traceable', body: 'Every process step and decision recorded.' },
        { stat: 'Live', title: 'Process insight', body: 'You see what each instance is waiting on, and on whom.' },
        { stat: 'Zero', title: 'Lost cases', body: 'Deadlines and escalations guarded by the system.' },
      ],
      related: ['integraties', 'exact-online-premium', 'claire'],
      metaTitle: 'Camunda workflow orchestration (BPMN & DMN)',
      metaDescription:
        'Process orchestration with Camunda: BPMN models, decision rules in DMN and a full audit trail per process instance. Grip on processes with many steps and exceptions.',
    },
    rpa: {
      nav: 'RPA',
      eyebrow: 'RPA · robotic process automation',
      title: 'Even without an API, there is automation to be had.',
      intro:
        'Some systems give you no connection, an old portal, a banking environment, a supplier application. RPA takes over the click-work there: the same actions, identical every time, without anyone having to watch.',
      facts: [
        'For systems without an API or export',
        'Runs on a schedule or on a trigger',
        'Screenshots and logging per run',
        'Always a bridge, never the end state',
      ],
      doTitle: 'The click-work taken over, and monitored.',
      deliverables: [
        { num: '01', title: 'Process capture', body: 'We record the exact actions, including the exceptions your employee knows by heart.' },
        { num: '02', title: 'Robot build', body: 'The robot walks through the steps identically, with validations so it stops rather than pushes errors through.' },
        { num: '03', title: 'Monitoring', body: 'Every run logged with screenshots. On a deviation you get a message, not a silent failure.' },
        { num: '04', title: 'Phase-out path', body: 'An API arrives later? Then we replace the robot with a real integration, the process stays the same.' },
      ],
      results: [
        { stat: 'Hours', title: 'Back per week', body: 'Repetitive click-work disappears from the agenda.' },
        { stat: 'Identical', title: 'Every run', body: 'No variation, no forgotten step, no typo.' },
        { stat: 'Logged', title: 'Every action', body: 'With screenshots, so verifiable afterwards.' },
      ],
      related: ['make', 'integraties', 'claire'],
      metaTitle: 'RPA: robotise repetitive work',
      metaDescription:
        'RPA for systems without an API: click-work taken over by robots that run identically every time, logged with screenshots. A bridge to real integration, never the end state.',
    },
    training: {
      nav: 'Training',
      eyebrow: 'Training & onboarding',
      title: 'Your team takes over. That is the goal.',
      intro:
        'Automation only we understand is a risk. We train your finance team in the tools they actually use, Exact Online Premium, Make, and working with an AI assistant in the books.',
      facts: [
        'On your own administration, not a demo',
        'For finance, not for developers',
        'Including work instructions and decision rules',
        'Single sessions or ongoing coaching',
      ],
      doTitle: 'Knowledge that stays with you.',
      deliverables: [
        { num: '01', title: 'Exact Online Premium', body: 'Your team learns to actually use the features you already pay for, practised on your own administration.' },
        { num: '02', title: 'AI in the books', body: 'How do you ask a good question, when do you trust the answer and when do you verify it? Practical, with real figures.' },
        { num: '03', title: 'Automate yourself', body: 'Your team learns to read and adapt flows in Make, so small changes don’t become a project.' },
        { num: '04', title: 'Work instructions', body: 'Written in your own language, so a new colleague is up to speed within a day.' },
      ],
      results: [
        { stat: 'Yours', title: 'At the wheel', body: 'Your team manages the solution without us.' },
        { stat: '1 day', title: 'New colleague onboard', body: 'Work instructions that match your practice.' },
        { stat: 'Lasting', title: 'Knowledge in-house', body: 'No dependency on a single external party.' },
      ],
      related: ['claire', 'exact-online-premium', 'make'],
      metaTitle: 'Training & enablement for your finance team',
      metaDescription:
        'Training on your own administration: Exact Online Premium, Make and working with AI in finance. Knowledge stays in-house, no dependency on one external party.',
    },
  },
};

/** "Vaak in combinatie met" card copy. */
export const relatedCards: Record<Lang, Record<RelatedKey, { kind: string; title: string; body: string; cta: string }>> = {
  nl: {
    claire: { kind: 'Product', title: 'Claire', body: 'De AI-laag boven op Exact Online: vragen stellen in gewone taal, agents die volgens schema werken.', cta: 'Bekijk Claire →' },
    'exact-online-premium': { kind: 'Dienst', title: 'Exact Online Premium', body: 'Implementatie, migratie en het echt in gebruik nemen van de Premium-features.', cta: 'Bekijk dienst →' },
    integraties: { kind: 'Dienst', title: 'Integraties', body: 'Webshops, PSP’s, CRM en portalen gekoppeld aan Exact Online.', cta: 'Bekijk dienst →' },
    make: { kind: 'Dienst', title: 'Make & low-code', body: 'Automatiseringen die uw team zelf kan lezen en aanpassen.', cta: 'Bekijk dienst →' },
    camunda: { kind: 'Dienst', title: 'Camunda', body: 'Orkestratie voor processen met veel stappen en uitzonderingen.', cta: 'Bekijk dienst →' },
    rpa: { kind: 'Dienst', title: 'RPA', body: 'Klikwerk overnemen waar een systeem geen API heeft.', cta: 'Bekijk dienst →' },
    training: { kind: 'Dienst', title: 'Training', body: 'Uw team leert het zelf beheren, zodat kennis bij u blijft.', cta: 'Bekijk dienst →' },
  },
  en: {
    claire: { kind: 'Product', title: 'Claire', body: 'The AI layer on top of Exact Online: ask questions in plain language, agents that work on schedule.', cta: 'See Claire →' },
    'exact-online-premium': { kind: 'Service', title: 'Exact Online Premium', body: 'Implementation, migration and actually putting the Premium features to use.', cta: 'View service →' },
    integraties: { kind: 'Service', title: 'Integrations', body: 'Webshops, PSPs, CRM and portals connected to Exact Online.', cta: 'View service →' },
    make: { kind: 'Service', title: 'Make & low-code', body: 'Automations your team can read and adapt themselves.', cta: 'View service →' },
    camunda: { kind: 'Service', title: 'Camunda', body: 'Orchestration for processes with many steps and exceptions.', cta: 'View service →' },
    rpa: { kind: 'Service', title: 'RPA', body: 'Taking over click-work where a system has no API.', cta: 'View service →' },
    training: { kind: 'Service', title: 'Training', body: 'Your team learns to manage it, so knowledge stays with you.', cta: 'View service →' },
  },
};
