import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal } from "@/components/motion/Reveal";

export function AboutTeaser() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <Reveal delay={0.1} className="order-2 flex flex-col items-start gap-6 md:order-1">
          <span className="font-display text-sm italic text-ink/50">04 — Why AIM Imports</span>
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] text-ink">
            The full story on the car, not just the photos
          </h2>
          <p className="max-w-md text-base leading-relaxed text-ink/65">
            Importing from Japan rewards patience and good information. We handle sourcing,
            verification, and paperwork so you can decide with confidence on a car you may never
            see in person before it arrives.
          </p>
          <Button href="/about" variant="outline-dark">
            More About Us
          </Button>
        </Reveal>

        <Reveal
          y={36}
          className="relative order-1 aspect-[4/5] w-full overflow-hidden md:order-2"
        >
          <PlaceholderArt variant="panel" label="AIM Imports" />
          <div className="absolute bottom-0 right-0 flex flex-col items-end bg-ink px-4 py-3 text-cream">
            <span className="font-display text-3xl italic leading-none text-accent-soft">25</span>
            <span className="text-[10px] uppercase tracking-[0.14em]">Year Import Rule</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
