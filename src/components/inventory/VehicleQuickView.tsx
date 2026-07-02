"use client";

import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useQuickView } from "@/lib/quick-view-context";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { SoldRibbon } from "@/components/inventory/SoldRibbon";
import { CloseIcon, ExpandIcon } from "@/components/ui/icons";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function VehicleQuickView() {
  const { vehicle, close } = useQuickView();

  if (!vehicle) return null;

  // No AnimatePresence/exit here on purpose: this codebase already hit an
  // equivalent reliability problem in PageTransition.tsx, where Next.js
  // navigation doesn't keep the old page mounted long enough for a real
  // exit animation to mean anything, and the fix there was the same —
  // mount-triggered initial/animate only. It matters more here: the main
  // photo below shares its view-transition name with the detail page's
  // hero image (see VehicleDetailPage), and React requires that name to
  // belong to at most one mounted element at a time. An animated exit would
  // keep this popup (and that name) alive for its transition duration,
  // which would collide with the destination page mounting its own copy of
  // the same name the moment Maximize is clicked.
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={close}
        className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={`${vehicle.year} ${vehicle.make} ${vehicle.model} quick view`}
          className="pointer-events-auto flex max-h-[88vh] w-full max-w-md flex-col overflow-y-auto bg-cream text-ink shadow-2xl"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close quick view"
            data-cursor-text="Close"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-ink/60 text-cream backdrop-blur-sm transition-colors hover:bg-ink"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          {/* Same name as the card... no — the card doesn't carry this name
              (it never unmounts while this popup is open, and React
              requires a shared name to belong to only one mounted element
              at a time). Only this image and the detail page's hero image
              share it, so clicking Maximize morphs this into that instead
              of a hard cut. */}
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
            <ViewTransition name={`vehicle-photo-${vehicle.slug}`}>
              {vehicle.images?.[0] ? (
                <Image
                  src={vehicle.images[0]}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <PlaceholderArt variant="card" />
              )}
            </ViewTransition>
            {vehicle.status === "sold" ? <SoldRibbon /> : null}
          </div>

          {vehicle.images && vehicle.images.length > 1 ? (
            <div className="grid shrink-0 grid-cols-2 gap-0.5 bg-ink/10">
              {vehicle.images.slice(1, 3).map((src) => (
                <div key={src} className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={src}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex flex-1 flex-col gap-1 p-5 sm:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-ink/60">
              {vehicle.year} {vehicle.make}
            </p>
            <h2 className="font-display text-2xl leading-none text-accent sm:text-3xl">
              {vehicle.model}
            </h2>
            {vehicle.trim ? (
              <p className="text-xs uppercase tracking-[0.08em] text-ink/55">{vehicle.trim}</p>
            ) : null}

            {vehicle.highlights?.length ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {vehicle.highlights.slice(0, 3).map((highlight) => (
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
              {vehicle.price ? (
                <span className="font-display text-base text-ink">
                  Offered at: {currency.format(vehicle.price)}
                </span>
              ) : (
                <span className="text-sm text-ink/50">Price available on request</span>
              )}
              {vehicle.mileage ? (
                <span className="text-xs tabular-nums text-ink/50">
                  {vehicle.mileage.toLocaleString()} mi
                </span>
              ) : null}
            </div>

            <Link
              href={`/inventory/${vehicle.slug}`}
              onClick={close}
              data-cursor-text="View Full Details"
              className="font-display group mt-5 inline-flex items-center justify-center gap-2 border border-ink bg-ink px-6 py-3 text-sm text-cream transition-colors duration-200 hover:border-accent hover:bg-accent"
            >
              Maximize
              <ExpandIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
