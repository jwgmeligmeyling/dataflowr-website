/**
 * Captures the images for the "MCP release" knowledge-base article into
 * public/kennisbank/, from the Claire app.
 *
 * Not a test: each "test" stages a realistic app state through the Claire
 * repo's mock-API fixtures and screenshots it at 16:9 (1440×810 @2x). It
 * imports those fixtures, so it must run from the Claire repo:
 *
 *   cp scripts/capture-mcp-release.spec.ts ../DataFlowr/e2e/
 *   cp scripts/capture-mcp-release-view.ts ../DataFlowr/
 *   cd ../DataFlowr && npx tsx capture-mcp-release-view.ts   # dump the app view
 *   npx playwright test capture-mcp-release
 *   cp ../DataFlowr/screenshots-kennisbank/*.png public/kennisbank/
 */
import { readFileSync } from "node:fs";
import { test, type MockApi } from "./fixtures/api";
import { exactOnlineApp, testConnection, testUser } from "./fixtures/data";

const OUT = "screenshots-kennisbank";

// Set CHROMIUM_PATH when the machine has a Chromium that Playwright did not
// download itself (a preinstalled one in a container, say).
const chromium = process.env.CHROMIUM_PATH;

test.use({
  viewport: { width: 1440, height: 810 },
  deviceScaleFactor: 2,
  ...(chromium ? { launchOptions: { executablePath: chromium } } : {}),
});

type Lang = "nl" | "en";
const langs: Lang[] = ["nl", "en"];
const appPath = (lang: Lang, path: string) => (lang === "nl" ? path : `/en${path}`);

const demoUser = {
  ...testUser,
  firstName: "Sanne",
  lastName: "van Dijk",
  email: "sanne@voorbeeld.nl",
};

const demoConnection = {
  ...testConnection,
  metadata: { companyName: "Voorbeeld B.V." },
  lastRefreshedAt: "2026-08-05T09:00:00.000Z",
  usageCount: 148,
};

/** The AI clients signed in to the connection (ADR 0071 sessions panel). */
const sessionClients = [
  { clientId: "client-claude", name: "Claude", connectedAt: "2026-08-02T09:12:00.000Z" },
  { clientId: "client-chatgpt", name: "ChatGPT", connectedAt: "2026-08-04T14:41:00.000Z" },
  {
    clientId: "client-copilot",
    name: "Microsoft 365 Copilot",
    connectedAt: "2026-08-06T08:03:00.000Z",
  },
];

/**
 * The app derives the MCP address from the request origin, so under the test
 * server every URL on screen reads `http://127.0.0.1:4173/…`. Swap in the
 * deployment's real origin before shooting, so the screenshot shows the
 * address a reader would actually paste into their client.
 */
const APP_ORIGIN = "https://app.dataflowr.nl";

async function useRealOrigin(page: import("@playwright/test").Page): Promise<void> {
  await page.evaluate((origin) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node.nodeValue?.includes(window.location.origin)) {
        node.nodeValue = node.nodeValue.split(window.location.origin).join(origin);
      }
    }
    for (const input of Array.from(document.querySelectorAll("input, textarea"))) {
      const field = input as HTMLInputElement | HTMLTextAreaElement;
      if (field.value.includes(window.location.origin)) {
        field.value = field.value.split(window.location.origin).join(origin);
      }
    }
  }, APP_ORIGIN);
}

/** Everything the connection detail page requests, so no call 501s. */
function mockConnectionShell(api: MockApi, lang: Lang): void {
  api.authenticate(demoUser);
  api.json("GET", "/api/connections", {
    connections: [{ ...demoConnection, app: exactOnlineApp }],
  });
  api.json("GET", "/api/copilot/status", { authConfigured: true });
  api.json("GET", `/api/connections/${demoConnection.id}/clients`, {
    clients: sessionClients,
    lastActivityAt: "2026-08-07T07:41:00.000Z",
  });
  api.json("GET", `/api/connections/${demoConnection.id}/tools`, {
    disabledTools: [],
    modules: toolModules(lang),
  });
  api.json("GET", `/api/connections/${demoConnection.id}/audit-log`, {
    entries: auditEntries(lang),
    hasMore: false,
  });
  api.json("GET", `/api/connections/${demoConnection.id}/divisions`, {
    divisions: [{ code: 123, name: "Voorbeeld B.V.", hid: "1001" }],
    currentDivision: 123,
    languageCode: null,
  });
  // The audit panel resolves division codes to names through the chat route.
  api.json("GET", `/api/chat/${demoConnection.id}/divisions`, {
    divisions: [{ code: 123, name: "Voorbeeld B.V.", hid: 1001 }],
    currentDivision: 123,
    languageCode: null,
  });
  api.json("GET", `/api/connections/${demoConnection.id}/schedules`, {
    schedules: [],
    emailConfigured: true,
  });
  api.json("GET", `/api/connections/${demoConnection.id}/closing-config`, closingConfig());
}

