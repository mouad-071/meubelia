"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ColorKey, ProductSlug } from "./products";

export interface CartItem {
  slug: ProductSlug;
  color: ColorKey;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (slug: ProductSlug, color: ColorKey, qty?: number) => void;
  removeItem: (slug: ProductSlug, color: ColorKey) => void;
  setQty: (slug: ProductSlug, color: ColorKey, qty: number) => void;
  clear: () => void;
  count: number;
  /** False until the cart has finished reading from localStorage — an empty
   * cart isn't known to be genuinely empty until this is true. */
  ready: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "meubelia_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Synced from localStorage after mount: the server can't know this, so
    // this corrects the initial empty-cart render rather than causing a
    // hydration mismatch.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage unavailable — cart just stays empty for this session
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore — cart still works for this render, just won't persist
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (slug: ProductSlug, color: ColorKey, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.slug === slug && i.color === color);
        if (existing) {
          return prev.map((i) =>
            i === existing ? { ...i, qty: i.qty + qty } : i,
          );
        }
        return [...prev, { slug, color, qty }];
      });
    },
    [],
  );

  const removeItem = useCallback((slug: ProductSlug, color: ColorKey) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.color === color)));
  }, []);

  const setQty = useCallback((slug: ProductSlug, color: ColorKey, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) {
        return prev.filter((i) => !(i.slug === slug && i.color === color));
      }
      return prev.map((i) =>
        i.slug === slug && i.color === color ? { ...i, qty } : i,
      );
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, setQty, clear, count, ready: hydrated }),
    [items, addItem, removeItem, setQty, clear, count, hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
