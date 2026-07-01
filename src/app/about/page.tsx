import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CTABanner } from "@/components/sections/CTABanner";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "AIM Imports is a Texas-based JDM importer focused on transparent sourcing, careful documentation, and clear communication.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built around the parts of importing that are easy to get wrong"
      />

      <section className="border-t border-ink/15 bg-cream py-24 md:py-32">
        <Container>
          <Reveal className="flex items-center gap-5">
            <h2 className="font-display shrink-0 text-3xl text-ink md:text-4xl">Our Approach</h2>
            <span className="h-1 flex-1 bg-accent" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display mt-6 max-w-3xl text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[1.15] text-ink">
              Buying a car you&apos;ve never seen, from a country you&apos;ve never been to, takes
              more trust than most transactions.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/65">
              We treat documentation and communication as the product, not an afterthought —
              reviewing every auction sheet line by line and staying in touch from sourcing
              through delivery, anywhere in the country.
            </p>
          </Reveal>
        </Container>
      </section>

      <ValuesGrid />
      <ProcessSteps />
      <CTABanner />
    </>
  );
}
