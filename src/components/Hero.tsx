"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { PRODUCT } from "@/lib/product";
import ColorPicker from "./ColorPicker";

const stageFor: Record<string, string> = {
  "purple-green": "bg-dawn",
  "blue-yellow": "bg-sky",
  "blue-green": "bg-mint",
  "purple-yellow": "bg-sand",
};

export default function Hero() {
  const { selectedVariant, addToCart } = useCart();
  const reduce = useReducedMotion();

  return (
    <section id="product" className="page-gutter pt-8 md:pt-12">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
        className="paper-card grid items-center gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-12 lg:p-16"
      >
        <div className="order-2 md:order-1">
          <p className="eyebrow mb-3">Gravity bong</p>
          <h1 className="display mb-5 text-5xl md:text-6xl lg:text-7xl">
            {PRODUCT.name}
          </h1>
          <p className="mb-8 max-w-[58ch] text-lg leading-relaxed text-grey-700">
            {PRODUCT.tagline}. {PRODUCT.description}
          </p>

          <div className="mb-8">
            <ColorPicker />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="display text-3xl md:text-4xl">
              ${PRODUCT.price.toFixed(2)}
            </span>
            <button type="button" onClick={addToCart} className="btn btn-primary">
              Add to Bag
            </button>
          </div>

          <p className="mt-4 text-sm text-grey-700">
            Free shipping on orders over $50 · 30-day returns
          </p>
        </div>

        <div className="order-1 flex items-center justify-center md:order-2">
          <div
            className={`relative aspect-square w-full max-w-md overflow-hidden rounded-[16px] border-2 border-vast md:max-w-lg ${stageFor[selectedVariant.id] ?? "bg-mint"}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedVariant.id}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedVariant.image}
                  alt={`Bukket in ${selectedVariant.name}`}
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
