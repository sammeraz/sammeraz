"use client";

import Image from "next/image";
import Link from "next/link";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { SoldRibbon } from "@/components/inventory/SoldRibbon";
import { useQuickView } from "@/lib/quick-view-context";
import type { Vehicle } from "@/lib/types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const { open } = useQuickView();

  if (vehicle.status === "incoming") {
    return <IncomingVehicleCard vehicle={vehicle} />;
  }

  const image = vehicle.images?.[0];

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // A plain left-click opens the quick view instead of navigating away —
    // modifier-clicks (new tab/window), middle-click, and right-click still
    // fall through to the real <Link>, so opening in a new tab still works.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    open(vehicle);
  }

  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      onClick={handleClick}
      data-cursor-text="Quick View"
      className="group flex h-full flex-col bg-white transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderArt variant="card" />
        )}
        {vehicle.status === "sold" ? (
          <SoldRibbon />
        ) : (
          <span className="font-display absolute left-0 top-3 bg-accent px-3 py-1 text-xs text-cream">
            Available
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 pt-3 sm:pt-5">
        <p className="text-xs font-medium uppercase tracking-[0.04em] text-ink/70 sm:text-sm">
          {vehicle.year} {vehicle.make}
        </p>
        <h3 className="font-display text-xl leading-none text-accent sm:text-2xl md:text-3xl">
          {vehicle.model}
        </h3>
        {vehicle.trim ? (
          <p className="text-[10px] uppercase tracking-[0.08em] text-ink/55 sm:text-xs">
            {vehicle.trim}
          </p>
        ) : null}

        {vehicle.highlights?.length ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {vehicle.highlights.map((highlight) => (
              <span
                key={highlight}
                className="border border-ink/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.06em] text-ink/60"
              >
                {highlight}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-3 flex flex-col gap-1 border-t border-ink/15 pt-3 sm:flex-row sm:items-center sm:justify-between">
          {vehicle.price ? (
            <span className="font-display text-sm text-ink sm:text-base">
              Offered at: {currency.format(vehicle.price)}
            </span>
          ) : (
            <span className="text-sm text-ink/50">Price available on request</span>
          )}
          {vehicle.mileage ? (
            <span className="text-xs tabular-nums text-ink/50">
              {vehicle.mileage.toLocaleString()} mi
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

/**
 * Incoming cars are purchased but not landed yet — there's no real
 * photography of the actual unit and no confirmed detail page worth
 * navigating to, so this is a flat, non-interactive teaser rather than the
 * full clickable listing above. Same dashed-border "not fully here yet"
 * language as ComingSoonCard.
 */
function IncomingVehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex h-full flex-col border border-dashed border-ink/25 bg-white/50">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <PlaceholderArt variant="card" label="Incoming" />
      </div>
      <div className="flex flex-1 flex-col gap-1 pt-3 sm:pt-5">
        <p className="text-xs font-medium uppercase tracking-[0.04em] text-ink/55 sm:text-sm">
          {vehicle.year} {vehicle.make}
        </p>
        <h3 className="font-display text-xl leading-none text-ink/70 sm:text-2xl md:text-3xl">
          {vehicle.model}
        </h3>
        {vehicle.trim ? (
          <p className="text-[10px] uppercase tracking-[0.08em] text-ink/40 sm:text-xs">
            {vehicle.trim}
          </p>
        ) : null}

        <div className="mt-3 flex flex-col gap-1 border-t border-ink/15 pt-3">
          {vehicle.price ? (
            <span className="font-display text-sm text-ink/70 sm:text-base">
              Offered at: {currency.format(vehicle.price)}
            </span>
          ) : null}
          <p className="text-xs text-ink/45">Details coming once it lands stateside.</p>
        </div>
      </div>
    </div>
  );
}
