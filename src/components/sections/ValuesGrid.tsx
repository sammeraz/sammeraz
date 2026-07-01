import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { values } from "@/data/site";

interface ValuesGridProps {
  eyebrow?: string;
}

export function ValuesGrid({ eyebrow = "005 / What We Believe" }: ValuesGridProps) {
  return (
    <section className="bg-cream py-24 md:py-28">
      <Container>
        <Reveal className="max-w-xl">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </span>
          <h2 className="font-display mt-2 text-[clamp(2.5rem,5.5vw,3.75rem)] leading-[0.95] text-ink">
            The Standard, Every Time
          </h2>
          <p className="font-body mt-4 text-sm leading-relaxed text-ink/60">
            None of this is exotic — it&apos;s just easy to skip when a car is thousands of miles
            away. We don&apos;t skip it.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden border-2 border-ink bg-ink sm:grid-cols-2">
          {values.map((value, index) => (
            <RevealItem key={value.title} className="flex flex-col gap-3 bg-cream p-7">
              <span className="font-mono text-xs font-bold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl leading-none text-ink">{value.title}</h3>
              <p className="font-body text-sm leading-relaxed text-ink/60">{value.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
