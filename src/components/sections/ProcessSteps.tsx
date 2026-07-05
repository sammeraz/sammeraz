import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/data/site";

interface ProcessStepsProps {
  heading?: string;
  /** Tighter padding for when this follows another already-padded content
   * section (e.g. on About) instead of a full-bleed hero/carousel, where the
   * two sections' padding would otherwise stack into a much bigger gap than
   * the rest of the page uses. */
  tightTop?: boolean;
}

export function ProcessSteps({ heading = "How It Works", tightTop = false }: ProcessStepsProps) {
  return (
    <section className={`bg-cream-deep ${tightTop ? "pb-16 pt-12 md:pb-20" : "pb-24 pt-24 md:pb-32 md:pt-32"}`}>
      <Container>
        <Reveal className="flex items-center gap-5">
          <h2 className="font-display shrink-0 text-3xl text-ink md:text-4xl">{heading}</h2>
          <span className="h-1 flex-1 bg-accent" />
        </Reveal>

        <RevealGroup className="mt-14 border-t border-ink/15">
          {processSteps.map((step, index) => (
            <RevealItem
              key={step.title}
              className="flex flex-col gap-2 border-b border-ink/15 py-7 md:flex-row md:items-center md:gap-10"
            >
              <span className="font-display w-14 shrink-0 text-lg text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display shrink-0 text-2xl leading-none text-ink md:w-64">
                {step.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-ink/60">{step.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
