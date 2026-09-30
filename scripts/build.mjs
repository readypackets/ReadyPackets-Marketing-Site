import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { pages, nav, site, faqsForSchema } from "./site-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "src");
const output = path.join(root, "dist");

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

function navHtml(current) {
  return nav.map(([href, label]) => `<a href="${href}"${href === current ? ' aria-current="page"' : ""}>${label}</a>`).join("\n");
}

function footerHtml() {
  return `<footer class="footer"><div class="wrap footer-grid"><div><a class="brand" href="index.html" aria-label="ReadyPackets home"><img src="assets/brand/readypackets-document-flow-dark-wordmark-tm.svg" width="2800" height="924" alt="ReadyPackets™"></a><p class="footer-tagline">Your Business, Professionally Packeted™</p><p>Structured business documentation and practical operating foundations for founders ready to move forward.</p></div><div><h2>Explore</h2><ul><li><a href="process.html">The process</a></li><li><a href="solutions.html">What we build</a></li><li><a href="faq.html">Frequently asked questions</a></li><li><a href="about.html">About ReadyPackets</a></li></ul></div><div><h2>Portal</h2><ul><li><a href="${site.portalUrl}/register" data-portal-link>Create an account</a></li><li><a href="${site.portalUrl}/login" data-portal-link>Sign in</a></li><li><a href="${site.alternatePortalUrl}/login" data-portal-link>Alternate portal address</a></li></ul></div><div><h2>Site information</h2><ul><li><a href="contact.html">Contact</a></li><li><a href="privacy.html">Privacy &amp; cookies</a></li><li><a href="accessibility.html">Accessibility</a></li><li><a href="terms.html">Website terms</a></li></ul></div></div><div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} ReadyPackets. All rights reserved.</span><button class="text-button" type="button" data-consent-open>Cookie preferences</button></div></footer>`;
}

function consentHtml() {
  return `<aside id="cookie-banner" class="cookie-banner" aria-label="Cookie preferences" hidden><p><strong>Your privacy choices.</strong> ReadyPackets uses essential storage to remember this preference. Optional analytics are off until you choose Analytics. Read the <a href="privacy.html">Privacy &amp; cookie notice</a>.</p><div class="cookie-actions"><button class="button button--gold" type="button" data-consent-accept>Accept analytics</button><button class="button button--light" type="button" data-consent-essential>Use essential only</button><button class="text-button" type="button" data-consent-open>Customize</button></div></aside><dialog id="cookie-preferences" aria-labelledby="cookie-title"><form method="dialog"><h2 id="cookie-title">Privacy preferences</h2><p>Essential preference storage is required to remember this decision. Optional analytics are disabled unless you select them.</p><label><input type="checkbox" checked disabled><span><strong>Essential</strong><br>Remembers your privacy preference. Required for the site to honor your selection.</span></label><label><input id="analytics-preference" type="checkbox"><span><strong>Analytics (optional)</strong><br>Allows configured Microsoft Clarity and/or PostHog measurement after affirmative consent. The marketing site disables autocapture and session replay.</span></label><div class="dialog-actions"><button class="button button--outline" type="button" data-consent-close>Cancel</button><button class="button" value="save" type="submit">Save preferences</button></div></form></dialog>`;
}

function pageSchema(page) {
  const graph = [
    { "@context": "https://schema.org", "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url, logo: `${site.url}/assets/brand/readypackets-document-flow-light-tm.svg`, description: site.description, address: { "@type": "PostalAddress", streetAddress: site.address[0], addressLocality: "Lanham", addressRegion: "MD", postalCode: "20706", addressCountry: "US" } },
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
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#0D1B2A">
  <meta name="description" content="${page.description}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta name="author" content="ReadyPackets">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="assets/brand/readypackets-mark-light.svg">
  <link rel="manifest" href="site.webmanifest">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ReadyPackets">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site.url}/assets/brand/readypackets-document-flow-light-tm.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <title>${page.title}</title>
  <link rel="stylesheet" href="assets/css/site.css">
  <script defer src="assets/js/site-config.js"></script>
  <script defer src="assets/js/site.js"></script>
  ${pageSchema(page)}
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="header"><div class="wrap header-row"><a class="brand" href="index.html" aria-label="ReadyPackets home"><img src="assets/brand/readypackets-document-flow-light-wordmark-tm.svg" width="2800" height="924" alt="ReadyPackets™"></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" data-menu-toggle>Menu <span aria-hidden="true">☰</span></button><nav id="site-navigation" class="nav" aria-label="Primary navigation">${navHtml(filename)}<a class="button" href="${site.portalUrl}/register" data-portal-link>Start in portal <span aria-hidden="true">→</span></a></nav></div></header>
  <main id="main-content">${page.body}</main>
  ${footerHtml()}
  ${consentHtml()}
</body>
</html>`;
}

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
await cp(path.join(source, "404.html"), path.join(output, "404.html"));
await cp(path.join(source, ".well-known"), path.join(output, ".well-known"), { recursive: true });
for (const [filename, page] of Object.entries(pages)) await writeFile(path.join(output, filename), render(filename, page), "utf8");

const files = await readdir(output);
console.log(`Built ${Object.keys(pages).length} HTML pages and ${files.length} root artifacts in dist/.`);
