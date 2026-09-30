/*
 * Public configuration for the independent ReadyPackets marketing site.
 *
 * These values are embedded in browser-delivered files. Never place portal
 * credentials, API secrets, database information, encryption keys, or any
 * private value here. Microsoft Clarity project IDs and PostHog project keys
 * are browser-visible identifiers, not secrets.
 *
 * Before deployment, update siteUrl if the public canonical hostname changes.
 * Keep analytics disabled until the privacy notice, provider settings, and a
 * consent review are complete. Analytics code is loaded only after the visitor
 * gives affirmative Analytics consent.
 */
window.READYPACKETS_MARKETING_CONFIG = Object.freeze({
  siteUrl: "https://www.readypackets.com",
  portalUrl: "https://my.readypackets.com",
  alternatePortalUrl: "https://portal.readypackets.com",
  analytics: Object.freeze({
    clarityProjectId: "",
    posthogProjectKey: "",
    posthogHost: "https://us.i.posthog.com",
  }),
});
