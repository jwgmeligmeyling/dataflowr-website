# DataFlowr vs Claridy: competitive assessment and action plan

Prepared 15 August 2026. Repo facts verified against `/home/user/dataflowr-website`. Competitor facts verified against a live fetch of claridy.ai on the same date. Where a claim could not be confirmed, it is marked **not verified** and no recommendation depends on it.

---

## 1. What Claridy is

Claridy B.V. (Amsterdam, KVK 97842184, founded 2025) sells a subscription platform it calls "agentic finance operations": automated accounts payable, accounts receivable, bank reconciliation and custom workflows, running on top of NetSuite, Microsoft Dynamics 365 or Exact. It is shaped like a venture-stage SaaS company and reads like one: a public pricing page with a configurator, a security page with a dated external audit, a 20-article content hub with six competitor-comparison pages, a co-hosted event programme, and a single conversion endpoint (an inline Cal.com booker on `/demo`) that every call to action on the site resolves to. Its persuasion strategy is unusual and effective: it sells AI to an audience that distrusts AI by making determinism the headline feature, repeating across `/beveiliging` and `/hoe-het-werkt` that "in het uitvoerende pad zit geen taalmodel" and that "een model" cannot explain its own decisions. It buys credibility by disqualifying buyers in writing, on its own pricing page, under the heading "Eerlijk is eerlijk / Voor wie dit niet werkt". It writes informal Dutch throughout ("je", never "u"), has zero real product screenshots across 42 pages, and its Exact story is one logo in a row of three.

