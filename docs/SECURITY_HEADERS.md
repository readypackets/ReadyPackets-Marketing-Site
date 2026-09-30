# Static Hosting Security Headers

The site includes an Apache/LiteSpeed `.htaccess` file in the deployment artifact. It configures a strict static-site baseline without inline script/style allowances, permissive CORS, portal credentials, or server-side application routing.

## Required production checks

After upload, verify headers from an external network:

```bash
curl -fsSI https://www.readypackets.com/
```

Confirm `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, and a single `Strict-Transport-Security` header. Confirm that the canonical public hostname resolves over HTTPS and that the marketing host does **not** set portal cookies.

## Analytics allowlist

The CSP lists Microsoft Clarity and PostHog only to make optional, consented analytics possible. An allowlisted CSP origin does not load a provider. `site.js` injects neither provider script nor sends analytics events until the visitor has actively selected Analytics in the preference centre and the matching provider configuration exists.

## Host compatibility

- **Hostinger / Bluehost Apache or LiteSpeed:** upload `.htaccess` at the `public_html` root and verify it takes effect.
- **A host that ignores `.htaccess`:** configure the same rules in the host’s response-header panel, CDN, or web-server configuration. Do not weaken the policy by adding `unsafe-inline` or a wildcard script source.
- **Cloudflare:** retain Cloudflare as DNS/edge protection where used; implement canonical redirects and headers consistently in one layer to avoid duplicates.

The rules intentionally do not implement a portal proxy, cross-origin session sharing, or public API endpoint. Keep the portal at `my.readypackets.com` and/or `portal.readypackets.com` as a separate application boundary.
