import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative flex h-[92vh] min-h-[620px] items-end overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0">
        <PlaceholderArt variant="hero" />
      </div>

      <Container className="relative z-10 pb-24 pt-32">
        <div className="animate-fade-up max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent-soft">
            AIM Imports &middot; Texas, USA
          </span>
          <h1 className="mt-5 font-serif text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.05]">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/75 md:text-lg">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/inventory" variant="light">
              View Inventory
            </Button>
            <Button href="/contact" variant="outline-light">
              {site.inquiryCta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
