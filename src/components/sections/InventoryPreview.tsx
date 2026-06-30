import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { InventoryGrid } from "@/components/inventory/InventoryGrid";
import { inventory } from "@/data/inventory";

export function InventoryPreview() {
  const vehicles = inventory.slice(0, 3);

  return (
    <section className="bg-cream py-24 md:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Current Inventory"
          title="Available, incoming, and recently sourced"
          description="New public inventory will appear here only when real vehicle information is ready — no filler listings, no stand-in prices."
        />

        <InventoryGrid vehicles={vehicles} />

        <div className="flex justify-center">
          <Button href="/inventory" variant="outline-dark">
            View Inventory
          </Button>
        </div>
      </Container>
    </section>
  );
}
