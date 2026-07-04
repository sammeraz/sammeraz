import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { MagazineGrid } from "@/components/store/MagazineGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { magazines } from "@/data/magazines";

export const metadata: Metadata = {
  title: "Store",
  description: "Resold JDM magazine back-issues from AIM Imports.",
};

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Store"
        title="JDM Magazine Back-Issues"
        description="Original Japanese car magazines, sourced alongside the vehicles — Option, Best Motoring, and more, while stock lasts."
      />

      <section className="border-t border-ink/15 bg-cream pb-24 pt-12 md:pb-28">
        <Container>
          <MagazineGrid magazines={magazines} placeholderCount={8} />
        </Container>
      </section>

      <CTABanner
        title="Looking for a specific issue?"
        description="We source magazines alongside every vehicle shipment. Tell us the title or era you're after and we'll keep an eye out."
      />
    </>
  );
}
