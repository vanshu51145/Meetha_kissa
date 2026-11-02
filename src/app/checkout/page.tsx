import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your order of handcrafted mithai — pay on delivery or online, delivered fresh across Delhi NCR.",
  robots: { index: false },
};

export default function CheckoutPage() {
  const onlinePayment = Boolean(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET,
  );

  return <CheckoutForm onlinePayment={onlinePayment} />;
}
