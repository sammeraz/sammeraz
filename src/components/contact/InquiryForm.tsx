"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border-b border-ink/20 bg-transparent py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition-colors focus:border-accent";

const labelClass = "text-xs font-medium uppercase tracking-[0.14em] text-ink/50";

export function InquiryForm({ defaultVehicleInterest }: { defaultVehicleInterest?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-ink/10 bg-white px-8 py-12 text-center">
        <h3 className="font-display text-2xl text-ink">Inquiry received</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Thanks for reaching out — we&apos;ll review what you&apos;re looking for and get back
          to you shortly.
        </p>
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          onClick={() => setStatus("idle")}
          className="font-display mt-6 text-xs text-accent underline underline-offset-4"
        >
          Send another inquiry
        </motion.button>
      </div>
    );
  }

  return (
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

      <div className="grid gap-7 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="normal-case text-ink/35">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder="(xxx) xxx-xxxx" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className={labelClass}>
            Budget Range
          </label>
          <select id="budget" name="budget" defaultValue="" className={`${inputClass} appearance-none`}>
            <option value="">Not sure yet</option>
            <option value="under-50k">Under $50,000</option>
            <option value="50k-100k">$50,000 – $100,000</option>
            <option value="100k-200k">$100,000 – $200,000</option>
            <option value="200k-plus">$200,000+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="vehicleInterest" className={labelClass}>
          Vehicle of Interest <span className="normal-case text-ink/35">(optional)</span>
        </label>
        <input
          id="vehicleInterest"
          name="vehicleInterest"
          type="text"
          defaultValue={defaultVehicleInterest}
          className={inputClass}
          placeholder="e.g. 1999 Nissan Skyline GT-R, V-Spec"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Tell us what you're looking for — spec, condition, timeline, anything else that matters to you."
        />
      </div>

      {status === "error" ? <p className="text-sm text-accent">{errorMessage}</p> : null}

      <motion.button
        type="submit"
        whileTap={{ scale: 0.97 }}
        disabled={status === "submitting"}
        className="font-display mt-2 inline-flex items-center justify-center border border-ink bg-ink px-7 py-3.5 text-sm text-cream transition-colors duration-200 hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
      </motion.button>
    </form>
  );
}
