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

**Git deployment implementation:** Added `.github/workflows/publish-hostinger-static.yml`. On every source `main` push, it builds and validates the static site and force-updates a deploy-only `hostinger-static` branch. The branch includes the exact static document-root output, `.readypackets-source-commit`, and a minimal dependency-free Hostinger `package.json` preflight manifest; it excludes source code, workflow files, source package configuration, documentation, portal artifacts, credentials, and secrets. Hostinger must connect to **`hostinger-static`**, not `main`, with the Git-screen root directory left at `./` because `index.html` is already at the branch root. `public_html` applies only to manual File Manager/SFTP uploads. GitHub Actions retains a 30-day static artifact for audit/rollback; the manual ZIP process remains the fallback.

**Icon theme control:** Replaced the header and static 404 text selector with a compact native button. It shows a device icon for System, sun for Light, and moon for Dark. Activation cycles **System → Light → Dark → System**. The current state and next action are conveyed through the button’s accessible name and tooltip; icon state has visible focus and works with keyboard, pointer, and touch. System remains the default, follows operating-system color preference, and only explicit Light/Dark overrides are saved locally.

**Documentation:** Updated README, application context, Hostinger production runbook, shared-host guide, accessibility checklist, analytics/privacy guide, and public privacy notice. The Hostinger guidance is based on Hostinger’s official Git deployment documentation (custom HTML/static projects with GitHub/GitLab branch deployment) and its Node.js hosting documentation (a distinct application runtime path).

**Validation:** `npm run build` and `npm run validate` passed for **9 static pages** and **27 required artifacts**. JavaScript syntax checks passed. A local static branch simulation created a **32-file** deploy-only tree, verified required root files, and confirmed no source-only paths (`src/`, `scripts/`, `docs/`, `context/`, `.github/`, `package.json`, or `SESSION_LOG.md`) leaked into the deployment branch. Browser/CDP checks confirmed icon visibility/state, the complete cycle, accessible labels, local-only persistence, reset on System, and the same behavior on `404.html`. Desktop and 390 px mobile previews showed the compact icon alongside the navigation without overflow or control collision.

**Workflow remediation:** The first GitHub Actions workflow run (`37138560387`) successfully reached the deployment job but failed at its later audit-artifact upload because the orphan-branch publication had intentionally cleaned `dist/` first. Corrected the workflow by uploading the generated artifact—including hidden `.htaccess` and `.well-known` paths—before creating the deploy-only branch. Rebuilt, revalidated, and repeated the local deploy-branch simulation after the correction.

