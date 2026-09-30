import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { pages, site } from "./site-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const required = [
  ".htaccess", "404.html", "robots.txt", "sitemap.xml", "llms.txt", "ai.txt", "humans.txt", "site.webmanifest", ".well-known/security.txt",
  "assets/css/site.css", "assets/js/site.js", "assets/js/site-config.js", "assets/brand/readypackets-document-flow-light-tm.svg", "assets/brand/readypackets-document-flow-dark-tm.svg",
  "assets/brand/readypackets-document-flow-light-wordmark-tm.svg", "assets/brand/readypackets-document-flow-dark-wordmark-tm.svg", "favicon.ico",
  ...Object.keys(pages),
];
for (const item of required) await access(path.join(dist, item));

const publicFiles = await readdir(dist);
assert.ok(publicFiles.length > 8, "Expected built static-site artifacts");
const sourceJs = await readFile(path.join(dist, "assets/js/site.js"), "utf8");
assert.match(sourceJs, /consentv2/);
assert.match(sourceJs, /autocapture: false/);
assert.match(sourceJs, /disable_session_recording: true/);
assert.ok(!sourceJs.includes("unsafe-inline"));

for (const [file, page] of Object.entries(pages)) {
  const html = await readFile(path.join(dist, file), "utf8");
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /<a class="skip-link" href="#main-content">/);
  assert.match(html, /<meta name="description" content="[^"]+">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.readypackets\.com\//);
  assert.match(html, /<meta name="robots" content="index,follow/);
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.match(html, /data-consent-open/);
  assert.match(html, /data-portal-link/);
  assert.ok(!/\sstyle\s*=/i.test(html), `${file} contains an inline style that strict CSP would block`);
  assert.ok(!html.includes("__PORTAL_ORIGIN__"), `${file} contains an unresolved portal placeholder`);
  assert.ok(!html.includes("localhost"), `${file} contains a localhost reference`);
  assert.ok(!html.includes("Manus"), `${file} contains a prohibited platform reference`);
  assert.ok(html.includes(page.title), `${file} must contain its title`);

  for (const match of html.matchAll(/<(?:a|link|img|script)\b[^>]*?\s(?:href|src)="([^"]+)"[^>]*>/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|#|data:)/i.test(reference)) continue;
    const target = path.resolve(path.dirname(path.join(dist, file)), reference);
    assert.ok(target.startsWith(`${dist}${path.sep}`), `${file} points outside the static artifact: ${reference}`);
    await access(target);
  }
  for (const image of html.matchAll(/<img\b([^>]*)>/g)) {
    assert.match(image[1], /\salt="[^"]*"/, `${file} contains an image without alt text`);
  }
}

const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
const llms = await readFile(path.join(dist, "llms.txt"), "utf8");
assert.match(robots, /Sitemap: https:\/\/www\.readypackets\.com\/sitemap\.xml/);
assert.match(sitemap, /https:\/\/www\.readypackets\.com\/solutions\.html/);
assert.match(llms, /Primary portal: https:\/\/my\.readypackets\.com/);
assert.ok(!llms.includes("Manus"));

for (const logo of ["readypackets-document-flow-light-tm.svg", "readypackets-document-flow-dark-tm.svg", "readypackets-document-flow-light-wordmark-tm.svg", "readypackets-document-flow-dark-wordmark-tm.svg"]) {
  const svg = await readFile(path.join(dist, "assets/brand", logo), "utf8");
  assert.ok(svg.includes("™"), `${logo} must include the trademark glyph`);
  assert.ok(!/<script\b|\son[a-z]+\s*=/i.test(svg), `${logo} contains executable SVG content`);
  assert.ok(!/(?:href|src)\s*=\s*["'](?:https?:|\/\/|data:|javascript:)/i.test(svg), `${logo} contains external SVG content`);
}

const config = await readFile(path.join(dist, "assets/js/site-config.js"), "utf8");
assert.match(config, /clarityProjectId: ""/);
assert.match(config, /posthogProjectKey: ""/);
assert.ok(config.includes(`siteUrl: "${site.url}"`), "Public config canonical site URL must match rendered metadata");
assert.ok(config.includes(`portalUrl: "${site.portalUrl}"`), "Public config primary portal URL must match rendered portal links");
assert.ok(config.includes(`alternatePortalUrl: "${site.alternatePortalUrl}"`), "Public config alternate portal URL must match rendered portal links");
assert.ok(!/^\s*(?:[A-Za-z0-9_]*secret|password|privateKey|apiSecret)\s*:/im.test(config), "Public config must not contain a secret setting");
const headers = await readFile(path.join(dist, ".htaccess"), "utf8");
assert.ok(!headers.includes("unsafe-inline"));
assert.match(headers, /Content-Security-Policy/);

for (const file of required) {
  const info = await stat(path.join(dist, file));
  assert.ok(info.size > 0, `${file} is empty`);
}
console.log(`Validated ${Object.keys(pages).length} static pages, ${required.length} required artifacts, accessibility/consent markers, SEO metadata, machine discovery files, and self-hosted asset boundaries for ${site.url}.`);
