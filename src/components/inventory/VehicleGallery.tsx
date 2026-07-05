"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { revealEase } from "@/components/motion/Reveal";

interface VehicleGalleryProps {
  images: string[];
  name: string;
  /** Incoming/Sold overlay — rendered on top of whichever photo is active. */
  badge?: ReactNode;
}

/** Stand-in slide labels shown (with the same click-to-switch gallery
 * mechanic as real photos) whenever a vehicle has no photography yet, so the
 * multi-photo UX is visible on demo listings instead of collapsing to a
 * single flat placeholder. Swap out for real photos as they come in. */
const PLACEHOLDER_SLIDES = ["Front 3/4", "Rear 3/4", "Interior", "Engine Bay"];

/** Main photo plus a thumbnail strip beneath it to quick-switch between the
 * rest — falls back to the existing single-image treatment whenever a
 * vehicle has exactly one real photo, and to a labeled placeholder gallery
 * when it has none. */
export function VehicleGallery({ images, name, badge }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useSafeReducedMotion();
  const hasPhotos = images.length > 0;
  const slides = hasPhotos ? images : PLACEHOLDER_SLIDES;
  const active = images[activeIndex];

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={hasPhotos ? active : slides[activeIndex]}
            initial={reducedMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: revealEase }}
            className="absolute inset-0"
          >
            {hasPhotos ? (
              <Image
                src={active}
                alt={name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority={activeIndex === 0}
              />
            ) : (
              <PlaceholderArt variant="card" label={slides[activeIndex]} />
            )}
          </motion.div>
        </AnimatePresence>
        {badge}
      </div>

      {slides.length > 1 ? (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View photo ${index + 1} of ${slides.length}`}
                aria-current={isActive}
                className={`relative aspect-[4/3] overflow-hidden border transition-colors duration-200 ${
                  isActive ? "border-accent" : "border-ink/15 hover:border-ink/40"
                }`}
              >
                {hasPhotos ? (
                  <Image src={slide} alt="" fill sizes="120px" className="object-cover" />
                ) : (
                  <PlaceholderArt variant="card" label={slide} />
                )}
                {!isActive ? <span className="absolute inset-0 bg-ink/20" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
