import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { DiagonalEdge } from "@/components/ui/DiagonalEdge";

interface CTABannerProps {
  title?: string;
  description?: string;
}

export function CTABanner({
  title = "Looking for a specific JDM vehicle?",
  description = "Tell us the make, model, and spec you're after. We'll let you know what's realistic to source and roughly what it costs, landed in Texas.",
}: CTABannerProps) {
  return (
    <DiagonalEdge size={40} direction="falling" className="bg-ink-soft pb-20 pt-10 text-cream">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-xl font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.15]">
            {title}
          </h2>
          <p className="font-body max-w-md text-sm leading-relaxed text-cream/65">{description}</p>
          <Button href="/contact" variant="light" className="mt-2">
            Start an Inquiry
          </Button>
        </Reveal>
      </Container>
    </DiagonalEdge>
  );
}
