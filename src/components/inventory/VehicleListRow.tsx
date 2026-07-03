import Image from "next/image";
import Link from "next/link";
import { Mileage } from "@/components/inventory/Mileage";
import { SoldBadge } from "@/components/inventory/SoldBadge";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import type { Vehicle } from "@/lib/types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const PHOTO_SLOTS = [0, 1, 2];

/** Full-width row alternative to VehicleCard's grid box: details sit on the
 * left, a three-photo strip fills the rest of the row on the right (stacks
 * below the details on mobile, where there's no room to sit side by side).
 * Same status rules as VehicleCard throughout (no rule/price for sold or
 * incoming, sold badge on the lead photo, incoming placeholder art,
 * non-clickable incoming wrapper). */
export function VehicleListRow({ vehicle }: { vehicle: Vehicle }) {
  const sold = vehicle.status === "sold";
  const incoming = vehicle.status === "incoming";
  const showPrice = !sold && !incoming;
  const images = vehicle.images ?? [];

  const body = (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
      <div className="sm:w-72 sm:shrink-0">
        <p
          className={`text-xs font-medium uppercase tracking-[0.08em] ${incoming ? "text-ink/55" : "text-ink/60"}`}
        >
          {vehicle.year} {vehicle.make}
        </p>
        <h3
          className={`font-display mt-1 text-2xl leading-[1.02] sm:text-3xl ${incoming ? "text-ink/70" : "text-accent"}`}
        >
          {vehicle.model}
        </h3>

        {vehicle.trim || (showPrice && vehicle.mileage) ? (
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {vehicle.trim ? (
              <p className="text-xs uppercase tracking-[0.08em] text-ink/55">{vehicle.trim}</p>
            ) : null}
            {showPrice && vehicle.mileage ? (
              <Mileage miles={vehicle.mileage} className="whitespace-nowrap text-xs tabular-nums text-ink/50" />
            ) : null}
          </div>
        ) : null}

        {showPrice ? (
          <div className="mt-4">
            <span className="block h-1 w-12 bg-accent" />
            <div className="mt-3">
              {vehicle.price ? (
                <span className="font-display text-lg text-ink sm:text-xl">
                  Offered at: {currency.format(vehicle.price)}
                </span>
              ) : (
                <span className="text-sm text-ink/50">Price available on request</span>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:flex-1 sm:gap-3">
        {PHOTO_SLOTS.map((i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden">
            {images[i] ? (
              <Image
                src={images[i]}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                fill
                sizes="(min-width: 640px) 300px, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <PlaceholderArt variant="card" label={i === 0 && incoming ? "Incoming" : ""} />
            )}
            {sold && i === 0 ? <SoldBadge size="sm" /> : null}
          </div>
        ))}
      </div>
    </div>
  );

  if (incoming) {
    return <div className="border border-ink/10 bg-white p-5 sm:p-6">{body}</div>;
  }

  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      className="group block border border-ink/10 bg-white p-5 transition-colors duration-300 hover:border-ink/25 sm:p-6"
    >
      {body}
    </Link>
  );
}
