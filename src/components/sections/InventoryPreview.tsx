import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { VehicleCarousel } from "@/components/inventory/VehicleCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { inventory } from "@/data/inventory";

export function InventoryPreview() {
  // Sold cars aren't for sale — the homepage teaser should only ever
  // surface something a visitor could actually buy or is on its way in.
  const vehicles = inventory.filter((vehicle) => vehicle.status !== "sold").slice(0, 8);

  return (
    <section className="bg-cream pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        <Reveal className="reveal-instant-mobile flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <h2 className="font-display shrink-0 text-3xl text-ink md:text-4xl">
              Featured Inventory
            </h2>
            <span className="h-1 flex-1 bg-accent" />
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-ink/60">
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
