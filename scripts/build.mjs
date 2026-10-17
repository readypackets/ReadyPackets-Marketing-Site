import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { pages, nav, site, faqsForSchema } from "./site-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "src");
const output = path.join(root, "dist");
let assetRevision = "unbuilt";

function versionLocalAssetUrls(html) {
  return html.replace(/(=(?:"|')assets\/(?:css|js|brand)\/[^"'?#\s>]+)(?=(?:"|'))/g, `$1?v=${assetRevision}`);
}

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

function navHtml(current) {
  return nav.map(([href, label]) => `<a href="${href}"${href === current ? ' aria-current="page"' : ""}>${label}</a>`).join("\n");
}

function themeControlHtml() {
  return `<button class="theme-toggle" type="button" data-theme-toggle data-theme-state="system" aria-label="Color theme: System. Activate to switch to Light." title="Color theme: System. Activate to switch to Light."><svg data-theme-icon="system" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M8 20h8M12 16v4"></path></svg><svg data-theme-icon="light" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg><svg data-theme-icon="dark" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.6 15.6A8.5 8.5 0 0 1 8.4 3.4 8.5 8.5 0 1 0 20.6 15.6Z"></path></svg><span class="sr-only" data-theme-label>Color theme: System</span></button>`;
}

function approvedHeaderLogoHtml() {
  const lockup = (variant, decorative = false) => `<span class="brand-mark brand-header-lockup brand-mark--${variant}"${decorative ? ' aria-hidden="true"' : ""}><img class="brand-header-lockup__icon" src="assets/brand/readypackets-approved-header-icon-${variant}.png" width="880" height="905" alt=""><span class="brand-header-lockup__details"><img class="brand-header-lockup__wordmark" src="assets/brand/readypackets-approved-header-wordmark-${variant}.png" width="1865" height="345" alt="${decorative ? "" : "ReadyPackets™ — Your Business, Professionally Packeted™"}"><img class="brand-header-lockup__rule" src="assets/brand/readypackets-approved-header-rule-${variant}.png" width="1854" height="74" alt=""><img class="brand-header-lockup__tagline" src="assets/brand/readypackets-approved-header-tagline-${variant}.png" width="1770" height="175" alt=""></span></span>`;
  return `<a class="brand brand--header-approved-lockup" href="index.html" aria-label="ReadyPackets home">${lockup("light")}${lockup("dark", true)}</a>`;
}

function footerHtml() {
  return `<footer class="footer"><div class="wrap footer-grid"><div><a class="brand brand--footer-square" href="index.html" aria-label="ReadyPackets home"><img src="assets/brand/readypackets-full-lockup-square-dark.webp" width="2048" height="2048" alt="ReadyPackets™ — Your Business, Professionally Packeted™"></a><p class="footer-tagline">Your Business, Professionally Packeted™</p><p>Structured business documentation and practical operating foundations for founders ready to move forward.</p></div><div><h2>Explore</h2><ul><li><a href="process.html">The process</a></li><li><a href="solutions.html">What we build</a></li><li><a href="faq.html">Frequently asked questions</a></li><li><a href="about.html">About ReadyPackets</a></li></ul></div><div><h2>Portal</h2><ul><li><a href="${site.portalUrl}/register" data-portal-link>Create an account</a></li><li><a href="${site.portalUrl}/login" data-portal-link>Sign in</a></li><li><a href="${site.alternatePortalUrl}/login" data-portal-link>Alternate portal address</a></li></ul></div><div><h2>Site information</h2><ul><li><a href="contact.html">Contact</a></li><li><a href="privacy.html">Privacy &amp; cookies</a></li><li><a href="accessibility.html">Accessibility</a></li><li><a href="terms.html">Website terms</a></li></ul></div></div><div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} ReadyPackets. All rights reserved.</span><button class="text-button" type="button" data-consent-open>Cookie preferences</button></div></footer>`;
}

function consentHtml() {
  return `<aside id="cookie-banner" class="cookie-banner" aria-label="Cookie preferences" hidden><p><strong>Your privacy choices.</strong> ReadyPackets uses essential storage to remember this preference. Optional analytics are off until you choose Analytics. Read the <a href="privacy.html">Privacy &amp; cookie notice</a>.</p><div class="cookie-actions"><button class="button button--gold" type="button" data-consent-accept>Accept analytics</button><button class="button button--light" type="button" data-consent-essential>Use essential only</button><button class="text-button" type="button" data-consent-open>Customize</button></div></aside><dialog id="cookie-preferences" aria-labelledby="cookie-title"><form method="dialog"><h2 id="cookie-title">Privacy preferences</h2><p>Essential preference storage is required to remember this decision. Optional analytics are disabled unless you select them.</p><label><input type="checkbox" checked disabled><span><strong>Essential</strong><br>Remembers your privacy preference. Required for the site to honor your selection.</span></label><label><input id="analytics-preference" type="checkbox"><span><strong>Analytics (optional)</strong><br>Allows configured Microsoft Clarity and/or PostHog measurement after affirmative consent. The marketing site disables autocapture and session replay.</span></label><div class="dialog-actions"><button class="button button--outline" type="button" data-consent-close>Cancel</button><button class="button" value="save" type="submit">Save preferences</button></div></form></dialog>`;
}

