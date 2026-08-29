"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CloseIcon } from "@/components/icons";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { getProduct, getVariant } from "@/lib/products";
import { formatPrice } from "@/lib/format-price";

export function WishlistDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("wishlist");
  const tp = useTranslations("bestSellers");
  const locale = useLocale();
  const wishlist = useWishlist();
  const cart = useCart();

  const lines = wishlist.items
    .map((item) => {
      const product = getProduct(item.slug);
      if (!product) return null;
      const variant = getVariant(product, item.color);
      if (!variant) return null;
      return { item, product, variant };
    })
    .filter((line) => line !== null);

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("heading")}
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-400 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          {lines.length > 0 ? (
            <h2 className="text-lg font-medium text-ink">{t("heading")}</h2>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={t("remove")}
            className="cursor-pointer text-ink"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8 text-center">
            <h3 className="text-base font-semibold text-ink">
              {t("emptyHeading")}
            </h3>
            <p className="text-sm text-ink/60">{t("emptyText")}</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="space-y-5">
                {lines.map((line) => (
                  <li key={`${line.item.slug}-${line.item.color}`} className="flex gap-3">
                    <Link
                      href={`/products/${line.item.slug}`}
                      onClick={onClose}
                      className="relative size-20 shrink-0 overflow-hidden bg-sand"
                    >
                      <Image
                        src={line.variant.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/products/${line.item.slug}`} onClick={onClose}>
                          <p className="text-sm font-medium text-ink hover:text-olive">
                            {tp(`products.${line.product.slug}.name`)}
                          </p>
                        </Link>
                        <button
                          type="button"
                          onClick={() => wishlist.removeItem(line.item.slug, line.item.color)}
                          aria-label={t("remove")}
                          className="cursor-pointer text-ink/40 hover:text-ink"
                        >
                          <CloseIcon className="size-3.5" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-ink/50">
                        {tp(`colors.${line.item.color}`)}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm font-medium text-ink">
                          {formatPrice(line.variant.price, locale)}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            cart.addItem(line.item.slug, line.item.color);
                            wishlist.removeItem(line.item.slug, line.item.color);
                          }}
                          className="cursor-pointer text-xs font-medium text-olive underline underline-offset-2 hover:text-olive-dark"
                        >
                          {t("moveToCart")}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line px-6 py-5">
              <Link
                href="/wishlist"
                onClick={onClose}
                className="block w-full cursor-pointer border border-ink py-3 text-center text-sm font-medium tracking-wide text-ink transition-colors hover:bg-ink hover:text-white"
              >
                {t("viewFullWishlist")}
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
