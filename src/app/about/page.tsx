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

      <section className="border-t-2 border-ink bg-cream py-24 md:py-32">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              01 / Our Approach
            </span>
            <p className="font-display mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] text-ink">
              Buying a car you&apos;ve never seen, from a country you&apos;ve never been to, takes
              more trust than most transactions.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-10 border-t-2 border-ink pt-10 sm:grid-cols-3">
            {approach.map((point, index) => (
              <RevealItem key={point.title} className="flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl leading-none text-ink">{point.title}</h3>
                <p className="font-body text-sm leading-relaxed text-ink/60">{point.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <ValuesGrid eyebrow="02 / What We Believe" />
      <ProcessSteps eyebrow="03 / How It Works" />
      <CTABanner />
    </>
  );
}
