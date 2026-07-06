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
    "AIM Imports is a Leander, Texas-based JDM importer focused on transparent sourcing, careful documentation, and clear communication.",
};

const highlights = [
  "Auction Sheets Reviewed Line-by-Line",
  "25-Year Import Eligibility Checked",
  "Nationwide Delivery",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We handle the details most importers get wrong."
        description="Transparent sourcing, careful documentation, and clear communication — from auction sheet to the day your car arrives."
      />

      <section className="border-t border-ink/15 bg-cream pb-16 pt-12 dark:border-cream/15 dark:bg-ink md:pb-20">
        <Container>
          <Reveal className="reveal-instant">
            <p className="font-display max-w-2xl text-[clamp(1.4rem,2.8vw,2rem)] leading-[1.18] text-ink dark:text-cream">
              Buying a car you&apos;ve never seen, from a country you&apos;ve never been to,
              takes more trust than most transactions.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60 dark:text-cream/60">
              That&apos;s why documentation and communication come first here, not as an
              afterthought.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="border border-ink/15 px-3 py-1.5 text-xs uppercase tracking-[0.06em] text-ink/60 dark:border-cream/15 dark:text-cream/60"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <ValuesGrid />
      <ProcessSteps tightTop />
      <CTABanner tightTop />
    </>
  );
}
