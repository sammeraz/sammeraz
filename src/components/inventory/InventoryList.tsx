import type { Vehicle } from "@/lib/types";
import { VehicleListRow } from "@/components/inventory/VehicleListRow";

/** List-view counterpart to InventoryGrid — only ever called with a
 * non-empty, already-filtered set (InventoryBrowser handles the empty and
 * no-matches states itself), so there's no placeholder branch to mirror. */
export function InventoryList({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {vehicles.map((vehicle) => (
        <VehicleListRow key={vehicle.slug} vehicle={vehicle} />
      ))}
    </div>
  );
}
