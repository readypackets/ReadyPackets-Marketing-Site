# ReadyPackets Website

A **fully independent, static** ReadyPackets website for Hostinger, Bluehost, Cloudflare Pages, S3-compatible static hosting, or comparable shared hosting.

> It contains **no portal runtime, database connection, customer data, customer files, portal authentication, portal cookies, server-side API, Manus dependency, or portal secret**.

The public ReadyPackets website links visitors to the separately deployed ReadyPackets portal:

- Primary: `https://my.readypackets.com`
- Alternate: `https://portal.readypackets.com`

All public customer-entry calls to action use the primary portal root (`https://my.readypackets.com/`) rather than a hard-coded registration route. This keeps the public site aligned with the portal’s own login and onboarding flow.

## What ships

- Story-led landing page with an explanation of the ReadyPackets process
- Public pages for process, solution areas, FAQ, about, contact, privacy/cookies, accessibility, Terms of Use, and Refund Policy
- An accessible, price-free packet explorer for seven approved offerings and all 19 associated tiers; opening a packet expands the full-width responsive comparison with every tier, timeline, outcome, and included offering
- Semantic HTML, responsive CSS, keyboard-first navigation, reduced-motion support, and WCAG 2.2 AA design/test target
- System-first Light/Dark/System icon control with local-only explicit preference storage
- Indexable server-rendered-in-build HTML—no JavaScript required for core content
- Canonical tags, Open Graph/Twitter metadata, Organization/WebSite/FAQ schema, XML sitemap, `robots.txt`, `llms.txt`, and `ai.txt`
- Consent-first Microsoft Clarity measurement configured for the public website; no provider request before affirmative Analytics consent, while PostHog remains unconfigured
- Consent-gated manual AdSense and direct-sponsorship capability, disabled by default and documented for required CMP/privacy review
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

`src/assets/js/site-config.js` contains the public Microsoft Clarity project identifier for the ReadyPackets website. Add a PostHog project key only after the equivalent privacy review. Provider identifiers are public browser configuration—not secrets.

Analytics and advertising are still not loaded until a visitor affirmatively opts in through the matching privacy preference. Never place a password, private key, API secret, database credential, portal key, or any non-public value in `site-config.js`. Before configuring an ad identifier, follow [Advertising, Sponsorship, and Consent Operations](docs/ADVERTISING_AND_CONSENT_OPERATIONS.md); a browser preference gate is not a substitute for a certified CMP/TCF implementation where that is required.

## Deployment

For Hostinger, the recommended path is Git deployment of the generated **`hostinger-static`** branch—not the source branch `main` and not a Node.js app. GitHub Actions builds and validates `main`, then publishes only the static `dist/` contents plus a minimal no-dependency build-preflight manifest to that deployment branch. The ZIP remains a rollback fallback. If `go.readypackets.com` is used for staging, attach it to the Hostinger marketing website, point only that Cloudflare record to the exact Hostinger target, and wait for direct Hostinger TLS to work before enabling Cloudflare proxying; it is a staging host, not a portal alias. Read the [Hostinger production runbook](docs/HOSTINGER_PRODUCTION_DEPLOYMENT_RUNBOOK.md), [Hostinger & Bluehost deployment guide](docs/HOSTINGER_BLUEHOST_DEPLOYMENT.md), and [Security headers](docs/SECURITY_HEADERS.md) before going live. The reusable privacy process and operational requirements are in [Analytics & privacy](docs/ANALYTICS_AND_PRIVACY.md). Discoverability controls are documented in [SEO, AEO & GEO](docs/SEO_AEO_GEO.md).

## Compliance scope

The site is built with **WCAG 2.2 AA** accessibility and consent-first privacy controls as operational targets. No source code can itself guarantee ADA, GDPR, ePrivacy, CCPA/CPRA, or other legal compliance in every jurisdiction. Before public launch, have qualified accessibility and privacy/legal professionals review the deployed configuration, policies, provider terms, retention, notices, and business practices.

## Repository hygiene

Meaningful work is recorded in `SESSION_LOG.md`. The artifact is versioned in this repository; the original portal/split repository remains untouched for rollback safety.
