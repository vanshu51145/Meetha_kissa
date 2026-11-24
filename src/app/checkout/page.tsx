import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your order of handcrafted mithai — pay on delivery or online, thoughtfully prepared for you.",
  robots: { index: false },
};

export default function CheckoutPage() {
  const razorpayEnabled = Boolean(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET,
  );

  return (
    <section className="bg-[#F4EAD5]/30 py-20 sm:py-28">
      <CheckoutForm razorpayEnabled={razorpayEnabled} />
    </section>
  );
}
