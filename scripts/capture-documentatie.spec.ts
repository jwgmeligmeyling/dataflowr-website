/**
 * Captures the product images in public/documentatie/ from the Claire app.
 *
 * Not a test: each "test" stages a realistic app state through the Claire
 * repo's mock-API fixtures and screenshots it at 16:9 (1440×810 @2x). It
 * imports those fixtures, so it must run from the Claire repo:
 *
 *   cp scripts/capture-documentatie.spec.ts ../DataFlowr/e2e/
 *   cd ../DataFlowr && npx playwright test capture-documentatie
 *   cp ../DataFlowr/screenshots-documentatie/*.png public/documentatie/
 *
 * The documentation pages also reuse a handful of images that already exist
 * in public/kennisbank/ (the close report, the closing signals and the
 * sessions panel); those come from capture-mcp-release.spec.ts.
 */
import { mockDashboardQueries, test, type MockApi } from "./fixtures/api";
import { exactOnlineApp, testAppDetail, testConnection, testUser } from "./fixtures/data";

const OUT = "screenshots-documentatie";

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

/** The AI clients signed in to the connection. */
const sessionClients = [
  { clientId: "client-claude", name: "Claude", connectedAt: "2026-08-02T09:12:00.000Z" },
  { clientId: "client-chatgpt", name: "ChatGPT", connectedAt: "2026-08-04T14:41:00.000Z" },
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

/** Scroll an element to the top of the frame, with room to breathe above it. */
async function frameFromTop(
  page: import("@playwright/test").Page,
  testId: string,
  margin = 96,
): Promise<void> {
  const el = page.getByTestId(testId);
  await el.evaluate((node) => node.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.evaluate((dy) => window.scrollBy(0, -dy), margin);
}

/** Two schedules, the shapes the docs describe: the close and a KPI snapshot. */
function demoSchedules(lang: Lang) {
  const nl = lang === "nl";
  return [
    {
      id: "schedule-close",
      name: nl ? "Maandafsluiting" : "Month-end close",
      instruction: nl
        ? "Voer de afsluitcontroles uit en stuur de actielijst."
        : "Run the close checks and send the action list.",
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
    {
      id: "schedule-kpi",
      name: nl ? "Wekelijkse KPI-snapshot" : "Weekly KPI snapshot",
      instruction: nl
        ? "Zet de KPI's naast vorige week en markeer elke uitschieter boven de 10%."
        : "Put the KPIs next to last week and flag any outlier above 10%.",
      division: 123,
      frequency: "weekly",
      hour: 8,
      minute: 30,
      dayOfWeek: 1,
      dayOfMonth: null,
      timeZone: "Europe/Amsterdam",
      notifyEmail: false,
      enabled: true,
      nextRunAt: "2026-08-24T06:30:00.000Z",
      lastRunAt: "2026-08-10T06:34:00.000Z",
      lastRunStatus: "completed",
      lastRunError: null,
      lastThreadId: null,
      running: false,
    },
  ];
}

/**
 * Tool modules for the tools panel: the reporting set plus a sales module, so
 * the read, write and destructive chips all appear in frame.
 */
function toolModules(lang: Lang) {
  const nl = lang === "nl";
  return [
    {
      name: "reporting",
      description: nl ? "Financiële rapportages" : "Financial reporting",
      defaultEnabled: true,
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
      ],
    },
    {
      name: "sales",
      description: nl ? "Verkoop en facturatie" : "Sales and invoicing",
      defaultEnabled: true,
      tools: [
        {
          name: "exact_online_sales_invoices_list",
          title: nl ? "Verkoopfacturen opvragen" : "List sales invoices",
          readOnlyHint: true,
          destructiveHint: false,
        },
        {
          name: "exact_online_sales_invoices_create",
          title: nl ? "Verkoopfactuur aanmaken" : "Create sales invoice",
          readOnlyHint: false,
          destructiveHint: false,
        },
        {
          name: "exact_online_sales_invoices_delete",
          title: nl ? "Verkoopfactuur verwijderen" : "Delete sales invoice",
          readOnlyHint: false,
          destructiveHint: true,
        },
      ],
    },
    {
      name: "closing",
      description: nl ? "Maandafsluiting" : "Month-end close",
      defaultEnabled: true,
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
  ];
}

/** The closing-config the connection shell requests; the panel is not shot here. */
function closingConfig() {
  return {
    catalog: { checks: [], patterns: [], templates: [] },
    connectionConfig: null,
    divisionConfig: null,
    divisions: [123],
    effective: { rules: {}, customRules: [], tolerances: {}, excludedJournals: [], scanFocus: [] },
  };
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
    entries: [],
    hasMore: false,
  });
  api.json("GET", `/api/connections/${demoConnection.id}/divisions`, {
    divisions: [{ code: 123, name: "Voorbeeld B.V.", hid: "1001" }],
    currentDivision: 123,
    languageCode: null,
  });
  api.json("GET", `/api/chat/${demoConnection.id}/divisions`, {
    divisions: [{ code: 123, name: "Voorbeeld B.V.", hid: 1001 }],
    currentDivision: 123,
    languageCode: null,
  });
  api.json("GET", `/api/connections/${demoConnection.id}/schedules`, {
    schedules: demoSchedules(lang),
    emailConfigured: true,
  });
  api.json("GET", `/api/connections/${demoConnection.id}/closing-config`, closingConfig());
}

/* ------------------------------------------------------------------ */
/* Setup guide per client: the images on the four connect pages        */
/* ------------------------------------------------------------------ */

const clients = ["claude", "chatgpt", "copilot", "make"] as const;

for (const lang of langs) {
  for (const client of clients) {
    test(`setup guide ${client} (${lang})`, async ({ api, page }) => {
      mockConnectionShell(api, lang);
      await page.goto(appPath(lang, `/connections/${demoConnection.id}`));
      await page.getByTestId("card-setup-guide").waitFor();
      if (client !== "claude") {
        await page.getByTestId(`setup-client-${client}`).click();
      }
      await page.waitForTimeout(900);
      // Identical frame for all four clients: park the MCP address just under
      // the sticky header, which fills the rest with the per-client guide.
      const url = page.getByTestId(`mcp-url-${demoConnection.id}`);
      const box = await url.boundingBox();
      if (box) await page.evaluate((dy) => window.scrollBy(0, dy), box.y - 196);
      await page.waitForTimeout(400);
      await useRealOrigin(page);
      await page.screenshot({ path: `${OUT}/koppelen-${client}-${lang}.png` });
    });
  }
}

/* ------------------------------------------------------------------ */
/* Getting started: the plan chooser and the connected landing         */
/* ------------------------------------------------------------------ */

/**
 * The plan chooser with the launch budgets, so the screenshot matches the
 * live pricing rather than the small test fixtures.
 */
const demoPlans = [
  { tier: "individual", priceCents: 9900, maxAdministrations: 3, maxMembers: 1, agentTokenBudget: 20_000_000, toolCallBudget: 5_000, trialDays: 0 },
  { tier: "business", priceCents: 29900, highlighted: true, maxAdministrations: 5, maxMembers: 5, agentTokenBudget: 100_000_000, toolCallBudget: 25_000, trialDays: 0 },
  { tier: "firm", priceCents: 74900, maxAdministrations: null, maxMembers: 20, agentTokenBudget: 250_000_000, toolCallBudget: 100_000, trialDays: 0 },
];

for (const lang of langs) {
  test(`plan chooser (${lang})`, async ({ api, page }) => {
    api.authenticate(demoUser);
    api.json("GET", "/api/apps", [exactOnlineApp]);
    api.json("GET", "/api/apps/exact-online", { ...testAppDetail, plans: demoPlans });
    api.json("GET", "/api/billing/plans/exact-online", {
      plans: demoPlans,
      currentTier: null,
      role: "admin",
    });
    api.json("GET", "/api/connections", { connections: [] });

    await page.goto(appPath(lang, "/apps/exact-online"));
    await page.getByTestId("plan-card-business").waitFor();
    await page.waitForTimeout(600);
    await frameFromTop(page, "plan-card-individual", 172);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/plan-kiezen-${lang}.png` });
  });

  test(`connected landing (${lang})`, async ({ api, page }) => {
    api.authenticate(demoUser);
    api.json("GET", "/api/connections", {
      connections: [
        {
          ...demoConnection,
          app: exactOnlineApp,
          metadata: { companyName: "Voorbeeld B.V.", division: 123, languageCode: "nl" },
        },
      ],
    });
    api.json("GET", `/api/chat/${demoConnection.id}/divisions`, {
      divisions: [
        { code: 123, name: "Voorbeeld Nederland", hid: 1001 },
        { code: 124, name: "Voorbeeld België", hid: 1002 },
        { code: 125, name: "Voorbeeld Holding", hid: 1003 },
      ],
      currentDivision: 123,
      languageCode: "nl",
    });
    api.json("GET", "/api/chat/conversations", { conversations: [] });
    api.json("GET", "/api/audio/capabilities", {
      enabled: false,
      defaultVoice: "alloy",
      voices: [],
      sampleRate: 24000,
    });

    await page.goto(appPath(lang, `/connected/${demoConnection.id}`));
    await page.getByTestId("text-connected-title").waitFor();
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/verbonden-${lang}.png` });
  });
}