function pageSchema(page) {
  const graph = [
    { "@context": "https://schema.org", "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url, logo: `${site.url}/assets/brand/readypackets-full-lockup-square-light-1200.png`, description: site.description, address: { "@type": "PostalAddress", streetAddress: site.address[0], addressLocality: "Lanham", addressRegion: "MD", postalCode: "20706", addressCountry: "US" } },
    { "@context": "https://schema.org", "@type": "WebSite", "@id": `${site.url}/#website`, name: site.name, url: site.url, publisher: { "@id": `${site.url}/#organization` }, inLanguage: "en-US" },
  ];
  if (page.faq) graph.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqsForSchema.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) });
  return graph.map(escapeJson).map((json) => `<script type="application/ld+json">${json}</script>`).join("\n");
}

function render(filename, page) {
  const canonical = `${site.url}/${filename === "index.html" ? "" : filename}`;
  return `<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#F7FAFB">
  <meta name="description" content="${page.description}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta name="author" content="ReadyPackets">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="icon" type="image/webp" href="assets/brand/readypackets-full-lockup-square-light.webp">
  <link rel="manifest" href="site.webmanifest">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ReadyPackets">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site.url}/assets/brand/readypackets-full-lockup-square-light-1200.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <title>${page.title}</title>
  <script src="assets/js/theme.js"></script>
  <link rel="stylesheet" href="assets/css/site.css">
  <script defer src="assets/js/site-config.js"></script>
  <script defer src="assets/js/site.js"></script>
  ${pageSchema(page)}
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="header"><div class="wrap header-row">${approvedHeaderLogoHtml()}<div class="header-controls"><nav id="site-navigation" class="nav" aria-label="Primary navigation">${navHtml(filename)}<a class="button" href="${site.portalUrl}/register" data-portal-link>Start in portal <span aria-hidden="true">→</span></a></nav>${themeControlHtml()}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" data-menu-toggle>Menu <span aria-hidden="true">☰</span></button></div></div></header>
  <main id="main-content">${page.body}</main>
  ${footerHtml()}
  ${consentHtml()}
</body>
</html>`;
}

const brandAssets = await readdir(path.join(source, "assets", "brand"));
const versionedAssetSources = [
  path.join(source, "assets", "css", "site.css"),
  path.join(source, "assets", "js", "site.js"),
  path.join(source, "assets", "js", "theme.js"),
  path.join(source, "assets", "js", "site-config.js"),
  ...brandAssets.sort().map((filename) => path.join(source, "assets", "brand", filename)),
];
const revisionHash = createHash("sha256");
for (const file of versionedAssetSources) revisionHash.update(await readFile(file));
assetRevision = revisionHash.digest("hex").slice(0, 12);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(source, "assets"), path.join(output, "assets"), { recursive: true });
await cp(path.join(source, ".htaccess"), path.join(output, ".htaccess"));
await cp(path.join(source, "favicon.ico"), path.join(output, "favicon.ico"));
await cp(path.join(source, "site.webmanifest"), path.join(output, "site.webmanifest"));
await cp(path.join(source, "robots.txt"), path.join(output, "robots.txt"));
await cp(path.join(source, "llms.txt"), path.join(output, "llms.txt"));
await cp(path.join(source, "ai.txt"), path.join(output, "ai.txt"));
await cp(path.join(source, "sitemap.xml"), path.join(output, "sitemap.xml"));
await cp(path.join(source, "humans.txt"), path.join(output, "humans.txt"));
await writeFile(path.join(output, "404.html"), versionLocalAssetUrls(await readFile(path.join(source, "404.html"), "utf8")), "utf8");
await cp(path.join(source, ".well-known"), path.join(output, ".well-known"), { recursive: true });
for (const [filename, page] of Object.entries(pages)) await writeFile(path.join(output, filename), versionLocalAssetUrls(render(filename, page)), "utf8");

const files = await readdir(output);
console.log(`Built ${Object.keys(pages).length} HTML pages and ${files.length} root artifacts in dist/.`);
