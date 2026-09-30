# ReadyPackets Document-Flow Brand Guide

**Version:** 2026.09.30
**Applies to:** ReadyPackets web, email, print, proposals, social, mobile, favicon, and app-icon use
**Status:** Production asset guide pending formal activation

---

## 1. Brand idea

The ReadyPackets Document-Flow mark represents a practical promise:

> **Your business information becomes a clear, prepared, ready-to-use packet.**

The symbol contains three input documents, one disciplined process line, and a visibly layered final packet. It is intentionally a left-to-right, asymmetric composition. It does **not** use four-arm, radial, pinwheel, cross-like, religious, national, tribal, heraldic, or rotational geometry.

## 2. Logo anatomy

| Element | Description | Meaning |
| --- | --- | --- |
| Input documents | Three translucent, separately outlined teal pages with small abstract content rules/dots | Distinct source materials, expertise, and business information |
| Process line | One uninterrupted teal horizontal line | A controlled, clear ReadyPackets workflow |
| Final packet | A navy (light mode) or white (dark mode) front document with two visible backing sheets | A prepared stack of finished deliverables |
| Gold quality point | Small gold dot on the front document | Care, review, and completion |
| Two-tone name | `Ready` in Navy/White and `Packets` in Deep Teal/Teal Light | Stable readiness plus active delivery |
| Gold rule and slogan | Secondary hierarchy beneath the name | Premium finish and the legacy business promise |

The short marks inside the source documents are decorative document-content cues. They are **not** microcopy and must not be replaced by illegible lorem ipsum, handwritten marks, or invented labels.

## 3. Approved colors

| Token | Hex | Primary use |
| --- | --- | --- |
| Navy | `#0D1B2A` | Light-mode `Ready`, final packet face, document-content rules, dark surface |
| Navy Raised | `#12263A` | Light final-packet backing sheet |
| Navy Elevated | `#17304A` | Light final-packet rear backing sheet |
| Teal | `#20A090` | Light process line, page outlines, supporting shape |
| Teal Dark | `#1A7A6E` | Light-mode `Packets` text |
| Teal Light | `#2EC4B6` | Dark process line, page outlines, `Packets` text on dark |
| Gold | `#C9A84C` | Divider, quality point, and dark-mode slogan |
| Gold Dark | `#A98C36` | Reserved supporting accent only |
| Gray Dark | `#4A5568` | Light-mode slogan and supporting copy |
| White | `#FFFFFF` | Dark-mode `Ready`, dark final packet, and open space |

## 4. Light and dark modes

### Light mode

Use `readypackets-document-flow-light.svg` on white or very light neutral backgrounds.

- `Ready`: Navy
- `Packets`: Teal Dark
- Slogan: Gray Dark
- Divider / quality dot: Gold
- Final packet front: Navy

### Dark mode

Use `readypackets-document-flow-dark.svg` on Navy or similarly dark photographic/solid backgrounds.

- `Ready`: White
- `Packets`: Teal Light
- Slogan: Gold
- Divider / quality dot: Gold
- Final packet front: White with Navy content lines

Do not place the light lockup on dark backgrounds or the dark lockup on light backgrounds.

## 5. Accessibility

| Pair | Contrast ratio | Role |
| --- | ---: | --- |
| Navy on White | 17.39:1 | Light-mode primary name and document rules |
| Teal Dark on White | 5.18:1 | Light-mode `Packets` text |
| Gray Dark on White | 7.53:1 | Light-mode slogan |
| White on Navy | 17.39:1 | Dark-mode `Ready` text |
| Teal Light on Navy | 8.02:1 | Dark-mode `Packets` text |
| Gold on Navy | 7.61:1 | Dark-mode slogan and divider |

Gold on white is **not** sufficiently contrastive for small text (2.29:1). In light mode it remains a decorative rule/dot, never the sole carrier of information.

## 6. Clear space and minimum size

| Configuration | Minimum digital width | Clear-space rule |
| --- | ---: | --- |
| Full lockup with slogan | 650 px | Keep at least one gold-dot diameter around all sides |
| Wordmark-only lockup | 320 px | Keep at least one gold-dot diameter around all sides |
| Compact mark | 32 px for UI; 16 px only for favicon fallback | Keep 12.5% of mark width clear on every side |

At narrow widths, switch from the full lockup to the supplied wordmark-only lockup, then to the compact mark. Do not shrink the tagline below legibility.

## 7. Do and do not

### Do

- Use the supplied SVG whenever possible.
- Use transparent PNGs only where SVG is unsupported.
- Preserve proportions, colors, hierarchy, and element order.
- Use a dark lockup for dark surfaces and a light lockup for light surfaces.
- Use the compact mark only where the full name cannot fit.

### Do not

- Rotate, mirror, skew, stretch, crop, shadow, outline, or recolor the mark.
- Remove the visible backing sheets from the final packet.
- Replace source-document content cues with text or scribbles.
- Rebuild the mark with generic folders, arrows, clip-art, or four-part geometric forms.
- Place the slogan in Gold on white.
- Use the full lockup at a size where the slogan becomes unreadable.

## 8. Trademark usage

The package includes default presentation lockups and separate `-tm.svg` legal-mark variants. Use trademark-mark variants only according to the company’s legal/marketing policy. This package is not a trademark clearance, legal opinion, or guarantee of registrability.

## 9. Activation checklist

Before replacing existing customer-facing assets:

1. Obtain brand-owner approval for the final direction.
2. Complete trademark availability/usage review with qualified counsel.
3. Replace website, PWA, email, document, social, and mobile references in one versioned release.
4. Validate light/dark contrast and small-size rendering in the actual product UI.
5. Update the brand source of truth and retain prior artwork only as historical archive.
