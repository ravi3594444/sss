# Karnataka Cafe Patna

A five-page, responsive restaurant website for the Karnataka Cafe outlet in Saguna, Patna.

## Pages

- `/` — animated homepage, signature dishes, gallery and guest stories
- `/menu` — searchable, filterable menu with interactive dish previews
- `/story` — brand story, daily kitchen timeline and restaurant values
- `/gallery` — filterable photo gallery with keyboard-friendly lightbox
- `/visit` — reservation form, contact details, opening hours and Google Map

## Experience

- Responsive navigation and five consistent page layouts
- Premium scroll reveals, subtle image parallax, animated marquee and refined hover motion
- Pointer-aware hero depth on desktop with reduced-motion and touch-safe fallbacks
- WhatsApp ordering and reservation flows
- Embedded Google Map for the Saguna outlet
- Accessible labels, keyboard controls and reduced-motion support
- Purposeful food and restaurant photography

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

Built with Next.js 16 (App Router). All five routes prerender as static HTML
(`next build` reports every route as `○ Static`), so this deploys anywhere
that serves a standard Next.js app — Vercel zero-config (framework
auto-detected, `npm run build` is the build command), or any other Next.js
host.
