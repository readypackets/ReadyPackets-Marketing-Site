/* ReadyPackets marketing-site color theme preference. Loaded before CSS to minimize theme flash. */
(() => {
  "use strict";

  const THEME_KEY = "rp_marketing_theme_v1";
  const THEME_SEQUENCE = ["system", "light", "dark"];
  const THEMES = new Set(THEME_SEQUENCE);
  const THEME_COLORS = { light: "#F7FAFB", dark: "#0D1B2A" };
  const THEME_LABELS = { system: "System", light: "Light", dark: "Dark" };

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

  function nextPreference(value) {
    return THEME_SEQUENCE[(THEME_SEQUENCE.indexOf(normalizeTheme(value)) + 1) % THEME_SEQUENCE.length];
  }

  function updateThemeControl(button, preference) {
    const next = nextPreference(preference);
    const message = `Color theme: ${THEME_LABELS[preference]}. Activate to switch to ${THEME_LABELS[next]}.`;
    button.dataset.themeState = preference;
    button.setAttribute("aria-label", message);
    button.setAttribute("title", message);
    const label = button.querySelector("[data-theme-label]");
    if (label) label.textContent = `Color theme: ${THEME_LABELS[preference]}`;
  }

  function configureThemeControl() {
    const button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    updateThemeControl(button, readPreference());
    button.addEventListener("click", () => {
      const preference = setPreference(nextPreference(readPreference()));
      updateThemeControl(button, preference);
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
