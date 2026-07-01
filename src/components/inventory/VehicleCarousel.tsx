"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "@/components/inventory/VehicleCard";
import { ComingSoonCard } from "@/components/inventory/ComingSoonCard";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";

interface VehicleCarouselProps {
  vehicles: Vehicle[];
  placeholderCount?: number;
}

const arrowButtonClass =
  "flex h-12 w-12 items-center justify-center border-2 border-ink text-ink transition-colors duration-200 hover:bg-ink hover:text-cream disabled:pointer-events-none disabled:opacity-30";

/** Scroller bleeds to the viewport edge (inviting a scroll); the caption and
 * arrow controls below stay aligned with the rest of the page via Container. */
export function VehicleCarousel({ vehicles, placeholderCount = 6 }: VehicleCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hasVehicles = vehicles.length > 0;
  const itemCount = hasVehicles ? vehicles.length : placeholderCount;

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-item]");
    const amount = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 pl-6 md:pl-10"
      >
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={hasVehicles ? vehicles[i].slug : i}
            data-carousel-item
            className="w-[80vw] shrink-0 snap-start sm:w-[340px]"
          >
            {hasVehicles ? <VehicleCard vehicle={vehicles[i]} /> : <ComingSoonCard />}
          </div>
        ))}
        {/* Trailing spacer so the last card can snap clear of the viewport edge. */}
        <div className="w-px shrink-0 md:w-6" aria-hidden="true" />
      </div>

      <Container className="mt-8 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink/45">
          Drag or scroll to browse
        </p>
        <div className="flex gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll to previous vehicle"
            className={arrowButtonClass}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={() => scrollByCard(1)}
            aria-label="Scroll to next vehicle"
            className={arrowButtonClass}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </motion.button>
        </div>
      </Container>
    </div>
  );
}
