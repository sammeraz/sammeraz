"use client";

import Image from "next/image";
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
    <article className="group flex h-full flex-col overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1">
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
        <span className="absolute left-0 top-3 border border-accent bg-cream px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-accent">
          {conditionLabel[magazine.condition]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 border-t border-ink/12 p-5">
        <h3 className="font-display text-2xl leading-none text-ink">{magazine.title}</h3>
        <p className="text-xs uppercase tracking-[0.08em] text-ink/55">{magazine.issue}</p>
        {magazine.description ? (
          <p className="mt-2 text-sm leading-relaxed text-ink/60">{magazine.description}</p>
        ) : null}

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-ink/12 pt-3">
          <span className="text-lg font-medium tabular-nums text-ink">
            {currency.format(magazine.price)}
          </span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => addItem(magazine)}
            className="rounded-full border border-ink/25 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-cream"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </article>
  );
}
