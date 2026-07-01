import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { processSteps } from "@/data/site";

export function ProcessSteps() {
  return (
    <section className="bg-ink py-24 text-cream md:py-32">
      <Container>
        <SectionHeading
          tone="cream"
          eyebrow="How It Works"
          title="From Japanese auction to your driveway"
          description="Importing a vehicle from Japan involves more steps than buying domestically. Here's how we move a car through each one."
        />

        <RevealGroup className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <RevealItem key={step.title} className="flex flex-col gap-4 border-t border-cream/15 pt-6">
              <span className="font-serif text-3xl text-accent-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-medium">{step.title}</h3>
              <p className="text-sm leading-relaxed text-cream/65">{step.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
