import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { pages, site } from "./site-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

function relativeLuminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi)?.map((value) => Number.parseInt(value, 16) / 255);
  assert.equal(channels?.length, 3, `Expected a six-digit hex color: ${hex}`);
  const [red, green, blue] = channels.map((value) => value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}

function contrastRatio(foreground, background) {
  const [first, second] = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
  return (first + 0.05) / (second + 0.05);
}

const required = [
  ".htaccess", "404.html", "robots.txt", "sitemap.xml", "llms.txt", "ai.txt", "humans.txt", "site.webmanifest", ".well-known/security.txt",
  "assets/css/site.css", "assets/js/site.js", "assets/js/theme.js", "assets/js/site-config.js",
  "assets/brand/readypackets-approved-header-icon-light.png", "assets/brand/readypackets-approved-header-icon-dark.png",
  "assets/brand/readypackets-approved-header-wordmark-light.png", "assets/brand/readypackets-approved-header-wordmark-dark.png",
  "assets/brand/readypackets-approved-header-rule-light.png", "assets/brand/readypackets-approved-header-rule-dark.png",
  "assets/brand/readypackets-approved-header-tagline-light.png", "assets/brand/readypackets-approved-header-tagline-dark.png",
  "assets/brand/readypackets-approved-icon-light-192.png", "assets/brand/readypackets-approved-icon-light-512.png", "favicon.ico",
  ...Object.keys(pages),
];
for (const item of required) await access(path.join(dist, item));

const approvedBrandFiles = new Set([
  "readypackets-approved-header-icon-light.png",
  "readypackets-approved-header-icon-dark.png",
  "readypackets-approved-header-wordmark-light.png",
  "readypackets-approved-header-wordmark-dark.png",
  "readypackets-approved-header-rule-light.png",
  "readypackets-approved-header-rule-dark.png",
  "readypackets-approved-header-tagline-light.png",
  "readypackets-approved-header-tagline-dark.png",
  "readypackets-approved-icon-light-192.png",
  "readypackets-approved-icon-light-512.png",
]);
const deployedBrandFiles = await readdir(path.join(dist, "assets", "brand"));
assert.deepEqual(new Set(deployedBrandFiles), approvedBrandFiles, "Only explicitly approved ReadyPackets artwork may be deployed");

