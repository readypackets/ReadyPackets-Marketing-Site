/* ReadyPackets static marketing site behavior. No framework or portal runtime. */
(() => {
  "use strict";

  const CONFIG = window.READYPACKETS_MARKETING_CONFIG || {};
  const CONSENT_KEY = "rp_marketing_consent_v1";
  const CONSENT_VERSION = 1;
  const analyticsLoaded = { clarity: false, posthog: false };
  let posthogConfigured = false;

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
      if (parsed?.version !== CONSENT_VERSION || typeof parsed.analytics !== "boolean") return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function writeConsent(analytics) {
    const consent = { version: CONSENT_VERSION, essential: true, analytics: Boolean(analytics), updatedAt: new Date().toISOString() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    document.cookie = `${CONSENT_KEY}=${encodeURIComponent(JSON.stringify({ version: CONSENT_VERSION, analytics: consent.analytics }))}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`;
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
      window.posthog.capture("readypackets_marketing_page_viewed", { path: cleanPath(), surface: "marketing" });
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

  function configureConsent() {
    const banner = $("#cookie-banner");
    const dialog = $("#cookie-preferences");
    const existing = readConsent();
    const analyticsPreference = $("#analytics-preference");
    if (analyticsPreference) analyticsPreference.checked = existing?.analytics === true;
    setBannerVisible(!existing);
    applyAnalytics(existing);

    $("[data-consent-accept]")?.addEventListener("click", () => {
      applyAnalytics(writeConsent(true));
      setBannerVisible(false);
    });
    $("[data-consent-essential]")?.addEventListener("click", () => {
      applyAnalytics(writeConsent(false));
      setBannerVisible(false);
    });
    $$('[data-consent-open]').forEach((button) => button.addEventListener("click", () => {
      if (analyticsPreference) analyticsPreference.checked = readConsent()?.analytics === true;
      if (typeof dialog?.showModal === "function") dialog.showModal();
      else dialog?.setAttribute("open", "");
      $("#analytics-preference")?.focus();
    }));
    $("[data-consent-close]")?.addEventListener("click", () => dialog?.close?.());
    $("#cookie-preferences form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const enabled = Boolean($("#analytics-preference")?.checked);
      applyAnalytics(writeConsent(enabled));
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
      } catch { /* Invalid links are ignored; no user-controlled value is injected. */ }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    configureMobileNavigation();
    configureConsent();
    markExternalPortalLinks();
  });
})();
