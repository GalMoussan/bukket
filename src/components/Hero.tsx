"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { PRODUCT } from "@/lib/product";
import ColorPicker from "./ColorPicker";

export default function Hero() {
  const { selectedVariant, addToCart } = useCart();

  return (
    <section
      id="product"
      className="relative min-h-screen overflow-hidden pt-16 md:pt-[72px]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px] transition-colors duration-700"
          style={{ backgroundColor: selectedVariant.hex.body }}
        />
        <div
          className="absolute right-1/4 top-2/3 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px] transition-colors duration-700"
          style={{ backgroundColor: selectedVariant.hex.base }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-2 md:gap-12 md:px-8 md:py-20">
        <div className="order-2 md:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-[#B8E638]"
          >
            Gravity Bong
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            {PRODUCT.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 max-w-md text-lg text-white/60"
          >
            {PRODUCT.tagline}. {PRODUCT.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <ColorPicker />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <span className="text-3xl font-bold md:text-4xl">
              ${PRODUCT.price.toFixed(2)}
            </span>
            <button
              onClick={addToCart}
              className="rounded-xl bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]"
            >
              Add to Bag
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-xs text-white/40"
          >
            Free shipping on orders over $50 · 30-day returns
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="order-1 flex items-center justify-center md:order-2"
        >
          <div className="relative aspect-square w-full max-w-md md:max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedVariant.id}
                initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedVariant.image}
                  alt={`Bukket in ${selectedVariant.name}`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}