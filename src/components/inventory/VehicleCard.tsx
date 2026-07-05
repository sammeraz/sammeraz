import Image from "next/image";
import Link from "next/link";
import { Mileage } from "@/components/inventory/Mileage";
import { SoldBadge } from "@/components/inventory/SoldBadge";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { transmissionAbbreviation } from "@/lib/format";
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
  const transmission = transmissionAbbreviation(vehicle.specs?.transmission);

  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      className="group flex flex-col border border-ink/10 bg-white transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-ink/25"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderArt variant="card" />
        )}
        {vehicle.status === "sold" ? <SoldBadge size="md" /> : null}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-5">
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
        {/* Its own row, separate from trim: trim text varies enough in length
            that sharing a wrappable row with it (the previous layout) left
            the tag sitting in a different spot on every other card — right
            after a short trim, or dropped to a second line after a long one.
            Pinned here, it's always the same position regardless of trim. */}
        {transmission || (!sold && vehicle.mileage) ? (
          <div className="flex items-baseline gap-x-2">
            {transmission ? (
              <span className="border border-ink/20 px-1 text-[9px] font-medium uppercase tracking-[0.08em] text-ink/55 sm:text-[10px]">
                {transmission}
              </span>
            ) : null}
            {!sold && vehicle.mileage ? (
              <Mileage
                miles={vehicle.mileage}
                className="ml-auto whitespace-nowrap text-[10px] tabular-nums text-ink/50 sm:text-xs"
              />
            ) : null}
          </div>
        ) : null}

        {sold ? null : (
          <div className="mt-3 border-t border-ink/15 pt-3">
            {vehicle.price ? (
              <span className="font-display text-sm text-ink sm:text-base">
                Offered at: {currency.format(vehicle.price)}
              </span>
            ) : (
              <span className="text-sm text-ink/50">Price available on request</span>
            )}
          </div>
        )}
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
  const transmission = transmissionAbbreviation(vehicle.specs?.transmission);

  return (
    <div className="flex flex-col border border-ink/10 bg-white">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <PlaceholderArt variant="card" label="Incoming" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-5">
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
        {transmission ? (
          <span className="w-fit border border-ink/15 px-1 text-[9px] font-medium uppercase tracking-[0.08em] text-ink/40 sm:text-[10px]">
            {transmission}
          </span>
        ) : null}
      </div>
    </div>
  );
}
