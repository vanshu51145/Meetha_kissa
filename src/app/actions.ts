"use server";

import { append, readAll } from "@/lib/store";

/** Adds an address to the festive-updates list in the footer. */
export async function subscribe(email: unknown): Promise<{ ok: boolean; error?: string }> {
  const value = String(email ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 120);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  try {
    const existing = await readAll<{ email: string }>("subscribers.json");
    if (existing.some((row) => row.email === value)) return { ok: true }; // already on the list
    await append("subscribers.json", { email: value, createdAt: new Date().toISOString() });
  } catch (error) {
    console.error("subscribe failed", error);
    return { ok: false, error: "We couldn't add you — please try again." };
  }
  return { ok: true };
}
