"use client";

import { useRef } from "react";
import { motion, useScroll, type Variants } from "motion/react";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "@/components/inventory/VehicleCard";
import { ComingSoonCard } from "@/components/inventory/ComingSoonCard";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { revealEase } from "@/components/motion/Reveal";
import { useStartsInViewport } from "@/hooks/useStartsInViewport";

interface VehicleCarouselProps {
  vehicles: Vehicle[];
  placeholderCount?: number;
}

const arrowButtonClass =
  "flex h-12 w-12 items-center justify-center border border-ink text-ink transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-cream disabled:pointer-events-none disabled:opacity-30 dark:border-cream dark:text-cream dark:hover:text-cream";

const cardRow: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: revealEase } },
};

/** On mobile, cards are centered one at a time — padding is sized to exactly
 * half the leftover width (100vw - card width, split two ways) so the active
 * card's midpoint lands on the viewport's midpoint instead of hugging the
 * left edge. From sm: up the layout switches to the old bleed-to-the-edge
 * row (fixed card width, left-aligned, inviting a horizontal drag/scroll
 * across several visible cards at once) since "centered" stops being the
 * right mental model once more than one card is in view. The caption and
 * arrow controls below stay aligned with the rest of the page via Container
 * regardless. */
export function VehicleCarousel({ vehicles, placeholderCount = 6 }: VehicleCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [inViewRef, startsInViewport] = useStartsInViewport<HTMLDivElement>();
  const hasVehicles = vehicles.length > 0;
  const itemCount = hasVehicles ? vehicles.length : placeholderCount;
  const { scrollXProgress } = useScroll({ container: scrollerRef });

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-item]");
    const amount = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <div>
      <motion.div
        ref={(node) => {
          scrollerRef.current = node;
          inViewRef.current = node;
        }}
        variants={cardRow}
        initial="hidden"
        animate={startsInViewport ? "show" : undefined}
        whileInView={startsInViewport ? undefined : "show"}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        className="carousel-align-start no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[8vw] pb-2 pt-2 sm:pl-6 sm:pr-0"
      >
        {Array.from({ length: itemCount }).map((_, i) => (
          <motion.div
            key={hasVehicles ? vehicles[i].slug : i}
            data-carousel-item
            variants={cardItem}
            className="reveal-instant-mobile w-[84vw] shrink-0 snap-center sm:w-[340px] sm:snap-start"
          >
            {hasVehicles ? <VehicleCard vehicle={vehicles[i]} /> : <ComingSoonCard />}
          </motion.div>
        ))}
        {/* Trailing spacer so the last card can snap clear of the viewport edge
            in the sm:+ bleed layout — a no-op on mobile, where the symmetric
            padding above already covers it. */}
        <div className="w-px shrink-0 md:w-6" aria-hidden="true" />
      </motion.div>

      <Container className="mt-8 flex items-center gap-6">
        <p className="shrink-0 text-xs uppercase tracking-[0.1em] text-ink/45 dark:text-cream/45">
          Drag or scroll to browse
        </p>
        <div className="h-px flex-1 bg-ink/10 dark:bg-cream/10">
          <motion.div
            aria-hidden="true"
            className="h-px origin-left bg-accent"
            style={{ scaleX: scrollXProgress }}
          />
        </div>
        <div className="flex shrink-0 gap-3">
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