/**
 * The closing-rule catalog behind the "Closing signals" panel. Ids are the real
 * built-in rule ids, so the Dutch panel resolves its own localized titles and
 * the screenshot reads the way a user's would.
 */
function closingConfig() {
  const checks: Array<[string, string, "high" | "medium" | "low", boolean]> = [
    ["opening-balance-check", "Opening balance ties to last year's closing balance", "high", true],
    ["suspense-account-balance", "Suspense account balances are zero", "high", true],
    ["prior-year-result-processed", "Prior-year result appropriated to equity", "high", true],
    ["receivables-subledger-match", "Receivables sub-ledger ties to the general ledger", "high", true],
    ["payables-subledger-match", "Payables sub-ledger ties to the general ledger", "high", true],
    ["bank-reconciliation", "Bank balances match the ledger", "high", true],
    ["vat-calculation-check", "VAT amounts match the calculated rate", "medium", true],
    ["vat-on-all-transactions", "Every transaction carries a VAT code", "medium", true],
    ["depreciation-tangible-check", "Depreciation posted on tangible fixed assets", "medium", true],
    ["duplicate-invoices", "No duplicate purchase invoices", "medium", true],
    ["negative-cash-balance", "No negative cash balances", "medium", true],
    ["aged-sales-invoices", "No long-overdue sales invoices", "low", true],
    ["cash-transaction-limits", "Cash transactions within the statutory limit", "low", false],
  ];
  return {
    catalog: {
      checks: checks.map(([id, title, severity, enabled]) => ({
        id,
        title,
        tier: "core",
        severity,
        description: "",
        enabled,
        defaultDisabled: !enabled,
      })),
      patterns: [],
      templates: [],
    },
    connectionConfig: null,
    divisionConfig: null,
    divisions: [123],
    effective: {
      rules: {},
      customRules: [],
      tolerances: {},
      excludedJournals: [],
      scanFocus: [],
    },
  };
}

function toolModules(lang: Lang) {
  const nl = lang === "nl";
  return [
    {
      name: "reporting",
      description: nl ? "Financiële rapportages" : "Financial reporting",
      tools: [
        {
          name: "financial_report",
          title: nl ? "Financieel rapport opstellen" : "Financial report",
          readOnlyHint: true,
          destructiveHint: false,
        },
        {
          name: "financial_period_report",
          title: nl ? "Periodenrapport opstellen" : "Period report",
          readOnlyHint: true,
          destructiveHint: false,
        },
        {
          name: "financial_kpis",
          title: nl ? "Financiële KPI's analyseren" : "Analyse financial KPIs",
          readOnlyHint: true,
          destructiveHint: false,
        },
        {
          name: "rgs_reference",
          title: nl ? "RGS-referentie raadplegen" : "RGS reference",
          readOnlyHint: true,
          destructiveHint: false,
        },
      ],
    },
    {
      name: "closing",
      description: nl ? "Maandafsluiting" : "Month-end close",
      tools: [
        {
          name: "closing_agent",
          title: nl ? "Afsluitagent" : "Closing agent",
          readOnlyHint: true,
          destructiveHint: false,
        },
        {
          name: "closing_agent_report",
          title: nl ? "Afsluitrapport opvragen" : "Closing report",
          readOnlyHint: true,
          destructiveHint: false,
        },
      ],
    },
    {
      name: "forecasting",
      description: nl ? "Cashflowprognose" : "Cashflow forecasting",
      tools: [
        {
          name: "forecasting_agent",
          title: nl ? "Prognoseagent" : "Forecasting agent",
          readOnlyHint: true,
          destructiveHint: false,
        },
      ],
    },
  ];
}

/**
 * Audit rows with caller attribution filled in — the release's point is that
 * every row now names the client that made the call.
 */
