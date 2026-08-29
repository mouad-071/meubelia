"use client";

import { useMemo } from "react";
import { useCart, type CartItem } from "./cart-context";
import { getProduct, getVariant, type Product, type ProductVariant } from "./products";

export interface ResolvedCartLine {
  item: CartItem;
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
}

export function useResolvedCart(): {
  lines: ResolvedCartLine[];
  subtotal: number;
} {
  const { items } = useCart();

  return useMemo(() => {
    const lines: ResolvedCartLine[] = [];
    for (const item of items) {
      const product = getProduct(item.slug);
      if (!product) continue;
      const variant = getVariant(product, item.color);
      if (!variant) continue;
      lines.push({ item, product, variant, lineTotal: variant.price * item.qty });
    }
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    return { lines, subtotal };
  }, [items]);
}
