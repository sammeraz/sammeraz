import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

/** Confirms payment status server-side rather than trusting the redirect
 * itself — the success page only has a session_id in the URL, which is
 * meaningless on its own without asking Stripe (using the secret key, kept
 * server-side here) whether that session actually completed. */
export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      paid: session.payment_status === "paid",
      email: session.customer_details?.email ?? null,
    });
  } catch (error) {
    console.error("Failed to retrieve checkout session:", error);
    return NextResponse.json({ error: "Could not verify payment." }, { status: 502 });
  }
}