function auditEntries(lang: Lang) {
  const nl = lang === "nl";
  const rows: Array<[string, string, string, string, string, string, string]> = [
    [
      "a1",
      "financial_report",
      nl ? "Financieel rapport opstellen" : "Financial report",
      "reporting",
      "client-claude",
      "Claude",
      "2026-08-07T07:41:00.000Z",
    ],
    [
      "a2",
      "financial_period_report",
      nl ? "Periodenrapport opstellen" : "Period report",
      "reporting",
      "client-claude",
      "Claude",
      "2026-08-07T07:39:00.000Z",
    ],
    [
      "a3",
      "closing_agent",
      nl ? "Afsluitagent" : "Closing agent",
      "closing",
      "client-chatgpt",
      "ChatGPT",
      "2026-08-07T06:58:00.000Z",
    ],
    [
      "a4",
      "financial_kpis",
      nl ? "Financiële KPI's analyseren" : "Analyse financial KPIs",
      "reporting",
      "client-copilot",
      "Microsoft 365 Copilot",
      "2026-08-06T16:12:00.000Z",
    ],
    [
      "a5",
      "exact_online_aging_receivables_list",
      nl ? "Ouderdomsanalyse debiteuren" : "Receivables ageing",
      "cashflow",
      "client-copilot",
      "Microsoft 365 Copilot",
      "2026-08-06T16:11:00.000Z",
    ],
    [
      "a6",
      "forecasting_agent",
      nl ? "Prognoseagent" : "Forecasting agent",
      "forecasting",
      "client-claude",
      "Claude",
      "2026-08-06T09:04:00.000Z",
    ],
    [
      "a7",
      "rgs_reference",
      nl ? "RGS-referentie raadplegen" : "RGS reference",
      "reporting",
      "client-chatgpt",
      "ChatGPT",
      "2026-08-05T15:22:00.000Z",
    ],
  ];
  return rows.map(([id, toolName, title, module, clientId, clientName, executedAt]) => ({
    id,
    toolName,
    division: "123",
    status: "success",
    executedAt,
    kind: "read",
    module,
    title,
    source: "mcp",
    clientId,
    clientName,
  }));
}

