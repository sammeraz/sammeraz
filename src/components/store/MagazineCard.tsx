"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { useCart } from "@/lib/cart-context";
import type { Magazine } from "@/lib/types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function MagazineCard({ magazine }: { magazine: Magazine }) {
  const { addItem, removeItem, items } = useCart();
  const image = magazine.images?.[0];
  const inCart = items.some((item) => item.slug === magazine.slug);

  return (
    <article className="group flex h-full flex-col bg-white transition-transform duration-300 hover:-translate-y-1 dark:bg-ink-soft">
      <Link href={`/store/${magazine.slug}`} className="contents">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={`${magazine.title} — ${magazine.issue}`}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <PlaceholderArt variant="card" />
          )}
          {inCart ? (
            <span className="font-display absolute left-0 top-3 bg-ink px-3 py-1 text-xs text-cream">
              In Cart
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-1 p-3 sm:p-5">
          <p className="text-[10px] uppercase tracking-[0.08em] text-ink/55 dark:text-cream/55 sm:text-xs">
            {magazine.issue}
          </p>
          <h3 className="font-display text-lg leading-none text-accent sm:text-xl md:text-2xl">
            {magazine.title}
          </h3>
          {magazine.description ? (
            <p className="mt-2 hidden text-sm leading-relaxed text-ink/60 dark:text-cream/60 sm:block">
              {magazine.description}
            </p>
          ) : null}
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-2 border-t border-ink/15 px-3 pb-3 pt-3 dark:border-cream/15 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:pb-5">
        <span className="font-display text-sm text-ink dark:text-cream sm:text-base">
          {currency.format(magazine.price)}
        </span>
        {inCart ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => removeItem(magazine.slug)}
            className="font-display border border-ink/30 px-4 py-1.5 text-xs text-ink/60 transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-cream dark:border-cream/30 dark:text-cream/60 dark:hover:border-cream dark:hover:bg-cream dark:hover:text-ink"
          >
            Remove from Cart
          </motion.button>
        ) : (
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => addItem(magazine)}
            className="font-display border border-ink px-4 py-1.5 text-xs text-ink transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-cream dark:border-cream dark:text-cream"
          >
            Add to Cart
          </motion.button>
        )}
      </div>
    </article>
  );
}
