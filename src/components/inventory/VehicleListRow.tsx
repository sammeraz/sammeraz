import Image from "next/image";
import Link from "next/link";
import { Mileage } from "@/components/inventory/Mileage";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import type { Vehicle } from "@/lib/types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Large, feed-style alternative to VehicleCard's grid box: the title/price
 * block sits above one big photo, echoing the "name, accent rule, price"
 * language already used on the vehicle detail page hero. Same status rules
 * as VehicleCard throughout (no rule/price for sold or incoming, sold badge
 * on the photo, incoming placeholder art, non-clickable incoming wrapper). */
export function VehicleListRow({ vehicle }: { vehicle: Vehicle }) {
  const sold = vehicle.status === "sold";
  const incoming = vehicle.status === "incoming";
  const showPrice = !sold && !incoming;
  const image = vehicle.images?.[0];

  const body = (
    <div>
      <p
        className={`text-xs font-medium uppercase tracking-[0.08em] sm:text-sm ${incoming ? "text-ink/55" : "text-ink/60"}`}
      >
        {vehicle.year} {vehicle.make}
      </p>
      <h3
        className={`font-display mt-1 text-[clamp(1.75rem,4vw,3rem)] leading-[1.02] ${incoming ? "text-ink/70" : "text-accent"}`}
      >
        {vehicle.model}
      </h3>

      {vehicle.trim || (showPrice && vehicle.mileage) ? (
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {vehicle.trim ? (
            <p className="text-xs uppercase tracking-[0.08em] text-ink/55 sm:text-sm">{vehicle.trim}</p>
          ) : null}
          {showPrice && vehicle.mileage ? (
            <Mileage
              miles={vehicle.mileage}
              className="ml-auto whitespace-nowrap text-xs tabular-nums text-ink/50 sm:text-sm"
            />
          ) : null}
        </div>
      ) : null}

      {showPrice ? (
        <div className="mt-4">
          <span className="block h-1 w-16 bg-accent" />
          <div className="mt-4">
            {vehicle.price ? (
              <span className="font-display text-xl text-ink sm:text-2xl">
                Offered at: {currency.format(vehicle.price)}
              </span>
            ) : (
              <span className="text-sm text-ink/50">Price available on request</span>
            )}
          </div>
        </div>
      ) : null}

      <div
        className={`relative aspect-[4/3] w-full overflow-hidden ${showPrice ? "mt-6" : "mt-4 sm:mt-5"}`}
      >
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
          <span className="font-display absolute left-0 top-4 bg-accent px-4 py-2 text-xs tracking-[0.14em] text-cream shadow-[0_4px_14px_rgba(0,0,0,0.35)] sm:px-5 sm:py-2.5 sm:text-sm sm:tracking-[0.16em]">
            Sold
          </span>
        ) : null}
      </div>
    </div>
  );

  if (incoming) {
    return <div className="border border-ink/10 bg-white p-6 sm:p-10">{body}</div>;
  }

  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      className="group block border border-ink/10 bg-white p-6 transition-colors duration-300 hover:border-ink/25 sm:p-10"
    >
      {body}
    </Link>
  );
}
