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
  data/
    site.ts             Nav links, company blurb, process steps, values — edit copy here
    inventory.ts        Vehicle listings — currently empty, see below
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

## Things to swap in before launch

- **Logo** — `src/components/layout/Logo.tsx` currently renders a text wordmark. Replace it with
  an `<Image>` once artwork exists; the header/footer layout won't need to change.
- **Favicon** — `src/app/icon.tsx` is a generated "A" monogram placeholder.
- **Contact email** — `src/data/site.ts` (`site.email`).
- **Contact form delivery** — `src/app/api/contact/route.ts` currently validates and logs
  inquiries server-side only. Wire it up to a real email service (Resend, SendGrid, etc.) or CRM
  before relying on it in production.
- **Photography** — every image slot (hero, inventory cards, About page) falls back to the
  branded placeholder (`PlaceholderArt`) until real photos are supplied.

## Design system

Color, font, and spacing tokens live in `src/app/globals.css` under the Tailwind v4 `@theme`
block (`--color-ink`, `--color-cream`, `--color-accent`, etc.), so palette changes happen in one
place. Headings use Fraunces (serif), body/UI text uses Inter — both loaded via `next/font` in
`src/app/layout.tsx`.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build (also type-checks)
npm run lint     # ESLint
```
