"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { COLOR_VARIANTS } from "@/lib/product";
import { useCart } from "@/context/CartContext";

export default function ColorShowcase() {
  const { setSelectedVariant } = useCart();
  const reduce = useReducedMotion();

  const scrollToProduct = (variantId: string) => {
    const variant = COLOR_VARIANTS.find((v) => v.id === variantId);
    if (variant) setSelectedVariant(variant);
    document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="page-gutter py-10 md:py-14">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <p className="eyebrow mb-2">Four colourways</p>
        <h2 className="display text-4xl md:text-5xl">Pick your style</h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {COLOR_VARIANTS.map((variant, i) => (
          <motion.button
            key={variant.id}
            type="button"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            onClick={() => scrollToProduct(variant.id)}
            className="group rounded-xl bg-raised p-3 text-left shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] md:p-4"
          >
            <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-dusk">
              <Image
                src={variant.image}
                alt={`Bukket ${variant.name}`}
                fill
                className="object-contain p-2 transition group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <p className="text-sm font-bold">{variant.bodyColor}</p>
            <p className="text-xs text-muted">{variant.baseColor} base</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
