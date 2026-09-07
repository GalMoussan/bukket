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
            className="fixed inset-0 z-[60]"
            style={{ background: "color-mix(in srgb, var(--vast) 40%, transparent)" }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l-2 border-vast bg-lumen"
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
          >
            <div className="flex items-center justify-between border-b-2 border-vast px-6 py-5">
              <h2 className="display text-2xl">Your Bag</h2>
              <button
                type="button"
                onClick={closeCart}
                className="btn btn-ghost px-3"
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
                  <p className="mb-2 text-grey-700">Your bag is empty</p>
                  <button type="button" onClick={closeCart} className="text-sm font-bold text-umbra underline">
                    Continue shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.variant.id}
                      className="flex gap-4 rounded-[8px] border-2 border-vast bg-paper p-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[4px] border-2 border-vast bg-mint">
                        <Image
                          src={item.variant.image}
                          alt={item.variant.name}
                          fill
                          sizes="80px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold">{PRODUCT.name}</p>
                            <p className="text-sm text-grey-700">{item.variant.name}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.variant.id)}
                            className="text-grey-500 hover:text-vast"
                            aria-label={`Remove ${item.variant.name}`}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.variant.id, item.quantity - 1)
                              }
                              className="qty-btn"
                              aria-label={`Decrease quantity of ${item.variant.name}`}
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.variant.id, item.quantity + 1)
                              }
                              className="qty-btn"
                              aria-label={`Increase quantity of ${item.variant.name}`}
                            >
                              +
                            </button>
                          </div>
                          <p className="font-bold">
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
              <div className="border-t-2 border-vast bg-paper px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-grey-700">Subtotal</span>
                  <span className="display text-2xl">${total.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn btn-primary w-full"
                >
                  Checkout
                </Link>
                <p className="mt-3 text-center text-xs text-grey-700">
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
