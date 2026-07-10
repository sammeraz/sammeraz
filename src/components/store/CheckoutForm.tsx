"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { useCart } from "@/lib/cart-context";

type Status = "idle" | "submitting" | "error";

const inputClass =
  "w-full border-b border-ink/20 bg-transparent py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-accent dark:border-cream/20 dark:text-cream dark:placeholder:text-cream/35";

const labelClass = "text-xs font-medium uppercase tracking-[0.14em] text-ink/50 dark:text-cream/50";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function CheckoutForm() {
  const { items, subtotal } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          // Only slug + quantity: price and title come from the server's own
          // catalog, never from the client, so there's nothing to tamper with.
          items: items.map((item) => ({ slug: item.slug, quantity: item.quantity })),
        }),
      });

      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.url) {
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      // Cart is cleared on the success page instead, once payment is
      // actually confirmed — clearing here would lose it if the customer
      // abandons Stripe's page and comes back.
      window.location.href = body.url;
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (items.length === 0) {
    return (
      <div className="border border-ink/10 bg-white px-8 py-12 text-center dark:border-cream/10 dark:bg-ink-soft">
        <h3 className="font-display text-2xl text-ink dark:text-cream">Your cart is empty</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/65 dark:text-cream/65">
          Add a magazine from the store before checking out.
        </p>
        <Link
          href="/store"
          className="font-display mt-6 inline-block text-xs text-accent underline underline-offset-4"
        >
          Browse the store
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-24">
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="grid gap-7 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input id="name" name="name" type="text" required className={inputClass} placeholder="Your full name" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input id="email" name="email" type="email" required className={inputClass} placeholder="you@example.com" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="address" className={labelClass}>
            Shipping Address
          </label>
          <input id="address" name="address" type="text" required className={inputClass} placeholder="Street address" />
        </div>

        <div className="grid gap-7 sm:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div className="flex flex-col gap-2">
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input id="city" name="city" type="text" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="state" className={labelClass}>
              State
            </label>
            <input id="state" name="state" type="text" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="zip" className={labelClass}>
              ZIP
            </label>
            <input id="zip" name="zip" type="text" required className={inputClass} />
          </div>
        </div>

        {status === "error" ? <p className="text-sm text-accent">{errorMessage}</p> : null}

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          disabled={status === "submitting"}
          className="font-display mt-2 inline-flex items-center justify-center border border-ink bg-ink px-7 py-3.5 text-sm text-cream transition-colors duration-200 hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 dark:border-cream dark:bg-cream dark:text-ink"
        >
          {status === "submitting" ? "Redirecting to Payment…" : "Continue to Payment"}
        </motion.button>
        <p className="text-xs leading-relaxed text-ink/45 dark:text-cream/45">
          You&apos;ll enter payment details on Stripe&apos;s secure payment page next.
        </p>
      </form>

      <div className="flex flex-col gap-6">
        <span className="font-display text-sm text-ink/50 dark:text-cream/50">Order Summary</span>
        <ul className="flex flex-col gap-5 border-t border-ink/15 pt-6 dark:border-cream/15">
          {items.map((item) => (
            <li key={item.slug} className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg leading-none text-ink dark:text-cream">{item.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-ink/50 dark:text-cream/50">
                  {item.issue} &middot; Qty {item.quantity}
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium tabular-nums text-ink dark:text-cream">
                {currency.format(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-ink/15 pt-5 dark:border-cream/15">
          <span className="text-sm text-ink/60 dark:text-cream/60">Subtotal</span>
          <span className="text-lg font-medium tabular-nums text-ink dark:text-cream">
            {currency.format(subtotal)}
          </span>
        </div>
        <p className="text-xs text-ink/45 dark:text-cream/45">Shipping and any applicable tax are quoted by email.</p>
      </div>
    </div>
  );
}
