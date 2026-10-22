import { packetExplorerHtml } from "./packet-catalogue.mjs";
import { advertisingPlacementHtml } from "./advertising-placement.mjs";

/**
 * The approved ReadyPackets logo is a supplied icon, wordmark, rule, and
 * tagline set. Keeping the composition in one helper prevents retired artwork
 * or distorted single-image substitutions from returning to any static page.
 */
export function approvedBrandLockupHtml(variant, { className = "", label = "ReadyPackets™ — Your Business, Professionally Packeted™" } = {}) {
  if (variant !== "light" && variant !== "dark") throw new Error("Invalid approved ReadyPackets logo variant");
  const additionalClass = className ? ` ${className}` : "";
  const accessible = label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true"';
  return `<span class="brand-mark brand-header-lockup brand-mark--${variant}${additionalClass}"${accessible}><img class="brand-header-lockup__icon" src="/assets/brand/readypackets-approved-header-icon-${variant}.png" width="880" height="905" alt=""><span class="brand-header-lockup__details"><img class="brand-header-lockup__wordmark" src="/assets/brand/readypackets-approved-header-wordmark-${variant}.png" width="1865" height="345" alt=""><img class="brand-header-lockup__rule" src="/assets/brand/readypackets-approved-header-rule-${variant}.png" width="1854" height="74" alt=""><img class="brand-header-lockup__tagline" src="/assets/brand/readypackets-approved-header-tagline-${variant}.png" width="1770" height="175" alt=""></span></span>`;
}

export const site = {
  name: "ReadyPackets",
  legalName: "ReadyPackets",
  url: "https://www.readypackets.com",
  portalUrl: "https://my.readypackets.com",
  alternatePortalUrl: "https://portal.readypackets.com",
  description: "ReadyPackets helps founders turn business ideas into clear, professionally prepared business documentation, operating frameworks, and launch-ready materials.",
  address: ["7404 Executive Pl", "Lanham, MD 20706", "United States"],
};

export const nav = [
  ["index.html", "Home"],
  ["process.html", "The process"],
  ["solutions.html", "What we build"],
  ["faq.html", "FAQ"],
  ["about.html", "About"],
  ["contact.html", "Contact"],
];

