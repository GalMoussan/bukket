"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { PRODUCT } from "@/lib/product";

export default function StickyBuyBar() {
  const { selectedVariant, addToCart } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center justify-between px-5 py-3">
            <div>
              <p className="text-sm font-medium">{PRODUCT.name}</p>
              <p className="text-xs text-white/50">{selectedVariant.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold">${PRODUCT.price.toFixed(2)}</span>
              <button
                onClick={addToCart}
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}