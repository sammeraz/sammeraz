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
  const { addItem } = useCart();

  return (
    <div className="flex flex-wrap items-center gap-5">
      <span className="font-display text-2xl text-ink md:text-3xl">
        {currency.format(magazine.price)}
      </span>
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={() => addItem(magazine)}
        className="font-display border border-ink bg-ink px-7 py-3 text-sm text-cream transition-colors duration-200 hover:border-accent hover:bg-accent"
      >
        Add to Cart
      </motion.button>
    </div>
  );
}
