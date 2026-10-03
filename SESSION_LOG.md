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

**Publication status:** Published to the private GitHub repository in `88a6d4b727f7515bddb3f1b0cb5893acb65fac87` (`docs: add Hostinger production deployment runbook`).

---

## 2026-10-03 — Independent marketing-site repository publication

**User request:**

> Create a new GitHub repo and push the new marketing site to the new repo.

**Repository:** Created a separate private repository, [`readypackets/ReadyPackets-Marketing-Site`](https://github.com/readypackets/ReadyPackets-Marketing-Site), from the reviewed independent marketing-site source at `f726ab9a04473ee92b8dcec70aeb0ba836b8fd31`. The prior `readypackets/ReadyPackets-Marketing-Website` repository remains unchanged and available as a rollback/history reference.

**Boundary and provenance:** The new repository contains only the independent static marketing website, deployment documentation, brand assets, application context, and audit log. It contains no portal runtime, customer data, portal secrets, backups, private keys, or deployment credentials. The isolated worktree retains the prior source as a fetch-only reference with its push URL disabled; all new publication is directed solely to the new repository.

**Documentation update:** Hostinger and Bluehost build instructions now clone `ReadyPackets-Marketing-Site`, ensuring future operators deploy from the intended repository.

**Validation/publication status:** `npm run package` rebuilt and validated the static release successfully: **9 public HTML pages** and **26 required artifacts** passed static, accessibility, privacy, SEO, machine-discovery, portal-link, and self-hosted asset-boundary validation. The first independent publication is commit `860b166f4d16e6cf2d6c1440d5079890bb24b8fc` (`chore: publish independent marketing site repository`) on the new repository’s default `main` branch.


---

## 2026-10-03 — Light, Dark, and System marketing-site theme

**User request:**

> Create a light, dark and system mode for the site with system mode being the default.

**Implementation:** Added a system-first, CSP-safe theme preference loader at `src/assets/js/theme.js`. It runs before the stylesheet so the page is assigned `data-theme="system"`, `light`, or `dark` before first paint. **System** is the default and follows `prefers-color-scheme`; it updates if the operating-system preference changes. Explicit Light and Dark selections are stored only in local browser storage under `rp_marketing_theme_v1`; returning to System removes that override. No theme value is sent to the portal, Microsoft Clarity, PostHog, or any external service.

**Interface and accessibility:** Added a native, keyboard-operable Light/Dark/System selector to every generated public-page header and the generated 404 page. It has an accessible name, remains usable with the responsive mobile menu, and uses a system-first `color-scheme` declaration. The 404 page also honors the stored preference and operating-system scheme. The header switches between the supplied light and dark ReadyPackets™ wordmarks to maintain brand readability.

**Styling and privacy:** Reworked shared color tokens and component surfaces for a dark palette while preserving the existing public marketing content, portal boundaries, CSP, and consent behavior. Updated the public privacy notice, README, application context, analytics/privacy guidance, and accessibility review checklist to disclose the local-only visual preference and required theme test coverage.

**Validation completed:** `npm run package` and the static validator passed with **9 public pages** and **27 required artifacts**. JavaScript syntax checks passed. Browser/CDP tests confirmed System defaults without a persisted override, follows dark operating-system preference, responds to a live OS preference change, persists explicit Light/Dark choices across the homepage and 404 page, and clears that value when returned to System. Desktop light/dark and mobile dark previews showed no header/control collision or horizontal overflow. Contrast measurements passed: light body `9.97:1`, light link `5.18:1`, dark body `11.12:1`, dark heading `14.28:1`, dark link `9.15:1`, and dark focus `9.73:1`.

**Publication status:** Published to the private `readypackets/ReadyPackets-Marketing-Site` repository in `2f81c772934d0b77f367adab944655c0dc05264a` (`feat: add system-first light and dark themes`).


---

## 2026-10-03 — Verified Hostinger upload package delivery

**User request:**

> Give me the latest files so I can upload it to Hostinger.

**Release package:** Built the static Hostinger-ready upload archive from synchronized source commit `6fa28991da62a481e23eb2988be05c476e2e4cac`. The package contains **36 files**, including `index.html`, `.htaccess`, `robots.txt`, `sitemap.xml`, `llms.txt`, `ai.txt`, `.well-known/security.txt`, theme loader/assets, and static site assets. The generated archive is intentionally not committed to Git; its source, build process, and deployment runbook are version-controlled.

**Validation:** `npm run package` succeeded; static validation passed for **9 public pages** and **27 required artifacts**. Required Hostinger upload paths were enumerated directly from the archive. The delivery archive SHA-256 is `0f6a66859c3ad7c54b1c652e07d7bb62bc9af083b37937fee2572082cf4c7454`.

**Delivery:** Provided the ZIP release artifact and the Hostinger production deployment runbook as sandbox downloads. The user must extract the ZIP directly into the intended Hostinger marketing site document root (normally `public_html`), preserve hidden `.htaccess` and `.well-known` paths, and not upload the archive, source repository, portal data, or portal configuration into the public web root.

**Publication status:** Recorded and published to the private repository in `1de87e3144009c58748b716d11d48685233f082a` (`docs: record Hostinger package delivery`).


---

## 2026-10-03 — Hostinger Git deployment branch and icon-only theme control

**User request:**

> There is an option to ship from GitHub. Would it make sense to make it Node.js vs HTML? Will the HTML deploy from GitHub? Change the System/Light/Dark control to an icon instead.

**Deployment decision:** Kept the marketing website **static HTML/CSS/vanilla JavaScript**. Hostinger’s current Git integration supports custom HTML/static projects directly; a Node.js web-app runtime would add a managed build/runtime layer, operational surface, and a different deployment path without providing any capability this anonymous marketing site needs. The independent portal remains separately hosted on its hardened VPS.

**Git deployment implementation:** Added `.github/workflows/publish-hostinger-static.yml`. On every source `main` push, it builds and validates the static site and force-updates a deploy-only `hostinger-static` branch. The branch includes only the exact static document-root output plus `.readypackets-source-commit`; it excludes source code, workflow files, package configuration, documentation, portal artifacts, credentials, and secrets. Hostinger must connect to **`hostinger-static`**, not `main`, with root directory `public_html`. GitHub Actions retains a 30-day static artifact for audit/rollback; the manual ZIP process remains the fallback.

**Icon theme control:** Replaced the header and static 404 text selector with a compact native button. It shows a device icon for System, sun for Light, and moon for Dark. Activation cycles **System → Light → Dark → System**. The current state and next action are conveyed through the button’s accessible name and tooltip; icon state has visible focus and works with keyboard, pointer, and touch. System remains the default, follows operating-system color preference, and only explicit Light/Dark overrides are saved locally.

**Documentation:** Updated README, application context, Hostinger production runbook, shared-host guide, accessibility checklist, analytics/privacy guide, and public privacy notice. The Hostinger guidance is based on Hostinger’s official Git deployment documentation (custom HTML/static projects with GitHub/GitLab branch deployment) and its Node.js hosting documentation (a distinct application runtime path).

**Validation:** `npm run build` and `npm run validate` passed for **9 static pages** and **27 required artifacts**. JavaScript syntax checks passed. A local static branch simulation created a **32-file** deploy-only tree, verified required root files, and confirmed no source-only paths (`src/`, `scripts/`, `docs/`, `context/`, `.github/`, `package.json`, or `SESSION_LOG.md`) leaked into the deployment branch. Browser/CDP checks confirmed icon visibility/state, the complete cycle, accessible labels, local-only persistence, reset on System, and the same behavior on `404.html`. Desktop and 390 px mobile previews showed the compact icon alongside the navigation without overflow or control collision.

**Publication status:** Pending source commit, GitHub Actions verification, deploy-branch publication, and final audit-log synchronization.
