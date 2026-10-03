# ReadyPackets Marketing Website

A **fully independent, static** ReadyPackets marketing website for Hostinger, Bluehost, Cloudflare Pages, S3-compatible static hosting, or comparable shared hosting.

> It contains **no portal runtime, database connection, customer data, customer files, portal authentication, portal cookies, server-side API, Manus dependency, or portal secret**.

The public marketing site links visitors to the separately deployed ReadyPackets portal:

- Primary: `https://my.readypackets.com`
- Alternate: `https://portal.readypackets.com`

## What ships

- Story-led landing page with an explanation of the ReadyPackets process
- Public pages for process, solution areas, FAQ, about, contact, privacy/cookies, accessibility, and website terms
- Semantic HTML, responsive CSS, keyboard-first navigation, reduced-motion support, and WCAG 2.2 AA design/test target
- System-first Light/Dark/System icon control with local-only explicit preference storage
- Indexable server-rendered-in-build HTML—no JavaScript required for core content
- Canonical tags, Open Graph/Twitter metadata, Organization/WebSite/FAQ schema, XML sitemap, `robots.txt`, `llms.txt`, and `ai.txt`
- Consent-first Microsoft Clarity and PostHog capability, disabled by default
- Hostinger/Bluehost Apache/LiteSpeed `.htaccess` security headers and canonical-host redirect baseline
- Supplied ReadyPackets Document-Flow trademark brand assets

## Local build

Requires Node.js 22 or later; no package installation is required.

```bash
npm run build
npm run validate
npm run preview
```

Open `http://127.0.0.1:4173` after the preview command starts.

## Prepare a deployable archive

```bash
npm run package
```

This writes `ReadyPackets-Marketing-Static.zip`. Upload the **contents** of `dist/` (or extract the archive directly) to the public web root—not the source tree.

## Configuration

Edit `scripts/site-data.mjs` before a production build only to:

1. Confirm `siteUrl` is the exact canonical public hostname.
2. Confirm the primary/alternate portal URLs.
3. Review public copy, service boundaries, and legal/contact addresses.

Edit `src/assets/js/site-config.js` only to optionally add a Microsoft Clarity project ID and/or PostHog project key. Those provider identifiers are public browser configuration—not secrets.

Analytics is still not loaded until a visitor affirmatively opts in through the privacy interface. Never place a password, private key, API secret, database credential, portal key, or any non-public value in `site-config.js`.

## Deployment

For Hostinger, the recommended path is Git deployment of the generated **`hostinger-static`** branch—not the source branch `main` and not a Node.js app. GitHub Actions builds and validates `main`, then publishes only the static `dist/` contents to that deployment branch. The ZIP remains a rollback fallback. Read the [Hostinger production runbook](docs/HOSTINGER_PRODUCTION_DEPLOYMENT_RUNBOOK.md), [Hostinger & Bluehost deployment guide](docs/HOSTINGER_BLUEHOST_DEPLOYMENT.md), and [Security headers](docs/SECURITY_HEADERS.md) before going live. The reusable privacy process and operational requirements are in [Analytics & privacy](docs/ANALYTICS_AND_PRIVACY.md). Discoverability controls are documented in [SEO, AEO & GEO](docs/SEO_AEO_GEO.md).

## Compliance scope

The site is built with **WCAG 2.2 AA** accessibility and consent-first privacy controls as operational targets. No source code can itself guarantee ADA, GDPR, ePrivacy, CCPA/CPRA, or other legal compliance in every jurisdiction. Before public launch, have qualified accessibility and privacy/legal professionals review the deployed configuration, policies, provider terms, retention, notices, and business practices.

## Repository hygiene

Meaningful work is recorded in `SESSION_LOG.md`. The artifact is versioned in this repository; the original portal/split repository remains untouched for rollback safety.
