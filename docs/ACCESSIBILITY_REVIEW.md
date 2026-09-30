# Accessibility Review Checklist

## Target

The static marketing site is engineered against **WCAG 2.2 AA**. It is an implementation and QA target, not a legal certification. Test the final hosted site because hosting/CDN changes, embedded analytics, content edits, browser variation, and assistive technologies can affect accessibility.

## Source controls

- Semantic landmarks: header, navigation, main, footer
- One visible page H1; hierarchical H2/H3 sections
- Skip-to-main link, visible keyboard focus, and native controls
- Button-based mobile navigation with synchronized `aria-expanded`
- Native `details`/`summary` FAQ disclosures
- Native dialog for privacy preferences with labeled controls
- Responsive layout, browser zoom support, and reduced-motion CSS
- Brand colors used according to the supplied contrast guidance
- Informative logo alternative text; decorative content excluded from semantic meaning
- No auto-playing audio/video, time limit, drag-only interaction, or hover-only content

## Manual launch checks

| Test | Expected result |
| --- | --- |
| Keyboard only | All links, buttons, dialog controls, and FAQ disclosures are reachable and operable. |
| Skip link | First Tab reveals “Skip to main content”; activation moves focus to main. |
| Mobile menu | Menu button state and open/close behavior are announced and usable. |
| Zoom / reflow | At 200% and 400%, no essential content is lost and no two-dimensional scrolling is required at normal mobile width. |
| Focus | Focus has a visible high-contrast outline everywhere. |
| Screen reader | Page title, landmark, heading order, links, controls, and status of consent controls are understandable. |
| Motion | Operating-system reduced-motion preference removes smooth scroll/transition effects. |
| Contrast | Validate final color combinations, including any host-injected banners or modified content. |
| Automated scan | Run current axe, WAVE, and/or Lighthouse accessibility checks on each deployed page; investigate every finding. |
| Real-world test | Include keyboard and assistive-technology users in acceptance testing where possible. |

## Feedback process

The public accessibility statement directs visitors to `accessibility@readypackets.com`. Establish an internal process to acknowledge, triage, remediate, and record reported barriers without requesting sensitive portal information by ordinary e-mail.
