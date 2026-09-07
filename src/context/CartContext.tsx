"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { COLOR_VARIANTS, PRODUCT, type ColorVariant } from "@/lib/product";

export type CartItem = {
  variant: ColorVariant;
  quantity: number;
};

const CART_STORAGE_KEY = "bukket-cart";
const EMPTY_ITEMS: CartItem[] = [];

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

type Listener = () => void;

let cartItems: CartItem[] = EMPTY_ITEMS;
let cartLoaded = false;
const cartListeners = new Set<Listener>();

function parseCart(raw: string | null): CartItem[] {
  if (!raw) return EMPTY_ITEMS;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_ITEMS;
    const items = parsed.flatMap((entry) => {
      if (!entry || typeof entry !== "object") return [];
      const record = entry as { variant?: { id?: string }; quantity?: unknown };
      const variant = COLOR_VARIANTS.find((v) => v.id === record.variant?.id);
      const quantity = Number(record.quantity);
      if (!variant || !Number.isInteger(quantity) || quantity < 1) return [];
      return [{ variant, quantity }];
    });
    return items.length === 0 ? EMPTY_ITEMS : items;
  } catch {
    return EMPTY_ITEMS;
  }
}

function emitCart() {
  cartListeners.forEach((listener) => listener());
}

function loadCart() {
  if (cartLoaded) return;
  cartLoaded = true;
  if (typeof window === "undefined") return;
  try {
    cartItems = parseCart(localStorage.getItem(CART_STORAGE_KEY));
  } catch {
    cartItems = EMPTY_ITEMS;
  }
}

function getCartSnapshot() {
  loadCart();
  return cartItems;
}

function getServerCartSnapshot() {
  return EMPTY_ITEMS;
}

function subscribeCart(listener: Listener) {
  cartListeners.add(listener);
  return () => {
    cartListeners.delete(listener);
  };
}

function setCartItems(updater: (prev: CartItem[]) => CartItem[]) {
  const next = updater(cartItems);
  cartItems = next.length === 0 ? EMPTY_ITEMS : next;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Private mode can block storage; keep the in-memory cart.
    }
  }
  emitCart();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getServerCartSnapshot
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ColorVariant>(
    COLOR_VARIANTS[0]
  );

  const addToCart = useCallback(() => {
    setCartItems((prev) => {
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
    setCartItems((prev) => prev.filter((i) => i.variant.id !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.variant.id !== variantId));
      return;
    }
    setCartItems((prev) =>
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