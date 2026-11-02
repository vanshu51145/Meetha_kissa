"use server";

import { append } from "@/lib/store";

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isPhone = (value: string) => /^[6-9]\d{9}$/.test(value.replace(/\D/g, "").slice(-10));

/** Saves a contact / bulk-order enquiry from the contact page. */
export async function sendMessage(input: {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
}): Promise<{ ok: boolean; error?: string }> {
  const name = str(input?.name, 80);
  const phone = str(input?.phone, 20);
  const email = str(input?.email, 120);
  const message = str(input?.message, 2000);

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!isPhone(phone)) return { ok: false, error: "Please enter a valid 10-digit mobile number." };
  if (!isEmail(email)) return { ok: false, error: "Please enter a valid email address." };
  if (message.length < 10) {
    return { ok: false, error: "Tell us a little more about what you'd like us to make." };
  }

  try {
    await append("messages.json", {
      id: `ENQ-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      name,
      phone,
      email,
      message,
    });
  } catch (error) {
    console.error("sendMessage failed", error);
    return {
      ok: false,
      error: "We couldn't save your message — please email hello@meethakissa.in instead.",
    };
  }
  return { ok: true };
}
