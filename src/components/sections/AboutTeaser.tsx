import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal } from "@/components/motion/Reveal";

export function AboutTeaser() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <Reveal y={36} className="aspect-[4/5] w-full overflow-hidden rounded-sm">
          <PlaceholderArt variant="panel" label="AIM Imports" />
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col items-start gap-6">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Why AIM Imports
          </span>
          <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] text-ink">
            Built for buyers who want the full story on a car, not just the photos.
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
      </Container>
    </section>
  );
}
