# Static Marketing-Site Observability and Logging

A static marketing host has no application server process in this repository. Therefore it must not pretend to produce portal-grade audit logs. Observability is layered and privacy-bounded.

## Log sources

| Source | What to retain | What to exclude or minimize | Owner |
| --- | --- | --- | --- |
| Host/CDN access logs | Timestamp, request path, status, response time, edge/request ID, coarse operational/error details | Full query strings unless needed for incident response; request bodies; portal cookies; authentication data | Hosting/CDN operator |
| Host/CDN security logs | WAF/rate-limit/bot rule, action, request ID, severity, timestamp | Sensitive headers/cookies; raw IP beyond documented retention | Security operator |
| Deployment log | Commit SHA, artifact hash, actor/service, target host, start/end, result, rollback reference | SFTP password/private key, host credentials, unredacted environment values | Release owner |
| Consent/analytics | Only provider-approved, consented marketing telemetry | Portal/customer/order/file/message/payment data; form values; PII in event properties | Privacy owner |
| Accessibility feedback | Report time, page, issue category, resolution state | Unnecessary personal details; portal information in ordinary email | Accessibility owner |

## Required deployment record

For each release, create a change record with:

```text
release_id / Git commit SHA
artifact SHA-256
release time and actor
hosting target (Hostinger/Bluehost/other)
verification results: HTTPS, headers, canonical redirect, sitemap, portal links,
consent before/after state, keyboard/zoom/reduced-motion test
rollback artifact and previous commit SHA
incident or exception reference, if applicable
```

Keep deployment and security records in an access-controlled system with role-based access, retention rules, encryption in transit, and auditability. If forwarding to a SIEM/syslog platform, use TLS, an authenticated endpoint, field allowlists, and redaction. Never forward portal secrets or customer data through marketing-site telemetry.

## Search and filter recommendations

Use structured fields where the host/CDN supports them: `timestamp`, `request_id`, `hostname`, `path`, `status`, `method`, `cache_status`, `rule_id`, `severity`, `release_sha`, `event_category`, and `outcome`. Restrict access to raw IP data and avoid index fields that can hold free text or sensitive URLs.

## Incident triage

1. Confirm the affected hostname: marketing `www` vs. authenticated portal `my`/`portal`.
2. Preserve the relevant CDN/host request ID, timestamp, route, status, and release SHA.
3. Treat apparent portal data, cookies, or credentials on the marketing host as a security incident; remove exposure, revoke affected credentials, and investigate before redeploying.
4. If a release is at fault, roll back the static artifact without touching portal data or database state.
5. Record the incident outcome and corrective action in the organization’s security/audit process.
