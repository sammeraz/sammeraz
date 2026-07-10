import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import { site } from "@/data/site";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  vehicleInterest?: string;
  budget?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, vehicleInterest, budget, message } = payload;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const details = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone?.trim() ? `Phone: ${phone}` : null,
    vehicleInterest?.trim() ? `Vehicle of interest: ${vehicleInterest}` : null,
    budget?.trim() ? `Budget: ${budget}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    // Reply-To is the customer's own address, not the sending domain, so
    // whoever reads this in the contact@ inbox can just hit reply.
    await getResend().emails.send({
      from: `${site.name} Website <inquiries@aimimports.jp>`,
      to: site.email,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: details,
    });
  } catch (error) {
    console.error("Failed to send inquiry email:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your inquiry. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
