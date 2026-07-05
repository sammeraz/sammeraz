import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { CTABanner } from "@/components/sections/CTABanner";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { MagazineBuyBox } from "@/components/store/MagazineBuyBox";
import { magazines } from "@/data/magazines";
import type { Magazine } from "@/lib/types";

const conditionLabel: Record<Magazine["condition"], string> = {
  new: "New",
  "like-new": "Like New",
  good: "Good",
  fair: "Fair",
};

const MAGAZINE_PLACEHOLDER_SLIDES = ["Front Cover", "Back Cover", "Contents Page", "Feature Spread"];

function getMagazine(slug: string) {
  return magazines.find((magazine) => magazine.slug === slug);
}

export function generateStaticParams() {
  return magazines.map((magazine) => ({ slug: magazine.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const magazine = getMagazine(slug);
  if (!magazine) return { title: "Issue Not Found" };

  return {
    title: magazine.title,
    description: `${magazine.title} — ${magazine.issue}. Available from AIM Imports.`,
  };
}

export default async function MagazineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const magazine = getMagazine(slug);
  if (!magazine) notFound();

  const images = magazine.images ?? [];

  return (
    <>
      {/* Dark strip, not just a breadcrumb bar: the header is transparent
          with light text at scroll-top, on the assumption every page opens
          on a dark surface (Hero/PageHeader elsewhere) — this keeps that
          assumption true here too instead of stranding white nav text over
          a white section. */}
      <section className="bg-ink pb-6 pt-24 md:pt-32">
        <Container>
          <Reveal>
            <Link
              href="/store"
              className="font-display inline-flex items-center gap-2 text-xs text-cream/60 transition-colors hover:text-accent-soft"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              Back to Store
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-ink/15 bg-cream pb-14 pt-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <Reveal>
              <PhotoGallery
                images={images}
                alt={`${magazine.title} — ${magazine.issue}`}
                aspectClassName="aspect-[3/4]"
                placeholderSlides={MAGAZINE_PLACEHOLDER_SLIDES}
                badge={
                  <span className="font-display absolute left-0 top-4 bg-accent px-4 py-1.5 text-xs text-cream">
                    {conditionLabel[magazine.condition]}
                  </span>
                }
              />
            </Reveal>

            <div>
              <Reveal>
                <p className="text-sm font-medium uppercase tracking-[0.08em] text-ink/60">
                  {magazine.issue}
                </p>
                <h1 className="font-display mt-1 text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.02] text-accent">
                  {magazine.title}
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <span className="mt-4 block h-1 w-14 bg-accent" />
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">
                  {magazine.description ??
                    "An original back-issue, sourced alongside our vehicle shipments straight from Japan."}
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-6">
                  <MagazineBuyBox magazine={magazine} />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Looking for a specific issue?"
        description="We source magazines alongside every vehicle shipment. Tell us the title or era you're after and we'll keep an eye out."
      />
    </>
  );
}