export const pages = {
  "index.html": {
    title: "ReadyPackets | Turn a business idea into a prepared business packet",
    description: "ReadyPackets helps founders move from scattered notes to structured business documentation, operating design, and launch-ready materials.",
    body: `
      <section class="hero" aria-labelledby="hero-title">
        <div class="wrap hero-grid">
          <div>
            <p class="pill">Your Business, Professionally Packeted™</p>
            <h1 id="hero-title">A good idea deserves more than a folder full of notes.</h1>
            <p class="lead">ReadyPackets helps founders turn the early, messy stage of a business into clear, prepared materials that make the next conversation easier—whether that conversation is with a partner, attorney, lender, investor, customer, or your own team.</p>
            <div class="button-row">
              <a class="button button--gold" href="${site.portalUrl}" data-portal-link>Start your packet <span aria-hidden="true">→</span></a>
              <a class="button button--light" href="process.html">See the process</a>
            </div>
          </div>
          <aside class="hero-card" aria-label="What ReadyPackets provides">
            ${approvedBrandLockupHtml("dark", { className: "brand--hero-approved" })}
            <h2>From inputs to an organized, ready-to-use packet.</h2>
            <ul class="check-list">
              <li>Guided intake that brings the important questions forward</li>
              <li>Structured documents with a clear purpose and sequence</li>
              <li>Private portal delivery built for review and collaboration</li>
              <li>A practical foundation for the work that comes next</li>
            </ul>
          </aside>
        </div>
      </section>

      <section class="section" aria-labelledby="story-title">
        <div class="wrap story-grid">
          <div class="story-panel">
            <p class="eyebrow">The founder moment</p>
            <h2 id="story-title">You can see the business. Can anyone else?</h2>
            <p>Most promising businesses begin as a mix of experience, insight, voice notes, sketches, spreadsheets, and a growing list of decisions. The challenge is not that the idea is weak. The challenge is that the story, operating logic, and proof have not yet been made clear enough for someone else to act on.</p>
            <p>ReadyPackets gives that information a disciplined home. We help organize what matters, surface the gaps, and prepare materials that can move with you into serious conversations.</p>
          </div>
          <div class="story-panel story-panel--dark">
            <p class="eyebrow eyebrow--teal-light">The shift</p>
            <span class="stat">Scattered → Structured</span>
            <p>Instead of rebuilding the same explanation for every audience, you begin with a coherent packet: a shared reference point for decisions, review, and forward motion.</p>
            <ul class="check-list">
              <li>Clearer priorities</li>
              <li>Documented assumptions</li>
              <li>Defined next steps</li>
              <li>Materials that are easier to review</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section section--soft" aria-labelledby="what-title">
        <div class="wrap">
          <div class="section-heading section-heading--center">
            <p class="eyebrow">What a packet can do</p>
            <h2 id="what-title">Build clarity before the stakes get higher.</h2>
            <p class="lead">Every engagement is scoped to the work in front of you. The aim is not paperwork for its own sake—it is a useful, organized foundation for better decisions and stronger handoffs.</p>
          </div>
          <div class="grid-3">
            <article class="card"><span class="icon-badge" aria-hidden="true">01</span><h3>Make the idea legible</h3><p>Put the core problem, opportunity, audience, logic, and assumptions into a form that others can understand and evaluate.</p></article>
            <article class="card"><span class="icon-badge" aria-hidden="true">02</span><h3>Prepare the business</h3><p>Develop the business foundation, plan, operating design, and execution materials that match your stage and objective.</p></article>
            <article class="card"><span class="icon-badge" aria-hidden="true">03</span><h3>Move with confidence</h3><p>Bring an organized reference packet into partner, financing, launch, and implementation conversations with less rework.</p></article>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="process-title">
        <div class="wrap split-grid">
          <div>
            <p class="eyebrow">The ReadyPackets process</p>
            <h2 id="process-title">A calm path from the first conversation to a usable deliverable.</h2>
            <p class="lead">The work is collaborative, structured, and built around the decisions that matter at your stage.</p>
            <a class="button button--outline" href="process.html">Explore the full process <span aria-hidden="true">→</span></a>
          </div>
          <ol class="process-rail">
            <li class="process-item"><strong>1</strong><div><h3>Choose a starting point</h3><p>Select the packet or conversation that best fits the work ahead. You do not have to solve every future need on day one.</p></div></li>
            <li class="process-item"><strong>2</strong><div><h3>Bring the raw material</h3><p>Share the information you have. Structured intake turns it into a clear working picture and identifies the questions worth resolving.</p></div></li>
            <li class="process-item"><strong>3</strong><div><h3>Shape and review</h3><p>Documents and frameworks are prepared, reviewed, and refined with a clear purpose for each deliverable.</p></div></li>
            <li class="process-item"><strong>4</strong><div><h3>Receive a ready packet</h3><p>Your completed materials are organized for secure portal access, future reference, and the next right conversation.</p></div></li>
          </ol>
        </div>
      </section>

      <section class="section section--soft" aria-labelledby="services-title">
        <div class="wrap">
          <div class="section-heading"><p class="eyebrow">Explore the packets</p><h2 id="services-title">Choose the kind of business-building work that makes the next step clearer.</h2><p class="lead">Open a packet to view every tier, timeline, outcome, and included offering, then continue in the portal when you are ready to discuss the right fit.</p></div>
          ${packetExplorerHtml("home-packet", site.portalUrl)}
        </div>
      </section>

      <section class="section section--soft" aria-label="Optional advertising placement">
        <div class="wrap">${advertisingPlacementHtml("home-inline")}</div>
      </section>

      <section class="section" aria-labelledby="integrity-title">
        <div class="wrap callout">
          <p class="eyebrow eyebrow--mint">A professional way to begin</p>
          <h2 id="integrity-title">Your work deserves care before it reaches the next room.</h2>
          <p class="lead">ReadyPackets is designed to help founders arrive prepared. It does not replace advice from a licensed attorney, accountant, tax professional, or other qualified adviser. When specialist advice is needed, a clear packet can make that conversation more productive.</p>
          <div class="button-row"><a class="button button--gold" href="${site.portalUrl}" data-portal-link>Begin in the portal <span aria-hidden="true">→</span></a><a class="button button--light" href="contact.html">Talk with ReadyPackets</a></div>
        </div>
      </section>
    `,
  },
  "process.html": {
    title: "The ReadyPackets process | A clear path from idea to prepared packet",
    description: "Learn how ReadyPackets guides founders from a focused starting point through intake, shaping, review, and organized delivery.",
    body: `
      <section class="hero"><div class="wrap hero-grid"><div><p class="pill">The ReadyPackets process</p><h1>Make the next step clear before you take it.</h1><p class="lead">A packet is not a pile of documents. It is a deliberate sequence of thinking, preparation, review, and delivery built around the decision you need to make next.</p><div class="button-row"><a class="button button--gold" href="${site.portalUrl}" data-portal-link>Choose your starting point <span aria-hidden="true">→</span></a></div></div>${approvedBrandLockupHtml("dark", { className: "brand--hero-approved" })}</div></section>
      <section class="section"><div class="narrow prose"><p class="eyebrow">How it works</p><h2>One business. One clear sequence.</h2><p class="lead">The exact scope will vary, but the rhythm stays consistent: clarify what is needed, gather the relevant inputs, develop focused materials, review them carefully, and organize the result for use.</p></div><div class="wrap grid-4 grid-top-gap"><article class="step"><span class="step-number">Step 01</span><h3>Orient</h3><p>Start with the stage, goal, and audience that matter now. We help identify a focused starting point rather than forcing every need into one engagement.</p></article><article class="step"><span class="step-number">Step 02</span><h3>Gather</h3><p>Use guided intake to collect the source material, context, and open questions that shape a credible working picture.</p></article><article class="step"><span class="step-number">Step 03</span><h3>Shape</h3><p>Translate inputs into organized documents, frameworks, and practical recommendations with a clear purpose for each deliverable.</p></article><article class="step"><span class="step-number">Step 04</span><h3>Prepare</h3><p>Review the work, confirm the handoff, and place completed materials in the portal for secure, organized access.</p></article></div></section>
      <section class="section section--soft"><div class="wrap split-grid"><div class="story-panel"><p class="eyebrow">What to bring</p><h2>You do not need to arrive finished.</h2><p>Bring the material you have: notes, prior documents, a working model, customer insight, a timeline, a question you cannot yet answer, or simply a direction you want to make real.</p><p>The point of the process is to make sense of that material—not to punish you for having it in an early form.</p></div><div class="story-panel"><p class="eyebrow">What to expect</p><h2>Purposeful progress—not generic output.</h2><ul class="feature-list"><li>A clear purpose for the engagement</li><li>Guided prompts that surface essential details</li><li>Documented decisions and useful next steps</li><li>Review points that keep the work aligned</li><li>Organized delivery in your ReadyPackets portal</li></ul></div></div></section>
      <section class="section"><div class="wrap callout"><h2>Ready to turn the raw material into a starting point?</h2><p>Start in the secure ReadyPackets portal. You can choose a packet, create an account, and continue from there.</p><div class="button-row"><a class="button button--gold" href="${site.portalUrl}" data-portal-link>Open the portal <span aria-hidden="true">→</span></a><a class="button button--light" href="solutions.html">Explore solution areas</a></div></div></section>
    `,
  },
  "solutions.html": {
    title: "What ReadyPackets builds | Business documentation and operating foundations",
    description: "Explore ReadyPackets solution areas for idea preparation, business foundations, plans, operations, partnerships, and launch readiness.",
    body: `
      <section class="hero"><div class="wrap hero-grid"><div><p class="pill">What we build</p><h1>Prepare the part of the business that needs to hold up next.</h1><p class="lead">ReadyPackets organizes its work around real founder moments: explaining an idea, setting a business foundation, preparing a plan, creating operating clarity, formalizing a partnership, or getting ready to launch.</p><div class="button-row"><a class="button button--gold" href="${site.portalUrl}" data-portal-link>Explore in the portal <span aria-hidden="true">→</span></a></div></div><aside class="hero-card"><h2>Built for practical use</h2><ul class="check-list"><li>Clarity for the people who need to understand the work</li><li>Structure for the people who need to execute it</li><li>Materials that make the next review more efficient</li></ul></aside></div></section>
      <section class="section"><div class="wrap"><div class="section-heading section-heading--center"><p class="eyebrow">Solution areas</p><h2>Seven ways to prepare a business for what comes next.</h2><p class="lead">Open any packet to view every tier, timeline, outcome, and included offering. Packages and final scope are selected in the portal. These categories describe the work they are designed to support, not legal, tax, accounting, investment, or other regulated professional advice.</p></div>${packetExplorerHtml("solutions-packet", site.portalUrl)}</div></section>
      <section class="section section--soft" aria-label="Optional advertising placement"><div class="wrap">${advertisingPlacementHtml("solutions-inline")}</div></section>
      <section class="section section--soft"><div class="wrap split-grid"><div><p class="eyebrow">Start narrow. Build forward.</p><h2>A strong foundation does not have to begin as an all-at-once project.</h2><p class="lead">Choose the packet that makes the next decision easier. When future work is needed, completed materials create a more organized starting point.</p></div><div class="story-panel"><h3>Not sure where to begin?</h3><p>Start with the stage you are in and the conversation you are trying to prepare for. The portal can help you find an appropriate point of entry.</p><a class="button button--outline" href="${site.portalUrl}" data-portal-link>Start in the portal <span aria-hidden="true">→</span></a></div></div></section>
    `,
  },
  "faq.html": {
    title: "ReadyPackets FAQ | Clear answers for founders",
    description: "Find answers about ReadyPackets, the process, portal access, professional boundaries, privacy, and getting started.",
    faq: true,
    body: `
      <section class="section section--soft"><div class="narrow"><p class="eyebrow">Frequently asked questions</p><h1>Clear answers for the first questions.</h1><p class="lead">ReadyPackets is designed to make a business easier to explain, prepare, and move forward. Here are answers to common questions about the work and the portal.</p></div></section>
      <section class="section"><div class="narrow faq-list">
        <details open><summary>What is ReadyPackets?</summary><div><p>ReadyPackets helps founders organize business information into clear, professionally prepared documentation, frameworks, and deliverables. The work is designed to make the next strategic, operational, partner, or professional conversation easier.</p></div></details>
        <details><summary>Who is ReadyPackets for?</summary><div><p>ReadyPackets is for founders, entrepreneurs, operators, consultants, and project-based businesses that need clearer business documentation and an organized foundation for a next-stage decision or conversation.</p></div></details>
        <details><summary>What happens after I start?</summary><div><p>You begin in the secure portal, select a starting point, and provide the relevant context through guided intake. The scope, review process, and deliverables are then organized around the work you selected.</p></div></details>
        <details><summary>Does ReadyPackets provide legal, tax, accounting, or investment advice?</summary><div><p>No. ReadyPackets is not a law firm, accounting firm, tax adviser, investment adviser, broker-dealer, or substitute for licensed professional advice. Prepared materials may help you organize a conversation with a qualified professional, but you should obtain advice appropriate to your circumstances.</p></div></details>
        <details><summary>Where are completed materials delivered?</summary><div><p>Completed materials are organized in the ReadyPackets portal so you can access, review, and manage the work from your account. Portal availability and access are governed by the applicable service terms and account controls.</p></div></details>
        <details><summary>Can I start with one packet and add work later?</summary><div><p>Yes. Many businesses begin with the work that makes the next decision easier. A clear, completed packet can become a more efficient starting point for future work.</p></div></details>
        <details><summary>What data is collected on the ReadyPackets website?</summary><div><p>The ReadyPackets website uses essential local storage/cookies for your privacy preference. Microsoft Clarity is configured for optional website analytics and does not load unless you affirmatively choose Analytics. PostHog and advertising remain unconfigured. The website does not share portal account, order, payment, document, or authenticated identifiers with analytics providers. See the <a href="privacy.html">Privacy &amp; cookie notice</a> for details.</p></div></details>
        <details><summary>How do I get help with an existing order?</summary><div><p>Sign in to the portal to access order-specific information or support. Do not include sensitive order, identity, payment, or document information in a public e-mail.</p></div></details>
      </div></section>
      <section class="section section--soft"><div class="wrap callout"><h2>Still deciding where to start?</h2><p>Explore the process, review the solution areas, or begin in the portal when you are ready.</p><div class="button-row"><a class="button button--gold" href="process.html">See the process</a><a class="button button--light" href="${site.portalUrl}" data-portal-link>Open the portal <span aria-hidden="true">→</span></a></div></div></section>
    `,
  },
  "about.html": {
    title: "About ReadyPackets | A clearer way to prepare a business",
    description: "Learn about ReadyPackets and its practical approach to turning business information into organized, ready-to-use packets.",
    body: `
      <section class="hero"><div class="wrap hero-grid"><div><p class="pill">About ReadyPackets</p><h1>Preparation is a competitive advantage.</h1><p class="lead">ReadyPackets exists for the period between “I know this can work” and “I can show someone how it works.” We bring structure to the information, decisions, and materials that help a business move forward.</p></div>${approvedBrandLockupHtml("dark", { className: "brand--hero-approved" })}</div></section>
      <section class="section"><div class="wrap split-grid"><div><p class="eyebrow">Our approach</p><h2>Useful structure, not generic paperwork.</h2><p class="lead">The best business materials do not sound impressive only on the page. They clarify what a business is doing, why it matters, who it serves, and what needs to happen next.</p></div><div class="story-panel"><h3>What we value</h3><ul class="feature-list"><li>Plain language before unnecessary jargon</li><li>Purpose before volume</li><li>Clear assumptions before polished claims</li><li>Documentation that supports the next decision</li><li>Respect for the founder’s time and context</li></ul></div></div></section>
      <section class="section section--soft"><div class="wrap"><div class="section-heading section-heading--center"><p class="eyebrow">A prepared path forward</p><h2>Bring the inputs together. Prepare the output for use.</h2><p class="lead">ReadyPackets reflects the work: distinct inputs become an organized, prepared result. The goal is not to make a business look finished before it is. It is to make the next stage easier to see and act on.</p></div><div class="brand-showcase">${approvedBrandLockupHtml("light", { className: "brand--showcase-approved" })}</div></div></section>
      <section class="section"><div class="wrap callout"><h2>Bring the business into clearer view.</h2><p>When the time is right, begin in the ReadyPackets portal and choose a focused starting point.</p><div class="button-row"><a class="button button--gold" href="${site.portalUrl}" data-portal-link>Start your packet <span aria-hidden="true">→</span></a></div></div></section>
    `,
  },
  "contact.html": {
    title: "Contact ReadyPackets | General questions and portal access",
    description: "Contact ReadyPackets for general questions, or use the secure portal for orders, documents, and account-specific support.",
    body: `
      <section class="section section--soft"><div class="narrow"><p class="eyebrow">Contact ReadyPackets</p><h1>Start with the right conversation.</h1><p class="lead">For general questions about ReadyPackets, use the contact route below. For account, order, document, payment, or support information, use the secure portal instead.</p></div></section>
      <section class="section"><div class="wrap grid-3"><article class="card"><span class="icon-badge" aria-hidden="true">↗</span><h2 class="card-heading">Start or sign in</h2><p>Use the portal to create an account, explore available options, and manage your ReadyPackets work.</p><a class="button" href="${site.portalUrl}" data-portal-link>Open the portal <span aria-hidden="true">→</span></a></article><article class="card"><span class="icon-badge" aria-hidden="true">?</span><h2 class="card-heading">General questions</h2><p>For non-sensitive general inquiries, email the ReadyPackets team. Do not include personal, order, payment, or proprietary details in an e-mail.</p><p><a href="mailto:info@readypackets.com?subject=ReadyPackets%20general%20question">info@readypackets.com</a></p></article><article class="card"><span class="icon-badge" aria-hidden="true">⌁</span><h2 class="card-heading">Existing customers</h2><p>Use the authenticated portal for order-specific requests, secure files, messages, and support history.</p><a class="button button--outline" href="${site.portalUrl}/login" data-portal-link>Sign in securely <span aria-hidden="true">→</span></a></article></div></section>
      <section id="business-address" class="section section--soft"><div class="narrow prose contact-note"><h2>Business address</h2><address class="contact-address">ReadyPackets<br>7404 Executive Pl<br>Lanham, MD 20706<br>United States</address><p class="contact-address__notice">ReadyPackets provides services remotely. This address is for business identification only; it is not a walk-in location and is not monitored for customer correspondence.</p><p>For account, order, document, payment, or support matters, use the secure portal. For general, non-sensitive questions, email <a href="mailto:info@readypackets.com?subject=ReadyPackets%20general%20question">info@readypackets.com</a>.</p><p>Accessibility feedback is welcome. See the <a href="accessibility.html">Accessibility statement</a> for the preferred way to report a barrier.</p></div></section>
    `,
  },
  "privacy.html": {
    title: "Privacy & cookie notice | ReadyPackets website",
    description: "Read the ReadyPackets website privacy and cookie notice, including optional analytics and advertising choices and privacy preference controls.",
    body: `
      <section class="section section--soft"><div class="narrow"><p class="eyebrow">Privacy &amp; cookie notice</p><h1>Clear choices for the ReadyPackets website.</h1><p class="lead">This notice explains how the ReadyPackets website handles essential preferences and optional analytics or advertising. It does not replace the separate portal privacy information that applies to authenticated portal services.</p></div></section>
      <section class="section"><div class="narrow prose">
        <p class="notice"><strong>Effective date:</strong> October 22, 2026. This operational notice should be reviewed by the organization’s privacy counsel before a public launch in any jurisdiction where specific disclosures, data-processing terms, or consumer-rights notices are required.</p>
        <h2>1. Scope</h2><p>This notice applies to the public ReadyPackets website at <code>www.readypackets.com</code> and its static pages. The ReadyPackets portal at <code>my.readypackets.com</code> and/or <code>portal.readypackets.com</code> is a separate authenticated service with separate operational data processing.</p>
        <h2>2. Essential storage</h2><p>The site stores a local privacy-preference record so it can remember whether you selected optional Analytics and/or Advertising. It may also store a non-identifying appearance preference when you explicitly choose Light or Dark mode; System mode is the default and follows your device setting without storing a separate appearance choice. This storage is necessary to honor your selections and is not used for advertising profiling.</p>
        <h2>3. Optional analytics</h2><p>Microsoft Clarity is configured for this public website and does not load unless you actively select Analytics. When loaded, Clarity may process website interaction and device/browser information in accordance with its provider configuration. The ReadyPackets website does not send custom account identifiers, e-mail addresses, order identifiers, document names, messages, payment information, or portal-authenticated identifiers to Clarity. PostHog is not configured; if it is enabled later, its autocapture and session replay remain disabled and it sends only the reviewed marketing-page path event.</p><p>Provider-side settings—such as data region, retention, IP treatment, masking, deletion, access roles, exports, and data-processing terms—must be configured by ReadyPackets before activation. Do not enable a provider until the notice, lawful basis, and applicable transfer safeguards have been reviewed for the relevant audience.</p>
        <h2>4. Optional advertising and sponsorships</h2><p>Advertising is disabled by default. If ReadyPackets configures a direct sponsorship or a manual advertising network placement, the placement is clearly labelled and remains hidden until you affirmatively select Advertising. A direct sponsorship does not load a third-party tag by itself. An advertising network may process device, cookie, or similar online identifiers in accordance with its notice and settings. ReadyPackets does not use the public website to share portal accounts, order identifiers, file information, payment information, or authenticated portal identifiers with an advertising provider.</p><p>Where required for the audience, ReadyPackets will use the required consent-management process before serving advertising. In particular, personalized Google advertising for users in the EEA, United Kingdom, or Switzerland requires a Google-certified CMP integrated with the IAB Transparency and Consent Framework. See Google’s <a href="https://www.google.com/about/company/user-consent-policy-help/" rel="noopener noreferrer">EU user consent policy information</a> and <a href="https://business.safety.google/privacy/" rel="noopener noreferrer">business data responsibility information</a>.</p>
        <h2>5. Choices and withdrawal</h2><p>You can choose Analytics, Advertising, both, or essential storage only, and you can change your preference at any time. You can also use the color-theme icon in the site header to cycle System, Light, and Dark; selecting System removes any saved appearance override and follows your device preference. Withdrawing an optional preference stops new optional website loading in the current and future visits where browser storage is available. It does not erase information a provider already processed; contact the provider and ReadyPackets as applicable for requests concerning prior processing.</p><p><button class="button button--outline" type="button" data-consent-open>Manage cookie preferences</button></p>
        <h2>6. Links to the portal</h2><p>Links to the portal open a separate origin. The ReadyPackets website does not share a portal session cookie, customer record, order, file, or authenticated identifier with the portal.</p>
        <h2>7. Your rights and contact</h2><p>Depending on where you live, you may have rights to request access, correction, deletion, restriction, objection, portability, or information about processing. For general privacy inquiries, contact <a href="mailto:privacy@readypackets.com">privacy@readypackets.com</a>. Do not transmit sensitive portal or order details by ordinary e-mail.</p>
        <h2>8. Updates</h2><p>ReadyPackets may update this notice as the site, providers, or legal requirements change. A revised effective date will be posted on this page. Material changes to optional analytics or advertising require a new consent choice.</p>
      </div></section>
    `,
  },
  "accessibility.html": {
    title: "Accessibility statement | ReadyPackets website",
    description: "Read the ReadyPackets website accessibility statement and how to report an accessibility barrier.",
    body: `
      <section class="section section--soft"><div class="narrow"><p class="eyebrow">Accessibility statement</p><h1>Designed to be usable by more people.</h1><p class="lead">ReadyPackets aims to make this website accessible to visitors using keyboards, assistive technologies, zoom, and different devices.</p></div></section>
      <section class="section"><div class="narrow prose"><p class="notice"><strong>Accessibility target:</strong> this ReadyPackets website is designed and tested against applicable <a href="https://www.w3.org/TR/WCAG22/" rel="noopener noreferrer">WCAG 2.2 Level AA</a> success criteria. Accessibility is an ongoing practice; this statement does not constitute a legal certification or guarantee of compliance in every circumstance.</p><h2>What this site includes</h2><ul><li>Semantic landmarks, headings, lists, and link text</li><li>A visible keyboard focus indicator and skip-to-content link</li><li>Responsive layout that supports reflow and browser zoom</li><li>Motion reduction when the visitor requests reduced motion</li><li>Native, keyboard-operable mobile navigation, dialogs, and FAQ disclosure controls</li><li>Brand color use selected for readable text contrast</li><li>Alternative text for meaningful brand images; decorative effects are excluded from the accessibility tree</li></ul><h2>Need help or found a barrier?</h2><p>Please contact <a href="mailto:accessibility@readypackets.com?subject=Accessibility%20feedback">accessibility@readypackets.com</a> with the page URL, the task you were trying to complete, the assistive technology or browser used if you wish to share it, and a description of the issue. Do not include sensitive personal, portal, order, payment, or document information in e-mail.</p><h2>Portal accessibility</h2><p>The authenticated ReadyPackets portal is operated separately. If a portal feature creates a barrier, use the portal’s secure support path where possible or identify the portal location in your accessibility report.</p></div></section>
    `,
  },
  "terms/index.html": {
    canonicalPath: "terms/",
    title: "Terms of Use | ReadyPackets",
    description: "Read the ReadyPackets Terms of Use for this website and the separate customer portal.",
    body: `
      <section class="section section--soft"><div class="narrow"><p class="eyebrow">Terms of Use</p><h1>Terms for using the ReadyPackets website and portal.</h1><p class="lead">These Terms of Use describe the rules for accessing the ReadyPackets website and portal. Specific orders, statements of work, and written agreements may include additional terms that apply to the work you select.</p></div></section>
      <section class="section"><div class="narrow prose"><p class="notice"><strong>Effective date:</strong> October 17, 2026. These operational Terms of Use should be reviewed and approved by ReadyPackets’ qualified legal counsel before being relied on as final legal terms.</p><h2>1. Acceptance and scope</h2><p>By accessing or using the ReadyPackets website or portal, you agree to these Terms of Use. If you do not agree, do not use the website or portal. These terms apply to public website visitors and portal users. An order confirmation, statement of work, or other written agreement may control where it conflicts with these terms for the applicable engagement.</p><h2>2. Website and portal use</h2><p>You may use ReadyPackets only for lawful purposes and in accordance with these terms. You may not interfere with availability, probe or scan for vulnerabilities, bypass security controls, introduce malicious code, use automated collection that harms the service, impersonate another person, or access an account, order, file, message, or payment record without authorization.</p><h2>3. Accounts and information</h2><p>Keep account credentials and multi-factor authentication factors confidential. You are responsible for activity taken through your account unless you promptly report suspected unauthorized access. Provide accurate information and do not upload content you do not have the right to provide. Do not send sensitive portal, order, payment, identity, or proprietary information through ordinary email.</p><h2>4. Service scope and professional boundaries</h2><p>ReadyPackets provides structured architectural, strategic, and documentation support. It does not provide legal, tax, accounting, securities, investment, medical, insurance, or licensed engineering advice or certification. You are responsible for obtaining advice from appropriately qualified professionals for filings, regulated decisions, transactions, valuations, and final implementation decisions.</p><h2>5. Orders, availability, and payment</h2><p>Availability, scope, delivery timing, acceptance criteria, and payment terms are confirmed through the portal, order process, order confirmation, or applicable written agreement. A displayed description does not guarantee that a particular service, feature, timeline, or availability is offered in every engagement.</p><h2>6. Intellectual property</h2><p>ReadyPackets, its marks, website content, design, and materials are protected by applicable law. Except for the limited right to use the website and portal under these terms, no license or ownership interest is granted. Ownership and permitted use of engagement deliverables are governed by the applicable order or written agreement.</p><h2>7. Third-party services and links</h2><p>The website and portal may link to or rely on third-party services. Those services have their own terms and privacy practices. ReadyPackets is not responsible for third-party content, availability, or policies except as required by applicable law or an applicable written agreement.</p><h2>8. Disclaimers and limits</h2><p>The website is provided on an as-available basis. To the extent permitted by applicable law, ReadyPackets disclaims warranties not expressly stated in an applicable written agreement. Nothing in these terms limits liability that cannot lawfully be limited.</p><h2>9. Changes and contact</h2><p>ReadyPackets may update these Terms of Use. The version in effect when you use the service applies, subject to any written agreement that controls an engagement. Questions about these terms may be sent to <a href="mailto:compliance@readypackets.com?subject=ReadyPackets%20Terms%20of%20Use">compliance@readypackets.com</a>.</p></div></section>
    `,
  },
  "refunds/index.html": {
    canonicalPath: "refunds/",
    title: "Refund Policy | ReadyPackets",
    description: "Read the ReadyPackets Refund Policy, including cancellations, partial refunds, quality review, and refund requests.",
    body: `
      <section class="section section--soft"><div class="narrow"><p class="eyebrow">Refund Policy</p><h1>Clear refund and cancellation information.</h1><p class="lead">ReadyPackets aims to be fair and transparent in refund decisions. This policy explains cancellation, partial-refund, quality-review, and request procedures for applicable orders.</p></div></section>
      <section class="section"><div class="narrow prose"><p class="notice"><strong>Effective date:</strong> August 19, 2026. This policy is based on the ReadyPackets refund policy source provided for this release. It should be reviewed and approved by qualified counsel before reliance as final legal terms.</p><h2>1. Cancellation before work begins</h2><p>If you cancel an order before work has commenced, you are entitled to a full refund minus a 5% administrative processing fee. Submit cancellation requests in writing through <a href="mailto:cancellations@readypackets.com?subject=Refund%20Request">cancellations@readypackets.com</a> with an acknowledgement message or through the customer portal messaging system.</p><p>Work commences when a team member has been assigned and has begun research, drafting, or other substantive work on your packet.</p><h2>2. Cancellation after work begins</h2><p>If you cancel after work begins but before final delivery, the refund is based on completion stage recorded in ReadyPackets’ project-management records:</p><ul><li><strong>0–25% complete:</strong> 75% of the order total, processed within 48 hours of cancellation.</li><li><strong>26–50% complete:</strong> 50% of the order total, processed within 5 business days.</li><li><strong>51–75% complete:</strong> 25% of the order total, processed within 5 business days.</li><li><strong>76–100% complete:</strong> no refund; see the quality-review process below.</li></ul><p>The completion percentage will be communicated after the cancellation request.</p><h2>3. After delivery</h2><p>When a final deliverable is available for download in the portal or sent by email, the order is complete and no refund is issued for the completed deliverable. If you believe a deliverable materially fails to meet the agreed scope, use the quality-review process below.</p><h2>4. The All-In bundle</h2><p>For the All-In bundle, refunds are considered by phase: phases not started are eligible for a full refund, the phase in progress is considered under the completion-stage schedule above, and delivered phases are not refundable. If cancellation changes a six-packet bundle, applicable package terms are recalculated under the order terms in effect at the time of the order.</p><h2>5. Quality review</h2><p>If a delivered packet materially fails to meet the agreed scope in the order confirmation and intake documentation, you may request a no-cost revision to bring it in line with that scope. If the issue cannot be resolved through revision, ReadyPackets may issue a partial refund proportional to the deficient portion of the deliverable.</p><p>Submit quality claims within 14 days of delivery and include a detailed description of how the deliverable fails to meet the agreed scope. Subjective dissatisfaction, such as a preference about tone, is addressed through the included revision process rather than a refund.</p><h2>6. Non-refundable items</h2><ul><li>Consultation fees after the consultation has taken place.</li><li>Rush or expedited-delivery surcharges after expedited work begins.</li><li>Third-party costs incurred on your behalf, including filing fees, domain registrations, and software licenses.</li><li>Custom add-ons that have been fully delivered.</li></ul><h2>7. How to request a refund</h2><p>Use the customer portal messaging system or email <a href="mailto:cancellations@readypackets.com?subject=Refund%20Request">cancellations@readypackets.com</a> with the subject line <strong>Refund Request — [Order Number]</strong>. Include the order number, reason for the request, and supporting documentation. ReadyPackets will acknowledge the request within one business day and provide a decision within five business days.</p><h2>8. Refund processing and disputes</h2><p>Approved refunds are returned to the original payment method. Card refunds may take 5–10 business days to appear; bank transfers may take 3–10 business days. You will receive an email confirmation when a refund is processed.</p><p>If you disagree with a refund decision, email <a href="mailto:disputes@readypackets.com?subject=Refund%20Escalation">disputes@readypackets.com</a> with the subject line <strong>Refund Escalation</strong>. ReadyPackets will review the matter and respond within 10 business days. Unresolved disputes are subject to the applicable dispute-resolution provisions in the Terms of Use or controlling written agreement.</p><h2>9. Policy changes</h2><p>ReadyPackets may change this policy. The refund terms in effect when an order is placed govern that order unless a controlling written agreement states otherwise.</p><h2>10. Contact</h2><p>For general questions about this policy, contact <a href="mailto:compliance@readypackets.com?subject=ReadyPackets%20Refund%20Policy">compliance@readypackets.com</a>. Use the portal or cancellation address above for order-specific requests.</p></div></section>
    `,
  },
};

export const faqsForSchema = [
  ["What is ReadyPackets?", "ReadyPackets helps founders organize business information into clear, professionally prepared documentation, frameworks, and deliverables for the next strategic, operational, partner, or professional conversation."],
  ["Does ReadyPackets provide legal, tax, accounting, or investment advice?", "No. ReadyPackets is not a law firm, accounting firm, tax adviser, investment adviser, broker-dealer, or substitute for licensed professional advice."],
  ["Where are completed materials delivered?", "Completed materials are organized in the ReadyPackets portal so customers can access, review, and manage their work from their account."],
  ["What data is collected on the ReadyPackets website?", "The website uses essential storage for privacy and, when explicitly selected, appearance preferences. Optional Microsoft Clarity and PostHog analytics stay disabled until a visitor affirmatively selects Analytics."],
];
