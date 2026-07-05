import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { values } from "@/data/site";

interface ValuesGridProps {
  heading?: string;
}

export function ValuesGrid({ heading = "What We Believe" }: ValuesGridProps) {
  return (
    <section className="bg-cream-deep pb-24 pt-12 md:pb-28">
      <Container>
        <Reveal className="flex items-center gap-5">
          <h2 className="font-display shrink-0 text-3xl text-ink md:text-4xl">{heading}</h2>
          <span className="h-1 flex-1 bg-accent" />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {values.map((value, index) => (
            <RevealItem key={value.title} className="flex flex-col gap-2 border-t border-ink/15 pt-5">
              <span className="font-display text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl leading-none text-ink">{value.title}</h3>
              <p className="text-sm leading-relaxed text-ink/60">{value.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
