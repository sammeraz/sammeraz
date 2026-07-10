"use client";

import { motion } from "motion/react";
import { useCart } from "@/lib/cart-context";
import type { Magazine } from "@/lib/types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function MagazineBuyBox({ magazine }: { magazine: Magazine }) {
  const { addItem, removeItem, items } = useCart();
  const inCart = items.some((item) => item.slug === magazine.slug);

  return (
    <div className="flex flex-wrap items-center gap-5">
      <span className="font-display text-2xl text-ink dark:text-cream md:text-3xl">
        {currency.format(magazine.price)}
      </span>
      {inCart ? (
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => removeItem(magazine.slug)}
          className="font-display border border-ink/30 px-7 py-3 text-sm text-ink/60 transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-cream dark:border-cream/30 dark:text-cream/60 dark:hover:border-cream dark:hover:bg-cream dark:hover:text-ink"
        >
          Remove from Cart
        </motion.button>
      ) : (
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => addItem(magazine)}
          className="font-display border border-ink bg-ink px-7 py-3 text-sm text-cream transition-colors duration-200 hover:border-accent hover:bg-accent dark:border-cream dark:bg-cream dark:text-ink"
        >
          Add to Cart
        </motion.button>
      )}
      {inCart ? (
        <span className="font-display text-xs uppercase tracking-[0.1em] text-ink/40 dark:text-cream/40">In Cart</span>
      ) : null}
    </div>
  );
}
