import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal } from "@/components/motion/Reveal";

export function AboutTeaser() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <Reveal delay={0.1} className="order-2 flex flex-col items-start gap-6 md:order-1">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            004 / Why AIM Imports
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,3.75rem)] leading-[0.95] text-ink">
            The Full Story On The Car, Not Just The Photos
          </h2>
          <p className="font-body max-w-md text-base leading-relaxed text-ink/65">
            Importing from Japan rewards patience and good information. We handle the sourcing,
            verification, and paperwork so you can make a confident decision on a vehicle you may
            never see in person before it arrives.
          </p>
          <Button href="/about" variant="outline-dark">
            More About Us
          </Button>
        </Reveal>

        <Reveal y={36} className="relative order-1 aspect-[4/5] w-full overflow-hidden border-2 border-ink md:order-2">
          <PlaceholderArt variant="panel" label="AIM Imports" />
          <div className="font-mono absolute bottom-0 right-0 flex flex-col items-end bg-ink px-4 py-3 text-cream">
            <span className="text-3xl font-bold leading-none text-accent-soft">25</span>
            <span className="text-[10px] uppercase tracking-[0.14em]">Year Import Rule</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
