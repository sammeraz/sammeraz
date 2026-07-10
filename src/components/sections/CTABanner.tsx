import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

interface CTABannerProps {
  title?: string;
  description?: string;
  /** Tighter top padding for when this follows another already-padded
   * content section (e.g. on About) instead of a full-bleed hero/carousel,
   * where the two sections' padding would otherwise stack into a much
   * bigger gap than the rest of the page uses. */
  tightTop?: boolean;
}

export function CTABanner({
  title = "Looking for a specific JDM vehicle?",
  description = "Tell us the make, model, and spec you're after. We'll let you know what's realistic to source and roughly what it costs, delivered anywhere in the U.S.",
  tightTop = false,
}: CTABannerProps) {
  return (
    <section className={`border-t-4 border-accent bg-ink pb-20 text-cream ${tightTop ? "pt-12" : "pt-20"}`}>
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.05]">
              {title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">{description}</p>
          </div>
          <Button href="/contact" variant="light" className="shrink-0">
            Start an Inquiry
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
