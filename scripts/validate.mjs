import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { pages, site } from "./site-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const required = [
  ".htaccess", "404.html", "robots.txt", "sitemap.xml", "llms.txt", "ai.txt", "humans.txt", "site.webmanifest", ".well-known/security.txt",
  "assets/css/site.css", "assets/js/site.js", "assets/js/theme.js", "assets/js/site-config.js",
  "assets/brand/readypackets-full-lockup-square-light.webp", "assets/brand/readypackets-full-lockup-square-dark.webp",
  "assets/brand/readypackets-document-flow-light-wordmark-tm.svg", "assets/brand/readypackets-document-flow-dark-wordmark-tm.svg",
  "assets/brand/readypackets-full-lockup-square-light-compact-mark.png", "assets/brand/readypackets-full-lockup-square-dark-compact-mark.png",
  "assets/brand/readypackets-full-lockup-square-light-1200.png", "assets/brand/readypackets-full-lockup-square-dark-1200.png", "favicon.ico",
  ...Object.keys(pages),
];
for (const item of required) await access(path.join(dist, item));

const publicFiles = await readdir(dist);
assert.ok(publicFiles.length > 8, "Expected built static-site artifacts");
const hostingerManifest = JSON.parse(await readFile(path.join(root, "deploy", "hostinger-static-package.json"), "utf8"));
assert.equal(hostingerManifest.private, true, "Hostinger build manifest must not be publishable");
assert.equal(hostingerManifest.scripts?.build, "node -e \"console.log('ReadyPackets prebuilt static site: no source build required.')\"");
assert.ok(!("dependencies" in hostingerManifest), "Hostinger build manifest must not add runtime dependencies");
assert.ok(!("devDependencies" in hostingerManifest), "Hostinger build manifest must not add build dependencies");
const sourceJs = await readFile(path.join(dist, "assets/js/site.js"), "utf8");
const themeJs = await readFile(path.join(dist, "assets/js/theme.js"), "utf8");
assert.match(sourceJs, /consentv2/);
assert.match(sourceJs, /autocapture: false/);
assert.match(sourceJs, /disable_session_recording: true/);
assert.ok(!sourceJs.includes("unsafe-inline"));
assert.match(themeJs, /rp_marketing_theme_v1/);
assert.match(themeJs, /\["system", "light", "dark"\]/);
assert.match(themeJs, /prefers-color-scheme: dark/);
assert.match(themeJs, /configureThemeControl/);
assert.match(themeJs, /data-theme-toggle/);
assert.match(themeJs, /nextPreference/);
assert.match(sourceJs, /configurePacketExplorers/);
assert.match(sourceJs, /ArrowLeft/);
assert.match(sourceJs, /aria-selected/);
assert.ok(!/https?:\/\//i.test(themeJs), "Theme preference loader must not contact an external origin");

for (const [file, page] of Object.entries(pages)) {
  const html = await readFile(path.join(dist, file), "utf8");
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /<a class="skip-link" href="#main-content">/);
  assert.match(html, /<meta name="description" content="[^"]+">/);
  assert.match(html, /<meta name="color-scheme" content="light dark">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.readypackets\.com\//);
  assert.match(html, /<meta name="robots" content="index,follow/);
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.match(html, /data-consent-open/);
  assert.match(html, /data-theme-toggle/);
  assert.match(html, /data-theme-state="system"/);
  assert.match(html, /data-theme-icon="system"/);
  assert.match(html, /<script src="assets\/js\/theme\.js"><\/script>[\s\S]*<link rel="stylesheet" href="assets\/css\/site\.css">/);
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

for (const logo of ["readypackets-full-lockup-square-light.webp", "readypackets-full-lockup-square-dark.webp", "readypackets-full-lockup-square-light-1200.png", "readypackets-full-lockup-square-dark-1200.png"]) {
  const info = await stat(path.join(dist, "assets/brand", logo));
  assert.ok(info.size > 20_000, `${logo} must be a substantial supplied brand asset`);
}
for (const logo of ["readypackets-full-lockup-square-light-compact-mark.png", "readypackets-full-lockup-square-dark-compact-mark.png"]) {
  const info = await stat(path.join(dist, "assets/brand", logo));
  assert.ok(info.size > 5_000, `${logo} must be a non-empty derived navigation mark`);
}
assert.match(await readFile(path.join(dist, "index.html"), "utf8"), /readypackets-full-lockup-square-light\.webp/);
assert.match(await readFile(path.join(dist, "index.html"), "utf8"), /readypackets-full-lockup-square-dark\.webp/);
const indexHtml = await readFile(path.join(dist, "index.html"), "utf8");
assert.match(indexHtml, /brand--header-wordmark/);
assert.match(indexHtml, /readypackets-document-flow-light-wordmark-tm\.svg/);
assert.match(indexHtml, /readypackets-document-flow-dark-wordmark-tm\.svg/);

for (const file of ["index.html", "solutions.html"]) {
  const html = await readFile(path.join(dist, file), "utf8");
  assert.equal((html.match(/data-packet-card/g) || []).length, 7, `${file} must render all seven packet groups`);
  assert.match(html, /role="tablist"/);
  assert.match(html, /data-packet-tier/);
  assert.match(html, /The All-In/);
  assert.ok(!/\$\s*\d/.test(html), `${file} must not display a packet price`);
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
assert.match(headers, /!\^\(\?:www\|go\)\\\.readypackets\\\.com\$/);
assert.match(headers, /SetEnvIfNoCase Host "\^go\\\.readypackets\\\.com/);
assert.match(headers, /X-Robots-Tag "noindex, nofollow, noarchive" env=rp_staging_host/);
const stylesheet = await readFile(path.join(dist, "assets/css/site.css"), "utf8");
assert.match(stylesheet, /:root\[data-theme="dark"\]/);
assert.match(stylesheet, /@media \(prefers-color-scheme: dark\)/);
assert.match(stylesheet, /\.theme-toggle/);
const notFound = await readFile(path.join(dist, "404.html"), "utf8");
assert.match(notFound, /<meta name="color-scheme" content="light dark">/);
assert.match(notFound, /<script src="assets\/js\/theme\.js"><\/script>/);
assert.match(notFound, /data-theme-toggle/);

for (const file of required) {
  const info = await stat(path.join(dist, file));
  assert.ok(info.size > 0, `${file} is empty`);
}
console.log(`Validated ${Object.keys(pages).length} static pages, ${required.length} required artifacts, accessibility/consent markers, SEO metadata, machine discovery files, and self-hosted asset boundaries for ${site.url}.`);
