export function advertisingPlacementHtml(name) {
  const placementName = String(name);
  if (!/^[a-z0-9-]{3,64}$/.test(placementName)) throw new Error("Invalid advertising placement name");
  return `<aside class="ad-placement" data-ad-placement="${placementName}" aria-label="Advertisement" hidden><span class="ad-placement__label">Advertisement</span><div class="ad-placement__content" data-ad-content></div></aside>`;
}
