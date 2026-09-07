"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { PRODUCT } from "@/lib/product";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    total,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[#12121a] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="text-lg font-semibold">Your Bag</h2>
              <button
                onClick={closeCart}
                className="rounded-full p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
                aria-label="Close cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="mb-2 text-white/40">Your bag is empty</p>
                  <button
                    onClick={closeCart}
                    className="text-sm font-medium text-[#B8E638] hover:underline"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.variant.id}
                      className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#1a1a24]">
                        <Image
                          src={item.variant.image}
                          alt={item.variant.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{PRODUCT.name}</p>
                            <p className="text-sm text-white/50">
                              {item.variant.name}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.variant.id)}
                            className="text-white/30 transition hover:text-white/60"
                            aria-label="Remove item"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.variant.id,
                                  item.quantity - 1
                                )
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-sm transition hover:bg-white/5"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.variant.id,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-sm transition hover:bg-white/5"
                            >
                              +
                            </button>
                          </div>
                          <p className="font-medium">
                            ${(PRODUCT.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full rounded-xl bg-white py-4 text-center text-sm font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]"
                >
                  Checkout
                </Link>
                <p className="mt-3 text-center text-xs text-white/30">
                  Review your order — payment coming soon
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}