import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Financing",
  description: "Financing options for Japanese-market vehicle imports from AIM Imports.",
};

export default function FinancingPage() {
  return (
    <>
      <div className="snap-section">
        <PageHeader
          eyebrow="Financing"
          title="Financing Your Import"
          description="We're setting up a lending partnership built for imported vehicles. In the meantime, reach out and we'll help you figure out what's realistic."
        />
      </div>

      <section className="snap-section border-t border-ink/15 bg-cream py-24 md:py-32">
        <Container className="flex flex-col items-start gap-6">
          <Reveal className="flex w-full items-center gap-5">
            <h2 className="font-display shrink-0 text-3xl text-ink md:text-4xl">Coming Soon</h2>
            <span className="h-1 flex-1 bg-accent" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-base leading-relaxed text-ink/65">
              Imported vehicles don&apos;t always fit standard auto loans — specialty and
              collector-vehicle financing works differently. We&apos;re putting a lending
              partnership in place built around that, so buyers have a real option beyond paying
              cash. Details land here once it&apos;s official.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Button href="/contact" variant="outline-dark">
              Ask About Financing
            </Button>
          </Reveal>
        </Container>
      </section>

      <div className="snap-section">
        <CTABanner
          title="Financing questions before it's official?"
          description="Tell us what you're looking at and your rough budget — we'll let you know what's realistic in the meantime."
        />
      </div>
    </>
  );
}