/* ------------------------------------------------------------------ */
/* Chat: the approval card for a write action                          */
/* ------------------------------------------------------------------ */

function sse(events: Array<Record<string, unknown>>): string {
  return events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
}

function mockChatShell(api: MockApi): void {
  api.authenticate(demoUser);
  // The chat opens over the dashboard, so its queries need answers too.
  mockDashboardQueries(api, [demoConnection.id]);
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

for (const lang of langs) {
  test(`chat approval card (${lang})`, async ({ api, page }) => {
    mockChatShell(api);
    const nl = lang === "nl";
    api.on("POST", `/api/chat/${demoConnection.id}`, () => ({
      contentType: "text/event-stream",
      rawBody: sse([
        {
          type: "tool_call",
          id: "tool-invoice",
          name: "exact_online_sales_invoices_create",
          arguments: {
            division: 123,
            OrderedBy: "Acme Group",
            Description: nl ? "Consultancy juli 2026" : "Consulting July 2026",
            SalesInvoiceLines: [
              {
                Item: nl ? "Consultancy-uren" : "Consulting hours",
                Quantity: 12,
                NetPrice: 95,
              },
            ],
          },
          requiresConfirmation: true,
          pendingActionCount: 1,
        },
        { type: "thread", threadId: "thread-docs" },
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
          ? "Maak een conceptfactuur voor Acme Group: 12 consultancy-uren van € 95."
          : "Draft an invoice for Acme Group: 12 consulting hours at €95.",
      );
    await page.getByTestId("button-send-message").click();
    await page.getByTestId("dialog-confirm-tool").waitFor();
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/goedkeuring-${lang}.png` });
  });
}

/* ------------------------------------------------------------------ */
/* Connection management: schedules and the tools panel                */
/* ------------------------------------------------------------------ */

for (const lang of langs) {
  test(`schedules panel (${lang})`, async ({ api, page }) => {
    mockConnectionShell(api, lang);
    await page.goto(appPath(lang, `/connections/${demoConnection.id}/schedules`));
    await page.getByTestId("schedule-row-schedule-close").waitFor();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/planningen-${lang}.png` });
  });

  test(`tools panel (${lang})`, async ({ api, page }) => {
    mockConnectionShell(api, lang);
    await page.goto(appPath(lang, `/connections/${demoConnection.id}/tools`));
    await page.getByTestId("switch-category-sales").waitFor();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/tools-${lang}.png` });
  });
}

/* ------------------------------------------------------------------ */
/* Team and billing                                                    */
/* ------------------------------------------------------------------ */

const teamResponse = {
  organization: { id: "org-demo", name: "Voorbeeld B.V.", createdAt: "2026-01-15T09:00:00.000Z" },
  role: "admin" as const,
  currentUserId: demoUser.id,
  members: [
    {
      id: demoUser.id,
      email: demoUser.email,
      firstName: "Sanne",
      lastName: "van Dijk",
      profileImageUrl: null,
      organizationRole: "admin",
    },
    {
      id: "user-thomas",
      email: "thomas@voorbeeld.nl",
      firstName: "Thomas",
      lastName: "de Boer",
      profileImageUrl: null,
      organizationRole: "member",
    },
    {
      id: "user-fatima",
      email: "fatima@voorbeeld.nl",
      firstName: "Fatima",
      lastName: "el Idrissi",
      profileImageUrl: null,
      organizationRole: "member",
    },
  ],
  invitations: [
    {
      id: "invite-pieter",
      email: "pieter@voorbeeld.nl",
      role: "member",
      createdAt: "2026-08-15T09:00:00.000Z",
      expiresAt: "2026-08-22T09:00:00.000Z",
      expired: false,
    },
  ],
  emailConfigured: true,
};

const billingOverview = {
  organization: { id: "org-demo", name: "Voorbeeld B.V." },
  role: "admin" as const,
  memberCount: 3,
  subscriptions: [
    {
      appId: exactOnlineApp.id,
      appSlug: "exact-online",
      appName: "Exact Online",
      tier: "business",
      status: "active",
      cancelAtPeriodEnd: false,
      currentPeriodEnd: "2026-09-12T00:00:00.000Z",
      priceCents: 29900,
      limits: {
        maxAdministrations: 5,
        maxMembers: 5,
        agentTokenBudget: 100_000_000,
        toolCallBudget: 25_000,
      },
    },
  ],
  usage: {
    agentTokens: { used: 38_400_000, budget: 100_000_000 },
    toolCalls: { used: 9_120, budget: 25_000 },
    exhausted: false,
  },
};

const invoices = [
  {
    id: "inv-2026-08",
    number: "F2026-0163",
    status: "paid",
    created: "2026-08-12T00:00:00.000Z",
    totalCents: 36179,
    currency: "eur",
    hostedInvoiceUrl: "https://invoice.stripe.com/i/voorbeeld",
    invoicePdf: "https://invoice.stripe.com/i/voorbeeld/pdf",
  },
  {
    id: "inv-2026-07",
    number: "F2026-0148",
    status: "paid",
    created: "2026-07-12T00:00:00.000Z",
    totalCents: 36179,
    currency: "eur",
    hostedInvoiceUrl: "https://invoice.stripe.com/i/voorbeeld",
    invoicePdf: "https://invoice.stripe.com/i/voorbeeld/pdf",
  },
];

function mockTeamShell(api: MockApi): void {
  api.authenticate(demoUser);
  api.json("GET", "/api/connections", {
    connections: [{ ...demoConnection, app: exactOnlineApp }],
  });
  api.json("GET", "/api/organization", teamResponse);
  api.json("GET", "/api/billing/subscription", billingOverview);
  api.json("GET", "/api/billing/invoices", { invoices });
}

for (const lang of langs) {
  test(`team page (${lang})`, async ({ api, page }) => {
    mockTeamShell(api);
    await page.goto(appPath(lang, "/team"));
    await page.getByTestId("card-members").waitFor();
    await page.waitForTimeout(1200);
    await frameFromTop(page, "card-members");
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/team-${lang}.png` });
  });

  test(`billing panel (${lang})`, async ({ api, page }) => {
    mockTeamShell(api);
    await page.goto(appPath(lang, "/team"));
    await page.getByTestId("card-billing").waitFor();
    await page.waitForTimeout(1200);
    await frameFromTop(page, "card-billing");
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/abonnement-${lang}.png` });
  });
}
