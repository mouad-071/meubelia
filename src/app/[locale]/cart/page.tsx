"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CloseIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";
import { useResolvedCart } from "@/lib/useResolvedCart";
import { formatPrice } from "@/lib/format-price";

const TAX_RATE = 0.08;

export default function CartPage() {
  const t = useTranslations("cart");
  const tp = useTranslations("bestSellers");
  const locale = useLocale();
  const cart = useCart();
  const { lines, subtotal } = useResolvedCart();

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  if (!cart.ready) return null;

  if (lines.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <div>
          <h1 className="font-serif text-2xl font-medium text-ink">
            {t("emptyHeading")}
          </h1>
          <p className="mt-2 text-sm text-ink/60">{t("emptyText")}</p>
        </div>
        <Link
          href="/"
          className="bg-olive px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-olive-dark"
        >
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-baseline gap-4">
          <Link href="/" className="text-sm text-ink/60 hover:text-ink">
            ← {t("back")}
          </Link>
          <h1 className="font-serif text-3xl font-medium text-ink">
            {t("heading")}
          </h1>
        </div>
        <Link href="/" className="text-sm text-ink/60 underline underline-offset-4 hover:text-ink">
          {t("continueShopping")}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-8 border-t border-line pt-6 lg:grid-cols-[1fr_auto_auto_auto]">
        <span className="hidden text-xs tracking-wide text-ink/50 uppercase lg:block">
          {t("orderSummary")}
        </span>
        <span className="hidden w-24 text-right text-xs tracking-wide text-ink/50 uppercase lg:block">
          {t("priceHeading")}
        </span>
        <span className="hidden w-28 text-center text-xs tracking-wide text-ink/50 uppercase lg:block">
          {t("quantityHeading")}
        </span>
        <span className="hidden w-24 text-right text-xs tracking-wide text-ink/50 uppercase lg:block">
          {t("totalHeading")}
        </span>
      </div>

      <ul>
        {lines.map((line) => (
          <li
            key={`${line.item.slug}-${line.item.color}`}
            className="grid grid-cols-1 items-center gap-4 border-b border-line py-6 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-8"
          >
            <div className="flex gap-4">
              <div className="relative size-24 shrink-0 overflow-hidden bg-sand">
                <Image
                  src={line.variant.image}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <Link href={`/products/${line.item.slug}`}>
                    <p className="text-sm font-medium text-ink hover:text-olive">
                      {tp(`products.${line.product.slug}.name`)}
                    </p>
                  </Link>
                  <button
                    type="button"
                    onClick={() => cart.removeItem(line.item.slug, line.item.color)}
                    aria-label={t("remove")}
                    className="cursor-pointer text-ink/40 hover:text-ink"
                  >
                    <CloseIcon className="size-3.5" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-ink/50">
                  {tp(`colors.${line.item.color}`)}
                </p>
                <p className="mt-2 text-sm font-medium text-ink lg:hidden">
                  {formatPrice(line.variant.price, locale)}
                </p>
              </div>
            </div>

            <span className="hidden w-24 text-right text-sm text-ink lg:block">
              {formatPrice(line.variant.price, locale)}
            </span>

            <div className="flex w-28 items-center justify-start gap-0 border border-line lg:justify-center">
              <button
                type="button"
                onClick={() =>
                  cart.setQty(line.item.slug, line.item.color, line.item.qty - 1)
                }
                aria-label="−"
                className="cursor-pointer px-3 py-1.5 text-ink hover:bg-sand"
              >
                −
              </button>
              <span className="w-8 text-center text-sm text-ink">{line.item.qty}</span>
              <button
                type="button"
                onClick={() =>
                  cart.setQty(line.item.slug, line.item.color, line.item.qty + 1)
                }
                aria-label="+"
                className="cursor-pointer px-3 py-1.5 text-ink hover:bg-sand"
              >
                +
              </button>
            </div>

            <span className="w-24 text-right text-sm font-medium text-ink">
              {formatPrice(line.lineTotal, locale)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-end">
        <div className="w-full max-w-sm space-y-2.5">
          <div className="flex justify-between text-sm text-ink/70">
            <span>{t("subtotal", { count: cart.count })}</span>
            <span>{formatPrice(subtotal, locale)}</span>
          </div>
          <div className="flex justify-between text-sm text-ink/70">
            <span>{t("tax")}</span>
            <span>{formatPrice(tax, locale)}</span>
          </div>
          <div className="flex justify-between text-sm text-ink/70">
            <span>{t("shipping")}</span>
            <span>{t("free")}</span>
          </div>
          <div className="flex justify-between border-t border-line pt-2.5 text-sm font-semibold text-ink">
            <span>{t("totalOrder")}</span>
            <span>{formatPrice(total, locale)}</span>
          </div>
          <p className="pt-1 text-xs text-ink/50">{t("taxNote")}</p>

          <Link
            href="/checkout"
            className="mt-4 block w-full bg-olive py-3.5 text-center text-sm font-medium tracking-wide text-white transition-colors hover:bg-olive-dark"
          >
            {t("next")}
          </Link>
        </div>
      </div>
    </div>
  );
}