const publicFiles = await readdir(dist);
assert.ok(publicFiles.length > 8, "Expected built static-site artifacts");
const hostingerManifest = JSON.parse(await readFile(path.join(root, "deploy", "hostinger-static-package.json"), "utf8"));
assert.equal(hostingerManifest.private, true, "Hostinger build manifest must not be publishable");
assert.equal(hostingerManifest.scripts?.build, "node -e \"console.log('ReadyPackets prebuilt static site: no source build required.')\"");
assert.ok(!("dependencies" in hostingerManifest), "Hostinger build manifest must not add runtime dependencies");
assert.ok(!("devDependencies" in hostingerManifest), "Hostinger build manifest must not add build dependencies");
const sourceJs = await readFile(path.join(dist, "assets/js/site.js"), "utf8");
const themeJs = await readFile(path.join(dist, "assets/js/theme.js"), "utf8");
assert.match(sourceJs, /rp_website_consent_v2/);
assert.match(sourceJs, /consentv2/);
assert.match(sourceJs, /autocapture: false/);
assert.match(sourceJs, /disable_session_recording: true/);
assert.ok(!sourceJs.includes("unsafe-inline"));
assert.match(themeJs, /rp_website_theme_v1/);
assert.match(themeJs, /\["system", "light", "dark"\]/);
assert.match(themeJs, /prefers-color-scheme: dark/);
assert.match(themeJs, /configureThemeControl/);
assert.match(themeJs, /data-theme-toggle/);
assert.match(themeJs, /nextPreference/);
assert.match(sourceJs, /configurePacketExplorers/);
assert.match(sourceJs, /closeOtherPackets/);
assert.match(sourceJs, /otherDisclosure !== disclosure && otherDisclosure\.open/);
assert.match(sourceJs, /applyAdvertising/);
assert.match(sourceJs, /adsensePublisherId/);
assert.match(sourceJs, /advertising-preference/);
assert.match(sourceJs, /data-ad-placement/);
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
  assert.match(html, /advertising-preference/);
  assert.match(html, /data-theme-toggle/);
  assert.match(html, /data-theme-state="system"/);
  assert.match(html, /data-theme-icon="system"/);
  assert.match(html, /<script src="\/assets\/js\/theme\.js\?v=[a-f0-9]{12}"><\/script>[\s\S]*<link rel="stylesheet" href="\/assets\/css\/site\.css\?v=[a-f0-9]{12}">/);
  assert.match(html, /data-portal-link/);
  assert.ok(!html.includes(`${site.portalUrl}/register`), `${file} must route public portal entry links to the portal root`);
  assert.ok(!/\sstyle\s*=/i.test(html), `${file} contains an inline style that strict CSP would block`);
  assert.ok(!html.includes("__PORTAL_ORIGIN__"), `${file} contains an unresolved portal placeholder`);
  assert.ok(!html.includes("localhost"), `${file} contains a localhost reference`);
  assert.ok(!html.includes("Manus"), `${file} contains a prohibited platform reference`);
  assert.ok(!/readypackets-(?:full-lockup-square|document-flow|mark-(?:light|dark))/i.test(html), `${file} contains retired ReadyPackets artwork`);
  assert.ok(html.includes(page.title), `${file} must contain its title`);

  for (const match of html.matchAll(/<(?:a|link|img|script)\b[^>]*?\s(?:href|src)="([^"]+)"[^>]*>/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|#|data:)/i.test(reference)) continue;
    const localReference = reference.split(/[?#]/, 1)[0];
    const target = localReference.startsWith("/")
      ? path.resolve(dist, `.${localReference}`)
      : path.resolve(path.dirname(path.join(dist, file)), localReference);
    assert.ok(target === dist || target.startsWith(`${dist}${path.sep}`), `${file} points outside the static artifact: ${reference}`);
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
assert.match(sitemap, /https:\/\/www\.readypackets\.com\/terms\//);
assert.match(sitemap, /https:\/\/www\.readypackets\.com\/refunds\//);
assert.match(llms, /Primary portal: https:\/\/my\.readypackets\.com/);
assert.ok(!llms.includes("Manus"));

for (const logo of ["readypackets-approved-header-icon-light.png", "readypackets-approved-header-icon-dark.png", "readypackets-approved-header-wordmark-light.png", "readypackets-approved-header-wordmark-dark.png"]) {
  const info = await stat(path.join(dist, "assets/brand", logo));
  assert.ok(info.size > 20_000, `${logo} must be a substantial approved brand asset`);
}
for (const logo of ["readypackets-approved-icon-light-192.png", "readypackets-approved-icon-light-512.png"]) {
  const info = await stat(path.join(dist, "assets/brand", logo));
  assert.ok(info.size > 1_000, `${logo} must be a non-empty approved app icon`);
}
const indexHtml = await readFile(path.join(dist, "index.html"), "utf8");
assert.match(indexHtml, /brand--header-approved-lockup/);
assert.match(indexHtml, /readypackets-approved-header-icon-light\.png/);
assert.match(indexHtml, /readypackets-approved-header-icon-dark\.png/);
assert.match(indexHtml, /readypackets-approved-header-wordmark-light\.png/);
assert.match(indexHtml, /readypackets-approved-header-wordmark-dark\.png/);
assert.match(indexHtml, /readypackets-approved-header-rule-light\.png/);
assert.match(indexHtml, /readypackets-approved-header-rule-dark\.png/);
assert.match(indexHtml, /readypackets-approved-header-tagline-light\.png/);
assert.match(indexHtml, /readypackets-approved-header-tagline-dark\.png/);
assert.match(indexHtml, /\/assets\/css\/site\.css\?v=[a-f0-9]{12}/);
assert.match(indexHtml, /\/assets\/brand\/readypackets-approved-header-icon-dark\.png\?v=[a-f0-9]{12}/);
assert.match(indexHtml, /\/assets\/brand\/readypackets-approved-header-tagline-light\.png\?v=[a-f0-9]{12}/);
assert.match(indexHtml, new RegExp(`<a class="button button--portal" href="${site.portalUrl}" data-portal-link>My Portal`));
assert.match(indexHtml, /readypackets-approved-icon-light-192\.png/);
assert.match(indexHtml, /readypackets-approved-header-icon-light\.png/);
assert.match(indexHtml, /readypackets-approved-header-icon-dark\.png/);
assert.match(indexHtml, /readypackets-approved-header-wordmark-dark\.png/);
assert.ok(!/readypackets-(?:full-lockup-square|document-flow|mark-(?:light|dark))/i.test(indexHtml), "Homepage must not use retired artwork");

for (const file of ["index.html", "solutions.html"]) {
  const html = await readFile(path.join(dist, file), "utf8");
  assert.equal((html.match(/data-packet-card/g) || []).length, 7, `${file} must render all seven approved packet groups`);
  assert.equal((html.match(/packet-tier-comparison/g) || []).length, 7, `${file} must render an accessible comparison region for every packet group`);
  assert.equal((html.match(/Included offerings/g) || []).length, 19, `${file} must render every approved tier`);
  assert.ok(!html.includes("Capital" + " &amp; Valuation Services"), `${file} must not render an excluded offering`);
  assert.match(html, /The All-In \(Master Bundle\)/);
  assert.match(html, /Everything in Basic, plus:/);
  assert.match(html, /Everything in Standard, plus:/);
  assert.ok(!/\$\s*\d/.test(html), `${file} must not display a packet price`);
}

for (const [file, placement] of [["index.html", "home-inline"], ["solutions.html", "solutions-inline"]]) {
  const html = await readFile(path.join(dist, file), "utf8");
  assert.match(html, new RegExp(`data-ad-placement="${placement}"`));
  assert.match(html, /class="ad-placement__label">Advertisement<\/span>/);
  assert.match(html, /data-ad-content/);
  assert.ok(!html.includes("adsbygoogle"), `${file} must not embed an advertising unit before configuration and consent`);
}

for (const [file, heading] of [["terms/index.html", "Terms of Use"], ["refunds/index.html", "Refund Policy"]]) {
  const html = await readFile(path.join(dist, file), "utf8");
  assert.match(html, new RegExp(`<p class="eyebrow">${heading}</p>`));
  assert.match(html, new RegExp(`https://www\\.readypackets\\.com/${file.replace("index.html", "")}`));
  assert.ok(!new RegExp("mark" + "eting\\s+(?:site|website)", "i").test(html), `${file} must refer to the ReadyPackets website`);
}

const contactHtml = await readFile(path.join(dist, "contact.html"), "utf8");
assert.match(contactHtml, /<section id="business-address" class="section section--soft">/);
assert.match(contactHtml, /<h2>Business address<\/h2>/);
assert.match(contactHtml, /7404 Executive Pl<br>Lanham, MD 20706<br>United States/);
assert.match(contactHtml, /not a walk-in location and is not monitored for customer correspondence/);
assert.ok(!contactHtml.includes("Visit or write"), "Contact page must not invite physical visits or mail correspondence");

const config = await readFile(path.join(dist, "assets/js/site-config.js"), "utf8");
assert.match(config, /clarityProjectId: ""/);
assert.match(config, /posthogProjectKey: ""/);
assert.ok(config.includes(`siteUrl: "${site.url}"`), "Public config canonical site URL must match rendered metadata");
assert.ok(config.includes(`portalUrl: "${site.portalUrl}"`), "Public config primary portal URL must match rendered portal links");
assert.ok(config.includes(`alternatePortalUrl: "${site.alternatePortalUrl}"`), "Public config alternate portal URL must match rendered portal links");
assert.match(config, /adsensePublisherId: ""/);
assert.match(config, /"home-inline": ""/);
assert.match(config, /"solutions-inline": ""/);
assert.ok(!/^\s*(?:[A-Za-z0-9_]*secret|password|privateKey|apiSecret)\s*:/im.test(config), "Public config must not contain a secret setting");
const headers = await readFile(path.join(dist, ".htaccess"), "utf8");
assert.ok(!headers.includes("unsafe-inline"));
assert.match(headers, /Content-Security-Policy/);
assert.match(headers, /!\^\(\?:www\|go\)\\\.readypackets\\\.com\$/);
assert.match(headers, /SetEnvIfNoCase Host "\^go\\\.readypackets\\\.com/);
assert.match(headers, /X-Robots-Tag "noindex, nofollow, noarchive" env=rp_staging_host/);
assert.match(headers, /pagead2\.googlesyndication\.com/);
assert.match(headers, /googleads\.g\.doubleclick\.net/);
const stylesheet = await readFile(path.join(dist, "assets/css/site.css"), "utf8");
assert.match(stylesheet, /:root\[data-theme="dark"\]/);
assert.match(stylesheet, /@media \(prefers-color-scheme: dark\)/);
assert.match(stylesheet, /\.theme-toggle/);
assert.match(stylesheet, /\.nav \.button--portal[^}]*border: 2px solid #0f5f55[^}]*background: #0f5f55[^}]*color: #fff/);
assert.match(stylesheet, /:root\[data-theme="dark"\] \.nav \.button--portal[^}]*border-color: #8ef4e6[^}]*background: #8ef4e6[^}]*color: #082a2e/);
assert.match(stylesheet, /:root:not\(\[data-theme\]\) \.nav \.button--portal[^}]*background: #8ef4e6[^}]*color: #082a2e/);
assert.ok(contrastRatio("#ffffff", "#0f5f55") >= 4.5, "Light-theme portal CTA must meet WCAG AA text contrast");
assert.ok(contrastRatio("#082a2e", "#8ef4e6") >= 4.5, "Dark-theme portal CTA must meet WCAG AA text contrast");
assert.match(stylesheet, /\.logo-lockup--square[^}]*aspect-ratio: 1 \/ 1[^}]*object-fit: contain/);
assert.match(stylesheet, /\.brand-header-lockup__tagline/);
assert.match(stylesheet, /\.packet-card\.is-open[^}]*grid-column: 1 \/ -1/);
assert.match(stylesheet, /\.packet-tier-comparison/);
assert.match(stylesheet, /\.ad-placement\[hidden\]/);
const notFound = await readFile(path.join(dist, "404.html"), "utf8");
assert.match(notFound, /<meta name="color-scheme" content="light dark">/);
assert.match(notFound, /<script src="assets\/js\/theme\.js\?v=[a-f0-9]{12}"><\/script>/);
assert.match(notFound, /data-theme-toggle/);
assert.match(notFound, /readypackets-approved-header-tagline-light\.png/);

for (const file of required) {
  const info = await stat(path.join(dist, file));
  assert.ok(info.size > 0, `${file} is empty`);
}
console.log(`Validated ${Object.keys(pages).length} static pages, ${required.length} required artifacts, accessibility/consent markers, SEO metadata, machine discovery files, and self-hosted asset boundaries for ${site.url}.`);
