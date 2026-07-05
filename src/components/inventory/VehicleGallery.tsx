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

/** Main photo plus a thumbnail strip beneath it to quick-switch between the
 * rest — falls back to the existing single-image (or placeholder) treatment
 * whenever a vehicle has zero or one photo, so nothing changes for the
 * common case until real multi-photo listings exist. */
export function VehicleGallery({ images, name, badge }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useSafeReducedMotion();
  const active = images[activeIndex];

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {active ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reducedMotion ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3, ease: revealEase }}
              className="absolute inset-0"
            >
              <Image
                src={active}
                alt={name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <PlaceholderArt variant="card" />
        )}
        {badge}
      </div>

      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((src, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View photo ${index + 1} of ${images.length}`}
                aria-current={isActive}
                className={`relative aspect-[4/3] overflow-hidden border transition-colors duration-200 ${
                  isActive ? "border-accent" : "border-ink/15 hover:border-ink/40"
                }`}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                {!isActive ? <span className="absolute inset-0 bg-ink/20" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
