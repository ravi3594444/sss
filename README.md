# Karnataka Cafe — Patna Franchise Website

A modern, fully animated, static website for the **Karnataka Cafe Patna** franchise.
Designed in the style of [karnatakacafe.in](https://karnatakacafe.in) but focused on the
**menu** (instead of franchise offers), in **English**, for the Patna outlet.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, marquee, about, menu preview, why-choose-us, gallery, testimonials, visit/contact, CTA |
| Menu | `menu.html` | Full menu with 8 categories & prices, tabbed navigation, deep-linkable anchors |

## Features

- Scroll-reveal animations, animated counters, hero parallax & marquee (custom `IntersectionObserver`, no heavy libraries)
- Fully responsive (mobile hamburger nav)
- Green & gold South Indian branding matching the original Karnataka Cafe
- Sticky navbar with active-section highlighting
- WhatsApp ordering links throughout
- SEO meta tags + semantic HTML

## Structure

```
├── index.html
├── menu.html
├── css/style.css        # shared styles + theme
├── js/main.js           # animations, nav, tabs, counters
├── images/              # food photography
├── vercel.json          # Vercel deployment config
└── .vercel/config.json  # legacy Vercel config
```

## Run locally

```bash
# any static server, e.g.
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel, **Import Project** from the repo.
3. Framework Preset: **Other** (it's a static site).
4. Root Directory: `/` (default). Build command: none. Output: `/`.
5. Deploy — Vercel reads `vercel.json` automatically.

No build step required; the site is served as static HTML/CSS/JS with asset caching headers.
