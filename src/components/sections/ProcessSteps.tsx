import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/data/site";

interface ProcessStepsProps {
  eyebrow?: string;
}

export function ProcessSteps({ eyebrow = "03 — How It Works" }: ProcessStepsProps) {
  return (
    <section className="bg-cream-deep/50 py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="font-display text-sm italic text-ink/50">{eyebrow}</span>
          <h2 className="font-display mt-2 text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1] text-ink">
            Auction to driveway
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 border-t border-ink/15">
          {processSteps.map((step, index) => (
            <RevealItem
              key={step.title}
              className="flex flex-col gap-2 border-b border-ink/15 py-7 md:flex-row md:items-center md:gap-10"
            >
              <span className="font-display w-14 shrink-0 text-lg italic text-accent">
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
