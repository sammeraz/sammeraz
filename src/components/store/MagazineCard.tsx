"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { useCart } from "@/lib/cart-context";
import type { Magazine } from "@/lib/types";

const conditionLabel: Record<Magazine["condition"], string> = {
  new: "New",
  "like-new": "Like New",
  good: "Good",
  fair: "Fair",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function MagazineCard({ magazine }: { magazine: Magazine }) {
  const { addItem } = useCart();
  const image = magazine.images?.[0];

  return (
    <article className="group flex h-full flex-col bg-white transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/store/${magazine.slug}`} data-cursor-text="View Details" className="contents">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={`${magazine.title} — ${magazine.issue}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <PlaceholderArt variant="card" />
          )}
          <span className="font-display absolute left-0 top-3 bg-accent px-3 py-1 text-xs text-cream">
            {conditionLabel[magazine.condition]}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1 pt-3 sm:pt-5">
          <p className="text-[10px] uppercase tracking-[0.08em] text-ink/55 sm:text-xs">
            {magazine.issue}
          </p>
          <h3 className="font-display text-lg leading-none text-accent sm:text-xl md:text-2xl">
            {magazine.title}
          </h3>
          {magazine.description ? (
            <p className="mt-2 hidden text-sm leading-relaxed text-ink/60 sm:block">
              {magazine.description}
            </p>
          ) : null}
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-2 border-t border-ink/15 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-sm text-ink sm:text-base">
          {currency.format(magazine.price)}
        </span>
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          onClick={() => addItem(magazine)}
          className="font-display border border-ink px-4 py-1.5 text-xs text-ink transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-cream"
        >
          Add to Cart
        </motion.button>
      </div>
    </article>
  );
}
