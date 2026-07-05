import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { values } from "@/data/site";

interface ValuesGridProps {
  heading?: string;
}

export function ValuesGrid({ heading = "What We Believe" }: ValuesGridProps) {
  return (
    <section className="bg-cream-deep pb-16 pt-12 md:pb-20">
      <Container>
        <Reveal className="flex items-center gap-5">
          <h2 className="font-display shrink-0 text-3xl text-ink md:text-4xl">{heading}</h2>
          <span className="h-1 flex-1 bg-accent" />
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <RevealItem
              key={value.title}
              className="group relative flex flex-col gap-3 overflow-hidden border border-ink/10 bg-white p-6 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-ink/25"
            >
              <span
                aria-hidden="true"
                className="font-display absolute -right-2 -top-5 text-7xl text-ink/[0.06] transition-colors duration-300 group-hover:text-accent/10"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative h-1 w-8 bg-accent" />
              <h3 className="font-display relative text-xl leading-none text-ink">
                {value.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-ink/60">{value.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
