## Project standards (apply to everything we build)

This is a **single-page website**. Every component, style, and content change must be **mobile-first, responsive, highly accessible (WCAG 2.2 AA minimum), and SEO-optimized**.

### Content source
- All site content (SEO meta, profile, summary, skills, experience, education) lives in `src/data/profile.json` — it is the single source of truth.
- Never hardcode content in components; import the JSON (`import profile from '../data/profile.json'`) and render from it, so edits only ever touch that file.
- Dates are stored as `YYYY-MM` (`end: null` = present) and formatted in components; order arrays the way they should appear on the page.
- Components must handle optional fields (`description`, `note`, `thesis`) being absent and lists of any length.
- Optional `logo` (`{ onDark, onLight }`, full-colour SVGs under `public/logos/`) and `client` (`{ name, logo }`) on experience entries; render both as `<img>` with the company name as `alt`, showing the variant that matches the active theme.
- `spotlight` on experience entries is the short, recruiter-facing version shown in the timeline (full `highlights` stay as the CV source). Render spotlights as plain text: no bold, no colour blocks, normal sentence case (no uppercase).
- Entries with `"hidden": true` stay in the JSON but are not rendered anywhere on the page (timeline, "Trusted by", JSON-LD).

### Mobile-first & responsive
- Write base styles for small screens (~320px); layer larger layouts with `min-width` media queries only.
- Use fluid units (`rem`, `%`, `clamp()`, `min()/max()`) and flexbox/grid; no fixed-width containers, no horizontal scroll at any width from 320px up.
- Touch targets at least 44×44px; keep body text ≥ 1rem and line length ~45–75ch.
- Use Astro's `<Image>`/`<Picture>` from `astro:assets` with explicit `width`/`height`, `alt`, responsive `sizes`, and `loading="lazy"` below the fold (eager + `fetchpriority="high"` for the hero/LCP image).
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.

### Accessibility
- Semantic HTML first: one `<h1>`, logical heading order, landmarks (`<header>`, `<nav>`, `<main id="main">`, `<footer>`), each page section a `<section>` with an `aria-labelledby` heading.
- Include a "Skip to main content" link as the first focusable element.
- Native elements over ARIA (`<button>`, `<a href>`, `<details>`); add ARIA only when no native option exists.
- Visible `:focus-visible` styles on every interactive element; never `outline: none` without a replacement.
- Color contrast ≥ 4.5:1 for text, ≥ 3:1 for large text and UI components; never convey meaning by color alone.
- All images get meaningful `alt` (or `alt=""` if decorative); icon-only buttons/links need an accessible name.
- Forms: every input has a `<label>`; errors are announced and tied with `aria-describedby`.
- Fully keyboard operable (mobile nav toggle uses `aria-expanded`/`aria-controls`, closes on Escape, no focus traps).
- `<html lang="…">` set; anchor-nav sections use `scroll-margin-top` so a sticky header doesn't cover them.

### SEO
- Unique, descriptive `<title>` (~50–60 chars) and `<meta name="description">` (~150–160 chars), set via Layout props.
- `<link rel="canonical">`, `site` set in `astro.config.mjs`, plus `robots.txt` and a sitemap.
- Open Graph and Twitter Card meta tags with a 1200×630 share image.
- JSON-LD structured data (e.g. `Organization`/`Person`/`LocalBusiness`, `WebSite`) where it fits the content.
- Descriptive link text (no "click here"); in-page anchors use readable ids (`#about`, `#contact`).
- Performance is SEO: ship zero JS by default (Astro islands only when needed), self-host/preload fonts with `font-display: swap`, avoid layout shift (targets: LCP < 2.5s, CLS < 0.1, INP < 200ms).

### Before calling work done
- Check at 320px, 768px, and 1280px+ widths.
- Keyboard-only pass (Tab/Shift+Tab/Enter/Escape) and verify the heading outline.
- Run `astro build` and, where possible, a Lighthouse/axe audit, aiming for 95+ on Accessibility, SEO, Best Practices, and Performance.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
