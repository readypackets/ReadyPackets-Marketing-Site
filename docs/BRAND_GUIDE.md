# ReadyPackets Approved Brand Asset Guide

**Version:** 2026.10.22
**Applies to:** ReadyPackets website, Portal, transactional email, PDFs, favicon, PWA assets, social metadata, and native mobile implementation
**Status:** Active source of truth

## Approved web asset family

Only the following supplied assets may appear in a ReadyPackets web release. They are a coordinated icon, wordmark, divider, and tagline composition; do not recreate, crop, recolor, or substitute portions of another logo.

| Surface | Approved light asset | Approved dark asset |
| --- | --- | --- |
| Compact icon | `readypackets-approved-header-icon-light.png` | `readypackets-approved-header-icon-dark.png` |
| Wordmark | `readypackets-approved-header-wordmark-light.png` | `readypackets-approved-header-wordmark-dark.png` |
| Divider | `readypackets-approved-header-rule-light.png` | `readypackets-approved-header-rule-dark.png` |
| Tagline | `readypackets-approved-header-tagline-light.png` | `readypackets-approved-header-tagline-dark.png` |

The `light` composition is for light backgrounds. The `dark` composition is for navy or other dark backgrounds. The icon, wordmark, divider, and tagline are rendered as one accessible visual group for full lockups. The compact icon may be used alone only where the full logo cannot fit, such as a favicon, installed web-app icon, compact navigation, or tightly constrained interface control.

## Derived app-icon assets

The following PNGs are deterministic, transparent resized derivatives of the approved **light** icon; they are not new artwork.

- `readypackets-approved-icon-light-192.png` — browser and Apple touch icon.
- `readypackets-approved-icon-light-512.png` — PWA manifest icon.
- `favicon.ico` — multi-resolution favicon rendered from the approved light icon.

Social and organization metadata use the supplied light approved icon. Do not point structured data or Open Graph metadata at an unapproved asset.

## Layout and accessibility rules

Keep every supplied image at its native aspect ratio with `object-fit: contain`; never stretch, rotate, mirror, skew, recolor, crop, or add a decorative replacement. The supplied light/dark assets must switch together. A full logo is conveyed to assistive technology with one meaningful accessible name; individual component images are decorative within that named group. When a containing link already has an accessible name, hide the composed component images from the accessibility tree to avoid repetition.

The brand colors remain Navy `#0D1B2A`, Teal `#20A090`, Teal Light `#2EC4B6`, Teal Dark `#1A7A6E`, Gold `#C9A84C`, Gray Dark `#4A5568`, and White `#FFFFFF`. Color must never be the sole way that an interface communicates meaning. Maintain WCAG 2.2 AA contrast for all text and interactive controls; the logo itself is an image, not a substitute for accessible text.

## Release checklist

1. Use only files in the approved family above in deployable public asset directories.
2. Delete superseded artwork from public/static bundles rather than leaving it reachable by a direct URL.
3. Rebuild the website/Portal and verify light and dark headers, Portal sign-in, dashboard navigation, email header, browser icon, installed PWA icon, footer, hero/logo presentation, Organization schema, and Open Graph image.
4. Confirm every logo image preserves its aspect ratio at desktop, mobile, 200% zoom, and 400% zoom.
5. Run the repository brand regression tests and verify the deploy/archive file lists contain only the approved family.
6. Treat brand changes as a reviewed release: document the asset source, update this guide, commit, push, and deploy the exact reviewed revision.

This guide governs source and deployable output. Repository history may retain prior versions for auditability, but superseded artwork must never be copied into an active website, Portal, email, PWA, metadata, or release archive.
