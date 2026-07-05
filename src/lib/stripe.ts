import Stripe from "stripe";

let client: Stripe | null = null;

/** Lazily constructed so a missing key only breaks the routes that actually
 * call this, with a clear message, instead of crashing at import time.
 * STRIPE_SECRET_KEY is never checked into the repo — set it in Vercel's
 * project environment variables (or a local .env.local, already
 * gitignored). */
export function getStripe(): Stripe {
  if (client) return client;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your environment (Vercel project settings, or .env.local for local dev) before using checkout.",
    );
  }

  client = new Stripe(key);
  return client;
}
