# ReadyPackets Marketing Site — Hostinger Production Deployment Runbook

**Purpose:** Publish only the independent ReadyPackets static marketing website on Hostinger at `https://www.readypackets.com`.

**Source repository:** [`readypackets/ReadyPackets-Marketing-Site`](https://github.com/readypackets/ReadyPackets-Marketing-Site)

**Recommended deployment branch:** `hostinger-static` — generated only after the repository’s `main` branch builds and validates successfully.

**Fallback deployment artifact:** `ReadyPackets-Marketing-Static.zip`

> **Important boundary:** This runbook does **not** move, reinstall, edit, or expose the ReadyPackets portal. Do not change the VPS, MySQL, portal files, `/etc/readypackets/portal.env`, portal certificates, `my.readypackets.com`, or `portal.readypackets.com`.

---

## 1. Confirm the architecture before making changes

| Hostname | Intended purpose | Intended location | Action in this runbook |
| --- | --- | --- | --- |
| `www.readypackets.com` | Public, anonymous marketing site | Hostinger shared hosting | **Deploy here** |
| `readypackets.com` | Permanent HTTPS redirect to `www` | Cloudflare Redirect Rule | **Configure redirect only** |
| `my.readypackets.com` | Primary customer and administrator portal | Existing hardened ReadyPackets VPS | **Do not change** |
| `portal.readypackets.com` | Alternate portal hostname | Existing hardened ReadyPackets VPS | **Do not change** |

The Hostinger **Unlimited** plan is sufficient. This marketing site is pre-rendered static HTML, CSS, JavaScript, images, and public metadata. It does **not** need a Node.js application, database, PHP runtime, cron job, or access to portal resources. Hostinger’s Git integration supports custom HTML/static projects directly; deploying this static project as a Node.js application would add an unnecessary build/runtime layer without adding marketing-site capability.

### Stop if any of these are not true

- You are in the Hostinger account that owns the intended shared-hosting plan.
- Cloudflare remains the authoritative DNS provider for `readypackets.com`.
- You can identify the current Cloudflare DNS records for `www`, `my`, and `portal`.
- You have not been asked to paste, upload, or store a portal secret, customer file, database backup, private key, or `.env` file on Hostinger.

---

## 2. Choose and verify the reviewed static release

### Option A — deploy the generated static branch from GitHub (recommended)

The source repository’s **Publish Hostinger static branch** GitHub Actions workflow runs on approved `main` pushes. It builds and validates the site first, then force-updates the deploy-only `hostinger-static` branch. That branch contains only the static contents that belong in Hostinger’s document root plus `.readypackets-source-commit`, which records the immutable source commit used for that deployment.

1. In GitHub, open **Actions** for `readypackets/ReadyPackets-Marketing-Site`.
2. Confirm the latest **Static marketing site validation** and **Publish Hostinger static branch** runs for the intended `main` commit are green.
3. Open the `hostinger-static` branch and confirm it has `index.html`, `.htaccess`, `assets/`, `robots.txt`, `sitemap.xml`, `llms.txt`, `ai.txt`, and `.well-known/security.txt` at its root.
4. In Hostinger, choose **Push your code, we host it** / **Deploy from GitHub** for a custom HTML/static site—not the Node.js web-app path.
5. Authorize Hostinger only for the `readypackets/ReadyPackets-Marketing-Site` repository when GitHub presents its authorization screen.
6. Select branch **`hostinger-static`** and set the Hostinger root directory to **`public_html`**. Do not select the source branch `main`.
7. Turn on Hostinger auto-deployment only after the first production verification succeeds. Thereafter, a reviewed push to `main` builds the static branch through GitHub Actions, and Hostinger deploys that static branch.

> Do not edit `hostinger-static` manually. It is regenerated from the validated `main` source and may be overwritten on the next approved release.

### Option B — use the supplied release ZIP (fallback)

Download the `ReadyPackets-Marketing-Static.zip` artifact supplied with the deployment package.

The exact SHA-256 checksum must be supplied with the specific ZIP file you download. ZIP metadata can differ between independently built archives even when their reviewed source commit is the same, so do not reuse an older checksum from a document or another build.

On macOS or Linux, verify it before upload:

```bash
shasum -a 256 ReadyPackets-Marketing-Static.zip
```

On Windows PowerShell:

```powershell
Get-FileHash .\ReadyPackets-Marketing-Static.zip -Algorithm SHA256
```

The result must match the value above. If it does not, stop and build/download a trusted artifact again.

### Option C — build from the private repository

Use this only on a trusted workstation with Node.js 22 or later:

```bash
git clone https://github.com/readypackets/ReadyPackets-Marketing-Site.git
cd ReadyPackets-Marketing-Site
git checkout REVIEWED_40_CHARACTER_COMMIT_SHA
npm run package
```

Expected result: `ReadyPackets-Marketing-Static.zip` is created at the repository root.

> Upload the **contents** of this ZIP file to the web root. Do **not** upload the source repository, `node_modules`, portal code, `.env` files, or a parent `dist` folder that would make the live URL `/dist/index.html`.

---

## 3. Create or assign the Hostinger marketing website

1. Sign in to [Hostinger hPanel](https://hpanel.hostinger.com/).
2. Go to **Websites**.
3. Select **Add website** / **Create website**.
4. Choose **Push your code, we host it** / **Deploy from GitHub** for a custom static/HTML site. If that option is unavailable, create an **empty site** and use the ZIP fallback in Section 4. Do **not** choose WordPress, AI Builder, ecommerce, or a Node application for this static deployment.
5. Connect the existing ReadyPackets domain:
   - If hPanel accepts `www.readypackets.com` as the site hostname, use it.
   - If hPanel requires the base domain, use `readypackets.com` **only to associate the Hostinger website**. Keep the public apex routing at Cloudflare as described below; do not move nameservers to Hostinger.
6. Record the **Hostinger server IP address** or DNS target shown by hPanel. This value is required for the `www` Cloudflare record.
7. Open the new website’s **Dashboard → Files → File Manager** and note its exact document root, usually `public_html`.

### Do not do these things

- Do not transfer the domain registrar to Hostinger unless you separately decide to do so.
- Do not replace Cloudflare nameservers with Hostinger nameservers.
- Do not configure `my.readypackets.com` or `portal.readypackets.com` as aliases of the Hostinger site.
- Do not activate a Hostinger website that points at the existing portal VPS or imports portal files.

---

## 4. Fallback: upload the static site to Hostinger manually

1. In the new Hostinger website, open **Files → File Manager**.
2. Confirm the document root belongs to the **new Hostinger marketing website**, not the ReadyPackets VPS. It will normally be the Hostinger site’s `public_html` directory.
3. If this is a fresh Hostinger directory, remove only the provider’s default placeholder file such as `default.php` or `index.html`.
4. If it is not empty, first download a backup or move the current files into a timestamped folder such as `_rollback-2026-09-30`. Do not delete an unknown site.
5. Upload `ReadyPackets-Marketing-Static.zip` into the document root.
6. Use **Extract** and choose the **current `public_html` directory** as the extraction destination.
7. Enable **Show hidden files** in File Manager, then confirm these paths exist:

   ```text
   public_html/index.html
   public_html/.htaccess
   public_html/robots.txt
   public_html/sitemap.xml
   public_html/llms.txt
   public_html/ai.txt
   public_html/.well-known/security.txt
   public_html/assets/css/site.css
   public_html/assets/js/site-config.js
   public_html/assets/brand/
   ```

8. Confirm that there is no unwanted nested directory such as `public_html/dist/index.html` or `public_html/ReadyPackets-Marketing-Static/index.html`.
9. Delete `ReadyPackets-Marketing-Static.zip` from the public document root after extraction. Keep a verified copy only in secure local release storage or GitHub release/build storage.

### First local Hostinger check

Use Hostinger’s temporary preview or the assigned domain after DNS is in place. The homepage should have this title:

> **ReadyPackets | Turn a business idea into a prepared business packet**

The first load should show the ReadyPackets™ document-flow logo, the headline **“A good idea deserves more than a folder full of notes.”**, a cookie choice panel, and links to the external portal.

---

## 5. Configure Cloudflare DNS and routing

Keep Cloudflare authoritative for DNS and as the public edge layer.

### 5.1 Preserve a record of existing DNS

Before editing, export the Cloudflare zone DNS records or take a clear screenshot. Specifically preserve the current values for:

- `my.readypackets.com`
- `portal.readypackets.com`
- MX records
- SPF, DKIM, DMARC, verification TXT records
- CAA records
- Any existing apex (`readypackets.com`) record

### 5.2 Point **only** `www` to Hostinger

In **Cloudflare → DNS → Records**:

1. Find the existing `www` record.
2. Replace it only if necessary with the Hostinger server target recorded in Section 3:
   - Use an **A** record if Hostinger gave an IPv4 address.
   - Use a **CNAME** record only if Hostinger gave a hostname target.
3. Keep `my` and `portal` records unchanged.
4. Initially set the `www` record to **DNS only** (grey cloud) while Hostinger validates the domain and issues its origin certificate.

Do not create duplicate `www` records of conflicting types.

### 5.3 Configure a permanent apex-to-`www` redirect in Cloudflare

In **Cloudflare → Rules → Redirect Rules** (or **Single Redirects**):

1. Create a rule named: `ReadyPackets apex to www marketing site`.
2. Match: hostname exactly equals `readypackets.com`.
3. Redirect to: `https://www.readypackets.com` while preserving the incoming path and query string.
4. Use status code **301 — Moved Permanently**.
5. Place this rule above broader redirects that could intercept it.
6. Do **not** create a rule matching `my.readypackets.com` or `portal.readypackets.com`.

The desired behavior is:

```text
https://readypackets.com/anything?x=1
→ 301
https://www.readypackets.com/anything?x=1
```

### 5.4 Enable strict encryption after Hostinger issues a certificate

1. In hPanel, enable or wait for the included SSL certificate for the website. Confirm it covers `www.readypackets.com`.
2. Test the Hostinger-origin site over HTTPS with the `www` record still **DNS only**.
3. In Cloudflare, set **SSL/TLS encryption mode** to **Full (strict)** if not already configured.
4. Change the `www` Cloudflare record back to **Proxied** (orange cloud).
5. Wait for edge propagation and retest.

> If Hostinger cannot validate or issue its origin certificate while the record is proxied, leave it DNS-only temporarily. Do not use Cloudflare **Flexible** encryption. Do not reduce portal TLS settings to solve a marketing-host certificate issue.

---

## 6. External go-live checks

Run these from a trusted terminal after DNS and TLS propagation:

```bash
curl -fsSI https://www.readypackets.com/
curl -fsS https://www.readypackets.com/robots.txt
curl -fsS https://www.readypackets.com/sitemap.xml
curl -fsS https://www.readypackets.com/llms.txt
curl -fsSI https://www.readypackets.com/.well-known/security.txt
curl -fsSI https://readypackets.com/
curl -fsSI https://my.readypackets.com/login
curl -fsSI https://portal.readypackets.com/login
```

Expected results:

| Check | Expected result |
| --- | --- |
| `https://www.readypackets.com/` | `200 OK`, ReadyPackets marketing page, valid HTTPS |
| `https://readypackets.com/` | a single `301` to `https://www.readypackets.com/` |
| `https://www.readypackets.com/robots.txt` | public crawler directives and sitemap reference |
| `https://www.readypackets.com/sitemap.xml` | XML sitemap with public marketing URLs |
| `https://www.readypackets.com/llms.txt` | public AI/answer-engine summary |
| `https://my.readypackets.com/login` | still the existing portal login, not the marketing page |
| `https://portal.readypackets.com/login` | still the existing alternate portal login, not the marketing page |

Also verify manually in a private/incognito browser window:

- Logo, navigation, story sections, cards, footer, and portal CTA render on desktop and mobile.
- The **Skip to main content** control and keyboard focus indicator work.
- The mobile **Menu** control opens and closes with keyboard and touch.
- The compact color-theme icon has an accessible name and cycles **System → Light → Dark → System** with keyboard, touch, and pointer input.
- The cookie choice panel appears on a first visit.
- **Use essential only** does not load Clarity or PostHog.
- The `Start your packet` CTA opens `https://my.readypackets.com/register`.
- The portal links do not redirect users back to the Hostinger marketing host.

---

## 7. Optional analytics activation after go-live

Analytics is intentionally disabled by default. The site works fully without it.

Only after the public privacy notice, provider settings, data-processing agreements, retention, and operator decisions are reviewed:

1. Update `src/assets/js/site-config.js` in the private repository with a public Microsoft Clarity project ID and/or public PostHog project key.
2. Confirm the endpoint is correct before building.
3. Commit and push the reviewed change to `main`.
4. Confirm the GitHub validation and `hostinger-static` publication workflows are green, then confirm Hostinger deployed the new static branch. If using the manual fallback, run `npm run package` and upload the new static artifact instead.
5. Test in a clean browser profile that neither provider script loads until the visitor affirmatively selects **Accept analytics**.

Do not place API secrets, personal API keys, portal IDs, customer identifiers, database credentials, or portal tracking identifiers in the marketing-site configuration.

---

## 8. SEO, AI discovery, and webmaster setup

The deployment already contains rendered content, canonical metadata, Schema.org JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt`, and `ai.txt`.

After the site is reachable:

1. Add and verify `https://www.readypackets.com` in **Google Search Console**.
2. Submit `https://www.readypackets.com/sitemap.xml`.
3. Add and verify the site in **Bing Webmaster Tools** and submit the same sitemap.
4. Keep the public facts in the website, organization profile, and policies consistent. Do not publish claims that cannot be substantiated.
5. Monitor Cloudflare/Hostinger access and error logs using privacy-bounded retention. Do not send portal/customer data or secrets to marketing analytics or log systems.

These controls improve crawlability and answer-engine retrieval. They do not guarantee ranking, indexing, placement, traffic, or AI-generated descriptions.

---

## 9. Rollback

The portal is unaffected by any marketing rollback.

### Roll back a Hostinger Git deployment

1. Identify the last known-good immutable `main` commit in GitHub and confirm its previous `hostinger-static` workflow run completed successfully.
2. In Hostinger’s Git deployment history, redeploy the known-good `hostinger-static` commit if the hPanel offers that action.
3. If the hPanel cannot select a prior generated commit, create a reviewed source rollback commit/revert on `main`, wait for both GitHub workflows to pass, then redeploy the regenerated `hostinger-static` branch.
4. Re-run the checks in Section 6. The portal remains unaffected.

### Roll back a Hostinger file release

1. In Hostinger File Manager, move the current marketing files into a timestamped backup folder.
2. Upload and extract the last verified static marketing ZIP into the document root.
3. Confirm `index.html` is at the document-root level.
4. Clear only Hostinger/Cloudflare marketing-cache paths if needed.
5. Re-run the checks in Section 6.

### Roll back the DNS cutover

If the Hostinger origin is unhealthy, update only the `www` record back to the prior known-good marketing origin and disable or adjust only the apex-to-`www` redirect if required. Preserve all portal DNS records, portal certificates, portal hosting, customer data, and portal configuration.

---

## Final release record

Record these after deployment in your deployment/change log:

| Item | Value to record |
| --- | --- |
| Marketing source commit | Immutable `main` commit recorded in `.readypackets-source-commit` on the deployed `hostinger-static` branch |
| Hostinger deployment branch | `hostinger-static` |
| Marketing ZIP SHA-256 | SHA-256 recorded with the exact archive uploaded to Hostinger |
| Hostinger website/domain ID | Hostinger value — do not publish credentials |
| Hostinger origin IP or target | Hosting value — not a secret, but restrict operational sharing |
| Cloudflare rule ID | Cloudflare value |
| DNS change time and operator | Operational audit record |
| Verification results | Results from Section 6 |
| Rollback artifact/location | Verified release artifact reference |
