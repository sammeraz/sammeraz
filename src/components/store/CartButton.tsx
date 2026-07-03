"use client";

import { motion } from "motion/react";
import { useCart } from "@/lib/cart-context";
import { BagIcon } from "@/components/ui/icons";

export function CartButton() {
  const { count, open } = useCart();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      onClick={open}
      aria-label={`Open cart${count > 0 ? `, ${count} items` : ""}`}
      className="group relative flex h-10 w-10 items-center justify-center text-cream/85 transition-colors hover:text-cream"
    >
      <BagIcon className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute right-0 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-cream">
          {count}
        </span>
      ) : null}
      {/* Same underline language as the desktop nav links (see NavLink in
          Header) — ties the cart into the header's existing hover motif
          instead of a one-off effect just for this icon. */}
      <span
        aria-hidden="true"
        className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-accent transition-[width] duration-300 ease-out group-hover:w-5"
      />
    </motion.button>
  );
}