for (const lang of langs) {
  /** Hero: the one /mcp address plus the per-client setup card (ADR 0071/0072). */
  test(`connection setup guide (${lang})`, async ({ api, page }) => {
    mockConnectionShell(api, lang);
    await page.goto(appPath(lang, `/connections/${demoConnection.id}`));
    await page.getByTestId("card-setup-guide").waitFor();
    // Frame both languages identically: park the MCP address at a fixed offset,
    // which leaves the usage tiles above it and the setup guide below.
    const url = page.getByTestId(`mcp-url-${demoConnection.id}`);
    const box = await url.boundingBox();
    if (box) await page.evaluate((dy) => window.scrollBy(0, dy), box.y - 302);
    await page.waitForTimeout(1200);
    await useRealOrigin(page);
    await page.screenshot({ path: `${OUT}/mcp-release-${lang}.png` });
  });

  /** Which close checks apply to this administration. */
  test(`closing signals (${lang})`, async ({ api, page }) => {
    mockConnectionShell(api, lang);
    await page.goto(appPath(lang, `/connections/${demoConnection.id}/signals`));
    await page.getByTestId("tab-rules").waitFor();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${OUT}/mcp-release-signals-${lang}.png` });
  });

  /** The AI clients signed in, and the one control over them. */
  test(`connection sessions (${lang})`, async ({ api, page }) => {
    mockConnectionShell(api, lang);
    await page.goto(appPath(lang, `/connections/${demoConnection.id}/sessions`));
    await page.getByTestId("sessions-list").waitFor();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/mcp-release-sessions-${lang}.png` });
  });

  /** Every tool call, with the client that made it. */
  test(`connection audit log (${lang})`, async ({ api, page }) => {
    mockConnectionShell(api, lang);
    await page.goto(appPath(lang, `/connections/${demoConnection.id}/audit`));
    await page.getByTestId("audit-log-table").waitFor();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/mcp-release-audit-${lang}.png` });
  });
}

/* ------------------------------------------------------------------ */
/* MCP Apps view — the same self-contained HTML an external host renders */
/* ------------------------------------------------------------------ */

const VIEWS: Record<string, string> = {
  "ui://dataflowr/exact-online/report-viewer.html": "report-viewer",
  "ui://dataflowr/exact-online/closing-report.html": "closing-report",
};
const REPORT_VIEW = "ui://dataflowr/exact-online/report-viewer.html";
const CLOSE_VIEW = "ui://dataflowr/exact-online/closing-report.html";

function sse(events: Array<Record<string, unknown>>): string {
  return events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
}

function mockChatShell(api: MockApi): void {
  api.authenticate(demoUser);
  api.json("GET", "/api/connections", {
    connections: [{ ...demoConnection, app: exactOnlineApp }],
  });
  api.json("GET", "/api/audio/capabilities", {
    enabled: false,
    defaultVoice: "alloy",
    voices: [],
    sampleRate: 24000,
  });
  api.json("GET", `/api/chat/${demoConnection.id}/divisions`, {
    divisions: [{ code: 123, name: "Voorbeeld B.V.", hid: 1001 }],
    currentDivision: 123,
    languageCode: null,
  });
  api.json("GET", `/api/chat/${demoConnection.id}/files`, { files: [] });
  api.json("GET", `/api/chat/${demoConnection.id}/background`, { processes: [] });
  api.json("GET", "/api/chat/conversations", { conversations: [] });
  // The view HTML the host loads into its sandboxed iframe — dumped straight
  // from the connector package by capture-mcp-release-view.ts, so the
  // screenshot shows the real view rather than a stand-in.
  api.on("GET", "/api/chat/app-view", (request) => {
    const uri = new URL(request.url()).searchParams.get("uri") ?? "";
    const name = VIEWS[uri];
    if (!name) return { status: 404, body: { message: `unknown view ${uri}` } };
    return { body: { html: readFileSync(`e2e/fixtures/views/${name}.html`, "utf8") } };
  });
}

/** A P&L with a prior-year comparison — what the report viewer is built for. */
function reportStructuredContent(lang: Lang) {
  const nl = lang === "nl";
  const line = (
    name: string,
    amount: number,
    prior: number,
    level = 0,
    line_type = "data",
    children: unknown[] = [],
  ) => ({
    name,
    level,
    line_type,
    value_basis: "ytd_movement",
    amount_dc: amount,
    amount_dc_prior: prior,
    variance: amount - prior,
    variance_pct: prior === 0 ? null : ((amount - prior) / Math.abs(prior)) * 100,
    rgs_codes: [],
    children,
  });

  return {
    meta: {
      division: 123,
      report_type: "income_statement",
      period: "2026-07",
      period_label: nl ? "Jan–jul 2026" : "Jan–Jul 2026",
      aggregation: "ytd",
      value_basis: "ytd_movement",
      currency: "EUR",
      compare_basis: "prior_year",
    },
    compare_meta: { period_label: nl ? "Jan–jul 2025" : "Jan–Jul 2025" },
    tree: [
      line(nl ? "Netto-omzet" : "Net revenue", 4128400, 3612900, 0, "subtotal", [
        line(nl ? "Omzet abonnementen" : "Subscription revenue", 3164100, 2698400, 1),
        line(nl ? "Omzet dienstverlening" : "Services revenue", 964300, 914500, 1),
      ]),
      line(nl ? "Kostprijs van de omzet" : "Cost of sales", -1486200, -1352700, 0, "subtotal", [
        line(nl ? "Inkoopwaarde" : "Purchase value", -1102400, -1008800, 1),
        line(nl ? "Uitbesteed werk" : "Outsourced work", -383800, -343900, 1),
      ]),
      line(nl ? "Brutomarge" : "Gross margin", 2642200, 2260200, 0, "formula"),
      line(nl ? "Personeelskosten" : "Personnel costs", -1512800, -1338600, 0, "subtotal", [
        line(nl ? "Lonen en salarissen" : "Wages and salaries", -1206300, -1071200, 1),
        line(nl ? "Sociale lasten" : "Social security charges", -306500, -267400, 1),
      ]),
      line(nl ? "Overige bedrijfskosten" : "Other operating expenses", -604900, -571300, 0, "subtotal", [
        line(nl ? "Huisvestingskosten" : "Premises costs", -184200, -178900, 1),
        line(nl ? "Verkoopkosten" : "Selling expenses", -241700, -206400, 1),
        line(nl ? "Kantoorkosten" : "Office expenses", -179000, -186000, 1),
      ]),
      line(nl ? "Afschrijvingen" : "Depreciation", -168400, -161900, 0, "subtotal"),
      line(nl ? "Bedrijfsresultaat" : "Operating result", 356100, 188400, 0, "formula"),
    ],
    drilldown_hint: nl
      ? "Klik op een regel om door te zoomen naar de grootboekrekeningen."
      : "Click a line to drill down to its GL accounts.",
  };
}

for (const lang of langs) {
  test(`chat: mcp app view (${lang})`, async ({ api, page }) => {
    mockChatShell(api);
    const nl = lang === "nl";
    api.on("POST", `/api/chat/${demoConnection.id}`, () => ({
      contentType: "text/event-stream",
      rawBody: sse([
        {
          type: "tool_call",
          id: "tool-report",
          name: "financial_report",
          arguments: {
            division: 123,
            report_type: "income_statement",
            period: "2026-07",
            compare_to: "prior_year",
          },
          requiresConfirmation: false,
        },
        {
          type: "tool_result",
          id: "tool-report",
          name: "financial_report",
          uiResource: REPORT_VIEW,
          result: { success: true, structuredContent: reportStructuredContent(lang) },
        },
        {
          type: "content",
          content: nl
            ? [
                "Het bedrijfsresultaat over januari t/m juli komt uit op **€ 356.100**, tegen € 188.400 vorig jaar.",
                "",
                "De brutomarge stijgt harder dan de omzet (+16,9% tegen +14,3%): de kostprijs groeit onderevenredig mee. Personeelskosten lopen met 13,0% op, iets onder de omzetgroei.",
              ].join("\n")
            : [
                "The operating result for January through July comes to **€356,100**, against €188,400 last year.",
                "",
                "Gross margin grows faster than revenue (+16.9% versus +14.3%): cost of sales rises less than proportionally. Personnel costs are up 13.0%, just below revenue growth.",
              ].join("\n"),
        },
        { type: "done" },
      ]),
    }));

    await page.goto(appPath(lang, "/"));
    await page.getByTestId("button-open-chat").click();
    await page.getByTestId("button-fullscreen-chat").click();
    const sidebar = page.getByTestId("sidebar-conversations");
    if (await sidebar.isVisible()) {
      await page.getByTestId("button-toggle-sidebar").click();
    }

    await page
      .getByTestId("input-chat-message")
      .fill(
        nl
          ? "Laat de resultatenrekening t/m juli zien, vergeleken met vorig jaar"
          : "Show the P&L through July, compared with last year",
      );
    await page.getByTestId("button-send-message").click();
    await page.getByTestId("iframe-app-view").waitFor();
    await page.waitForTimeout(2500); // let the view iframe initialize and size
    // The transcript auto-scrolls to the answer; bring the widget's own header
    // back into frame so the shot shows the view, not its middle.
    await page.getByTestId("mcp-app-view").evaluate((el) =>
      el.scrollIntoView({ block: "start", behavior: "instant" }),
    );
    // Scrolling away from the tail summons the jump-to-latest pill, which then
    // sits on top of the view.
    await page.addStyleTag({
      content: '[data-testid="button-jump-to-latest"] { display: none !important; }',
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/mcp-release-app-view-${lang}.png` });
  });
}

