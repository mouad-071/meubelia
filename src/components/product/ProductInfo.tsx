"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { HeartIcon, ReturnIcon } from "@/components/icons";
import { colorSwatches, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/format-price";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { Accordion } from "./Accordion";

export function ProductInfo({ product }: { product: Product }) {
  const t = useTranslations("bestSellers");
  const td = useTranslations("productDetail");
  const locale = useLocale();
  const cart = useCart();
  const wishlist = useWishlist();

  const [colorIndex, setColorIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants[colorIndex];
  const price = formatPrice(variant.price, locale);
  const wished = wishlist.isWished(product.slug, variant.color);

  const specs = t.raw(`products.${product.slug}.specs`) as {
    label: string;
    value: string;
  }[];
  const materialTags = t.raw(`products.${product.slug}.materialTags`) as string[];

  function handleAddToCart() {
    cart.addItem(product.slug, variant.color, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      <p className="text-xs tracking-[0.15em] text-ink/50 uppercase">
        {t(`products.${product.slug}.collection`)}
      </p>
      <h1 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl">
        {t(`products.${product.slug}.name`)}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-ink/70">
        {t(`products.${product.slug}.description`)}
      </p>

      <p className="mt-6 text-2xl font-semibold text-ink">{price}</p>

      <div className="mt-6">
        <p className="mb-2 text-xs tracking-wide text-ink/50 uppercase">
          {td("colors")}
        </p>
        <div className="flex items-center gap-2">
          {product.variants.map((v, i) => (
            <button
              key={v.color}
              type="button"
              onClick={() => setColorIndex(i)}
              aria-label={t(`colors.${v.color}`)}
              aria-pressed={i === colorIndex}
              className={`size-6 cursor-pointer rounded-full ring-offset-2 transition-shadow ${
                i === colorIndex ? "ring-1 ring-ink" : ""
              }`}
              style={{ backgroundColor: colorSwatches[v.color] }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <p className="text-xs tracking-wide text-ink/50 uppercase">
          {td("quantity")}
        </p>
        <div className="flex items-center border border-line">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="−"
            className="cursor-pointer px-3 py-1.5 text-ink transition-colors hover:bg-sand"
          >
            −
          </button>
          <span className="w-8 text-center text-sm text-ink">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="+"
            className="cursor-pointer px-3 py-1.5 text-ink transition-colors hover:bg-sand"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-6 w-full cursor-pointer bg-olive py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-olive-dark"
      >
        {added ? td("addedToCart") : td("addToCart")}
      </button>
      <p className="mt-3 text-center text-xs tracking-wide text-ink/50 uppercase">
        {td("delivery")}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-5 text-xs text-ink/70">
        <span className="flex items-center gap-1.5">
          <ReturnIcon className="size-4" />
          {td("easyReturn")}
        </span>
        <button
          type="button"
          onClick={() => wishlist.toggle(product.slug, variant.color)}
          aria-pressed={wished}
          className="flex cursor-pointer items-center gap-1.5 hover:text-ink"
        >
          <HeartIcon filled={wished} className="size-4" />
          {wished ? td("inWishlist") : td("addToWishlist")}
        </button>
      </div>

      <div className="mt-8 bg-sand p-5">
        <h2 className="text-sm font-semibold text-ink">
          {t(`products.${product.slug}.material`)}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          {t(`products.${product.slug}.materialText`)}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {materialTags.map((tag) => (
            <span key={tag} className="bg-white px-3 py-1 text-xs text-ink">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Accordion heading={td("specsHeading")} defaultOpen>
          <dl className="space-y-2.5">
            {specs.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-4 text-sm">
                <dt className="text-ink/60">{spec.label}</dt>
                <dd className="text-right text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </Accordion>
        <Accordion heading={td("shippingHeading")}>
          <p className="text-sm leading-relaxed text-ink/70">
            {td("shippingText")}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            {td("returnsText")}
          </p>
        </Accordion>
      </div>
    </div>
  );
}
