# dsyrros.me

Personal site of Dimitris Syrros, Senior Front-end Engineer. Live at **[dsyrros.me](https://dsyrros.me)**.

A single, dark-only page built with [Astro](https://astro.build): static HTML, self-hosted fonts, responsive AVIF/WebP images and a few small component scripts — no framework runtime. It scores 100 across Lighthouse Performance, Accessibility, Best Practices and SEO, and targets WCAG 2.2 AA.

## Editing content

All copy lives in [`src/data/profile.json`](src/data/profile.json): SEO meta, profile, experience, skills, education and section labels. Components only render from it, so content changes never touch code.

- Dates are `YYYY-MM`; `"end": null` means present.
- Experience entries with `"hidden": true` stay in the file but are not rendered.
- Company logos are SVGs in `public/logos/`; timeline props are PNGs in `src/assets/props/`, registered in `src/lib/props.ts`.

## Project structure

```text
src/
├── components/   Header, Hero, TrustedBy, Timeline, Contact, Footer
├── data/         profile.json (single source of truth)
├── layouts/      Layout.astro: head, SEO, Open Graph, JSON-LD
├── lib/          date formatting, logo and prop metadata
├── assets/       images optimised at build time
└── styles/       global.css (tokens, fonts, base styles)
public/           fonts, logos, og.jpg, robots.txt
mockups/          design explorations the site was built from
```

## Commands

Requires Node 22.12 or newer.

| Command           | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Start the dev server at `localhost:4321`  |
| `npm run build`   | Build the static site to `dist/`          |
| `npm run preview` | Serve the production build locally        |
| `npm run check`   | Type-check components with `astro check`  |

## Standards

Design, accessibility and SEO rules for working on the site are in [`AGENTS.md`](AGENTS.md).
