"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useWishlist } from "@/lib/wishlist-context";
import { getProduct } from "@/lib/products";
import { ProductCard } from "@/components/home/ProductCard";

export default function WishlistPage() {
  const t = useTranslations("wishlist");
  const tc = useTranslations("cart");
  const wishlist = useWishlist();

  const lines = wishlist.items
    .map((item) => {
      const product = getProduct(item.slug);
      return product ? { product, color: item.color } : null;
    })
    .filter((line) => line !== null);

  return (
    <div className="px-6 py-14 sm:px-10">
      <div className="text-center">
        <h1 className="font-serif text-2xl font-medium text-ink sm:text-3xl">
          {t("pageHeading")}
        </h1>
        <p className="mt-2 text-sm text-ink/50">
          {t("itemCount", { count: wishlist.count })}
        </p>
      </div>

      {lines.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-6 text-center">
          <p className="text-sm text-ink/60">{t("emptyText")}</p>
          <Link
            href="/"
            className="bg-olive px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-dark"
          >
            {tc("browseCollection")}
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {lines.map(({ product, color }) => (
            <ProductCard key={product.slug} product={product} initialColor={color} />
          ))}
        </div>
      )}
    </div>
  );
}
