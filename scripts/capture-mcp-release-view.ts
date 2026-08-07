/**
 * Dumps an MCP Apps view's HTML out of the connector package so
 * capture-mcp-release.spec.ts can serve it as the app-view fixture. Run from
 * the Claire repo root:
 *
 *   npx tsx capture-mcp-release-view.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { getUiViewHtml } from "./packages/connector-exact/src/apps/index";

const uri = "ui://dataflowr/exact-online/report-viewer.html";
const html = getUiViewHtml(uri);
if (!html) throw new Error(`no view HTML for ${uri}`);

mkdirSync("e2e/fixtures/views", { recursive: true });
writeFileSync("e2e/fixtures/views/report-viewer.html", html);
console.log(`wrote e2e/fixtures/views/report-viewer.html (${html.length} bytes)`);
