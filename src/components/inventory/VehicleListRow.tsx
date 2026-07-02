import Image from "next/image";
import Link from "next/link";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import type { Vehicle } from "@/lib/types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Wide single-row alternative to VehicleCard's grid box — same information,
 * same status rules (no price/mileage row for sold, no price for incoming),
 * just laid out as a thumbnail-plus-details row instead of a stacked card. */
export function VehicleListRow({ vehicle }: { vehicle: Vehicle }) {
  const sold = vehicle.status === "sold";
  const incoming = vehicle.status === "incoming";
  const image = vehicle.images?.[0];

  const body = (
    <div className="flex gap-4 sm:gap-6">
      <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden sm:w-44">
        {image ? (
          <Image
            src={image}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderArt variant="card" label={incoming ? "Incoming" : ""} />
        )}
        {sold ? (
          <span className="font-display absolute left-0 top-2 bg-accent px-2 py-1 text-[10px] tracking-[0.1em] text-cream shadow-[0_4px_14px_rgba(0,0,0,0.35)] sm:top-3 sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.14em]">
            Sold
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-center gap-1 py-1">
        <p
          className={`text-xs font-medium uppercase tracking-[0.04em] sm:text-sm ${incoming ? "text-ink/55" : "text-ink/70"}`}
        >
          {vehicle.year} {vehicle.make}
        </p>
        <h3
          className={`font-display text-lg leading-none sm:text-2xl md:text-3xl ${incoming ? "text-ink/70" : "text-accent"}`}
        >
          {vehicle.model}
        </h3>

        {vehicle.trim || (!sold && !incoming && vehicle.mileage) ? (
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            {vehicle.trim ? (
              <p className="text-[10px] uppercase tracking-[0.08em] text-ink/55 sm:text-xs">
                {vehicle.trim}
              </p>
            ) : null}
            {!sold && !incoming && vehicle.mileage ? (
              <span className="whitespace-nowrap text-[10px] tabular-nums text-ink/50 sm:text-xs">
                {vehicle.mileage.toLocaleString()} mi
              </span>
            ) : null}
          </div>
        ) : null}

        {!sold && !incoming ? (
          <div className="mt-2 sm:mt-3">
            {vehicle.price ? (
              <span className="font-display text-sm text-ink sm:text-base">
                Offered at: {currency.format(vehicle.price)}
              </span>
            ) : (
              <span className="text-sm text-ink/50">Price available on request</span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );

  if (incoming) {
    return <div className="border border-ink/10 bg-white p-3 sm:p-4">{body}</div>;
  }

  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      data-cursor-text="View Details"
      className="group block border border-ink/10 bg-white p-3 transition-colors duration-300 hover:border-ink/25 sm:p-4"
    >
      {body}
    </Link>
  );
}
