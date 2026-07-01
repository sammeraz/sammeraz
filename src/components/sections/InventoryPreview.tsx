import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { VehicleCarousel } from "@/components/inventory/VehicleCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { inventory } from "@/data/inventory";

export function InventoryPreview() {
  const vehicles = inventory.slice(0, 8);

  return (
    <section className="bg-cream py-24 md:py-32">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              002 / Inventory
            </span>
            <h2 className="font-display mt-2 text-[clamp(2.5rem,6vw,4rem)] leading-[0.95] text-ink">
              What&apos;s Moving
              <br />
              Through the Yard
            </h2>
          </div>
          <p className="font-body max-w-xs text-sm leading-relaxed text-ink/60">
            New public inventory appears here only when real vehicle information is ready — no
            filler listings, no stand-in prices.
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
