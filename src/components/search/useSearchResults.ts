"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { colorSwatches, products, type ColorKey } from "@/lib/products";
import { contains, fold, matchesWordStart, uniqueByFold } from "@/lib/search";

const SUGGESTION_LIMIT = 5;
const CATEGORY_LIMIT = 5;
const PRODUCT_LIMIT = 7;

export type ProductHit = {
  key: string;
  slug: string;
  name: string;
  image: string;
};

export type SearchResults = {
  suggestions: string[];
  categories: string[];
  productHits: ProductHit[];
  hasMoreProducts: boolean;
  isEmpty: boolean;
};

type ProductCopy = {
  name: string;
  categoryLabel: string;
};

/**
 * Builds the localised search index once, then filters it on every keystroke.
 * The catalogue is small enough that this stays instant without debouncing.
 */
export function useSearchResults(query: string): SearchResults {
  const tMenu = useTranslations("megaMenu");
  const tProducts = useTranslations("bestSellers");
  const tColors = useTranslations("bestSellers.colors");

  const index = useMemo(() => {
    const categories = uniqueByFold([
      ...(tMenu.raw("furnitureItems") as string[]),
      ...(tMenu.raw("gardenItems") as string[]),
      ...(tMenu.raw("moreItems") as string[]),
    ]);

    const copy = tProducts.raw("products") as Record<string, ProductCopy>;

    const entries = products.flatMap((product) =>
      product.variants.map((variant) => ({
        key: `${product.slug}-${variant.color}`,
        slug: product.slug,
        name: copy[product.slug].name,
        categoryLabel: copy[product.slug].categoryLabel,
        color: tColors(variant.color),
        image: variant.image,
      })),
    );

    // Terms the customer might type: categories, product and colour names.
    const terms = uniqueByFold([
      ...categories,
      ...entries.map((entry) => entry.name),
      ...entries.map((entry) => entry.categoryLabel),
      ...Object.keys(colorSwatches).map((color) => tColors(color as ColorKey)),
    ]);

    return { categories, entries, terms };
  }, [tMenu, tProducts, tColors]);

  return useMemo(() => {
    const trimmed = query.trim();

    if (trimmed === "") {
      return {
        suggestions: [],
        categories: [],
        productHits: [],
        hasMoreProducts: false,
        isEmpty: false,
      };
    }

    const categories = index.categories
      .filter((category) => matchesWordStart(category, trimmed))
      .slice(0, CATEGORY_LIMIT);

    // Categories get their own column, so keep the suggestions complementary
    // instead of repeating the same words twice side by side.
    const shown = new Set(categories.map(fold));
    const suggestions = index.terms
      .filter((term) => matchesWordStart(term, trimmed) && !shown.has(fold(term)))
      .slice(0, SUGGESTION_LIMIT);

    const matchedProducts = index.entries.filter(
      (entry) =>
        contains(entry.name, trimmed) ||
        contains(entry.categoryLabel, trimmed) ||
        contains(entry.color, trimmed),
    );

    const productHits = matchedProducts
      .slice(0, PRODUCT_LIMIT)
      .map(({ key, slug, name, image }) => ({ key, slug, name, image }));

    return {
      suggestions,
      categories,
      productHits,
      hasMoreProducts: matchedProducts.length > PRODUCT_LIMIT,
      isEmpty:
        suggestions.length === 0 &&
        categories.length === 0 &&
        productHits.length === 0,
    };
  }, [index, query]);
}
