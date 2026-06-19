"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { openCart, itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <a href="#" className="text-xl font-bold tracking-widest md:text-2xl">
          BUKKET
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#product"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Shop
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-white/60 transition hover:text-white"
          >
            How It Works
          </a>
          <a
            href="#features"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Features
          </a>
        </nav>

        <button
          onClick={openCart}
          className="relative flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Bag
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#B8E638] text-[10px] font-bold text-black">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}