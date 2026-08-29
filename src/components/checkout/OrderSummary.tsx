"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useResolvedCart } from "@/lib/useResolvedCart";
import { formatPrice } from "@/lib/format-price";

const TAX_RATE = 0.08;

export function OrderSummary() {
  const t = useTranslations("cart");
  const tp = useTranslations("bestSellers");
  const locale = useLocale();
  const { lines, subtotal } = useResolvedCart();

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const count = lines.reduce((sum, line) => sum + line.item.qty, 0);

  return (
    <div className="bg-sand p-6">
      <h2 className="text-sm font-semibold text-ink">{t("heading")}</h2>

      <ul className="mt-5 max-h-96 space-y-4 overflow-y-auto pr-1">
        {lines.map((line) => (
          <li key={`${line.item.slug}-${line.item.color}`} className="flex gap-3">
            <div className="relative size-16 shrink-0 overflow-hidden bg-white">
              <Image
                src={line.variant.image}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
              <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-white">
                {line.item.qty}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-ink">
                {tp(`products.${line.product.slug}.name`)}
              </p>
              <p className="mt-0.5 text-xs text-ink/50">
                {tp(`colors.${line.item.color}`)}
              </p>
            </div>
            <p className="text-xs font-medium text-ink">
              {formatPrice(line.lineTotal, locale)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between text-ink/70">
          <span>{t("subtotal", { count })}</span>
          <span>{formatPrice(subtotal, locale)}</span>
        </div>
        <div className="flex justify-between text-ink/70">
          <span>{t("tax")}</span>
          <span>{formatPrice(tax, locale)}</span>
        </div>
        <div className="flex justify-between text-ink/70">
          <span>{t("shipping")}</span>
          <span>{t("free")}</span>
        </div>
        <div className="flex justify-between border-t border-line pt-2 font-semibold text-ink">
          <span>{t("totalOrder")}</span>
          <span>{formatPrice(total, locale)}</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-ink/50">{t("taxNote")}</p>
    </div>
  );
}

export { TAX_RATE };
