import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

interface CTABannerProps {
  title?: string;
  description?: string;
}

export function CTABanner({
  title = "Looking for a specific JDM vehicle?",
  description = "Tell us the make, model, and spec you're after. We'll let you know what's realistic to source and roughly what it costs, landed in Texas.",
}: CTABannerProps) {
  return (
    <section className="bg-accent py-20 text-cream">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.95]">
              {title}
            </h2>
            <p className="font-body mt-3 max-w-md text-sm leading-relaxed text-cream/85">
              {description}
            </p>
          </div>
          <Button href="/contact" variant="light" className="shrink-0">
            Start an Inquiry
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
