import { NextResponse } from "next/server";

interface CheckoutItem {
  slug: string;
  title: string;
  quantity: number;
  price: number;
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

  // TODO: wire this up to a real payment processor (Stripe is the standard
  // choice — create a PaymentIntent/Checkout Session here) once an account
  // and API keys are available. For now, orders are only logged server-side
  // so the checkout flow has a working endpoint to submit to; no payment is
  // actually collected yet.
  console.log("New AIM Imports store order:", payload);

  return NextResponse.json({ ok: true });
}
