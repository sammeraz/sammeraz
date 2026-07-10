"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart-context";
import { CloseIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";

const easing = [0.16, 1, 0.3, 1] as const;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function CartDrawer() {
  const { items, count, subtotal, isOpen, close, setQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-ink/50"
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: easing }}
            role="dialog"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-[101] flex w-full max-w-md flex-col bg-cream text-ink shadow-2xl dark:bg-ink-soft dark:text-cream"
          >
            <div className="flex items-center justify-between border-b border-ink/15 px-6 py-5 dark:border-cream/15">
              <h2 className="font-display text-2xl leading-none">Your Cart</h2>
              <motion.button
                type="button"
                whileTap={{ scale: 0.88 }}
                onClick={close}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center text-ink/60 transition-colors hover:text-ink dark:text-cream/60 dark:hover:text-cream"
              >
                <CloseIcon className="h-5 w-5" />
              </motion.button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="text-sm text-ink/55 dark:text-cream/55">Your cart is empty.</p>
                <Link
                  href="/store"
                  onClick={close}
                  className="text-sm text-ink underline underline-offset-4 hover:text-accent dark:text-cream"
                >
                  Browse the store
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="flex flex-col gap-6">
                    {items.map((item) => (
                      <li key={item.slug} className="flex gap-4">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-ink/5 dark:bg-cream/5">
                          {item.image ? (
                            <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
                          ) : null}
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                          <h3 className="font-display text-lg leading-none">{item.title}</h3>
                          <p className="text-xs uppercase tracking-[0.08em] text-ink/50 dark:text-cream/50">
                            {item.issue}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 border border-ink/20 dark:border-cream/20">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => setQuantity(item.slug, item.quantity - 1)}
                                className="flex h-7 w-7 items-center justify-center text-ink/60 hover:text-ink dark:text-cream/60 dark:hover:text-cream"
                              >
                                <MinusIcon className="h-3 w-3" />
                              </button>
                              <span className="text-sm tabular-nums">{item.quantity}</span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => setQuantity(item.slug, item.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center text-ink/60 hover:text-ink dark:text-cream/60 dark:hover:text-cream"
                              >
                                <PlusIcon className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-medium tabular-nums">
                              {currency.format(item.price * item.quantity)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.slug)}
                            className="mt-1 self-start text-xs text-ink/40 underline underline-offset-4 hover:text-accent dark:text-cream/40"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-ink/15 px-6 py-6 dark:border-cream/15">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink/60 dark:text-cream/60">
                      Subtotal &middot; {count} {count === 1 ? "item" : "items"}
                    </span>
                    <span className="text-lg font-medium tabular-nums">
                      {currency.format(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink/45 dark:text-cream/45">Shipping and tax calculated at checkout.</p>
                  <Button href="/checkout" variant="dark" className="mt-4 w-full" onClick={close}>
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
