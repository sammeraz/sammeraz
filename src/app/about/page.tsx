import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CTABanner } from "@/components/sections/CTABanner";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "AIM Imports is a Texas-based JDM importer focused on transparent sourcing, careful documentation, and clear communication.",
};

const approach = [
  {
    title: "The Uncertainty Problem",
    description:
      "Auction sheets are written in Japanese shorthand. Photos hide as much as they show. Once a vehicle's on a boat, communication often goes quiet until it shows up.",
  },
  {
    title: "How We Close The Gap",
    description:
      "We review condition reports line by line, ask the questions you'd ask if you were at the auction yourself, and stay in touch through sourcing, shipping, customs, and compliance.",
  },
  {
    title: "Texas-Based, Nationwide",
    description:
      "We work with buyers across the country who are ready to navigate state registration and emissions requirements for an imported vehicle.",
  },
];

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

          <RevealGroup className="mt-14 grid gap-10 border-t border-ink/15 pt-10 sm:grid-cols-3">
            {approach.map((point, index) => (
              <RevealItem key={point.title} className="flex flex-col gap-2">
                <span className="font-display text-sm text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl leading-none text-ink">{point.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{point.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <ValuesGrid />
      <ProcessSteps />
      <CTABanner />
    </>
  );
}
