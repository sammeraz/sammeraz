import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Mileage } from "@/components/inventory/Mileage";
import { SoldBadge } from "@/components/inventory/SoldBadge";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { CTABanner } from "@/components/sections/CTABanner";
import { RevealOnLoad, RevealOnLoadGroup, RevealItem } from "@/components/motion/Reveal";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { inventory } from "@/data/inventory";
import type { VehicleSpecs } from "@/lib/types";

const specLabels: Record<keyof VehicleSpecs, string> = {
  chassisCode: "Chassis Code",
  engine: "Engine",
  drivetrain: "Drivetrain",
  transmission: "Transmission",
  exteriorColor: "Exterior Color",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const VEHICLE_PLACEHOLDER_SLIDES = [
  "Front 3/4",
  "Rear 3/4",
  "Side Profile",
  "Interior",
  "Dashboard",
  "Engine Bay",
  "Wheels",
  "Trunk",
];

function getVehicle(slug: string) {
  return inventory.find((vehicle) => vehicle.slug === slug);
}

export function generateStaticParams() {
  return inventory.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return { title: "Vehicle Not Found" };

  const name = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  return {
    title: name,
    description: `${name}${vehicle.trim ? ` ${vehicle.trim}` : ""} — sourced and offered through AIM Imports.`,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const images = vehicle.images ?? [];
  const name = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const sold = vehicle.status === "sold";
  const specRows = (Object.keys(specLabels) as (keyof VehicleSpecs)[])
    .filter((key) => vehicle.specs?.[key])
    .map((key) => [specLabels[key], vehicle.specs![key] as string] as const);

  return (
    <>
      {/* Dark strip, not just a breadcrumb bar: the header is transparent
          with light text at scroll-top, on the assumption every page opens
          on a dark surface (Hero/PageHeader elsewhere) — this keeps that
          assumption true here too instead of stranding white nav text over
          a white section. */}
      <section className="bg-ink pb-6 pt-24 md:pt-32">
        <Container>
          <RevealOnLoad>
            <Link
              href="/inventory"
              className="font-display inline-flex items-center gap-2 text-xs text-cream/60 transition-colors hover:text-accent-soft"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              Back to Inventory
            </Link>
          </RevealOnLoad>
        </Container>
      </section>

      <section className="border-b border-ink/15 bg-cream pb-20 pt-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <RevealOnLoad>
              <PhotoGallery
                images={images}
                alt={name}
                aspectClassName="aspect-[4/3]"
                placeholderSlides={VEHICLE_PLACEHOLDER_SLIDES}
                badge={
                  vehicle.status === "incoming" ? (
                    <span className="font-display absolute left-0 top-4 bg-ink/75 px-4 py-1.5 text-xs text-cream">
                      Incoming
                    </span>
                  ) : sold ? (
                    <SoldBadge size="lg" />
                  ) : null
                }
              />
            </RevealOnLoad>

            <div>
              <RevealOnLoad>
                <p className="text-sm font-medium uppercase tracking-[0.08em] text-ink/60">
                  {vehicle.year} {vehicle.make}
                </p>
                <h1 className="font-display mt-1 text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] text-accent">
                  {vehicle.model}
                </h1>
                {vehicle.trim || vehicle.mileage ? (
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {vehicle.trim ? (
                      <p className="text-sm uppercase tracking-[0.08em] text-ink/55">
                        {vehicle.trim}
                      </p>
                    ) : null}
                    {vehicle.mileage ? (
                      <Mileage
                        miles={vehicle.mileage}
                        showParenthetical
                        className="ml-auto whitespace-nowrap text-sm tabular-nums text-ink/50"
                      />
                    ) : null}
                  </div>
                ) : null}
              </RevealOnLoad>

              <RevealOnLoad delay={0.1}>
                <span className="mt-6 block h-1 w-16 bg-accent" />
              </RevealOnLoad>

              <RevealOnLoad delay={0.16}>
                <div className="mt-6 flex flex-wrap items-baseline gap-4">
                  {sold ? (
                    <span className="font-display text-2xl text-ink md:text-3xl">Sold</span>
                  ) : vehicle.price ? (
                    <span className="font-display text-2xl text-ink md:text-3xl">
                      Offered at: {currency.format(vehicle.price)}
                    </span>
                  ) : (
                    <span className="text-base text-ink/50">Price available on request</span>
                  )}
                </div>
              </RevealOnLoad>

              <RevealOnLoad delay={0.22}>
                <div className="mt-6">
                  <Button href={`/contact?vehicle=${encodeURIComponent(name)}`} variant="dark">
                    {sold ? "Ask About Similar Cars" : "Ask About This Car"}
                  </Button>
                </div>
              </RevealOnLoad>

              <RevealOnLoad delay={0.3}>
                <p className="mt-8 max-w-md text-sm leading-relaxed text-ink/60">
                  {sold
                    ? "This car has already found a home, but it's a good example of what we can source — tell us what you're after and we'll go find your version of it."
                    : "Every vehicle we offer is reviewed against its auction sheet and import eligibility before it's listed. Ask us for the full condition report, shipping timeline, and landed cost for this car."}
                </p>
              </RevealOnLoad>
            </div>
          </div>
        </Container>
      </section>

      {specRows.length > 0 ? (
        <section className="border-b border-ink/15 bg-cream-deep py-20 md:py-24">
          <Container>
            <RevealOnLoad delay={0.34} className="flex items-center gap-5">
              <h2 className="font-display shrink-0 text-3xl text-ink md:text-4xl">
                Specifications
              </h2>
              <span className="h-1 flex-1 bg-accent" />
            </RevealOnLoad>

            <RevealOnLoadGroup delay={0.4} className="mt-10 grid gap-x-12 border-t border-ink/15 sm:grid-cols-2">
              {specRows.map(([label, value]) => (
                <RevealItem
                  key={label}
                  className="flex items-center justify-between gap-6 border-b border-ink/15 py-4"
                >
                  <span className="text-xs uppercase tracking-[0.1em] text-ink/45">{label}</span>
                  <span className="font-display text-sm text-ink">{value}</span>
                </RevealItem>
              ))}
            </RevealOnLoadGroup>
          </Container>
        </section>
      ) : null}

      <CTABanner
        title="Want a closer look before you commit?"
        description="We'll walk you through the auction sheet, condition grade, and everything it takes to get this car to your driveway."
      />
    </>
  );
}
