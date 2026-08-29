"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { HeartIcon } from "@/components/icons";
import { colorSwatches, type ColorKey, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/format-price";
import { useWishlist } from "@/lib/wishlist-context";

export function ProductCard({
  product,
  initialColor,
}: {
  product: Product;
  initialColor?: ColorKey;
}) {
  const t = useTranslations("bestSellers");
  const locale = useLocale();
  const wishlist = useWishlist();
  const [activeIndex, setActiveIndex] = useState(() => {
    if (!initialColor) return 0;
    const index = product.variants.findIndex((v) => v.color === initialColor);
    return index === -1 ? 0 : index;
  });

  const active = product.variants[activeIndex];
  const price = formatPrice(active.price, locale);
  const wished = wishlist.isWished(product.slug, active.color);

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 block"
        >
          <Image
            src={active.image}
            alt={t(`products.${product.slug}.name`)}
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src={active.hoverImage}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </Link>
        <button
          type="button"
          onClick={() => wishlist.toggle(product.slug, active.color)}
          aria-label={t("addToWishlist")}
          aria-pressed={wished}
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-ink cursor-pointer"
        >
          <HeartIcon filled={wished} className="size-4" />
        </button>
      </div>

      <Link href={`/products/${product.slug}`}>
        <h3 className="mt-4 text-sm font-medium text-ink transition-colors hover:text-olive">
          {t(`products.${product.slug}.name`)}
        </h3>
      </Link>
      <p className="mt-1 text-sm text-ink/50">
        {t(`products.${product.slug}.collection`)}
      </p>
      <p className="mt-1 text-sm font-semibold text-ink">{price}</p>

      <div className="mt-3 flex items-center gap-2">
        {product.variants.map((variant, index) => (
          <button
            key={variant.color}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={t(`colors.${variant.color}`)}
            aria-pressed={index === activeIndex}
            className={`size-4 cursor-pointer rounded-full ring-offset-2 transition-shadow ${
              index === activeIndex ? "ring-1 ring-ink" : ""
            }`}
            style={{ backgroundColor: colorSwatches[variant.color] }}
          />
        ))}
      </div>
    </div>
  );
}
