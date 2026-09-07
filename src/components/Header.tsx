"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCT } from "@/lib/product";
import Wordmark from "./Wordmark";

export default function Header() {
  const { openCart, addToCart, itemCount } = useCart();

  return (
    <header className="sticky top-3 z-50 page-gutter">
      <div className="relative flex items-center justify-between gap-2 rounded-[4px] border-2 border-vast bg-paper px-2 py-2 md:px-3">
        <div className="hidden sm:block">
          <Link href="/#how-it-works" className="btn btn-secondary">
            How it works
          </Link>
        </div>
        <div className="sm:hidden">
          <Link href="/#how-it-works" className="btn btn-secondary" aria-label="How it works">
            Watch
          </Link>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Wordmark className="text-lg md:text-2xl" />
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <button type="button" onClick={addToCart} className="btn btn-primary">
              Add to bag · ${PRODUCT.price.toFixed(2)}
            </button>
          </div>
          <button
            type="button"
            onClick={openCart}
            className="btn btn-ghost relative"
            aria-label={itemCount > 0 ? `Bag, ${itemCount} items` : "Bag"}
          >
            Bag
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-vast bg-glow px-1 text-[10px] font-bold">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
