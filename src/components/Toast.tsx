"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function Toast() {
  const { notice } = useCart();

  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed bottom-6 left-1/2 z-[90] w-[92%] max-w-md -translate-x-1/2"
          role="status"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-wine px-5 py-4 text-sm text-cream shadow-2xl">
            <Info className="h-4 w-4 shrink-0 text-gold-light" />
            <span>{notice}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
