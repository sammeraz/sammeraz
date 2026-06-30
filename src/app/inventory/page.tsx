import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { InventoryGrid } from "@/components/inventory/InventoryGrid";
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
      <PageHeader
        eyebrow="Inventory"
        title="Current Inventory"
        description="Available, incoming, and recently sourced Japanese vehicles. New public inventory will appear here only when real vehicle information is ready."
      />

      <section className="bg-cream py-24 md:py-28">
        <Container>
          <InventoryGrid vehicles={inventory} placeholderCount={6} />
        </Container>
      </section>

      <CTABanner
        title="Don't see what you're after?"
        description="Most vehicles we source never make it to a public listing — they're matched to a buyer during the search itself. Tell us what you're looking for."
      />
    </>
  );
}
