import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { VehicleCarousel } from "@/components/inventory/VehicleCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { inventory } from "@/data/inventory";

export function InventoryPreview() {
  const vehicles = inventory.slice(0, 8);

  return (
    <section className="bg-cream pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-display text-sm italic text-ink/50">02 — Inventory</span>
            <h2 className="font-display mt-2 text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1] text-ink">
              What&apos;s moving through the yard
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink/60">
            New listings appear here only once real vehicle information is ready — no filler, no
            stand-in prices.
          </p>
        </Reveal>
      </Container>

      <div className="mt-14">
        <VehicleCarousel vehicles={vehicles} placeholderCount={6} />
      </div>

      <Container className="mt-10 flex justify-start">
        <Button href="/inventory" variant="outline-dark">
          View Full Inventory
        </Button>
      </Container>
    </section>
  );
}
