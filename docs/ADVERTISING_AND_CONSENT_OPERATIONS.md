# Advertising, Sponsorship, and Consent Operations

## Default posture

ReadyPackets ships with all advertising disabled. The public configuration contains empty AdSense publisher and slot values, so the browser creates no advertising network request, no ad unit, no sponsor placement, and no advertising cookie until the operator configures a placement and a visitor affirmatively enables **Advertising** in the preference center.

The site supports two deliberately separated models:

1. **Google AdSense manual units.** These are limited to declared, clearly labelled placement regions. The website does not enable Auto ads, overlays, anchors, or page-wide automatic insertion.
2. **Direct sponsorships and other paid placements.** A sponsor name, HTTPS destination, and short description can be configured for a named placement. The website renders it as a clearly labelled sponsored link. It does not inject a third-party tag or track clicks.

This separation keeps the public website static and gives the operator control over whether an advertising partner can load browser code.

## Non-negotiable consent gate

Google says that publishers serving personalized ads to users in the EEA, United Kingdom, or Switzerland must use a Google-certified CMP integrated with the IAB Transparency and Consent Framework. Google also explains that a local banner alone does not guarantee compliance and that publishers must disclose data use, recipients, and consent choices.[1] [2]

Accordingly, do **not** enter an AdSense publisher ID or slot ID until all of the following are true:

1. ReadyPackets has an approved AdSense account and has added/verified the public hostname in AdSense.
2. Privacy/legal review has approved the final jurisdictional notice, provider disclosures, retention, rights process, and direct-sponsor relationships.
3. A Google-certified CMP/TCF implementation is active for EEA, UK, and Swiss traffic when required. The lightweight ReadyPackets preference control is intentionally not represented as a replacement for that CMP.
4. The configured AdSense unit, placement, and ad experience have been reviewed in a clean browser profile at desktop, mobile, keyboard, high zoom, and reduced-motion settings.

The website’s own advertising control is still a fail-closed browser gate: when the visitor has not selected Advertising, the site does not create an AdSense script or slot. Withdrawing Advertising removes rendered placement content for subsequent use in the current page; it cannot erase advertising-provider data already processed. Visitors should be able to reopen the preference center at any time.

## Enabling a manually placed AdSense unit

Edit only `src/assets/js/site-config.js`; it is a public browser file. Never put an AdSense login, API credential, private key, payment information, or any portal value in it.

```js
advertising: Object.freeze({
  adsensePublisherId: "ca-pub-REPLACE_WITH_PUBLIC_PUBLISHER_ID",
  adSlots: Object.freeze({
    "home-inline": "REPLACE_WITH_AD_UNIT_SLOT_ID",
    "solutions-inline": "REPLACE_WITH_AD_UNIT_SLOT_ID",
  }),
  sponsors: Object.freeze({
    "home-inline": Object.freeze({ label: "", href: "", description: "" }),
    "solutions-inline": Object.freeze({ label: "", href: "", description: "" }),
  }),
}),
```

Use manual slot IDs rather than enabling Auto ads. Google’s Auto ads guidance places code on every page and can insert formats across a site; manual slots preserve the website’s accessibility, layout, and advertising-density review boundary.[3]

After configuration, run:

```bash
npm run package
```

Then commit, push, wait for GitHub validation and `hostinger-static` publication, and deploy that branch. In a clean browser profile, confirm that no request to `pagead2.googlesyndication.com`, `doubleclick.net`, or `googletagservices.com` occurs before the visitor opts into Advertising. Confirm that a configured placement is explicitly labelled **Advertisement**, does not appear in menus, next to action buttons, or in a way that could be confused with ReadyPackets content.

## Configuring a direct sponsor

A direct sponsor uses the `sponsors` entry shown above. Enter a short, factual public label, an HTTPS URL, and a short description. The site rejects malformed/non-HTTPS destinations and adds `noopener noreferrer sponsored` to the outbound link. The placement remains hidden until the visitor has selected Advertising.

Direct sponsorship does not load an external tag by itself. If a sponsor requires a third-party tag, pixels, remarketing, audience matching, or click tracking, treat it as a new advertising vendor: obtain privacy/legal approval, update the privacy notice, expand the technical allowlist only for the exact reviewed origin, and add the vendor to the consent/CMP process before release.

## Placement and accessibility rules

Google prohibits deceptive navigation and implementation that encourages clicks. It also prohibits artificial clicks or impressions.[4] ReadyPackets therefore keeps all placements outside the header, navigation, portal buttons, packet-opening controls, and download-looking controls. The labelled placement component uses semantic container markup, is hidden when unconfigured, has no autoplay behavior, does not trap focus, and collapses without leaving empty space. At widths where content must reflow, packet tiers switch to one column rather than forcing horizontal page scrolling.

Before each advertising release, test:

- first visit and essential-only preference: no advertising tag, slot, or sponsor content;
- Advertising enabled: only configured labelled placements appear;
- keyboard traversal and screen-reader announcement of placement labels;
- 200%/400% zoom and a 320 px-wide viewport: no clipped content or two-dimensional page scrolling;
- dark, light, and system themes;
- Cloudflare/Hostinger headers: no CSP violation and no weakened `script-src` policy;
- provider dashboard policy/consent status and invalid-traffic alerts.

## References

[1]: https://support.google.com/adsense/answer/13554116?hl=en "Google consent management requirements for serving ads"
[2]: https://www.google.com/about/company/user-consent-policy-help/ "Google EU user consent policy help"
[3]: https://support.google.com/adsense/answer/9261307?hl=en-GB "Set up Auto ads on your site"
[4]: https://support.google.com/adsense/answer/48182?hl=en "AdSense Program policies"
