import { Resend } from "resend";

let client: Resend | null = null;

/** Lazily constructed so a missing key only breaks the routes that actually
 * call this, with a clear message, instead of crashing at import time.
 * RESEND_API_KEY is never checked into the repo — set it in Vercel's
 * project environment variables (or a local .env.local, already
 * gitignored). */
export function getResend(): Resend {
  if (client) return client;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to your environment (Vercel project settings, or .env.local for local dev) before using the contact form.",
    );
  }

  client = new Resend(key);
  return client;
}
