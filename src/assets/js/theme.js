/* ReadyPackets marketing-site color theme preference. Loaded before CSS to minimize theme flash. */
(() => {
  "use strict";

  const THEME_KEY = "rp_marketing_theme_v1";
  const THEMES = new Set(["system", "light", "dark"]);
  const THEME_COLORS = { light: "#F7FAFB", dark: "#0D1B2A" };

  function normalizeTheme(value) {
    return THEMES.has(value) ? value : "system";
  }

  function readPreference() {
    try {
      return normalizeTheme(localStorage.getItem(THEME_KEY));
    } catch {
      return "system";
    }
  }

  function resolvedTheme(preference) {
    if (preference !== "system") return preference;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyPreference(value) {
    const preference = normalizeTheme(value);
    document.documentElement.dataset.theme = preference;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[resolvedTheme(preference)]);
    return preference;
  }

  function setPreference(value) {
    const preference = normalizeTheme(value);
    try {
      if (preference === "system") localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, preference);
    } catch {
      // Preference persistence is optional; the active-page selection still applies.
    }
    return applyPreference(preference);
  }

  function configureThemeControl() {
    const select = document.querySelector("[data-theme-select]");
    if (!select) return;
    select.value = readPreference();
    select.addEventListener("change", () => {
      select.value = setPreference(select.value);
    });
  }

  applyPreference(readPreference());

  const systemTheme = window.matchMedia?.("(prefers-color-scheme: dark)");
  systemTheme?.addEventListener?.("change", () => {
    if (readPreference() === "system") applyPreference("system");
  });

  window.READYPACKETS_MARKETING_THEME = Object.freeze({
    getPreference: readPreference,
    setPreference,
    applyPreference,
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", configureThemeControl, { once: true });
  else configureThemeControl();
})();
