import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { InventoryPreview } from "@/components/sections/InventoryPreview";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { CTABanner } from "@/components/sections/CTABanner";
import { HomeScrollSnap } from "@/components/motion/HomeScrollSnap";

export default function Home() {
  return (
    <>
      <HomeScrollSnap />
      {/* Hero grows to fill whatever space TrustStrip doesn't take, so the
          pair always cover the full viewport height between them — no vh
          arithmetic that has to be re-tuned per device, immune to Hero's
          own content reflowing taller/shorter at different widths. Mobile
          has no video to fill that height with, so forcing the full
          viewport there just left dead space below the content instead —
          md: only, so mobile sizes to its own content and desktop is
          unaffected.
          snap-hero: the one and only snap point on the site — scrolling
          down while this is still on screen commits one clean jump to
          whatever comes right after it (see HomeScrollSnap.tsx), so the
          video never ends up scrolled awkwardly half-past. Everything past
          it, in either direction, is plain unhijacked scrolling. */}
      <div className="snap-hero flex flex-col md:min-h-dvh">
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
