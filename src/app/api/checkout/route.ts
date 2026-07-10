import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { magazines } from "@/data/magazines";

interface CheckoutItem {
  slug: string;
  quantity: number;
}

interface CheckoutPayload {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  items?: CheckoutItem[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: CheckoutPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, address, city, state, zip, items } = payload;

  if (!name?.trim() || !email?.trim() || !address?.trim() || !city?.trim() || !state?.trim() || !zip?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and full shipping address are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!items?.length) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Price and title come from our own catalog, keyed only by slug — never
  // from the client's submitted item — so a tampered request body can't
  // check out at an arbitrary price.
  const lineItems = items
    .map((item) => {
      const magazine = magazines.find((candidate) => candidate.slug === item.slug);
      if (!magazine) return null;
      const quantity = Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1;
      return { magazine, quantity };
    })
    .filter((item): item is { magazine: (typeof magazines)[number]; quantity: number } => item !== null);

  if (lineItems.length === 0) {
    return NextResponse.json(
      { error: "Those items are no longer available. Refresh your cart and try again." },
      { status: 400 },
    );
  }

  const origin = new URL(request.url).origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems.map(({ magazine, quantity }) => ({
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(magazine.price * 100),
          product_data: { name: `${magazine.title} — ${magazine.issue}` },
        },
      })),
      customer_email: email,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: { name, address, city, state, zip },
    });

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Session creation failed:", error);
    return NextResponse.json({ error: "Payment setup failed. Please try again." }, { status: 502 });
  }
}
