import Image from "next/image";
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
    <article className="group flex h-full flex-col overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1">
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
        <span className="absolute left-0 top-3 border border-accent bg-cream px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-accent">
          {statusLabel[vehicle.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 border-t border-ink/12 p-5">
        <h3 className="font-display text-2xl leading-none text-ink">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        {vehicle.trim ? (
          <p className="text-xs uppercase tracking-[0.08em] text-ink/55">{vehicle.trim}</p>
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

        <div className="mt-3 flex items-center justify-between border-t border-ink/12 pt-3">
          <span className="text-lg font-medium tabular-nums text-ink">
            {currency.format(vehicle.price)}
          </span>
          {vehicle.mileage ? (
            <span className="text-xs tabular-nums text-ink/50">
              {vehicle.mileage.toLocaleString()} mi
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
