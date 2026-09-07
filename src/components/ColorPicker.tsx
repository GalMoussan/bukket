"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { COLOR_VARIANTS } from "@/lib/product";

export default function ColorPicker() {
  const { selectedVariant, setSelectedVariant } = useCart();

  return (
    <div>
      <p className="mb-3 text-sm font-bold text-grey-700">
        Color — <span className="text-vast">{selectedVariant.name}</span>
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
              className={`relative h-14 w-14 overflow-hidden rounded-[4px] border-2 border-vast bg-linen ${
                isSelected ? "ring-2 ring-tide ring-offset-2 ring-offset-paper" : ""
              }`}
            >
              <Image
                src={variant.image}
                alt=""
                fill
                className="object-contain p-1"
                sizes="56px"
                loading="eager"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
