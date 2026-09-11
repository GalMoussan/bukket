"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCT } from "@/lib/product";
import Wordmark from "./Wordmark";
import { puffSmoke } from "./SmokeLayer";

export default function Header() {
  const { openCart, addToCart, itemCount } = useCart();

  return (
    <header className="sticky top-2 z-50 page-gutter">
      <div className="relative rounded-xl bg-raised/90 px-2 py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] backdrop-blur-md md:px-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/#how-it-works"
              className="btn btn-secondary px-3 sm:px-[1.05rem]"
              aria-label="How it works"
            >
              <span className="sm:hidden">Watch</span>
              <span className="hidden sm:inline">How it works</span>
            </Link>
            <Link href="/terms" className="btn btn-chip px-3">
              Terms
            </Link>
            <Link href="/contact" className="btn btn-chip px-3">
              Contact
            </Link>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 hidden -translate-x-1/2 text-cream lg:block"
          >
            <Wordmark className="whitespace-nowrap text-xl" />
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:block">
              <button
                type="button"
                onClick={(event) => {
                  puffSmoke(event);
                  addToCart();
                }}
                className="btn btn-primary"
              >
                Add to bag · ${PRODUCT.price.toFixed(2)}
              </button>
            </div>
            <button
              type="button"
              onClick={openCart}
              className="btn btn-chip relative"
              aria-label={itemCount > 0 ? `Bag, ${itemCount} items` : "Bag"}
            >
              Bag
              {itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <Link
          href="/"
          className="mt-1 flex justify-center pt-1 text-cream lg:hidden"
        >
          <Wordmark className="text-lg sm:text-xl" />
        </Link>
      </div>
    </header>
  );
}
