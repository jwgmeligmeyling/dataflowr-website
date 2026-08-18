# DataFlowr vs iWebdevelopment (Exact AI Connect): competitive assessment and action plan

Prepared 18 August 2026, commissioned as a full scan of
`https://www.iwebdevelopment.com/exact-online/ai-mcp-koppeling`.

One naming correction before anything else. That page is not Finance MCP. It is
iWebdevelopment's own product, Exact Online AI Connect. Finance MCP
(financemcp.nl, Productivity Advisors BV) is a different vendor, one of seven
that iWebdevelopment's own comparison blog ranks. Both were scanned:
iWebdevelopment is the primary subject of this document and Finance MCP appears
as market context, because the strategic picture only makes sense with the
whole field in view.

This document is a companion to `docs/concurrentieanalyse-claridy.md`
(15 August 2026) and continues its numbering: the recommendations here are
C4–C5, M4–M5 and S4–S5. The standing decisions in that document (no competitor
comparison pages, no forms, no published day rate, no invented proof) are
treated as binding unless new evidence overturns them; one is re-tested below
and survives. Since that document was prepared, three of its findings have been
overtaken by shipped work: the `/kennisbank` and `/diensten` hubs exist, read
times are derived from word count, and `/contact` plus `/ondersteuning` are
live. The baseline here is the repo as of 18 August.

Repo facts verified against `/home/user/dataflowr-website`. Competitor facts
verified against live fetches of iwebdevelopment.com, financemcp.nl and
praatmetjeboekhouding.nl on 18 August 2026. Prices are as served that day and
will rot; no recommendation below depends on a price staying put.

---

## 1. What iWebdevelopment is

iWebDevelopment (a trading name of Codex Connectors B.V., KVK 63591545) is an
established connector shop: its catalogue is e-commerce and administration
integrations (WooCommerce among others) for Exact Online, AFAS, Twinfield and
Multivers. Exact Online AI Connect is its MCP product, and it is the first
competitor we have assessed that stands in Claire's own category. Where Claridy
sells a closed platform that keeps the language model out of the execution
path, iWebdevelopment sells the thing closest to Claire: an MCP connector that
puts ChatGPT, Claude, Gemini, Copilot or Perplexity in live conversation with
the administration, reading and, after approval, writing.

