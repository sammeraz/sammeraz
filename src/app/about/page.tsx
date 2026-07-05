import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
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
      <PageHeader eyebrow="About" title="We handle the details most importers get wrong." />

      <section className="border-t border-ink/15 bg-cream pb-16 pt-12 md:pb-20">
        <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="order-2 md:order-1">
            <p className="font-display max-w-lg text-[clamp(1.4rem,2.8vw,2rem)] leading-[1.18] text-ink">
              Buying a car you&apos;ve never seen, from a country you&apos;ve never been to,
              takes more trust than most transactions.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">
              That&apos;s why documentation and communication come first here, not as an
              afterthought.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="border border-ink/15 px-3 py-1.5 text-xs uppercase tracking-[0.06em] text-ink/60"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            y={36}
            className="relative order-1 aspect-[4/5] w-full overflow-hidden md:order-2"
          >
            <PlaceholderArt variant="panel" label="AIM Imports" />
            <div className="absolute bottom-0 right-0 flex flex-col items-end bg-ink px-4 py-3 text-cream">
              <span className="font-display text-3xl leading-none text-accent-soft">25</span>
              <span className="text-[10px] uppercase tracking-[0.14em]">Year Import Rule</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <ValuesGrid />
      <ProcessSteps tightTop />
      <CTABanner tightTop />
    </>
  );
}
