# AIM Imports

Marketing site for AIM Imports, a Texas-based JDM vehicle importer. Built with Next.js (App
Router), TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/                 Routes: / (home), /inventory, /about, /contact, /api/contact
  components/
    ui/                Generic primitives: Button, Container, SectionHeading, PlaceholderArt, icons
    layout/             Header, Footer, Logo, PageHeader (dark band used on inner pages)
    sections/           Page sections composed from ui/: Hero, ProcessSteps, CTABanner, etc.
    inventory/          VehicleCard, ComingSoonCard, InventoryGrid
    contact/            InquiryForm (client component, posts to /api/contact)
    motion/             Cursor, Preloader, PageTransition, Reveal/RevealGroup/RevealItem — see below
  data/
    site.ts             Nav links, company blurb, process steps, values — edit copy here
    inventory.ts        Vehicle listings — currently empty, see below
  hooks/
    useIsFinePointer.ts       Mouse/trackpad vs touch, gates cursor + magnetic effects
    useSafeReducedMotion.ts   Hydration-safe wrapper around motion's useReducedMotion — see below
  lib/
    types.ts             Vehicle type definition
```

## Adding real vehicles

The inventory grid (on the homepage and `/inventory`) reads from `src/data/inventory.ts`. It's
empty on purpose — the UI shows an honest "coming soon" state instead of placeholder cars. To
list a real vehicle, add an entry to the `inventory` array:

```ts
{
  slug: "1999-nissan-skyline-gtr-v-spec",
  make: "Nissan",
  model: "Skyline GT-R",
  year: 1999,
  trim: "V-Spec (BNR34)",
  price: 124500,
  status: "available", // "available" | "incoming" | "sold"
  mileage: 42000,
  highlights: ["Auction grade 4.5", "One owner", "Unmodified"],
  images: ["/inventory/bnr34-v-spec-1.jpg"], // drop files in /public/inventory
}
```

Once `images` is set, the real photo replaces the placeholder art automatically — no other
changes needed. Leave `images` off and a vehicle still displays fine with placeholder art.

## Brand assets

- **Logo** — `public/brand/aim-imports-mark.png` is the real logo, pre-processed to remove its
  black backing so it drops cleanly onto dark surfaces. It **only works on dark backgrounds**
  (the wordmark inside it is white with no dark variant) — that's fine today since Header and
  Footer are both on `bg-ink`, but don't reuse this file on a light section without a light-safe
  export from the source logo. Rendered via `src/components/layout/Logo.tsx`.
- **Favicon / app icon** — `src/app/icon.png` and `src/app/apple-icon.png` (Next.js file
  convention, no code needed) use the solid square version of the same logo.
- **Accent red** (`--color-accent` in `globals.css`) is sampled from the logo.

## Things to swap in before launch

- **Contact form delivery** — `src/app/api/contact/route.ts` currently validates and logs
  inquiries server-side only. Wire it up to a real email service (Resend, SendGrid, etc.) or CRM
  before relying on it in production.
- **Photography** — every image slot (hero, inventory cards, About page) falls back to the
  branded placeholder (`PlaceholderArt`) until real photos are supplied.

## Design system

Color, font, and spacing tokens live in `src/app/globals.css` under the Tailwind v4 `@theme`
block (`--color-ink`, `--color-cream`, `--color-accent`, etc.), so palette changes happen in one
place. Headings use Fraunces (serif); descriptive/explanatory paragraph copy uses Space Grotesk
(`font-body`); nav, buttons, footer, and other UI chrome stay on Inter. All three load via
`next/font` in `src/app/layout.tsx`.

### Diagonal section dividers

`components/ui/DiagonalEdge.tsx` gives a section's top edge a diagonal cut instead of a flat
line — the site's visual signature, used at every major color transition (Hero→TrustStrip,
PageHeader→content, etc.) and on inventory card corners. It only works correctly on the *later*
element in DOM order: clip-path removes pixels rather than painting over them, and since later
elements already paint on top of earlier ones, only the later section needs the cut — the section
above it must stay a plain, uncut rectangle for the seam to read cleanly. See the component's own
comment before reordering sections that use it.

## Motion & interaction

Built with [motion](https://motion.dev) (the Framer Motion successor). Everything respects
`prefers-reduced-motion` and touch/coarse-pointer devices automatically:

- **Cursor** (`components/motion/Cursor.tsx`) — custom dot + diamond reticle, only on
  fine-pointer (mouse) devices. The diamond squares up and camera-focus corner brackets fan out
  on hover over `a`, `button`, and `[data-cursor]`; add `data-cursor-text="Label"` to any element
  for a contextual label. Hides itself over form fields so the native text caret stays visible.
- **Preloader** (`components/motion/Preloader.tsx`) — spinning-logo intro, plays once per tab
  session (module-level flag, not state — the root layout persists across client-side nav, so it
  naturally never replays on internal links, only on a hard reload or fresh tab).
- **PageTransition** (`components/motion/PageTransition.tsx`) — fades `{children}` between
  routes in the root layout; Header/Footer are outside it so they don't re-animate.
- **Reveal / RevealGroup + RevealItem** (`components/motion/Reveal.tsx`) — scroll-triggered
  fade-up. `Reveal` for single blocks, `RevealGroup` wrapping `RevealItem` children for a
  staggered grid/list. Don't nest a `Reveal` around a `RevealGroup` (or vice versa) — each
  triggers its own `whileInView` independently, so nesting causes two animations to fire slightly
  out of sync. Use one `RevealGroup` with everything as `RevealItem` siblings instead.
- **Magnetic buttons** — built into `Button.tsx` itself (not a separate wrapper), so every button
  site-wide gets the cursor-follow pull and sliding arrow for free. Pass `arrow={false}` to omit
  the arrow.

**Hydration gotcha:** motion's `useReducedMotion()` reads `matchMedia` synchronously on the
client's first render, which can differ from what the server rendered (always unaware of the
user's OS preference) and trigger a React hydration error — this happened during development and
is why `hooks/useSafeReducedMotion.ts` exists. Use that hook, not motion's directly, anywhere the
reduced-motion value affects the rendered tree (not just an animation's `transition` config).

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build (also type-checks)
npm run lint     # ESLint
```
