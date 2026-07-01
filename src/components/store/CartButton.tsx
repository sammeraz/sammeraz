"use client";

import { motion } from "motion/react";
import { useCart } from "@/lib/cart-context";
import { BagIcon } from "@/components/ui/icons";

export function CartButton() {
  const { count, open } = useCart();

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      onClick={open}
      aria-label={`Open cart${count > 0 ? `, ${count} items` : ""}`}
      className="relative flex h-10 w-10 items-center justify-center text-cream/85 transition-colors hover:text-cream"
    >
      <BagIcon className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute right-0 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-cream">
          {count}
        </span>
      ) : null}
    </motion.button>
  );
}