**GitHub verification:** Source release `892f15507ca09436be0c7fd32704d18cc6165e5d` passed both the [static branch publication workflow](https://github.com/readypackets/ReadyPackets-Marketing-Site/actions/runs/37138645534) and the [static marketing-site validation workflow](https://github.com/readypackets/ReadyPackets-Marketing-Site/actions/runs/37138645704). The real `hostinger-static` branch was inspected after publication: it contains **32 deployable files**, embeds source commit `892f15507ca09436be0c7fd32704d18cc6165e5d` in `.readypackets-source-commit`, contains the required hidden deployment/security files, and contains no source-only material. The GitHub audit artifact was also downloaded and verified to retain `.htaccess` and `.well-known/security.txt`.

**Manual fallback package:** Rebuilt and verified a **36-file** Hostinger ZIP from the reviewed source release. Its SHA-256 is `5706d7938bc0e19477714384d15e428f0915022d5257e5757246dce3e80be46f`. The generated ZIP remains excluded from Git; it is a delivery/rollback artifact, not source.

**Publication status:** Functional release, generated deployment branch, and audit record are synchronized through the source repository. Subsequent audit-only commits automatically regenerate the same static content with an updated non-secret provenance marker.


---

## 2026-10-03 — Hostinger provider-source record

**Purpose:** Added `docs/HOSTINGER_GIT_DEPLOYMENT_SOURCE_NOTES.md` to preserve the official Hostinger Git-deployment and Node.js hosting sources used for the static-site decision. The deployment runbook and application context now link to this record.

**Decision reaffirmed:** The independent public marketing site remains a static HTML/CSS/vanilla JavaScript deployment on the generated `hostinger-static` branch. Hostinger’s custom Git/static deployment path is suitable; a Node.js web-app runtime is unnecessary for this site and would increase operational surface without adding required capability.

**Safety boundary:** The source notes reiterate that Hostinger receives only deployable public-site files. The portal, customer data, MySQL database, customer uploads, credentials, backups, and all portal configuration remain outside the marketing-host deployment.


---

## 2026-10-03 — Hostinger Git root-directory clarification

**User-observed hPanel configuration:** The Hostinger Git deployment screen for `go.readypackets.com` presents **Root directory: `./`** with the generated `hostinger-static` branch selected. It does not present `public_html` as a selectable value.

**Correction:** `./` is correct and must remain unchanged. In the Git deployment flow, **Root directory** is a path *inside the selected repository branch*. The generated `hostinger-static` branch already places `index.html`, assets, `.htaccess`, and `.well-known/security.txt` at that root. The File Manager/SFTP directory named `public_html` applies only to manual ZIP extraction or SFTP upload; it is not a subdirectory in the Git deployment branch and must not be entered in this UI.

**Documentation correction:** Updated the Hostinger production runbook, shared-host deployment guide, provider source notes, application context, and prior session record to distinguish the Git repository path (`./`) from the File Manager document root (`public_html`).


**Current hPanel build-screen values:** Confirmed the generated static branch should use Framework preset `Other`, branch `hostinger-static`, Root directory `./`, an empty build command (or `true` if Hostinger requires a command), output directory `.`, and an empty start command. The displayed Node 22.x value is only a build-environment option and does not create a Node.js runtime. The screen’s displayed target hostname must be reviewed independently: `go.readypackets.com` is not `www.readypackets.com`.


---

## 2026-10-03 — Hostinger `package.json` build-preflight repair

**User-observed deployment failure:** Hostinger cloned the deploy-only `hostinger-static` branch for `go.readypackets.com` successfully, then failed during **Preparing build** with `ERROR: package.json file not found`.

**Cause:** The selected Hostinger **Other** framework flow is a build pipeline that requires a root `package.json` even when the selected branch is an already-built static website. The deploy-only branch correctly excluded the source repository’s package configuration, so Hostinger stopped before publishing the static files.

**Repair:** The GitHub deploy-branch workflow now adds a dedicated `package.json` only to `hostinger-static`. The manifest is private, has **no dependencies or devDependencies**, and defines only `npm run build`, which prints a confirmation that the static release is already built. It cannot start a server and contains no portal code, secrets, customer data, external dependency, or Manus dependency. The branch still contains the static assets at `./` and the non-secret source-commit marker.

**Required hPanel settings after the branch refresh:** Framework `Other`; branch `hostinger-static`; Root directory `./`; Build command `npm run build`; Output directory `.`; Start command blank. The Node 22.x selector is only the build environment. The user must confirm whether `go.readypackets.com` is intended for staging or change the Hostinger target website to `www.readypackets.com` before public launch.

**Validation:** The source validator checks the Hostinger manifest’s exact build script, private status, and absence of dependencies. A local clean-room deployment-tree simulation executed `npm run build` successfully, verified the required static/security files and manifest, found **33 deployable files**, and confirmed no source-only material leaked into the branch.


---

## 2026-10-03 — Hostinger staging DNS propagation and Cloudflare 525 diagnosis

**User-observed browser result:** `go.readypackets.com` initially showed `DNS_PROBE_FINISHED_NXDOMAIN` after the Hostinger Git deployment was repaired.

**Read-only diagnosis:** The independent marketing source and deploy-only branch were current at `5e4ede8405eb2e937137c24b6aba9e207bfdf514`, with **33 deployment files** and a dependency-free Hostinger preflight manifest. Cloudflare and Google DNS-over-HTTPS resolvers then returned Cloudflare edge addresses for `go.readypackets.com`, while the sandbox system resolver retained a prior negative result. This is consistent with normal negative DNS-cache propagation after a hostname/record change; it does not indicate a source-build failure.

**Origin result:** A forced TLS request through both published Cloudflare edge addresses, using SNI `go.readypackets.com`, returned **Cloudflare HTTP 525 — SSL handshake failed**. The Cloudflare edge certificate itself was valid for `*.readypackets.com`; therefore the remaining blocker is the handshake from Cloudflare to the currently configured `go` origin. The marketing build is not involved in this failure.

**Required safe remediation:** Treat `go.readypackets.com` as staging. In hPanel, attach it to the Hostinger marketing website and obtain Hostinger’s exact **Connect via DNS record** target. In Cloudflare, update only `go` to that target, set it DNS-only while Hostinger validates the host and issues a certificate covering `go`, test direct HTTPS, then optionally re-enable Cloudflare proxying with Full (strict). Never use Cloudflare edge IPs as origin values, never switch to Flexible encryption, and do not change `www`, `my`, `portal`, portal TLS, portal server, or portal data during this staging repair.

**Documentation:** Extended the production runbook with a dedicated `go` staging cutover and 525 recovery procedure. Updated application context, Hostinger provider source notes, and README to distinguish DNS propagation, the Hostinger origin certificate stage, and the portal boundary.


---

## 2026-10-03 — Secure `go` staging-host canonical redirect repair

**User report:** The Hostinger temporary/staging website redirected to `readypackets.com` instead of serving the newly deployed marketing site.

**Cause:** The static `.htaccess` canonicalization rule correctly forced every host other than `www.readypackets.com` to the production canonical hostname. That included the intended `go.readypackets.com` staging host, preventing a controlled review of the Hostinger deployment.

**Repair:** The marketing artifact now serves **HTTPS `go.readypackets.com`** as a staging-only host. Plain HTTP and all unknown hosts still issue a permanent redirect to `https://www.readypackets.com`. The rendered pages retain production `www` canonical links, sitemap URLs, and structured-data URLs; when Apache/LiteSpeed `mod_headers` is available, the staging host returns `X-Robots-Tag: noindex, nofollow, noarchive`. This keeps `go` reviewable without creating a competing indexed public hostname or changing portal behavior.

**Boundary:** This redirect repair does not repair the independent current Cloudflare 525 origin handshake. `go` still must be attached and certificated in Hostinger, and its Cloudflare DNS record must point at Hostinger exactly before the staging host can load. `www`, `my`, `portal`, portal TLS, portal hosting, data, and configuration remain untouched.

**Validation:** `npm run package` completed successfully. Static validation passed all **9 pages** and **27 required artifacts**, including regression assertions for the `go` HTTPS allowlist and its noindex header. The generated `.htaccess` was inspected to verify that only secure `www` and secure `go` avoid the production redirect.


---

## 2026-10-03 — Hostinger staging deployment verified live

**User confirmation:** The ReadyPackets marketing site loaded successfully at `https://go.readypackets.com/` after Hostinger deployment and staging DNS/TLS remediation.

**Independent read-only verification:** The staging hostname resolved directly to the Hostinger origin and returned **HTTP 200** from Hostinger LiteSpeed. The response delivered the ReadyPackets page title and expected marketing content. TLS presented a valid Let’s Encrypt certificate with `go.readypackets.com` in its SAN. The staging response retained the intended static security headers, including CSP, HSTS, no-sniff, referrer policy, framing protection, permissions policy, and `X-Robots-Tag: noindex, nofollow, noarchive`. This confirms `go` is serving the site for controlled review without becoming an indexed production duplicate.

**Release provenance:** The deployed `hostinger-static` branch and GitHub `main` were synchronized at `cb6caf6cda1458784aa5298952301ac883e804c5`. The deploy-only branch retained the dependency-free Hostinger preflight manifest and no portal runtime, secrets, customer data, or portal configuration.

**Remaining deliberate boundary:** `go.readypackets.com` is staging only. No `www` production cutover, root-domain redirect change, portal DNS change, portal TLS change, portal server change, or portal-data operation was performed. A separate explicit decision and guarded DNS/certificate verification are required before moving the public marketing hostname to Hostinger.

---
## 2026-10-16 — Supplied square-lockup rebrand release
**User request:**
> Rebrand both sites with the updated logo and push all changes to GitHub.

**Implementation:** The independent ReadyPackets marketing site now uses the supplied self-hosted square light and dark lockups. Theme-appropriate full lockups are present in the hero, footer, Organization structured data, social-preview assets, and PWA surfaces. Compact transparent navigation marks were derived solely from the supplied lockups to preserve header readability across desktop, mobile, light, dark, and system-first modes. The accessible icon-only theme control and the existing GDPR/consent-gated analytics capabilities remain unchanged.

**Boundary:** No portal application code, portal session, customer data, analytics identity, API credential, third-party asset, font, image CDN, or hosting-specific runtime dependency was added to the static marketing repository.

**Validation:** `npm run package` rebuilt the nine public pages and required static artifacts; the validator passed self-hosted asset, accessibility/consent, canonical metadata, portal-link, SEO/AEO/GEO discovery, and security-header checks. JavaScript syntax checks and `git diff --check` passed.

---
## 2026-10-16 — Microsoft Clarity and PostHog configuration guidance confirmed
**User request:**
> Confirm Clarity and PostHog capability on both sites and provide setup instructions.

**Verified marketing behavior:** The independently hosted static marketing site remains disabled by default because its public Clarity Project ID and PostHog Project API key fields are blank. It loads either provider only after the operator configures the identifier, rebuilds/deploys, and a visitor affirmatively selects Analytics. The source uses consent-gated Clarity ConsentV2, PostHog opt-out-by-default, disabled PostHog autocapture/session replay/person profiles, a narrow marketing page-path event, and zero portal/customer identity linkage.

**Documented boundary:** Cross-site analytics continuity is intentionally not implemented in this independent marketing repository. The portal's separate cross-site toggle must remain off unless a dedicated privacy-reviewed change updates both repositories. The portal repository now carries the version-controlled `docs/CLARITY_POSTHOG_OPERATOR_SETUP.md` operator guide for both sites.

---
## 2026-10-17 — Interactive, price-free packet-tier explorer
**User request:**
> Add rollover animation to the marketing site and let visitors click or roll over a packet to see its tiers without prices, using the current ReadyPackets catalogue as the source.

**Source control:** Created `docs/PACKET_TIER_INTERACTION_SOURCE_2026-10-17.md` from the current public ReadyPackets catalogue pages for Idea & IP Protection, Business Foundation, Business Plans, Operating Design, Execution & Partnerships, Launch & Revenue Ready, and The All-In Master Bundle. The source record preserves tier names, concise scope summaries, representative deliverables, and catalogue URLs while intentionally excluding every price, discount, payment term, and price-derived statement.

**Implementation:** The home page and `solutions.html` now present all seven packet groups as responsive packet cards. Pointer hover provides a motion-safe visual lift and an underlined exploration prompt. Each card opens through a native `details`/`summary` disclosure, and its tier summary uses accessible button tabs with click, touch, Enter/Space, and Left/Right/Home/End support. The chosen tier reveals only its matching panel; the card includes representative scope and a portal registration link. Hover is not required for access, and no external runtime, analytics call, portal API request, price content, or secret was added.

**Accessibility and validation:** Updated the WCAG 2.2 AA review checklist and static validator. `npm run package` rebuilt and validated all nine public pages and 29 required artifacts. Rendered checks confirmed seven packet cards and zero dollar amounts on both `index.html` and `solutions.html`; a focused packet-section scan confirmed no price-related content. Browser interaction validation confirmed the first card opens, selects Standard by click, and advances to Premium through `ArrowRight`. Desktop and mobile viewports were exercised with the cookie dialog dismissed. A local forwarding-preview page was unavailable, and a subsequent nonessential DevTools focused-screenshot probe encountered a local origin restriction; neither affected the built artifact or the successful functional test.

**Publication:** Marketing source commit `830d8076db2f8484131d4160d2bbc0583d8ca670` (`feat: add accessible packet tier explorer`) was pushed to `readypackets/ReadyPackets-Marketing-Site` `main`. The GitHub Actions “Static marketing site validation” and “Publish Hostinger static branch” workflows both completed successfully. The deploy-only `hostinger-static` branch was verified at `65bb086bd8a15910b906824bd590c0ecb81f8cd8` with `.readypackets-source-commit` set to `830d8076db2f8484131d4160d2bbc0583d8ca670`.

---
## 2026-10-17 — Header wordmark visibility repair
**User report:** The ReadyPackets identity at the top of the marketing-site preview appeared as a cropped icon alone, rather than a clear company logo with its name.

**Cause:** The primary header was configured to use an intentionally compact square-mark crop. Although appropriate for highly constrained spaces, it did not meet the requested navigation-brand clarity because the visible header omitted the ReadyPackets™ wordmark.

**Repair:** Replaced the primary header crop on every generated marketing page with the approved self-hosted horizontal ReadyPackets™ SVG wordmarks. The light-background header uses the light wordmark asset, and the existing system/light/dark switching now selects the dark-background alternative automatically. The header layout has responsive desktop and mobile dimensions; only the visible light logo carries alternative text to prevent duplicate screen-reader output. Full lockups, compact marks in intentionally constrained contexts, SEO image assets, footer treatment, and other brand assets remain unchanged.

**Validation:** `npm run package` rebuilt all nine pages and validated 31 required artifacts. Regression checks now require both header wordmark files and assert their rendered use in the home-page header. JavaScript syntax and whitespace integrity checks passed. The corrected header was visually reviewed in desktop light mode, desktop system-dark mode, and mobile light mode using the temporary review build.

---
## 2026-10-17 — Approved lockup and immutable-cache release repair
**User reports:** The marketing preview still displayed a distorted hero lockup, while the header needed the ReadyPackets™ name and original slogan. The user also asked why the Hostinger deployment did not reflect the latest website version.

**Root cause:** The marketing source held an uncommitted approved-lockup correction, so neither `main` nor the generated `hostinger-static` branch could include it. In addition, Hostinger/Apache cache controls correctly marked local CSS and image assets as immutable for seven days, but formerly reused the same URLs after a logo/CSS update. A browser or edge cache could therefore retain an obsolete asset despite a source rebuild.

**Repair:** Added source-derived, self-hosted header assets from the approved supplied lockup: icon, ReadyPackets™ wordmark, gold divider, and the original “Your Business, Professionally Packeted™” slogan. The header and not-found page use these components at their native aspect ratios. The hero keeps the approved square lockup in an explicit contain-based frame. The static renderer now derives a SHA-256-based revision from the browser-loaded CSS, JavaScript, and brand sources and appends it to each local browser asset URL. This retains efficient immutable caching while forcing new logo/CSS content to use a new URL. Static validation now checks the versioned theme, stylesheet, hero-logo, and header-logo URLs while resolving local links safely without their query strings.

**Portal boundary:** The separate customer portal source was reviewed at its clean current release. Its customer/admin navigation uses an intentionally compact approved mark with `object-contain`; sign-in uses the supplied full square lockup, and portal footer, invoices, and transactional email use approved full assets. No portal code, deployment, data, or configuration was changed in this marketing-only repair.

**Validation:** `npm run package` passed for all nine public pages and 37 required artifacts. JavaScript syntax checks, static link/asset validation, cache-version checks, visual preview capture, diff integrity, and a source-diff credential-pattern scan passed. The refreshed preview confirmed readable header branding with the approved wordmark/slogan and an undistorted contain-based hero lockup.

**Deployment action:** The source release is being published to `main`; the GitHub Actions workflow will rebuild and verify the deploy-only `hostinger-static` branch. Hostinger must be configured to deploy that generated branch (not source branch `main`) from root `./`, with `npm run build` and output directory `.`.

---

## 2026-10-17 — ReadyPackets website packet, policy, and contact-surface alignment

**User request:**

> 1. Remove public wording that calls this a marketing site; call it the ReadyPackets website.
> 2. Fix the address layout and do not invite people to visit or write.
> 3. Reconcile all packet content with the supplied `ReadyPackets® Master Product Offerings Matrix (v3.0)` and `https://www.readypackets.com/packets` so every packet shows its included offerings.
> 4. Expanding a packet must show all tiers and their offerings.
> 5. Create a Terms of Use policy page.
> 6. Create a refund policy page consistent with `https://www.readypackets.com/refunds`.

**Source decision and reconciliation:** The supplied Matrix v3.0 was treated as the primary approval source. The current public catalogue was independently checked as a secondary source. The reconciliation found material source-version differences in Business Plans, Operating Design, Launch & Revenue Ready, and the All-In bundle; it also found that Matrix Packet 8, **Capital & Valuation Services**, is absent from the public catalogue. The new site therefore publishes the Matrix v3.0 contents rather than silently merging conflicting descriptions. `docs/PACKET_OFFERING_RECONCILIATION_2026-10-17.md` records the decision, all eight offerings, and the conflict boundary. The Matrix PDF SHA-256 recorded in that document is `ddc70b0ac2b8a8e81427372fb52f62024144d247cf5fbfc99f92fd7d2a158070`.

**Website content and interaction:** Replaced the prior representative tier tabs with an accessible native disclosure per packet. Opening any packet now reveals every tier, timeline, outcome, inherited-tier statement, and incremental included offering at once. The price-free explorer now contains **8 offerings and 20 Matrix v3.0 tiers**: Idea & IP Protection; Business Foundation; Business Plans; Operating Design; Execution & Partnerships; Launch & Revenue Ready; The All-In (Master Bundle); and Capital & Valuation Services. The public rendering intentionally excludes prices, discounts, payment terms, and price-derived claims. The source implementation lives in `scripts/packet-catalogue.mjs`.

**Public-surface and policies:** Replaced public-facing marketing-site wording in rendered content and browser configuration with ReadyPackets website terminology. The contact page’s visible address invitation was replaced with a concise remote-contact section that routes account, order, document, payment, and support matters to the portal; general questions remain email-only. Added clean, canonical `/terms/` and `/refunds/` pages, footer links, Apache/LiteSpeed legacy redirects, sitemap entries, `llms.txt` and `ai.txt` policy discovery links, and required validation checks. The Terms of Use and Refund Policy are operational drafts and retain explicit qualified-counsel review language. The Refund Policy derives from the supplied ReadyPackets refund-policy source and does not expose a physical-address invitation.

**Privacy and cache behavior:** Renamed public browser identifiers from obsolete site terminology to neutral website terminology: theme preference key, consent key, public configuration global, and reviewed PostHog event/surface name. Because the privacy preference key changed, existing browser consent state is not migrated; a returning visitor receives the conservative essential-only default and must opt in again before any configured analytics can load. Existing content-derived asset versioning remains in place for cache-safe logo and asset updates.

**Validation completed:**

- `npm run package` — passed; built **10 static pages** and validated **38 required artifacts**.
- Node syntax checks passed for the static builder, packet catalogue, validator, and website scripts.
- Static validation confirmed eight packet disclosures and 20 rendered tiers on both home and solution pages, clean canonical policy routes, no price output in the packet explorer, static links/assets, accessibility/consent/SEO/machine-discovery markers, and no prohibited platform dependency.
- Desktop (1440 px) and mobile (390 px) Chromium checks confirmed the header lockup remains proportional and the expanded packet disclosure is readable at responsive widths.
- Source hygiene check found no public `marketing site`, `Visit or write`, duplicate ReadyPackets name, or obsolete runtime identifiers in the generated artifact.
- Diff whitespace and credential-pattern checks passed. No passwords, tokens, private keys, customer data, or other secrets were added.

**Release artifact:** `ReadyPackets-Marketing-Static.zip` SHA-256 after validation: `88b3eb4353765eb753de21cce5d18cfce66f53c4e5abbe2de17c106b43a02294`.

**Publication status:** Published to `readypackets/ReadyPackets-Marketing-Site` `main` as `7c27bd7597e38c184f2f3b03d6a509c68f806e89` (`feat: align website packets and policy pages`). The GitHub Actions static-branch publisher must complete before Hostinger can receive the updated `hostinger-static` deployment branch.

**Deployment-pipeline verification:** The follow-up audit-record publication is `51d8d7f8c823375f652cd819c7072f3fec4c2d14`. GitHub Actions completed both the static-branch publisher and the independent static website validator successfully. `hostinger-static` records `51d8d7f8c823375f652cd819c7072f3fec4c2d14` in `.readypackets-source-commit` and contains the updated `/terms/` and `/refunds/` routes.

---

## 2026-10-17 — Restored business address without visit or correspondence invitation

**User request:**

> Add the address back just don't invite someone to write or visit, then update GitHub.

**Implementation:** Restored the ReadyPackets business address on `contact.html` as a semantic `<address>` block under the neutral heading **Business address**:

> ReadyPackets<br>
> 7404 Executive Pl<br>
> Lanham, MD 20706<br>
> United States

The contact page explicitly states that ReadyPackets provides services remotely, that the address is for business identification only, that it is not a walk-in location, and that it is not monitored for customer correspondence. General non-sensitive questions now use “email” language rather than inviting visitors to write; account, order, document, payment, and support matters continue to route to the secure portal. Added the stable `contact.html#business-address` anchor and responsive address/notice styling.

**Validation completed:** `npm run package` passed, building 10 static pages and validating 38 required artifacts. Added a static regression contract that requires the address, remote-service/no-correspondence wording, stable anchor, and absence of the old “Visit or write” invitation. Node syntax checks passed for modified source/validation scripts. Diff whitespace and credential-pattern checks passed. The updated upload archive SHA-256 is `6a3c9a316847ee23bcb0ee6d43a52b956b45b7e10f69b855162512b8c17709e6`.

**Publication status:** Published to `readypackets/ReadyPackets-Marketing-Site` `main` as `ec4f2199c885b679f7f349059c3509ff6576d296` (`fix: restore business address on contact page`). GitHub Actions will validate the revision and refresh the deploy-only `hostinger-static` branch.

---

## 2026-10-17 — Responsive horizontal packet comparisons and consent-gated advertising capability

**User request:**

> The tiers should expand horizontally instead of vertically. The site should remain ADA compliant and 100% responsive. The site should be able to leverage and support AdSense and other paid ads.

**Packet comparison implementation:** Opening a packet now makes that packet card span the full width of the packet explorer rather than leaving its tiers in a narrow first-column stack. The opened packet renders every approved Matrix v3.0 tier in a responsive comparison grid: side by side when width permits, two columns at the tablet breakpoint, and one readable column on small screens. The native `details`/`summary` control remains the interaction mechanism, so the same disclosure works with keyboard, touch, pointer, and assistive technology; hover remains a nonessential visual enhancement. There is no price output and no horizontal page scrolling.

**Advertising/sponsorship design:** Added a self-hosted, dependency-free capability for two intentionally separated, disabled-by-default models:

1. Manual AdSense units in two predeclared, clearly labelled placement regions (`home-inline` and `solutions-inline`). Auto ads, overlays, anchors, and automatic insertion are not implemented.
2. Direct sponsor placements using a public label, HTTPS destination, and factual description. The site uses `noopener noreferrer sponsored`, injects no sponsor tag, and tracks no sponsor clicks.

The public configuration contains blank publisher/slot/sponsor values. Before a visitor selects **Advertising**, the browser creates no AdSense script, slot, iframe, sponsor content, or advertising request. Analytics and Advertising are separate affirmative choices in the preference dialog. Withdrawal clears rendered placement content and removes the optional AdSense tag from the current page. The capability does not introduce a portal connection, portal cookie, portal identity transfer, customer/order data processing, server dependency, or secret into the static website.

**Privacy, security, and compliance boundary:** Added `docs/ADVERTISING_AND_CONSENT_OPERATIONS.md` with the required operator checklist, manual-placement policy, sponsor policy, provider references, and review tests. The website-level consent control is deliberately documented as a fail-closed browser loading gate, **not** as a replacement for a Google-certified CMP/TCF implementation where Google requires one for EEA, UK, or Swiss advertising traffic. The privacy notice now describes optional advertising, sponsor/data boundaries, withdrawal, and the independently hosted portal boundary. The strict Apache/LiteSpeed CSP receives only the reviewed provider origins needed for the optional capability; allowlisting does not load a provider. No `unsafe-inline`, wildcard script source, or weakened portal boundary was added.

**Accessibility and responsive behavior:** Added visible `Advertisement` labels, avoids insertion in navigation, portal calls to action, packet controls, and download-looking controls, removes unconfigured placements from layout/focus order, and documents keyboard, screen-reader, zoom, reduced-motion, theme, and 320 px/400% testing requirements. The accessibility checklist and application context now preserve the desktop/tablet/mobile tier comparison contract.

**Validation completed:**

- `npm run package` and `npm run validate` passed: **10 static pages** and **38 required artifacts**.
- Node syntax checks passed for static build/data/catalogue/advertising modules and public website scripts.
- Static contracts confirm eight comparison regions and all 20 Matrix-approved tiers on both home and solution pages, blank public advertising configuration, labelled-but-hidden optional placements, no pre-rendered ad unit, consent controls, strict CSP provider entries, and full-width comparison styles.
- Live Chrome protocol checks confirmed that an expanded packet card occupies its full explorer width with no horizontal page overflow: 1440 px (`1184 px` wide, three visible tier cards), 800 px (`753 px`, two-column reflow), and 390 px (`358 px`, one-column reflow). Pre-consent checks confirmed no advertising tag/frame/visible placement at all three widths.
- An isolated browser test with a non-production direct-sponsor fixture confirmed: hidden before consent; visible only after affirmative Advertising consent; HTTPS destination and `noopener noreferrer sponsored` rel attributes present; removed again after selecting Essential only.
- Public-copy scan found no obsolete visitor-facing “marketing site/website” label. `git diff --check` and a pending-diff credential/private-key scan passed.

**Publication status:** Validation complete; source publication to `readypackets/ReadyPackets-Marketing-Site` `main` is pending the final staged-release review.

**Source release:** Committed as `dab02cdd078f3317839c2bad10b61e1b72505cae` (`feat: add responsive tier comparisons and consented ads`). The generated Hostinger branch must be refreshed from this reviewed source commit before the configured static host receives it.

**GitHub workflow verification:** The pushed source/release-record revision `e38faaf1447a9ee6479f4dad76f5e502b5146832` completed both required workflows successfully: [Publish Hostinger static branch](https://github.com/readypackets/ReadyPackets-Marketing-Site/actions/runs/39079855853) and [Static marketing site validation](https://github.com/readypackets/ReadyPackets-Marketing-Site/actions/runs/39079855953). The deploy-only `hostinger-static` branch was refreshed from the reviewed release; it contains the generated static artifact rather than portal code, source-only files, customer data, or secrets.

---

## 2026-10-17 — Removed Packet 8 from the ReadyPackets website catalogue

**User request:**

> Remove packet 8 completely.

**Implementation:** Removed the eighth packet and its sole tier from `scripts/packet-catalogue.mjs`. The website catalogue now contains only the seven approved public offerings and **19** retained tiers. Updated the public solution heading, validation contracts, README, application context, reconciliation record, and the website-scoped matrix source extract. The current public source, rendered pages, machine-discoverable page content, and deployment artifact contain no active reference to the removed offering. The prior session entry remains as immutable version-control audit history; it is not public website output.

**Accessibility and responsiveness:** No CSS or interaction behavior changed. The native disclosure control, keyboard/touch operation, expanded full-width comparison behavior, and desktop/tablet/mobile reflow contract remain intact.

**Validation completed:** `npm run package` passed, building 10 static pages and validating 38 required artifacts. The dedicated catalogue contract verified exactly seven packet groups, 19 tiers, no eighth packet model, and no removed offering in `index.html` or `solutions.html`. A current-scope source scan found no stale packet count or removed-offering references outside immutable session history. `git diff --check` passed.

**Publication status:** Validation complete; GitHub publication pending final staged-release review.

---

## 2026-10-17 — Single-open packet explorer behavior

**User request:**

> When clicking on another packet the other packet should close up.

**Implementation:** Updated `configurePacketExplorers()` so each `.packet-explorer` is a single-open accordion. When a visitor opens a packet, all other open native `<details>` disclosures in that same explorer are closed. The change is scoped per explorer, preserves the native disclosure interaction, synchronizes the visual full-width card state, and leaves a visitor free to close the currently open packet. No portal data, analytics, advertising, cookie, or external request behavior changed.

**Accessibility and responsive behavior:** Pointer, touch, Enter, and Space continue to operate the native summary controls. The focus remains on the newly activated packet summary after keyboard use. The existing full-width horizontal tier comparison, tablet reflow, mobile single-column reflow, and no-horizontal-overflow requirement remain unchanged. Updated the application context and accessibility review checklist to state the single-open interaction contract.

**Validation completed:** `npm run package` passed, building 10 static pages and validating 38 required artifacts. Node syntax and static contracts passed. A live Chromium browser test passed at 1440 px and 390 px: opening the first packet by click, then opening the third with Space, left exactly one packet open, closed the prior packet, preserved keyboard focus, and introduced no horizontal page overflow. `git diff --check` passed.

**Publication status:** Validation complete; GitHub publication pending final staged-release review.

**Source release:** Published to `readypackets/ReadyPackets-Marketing-Site` `main` as `a65957dfc638c29fd38858e676ba3d7ff7765702` (`fix: close prior packet when another opens`). [Static website validation](https://github.com/readypackets/ReadyPackets-Marketing-Site/actions/runs/39080736853) and [Publish Hostinger static branch](https://github.com/readypackets/ReadyPackets-Marketing-Site/actions/runs/39080736925) both completed successfully for this release.

---
## 2026-10-21 — Primary portal-root navigation and high-contrast portal CTA

**User request:**
> the marketing site should go to https://my.readypackets.com/ when clicking on the portal and not https://my.readypackets.com/register . Also the portal button is hard to see on light and dark mode. Please fix this and then update the github so the site can be redeployed.

**Navigation correction:** All ReadyPackets customer-entry portal calls to action now resolve to the primary portal root, `https://my.readypackets.com/`, rather than appending `/register`. This includes the persistent header CTA, footer portal entry, page-level start/open buttons, and every expanded packet-explorer CTA. Explicit existing-customer sign-in links intentionally remain `/login`, and the alternate portal remains a separate explicit `/login` destination. The public site continues to link to—not proxy, embed, or share cookies with—the separate portal origin.

**Visibility and accessibility correction:** The header call to action now reads **Open portal** and has a dedicated `button--portal` visual treatment. It uses a dark teal background with white text in light mode and a light mint background with dark navy text in dark/system-dark mode, plus a visible mode-specific keyboard-focus outline and hover state. Measured WCAG contrast is **7.53:1** for the light-theme pair and **11.75:1** for the dark-theme pair, exceeding the 4.5:1 normal-text AA threshold. The generic dark-theme button no longer controls the portal header CTA’s foreground/background pairing.

**Regression and deployment documentation:** Static validation now fails if any rendered portal entry link uses the obsolete primary `/register` path, if the header link no longer resolves to the primary root, or if the dedicated light/dark portal CTA styling or contrast assertions regress. The Hostinger production runbook and README now specify the primary-root navigation and light/dark visibility acceptance checks.

**Validation completed:** `npm run package` passed, rebuilding **10 static pages** and validating **38 required artifacts**. Node syntax checks passed for the modified build, content, packet, and validation modules. The generated artifact contains no `https://my.readypackets.com/register` link and contains the header `Open portal` link to `https://my.readypackets.com`. `git diff --check` passed. The regenerated deployable archive SHA-256 is `39b6c2e39f4652aa01fff8d8106eed8af68087b6a8bbd7ea5527d1bc8d5b232c`.

**Publication state:** Pending final staged source/credential review, commit, private GitHub `main` push, and deploy-branch workflow verification.

**Immutable source commit:** `ab95da720afc27673bc322245ca1a95245b80685` — `fix: route marketing CTA to portal root`.

**Final publication:** Published to GitHub `main` at `976009d7c9b0dbc041153ce45a9b94dfb3b6b78b`. Both workflows for that exact commit completed successfully: **Static marketing site validation** run `39654111303` and **Publish Hostinger static branch** run `39654111418`. The latter rebuilt the reviewed source and updated the deploy-only `hostinger-static` branch for Hostinger Git deployment.

---
## 2026-10-21 — Header portal CTA label: “My Portal”

**User request:**
> It should say My Portal not Open Portal please fix that

**Change:** Updated only the persistent header portal call-to-action—the button identified in the submitted screenshot—from **Open portal** to **My Portal**. Its secure external destination remains the primary portal root, `https://my.readypackets.com/`; its light/dark high-contrast styling, focus indicator, consent behavior, and separate-host boundary are unchanged. Other explicit content and footer action labels were deliberately left unchanged.

**Regression and documentation:** The static validator now requires the generated primary header CTA to read `My Portal` and to route to the primary portal root. The Hostinger acceptance checklist uses the same approved label.

**Validation completed:** `npm run package` passed, rebuilding 10 static pages and validating 38 required artifacts. JavaScript syntax validation passed for the changed build and validation modules. Generated `index.html` contains the exact `My Portal` header CTA to `https://my.readypackets.com/`; no generated header CTA retained `Open portal`. `git diff --check` passed.

**Publication state:** Pending final staged review, commit, GitHub `main` push, and static publish workflow verification.

**Immutable source commit:** `71e0014679d37f21023eac59e31e0d05f1bcf371` — `fix: label marketing CTA my portal`.

**Final publication:** Published to GitHub `main` at `d495f91d4fa3dd39649d144b9889746e2e8a53c1`. Both workflows for that exact commit completed successfully: **Static marketing site validation** run `39662552756` and **Publish Hostinger static branch** run `39662552732`. The static validation built, validated, packaged, and uploaded the release candidate; the publish workflow rebuilt the validated static artifact and updated the deploy-only `hostinger-static` branch for Hostinger Git deployment.


---
## 2026-10-22 — Approved ReadyPackets logo-only website release

**User request:** “do not use this old logo anywhere on the site only use the new updated logo.”

**Delivered:** Established `docs/BRAND_GUIDE.md` as the active source of truth for the supplied approved updated ReadyPackets asset family: light/dark icon, wordmark, divider, and tagline PNGs. The static-site header, footer, home/process/about brand presentations, browser icon declaration, PWA manifest, Organization structured data, and Open Graph image now use only that supplied family. Responsive lockup CSS keeps each component proportionate and switches the complete set together for light/dark presentation; no logo is stretched, recreated, or fetched from another origin.

**Retired asset removal:** Removed every pre-approval document-flow, square-lockup, compact-mark, and prior favicon asset from `src/assets/brand`, then rebuilt the website. Because the static build copies that directory wholesale, this prevents a direct URL from exposing a retired logo. The 192px/512px application icon derivatives and multi-size favicon were generated only from the supplied approved light icon. Static validation now enforces an exact approved-brand-file allowlist, rejects retired filenames in rendered pages, and asserts the released home page, metadata, and PWA all use the approved family.

**Validation before publication:** `npm run build`, `npm run validate`, and `npm run package` passed, generating and validating 10 static pages and 34 required artifacts. A release-ZIP membership audit and a source/deployable-output scan found no retired logo family in the website source, generated `dist`, or `ReadyPackets-Marketing-Static.zip`. `git diff --check` and a changed-source credential scan passed. No Hostinger account, Cloudflare configuration, live marketing site, analytics provider, secret, or customer data was accessed or changed.

**Publication state:** Pending reviewed source commit/push and the static-site validation/publish workflows.


**Publication and authoritative validation:** The approved-logo-only standalone website release was published to GitHub `main` as `77be9fa5da680fe81559c9a63bdd70281c6b7dd7` (`fix: use approved logo assets only`). **Static marketing site validation** run `39791156082` and **Publish Hostinger static branch** run `39791156072` both passed for that exact commit. The publish workflow rebuilt the reviewed source and updated the deploy-only `hostinger-static` branch for the configured Hostinger Git deployment; the retired artwork is absent from its reviewed source/release package. This closing session-log publication commit follows.
