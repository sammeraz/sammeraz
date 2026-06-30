import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { InventoryPreview } from "@/components/sections/InventoryPreview";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { CTABanner } from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <InventoryPreview />
      <ProcessSteps />
      <AboutTeaser />
      <CTABanner />
    </>
  );
}
