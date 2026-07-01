import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/data/site";

interface ProcessStepsProps {
  eyebrow?: string;
}

export function ProcessSteps({ eyebrow = "003 / How It Works" }: ProcessStepsProps) {
  return (
    <section className="bg-ink py-24 text-cream md:py-32">
      <Container>
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-soft">
            {eyebrow}
          </span>
          <h2 className="font-display mt-2 text-[clamp(2.5rem,6vw,4rem)] leading-[0.95]">
            Auction To Driveway
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 border-t-2 border-cream/20">
          {processSteps.map((step, index) => (
            <RevealItem
              key={step.title}
              className="flex flex-col gap-2 border-b-2 border-cream/20 py-7 md:flex-row md:items-center md:gap-10"
            >
              <span className="font-mono w-14 shrink-0 text-sm font-bold text-accent-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display shrink-0 text-2xl leading-none md:w-64">{step.title}</h3>
              <p className="font-body max-w-xl text-sm leading-relaxed text-cream/60">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
