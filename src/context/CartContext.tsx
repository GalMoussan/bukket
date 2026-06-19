"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { COLOR_VARIANTS, PRODUCT, type ColorVariant } from "@/lib/product";

export type CartItem = {
  variant: ColorVariant;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  selectedVariant: ColorVariant;
  setSelectedVariant: (variant: ColorVariant) => void;
  addToCart: () => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ColorVariant>(
    COLOR_VARIANTS[0]
  );

  const addToCart = useCallback(() => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variant.id === selectedVariant.id);
      if (existing) {
        return prev.map((i) =>
          i.variant.id === selectedVariant.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { variant: selectedVariant, quantity: 1 }];
    });
    setIsOpen(true);
  }, [selectedVariant]);

  const removeFromCart = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variant.id !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.variant.id !== variantId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.variant.id === variantId ? { ...i, quantity } : i
      )
    );
  }, []);

  const total = items.reduce(
    (sum, item) => sum + PRODUCT.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        selectedVariant,
        setSelectedVariant,
        addToCart,
        removeFromCart,
        updateQuantity,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}