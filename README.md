# Vorker Brand Guide — Slide Deck (static site)

A self-contained HTML slide deck. It's already a working static website — there is **no build step**. To put it online, a developer just needs to serve this folder over HTTP(S) on any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, S3, `npx serve`, etc.).

## Entry point
- **`Vorker Deck.html`** — open/serve this. It's the whole 34-slide deck.
- For most static hosts, **rename `Vorker Deck.html` → `index.html`** so it loads at the site root. (Keep every other file/name exactly as-is — paths are relative and case-sensitive.)

## Quick local check
```bash
cd vorker_deck_handoff
npx serve .          # or: python3 -m http.server 8000
# then open http://localhost:8000/Vorker%20Deck.html  (or index.html if renamed)
```
Must be served over **http(s)**, not opened as a `file://` path — slides `fetch()` SVGs and one slide embeds another page in an `<iframe>`, both of which the browser blocks on `file://`.

## How it works (so you don't "fix" it)
- The deck is a Web Component, **`deck-stage.js`**, with one `<section>` per slide inside `<deck-stage>`. It handles scaling-to-fit, keyboard nav (← →), a thumbnail rail, and print-to-PDF (one slide per page).
- Each slide is a small **React component written in JSX**, transpiled **in the browser** by Babel Standalone. React, ReactDOM, Babel, and Google Fonts are loaded from CDNs at runtime, so **hosting requires public internet access** for viewers. No bundler, no npm install.
- Design size is **1920×1080**; deck-stage letterboxes it to any viewport.

### Optional (production polish, not required)
In-browser Babel works fine but adds a second or two to first paint. If you want it snappier you can pre-compile the `.jsx` files to plain JS (e.g. `esbuild *.jsx`) and swap the `<script type="text/babel" src="…jsx">` tags for compiled `<script src="…js">`. Purely optional.

## Files
- `Vorker Deck.html` — deck entry (the `<deck-stage>` + slide mounts).
- `Vorker Deck-print.html` — same deck wired for clean **PDF export** (auto-opens the print dialog; swaps the one live-embedded slide for a static image so it doesn't print blank). Use this if you need a PDF.
- `deck-stage.js` — the slide-runner web component (vanilla JS, no deps).
- Slide modules (JSX, one section of the deck each): `cover.jsx`, `meet-vorker.jsx`, `expressions.jsx`, `integrations.jsx`, `stage-note.jsx`, `brand-imagery.jsx`, `style-options.jsx`, `prompts.jsx`, `iteration.jsx`, `stylefamily.jsx`, `cartoon.jsx`, `animation.jsx`, `sample-site.jsx`, `wordmarks.jsx`.
- Embedded homepage mockup (shown on the "Sample Website" slide via an `<iframe>`): `render-home.html` + `homepage.css` + `hp-shared.jsx` + `hp-directions.jsx`.
- `assets/` — all images, SVG wordmarks, and the homepage capture (`site_hero.png`). Everything referenced is in here.

## One thing to know about the "Sample Website" slide
That slide embeds the live homepage mockup (`render-home.html`) in an `<iframe>` for crisp on-screen rendering. It works great in a browser. It will **not** appear in screenshot-based exports (some PPTX tools); the `Vorker Deck-print.html` variant already handles PDF by substituting `assets/site_hero.png` for that slide.
