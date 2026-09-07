"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { COLOR_VARIANTS } from "@/lib/product";
import { useCart } from "@/context/CartContext";

const stages = ["bg-dawn", "bg-sky", "bg-mint", "bg-sand"] as const;

export default function ColorShowcase() {
  const { setSelectedVariant } = useCart();
  const reduce = useReducedMotion();

  const scrollToProduct = (variantId: string) => {
    const variant = COLOR_VARIANTS.find((v) => v.id === variantId);
    if (variant) setSelectedVariant(variant);
    document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="page-gutter py-8 md:py-10">
      <div className="paper-card p-6 md:p-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="eyebrow mb-2">Four colourways</p>
          <h2 className="display text-4xl md:text-5xl">Pick your style</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {COLOR_VARIANTS.map((variant, i) => (
            <motion.button
              key={variant.id}
              type="button"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              onClick={() => scrollToProduct(variant.id)}
              className="group rounded-[8px] border-2 border-vast bg-paper p-3 text-left md:p-4"
            >
              <div
                className={`relative mb-3 aspect-square overflow-hidden rounded-[8px] border-2 border-vast ${stages[i]}`}
              >
                <Image
                  src={variant.image}
                  alt={`Bukket ${variant.name}`}
                  fill
                  className="object-contain p-2 transition group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <p className="text-sm font-bold">{variant.bodyColor}</p>
              <p className="text-xs text-grey-700">{variant.baseColor} base</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
