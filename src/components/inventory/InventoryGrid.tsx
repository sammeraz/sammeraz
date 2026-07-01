import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "@/components/inventory/VehicleCard";
import { ComingSoonCard } from "@/components/inventory/ComingSoonCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

interface InventoryGridProps {
  vehicles: Vehicle[];
  placeholderCount?: number;
}

export function InventoryGrid({ vehicles, placeholderCount = 3 }: InventoryGridProps) {
  if (vehicles.length === 0) {
    return (
      <div>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: placeholderCount }).map((_, index) => (
            <RevealItem key={index}>
              <ComingSoonCard />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-sm text-ink/55">
            Have a specific vehicle in mind?{" "}
            <Link href="/contact" className="text-ink underline underline-offset-4 hover:text-accent">
              Start an inquiry
            </Link>{" "}
            and we&apos;ll let you know what&apos;s realistic to source.
          </p>
        </Reveal>
      </div>
    );
  }

  return (
    <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle) => (
        <RevealItem key={vehicle.slug}>
          <VehicleCard vehicle={vehicle} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