| Attribute | Claridy |
|---|---|
| Category | Self-coined: "agentic finance operations", supported by a self-coined "drie generaties techniek" taxonomy in which they alone occupy generation 3 |
| ICP | Growing companies with in-house finance, roughly 100+ purchase invoices per month, multi-entity. Buyer named explicitly on `/events/marble`: "CFO's, finance directors, controllers, AP/AR-managers" |
| Explicitly not for | Under ~100 invoices per month; companies that outsource the whole administration to an accountancy firm; companies about to switch ERP. All three stated verbatim on `/prijzen` |
| ERPs | NetSuite, Microsoft Dynamics 365, Exact. Flat list, no depth claim. "Exact Online Premium" appears **zero** times across their entire published corpus |
| Pricing | Public and itemised: Starter € 499/mnd (500 invoices, 1 administratie), Growth € 999/mnd (1.000 invoices, 2 administraties), Enterprise "Op maat". Extra administratie € 250/mnd, extra bron € 100/mnd, modules € 250/mnd each, custom workflows from € 250 per workflow **per entity per month**. Worked example lands on € 1.499/mnd and "€ 1,87 per factuur". Implementation stated as included: "Tien werkdagen, geen migratie" |
| Proof | Six customer logos on the homepage only (Adamas, Luobofield, Holie's, DBS Retail, Good Time Grills, Get-E). No testimonials, no case studies, no reviews found. All product proof is fabricated but internally consistent UI mockups (Heeren Bouwgroep BV, PO-2026-114, grootboek 4310, "IBAN ongewijzigd sinds 2024-11-02"), presented without an illustrative label. Homepage stat band (85% / 2 weken / 1 maand / 12 sec) renders as zeros in served HTML and animates from JavaScript, so those values are **not verified** as published claims |
| Security posture | One certification, precisely scoped: CASA Tier 2, TAC Security, February 2026, "Alle 108 eisen", "Cyber score 9,7 van 10". SOC 2 named as in progress. ISO 27001 never claimed |
| Content footprint | 42 indexable pages, all 42 in the sitemap. 20 articles (3 promoted to root-level URLs), 3 pillar pages, 6 "alternatief voor" spokes under `/inzichten` plus 5 overlapping `/vergelijk/*` pages, 1 ungated ROI calculator. 16 of 20 articles published in a ten-day burst, nine on a single day |
| Machine-readable layer | llms.txt (bilingual, with a Dutch paragraph), llms-full.txt (68 KB full corpus), agent-data.json with a pre-written citation string, ai-plugin.json, 12 AI crawlers named in robots.txt |
| Team and funding | One founder named publicly (Jeroen Ruigrok, byline on all 20 articles and owner of the demo calendar). Juan Espinosa appears on LinkedIn; KVK lists Espi B.V. as a director. LinkedIn self-reports 11-50 employees with 221 followers. No funding round, press coverage or third-party review listing found: **not verified** either way |

---

## 2. Side by side

| Dimension | DataFlowr | Claridy |
|---|---|---|
| Positioning | Capability claim: "Financiële processen die stromen" plus "Finance-expertise ontmoet workflow-technologie". Describes what we are | Job claim: "Het intelligente systeem dat je crediteuren, debiteuren en bankafletteren draait". Describes what changes for the buyer |
| Category | Partner label inside Exact's taxonomy ("Exact Online Premium · Integratiepartner") | Self-defined category, occupied alone by construction |
| ICP | None stated anywhere. Grep for "voor wie", "niet geschikt", "minimaal", "mkb" across `src/` returns hits only in the terms of service | Named, quantified, and paired with three named disqualifications on the pricing page |
| Product framing | Claire framed by mechanism ("De AI-collega", "de AI-laag boven op Exact Online"). The three jobs it does are buried in cards below the fold | Four jobs, one page each, each with a counted edge-case section |
| Pricing transparency | Claire: four public tiers (€99 / €299 / €749 / op offerte) with self-serve checkout. Consultancy: nothing. `grep -c "€" src/data/services.ts` returns **0**. Pricing has no URL: `/prijzen` and `/pricing` both 404 | Fully public, itemised, configurable, top-level nav item, quoted with check dates on their own content pages |
| Social proof | None. Zero logos, zero testimonials, zero case studies, zero certification badges. The Exact Online Premium Partner status announced on LinkedIn appears nowhere in `src/` or `public/` | Six logos, nothing else. Proof load carried by fabricated mockups and one self-published research figure |
| Content footprint | 32 URLs (16 NL + 16 EN, all in sitemap, all 200). 5 articles totalling roughly 2,290 Dutch words. No index page exists | 42 URLs. 20 articles. Three pillars, eleven competitor pages, one calculator |
| Conversion path | One destination for everything: `/over-ons`, where an embedded Calendly widget for one founder's calendar is the only mechanism. **Zero** `<form>`, `<input>` or `<textarea>` elements sitewide. `/contact` 404s | One destination: `/demo`, an inline Cal.com embed asking for nothing of its own. One email capture in the homepage hero that fires a webhook and redirects to `/demo` |
| Security and trust | No page. The real facts sit in section 7 of the privacy statement (`src/data/legal.ts`) and in the Claire security section, neither reachable from navigation | `/beveiliging` is a top-level nav item running as a sales asset |
| Information architecture | Two dead hub levels: `/kennisbank`, `/diensten`, `/en/resources`, `/en/services` all 404. The "Kennisbank" nav item and the article breadcrumb both link to one specific article. Both `BreadcrumbList` blocks emit a middle level with a `name` and no `item` | Two levels, every nav category resolving to a real hub. Sitemap complete. No English site at all (zero hreflang, `lang="nl"` on every page), and a false `languages: ["nl","en"]` declaration in agent-data.json |

---

## 3. The five sharpest differences

**1. They have promised never to touch the administration. We change it.**
Claridy's safety story is also their ceiling. `/integraties`: "Geen wijziging aan je ERP of configuratie". `/hoe-het-werkt`: "Onaangeroerd. Geen migratie, geen wijziging in je inrichting", "geen tweede waarheid". If a controller's kruisposten fill every month because the PSP flow is booked wrong, an agent that clears them faster is treating a symptom. `src/data/services.ts` already sells the cure: "Inrichting van administraties, grootboek, dagboeken en rollen" and "Governance & controls". They have contractually written themselves out of that work to make the no-migration promise credible. Neither site currently states this difference.

**2. Exact Online Premium is empty ground, and they said so themselves.**
Counted across their full published corpus (`llms-full.txt`, 68,053 bytes) plus `/integraties`: "Exact Online Premium" = 0, "Smart Closing" = 0, "Power BI" = 0, "RGS" = 0, "kruispost" = 0. Their own Blue10 page concedes the market: "deze markt is op Exact gebouwd. Zit je op NetSuite of op Microsoft Dynamics 365, dan valt vrijwel de hele categorie af voordat je aan functies toekomt. Claridy draait op alle drie, en dat is voor een deel van de lezers van deze pagina het enige dat telt." Note the correction to earlier analysis: UBL (20 mentions) and Peppol (16 mentions) are **not** empty ground. They cover e-invoicing in depth.

**3. No model in the execution path means no open-ended question.**
Read their central claim as a limit rather than a boast. A system with no language model in the loop can only do what someone pre-built a workflow for. "Hoe ziet Q4 eruit?" and "waarom is dit saldo veranderd?" have no answer, because there is no workflow. Claire answers both. Our rebuttal to their drift objection is already written and is more honest than theirs, because it concedes the model is present and then bounds it: "Het rekenwerk gebeurt daarbij niet in het taalmodel, maar in een rekenlaag die deterministisch en herleidbaar is. Het taalmodel formuleert alleen het antwoord" (`src/data/articles.ts:145`). It sits in a knowledge-base article, not on `/claire`. The product page says "een vaste reeks deterministische controles" once and nothing stronger.

**4. Bring your own AI client versus another login.**
Claire runs in Claude, ChatGPT and Microsoft Copilot over MCP, an open standard, with per-user Exact OAuth and no shadow copy (`src/components/pages/ClairePage.astro:197-212`). Claridy is a closed platform. Their anti-lock-in defence is only that they do not hold your balances. Ours is already argued in `src/data/articles.ts:474`: "U bent niet gebonden aan één assistent. De investering zit in de koppeling met uw administratie, niet in de chatbot van één leverancier." For a finance team that already has Copilot in its Microsoft tenancy, that is a procurement conversation that does not have to happen.

**5. Our screenshots are real and labelled. Theirs are invented and unlabelled.**
`public/kennisbank/` holds 20 captures from the live Claire app at 2880×1620, paired NL and EN, with alt text describing actual app state. Every one is referenced in `src/data/articles.ts` and **zero** times in any `.astro` file. `ClairePage.astro` is 1776 lines with zero `<img>` tags, and its demo tables are honestly disclosed: "Voorbeelden uit onze demo-omgeving; bedragen en namen zijn fictief." Claridy has no real screenshots on 42 pages and labels none of its fabrications. Being the only party whose product evidence can be checked is an asset we currently hide.

---

## 4. Where we are genuinely behind, ranked

1. **No ICP and no disqualification.** They tell a buyer whether to call before the call. We offer an unqualified 30-minute founder call to everyone, which is the most expensive thing a two-person firm sells.
2. **No hub pages, so five good articles cannot compound.** `/kennisbank`, `/diensten`, `/en/resources`, `/en/services` all 404. `routes.article` in `src/lib/site.ts:74` is aliased to one article, and both `SiteNav.astro:56` and `ArticlePage.astro:78` point at it. Nothing can rank for a category term and a reader who finishes an article has no next step.
3. **No consultancy price signal of any kind.** They publish every meter and a worked bill, and teach the market that implementation is included at no separate fee. That reframes our Quick Scan and Blueprint as cost rather than value, and we have nothing on the page to answer with.
4. **No trust surface for a CFO or an accountant.** Their `/beveiliging` is a nav item. Our equivalent facts are buried in a privacy statement and a product-page section.
5. **No FAQPage schema anywhere.** They mirror 4 to 11 self-contained answers per page into schema. `ArticleBlock` in `src/data/articles.ts` is `p | h2 | quote | ol | figure`, so an FAQ cannot even be authored. For a product distributed through Claude, ChatGPT and Copilot, absence from the schema those systems read is the wrong absence.
6. **Zero external proof, including one credential we actually hold.** The Exact Online Premium Partner status is real and announced on LinkedIn. It appears nowhere on the site. The only near hit is the footer motto "All You Need is a Premium Partner", which is a slogan, not a claim.
7. **Content volume: 5 articles to their 20**, and only two of our six services have any supporting content.
8. **Small credibility leaks that this audience checks.** Read times do not track length: `maandafsluiting` is 345 Dutch words labelled "8 min leestijd", `mcp-release` is 1,105 words labelled "8 min". Nine of fifteen service result stats are words in a numeric slot ("Uren", "Identiek", "Gelogd", "Zelf", "Blijvend"). `footerMeetItems` in `src/lib/site.ts:123` and `:167` claims presence at three event types as unlinked, undated text with nothing behind it. `public/llms.txt` and `src/data/legal.ts` name Auth0 while the release article says the sign-in system was replaced.
9. **A brand collision in search.** "dataflowr" is held by the INRIA and ENS deep learning course (dataflowr.github.io, github.com/dataflowr). A branded query does not reliably reach us.

One correction to earlier drafts of this analysis: **we do not have an SEO hygiene advantage over Claridy.** Their sitemap is complete (42 of 42 URLs, including every comparison page and the ROI calculator). Ours is complete (32 of 32). Any recommendation resting on their sitemap being broken should be discarded.

---

## 5. Where we are genuinely ahead

1. **Exact Online Premium depth is unoccupied and they have conceded the position in writing.** A platform serving three ERPs must keep every Exact-specific behaviour generic forever.
2. **Real, checkable product evidence.** Twenty captures plus a repeatable capture pipeline in `scripts/`. They cannot acquire this, because they have no product surface to photograph that is not already a mock.
3. **A complete, slug-translated English mirror**, hreflang emitted per page. They have no English site at all and advertise one that does not exist in `agent-data.json`.
4. **Self-serve at €99 against their €499 floor**, with checkout already wired (`ClairePage.astro:489`, `?plan=<tier>&checkout=1`). They have no trial, no signup and no self-serve path of any kind.
5. **The two segments they disqualify in writing are ours.** Under ~100 invoices a month, and companies working through an accountancy firm. Our €749 Kantoor tier with unlimited administraties is already an accountancy-firm product. We have never addressed that buyer in a single sentence.
6. **Two named, differently-skilled, accountable founders** with photos, roles, personal mailboxes and LinkedIn profiles, and a byline split that proves the disciplines: Daan on the close and Premium features, Jan-Willem on PSP, MCP and the release. Twenty Claridy articles carry one byline and they never claim founder-led delivery as positioning.
7. **Formal "u" against their "je" on every page including pricing.** With both tabs open in front of a CFO, one reads as a professional firm and the other as a subscription.
8. **A data-driven template layer.** One field added to `ServiceContent` lands on 12 live pages; one block type added to `ArticlePage` lands on 10. Their 20 articles are hand-authored, which is why one comparison page shipped half-translated with a duplicate meta description.
9. **Typography discipline enforced in CI.** `npm run check:copy` passes and fails the build on U+2014. Their two oldest and most important pages carry 5 and 12 em dashes in prose, and their Klippa and Basecone pages carry the character in `og:description`, which renders in every LinkedIn share.

---

## 6. Recommendations

Nine, no more. Three content, three marketing, three sales. Each was tested against one question: can we say it truthfully today, and can two people sustain it.

A constraint that applies to all nine measurement notes: `src/data/legal.ts:247` publicly states "Deze website plaatst geen trackingcookies en gebruikt geen analytics." Any client-side measurement requires amending a legal document. Google Search Console is server-side and compatible; a JavaScript analytics tag is not, without a copy change to the privacy statement first.

### Content

**C1. Ship the knowledge-base hub and unblock the article template.**

*The play.* Create `/kennisbank` and `/en/resources` as real index pages, repoint the nav and the breadcrumb at them, fix the two `BreadcrumbList` blocks that emit a middle level with no `item`, and make `hero` optional on `ArticleContent`.

*Why for us.* This is one working day of data-file edits and it unblocks everything else. Right now the nav item and the breadcrumb both point at a single article, five articles cannot pass link equity to each other, and no page exists that can rank for a category term. The `hero` field is currently required and `CLAUDE.md` ties article images to Playwright captures from the Claire app repo, so today we physically cannot publish an article that is not about Claire without inventing a screenshot. Also correct the read times in the same commit: on a hub page they sit next to each other and the mismatch is visible in ten seconds.

*First three steps.* (1) Add `resources: { nl: '/kennisbank', en: '/en/resources' }` and `servicesIndex: { nl: '/diensten', en: '/en/services' }` to `routes`. (2) Build `ResourcesIndexPage.astro` reusing the card markup already written for the "Meer uit de kennisbank" grid, emit `CollectionPage` plus `ItemList` schema, and create the four thin page wrappers. (3) Change `hero` to optional, guard the render, and fall back the OG image and the Article schema `image` to the existing default cards.

*Files.* `src/lib/site.ts`, `src/components/SiteNav.astro`, `src/components/pages/ArticlePage.astro`, `src/components/pages/ServicePage.astro`, `src/components/pages/ResourcesIndexPage.astro`, `src/components/pages/ServicesIndexPage.astro`, `src/pages/kennisbank/index.astro`, `src/pages/en/resources/index.astro`, `src/pages/diensten/index.astro`, `src/pages/en/services/index.astro`, `src/data/articles.ts`, `public/llms.txt`.

*Effort.* Low.

*Signal it worked.* Search Console shows `/kennisbank` and `/en/resources` indexed within four weeks, and the hub starts receiving impressions for non-branded category terms. Secondary: articles other than the flagship begin appearing in Search Console at all.

---

**C2. Add an FAQ block type and mirror it into FAQPage schema.**

*The play.* Extend the `ArticleBlock` union with `{ type: 'faq'; heading: string; items: { q: string; a: string }[] }`, render it, and emit a matching `FAQPage` node. Backfill four to six questions on each existing article, and add the same to `/claire`.

*Why for us.* Claire is sold inside Claude, ChatGPT and Copilot. Being invisible to the schema those systems read is the single most self-defeating gap on the site, and it is a typed change in two files. The questions we can answer are ones Claridy structurally cannot: "Wat doet Smart Closing wel en niet?", "Waarom sluit een PSP-uitbetaling nooit aan op de omzet?", "Wat gebeurt er als het taalmodel verandert?". Keep the union small: no table block, no callout block, nothing else.

*First three steps.* (1) Extend the union and render the block. (2) Push a `FAQPage` node into the existing `schema` array in `ArticlePage.astro`, matching the rendered text word for word. (3) Write the questions as literal Dutch search queries, answers two to four sentences, self-contained, formal "u".

*Files.* `src/data/articles.ts`, `src/components/pages/ArticlePage.astro`, `src/components/pages/ClairePage.astro`.

*Effort.* Low.

*Signal it worked.* The pages validate in Google's Rich Results Test, and an answer engine asked one of the seeded questions in Dutch returns our phrasing. Test this manually once a month in Claude, ChatGPT and Perplexity: it is free and it is the closest thing to a measurement we can take without analytics.

---

**C3. Publish two pages on ground nobody else holds: Premium API depth, and connecting Exact Online to an AI client.**

*The play.* One page at `/koppelingen` and `/en/integrations` naming exactly which Exact Online Premium endpoints and entities we read and write, which are Premium-only, what the documented rate limits are, and where the API stops. One article at `/kennisbank/exact-online-koppelen-aan-chatgpt-claude-of-copilot` and `/en/resources/connecting-exact-online-to-chatgpt-claude-or-copilot`.

*Why for us.* The first is the page Claridy cannot write: their `/integraties` cannot go past a three-logo row, and the depth is the whole reason a prospect picks a specialist. Resist the temptation to make it a connector directory grouped by data type (banks, PSPs, CRM, HR). That is a breadth claim we cannot support and breadth is their game. The second addresses the actual near-term competitive threat, which is not Claridy: ledgerbotje.nl is a live Exact Online MCP connector from €39 per month with 14 days free and no credit card, bilingual, supporting more assistant clients than we list. Our release article already documents checkable detail nobody else has, including that Microsoft 365 Copilot cannot add a connection by address and needs a packaged install. Reuse the existing captures in `public/kennisbank/mcp-release-nl.png` and `-en.png` so no new Playwright run is needed.

*Note on scope.* Do **not** write a comparison page naming ledgerbotje, exactonlinemcp and praatmetjeboekhouding with prices and check dates. Their prices change, our dates rot, and it hands outbound links and free brand mentions to four smaller competitors in a market small enough that they are plausible partners. Also drop e-facturatie, UBL and Peppol from any "uncontested ground" list: Claridy mentions UBL 20 times and Peppol 16 times in their corpus and cover the EU mandates in depth.

*First three steps.* (1) Add both route pairs to `routes` and `articleRoutes`. (2) Write `src/data/integrations.ts` with an Exact Online Premium anchor section and a "Waar het ophoudt" section naming real boundaries. (3) Write the MCP article at 600 to 900 Dutch words, author Jan-Willem, using existing screenshots as figure blocks.

*Files.* `src/lib/site.ts`, `src/data/integrations.ts`, `src/components/pages/IntegrationsPage.astro`, `src/pages/koppelingen.astro`, `src/pages/en/integrations.astro`, `src/data/articles.ts`, `public/llms.txt`.

*Effort.* Medium.

*Signal it worked.* Search Console impressions for "exact online mcp", "exact online chatgpt koppelen" and "exact online api limieten" within eight weeks. A booked call that mentions either page is worth more than any impression number.

---

### Marketing

**M1. Lead with the job, and name who we are not for.**

*The play.* Rewrite the homepage hero from a description of our org shape to a statement of what changes for the buyer, and add a two-column block naming who we serve and who should go elsewhere.

*Why for us.* `heroSub` currently opens "DataFlowr is een integratie- en automatiseringspartner voor Exact Online". Claridy's opens "Het intelligente systeem dat je crediteuren, debiteuren en bankafletteren draait". A controller with both tabs open learns from one what changes on Monday and from the other what our org chart looks like. The disqualification half does real commercial work for a two-person firm: it stops unqualified calls before they are booked. `CLAUDE.md` already prescribes the mechanic and we execute it at feature level (RPA is sold as "Altijd als brug, nooit als eindoplossing") but never at buyer level. Also delete `darkTileSub` "Dat maakt ons uniek als Exact Online partner." It is an unevidenced superiority claim sitting on top of four concrete ones that carry the argument alone, and it is the kind of enthusiasm the copy rules forbid.

*First three steps.* (1) Rewrite `heroSub` and `whyTitle` in both `nl` and `en` so the outcome comes first. Draft: "Uw maandafsluiting, uw koppelingen en uw terugkerende handwerk lopen zonder dat iemand ze duwt. Wij bouwen dat in Exact Online Premium en houden het draaiend." (2) Add the fit and non-fit block between the services section and the Claire section. Non-fit items that are true today: not on AFAS, NetSuite or Dynamics; if a change of accounting package is on the table, do that first; if you only need invoice scanning, a standard package is cheaper than us. (3) Add one ICP sentence to `public/llms.txt`, which currently carries none.

*Files.* `src/components/pages/HomePage.astro`, `public/llms.txt`.

*Effort.* Low.

*Signal it worked.* Fewer booked calls that end in "you are not the right fit", and more that open with the prospect naming their administration count unprompted. Track this by hand in a shared note: with two founders that is a reliable count.

---

**M2. Claim the one credential we hold, show the product we built, and delete every claim we cannot evidence.**

*The play.* Put the Exact Online Premium Partner status on the site. Move three real screenshots onto `/claire`. Remove `footerMeetItems`, fix the read times, cut "hyperautomation", and resolve the Auth0 contradiction.

*Why for us.* We have zero external proof on a site whose whole differentiation is precision, while holding a verifiable third-party credential that appears nowhere in `src/` or `public/`. Meanwhile `/claire` is 1776 lines with no product image and proves itself with hand-built tables it then labels fictional, while 20 real captures sit visible only to someone already reading an article. And `footerMeetItems` is the only unverifiable assertion on the site: three event names, unlinked, undated, nothing behind them. Removing it costs nothing and protects everything else. Do **not** fill a homepage proof band with shape-anonymised engagement figures ("een groothandel op Exact Online met drie administraties"): that is Claridy's fabricated-specificity move wearing our clothes, and it forfeits the one axis where we beat them.

*First three steps.* (1) Confirm the Premium Partner status with Exact directly, not from a LinkedIn post, then add it to `AboutPage.astro`, `services.ts` and `llms.txt`. (2) Place `mcp-release-close` beside the maandafsluiting section, `mcp-release-audit` beside the security section, and `mcp-release-app-view` beside the capabilities section on `/claire`, each with a caption stating what the reader is looking at. (3) In one commit: delete `footerMeetItems` and its render, correct the five read times to roughly 200 words per minute (or derive them from the block text so they can never drift again), replace "hyperautomation" in `BaseLayout.astro` and `llms.txt` with the concrete scope, and reconcile Auth0 across `legal.ts`, `llms.txt` and the release article. `legal.ts` is a legal document and has to be correct, not merely consistent.

*Files.* `src/components/pages/AboutPage.astro`, `src/components/pages/ClairePage.astro`, `src/data/services.ts`, `src/data/articles.ts`, `src/lib/site.ts`, `src/components/FooterFull.astro`, `src/layouts/BaseLayout.astro`, `src/data/legal.ts`, `public/llms.txt`.

*Effort.* Low.

*Signal it worked.* A prospect references the partner status or a screenshot on a call. Negative signal to watch for: nobody asks "do you have customers", which today they should be asking.

---

**M3. Answer the determinism frame on the product page, and make "Waar het ophoudt" a house pattern.**

*The play.* Move the calculation-layer paragraph from `src/data/articles.ts:145` onto `/claire` as its own section, and add an optional `limits` field to `ServiceContent`, filled where a real boundary exists.

*Why for us.* Claridy has spent an entire site pre-framing any LLM product as drift-prone and non-auditable: "In het uitvoerende pad zit geen taalmodel", "Er is geen modelupdate die stilletjes je boekingsgedrag verandert". Our answer is better than theirs because it is honest about the model being present and then bounds what it may do. It is currently filed in a knowledge-base article while `/claire` says only "een vaste reeks deterministische controles". Separately, we cannot claim candour as a differentiator while one service page in six names a boundary and Claire hedges once with "vrijwel elk onderdeel". Make `limits` optional, not required: a forcing function across six services produces filler on four of them.

*Truth check before shipping.* Verify that "het rekenwerk gebeurt niet in het taalmodel, maar in een rekenlaag die deterministisch en herleidbaar is" still holds for the current build. If the model composes queries or tool arguments, "deterministisch" needs narrower wording. Getting this wrong on a product page, against a competitor who has pre-framed exactly this objection, is worse than saying nothing.

*First three steps.* (1) Run the truth check with Jan-Willem and settle the exact wording. (2) Add a section to `/claire` headed "Wat het model wel en niet doet", stating that the model reads the question and phrases the answer, the calculation layer answers the same question the same way every time, and changes are staged as proposals pending approval. (3) Add `limits?: { title: string; items: string[] }` to `ServiceContent`, render it before the closing CTA, and write three or four items each where a real boundary exists. Where none does, leave it empty rather than inventing one.

*Files.* `src/components/pages/ClairePage.astro`, `src/data/services.ts`, `src/components/pages/ServicePage.astro`, `src/data/articles.ts`.

*Effort.* Medium.

*Signal it worked.* The model-drift objection stops arriving cold on calls. A prospect who has read a competitor's security page arrives already knowing our answer.

---

### Sales

**S1. Publish a fixed-price Quick Scan on a real pricing route, and give Claire's tiers a URL.**

*The play.* Create `/prijzen` and `/en/pricing`, carrying Claire's four existing tiers plus one productised, fixed-fee Quick Scan with a named deliverable.

*Why for us.* A prospect can price Claridy to the euro before calling and cannot price us at all, and Claridy is teaching this market that implementation is included in a monthly fee. Our answer is not to match a subscription price but to put a number on the first step, so the 30-minute call ends with something to buy. Publishing a price is also what licenses everything else we say about cost. And Claire's four public prices currently cannot be linked, cited or ranked, because they live as `<section id="pricing">` inside `/claire`.

*What not to publish.* No Delivery day rate, no maintenance band. A published day rate anchors every negotiation to the bottom of it, invites rate-shopping against ZZP architects at half our number, and destroys value-based pricing on the exact engagements (multi-entity migration, M&A consolidation) where value is not proportional to days. Claridy can publish because they sell fixed scope at near-zero marginal cost. We do not.

*First three steps.* (1) Add `pricing: { nl: '/prijzen', en: '/en/pricing' }` to `routes` and move the tier data out of `ClairePage.astro` into `src/data/pricing.ts` so both pages read one source. (2) Define the Quick Scan: a fixed fee, a named deliverable ("een procesplaat, een lijst knelpunten met de doorlooptijd erbij, en een offerte met fasering en prijs"), and the risk reversal a consultancy can honestly offer, which is that the document is the client's whether they continue or not. (3) Repeat the "who this is not for" block from M1 on the page, and emit `Offer` schema for the four Claire tiers.

*Files.* `src/lib/site.ts`, `src/data/pricing.ts`, `src/components/pages/PricingPage.astro`, `src/pages/prijzen.astro`, `src/pages/en/pricing.astro`, `src/components/pages/ClairePage.astro`, `src/components/pages/ServicePage.astro`, `src/components/SiteNav.astro`, `public/llms.txt`.

*Effort.* Medium.

*Signal it worked.* Quick Scans sold. That is a revenue number, not a proxy. Secondary: calls arrive with the price already accepted rather than asking for it.

---

**S2. Build the security and trust page from facts we already hold.**

*The play.* One page at `/beveiliging` and `/en/security`, assembled from section 7 of `src/data/legal.ts` and the Claire security section.

*Why for us.* Claridy runs `/beveiliging` as a sales asset aimed at the controller, the CFO and the accountant standing behind them. Every fact we need is already written in the repo and is currently reachable only by reading a privacy statement. This is assembly, not authorship: the cheapest credibility win available.

*How it must be written.* Claim no certification. Name no audit we have not had. State plainly that we hold no SOC 2 report and no ISO 27001 certification, and say what is available on request (the verwerkersovereenkomst and the subprocessor list). Say explicitly that OpenRouter routes questions to a model, because "geen schaduwkopie" is a storage claim and a controller will hear it as something broader. The honest-absence pattern is the part of Claridy's page worth copying; the certification is not available to us and pretending otherwise would be the one unrecoverable mistake.

*First three steps.* (1) Add `security: { nl: '/beveiliging', en: '/en/security' }` to `routes` and create `src/data/security.ts`, pulling in TLS, OAuth so the client never hands over an Exact Online password, production access limited to the people who need it, and per-user logging. (2) Move the three security items out of `ClairePage.astro` into the same data file so the two pages cannot drift. (3) Link it from the Claire security section, from the governance deliverable on the Exact Online Premium service page, from the footer, and from `llms.txt`.

*Files.* `src/lib/site.ts`, `src/data/security.ts`, `src/components/pages/SecurityPage.astro`, `src/pages/beveiliging.astro`, `src/pages/en/security.astro`, `src/components/pages/ClairePage.astro`, `src/components/FooterFull.astro`, `public/llms.txt`.

*Effort.* Low.

*Signal it worked.* Security questionnaires arrive already half-answered, or stop arriving. A prospect's IT lead joins the second call rather than blocking the first.

---

**S3. Repair the conversion path, and speak to the segment our €749 tier already serves.**

*The play.* Four small fixes to the one funnel we have, plus one copy change that opens a channel.

*Why for us.* Every conversion on all 32 URLs depends on `assets.calendly.com` loading inside a bare div in `AboutPage.astro`. If that script is blocked, the section renders an empty 700px box. The founder mailtos and the phone number are elsewhere on the page, so it is not as bare as it first appears, but the widget itself has no fallback. The calendar belongs to one founder and the English mirror embeds the same Dutch-language link. The English CTA vocabulary is flattened: "Plan een kennismaking" and "Neem contact op" both become "Get in touch", so one English label does two jobs. And the €749 Kantoor tier, described only as "Voor intensief gebruik op kantoorschaal", is an accountancy-firm product aimed at the exact segment Claridy disqualifies in writing, which we have never addressed in a sentence.

*What not to build.* No contact form and no `api/contact.ts`. The build is fully static with no adapter; a serverless endpoint means mail integration, spam handling, deliverability, a response-time promise we then have to keep, and an amendment to the processor list in a legal document. Mailto plus phone plus Calendly already converts for two people.

*One decision to make before writing the copy.* Selling the Kantoor tier to accountancy firms while also selling consultancy directly to the companies those firms serve is a channel conflict. Decide which we are before the copy goes live.

*First three steps.* (1) Put a plain link to the Calendly URL, both mailtos and the phone number inside the widget container in the markup, so a blocked script still converts. (2) Create a second Calendly event type and an English-language one, and add both to `src/lib/site.ts` so `/en/about` stops booking a Dutch single-owner calendar. (3) Split the flattened English CTA labels, and rewrite the Kantoor tier line to name the buyer ("Voor accountants- en administratiekantoren, over al uw klantadministraties") with one supporting paragraph on the two facts a firm cares about: each user connects with their own Exact Online account under their own permissions, and every action is logged under that user. Both are already true and already stated elsewhere on the page.

*Files.* `src/components/pages/AboutPage.astro`, `src/lib/site.ts`, `src/components/pages/HomePage.astro`, `src/components/pages/ServicePage.astro`, `src/components/pages/ClairePage.astro`, `src/data/services.ts`, `public/llms.txt`.

*Effort.* Low.

*Signal it worked.* Bookings on the second calendar, and at least one enquiry from an accountancy or administratiekantoor within a quarter. Calendly reports bookings without any client-side script on our site, so this is measurable within the no-analytics commitment.

---

## 7. Sequencing: 30 / 60 / 90 days

**Days 1 to 30. Fix what is wrong, then build the hub.**

Highest-leverage item first: **C1, the knowledge-base hub and the template unblock.** Nothing else in the content plan can ship until `hero` is optional and the hub exists. It is one working day of data-file edits and it is the only structural defect worth fixing on our side.

In the same window, ship the cleanup half of **M2** as a single commit on day one: delete `footerMeetItems`, correct the read times, cut "hyperautomation", reconcile Auth0, and add Claire's four prices and all five article URLs to `llms.txt`. Then the three quick items in **S3**: the Calendly fallback in markup, the second and English calendar, and the split CTA labels. Then **M1**, the hero rewrite and the ICP block, which is copy in one file.

Start the Premium Partner verification with Exact now, because it has a lead time we do not control.

**Days 31 to 60. Publish the trust and price surfaces.**

**S2**, the security page, then **S1**, the pricing route with the fixed-price Quick Scan and Claire's tiers. Run the determinism truth check with Jan-Willem and ship the **M3** paragraph onto `/claire` alongside it, because a CFO who reads the security page will ask that question next. Add the `limits` field where boundaries genuinely exist.

Add **C2**, the FAQ block type, at the end of this window: it is low effort, and by then there are hub pages and a pricing page for the answers to point at.

**Days 61 to 90. Publish on the ground nobody holds.**

**C3**: the `/koppelingen` Premium API depth page first, then the MCP connection article. Add the Smart Closing guide as the third piece if and only if the first two are done and the pipeline holds. Two genuinely new pieces a month beats sixteen in ten days: Claridy's "Laatst gecontroleerd" stamps all decay together in August 2026 and ours will not.

Do not attempt an events programme, a competitor comparison page, an ROI calculator or a research asset inside 90 days. Each is a project wearing a website recommendation's clothes.

---

## 8. What not to copy from Claridy, and why

**The six-page "alternatief voor X" farm and the five overlapping `/vergelijk/*` pages.** Eleven competitor-targeted pages with dated price checks is not a two-person workload, and it is not working for them: searches for "alternatief voor Blue10", "alternatief voor Basecone" and "alternatief voor Zenvoices" return no Claridy result on page one, held instead by Capterra, TriFact365 and Glimps. They have also cannibalised themselves by targeting Blue10, Basecone, ScanSys and Zone twice on two URL patterns. More importantly, our buyer's incumbent is not a software package: it is their current Exact partner, their accountant, or doing nothing.

**Any page whose function is to make an Exact partner's clients doubt them.** We sell into an ecosystem where other partners and accountancy firms are a primary referral source. Claridy can burn that goodwill because they are a funded outsider with no App Centre listing to protect. Our distribution depends on being liked inside the ecosystem. Fold the useful half, what we do that a licence reseller does not, into the ICP block instead.

**The invented "drie generaties techniek" taxonomy.** It places them alone at the top by construction, and the second column of every comparison table decides the outcome before a single feature is read. Controllers and accountants will spot the trick, and when they do it costs the credibility of the whole page.

**Fabricated UI mockups presented as real.** Heeren Bouwgroep BV, PO-2026-114, grootboek 4310, "IBAN ongewijzigd sinds 2024-11-02", none of it labelled as illustrative. We have the real product. Being the only party whose screenshots can be checked is the asset, and one fabricated panel would forfeit it permanently.

**Unattributed outcome statistics.** 85%, 12 sec, "+22 uur per maand terug naar je team", "95% matchpercentage", stated with no customer, no sample size and no method. Their weakest surface, and forbidden by our own rules. Where we have no measured number, delete the stat band rather than filling the slot: `results` is already optional in `ServiceContent` and the Exact Online Premium page already omits it.

**A euro-output ROI calculator.** Theirs is well designed, ungated, and subtracts its own price to land on a modest figure. It is also underwritten by a self-published, self-classified vacancy analysis that appears as 21.642 on the site and 24.078 in `agent-data.json`, with the method given as "taken geclassificeerd met AI volgens onze eigen rubriek". We would have nothing behind the coefficients. A form that manufactures a plausible euro figure from invented defaults is a fabricated claim with an input widget on top, and a controller who reverse-engineers the defaults will see it.

**llms-full.txt, a generator script, and a twelve-crawler robots.txt.** Their llms-full.txt is 68 KB because they have 20 articles; ours would be roughly 20 KB duplicating content already crawlable at clean static URLs. Our `robots.txt` is `User-agent: *` / `Allow: /`, so every named crawler is already fully permitted; adding twelve redundant stanzas and a non-standard `LLMs-Txt:` directive changes crawler behaviour by exactly zero. Hand-edit the 55-line `llms.txt` instead. That is ten minutes and it is the version that actually matters.

**Batch publishing.** Sixteen articles in ten days, nine on one day, every check date landing in the same month. Two pieces a month, dated honestly, will look fresher than their library within a quarter.

**Informal "je".** It is the first thing a reader notices with both tabs open. Theirs reads as a subscription addressing a user; ours reads as a firm addressing a client. That fork is worth defending, not closing.

**And one thing we should stop believing about them.** Their sitemap is complete, all 42 pages. We do not have an SEO hygiene advantage, and any argument built on one should be discarded before it reaches copy.
---

## Appendix: how this was produced

17 research agents read all 42 indexable pages on claridy.ai (including the sitemap,
llms.txt, llms-full.txt, agent-data.json and robots.txt), all 32 live URLs on
dataflowr.nl, and the copy data files in this repo. Findings went through a
three-lens critique pass (feasibility, fact-check, positioning) before this
document was written, so recommendations the sceptic cut are absent by design.
See section 8 for what was deliberately rejected.

A formatted version of this document is published as a private Claude artifact:
https://claude.ai/code/artifact/a0d2c198-54c1-46fb-ba59-795c62ec8c4f
