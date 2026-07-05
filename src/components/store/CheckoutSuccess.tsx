"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";

type Status = "checking" | "paid" | "unpaid" | "error";

/** Reads the URL client-side (see InquiryFormWithVehicleParam for why: keeps
 * the page statically prerenderable). The session_id in the URL only proves
 * a Checkout Session was created, not that it was paid — this asks our own
 * server (which holds the secret key) to confirm with Stripe before treating
 * the order as real and clearing the cart. */
export function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clear } = useCart();
  const [status, setStatus] = useState<Status>(sessionId ? "checking" : "error");
  const cleared = useRef(false);

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;

    fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { paid: boolean }) => {
        if (cancelled) return;
        setStatus(data.paid ? "paid" : "unpaid");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  useEffect(() => {
    if (status === "paid" && !cleared.current) {
      cleared.current = true;
      clear();
    }
  }, [status, clear]);

  if (status === "checking") {
    return (
      <div className="border border-ink/10 bg-white px-8 py-12 text-center">
        <p className="text-sm text-ink/60">Confirming your payment…</p>
      </div>
    );
  }

  if (status === "paid") {
    return (
      <div className="border border-ink/10 bg-white px-8 py-12 text-center">
        <h3 className="font-display text-2xl text-ink">Order received</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Thanks for your order — a confirmation is on its way to your email, and we&apos;ll
          follow up with shipping details shortly.
        </p>
        <Link
          href="/store"
          className="font-display mt-6 inline-block text-xs text-accent underline underline-offset-4"
        >
          Back to the store
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-ink/10 bg-white px-8 py-12 text-center">
      <h3 className="font-display text-2xl text-ink">We couldn&apos;t confirm that payment</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/65">
        If you completed payment on Stripe&apos;s page, contact us and we&apos;ll sort it out —
        otherwise your cart is still waiting.
      </p>
      <Link
        href="/checkout"
        className="font-display mt-6 inline-block text-xs text-accent underline underline-offset-4"
      >
        Back to checkout
      </Link>
    </div>
  );
}
