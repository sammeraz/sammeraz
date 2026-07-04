import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { InventoryBrowser } from "@/components/inventory/InventoryBrowser";
import { CTABanner } from "@/components/sections/CTABanner";
import { inventory } from "@/data/inventory";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Available, incoming, and recently sourced Japanese-market vehicles from AIM Imports.",
};

export default function InventoryPage() {
  return (
    <>
      <div className="snap-section">
        <PageHeader
          eyebrow="Inventory"
          title="Current Inventory"
          description="Available, incoming, and recently sourced Japanese vehicles. New public inventory will appear here only when real vehicle information is ready."
        />
      </div>

      {/* snap-scrollable: grows with the catalog, so it's routinely taller
          than the viewport — marks it for ScrollSnap to let it scroll
          natively instead of jumping straight past whatever doesn't fit on
          the first screen. */}
      <section className="snap-section snap-scrollable border-t border-ink/15 bg-cream pb-24 pt-12 md:pb-28">
        <Container>
          <InventoryBrowser vehicles={inventory} placeholderCount={6} />
        </Container>
      </section>

      <div className="snap-section">
        <CTABanner
          title="Don't see what you're after?"
          description="Most vehicles we source never make it to a public listing — they're matched to a buyer during the search itself. Tell us what you're looking for."
        />
      </div>
    </>
  );
}
