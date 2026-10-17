/* ReadyPackets static website behavior. No framework or portal runtime. */
(() => {
  "use strict";

  const CONFIG = window.READYPACKETS_WEBSITE_CONFIG || {};
  const CONSENT_KEY = "rp_website_consent_v2";
  const LEGACY_CONSENT_KEY = "rp_website_consent_v1";
  const CONSENT_VERSION = 2;
  const analyticsLoaded = { clarity: false, posthog: false };
  let posthogConfigured = false;
  let adsenseLoadPromise = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function safeConfig(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function readConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed?.version !== CONSENT_VERSION || typeof parsed.analytics !== "boolean" || typeof parsed.advertising !== "boolean") return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function clearLegacyConsent() {
    try {
      localStorage.removeItem(LEGACY_CONSENT_KEY);
      document.cookie = `${LEGACY_CONSENT_KEY}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
    } catch {
      // Privacy preferences are optional browser storage; a storage failure leaves the site usable.
    }
  }

  function writeConsent({ analytics, advertising }) {
    const consent = {
      version: CONSENT_VERSION,
      essential: true,
      analytics: Boolean(analytics),
      advertising: Boolean(advertising),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    document.cookie = `${CONSENT_KEY}=${encodeURIComponent(JSON.stringify({ version: CONSENT_VERSION, analytics: consent.analytics, advertising: consent.advertising }))}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`;
    clearLegacyConsent();
    return consent;
  }

  function setBannerVisible(visible) {
    const banner = $("#cookie-banner");
    if (banner) banner.hidden = !visible;
  }

  function cleanPath() {
    return window.location.pathname || "/";
  }

  function loadClarity(projectId) {
    if (analyticsLoaded.clarity || !/^[a-zA-Z0-9_-]{4,100}$/.test(projectId)) return;
    analyticsLoaded.clarity = true;
    const queue = window.clarity || ((...args) => { queue.q = queue.q || []; queue.q.push(args); });
    window.clarity = queue;
    window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
    const script = document.createElement("script");
    script.id = "rp-clarity";
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
    script.referrerPolicy = "strict-origin-when-cross-origin";
    document.head.append(script);
  }

  function loadPostHog(projectKey, host) {
    if (analyticsLoaded.posthog || !projectKey || !/^https:\/\/[a-z0-9.-]+\.posthog\.com$/i.test(host)) return;
    analyticsLoaded.posthog = true;
    const script = document.createElement("script");
    script.id = "rp-posthog";
    script.async = true;
    script.src = `${host}/static/array.js`;
    script.referrerPolicy = "strict-origin-when-cross-origin";
    script.onload = () => {
      if (!window.posthog || posthogConfigured) return;
      window.posthog.init(projectKey, {
        api_host: host,
        autocapture: false,
        capture_pageview: false,
        disable_session_recording: true,
        person_profiles: "never",
        opt_out_capturing_by_default: true,
        opt_out_capturing_persistence_type: "local_storage",
      });
      posthogConfigured = true;
      window.posthog.opt_in_capturing();
      window.posthog.capture("readypackets_website_page_viewed", { path: cleanPath(), surface: "website" });
    };
    document.head.append(script);
  }

  function applyAnalytics(consent) {
    const analytics = CONFIG.analytics || {};
    if (!consent?.analytics) {
      window.clarity?.("consent", false);
      window.posthog?.opt_out_capturing?.();
      return;
    }
    loadClarity(safeConfig(analytics.clarityProjectId));
    loadPostHog(safeConfig(analytics.posthogProjectKey), safeConfig(analytics.posthogHost));
  }

  function validAdSensePublisher(value) {
    return /^ca-pub-\d{16}$/.test(value);
  }

  function validAdSlot(value) {
    return /^\d{8,20}$/.test(value);
  }

  function safeHttpsUrl(value) {
    try {
      const url = new URL(safeConfig(value));
      return url.protocol === "https:" ? url : null;
    } catch {
      return null;
    }
  }

  function clearAdvertisingPlacements() {
    $$('[data-ad-placement]').forEach((placement) => {
      const content = $('[data-ad-content]', placement);
      content?.replaceChildren();
      placement.hidden = true;
    });
  }

  function deactivateAdSense() {
    $("#rp-adsense")?.remove();
    adsenseLoadPromise = null;
  }

  function createSponsorPlacement(placement, sponsor) {
    const href = safeHttpsUrl(sponsor?.href);
    const label = safeConfig(sponsor?.label);
    const description = safeConfig(sponsor?.description);
    if (!href || !label || !description) return false;

    const content = $('[data-ad-content]', placement);
    if (!content) return false;
    const link = document.createElement("a");
    link.className = "ad-placement__sponsor";
    link.href = href.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer sponsored";
    const heading = document.createElement("strong");
    heading.textContent = label;
    const copy = document.createElement("span");
    copy.textContent = description;
    const external = document.createElement("span");
    external.className = "ad-placement__external";
    external.setAttribute("aria-hidden", "true");
    external.textContent = "↗";
    link.append(heading, copy, external);
    content.replaceChildren(link);
    placement.hidden = false;
    return true;
  }

  function loadAdSense(publisherId) {
    if (adsenseLoadPromise) return adsenseLoadPromise;
    adsenseLoadPromise = new Promise((resolve) => {
      const existing = $("#rp-adsense");
      if (existing?.dataset.loaded === "true") {
        resolve(true);
        return;
      }
      const script = existing || document.createElement("script");
      script.id = "rp-adsense";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.referrerPolicy = "strict-origin-when-cross-origin";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(publisherId)}`;
      script.addEventListener("load", () => {
        script.dataset.loaded = "true";
        resolve(true);
      }, { once: true });
      script.addEventListener("error", () => resolve(false), { once: true });
      if (!existing) document.head.append(script);
    });
    return adsenseLoadPromise;
  }

  function createAdSensePlacement(placement, publisherId, slotId) {
    const content = $('[data-ad-content]', placement);
    if (!content || content.children.length) return;
    const ad = document.createElement("ins");
    ad.className = "adsbygoogle";
    ad.dataset.adClient = publisherId;
    ad.dataset.adSlot = slotId;
    ad.dataset.adFormat = "auto";
    ad.dataset.fullWidthResponsive = "true";
    content.replaceChildren(ad);
    placement.hidden = false;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // An advertising-provider failure must not alter website content or navigation.
    }
  }

  function applyAdvertising(consent) {
    clearAdvertisingPlacements();
    if (!consent?.advertising) {
      deactivateAdSense();
      return;
    }
    const advertising = CONFIG.advertising || {};
    const publisherId = safeConfig(advertising.adsensePublisherId);
    const slots = advertising.adSlots && typeof advertising.adSlots === "object" ? advertising.adSlots : {};
    const sponsors = advertising.sponsors && typeof advertising.sponsors === "object" ? advertising.sponsors : {};
    const pendingAds = [];

    $$('[data-ad-placement]').forEach((placement) => {
      const name = safeConfig(placement.dataset.adPlacement);
      if (!name) return;
      if (createSponsorPlacement(placement, sponsors[name])) return;
      const slotId = safeConfig(slots[name]);
      if (validAdSensePublisher(publisherId) && validAdSlot(slotId)) pendingAds.push({ placement, slotId });
    });

    if (!pendingAds.length) return;
    loadAdSense(publisherId).then((loaded) => {
      if (!loaded || !readConsent()?.advertising) return;
      pendingAds.forEach(({ placement, slotId }) => createAdSensePlacement(placement, publisherId, slotId));
    });
  }

  function configureMobileNavigation() {
    const toggle = $("[data-menu-toggle]");
    const nav = $("#site-navigation");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
    $$("a", nav).forEach((link) => link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }));
  }

  function applyOptionalPreferences(consent) {
    applyAnalytics(consent);
    applyAdvertising(consent);
  }

  function configureConsent() {
    const dialog = $("#cookie-preferences");
    const existing = readConsent();
    const analyticsPreference = $("#analytics-preference");
    const advertisingPreference = $("#advertising-preference");
    if (analyticsPreference) analyticsPreference.checked = existing?.analytics === true;
    if (advertisingPreference) advertisingPreference.checked = existing?.advertising === true;
    setBannerVisible(!existing);
    applyOptionalPreferences(existing);

    $("[data-consent-accept]")?.addEventListener("click", () => {
      applyOptionalPreferences(writeConsent({ analytics: true, advertising: true }));
      setBannerVisible(false);
    });
    $("[data-consent-essential]")?.addEventListener("click", () => {
      applyOptionalPreferences(writeConsent({ analytics: false, advertising: false }));
      setBannerVisible(false);
    });
    $$('[data-consent-open]').forEach((button) => button.addEventListener("click", () => {
      const saved = readConsent();
      if (analyticsPreference) analyticsPreference.checked = saved?.analytics === true;
      if (advertisingPreference) advertisingPreference.checked = saved?.advertising === true;
      if (typeof dialog?.showModal === "function") dialog.showModal();
      else dialog?.setAttribute("open", "");
      $("#analytics-preference")?.focus();
    }));
    $("[data-consent-close]")?.addEventListener("click", () => dialog?.close?.());
    $("#cookie-preferences form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const consent = writeConsent({
        analytics: Boolean(analyticsPreference?.checked),
        advertising: Boolean(advertisingPreference?.checked),
      });
      applyOptionalPreferences(consent);
      setBannerVisible(false);
      dialog?.close?.();
    });
  }

  function markExternalPortalLinks() {
    const portalOrigins = [safeConfig(CONFIG.portalUrl), safeConfig(CONFIG.alternatePortalUrl)].filter(Boolean);
    $$('a[data-portal-link]').forEach((link) => {
      try {
        const target = new URL(link.href, window.location.href);
        if (portalOrigins.includes(target.origin)) link.setAttribute("rel", "noopener noreferrer");
      } catch {
        // Invalid links are ignored; no user-controlled value is injected.
      }
    });
  }

  function configurePacketExplorers() {
    $$('[data-packet-card]').forEach((card) => {
      const disclosure = $('details', card);
      if (!disclosure) return;
      const syncDisclosureState = () => card.classList.toggle("is-open", disclosure.open);
      disclosure.addEventListener("toggle", syncDisclosureState);
      syncDisclosureState();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    configureMobileNavigation();
    configureConsent();
    markExternalPortalLinks();
    configurePacketExplorers();
  });
})();