/** A finished close run: no blockers, a handful of items to review. */
function closeStructuredContent(lang: Lang) {
  const nl = lang === "nl";
  const item = (detail: string, findingKey: string, decision?: string) => ({
    detail,
    findingKey,
    ...(decision ? { decision } : {}),
  });
  return {
    conversation: "close-2026-07",
    status: "completed",
    division: 123,
    division_name: "Voorbeeld B.V.",
    division_hid: "1001",
    year: 2026,
    period: 7,
    observation_scan: "complete",
    observations: {
      check: [
        {
          check: "suspense-account-balance",
          title: "Suspense account balances are zero",
          severity: "medium",
          status: "fail",
          items: [
            item(
              nl
                ? "Kruisposten (1300) staat op € 4.812,66 per 31 juli — de PSP-uitbetaling van 31 juli is nog niet afgeletterd."
                : "Clearing account (1300) stands at €4,812.66 as at 31 July — the PSP payout of 31 July is not yet matched.",
              "suspense-1300",
            ),
          ],
        },
        {
          check: "receivables-subledger-match",
          title: "Receivables sub-ledger ties to the general ledger",
          severity: "medium",
          status: "fail",
          items: [
            item(
              nl
                ? "Verschil van € 1.240,00 tussen de debiteurensubadministratie en grootboekrekening 1300 — één vraagpost op een creditnota."
                : "€1,240.00 difference between the receivables sub-ledger and GL account 1300 — one query item on a credit note.",
              "recv-1300",
            ),
          ],
        },
        {
          check: "vat-on-all-transactions",
          title: "Every transaction carries a VAT code",
          severity: "medium",
          status: "fail",
          items: [
            item(
              nl
                ? "3 inkoopboekingen in periode 7 zonder btw-code, samen € 862,40."
                : "3 purchase entries in period 7 without a VAT code, €862.40 in total.",
              "vat-p7",
            ),
          ],
        },
        {
          check: "aged-sales-invoices",
          title: "No long-overdue sales invoices",
          severity: "low",
          status: "fail",
          items: [
            item(
              nl
                ? "2 verkoopfacturen ouder dan 120 dagen, samen € 3.410,00."
                : "2 sales invoices older than 120 days, €3,410.00 in total.",
              "aged-120",
            ),
          ],
        },
        {
          check: "duplicate-invoices",
          title: "No duplicate purchase invoices",
          severity: "low",
          status: "fail",
          items: [
            item(
              nl
                ? "Mogelijk dubbele inkoopfactuur van dezelfde leverancier op 14 juli, € 218,50."
                : "Possible duplicate purchase invoice from the same supplier on 14 July, €218.50.",
              "dup-0714",
              "dismissed",
            ),
          ],
        },
      ],
      scan: [],
      agent: [],
    },
  };
}

