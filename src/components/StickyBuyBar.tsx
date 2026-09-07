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
          className="fixed bottom-3 left-3 right-3 z-40 md:hidden"
        >
          <div className="flex items-center justify-between rounded-[4px] border-2 border-vast bg-paper px-3 py-2">
            <div>
              <p className="text-sm font-bold">{PRODUCT.name}</p>
              <p className="text-xs text-grey-700">{selectedVariant.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold">${PRODUCT.price.toFixed(2)}</span>
              <button type="button" onClick={addToCart} className="btn btn-primary">
                Add to Bag
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
