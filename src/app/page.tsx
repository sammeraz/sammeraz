import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { InventoryPreview } from "@/components/sections/InventoryPreview";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { CTABanner } from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      {/* Hero grows to fill whatever space TrustStrip doesn't take, so the
          pair always cover the full viewport height between them — no vh
          arithmetic that has to be re-tuned per device, immune to Hero's
          own content reflowing taller/shorter at different widths. */}
      <div className="flex min-h-dvh flex-col">
        <Hero />
        <TrustStrip />
      </div>
      <InventoryPreview />
      <ProcessSteps />
      <AboutTeaser />
      <CTABanner />
    </>
  );
}
