/**
 * Captures the hero images in public/kennisbank/ from the Claire app.
 *
 * Not a test: each "test" stages a realistic app state through the Claire
 * repo's mock-API fixtures and screenshots it at 16:9 (1440×810 @2x). It
 * imports those fixtures, so it must run from the Claire repo:
 *
 *   cp scripts/capture-kennisbank.spec.ts ../DataFlowr/e2e/
 *   cd ../DataFlowr && npx playwright test capture-kennisbank
 *   cp ../DataFlowr/screenshots-kennisbank/*.png public/kennisbank/
 */
import { test, type MockApi } from "./fixtures/api";
import { exactOnlineApp, testConnection, testUser } from "./fixtures/data";

const OUT = "screenshots-kennisbank";

test.use({ viewport: { width: 1440, height: 810 }, deviceScaleFactor: 2 });

type Lang = "nl" | "en";
const langs: Lang[] = ["nl", "en"];
const appRoot = (lang: Lang) => (lang === "nl" ? "/" : "/en");
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
};

function sse(events: Array<Record<string, unknown>>): string {
  return events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
}

/** Everything the chat shell requests, so no call 501s. */
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
}

interface ChatShot {
  name: string;
  prompt: Record<Lang, string>;
  events: (lang: Lang) => Array<Record<string, unknown>>;
  /** Text (regex) that marks the turn as fully painted. */
  settled: Record<Lang, string>;
  openWorkspace?: boolean;
}

const closeChecksTodos = (lang: Lang) =>
  lang === "nl"
    ? [
        { id: "t1", title: "Afsluitcontroles uitvoeren", status: "completed" },
        { id: "t2", title: "Tussenrekeningen controleren", status: "completed" },
        { id: "t3", title: "Subadministraties aansluiten", status: "completed" },
        { id: "t4", title: "Bevindingen onderzoeken", status: "completed" },
        { id: "t5", title: "Close-readiness rapport opstellen", status: "completed" },
      ]
    : [
        { id: "t1", title: "Run close checks", status: "completed" },
        { id: "t2", title: "Check suspense accounts", status: "completed" },
        { id: "t3", title: "Reconcile sub-ledgers", status: "completed" },
        { id: "t4", title: "Investigate findings", status: "completed" },
        { id: "t5", title: "Draft close-readiness report", status: "completed" },
      ];

