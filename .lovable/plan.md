## AFS Legal — Premium Editorial Law Firm Site

A modern, restrained reinterpretation of the attached `afslegal_v2.html` template. Institutional, minimal, team-driven. Black + gold, no gradients, no startup tropes.

### Stack note
Project runs on the Lovable modern stack (TanStack Start + Tailwind v4 + shadcn + Framer Motion), not Next.js. Functionally equivalent — file-based routing, SSR, strong SEO. Calling this out so there are no surprises.

### Routes
- `/` — Single long-scroll Home with anchored sections (Hero, Philosophy, Practice Areas preview, Team preview, Coordination Process, Contact CTA)
- `/practice-areas` — Full practice area grid + detail
- `/team` — Advocate roster with monogram placeholders
- `/contact` — Form + Trichy office details + map placeholder
- `/careers` — Open roles + application intake
- `/disclaimer` — Bar Council compliant entry modal + standalone page
- `/privacy` — Privacy policy

Each route gets its own `head()` (title, description, og:title/description, canonical, og:url). Single H1 per page. JSON-LD `LegalService` + `Organization` on `/`.

### Design system (`src/styles.css` `@theme`)
```text
--color-black:      #070707
--color-black-soft: #0f0f0f
--color-black-card: #131313
--color-gold:       #C9972B
--color-gold-light: #F0B429
--color-gold-pale:  #e8c97a
--color-white-soft: #f5f0e8
--color-border:     rgba(201,151,43,0.22)
--font-display:     "Cinzel"           (h1, brand mark, section eyebrows)
--font-serif:       "Cormorant Garamond" (h2–h4, pull quotes, body lead)
--font-sans:        "Inter"            (UI, nav, buttons, captions, forms)
```
Fonts loaded via `<link>` in `__root.tsx` head (per Tailwind v4 rules). shadcn tokens remapped to the dark palette.

### Visual language
- Generous whitespace: section padding `py-32` desktop / `py-20` mobile, max content width `max-w-6xl`
- Thin 1px gold hairline dividers, never boxed cards with heavy borders
- Numbered section eyebrows in Cinzel small-caps ("01 — Philosophy")
- Hover: gold underline expands left→right (300ms ease-out), image subtle 1.02 scale + brightness, link letter-spacing tightens
- Motion (Framer Motion): fade + 16px rise on scroll-in (one-shot, `viewport={{ once: true }}`), staggered children. No parallax, no looping animations.
- Imagery: abstract architectural placeholders (pillars, archways, ledger textures) generated via imagegen — no stock people, no AI-people, no gradients

### Components to build
- `Disclaimer` modal (Bar Council entry gate, session-stored consent)
- `Nav` (sticky, transparent → solid on scroll, gold underline active state, mobile drawer)
- `Hero` (Cinzel mark, Cormorant tagline, gold hairline, single CTA)
- `SectionEyebrow`, `GoldDivider`, `EditorialHeading`
- `PracticeCard` (numbered, hover-reveals description)
- `AdvocateCard` (monogram initials in gold-bordered square + name + role + specializations)
- `ProcessTimeline` (numbered vertical steps)
- `ContactForm` (shadcn Form + Zod; submits to a server function placeholder)
- `Footer` (3 columns + disclaimer line)

### Accessibility & performance
- Semantic landmarks (`<main>`, `<nav>`, `<footer>`), one H1 per route, skip-to-content link
- All icon-only buttons get `aria-label`, focus-visible gold ring
- Tap targets ≥44px, `h-dvh` not `h-screen`
- Color contrast verified against AA on black background (gold #C9972B on #070707 = 7.8:1)
- Images lazy-loaded with width/height, `prefers-reduced-motion` disables Framer transitions

### Out of scope (v1)
- Insights/blog (deferred per your selection)
- Real team photos & bios (placeholders until you supply)
- CMS, auth, Lovable Cloud — purely static marketing site
- Live form backend (form posts to a stub server function returning success)

### Deliverable
Production-ready site, mobile-first, lighthouse-friendly, ready for content swap.