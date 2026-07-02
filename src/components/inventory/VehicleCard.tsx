import Image from "next/image";
import Link from "next/link";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import type { Vehicle } from "@/lib/types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  if (vehicle.status === "incoming") {
    return <IncomingVehicleCard vehicle={vehicle} />;
  }

  const image = vehicle.images?.[0];
  const sold = vehicle.status === "sold";

  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      data-cursor-text="View Details"
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
          <span className="font-display absolute left-0 top-3 bg-accent px-3.5 py-1.5 text-xs tracking-[0.14em] text-cream shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
            Sold
          </span>
        ) : null}
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

        <div className="mt-3 flex flex-col gap-1 border-t border-ink/15 pt-3 sm:flex-row sm:items-center sm:justify-between">
          {sold ? null : vehicle.price ? (
            <span className="font-display text-sm text-ink sm:text-base">
              Offered at: {currency.format(vehicle.price)}
            </span>
          ) : (
            <span className="text-sm text-ink/50">Price available on request</span>
          )}
          {vehicle.mileage ? (
            <span className="text-xs tabular-nums text-ink/50 sm:ml-auto">
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
 * full clickable listing above. No price either: it's frequently not final
 * yet at this stage.
 */
function IncomingVehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <PlaceholderArt variant="card" label="" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-lg uppercase tracking-[0.12em] text-cream/80">
            Incoming
          </span>
        </div>
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
      </div>
    </div>
  );
}