const chatShots: ChatShot[] = [
  {
    name: "maandafsluiting",
    prompt: {
      nl: "Bereid de maandafsluiting van juli voor",
      en: "Prepare the July month-end close",
    },
    openWorkspace: true,
    settled: {
      nl: "Beoordeel de restpost",
      en: "Review the remaining item",
    },
    events: (lang) => [
      { type: "todos", todos: closeChecksTodos(lang) },
      {
        type: "tool_call",
        id: "tool-close",
        name: "closing_agent",
        arguments: { period: "2026-7" },
        requiresConfirmation: false,
      },
      {
        type: "tool_result",
        id: "tool-close",
        name: "closing_agent",
        result: { success: true, checksPassed: 14, checksTotal: 16 },
      },
      {
        type: "tool_call",
        id: "tool-status",
        name: "closing_agent_status",
        arguments: { period: "2026-7" },
        requiresConfirmation: false,
      },
      {
        type: "tool_result",
        id: "tool-status",
        name: "closing_agent_status",
        result: { success: true, findings: 2, suspenseBalance: 4812.66 },
      },
      {
        type: "content",
        content:
          lang === "nl"
            ? [
                "### Close-readiness · juli 2026",
                "",
                "De administratie is **bijna gereed** voor afsluiting: 14 van de 16 controles slagen. Twee bevindingen vragen om uw beoordeling.",
                "",
                "| Controle | Resultaat |",
                "| --- | --- |",
                "| Tussenrekeningen | ⚠️ € 4.812,66 op kruisposten |",
                "| Afschrijvingen | ✅ Verwerkt t/m periode 7 |",
                "| BTW-aansluiting | ✅ Aangifte sluit aan |",
                "| Subadministraties | ⚠️ 1 vraagpost debiteuren |",
                "",
                "**Aanbevolen acties**",
                "",
                "1. Beoordeel de restpost op de kruisposten — dit is de PSP-uitbetaling van 31 juli.",
                "2. Keur de voorgestelde correctie voor de vraagpost goed; er wordt niets geboekt zonder uw akkoord.",
              ].join("\n")
            : [
                "### Close readiness · July 2026",
                "",
                "The administration is **nearly ready** to close: 14 of 16 checks pass. Two findings need your review.",
                "",
                "| Check | Result |",
                "| --- | --- |",
                "| Suspense accounts | ⚠️ €4,812.66 on the clearing account |",
                "| Depreciation | ✅ Posted through period 7 |",
                "| VAT reconciliation | ✅ Return matches the ledger |",
                "| Sub-ledgers | ⚠️ 1 query item in receivables |",
                "",
                "**Recommended actions**",
                "",
                "1. Review the remaining item on the clearing account — this is the PSP payout of 31 July.",
                "2. Approve the proposed correction for the query item; nothing is posted without your approval.",
              ].join("\n"),
      },
      { type: "done" },
    ],
  },
  {
    name: "psp-reconciliatie",
    prompt: {
      nl: "Waarom sluit de uitbetaling van de PSP van 31 juli niet aan op de omzet?",
      en: "Why doesn't the PSP payout of 31 July match revenue?",
    },
    settled: {
      nl: "niets achter op de kruisposten",
      en: "nothing is left on the clearing account",
    },
    events: (lang) => [
      {
        type: "tool_call",
        id: "tool-settlement",
        name: "psp_settlement_report_fetch",
        arguments: { payoutDate: "2026-07-31" },
        requiresConfirmation: false,
      },
      {
        type: "tool_result",
        id: "tool-settlement",
        name: "psp_settlement_report_fetch",
        result: { success: true, transactions: 412, payout: 18246.12 },
      },
      {
        type: "tool_call",
        id: "tool-bank",
        name: "exact_online_bank_entries_list",
        arguments: { dateFrom: "2026-07-28", dateTo: "2026-08-01" },
        requiresConfirmation: false,
      },
      {
        type: "tool_result",
        id: "tool-bank",
        name: "exact_online_bank_entries_list",
        result: { success: true, matched: 412 },
      },
      {
        type: "content",
        content:
          lang === "nl"
            ? [
                "De uitbetaling van **€ 18.246,12** dekt de omzet van 28 t/m 31 juli. Het verschil met de omzet is volledig verklaarbaar:",
                "",
                "| Component | Bedrag |",
                "| --- | --- |",
                "| Omzet 28–31 juli | € 19.104,50 |",
                "| Transactiekosten | − € 486,13 |",
                "| Refunds | − € 312,25 |",
                "| Chargeback (incl. fee) | − € 60,00 |",
                "| **Uitbetaling 1 augustus** | **€ 18.246,12** |",
                "",
                "Alle 412 transacties zijn gematcht met het settlement-rapport; er blijft niets achter op de kruisposten.",
              ].join("\n")
            : [
                "The payout of **€18,246.12** covers revenue from 28–31 July. The gap with revenue is fully explained:",
                "",
                "| Component | Amount |",
                "| --- | --- |",
                "| Revenue 28–31 July | €19,104.50 |",
                "| Transaction fees | − €486.13 |",
                "| Refunds | − €312.25 |",
                "| Chargeback (incl. fee) | − €60.00 |",
                "| **Payout 1 August** | **€18,246.12** |",
                "",
                "All 412 transactions are matched against the settlement report; nothing is left on the clearing account.",
              ].join("\n"),
      },
      { type: "done" },
    ],
  },
];

