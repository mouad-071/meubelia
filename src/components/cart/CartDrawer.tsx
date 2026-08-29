"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CloseIcon } from "@/components/icons";
import { useCart } from "@/lib/cart-context";
import { useResolvedCart } from "@/lib/useResolvedCart";
import { formatPrice } from "@/lib/format-price";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("cart");
  const tp = useTranslations("bestSellers");
  const locale = useLocale();
  const cart = useCart();
  const { lines, subtotal } = useResolvedCart();

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
            aria-label={t("back")}
            className="cursor-pointer text-ink"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <div>
              <h3 className="text-base font-semibold text-ink">
                {t("emptyHeading")}
              </h3>
              <p className="mt-2 text-sm text-ink/60">{t("emptyText")}</p>
            </div>
            <div className="flex w-full max-w-56 flex-col gap-3">
              <Link
                href="/#collection"
                onClick={onClose}
                className="bg-olive py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-olive-dark"
              >
                {t("browseCollection")}
              </Link>
              <Link
                href="/"
                onClick={onClose}
                className="bg-olive py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-olive-dark"
              >
                {t("browseNew")}
              </Link>
              <Link
                href="/#best-sellers"
                onClick={onClose}
                className="bg-olive py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-olive-dark"
              >
                {t("browseBestSellers")}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="space-y-5">
                {lines.map((line) => (
                  <li key={`${line.item.slug}-${line.item.color}`} className="flex gap-3">
                    <div className="relative size-20 shrink-0 overflow-hidden bg-sand">
                      <Image
                        src={line.variant.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-ink">
                          {tp(`products.${line.product.slug}.name`)}
                        </p>
                        <button
                          type="button"
                          onClick={() => cart.removeItem(line.item.slug, line.item.color)}
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
                        <div className="flex items-center border border-line">
                          <button
                            type="button"
                            onClick={() =>
                              cart.setQty(line.item.slug, line.item.color, line.item.qty - 1)
                            }
                            aria-label="−"
                            className="cursor-pointer px-2 py-1 text-xs text-ink hover:bg-sand"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-xs text-ink">
                            {line.item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              cart.setQty(line.item.slug, line.item.color, line.item.qty + 1)
                            }
                            aria-label="+"
                            className="cursor-pointer px-2 py-1 text-xs text-ink hover:bg-sand"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-medium text-ink">
                          {formatPrice(line.lineTotal, locale)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm font-medium text-ink">
                <span>{t("subtotal", { count: cart.count })}</span>
                <span>{formatPrice(subtotal, locale)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full cursor-pointer bg-olive py-3 text-center text-sm font-medium tracking-wide text-white transition-colors hover:bg-olive-dark"
              >
                {t("checkout")}
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
