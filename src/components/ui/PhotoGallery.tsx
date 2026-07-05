"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { useSafeReducedMotion } from "@/hooks/useSafeReducedMotion";
import { revealEase } from "@/components/motion/Reveal";

interface PhotoGalleryProps {
  images: string[];
  alt: string;
  aspectClassName: string;
  /** Stand-in slide labels shown (with the same click/arrow/keyboard-switch
   * mechanic as real photos) whenever there's no photography yet, so the
   * multi-photo UX is visible ahead of real listings instead of collapsing
   * to a single flat placeholder. */
  placeholderSlides: string[];
  /** Status overlay — rendered on top of whichever photo is active. */
  badge?: ReactNode;
}

/** Main photo plus a thumbnail strip beneath it to quick-switch between the
 * rest. Arrow buttons and left/right arrow keys step through photos one at a
 * time and stop at either end (no wraparound). Falls back to the existing
 * single-image treatment whenever there's exactly one real photo, and to a
 * labeled placeholder gallery when there are none. */
export function PhotoGallery({ images, alt, aspectClassName, placeholderSlides, badge }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useSafeReducedMotion();
  const hasPhotos = images.length > 0;
  const slides = hasPhotos ? images : placeholderSlides;
  const active = images[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === slides.length - 1;

  function goTo(index: number) {
    setActiveIndex(Math.min(Math.max(index, 0), slides.length - 1));
  }

  useEffect(() => {
    if (slides.length < 2) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((i) => Math.max(0, i - 1));
      } else if (event.key === "ArrowRight") {
        setActiveIndex((i) => Math.min(slides.length - 1, i + 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

  return (
    <div>
      <div className={`relative w-full overflow-hidden ${aspectClassName}`}>
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
                alt={alt}
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

        {!isFirst ? (
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-ink/50 text-cream transition-colors duration-200 hover:bg-ink/75"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        ) : null}
        {!isLast ? (
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-ink/50 text-cream transition-colors duration-200 hover:bg-ink/75"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`View photo ${index + 1} of ${slides.length}`}
                aria-current={isActive}
                className={`relative overflow-hidden border transition-colors duration-200 ${aspectClassName} ${
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