for (const lang of langs) {
  test(`chat: close report (${lang})`, async ({ api, page }) => {
    mockChatShell(api);
    const nl = lang === "nl";
    api.on("POST", `/api/chat/${demoConnection.id}`, () => ({
      contentType: "text/event-stream",
      rawBody: sse([
        {
          type: "tool_call",
          id: "tool-close",
          name: "closing_agent",
          arguments: { division: 123, year: 2026, period: 7 },
          requiresConfirmation: false,
        },
        {
          type: "tool_result",
          id: "tool-close",
          name: "closing_agent",
          result: { success: true, conversation: "close-2026-07", status: "completed" },
        },
        {
          type: "tool_call",
          id: "tool-close-report",
          name: "closing_agent_report",
          arguments: { conversation: "close-2026-07" },
          requiresConfirmation: false,
        },
        {
          type: "tool_result",
          id: "tool-close-report",
          name: "closing_agent_report",
          uiResource: CLOSE_VIEW,
          result: { success: true, structuredContent: closeStructuredContent(lang) },
        },
        {
          type: "content",
          content: nl
            ? [
                "De afsluitcontroles over juli zijn klaar. Er zijn **geen blokkers**: vijf bevindingen vragen om uw beoordeling, waarvan er één al is afgehandeld.",
                "",
                "De grootste post is de restant op de kruisposten — dat is de PSP-uitbetaling van 31 juli, die in augustus wordt afgeletterd.",
              ].join("\n")
            : [
                "The close checks for July are done. There are **no blockers**: five findings need your review, one of which is already handled.",
                "",
                "The largest item is the balance left on the clearing account — that is the PSP payout of 31 July, which is matched in August.",
              ].join("\n"),
        },
        { type: "done" },
      ]),
    }));

    await page.goto(appPath(lang, "/"));
    await page.getByTestId("button-open-chat").click();
    await page.getByTestId("button-fullscreen-chat").click();
    const sidebar = page.getByTestId("sidebar-conversations");
    if (await sidebar.isVisible()) {
      await page.getByTestId("button-toggle-sidebar").click();
    }

    await page
      .getByTestId("input-chat-message")
      .fill(nl ? "Sluit de maand juli af" : "Close the July books");
    await page.getByTestId("button-send-message").click();
    await page.getByTestId("iframe-app-view").waitFor();
    await page.waitForTimeout(2500);
    await page.getByTestId("mcp-app-view").evaluate((el) =>
      el.scrollIntoView({ block: "start", behavior: "instant" }),
    );
    await page.addStyleTag({
      content: '[data-testid="button-jump-to-latest"] { display: none !important; }',
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/mcp-release-close-${lang}.png` });
  });
}
