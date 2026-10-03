# Consent-First Microsoft Clarity and PostHog

## Default behavior

This marketing site has no analytics dependency at build time and **does not load Microsoft Clarity or PostHog by default**. The public configuration contains empty provider values. A browser loads a provider only when all of these conditions are true:

1. The site operator has entered the provider’s public project identifier in `src/assets/js/site-config.js`.
2. The site has been rebuilt and deployed.
3. The visitor has affirmatively selected **Analytics** in the cookie preference banner or preference dialog.

The user can select Essential only or withdraw Analytics later. Essential local storage remembers that choice. The compact color-theme icon defaults to **System** and follows the operating-system preference; activation cycles System → Light → Dark, and only an explicit Light or Dark choice is stored locally, without being sent to an analytics provider or the portal.

## Data minimization controls in the source

| Control | ReadyPackets static site behavior |
| --- | --- |
| Default | Optional analytics disabled |
| Consent | No provider tag or request before affirmative Analytics selection |
| PostHog | `autocapture: false`, `capture_pageview: false`, `disable_session_recording: true`, `person_profiles: "never"`, and opt-out-by-default |
| PostHog events | One reviewed page-view event with marketing-surface and path only |
| Clarity | Loaded after consent only; ConsentV2 is sent with analytics storage granted and ad storage denied |
| Form data | No marketing contact form exists; the site avoids collecting form values |
| Portal linkage | No cross-site analytics handoff, shared session cookie, customer ID, e-mail, order ID, or portal identity is implemented |
| Color theme | System is the default; explicit light/dark choices are local-only and do not affect consent or analytics behavior |
| Withdrawal | New capture is stopped and configured providers receive an opt-out instruction |

## Operator steps before enabling a provider

1. Obtain legal/privacy review for the intended audience and jurisdictions.
2. Publish reviewed final privacy/cookie notices, including provider identity, purpose, lawful basis, data categories, retention, recipients/transfers, and rights process.
3. Configure provider-side privacy controls: region, data-processing agreement, retention, IP treatment, masking, access roles, and deletion/export process.
4. Create a Microsoft Clarity project and/or PostHog project for the **marketing hostname only**. Do not reuse a project configured to ingest portal, order, file, or support data.
5. In `src/assets/js/site-config.js`, insert only the provider project identifier and supported PostHog host. These values are public browser configuration, not secrets.
6. Rebuild, validate, deploy, and test both a fresh visitor and a visitor who chooses Essential only.
7. Review the provider dashboard to confirm the event schema contains only approved marketing paths and no unexpected personal data.

## Never place these values in the marketing repository or public configuration

- Provider management/API keys
- Portal database credentials or connection strings
- Session, CSRF, encryption, backup, signing, OAuth, SAML, Stripe, Microsoft Graph, SMTP, or Cloudflare secrets
- Customer/account/order/file identifiers
- Any production `portal.env` content

## Compliance posture

The controls are designed to support consent-first privacy operations and reduce collection. They do not by themselves establish GDPR, UK GDPR, ePrivacy, CPRA/CCPA, state privacy, or other regulatory compliance. The site operator remains responsible for legal basis, notice, consent records where required, vendor terms, transfer safeguards, data-subject rights, provider settings, retention, and jurisdiction-specific obligations.
