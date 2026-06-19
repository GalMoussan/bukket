"use client";

import { useCart } from "@/context/CartContext";
import { COLOR_VARIANTS } from "@/lib/product";
import { motion } from "framer-motion";

export default function ColorPicker() {
  const { selectedVariant, setSelectedVariant } = useCart();

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-white/50">
        Color —{" "}
        <span className="text-white">{selectedVariant.name}</span>
      </p>
      <div className="flex gap-3">
        {COLOR_VARIANTS.map((variant) => {
          const isSelected = selectedVariant.id === variant.id;
          return (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              aria-label={variant.name}
              className="group relative"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-[#0a0a0f] transition ${
                  isSelected
                    ? "ring-white"
                    : "ring-transparent hover:ring-white/30"
                }`}
              >
                <div
                  className="absolute inset-0 top-0 h-1/2"
                  style={{ backgroundColor: variant.hex.body }}
                />
                <div
                  className="absolute inset-0 bottom-0 top-1/2"
                  style={{ backgroundColor: variant.hex.base }}
                />
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}