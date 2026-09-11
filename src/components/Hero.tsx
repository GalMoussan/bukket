"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { PRODUCT } from "@/lib/product";
import ColorPicker from "./ColorPicker";
import SageCircle from "./SageCircle";
import { puffSmoke } from "./SmokeLayer";

export default function Hero() {
  const { selectedVariant, addToCart } = useCart();
  const reduce = useReducedMotion();

  return (
    <section id="product" className="page-gutter relative overflow-x-clip pt-4 md:pt-5">
      {!reduce && (
        <>
          <span className="smoke-wisp -left-24 top-8 hidden md:block" />
          <span className="smoke-wisp smoke-wisp-b -right-28 top-24 hidden md:block" />
          <span className="smoke-wisp -right-16 bottom-[-4rem] hidden lg:block" />
        </>
      )}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="grid items-center gap-6 py-4 md:grid-cols-2 md:gap-10 md:py-6"
      >
        <div className="order-2 md:order-1">
          <p className="eyebrow mb-2">Gravity bong</p>
          <h1 className="display mb-4 text-5xl md:text-6xl">
            {PRODUCT.name}
          </h1>
          <p className="mb-5 max-w-[54ch] text-base leading-relaxed text-muted md:text-lg">
            {PRODUCT.tagline}. {PRODUCT.description}
          </p>

          <div className="mb-5">
            <ColorPicker />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="display text-3xl md:text-4xl">
              ${PRODUCT.price.toFixed(2)}
            </span>
            <button
              type="button"
              onClick={(event) => {
                puffSmoke(event);
                addToCart();
              }}
              className="btn btn-primary"
            >
              Add to Bag
            </button>
          </div>

          <p className="mt-3 text-sm text-muted">
            Free shipping on orders over $50 · 30-day returns
          </p>
        </div>

        <div className="relative order-1 flex items-center justify-center md:order-2">
          <SageCircle />
          <div className="relative z-10 aspect-square w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedVariant.id}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedVariant.image}
                  alt={`Bukket in ${selectedVariant.name}`}
                  fill
                  className="object-contain p-8 md:p-10"
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
