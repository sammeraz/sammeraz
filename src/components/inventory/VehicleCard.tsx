import Image from "next/image";
import Link from "next/link";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import type { Vehicle } from "@/lib/types";

const statusLabel: Record<Vehicle["status"], string> = {
  available: "Available",
  incoming: "Incoming",
  sold: "Sold",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const image = vehicle.images?.[0];

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
        <span className="font-display absolute left-0 top-3 bg-accent px-3 py-1 text-xs text-cream">
          {statusLabel[vehicle.status]}
        </span>
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
          <span className="font-display text-sm text-ink sm:text-base">
            Offered at: {currency.format(vehicle.price)}
          </span>
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
