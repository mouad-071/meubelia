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

export interface WishlistItem {
  slug: ProductSlug;
  color: ColorKey;
}

interface WishlistContextValue {
  items: WishlistItem[];
  isWished: (slug: ProductSlug, color: ColorKey) => boolean;
  toggle: (slug: ProductSlug, color: ColorKey) => void;
  removeItem: (slug: ProductSlug, color: ColorKey) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "meubelia_wishlist_v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Synced from localStorage after mount: the server can't know this, so
    // this corrects the initial empty-wishlist render rather than causing a
    // hydration mismatch.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage unavailable — wishlist just stays empty for this session
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore — wishlist still works for this render, just won't persist
    }
  }, [items, hydrated]);

  const isWished = useCallback(
    (slug: ProductSlug, color: ColorKey) =>
      items.some((i) => i.slug === slug && i.color === color),
    [items],
  );

  const toggle = useCallback((slug: ProductSlug, color: ColorKey) => {
    setItems((prev) =>
      prev.some((i) => i.slug === slug && i.color === color)
        ? prev.filter((i) => !(i.slug === slug && i.color === color))
        : [...prev, { slug, color }],
    );
  }, []);

  const removeItem = useCallback((slug: ProductSlug, color: ColorKey) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.color === color)));
  }, []);

  const count = items.length;

  const value = useMemo(
    () => ({ items, isWished, toggle, removeItem, count }),
    [items, isWished, toggle, removeItem, count],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
