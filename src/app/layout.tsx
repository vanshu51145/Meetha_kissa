import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { MotionConfig } from "framer-motion";
import { CartProvider } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import QuickView from "@/components/QuickView";
import Toast from "@/components/Toast";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meethakissa.in"),
  title: {
    default: "Meetha Kissa — Handcrafted Indian Mithai | Maa se Pyar se",
    template: "%s · Meetha Kissa",
  },
  description:
    "Handcrafted Indian sweets made in small batches with pure ghee, traditional recipes and a whole lot of love. Kaju Katli, Ladoo, Barfi, Bengali sweets and premium gift boxes.",
  keywords: [
    "indian sweets",
    "mithai",
    "kaju katli",
    "ladoo",
    "barfi",
    "gulab jamun",
    "rasmalai",
    "indian sweets gift box",
  ],
  openGraph: {
    title: "Meetha Kissa — Handcrafted Indian Mithai",
    description:
      "Tradition, crafted with love. Premium handcrafted mithai, gift boxes and festive classics.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#4c1019",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <MotionConfig reducedMotion="user">
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <SearchOverlay />
            <QuickView />
            <Toast />
          </CartProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
