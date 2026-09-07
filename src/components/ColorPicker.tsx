"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { COLOR_VARIANTS } from "@/lib/product";

export default function ColorPicker() {
  const { selectedVariant, setSelectedVariant } = useCart();

  return (
    <div>
      <p className="mb-3 text-sm font-bold text-muted">
        Color — <span className="text-cream">{selectedVariant.name}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        {COLOR_VARIANTS.map((variant) => {
          const isSelected = selectedVariant.id === variant.id;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => setSelectedVariant(variant)}
              aria-label={variant.name}
              aria-pressed={isSelected}
              className={`relative h-12 w-12 overflow-hidden rounded-lg bg-dusk ${
                isSelected
                  ? "ring-2 ring-terracotta ring-offset-2 ring-offset-night"
                  : "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]"
              }`}
            >
              <Image
                src={variant.image}
                alt=""
                fill
                className="object-contain p-1"
                sizes="48px"
                loading="eager"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