The landing page is built to convert cold search traffic. The H1 is the
category head term itself ("Exact Online AI koppeling"), the promise is
benefit-cadence ("Eén vraag vervangt tien klikken in Exact Online", "Binnen 2
minuten aan de slag. Geen technische kennis nodig."), and the page carries a
complete self-serve machine: a 30-day free trial, a demo booking on a named
employee's calendar, a free 30-minute advisory call, an onboarding modal
(package, assistant, e-mail address), a full pricing table with staffels, a
nine-question FAQ accordion and a worked live example (a cashflow question
answered with concrete amounts, sourced "Exact Online · live opgehaald").

| Attribute | Exact AI Connect |
|---|---|
| Company | Codex Connectors B.V., trading as iWebDevelopment. KVK 63591545 |
| Category | "Exact Online AI koppeling": the search term is the H1 |
| Scope | Six domains: financieel, voorraad en magazijn, verkoop- en inkooporders, klanten en leveranciers, productie en assemblage, analyses en overzichten. Read plus write; every write action requires user approval |
| Assistants | ChatGPT, Claude, Gemini, Copilot, Perplexity, named with logos |
| Packages | Exact Online plus sibling products for AFAS, Twinfield and Multivers |
| Pricing | Per user per month: Essentials € 29, Analytics € 79, shown with a 10% annual-billing discount (€ 26,10 / € 71,10). First administratie included; extra administraties € 15–25 each, staffeling down to € 10–15 from 26 administraties, applied retroactively. Request caps: 5.000 per month (Essentials, translated on the page as "75–100 vragen per werkdag") and 15.000 (Analytics) |
| Trial and terms | 30 dagen gratis, geen opstartkosten, maandelijks opzegbaar |
| Trust surface | ISO 27001 gecertificeerd, "onafhankelijk gepentest", "officieel Exact partner", "Exact Online tested and approved" |
| Content | Kennisbank with a ~2.500-word technical explainer and per-assistant setup guides in the nav; a blog including a seven-vendor comparison (27 July 2026) and a "ChatGPT vs Claude" piece |
| Languages | NL, EN, DE, FR |
| Register | Informal "je", benefit-led, reassurance-heavy |

---

## 2. The field this page sits in

iWebdevelopment's own roundup ("De beste AI-koppelingen voor Exact Online in
2026 vergeleken", 27 July 2026) ranks seven vendors: Exact AI Connect, Praat
met je Boekhouding (Chef Data), Ledger Botje (Industrial IT), Finance MCP
(Productivity Advisors), CData, Zapier and Invantive. Claire is not in the
list. The blog is deliberately balanced, names its own bias, and praises
competitors where due; it is a trust play that only the list's incumbent can
afford.

| Vendor | Shape | Entry price, as served 18 aug | Trial |
|---|---|---|---|
| Exact AI Connect (iWebdevelopment) | Read + write with approval, six domains, five assistants, four packages | € 29 per gebruiker per maand | 30 dagen |
| Finance MCP (Productivity Advisors BV) | Read-only by design, eight packages, one unified data model | € 25 per koppeling per maand (1 administratie, 3 gebruikers); Kantoorbundel € 199 (25 administraties, 15 gebruikers) | 14 dagen |
| Praat met je Boekhouding (Chef Data B.V.) | Read-only by default, write per administratie on Pro; 10+ clients including Grok, Mistral, Perplexity and Cursor | Gratis (~60 vragen per maand), Starter € 19, Pro € 49 | Permanent gratis instapplan |
| Ledger Botje (Industrial IT) | Depth in handel, voorraad en productie | € 39 per maand (per the 15 August Claridy assessment) | 14 dagen, no card |
| CData, Zapier, Invantive | Generic and enterprise connectors; Invantive claims ~1.235 tables | Not comparable here | |
| Claire (DataFlowr) | Read free, write after approval, scheduled agents, three documented clients plus "elke MCP-client" | € 99 per maand | None |

Two field observations matter beyond the table. First, Finance MCP is the
security-narrative benchmark: read-only as a design promise ("Er bestaat in
FinanceMCP geen enkele functie die iets naar je boekhouding schrijft"), no data
stored, Azure West-Europe, OAuth 2.1 with PKCE, a verwerkersovereenkomst in the
standard terms, and a roadmap that refuses dates ("We noemen bewust geen datums
en beloven liever wat we waarmaken dan een agenda"). It holds no certification
and sells trust anyway. Its roadmap plans write actions "met een eigen,
expliciete toestemmingsstap", so our write-with-approval edge over the
read-only half of the field erodes over time. Second, the search surface is
already settled: a US-index search on 18 August for the category's
plain-language query returned three results for Praat met je Boekhouding,
three for iWebdevelopment, one for Chef Data's blog and none for us, and the
branded query "dataflowr" still lands on the INRIA deep-learning course
(Claridy assessment, item 9). Answer engines fed by these pages will reproduce
the same set.

---

## 3. Side by side: Claire vs Exact AI Connect

| Dimension | Claire (DataFlowr) | Exact AI Connect (iWebdevelopment) |
|---|---|---|
| Framing | "De AI-collega van DataFlowr", "de AI-laag boven op Exact Online". The product page's meta title contains no category term; "koppeling" appears on the page only as the name of the OAuth step (`ClairePage.astro:41`, `:227`) | The category head term is the H1; the subhead states the job ("Wat als je je boekhouding gewoon iets kon vragen?") |
| Product shape | Chat plus autonomous agents on a schedule (maandafsluiting, cashflow-band, debiteurenbeheer), a Make/n8n/Zapier building block, an iOS app | Question in, answer or approved action out, across six domains. Nothing runs on a schedule; nothing arrives unasked |
| Scope | Finance jobs, Exact Online only | The whole ERP surface including voorraad and productie, across four packages |
| Assistants | Claude, ChatGPT, Microsoft Copilot documented per client, plus "elke MCP-client · wisselen kan altijd"; the Copilot agentpakket detail is documented (`docs.ts:464`) | Five assistants named with logos |
| Write model | "Lezen vrij, schrijven na akkoord"; every change staged as a proposal | Same shape: every write action requires approval |
| Determinism story | Written and honest: the rekenlaag argument (`articles.ts:145`), still filed in an article rather than on `/claire` (M3) | None. The model reads and answers |
| Pricing | Flat tiers € 99 / € 299 / € 749 / offerte, monthly cancellable, self-serve checkout; no URL, no trial, included usage undefined publicly | Per user with administration staffels and request caps, 30 days free, all of it published and legible |
| Trust surface | Named founders, photos, KVK, real screenshots (visible only in articles and docs) | ISO 27001, independent pentest, two Exact badges |
| Conversion | One founder's Calendly plus a € 99 checkout | Trial signup, demo on a named calendar, advisory call, onboarding modal |
| Content | Five kennisbank articles (~3.150 words), twelve docs pages including four per-assistant guides kept out of the nav | Per-assistant guides in the nav as acquisition pages, a technical explainer, a comparison blog that defines the category's consideration set |
| Languages | NL + EN | NL, EN, DE, FR |

---

## 4. The five sharpest differences

**1. They sell a connector; Claire is a colleague with a firm behind it.**
Their product answers when asked. Claire also works unasked: the closing agent
with its fixed series of deterministic checks, the cashflow band, scheduled
debiteurenbeheer. And the same two people who built it fix the inrichting when
an answer exposes a problem, which the six service pages already sell. A
connector shop has to treat the administration as given; a connector on a badly
configured administration produces faster wrong answers. Neither site states
this difference today, and ours is the only one that can.

**2. Everyone in the category can be tried for free except Claire.** Thirty
days at iWebdevelopment, fourteen at Finance MCP and Ledger Botje, a permanent
free tier at Praat met je Boekhouding. Claire's cheapest first touch is € 99
and a checkout. For a self-serve product sold inside a chat window, this is the
single most expensive gap on our side.

**3. Their trust surface is certified; ours is personal.** ISO 27001, an
independent pentest and two Exact badges, against two founders with
photographs and a KVK block. Founder-led trust is real and the Claridy
assessment was right to defend it, but this competitor shows the version a CFO
can verify without meeting anyone, in the exact category where Claire sells.
Meanwhile the one credential we do hold, Exact Online Premium Partner, is still
unpublished (Claridy M2, pending verification with Exact).

**4. The consideration set is being written without us.** Their July 2026
roundup ranks seven vendors and we are not one of them. The SERP for the
category head term belongs to Praat met je Boekhouding and iWebdevelopment. Our
own four per-assistant connect pages carry exactly the right titles ("Claude
koppelen aan Exact Online", `docs.ts:224`, `:344`, `:464`, `:582`) and sit
deliberately outside the nav, unlinked from any marketing page, while the
product page's meta title does not contain the word "koppeling" at all.

**5. Two pricing shapes that win in different rooms.** One user, light use:
they cost € 29 and we cost € 99. A five-person finance team on their Analytics
tier costs € 395 per month before administration staffels, inside a
15.000-request cap; Bedrijf is € 299 flat with five administraties included.
Neither pricing surface makes this legible today, and ours does not even have
a URL (Claridy S1).

---

## 5. Where we are genuinely behind, ranked

1. **No riskless first touch.** The category convention is try-before-you-pay
   and we are the only vendor without one. See M4.
2. **No third-party-verifiable trust, against a competitor who has it.** The
   Claridy version of this item faced a scoped CASA certificate; this one faces
   ISO 27001 plus a pentest plus Exact's own badges. One mitigating unknown:
   the repo's route comments show the Exact Online App Store review shaped
   `/contact` and `/ondersteuning` (`site.ts:141-149`) and name shipped
   marketplace submissions (`site.ts:160-166`), so we may already hold, or be
   close to, the one badge in this ecosystem a buyer can verify with Exact
   directly. Listing status: **not verified** from the repo. See S5.
3. **Invisible at the moment of comparison.** Absent from the roundup that
   defines the consideration set, absent from the SERP, and the category
   vocabulary is absent from our own product page. See M5 and C5.
4. **The per-assistant guides are buried.** Keeping the docs out of the nav is
   a deliberate support decision (`site.ts:147-151`), but it currently also
   keeps our four best acquisition pages unreachable from every marketing
   surface. Competitors run the equivalent pages as their main landing pages.
   See C4.
5. **Included usage is opaque.** They publish request caps and translate them
   into questions per workday; our public answer is the undefined "maandbudget
   voor agentwerk" (`docs.ts`, abonnement page). In a category that publishes
   caps, opacity reads as a trap. See S4.
6. **The kantoor segment is being priced for by others.** Their "Voor
   accountants" section staffels per administration; Finance MCP sells a
   Kantoorbundel at € 199 for 25 administraties and 15 users. Our € 749
   Kantoor tier remains one line with no named buyer. This reinforces Claridy
   S3 and adds a price-position question that document did not have.
7. **Two languages against their four.** Noted, not actioned: German and
   French mirrors fail the two-person sustain test.

---

## 6. Where we are genuinely ahead

1. **Product depth in the finance jobs.** The closing agent with deterministic
   checks and "JIJ BESLIST", the cashflow band, the debiteuren flows, the iOS
   app. Their six domains are wide and shallow: "lezen, schrijven en analyses
   in één" is a capability list, not a finished job. Nothing on their page runs
   on a schedule.
2. **The consultancy behind the product.** Connector shops stop at the API. We
   sell inrichting, integraties and governance around the same administration
   (`services.ts`). Better data in, better answers out is a claim only we can
   make in this field, and it is also the honest rebuttal to "one question
   replaces ten clicks": the question is only as good as the administration
   under it.
3. **The determinism answer, already written.** Against Claridy it bounds the
   model; against connector vendors it explains why Claire's numbers are
   reproducible when a bare connector's arithmetic is whatever the model does
   that day. It still sits in an article instead of on `/claire` (M3 stands,
   and gains a second audience).
4. **Flat pricing at team scale.** No per-user meter, no per-administration
   staffel arithmetic, no request-cap anxiety. Simplicity is a position; S4
   makes it legible.
5. **Real, checkable product evidence.** Forty-two live captures and a
   repeatable pipeline. Their page describes a demo conversation; we can show
   the product, and currently do so only in articles and docs (Claridy M2).
6. **100% Exact Online.** Their four packages mean every package-specific
   behaviour must stay generic. The structural argument from the Claridy
   assessment holds unchanged, against a much closer competitor.

---

## 7. Recommendations

Six new ones, numbered as a continuation: two content, two marketing, two
sales. Each was tested against the same question as before: can we say it
truthfully today, and can two people sustain it. The no-analytics constraint
from the Claridy assessment applies to every measurement note below.

First, five standing recommendations that this scan makes more urgent, with
what changed:

- **C2 (FAQ block + FAQPage schema).** Their landing page runs a nine-question
  FAQ accordion; ours cannot author one. The product is sold inside the
  assistants that read this schema.
- **S1 (pricing route + Quick Scan).** Two direct competitors publish complete
  staffels; a category norm of total price legibility is forming while Claire's
  four prices still have no linkable URL.
- **S2 (security page).** The gap is no longer "no page versus a page": it is
  no page versus ISO 27001 and a pentest presented as sales assets. The
  honest-absence pattern survives; S5 adds the one purchasable fact.
- **S3 (kantoor copy + conversion fixes).** Two competitors now court kantoren
  with dedicated sections and staffels. The channel-conflict decision S3
  demands is now also a price-position decision (€ 749 against a € 199 bundle
  shape).
- **M1 (job-first hero + ICP).** Their hero states the job in one line. Ours
  still opens with what we are.

### Content

**C4. Link the per-assistant connect pages into the marketing surface.**

*The play.* Keep the docs out of the nav (the standing decision and its reason
stand, `site.ts:147-151`), but link them where buying intent lives: make the
three assistant pills on `/claire` (Claude, ChatGPT, Microsoft Copilot) links
to the matching connect page, add a compact "Handleidingen" row to the
`/kennisbank` hub listing the four guides, and cross-link them inline from the
two MCP articles.

*Why for us.* The four pages with exactly the right titles for the queries this
market types already exist and are already indexable; they are reachable today
only via the support page and the footer. Competitors run the same pages as
their primary acquisition surface. This is linking work, not writing work, and
it changes what a crawler and a prospect can reach from the money pages.

*First three steps.* (1) Wrap the assistant pills in `ClairePage.astro` in
links with descriptive aria-labels. (2) Add the guide row to the kennisbank hub
under the article cards. (3) Add inline links from the `wat-mcp-is` and
`mcp-release` article bodies to the matching guides.

*Files.* `src/components/pages/ClairePage.astro`, the kennisbank hub page
component, `src/data/articles.ts`.

*Effort.* Low.

*Signal it worked.* Search Console impressions for the four docs URLs on
"koppelen"-shaped queries within eight weeks.

---

**C5. Publish the buyer's guide the roundups cannot be: criteria, no names.**

*The play.* One article, "Een AI-koppeling voor Exact Online kiezen: waar je op
let", walking the questions a controller should put to any vendor, including
us: leest het of schrijft het, en wie keurt schrijven goed; draait er iets
zonder dat je het vraagt, of alleen als je vraagt; waar gebeurt het rekenwerk;
ontstaat er ergens een kopie van je administratie; wat kost een team, niet één
gebruiker; wat gebeurt er bij een vragenlimiet; en wat gebeurt er als de
administratie zelf het probleem is.

*Why for us.* The Claridy C3 scope note (no comparison page naming vendors,
prices and check dates) was re-tested against the new evidence and survives:
iWebdevelopment can afford magnanimity because it is the incumbent of the list
it writes; we would be donating mentions and maintaining price data that rots.
But the consideration set is being defined in exactly such pages, so we need
the page an answer engine can cite that frames the choice without naming
anyone. Criteria do not rot. Every question in the list is one our product
answers structurally, which is the honest version of writing your own
comparison.

*First three steps.* (1) Write it at 700–900 Dutch words, author Jan-Willem,
reusing existing captures as figures. (2) Give it the C2 FAQ block once that
ships. (3) Add both language URLs to `public/llms.txt`.

*Files.* `src/data/articles.ts`, `public/llms.txt`.

*Effort.* Medium.

*Signal it worked.* Impressions on "beste", "kiezen" and "vergelijken" query
shapes, and a first call in which the prospect uses our criteria unprompted.
Monthly manual check in Claude, ChatGPT and Perplexity, per the C2 routine.

---

### Marketing

**M4. Give Claire a riskless first touch.**

*The play.* Two options, one recommended. (a) A public demo administration: the
fictional environment that already produces every screenshot on the site is
exposed as a read-only MCP endpoint a prospect can add to their own Claude or
ChatGPT and interrogate for ten minutes, no account, no card. The site's share
of the work is one section on `/claire` ("Probeer Claire eerst op onze
demo-administratie") and a short guide under `/documentatie`. (b) A 14-day
trial on Individueel, matching the category floor. Option (a) first: it costs
no billing work, cannot be gamed into free production use, and nobody else in
the field offers hands-on without at least an e-mail address.

*Why for us.* Difference 2. The € 99 checkout asks for commitment at the exact
moment every competitor asks for nothing. A demo administration also converts
our most under-used asset (a maintained fictional environment with disclosed
fictional data) into the top of the funnel.

*First three steps.* (1) Founders confirm the demo environment can take
unauthenticated read-only MCP clients with rate limits; this is app-side work
outside this repo. (2) Add the section and endpoint instructions to `/claire`
and a docs page. (3) Fold the demo administration into `llms.txt` and the
aan-de-slag doc.

*Files.* `src/components/pages/ClairePage.astro`, `src/data/docs.ts`,
`public/llms.txt`. The app work dominates the effort.

*Effort.* Medium overall, low in this repo.

*Signal it worked.* Demo connections per week, counted server-side (compatible
with the no-analytics commitment), and checkouts that follow one.

---

**M5. Take the category's vocabulary without taking its register.**

*The play.* Say "AI-koppeling" and "MCP" where buyers and machines look first:
the `/claire` meta title and description (`ClairePage.astro:41-42`), one H2 on
the page, and the product paragraph in `llms.txt`. In the same pass, reconcile
the two speed claims: the hero says "Binnen een dag live" while the onboarding
says "Klaar in 2 minuten". Both are true of different things. Say precisely
that: de koppeling staat in minuten, live met agents en toegang per gebruiker
is een dag.

*Why for us.* We hold a product page that never names its own category. The
roundup authors, the SERP and the answer engines all classify by these words,
and competitors lead with "2 minuten" while our hero reads slower than our own
reality.

*First three steps.* (1) Retitle along the lines of "Claire, de AI-koppeling
die in je Exact Online administratie werkt", founders to settle the exact line,
and rewrite the meta description with "MCP" and "AI-koppeling" present.
(2) Give one section heading the term. (3) Split the speed claim into its two
truthful halves.

*Files.* `src/components/pages/ClairePage.astro`, `public/llms.txt`.

*Effort.* Low.

*Signal it worked.* Impressions for "exact online ai koppeling" and "exact
online mcp" appear at all; today both are structurally zero.

---

### Sales

**S4. Publish what each tier includes, in units a buyer can compare.**

*The play.* An amendment to S1's pricing page, and until it ships, to the
`#pricing` section on `/claire`. Per tier: the included maandbudget in
concrete terms (vragen per maand and agentruns, in whatever unit the app
actually meters), "geen opstartkosten" and "geen prijs per gebruiker" wherever
each is true, and the team arithmetic in one sentence: what a five-person team
costs with us, flat, without naming anyone else.

*Why for us.* Their caps come with a translation into questions per workday;
buyers will put the same question to us, and our only public answer is an
undefined budget. Opacity reads as a trap in a category that publishes caps,
and it wastes our best pricing property, which is that the number does not
move when the team grows.

*First three steps.* (1) Founders fix the included numbers per tier.
(2) Write them into the pricing data (the `/claire` section now,
`src/data/pricing.ts` once S1 lands) and the abonnement doc. (3) Emit them in
the `Offer` schema S1 already plans.

*Files.* `src/components/pages/ClairePage.astro`, `src/data/docs.ts`, later
`src/data/pricing.ts`.

*Effort.* Low once the numbers exist.

*Signal it worked.* The pricing question stops opening sales calls, and
self-serve checkouts arrive without a preceding call.

---

**S5. Buy one checkable fact; claim the one we may already hold.**

*The play.* Three moves of increasing cost. (1) Confirm the Exact App Store
listing status: if Claire is listed, the listing link goes on `/claire`, the
S2 security page and `llms.txt` the same day. It is the one badge in this
ecosystem a buyer can verify with Exact directly, iWebdevelopment shows the
equivalent ("Exact Online tested and approved"), and it costs nothing.
(2) Commission an independent pentest of Claire, scoped to the web app and the
MCP endpoint, and publish the summary letter on the security page. A one-off
budget item that converts the page from honest absence to one third-party
sentence. (3) Do not start ISO 27001: a certification programme fails the
two-person sustain test, and the honest-absence pattern covers the gap
truthfully.

*Why for us.* Difference 3. The security page S2 builds can be honest and still
contain nothing a stranger can check. Against this competitor, one verifiable
fact changes what the page does.

*First three steps.* (1) Founders confirm store status with Exact; the review
requirements already shaped `/contact` and `/ondersteuning`
(`site.ts:141-149`), so this may be a formality. (2) Collect two or three
pentest quotes. (3) Write the security page so either outcome slots in without
a rewrite.

*Files.* `src/components/pages/ClairePage.astro`, the S2 security page files,
`public/llms.txt`. Mostly a real-world decision, not a repo change.

*Effort.* Low in the repo; a budget decision outside it.

*Signal it worked.* The security page carries at least one externally
verifiable statement, and security questionnaires start citing it.

---

## 8. Sequencing against the existing 30/60/90

Fold into the standing plan rather than restarting it. Into the day-1 window:
M5 and C4, both titling and linking work measured in hours. S4 rides S1 when
the pricing route ships in the 31–60 window. C5 slots after C1 and C2 in the
61–90 window and can be one of that month's two pieces. M4's repo half waits
for the app half; start the app conversation now. S5's two confirmations
(store status, pentest quotes) have lead times we do not control: start both
this week and ship the copy whenever the facts land.

---

## 9. What not to copy from iWebdevelopment, and why

**The four-package platform.** AFAS, Twinfield and Multivers siblings are their
growth engine and would be our undoing. "100% focus op Exact Online" is the
position, and it is the one sentence a four-package shop can never say.

**Per-user pricing and request caps.** Metered pricing is their shape because
their cost is per call. Matching it would trade away the one pricing sentence
we own: the number does not move when the team grows. S4 makes that legible
instead of blurring it.

**The seven-vendor comparison blog.** Re-tested against the new evidence and
still rejected. It works for them as the incumbent of their own list; for us it
is donated attention and price data that rots. C5 is the substitute: the
criteria page that cannot rot and names no one.

**The five-assistant support matrix.** Gemini and Perplexity guides we have not
tested would break the claim-only-what-works rule. "Elke MCP-client · wisselen
kan altijd" plus three documented clients is the honest shape; a fourth guide
ships when a fourth client is actually tested.

**The e-mail-capture onboarding modal.** A form, a backend and a nurture
obligation. The standing no-form decision (Claridy S3) holds; the checkout
deep links and the M4 demo administration do the same job without the
machinery.

**Benefit-cadence copy.** "Wat als je je boekhouding gewoon iets kon vragen?"
converts, but it is the cadence our copy rules exist to avoid. The same promise
in our register is a concrete example with an amount and a date, which is what
the six Q&A cards on `/claire` already do. Take the vocabulary (M5), not the
voice.

---

## Appendix: how this was produced

Live fetches on 18 August 2026: the Exact AI Connect landing page, its
technical kennisbank article, the seven-vendor comparison blog,
financemcp.nl's home, prijzen, veiligheid and roadmap pages,
praatmetjeboekhouding.nl's Exact Online landing page, plus SERP checks for the
category head term and for our brand. Repo facts were verified by a repository
survey against the working tree on the same date; file and line references
throughout. This document deliberately repeats nothing from the Claridy
assessment except where new evidence changes an item's weight or adds a
decision to it.

A formatted version of this document is published as a private Claude artifact:
https://claude.ai/code/artifact/f94f4947-43b0-4060-9011-4d32db98f682
