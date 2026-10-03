# Deploying the ReadyPackets Static Marketing Site to Hostinger or Bluehost

## Architecture boundary

This repository deploys **only** the public ReadyPackets marketing site. The authenticated portal stays independent:

| Hostname | Role | Hosting location |
| --- | --- | --- |
| `www.readypackets.com` | Static, anonymous marketing site | Hostinger, Bluehost, or another static/shared host |
| `readypackets.com` | Canonical redirect to `www` | Cloudflare or shared-host redirect rule |
| `my.readypackets.com` | Primary customer/admin portal | Hardened ReadyPackets VPS |
| `portal.readypackets.com` | Alternate portal host | Hardened ReadyPackets VPS |

Never upload portal code, `.env` files, MySQL backups, customer files, encryption keys, OAuth/SAML settings, Stripe secrets, Microsoft Graph credentials, or any portal configuration to the marketing host.

## 1. Build the immutable deploy artifact

On a trusted workstation or CI runner:

```bash
git clone https://github.com/readypackets/ReadyPackets-Marketing-Site.git
cd ReadyPackets-Marketing-Site
git checkout REVIEWED_40_CHARACTER_COMMIT_SHA
npm run package
```

The generated `ReadyPackets-Marketing-Static.zip` contains the contents of `dist/`, including hidden `.htaccess` and `.well-known/security.txt` paths. Verify before uploading:

```bash
npm run validate
unzip -l ReadyPackets-Marketing-Static.zip | sed -n '1,120p'
```

## 2. Configure the static site before building

Review `scripts/site-data.mjs`:

- Set the exact public canonical URL, normally `https://www.readypackets.com`.
- Keep portal links on `https://my.readypackets.com` and/or `https://portal.readypackets.com`.
- Keep public copy, organization details, and service boundaries truthful and reviewed.

Review `src/assets/js/site-config.js` separately. Leave Clarity and PostHog IDs empty until the privacy/legal review and provider setup are complete. Do not put any confidential data in this public JavaScript file.

Re-run `npm run package` after every approved change.

## 3. DNS and TLS

Keep Cloudflare authoritative for DNS if it already protects the ReadyPackets environment.

1. Create the hosting-provider website for `www.readypackets.com`.
2. At Cloudflare, point the `www` DNS record to the address/target supplied by Hostinger or Bluehost. Avoid changing the DNS records for `my` or `portal`.
3. Configure `readypackets.com` as a permanent HTTPS redirect to `https://www.readypackets.com/`. Prefer Cloudflare Redirect Rules or one clearly owned redirect layer.
4. Enable valid TLS at the marketing host. When Cloudflare is proxied, use the provider’s appropriate origin certificate mode and Cloudflare **Full (strict)** where available.
5. Do not redirect `my.readypackets.com` or `portal.readypackets.com` through the marketing host.

## 4. Hostinger Git deployment (recommended)

The repository’s GitHub Actions workflow builds and validates `main`, then publishes only the generated static output to the deploy-only `hostinger-static` branch. In Hostinger, choose **Push your code, we host it** / GitHub deployment for a custom HTML/static site, connect only the `readypackets/ReadyPackets-Marketing-Site` repository, select **`hostinger-static`** (not `main`), and set the target root to `public_html`. This is a static-site Git deployment—not a Node.js app. See the guarded [Hostinger production runbook](HOSTINGER_PRODUCTION_DEPLOYMENT_RUNBOOK.md) for the first deployment, validation, rollback, and auto-deployment controls.

## 5. Hostinger manual upload fallback

1. In hPanel, add `www.readypackets.com` as a website and complete the provider’s domain connection workflow.
2. Open **Files → File Manager** or use SFTP.
3. Open the website’s `public_html` directory.
4. Remove only the default placeholder files after confirming the directory belongs to the `www` marketing site—not the portal.
5. Upload `ReadyPackets-Marketing-Static.zip` and extract it **into** `public_html`, or upload the contents of `dist/` with SFTP.
6. Confirm that `public_html/index.html`, `public_html/.htaccess`, `public_html/robots.txt`, `public_html/sitemap.xml`, and `public_html/.well-known/security.txt` exist.
7. Do not leave the ZIP archive publicly downloadable after extracting it.

## 6. Bluehost upload

1. Add or assign `www.readypackets.com` to the correct Bluehost website/document root.
2. Open **Advanced → File Manager** or use SFTP with a dedicated least-privilege account.
3. Upload the contents of the release archive into the assigned public document root, commonly `public_html` or an add-on domain directory.
4. Ensure hidden files are shown; `.htaccess` must be present at that site’s root.
5. Verify that only the ReadyPackets static artifact is placed in the marketing-site directory.

## 7. Verify externally

Run these after DNS/TLS propagation completes:

```bash
curl -fsSI https://www.readypackets.com/
curl -fsS https://www.readypackets.com/robots.txt
curl -fsS https://www.readypackets.com/sitemap.xml
curl -fsS https://www.readypackets.com/llms.txt
curl -fsSI https://www.readypackets.com/.well-known/security.txt
curl -fsSI https://my.readypackets.com/login
```

Check that:

- `www` serves the static marketing HTML with the canonical URL and CSP headers.
- The apex host performs one HTTPS 301 redirect to `www`.
- `my`/`portal` remain on the VPS and never serve the marketing host.
- The portal remains the only origin setting customer-session cookies.
- The privacy banner appears on a first visit; provider scripts are absent until Analytics is explicitly accepted.
- Keyboard navigation, skip link, mobile navigation, focus indicator, zoom/reflow, and reduced-motion settings operate as expected.

## Rollback

Keep the last verified `ReadyPackets-Marketing-Static.zip` and its commit SHA. To roll back, re-upload that artifact. This does **not** touch the portal database, customer files, portal configuration, or VPS. If DNS was changed as part of a broader cutover, reverse only the `www`/apex marketing records after confirming the prior destination is healthy.

## Notes on `.htaccess`

The release includes a tested Apache/LiteSpeed `.htaccess` baseline. If the selected host ignores it (for example, a managed Nginx configuration), reproduce the security headers and canonical redirect in the provider’s dashboard or Cloudflare. Do not weaken the CSP with `unsafe-inline`, wildcard script sources, or permissive CORS to work around a host configuration.
