"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COLOR_VARIANTS } from "@/lib/product";
import { useCart } from "@/context/CartContext";

export default function ColorShowcase() {
  const { setSelectedVariant } = useCart();

  const scrollToProduct = (variantId: string) => {
    const variant = COLOR_VARIANTS.find((v) => v.id === variantId);
    if (variant) setSelectedVariant(variant);
    document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#B8E638]">
            4 Colors
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">Pick Your Style</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {COLOR_VARIANTS.map((variant, i) => (
            <motion.button
              key={variant.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => scrollToProduct(variant.id)}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10 md:p-6"
            >
              <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-[#1a1a24]">
                <Image
                  src={variant.image}
                  alt={`Bukket ${variant.name}`}
                  fill
                  className="object-contain p-2 transition group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <p className="text-sm font-medium">{variant.bodyColor}</p>
              <p className="text-xs text-white/40">{variant.baseColor} base</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}