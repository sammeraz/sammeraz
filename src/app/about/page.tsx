import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CTABanner } from "@/components/sections/CTABanner";
import { Reveal } from "@/components/motion/Reveal";
import { DiagonalEdge } from "@/components/ui/DiagonalEdge";

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

      <DiagonalEdge size={48} direction="rising" className="bg-cream pb-24 pt-12 md:pb-28">
        <Container className="flex flex-col items-center gap-8 text-center">
          <Reveal>
            <p className="max-w-2xl font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] text-ink">
              Buying a car you&apos;ve never seen, from a country you&apos;ve never been to, takes
              more trust than most transactions. We treat documentation and communication as the
              product, not an afterthought.
            </p>
          </Reveal>
          <Reveal
            delay={0.12}
            className="font-body max-w-2xl space-y-5 text-left text-base leading-relaxed text-ink/65"
          >
            <p>
              Most of what&apos;s frustrating about importing a JDM vehicle isn&apos;t the car —
              it&apos;s the uncertainty. Auction sheets are written in Japanese shorthand. Photos
              hide as much as they show. And once a vehicle is on a boat, communication often
              goes quiet until it shows up.
            </p>
            <p>
              AIM Imports exists to close that gap. We review condition reports line by line, ask
              the questions you&apos;d ask if you could be at the auction yourself, and stay in
              touch through sourcing, shipping, customs, and compliance — so the only thing
              waiting for you at delivery is the car.
            </p>
            <p>
              We&apos;re based in Texas and work with buyers across the country who are ready to
              navigate state registration and emissions requirements for an imported vehicle.
            </p>
          </Reveal>
        </Container>
      </DiagonalEdge>

      <ValuesGrid />
      <ProcessSteps />
      <CTABanner />
    </>
  );
}
