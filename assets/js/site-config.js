/*
 * Public configuration for the independent ReadyPackets website.
 *
 * These values are embedded in browser-delivered files. Never place portal
 * credentials, API secrets, database information, encryption keys, payment
 * details, or any private value here. Microsoft Clarity project IDs, PostHog
 * project keys, AdSense publisher IDs, and AdSense slot IDs are browser-visible
 * identifiers, not secrets.
 *
 * Before deployment, update siteUrl if the public canonical hostname changes.
 * Optional provider code is loaded only after the visitor gives the matching
 * affirmative preference. Microsoft Clarity is configured for the public
 * ReadyPackets website; it must never be added as an unconditional page-head
 * tag because that would bypass the visitor's Analytics choice. See
 * docs/ANALYTICS_AND_PRIVACY.md and
 * docs/ADVERTISING_AND_CONSENT_OPERATIONS.md before changing these settings.
 */
window.READYPACKETS_WEBSITE_CONFIG = Object.freeze({
  siteUrl: "https://www.readypackets.com",
  portalUrl: "https://my.readypackets.com",
  alternatePortalUrl: "https://portal.readypackets.com",
  analytics: Object.freeze({
    clarityProjectId: "z1tfowyskv",
    posthogProjectKey: "",
    posthogHost: "https://us.i.posthog.com",
  }),
  advertising: Object.freeze({
    // Keep blank unless the reviewed consent/CMP and provider configuration are live.
    adsensePublisherId: "",
    adSlots: Object.freeze({
      "home-inline": "",
      "solutions-inline": "",
    }),
    // A direct sponsorship needs a short label, an HTTPS URL, and a factual description.
    sponsors: Object.freeze({
      "home-inline": Object.freeze({ label: "", href: "", description: "" }),
      "solutions-inline": Object.freeze({ label: "", href: "", description: "" }),
    }),
  }),
});
