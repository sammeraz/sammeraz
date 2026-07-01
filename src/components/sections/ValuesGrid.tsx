import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { values } from "@/data/site";

interface ValuesGridProps {
  eyebrow?: string;
}

export function ValuesGrid({ eyebrow = "05 — What We Believe" }: ValuesGridProps) {
  return (
    <section className="bg-cream-deep/50 py-24 md:py-28">
      <Container>
        <Reveal className="max-w-xl">
          <span className="font-display text-sm italic text-ink/50">{eyebrow}</span>
          <h2 className="font-display mt-2 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] text-ink">
            The standard, every time
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">
            None of it is exotic — it&apos;s just easy to skip when a car is thousands of miles
            away. We don&apos;t skip it.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {values.map((value, index) => (
            <RevealItem key={value.title} className="flex flex-col gap-2 border-t border-ink/15 pt-5">
              <span className="font-display text-sm italic text-accent">
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