for (const shot of chatShots) {
  for (const lang of langs) {
    test(`chat: ${shot.name} (${lang})`, async ({ api, page }) => {
      mockChatShell(api);
      api.on("POST", `/api/chat/${demoConnection.id}`, () => ({
        contentType: "text/event-stream",
        rawBody: sse(shot.events(lang)),
      }));

      await page.goto(appRoot(lang));
      await page.getByTestId("button-open-chat").click();
      await page.getByTestId("button-fullscreen-chat").click();
      // Hide the conversation list for a clean frame.
      const sidebar = page.getByTestId("sidebar-conversations");
      if (await sidebar.isVisible()) {
        await page.getByTestId("button-toggle-sidebar").click();
      }

      await page.getByTestId("input-chat-message").fill(shot.prompt[lang]);
      await page.getByTestId("button-send-message").click();
      await page.getByText(new RegExp(shot.settled[lang])).waitFor();

      if (shot.openWorkspace) {
        await page.getByTestId("button-toggle-workspace").click();
        await page.getByTestId("todo-progress-counter").waitFor();
      }

      await page.waitForTimeout(1200); // let charts/fonts settle
      await page.screenshot({ path: `${OUT}/${shot.name}-${lang}.png` });
    });
  }
}

/** Dashboard mocks (premium-features article). */
function mockDashboard(api: MockApi, lang: Lang): void {
  mockChatShell(api);
  api.json("GET", "/api/dashboard", {
    apps: [exactOnlineApp],
    connections: [demoConnection],
    purchases: [
      {
        id: "purchase-e2e",
        userId: demoUser.id,
        appId: exactOnlineApp.id,
        connectionId: demoConnection.id,
        stripeSubscriptionId: null,
        stripeCustomerId: null,
        stripeCheckoutSessionId: null,
        status: "active",
        purchasedAt: "2026-01-15T09:00:00.000Z",
        expiresAt: null,
      },
    ],
  });
  api.json("GET", "/api/onboarding", {
    completedSteps: ["connect", "choose-tools", "first-question", "mcp-client", "schedule"],
  });
  const completed = new Set<string>();
  api.on("POST", "/api/onboarding/steps", (request) => {
    for (const step of (request.postDataJSON() as { steps?: string[] })?.steps ?? []) {
      completed.add(step);
    }
    return { body: { completedSteps: [...completed] } };
  });
  api.json("GET", `/api/connections/${demoConnection.id}/schedules`, {
    schedules: [
      {
        id: "schedule-close",
        name: lang === "nl" ? "Maandafsluiting" : "Month-end close",
        instruction:
          lang === "nl" ? "Bereid de maandafsluiting voor" : "Prepare the month-end close",
        division: 123,
        frequency: "monthly",
        hour: 7,
        minute: 0,
        dayOfWeek: null,
        dayOfMonth: 1,
        timeZone: "Europe/Amsterdam",
        notifyEmail: true,
        enabled: true,
        nextRunAt: "2026-09-01T05:00:00.000Z",
        lastRunAt: "2026-08-01T05:04:00.000Z",
        lastRunStatus: "completed",
        lastRunError: null,
        lastThreadId: null,
        running: false,
      },
    ],
    emailConfigured: true,
  });
  api.json("GET", `/api/connections/${demoConnection.id}/clients`, {
    clients: [
      { clientId: "client-claude", name: "Claude", connectedAt: "2026-08-02T09:00:00.000Z" },
    ],
    lastActivityAt: "2026-08-05T10:12:00.000Z",
  });
  api.json("GET", `/api/connections/${demoConnection.id}/tools`, {
    disabledTools: [],
    modules: toolModules(lang),
  });
  api.json("GET", `/api/connections/${demoConnection.id}/audit-log`, {
    entries: [
      {
        id: "audit-1",
        toolName: "financial_report",
        division: 123,
        status: "success",
        executedAt: "2026-08-05T08:12:00.000Z",
        kind: "read",
        module: "reporting",
        title: lang === "nl" ? "Financieel rapport opstellen" : "Financial report",
      },
      {
        id: "audit-2",
        toolName: "financial_kpis",
        division: 123,
        status: "success",
        executedAt: "2026-08-05T08:10:00.000Z",
        kind: "read",
        module: "reporting",
        title: lang === "nl" ? "Financiële KPI's analyseren" : "Analyse financial KPIs",
      },
      {
        id: "audit-3",
        toolName: "closing_agent",
        division: 123,
        status: "success",
        executedAt: "2026-08-01T05:04:00.000Z",
        kind: "read",
        module: "closing",
        title: lang === "nl" ? "Afsluitagent" : "Closing agent",
      },
    ],
    hasMore: false,
  });
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
          description: nl
            ? "Balans, resultatenrekening en kasstroom op RGS-rubriek"
            : "Balance sheet, P&L and cash flow on the standard chart of accounts",
          readOnlyHint: true,
          destructiveHint: false,
        },
        {
          name: "financial_gl_data",
          title: nl ? "Grootboeksaldi analyseren" : "Analyse GL balances",
          description: nl
            ? "Saldibalans per periode, deterministisch berekend"
            : "Trial balance per period, deterministically computed",
          readOnlyHint: true,
          destructiveHint: false,
        },
        {
          name: "financial_kpis",
          title: nl ? "Financiële KPI's analyseren" : "Analyse financial KPIs",
          description: nl
            ? "DSO, DPO en concentraties met vaste rekenregels"
            : "DSO, DPO and concentrations with pinned arithmetic",
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
          description: nl
            ? "Vaste reeks controles met close-readiness rapport"
            : "Fixed set of checks with a close-readiness report",
          readOnlyHint: true,
          destructiveHint: false,
        },
        {
          name: "closing_agent_status",
          title: nl ? "Status van de afsluitagent" : "Closing agent status",
          description: nl
            ? "Voortgang en bevindingen van de afsluitrun"
            : "Progress and findings of the close run",
          readOnlyHint: true,
          destructiveHint: false,
        },
        {
          name: "closing_agent_decide",
          title: nl ? "Beslissing over afsluitbevinding vastleggen" : "Record close decision",
          description: nl
            ? "Boekt uitsluitend na uw akkoord"
            : "Posts only after your approval",
          readOnlyHint: false,
          destructiveHint: false,
        },
      ],
    },
    {
      name: "sales",
      description: nl ? "Verkoop & facturatie" : "Sales & invoicing",
      tools: [
        {
          name: "exact_online_sales_invoices_list",
          title: nl ? "Verkoopfacturen" : "Sales invoices",
          description: nl ? "Facturen zoeken en inzien" : "Search and inspect invoices",
          readOnlyHint: true,
          destructiveHint: false,
        },
        {
          name: "exact_online_bank_entries_list",
          title: nl ? "Bankmutaties" : "Bank entries",
          description: nl ? "Bankboekingen per periode" : "Bank postings per period",
          readOnlyHint: true,
          destructiveHint: false,
        },
      ],
    },
  ];
}

for (const lang of langs) {
  test(`dashboard: premium-features (${lang})`, async ({ api, page }) => {
    mockDashboard(api, lang);
    await page.goto(appPath(lang, "/dashboard"));
    await page
      .getByRole("heading", { level: 1, name: /Goede|Good / })
      .waitFor();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/premium-features-${lang}.png` });
  });

  test(`connection tools: mcp (${lang})`, async ({ api, page }) => {
    mockDashboard(api, lang);
    api.json("GET", `/api/chat/${demoConnection.id}/conversations`, {
      conversations: [],
    });
    await page.goto(appPath(lang, `/connections/${demoConnection.id}/tools`));
    const labels =
      lang === "nl"
        ? { reporting: "Rapportage", closing: "Afsluiting", sales: "Verkoop" }
        : { reporting: "Reporting", closing: "Closing", sales: "Sales" };
    // Collapse sales first, then expand the two on-message modules.
    await page.getByText(labels.sales, { exact: true }).click();
    await page.getByText(labels.reporting, { exact: true }).click();
    await page.getByText(labels.closing, { exact: true }).click();
    await page.getByText("financial_report", { exact: true }).waitFor();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/mcp-voor-finance-${lang}.png` });
  });
}
