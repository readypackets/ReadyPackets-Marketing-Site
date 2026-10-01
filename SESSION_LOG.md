# ReadyPackets Marketing Website — Session Log

This log records material prompts, design decisions, implementation results, validation, and release status for the independent marketing-site repository. It must not contain passwords, tokens, private keys, portal environment values, customer data, or other secrets.

---

## 2026-09-30 — Independent static marketing-site rebuild

**User request:**

> Create a new GitHub repo and rebuild the marketing website to work independently of the portal and optimized to work with and be hosted on Hostinger or Bluehost. The site should maximize SEO, AEO, and GEO capabilities for AI agents, chatbots, and search engines; include an engaging landing-page story and the ReadyPackets process; be ADA and GDPR compliant; integrate with Microsoft Clarity and/or PostHog; link to `https://my.readypackets.com` and/or `https://portal.readypackets.com`; and use the supplied updated ReadyPackets branding.

**Repository:** Created a new private continuation repository: `readypackets/ReadyPackets-Marketing-Website`. The portal/split repository and portal deployment were deliberately not modified, preserving rollback safety.

**Architecture:** Built an independent static site with semantic HTML, CSS, and vanilla JavaScript only. The artifact has no portal runtime, portal API call, database connection, customer data, session/cookie sharing, authentication, backend dependency, Manus integration, or portal secret. The marketing site links to the portal as an external, separately authenticated origin.

**Story and content:** Added nine public HTML pages: landing page, process, solution areas, FAQ, about, contact, privacy/cookies, accessibility, and terms. The landing page frames the founder problem—scattered notes and decisions—and the ReadyPackets transformation into structured, prepared materials. Catalog language was based on the reviewed ReadyPackets solution areas without unsupported legal, financial, performance, client, or outcome claims.

**Branding:** Validated the supplied Document-Flow brand package checksum manifest, then installed supplied light/dark trademark lockups, compact marks, favicon, and brand guidance. Wordmark-only trademark exports are the approved outputs previously generated from the supplied package source and self-hosted fonts. SVG assets are validated as self-contained and non-executable.

**Accessibility and privacy:** The source is engineered to WCAG 2.2 AA as an implementation/testing target: semantic landmarks, meaningful headings, skip navigation, visible focus, keyboard-operable mobile nav, native FAQ disclosures/dialog, responsive reflow, reduced-motion support, and brand-guide contrast decisions. The static consent manager defaults to essential storage only and does not inject Clarity/PostHog unless the visitor affirmatively selects Analytics and a public provider identifier has been configured. PostHog autocapture, session replay, and person profiles are disabled; only a reviewed marketing-page path event is allowed. No cross-site portal tracking identifier is implemented. Legal review remains an operator requirement; the code does not make a legal guarantee of ADA/GDPR/ePrivacy or other regulatory compliance.

**SEO/AEO/GEO:** Added rendered page content, canonical metadata, robots directives, Open Graph/Twitter metadata, Organization/WebSite/FAQ JSON-LD, XML sitemap, robots.txt, `llms.txt`, and `ai.txt`, together with operator guidance for Google Search Console and Bing Webmaster Tools. These improve crawlability and factual retrieval but do not promise ranking/indexing by any search engine, AI agent, or chatbot.

**Hosting/operations:** Added a Hostinger/Bluehost static deployment and rollback guide, Apache/LiteSpeed `.htaccess` security-header/canonical redirect baseline, external verification commands, an accessibility review checklist, analytics/privacy operating guide, and static-host observability/logging guidance. The source produces an upload-ready `dist/` artifact and an optional ZIP package. Host/CDN logs should be privacy-bounded and never collect or forward portal/customer secrets.

**Validation completed:** `npm run package` built the artifact and ran the static validator successfully. Validation confirmed **9 public HTML pages** and **26 required artifacts**, required accessibility/consent markers, canonical/indexing metadata, machine-discovery files, portal URL alignment, internal links, explicit image alternative text, no CSP-blocked inline styles, optional analytics defaults, empty provider configuration, zero portal/API runtime linkage, logo ™ glyphs, and self-contained/non-executable SVG assets. Local HTTP smoke tests passed for the landing page, process page, FAQ schema, `llms.txt`, and the 404 page. The generated static artifact contains 30 files; the final ZIP SHA-256 was recorded during validation. Source diff integrity checks passed.

**Publication status:** Published to the private GitHub repository as `3ebca412660b88babdaf1bb31a80b6d97a9acb3d` (`feat: launch independent static marketing website`).

---

## 2026-09-30 — Responsive preview correction

**User request:**

> Can you show me what it looks like

**Finding and correction:** A real 390 px mobile screenshot showed that the hero-card trademark lockup could exceed its responsive grid container because the SVG retained its intrinsic dimensions. Updated `.logo-lockup` with `width: 100%` while preserving its existing approved maximum width. The change constrains the brand mark to the available column without altering brand artwork or proportions. Temporary local screenshots remain ignored from version control.

**Validation completed:** Rebuilt the static artifact and reran the full static validator successfully. Captured fresh desktop (1440 × 960) and mobile (390 × 844) Chromium previews. The full trademark lockup now scales within the hero card, and the mobile hero copy, menu, consent panel, and call-to-action all reflow without horizontal overflow.

**Publication status:** Published to the private GitHub repository as `7929f03e0c919aa0aedb71b9d2cfcca9394fe50d` (`fix: constrain responsive hero logo lockup`).

---

## 2026-09-30 — Hostinger permanent deployment runbook

**User request:**

> Give me the instructions to deploy the site on Hostinger?

**Decision and scope:** The supplied Hostinger **Unlimited** shared-hosting plan is sufficient for the independently built static marketing site; it is not a deployment target for the application portal. Prepared a Hostinger-specific production runbook that uses the reviewed static artifact and explicitly preserves the separate hardened portal hosts (`my.readypackets.com` and `portal.readypackets.com`), portal VPS, data, secrets, and configuration.

**Runbook protections:** The guide requires artifact checksum verification; confirms the Hostinger document root before any placeholder removal; protects Cloudflare authority and non-marketing DNS records; points only `www` to Hostinger; configures a permanent apex-to-`www` redirect at Cloudflare; requires Hostinger origin TLS before Cloudflare Full (strict) proxying; includes content/portal boundary tests; and documents static-only rollback.

**Validation completed:** Rebuilt and validated the current static release successfully: **9 public HTML pages** and **26 required artifacts** passed the static, accessibility, privacy, SEO, machine-discovery, asset-boundary, and portal-link checks. The runbook deliberately requires the SHA-256 from the exact archive uploaded to Hostinger because ZIP metadata can differ between independently built archives from the same reviewed commit.

**Publication status:** Pending GitHub push.
