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
    <article
      className="group flex flex-col overflow-hidden border border-ink/10 bg-white transition-shadow duration-300 hover:shadow-lg hover:shadow-ink/5"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 18px 100%, 0 calc(100% - 18px))" }}
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
        <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-cream">
          {statusLabel[vehicle.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="font-serif text-lg text-ink">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        {vehicle.trim ? <p className="text-sm text-ink/55">{vehicle.trim}</p> : null}

        {vehicle.highlights?.length ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {vehicle.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full bg-cream-deep px-2.5 py-1 text-[11px] text-ink/60"
              >
                {highlight}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3">
          <span className="text-base font-medium text-ink">{currency.format(vehicle.price)}</span>
          {vehicle.mileage ? (
            <span className="text-xs text-ink/50">{vehicle.mileage.toLocaleString()} mi</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
