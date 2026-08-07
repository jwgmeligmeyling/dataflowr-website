/**
 * Dumps the MCP Apps views' HTML out of the connector package so
 * capture-mcp-release.spec.ts can serve them as app-view fixtures. Run from
 * the Claire repo root:
 *
 *   npx tsx capture-mcp-release-view.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { getUiViewHtml } from "./packages/connector-exact/src/apps/index";

const views = {
  "report-viewer": "ui://dataflowr/exact-online/report-viewer.html",
  "closing-report": "ui://dataflowr/exact-online/closing-report.html",
};

mkdirSync("e2e/fixtures/views", { recursive: true });
for (const [name, uri] of Object.entries(views)) {
  const html = getUiViewHtml(uri);
  if (!html) throw new Error(`no view HTML for ${uri}`);
  writeFileSync(`e2e/fixtures/views/${name}.html`, html);
  console.log(`wrote e2e/fixtures/views/${name}.html (${html.length} bytes)`);
}
